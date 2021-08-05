import { getExtraUrlByCommond, Commands } from './Commond';
import { EnvMgr } from 'zmg_env_mgr';
import { ConfigMgr } from "zmg_config_mgr";
import { StringUtil } from 'zmg_util';
export function GWarn(...args) {
    console.warn.apply(this, args);
}

export function trace(...args) {
    console.log.apply(this, args);
}

export default class HttpManager implements zmgServerMgr.IHttpMgr {
    private _server: string = 'https://hdkj.zmlearn.com';
    private _gateServer: string;
    public READY: string = 'ready';
    private _isInit: boolean = false;
    private _lastServerName: string = '';

    public get server(): string {
        return this._server;
    }
    public set server(value: string) {
        this._server = value;
    }

    public init(url: string, gateUrl: string, onLaunched?: () => void): void {
        this.server = url;
        this._gateServer = gateUrl;
        this._isInit = true;
        setInterval(this.checkLink.bind(this), 5000);
    }

    public checkLink(): void {
        if (this._lastServerName) {
            GWarn('连接\n' + this._lastServerName + '\n超时！');
            if (EnvMgr.getEnv() == 'fat') {
                // Permanent.instance.alert.show('服务器' + this._lastServerName + '连接超时！', null, null, '确定', '');
            }
            this._lastServerName = null;
        }
    }

    public sendGet(name: string, params: any, cb: Function = null, target?: any, timeOutCb?: Function, errorCb?: Function, abortCb?: Function, customCb?: Function): XMLHttpRequest {
        if (this.server == null) {
            GWarn('服务器未配置2...', name);
            return;
        }

        let extraUrl = getExtraUrlByCommond(name);
        this._lastServerName = extraUrl;
        let url = this.server + extraUrl;
        params = params || {};
        if (params.bu === undefined) {
            params.bu = ConfigMgr.getBu();
        }
        if (url.indexOf('?') == -1) {
            url += '?';
        }
        url += StringUtil.getQuery(params);
        return this.sendHttp(url, null, 'GET', cb, target, timeOutCb, errorCb, abortCb, customCb);
    }

    public sendPost(name: string, params: any, cb: Function = null, target?: any, timeOutCb?: Function, errorCb?: Function, abortCb?: Function, customCb?: Function): XMLHttpRequest {
        if (this.server == null) {
            GWarn('服务器未配置3...');
            return;
        }
        params = params || {};
        if (params.bu === undefined) {
            params.bu = ConfigMgr.getBu();;
        }

        let extraUrl = getExtraUrlByCommond(name);
        this._lastServerName = extraUrl;
        return this.sendHttp(this.server + extraUrl, params, 'POST', cb, target, timeOutCb, errorCb, abortCb, customCb);
    }

    public sendHttp(url: string, params, method: string, cb: Function, target?: any, timeOutCb?: Function, errorCb?: Function, abortCb?: Function, customCb?: Function) {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'text';
        xhr.onreadystatechange = this.onReadyStateChange.bind(this, xhr, cb, customCb);
        if (target) {
            xhr.ontimeout = timeOutCb ? timeOutCb.bind(target, xhr, url) : this.onTimeout.bind(this, xhr, url);
            xhr.onerror = errorCb ? errorCb.bind(target, xhr, url) : this.onError.bind(this, xhr, url);
            xhr.onabort = abortCb ? abortCb.bind(target, xhr, url) : this.onAbort.bind(this, xhr, url);
        } else {
            xhr.ontimeout = this.onTimeout.bind(this, xhr, url);
            xhr.onerror = this.onError.bind(this, xhr, url);
            xhr.onabort = this.onAbort.bind(this, xhr, url);
        }

        // Glog(`HttpService, doHttp url=${url}, method=${method}, parmas=${params}`)
        xhr.open(method, url, true);
        this.setHttpHeaders(xhr, { 'Content-Type': 'application/json' });
        this.setHttpHeaders(xhr, { Accept: 'application/json' });
        this.setHttpHeaders(xhr, { 'App-Name': 'KidsPC' });
        this.setHttpHeaders(xhr, { 'App-Version': '1.0.0' });
        this.setHttpHeaders(xhr, { 'Api-Version': '4.1.0' });
        let token = EnvMgr.getToken();
        this.setHttpHeaders(xhr, { accessToken: token });
        if (params && typeof params === 'object') {
            params = JSON.stringify(params);
        }
        xhr.send(params);
        return xhr;
    }

    public onError(xhr: XMLHttpRequest, url: string) {
        GWarn(url, 'request onError');

        this.removeXhrEvent(xhr);
    }

    public onAbort(xhr: XMLHttpRequest, url: string) {
        GWarn(url, 'request onAbort');
        this.removeXhrEvent(xhr);
    }

    public setHttpHeaders(xhr: XMLHttpRequest, headers) {
        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }

    public onReadyStateChange(xhr: XMLHttpRequest, cb: Function, customCb?: Function) {
        if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
            let data;
            let code = HttpCode.kUnknown;
            let msg: string = '';
            const response = JSON.parse(xhr.responseText);
            if (response && response.code) {
                code = response.code;
                data = response.data;
                msg = response.message;
            } else {
                code = HttpCode.kSuccess;
                data = response;
            }
            this.notifyCallback(cb, code, data, msg, customCb);
            this.removeXhrEvent(xhr);
        } else if (xhr.readyState == 3) {
            if (xhr.responseText) {
                var response: any;
                try {
                    response = JSON.parse(xhr.responseText);
                } catch (e) {
                    response = null;
                }
                if (response && parseInt(response.code) && response.message) {
                    if (parseInt(response.code) == HttpCode.kNPCRewardReceived) return;
                    // Permanent.instance.alert.show(response.message);
                }
            }
        }
        this._lastServerName = null;
    }

    public onTimeout(xhr: XMLHttpRequest, url: string) {
        trace(url, 'requst onTimeOut');
        this.removeXhrEvent(xhr);
        GWarn('网络不给力!');
    }

    public removeXhrEvent(xhr: XMLHttpRequest) {
        xhr.ontimeout = null;
        xhr.onerror = null;
        xhr.onabort = null;
        xhr.onreadystatechange = null;
    }

    public notifyCallback(cb: Function, code: number, data, msg, customCb?: Function) {
        if (cb) {
            if (code == 0) {
                //与服务端商定不为0时全弹窗
                // cc.log("与服务端商定不为0时全弹窗", msg);
                cb(this.JsonDeepCopy(data), code, msg);
            } else {
                if (code == HttpCode.kNPCRewardReceived) return;
                // Permanent.instance.showToastInfo(msg);
                if (customCb) {
                    customCb(this.JsonDeepCopy(data), code, msg);
                }
            }
        }
    }

    public JsonDeepCopy(param): any {
        if (param == null || param == undefined) param = {};
        return JSON.parse(JSON.stringify(param));
    }
}

export enum HttpCode {
    kSuccess = 0,
    kTimeout = 10000,
    kUnknown = 10001,
    kSessionTimeout = -8,
    kIAmInBlocklist = -3013,
    kUserIsInMyBlocklist = -3014,
    kNPCRewardReceived = 100031, //npc奖励已领取
}

export let httpManager = new HttpManager();
