import $BaseUI from "./BaseUI";
import { gLog } from "zmg_util";
import { CamearMgr } from "zmg_camera_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import { $UIMouseEvent } from "../events/UIMouseEvent";

export class $UIMask extends $BaseUI implements zmg.IMask {
    private _mouseV2: cc.Vec2;

    private _opacity: number = 90;


    private _keyList: { key: string }[] = [];

    public get node(): cc.Node {
        return this._node;
    }
    constructor(url: string) {
        super(url);
        this._isActive = false;

        EventMgr.on(EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneStart, this, false);
    }
    destroy(): void {
        super.destroy();
        EventMgr.off(EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneStart, this);
    }
    private onSceneStart(): void {
        this.hide();
    }
    public show(key?: string, opacity?: number): void {
        key = key ? key : "mask";
        var i: number;
        var index: number = -1;
        var len: number = this._keyList.length;
        if (opacity !== undefined) {
            this._opacity = opacity;
        } else {
            this._opacity = 90;
        }
        this.setOpacity(this._opacity);
        for (i = 0; i < len; i++) {
            if (this._keyList[i].key == key) {
                index = i;
            }
        }
        if (index == -1) {
            this._keyList.push({ key: key });
        } else {
            return;
        }
        gLog("显示操作遮罩");
        super.show();
        this.addMouseEvents();
    }
    public hide(key?: string): void {
        if (key) {
            var i: number;
            var index: number = -1;
            var len: number = this._keyList.length;
            for (i = 0; i < len; i++) {
                if (this._keyList[i].key == key) {
                    index = i;
                }
            }
            if (index == -1) {
                return;
            }
            this._keyList.splice(index, 1);
        } else {
            this._keyList.length = 0;
        }
        if (!this._keyList.length) {
            gLog("隐藏操作遮罩");
            this.removeMouseEvents();
            super.hide();
        }
    }
    /**
    * 透明度
    */
    public setOpacity(value: number) {
        this._opacity = value;
        if (this.node) {
            this.node.opacity = this._opacity;
        }
    }

    protected onComplete(): void {
        this.node.opacity = this._opacity;
        super.onComplete();
    }

    protected addMouseEvents(): void {
        var canvas: cc.Node = this.node;
        if (cc.sys.isMobile) {
            canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        } else {
            //仅pc平台需要
            // cc.Canvas.instance.schedule(this.onTimeCheck.bind(this), UIMouse.CHECK_TIME);
            // canvas.off(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this, true);
            // canvas.off(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLevel, this, true);
            canvas.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this, true);
        }
        canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, true);
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, true);
    }
    protected removeMouseEvents(): void {
        if (!cc.Canvas.instance) return
        var canvas: cc.Node = cc.Canvas.instance.node;
        if (cc.sys.isMobile) {
            canvas.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        } else {
            //仅pc平台需要
            // cc.Canvas.instance.schedule(this.onTimeCheck.bind(this), UIMouse.CHECK_TIME);
            // canvas.off(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this, true);
            // canvas.off(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLevel, this, true);
            canvas.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this, true);
        }
        canvas.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, true);
        canvas.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, true);
    }

    public getScreenToWorldPoint(screenPosition: cc.Vec2 | cc.Vec3): cc.Vec2 {
        let pos = cc.v2(screenPosition.x, screenPosition.y)
        let camear = CamearMgr.getMain()
        if (camear) {
            let worldPoint = camear.getScreenToWorldPoint(pos)
            pos = cc.v2(worldPoint.x, worldPoint.y)
        }
        return pos
    }

    private onTouchMove(event: cc.Event.EventTouch): void {
        if (!this._isActive) return
        this._mouseV2 = event.getLocation();
        this._mouseV2 = this.getScreenToWorldPoint(this._mouseV2)
        let evt: $UIMouseEvent = $UIMouseEvent.create(EventName.UI_MASK_TOUCH_MOVE, this._mouseV2);
        EventMgr.dispatchEvent(evt);
    }

    private onMouseEnter(event: cc.Event.EventTouch): void {
    }

    private onMouseMove(event: cc.Event.EventTouch): void {
        if (!this._isActive) return
        this._mouseV2 = event.getLocation();
        this._mouseV2 = this.getScreenToWorldPoint(this._mouseV2)
        let evt: $UIMouseEvent = $UIMouseEvent.create(EventName.UI_MASK_MOVE, this._mouseV2);
        EventMgr.dispatchEvent(evt);
    }

    private onTouchEnd(event: cc.Event.EventTouch): void {
        if (!this._isActive) return
        this._mouseV2 = event.getLocation();
        this._mouseV2 = this.getScreenToWorldPoint(this._mouseV2)
        let evt: $UIMouseEvent = $UIMouseEvent.create(EventName.UI_MASK_DOWN, this._mouseV2);
        EventMgr.dispatchEvent(evt);
    }

    private onTouchStart(event: cc.Event.EventTouch): void {
        if (!this._isActive) return
        this._mouseV2 = event.getLocation();
        this._mouseV2 = this.getScreenToWorldPoint(this._mouseV2)
        let evt: $UIMouseEvent = $UIMouseEvent.create(EventName.UI_MASK_UP, this._mouseV2);
        EventMgr.dispatchEvent(evt);
    }
}