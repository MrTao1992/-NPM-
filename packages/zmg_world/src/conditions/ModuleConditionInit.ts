import { HasPartnersCDN } from "./HasPartnersCDN";
import { FruitValueCDN } from "./FruitValueCDN";
import { ModuleGrayCDN } from "./ModuleGrayCDN";
import { BaseMgr } from "zmg_mgr";

/**
 * 增加所有模块约束条件
 */
export class _ModuleConditionInit extends BaseMgr implements zmg.IMgr {
    private static _instance: _ModuleConditionInit;
    static getInstance(): _ModuleConditionInit {
        if (!this._instance) {
            this._instance = new _ModuleConditionInit("ModuleConditionInit");
        }
        return this._instance;
    }

    async start() {
        new HasPartnersCDN("HasPartnersCDN");
        new FruitValueCDN("FruitValueCDN");
        new ModuleGrayCDN("ModuleGrayCDN");
    }
    get isValid() {
        return true;
    }
}