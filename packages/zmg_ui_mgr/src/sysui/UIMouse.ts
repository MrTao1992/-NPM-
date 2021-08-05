import { EventMgr, EventName } from "zmg_event_mgr";
import { DragonResAsset, DragonResListener, ResListener, ResMgr } from "zmg_res_mgr";
import { DragonAsset, NodeUtil } from "zmg_util";
import { AudioMgr } from "zmg_audio_mgr";
import { $UIMouseEvent } from "../events/UIMouseEvent";
import { UIMgr } from "zmg_ui_mgr";
import { CamearMgr } from "zmg_camera_mgr"

export class $UIMouse extends cc.EventTarget implements zmg.IMouse {
    static CHECK_TIME: number = 0.3;
    //常规移动状态
    private _normal: string;
    //待点击状态
    private _link: string;
    //点击摁下状态
    private _unavailable: string;
    private _effect: zmg.IResAsset = { bunName: "", path: "" };
    private _sound: zmg.IResAsset = { bunName: "", path: "" };
    private _dNormal: string;
    private _dLink: string;
    private _dUnavailable: string;
    private _dEffect: {
        bunName: string;
        path: string;
    };
    private _active: boolean = true
    private _mouseV2: cc.Vec2;
    private _isMouseDown: boolean;
    private _soundClip: cc.AudioClip;
    private _effectDragon: dragonBones.ArmatureDisplay;
    public get mouseV2(): cc.Vec2 {
        return this._mouseV2;
    }
    public get isMouseDown(): boolean {
        return this._isMouseDown;
    }
    public get active(): boolean {
        return this._active
    }
    public set active(s: boolean) {
        this._active = s
    }
    constructor(normal: string, link: string, unavailable: string, effect: zmg.IResAsset, sound: zmg.IResAsset) {
        super();
        this.start();
        this._dEffect = effect;
        this.setSound(sound);
        this.setEffect(effect);
        this._mouseV2 = new cc.Vec2();
        this.setDefaultStyle(normal, link, unavailable);
    }
    /**
    * 初始化
    */
    public start(): void {
        let effectNode = new cc.Node();
        effectNode.group = "UI";
        effectNode.zIndex = cc.macro.MAX_ZINDEX;
        this._effectDragon = effectNode.addComponent(dragonBones.ArmatureDisplay);
        EventMgr.on(EventName.CONTROLLER_CHANGE_DESTORY, this.onCanvasDestory, this, false);
        EventMgr.on(EventName.CONTROLLER_CHANGE_END, this.onCanvasEnd, this, false);
        // cc.game.addPersistRootNode(effectNode);
    }
    /**
     * 
     * @param link 点击状态
     * @param normal 常规移动状态
     * @param unavailable 点击摁下状态
     */
    public setStyle(normal: string, link: string, unavailable: string): void {
        this._normal = normal;
        this._link = link;
        this._unavailable = unavailable;
        this.setMouseStyle(this._normal);
    }
    public setDefaultStyle(normal: string, link: string, unavailable: string): void {
        this._dNormal = normal;
        this._dLink = link;
        this._dUnavailable = unavailable;
        this.setStyle(normal, link, unavailable);
    }
    public setNormal(): void {
        this.setMouseStyle(this._normal);
    }
    public setLink(): void {
        this.setMouseStyle(this._link);
    }
    public setUnavailable(): void {
        this.setMouseStyle(this._unavailable);
    }
    public setEffect(effect: zmg.IResAsset): void {
        if (!effect) {
            return;
        }
        if ((effect.bunName == this._effect.bunName && effect.path == this._effect.path)) {
            return;
        }
        this._effect.bunName = effect.bunName;
        this._effect.path = effect.path;
        ResMgr.loadDragon(effect.bunName, new DragonResAsset(effect.path), new DragonResListener(this, (asset: DragonAsset) => {
            this._effectDragon = NodeUtil.createDragon(asset, this._effectDragon.node, "mouseEffect");
            this._effectDragon.addEventListener(dragonBones.EventObject.COMPLETE, this.hideEffectDragon, this);
            this._effectDragon.node.active = false;
        }));
    }
    public setSound(sound: zmg.IResAsset): void {
        if (!sound) {
            return;
        }
        if ((sound.bunName == this._sound.bunName && sound.path == this._sound.path)) {
            return;
        }
        ResMgr.loadRes(sound, new ResListener(this, (asset: cc.AudioClip) => {
            this._soundClip = asset;
        }), this);
    }
    /**
     * 还原默认样式
     */
    public resetStyle(): void {
        this.setEffect(this._dEffect);
        this.setStyle(this._dNormal, this._dLink, this._dUnavailable);
    }
    /**
    * 是否初始化完毕
    */
    public get isValid(): boolean {
        return true;
    }
    /**
    * 销毁
    */
    public destroy(): void {
        var canvas: cc.Node = cc.Canvas.instance.node;
        if (cc.sys.isMobile) {
            UIMgr.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        } else {
            UIMgr.node.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this, false);
        }
        EventMgr.off(EventName.CONTROLLER_CHANGE_DESTORY, this.onCanvasDestory, this);
        EventMgr.off(EventName.CONTROLLER_CHANGE_END, this.onCanvasEnd, this);
    }
    private onCanvasDestory(): void {
        var canvas: cc.Node = cc.Canvas.instance.node;
        if (cc.sys.isMobile) {
            UIMgr.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        } else {
            //仅pc平台需要
            // cc.Canvas.instance.schedule(this.onTimeCheck.bind(this), UIMouse.CHECK_TIME);
            canvas.off(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this, true);
            // canvas.off(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLevel, this, true);
            canvas.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this, true);
        }
        canvas.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, true);
        canvas.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, true);
        if (cc.isValid(this._effectDragon)) {
            this._effectDragon.node.setParent(null);
        }
    }
    /**
    * 场景准备完毕
    * 监听碰撞
    */
    private onCanvasEnd(): void {
        var canvas: cc.Node = cc.Canvas.instance.node;
        canvas["_hitTest"] = () => { return true };
        if (cc.sys.isMobile) {
            canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        } else {
            //仅pc平台需要
            // cc.Canvas.instance.schedule(this.onTimeCheck.bind(this), UIMouse.CHECK_TIME);
            canvas.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this, true);
            // canvas.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLevel, this, true);
            canvas.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this, true);
        }
        canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, true);
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, true);
        if (cc.isValid(this._effectDragon)) {
            this._effectDragon.node.setParent(UIMgr.node);
        }
    }
    public setEffectParent(parent: cc.Node): void {
        if (cc.isValid(this._effectDragon)) {
            this._effectDragon.node.setParent(parent);
        }
    }
    public setParent(parent: cc.Node): void {
        if (cc.isValid(this._effectDragon)) {
            this._effectDragon.node.setParent(parent);
        }
    }

    public hideEffectDragon(): void {
        this._isMouseDown = false;
        if (cc.isValid(this._effectDragon)) {
            this._effectDragon.node.active = false;
        }
    }
    /**
     * 手性切换检测
     * 检查鼠标显示手性
     */
    private onTimeCheck(): void {
    }
    private setMouseStyle(url: string): void {
        if (!cc.sys.isMobile) {
            // gLog("设置样式：" + url);
            document.body.style.cursor = "url(" + url + "),auto ";
        }
    }

    private onMouseMove(event: cc.Event.EventTouch): void {
        if (!this.active) return
        if (this._isMouseDown) {
            this.onTouchMove(event);
        } else {
            //pc平台鼠标移动
            this._mouseV2 = event.getLocation();
            this._mouseV2 = this.getScreenToWorldPoint(this._mouseV2)
            let evt: $UIMouseEvent = $UIMouseEvent.create($UIMouseEvent.MOUSE_MOVE, this._mouseV2);
            this.gDispatchEvent(evt);
        }
    }

    private onTouchMove(event: cc.Event.EventTouch): void {
        if (!this.active) return
        this._mouseV2 = event.getLocation();
        this._mouseV2 = this.getScreenToWorldPoint(this._mouseV2)
        let evt: $UIMouseEvent = $UIMouseEvent.create($UIMouseEvent.TOUCH_MOVE, this._mouseV2);
        this.gDispatchEvent(evt);
    }

    private onMouseLevel(event: cc.Event.EventTouch): void {
        if (this._isMouseDown) {
            this._onTouchEnd(event);
        } else {
            this.setMouseStyle(this._link);
        }
    }
    private onMouseEnter(event: cc.Event.EventTouch): void {
        this.setMouseStyle(this._normal);
    }
    private onTouchEnd(event: cc.Event.EventTouch): void {
        let worldpos: cc.Vec2 = event.getLocation();
        this._onTouchEnd(event);
        if (this._effectDragon && event["_done"]) {
            if (!this._effectDragon.node.active) {
                this._effectDragon.node.active = true;
            }
            worldpos = this.getScreenToWorldPoint(worldpos)
            let localpos = this._effectDragon.node.parent.convertToNodeSpaceAR(worldpos);
            this._effectDragon.node.setPosition(localpos);
            this._effectDragon.playAnimation("click", 1);
        }
    }
    private _onTouchEnd(event: cc.Event.EventTouch): void {
        if (!this.active) return
        let worldpos: cc.Vec2 = event.getLocation();
        this._isMouseDown = false;
        this.setMouseStyle(this._normal);
        worldpos = this.getScreenToWorldPoint(worldpos)
        let evt: $UIMouseEvent = $UIMouseEvent.create($UIMouseEvent.MOUSE_UP, worldpos);
        this.gDispatchEvent(evt);
        if (event["_done"]) {
            AudioMgr.playEffect(this._soundClip, null, this, 1, false);
        }
    }
    private onTouchStart(event: cc.Event.EventTouch): void {
        if (!this.active) return
        this._isMouseDown = true;
        this.setMouseStyle(this._unavailable);
        let worldpos: cc.Vec2 = event.getLocation();
        worldpos = this.getScreenToWorldPoint(worldpos)
        let evt: $UIMouseEvent = $UIMouseEvent.create($UIMouseEvent.MOUSE_DOWN, worldpos);
        this.gDispatchEvent(evt);
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

    private gDispatchEvent(evt: $UIMouseEvent): void {
        evt.used = true;
        EventMgr.dispatchEvent(evt);
        evt.used = false;
    }
}