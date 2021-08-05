declare module 'zmg_controller/src/DirectorEvent' {
	/// <reference types="zmg_event_mgr/dist/cjs/types" />
	export class $DirectorEvent extends cc.Event {
	    static SCENE_CHANGE_DESTORY: import("zmg_event_mgr/src/EventName").$EventName;
	    static SCENE_CHANGE_START: import("zmg_event_mgr/src/EventName").$EventName;
	    static SCENE_CHANGE_END: import("zmg_event_mgr/src/EventName").$EventName;
	    static SCENE_CHANGE_PROGRESS: import("zmg_event_mgr/src/EventName").$EventName;
	    static SCENE_CHANGE_FAIL: import("zmg_event_mgr/src/EventName").$EventName;
	    static SOUND_CLOSE: import("zmg_event_mgr/src/EventName").$EventName;
	    static SOUND_OPEN: import("zmg_event_mgr/src/EventName").$EventName;
	    preSceneName: string;
	    nextSceneName: string;
	    param: any;
	    progress: number;
	    constructor(type: string, preSceneName?: string, nextSceneName?: string);
	}

}
declare module 'zmg_controller/src/DirectorMgr' {
	import { BaseMgr } from 'zmg_mgr';
	export class _DirectorMgr extends BaseMgr implements zmg.IControllerMgr {
	    constructor();
	    private static _instance;
	    static getInstance(): _DirectorMgr;
	    private _callTime;
	    private _openList;
	    private _isloading;
	    private _bgclip;
	    private _isWebview;
	    private _nowBunName;
	    private _nowSceneName;
	    private _param;
	    private _cfg;
	    get nowBunName(): string;
	    get nowConfig(): zmg.IModuleConfig;
	    get nowParam(): any;
	    get nowSceneName(): string;
	    set bgclip(url: string);
	    get bgclip(): string;
	    openConfig(cfg: zmg.IModuleConfig, param?: object): void;
	    openScene(bunName: string, sceneName: string, param?: any, transitions?: {
	        color: cc.Color;
	        movieclip: cc.Node;
	    }): void;
	    /**
	     * 过度效果切换场景
	     * @param bunName
	     * @param path
	     */
	    tranToScene(bunName: string, sceneName: string, param?: any, color?: cc.Color, movieclip?: cc.Node): void;
	    /**
	     * 视频播放
	     * @param url
	     */
	    openWebview(url: string, params?: any): void;
	    openPrefab(bunName: string, path: string, param?: any): void;
	    start(): Promise<void>;
	    destroy(): void;
	    get isValid(): boolean;
	    curCanvas(): cc.Node;
	    curSence(): cc.Scene;
	    isWebviewScene(): boolean;
	    /**
	    * 场景切换开始处理函数
	    */
	    private onSceneStart;
	    private onSceneDestory;
	    /**
	     * 场景切换完毕处理函数
	     */
	    private onSceneEnd;
	    dispatchEvent(evt: cc.Event): void;
	    /**
	     *
	     * @param param 视频场景初始化
	     */
	    private destroyVideo;
	    private destroyWebview;
	    /**
	     *
	     * @param param webview场景初始化
	     */
	    private initWebview;
	    private onWebViewError;
	    private onWebViewLoaded;
	}

}
declare module 'zmg_controller/src/interfaces' {
	 global {
	    namespace zmg {
	        /**
	         * 打开列表子类
	         */
	        interface IOpenItem {
	            cfg: zmg.IModuleConfig;
	            param?: object;
	        }
	        interface IControllerMgr {
	            /**
	             * 背景音乐地址
	             */
	            bgclip: string;
	            /**
	             *
	             * @param cfg
	             * @param param
	             */
	            openConfig(cfg: zmg.IModuleConfig, param?: object): void;
	            /**
	             * 打开场景
	             * @param bunName
	             * @param path
	             */
	            openScene(bunName: string, sceneName: string): void;
	            /**
	             * 过度效果切换场景
	             * @param bunName
	             * @param path
	             */
	            tranToScene(bunName: string, sceneName: string): void;
	            /**
	             * 打开webview
	             * @param url
	             */
	            openWebview(url: string): void;
	            /**
	             * 打开节点跳转对象
	             * @param pre
	             * @param zindex
	             * @param parent
	             */
	            openPrefab(bunName: string, path: string, param?: any): void;
	        }
	    }
	}
	export {};

}
declare module 'zmg_controller' {
	import { _DirectorMgr } from 'zmg_controller/src/DirectorMgr';
	import { $DirectorEvent } from 'zmg_controller/src/DirectorEvent';
	export * from 'zmg_controller/src/interfaces';
	export class DirectorEvent extends $DirectorEvent {
	}
	export let DirectorMgr: _DirectorMgr;

}
