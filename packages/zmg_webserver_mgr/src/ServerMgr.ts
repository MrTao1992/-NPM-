import { gLog, StringUtil } from "zmg_util";
import { ConfigMgr } from "zmg_config_mgr";
import { EventMgr, EventName, } from "zmg_event_mgr";
import { gWarn } from "zmg_util";
import { EnvMgr } from "zmg_env_mgr"
import { $ServerEvent } from "./ServerEvent";
import { BaseMgr } from "zmg_mgr";
import { ServerVo } from "./ServerVo";
import { $zmgCommands } from "./zmgCommands";
import { $ServerListener } from "./ServerListener";
import { $EServerMethod, $ServerItem } from "./ServerItem";
enum WebServerMethod {
    GET = "GET",
    POST = "POST"
}
export class _ServerMgr extends BaseMgr implements zmg.IWebServerMgr {
    private static _instance: _ServerMgr;
    static getInstance(): _ServerMgr {
        if (!this._instance) {
            this._instance = new _ServerMgr();
        }
        return this._instance;
    }

    private _vo: ServerVo;

    constructor() {
        super();
    }

    private _bu: string;
    private _url: string;
    private _config: zmg.IServerConfig;
    private _listeners: zmg.IServerListener[];
    public async start() {
        super.start();
        if (EnvMgr.isValid) {
            this._vo = new ServerVo();
            this._listeners = [];
            this.initConfig();
        } else {
            EnvMgr.once(EventName.ENV_READY, this.start, this);
        }
    }
    public destroy(): void {
        super.destroy();
        this._vo.clear();
        EventMgr.off(EventName.CONFIG_READY, this.onConfigComplete, this);
    }
    public get isValid(): boolean {
        return this._config ? true : false;
    }
    public clearVo(cmd: string): void {
        this._vo.clearData(cmd);
    }

    public resetVo(): void {
        this._vo = new ServerVo();
    }

    public changeVo(cmd: string, key?: string, value?: any): any {
        let data: object = this._vo.getData(cmd);
        if (data && StringUtil.isValid(key)) {
            data[key] = value;
        }
        return data;
    }

    public getItemCache(item: $ServerItem, callback: (item: $ServerItem) => void, target: any, errorFun: (castData: zmg.IServerCastData) => void = null): void {
        let key = item.getKey();
        let localData = this._vo.getData(key);
        if (localData) {
            item.setData(localData);
            callback.call(target, item);
        } else {
            _ServerMgr.getInstance().send(item, (pitem: $ServerItem, lis: $ServerListener) => {
                this._vo.saveData(key, pitem.data);
                callback.call(target, pitem);
            }, target, errorFun);
        }
    }

    public send(item: $ServerItem, listener: any, target: any, errorFun: (castData: zmg.IServerCastData) => void = null, cache: boolean = false): XMLHttpRequest {
        let lis: $ServerListener;
        if ((listener instanceof $ServerListener)) {
            lis = new $ServerListener(target, (res: any) => {
                item.setData(res);
                listener.onLaunch(item);
            }, listener.errorFun);
        } else {
            lis = new $ServerListener(target, (res: any) => {
                item.setData(res);
                (listener as Function).call(target, item, lis);
            }, errorFun);
        }
        if (item.method == $EServerMethod.GET) {
            return this.sendGet(item.path, item.param, lis, this, cache);
        } else {
            return this.sendPost(item.path, item.param, lis, this, cache);
        }
    }
    public sendGet(name: string, params?: any, listener?: any, target?: any, cache: boolean = false): XMLHttpRequest {
        if (!this._url) {
            gWarn("服务器地址未找到!");
            return null;
        }
        let url: string = this._url + name;
        params = params || {}
        if (url.indexOf("?") == -1) {
            url += "?";
        }
        let p = StringUtil.getQuery(params);
        p = p.length ? p + "&bu=2" : "bu=2";
        url += p;
        if (!(listener instanceof $ServerListener)) {
            listener = new $ServerListener(target, listener as ((data: any) => void));
        }
        if (cache && this.dealByCache(name, url, listener)) {
            //缓存数据已处理完毕
            return null;
        }
        return this.sendHttp(url, WebServerMethod.GET, null, listener);
    }
    public sendPost(name: string, params?: any, listener?: any, target?: any, cache: boolean = false): XMLHttpRequest {
        if (!this._url) {
            gWarn("服务器地址未找到!");
            return null;
        }
        params = params ? params : {};
        let url: string = this._url + name;
        if (listener instanceof Function) {
            listener = new $ServerListener(target, listener);
        }
        if (cache && this.dealByCache(name, url, listener)) {
            //缓存数据已处理完毕
            return null;
        }
        return this.sendHttp(url, WebServerMethod.POST, params, listener);
    }

    private dealByCache(name: string, url: string, listener?: zmg.IServerListener): boolean {
        let data: XMLHttpRequest = this._vo.getData(name);
        if (data !== undefined) {
            if (listener) {
                this.onComplete(url, data);
            }
            return true;
        }
        return false;
    }

    private addListener(url: string, listener: zmg.IServerListener): void {
        if (listener) {
            listener.url = url;
            this._listeners.push(listener);
        }
    }

    private initConfig(): void {
        if (ConfigMgr.isValid) {
            this.onConfigComplete();
        } else {
            EventMgr.once(EventName.CONFIG_READY, this.onConfigComplete, this);
        }
    }

