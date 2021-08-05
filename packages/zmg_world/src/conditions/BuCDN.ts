import { ConfigMgr } from "zmg_config_mgr";
import { BaseModuleCDN } from "zmg_module_mgr";
import { gLog } from "zmg_util";
export class BuCDN extends BaseModuleCDN implements zmg.IModuleCondition {
    async check(param?: any): Promise<any> {
        let bool: boolean = false;
        let nowBu = ConfigMgr.getBu();
        param = param !== undefined ? param : this._cfg.param;
        if (param instanceof Array) {
            if (param.indexOf(ConfigMgr.getBu()) == -1) {
                bool = false;
            } else {
                bool = true;
            }
        } else {
            bool = param == nowBu;
        }
        if (bool) {
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    }

    public get isValid(): boolean {
        return true;
    }

    public catchHandler(param?: any): boolean {
        gLog("异常处理能量不足消息...");
        return super.catchHandler(param);
    }
}