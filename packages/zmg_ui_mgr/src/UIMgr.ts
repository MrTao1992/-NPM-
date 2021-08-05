import { EventMgr, EventName } from "zmg_event_mgr";
import { BaseMgr } from "zmg_mgr";
import { EResEventName, ResMgr } from "zmg_res_mgr";
import { gLog } from "zmg_util";
import { _AlertMgr } from "./sysui/alert/AlertMgr";
import { $UIEvent } from "./events/UIEvent";
import { $ConfigEvent, ConfigMgr } from "zmg_config_mgr";
import { $Bg } from "./sysui/Bg";
import { $UIMask } from "./sysui/UIMask";
import { _ToastMgr } from "./sysui/ToastMgr";
import { EUIZindex } from "./sysui/EUIZindex";
import { $UILoading } from "./sysui/UILoading";
import { $UITransitions } from "./sysui/UITransitions";
import { $UIBackBtn } from "./sysui/UIBackBtn";
import { $UIMouse } from "./sysui/UIMouse";
import { FontMgr } from "zmg_ui_mgr";

import { $UILayer } from "./sysui/UILayer";
import { DirectorEvent, DirectorMgr } from "zmg_controller";

export class _UIMgr extends BaseMgr implements zmg.IUIMgr {
    private static _instance: _UIMgr;
    static getInstance(): _UIMgr {
        if (!this._instance) {
            this._instance = new _UIMgr();
        }
        return this._instance;
    }

    constructor() {
        super();
    }
    /**
     * 显示一些窗口的节点
     */
    public uiLayer: $UILayer;

    public bg: $Bg;

    public mask: $UIMask;
    /**
     * 返回按钮
     */
    public backBtn: $UIBackBtn;
    /**
     * loading界面
     */
    public loading: $UILoading;
    /**
     * toast管理器
     */
    public toast: zmg.IToastMgr;
    /**
     * 弹窗管理器
     */
    public alert: zmg.IAlertMgr;
    /**
     * 切场景特效组件
     */
    public transitions: $UITransitions;

    /**
     * 字体管理器
     */
    public fontMgr: zmg.IFontMgr;

    /**
     * 鼠标组件
     */
    public mouse: $UIMouse;

    /**
     * 其他弹出层
     */
    public other: cc.Node;

    private _node: cc.Node;
    private _isValid: boolean;
    public get node(): cc.Node {
        return this._node;
    }
    public async start() {
        super.start();
        if (ConfigMgr.isValid) {
            this.load();
        } else {
            EventMgr.once(EventName.CONFIG_READY, this.load, this);
        }
    }
    public destroy(): void {
        this.uiLayer.destroy();
        this.mouse.destroy();
        this.bg.destroy();
        this.mask.destroy();
        this.backBtn.destroy();
        this.toast.destroy();
        this.alert.destroy();
        this.loading.destroy();
        this.transitions.destroy();
        this.fontMgr.destroy();
        this.removeEvents();
        super.destroy();
        if (this._node) {
            cc.game.removePersistRootNode(this._node);
            this._node.destroy();
            this._node = null;
        }
        this._isValid = false;
    }
    public closeAll(): void {
        if (this.bg) {
            this.bg.hide();
        }
        if (this.alert) {
            this.alert.close();
        }
        if (this.loading) {
            this.loading.hide();
        }
    }
    /**
     * 未准备
     * 已被销毁
     * 则无法使用
     */
    public get isValid(): boolean {
        return this._isValid;
    }

    public showLoading(isProgress: boolean = false, pro?: number): void {
        if (this.bg) {
            this.bg.show();
        }
        if (this.loading) {
            if (isProgress) {
                this.loading.setProgress(pro);
            } else {
                this.loading.hideProgress();
            }
            this.loading.show();
        }
    }

    public hideLoading(): void {
        if (this.bg) {
            this.bg.hide();
        }
        if (this.loading) {
            this.loading.hide();
        }
    }

