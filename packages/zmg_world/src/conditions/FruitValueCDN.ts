import { BaseModuleCDN } from "zmg_module_mgr";
import { gLog } from "zmg_util";
import { _UserMgr } from "../userdatas/UserMgr";
export class FruitValueCDN extends BaseModuleCDN implements zmg.IModuleCondition {
    async check(param?: any): Promise<any> {
        param = param !== undefined ? param : this._cfg.param;
        if (_UserMgr.getInstance().fruitValue > param) {
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    }

    public get isValid(): boolean {
        return _UserMgr.getInstance().isValid;
    }

    public catchHandler(param?: any): boolean {
        gLog("异常处理能量不足消息...");
        return super.catchHandler(param);
    }
}