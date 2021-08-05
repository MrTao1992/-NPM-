import { ConfigMgr } from "zmg_config_mgr";
import { DirectorMgr } from "zmg_controller";
import { EEventIndex, EventMgr, EventName } from "zmg_event_mgr";
import { BaseMgr } from "zmg_mgr"
import { ResMgr, SystemBundleName } from "zmg_res_mgr";
import { gWarn } from "zmg_util";

export class ModuleRecordMgr extends BaseMgr implements zmg.IModuleRecordMgr {
    private _assets: zmg.IModuleAsset[];
    constructor() {
        super();
    }
    async start() {
        super.start();
        this._assets = [];
        EventMgr.on(EventName.CONTROLLER_CHANGE_END, this.onChangeEnd, this, false, EEventIndex.ModuleRecord);
    }
    destroy() {
        this._assets = null;
        EventMgr.off(EventName.CONTROLLER_CHANGE_END, this.onChangeEnd, this);
    }
    private onChangeEnd(): void {
        let oldLast: zmg.IModuleAsset = this.getLast();
        let old: zmg.IModuleAsset = this.getNow();
        let now: zmg.IModuleConfig = DirectorMgr.nowConfig;
        if (old && now) {
            if (old.code !== now.code) {
                if (oldLast && oldLast.code !== now.code) {
                    ResMgr.releaseLib(oldLast.code);
                }
                if (now && this._assets[this._assets.length - 2] && this._assets[this._assets.length - 2].code == now.code) {
                    this.back();
                } else {
                    if (now.isNav) {
                        this.setNow({ code: now.code, param: DirectorMgr.nowParam }, null);
                    }
                }
            }
        } else {
            if (now && now.isNav) {
                this.setNow({ code: now.code, param: DirectorMgr.nowParam }, null);
            }
        }

    }

    get isValid(): boolean {
        return this._assets ? true : false;
    }
    public getLast(): zmg.IModuleAsset {
        let len = this._assets.length;
        if (len < 1) {
            return null;
        }
        if (len < 2) {
            return null;
        }
        let last: zmg.IModuleAsset = this._assets[len - 2];
        return last;
    }
    public back(): void {
        let len = this._assets.length;
        if (len >= 2) {
            this._assets.length = len - 1;
        }
    }

    /**
     * 设置当前链路最新
     */
    public setNow(module: zmg.IModuleAsset, saveparam?: any) {
        if (saveparam) {
            let last = (this._assets[this._assets.length - 1]);
            last && (last.param = saveparam);
        }
        this._assets.push(module);
    }
    /**
     * back的时候 无法准确获取当前模块，所以必须单独存储
     */
    public getNow(): zmg.IModuleAsset {
        let now = this._assets ? this._assets[this._assets.length - 1] : null;
        // let config = now ? ConfigMgr.getModuleConfigByCode(now.code) : null;
        return now;
    }

    public getNowConfig(): zmg.IModuleConfig {
        let now = this.getNow();
        if (now) {
            return ConfigMgr.getModuleConfigByCode(now.code);
        }
        return null;
    }
    /**
     * 清除所有链路
     */
    public clear(): void {
        this._assets.length = 0;
    }
    /**
     * 获取主页链路
     */
    public getMain(): zmg.IModuleAsset {
        return null;
    }
}