import { ConfigMgr } from "zmg_config_mgr";
import { $UIEvent } from "../events/UIEvent";
import $BaseUI from "./BaseUI";

class BaseToast extends cc.Component {
    private _msg: string = "";
    public get isActive(): boolean {
        return this.node.active;
    }
    onEnable() {
        cc.game["fullFrameRatio"] && cc.game["fullFrameRatio"]();
    }
    onDisable() {
        cc.game["recoverFrameRatio"] && cc.game["recoverFrameRatio"]();
    }
    public get label(): cc.Label {
        return this.node.getChildByName("label").getComponent(cc.Label);
    }
    public show(msg: string, time: number): void {
        let lab = this.label;
        this._msg = msg;
        this.init();
        if (lab) {
            this.node.scale = 0;
            this.node.active = true;
            lab.string = msg;
            let height: number = cc.visibleRect.height;
            this.node.y = -height / 2 - 50;
            this.node.stopAllActions();
            cc.tween(this.node).to(0.3, { y: -height / 2 + 120, scale: 1 }, { easing: "smooth" }).start();
            this.unscheduleAllCallbacks();
            this.scheduleOnce(() => {
                let bg = this.node.getChildByName("bg");
                bg && (bg.width = Math.min(Math.max(this.label.node.width, 280), 600) + 30);
            });
            this.scheduleOnce(this.hide.bind(this, false), time);
        }
    }
    public hide(now?: boolean): void {
        if (!this.node.active) {
            return;
        }
        this.unscheduleAllCallbacks();
        if (this.label) {
            if (now) {
                this.node.active = false;
            } else {
                let height: number = cc.visibleRect.height;
                this.node.stopAllActions();
                cc.tween(this.node).to(0.3, { scale: 0, y: -height / 2 - 50 }, { easing: "smooth" }).call(() => {
                    this.hide(true);
                }).start();
            }
        }
    }
    init() {
        let height: number = cc.visibleRect.height;
        this.node.x = 0;
        this.node.y = -height / 2 - 50;
        this.label.string = this._msg;
        this.node.active = false;
        this.node.scale = 0;
    }

}

export class _ToastMgr extends $BaseUI implements zmg.IToastMgr {

    private static _instance: _ToastMgr;
    static getInstance(): _ToastMgr {
        if (!this._instance) {
            this._instance = new _ToastMgr();
        }
        return this._instance;
    }

    static DEFAULT_TIME: number = 3;
    private _toasts: BaseToast[];
    private _prefab: cc.Prefab;
    public init(url: string) {
        super.init(url);
    }

    public get isValid(): boolean {
        return cc.isValid(this.node);
    }

    protected createNode(pre: cc.Prefab): void {
        if (!this.node) {
            this.node = new cc.Node();
            this.node.group = "UI";
            this.node.name = "toastNode";
            this.node.width = ConfigMgr.appconfig.frameWidth;
            this.node.height = ConfigMgr.appconfig.frameHeight;
            this._target = this.node.addComponent(cc.Component);
        }
        this._prefab = pre;
        this.onLoad();
    }
    private getToast(): BaseToast {
        if (!this._prefab) {
            return;
        }
        let i: number;
        let len: number = this._toasts.length;
        for (i = 0; i < len; i++) {
            if (!this._toasts[i].isActive) {
                return this._toasts[i];
            }
        }
        if (len < 3) {
            let n: cc.Node = cc.instantiate(this._prefab);
            let t: BaseToast = n.addComponent(BaseToast);
            this.node.addChild(n);
            this._toasts.push(t);
            return t;
        }
        return this._toasts[len - 1];
    }

    onLoad(): void {
        this._toasts = [];
        this.onComplete();
    }
    public open(msg: string, time: number = _ToastMgr.DEFAULT_TIME): void {
        this.close(false);
        let t: BaseToast = this.getToast();
        t.show(msg, time);
        let evt: $UIEvent = new $UIEvent($UIEvent.TOAST_SHOW);
        evt.target = t;
        this.node.dispatchEvent(evt);
    }
    public close(now?: boolean): void {
        let i: number
        let len: number = this._toasts.length;
        for (i = 0; i < len; i++) {
            this._toasts[i].hide(now);
        }
    }
}
