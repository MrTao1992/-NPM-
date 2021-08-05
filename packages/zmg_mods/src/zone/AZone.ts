import $AMap from "./AMap";
import $ATarget from "./ATarget";
import { $ANode } from "./ANode";
import { UIMouseEvent, ERoleAction, Actor } from "zmg_ui_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import { $AEvent } from "./AEvent";
import $ASwap from "./ASwap";
import { DirectorEvent } from "zmg_controller";
import { gLog, NodeUtil } from "zmg_util";
import { RoleEvent } from "zmg_ui_mgr";
import { $AGrid } from "./AGrid";


const { ccclass, property } = cc._decorator;

export default class $AZone extends $AMap {

    @property({ tooltip: "镜头是否跟随" })
    isFocus: boolean = true;

    @property({ type: cc.Camera })
    roleCamera: cc.Camera = null;

    @property({ type: cc.Node })
    background: cc.Node = null;

    @property({ type: cc.Node })
    foreground: cc.Node = null;

    @property({ type: $ASwap, tooltip: "交换层" })
    swap: $ASwap = null;

    @property({ tooltip: "人物形象缩放比例" })
    roleScale: number = 1.0;

    @property({ tooltip: "人物形象缩放比例" })
    roleSpeed: number = 90;

    @property({ tooltip: "人物形象缩放比例" })
    petSpeed: number = 80;

    @property({ tooltip: "起始点" })
    startNode: cc.Vec2 = new cc.Vec2();

    @property({ tooltip: "Y轴缩放比例函数" })
    easingY: string = "";

    private _roleMove: $ATarget;
    private _petMove: $ATarget;
    private _minCameraX: number;
    private _maxCamearX: number;

    private _minCameraY: number;
    private _maxCamearY: number;

    private _isLocking: boolean;

    private _moves: $ATarget[] = [];

    private _isInit: boolean;

    public lock(): void {
        this._isLocking = true;
    }

    public unLock(): void {
        this._isLocking = false;
    }

    public addMove(move: $ATarget): void {
        move.setEasingY(this.easingY);
        move.node.on($AEvent.ROLE_MOVE, this.onRoleMove, this);
        this._moves.push(move);
    }

    onLoad() {
        super.onLoad();
        this._isInit = false;
        this.init()
    }

    init() {
        let actor = Actor();
        if (this.roleCamera) {
            this._minCameraX = cc.Canvas.instance.node.width / 2 - this.node.width / 2;
            this._maxCamearX = -this._minCameraX;

            this._minCameraY = cc.Canvas.instance.node.height / 2 - this.node.height / 2;
            this._maxCamearY = -this._minCameraY;
        }
        this._roleMove = NodeUtil.createComponent($ATarget, actor.node);
        this._petMove = NodeUtil.createComponent($ATarget, actor.pet.node);
        this._roleMove.speed = this.roleSpeed;
        this._petMove.speed = this.petSpeed;
        this._roleMove.setTarget(actor.display.node);
        this._petMove.setTarget(actor.pet.node);
        this._roleMove.node.active = false;
        this._petMove.node.active = false;
        this._petMove.oriScaleX = 1.2 * this.roleScale;
        this._petMove.oriScaleY = 1.2 * this.roleScale;
        this._roleMove.oriScaleX = this.roleScale;
        this._roleMove.oriScaleY = this.roleScale;
        this.addMove(this._roleMove);
        this.addMove(this._petMove);
        this.updateCamera();
        if (this.swap) {
            actor.setParent(this.swap.node);
            actor.pet.setParent(this.swap.node);
            this.swap.updateAlignment();
        }
    }

    onEnable() {
        let actor = Actor();
        actor.node.on($AEvent.ROLE_MOVE, this.updateCamera, this, false);
        actor.node.on($AEvent.ROLE_WALK, this.onRoleWalk, this, false);
        actor.node.on($AEvent.ROLE_STAND, this.onRoleStand, this, false);
        actor.node.on(EventName.UI_ROLE_ACTION_CHANGE, this.onActorTalk, this);
        actor.pet.node.on($AEvent.ROLE_WALK, this.onPetWalk, this);
        actor.pet.node.on($AEvent.ROLE_STAND, this.onPetStand, this);
        EventMgr.on(EventName.UI_MOUSE_UP, this.onMouseUp, this, false);
        EventMgr.on(EventName.UI_ZONE_MOVE, this.onZoneMove, this, false);
        EventMgr.on(EventName.UI_MOUSE_DOWN, this.onMouseDown, this, false);
        EventMgr.on(EventName.CONTROLLER_CHANGE_END, this.onSceneEnd, this, false, 1);
    }

