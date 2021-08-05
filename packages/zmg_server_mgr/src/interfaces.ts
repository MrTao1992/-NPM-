declare global {
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
			sendHttp(url: string, params, method: string, cb: Function, target?: any, timeOutCb?: Function, errorCb?: Function, abortCb?: Function, customCb?: Function);
			/**
			 * 设置请求头
			 * @param xhr(XMLHttpRequest)
			 * @param headers
			 */
			setHttpHeaders(xhr: XMLHttpRequest, headers): void;
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
			notifyCallback(cb: Function, code: number, data, msg, customCb?: Function): void;
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
			registClass(protoType: number, classType: any);
			/**
			 *
			 * @param protoType
			 */
			getClass(protoType: any);
		}

		interface IMsgBase {
			initMsgObj();
			getType();
			getName();
			getMsg();
			toArrayBuffer(): ArrayBuffer;
		}

		interface INetwork {
			connct();
			send(msg: Buffer | string);
			close();
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

		export interface ISocketDelegate {
			onSocketOpen();
			onSocketError(errMsg);
			onSocketClosed(msg: string);
			onSocketMessage(data: string | ArrayBuffer);
			connect(url: string): void;
			closeConnect(): void;
			send(msg: string | ArrayBuffer);
			isSocketOpened(): boolean;
			isSocketClosed(): boolean;
			msgToBuffer(msg: any);
			bufferToMsg(buffer: ArrayBuffer);
		}
	}
}
export {};
