import { GraphUtil } from "zmg_util";
import { $AGrid } from "./AGrid";
import { $ANode } from "./ANode";
import { $AEvent } from "./AEvent";
const { ccclass, property } = cc._decorator;
/**
 * 会移动的对象
 */
export default class $ATarget extends cc.Component {

    protected _easingY: string = "";

    public angleLib: number[][];

    protected _targetANode: $ANode;

    protected _square: number = 100 * 100;

    protected _degree: number;
    protected _speed: number = 160;
    protected _direction: number = 1;

    protected _paths: $ANode[];

    protected _isMoving: boolean;
    protected _target: cc.Node;

    private _oriScaleX: number = 1.0;
    private _oriScaleY: number = 1.0;

    public set oriScaleX(value: number) {
        this._oriScaleX = value;
    }

    public set oriScaleY(value: number) {
        this._oriScaleY = value;
    }
    public setTarget(node: cc.Node): void {
        this._target = node;
    }

    onLoad() {
    }

    onEnable(): void {
        this.stopWalk();
    }
    onDisable(): void {

    }

    public setPosition(pos: cc.Vec2 | number, y?: number): void {
        this.node.setPosition(pos, y);
        this.updateEasing();
    }

    public getPosition(): cc.Vec2 {
        return this.node.getPosition();
    }

    public setEasingY(easingY: string): void {
        this._easingY = easingY;
        this.updateEasing();
    }
    public updateEasing(): void {
        let target: cc.Node = this._target ? this._target : this.node;
        var scale: number = this.mathScaleY(this.node.y);
        this.node.scaleY = scale * this._oriScaleY;
        this.node.scaleX = scale * this._oriScaleX;
        target.scaleX = Math.abs(target.scaleX) * this._direction;
    }

    // public set scale(value: number) {
    //     if (this.node.scaleX != value) {
    //         this.node.scaleX = value;
    //         this.node.scaleY = value * this._direction;
    //     }
    // }

    public get speed(): number {
        return this._speed;
    }
    public set speed(value: number) {
        this._speed = value;
        var i: number, j: number;
        var len: number = GraphUtil.angleLib.length;
        this.angleLib = [];
        for (i = 0; i < len; i++) {
            this.angleLib[i] = [];
            for (j = 0; j < 2; j++) {
                //计算移动速度
                this.angleLib[i][j] = Math.round(GraphUtil.angleLib[i][j] * value * 1000) / 1000;
            }
        }
    }


    public get isMoving(): boolean {
        return this._isMoving;
    }

    public walk(): void {
        this._isMoving = true;
        let evt: $AEvent = new $AEvent($AEvent.ROLE_WALK);
        this.node.dispatchEvent(evt);
    }

    public stopWalk(): void {
        this._targetANode = null;
        this._isMoving = false;
        this._paths = null;
        let evt: $AEvent = new $AEvent($AEvent.ROLE_STAND);
        this.node.dispatchEvent(evt);
    }

    public stopTalk(): void {
    }

    public isHit(pos: cc.Vec2): boolean {
        // let now: cc.Vec2 = this.getPosition();
        // return GraphUtil.squareDis(pos.x, pos.y, now.x, now.y) <= 20 * 20;
        return false;
    }

    public toRoom(x: number, y: number, swapNode: cc.Node): void {
        this.node.x = x;
        this.node.y = y;
        swapNode.addChild(this.node);
    }

    update(dt: number): void {
        if (this._isMoving) {
            if (this._targetANode) {
                var dis: number;
                var pos: cc.Vec2;
                var tx: number = this._targetANode.x - this.node.x;
                var ty: number = this._targetANode.y - this.node.y;
                dis = (tx * tx + ty * ty);
                pos = this.mathSpeed(dt);
                if (pos) {
                    this.updateTarget(pos);
                }
                if (dis < this._square * dt) {
                    if (!this._paths.length) {
                        this.node.setPosition(this._targetANode.x, this._targetANode.y);
                    }
                    this._targetANode = null;
                }
            } else {
                if (this._paths && this._paths.length) {
                    this._targetANode = this._paths.shift();
                } else {
                    this.stopWalk();
                }
            }
        }
    }
    protected updateTarget(pos: cc.Vec2): void {
        if (pos) {
            let target: cc.Node = this._target ? this._target : this.node;
            var scale: number = this.mathScaleY(this.node.y);
            let ratio: number = 0.3 + 0.7 * scale;
            this.node.scaleY = scale * this._oriScaleY;
            this.node.scaleX = scale * this._oriScaleX;
            target.scaleX = Math.abs(target.scaleX) * this._direction;
            this.node.setPosition(this.node.x + pos.x * ratio, this.node.y + pos.y * ratio);
            this.node.dispatchEvent(new $AEvent($AEvent.ROLE_MOVE, true));
        }
    }

    private mathScaleY(y: number): number {
        // if (this._easingY != "") {
        // return parseFloat(eval(this._easingY.replace("y", y.toString())));
        // }
        return 1;
    }

    public setPaths(paths: $ANode[], pos: cc.Vec2): void {
        if (paths && paths.length) {
            this._paths = paths;
            this.walk();
        } else {
            this.stopWalk();
        }
    }

    /**
     * 设置移动角度
     */
    public set degree(value: number) {
        if (this._degree != value) {
            this._degree = value;
            if (value != 0 && value != 180) {
                if (value > 0 && value < 180) {
                    this._direction = -1;
                    // this.node.scaleX = this._direction * this.node.scaleY;
                } else {
                    this._direction = 1;
                    // this.node.scaleX = -this._direction * this.node.scaleY;
                }
            }
        }
    }

    // public set direction(scaleX: number) {
    //     this.node.scaleX = scaleX * this.node.scaleY;
    // }

    protected mathSpeed(dt: number): cc.Vec2 {
        var pos: cc.Vec2;
        var degree: number = GraphUtil.getAngle(this.node.x, this.node.y, this._targetANode.x, this._targetANode.y);
        if (degree != 360) {
            pos = new cc.Vec2();
            var index: number = Math.round((degree + 360) % 360 / 45) % 8;
            pos.x = this.angleLib[index][0] * dt;
            pos.y = this.angleLib[index][1] * dt;
            this.degree = index * 45;
        }
        return pos;
    }

}