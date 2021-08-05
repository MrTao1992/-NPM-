import { gWarn, gLog } from "zmg_util";
import { $ResEvent } from "./ResEvent";
import { _ResMgr } from "./ResMgr";
import { $ResUtil } from "./ResUtils";

export class $ResListener implements zmg.IResListener {
    /**
    * 要求监听对象
    */
    target: any;
    /**
     * 模块名
     */
    bunName: string;

    isDir: boolean;

    libs: zmg.IResCacheLib;
    /**
     * 路径
     */
    protected _path: string | string[];
    /**
     * 下载完成回调函数
     */
    launchFun: (assets: cc.Asset | cc.Asset[]) => void;
    /**
     * 下载错误回调
     */
    errorFun: (path: string) => void;
    /**
     * 下载进度
     */
    progressFun: (path: string, pro: number, total: number) => void;

    clone(): zmg.IResListener {
        let result = new $ResListener(this.target,
            this.launchFun,
            this.errorFun,
            this.progressFun);
        result.bunName = this.bunName;
        result.path = this.path;
        result.libs = this.libs;
        result.isDir = this.isDir;
        return result;
    }

    public set path(value: string | string[]) {
        this._path = value;
    }
    public get path(): string | string[] {
        return this._path;
    }

    constructor(target: any,
        onLaunch: (assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void,
        errorBack?: (path: string, listener?: zmg.IResListener) => void,
        progressFun?: (path: string, pro: number, total: number, listener?: zmg.IResListener) => void
    ) {
        this.target = target;
        this.launchFun = onLaunch;
        this.errorFun = errorBack;
        this.progressFun = progressFun;
    }

    /**
    * 完成后函数调用
    */
    public onLaunch(asset?: cc.Asset | cc.Asset[]): $ResEvent {
        if (!cc.isValid(this.target, true)) {
            //节点已被销毁
            gWarn("节点已被销毁，不进行加载回调！", this.target ? this.target.name : "");
            return null;
        }
        if (!this.launchFun) {
            return null;
        }
        let assets = asset ? asset : this.getAsset();
        if (assets) {
            this.launchFun.call(this.target, assets, this);
        }
        return null;
    }
    /**
    * 报错后函数调用
    */
    public onError(errorPath: string | string[]): boolean {
        if (cc.isValid(this.target, true) && this.errorFun) {
            this.errorFun.call(this.target, errorPath, this);
            return true;
        }
        return false;
    }
    /**
     * 进度中函数调用
     */
    public onProgress(path: string, pro: number, total: number): boolean {
        if (cc.isValid(this.target, true) && this.progressFun) {
            this.progressFun.call(this.target, path, pro, total, this);
            return true;
        }
        return false;
    }

    isValid(): boolean {
        if (!cc.isValid(this.target, true)) {
            //节点已被销毁
            return false;
        }
        let lib = this.libs;
        let asset: cc.Asset | cc.Asset[];
        if (this.path instanceof Array) {
            let i: number;
            let len: number = this.path.length;
            for (i = 0; i < len; i++) {
                asset = lib.getAsset(this.path[i], this.isDir);
                if (!$ResUtil.isValidAsset(asset)) {
                    return false;
                }
            }
        } else {
            asset = lib.getAsset(this.path, this.isDir);
            if (!$ResUtil.isValidAsset(asset)) {
                return false;
            }
        }
        return true;
    }

    public isLoaded(): boolean {
        if (!cc.isValid(this.target, true)) {
            //节点已被销毁
            return false;
        }
        let lib = this.libs;
        if (this.path instanceof Array) {
            let i: number;
            let len: number = this.path.length;
            for (i = 0; i < len; i++) {
                if (!lib.getAsset(this.path[i], this.isDir)) {
                    return false;
                }
            }
        } else {
            if (!lib.getAsset(this.path, this.isDir)) {
                return false;
            }
        }
        return true;
    }


    public getAsset(): cc.Asset | cc.Asset[] {
        // let lib: ResCacheLib = ResMgr.getCacheLib(this.bunName);
        let lib = this.libs;
        let assets: cc.Asset | cc.Asset[];
        if (this.path instanceof Array) {
            let i: number;
            assets = [];
            let len: number = this.path.length;
            for (i = 0; i < len; i++) {
                let item = lib.getAsset(this.path[i], this.isDir);
                if (!$ResUtil.isValidAsset(item)) {
                    //this.onError(this.path[i]);
                    return null;
                }
                assets = assets.concat(item);
            }
        } else {
            assets = lib.getAsset(this.path, this.isDir);
            if (!$ResUtil.isValidAsset(assets)) {
                //this.onError(this.path);
                return null;
            }
        }
        return assets;
    }
}