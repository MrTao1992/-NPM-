import { BaseMgr } from "zmg_mgr";
import { gLog } from "zmg_util";
import { ModuleMgr } from "zmg_module_mgr";
import { AudioRes, UIEvent, UIMgr } from "zmg_ui_mgr";
import { ConfigMgr } from "zmg_config_mgr";
import { ServerEvent, ServerMgr } from "zmg_webserver_mgr";
import { CoreEvent } from "./events/CoreEvent";
import { ECoreCode } from "./events/ECoreCode";
import { EnvMgr } from "zmg_env_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import { DirectorMgr } from "zmg_controller";
import { } from "zmg_module_mgr";
import { DataMgr, ELocalSystemKey } from "zmg_gamedata_mgr";
import { AudioMgr } from "zmg_audio_mgr";
import { ZMPerfCounter } from "./fps/ZMPerfCounter";
import { FrameCtrl } from "./fps/FrameCtrl";
class _ZmgCore extends BaseMgr implements zmg.IMgr {
    private static _instance: _ZmgCore;
    static getInstance(): _ZmgCore {
        if (!this._instance) {
            this._instance = new _ZmgCore();
        }
        return this._instance;
    }
    private _mgrRecord: Record<string, zmg.IMgr> = {};
    private _isInit: boolean;
    private _frameCtrl: FrameCtrl;
    public get frameCtrl(): FrameCtrl {
        return this._frameCtrl;
    }
    constructor() {
        super();
        this._mgrRecord = {
            //"env": EnvMgr,
            //"event": EventMgr,
            "audio": AudioMgr,
            "config": ConfigMgr,
            "server": ServerMgr,
            "module": ModuleMgr,
            "director": DirectorMgr,
            "data": DataMgr,
            "ui": UIMgr,
            "audioRes": AudioRes,
        }
        this._frameCtrl = new FrameCtrl();
    }
    public setMgr(key: string, mgr: zmg.IMgr): void {
        this._mgrRecord[key] = mgr;
    }
    public clearMgr(key: string): void {
        delete this._mgrRecord[key];
    }
    /**
    * 模块启动
    * 延迟返回async函数
    *
    */
    start(): any {
        EnvMgr.start();
        EventMgr.start();
        for (const key in this._mgrRecord) {
            if (Object.prototype.hasOwnProperty.call(this._mgrRecord, key)) {
                const element: zmg.IMgr = this._mgrRecord[key];
                element.start();
            }
        }
        this._mgrRecord["env"] = EnvMgr;
        this._mgrRecord["event"] = EventMgr;
        this.addEvents();
    }
    /**
     * 模块销毁
     */
    destroy(): void {
        this.removeEvents();
        for (const key in this._mgrRecord) {
            if (Object.prototype.hasOwnProperty.call(this._mgrRecord, key)) {
                const element: zmg.IMgr = this._mgrRecord[key];
                element.destroy();
            }
        }
    }
    /**
     * 未准备
     * 已被销毁
     * 则无法使用
     */
    get isValid(): boolean {
        return this.notVaildItem ? false : true;
    }
    private get notVaildItem(): zmg.IMgr {
        for (const key in this._mgrRecord) {
            if (Object.prototype.hasOwnProperty.call(this._mgrRecord, key)) {
                const element: zmg.IMgr = this._mgrRecord[key];
                if (!element.isValid) {
                    return element;
                }
            }
        }
        return null;
    }
    private check(): void {
        let item: zmg.IMgr = this.notVaildItem;
        if (item) {
            //未完成加载，等待加载中...
            gLog("等待itemName: " + item.constructor.name);
        } else {
            if (!this._isInit) {
                this.onReady();
            }
        }
    }
    private onReady(): void {
        this._isInit = true;
        this.initAudio();
        let cevt = new CoreEvent(CoreEvent.READY);
        this.dispatchEvent(cevt);
    }
    //======================================================子模块监听事件====================================================
    private addEvents(): void {
        for (const key in this._mgrRecord) {
            if (Object.prototype.hasOwnProperty.call(this._mgrRecord, key)) {
                const element: zmg.IMgr = this._mgrRecord[key];
                if (!element.isValid) {
                    element.once(EventName.READY, this.onMgrReady, this);
                }
            }
        }
    }

    private removeEvents(): void {
        for (const key in this._mgrRecord) {
            if (Object.prototype.hasOwnProperty.call(this._mgrRecord, key)) {
                const element: zmg.IMgr = this._mgrRecord[key];
                element.off(EventName.READY, this.onMgrReady, this);
            }
        }
    }
    private onMgrReady(evt: cc.Event): void {
        this.check();
    }
    dispatchEvent(cevt: cc.Event): void {
        EventMgr.dispatchEvent(cevt);
        super.dispatchEvent(cevt);
    }
    //======================================================END====================================================
    //======================================================内容初始化==============================================
    private initAudio(): void {
        let data = DataMgr.local.getItem(ELocalSystemKey.IS_CLOSE_AUDIO);
        if (data) {
            AudioMgr.setMusicVolume(0.0);
        } else {
            AudioMgr.setMusicVolume(1.0);
        }
    }
}

export let ZmgCore = _ZmgCore.getInstance();