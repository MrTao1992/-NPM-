declare module 'zm_server_mgr/src/Template' {
	export class Template {
	    hello(): void;
	}

}
declare module 'zm_server_mgr/src/interfaces' {
	 global {
	    namespace zmgServerMgr {
	        /**
	         * Http管理类接口
	         */
	        interface IHttpMgr {
	            /**初始化*/
	            init(url: string, gateUrl: string, onLaunched?: () => void): void;
	            /** */
	            checkLink(): void;
	            /**
	             * @param name	 请求url
	             * @param params 需要发送的参数
	             * @param cb	 回调函数
	             * @param target 对象
	             * @param timeOutCb
	             * @param errorCb
	             * @param abortCb
	             * @param customCb
	             */
	            sendGet(name: string, params: any, cb: Function, target?: any, timeOutCb?: Function, errorCb?: Function, abortCb?: Function, customCb?: Function): XMLHttpRequest;
	            /**
	             * @param name
	             * @param params
	             * @param cb
	             * @param target
	             * @param timeOutCb
	             * @param errorCb
	             * @param abortCb
	             * @param customCb
	             */
	            sendPost(name: string, params: any, cb: Function, target?: any, timeOutCb?: Function, errorCb?: Function, abortCb?: Function, customCb?: Function): XMLHttpRequest;
	            /**
	             * @param url
	             * @param params
	             * @param method
	             * @param cb
	             * @param target
	             * @param timeOutCb
	             * @param errorCb
	             * @param abortCb
	             * @param customCb
	             */
	            sendHttp(url: string, params: any, method: string, cb: Function, target?: any, timeOutCb?: Function, errorCb?: Function, abortCb?: Function, customCb?: Function): any;
	            /**
	             * 设置请求头
	             * @param xhr(XMLHttpRequest)
	             * @param headers
	             */
	            setHttpHeaders(xhr: XMLHttpRequest, headers: any): void;
	            /**
	             *
	             * @param xhr
	             * @param url
	             */
	            onError(xhr: XMLHttpRequest, url: string): void;
	            /**
	             *
	             * @param xhr
	             * @param url
	             */
	            onAbort(xhr: XMLHttpRequest, url: string): void;
	            /**
	             *
	             * @param xhr
	             * @param cb
	             * @param customCb
	             */
	            onReadyStateChange(xhr: XMLHttpRequest, cb: Function, customCb?: Function): void;
	            /**
	             *
	             * @param xhr
	             * @param url
	             */
	            onTimeout(xhr: XMLHttpRequest, url: string): void;
	            /**
	             *
	             * @param xhr
	             */
	            removeXhrEvent(xhr: XMLHttpRequest): void;
	            /**
	             *
	             * @param cb
	             * @param code
	             * @param data
	             * @param msg
	             * @param customCb
	             */
	            notifyCallback(cb: Function, code: number, data: any, msg: any, customCb?: Function): void;
	        }
	        interface IProtoBuf {
	            loadFile(): void;
	        }
	        interface IMsgRegister {
	            /**
	             *
	             * @param fileMsgObj
	             */
	            registMsg(fileMsgObj: Object): void;
	            /**
	             *
	             * @param msgName
	             */
	            getMsg(msgName: string): string | null;
	            /**
	             *
	             * @param protoType
	             * @param classType
	             */
	            registClass(protoType: number, classType: any): any;
	            /**
	             *
	             * @param protoType
	             */
	            getClass(protoType: any): any;
	        }
	        interface IMsgBase {
	            initMsgObj(): any;
	            getType(): any;
	            getName(): any;
	            getMsg(): any;
	            toArrayBuffer(): ArrayBuffer;
	        }
	        interface INetwork {
	            connct(): any;
	            send(msg: Buffer | string): any;
	            close(): any;
	        }
	        interface IProtoLoader {
	            load(): void;
	            registBaseFile(): void;
	            registAllProtoFile(): void;
	            regist(msgArr: any[]): void;
	        }
	        interface IWebSocket {
	            connect(): void;
	            send(data: string | ArrayBuffer): void;
	            close(): void;
	            getState(): number;
	        }
	        interface ISocketDelegate {
	            onSocketOpen(): any;
	            onSocketError(errMsg: any): any;
	            onSocketClosed(msg: string): any;
	            onSocketMessage(data: string | ArrayBuffer): any;
	            connect(url: string): void;
	            closeConnect(): void;
	            send(msg: string | ArrayBuffer): any;
	            isSocketOpened(): boolean;
	            isSocketClosed(): boolean;
	            msgToBuffer(msg: any): any;
	            bufferToMsg(buffer: ArrayBuffer): any;
	        }
	    }
	}
	export {};

}
declare module 'zm_server_mgr' {
	export * from 'zm_server_mgr/src/interfaces';
	export * from 'zm_server_mgr/src/Template';

}
declare module 'zm_server_mgr/src/net/http/Commond' {
	export enum Commands {
	    /** 获取任务列表 */
	    getTaskList = "getTaskList",
	    /** 获取能量郭总数 */
	    getFruitTotalNum = "getFruitTotalNum",
	    /** 获取能量果记录 */
	    getFruitRecord = "getFruitRecord",
	    /** 获取能量果记录 */
	    getTaskReward = "getTaskReward",
	    getClothDetailInf = "getClothDetailInf",
	    getGoodsList = "getGoodsList",
	    getGoodsDetailInf = "getGoodsDetailInf",
	    purchaseGoods = "purChaseGoods",
	    getMallDesc = "getMallDesc",
	    getOrderList = "getOrderList",
	    getGooldsTypeList = "getGoodsTypeList",
	    /** 勋章墙 */
	    acceptMedal = "acceptMedal",
	    carryMedal = "carryMedal",
	    countMedal = "countMedal",
	    listMedal = "listMedal",
	    removeMedal = "removeMedal",
	    achievementMedal = "achievementMedal",
	    allMedal = "allMedal",
	    infoMedal = "infoMedal",
	    /** 勋章墙-新手引导 */
	    isGuidedMedal = "isGuidedMedal",
	    recordGuideMedal = "recordGuideMedal",
	    /** 勋章墙-学伴 */
	    getPartnerInfo = "getPartnerInfo",
	    getRoleDressUps = "getRoleDressUps",
	    carryUserMedal = "carryUserMedal",
	    noviewMedal = "noviewMedal",
	    viewMedal = "viewMedal",
	    catalogue = "catalogue",
	    getRank = "getRank",
	    getBatch = "getBatch",
	    getQuestionnaireConfig = "getQuestionnaireConfig"
	}
	/**
	 * 根据数据接口发送
	 * @param commond 发送的数据接口名
	 */
	export function getExtraUrlByCommond(commond: any): any;

}
declare enum HttpCode {
    kSuccess = 0,
    kTimeout = 10000,
    kUnknown = 10001,
    kAbort = 10002,
    kError = 10003,
    kSessionTimeout = -8,
    kIAmInBlocklist = -3013,
    kUserIsInMyBlocklist = -3014
}
declare module 'zm_server_mgr/src/net/http/HttpManager' {
	export function GWarn(...args: any[]): void;
	export function trace(...args: any[]): void;
	export default class HttpManager implements zmgServerMgr.IHttpMgr {
	    private _server;
	    private _gateServer;
	    READY: string;
	    private _isInit;
	    private _lastServerName;
	    get server(): string;
	    set server(value: string);
	    init(url: string, gateUrl: string, onLaunched?: () => void): void;
	    checkLink(): void;
	    sendGet(name: string, params: any, cb?: Function, target?: any, timeOutCb?: Function, errorCb?: Function, abortCb?: Function, customCb?: Function): XMLHttpRequest;
	    sendPost(name: string, params: any, cb?: Function, target?: any, timeOutCb?: Function, errorCb?: Function, abortCb?: Function, customCb?: Function): XMLHttpRequest;
	    sendHttp(url: string, params: any, method: string, cb: Function, target?: any, timeOutCb?: Function, errorCb?: Function, abortCb?: Function, customCb?: Function): XMLHttpRequest;
	    onError(xhr: XMLHttpRequest, url: string): void;
	    onAbort(xhr: XMLHttpRequest, url: string): void;
	    setHttpHeaders(xhr: XMLHttpRequest, headers: any): void;
	    onReadyStateChange(xhr: XMLHttpRequest, cb: Function, customCb?: Function): void;
	    onTimeout(xhr: XMLHttpRequest, url: string): void;
	    removeXhrEvent(xhr: XMLHttpRequest): void;
	    notifyCallback(cb: Function, code: number, data: any, msg: any, customCb?: Function): void;
	    JsonDeepCopy(param: any): any;
	}
	export enum HttpCode {
	    kSuccess = 0,
	    kTimeout = 10000,
	    kUnknown = 10001,
	    kSessionTimeout = -8,
	    kIAmInBlocklist = -3013,
	    kUserIsInMyBlocklist = -3014,
	    kNPCRewardReceived = 100031
	}
	export let httpManager: HttpManager;

}
declare class ProtoLoader {
}
