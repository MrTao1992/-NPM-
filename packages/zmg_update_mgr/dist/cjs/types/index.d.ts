declare module 'zmg_update_mgr/src/HotUpdateConfig' {
	export default class HotUpdateConfig {
	    static testUpdate: boolean;
	    static debugVersion: boolean;
	    static debugRes: boolean;
	    static debugProgress: boolean;
	    static testIp: string;
	    static testCdn: string;
	    static concurrent: number;
	    static line: string;
	    static gateSocketIp: string;
	}

}
declare module 'zmg_update_mgr/src/Manifest' {
	export default class Manifest {
	    server: string;
	    remoteManifest: string;
	    remoteVersion: string;
	    version: string;
	    assets: [];
	    searchPaths: [];
	}

}
declare module 'zmg_update_mgr/src/ResourceDownloader' {
	export default class ResourceDownloader {
	    private _storagePath;
	    private _localManifest;
	    private _remoteManifest;
	    private _nocache;
	    private _downloadUnits;
	    private _completeUnits;
	    private _failedUnits;
	    private _deleteUnits;
	    private _downloadCompleteNum;
	    private _downloadFailedNum;
	    private _failedCount;
	    private _concurrentCurrent;
	    private _totalUnits;
	    private _items;
	    onComplete: any;
	    onProgress: any;
	    onFail: any;
	    onNoNetwork: any;
	    /**
	     *  分析并获取需要更新的资源
	     *  */
	    download(storagePath: any, localManifest: any, remoteManifest: any): void;
	    /**
	     *  对比本地项目清单数据和服务器清单数据，找出本地缺少的以及和服务器不一样的资源
	     **/
	    private _analysisDownloadUnits;
	    /**
	     *  对比本地项目清单数据和服务器清单数据，找出本地多出的资源
	     **/
	    private _analysisDeleteUnits;
	    /**
	     *  添加下载单位
	     **/
	    private _addDownloadUnits;
	    /** 断网后恢复更新状态 */
	    recovery(): void;
	    /** 下载资源 */
	    private _downloadAsset;
	    /** 下载失败的资源 */
	    private _downloadFailedAssets;
	    /** 判断是否全部更新完成 */
	    private _isUpdateCompleted;
	    /**
	     *  删除本地比服务器多出的文件
	     **/
	    private _deleteAssets;
	    /**
	     *  文件保存到本地
	     **/
	    private _saveAsset;
	    /**
	     *  规避 HTTP 缓存问题
	     **/
	    private _noCache;
	}

}
declare module 'zmg_update_mgr/src/ResourceDownloaderMgr' {
	export class ResourceDownloadEvent {
	    static readonly NEW_VERSION: string;
	    static readonly NEW_VERSION_FOUND: string;
	    static readonly SUCCESS: string;
	    static readonly FAILED: string;
	    static readonly PROGRESS: string;
	    static readonly LOCAL_PROJECT_MANIFEST_LOAD_FAIL: string;
	    static readonly REMOTE_VERSION_MANIFEST_LOAD_FAILD: string;
	    static readonly REMOTE_PROJECT_MANIFEST_LOAD_FAILD: string;
	    static readonly NO_NETWORK: string;
	}
	export default class ResourceDownloaderMgr extends cc.EventTarget {
	    static readonly LOCAL_STORAGE_ASSET_FOLDER: string;
	    static readonly LOCAL_STORAGE_KEY_MODULE_PROJECT_MANIFEST: string;
	    static readonly LOCAL_STORAGE_KEY_UPDATE_STATE: string;
	    static readonly MODULE_PROJECT_MANIFEST_PATH: string;
	    name: string;
	    private _progress;
	    private _isUpdating;
	    private _appManifest;
	    private _localManifest;
	    private _remoteManifest;
	    private _moduleName;
	    private _moduleManifestKey;
	    private _moduleStateKey;
	    private _resourceDownloader;
	    private _nocache;
	    private _storagePath;
	    onCheckComplete: any;
	    onComplete: any;
	    /**
	     *  更新进度
	     **/
	    getProgress(): number;
	    /**
	     * 对比服务器版本信息
	     * @param moduleName(string)       模块名称
	     */
	    check(moduleName: string): void;
	    /**
	     * 加载本地项目中资源清单数据
	     **/
	    private _loadLocalManifest;
	    /**
	     *  检查版本号
	     **/
	    private _checkVersion;
	    /**
	     *  开始更新版本
	     **/
	    update(): void;
	    /** 开始下载资源 */
	    private _downloadAssets;
	    /**
	     *  断网后恢复状态
	     **/
	    recovery(): void;
	    /**
	     * 触发事件
	     * @param type(string)      事件类型
	     * @param args(object)      事件参数
	     */
	    private _dispatchEvent;
	    /** 规避 HTTP 缓存问题 */
	    private _noCache;
	    /**
	     *  验证是否有覆盖安装，安装包中版本高于本地资源时，删除本地资源的模块资源
	     **/
	    checkVersion(remoteVersion: any): void;
	    /**
	     * 删除模块
	     * @param moduleName(string)    模块名
	     */
	    delete(moduleName: any): void;
	}

}
declare module 'zmg_update_mgr/src/HotUpdateMgr' {
	export default class _HotUpdateMgr {
	    static readonly ASSET_UPDATE_NO_COMPLETE = "update_no_complete";
	    private _updates;
	    private _queue;
	    private _isUpdating;
	    private _current;
	    private _noComplete;
	    private assetManager;
	    private static _instance;
	    static getInstance(...args: any[]): any;
	    constructor();
	    /**
	     * 获取模块版本信息
	     * @param localVersionLoadComplete(function)    本地版本信息加载完成
	     * @param remoteVersionLoadComplete(function)   远程版本信息加载完成
	     */
	    getModules(remoteVersionLoadComplete: any): void;
	    /**
	     * 载入未更新完的热更项
	     * */
	    load(): void;
	    getProgress(name: string): number;
	    /**
	     * 初始化更新模块名
	     * @param name(string)                 模块名
	     * @param onCheckComplete(function)    检查版本完成回调
	     * @param onComplete(function)         更新完成回调
	     * @param onProgress(function)         更新进度回调
	     * @param onNewVersion(function)       已是最新版本回调
	     */
	    init(name: any, onCheckComplete: any, onComplete: any, onProgress: any, onNewVersion: any): void;
	    /**
	     *  是否没完成
	     **/
	    isNoComplete(name: any): boolean;
	    /**
	     * 检查版本是否需要更新
	     */
	    check(name: any): void;
	    /**
	     *  断网后恢复状态
	     **/
	    recovery(name: any): void;
	    private _onFailed;
	    private _onNetError;
	    /**
	     *  检查版本完成
	     **/
	    private _onCheckComplete;
	    private _onUpdateComplete;
	    /**
	     *  保存下在下载的模块状态
	     **/
	    private _saveNoCompleteModule;
	}

}
declare module 'zmg_update_mgr' {
	export {};

}
declare module 'zmg_update_mgr/src/interfaces' {
	 global {
	    namespace zmg {
	        interface IHotUpdateMgr {
	            /**
	             * 获取模块版本信息
	             * @param remoteVersionLoadComplete(function)   远程版本信息加载完成
	             */
	            getModules(remoteVersionLoadComplete: any): void;
	            /**
	             * 载入未更新完的热更项
	             * */
	            load(): void;
	            /**
	             * 获取进度
	             * @param name 模块名称
	             */
	            getProgress(name: string): number;
	            /**
	             * 初始化更新模块名
	             * @param name(string)                 模块名
	             * @param onCheckComplete(function)    检查版本完成回调
	             * @param onComplete(function)         更新完成回调
	             * @param onProgress(function)         更新进度回调
	             * @param onNewVersion(function)       已是最新版本回调
	             */
	            init(name: any, onCheckComplete: any, onComplete: any, onProgress: any, onNewVersion: any): void;
	            /**
	            * 是否没完成
	            **/
	            isNoComplete(name: any): void;
	            /**
	             * 检查版本是否需要更新
	             */
	            check(name: any): void;
	            /**
	            * 断网后恢复状态
	            **/
	            recovery(name: any): void;
	        }
	    }
	}
	export {};

}