    private sendHttp(url: string, method: WebServerMethod, params?: any, listener?: zmg.IServerListener, cache: boolean = true): XMLHttpRequest {
        gLog("发送消息:", "url:" + url, "method:" + method, "params:" + JSON.stringify(params));
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'text';
        xhr.onreadystatechange = this.onReadyStateChange.bind(this, xhr, url, cache);
        xhr.ontimeout = this.onTimeout.bind(this, xhr);
        xhr.onerror = this.onServerError.bind(this, xhr);
        xhr.onabort = this.onAbort.bind(this, xhr);
        xhr.open(method, url, true);

        this.setHttpHeaders(xhr, { 'Content-Type': 'application/json' })
        this.setHttpHeaders(xhr, { 'Accept': 'application/json' });
        this.setHttpHeaders(xhr, { 'App-Name': 'KidsPC' });
        this.setHttpHeaders(xhr, { 'Api-Version': EnvMgr.getApiVersion() });
        this.setHttpHeaders(xhr, { 'App-Version': EnvMgr.getAppVersion() });
        let token = EnvMgr.getToken();
        this.setHttpHeaders(xhr, { 'accessToken': token });
        if (params) {
            if (typeof params === 'object') {
                params = JSON.stringify(params);
                if (params.length <= 2) {
                    params = '{"bu":"' + this._bu + '"}';
                } else {
                    params = params.slice(0, params.length - 1) + ',"bu":"' + this._bu + '"}';
                }
            }
        }
        this.addListener(url, listener);
        xhr.send(params);
        return xhr;
    }
    private setHttpHeaders(xhr: XMLHttpRequest, headers: any): void {
        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }
    private onReadyStateChange(xhr: XMLHttpRequest, url: string, cache: boolean): void {
        let response: any;
        let evt: $ServerEvent;
        let castData = {
            status: -1,
            code: "",
            message: ""
        }
        if (xhr.readyState === 4) {
            try {
                response = JSON.parse(xhr.responseText);
                if (response) {
                    castData.code = response.code ? response.code : ""
                    castData.message = response.message ? response.message : ""
                    castData.status = xhr.status
                }
            } catch (e) {
                response = null;
            }
            if (xhr.status >= 200 && xhr.status < 300) {
                if (response.code == 0) {
                    this.onComplete(url, response);
                    this.removeXhrEvent(xhr);
                    if (cache) {
                        this._vo.saveData(url, xhr);
                    }
                }
                else {
                    this.onError(xhr, url, castData);
                }
            }
            else {
                this.onError(xhr, url, castData);
            }
        }
    }
    private onTimeout(url: string, xhr: XMLHttpRequest): void {
        this.onError(xhr, url, {
            status: 404,
            code: "-1",
            message: "服务器访问超时。",
        });
    }
    private onServerError(url: string, xhr: XMLHttpRequest): void {
        this.onError(xhr, url, {
            status: 404,
            code: "-1",
            message: "服务器访问错误。",
        });
    }
    private onAbort(url: string, xhr: XMLHttpRequest): void {
        gLog("Server onAbort:");
        this.onError(xhr, url, {
            status: 404,
            code: "-1",
            message: "用户取消访问。",
        });
    }
    private onComplete(url: string, response: any): void {
        let evt: $ServerEvent;
        evt = new $ServerEvent($ServerEvent.COMPLETE);
        evt.response = response;
        this.dispatchEvent(evt);
        let list: zmg.IServerListener[] = this.findListener(url);
        let i: number;
        let len: number = list.length;
        for (i = 0; i < len; i++) {
            list[i].onLaunch(evt.data);
        }
    }
    private onError(xhr: XMLHttpRequest, url: string, castData?: zmg.IServerCastData): void {
        let evt: $ServerEvent;
        evt = new $ServerEvent($ServerEvent.ERROR);
        evt.code = castData.code ? castData.code : "";
        evt.status = castData.status ? castData.status : -1;
        evt.message = castData.message ? castData.message : "";
        this.dispatchEvent(evt);
        let list: zmg.IServerListener[] = this.findListener(url);
        let i: number;
        let len: number = list.length;
        for (i = 0; i < len; i++) {
            list[i].onError(castData);
        }
        this.removeXhrEvent(xhr)
    }
    private removeXhrEvent(xhr: XMLHttpRequest): void {
        if (xhr) {
            xhr.ontimeout = null;
            xhr.onerror = null;
            xhr.onabort = null;
            xhr.onreadystatechange = null;
            xhr.abort()
        }
    }
    private findListener(url: string, isDelete: boolean = true): zmg.IServerListener[] {
        let list: zmg.IServerListener[] = [];
        let i: number;
        let len: number = this._listeners.length;
        for (i = len - 1; i >= 0; i--) {
            if (this._listeners[i].url == url) {
                list.push(this._listeners[i]);
                if (isDelete) {
                    this._listeners.splice(i, 1);
                }
            }
        }
        return list;
    }
    private onConfigComplete(): void {
        gLog("配置服务器地址信息...");
        this._bu = ConfigMgr.getBu();
        this._config = ConfigMgr.getServerConfig();
        this._url = this._config.server + this._config.serverPath;
        gLog("bu: " + this._bu);
        gLog("url: " + this._url);
        // gLog("config: " + this._config);


        let evt = new $ServerEvent(EventName.SERVER_READY);
        EventMgr.dispatchEvent(evt);
        this.dispatchEvent(evt);
    }
}


