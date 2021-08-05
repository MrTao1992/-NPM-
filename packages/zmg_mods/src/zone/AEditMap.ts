/*
 * @Description: 移动区域套件
 */

import { gLog, GraphUtil, NodeUtil } from "zmg_util";
import { $AGrid } from "./AGrid";
import { $ANode } from "./ANode";

const { ccclass, property } = cc._decorator;

export default class $AEditMap extends cc.Component {
    @property({ tooltip: "是否绘画" })
    isDebug: boolean = false;

    @property({ type: cc.JsonAsset, tooltip: "碰撞数据" })
    data: cc.JsonAsset = null;

    @property({ type: cc.Collider, tooltip: "物品占用区" })
    covers: cc.Collider[] = [];

    @property({ type: cc.Collider, tooltip: "碰撞区域" })
    collider: cc.Collider = null;

    @property({ tooltip: "区域名称,打印使用具体数值按照加载进来的json决定" })
    zoneName: string = "";

    @property({ tooltip: "间距,打印使用具体数值按照加载进来的json决定" })
    distance: number = 10;

    private _grid: $AGrid;
    /**
     * 打印输出数据
     */
    private createMap(): string {
        var i: number;
        var j: number;
        var n: number;
        var a: number = Math.ceil(this.node.width / this.distance);
        var b: number = Math.ceil(this.node.height / this.distance);
        var paths: string = "";
        var pos: cc.Vec2;
        var hitPos: cc.Vec2;
        var bool: string;
        var cLen: number = this.covers.length;
        var col: cc.PolygonCollider = this.collider.getComponent(cc.PolygonCollider);
        let points = col.points.concat();
        for (i = 0; i < a; i++) {
            for (j = 0; j < b; j++) {
                pos = new cc.Vec2(i * this.distance, j * this.distance);
                if (this.getHitPoint(pos.sub(col.offset), points)) {
                    bool = "1";
                    for (n = 0; n < cLen; n++) {
                        if (GraphUtil.hitTest(pos, this.covers[n])) {
                            bool = "0";
                            break;
                        }
                    }
                } else {
                    bool = "0";
                }
                paths += bool;
            }
        }
        // let data: any = {};
        // data.name = this.zoneName;
        // data.distance = this.distance;
        // data.paths = paths;
        // let msg = JSON.stringify(data);
        // gLog.log("==================================================");
        // gLog.log(msg);
        // gLog.log("==================================================");
        // this.parseMap(paths);
        return paths;
    }
    private printMap(paths: string): void {
        let data: any = {};
        data.name = this.zoneName;
        data.distance = this.distance;
        data.paths = paths;
        let msg = JSON.stringify(data);
        gLog("==================================================");
        gLog(msg);
        gLog("==================================================");
        this.parseMap(paths);
    }
    private parseMap(paths: string): void {
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
        this._grid = gird;
    }
    public drawMap(target?: $ANode[]): void {
        if (!this.isDebug) {
            return;
        }
        var node: $ANode;
        var i: number, j: number;
        var nd: cc.Node = NodeUtil.createNode("mapGraphics", this.node);
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
    onLoad() {
        if (this.data) {
            this.distance = this.data.json.distance;
            this.name = this.data.json.name;
            this.parseMap(this.data.json.paths);
        } else {
            var paths: string = this.createMap();
            this.printMap(paths);
            this.parseMap(paths);
        }
        this.drawMap();
    }

    public getHitPoint(pos: cc.Vec2, points: cc.Vec2[]): cc.Vec2 {
        // pos = new cc.Vec2(pos.x - this.node.width * this.node.anchorX,
        //     pos.y - this.node.height * this.node.anchorY);
        pos.x = pos.x - this.node.width * this.node.anchorX;
        pos.y = pos.y - this.node.height * this.node.anchorY;
        if (cc.Intersection.pointInPolygon(pos, points)) {
            return pos;
        }
        return null;
    }

    public getHitNode(pos: cc.Vec2 | cc.Vec3): $ANode {
        if (!this._grid) {
            return null;
        }
        // pos = new cc.Vec2(pos.x + this.node.width * this.node.anchorX,
        //     pos.y + this.node.height * this.node.anchorY);
        return this._grid.getWalkByPixel(pos);
    }

    public findPathPixis(startX: number, startY: number, endX: number, endY: number): $ANode[] {
        var paths: $ANode[] = this._grid.findPathPixis(startX, startY, endX, endY);
        return paths;
    }
}
