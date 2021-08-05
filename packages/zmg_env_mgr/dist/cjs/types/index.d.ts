declare module 'zmg_env_mgr/src/EDevice' {
	export enum $EDevice {
	    PC = "PC",
	    MAC = "MAC",
	    IPAD = "IPAD",
	    APAD = "APAD",
	    IPHONE = "IPHONE",
	    APHONE = "APHONE"
	}

}
declare module 'zmg_env_mgr/src/EEnv' {
	export enum $EEnv {
	    FAT = "fat",
	    TEST = "test",
	    UAT = "uat",
	    PROD = "prod"
	}

}
declare module 'zmg_env_mgr/src/ESource' {
	export enum $ESource {
	    /**
	     * 姜帅
	     */
	    PC = "11574",
	    /**
	     * 郑来贤
	     */
	    IPAD = "513",
	    /**
	     * 胡春风
	     */
	    APAD = "523",
	    /**
	     * 谢真真
	     */
	    ANDROID = "533",
	    /**
	     * 陈凯
	     */
	    IPHONE = "543"
	}

}
declare module 'zmg_env_mgr/src/WebEnv' {
	import { $EDevice } from 'zmg_env_mgr/src/EDevice';
	import { $EEnv } from 'zmg_env_mgr/src/EEnv';
	import { $ESource } from 'zmg_env_mgr/src/ESource';
	import { BaseMgr } from 'zmg_mgr';
	export class WebEnv extends BaseMgr implements zmg.IEnvMgr {
	    private _defaultSearch;
	    private _defaultAppVersion;
	    private _defaultApiVersion;
	    private _envData;
	    constructor();
	    setTestDefault(value: string): void;
	    private init;
	    start(): Promise<void>;
	    isPC(): boolean;
	    isIOS(): boolean;
	    isAndroid(): boolean;
	    isTest(): boolean;
	    isJsb(): boolean;
	    isDebug(): boolean;
	    get search(): string;
	    getRequest(url: string): any;
	    getCookie(name: any): string;
	    getAppVersion(): string;
	    getApiVersion(): string;
	    destroy(): void;
	    get isValid(): boolean;
	    /**
	     * 是否原生模块
	     */
	    isNative(): boolean;
	    getEnvData(): zmg.IEnvData;
	    /**
	     * 获取环境
	     */
	    getEnv(): $EEnv;
	    /**
	     * 获取来源(来源appid)
	     */
	    getSourceId(): $ESource;
	    /**
	     * 获取设备
	     */
	    getDevice(): $EDevice;
	    /**
	     * 获取token
	     */
	    getToken(): string;
	    /**
	     * 获取用户ID
	     */
	    getUserId(): string;
	    isFat(): boolean;
	    /**
	     * 获取ModuleId
	     */
	    getDefaultModuleAsset(): zmg.IDefaultModuleAsset;
	    getPlatform(): string;
	    getShopDevice(): string;
	}

}
declare module 'zmg_env_mgr/src/EnvMgr' {
	export class _EnvMgr {
	    private static _env;
	    private static createInstance;
	    static getInstance(): zmg.IEnvMgr;
	}

}
declare module 'zmg_env_mgr/src/interfaces' {
	import { $EDevice } from 'zmg_env_mgr/src/EDevice';
	import { $EEnv } from 'zmg_env_mgr/src/EEnv';
	import { $ESource } from 'zmg_env_mgr/src/ESource'; global {
	    namespace zmg {
	        interface IEnvData {
	            token: string;
	            appId: string;
	            userId: string;
	            env: string;
	            device: $EDevice;
	            moduleId: string;
	            moduleParams: string;
	            moduleCode: string;
	            msgSendModle: string;
	        }
	        interface IEnvMgr extends zmg.IMgr {
	            isJsb(): boolean;
	            /**
	             * 是否调试模式
	             */
	            isDebug(): boolean;
	            /**
	             *
	             */
	            isFat(): boolean;
	            /**
	             * 设置默认测试账号
	             */
	            setTestDefault(value: string): void;
	            /**
	             * 是否原生模块
	             */
	            isNative(): boolean;
	            /**
	             * 获取环境
	             */
	            getEnv(): $EEnv;
	            /**
	             * 获取环境数据
	             * */
	            getEnvData(): IEnvData;
	            /**
	             * 获取来源(来源appid)
	             */
	            getSourceId(): $ESource;
	            /**
	             * 获取设备本地版本
	             */
	            getAppVersion(): string;
	            /**
	             * 获取服务器版本
	             */
	            getApiVersion(): string;
	            /**
	             * 获取设备
	             */
	            getDevice(): $EDevice;
	            /**
	             * 获取token
	             */
	            getToken(): string;
	            /**
	             * 获取用户ID
	             */
	            getUserId(): string;
	            /**
	             * 获取ModuleId
	             */
	            getDefaultModuleAsset(): zmg.IDefaultModuleAsset;
	            /**
	             * 协议发送使用
	             * pc/pad
	             */
	            getPlatform(): string;
	            isIOS(): boolean;
	            isAndroid(): boolean;
	            isPC(): boolean;
	            /**
	             * 专商城提供的设备字段
	             */
	            getShopDevice(): string;
	        }
	    }
	}
	export {};

}
declare module 'zmg_env_mgr' {
	import { $EEnv } from 'zmg_env_mgr/src/EEnv';
	import { $EDevice } from 'zmg_env_mgr/src/EDevice';
	import { $ESource } from 'zmg_env_mgr/src/ESource';
	export * from 'zmg_env_mgr/src/interfaces';
	export let EEnv: typeof $EEnv;
	export let ESource: typeof $ESource;
	export let EDevice: typeof $EDevice;
	export let EnvMgr: zmg.IEnvMgr;

}
