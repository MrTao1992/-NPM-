import { AudioMgr } from "zmg_audio_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import { UIMgr } from "zmg_ui_mgr";
import { gLog } from "zmg_util";
import { GraphUtil } from "zmg_util";
import { $UIMouseEvent } from "../../events/UIMouseEvent";
import { _AudioRes } from "../cache/AudioRes";
import $HitComp from "zmg_ui_mgr/src/zmgui/hit/HitComp";

const { ccclass, property } = cc._decorator;

export default class $SimpleBtn extends $HitComp {

    @property({ type: cc.Float, tooltip: "点击缩放比例" })
    zoom: number = 0.90;

    @property({ tooltip: "是否使用cc.node事件监听" })
    isOriginal: boolean = false;

    @property({ tooltip: "是否激活状态" })
    set interactable(bool: boolean) {
        if (bool) {
            this.active();
        } else {
            this.disable();
        }
    }
    get interactable(): boolean {
        return this._interactable;
    }

    @property({ type: cc.Component.EventHandler })
    events: cc.Component.EventHandler[] = [];

    @property({ type: cc.AudioClip, tooltip: '若不设置使用默认音效' })
    clickAudio: cc.AudioClip = null;

    @property({ tooltip: '优先级' })
    priority: number = 0;

    @property({ tooltip: '对象，默认空就是自己', type: cc.Node })
    target: cc.Node = null;

    protected _interactable: boolean = true;
    protected _scaleX: number = 1.0;
    protected _scaleY: number = 1.0;
    public set scale(s: number) {
        this._scaleY = s;
        this._scaleX = s;
    }

    _isclicking: boolean = false;

    private _isMouseDown: boolean;
    private _clickDis: cc.Vec2;
    public active(): void {
        this._interactable = true;
        this._scaleX = this.node.scaleX;
        this._scaleY = this.node.scaleY;
        let s: cc.Sprite = this.node.getComponent(cc.Sprite);
        if (s) {
            // s.setState(cc.Sprite.State.NORMAL);
            // s.setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
            s.setMaterial(0, cc.Material.createWithBuiltin('2d-sprite'));
        }
    }
    public disable(): void {
        this._interactable = false;
        this._scaleX = this.node.scaleX;
        this._scaleY = this.node.scaleY;
        let s: cc.Sprite = this.node.getComponent(cc.Sprite);
        if (s) {
            // s.setState(cc.Sprite.State.GRAY);
            // s.setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));
            s.setMaterial(0, cc.Material.createWithBuiltin('2d-gray-sprite'));
        }
    }
    //多点屏蔽
    onLoad(): void {
        if (!this.target) {
            this.target = this.node;
        }
        super.onLoad();
        if (!this.clickAudio) {
            this.clickAudio = _AudioRes.getInstance().click;
        }
        this._scaleX = this.node.scaleX;
        this._scaleY = this.node.scaleY;
    }
    addListener(): void {
        if (this.isOriginal) {
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, false);
            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, false);
        } else {
            EventMgr.on($UIMouseEvent.MOUSE_UP, this.onMouseEnd, this, false, this.priority);
            EventMgr.on($UIMouseEvent.MOUSE_DOWN, this.onMouseStart, this, false, this.priority);
        }

    }
    removeListener(): void {
        if (this.isOriginal) {
            this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, false);
            this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, false);
        } else {
            EventMgr.off($UIMouseEvent.MOUSE_UP, this.onMouseEnd, this);
            EventMgr.off($UIMouseEvent.MOUSE_DOWN, this.onMouseStart, this);
        }
    }
    onEnable() {
        this.addListener();
    }
    onDisable(): void {
        this.removeListener()
    }
    onDestroy(): void {
        this.events.length = 0;
        this.events = null;
    }

    protected onMouseEnd(evt: $UIMouseEvent): void {
        if (!this.node.activeInHierarchy) {
            return;
        }
        if (this._interactable) {
            if (this._isMouseDown) {
                if (this.hitTest(evt.worldPos)) {
                    this.onTouchEnd();
                    evt["stopped"] && evt["stopped"]();
                } else {
                    this.onTouchCancel();
                }
            }
        }
    }
    protected onMouseStart(evt: $UIMouseEvent): void {
        let ishit = this.hitTest(evt.worldPos)
        if (this._interactable && ishit) {
            this.onTouchStart();
            evt["stopped"] && evt["stopped"]();
        }
    }
    protected onMouseMove(pos: cc.Vec2): void {
        if (this._interactable && this._isMouseDown) {
            if (this.hitTest(pos)) {
                // Mouse.instance.setStyle(EnumMouseStyle.click);
            } else {
                this.onMouseLevel();
            }
        }
    }
    protected onTouchStart(): void {
        if (this._interactable) {
            this._isMouseDown = true;
            this._clickDis = UIMgr.mouse.mouseV2.clone();
            cc.tween(this.target).to(0.1, {
                scaleX: this._scaleX * this.zoom,
                scaleY: this._scaleY * this.zoom
            }).start();
        }
    }
    protected onTouchEnd(evt?: cc.Event.EventTouch): void {
        if (!this.node.activeInHierarchy) {
            return;
        }
        if (this._interactable) {
            this.target.stopAllActions();
            this.target.scaleX = this._scaleX;
            this.target.scaleY = this._scaleY;
            if (cc.Vec2.distance(UIMgr.mouse.mouseV2, this._clickDis) < 100) {
                this.onHandler(evt);
            }

            this._isMouseDown = false;
        }
    }
    protected onHandler(evt?: cc.Event.EventTouch): void {
        if (this.clickAudio) {
            AudioMgr.playEffect(this.clickAudio);
        }
        var i: number;
        if (!evt) {
            evt = new cc.Event.EventTouch([], false);
            evt.target = this.node;
        }
        var len: number = this.events.length;
        for (i = 0; i < len; i++) {
            /**
             * 为了兼容cc.event.eventtouch 第一个参数是空
             */
            this.events[i].emit([evt, this.events[i].customEventData, this]);
        }
    }
    protected onMouseLevel(): void {
        if (this._interactable && this._isMouseDown) {
            this._isMouseDown = false;
            this.target.scaleX = this._scaleX;
            this.target.scaleY = this._scaleY;
        }
    }

    protected onTouchCancel(): void {
        if (this._interactable) {
            this._isMouseDown = false;
            this.target.scaleX = this._scaleX;
            this.target.scaleY = this._scaleY;
        }
    }
}