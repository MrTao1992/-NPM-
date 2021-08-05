import { $, DragonAsset, gLog, gWarn } from "zmg_util";
import { $DragonResListener } from "./assets/DragonResListener";
import { ResErrorAsset } from "./assets/ResErrorAsset";
import { ResLoadingAsset } from "./assets/ResLoadingAsset";
import { EResError } from "./common/EResError";
import { $EResEventName } from "./EResEventName";
import { $ResEvent } from "./ResEvent";
import { BaseMgr } from "zmg_mgr";
import { StringUtil } from "zmg_util";
import { $DragonResAsset } from "./assets/DragonResAsset";
import { $ResListener } from "./ResListener";
import { _SystemBundleName } from "./SystemBundleName";
import { ConfigMgr } from "zmg_config_mgr";
import { $ResCacheLib } from "./ResCacheLib";
import { $ResRemoteCacheLib } from "./ResRemoteCacheLib";
import { $BundleCacheLib } from "./BundleCacheLib";

export class _ResMgr extends BaseMgr implements zmg.IResMgr {
    private static _instance: _ResMgr;
    static getInstance(): _ResMgr {
        if (!this._instance) {
            this._instance = new _ResMgr();
        }
        return this._instance;
    }
    constructor() {
        super();
        this.setCacheLib(new $BundleCacheLib(_SystemBundleName.UI));
        this.setCacheLib(new $BundleCacheLib(_SystemBundleName.STACK));
        this.setCacheLib(new $BundleCacheLib(_SystemBundleName.CONFIG));
    }
    private _listeners: zmg.IResListener[] = [];
    private _libs: Record<string, $ResCacheLib> = {};
    public setCacheLib(lib: $ResCacheLib): void {
        let old = this._libs[lib.bunName];
        if (old) {
            old.off($EResEventName.COMPLETE, this.onResComplete, this);
            old.off($EResEventName.PROGRESS, this.onProgress, this);
            old.off($EResEventName.ERROR, this.onResError, this);
        }
        if (lib) {
            lib.on($EResEventName.COMPLETE, this.onResComplete, this, false);
            lib.on($EResEventName.PROGRESS, this.onProgress, this, false);
            lib.on($EResEventName.ERROR, this.onResError, this, false);
        }
        this._libs[lib.bunName] = lib;
    }
    public getCacheLib(bunName: string): $ResCacheLib {
        var lib: $ResCacheLib = this._libs[bunName];
        if (lib) {
            return lib;
        }
        if (bunName == _SystemBundleName.REMOTE) {
            lib = new $ResRemoteCacheLib();
        } else {
            let module = ConfigMgr.getModuleConfigByCode(bunName);
            if (!module || !module.isRemote) {
                lib = new $ResCacheLib(bunName);
            } else {
                lib = new $BundleCacheLib(bunName);
            }
        }
        this._libs[bunName] = lib;
        lib.on($EResEventName.COMPLETE, this.onResComplete, this, false);
        lib.on($EResEventName.PROGRESS, this.onProgress, this, false);
        lib.on($EResEventName.ERROR, this.onResError, this, false);
        return lib;
    }
    start(): any {
    }
    destroy(): void {

    }
    releaseLib(bunName: string): void {
        let lib: $ResCacheLib = this._libs[bunName];
        if (lib) {
            lib.release();
            this._libs[bunName] = null
        }
    }
    get isValid(): boolean {
        return true;
    }
    /**
    * 增加监听者
    * @param listener 
    */
    addListener(listener: zmg.IResListener, libs: zmg.IResCacheLib, bunName?: string, path?: string | string[], isDir?: boolean): void {
        let list = this.initListener(listener, libs, bunName, path, isDir);
        list && this._listeners.push(list);
    }
    private initListener(listener: zmg.IResListener, libs: zmg.IResCacheLib, bunName?: string, path?: string | string[], isDir?: boolean): zmg.IResListener {
        if (listener) {
            listener.libs = libs;
            /**
             * 外部可能一个lister监听多个下载回调
             * 所以需要保证克隆出来
             */
            if (listener.path == null) {
                listener.path = path;
            } else {
                listener = listener.clone();
                listener.path = path;
            }
            // listener.path = path;
            listener.isDir = isDir;
            listener.bunName = bunName;
        }
        return listener;
    }
    /**
     * 移除监听者
     * @param target 
     */
    removeLister(target: any | zmg.IResListener): void {

    }

