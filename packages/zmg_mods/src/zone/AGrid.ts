import { gLog, gWarn } from "zmg_util";
import { $ANode } from "./ANode";
import { $AStar } from "./AStar";
/**
 * 网格类
 * @author chenkai
 * @since 2017/11/3
 */
// namespace astar{
export class $AGrid {
    private _startNode: $ANode;    //起点
    private _endNode: $ANode;      //终点
    private _nodes: $ANode[][];  //Node数组
    private _numCols: number;    //网格行列
    private _numRows: number;

    private _endX: number;
    private _endY: number;

    public dis: number;
    public astar: $AStar = new $AStar();

    public get endX(): number {
        return this._endX;
    }

    public get endY(): number {
        return this._endY;
    }

    public constructor(numCols: number, numRows: number, dis: number) {
        this._numCols = numCols;
        this._numRows = numRows;
        this.dis = dis;
        this._nodes = [];

        for (let i: number = 0; i < numCols; i++) {
            this._nodes[i] = [];
            for (let j: number = 0; j < numRows; j++) {
                this._nodes[i][j] = new $ANode(i, j, dis);
            }
        }
    }

    public getNodeByAB(x: number, y: number): $ANode {
        if (x >= 0 && x < this._nodes.length) {
            return this._nodes[x][y];
        }
        return null;
    }

    public getWalkAble(x: number, y: number): boolean {
        var n: $ANode = this.getNodeByAB(x, y);
        if (n && n.walkable) {
            return true;
        }
        return false;
    }

    public getRandomWalkPixel(time: number = 100): cc.Vec2 {
        time--;
        if (time < 0) {
            return null;
        }
        var pos: cc.Vec2 = new cc.Vec2();
        var totalY: number = cc.visibleRect.height / this.dis;
        var startY: number = (this._numRows - totalY);
        pos.x = Math.floor(Math.random() * this._numCols);
        pos.y = Math.floor(Math.random() * (totalY) + startY / 2);
        if (this.getNodeByAB(pos.x, pos.y).walkable) {
            gLog("随机到:" + pos.x, pos.y);
            return pos.mul(this.dis);
        }
        return this.getRandomWalkPixel(time);
    }

    public getWalkAbleByPixel(tx: number, ty: number): boolean {
        var i: number = Math.ceil(tx / this.dis);
        var j: number = Math.ceil(ty / this.dis);
        return this.getWalkAble(i, j);
    }

    public getWalkByPixel(pos: cc.Vec2 | cc.Vec3 | number, ty?: number): $ANode {
        if (pos instanceof cc.Vec2 || pos instanceof cc.Vec3) {
            return this.getNearWalkNode(Math.round(pos.x / this.dis), Math.round(pos.y / this.dis));
        } else {
            return this.getNearWalkNode(Math.round(pos / this.dis), Math.round(ty / this.dis));
        }
    }

    public getNode(pos: cc.Vec2 | cc.Vec3 | number, ty?: number): $ANode {
        if (pos instanceof cc.Vec2 || pos instanceof cc.Vec3) {
            return this.getNodeByAB(Math.round(pos.x / this.dis), Math.round(pos.y / this.dis));
        } else {
            return this.getNodeByAB(Math.round(pos / this.dis), Math.round(ty / this.dis));
        }
    }
    public getNearWalkNode(a: number, b: number): $ANode {
        var node: $ANode = this.getNodeByAB(a, b);
        if (node && node.walkable) {
            return node;
        }
        var count: number = 1;
        while (count < 3) {
            node = this.getNodeByAB(a + count, b)
            if (node && node.walkable) {
                return node;
            }
            node = this.getNodeByAB(a, b + count)
            if (node && node.walkable) {
                return node;
            }
            node = this.getNodeByAB(a - count, b)
            if (node && node.walkable) {
                return node;
            }
            node = this.getNodeByAB(a, b - count)
            if (node && node.walkable) {
                return node;
            }
            node = this.getNodeByAB(a + count, b + count)
            if (node && node.walkable) {
                return node;
            }
            node = this.getNodeByAB(a - count, b - count)
            if (node && node.walkable) {
                return node;
            }
            node = this.getNodeByAB(a + count, b - count)
            if (node && node.walkable) {
                return node;
            }
            node = this.getNodeByAB(a - count, b + count)
            if (node && node.walkable) {
                return node;
            }
            count++;
        }
        return null;
    }

    public findPathPixis(startX: number, startY: number, endX: number, endY: number): $ANode[] {
        var a: number;
        var b: number;
        var c: number;
        var d: number;
        var dix: number = startX - endX;
        if (Math.abs(dix) < this.dis) {
            startX = endX;
        } else {
            startX += (dix < 0 ? 1 : -1) * this.dis;
        }
        var diy: number = startY - endY;
        if (Math.abs(diy) < this.dis) {
            startY = endY;
        } else {
            startY += (diy < 0 ? 1 : -1) * this.dis;
        }
        a = Math.round(startX / this.dis);
        b = Math.round(startY / this.dis);
        var startNode: $ANode = this.getNearWalkNode(a, b);
        if (!startNode) {
            gWarn("起点不可行走");
            return null;
        }
        var endNode: $ANode = this.getNearWalkNode(Math.round(endX / this.dis), Math.round(endY / this.dis));
        if (!endNode) {
            gWarn("终点不可行走");
            return null;
        }
        if (this.setStartNode(startNode.a, startNode.b)) {
            if (this.setEndNode(endNode.a, endNode.b)) {
                this.astar.findPath(this);
                this._endX = endX;
                this._endY = endY;
                return this.astar.path;
            }
        }
        gWarn("起点或终点非法:", startX, startY, endX, endY);
        return null;
    }


    public setEndNode(x: number, y: number): boolean {
        if (this._nodes[x] && this._nodes[x][y]) {
            this._endNode = this._nodes[x][y];
            return true;
        } else {
            gWarn("非法终点:", x, y);
        }
        return false;
    }

    public setStartNode(x: number, y: number): boolean {
        if (this._nodes[x] && this._nodes[x][y]) {
            this._startNode = this._nodes[x][y];
            return true;
        } else {
            gWarn("非法起点:", x, y);
        }
        return false;
    }

    public setWalkable(x: number, y: number, value: boolean) {
        this._nodes[x][y].walkable = value;
    }

    public get endNode() {
        return this._endNode;
    }

    public get numCols() {
        return this._numCols;
    }

    public get numRows() {
        return this._numRows;
    }

    public get startNode() {
        return this._startNode;
    }

    public destory(): void {

    }
}
// }
