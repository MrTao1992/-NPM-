import { BaseModuleCDN, ModuleMgr } from "zmg_module_mgr";
import { _AppBundleName } from "../AppBundleName";
import { _UserMgr } from "../userdatas/UserMgr";
/**
 * 检查学伴信息约束条件
 */
export class HasPartnersCDN extends BaseModuleCDN implements zmg.IModuleCondition {
    /**
    * 是否检测通过
    */
    async check(param?: any): Promise<any> {
        let user = _UserMgr.getInstance();
        param = param !== undefined ? param : this._cfg.param;
        if (user.isAdoption == (param ? true : false)) {
            return Promise.resolve();
        } else {
            return Promise.reject();
        }
    }
    /**
     * 检查器是否准备完毕，可以进行工作
     */
    public get isValid(): boolean {
        return _UserMgr.getInstance().isValid;
    }
    public catchHandler(param?: any): boolean {
        //跳转模块
        if (param) {
            //需要学伴,当前不满足要求
            ModuleMgr.openByCode(_AppBundleName.RECEIVE_ROLE);
        } else {
            let asset: zmg.IModuleAsset = ModuleMgr.record.getMain();
            //不需要学伴方可进入，当前有学伴
            ModuleMgr.openByCode(asset.code, asset.param);
        }
        return super.catchHandler(param);
    }
}