    private check(): void {
        if (!this.loading.node) {
            return;
        }
        if (!this.bg.node) {
            return;
        }
        if (!this.alert.isValid) {
            return;
        }
        if (!this.mask.node) {
            return;
        }
        if (!this.toast.isValid) {
            return;
        }
        if (!this.transitions.node) {
            return;
        }
        if (!this.backBtn.node) {
            return;
        }
        if (!this.uiLayer.node) {
            return;
        }
        this._isValid = true;
        EventMgr.dispatchEvent(new $UIEvent($UIEvent.COMPLETE));
        this.dispatchEvent(new $UIEvent(EventName.READY));
    }
    public updateAlignment(node: cc.Node): void {
        let wids: cc.Widget[] = node.getComponentsInChildren(cc.Widget);
        let i: number = 0;
        let len: number = wids.length;
        for (i = 0; i < len; i++) {
            wids[i].updateAlignment();
        }
    }
    private sceneChange(): void {
        let clientWidth = Math.round(cc.view.getVisibleSize().width);
        let clientHeight = Math.round(cc.view.getVisibleSize().height);
        if (cc.Canvas.instance.node) {
            cc.Canvas.instance.node.width = clientWidth;
            cc.Canvas.instance.node.height = clientHeight;
        }
        if (this._node) {
            this._node.width = clientWidth;
            this._node.height = clientHeight;
            this._node.x = Math.round(clientWidth / 2);
            this._node.y = Math.round(clientHeight / 2);
        }
    }
    private load(): void {
        this._node = new cc.Node();
        this.sceneChange();
        this._node.name = "UIMgr";
        this.other = new cc.Node();
        this.other.name = "OtherUI"
        this.other.zIndex = EUIZindex.OTHERUI
        this.other.parent = this._node
        let widget = this._node.addComponent(cc.Widget);
        widget.isAlignLeft = true;
        widget.isAlignRight = true;
        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.left = widget.right = widget.top = widget.bottom = 0;
        cc.game.addPersistRootNode(this._node);

        let ui: zmg.IUIConfig = ConfigMgr.uiconfig;
        this.uiLayer = new $UILayer();
        this.onUILayer();
        /**
         * 设置鼠标样式
         */
        this.mouse = new $UIMouse(ui.mouse.normal, ui.mouse.link, ui.mouse.unavailable, ui.mouse.effect, ui.mouse.sound);
        this.bg = new $Bg(ui.bg, this.node);
        this.bg.once(EResEventName.COMPLETE, this.onBgComplete, this);

        this.mask = new $UIMask(ui.mask);
        this.mask.once(EResEventName.COMPLETE, this.onMaskComplete, this);

        this.backBtn = new $UIBackBtn(ui.backBtn);
        this.backBtn.once(EResEventName.COMPLETE, this.onBackComplete, this);

        this.toast = _ToastMgr.getInstance();
        this.toast.init(ui.toast);
        this.toast.once(EResEventName.COMPLETE, this.onToastComplete, this)


        this.alert = _AlertMgr.getInstance();
        this.alert.init(ui.alert);
        this.alert.once(EResEventName.COMPLETE, this.onAlertComplete, this);

        this.loading = new $UILoading(ui.loading, this.node);
        this.loading.once(EResEventName.COMPLETE, this.onLoadingComplete, this);

        this.transitions = new $UITransitions(ui.transitions, this.node);
        this.transitions.once(EResEventName.COMPLETE, this.onTransitionsComplete, this);

        this.fontMgr = FontMgr;
        this.fontMgr.start();
        this.addEvents();
    }

    private onAlertComplete(): void {
        gLog("资源complete: " + this.alert.res.path);
        this.alert.node.zIndex = EUIZindex.ALERT;
        this.alert.node.setParent(this._node);
        // this.alert.node.getComponent(cc.Widget).updateAlignment();
        this.check();
    }
    private onLoadingComplete(): void {
        gLog("资源complete: " + this.loading.res.path);
        this.loading.node.zIndex = EUIZindex.Loading;
        this.loading.node.setParent(this._node);
        this.check();
    }

    private onUILayer(): void {
        this.uiLayer.node.zIndex = EUIZindex.uiLayer;
        this.uiLayer.node.setParent(this._node);
        this.updateAlignment(this.uiLayer.node);
    }

    private onBgComplete(): void {
        gLog("资源complete: " + this.bg.res.path);
        this.bg.node.zIndex = EUIZindex.BG;
        this.bg.node.setParent(this._node);
        this.check();
    }

    private onMaskComplete(): void {
        gLog("资源complete: " + this.mask.res.path);
        this.mask.node.zIndex = EUIZindex.MASK;
        this.mask.node.setParent(this._node);
        this.uiLayer.setMask(this.mask);
        this.check();
    }

    private onToastComplete(): void {
        gLog("资源complete: " + this.toast.res.path);
        this.toast.node.zIndex = EUIZindex.TOAST;
        this.toast.node.setParent(this.node);
        this.check();
    }
    private onTransitionsComplete(): void {
        gLog("场景跳转组件准备完毕...");
        gLog("资源complete: " + this.transitions.res.path);
        this.transitions.node.zIndex = EUIZindex.TRANSITIONS;
        // this.transitions.node.setParent(this.node);
        this.check();
    }

    private onBackComplete(): void {
        this.backBtn.node.zIndex = EUIZindex.BACKBTN;
        this.backBtn.node.setParent(this.node);
        this.check();
    }

    private addEvents(): void {
        EventMgr.on(EventName.UI_VIDEO_HIDE, this.onVideoHide, this, false);
        EventMgr.on(EventName.UI_VIDEO_SHOW, this.onVideoShow, this, false);
        EventMgr.on(EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneChangeDestory, this, false);
        EventMgr.on(EventName.CONTROLLER_CHANGE_END, this.onSceneChangeEnd, this, false);
        cc.view.on("canvas-resize", this.onCanvasResize, this, false);

    }
    private removeEvents(): void {
        EventMgr.off(EventName.UI_VIDEO_HIDE, this.onVideoHide, this);
        EventMgr.off(EventName.UI_VIDEO_SHOW, this.onVideoShow, this);
        EventMgr.off(EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneChangeDestory, this);
        EventMgr.off(EventName.CONTROLLER_CHANGE_END, this.onSceneChangeEnd, this);
        cc.view.off("canvas-resize", this.onCanvasResize, this);
    }
    private onVideoHide(): void {
        this.mask.hide("Video");
    }
    private onVideoShow(): void {
        this.mask.show("Video");
        this.hideLoading();
    }

    private onCanvasResize(): void {
        this.sceneChange();
        this.updateAlignment(cc.Canvas.instance.node);
        this.updateAlignment(this.node);
    }
    private onSceneChangeDestory(evt: DirectorEvent): void {
        this.backBtn.show();
        this.mouse.hideEffectDragon();
    }

    private onSceneChangeEnd(): void {
        this.sceneChange();
        this.updateAlignment(this.node);

    }
}