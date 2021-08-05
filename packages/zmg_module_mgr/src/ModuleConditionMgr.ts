import { BaseMgr } from "zmg_mgr";
import { gLog } from "zmg_util";
import { ModuleState } from "zmg_module_mgr";
import { ModuleMgr } from "zmg_module_mgr/src/ModuleMgr";

export class ModuleConditionMgr extends BaseMgr implements zmg.IModuleConditionMgr {

    private _isWait: boolean;
    private _checkTimeId: number;
    private _libs: Record<string, zmg.IModuleCondition>;
    constructor() {
        super();
    }
    async start() {
        super.start();
        this._libs = {};
    }
    public destroy(): void {
        this._libs = null;
    }
    public get isValid(): boolean {
        return this._libs ? true : false;
    }

    public addCondition(cdn: zmg.IModuleCondition): void {
        this._libs[cdn.cfg.clsName] = cdn;
    }
    public removeCondition(name: string): void {
        delete this._libs[name];
    }
    public getConditionByName(value: string): zmg.IModuleCondition {
        return this._libs[value];
    }
    /**
     * 移除约束条件
     */
    public removeConditionById(id: string): void {
        delete this._libs[this.getConditionById(id).cfg.clsName];
    }
    public getConditionById(id: string): zmg.IModuleCondition {
        let lib: Record<string, zmg.IModuleCondition> = this._libs;
        for (const key in lib) {
            if (Object.prototype.hasOwnProperty.call(lib, key)) {
                const element = lib[key];
                if (element.cfg.id == id) {
                    return element;
                }
            }
        }
        return null;
    }
    public getConditionsByCfg(cfg: zmg.IModuleConfig): { condion: zmg.IModuleCondition, param: any }[] {
        let lib: Record<string, zmg.IModuleCondition> = this._libs;
        let resuts: { condion: zmg.IModuleCondition, param: any }[] = [];
        for (const key in lib) {
            if (Object.prototype.hasOwnProperty.call(lib, key)) {
                const element = lib[key];
                cfg.conditions.forEach((c: {
                    clsName: string;
                    param: object;
                }) => {
                    if (element.cfg.clsName == c.clsName) {
                        resuts.push({ condion: element, param: c.param });
                    }
                });
            }
        }
        return resuts;
    }

    async check(cfg: zmg.IModuleConfig): Promise<ModuleState> {
        let state: ModuleState;
        if (cfg == null) {
            state = new ModuleState();
            state.failed(null, "模块为空，无法开启!");
            return Promise.reject(state);
        }
        //模块开关
        if (cfg.isClose) {
            state = new ModuleState();
            state.failed(null, "当前模块配置表关闭:" + cfg.code);
            return Promise.reject(state);
        }
        this._isWait = false;
        let conditions: { condion: zmg.IModuleCondition, param: any }[] = this.getConditionsByCfg(cfg);
        // this._checkTimeId = Window.setInterval(this.updata.bind(this), 50);
        return new Promise<ModuleState>((resolve, reject) => {
            gLog("======== 检测项目: " + cfg.displayName + " ========");
            let interval = setInterval(() => {
                if (this._isWait) {
                    return;
                }
                let len: number = conditions.length;
                if (len) {
                    this._isWait = true;
                    let c: { condion: zmg.IModuleCondition, param: any } = conditions.pop();
                    c.condion.check(c.param).then(() => {
                        this._isWait = false;
                        gLog("Module, Name: " + cfg.code + "(" + cfg.displayName + ")" + "" +
                            " condionName: " + c.condion.cfg.clsName + "(" + c.condion.cfg.disName + ")" + " param:" + (c.param !== undefined ? c.param : c.condion.cfg.param));
                    }, () => {
                        this._isWait = false;
                        state = new ModuleState();
                        clearInterval(interval);
                        gLog("======== 当前模块检测未通过" + cfg.displayName + " ========");
                        state.failed(c, "ModuleName: " + cfg.code + "(" + cfg.displayName + ")" + "" +
                            " condionName: " + c.condion.cfg.clsName + "(" + c.condion.cfg.disName + ")" + " param:" + (c.param !== undefined ? c.param : c.condion.cfg.param));
                        reject(state);
                    })
                } else {
                    clearInterval(interval);
                    state = new ModuleState();
                    state.succeed("======== 检测通过,允许进入项目中: " + cfg.displayName + " ========");
                    resolve(state);
                }
            }, 50, cc.macro.REPEAT_FOREVER);
        });
    }

}
