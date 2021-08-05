import { $ResCacheLib } from "./ResCacheLib";

import { gError, gWarn } from "zmg_util";
import { _SystemBundleName } from "./SystemBundleName";
import { $ResUtil } from "./ResUtils";
export class $ResRemoteCacheLib extends $ResCacheLib {
    protected assetsList: Record<string, cc.Asset | cc.Asset[]> = {};
    constructor() {
        super(_SystemBundleName.REMOTE);
    }
    async init(): Promise<void> {
        return Promise.resolve();
    }

    clear() {
        // for (const key in this.assetsList) {
        //     if (Object.prototype.hasOwnProperty.call(this.assetsList, key)) {
        //         const element = this.assetsList[key];
        //         this.releaseAsset(element)
        //     }
        // }
        // this.assetsList = {}
    }
    releaseAsset(asset: cc.Asset | cc.Asset[]) {
        if (asset instanceof cc.Asset) {
            cc.assetManager.releaseAsset(asset)
        }
        if (asset instanceof Array) {
            for (let index = 0; index < asset.length; index++) {
                const element = asset[index];
                this.releaseAsset(element)
            }
        }
    }

    setAsset(path: string, asset: cc.Asset | cc.Asset[]): void {
        if (asset instanceof cc.SceneAsset) {
            return;
        }
        $ResUtil.setPremultiplyAlpha(asset);
        this.assetsList[path] = asset;
    }
    getAsset(path: string): cc.Asset | cc.Asset[] {
        let assets: cc.Asset | cc.Asset[] = this.assetsList[path];
        if ($ResUtil.isValidAsset(assets)) {
            return assets;
        }
        return null;
    }


    loadAsset(path: string, isDir: boolean, type: typeof cc.Asset): void {
        if (!path) {
            gWarn("资源地址未定义，无法加载");
            return;
        }
        if (isDir) {
            gError("远程地址，无法按照文件夹形式下载资源");
            return;
        }
        let key: string;
        if (type) {
            switch (type) {
                case cc.TextAsset:
                    key = ".txt";
                    break;
                case cc.JsonAsset:
                    key = ".json";
                    break;
                case cc.Texture2D:
                    key = ".png";
                    break;
                case cc.Font:
                    key = ".ttf";
                    break;
            }
        }
        if (key) {
            cc.assetManager.loadRemote(path, { ext: key }, this._onLaunch.bind(this, path, type));
        } else {
            cc.assetManager.loadRemote(path, this._onLaunch.bind(this, path, null));
        }
    }
}