    onDisable() {
        let i: number;
        let len: number = this._moves.length;
        for (i = 0; i < len; i++) {
            this._moves[i].node.off($AEvent.ROLE_MOVE, this.onRoleMove, this);
        }
        let actor = Actor();
        actor.node.off($AEvent.ROLE_MOVE, this.updateCamera);
        actor.node.off($AEvent.ROLE_WALK, this.onRoleWalk, this);
        actor.node.off($AEvent.ROLE_STAND, this.onRoleStand, this);
        actor.node.off(EventName.UI_ROLE_ACTION_CHANGE, this.onActorTalk, this);
        actor.pet.node.off($AEvent.ROLE_WALK, this.onPetWalk, this);
        actor.pet.node.off($AEvent.ROLE_STAND, this.onPetStand, this);

        EventMgr.off(EventName.UI_MOUSE_UP, this.onMouseUp, this);
        EventMgr.off(EventName.UI_ZONE_MOVE, this.onZoneMove, this);
        EventMgr.off(EventName.UI_MOUSE_DOWN, this.onMouseDown, this);
        EventMgr.off(EventName.CONTROLLER_CHANGE_END, this.onSceneEnd, this);

    }
    private onActorTalk(evt: RoleEvent): void {
        if (evt.param == ERoleAction.TALK) {
            this._roleMove.setPaths(null, null);
            this._petMove.setPaths(null, null);
        }
    }
    public onSceneEnd(evt?: DirectorEvent): void {
        if (evt && evt.param) {
            if (evt.param.x !== undefined) {
                this.startNode.x = evt.param.x;
            }
            if (evt.param.y !== undefined) {
                this.startNode.y = evt.param.y;
            }
        }
        this.setPostion(this.startNode);
        let actor = Actor();
        actor.pet.node.active = true;
        actor.node.active = true;
    }
    start(): void {
        super.start();
    }
    public setPostion(pos: cc.Vec2): void {
        if (this._grid) {
            let actor = Actor();
            let aNode = this._grid.getWalkByPixel(pos);
            aNode && actor.setPostion(aNode.x, aNode.y);
            aNode = this._grid.getWalkByPixel(pos.x + 50, pos.y);
            if (!aNode) {
                aNode = this._grid.getWalkByPixel(pos.x - 50, pos.y);
            }
            aNode && actor.pet.setPostion(aNode.x, aNode.y);
            this._roleMove.updateEasing();
            this.swap.updateAlignment();
            this.updateCamera();
        }

    }
    protected setGrid(data: $AGrid): void {
        super.setGrid(data);
        this.setPostion(this.startNode);
    }
    private onZoneMove(evt: $AEvent): void {
        this.moveTo(evt.worldPos);
    }

    // update(dt: number) {
    //     let i: number;
    //     let len: number = this._moves.length;
    //     for (i = 0; i < len; i++) {
    //         this._moves[i].updateMove(dt);
    //     }
    // }

    private onRoleMove(evt: $AEvent): void {
        this.swap.updateAlignment();
    }
    private onMouseDown(evt: UIMouseEvent): void {
        if (this._isLocking) {
            return;
        }
        this.onRoleTouchDown(evt);
        let pos: cc.Vec2 = this.convertToNodeSpaceAR(evt.getLocation());
        var an: $ANode = this.getWalkNode(pos);
        if (an) {
            // ToastMgr.open("A:" + an.a + " B:" + an.b);
            gLog("Click Map  A:" + an.a + " B:" + an.b);
        } else {
            // ToastMgr.open("None");
            gLog("Click Map None");
        }
    }
    public moveTo(pos: cc.Vec2): void {
        console.time("findPath");
        let actor: $ATarget = this._roleMove;
        let start: cc.Vec2 = actor.getPosition();
        let paths: $ANode[] = this.findPathPixis(start.x, start.y, pos.x, pos.y);
        if (!paths) {
            console.timeEnd("findPath");
            return;
        }
        this.drawMap(paths);
        actor.setPaths(paths, pos);
        paths = this.findPathPixis(this._petMove.node.x, this._petMove.node.y, pos.x + 50, pos.y - 10);
        if (!paths) {
            paths = this.findPathPixis(this._petMove.node.x, this._petMove.node.y, pos.x - 50, pos.y - 10);
        }
        if (paths) {
            this._petMove.setPaths(paths, pos);
        }
        console.timeEnd("findPath");
    }
    private onRoleTouchDown(evt: UIMouseEvent): void {
        let pos: cc.Vec2 = this.convertToNodeSpaceAR(evt.getLocation());
        this.moveTo(pos);
    }

    private onMouseUp(evt: UIMouseEvent): void {

    }

    private updateCamera(evt?: $AEvent): void {
        if (!this.isFocus || !this.roleCamera) {
            return;
        }
        let pos: cc.Vec2 = this._roleMove.getPosition();
        let cx: number = (pos.x - this.node.width / 2);
        cx = Math.max(this._minCameraX, Math.min(this._maxCamearX, cx));
        this.roleCamera.node.x = cx;
        let cy: number = (pos.y - this.node.height / 2);
        cy = Math.max(this._minCameraY, Math.min(this._maxCamearY, cy));
        this.roleCamera.node.y = cy;
    }

    private onRoleWalk(): void {
        Actor().walkLeft();
    }

    private onRoleStand(): void {
        let actor = Actor();
        if (actor.getAction() == ERoleAction.WALK_LEFT || actor.getAction() == ERoleAction.WALK_RIGHT) {
            actor.stand();
        }
    }
    private onPetWalk(): void {
        Actor().pet.walkLeft();
    }

    private onPetStand(): void {
        Actor().pet.stand();
    }

    private onMoveRole(evt: $AEvent): void {
        this.moveTo(evt.worldPos);
    }

    public convertToNodeSpace(pos: cc.Vec2): cc.Vec2 {
        pos = new cc.Vec2(pos.x + this.node.width * this.node.anchorX,
            pos.y + this.node.height * this.node.anchorY);
        return pos;
    }
    public convertToNodeSpaceAR(pos: cc.Vec2): cc.Vec2 {
        pos = this.node.convertToNodeSpaceAR(pos);
        pos = new cc.Vec2(pos.x + this.node.width * this.node.anchorX,
            pos.y + this.node.height * this.node.anchorY);
        return pos;
    }

}