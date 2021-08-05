declare module 'zmg_webserver_mgr/src/ServerCastData' {
	export class ServerCastData {
	    /**
	     * xhr.status
	     * 200=OK
	     */
	    status: number;
	    /**
	     * 后台返回错误码
	     */
	    code: string;
	    /**
	     * 后台返回错误信息
	     */
	    message: string;
	    constructor(status: number, code: string, message: string);
	    toString(): string;
	}

}
declare module 'zmg_webserver_mgr/src/ServerEvent' {
	export class $ServerEvent extends cc.Event {
	    static READY: string;
	    static ERROR: string;
	    static COMPLETE: string;
	    private _status;
	    private _code;
	    private _message;
	    private _response;
	    /**
	     * 错误消息
	     */
	    init(xhr: XMLHttpRequest): void;
	    get status(): number;
	    set status(v: number);
	    set code(v: string);
	    get code(): string;
	    get message(): string;
	    set message(v: string);
	    get response(): any;
	    set response(value: any);
	    get data(): any;
	    constructor(type: string);
	}

}
declare module 'zmg_webserver_mgr/src/ServerItem' {
	export enum $EServerMethod {
	    GET = "get",
	    POST = "post"
	}
	export class $ServerItem {
	    /**
	     * 接口访问地址
	     */
	    path: string;
	    /**
	     * 前缀访问接口（默认为空，则使用常规前缀）
	     */
	    prefix: string;
	    method: $EServerMethod;
	    /**
	     * 发送接口参数
	     */
	    protected _param: any;
	    protected _data: any;
	    getKey(): string;
	    get clsName(): string;
	    get param(): any;
	    setData(res: any): void;
	    get data(): any;
	    clear(): void;
	}

}
declare module 'zmg_webserver_mgr/src/ServerListener' {
	export class $ServerListener implements zmg.IServerListener {
	    target: any;
	    url: string;
	    constructor(target: any, launchFun?: (data: any) => void, errorFun?: (castData: zmg.IServerCastData) => void);
	    launchFun: (data: any) => void;
	    errorFun: (castData: zmg.IServerCastData) => void;
	    onLaunch(data: any): void;
	    onError(castData: zmg.IServerCastData): void;
	    isValid(): boolean;
	    destroy(): void;
	}

}
declare module 'zmg_webserver_mgr/src/ServerVo' {
	/**
	 * 服务器拉取过的数据存储的内容
	 */
	export class ServerVo {
	    private _vo;
	    getData(cmd: string): any;
	    saveData(cmd: string, data: any): void;
	    clearData(cmd: string): void;
	    clear(): void;
	}

}
declare module 'zmg_webserver_mgr/src/zmgCommands' {
	/**
	 * swagger:
	 * http://kids-study-park-c-fat-alhz.inzm.com/swagger-ui.html#/
	 */
	export enum $zmgCommands {
	    /**
	     * 获取缓存在服务器的数据
	     */
	    storageBatch = "/kids/study/park/c/api/dict/storage/batch",
	    storagePut = "/kids/study/park/c/api/dict/storage/put",
	    /**
	     * 获取勋章墙宠物信息
	     */
	    carryMedal = "/kids/medal-wall/api/user-medal/carry"
	}

}
declare module 'zmg_webserver_mgr/src/ServerMgr' {
	import { BaseMgr } from 'zmg_mgr';
	import { $ServerItem } from 'zmg_webserver_mgr/src/ServerItem';
	export class _ServerMgr extends BaseMgr implements zmg.IWebServerMgr {
	    private static _instance;
	    static getInstance(): _ServerMgr;
	    private _vo;
	    constructor();
	    private _bu;
	    private _url;
	    private _config;
	    private _listeners;
	    start(): Promise<void>;
	    destroy(): void;
	    get isValid(): boolean;
	    clearVo(cmd: string): void;
	    resetVo(): void;
	    changeVo(cmd: string, key?: string, value?: any): any;
	    getItemCache(item: $ServerItem, callback: (item: $ServerItem) => void, target: any, errorFun?: (castData: zmg.IServerCastData) => void): void;
	    send(item: $ServerItem, listener: any, target: any, errorFun?: (castData: zmg.IServerCastData) => void, cache?: boolean): XMLHttpRequest;
	    sendGet(name: string, params?: any, listener?: any, target?: any, cache?: boolean): XMLHttpRequest;
	    sendPost(name: string, params?: any, listener?: any, target?: any, cache?: boolean): XMLHttpRequest;
	    private dealByCache;
	    private addListener;
	    private initConfig;
	    private sendHttp;
	    private setHttpHeaders;
	    private onReadyStateChange;
	    private onTimeout;
	    private onServerError;
	    private onAbort;
	    private onComplete;
	    private onError;
	    private removeXhrEvent;
	    private findListener;
	    private onConfigComplete;
	}

}
declare module 'zmg_webserver_mgr/src/interfaces' {
	 global {
	    namespace zmg {
	        interface IServerListener {
	            /**
	            * 要求监听对象
	            */
	            target: any;
	            /**
	             * 路径
	             */
	            url: string;
	            /**
	             * 消息返回回调
	             */
	            launchFun: (data: any) => void;
	            /**
	             * 消息返回错误
	             */
	            errorFun: (castData: IServerCastData) => void;
	            /**
	             * 调用消息返回回调
	             */
	            onLaunch(data: any): void;
	            /**
	             * 消息出现错误
	             */
	            onError(castData: IServerCastData): void;
	            /**
	             * 资源是否合法
	             */
	            isValid(): boolean;
	        }
	        interface IWebServerMgr extends zmg.IMgr {
	            sendGet(command: string, params?: any, listener?: zmg.IServerListener, cache?: boolean): XMLHttpRequest;
	            sendPost(command: string, params?: any, listener?: zmg.IServerListener, cache?: boolean): XMLHttpRequest;
	            /**
	             * @param cmd 获取vo外部修改
	             */
	            changeVo(cmd: string, key: string, value: any): any;
	            /**
	             * 清理缓存数据
	             * @param cmd
	             */
	            clearVo(cmd: string): void;
	        }
	        interface IServerCastData {
	            /**
	             * xhr.status
	             * 200=OK
	             */
	            status: number;
	            /**
	             * 后台返回错误码
	             */
	            code: string;
	            /**
	             * 后台返回错误信息
	             */
	            message: string;
	            toString(): string;
	        }
	    }
	}
	export {};

}
declare module 'zmg_webserver_mgr' {
	import { _ServerMgr } from 'zmg_webserver_mgr/src/ServerMgr';
	import { $ServerEvent } from 'zmg_webserver_mgr/src/ServerEvent';
	import { $ServerListener } from 'zmg_webserver_mgr/src/ServerListener';
	import { $zmgCommands } from 'zmg_webserver_mgr/src/zmgCommands';
	import { $EServerMethod, $ServerItem } from 'zmg_webserver_mgr/src/ServerItem';
	export * from 'zmg_webserver_mgr/src/interfaces';
	export let ServerMgr: _ServerMgr;
	export class ServerEvent extends $ServerEvent {
	}
	export class ServerListener extends $ServerListener {
	}
	export class ServerItem extends $ServerItem {
	}
	export let zmgCommands: typeof $zmgCommands;
	export let EServerMethod: typeof $EServerMethod;

}
