import { ConfigMgr } from 'zmg_config_mgr'
import { EventMgr, EventName } from 'zmg_event_mgr';
import { BaseMgr } from 'zmg_mgr';
import { gLog, gWarn, StringUtil } from 'zmg_util'
import { ModuleConditionMgr } from './ModuleConditionMgr';
import { ModuleRecordMgr } from './ModuleRecordMgr';
import { ModuleState } from 'zmg_module_mgr';
import { DirectorMgr } from "zmg_controller";
import { AudioMgr } from "zmg_audio_mgr";
import { EnvMgr } from "zmg_env_mgr";
import { ModuleEvent } from './ModuleEvent';
import { AlertAsset, AlertMgr, UIMgr } from "zmg_ui_mgr";
class _ModuleMgr extends BaseMgr implements zmg.IModuleMgr {

    private static _instance: _ModuleMgr;
    static getInstance(): _ModuleMgr {
        if (!this._instance) {
            this._instance = new _ModuleMgr();
        }
        return this._instance;
    }
    /**
     * 链路存储器
     */
    private _record: ModuleRecordMgr;
    /**
     * 约束器
     */
    private _condition: ModuleConditionMgr;
    constructor() {
        super();
        this._record = new ModuleRecordMgr();
        this._condition = new ModuleConditionMgr();
    }

    async start() {
        super.start();
        this._record.start();
        this.condition.start();
        this.addEvents();
    }

    destroy() {
        super.destroy();
        this.removeEvents();
        this._record.destroy();
        this.condition.destroy();
    }

    get isValid(): boolean {
        return this.condition.isValid && this._record.isValid;
    }


    public get condition(): ModuleConditionMgr {
        return this._condition;
    }

    public get record(): ModuleRecordMgr {
        return this._record;
    }

    public async getConditionState(code: string): Promise<ModuleState> {
        let cfg = ConfigMgr.getModuleConfigByCode(code);
        return this._condition.check(cfg);
    }

    openByCode(code: string, param?: any, nowparam?: any): void {
        if (StringUtil.isValid(code)) {
            this.open(ConfigMgr.getModuleConfigByCode(code), param, nowparam);
        } else {
            gWarn("当前模块命为空，无法进入。");
        }
    }

    openById(id: number, param?: any, nowparam?: any): void {
        let moduleCfg = ConfigMgr.getModuleConfigById(id);
        if (moduleCfg) {
            this.open(moduleCfg, param, nowparam)
        } else {
            gWarn("当前模块id为空，无法进入。");
        }
    }

    open(cfg: zmg.IModuleConfig, param?: any, nowparam?: any, isback?: boolean): void {
        let moduleState: ModuleState;
        if (!cfg) {
            gWarn("当前模块配置信息为空，无法进入。");
            moduleState = new ModuleState();
            moduleState.failed(null, "当前模块配置信息为空，无法进入。");
            return;
        }
        let now: zmg.IModuleAsset = this._record.getNow();
        let nowCode: string = now ? now.code : "";
        if (nowCode == cfg.code) {
            //
            gWarn("模块相同，不用跳转");
            moduleState = new ModuleState();
            moduleState.failed(null, "模块相同，不用跳转");
            return;
        }
        let evt: ModuleEvent = new ModuleEvent(ModuleEvent.CHANGE, nowCode, cfg.code);
        this.dispatchEvent(evt);
        if (evt.isStopped()) {
            gLog("模块跳转行为被终止。");
            moduleState = new ModuleState();
            moduleState.failed(null, "模块跳转行为被终止。");
            return;
        }
        // if (cfg.isRemote && CC_PREVIEW) {
        //     UIMgr.toast.open("预览模式下无法进行远程模块预览。", 3);
        //     moduleState = new ModuleState();
        //     moduleState.failed(null, "模块跳转行为被终止。");
        //     return;
        // }
        UIMgr.mask.show("ChangeModule", 0);
        this._open(cfg, param, nowparam, isback);
    }
    private _open(cfg: zmg.IModuleConfig, param?: any, nowparam?: any, isback?: boolean): void {
        let state = this._condition.check(cfg);
        if (state) {
            state.then((state: ModuleState) => {
                //允许进入
                /**
                 * 先进行跳转，之后在进行record设置
                 */
                DirectorMgr.openConfig(cfg, param);
                gLog(state.message);
            }, (state: ModuleState) => {
                //失败进入
                gLog("=====约束条件判断无法进入======");
                gWarn(state.message);
                if (state.condition) {
                    state.condition.condion.catchHandler(state.condition.param);
                }
            });
        }
    }
    back(): void {
        let backItem: zmg.IModuleAsset = this._record.getLast();
        if (backItem) {
            let cfg = ConfigMgr.getModuleConfigByCode(backItem.code);
            this.open(cfg, backItem.param, null, true);
        } else {
            this.exit();
        }
    }
    refurbish(): void {
        let backItem: zmg.IModuleAsset = this._record.getNow();
        if (backItem) {
            let cfg = ConfigMgr.getModuleConfigByCode(backItem.code);
            this._open(cfg, backItem.param, null, true);
        }
    }
    exit(): void {
        EventMgr.dispatchEvent(new ModuleEvent(ModuleEvent.GAME_OVER));
        cc.game.end();
    }

    public dispatchEvent(evt: cc.Event): void {
        super.dispatchEvent(evt);
        EventMgr.dispatchEvent(evt);
    }
    private addEvents(): void {
        //预先判断防沉迷后，执行进入默认模块
        // EventMgr.once(EventName.CORE_READY, this.openDefault, this);
        EventMgr.on(EventName.UI_BACK_BTN, this.onUIBackBtn, this, false, -1);
    }
    private removeEvents(): void {
        // EventMgr.off(EventName.CORE_READY, this.openDefault, this);
        EventMgr.off(EventName.UI_BACK_BTN, this.onUIBackBtn, this);
    }
    public openDefault(): void {
        let module: zmg.IDefaultModuleAsset = EnvMgr.getDefaultModuleAsset();
        if (!module) {
            gWarn("当前未获取到默认进入模块...");
            return;
        }
        if (module.auto) {
            this.openByCode(module.code, module.param);
        } else {
            UIMgr.alert.open(new AlertAsset("开始游戏初始化...", () => {
                this.openByCode(module.code, module.param);
            }, null, "确定", "取消", this));
        }
    }
    /**
     * 点击左上角按钮返回
     */
    private onUIBackBtn(evt: cc.Event): void {
        if (!evt.isStopped()) {
            this.back();
        }
    }
}

export let ModuleMgr: _ModuleMgr = _ModuleMgr.getInstance();