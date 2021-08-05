import { $, gLog, gWarn } from 'zmg_util';
import { $ResEvent } from "./ResEvent";
import { $EResEventName } from "./EResEventName";
import { ResErrorAsset } from "./assets/ResErrorAsset";
import { ECode } from "./common/ECode";
import { ResLoadingAsset } from "./assets/ResLoadingAsset";
import { _SystemBundleName } from './SystemBundleName';
import { _ResMgr } from './ResMgr';
import { $ResUtil } from './ResUtils';

export class $ResCacheLib extends cc.EventTarget implements zmg.IResCacheLib {
    public bunName: string;
    protected _bundle: cc.AssetManager.Bundle;
    protected _promise: Promise<cc.AssetManager.Bundle>;
    public get name(): string {
        return this.bunName;
    }
    constructor(bunName: string) {
        super();
        this.bunName = bunName;
    }
    async init(): Promise<void> {
        if (this._bundle) {
            return Promise.resolve();
        } else {
            return new Promise<void>((resolve, reject) => {
                this.loadBundle().then((b: cc.AssetManager.Bundle) => {
                    this._bundle = b;
                    resolve && resolve();
                }, () => {
                    gLog("当前bundle初始化失败:" + this.bunName);
                    reject && reject();
                });
            });
        }
    }
    public release(): void {
        this.clear();
    }
    isRemote(): boolean {
        return this.bunName == _SystemBundleName.REMOTE;
    }
    clear() {
        if (this._bundle) {
            this._bundle.releaseAll();
            cc.assetManager.removeBundle(this._bundle);
            cc.js.clearBundle(this._bundle.name);
            this._bundle = null;
        }
    }
    getBundle(): cc.AssetManager.Bundle {
        return this._bundle;
    }
    /**
     * 有就返回，没有就加载等事件
     * @param path 
     */
    loadAsset(path: string, isDir: boolean, type: typeof cc.Asset): void {
        if (!this._bundle) {
            this.errorBundleFun(path, this.bunName);
            return;
        }
        let assets: cc.Asset | cc.Asset[] = this.getAsset(path, isDir);
        if (!assets) {
            this._bundle && this.onLaunch(path, isDir, type, this._bundle);
        } else {
            console.log("当前资源已加载");
        }
    }
    getAsset(path: string, isDir: boolean): cc.Asset | cc.Asset[] {
        let assets: cc.Asset | cc.Asset[];
        if (isDir) {
            let infos: Record<string, any>[] = this._bundle.getDirWithPath(path);
            let i: number;
            let a: cc.Asset;
            assets = [];
            let len: number = infos.length;
            for (i = 0; i < len; i++) {
                a = this._bundle.getByInfo(infos[i]);
                if (!a) {
                    assets.length = 0;
                    assets = null;
                    break;
                }
                assets.push(a);
            }
        } else {
            assets = this._bundle.get(path);
        }
        return assets;
    }

    /**
     * 预处理
     * prefab类型资源需要字体替换
     * 图片类资源需要设置透明度
     * @param path 
     * @param asset 
     */
    setAsset(path: string, asset: cc.Asset | cc.Asset[]): void {
        if (asset instanceof cc.SceneAsset) {
            return;
        }
        if (asset instanceof cc.Prefab) {
            return;
        }
        $ResUtil.setPremultiplyAlpha(asset);
    }

    // public assetHandle(asset: cc.Asset): void {
    //     if (asset instanceof cc.Prefab) {
    //         FontMgr.updateFont(asset);
    //     }
    // }

    public loadBundle(): Promise<cc.AssetManager.Bundle> {
        var bun: cc.AssetManager.Bundle = cc.assetManager.getBundle(this.bunName);
        if (bun) {
            return Promise.resolve(bun);
        }
        if (this._promise) {
            return this._promise;
        }
        return this._promise = new Promise<cc.AssetManager.Bundle>((resolve, reject) => {
            cc.assetManager.loadBundle(this.bunName, null, (err, bundle) => {
                if (err) {
                    reject && reject(this.bunName);
                } else {
                    resolve && resolve(bundle)
                }
                this._promise = null;
            })
        });
    }

    private errorBundleFun(path: string, bunName: string,): void {
        this.setAsset(path, ResErrorAsset);
        this.dispatchEvent(new $ResEvent($EResEventName.ERROR, bunName, path));
    }
    private errorFun(path: string, error: Error): void {
        gWarn($(ECode.DOWN_BUNDLE_ERROR, this.bunName, path, error.message));
        this.setAsset(path, ResErrorAsset);
        this.dispatchEvent(new $ResEvent($EResEventName.ERROR, this.bunName, path));
    }
    private onComplete(path: string, assets: cc.Asset | cc.Asset[]): void {
        this.setAsset(path, assets);
        this.dispatchEvent(new $ResEvent($EResEventName.COMPLETE, this.bunName, path, assets));
    }
    private onLaunch(path: string, isDir: boolean, type: typeof cc.Asset, bundle: cc.AssetManager.Bundle): void {
        gLog("开始加载资源：" + this.bunName + " path:" + path);
        // this.setAsset(path, ResLoadingAsset);
        if (isDir) {
            //认为是目录结构    
            if (type) {
                bundle.loadDir(path, type, this._onLaunch.bind(this, path, type));
            } else {
                bundle.loadDir(path, this._onLaunch.bind(this, path, null));
            }
        } else {
            if (type) {
                if (type == cc.SceneAsset) {
                    bundle.loadScene(path, this._onLoadSceneProgress.bind(this, path), this._onLaunch.bind(this, path, null));
                } else {
                    bundle.load(path, type, this._onLoadProgress.bind(this, path), this._onLaunch.bind(this, path, type));
                }

            } else {
                bundle.load(path, this._onLoadProgress.bind(this, path), this._onLaunch.bind(this, path, null));
            }
        }
    }

    protected _onLoadSceneProgress(path: string, finish: number, total: number, item: cc.AssetManager.RequestItem): void {
        let evt: $ResEvent = new $ResEvent($EResEventName.PROGRESS, this.bunName, path);
        evt.finish = finish;
        evt.total = total;
        this.dispatchEvent(evt);
    }

    protected _onLoadProgress(path: string, finish: number, total: number, item: cc.AssetManager.RequestItem): void {
        let evt: $ResEvent = new $ResEvent($EResEventName.PROGRESS, this.bunName, path);
        evt.finish = finish;
        evt.total = total;
        this.dispatchEvent(evt);
    }

    protected _onLaunch(path: string, type: typeof cc.Asset | null, err: Error, assets: cc.Asset | cc.Asset[]) {
        if (err) {
            this.errorFun(path, err);
            return;
        }
        if (assets instanceof Array && assets.length == 0) {
            this.errorFun(path, new Error("加载数组内容为空"));
            return;
        }
        gLog("资源加载成功：" + this.bunName + " path:" + path);
        let bool: boolean = true;
        if (type) {
            if (assets instanceof Array) {
                let i: number;
                let len: number = assets.length;
                for (i = 0; i < len; i++) {
                    if (!(assets[i] instanceof type)) {
                        gWarn("加载进来的数组资源有与内容规定类型不符情况出现：" + assets[i].nativeUrl);
                        bool = false;
                        break;
                    }
                }
            } else {
                if (!(assets instanceof type)) {
                    bool = false;
                    gWarn("加载进来的资源有与内容规定类型不符情况出现：" + assets["nativeUrl"]);
                }
            }
        }
        if (bool) {
            this.onComplete(path, assets);
        }
    }
}