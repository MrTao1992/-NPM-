/*
 * @Description: 移动区域套件
 */

import { gLog, GraphUtil, NodeUtil } from "zmg_util";
import { $AGrid } from "./AGrid";
import { $ANode } from "./ANode";
import $ATarget from "./ATarget";

const { ccclass, property } = cc._decorator;

export default class $AMap extends cc.Component {
    @property({ tooltip: "是否绘画" })
    isDebug: boolean = false;

    @property({ type: cc.Node })
    debugNode: cc.Node = null;

    // @property({ type: cc.JsonAsset, tooltip: "碰撞数据" })
    // data: cc.JsonAsset = null;

    @property({ tooltip: "地图间隔" })
    distance: number = 20.0;

    @property({ type: cc.PolygonCollider, tooltip: "移动区域" })
    moveArea: cc.PolygonCollider = null;

    @property({ type: cc.Collider, tooltip: "碰撞区域" })
    collides: cc.Collider[] = [];

    protected _grid: $AGrid;

    // protected _offV2: cc.Vec2;
    private _delayFuns: { target: any, fun: Function }[] = [];

    public hitTest(x1: number, y1: number, x2: number, y2: number): boolean {
        gLog("AMap检测碰撞...");
        let x = x1 - x2;
        let y = y1 - y2;
        return x * x + y * y < this.distance * this.distance;
    }
    onLoad() {

        // this._offV2 = this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));
        // this._offV2.x = -this._offV2.x;
        // this._offV2.y = -this._offV2.y;
    }

