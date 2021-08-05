import { ConfigMgr } from "zmg_config_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import { gLog, gWarn } from "zmg_util";
import { ModuleMgr } from "./ModuleMgr";

export class BaseModuleCDN implements zmg.IModuleCondition {
    protected _cfg: zmg.IConditionConfig;
    protected _clsName: string;
    /**
     *  get clsName
     */
    public get clsName(): string {
        return this._clsName;
    }
    public get cfg(): zmg.IConditionConfig {
        return this._cfg;
    }
    constructor(clsName: string) {
        this._clsName = clsName;
        EventMgr.on(EventName.CORE_READY, this.onCoreReady, this, false, Number.MAX_SAFE_INTEGER);
    }
    catchHandler(param?: any): boolean {
        return false;
    }
    /**
     * 初始化配置
     * @param cfg 
     */
    public init(cfg: zmg.IConditionConfig): void {
        this._cfg = cfg;
    }
    /**
    * 是否检测通过
    */
    public check(param?: any): Promise<any> {
        return Promise.reject();
    }
    /**
     * 检查器是否准备完毕，可以进行工作
     */
    public get isVaild(): boolean {
        return false;
    }

    protected onCoreReady(): void {
        let i: number;
        let len: number = ConfigMgr.conditionConfig.length;
        for (i = 0; i < len; i++) {
            if (ConfigMgr.conditionConfig[i].clsName == this.clsName) {
                this.init(ConfigMgr.conditionConfig[i]);
                break;
            }
        }
        if (this._cfg) {
            ModuleMgr.condition.addCondition(this);
            gLog("约束条件已添加:" + this.clsName);
        } else {
            gWarn("约束条件配置表信息未找到:" + this.clsName);
        }
    }
}
