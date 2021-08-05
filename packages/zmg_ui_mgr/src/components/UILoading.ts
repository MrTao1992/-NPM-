import { EventMgr, EventName } from "zmg_event_mgr";
import { gLog } from "zmg_util";
import { DirectorEvent, DirectorMgr } from "zmg_controller";
import { FontMgr } from "zmg_ui_mgr";
import { $UIEvent } from "../events/UIEvent";
import $BaseUI from "zmg_ui_mgr/src/sysui/BaseUI";

export class $UILoading extends $BaseUI implements zmg.ILoading {

    // private _label: cc.Label;
    private _proNode: cc.Node;
    private _effectNode: cc.Node;
    // private _zxm: cc.Node;
    // private _ddx: cc.Node;
    // private _mmt: cc.Node;
    public get res(): zmg.IResAsset {
        return this._res;
    }
    constructor(url: string, parent: cc.Node) {
        super(url);
        this._parent = parent;
    }


    public showProgress(): void {
        if (this._proNode && this._proNode.parent)
            this._proNode.parent.active = true;
    }

    public hideProgress(): void {
        if (this._proNode && this._proNode.parent)
            this._proNode.parent.active = false;
    }

    public setProgress(value: number): void {
        this.showProgress();
        value = Math.max(Math.min(1, value), 0);
        let total = this._proNode.parent.width - 6;
        this._effectNode.width = this._proNode.width = Math.max(Math.min(total * value), 32);
    }

    protected onLoad(): void {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        // this._zxm = this.node.getChildByName("zxm");
        // this._ddx = this.node.getChildByName("ddx");
        // this._mmt = this.node.getChildByName("mmt");
        this._proNode = this.node.getChildByName("bar").getChildByName("pro");
        this._effectNode = this.node.getChildByName("bar").getChildByName("effect");
        // this._label = this.node.getChildByName("label").getComponent(cc.Label);
        this.setProgress(0);
        this.onComplete();
        this.show();
        if (FontMgr.isValid) {
            this.onFontReady();
        } else {
            EventMgr.once(EventName.UI_FONT_READY, this.onFontReady, this);
        }
    }
    private onFontReady(): void {
        FontMgr.updateFont(this.node);
    }
    public show(): void {
        gLog("显示背景");
        // this._label.node.active = true;
        // this.scaleShow(0.7);
        // this.node.active = true;
        // this.scaleShow(0.7, this._zxm);
        // this.scaleShow(0.7, this._ddx);
        // this.scaleShow(0.7, this._mmt);
        if (this.node && this._parent && !this.node.parent) {
            this.node.setParent(this._parent);
            EventMgr.dispatchEvent(new $UIEvent($UIEvent.LOAD_SHOW));
            DirectorMgr.on(DirectorEvent.SCENE_CHANGE_PROGRESS, this.onDirectProgress, this, false);
        }

    }
    public hide(): void {
        gLog("隐藏Loading");
        // this.scaleHide(0.7);
        if (this.node.parent) {
            this.hideProgress();
            // this.node.active = false;
            // this._label.node.active = false;
            this.node.setParent(null);
            EventMgr.dispatchEvent(new $UIEvent($UIEvent.LOAD_HIDE));
            DirectorMgr.off(DirectorEvent.SCENE_CHANGE_PROGRESS, this.onDirectProgress, this);
        }
    }
    protected onDirectProgress(evt: DirectorEvent): void {
        this.setProgress(evt.progress);
    }
}