    public colliderNoOffect(polygon: cc.Collider): void {
        gLog("AMap偏移量设置。");
        if (polygon instanceof cc.PolygonCollider || polygon instanceof cc.CircleCollider) {
            polygon.world.points.forEach((value: cc.Vec2, index: number, array: cc.Vec2[]) => {
                polygon.world.points[index] = value.add(polygon.offset);
            });
            polygon.offset = new cc.Vec2(0, 0);
        }
    }
    public onReady(readyFun: Function, target: any): void {
        gLog("AMap地图设置。");
        if (this._grid) {
            readyFun.call(target, this._grid);
        } else {
            this._delayFuns.push({ target: target, fun: readyFun });
        }
    }
    protected setGrid(data: $AGrid): void {
        gLog("AMap设置地图数据。");
        this._grid = data;
        let i: number;
        let len: number = this._delayFuns.length;
        for (i = 0; i < len; i++) {
            if (cc.isValid(this._delayFuns[i].target)) {
                this._delayFuns[i].fun.call(this._delayFuns[i].target, this._grid);
            }
        }
        this._delayFuns.length = 0;
    }
    public get offV2(): cc.Vec2 {
        gLog("AMap获取偏移量。");
        let offV2: cc.Vec2 = this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));
        offV2.x = -offV2.x;
        offV2.y = -offV2.y;
        let cameraOff: cc.Vec2 = cc.Camera.main.node.getPosition();
        offV2 = new cc.Vec2(offV2.x, offV2.y);
        offV2 = offV2.add(cameraOff);
        return offV2;
    }
    private parseMapByCollider(collider: cc.PolygonCollider, coversArr: cc.Collider[]): void {
        gLog("AMap解析地图1。");
        var i: number;
        var j: number;
        var n: number;
        var a: number = Math.ceil(this.node.width / this.distance);
        var b: number = Math.ceil(this.node.height / this.distance);
        var pos: cc.Vec2;
        var bool: boolean;
        let points = collider.world.points;
        var cLen: number = coversArr.length;
        var gird = new $AGrid(a, b, this.distance);
        let offV2 = this.offV2;
        for (i = 0; i < a; i++) {
            for (j = 0; j < b; j++) {
                pos = new cc.Vec2(i * this.distance, j * this.distance);
                if (this.getHitPoint(pos, points)) {
                    bool = true;
                    pos = pos.sub(offV2);
                    for (n = 0; n < cLen; n++) {
                        if (GraphUtil.hitTest(pos, coversArr[n])) {
                            bool = false;
                            break;
                        }
                    }
                } else {
                    bool = false;
                }
                gird.setWalkable(i, j, bool);
                // paths += bool;
            }
        }
        this.setGrid(gird);
    }
    private parseMap(paths: string): void {
        gLog("AMap解析地图2。");
        var i: number;
        var j: number;
        var a: number = Math.ceil(this.node.width / this.distance);
        var b: number = Math.ceil(this.node.height / this.distance);
        var gird = new $AGrid(a, b, this.distance);
        var temp: string[] = paths.split("");
        for (i = 0; i < a; i++) {
            for (j = 0; j < b; j++) {
                if (temp[i * b + j] == "0") {
                    gird.setWalkable(i, j, false);
                } else {
                    gird.setWalkable(i, j, true);
                }
            }
        }
        temp.length = 0;
        temp = null;
        this.setGrid(gird);
    }
    public drawMap(target?: $ANode[]): void {
        if (!this.isDebug) {
            return;
        }
        var node: $ANode;
        var i: number, j: number;
        var nd: cc.Node = new cc.Node();
        nd.setParent(this.debugNode);
        nd.name = "drawNode";
        var g: cc.Graphics = NodeUtil.createComponent(cc.Graphics, nd);
        var a: number = Math.ceil(this.node.width / this.distance);
        var b: number = Math.ceil(this.node.height / this.distance);
        var dix: number = this.node.width * this.node.anchorX;
        var diy: number = this.node.height * this.node.anchorY;
        g.clear();
        for (i = 0; i < a; i++) {
            for (j = 0; j < b; j++) {
                node = this._grid.getNodeByAB(i, j);
                if (node && node.walkable) {
                    if (target && target.indexOf(node) != -1) {
                        g.fillColor = cc.Color.WHITE;
                        g.fillRect(i * this.distance - dix, j * this.distance - diy, this.distance / 2, this.distance / 2);
                    } else {
                        g.fillColor = cc.Color.RED;
                        g.fillRect(i * this.distance - dix, j * this.distance - diy, this.distance / 2, this.distance / 2);
                    }

                }
            }
        }
    }
    onDestroy(): void {
        this._delayFuns.length = null;
    }
    /**
     * onLoad不存在
     * cc.PolygonCollider.world
     */
    start() {


        this.colliderNoOffect(this.moveArea);
        this.collides.forEach((value: cc.Collider, index: number, array: cc.Collider[]) => {
            this.colliderNoOffect(value);
        });
        this.parseMapByCollider(this.moveArea, this.collides);
        this.drawMap();
        // let pos: cc.Vec2 = new cc.Vec2(1128, 257);
        // this.node.convertToWorldSpaceAR(pos, pos);
        // gLog("#!!#@!:" + cc.Intersection.pointInPolygon(pos, this.moveArea.world.points), pos.x, pos.y);
    }

    public getHitPoint(pos: cc.Vec2, points: cc.Vec2[]): cc.Vec2 {
        // pos = new cc.Vec2(pos.x - this.node.width * this.node.anchorX,
        //     pos.y - this.node.height * this.node.anchorY);
        // pos.x = pos.x - this.node.width * this.node.anchorX;
        // pos.y = pos.y - this.node.height * this.node.anchorY;
        if (cc.Intersection.pointInPolygon(pos, points)) {
            return pos;
        }
        return null;
    }

    public getNode(pos: cc.Vec2 | cc.Vec3): $ANode {
        if (!this._grid) {
            return null;
        }
        // pos = new cc.Vec2(pos.x + this.node.width * this.node.anchorX,
        //     pos.y + this.node.height * this.node.anchorY);
        return this._grid.getNode(pos);
    }
    public getWalkNode(pos: cc.Vec2 | cc.Vec3): $ANode {
        gLog("AMap获取节点...");
        if (!this._grid) {
            return null;
        }
        // pos = new cc.Vec2(pos.x + this.node.width * this.node.anchorX,
        //     pos.y + this.node.height * this.node.anchorY);
        return this._grid.getWalkByPixel(pos);
    }

    public findPathPixis(startX: number, startY: number, endX: number, endY: number): $ANode[] {
        gLog("AMap根据像素获取节点...");
        var paths: $ANode[] = this._grid.findPathPixis(startX, startY, endX, endY);
        return paths;
    }
}
