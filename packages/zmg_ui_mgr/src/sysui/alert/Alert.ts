/*
 * @Description: 
 */

import { EventMgr, EventName } from "zmg_event_mgr";
import { ResListener, ResMgr, SystemBundleName } from "zmg_res_mgr";
import { FontMgr, UIMgr, zmTween } from "zmg_ui_mgr";
import { StringUtil } from "zmg_util";
import { $AlertAsset } from "./AlertAsset";

export class $Alert extends cc.EventTarget {

    label: cc.Label = null;

    sureBtn: cc.Button = null;

    canelBtn: cc.Button = null;

    sureLabel: cc.Label = null;

    canelLabel: cc.Label = null;

    popup_img: cc.Node = null;

    title: cc.Sprite = null;

    public node: cc.Node;
    public res: zmg.IResAsset;
    public titleRes: zmg.IResAsset;
    public asset: zmg.IAlertAsset;
    private _defaultTitleFrame: cc.SpriteFrame;
    private _mask: cc.Node;
    private _content: cc.Node;
    constructor(res: zmg.IResAsset) {
        super();
        this.setStyle(res);
    }
    init(node: cc.Node): void {
        this.node = node;
        this.node.active = true;
        this.node.name = "alertNode";
        this.node.group = "UI";
        let content: cc.Node = this.node.getChildByName("content");
        this.popup_img = content.getChildByName("popup_img");
        this.label = content.getChildByName("label").getComponent(cc.Label);
        this.sureBtn = content.getChildByName("sureBtn").getComponent(cc.Button);
        this.canelBtn = content.getChildByName("canelBtn").getComponent(cc.Button);
        this.sureLabel = this.sureBtn.node.getChildByName("label").getComponent(cc.Label);
        this.canelLabel = this.canelBtn.node.getChildByName("label").getComponent(cc.Label);
        this.title = content.getChildByName("title").getComponent(cc.Sprite);
        this._defaultTitleFrame = this.title.spriteFrame;
        this._content = content;
        this.setTitleActive(false);
        this.show(this.asset);
        this.addEvents();
        this.emit(EventName.COMPLETE, this);

        ResMgr.load(SystemBundleName.UI, "prefabs/Mask", new ResListener(this, (pre: cc.Prefab) => {
            this._mask = cc.instantiate(pre);
            this._mask.zIndex = -1;
            this._mask.setParent(this.node);
        }));
    }
    get isValid(): boolean {
        return cc.isValid(this.node);
    }
    /**
     * 
     * @param style 符合要求样式的node,Prefab
     */
    public setStyle(res: zmg.IResAsset): void {
        this.res = res;
        ResMgr.loadRes(res, new ResListener(this, (prefab: cc.Prefab) => {
            this.init(cc.instantiate(prefab));
        }));
    }
    public setTitle(res: zmg.IResAsset, isDefault?: boolean): void {
        if (res) {
            this.titleRes = res;
            ResMgr.loadRes(res, new ResListener(this, (tex: cc.Texture2D) => {
                let frame = new cc.SpriteFrame(tex);
                isDefault && (this._defaultTitleFrame = frame);
                if (this.title) {
                    this.title.spriteFrame = frame;
                    this.setTitleActive(true);
                }
            }));
        }
    }
    public setTitleActive(bool: boolean): void {
        this.title.node.active = bool;
    }
    public reset(): void {
        if (!this.node) {
            return;
        }
        if (this.title.spriteFrame != this._defaultTitleFrame) {
            this.title.spriteFrame = this._defaultTitleFrame;
            this.title.node.active = true;
        }
        this.node.setParent(null);
    }
    public destroy(): void {
        if (this.isValid) {
            this.asset = null;
            this.removeEvents();
            this.node.destroy();
            this.node = null;
        }
    }
    public show(asset: zmg.IAlertAsset): void {
        this.asset = asset;
        if (!this.isValid) {
            return;
        }
        if (!cc.isValid(this.asset)) {
            return;
        }
        this.label.string = asset.text;
        this.label.overflow = cc.Label.Overflow.NONE;
        if (StringUtil.isValid(asset.sureText)) {
            this.sureBtn.node.active = true;
            this.sureLabel.string = asset.sureText;
        } else {
            this.sureBtn.node.active = false;
        }
        if (StringUtil.isValid(asset.canelText)) {
            this.canelBtn.node.active = true;
            this.canelLabel.string = asset.canelText;
        } else {
            this.canelBtn.node.active = false;
        }
        if (this.canelBtn.node.active || this.sureBtn.node.active) {
            if (this.canelBtn.node.active) {
                this.sureBtn.node.x = -100;
                this.canelBtn.node.x = 100;
            } else {
                this.sureBtn.node.x = 0;
            }
            if (!this.sureBtn.node.active) {
                this.canelBtn.node.x = 0;
            }
            this.setContentSize(0, 0);
        } else {
            this.setContentSize(0, 0);
        }
        this._content.scale = 0;
        zmTween(this._content).to(0.3, { scale: 1 }, { easing: "smooth" }).start();
    }
    public close(now?: boolean, isClean?: boolean): void {
        if (this.asset) {
            this.asset.clear();
            this.asset = null;
        }
        if (this.isValid) {
            if (now) {
                if (isClean) {
                    this.node.destroy();
                    this.node = null;
                } else {
                    this.reset();
                }
                this.node.emit(EventName.CLOSE, this);
            } else {
                zmTween(this._content).to(0.3, { scale: 0 }, { easing: "smooth" }).call(() => {
                    this.close(true);
                }).start();
            }
        }
    }
    onEnable() {
        cc.game["fullFrameRatio"] && cc.game["fullFrameRatio"]();
    }
    onDisable() {
        cc.game["recoverFrameRatio"] && cc.game["recoverFrameRatio"]();
    }
    addEvents() {
        if (!cc.sys.isMobile) {
            let btns: cc.Button[] = this.node.getComponentsInChildren(cc.Button);
            let i: number;
            let len: number = btns.length;
            for (i = 0; i < len; i++) {
                btns[i].node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this, false);
                btns[i].node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLevel, this, false);
            }
        }
        this.sureBtn.node.on(cc.Node.EventType.TOUCH_END, this.onSure, this, false);
        this.canelBtn.node.on(cc.Node.EventType.TOUCH_END, this.onCanel, this, false);
    }

    removeEvents() {
        if (!cc.sys.isMobile) {
            let btns: cc.Button[] = this.node.getComponentsInChildren(cc.Button);
            let i: number;
            let len: number = btns.length;
            for (i = 0; i < len; i++) {
                btns[i].node.off(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this, false);
                btns[i].node.off(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLevel, this, false);
            }
        }

        this.sureBtn.node.off(cc.Node.EventType.TOUCH_END, this.onSure, this, false);
        this.canelBtn.node.off(cc.Node.EventType.TOUCH_END, this.onCanel, this, false);
    }
    private onMouseEnter(): void {
        UIMgr.mouse.setLink();
    }
    private onMouseLevel(): void {
        UIMgr.mouse.setNormal();
    }
    private onSure(): void {
        this.asset && this.asset.sure();
        this.close();
    }

    private onCanel(): void {
        this.asset && this.asset.canel();
        this.close();
    }

    private setContentSize(width: number, height: number): void {
        cc.Canvas.instance.scheduleOnce(() => {
            this.label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            this.label.node.width = Math.max(Math.min(this.label.node.width, 800), 520);
            this.label.node.height = Math.max(Math.min(this.label.node.height, 600), 312);
            this.node.width = width + this.label.node.width;
            this.node.height = height + this.label.node.height;
            let wids: cc.Widget[] = this.node.getComponentsInChildren(cc.Widget);
            let i: number;
            let len: number = wids.length;
            for (i = 0; i < len; i++) {
                wids[i].updateAlignment();
            }
        }, 0);
    }

}
