declare module 'zmg_track_mgr/src/TrackEventType' {
	export enum $TrackEventType {
	    Touch = 0,
	    Load = 1,
	    Custom = 2
	}

}
declare module 'zmg_track_mgr/src/TrackModule' {
	import { $TrackEventType } from 'zmg_track_mgr/src/TrackEventType';
	export var TrackModule: {
	    key: string;
	    moduleName: string;
	    description: string;
	    curTime: number;
	    param: any;
	    extParam: {};
	    eventType: $TrackEventType;
	};

}
declare module 'zmg_track_mgr/src/NativeTrack' {
	export class NativeTrack {
	    initTrack(S: zmg.INativeTrackSDK): void;
	    send(S: zmg.INativeTrackSDK): void;
	}

}
declare module 'zmg_track_mgr/src/WebTrack' {
	export class WebTrack {
	    initTrack(S: any): void;
	    init(S: zmg.IWebTrackSDK): void;
	    send(S: zmg.IWebTrackSDK): void;
	}

}
declare module 'zmg_track_mgr/src/TrackMgr' {
	import { BaseMgr } from 'zmg_mgr';
	import { $TrackEventType } from 'zmg_track_mgr/src/TrackEventType';
	export class _TrackMgr extends BaseMgr implements zmg.ITrackMgr {
	    private static _instance;
	    private trackSdk;
	    private delegate;
	    static getInstance(): _TrackMgr;
	    constructor();
	    start(): Promise<void>;
	    initTrack(S?: zmg.IWebTrackSDK | zmg.INativeTrackSDK): void;
	    send(key: string, data?: any, eventType?: $TrackEventType, moduleName?: string, extParam?: any): void;
	}

}
declare module 'zmg_track_mgr' {
	import { $TrackEventType } from 'zmg_track_mgr/src/TrackEventType';
	export let TrackMgr: zmg.ITrackMgr;
	export let TrackEventType: typeof $TrackEventType;
	export * from 'zmg_track_mgr/src/TrackModule';

}
declare module 'zmg_track_mgr/src/interfaces' {
	 global {
	    namespace zmg {
	        /**
	         * web埋点SDK函数接口
	         */
	        interface IWebTrackSDK {
	            setConfig(params: any): void;
	            setDefaults(params: any): void;
	            /**
	             * 请勿直接调用，暴露给特定的类使用的
	             * @param params
	             */
	            sendEvent(params: any): void;
	        }
	        /**
	         * web埋点SDK函数接口
	         */
	        interface INativeTrackSDK {
	            /**
	             * 提交埋点数据
	             * @param name 事件名称
	             * @param eventType 事件类型
	             * @param eventValue 事件值
	             * @param data 扩展参数
	             */
	            sendEvent(name: string, data?: any, eventType?: number, eventValue?: number): any;
	            /**
	             * 设置埋点信息
	             * @param appId 应用id
	             * @param appVersion 应用版本
	             */
	            setLogConfig(appId: string, appVersion: string): void;
	            /**
	             * 原生端的appId
	             */
	            appId(): string;
	            /**
	             * 端版app版本号
	             */
	            appVersion(): string;
	        }
	        interface ITrackMgr extends zmg.IMgr {
	            /**
	             * 初始化埋点
	             * @param S 埋点SDK
	             */
	            initTrack(S?: IWebTrackSDK | INativeTrackSDK): void;
	            /**
	             * 发送埋点
	             * @param key 关键词
	             * @param data 数据
	             * @param eventType 类型
	             * @param moduleName 所属模块
	             * @param extParam 扩展数据
	             */
	            send(key: string, data?: any, eventType?: any, moduleName?: string, extParam?: any): void;
	        }
	    }
	}
	export {};

}
