import { ConfigMgr } from "zmg_config_mgr";
import { gWarn } from "zmg_util";
import { $ResCacheLib } from "./ResCacheLib";

export class $BundleCacheLib extends $ResCacheLib {
    constructor(bunName: string) {
        super(bunName);
    }
    clear() {
        if (this._bundle) {
            this._bundle.releaseAll();
            cc.assetManager.removeRemoteBundle(this._bundle);
            this._bundle = null;
        }
    }
    public getRemoteUrl(): string {
        return ConfigMgr.bundlePrefix + "/" + this.bunName + "/" + ConfigMgr.publishKey + "/";
    }
    public loadBundle(): Promise<cc.AssetManager.Bundle> {
        var bun: cc.AssetManager.Bundle = cc.assetManager.getBundle(this.bunName);
        if (bun) {
            return Promise.resolve(bun);
        }
        if (this._promise) {
            return this._promise;
        }
        return this._promise = new Promise<cc.AssetManager.Bundle>((resolve, reject) => {
            let url: string = this.getRemoteUrl();
            cc.assetManager.loadRemote(url + ConfigMgr.bundleFilePath + "?time=" + new Date().valueOf(), (err, data: cc.JsonAsset) => {
                //当前版本的描述文件
                if (err) {
                    gWarn("当前模块无版本文件:" + this.bunName);
                    reject && reject(this.bunName);
                } else {
                    let list: { version: string, time: string, tips: string, checked: boolean }[] = data.json;
                    let i: number;
                    let version: string = "";
                    let len: number = list.length;
                    for (i = 0; i < len; i++) {
                        if (list[i].checked) {
                            version = list[i].version;
                            break;
                        }
                    }
                    if (version == "") {
                        gWarn("当前模块无版本描述:" + this.bunName);
                    }
                    cc.assetManager.loadRemoteBundle(url, { version: version }, (err, bundle) => {
                        if (err) {
                            reject && reject(this.bunName);
                        } else {
                            this._bundle = bundle;
                            resolve && resolve(bundle);
                        }
                        this._promise = null;
                    })
                }
            });
        });
    }
}