    /**
     * 下载资源
     * @param bundle 
     * @param path 
     * @param listener 
     */
    public load(bunName: string, path: string | string[], handlerOrListener: any, target?: any, type?: any): void {
        if (handlerOrListener instanceof $ResListener) {
            this.$$load(bunName, path, handlerOrListener, type);
        } else {
            this.$load(bunName, path, handlerOrListener, target, type);
        }
    }
    private $load(bunName: string, path: string | string[], handler: (assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void, target: any, type?: typeof cc.Asset): void {
        this.$$load(bunName, path, new $ResListener(target, handler), type);
    }
    private $$load(bunName: string, path: string | string[], listener?: zmg.IResListener, type?: any): void {
        if (!path) {
            gWarn("资源地址未定义，无法加载文件!");
            return;
        }
        this._load(bunName, path, false, listener, type);
    }
    // public $loadAny(param: zmg.IResAsset | string, handler?: (assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void, target?: any, path?: string, type?: typeof cc.Asset): void {
    //     this.loadAny(param, new ResListener(target, handler), path, type);
    // }
    // loadAny(param: zmg.IResAsset | string, listener?: zmg.IResListener, path?: string, type?: typeof cc.Asset): void {
    //     if (typeof (param) == "string") {
    //         if (StringUtil.isHttp(param)) {
    //             this.loadRemote(param, listener, type);
    //         } else {
    //             this.load(param, path, listener, type);
    //         }
    //     } else {
    //         this.loadRes(param, listener, type);
    //     }
    // }
    /**
     * 下载资源
     * @param res 
     * @param handler 
     * @param target 
     * @param type 
     */
    public loadRes(res: zmg.IResAsset, handlerOrListener: any, target?: any, type?: typeof cc.Asset): void {
        if (handlerOrListener instanceof $ResListener) {
            this.$$loadRes(res, handlerOrListener, type);
        } else {
            this.$loadRes(res, handlerOrListener, target, type);
        }
    }
    private $loadRes(res: zmg.IResAsset, handler?: (assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void, target?: any, type?: typeof cc.Asset): void {
        this.$$loadRes(res, new $ResListener(target, handler), type);
    }
    private $$loadRes(res: zmg.IResAsset, listener?: zmg.IResListener, type?: typeof cc.Asset): void {
        if (!res || !StringUtil.isValid(res.bunName) || !StringUtil.isValid(res.path)) {
            gWarn("资源不明确，无法加载文件!", res);
            return;
        }
        this._load(res.bunName, res.path, false, listener, type);
    }
    /**
     * 下载场景
     * @param bunName 
     * @param path 
     * @param handler 
     * @param target 
     */
    public loadScene(bunName: string, path: string, handler?: any, target?: any): void {
        if (handler instanceof $ResListener) {
            this.$$loadScene(bunName, path, handler);
        } else {
            this.$loadScene(bunName, path, handler, target);
        }
    }
    private $loadScene(bunName: string, path: string, handler?: (assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void, target?: any): void {
        this.$$loadScene(bunName, path, new $ResListener(target, handler));
    }
    private $$loadScene(bunName: string, path: string, listener?: zmg.IResListener): void {
        if (!path) {
            gWarn("资源地址未定义，无法加载场景!");
            return;
        }
        // let lib: ResCacheLib = this.getCacheLib(bunName);
        // this._loadLunch(bunName, path, false, cc.SceneAsset);
        // this.addListener(listener, lib, bunName, path);
        this._load(bunName, path, false, listener, cc.SceneAsset);
    }

    /**
     * 下载目录内资源
     * @param resName 
     * @param path 
     * @param listener 
     */
    public loadDir(bunName: string, path: string | string[], handler?: any, target?: any, type?: typeof cc.Asset): void {
        if (handler instanceof $ResListener) {
            this.$$loadDir(bunName, path, handler, target);
        } else {
            this.$loadDir(bunName, path, handler, target, type);
        }
    }
    private $loadDir(bunName: string, path: string | string[], handler?: (assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void, target?: any, type?: typeof cc.Asset): void {
        this.$$loadDir(bunName, path, new $ResListener(target, handler), type);
    }
    private $$loadDir(bunName: string, path: string | string[], listener?: zmg.IResListener, type?: typeof cc.Asset): void {
        if (!path) {
            gWarn("资源地址未定义，无法加载目录!");
            return;
        }
        this._load(bunName, path, true, listener, type);
    }

    /**
     * 下载bundle龙骨资源
     * @param resName 
     * @param path 
     * @param listener 
     */
    public loadDragon(bunName: string, path: zmg.IDragonResAsset | string, handler?: any, target?: any): void {
        if (handler instanceof $DragonResListener) {
            this.$$loadDragon(bunName, path, handler);
        } else {
            this.$loadDragon(bunName, path, handler, target);
        }
    }
    private $loadDragon(bunName: string, path: zmg.IDragonResAsset | string, handler?: (assets: DragonAsset, listener?: zmg.IResListener) => void, target?: any): void {
        this.$$loadDragon(bunName, path, new $DragonResListener(target, handler));
    }
    private $$loadDragon(bunName: string, path: zmg.IDragonResAsset | string, listener?: $DragonResListener): void {
        if (!path) {
            gWarn("资源地址未定义，无法加载");
            return;
        }
        if (!listener) {
            listener = new $DragonResListener(this, null, null, null);
        }
        if (typeof (path) == "string") {
            path = new $DragonResAsset(path);
        }
        if (path.isDir()) {
            this._load(bunName, path.dir, true, listener);
        } else {
            this._load(bunName, [path.asset, path.atlas, path.tex], false, listener);
        }
    }

    /**
     * 下载远程资源
     * @param path 
     * @param listener 
     */
    public loadRemote(path: string | string[], handler?: any, target?: any, type?: typeof cc.Asset): void {
        if (handler instanceof $ResListener) {
            this.$$loadRemote(path, handler, type);
        } else {
            this.$loadRemote(path, handler, target, type);
        }
    }
    private $loadRemote(path: string | string[], handler?: (assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void, target?: any, type?: typeof cc.Asset): void {
        this.$$loadRemote(path, new $ResListener(target, handler), type);
    }
    private $$loadRemote(path: string | string[], listener?: zmg.IResListener, type?: typeof cc.Asset): void {
        this._load(_SystemBundleName.REMOTE, path, false, listener, type);
    }

    /**
     * 下载远程龙骨资源
     * @param path 
     * @param listener 
     */
    public loadDragonRemote(path: zmg.IDragonResAsset, handler?: any, target?: any): void {
        if (handler instanceof $DragonResListener) {
            this.$$loadDragonRemote(path, handler);
        } else {
            this.$loadDragonRemote(path, handler, target);
        }
    }
    private $loadDragonRemote(path: zmg.IDragonResAsset, handler?: (assets: DragonAsset, listener?: zmg.IResListener) => void, target?: any): void {
        this.$$loadDragonRemote(path, new $DragonResListener(target, handler));
    }
    private $$loadDragonRemote(path: zmg.IDragonResAsset, listener?: $DragonResListener): void {
        if (path.isDir()) {
            gWarn("远程资源无法按照目录加载");
            return;
        }
        this._load(_SystemBundleName.REMOTE, [path.atlas, path.asset, path.tex], false, listener, [cc.TextAsset, cc.TextAsset]);
    }

    async isVaildAsset(bunName: string, path: string): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            cc.assetManager.loadBundle(bunName, (err, bundle: cc.AssetManager.Bundle) => {
                if (err) {
                    gLog("资源下载错误:" + bunName);
                    reject("bunName: " + bunName + " 不存在！");
                } else {
                    gLog("模块配置表已下载，bundleName: " + bunName);
                    let info: Record<string, any> = bundle.getInfoWithPath(path);
                    if (info) {
                        resolve && resolve(info);
                    } else {
                        reject("bunName: " + bunName + " path:" + path + " 不存在!");
                    }
                }
            });
        });
    }

    /**
     * 清理所有缓存
     */
    clearCache(): void {

    }
    /**
     * 按照bundle清理缓存
     * @param resName 
     */
    clearBundleCache(resName: string): void {

    }

    async _load(bunName: string, path: string | string[], isDir: boolean, listener?: zmg.IResListener, type?: typeof cc.Asset | typeof cc.Asset[]) {
        let evt: $ResEvent;
        let isLoaded: boolean = true;
        let resAsset: cc.Asset | cc.Asset[];
        let lib: $ResCacheLib = this.getCacheLib(bunName);
        await lib.init();
        if (path instanceof Array) {
            let i: number;
            resAsset = [];
            let len: number = path.length;
            for (i = 0; i < len; i++) {
                let assets: cc.Asset | cc.Asset[] = lib.getAsset(path[i], isDir);
                if (cc.isValid(assets)) {
                    resAsset = resAsset.concat(assets);
                    evt = new $ResEvent($EResEventName.COMPLETE, bunName, path[i], assets);
                    this.onResComplete(evt);
                } else {
                    if (assets) {
                        //正在加载中....
                        //或者其中存在错误资源...
                        if (assets == ResErrorAsset) {
                            evt = new $ResEvent($EResEventName.ERROR, bunName, path[i], null);
                            this.onResError(evt);
                        }
                    } else {
                        this._loadLunch(bunName, path[i], isDir, (type instanceof Array) ? type[i] : type);
                        isLoaded = false;
                    }
                }
            }
        } else {
            resAsset = lib.getAsset(path, isDir);
            if (cc.isValid(resAsset)) {
                evt = new $ResEvent($EResEventName.COMPLETE, bunName, path, resAsset);
                this.onResComplete(evt);
            } else {
                if (resAsset) {
                    if (resAsset == ResErrorAsset) {
                        evt = new $ResEvent($EResEventName.ERROR, bunName, path, null);
                        this.onResError(evt);
                    } else {
                        //资源被销毁，需要重新加载
                        this._loadLunch(bunName, path, isDir, type as typeof cc.Asset);
                        isLoaded = false;
                    }
                } else {
                    this._loadLunch(bunName, path, isDir, type as typeof cc.Asset);
                    isLoaded = false;
                }
            }
        }
        if (isLoaded) {
            //加载完毕
            let list = this.initListener(listener, lib, bunName, path, isDir);
            list && list.onLaunch();
        } else {
            //加载中...
            this.addListener(listener, lib, bunName, path, isDir);
            (resAsset instanceof Array) && (resAsset.length = 0);
        }
    }
    private _loadLunch(bunName: string, path: string, isDir: boolean, type: typeof cc.Asset): void {
        let evt: $ResEvent;
        let lib: $ResCacheLib = this.getCacheLib(bunName);
        // let loadAssets: cc.Asset | cc.Asset[];
        // loadAssets = lib.getAsset(path);
        // if (loadAssets) {
        //     //资源已下载完毕
        //     if (cc.isValid(loadAssets)) {
        //         evt = new ResEvent(EResEventName.COMPLETE, bunName, path, loadAssets);
        //         this.onResComplete(evt);
        //     } else {
        //         //非法资源
        //         evt = new ResEvent(EResEventName.ERROR, bunName, path, loadAssets);
        //         this.onResError(evt);
        //     }
        // } else {
        //等待资源下载...
        lib.loadAsset(path, isDir, type);
        // }
    }

    private onResComplete(evt: $ResEvent): void {
        this.dispatchEvent(evt);
        this.onResLunch(this.findListener(evt.bunName, evt.path, false, true), evt.assets);
    }
    protected onProgress(evt: $ResEvent): void {
        let listners = this.findListener(evt.bunName, evt.path, false, true);
        if (listners) {
            let i: number;
            let len: number = listners.length;
            for (i = 0; i < len; i++) {
                listners[i].onProgress(evt.path as string, evt.finish, evt.total);
            }
        }
    }

    private onResError(evt: $ResEvent): void {
        this.dispatchEvent(evt);
        let list = this.findListener(evt.bunName, evt.path, false, true);
        let i: number;
        let len: number = list.length;
        for (i = 0; i < len; i++) {
            list[i].onError(evt.path);
        }
    }
    private onResLunch(listeners: zmg.IResListener[], asset: cc.Asset | cc.Asset[]): void {
        let i: number;
        let listener: zmg.IResListener;
        let len: number = listeners.length;
        for (i = len - 1; i >= 0; i--) {
            listener = listeners[i];
            if (listener) {
                //全部下载都进行过尝试
                let assets: cc.Asset[] | cc.Asset;
                if ((listener.path instanceof Array)) {
                    let tas = listener.getAsset() as cc.Asset[];
                    if (tas && tas.length == listener.path.length) {
                        assets = tas;
                    }
                } else {
                    assets = asset;
                }
                if (assets) {
                    this._listeners.splice(this._listeners.indexOf(listener), 1);
                    let evt = listener.onLaunch(assets);
                    if (evt) {
                        this.dispatchEvent(evt);
                    }
                }
            }
        }
    }
    private findListener(bunName: string, path: string | string[], isDelete: boolean = true, isInclude = false): zmg.IResListener[] {
        let i: number;
        let bool: boolean;
        let listener: zmg.IResListener;
        let resListener: zmg.IResListener[] = [];
        let len: number = this._listeners.length;
        for (i = len - 1; i >= 0; i--) {
            listener = this._listeners[i];
            if (cc.isValid(listener.target)) {
                if (listener.bunName == bunName) {
                    bool = listener.path == path;
                    if (!bool && isInclude) {
                        if (listener.path instanceof Array) {
                            bool = (listener.path.indexOf(path as string) != -1);
                        }
                    }
                    if (bool) {
                        if (isDelete) this._listeners.splice(i, 1);
                        resListener.push(listener);
                    }
                }
            } else {
                this._listeners.splice(i, 1);
            }
        }
        return resListener;
    }
}