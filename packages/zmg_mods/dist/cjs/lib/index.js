'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_util = require('zmg_util');
var zmg_event_mgr = require('zmg_event_mgr');
var zmg_ui_mgr = require('zmg_ui_mgr');
var zmg_time_mgr = require('zmg_time_mgr');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

/**
 * Node 节点
 * @author chenkai
 * @since 2017/11/3
 */
// namespace astar{
var $ANode = /** @class */ (function () {
    function $ANode(a, b, dis) {
        this.walkable = true;
        this.costMultiplier = 1.0;
        this.a = a;
        this.b = b;
        this.x = a * dis;
        this.y = b * dis;
    }
    Object.defineProperty($ANode.prototype, "postion", {
        get: function () {
            return new cc.Vec2(this.x, this.y);
        },
        enumerable: false,
        configurable: true
    });
    return $ANode;
}());
// }

/**
 * A星寻路
 * @author chenkai
 * @since 2017/11/3
 */
// namespace astar{
var $AStar = /** @class */ (function () {
    function $AStar() {
        this._straightCost = 1.0; //上下左右走的代价
        this._diagCost = Math.SQRT2; //斜着走的代价 
        // this._heuristic = this.manhattan;
        // this._heuristic = this.euclidian;
        this._heuristic = this.diagonal;
    }
    //寻路
    $AStar.prototype.findPath = function (grid) {
        this._grid = grid;
        this._open = [];
        this._closed = [];
        this._startNode = this._grid.startNode;
        this._endNode = this._grid.endNode;
        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;
        return this.search();
    };
    //查找路径
    $AStar.prototype.search = function () {
        var node = this._startNode;
        while (node != this._endNode) {
            var startX = Math.max(0, node.a - 1);
            var endX = Math.min(this._grid.numCols - 1, node.a + 1);
            var startY = Math.max(0, node.b - 1);
            var endY = Math.min(this._grid.numRows - 1, node.b + 1);
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    //不让斜着走
                    // if (i != node.x && j != node.y) {
                    // 	continue;
                    // }
                    var test = this._grid.getNodeByAB(i, j);
                    if (test == node ||
                        !test.walkable ||
                        !this._grid.getNodeByAB(node.a, test.b).walkable ||
                        !this._grid.getNodeByAB(test.a, node.b).walkable) {
                        continue;
                    }
                    var cost = this._straightCost;
                    if (!((node.a == test.a) || (node.b == test.b))) {
                        cost = this._diagCost;
                    }
                    var g = node.g + cost * test.costMultiplier;
                    var h = this._heuristic(test);
                    var f = g + h;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = node;
                        }
                    }
                    else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = node;
                        this._open.push(test);
                    }
                }
            }
            for (var o = 0; o < this._open.length; o++) {
            }
            this._closed.push(node);
            if (this._open.length == 0) {
                console.log("AStar >> no path found");
                return false;
            }
            var openLen = this._open.length;
            for (var m = 0; m < openLen; m++) {
                for (var n = m + 1; n < openLen; n++) {
                    if (this._open[m].f > this._open[n].f) {
                        var temp = this._open[m];
                        this._open[m] = this._open[n];
                        this._open[n] = temp;
                    }
                }
            }
            node = this._open.shift();
        }
        this.buildPath();
        return true;
    };
    //获取路径
    $AStar.prototype.buildPath = function () {
        this._path = new Array();
        var node = this._endNode;
        this._path.push(node);
        while (node != this._startNode) {
            node = node.parent;
            this._path.unshift(node);
        }
    };
    Object.defineProperty($AStar.prototype, "path", {
        get: function () {
            return this._path;
        },
        enumerable: false,
        configurable: true
    });
    //是否待检查
    $AStar.prototype.isOpen = function (node) {
        for (var i = 0; i < this._open.length; i++) {
            if (this._open[i] == node) {
                return true;
            }
        }
        return false;
    };
    //是否已检查
    $AStar.prototype.isClosed = function (node) {
        for (var i = 0; i < this._closed.length; i++) {
            if (this._closed[i] == node) {
                return true;
            }
        }
        return false;
    };
    //曼哈顿算法
    $AStar.prototype.manhattan = function (node) {
        return Math.abs(node.a - this._endNode.a) * this._straightCost + Math.abs(node.b + this._endNode.b) * this._straightCost;
    };
    $AStar.prototype.euclidian = function (node) {
        var dx = node.a - this._endNode.a;
        var dy = node.b - this._endNode.b;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    };
    $AStar.prototype.diagonal = function (node) {
        var dx = Math.abs(node.a - this._endNode.a);
        var dy = Math.abs(node.b - this._endNode.b);
        var diag = Math.min(dx, dy);
        var straight = dx + dy;
        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    };
    Object.defineProperty($AStar.prototype, "visited", {
        get: function () {
            return this._closed.concat(this._open);
        },
        enumerable: false,
        configurable: true
    });
    return $AStar;
}());
// }

/**
 * 网格类
 * @author chenkai
 * @since 2017/11/3
 */
// namespace astar{
var $AGrid = /** @class */ (function () {
    function $AGrid(numCols, numRows, dis) {
        this.astar = new $AStar();
        this._numCols = numCols;
        this._numRows = numRows;
        this.dis = dis;
        this._nodes = [];
        for (var i = 0; i < numCols; i++) {
            this._nodes[i] = [];
            for (var j = 0; j < numRows; j++) {
                this._nodes[i][j] = new $ANode(i, j, dis);
            }
        }
    }
    Object.defineProperty($AGrid.prototype, "endX", {
        get: function () {
            return this._endX;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($AGrid.prototype, "endY", {
        get: function () {
            return this._endY;
        },
        enumerable: false,
        configurable: true
    });
    $AGrid.prototype.getNodeByAB = function (x, y) {
        if (x >= 0 && x < this._nodes.length) {
            return this._nodes[x][y];
        }
        return null;
    };
    $AGrid.prototype.getWalkAble = function (x, y) {
        var n = this.getNodeByAB(x, y);
        if (n && n.walkable) {
            return true;
        }
        return false;
    };
    $AGrid.prototype.getRandomWalkPixel = function (time) {
        if (time === void 0) { time = 100; }
        time--;
        if (time < 0) {
            return null;
        }
        var pos = new cc.Vec2();
        var totalY = cc.visibleRect.height / this.dis;
        var startY = (this._numRows - totalY);
        pos.x = Math.floor(Math.random() * this._numCols);
        pos.y = Math.floor(Math.random() * (totalY) + startY / 2);
        if (this.getNodeByAB(pos.x, pos.y).walkable) {
            zmg_util.gLog("随机到:" + pos.x, pos.y);
            return pos.mul(this.dis);
        }
        return this.getRandomWalkPixel(time);
    };
    $AGrid.prototype.getWalkAbleByPixel = function (tx, ty) {
        var i = Math.ceil(tx / this.dis);
        var j = Math.ceil(ty / this.dis);
        return this.getWalkAble(i, j);
    };
    $AGrid.prototype.getWalkByPixel = function (pos, ty) {
        if (pos instanceof cc.Vec2 || pos instanceof cc.Vec3) {
            return this.getNearWalkNode(Math.round(pos.x / this.dis), Math.round(pos.y / this.dis));
        }
        else {
            return this.getNearWalkNode(Math.round(pos / this.dis), Math.round(ty / this.dis));
        }
    };
    $AGrid.prototype.getNode = function (pos, ty) {
        if (pos instanceof cc.Vec2 || pos instanceof cc.Vec3) {
            return this.getNodeByAB(Math.round(pos.x / this.dis), Math.round(pos.y / this.dis));
        }
        else {
            return this.getNodeByAB(Math.round(pos / this.dis), Math.round(ty / this.dis));
        }
    };
    $AGrid.prototype.getNearWalkNode = function (a, b) {
        var node = this.getNodeByAB(a, b);
        if (node && node.walkable) {
            return node;
        }
        var count = 1;
        while (count < 3) {
            node = this.getNodeByAB(a + count, b);
            if (node && node.walkable) {
                return node;
            }
            node = this.getNodeByAB(a, b + count);
            if (node && node.walkable) {
                return node;
            }
            node = this.getNodeByAB(a - count, b);
            if (node && node.walkable) {
                return node;
            }
            node = this.getNodeByAB(a, b - count);
            if (node && node.walkable) {
                return node;
            }
            node = this.getNodeByAB(a + count, b + count);
            if (node && node.walkable) {
                return node;
            }
            node = this.getNodeByAB(a - count, b - count);
            if (node && node.walkable) {
                return node;
            }
            node = this.getNodeByAB(a + count, b - count);
            if (node && node.walkable) {
                return node;
            }
            node = this.getNodeByAB(a - count, b + count);
            if (node && node.walkable) {
                return node;
            }
            count++;
        }
        return null;
    };
    $AGrid.prototype.findPathPixis = function (startX, startY, endX, endY) {
        var a;
        var b;
        var dix = startX - endX;
        if (Math.abs(dix) < this.dis) {
            startX = endX;
        }
        else {
            startX += (dix < 0 ? 1 : -1) * this.dis;
        }
        var diy = startY - endY;
        if (Math.abs(diy) < this.dis) {
            startY = endY;
        }
        else {
            startY += (diy < 0 ? 1 : -1) * this.dis;
        }
        a = Math.round(startX / this.dis);
        b = Math.round(startY / this.dis);
        var startNode = this.getNearWalkNode(a, b);
        if (!startNode) {
            zmg_util.gWarn("起点不可行走");
            return null;
        }
        var endNode = this.getNearWalkNode(Math.round(endX / this.dis), Math.round(endY / this.dis));
        if (!endNode) {
            zmg_util.gWarn("终点不可行走");
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
        zmg_util.gWarn("起点或终点非法:", startX, startY, endX, endY);
        return null;
    };
    $AGrid.prototype.setEndNode = function (x, y) {
        if (this._nodes[x] && this._nodes[x][y]) {
            this._endNode = this._nodes[x][y];
            return true;
        }
        else {
            zmg_util.gWarn("非法终点:", x, y);
        }
        return false;
    };
    $AGrid.prototype.setStartNode = function (x, y) {
        if (this._nodes[x] && this._nodes[x][y]) {
            this._startNode = this._nodes[x][y];
            return true;
        }
        else {
            zmg_util.gWarn("非法起点:", x, y);
        }
        return false;
    };
    $AGrid.prototype.setWalkable = function (x, y, value) {
        this._nodes[x][y].walkable = value;
    };
    Object.defineProperty($AGrid.prototype, "endNode", {
        get: function () {
            return this._endNode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($AGrid.prototype, "numCols", {
        get: function () {
            return this._numCols;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($AGrid.prototype, "numRows", {
        get: function () {
            return this._numRows;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($AGrid.prototype, "startNode", {
        get: function () {
            return this._startNode;
        },
        enumerable: false,
        configurable: true
    });
    $AGrid.prototype.destory = function () {
    };
    return $AGrid;
}());
// }

/*
 * @Description: 移动区域套件
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var $AMap = /** @class */ (function (_super) {
    __extends($AMap, _super);
    function $AMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDebug = false;
        _this.debugNode = null;
        // @property({ type: cc.JsonAsset, tooltip: "碰撞数据" })
        // data: cc.JsonAsset = null;
        _this.distance = 20.0;
        _this.moveArea = null;
        _this.collides = [];
        // protected _offV2: cc.Vec2;
        _this._delayFuns = [];
        return _this;
    }
    $AMap.prototype.hitTest = function (x1, y1, x2, y2) {
        zmg_util.gLog("AMap检测碰撞...");
        var x = x1 - x2;
        var y = y1 - y2;
        return x * x + y * y < this.distance * this.distance;
    };
    $AMap.prototype.onLoad = function () {
        // this._offV2 = this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));
        // this._offV2.x = -this._offV2.x;
        // this._offV2.y = -this._offV2.y;
    };
    $AMap.prototype.colliderNoOffect = function (polygon) {
        zmg_util.gLog("AMap偏移量设置。");
        if (polygon instanceof cc.PolygonCollider || polygon instanceof cc.CircleCollider) {
            polygon.world.points.forEach(function (value, index, array) {
                polygon.world.points[index] = value.add(polygon.offset);
            });
            polygon.offset = new cc.Vec2(0, 0);
        }
    };
    $AMap.prototype.onReady = function (readyFun, target) {
        zmg_util.gLog("AMap地图设置。");
        if (this._grid) {
            readyFun.call(target, this._grid);
        }
        else {
            this._delayFuns.push({ target: target, fun: readyFun });
        }
    };
    $AMap.prototype.setGrid = function (data) {
        zmg_util.gLog("AMap设置地图数据。");
        this._grid = data;
        var i;
        var len = this._delayFuns.length;
        for (i = 0; i < len; i++) {
            if (cc.isValid(this._delayFuns[i].target)) {
                this._delayFuns[i].fun.call(this._delayFuns[i].target, this._grid);
            }
        }
        this._delayFuns.length = 0;
    };
    Object.defineProperty($AMap.prototype, "offV2", {
        get: function () {
            zmg_util.gLog("AMap获取偏移量。");
            var offV2 = this.node.convertToWorldSpaceAR(new cc.Vec2(0, 0));
            offV2.x = -offV2.x;
            offV2.y = -offV2.y;
            var cameraOff = cc.Camera.main.node.getPosition();
            offV2 = new cc.Vec2(offV2.x, offV2.y);
            offV2 = offV2.add(cameraOff);
            return offV2;
        },
        enumerable: false,
        configurable: true
    });
    $AMap.prototype.parseMapByCollider = function (collider, coversArr) {
        zmg_util.gLog("AMap解析地图1。");
        var i;
        var j;
        var n;
        var a = Math.ceil(this.node.width / this.distance);
        var b = Math.ceil(this.node.height / this.distance);
        var pos;
        var bool;
        var points = collider.world.points;
        var cLen = coversArr.length;
        var gird = new $AGrid(a, b, this.distance);
        var offV2 = this.offV2;
        for (i = 0; i < a; i++) {
            for (j = 0; j < b; j++) {
                pos = new cc.Vec2(i * this.distance, j * this.distance);
                if (this.getHitPoint(pos, points)) {
                    bool = true;
                    pos = pos.sub(offV2);
                    for (n = 0; n < cLen; n++) {
                        if (zmg_util.GraphUtil.hitTest(pos, coversArr[n])) {
                            bool = false;
                            break;
                        }
                    }
                }
                else {
                    bool = false;
                }
                gird.setWalkable(i, j, bool);
                // paths += bool;
            }
        }
        this.setGrid(gird);
    };
    $AMap.prototype.parseMap = function (paths) {
        zmg_util.gLog("AMap解析地图2。");
        var i;
        var j;
        var a = Math.ceil(this.node.width / this.distance);
        var b = Math.ceil(this.node.height / this.distance);
        var gird = new $AGrid(a, b, this.distance);
        var temp = paths.split("");
        for (i = 0; i < a; i++) {
            for (j = 0; j < b; j++) {
                if (temp[i * b + j] == "0") {
                    gird.setWalkable(i, j, false);
                }
                else {
                    gird.setWalkable(i, j, true);
                }
            }
        }
        temp.length = 0;
        temp = null;
        this.setGrid(gird);
    };
    $AMap.prototype.drawMap = function (target) {
        if (!this.isDebug) {
            return;
        }
        var node;
        var i, j;
        var nd = new cc.Node();
        nd.setParent(this.debugNode);
        nd.name = "drawNode";
        var g = zmg_util.NodeUtil.createComponent(cc.Graphics, nd);
        var a = Math.ceil(this.node.width / this.distance);
        var b = Math.ceil(this.node.height / this.distance);
        var dix = this.node.width * this.node.anchorX;
        var diy = this.node.height * this.node.anchorY;
        g.clear();
        for (i = 0; i < a; i++) {
            for (j = 0; j < b; j++) {
                node = this._grid.getNodeByAB(i, j);
                if (node && node.walkable) {
                    if (target && target.indexOf(node) != -1) {
                        g.fillColor = cc.Color.WHITE;
                        g.fillRect(i * this.distance - dix, j * this.distance - diy, this.distance / 2, this.distance / 2);
                    }
                    else {
                        g.fillColor = cc.Color.RED;
                        g.fillRect(i * this.distance - dix, j * this.distance - diy, this.distance / 2, this.distance / 2);
                    }
                }
            }
        }
    };
    $AMap.prototype.onDestroy = function () {
        this._delayFuns.length = null;
    };
    /**
     * onLoad不存在
     * cc.PolygonCollider.world
     */
    $AMap.prototype.start = function () {
        var _this = this;
        this.colliderNoOffect(this.moveArea);
        this.collides.forEach(function (value, index, array) {
            _this.colliderNoOffect(value);
        });
        this.parseMapByCollider(this.moveArea, this.collides);
        this.drawMap();
        // let pos: cc.Vec2 = new cc.Vec2(1128, 257);
        // this.node.convertToWorldSpaceAR(pos, pos);
        // gLog("#!!#@!:" + cc.Intersection.pointInPolygon(pos, this.moveArea.world.points), pos.x, pos.y);
    };
    $AMap.prototype.getHitPoint = function (pos, points) {
        // pos = new cc.Vec2(pos.x - this.node.width * this.node.anchorX,
        //     pos.y - this.node.height * this.node.anchorY);
        // pos.x = pos.x - this.node.width * this.node.anchorX;
        // pos.y = pos.y - this.node.height * this.node.anchorY;
        if (cc.Intersection.pointInPolygon(pos, points)) {
            return pos;
        }
        return null;
    };
    $AMap.prototype.getNode = function (pos) {
        if (!this._grid) {
            return null;
        }
        // pos = new cc.Vec2(pos.x + this.node.width * this.node.anchorX,
        //     pos.y + this.node.height * this.node.anchorY);
        return this._grid.getNode(pos);
    };
    $AMap.prototype.getWalkNode = function (pos) {
        zmg_util.gLog("AMap获取节点...");
        if (!this._grid) {
            return null;
        }
        // pos = new cc.Vec2(pos.x + this.node.width * this.node.anchorX,
        //     pos.y + this.node.height * this.node.anchorY);
        return this._grid.getWalkByPixel(pos);
    };
    $AMap.prototype.findPathPixis = function (startX, startY, endX, endY) {
        zmg_util.gLog("AMap根据像素获取节点...");
        var paths = this._grid.findPathPixis(startX, startY, endX, endY);
        return paths;
    };
    __decorate([
        property({ tooltip: "是否绘画" }),
        __metadata("design:type", Boolean)
    ], $AMap.prototype, "isDebug", void 0);
    __decorate([
        property({ type: cc.Node }),
        __metadata("design:type", cc.Node)
    ], $AMap.prototype, "debugNode", void 0);
    __decorate([
        property({ tooltip: "地图间隔" }),
        __metadata("design:type", Number)
    ], $AMap.prototype, "distance", void 0);
    __decorate([
        property({ type: cc.PolygonCollider, tooltip: "移动区域" }),
        __metadata("design:type", cc.PolygonCollider)
    ], $AMap.prototype, "moveArea", void 0);
    __decorate([
        property({ type: cc.Collider, tooltip: "碰撞区域" }),
        __metadata("design:type", Array)
    ], $AMap.prototype, "collides", void 0);
    return $AMap;
}(cc.Component));

var $AEvent = /** @class */ (function (_super) {
    __extends($AEvent, _super);
    function $AEvent(type, bubbles) {
        if (bubbles === void 0) { bubbles = false; }
        return _super.call(this, type, bubbles) || this;
    }
    Object.defineProperty($AEvent.prototype, "worldPos", {
        get: function () {
            return this._worldPos ? this._worldPos : zmg_ui_mgr.Actor().node.getPosition();
        },
        set: function (pos) {
            this._worldPos = pos;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 人物移动过程
     */
    $AEvent.ROLE_MOVE = "roleMove";
    /**
     * 人物开始移动
     */
    $AEvent.ROLE_WALK = "roleWalk";
    /**
     * 人物站立(结束移动)
     */
    $AEvent.ROLE_STAND = "roleStand";
    /**
     * 请求人物移动到当前位置的事件
     */
    $AEvent.ZONE_MOVE = zmg_event_mgr.EventName.UI_ZONE_MOVE;
    return $AEvent;
}(cc.Event));

var _a$1 = cc._decorator, ccclass$1 = _a$1.ccclass, property$1 = _a$1.property;
/**
 * 会移动的对象
 */
var $ATarget = /** @class */ (function (_super) {
    __extends($ATarget, _super);
    function $ATarget() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._easingY = "";
        _this._square = 100 * 100;
        _this._speed = 160;
        _this._direction = 1;
        _this._oriScaleX = 1.0;
        _this._oriScaleY = 1.0;
        return _this;
    }
    Object.defineProperty($ATarget.prototype, "oriScaleX", {
        set: function (value) {
            this._oriScaleX = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($ATarget.prototype, "oriScaleY", {
        set: function (value) {
            this._oriScaleY = value;
        },
        enumerable: false,
        configurable: true
    });
    $ATarget.prototype.setTarget = function (node) {
        this._target = node;
    };
    $ATarget.prototype.onLoad = function () {
    };
    $ATarget.prototype.onEnable = function () {
        this.stopWalk();
    };
    $ATarget.prototype.onDisable = function () {
    };
    $ATarget.prototype.setPosition = function (pos, y) {
        this.node.setPosition(pos, y);
        this.updateEasing();
    };
    $ATarget.prototype.getPosition = function () {
        return this.node.getPosition();
    };
    $ATarget.prototype.setEasingY = function (easingY) {
        this._easingY = easingY;
        this.updateEasing();
    };
    $ATarget.prototype.updateEasing = function () {
        var target = this._target ? this._target : this.node;
        var scale = this.mathScaleY(this.node.y);
        this.node.scaleY = scale * this._oriScaleY;
        this.node.scaleX = scale * this._oriScaleX;
        target.scaleX = Math.abs(target.scaleX) * this._direction;
    };
    Object.defineProperty($ATarget.prototype, "speed", {
        // public set scale(value: number) {
        //     if (this.node.scaleX != value) {
        //         this.node.scaleX = value;
        //         this.node.scaleY = value * this._direction;
        //     }
        // }
        get: function () {
            return this._speed;
        },
        set: function (value) {
            this._speed = value;
            var i, j;
            var len = zmg_util.GraphUtil.angleLib.length;
            this.angleLib = [];
            for (i = 0; i < len; i++) {
                this.angleLib[i] = [];
                for (j = 0; j < 2; j++) {
                    //计算移动速度
                    this.angleLib[i][j] = Math.round(zmg_util.GraphUtil.angleLib[i][j] * value * 1000) / 1000;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($ATarget.prototype, "isMoving", {
        get: function () {
            return this._isMoving;
        },
        enumerable: false,
        configurable: true
    });
    $ATarget.prototype.walk = function () {
        this._isMoving = true;
        var evt = new $AEvent($AEvent.ROLE_WALK);
        this.node.dispatchEvent(evt);
    };
    $ATarget.prototype.stopWalk = function () {
        this._targetANode = null;
        this._isMoving = false;
        this._paths = null;
        var evt = new $AEvent($AEvent.ROLE_STAND);
        this.node.dispatchEvent(evt);
    };
    $ATarget.prototype.stopTalk = function () {
    };
    $ATarget.prototype.isHit = function (pos) {
        // let now: cc.Vec2 = this.getPosition();
        // return GraphUtil.squareDis(pos.x, pos.y, now.x, now.y) <= 20 * 20;
        return false;
    };
    $ATarget.prototype.toRoom = function (x, y, swapNode) {
        this.node.x = x;
        this.node.y = y;
        swapNode.addChild(this.node);
    };
    $ATarget.prototype.update = function (dt) {
        if (this._isMoving) {
            if (this._targetANode) {
                var dis;
                var pos;
                var tx = this._targetANode.x - this.node.x;
                var ty = this._targetANode.y - this.node.y;
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
            }
            else {
                if (this._paths && this._paths.length) {
                    this._targetANode = this._paths.shift();
                }
                else {
                    this.stopWalk();
                }
            }
        }
    };
    $ATarget.prototype.updateTarget = function (pos) {
        if (pos) {
            var target = this._target ? this._target : this.node;
            var scale = this.mathScaleY(this.node.y);
            var ratio = 0.3 + 0.7 * scale;
            this.node.scaleY = scale * this._oriScaleY;
            this.node.scaleX = scale * this._oriScaleX;
            target.scaleX = Math.abs(target.scaleX) * this._direction;
            this.node.setPosition(this.node.x + pos.x * ratio, this.node.y + pos.y * ratio);
            this.node.dispatchEvent(new $AEvent($AEvent.ROLE_MOVE, true));
        }
    };
    $ATarget.prototype.mathScaleY = function (y) {
        // if (this._easingY != "") {
        // return parseFloat(eval(this._easingY.replace("y", y.toString())));
        // }
        return 1;
    };
    $ATarget.prototype.setPaths = function (paths, pos) {
        if (paths && paths.length) {
            this._paths = paths;
            this.walk();
        }
        else {
            this.stopWalk();
        }
    };
    Object.defineProperty($ATarget.prototype, "degree", {
        /**
         * 设置移动角度
         */
        set: function (value) {
            if (this._degree != value) {
                this._degree = value;
                if (value != 0 && value != 180) {
                    if (value > 0 && value < 180) {
                        this._direction = -1;
                        // this.node.scaleX = this._direction * this.node.scaleY;
                    }
                    else {
                        this._direction = 1;
                        // this.node.scaleX = -this._direction * this.node.scaleY;
                    }
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    // public set direction(scaleX: number) {
    //     this.node.scaleX = scaleX * this.node.scaleY;
    // }
    $ATarget.prototype.mathSpeed = function (dt) {
        var pos;
        var degree = zmg_util.GraphUtil.getAngle(this.node.x, this.node.y, this._targetANode.x, this._targetANode.y);
        if (degree != 360) {
            pos = new cc.Vec2();
            var index = Math.round((degree + 360) % 360 / 45) % 8;
            pos.x = this.angleLib[index][0] * dt;
            pos.y = this.angleLib[index][1] * dt;
            this.degree = index * 45;
        }
        return pos;
    };
    return $ATarget;
}(cc.Component));

var _a$2 = cc._decorator, ccclass$2 = _a$2.ccclass, property$2 = _a$2.property;
var $ASwap = /** @class */ (function (_super) {
    __extends($ASwap, _super);
    function $ASwap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    $ASwap.prototype.onLoad = function () {
        zmg_time_mgr.TimeMgr.doTimer(200, this.onTimer, this);
    };
    $ASwap.prototype.onTimer = function () {
        if (this._isUpdate) {
            this._isUpdate = false;
            zmg_util.gLog("排序开始..." + this.node.children.length);
            this.node.children.sort(this.sortNode);
            if (CC_JSB) {
                var i = void 0;
                var len = this.node.children.length;
                for (i = 0; i < len; i++) {
                    this.node.children[i].zIndex = i;
                }
            }
        }
    };
    $ASwap.prototype.updateAlignment = function () {
        this._isUpdate = true;
    };
    $ASwap.prototype.sortNode = function (a, b) {
        if (a.y > b.y) {
            return -1;
        }
        else if (a.y < b.y) {
            return 1;
        }
        return 0;
    };
    $ASwap.prototype.addMove = function (move) {
        move.node.setParent(this.node);
        this.updateAlignment();
    };
    $ASwap.prototype.onEnable = function () {
        zmg_ui_mgr.UIMgr.mouse.setEffectParent(this.node);
    };
    $ASwap.prototype.onDisable = function () {
    };
    return $ASwap;
}(cc.Component));

var _a$3 = cc._decorator, ccclass$3 = _a$3.ccclass, property$3 = _a$3.property;
var $AZone = /** @class */ (function (_super) {
    __extends($AZone, _super);
    function $AZone() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isFocus = true;
        _this.roleCamera = null;
        _this.background = null;
        _this.foreground = null;
        _this.swap = null;
        _this.roleScale = 1.0;
        _this.roleSpeed = 90;
        _this.petSpeed = 80;
        _this.startNode = new cc.Vec2();
        _this.easingY = "";
        _this._moves = [];
        return _this;
    }
    $AZone.prototype.lock = function () {
        this._isLocking = true;
    };
    $AZone.prototype.unLock = function () {
        this._isLocking = false;
    };
    $AZone.prototype.addMove = function (move) {
        move.setEasingY(this.easingY);
        move.node.on($AEvent.ROLE_MOVE, this.onRoleMove, this);
        this._moves.push(move);
    };
    $AZone.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this._isInit = false;
        this.init();
    };
    $AZone.prototype.init = function () {
        var actor = zmg_ui_mgr.Actor();
        if (this.roleCamera) {
            this._minCameraX = cc.Canvas.instance.node.width / 2 - this.node.width / 2;
            this._maxCamearX = -this._minCameraX;
            this._minCameraY = cc.Canvas.instance.node.height / 2 - this.node.height / 2;
            this._maxCamearY = -this._minCameraY;
        }
        this._roleMove = zmg_util.NodeUtil.createComponent($ATarget, actor.node);
        this._petMove = zmg_util.NodeUtil.createComponent($ATarget, actor.pet.node);
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
    };
    $AZone.prototype.onEnable = function () {
        var actor = zmg_ui_mgr.Actor();
        actor.node.on($AEvent.ROLE_MOVE, this.updateCamera, this, false);
        actor.node.on($AEvent.ROLE_WALK, this.onRoleWalk, this, false);
        actor.node.on($AEvent.ROLE_STAND, this.onRoleStand, this, false);
        actor.node.on(zmg_event_mgr.EventName.UI_ROLE_ACTION_CHANGE, this.onActorTalk, this);
        actor.pet.node.on($AEvent.ROLE_WALK, this.onPetWalk, this);
        actor.pet.node.on($AEvent.ROLE_STAND, this.onPetStand, this);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.UI_MOUSE_UP, this.onMouseUp, this, false);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.UI_ZONE_MOVE, this.onZoneMove, this, false);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.UI_MOUSE_DOWN, this.onMouseDown, this, false);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_END, this.onSceneEnd, this, false, 1);
    };
    $AZone.prototype.onDisable = function () {
        var i;
        var len = this._moves.length;
        for (i = 0; i < len; i++) {
            this._moves[i].node.off($AEvent.ROLE_MOVE, this.onRoleMove, this);
        }
        var actor = zmg_ui_mgr.Actor();
        actor.node.off($AEvent.ROLE_MOVE, this.updateCamera);
        actor.node.off($AEvent.ROLE_WALK, this.onRoleWalk, this);
        actor.node.off($AEvent.ROLE_STAND, this.onRoleStand, this);
        actor.node.off(zmg_event_mgr.EventName.UI_ROLE_ACTION_CHANGE, this.onActorTalk, this);
        actor.pet.node.off($AEvent.ROLE_WALK, this.onPetWalk, this);
        actor.pet.node.off($AEvent.ROLE_STAND, this.onPetStand, this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.UI_MOUSE_UP, this.onMouseUp, this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.UI_ZONE_MOVE, this.onZoneMove, this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.UI_MOUSE_DOWN, this.onMouseDown, this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_END, this.onSceneEnd, this);
    };
    $AZone.prototype.onActorTalk = function (evt) {
        if (evt.param == zmg_ui_mgr.ERoleAction.TALK) {
            this._roleMove.setPaths(null, null);
            this._petMove.setPaths(null, null);
        }
    };
    $AZone.prototype.onSceneEnd = function (evt) {
        if (evt && evt.param) {
            if (evt.param.x !== undefined) {
                this.startNode.x = evt.param.x;
            }
            if (evt.param.y !== undefined) {
                this.startNode.y = evt.param.y;
            }
        }
        this.setPostion(this.startNode);
        var actor = zmg_ui_mgr.Actor();
        actor.pet.node.active = true;
        actor.node.active = true;
    };
    $AZone.prototype.start = function () {
        _super.prototype.start.call(this);
    };
    $AZone.prototype.setPostion = function (pos) {
        if (this._grid) {
            var actor = zmg_ui_mgr.Actor();
            var aNode = this._grid.getWalkByPixel(pos);
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
    };
    $AZone.prototype.setGrid = function (data) {
        _super.prototype.setGrid.call(this, data);
        this.setPostion(this.startNode);
    };
    $AZone.prototype.onZoneMove = function (evt) {
        this.moveTo(evt.worldPos);
    };
    // update(dt: number) {
    //     let i: number;
    //     let len: number = this._moves.length;
    //     for (i = 0; i < len; i++) {
    //         this._moves[i].updateMove(dt);
    //     }
    // }
    $AZone.prototype.onRoleMove = function (evt) {
        this.swap.updateAlignment();
    };
    $AZone.prototype.onMouseDown = function (evt) {
        if (this._isLocking) {
            return;
        }
        this.onRoleTouchDown(evt);
        var pos = this.convertToNodeSpaceAR(evt.getLocation());
        var an = this.getWalkNode(pos);
        if (an) {
            // ToastMgr.open("A:" + an.a + " B:" + an.b);
            zmg_util.gLog("Click Map  A:" + an.a + " B:" + an.b);
        }
        else {
            // ToastMgr.open("None");
            zmg_util.gLog("Click Map None");
        }
    };
    $AZone.prototype.moveTo = function (pos) {
        console.time("findPath");
        var actor = this._roleMove;
        var start = actor.getPosition();
        var paths = this.findPathPixis(start.x, start.y, pos.x, pos.y);
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
    };
    $AZone.prototype.onRoleTouchDown = function (evt) {
        var pos = this.convertToNodeSpaceAR(evt.getLocation());
        this.moveTo(pos);
    };
    $AZone.prototype.onMouseUp = function (evt) {
    };
    $AZone.prototype.updateCamera = function (evt) {
        if (!this.isFocus || !this.roleCamera) {
            return;
        }
        var pos = this._roleMove.getPosition();
        var cx = (pos.x - this.node.width / 2);
        cx = Math.max(this._minCameraX, Math.min(this._maxCamearX, cx));
        this.roleCamera.node.x = cx;
        var cy = (pos.y - this.node.height / 2);
        cy = Math.max(this._minCameraY, Math.min(this._maxCamearY, cy));
        this.roleCamera.node.y = cy;
    };
    $AZone.prototype.onRoleWalk = function () {
        zmg_ui_mgr.Actor().walkLeft();
    };
    $AZone.prototype.onRoleStand = function () {
        var actor = zmg_ui_mgr.Actor();
        if (actor.getAction() == zmg_ui_mgr.ERoleAction.WALK_LEFT || actor.getAction() == zmg_ui_mgr.ERoleAction.WALK_RIGHT) {
            actor.stand();
        }
    };
    $AZone.prototype.onPetWalk = function () {
        zmg_ui_mgr.Actor().pet.walkLeft();
    };
    $AZone.prototype.onPetStand = function () {
        zmg_ui_mgr.Actor().pet.stand();
    };
    $AZone.prototype.onMoveRole = function (evt) {
        this.moveTo(evt.worldPos);
    };
    $AZone.prototype.convertToNodeSpace = function (pos) {
        pos = new cc.Vec2(pos.x + this.node.width * this.node.anchorX, pos.y + this.node.height * this.node.anchorY);
        return pos;
    };
    $AZone.prototype.convertToNodeSpaceAR = function (pos) {
        pos = this.node.convertToNodeSpaceAR(pos);
        pos = new cc.Vec2(pos.x + this.node.width * this.node.anchorX, pos.y + this.node.height * this.node.anchorY);
        return pos;
    };
    __decorate([
        property$3({ tooltip: "镜头是否跟随" }),
        __metadata("design:type", Boolean)
    ], $AZone.prototype, "isFocus", void 0);
    __decorate([
        property$3({ type: cc.Camera }),
        __metadata("design:type", cc.Camera)
    ], $AZone.prototype, "roleCamera", void 0);
    __decorate([
        property$3({ type: cc.Node }),
        __metadata("design:type", cc.Node)
    ], $AZone.prototype, "background", void 0);
    __decorate([
        property$3({ type: cc.Node }),
        __metadata("design:type", cc.Node)
    ], $AZone.prototype, "foreground", void 0);
    __decorate([
        property$3({ type: $ASwap, tooltip: "交换层" }),
        __metadata("design:type", $ASwap)
    ], $AZone.prototype, "swap", void 0);
    __decorate([
        property$3({ tooltip: "人物形象缩放比例" }),
        __metadata("design:type", Number)
    ], $AZone.prototype, "roleScale", void 0);
    __decorate([
        property$3({ tooltip: "人物形象缩放比例" }),
        __metadata("design:type", Number)
    ], $AZone.prototype, "roleSpeed", void 0);
    __decorate([
        property$3({ tooltip: "人物形象缩放比例" }),
        __metadata("design:type", Number)
    ], $AZone.prototype, "petSpeed", void 0);
    __decorate([
        property$3({ tooltip: "起始点" }),
        __metadata("design:type", cc.Vec2)
    ], $AZone.prototype, "startNode", void 0);
    __decorate([
        property$3({ tooltip: "Y轴缩放比例函数" }),
        __metadata("design:type", String)
    ], $AZone.prototype, "easingY", void 0);
    return $AZone;
}($AMap));

/*
 * @Description:
 */
var _a$4 = cc._decorator, ccclass$4 = _a$4.ccclass, property$4 = _a$4.property;
var $AMoveButton = /** @class */ (function (_super) {
    __extends($AMoveButton, _super);
    function $AMoveButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.worldPos = new cc.Vec2();
        _this.isMove = true;
        return _this;
        // onLoad () {}
        // start () {},
        // update (dt) {}
    }
    $AMoveButton.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        var zone = cc.Canvas.instance.getComponentInChildren($AZone);
        zone.onReady(this.checkPoint, this);
    };
    /**
     * 检查移动位置是否可以行走
     */
    $AMoveButton.prototype.checkPoint = function () {
        var zone = cc.Canvas.instance.getComponentInChildren($AZone);
        var anode = zone.getNode(this.worldPos);
        if (!anode || !anode.walkable) {
            zmg_util.gWarn("name:" + this["node"].name + " x:" + this.worldPos.x + " y:" + this.worldPos.y + ",当前设定点不可移动!");
        }
    };
    $AMoveButton.prototype.onHandler = function (evt) {
        if (this.isMove) {
            if (!this.onRoleStand()) {
                var zevt = new $AEvent($AEvent.ZONE_MOVE);
                zevt.worldPos = this.worldPos;
                zmg_event_mgr.EventMgr.dispatchEvent(zevt);
                zmg_ui_mgr.Actor().node.on($AEvent.ROLE_STAND, this.onRoleStand, this, false);
                zmg_ui_mgr.Actor().node.on($AEvent.ROLE_WALK, this.onRoleWalk, this, false);
            }
        }
        else {
            _super.prototype.onHandler.call(this);
        }
    };
    $AMoveButton.prototype.onEnable = function () {
        _super.prototype.onEnable.call(this);
    };
    $AMoveButton.prototype.onDisable = function () {
        zmg_ui_mgr.Actor().node.off($AEvent.ROLE_STAND, this.onRoleStand, this, false);
        zmg_ui_mgr.Actor().node.off($AEvent.ROLE_WALK, this.onRoleWalk, this, false);
        _super.prototype.onDisable.call(this);
    };
    $AMoveButton.prototype.onRoleWalk = function (evt) {
        zmg_ui_mgr.Actor().node.off($AEvent.ROLE_STAND, this.onRoleStand, this, false);
        zmg_ui_mgr.Actor().node.off($AEvent.ROLE_WALK, this.onRoleWalk, this, false);
    };
    $AMoveButton.prototype.onRoleStand = function (evt) {
        var zone = cc.Canvas.instance.getComponentInChildren($AZone);
        var rolePos = zmg_ui_mgr.Actor().node.getPosition();
        if (zone.hitTest(rolePos.x, rolePos.y, this.worldPos.x, this.worldPos.y)) {
            zmg_ui_mgr.Actor().node.off($AEvent.ROLE_STAND, this.onRoleStand, this, false);
            _super.prototype.onHandler.call(this);
            return true;
        }
        return false;
    };
    __decorate([
        property$4({ tooltip: "人物移动到位置后触发" }),
        __metadata("design:type", cc.Vec2)
    ], $AMoveButton.prototype, "worldPos", void 0);
    __decorate([
        property$4({ tooltip: "移动后触发" }),
        __metadata("design:type", Boolean)
    ], $AMoveButton.prototype, "isMove", void 0);
    return $AMoveButton;
}(zmg_ui_mgr.zmgui_btn_SimpleBtn));

/*
 * @Description: 移动区域套件
 */
var _a$5 = cc._decorator, ccclass$5 = _a$5.ccclass, property$5 = _a$5.property;
var $AEditMap = /** @class */ (function (_super) {
    __extends($AEditMap, _super);
    function $AEditMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isDebug = false;
        _this.data = null;
        _this.covers = [];
        _this.collider = null;
        _this.zoneName = "";
        _this.distance = 10;
        return _this;
    }
    /**
     * 打印输出数据
     */
    $AEditMap.prototype.createMap = function () {
        var i;
        var j;
        var n;
        var a = Math.ceil(this.node.width / this.distance);
        var b = Math.ceil(this.node.height / this.distance);
        var paths = "";
        var pos;
        var bool;
        var cLen = this.covers.length;
        var col = this.collider.getComponent(cc.PolygonCollider);
        var points = col.points.concat();
        for (i = 0; i < a; i++) {
            for (j = 0; j < b; j++) {
                pos = new cc.Vec2(i * this.distance, j * this.distance);
                if (this.getHitPoint(pos.sub(col.offset), points)) {
                    bool = "1";
                    for (n = 0; n < cLen; n++) {
                        if (zmg_util.GraphUtil.hitTest(pos, this.covers[n])) {
                            bool = "0";
                            break;
                        }
                    }
                }
                else {
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
    };
    $AEditMap.prototype.printMap = function (paths) {
        var data = {};
        data.name = this.zoneName;
        data.distance = this.distance;
        data.paths = paths;
        var msg = JSON.stringify(data);
        zmg_util.gLog("==================================================");
        zmg_util.gLog(msg);
        zmg_util.gLog("==================================================");
        this.parseMap(paths);
    };
    $AEditMap.prototype.parseMap = function (paths) {
        var i;
        var j;
        var a = Math.ceil(this.node.width / this.distance);
        var b = Math.ceil(this.node.height / this.distance);
        var gird = new $AGrid(a, b, this.distance);
        var temp = paths.split("");
        for (i = 0; i < a; i++) {
            for (j = 0; j < b; j++) {
                if (temp[i * b + j] == "0") {
                    gird.setWalkable(i, j, false);
                }
                else {
                    gird.setWalkable(i, j, true);
                }
            }
        }
        temp.length = 0;
        temp = null;
        this._grid = gird;
    };
    $AEditMap.prototype.drawMap = function (target) {
        if (!this.isDebug) {
            return;
        }
        var node;
        var i, j;
        var nd = zmg_util.NodeUtil.createNode("mapGraphics", this.node);
        var g = zmg_util.NodeUtil.createComponent(cc.Graphics, nd);
        var a = Math.ceil(this.node.width / this.distance);
        var b = Math.ceil(this.node.height / this.distance);
        var dix = this.node.width * this.node.anchorX;
        var diy = this.node.height * this.node.anchorY;
        g.clear();
        for (i = 0; i < a; i++) {
            for (j = 0; j < b; j++) {
                node = this._grid.getNodeByAB(i, j);
                if (node && node.walkable) {
                    if (target && target.indexOf(node) != -1) {
                        g.fillColor = cc.Color.WHITE;
                        g.fillRect(i * this.distance - dix, j * this.distance - diy, this.distance / 2, this.distance / 2);
                    }
                    else {
                        g.fillColor = cc.Color.RED;
                        g.fillRect(i * this.distance - dix, j * this.distance - diy, this.distance / 2, this.distance / 2);
                    }
                }
            }
        }
    };
    $AEditMap.prototype.onLoad = function () {
        if (this.data) {
            this.distance = this.data.json.distance;
            this.name = this.data.json.name;
            this.parseMap(this.data.json.paths);
        }
        else {
            var paths = this.createMap();
            this.printMap(paths);
            this.parseMap(paths);
        }
        this.drawMap();
    };
    $AEditMap.prototype.getHitPoint = function (pos, points) {
        // pos = new cc.Vec2(pos.x - this.node.width * this.node.anchorX,
        //     pos.y - this.node.height * this.node.anchorY);
        pos.x = pos.x - this.node.width * this.node.anchorX;
        pos.y = pos.y - this.node.height * this.node.anchorY;
        if (cc.Intersection.pointInPolygon(pos, points)) {
            return pos;
        }
        return null;
    };
    $AEditMap.prototype.getHitNode = function (pos) {
        if (!this._grid) {
            return null;
        }
        // pos = new cc.Vec2(pos.x + this.node.width * this.node.anchorX,
        //     pos.y + this.node.height * this.node.anchorY);
        return this._grid.getWalkByPixel(pos);
    };
    $AEditMap.prototype.findPathPixis = function (startX, startY, endX, endY) {
        var paths = this._grid.findPathPixis(startX, startY, endX, endY);
        return paths;
    };
    __decorate([
        property$5({ tooltip: "是否绘画" }),
        __metadata("design:type", Boolean)
    ], $AEditMap.prototype, "isDebug", void 0);
    __decorate([
        property$5({ type: cc.JsonAsset, tooltip: "碰撞数据" }),
        __metadata("design:type", cc.JsonAsset)
    ], $AEditMap.prototype, "data", void 0);
    __decorate([
        property$5({ type: cc.Collider, tooltip: "物品占用区" }),
        __metadata("design:type", Array)
    ], $AEditMap.prototype, "covers", void 0);
    __decorate([
        property$5({ type: cc.Collider, tooltip: "碰撞区域" }),
        __metadata("design:type", cc.Collider)
    ], $AEditMap.prototype, "collider", void 0);
    __decorate([
        property$5({ tooltip: "区域名称,打印使用具体数值按照加载进来的json决定" }),
        __metadata("design:type", String)
    ], $AEditMap.prototype, "zoneName", void 0);
    __decorate([
        property$5({ tooltip: "间距,打印使用具体数值按照加载进来的json决定" }),
        __metadata("design:type", Number)
    ], $AEditMap.prototype, "distance", void 0);
    return $AEditMap;
}(cc.Component));

var zmmods_zone_AZone = /** @class */ (function (_super) {
    __extends(zmmods_zone_AZone, _super);
    function zmmods_zone_AZone() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmmods_zone_AZone;
}($AZone));
var zmmods_zone_ATarget = /** @class */ (function (_super) {
    __extends(zmmods_zone_ATarget, _super);
    function zmmods_zone_ATarget() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmmods_zone_ATarget;
}($ATarget));
var zmmods_zone_ASwap = /** @class */ (function (_super) {
    __extends(zmmods_zone_ASwap, _super);
    function zmmods_zone_ASwap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmmods_zone_ASwap;
}($ATarget));
var zmmods_zone_AStar = /** @class */ (function (_super) {
    __extends(zmmods_zone_AStar, _super);
    function zmmods_zone_AStar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmmods_zone_AStar;
}($AStar));
var zmmods_zone_ANode = /** @class */ (function (_super) {
    __extends(zmmods_zone_ANode, _super);
    function zmmods_zone_ANode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmmods_zone_ANode;
}($ANode));
var zmmods_zone_AMoveButton = /** @class */ (function (_super) {
    __extends(zmmods_zone_AMoveButton, _super);
    function zmmods_zone_AMoveButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmmods_zone_AMoveButton;
}($AMoveButton));
var zmmods_zone_AMap = /** @class */ (function (_super) {
    __extends(zmmods_zone_AMap, _super);
    function zmmods_zone_AMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmmods_zone_AMap;
}($AMap));
var zmmods_zone_AGrid = /** @class */ (function (_super) {
    __extends(zmmods_zone_AGrid, _super);
    function zmmods_zone_AGrid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmmods_zone_AGrid;
}($AGrid));
var zmmods_zone_AEvent = /** @class */ (function (_super) {
    __extends(zmmods_zone_AEvent, _super);
    function zmmods_zone_AEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmmods_zone_AEvent;
}($AEvent));
var zmmods_zone_AEditMap = /** @class */ (function (_super) {
    __extends(zmmods_zone_AEditMap, _super);
    function zmmods_zone_AEditMap() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmmods_zone_AEditMap;
}($AEditMap));

exports.zmmods_zone_AEditMap = zmmods_zone_AEditMap;
exports.zmmods_zone_AEvent = zmmods_zone_AEvent;
exports.zmmods_zone_AGrid = zmmods_zone_AGrid;
exports.zmmods_zone_AMap = zmmods_zone_AMap;
exports.zmmods_zone_AMoveButton = zmmods_zone_AMoveButton;
exports.zmmods_zone_ANode = zmmods_zone_ANode;
exports.zmmods_zone_AStar = zmmods_zone_AStar;
exports.zmmods_zone_ASwap = zmmods_zone_ASwap;
exports.zmmods_zone_ATarget = zmmods_zone_ATarget;
exports.zmmods_zone_AZone = zmmods_zone_AZone;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96b25lL0FOb2RlLnRzIiwiLi4vLi4vLi4vc3JjL3pvbmUvQVN0YXIudHMiLCIuLi8uLi8uLi9zcmMvem9uZS9BR3JpZC50cyIsIi4uLy4uLy4uL3NyYy96b25lL0FNYXAudHMiLCIuLi8uLi8uLi9zcmMvem9uZS9BRXZlbnQudHMiLCIuLi8uLi8uLi9zcmMvem9uZS9BVGFyZ2V0LnRzIiwiLi4vLi4vLi4vc3JjL3pvbmUvQVN3YXAudHMiLCIuLi8uLi8uLi9zcmMvem9uZS9BWm9uZS50cyIsIi4uLy4uLy4uL3NyYy96b25lL0FNb3ZlQnV0dG9uLnRzIiwiLi4vLi4vLi4vc3JjL3pvbmUvQUVkaXRNYXAudHMiLCIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIE5vZGUg6IqC54K5XHJcbiAqIEBhdXRob3IgY2hlbmthaVxyXG4gKiBAc2luY2UgMjAxNy8xMS8zXHJcbiAqL1xyXG4vLyBuYW1lc3BhY2UgYXN0YXJ7XHJcbmV4cG9ydCBjbGFzcyAkQU5vZGUge1xyXG5cdHB1YmxpYyBhOiBudW1iZXI7ICAgIC8v5YiXXHJcblx0cHVibGljIGI6IG51bWJlcjsgICAgLy/ooYxcclxuXHRwdWJsaWMgZjogbnVtYmVyOyAgICAvL+S7o+S7tyBmID0gZytoXHJcblx0cHVibGljIGc6IG51bWJlcjsgICAgLy/otbfngrnliLDlvZPliY3ngrnku6Pku7dcclxuXHRwdWJsaWMgaDogbnVtYmVyOyAgICAvL+W9k+WJjeeCueWIsOe7iOeCueS8sOiuoeS7o+S7t1xyXG5cdHB1YmxpYyB3YWxrYWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblx0cHVibGljIHBhcmVudDogJEFOb2RlO1xyXG5cdHB1YmxpYyBjb3N0TXVsdGlwbGllcjogbnVtYmVyID0gMS4wO1xyXG5cclxuXHRwdWJsaWMgeDogbnVtYmVyO1xyXG5cdHB1YmxpYyB5OiBudW1iZXI7XHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihhOiBudW1iZXIsIGI6IG51bWJlciwgZGlzOiBudW1iZXIpIHtcclxuXHRcdHRoaXMuYSA9IGE7XHJcblx0XHR0aGlzLmIgPSBiO1xyXG5cdFx0dGhpcy54ID0gYSAqIGRpcztcclxuXHRcdHRoaXMueSA9IGIgKiBkaXM7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0IHBvc3Rpb24oKTogY2MuVmVjMiB7XHJcblx0XHRyZXR1cm4gbmV3IGNjLlZlYzIodGhpcy54LCB0aGlzLnkpO1xyXG5cdH1cclxufVxyXG4vLyB9XHJcbiIsImltcG9ydCB7ICRBR3JpZCB9IGZyb20gXCIuL0FHcmlkXCI7XHJcbmltcG9ydCB7ICRBTm9kZSB9IGZyb20gXCIuL0FOb2RlXCI7XHJcbi8qKlxyXG4gKiBB5pif5a+76LevXHJcbiAqIEBhdXRob3IgY2hlbmthaVxyXG4gKiBAc2luY2UgMjAxNy8xMS8zXHJcbiAqL1xyXG4vLyBuYW1lc3BhY2UgYXN0YXJ7XHJcbmV4cG9ydCBjbGFzcyAkQVN0YXIge1xyXG5cdHByaXZhdGUgX29wZW46IEFycmF5PCRBTm9kZT47ICAgICAgICAgICAgICAgLy/lvoXogIPlr5/ooahcclxuXHRwcml2YXRlIF9jbG9zZWQ6IEFycmF5PCRBTm9kZT47ICAgICAgICAgICAgIC8v5bey6ICD5a+f6KGoXHJcblx0cHJpdmF0ZSBfZ3JpZDogJEFHcmlkOyAgICAgICAgICAgICAgIC8v572R5qC8XHJcblx0cHJpdmF0ZSBfZW5kTm9kZTogJEFOb2RlOyAgICAgICAgICAgICAgICAgIC8v57uI54K5Tm9kZVxyXG5cdHByaXZhdGUgX3N0YXJ0Tm9kZTogJEFOb2RlOyAgICAgICAgICAgICAgICAvL+i1t+eCuU5vZGVcclxuXHRwcml2YXRlIF9wYXRoOiBBcnJheTxhbnk+OyAgICAgICAgICAgICAgIC8v5L+d5a2Y6Lev5b6EXHJcblx0cHJpdmF0ZSBfaGV1cmlzdGljOiBGdW5jdGlvbjsgICAgICAgICAgICAvL+Wvu+i3r+eul+azlVxyXG5cdHByaXZhdGUgX3N0cmFpZ2h0Q29zdDogbnVtYmVyID0gMS4wOyAgICAgLy/kuIrkuIvlt6blj7PotbDnmoTku6Pku7dcclxuXHRwcml2YXRlIF9kaWFnQ29zdDogbnVtYmVyID0gTWF0aC5TUVJUMjsgIC8v5pac552A6LWw55qE5Luj5Lu3IFxyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcblx0XHQvLyB0aGlzLl9oZXVyaXN0aWMgPSB0aGlzLm1hbmhhdHRhbjtcclxuXHRcdC8vIHRoaXMuX2hldXJpc3RpYyA9IHRoaXMuZXVjbGlkaWFuO1xyXG5cdFx0dGhpcy5faGV1cmlzdGljID0gdGhpcy5kaWFnb25hbDtcclxuXHR9XHJcblxyXG5cdC8v5a+76LevXHJcblx0cHVibGljIGZpbmRQYXRoKGdyaWQ6ICRBR3JpZCk6IGJvb2xlYW4ge1xyXG5cdFx0dGhpcy5fZ3JpZCA9IGdyaWQ7XHJcblx0XHR0aGlzLl9vcGVuID0gW107XHJcblx0XHR0aGlzLl9jbG9zZWQgPSBbXTtcclxuXHJcblx0XHR0aGlzLl9zdGFydE5vZGUgPSB0aGlzLl9ncmlkLnN0YXJ0Tm9kZTtcclxuXHRcdHRoaXMuX2VuZE5vZGUgPSB0aGlzLl9ncmlkLmVuZE5vZGU7XHJcblxyXG5cdFx0dGhpcy5fc3RhcnROb2RlLmcgPSAwO1xyXG5cdFx0dGhpcy5fc3RhcnROb2RlLmggPSB0aGlzLl9oZXVyaXN0aWModGhpcy5fc3RhcnROb2RlKTtcclxuXHRcdHRoaXMuX3N0YXJ0Tm9kZS5mID0gdGhpcy5fc3RhcnROb2RlLmcgKyB0aGlzLl9zdGFydE5vZGUuaDtcclxuXHRcdHJldHVybiB0aGlzLnNlYXJjaCgpO1xyXG5cdH1cclxuXHJcblx0Ly/mn6Xmib7ot6/lvoRcclxuXHRwdWJsaWMgc2VhcmNoKCk6IGJvb2xlYW4ge1xyXG5cdFx0dmFyIG5vZGU6ICRBTm9kZSA9IHRoaXMuX3N0YXJ0Tm9kZTtcclxuXHRcdHdoaWxlIChub2RlICE9IHRoaXMuX2VuZE5vZGUpIHtcclxuXHRcdFx0dmFyIHN0YXJ0WCA9IE1hdGgubWF4KDAsIG5vZGUuYSAtIDEpO1xyXG5cdFx0XHR2YXIgZW5kWCA9IE1hdGgubWluKHRoaXMuX2dyaWQubnVtQ29scyAtIDEsIG5vZGUuYSArIDEpO1xyXG5cdFx0XHR2YXIgc3RhcnRZID0gTWF0aC5tYXgoMCwgbm9kZS5iIC0gMSk7XHJcblx0XHRcdHZhciBlbmRZID0gTWF0aC5taW4odGhpcy5fZ3JpZC5udW1Sb3dzIC0gMSwgbm9kZS5iICsgMSk7XHJcblx0XHRcdGZvciAodmFyIGkgPSBzdGFydFg7IGkgPD0gZW5kWDsgaSsrKSB7XHJcblx0XHRcdFx0Zm9yICh2YXIgaiA9IHN0YXJ0WTsgaiA8PSBlbmRZOyBqKyspIHtcclxuXHRcdFx0XHRcdC8v5LiN6K6p5pac552A6LWwXHJcblx0XHRcdFx0XHQvLyBpZiAoaSAhPSBub2RlLnggJiYgaiAhPSBub2RlLnkpIHtcclxuXHRcdFx0XHRcdC8vIFx0Y29udGludWU7XHJcblx0XHRcdFx0XHQvLyB9XHJcblx0XHRcdFx0XHR2YXIgdGVzdDogJEFOb2RlID0gdGhpcy5fZ3JpZC5nZXROb2RlQnlBQihpLCBqKTtcclxuXHRcdFx0XHRcdGlmICh0ZXN0ID09IG5vZGUgfHxcclxuXHRcdFx0XHRcdFx0IXRlc3Qud2Fsa2FibGUgfHxcclxuXHRcdFx0XHRcdFx0IXRoaXMuX2dyaWQuZ2V0Tm9kZUJ5QUIobm9kZS5hLCB0ZXN0LmIpLndhbGthYmxlIHx8XHJcblx0XHRcdFx0XHRcdCF0aGlzLl9ncmlkLmdldE5vZGVCeUFCKHRlc3QuYSwgbm9kZS5iKS53YWxrYWJsZSkge1xyXG5cdFx0XHRcdFx0XHRjb250aW51ZTtcclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHR2YXIgY29zdDogbnVtYmVyID0gdGhpcy5fc3RyYWlnaHRDb3N0O1xyXG5cdFx0XHRcdFx0aWYgKCEoKG5vZGUuYSA9PSB0ZXN0LmEpIHx8IChub2RlLmIgPT0gdGVzdC5iKSkpIHtcclxuXHRcdFx0XHRcdFx0Y29zdCA9IHRoaXMuX2RpYWdDb3N0O1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0dmFyIGcgPSBub2RlLmcgKyBjb3N0ICogdGVzdC5jb3N0TXVsdGlwbGllcjtcclxuXHRcdFx0XHRcdHZhciBoID0gdGhpcy5faGV1cmlzdGljKHRlc3QpO1xyXG5cdFx0XHRcdFx0dmFyIGYgPSBnICsgaDtcclxuXHRcdFx0XHRcdGlmICh0aGlzLmlzT3Blbih0ZXN0KSB8fCB0aGlzLmlzQ2xvc2VkKHRlc3QpKSB7XHJcblx0XHRcdFx0XHRcdGlmICh0ZXN0LmYgPiBmKSB7XHJcblx0XHRcdFx0XHRcdFx0dGVzdC5mID0gZjtcclxuXHRcdFx0XHRcdFx0XHR0ZXN0LmcgPSBnO1xyXG5cdFx0XHRcdFx0XHRcdHRlc3QuaCA9IGg7XHJcblx0XHRcdFx0XHRcdFx0dGVzdC5wYXJlbnQgPSBub2RlO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRcdFx0dGVzdC5mID0gZjtcclxuXHRcdFx0XHRcdFx0dGVzdC5nID0gZztcclxuXHRcdFx0XHRcdFx0dGVzdC5oID0gaDtcclxuXHRcdFx0XHRcdFx0dGVzdC5wYXJlbnQgPSBub2RlO1xyXG5cdFx0XHRcdFx0XHR0aGlzLl9vcGVuLnB1c2godGVzdCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHRcdGZvciAodmFyIG8gPSAwOyBvIDwgdGhpcy5fb3Blbi5sZW5ndGg7IG8rKykge1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuX2Nsb3NlZC5wdXNoKG5vZGUpO1xyXG5cdFx0XHRpZiAodGhpcy5fb3Blbi5sZW5ndGggPT0gMCkge1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKFwiQVN0YXIgPj4gbm8gcGF0aCBmb3VuZFwiKTtcclxuXHRcdFx0XHRyZXR1cm4gZmFsc2VcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IG9wZW5MZW4gPSB0aGlzLl9vcGVuLmxlbmd0aDtcclxuXHRcdFx0Zm9yIChsZXQgbSA9IDA7IG0gPCBvcGVuTGVuOyBtKyspIHtcclxuXHRcdFx0XHRmb3IgKGxldCBuID0gbSArIDE7IG4gPCBvcGVuTGVuOyBuKyspIHtcclxuXHRcdFx0XHRcdGlmICh0aGlzLl9vcGVuW21dLmYgPiB0aGlzLl9vcGVuW25dLmYpIHtcclxuXHRcdFx0XHRcdFx0bGV0IHRlbXAgPSB0aGlzLl9vcGVuW21dO1xyXG5cdFx0XHRcdFx0XHR0aGlzLl9vcGVuW21dID0gdGhpcy5fb3BlbltuXTtcclxuXHRcdFx0XHRcdFx0dGhpcy5fb3BlbltuXSA9IHRlbXA7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRub2RlID0gdGhpcy5fb3Blbi5zaGlmdCgpIGFzICRBTm9kZTtcclxuXHRcdH1cclxuXHRcdHRoaXMuYnVpbGRQYXRoKCk7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG5cdC8v6I635Y+W6Lev5b6EXHJcblx0cHJpdmF0ZSBidWlsZFBhdGgoKTogdm9pZCB7XHJcblx0XHR0aGlzLl9wYXRoID0gbmV3IEFycmF5KCk7XHJcblx0XHR2YXIgbm9kZTogJEFOb2RlID0gdGhpcy5fZW5kTm9kZTtcclxuXHRcdHRoaXMuX3BhdGgucHVzaChub2RlKTtcclxuXHRcdHdoaWxlIChub2RlICE9IHRoaXMuX3N0YXJ0Tm9kZSkge1xyXG5cdFx0XHRub2RlID0gbm9kZS5wYXJlbnQ7XHJcblx0XHRcdHRoaXMuX3BhdGgudW5zaGlmdChub2RlKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgcGF0aCgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9wYXRoO1xyXG5cdH1cclxuXHJcblx0Ly/mmK/lkKblvoXmo4Dmn6VcclxuXHRwcml2YXRlIGlzT3Blbihub2RlOiAkQU5vZGUpOiBib29sZWFuIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fb3Blbi5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAodGhpcy5fb3BlbltpXSA9PSBub2RlKSB7XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblxyXG5cdC8v5piv5ZCm5bey5qOA5p+lXHJcblx0cHJpdmF0ZSBpc0Nsb3NlZChub2RlOiAkQU5vZGUpOiBib29sZWFuIHtcclxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fY2xvc2VkLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICh0aGlzLl9jbG9zZWRbaV0gPT0gbm9kZSkge1xyXG5cdFx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fVxyXG5cclxuXHQvL+abvOWTiOmhv+eul+azlVxyXG5cdHByaXZhdGUgbWFuaGF0dGFuKG5vZGU6ICRBTm9kZSkge1xyXG5cdFx0cmV0dXJuIE1hdGguYWJzKG5vZGUuYSAtIHRoaXMuX2VuZE5vZGUuYSkgKiB0aGlzLl9zdHJhaWdodENvc3QgKyBNYXRoLmFicyhub2RlLmIgKyB0aGlzLl9lbmROb2RlLmIpICogdGhpcy5fc3RyYWlnaHRDb3N0O1xyXG5cdH1cclxuXHJcblxyXG5cdHByaXZhdGUgZXVjbGlkaWFuKG5vZGU6ICRBTm9kZSkge1xyXG5cdFx0dmFyIGR4ID0gbm9kZS5hIC0gdGhpcy5fZW5kTm9kZS5hO1xyXG5cdFx0dmFyIGR5ID0gbm9kZS5iIC0gdGhpcy5fZW5kTm9kZS5iO1xyXG5cdFx0cmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSkgKiB0aGlzLl9zdHJhaWdodENvc3Q7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGRpYWdvbmFsKG5vZGU6ICRBTm9kZSkge1xyXG5cdFx0dmFyIGR4ID0gTWF0aC5hYnMobm9kZS5hIC0gdGhpcy5fZW5kTm9kZS5hKTtcclxuXHRcdHZhciBkeSA9IE1hdGguYWJzKG5vZGUuYiAtIHRoaXMuX2VuZE5vZGUuYik7XHJcblx0XHR2YXIgZGlhZyA9IE1hdGgubWluKGR4LCBkeSk7XHJcblx0XHR2YXIgc3RyYWlnaHQgPSBkeCArIGR5O1xyXG5cdFx0cmV0dXJuIHRoaXMuX2RpYWdDb3N0ICogZGlhZyArIHRoaXMuX3N0cmFpZ2h0Q29zdCAqIChzdHJhaWdodCAtIDIgKiBkaWFnKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXQgdmlzaXRlZCgpIHtcclxuXHRcdHJldHVybiB0aGlzLl9jbG9zZWQuY29uY2F0KHRoaXMuX29wZW4pO1xyXG5cdH1cclxufVxyXG5cclxuLy8gfSIsImltcG9ydCB7IGdMb2csIGdXYXJuIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7ICRBTm9kZSB9IGZyb20gXCIuL0FOb2RlXCI7XHJcbmltcG9ydCB7ICRBU3RhciB9IGZyb20gXCIuL0FTdGFyXCI7XHJcbi8qKlxyXG4gKiDnvZHmoLznsbtcclxuICogQGF1dGhvciBjaGVua2FpXHJcbiAqIEBzaW5jZSAyMDE3LzExLzNcclxuICovXHJcbi8vIG5hbWVzcGFjZSBhc3RhcntcclxuZXhwb3J0IGNsYXNzICRBR3JpZCB7XHJcbiAgICBwcml2YXRlIF9zdGFydE5vZGU6ICRBTm9kZTsgICAgLy/otbfngrlcclxuICAgIHByaXZhdGUgX2VuZE5vZGU6ICRBTm9kZTsgICAgICAvL+e7iOeCuVxyXG4gICAgcHJpdmF0ZSBfbm9kZXM6ICRBTm9kZVtdW107ICAvL05vZGXmlbDnu4RcclxuICAgIHByaXZhdGUgX251bUNvbHM6IG51bWJlcjsgICAgLy/nvZHmoLzooYzliJdcclxuICAgIHByaXZhdGUgX251bVJvd3M6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIF9lbmRYOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9lbmRZOiBudW1iZXI7XHJcblxyXG4gICAgcHVibGljIGRpczogbnVtYmVyO1xyXG4gICAgcHVibGljIGFzdGFyOiAkQVN0YXIgPSBuZXcgJEFTdGFyKCk7XHJcblxyXG4gICAgcHVibGljIGdldCBlbmRYKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZFg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBlbmRZKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VuZFk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKG51bUNvbHM6IG51bWJlciwgbnVtUm93czogbnVtYmVyLCBkaXM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX251bUNvbHMgPSBudW1Db2xzO1xyXG4gICAgICAgIHRoaXMuX251bVJvd3MgPSBudW1Sb3dzO1xyXG4gICAgICAgIHRoaXMuZGlzID0gZGlzO1xyXG4gICAgICAgIHRoaXMuX25vZGVzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBudW1Db2xzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5fbm9kZXNbaV0gPSBbXTtcclxuICAgICAgICAgICAgZm9yIChsZXQgajogbnVtYmVyID0gMDsgaiA8IG51bVJvd3M7IGorKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9kZXNbaV1bal0gPSBuZXcgJEFOb2RlKGksIGosIGRpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5vZGVCeUFCKHg6IG51bWJlciwgeTogbnVtYmVyKTogJEFOb2RlIHtcclxuICAgICAgICBpZiAoeCA+PSAwICYmIHggPCB0aGlzLl9ub2Rlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25vZGVzW3hdW3ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2Fsa0FibGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgbjogJEFOb2RlID0gdGhpcy5nZXROb2RlQnlBQih4LCB5KTtcclxuICAgICAgICBpZiAobiAmJiBuLndhbGthYmxlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFJhbmRvbVdhbGtQaXhlbCh0aW1lOiBudW1iZXIgPSAxMDApOiBjYy5WZWMyIHtcclxuICAgICAgICB0aW1lLS07XHJcbiAgICAgICAgaWYgKHRpbWUgPCAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcG9zOiBjYy5WZWMyID0gbmV3IGNjLlZlYzIoKTtcclxuICAgICAgICB2YXIgdG90YWxZOiBudW1iZXIgPSBjYy52aXNpYmxlUmVjdC5oZWlnaHQgLyB0aGlzLmRpcztcclxuICAgICAgICB2YXIgc3RhcnRZOiBudW1iZXIgPSAodGhpcy5fbnVtUm93cyAtIHRvdGFsWSk7XHJcbiAgICAgICAgcG9zLnggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLl9udW1Db2xzKTtcclxuICAgICAgICBwb3MueSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0b3RhbFkpICsgc3RhcnRZIC8gMik7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0Tm9kZUJ5QUIocG9zLngsIHBvcy55KS53YWxrYWJsZSkge1xyXG4gICAgICAgICAgICBnTG9nKFwi6ZqP5py65YiwOlwiICsgcG9zLngsIHBvcy55KTtcclxuICAgICAgICAgICAgcmV0dXJuIHBvcy5tdWwodGhpcy5kaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRSYW5kb21XYWxrUGl4ZWwodGltZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFdhbGtBYmxlQnlQaXhlbCh0eDogbnVtYmVyLCB0eTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIGk6IG51bWJlciA9IE1hdGguY2VpbCh0eCAvIHRoaXMuZGlzKTtcclxuICAgICAgICB2YXIgajogbnVtYmVyID0gTWF0aC5jZWlsKHR5IC8gdGhpcy5kaXMpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFdhbGtBYmxlKGksIGopO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRXYWxrQnlQaXhlbChwb3M6IGNjLlZlYzIgfCBjYy5WZWMzIHwgbnVtYmVyLCB0eT86IG51bWJlcik6ICRBTm9kZSB7XHJcbiAgICAgICAgaWYgKHBvcyBpbnN0YW5jZW9mIGNjLlZlYzIgfHwgcG9zIGluc3RhbmNlb2YgY2MuVmVjMykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXROZWFyV2Fsa05vZGUoTWF0aC5yb3VuZChwb3MueCAvIHRoaXMuZGlzKSwgTWF0aC5yb3VuZChwb3MueSAvIHRoaXMuZGlzKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TmVhcldhbGtOb2RlKE1hdGgucm91bmQocG9zIC8gdGhpcy5kaXMpLCBNYXRoLnJvdW5kKHR5IC8gdGhpcy5kaXMpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldE5vZGUocG9zOiBjYy5WZWMyIHwgY2MuVmVjMyB8IG51bWJlciwgdHk/OiBudW1iZXIpOiAkQU5vZGUge1xyXG4gICAgICAgIGlmIChwb3MgaW5zdGFuY2VvZiBjYy5WZWMyIHx8IHBvcyBpbnN0YW5jZW9mIGNjLlZlYzMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUJ5QUIoTWF0aC5yb3VuZChwb3MueCAvIHRoaXMuZGlzKSwgTWF0aC5yb3VuZChwb3MueSAvIHRoaXMuZGlzKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Tm9kZUJ5QUIoTWF0aC5yb3VuZChwb3MgLyB0aGlzLmRpcyksIE1hdGgucm91bmQodHkgLyB0aGlzLmRpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXROZWFyV2Fsa05vZGUoYTogbnVtYmVyLCBiOiBudW1iZXIpOiAkQU5vZGUge1xyXG4gICAgICAgIHZhciBub2RlOiAkQU5vZGUgPSB0aGlzLmdldE5vZGVCeUFCKGEsIGIpO1xyXG4gICAgICAgIGlmIChub2RlICYmIG5vZGUud2Fsa2FibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb3VudDogbnVtYmVyID0gMTtcclxuICAgICAgICB3aGlsZSAoY291bnQgPCAzKSB7XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLmdldE5vZGVCeUFCKGEgKyBjb3VudCwgYilcclxuICAgICAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS53YWxrYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMuZ2V0Tm9kZUJ5QUIoYSwgYiArIGNvdW50KVxyXG4gICAgICAgICAgICBpZiAobm9kZSAmJiBub2RlLndhbGthYmxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5nZXROb2RlQnlBQihhIC0gY291bnQsIGIpXHJcbiAgICAgICAgICAgIGlmIChub2RlICYmIG5vZGUud2Fsa2FibGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLmdldE5vZGVCeUFCKGEsIGIgLSBjb3VudClcclxuICAgICAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS53YWxrYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMuZ2V0Tm9kZUJ5QUIoYSArIGNvdW50LCBiICsgY291bnQpXHJcbiAgICAgICAgICAgIGlmIChub2RlICYmIG5vZGUud2Fsa2FibGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUgPSB0aGlzLmdldE5vZGVCeUFCKGEgLSBjb3VudCwgYiAtIGNvdW50KVxyXG4gICAgICAgICAgICBpZiAobm9kZSAmJiBub2RlLndhbGthYmxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlID0gdGhpcy5nZXROb2RlQnlBQihhICsgY291bnQsIGIgLSBjb3VudClcclxuICAgICAgICAgICAgaWYgKG5vZGUgJiYgbm9kZS53YWxrYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZSA9IHRoaXMuZ2V0Tm9kZUJ5QUIoYSAtIGNvdW50LCBiICsgY291bnQpXHJcbiAgICAgICAgICAgIGlmIChub2RlICYmIG5vZGUud2Fsa2FibGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaW5kUGF0aFBpeGlzKHN0YXJ0WDogbnVtYmVyLCBzdGFydFk6IG51bWJlciwgZW5kWDogbnVtYmVyLCBlbmRZOiBudW1iZXIpOiAkQU5vZGVbXSB7XHJcbiAgICAgICAgdmFyIGE6IG51bWJlcjtcclxuICAgICAgICB2YXIgYjogbnVtYmVyO1xyXG4gICAgICAgIHZhciBjOiBudW1iZXI7XHJcbiAgICAgICAgdmFyIGQ6IG51bWJlcjtcclxuICAgICAgICB2YXIgZGl4OiBudW1iZXIgPSBzdGFydFggLSBlbmRYO1xyXG4gICAgICAgIGlmIChNYXRoLmFicyhkaXgpIDwgdGhpcy5kaXMpIHtcclxuICAgICAgICAgICAgc3RhcnRYID0gZW5kWDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdGFydFggKz0gKGRpeCA8IDAgPyAxIDogLTEpICogdGhpcy5kaXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBkaXk6IG51bWJlciA9IHN0YXJ0WSAtIGVuZFk7XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKGRpeSkgPCB0aGlzLmRpcykge1xyXG4gICAgICAgICAgICBzdGFydFkgPSBlbmRZO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0YXJ0WSArPSAoZGl5IDwgMCA/IDEgOiAtMSkgKiB0aGlzLmRpcztcclxuICAgICAgICB9XHJcbiAgICAgICAgYSA9IE1hdGgucm91bmQoc3RhcnRYIC8gdGhpcy5kaXMpO1xyXG4gICAgICAgIGIgPSBNYXRoLnJvdW5kKHN0YXJ0WSAvIHRoaXMuZGlzKTtcclxuICAgICAgICB2YXIgc3RhcnROb2RlOiAkQU5vZGUgPSB0aGlzLmdldE5lYXJXYWxrTm9kZShhLCBiKTtcclxuICAgICAgICBpZiAoIXN0YXJ0Tm9kZSkge1xyXG4gICAgICAgICAgICBnV2FybihcIui1t+eCueS4jeWPr+ihjOi1sFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBlbmROb2RlOiAkQU5vZGUgPSB0aGlzLmdldE5lYXJXYWxrTm9kZShNYXRoLnJvdW5kKGVuZFggLyB0aGlzLmRpcyksIE1hdGgucm91bmQoZW5kWSAvIHRoaXMuZGlzKSk7XHJcbiAgICAgICAgaWYgKCFlbmROb2RlKSB7XHJcbiAgICAgICAgICAgIGdXYXJuKFwi57uI54K55LiN5Y+v6KGM6LWwXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2V0U3RhcnROb2RlKHN0YXJ0Tm9kZS5hLCBzdGFydE5vZGUuYikpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2V0RW5kTm9kZShlbmROb2RlLmEsIGVuZE5vZGUuYikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYXN0YXIuZmluZFBhdGgodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lbmRYID0gZW5kWDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2VuZFkgPSBlbmRZO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYXN0YXIucGF0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBnV2FybihcIui1t+eCueaIlue7iOeCuemdnuazlTpcIiwgc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpO1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0RW5kTm9kZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9ub2Rlc1t4XSAmJiB0aGlzLl9ub2Rlc1t4XVt5XSkge1xyXG4gICAgICAgICAgICB0aGlzLl9lbmROb2RlID0gdGhpcy5fbm9kZXNbeF1beV07XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdXYXJuKFwi6Z2e5rOV57uI54K5OlwiLCB4LCB5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRTdGFydE5vZGUoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5fbm9kZXNbeF0gJiYgdGhpcy5fbm9kZXNbeF1beV0pIHtcclxuICAgICAgICAgICAgdGhpcy5fc3RhcnROb2RlID0gdGhpcy5fbm9kZXNbeF1beV07XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdXYXJuKFwi6Z2e5rOV6LW354K5OlwiLCB4LCB5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRXYWxrYWJsZSh4OiBudW1iZXIsIHk6IG51bWJlciwgdmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9ub2Rlc1t4XVt5XS53YWxrYWJsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZW5kTm9kZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW5kTm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IG51bUNvbHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX251bUNvbHM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBudW1Sb3dzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9udW1Sb3dzO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgc3RhcnROb2RlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGFydE5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRlc3RvcnkoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG59XHJcbi8vIH1cclxuIiwiLypcclxuICogQERlc2NyaXB0aW9uOiDnp7vliqjljLrln5/lpZfku7ZcclxuICovXHJcblxyXG5pbXBvcnQgeyBnTG9nLCBHcmFwaFV0aWwsIE5vZGVVdGlsIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7ICRBR3JpZCB9IGZyb20gXCIuL0FHcmlkXCI7XHJcbmltcG9ydCB7ICRBTm9kZSB9IGZyb20gXCIuL0FOb2RlXCI7XHJcbmltcG9ydCAkQVRhcmdldCBmcm9tIFwiLi9BVGFyZ2V0XCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgJEFNYXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLmmK/lkKbnu5jnlLtcIiB9KVxyXG4gICAgaXNEZWJ1ZzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLk5vZGUgfSlcclxuICAgIGRlYnVnTm9kZTogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgLy8gQHByb3BlcnR5KHsgdHlwZTogY2MuSnNvbkFzc2V0LCB0b29sdGlwOiBcIueisOaSnuaVsOaNrlwiIH0pXHJcbiAgICAvLyBkYXRhOiBjYy5Kc29uQXNzZXQgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5Zyw5Zu+6Ze06ZqUXCIgfSlcclxuICAgIGRpc3RhbmNlOiBudW1iZXIgPSAyMC4wO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLlBvbHlnb25Db2xsaWRlciwgdG9vbHRpcDogXCLnp7vliqjljLrln59cIiB9KVxyXG4gICAgbW92ZUFyZWE6IGNjLlBvbHlnb25Db2xsaWRlciA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQ29sbGlkZXIsIHRvb2x0aXA6IFwi56Kw5pKe5Yy65Z+fXCIgfSlcclxuICAgIGNvbGxpZGVzOiBjYy5Db2xsaWRlcltdID0gW107XHJcblxyXG4gICAgcHJvdGVjdGVkIF9ncmlkOiAkQUdyaWQ7XHJcblxyXG4gICAgLy8gcHJvdGVjdGVkIF9vZmZWMjogY2MuVmVjMjtcclxuICAgIHByaXZhdGUgX2RlbGF5RnVuczogeyB0YXJnZXQ6IGFueSwgZnVuOiBGdW5jdGlvbiB9W10gPSBbXTtcclxuXHJcbiAgICBwdWJsaWMgaGl0VGVzdCh4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB4MjogbnVtYmVyLCB5MjogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZ0xvZyhcIkFNYXDmo4DmtYvnorDmkp4uLi5cIik7XHJcbiAgICAgICAgbGV0IHggPSB4MSAtIHgyO1xyXG4gICAgICAgIGxldCB5ID0geTEgLSB5MjtcclxuICAgICAgICByZXR1cm4geCAqIHggKyB5ICogeSA8IHRoaXMuZGlzdGFuY2UgKiB0aGlzLmRpc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgb25Mb2FkKCkge1xyXG5cclxuICAgICAgICAvLyB0aGlzLl9vZmZWMiA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobmV3IGNjLlZlYzIoMCwgMCkpO1xyXG4gICAgICAgIC8vIHRoaXMuX29mZlYyLnggPSAtdGhpcy5fb2ZmVjIueDtcclxuICAgICAgICAvLyB0aGlzLl9vZmZWMi55ID0gLXRoaXMuX29mZlYyLnk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbGxpZGVyTm9PZmZlY3QocG9seWdvbjogY2MuQ29sbGlkZXIpOiB2b2lkIHtcclxuICAgICAgICBnTG9nKFwiQU1hcOWBj+enu+mHj+iuvue9ruOAglwiKTtcclxuICAgICAgICBpZiAocG9seWdvbiBpbnN0YW5jZW9mIGNjLlBvbHlnb25Db2xsaWRlciB8fCBwb2x5Z29uIGluc3RhbmNlb2YgY2MuQ2lyY2xlQ29sbGlkZXIpIHtcclxuICAgICAgICAgICAgcG9seWdvbi53b3JsZC5wb2ludHMuZm9yRWFjaCgodmFsdWU6IGNjLlZlYzIsIGluZGV4OiBudW1iZXIsIGFycmF5OiBjYy5WZWMyW10pID0+IHtcclxuICAgICAgICAgICAgICAgIHBvbHlnb24ud29ybGQucG9pbnRzW2luZGV4XSA9IHZhbHVlLmFkZChwb2x5Z29uLm9mZnNldCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBwb2x5Z29uLm9mZnNldCA9IG5ldyBjYy5WZWMyKDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBvblJlYWR5KHJlYWR5RnVuOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBnTG9nKFwiQU1hcOWcsOWbvuiuvue9ruOAglwiKTtcclxuICAgICAgICBpZiAodGhpcy5fZ3JpZCkge1xyXG4gICAgICAgICAgICByZWFkeUZ1bi5jYWxsKHRhcmdldCwgdGhpcy5fZ3JpZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVsYXlGdW5zLnB1c2goeyB0YXJnZXQ6IHRhcmdldCwgZnVuOiByZWFkeUZ1biB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc2V0R3JpZChkYXRhOiAkQUdyaWQpOiB2b2lkIHtcclxuICAgICAgICBnTG9nKFwiQU1hcOiuvue9ruWcsOWbvuaVsOaNruOAglwiKTtcclxuICAgICAgICB0aGlzLl9ncmlkID0gZGF0YTtcclxuICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZW46IG51bWJlciA9IHRoaXMuX2RlbGF5RnVucy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMuX2RlbGF5RnVuc1tpXS50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kZWxheUZ1bnNbaV0uZnVuLmNhbGwodGhpcy5fZGVsYXlGdW5zW2ldLnRhcmdldCwgdGhpcy5fZ3JpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZGVsYXlGdW5zLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IG9mZlYyKCk6IGNjLlZlYzIge1xyXG4gICAgICAgIGdMb2coXCJBTWFw6I635Y+W5YGP56e76YeP44CCXCIpO1xyXG4gICAgICAgIGxldCBvZmZWMjogY2MuVmVjMiA9IHRoaXMubm9kZS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobmV3IGNjLlZlYzIoMCwgMCkpO1xyXG4gICAgICAgIG9mZlYyLnggPSAtb2ZmVjIueDtcclxuICAgICAgICBvZmZWMi55ID0gLW9mZlYyLnk7XHJcbiAgICAgICAgbGV0IGNhbWVyYU9mZjogY2MuVmVjMiA9IGNjLkNhbWVyYS5tYWluLm5vZGUuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBvZmZWMiA9IG5ldyBjYy5WZWMyKG9mZlYyLngsIG9mZlYyLnkpO1xyXG4gICAgICAgIG9mZlYyID0gb2ZmVjIuYWRkKGNhbWVyYU9mZik7XHJcbiAgICAgICAgcmV0dXJuIG9mZlYyO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBwYXJzZU1hcEJ5Q29sbGlkZXIoY29sbGlkZXI6IGNjLlBvbHlnb25Db2xsaWRlciwgY292ZXJzQXJyOiBjYy5Db2xsaWRlcltdKTogdm9pZCB7XHJcbiAgICAgICAgZ0xvZyhcIkFNYXDop6PmnpDlnLDlm74x44CCXCIpO1xyXG4gICAgICAgIHZhciBpOiBudW1iZXI7XHJcbiAgICAgICAgdmFyIGo6IG51bWJlcjtcclxuICAgICAgICB2YXIgbjogbnVtYmVyO1xyXG4gICAgICAgIHZhciBhOiBudW1iZXIgPSBNYXRoLmNlaWwodGhpcy5ub2RlLndpZHRoIC8gdGhpcy5kaXN0YW5jZSk7XHJcbiAgICAgICAgdmFyIGI6IG51bWJlciA9IE1hdGguY2VpbCh0aGlzLm5vZGUuaGVpZ2h0IC8gdGhpcy5kaXN0YW5jZSk7XHJcbiAgICAgICAgdmFyIHBvczogY2MuVmVjMjtcclxuICAgICAgICB2YXIgYm9vbDogYm9vbGVhbjtcclxuICAgICAgICBsZXQgcG9pbnRzID0gY29sbGlkZXIud29ybGQucG9pbnRzO1xyXG4gICAgICAgIHZhciBjTGVuOiBudW1iZXIgPSBjb3ZlcnNBcnIubGVuZ3RoO1xyXG4gICAgICAgIHZhciBnaXJkID0gbmV3ICRBR3JpZChhLCBiLCB0aGlzLmRpc3RhbmNlKTtcclxuICAgICAgICBsZXQgb2ZmVjIgPSB0aGlzLm9mZlYyO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGI7IGorKykge1xyXG4gICAgICAgICAgICAgICAgcG9zID0gbmV3IGNjLlZlYzIoaSAqIHRoaXMuZGlzdGFuY2UsIGogKiB0aGlzLmRpc3RhbmNlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldEhpdFBvaW50KHBvcywgcG9pbnRzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcyA9IHBvcy5zdWIob2ZmVjIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobiA9IDA7IG4gPCBjTGVuOyBuKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEdyYXBoVXRpbC5oaXRUZXN0KHBvcywgY292ZXJzQXJyW25dKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdpcmQuc2V0V2Fsa2FibGUoaSwgaiwgYm9vbCk7XHJcbiAgICAgICAgICAgICAgICAvLyBwYXRocyArPSBib29sO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0R3JpZChnaXJkKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcGFyc2VNYXAocGF0aHM6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGdMb2coXCJBTWFw6Kej5p6Q5Zyw5Zu+MuOAglwiKTtcclxuICAgICAgICB2YXIgaTogbnVtYmVyO1xyXG4gICAgICAgIHZhciBqOiBudW1iZXI7XHJcbiAgICAgICAgdmFyIGE6IG51bWJlciA9IE1hdGguY2VpbCh0aGlzLm5vZGUud2lkdGggLyB0aGlzLmRpc3RhbmNlKTtcclxuICAgICAgICB2YXIgYjogbnVtYmVyID0gTWF0aC5jZWlsKHRoaXMubm9kZS5oZWlnaHQgLyB0aGlzLmRpc3RhbmNlKTtcclxuICAgICAgICB2YXIgZ2lyZCA9IG5ldyAkQUdyaWQoYSwgYiwgdGhpcy5kaXN0YW5jZSk7XHJcbiAgICAgICAgdmFyIHRlbXA6IHN0cmluZ1tdID0gcGF0aHMuc3BsaXQoXCJcIik7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGE7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgYjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcFtpICogYiArIGpdID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2lyZC5zZXRXYWxrYWJsZShpLCBqLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdpcmQuc2V0V2Fsa2FibGUoaSwgaiwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGVtcC5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRlbXAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2V0R3JpZChnaXJkKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkcmF3TWFwKHRhcmdldD86ICRBTm9kZVtdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRGVidWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbm9kZTogJEFOb2RlO1xyXG4gICAgICAgIHZhciBpOiBudW1iZXIsIGo6IG51bWJlcjtcclxuICAgICAgICB2YXIgbmQ6IGNjLk5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIG5kLnNldFBhcmVudCh0aGlzLmRlYnVnTm9kZSk7XHJcbiAgICAgICAgbmQubmFtZSA9IFwiZHJhd05vZGVcIjtcclxuICAgICAgICB2YXIgZzogY2MuR3JhcGhpY3MgPSBOb2RlVXRpbC5jcmVhdGVDb21wb25lbnQoY2MuR3JhcGhpY3MsIG5kKTtcclxuICAgICAgICB2YXIgYTogbnVtYmVyID0gTWF0aC5jZWlsKHRoaXMubm9kZS53aWR0aCAvIHRoaXMuZGlzdGFuY2UpO1xyXG4gICAgICAgIHZhciBiOiBudW1iZXIgPSBNYXRoLmNlaWwodGhpcy5ub2RlLmhlaWdodCAvIHRoaXMuZGlzdGFuY2UpO1xyXG4gICAgICAgIHZhciBkaXg6IG51bWJlciA9IHRoaXMubm9kZS53aWR0aCAqIHRoaXMubm9kZS5hbmNob3JYO1xyXG4gICAgICAgIHZhciBkaXk6IG51bWJlciA9IHRoaXMubm9kZS5oZWlnaHQgKiB0aGlzLm5vZGUuYW5jaG9yWTtcclxuICAgICAgICBnLmNsZWFyKCk7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGE7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgYjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5fZ3JpZC5nZXROb2RlQnlBQihpLCBqKTtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlICYmIG5vZGUud2Fsa2FibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5pbmRleE9mKG5vZGUpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcuZmlsbENvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcuZmlsbFJlY3QoaSAqIHRoaXMuZGlzdGFuY2UgLSBkaXgsIGogKiB0aGlzLmRpc3RhbmNlIC0gZGl5LCB0aGlzLmRpc3RhbmNlIC8gMiwgdGhpcy5kaXN0YW5jZSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcuZmlsbENvbG9yID0gY2MuQ29sb3IuUkVEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnLmZpbGxSZWN0KGkgKiB0aGlzLmRpc3RhbmNlIC0gZGl4LCBqICogdGhpcy5kaXN0YW5jZSAtIGRpeSwgdGhpcy5kaXN0YW5jZSAvIDIsIHRoaXMuZGlzdGFuY2UgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2RlbGF5RnVucy5sZW5ndGggPSBudWxsO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBvbkxvYWTkuI3lrZjlnKhcclxuICAgICAqIGNjLlBvbHlnb25Db2xsaWRlci53b3JsZFxyXG4gICAgICovXHJcbiAgICBzdGFydCgpIHtcclxuXHJcblxyXG4gICAgICAgIHRoaXMuY29sbGlkZXJOb09mZmVjdCh0aGlzLm1vdmVBcmVhKTtcclxuICAgICAgICB0aGlzLmNvbGxpZGVzLmZvckVhY2goKHZhbHVlOiBjYy5Db2xsaWRlciwgaW5kZXg6IG51bWJlciwgYXJyYXk6IGNjLkNvbGxpZGVyW10pID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb2xsaWRlck5vT2ZmZWN0KHZhbHVlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnBhcnNlTWFwQnlDb2xsaWRlcih0aGlzLm1vdmVBcmVhLCB0aGlzLmNvbGxpZGVzKTtcclxuICAgICAgICB0aGlzLmRyYXdNYXAoKTtcclxuICAgICAgICAvLyBsZXQgcG9zOiBjYy5WZWMyID0gbmV3IGNjLlZlYzIoMTEyOCwgMjU3KTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKHBvcywgcG9zKTtcclxuICAgICAgICAvLyBnTG9nKFwiIyEhI0AhOlwiICsgY2MuSW50ZXJzZWN0aW9uLnBvaW50SW5Qb2x5Z29uKHBvcywgdGhpcy5tb3ZlQXJlYS53b3JsZC5wb2ludHMpLCBwb3MueCwgcG9zLnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRIaXRQb2ludChwb3M6IGNjLlZlYzIsIHBvaW50czogY2MuVmVjMltdKTogY2MuVmVjMiB7XHJcbiAgICAgICAgLy8gcG9zID0gbmV3IGNjLlZlYzIocG9zLnggLSB0aGlzLm5vZGUud2lkdGggKiB0aGlzLm5vZGUuYW5jaG9yWCxcclxuICAgICAgICAvLyAgICAgcG9zLnkgLSB0aGlzLm5vZGUuaGVpZ2h0ICogdGhpcy5ub2RlLmFuY2hvclkpO1xyXG4gICAgICAgIC8vIHBvcy54ID0gcG9zLnggLSB0aGlzLm5vZGUud2lkdGggKiB0aGlzLm5vZGUuYW5jaG9yWDtcclxuICAgICAgICAvLyBwb3MueSA9IHBvcy55IC0gdGhpcy5ub2RlLmhlaWdodCAqIHRoaXMubm9kZS5hbmNob3JZO1xyXG4gICAgICAgIGlmIChjYy5JbnRlcnNlY3Rpb24ucG9pbnRJblBvbHlnb24ocG9zLCBwb2ludHMpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwb3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROb2RlKHBvczogY2MuVmVjMiB8IGNjLlZlYzMpOiAkQU5vZGUge1xyXG4gICAgICAgIGlmICghdGhpcy5fZ3JpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gcG9zID0gbmV3IGNjLlZlYzIocG9zLnggKyB0aGlzLm5vZGUud2lkdGggKiB0aGlzLm5vZGUuYW5jaG9yWCxcclxuICAgICAgICAvLyAgICAgcG9zLnkgKyB0aGlzLm5vZGUuaGVpZ2h0ICogdGhpcy5ub2RlLmFuY2hvclkpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ncmlkLmdldE5vZGUocG9zKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRXYWxrTm9kZShwb3M6IGNjLlZlYzIgfCBjYy5WZWMzKTogJEFOb2RlIHtcclxuICAgICAgICBnTG9nKFwiQU1hcOiOt+WPluiKgueCuS4uLlwiKTtcclxuICAgICAgICBpZiAoIXRoaXMuX2dyaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHBvcyA9IG5ldyBjYy5WZWMyKHBvcy54ICsgdGhpcy5ub2RlLndpZHRoICogdGhpcy5ub2RlLmFuY2hvclgsXHJcbiAgICAgICAgLy8gICAgIHBvcy55ICsgdGhpcy5ub2RlLmhlaWdodCAqIHRoaXMubm9kZS5hbmNob3JZKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZ3JpZC5nZXRXYWxrQnlQaXhlbChwb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaW5kUGF0aFBpeGlzKHN0YXJ0WDogbnVtYmVyLCBzdGFydFk6IG51bWJlciwgZW5kWDogbnVtYmVyLCBlbmRZOiBudW1iZXIpOiAkQU5vZGVbXSB7XHJcbiAgICAgICAgZ0xvZyhcIkFNYXDmoLnmja7lg4/ntKDojrflj5boioLngrkuLi5cIik7XHJcbiAgICAgICAgdmFyIHBhdGhzOiAkQU5vZGVbXSA9IHRoaXMuX2dyaWQuZmluZFBhdGhQaXhpcyhzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSk7XHJcbiAgICAgICAgcmV0dXJuIHBhdGhzO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEV2ZW50TmFtZSB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XG5pbXBvcnQgeyBBY3RvciB9IGZyb20gXCJ6bWdfdWlfbWdyXCI7XG5cbmV4cG9ydCBjbGFzcyAkQUV2ZW50IGV4dGVuZHMgY2MuRXZlbnQge1xuICAgIC8qKlxuICAgICAqIOS6uueJqeenu+WKqOi/h+eoi1xuICAgICAqL1xuICAgIHN0YXRpYyBST0xFX01PVkU6IHN0cmluZyA9IFwicm9sZU1vdmVcIjtcblxuICAgIC8qKlxuICAgICAqIOS6uueJqeW8gOWni+enu+WKqFxuICAgICAqL1xuICAgIHN0YXRpYyBST0xFX1dBTEs6IHN0cmluZyA9IFwicm9sZVdhbGtcIjtcblxuICAgIC8qKlxuICAgICAqIOS6uueJqeermeeriyjnu5PmnZ/np7vliqgpXG4gICAgICovXG4gICAgc3RhdGljIFJPTEVfU1RBTkQ6IHN0cmluZyA9IFwicm9sZVN0YW5kXCI7XG5cbiAgICAvKipcbiAgICAgKiDor7fmsYLkurrniannp7vliqjliLDlvZPliY3kvY3nva7nmoTkuovku7YgXG4gICAgICovXG4gICAgc3RhdGljIFpPTkVfTU9WRTogc3RyaW5nID0gRXZlbnROYW1lLlVJX1pPTkVfTU9WRTtcblxuICAgIHByb3RlY3RlZCBfd29ybGRQb3M6IGNjLlZlYzI7XG5cbiAgICBwdWJsaWMgZ2V0IHdvcmxkUG9zKCk6IGNjLlZlYzIge1xuXG4gICAgICAgIHJldHVybiB0aGlzLl93b3JsZFBvcyA/IHRoaXMuX3dvcmxkUG9zIDogQWN0b3IoKS5ub2RlLmdldFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCB3b3JsZFBvcyhwb3M6IGNjLlZlYzIpIHtcbiAgICAgICAgdGhpcy5fd29ybGRQb3MgPSBwb3M7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBidWJibGVzOiBib29sZWFuID0gZmFsc2UpIHtcbiAgICAgICAgc3VwZXIodHlwZSwgYnViYmxlcyk7XG4gICAgfVxufSIsImltcG9ydCB7IEdyYXBoVXRpbCB9IGZyb20gXCJ6bWdfdXRpbFwiO1xuaW1wb3J0IHsgJEFHcmlkIH0gZnJvbSBcIi4vQUdyaWRcIjtcbmltcG9ydCB7ICRBTm9kZSB9IGZyb20gXCIuL0FOb2RlXCI7XG5pbXBvcnQgeyAkQUV2ZW50IH0gZnJvbSBcIi4vQUV2ZW50XCI7XG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuLyoqXG4gKiDkvJrnp7vliqjnmoTlr7nosaFcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgJEFUYXJnZXQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuXG4gICAgcHJvdGVjdGVkIF9lYXNpbmdZOiBzdHJpbmcgPSBcIlwiO1xuXG4gICAgcHVibGljIGFuZ2xlTGliOiBudW1iZXJbXVtdO1xuXG4gICAgcHJvdGVjdGVkIF90YXJnZXRBTm9kZTogJEFOb2RlO1xuXG4gICAgcHJvdGVjdGVkIF9zcXVhcmU6IG51bWJlciA9IDEwMCAqIDEwMDtcblxuICAgIHByb3RlY3RlZCBfZGVncmVlOiBudW1iZXI7XG4gICAgcHJvdGVjdGVkIF9zcGVlZDogbnVtYmVyID0gMTYwO1xuICAgIHByb3RlY3RlZCBfZGlyZWN0aW9uOiBudW1iZXIgPSAxO1xuXG4gICAgcHJvdGVjdGVkIF9wYXRoczogJEFOb2RlW107XG5cbiAgICBwcm90ZWN0ZWQgX2lzTW92aW5nOiBib29sZWFuO1xuICAgIHByb3RlY3RlZCBfdGFyZ2V0OiBjYy5Ob2RlO1xuXG4gICAgcHJpdmF0ZSBfb3JpU2NhbGVYOiBudW1iZXIgPSAxLjA7XG4gICAgcHJpdmF0ZSBfb3JpU2NhbGVZOiBudW1iZXIgPSAxLjA7XG5cbiAgICBwdWJsaWMgc2V0IG9yaVNjYWxlWCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX29yaVNjYWxlWCA9IHZhbHVlO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgb3JpU2NhbGVZKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fb3JpU2NhbGVZID0gdmFsdWU7XG4gICAgfVxuICAgIHB1YmxpYyBzZXRUYXJnZXQobm9kZTogY2MuTm9kZSk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YXJnZXQgPSBub2RlO1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICB9XG5cbiAgICBvbkVuYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdG9wV2FsaygpO1xuICAgIH1cbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XG5cbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UG9zaXRpb24ocG9zOiBjYy5WZWMyIHwgbnVtYmVyLCB5PzogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihwb3MsIHkpO1xuICAgICAgICB0aGlzLnVwZGF0ZUVhc2luZygpO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRQb3NpdGlvbigpOiBjYy5WZWMyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRQb3NpdGlvbigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXRFYXNpbmdZKGVhc2luZ1k6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9lYXNpbmdZID0gZWFzaW5nWTtcbiAgICAgICAgdGhpcy51cGRhdGVFYXNpbmcoKTtcbiAgICB9XG4gICAgcHVibGljIHVwZGF0ZUVhc2luZygpOiB2b2lkIHtcbiAgICAgICAgbGV0IHRhcmdldDogY2MuTm9kZSA9IHRoaXMuX3RhcmdldCA/IHRoaXMuX3RhcmdldCA6IHRoaXMubm9kZTtcbiAgICAgICAgdmFyIHNjYWxlOiBudW1iZXIgPSB0aGlzLm1hdGhTY2FsZVkodGhpcy5ub2RlLnkpO1xuICAgICAgICB0aGlzLm5vZGUuc2NhbGVZID0gc2NhbGUgKiB0aGlzLl9vcmlTY2FsZVk7XG4gICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSBzY2FsZSAqIHRoaXMuX29yaVNjYWxlWDtcbiAgICAgICAgdGFyZ2V0LnNjYWxlWCA9IE1hdGguYWJzKHRhcmdldC5zY2FsZVgpICogdGhpcy5fZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIC8vIHB1YmxpYyBzZXQgc2NhbGUodmFsdWU6IG51bWJlcikge1xuICAgIC8vICAgICBpZiAodGhpcy5ub2RlLnNjYWxlWCAhPSB2YWx1ZSkge1xuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWCA9IHZhbHVlO1xuICAgIC8vICAgICAgICAgdGhpcy5ub2RlLnNjYWxlWSA9IHZhbHVlICogdGhpcy5fZGlyZWN0aW9uO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgcHVibGljIGdldCBzcGVlZCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3BlZWQ7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgc3BlZWQodmFsdWU6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zcGVlZCA9IHZhbHVlO1xuICAgICAgICB2YXIgaTogbnVtYmVyLCBqOiBudW1iZXI7XG4gICAgICAgIHZhciBsZW46IG51bWJlciA9IEdyYXBoVXRpbC5hbmdsZUxpYi5sZW5ndGg7XG4gICAgICAgIHRoaXMuYW5nbGVMaWIgPSBbXTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmFuZ2xlTGliW2ldID0gW107XG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgMjsgaisrKSB7XG4gICAgICAgICAgICAgICAgLy/orqHnrpfnp7vliqjpgJ/luqZcbiAgICAgICAgICAgICAgICB0aGlzLmFuZ2xlTGliW2ldW2pdID0gTWF0aC5yb3VuZChHcmFwaFV0aWwuYW5nbGVMaWJbaV1bal0gKiB2YWx1ZSAqIDEwMDApIC8gMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHVibGljIGdldCBpc01vdmluZygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTW92aW5nO1xuICAgIH1cblxuICAgIHB1YmxpYyB3YWxrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pc01vdmluZyA9IHRydWU7XG4gICAgICAgIGxldCBldnQ6ICRBRXZlbnQgPSBuZXcgJEFFdmVudCgkQUV2ZW50LlJPTEVfV0FMSyk7XG4gICAgICAgIHRoaXMubm9kZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0b3BXYWxrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl90YXJnZXRBTm9kZSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lzTW92aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhdGhzID0gbnVsbDtcbiAgICAgICAgbGV0IGV2dDogJEFFdmVudCA9IG5ldyAkQUV2ZW50KCRBRXZlbnQuUk9MRV9TVEFORCk7XG4gICAgICAgIHRoaXMubm9kZS5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuXG4gICAgcHVibGljIHN0b3BUYWxrKCk6IHZvaWQge1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0hpdChwb3M6IGNjLlZlYzIpOiBib29sZWFuIHtcbiAgICAgICAgLy8gbGV0IG5vdzogY2MuVmVjMiA9IHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgICAgICAgLy8gcmV0dXJuIEdyYXBoVXRpbC5zcXVhcmVEaXMocG9zLngsIHBvcy55LCBub3cueCwgbm93LnkpIDw9IDIwICogMjA7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9Sb29tKHg6IG51bWJlciwgeTogbnVtYmVyLCBzd2FwTm9kZTogY2MuTm9kZSk6IHZvaWQge1xuICAgICAgICB0aGlzLm5vZGUueCA9IHg7XG4gICAgICAgIHRoaXMubm9kZS55ID0geTtcbiAgICAgICAgc3dhcE5vZGUuYWRkQ2hpbGQodGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoZHQ6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5faXNNb3ZpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl90YXJnZXRBTm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBkaXM6IG51bWJlcjtcbiAgICAgICAgICAgICAgICB2YXIgcG9zOiBjYy5WZWMyO1xuICAgICAgICAgICAgICAgIHZhciB0eDogbnVtYmVyID0gdGhpcy5fdGFyZ2V0QU5vZGUueCAtIHRoaXMubm9kZS54O1xuICAgICAgICAgICAgICAgIHZhciB0eTogbnVtYmVyID0gdGhpcy5fdGFyZ2V0QU5vZGUueSAtIHRoaXMubm9kZS55O1xuICAgICAgICAgICAgICAgIGRpcyA9ICh0eCAqIHR4ICsgdHkgKiB0eSk7XG4gICAgICAgICAgICAgICAgcG9zID0gdGhpcy5tYXRoU3BlZWQoZHQpO1xuICAgICAgICAgICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVUYXJnZXQocG9zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGRpcyA8IHRoaXMuX3NxdWFyZSAqIGR0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fcGF0aHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24odGhpcy5fdGFyZ2V0QU5vZGUueCwgdGhpcy5fdGFyZ2V0QU5vZGUueSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0QU5vZGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BhdGhzICYmIHRoaXMuX3BhdGhzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXRBTm9kZSA9IHRoaXMuX3BhdGhzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wV2FsaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwcm90ZWN0ZWQgdXBkYXRlVGFyZ2V0KHBvczogY2MuVmVjMik6IHZvaWQge1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0OiBjYy5Ob2RlID0gdGhpcy5fdGFyZ2V0ID8gdGhpcy5fdGFyZ2V0IDogdGhpcy5ub2RlO1xuICAgICAgICAgICAgdmFyIHNjYWxlOiBudW1iZXIgPSB0aGlzLm1hdGhTY2FsZVkodGhpcy5ub2RlLnkpO1xuICAgICAgICAgICAgbGV0IHJhdGlvOiBudW1iZXIgPSAwLjMgKyAwLjcgKiBzY2FsZTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVkgPSBzY2FsZSAqIHRoaXMuX29yaVNjYWxlWTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zY2FsZVggPSBzY2FsZSAqIHRoaXMuX29yaVNjYWxlWDtcbiAgICAgICAgICAgIHRhcmdldC5zY2FsZVggPSBNYXRoLmFicyh0YXJnZXQuc2NhbGVYKSAqIHRoaXMuX2RpcmVjdGlvbjtcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLm5vZGUueCArIHBvcy54ICogcmF0aW8sIHRoaXMubm9kZS55ICsgcG9zLnkgKiByYXRpbyk7XG4gICAgICAgICAgICB0aGlzLm5vZGUuZGlzcGF0Y2hFdmVudChuZXcgJEFFdmVudCgkQUV2ZW50LlJPTEVfTU9WRSwgdHJ1ZSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBtYXRoU2NhbGVZKHk6IG51bWJlcik6IG51bWJlciB7XG4gICAgICAgIC8vIGlmICh0aGlzLl9lYXNpbmdZICE9IFwiXCIpIHtcbiAgICAgICAgLy8gcmV0dXJuIHBhcnNlRmxvYXQoZXZhbCh0aGlzLl9lYXNpbmdZLnJlcGxhY2UoXCJ5XCIsIHkudG9TdHJpbmcoKSkpKTtcbiAgICAgICAgLy8gfVxuICAgICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2V0UGF0aHMocGF0aHM6ICRBTm9kZVtdLCBwb3M6IGNjLlZlYzIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHBhdGhzICYmIHBhdGhzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5fcGF0aHMgPSBwYXRocztcbiAgICAgICAgICAgIHRoaXMud2FsaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdG9wV2FsaygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICog6K6+572u56e75Yqo6KeS5bqmXG4gICAgICovXG4gICAgcHVibGljIHNldCBkZWdyZWUodmFsdWU6IG51bWJlcikge1xuICAgICAgICBpZiAodGhpcy5fZGVncmVlICE9IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9kZWdyZWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPSAwICYmIHZhbHVlICE9IDE4MCkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA+IDAgJiYgdmFsdWUgPCAxODApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlyZWN0aW9uID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMubm9kZS5zY2FsZVggPSB0aGlzLl9kaXJlY3Rpb24gKiB0aGlzLm5vZGUuc2NhbGVZO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpcmVjdGlvbiA9IDE7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMubm9kZS5zY2FsZVggPSAtdGhpcy5fZGlyZWN0aW9uICogdGhpcy5ub2RlLnNjYWxlWTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgc2V0IGRpcmVjdGlvbihzY2FsZVg6IG51bWJlcikge1xuICAgIC8vICAgICB0aGlzLm5vZGUuc2NhbGVYID0gc2NhbGVYICogdGhpcy5ub2RlLnNjYWxlWTtcbiAgICAvLyB9XG5cbiAgICBwcm90ZWN0ZWQgbWF0aFNwZWVkKGR0OiBudW1iZXIpOiBjYy5WZWMyIHtcbiAgICAgICAgdmFyIHBvczogY2MuVmVjMjtcbiAgICAgICAgdmFyIGRlZ3JlZTogbnVtYmVyID0gR3JhcGhVdGlsLmdldEFuZ2xlKHRoaXMubm9kZS54LCB0aGlzLm5vZGUueSwgdGhpcy5fdGFyZ2V0QU5vZGUueCwgdGhpcy5fdGFyZ2V0QU5vZGUueSk7XG4gICAgICAgIGlmIChkZWdyZWUgIT0gMzYwKSB7XG4gICAgICAgICAgICBwb3MgPSBuZXcgY2MuVmVjMigpO1xuICAgICAgICAgICAgdmFyIGluZGV4OiBudW1iZXIgPSBNYXRoLnJvdW5kKChkZWdyZWUgKyAzNjApICUgMzYwIC8gNDUpICUgODtcbiAgICAgICAgICAgIHBvcy54ID0gdGhpcy5hbmdsZUxpYltpbmRleF1bMF0gKiBkdDtcbiAgICAgICAgICAgIHBvcy55ID0gdGhpcy5hbmdsZUxpYltpbmRleF1bMV0gKiBkdDtcbiAgICAgICAgICAgIHRoaXMuZGVncmVlID0gaW5kZXggKiA0NTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cblxufSIsImltcG9ydCB7IFRpbWVNZ3IgfSBmcm9tIFwiem1nX3RpbWVfbWdyXCI7XG5pbXBvcnQgeyBVSU1nciB9IGZyb20gXCJ6bWdfdWlfbWdyXCI7XG5pbXBvcnQgeyBnTG9nIH0gZnJvbSBcInptZ191dGlsXCI7XG5pbXBvcnQgJEFUYXJnZXQgZnJvbSBcIi4vQVRhcmdldFwiO1xuXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyAkQVN3YXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xuICAgIHByaXZhdGUgX2lzVXBkYXRlOiBib29sZWFuO1xuICAgIG9uTG9hZCgpIHtcbiAgICAgICAgVGltZU1nci5kb1RpbWVyKDIwMCwgdGhpcy5vblRpbWVyLCB0aGlzKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uVGltZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9pc1VwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5faXNVcGRhdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGdMb2coXCLmjpLluo/lvIDlp4suLi5cIiArIHRoaXMubm9kZS5jaGlsZHJlbi5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuLnNvcnQodGhpcy5zb3J0Tm9kZSk7XG4gICAgICAgICAgICBpZiAoQ0NfSlNCKSB7XG4gICAgICAgICAgICAgICAgbGV0IGk6IG51bWJlcjtcbiAgICAgICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSB0aGlzLm5vZGUuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW5baV0uekluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgdXBkYXRlQWxpZ25tZW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pc1VwZGF0ZSA9IHRydWU7XG4gICAgfVxuICAgIHByaXZhdGUgc29ydE5vZGUoYTogY2MuTm9kZSwgYjogY2MuTm9kZSk6IG51bWJlciB7XG4gICAgICAgIGlmIChhLnkgPiBiLnkpIHtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfSBlbHNlIGlmIChhLnkgPCBiLnkpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBwdWJsaWMgYWRkTW92ZShtb3ZlOiAkQVRhcmdldCk6IHZvaWQge1xuICAgICAgICBtb3ZlLm5vZGUuc2V0UGFyZW50KHRoaXMubm9kZSk7XG4gICAgICAgIHRoaXMudXBkYXRlQWxpZ25tZW50KCk7XG4gICAgfVxuXG4gICAgb25FbmFibGUoKTogdm9pZCB7XG4gICAgICAgIFVJTWdyLm1vdXNlLnNldEVmZmVjdFBhcmVudCh0aGlzLm5vZGUpO1xuICAgIH1cbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XG4gICAgfVxufSIsImltcG9ydCAkQU1hcCBmcm9tIFwiLi9BTWFwXCI7XHJcbmltcG9ydCAkQVRhcmdldCBmcm9tIFwiLi9BVGFyZ2V0XCI7XHJcbmltcG9ydCB7ICRBTm9kZSB9IGZyb20gXCIuL0FOb2RlXCI7XHJcbmltcG9ydCB7IFVJTW91c2VFdmVudCwgRVJvbGVBY3Rpb24sIEFjdG9yIH0gZnJvbSBcInptZ191aV9tZ3JcIjtcclxuaW1wb3J0IHsgRXZlbnRNZ3IsIEV2ZW50TmFtZSB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XHJcbmltcG9ydCB7ICRBRXZlbnQgfSBmcm9tIFwiLi9BRXZlbnRcIjtcclxuaW1wb3J0ICRBU3dhcCBmcm9tIFwiLi9BU3dhcFwiO1xyXG5pbXBvcnQgeyBEaXJlY3RvckV2ZW50IH0gZnJvbSBcInptZ19jb250cm9sbGVyXCI7XHJcbmltcG9ydCB7IGdMb2csIE5vZGVVdGlsIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7IFJvbGVFdmVudCB9IGZyb20gXCJ6bWdfdWlfbWdyXCI7XHJcbmltcG9ydCB7ICRBR3JpZCB9IGZyb20gXCIuL0FHcmlkXCI7XHJcblxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzICRBWm9uZSBleHRlbmRzICRBTWFwIHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBcIumVnOWktOaYr+WQpui3n+maj1wiIH0pXHJcbiAgICBpc0ZvY3VzOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5DYW1lcmEgfSlcclxuICAgIHJvbGVDYW1lcmE6IGNjLkNhbWVyYSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSB9KVxyXG4gICAgYmFja2dyb3VuZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSB9KVxyXG4gICAgZm9yZWdyb3VuZDogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogJEFTd2FwLCB0b29sdGlwOiBcIuS6pOaNouWxglwiIH0pXHJcbiAgICBzd2FwOiAkQVN3YXAgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5Lq654mp5b2i6LGh57yp5pS+5q+U5L6LXCIgfSlcclxuICAgIHJvbGVTY2FsZTogbnVtYmVyID0gMS4wO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5Lq654mp5b2i6LGh57yp5pS+5q+U5L6LXCIgfSlcclxuICAgIHJvbGVTcGVlZDogbnVtYmVyID0gOTA7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLkurrnianlvaLosaHnvKnmlL7mr5TkvotcIiB9KVxyXG4gICAgcGV0U3BlZWQ6IG51bWJlciA9IDgwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi6LW35aeL54K5XCIgfSlcclxuICAgIHN0YXJ0Tm9kZTogY2MuVmVjMiA9IG5ldyBjYy5WZWMyKCk7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCJZ6L2057yp5pS+5q+U5L6L5Ye95pWwXCIgfSlcclxuICAgIGVhc2luZ1k6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfcm9sZU1vdmU6ICRBVGFyZ2V0O1xyXG4gICAgcHJpdmF0ZSBfcGV0TW92ZTogJEFUYXJnZXQ7XHJcbiAgICBwcml2YXRlIF9taW5DYW1lcmFYOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9tYXhDYW1lYXJYOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBfbWluQ2FtZXJhWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfbWF4Q2FtZWFyWTogbnVtYmVyO1xyXG5cclxuICAgIHByaXZhdGUgX2lzTG9ja2luZzogYm9vbGVhbjtcclxuXHJcbiAgICBwcml2YXRlIF9tb3ZlczogJEFUYXJnZXRbXSA9IFtdO1xyXG5cclxuICAgIHByaXZhdGUgX2lzSW5pdDogYm9vbGVhbjtcclxuXHJcbiAgICBwdWJsaWMgbG9jaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pc0xvY2tpbmcgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bkxvY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faXNMb2NraW5nID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZE1vdmUobW92ZTogJEFUYXJnZXQpOiB2b2lkIHtcclxuICAgICAgICBtb3ZlLnNldEVhc2luZ1kodGhpcy5lYXNpbmdZKTtcclxuICAgICAgICBtb3ZlLm5vZGUub24oJEFFdmVudC5ST0xFX01PVkUsIHRoaXMub25Sb2xlTW92ZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5fbW92ZXMucHVzaChtb3ZlKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgdGhpcy5faXNJbml0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pbml0KClcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIGxldCBhY3RvciA9IEFjdG9yKCk7XHJcbiAgICAgICAgaWYgKHRoaXMucm9sZUNhbWVyYSkge1xyXG4gICAgICAgICAgICB0aGlzLl9taW5DYW1lcmFYID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGggLyAyIC0gdGhpcy5ub2RlLndpZHRoIC8gMjtcclxuICAgICAgICAgICAgdGhpcy5fbWF4Q2FtZWFyWCA9IC10aGlzLl9taW5DYW1lcmFYO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fbWluQ2FtZXJhWSA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodCAvIDIgLSB0aGlzLm5vZGUuaGVpZ2h0IC8gMjtcclxuICAgICAgICAgICAgdGhpcy5fbWF4Q2FtZWFyWSA9IC10aGlzLl9taW5DYW1lcmFZO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yb2xlTW92ZSA9IE5vZGVVdGlsLmNyZWF0ZUNvbXBvbmVudCgkQVRhcmdldCwgYWN0b3Iubm9kZSk7XHJcbiAgICAgICAgdGhpcy5fcGV0TW92ZSA9IE5vZGVVdGlsLmNyZWF0ZUNvbXBvbmVudCgkQVRhcmdldCwgYWN0b3IucGV0Lm5vZGUpO1xyXG4gICAgICAgIHRoaXMuX3JvbGVNb3ZlLnNwZWVkID0gdGhpcy5yb2xlU3BlZWQ7XHJcbiAgICAgICAgdGhpcy5fcGV0TW92ZS5zcGVlZCA9IHRoaXMucGV0U3BlZWQ7XHJcbiAgICAgICAgdGhpcy5fcm9sZU1vdmUuc2V0VGFyZ2V0KGFjdG9yLmRpc3BsYXkubm9kZSk7XHJcbiAgICAgICAgdGhpcy5fcGV0TW92ZS5zZXRUYXJnZXQoYWN0b3IucGV0Lm5vZGUpO1xyXG4gICAgICAgIHRoaXMuX3JvbGVNb3ZlLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fcGV0TW92ZS5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX3BldE1vdmUub3JpU2NhbGVYID0gMS4yICogdGhpcy5yb2xlU2NhbGU7XHJcbiAgICAgICAgdGhpcy5fcGV0TW92ZS5vcmlTY2FsZVkgPSAxLjIgKiB0aGlzLnJvbGVTY2FsZTtcclxuICAgICAgICB0aGlzLl9yb2xlTW92ZS5vcmlTY2FsZVggPSB0aGlzLnJvbGVTY2FsZTtcclxuICAgICAgICB0aGlzLl9yb2xlTW92ZS5vcmlTY2FsZVkgPSB0aGlzLnJvbGVTY2FsZTtcclxuICAgICAgICB0aGlzLmFkZE1vdmUodGhpcy5fcm9sZU1vdmUpO1xyXG4gICAgICAgIHRoaXMuYWRkTW92ZSh0aGlzLl9wZXRNb3ZlKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUNhbWVyYSgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN3YXApIHtcclxuICAgICAgICAgICAgYWN0b3Iuc2V0UGFyZW50KHRoaXMuc3dhcC5ub2RlKTtcclxuICAgICAgICAgICAgYWN0b3IucGV0LnNldFBhcmVudCh0aGlzLnN3YXAubm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuc3dhcC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKSB7XHJcbiAgICAgICAgbGV0IGFjdG9yID0gQWN0b3IoKTtcclxuICAgICAgICBhY3Rvci5ub2RlLm9uKCRBRXZlbnQuUk9MRV9NT1ZFLCB0aGlzLnVwZGF0ZUNhbWVyYSwgdGhpcywgZmFsc2UpO1xyXG4gICAgICAgIGFjdG9yLm5vZGUub24oJEFFdmVudC5ST0xFX1dBTEssIHRoaXMub25Sb2xlV2FsaywgdGhpcywgZmFsc2UpO1xyXG4gICAgICAgIGFjdG9yLm5vZGUub24oJEFFdmVudC5ST0xFX1NUQU5ELCB0aGlzLm9uUm9sZVN0YW5kLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgYWN0b3Iubm9kZS5vbihFdmVudE5hbWUuVUlfUk9MRV9BQ1RJT05fQ0hBTkdFLCB0aGlzLm9uQWN0b3JUYWxrLCB0aGlzKTtcclxuICAgICAgICBhY3Rvci5wZXQubm9kZS5vbigkQUV2ZW50LlJPTEVfV0FMSywgdGhpcy5vblBldFdhbGssIHRoaXMpO1xyXG4gICAgICAgIGFjdG9yLnBldC5ub2RlLm9uKCRBRXZlbnQuUk9MRV9TVEFORCwgdGhpcy5vblBldFN0YW5kLCB0aGlzKTtcclxuICAgICAgICBFdmVudE1nci5vbihFdmVudE5hbWUuVUlfTU9VU0VfVVAsIHRoaXMub25Nb3VzZVVwLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub24oRXZlbnROYW1lLlVJX1pPTkVfTU9WRSwgdGhpcy5vblpvbmVNb3ZlLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub24oRXZlbnROYW1lLlVJX01PVVNFX0RPV04sIHRoaXMub25Nb3VzZURvd24sIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICBFdmVudE1nci5vbihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfRU5ELCB0aGlzLm9uU2NlbmVFbmQsIHRoaXMsIGZhbHNlLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgbGV0IGk6IG51bWJlcjtcclxuICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSB0aGlzLl9tb3Zlcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21vdmVzW2ldLm5vZGUub2ZmKCRBRXZlbnQuUk9MRV9NT1ZFLCB0aGlzLm9uUm9sZU1vdmUsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYWN0b3IgPSBBY3RvcigpO1xyXG4gICAgICAgIGFjdG9yLm5vZGUub2ZmKCRBRXZlbnQuUk9MRV9NT1ZFLCB0aGlzLnVwZGF0ZUNhbWVyYSk7XHJcbiAgICAgICAgYWN0b3Iubm9kZS5vZmYoJEFFdmVudC5ST0xFX1dBTEssIHRoaXMub25Sb2xlV2FsaywgdGhpcyk7XHJcbiAgICAgICAgYWN0b3Iubm9kZS5vZmYoJEFFdmVudC5ST0xFX1NUQU5ELCB0aGlzLm9uUm9sZVN0YW5kLCB0aGlzKTtcclxuICAgICAgICBhY3Rvci5ub2RlLm9mZihFdmVudE5hbWUuVUlfUk9MRV9BQ1RJT05fQ0hBTkdFLCB0aGlzLm9uQWN0b3JUYWxrLCB0aGlzKTtcclxuICAgICAgICBhY3Rvci5wZXQubm9kZS5vZmYoJEFFdmVudC5ST0xFX1dBTEssIHRoaXMub25QZXRXYWxrLCB0aGlzKTtcclxuICAgICAgICBhY3Rvci5wZXQubm9kZS5vZmYoJEFFdmVudC5ST0xFX1NUQU5ELCB0aGlzLm9uUGV0U3RhbmQsIHRoaXMpO1xyXG5cclxuICAgICAgICBFdmVudE1nci5vZmYoRXZlbnROYW1lLlVJX01PVVNFX1VQLCB0aGlzLm9uTW91c2VVcCwgdGhpcyk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub2ZmKEV2ZW50TmFtZS5VSV9aT05FX01PVkUsIHRoaXMub25ab25lTW92ZSwgdGhpcyk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub2ZmKEV2ZW50TmFtZS5VSV9NT1VTRV9ET1dOLCB0aGlzLm9uTW91c2VEb3duLCB0aGlzKTtcclxuICAgICAgICBFdmVudE1nci5vZmYoRXZlbnROYW1lLkNPTlRST0xMRVJfQ0hBTkdFX0VORCwgdGhpcy5vblNjZW5lRW5kLCB0aGlzKTtcclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uQWN0b3JUYWxrKGV2dDogUm9sZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGV2dC5wYXJhbSA9PSBFUm9sZUFjdGlvbi5UQUxLKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JvbGVNb3ZlLnNldFBhdGhzKG51bGwsIG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLl9wZXRNb3ZlLnNldFBhdGhzKG51bGwsIG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBvblNjZW5lRW5kKGV2dD86IERpcmVjdG9yRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZXZ0ICYmIGV2dC5wYXJhbSkge1xyXG4gICAgICAgICAgICBpZiAoZXZ0LnBhcmFtLnggIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydE5vZGUueCA9IGV2dC5wYXJhbS54O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChldnQucGFyYW0ueSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0Tm9kZS55ID0gZXZ0LnBhcmFtLnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRQb3N0aW9uKHRoaXMuc3RhcnROb2RlKTtcclxuICAgICAgICBsZXQgYWN0b3IgPSBBY3RvcigpO1xyXG4gICAgICAgIGFjdG9yLnBldC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgYWN0b3Iubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgc3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRQb3N0aW9uKHBvczogY2MuVmVjMik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9ncmlkKSB7XHJcbiAgICAgICAgICAgIGxldCBhY3RvciA9IEFjdG9yKCk7XHJcbiAgICAgICAgICAgIGxldCBhTm9kZSA9IHRoaXMuX2dyaWQuZ2V0V2Fsa0J5UGl4ZWwocG9zKTtcclxuICAgICAgICAgICAgYU5vZGUgJiYgYWN0b3Iuc2V0UG9zdGlvbihhTm9kZS54LCBhTm9kZS55KTtcclxuICAgICAgICAgICAgYU5vZGUgPSB0aGlzLl9ncmlkLmdldFdhbGtCeVBpeGVsKHBvcy54ICsgNTAsIHBvcy55KTtcclxuICAgICAgICAgICAgaWYgKCFhTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgYU5vZGUgPSB0aGlzLl9ncmlkLmdldFdhbGtCeVBpeGVsKHBvcy54IC0gNTAsIHBvcy55KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhTm9kZSAmJiBhY3Rvci5wZXQuc2V0UG9zdGlvbihhTm9kZS54LCBhTm9kZS55KTtcclxuICAgICAgICAgICAgdGhpcy5fcm9sZU1vdmUudXBkYXRlRWFzaW5nKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc3dhcC51cGRhdGVBbGlnbm1lbnQoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDYW1lcmEoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHNldEdyaWQoZGF0YTogJEFHcmlkKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuc2V0R3JpZChkYXRhKTtcclxuICAgICAgICB0aGlzLnNldFBvc3Rpb24odGhpcy5zdGFydE5vZGUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblpvbmVNb3ZlKGV2dDogJEFFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubW92ZVRvKGV2dC53b3JsZFBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlKGR0OiBudW1iZXIpIHtcclxuICAgIC8vICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgLy8gICAgIGxldCBsZW46IG51bWJlciA9IHRoaXMuX21vdmVzLmxlbmd0aDtcclxuICAgIC8vICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgIC8vICAgICAgICAgdGhpcy5fbW92ZXNbaV0udXBkYXRlTW92ZShkdCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG5cclxuICAgIHByaXZhdGUgb25Sb2xlTW92ZShldnQ6ICRBRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN3YXAudXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uTW91c2VEb3duKGV2dDogVUlNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzTG9ja2luZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25Sb2xlVG91Y2hEb3duKGV2dCk7XHJcbiAgICAgICAgbGV0IHBvczogY2MuVmVjMiA9IHRoaXMuY29udmVydFRvTm9kZVNwYWNlQVIoZXZ0LmdldExvY2F0aW9uKCkpO1xyXG4gICAgICAgIHZhciBhbjogJEFOb2RlID0gdGhpcy5nZXRXYWxrTm9kZShwb3MpO1xyXG4gICAgICAgIGlmIChhbikge1xyXG4gICAgICAgICAgICAvLyBUb2FzdE1nci5vcGVuKFwiQTpcIiArIGFuLmEgKyBcIiBCOlwiICsgYW4uYik7XHJcbiAgICAgICAgICAgIGdMb2coXCJDbGljayBNYXAgIEE6XCIgKyBhbi5hICsgXCIgQjpcIiArIGFuLmIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFRvYXN0TWdyLm9wZW4oXCJOb25lXCIpO1xyXG4gICAgICAgICAgICBnTG9nKFwiQ2xpY2sgTWFwIE5vbmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIG1vdmVUbyhwb3M6IGNjLlZlYzIpOiB2b2lkIHtcclxuICAgICAgICBjb25zb2xlLnRpbWUoXCJmaW5kUGF0aFwiKTtcclxuICAgICAgICBsZXQgYWN0b3I6ICRBVGFyZ2V0ID0gdGhpcy5fcm9sZU1vdmU7XHJcbiAgICAgICAgbGV0IHN0YXJ0OiBjYy5WZWMyID0gYWN0b3IuZ2V0UG9zaXRpb24oKTtcclxuICAgICAgICBsZXQgcGF0aHM6ICRBTm9kZVtdID0gdGhpcy5maW5kUGF0aFBpeGlzKHN0YXJ0LngsIHN0YXJ0LnksIHBvcy54LCBwb3MueSk7XHJcbiAgICAgICAgaWYgKCFwYXRocykge1xyXG4gICAgICAgICAgICBjb25zb2xlLnRpbWVFbmQoXCJmaW5kUGF0aFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmRyYXdNYXAocGF0aHMpO1xyXG4gICAgICAgIGFjdG9yLnNldFBhdGhzKHBhdGhzLCBwb3MpO1xyXG4gICAgICAgIHBhdGhzID0gdGhpcy5maW5kUGF0aFBpeGlzKHRoaXMuX3BldE1vdmUubm9kZS54LCB0aGlzLl9wZXRNb3ZlLm5vZGUueSwgcG9zLnggKyA1MCwgcG9zLnkgLSAxMCk7XHJcbiAgICAgICAgaWYgKCFwYXRocykge1xyXG4gICAgICAgICAgICBwYXRocyA9IHRoaXMuZmluZFBhdGhQaXhpcyh0aGlzLl9wZXRNb3ZlLm5vZGUueCwgdGhpcy5fcGV0TW92ZS5ub2RlLnksIHBvcy54IC0gNTAsIHBvcy55IC0gMTApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGF0aHMpIHtcclxuICAgICAgICAgICAgdGhpcy5fcGV0TW92ZS5zZXRQYXRocyhwYXRocywgcG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc29sZS50aW1lRW5kKFwiZmluZFBhdGhcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uUm9sZVRvdWNoRG93bihldnQ6IFVJTW91c2VFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBwb3M6IGNjLlZlYzIgPSB0aGlzLmNvbnZlcnRUb05vZGVTcGFjZUFSKGV2dC5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICB0aGlzLm1vdmVUbyhwb3MpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Nb3VzZVVwKGV2dDogVUlNb3VzZUV2ZW50KTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlQ2FtZXJhKGV2dD86ICRBRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNGb2N1cyB8fCAhdGhpcy5yb2xlQ2FtZXJhKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHBvczogY2MuVmVjMiA9IHRoaXMuX3JvbGVNb3ZlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgbGV0IGN4OiBudW1iZXIgPSAocG9zLnggLSB0aGlzLm5vZGUud2lkdGggLyAyKTtcclxuICAgICAgICBjeCA9IE1hdGgubWF4KHRoaXMuX21pbkNhbWVyYVgsIE1hdGgubWluKHRoaXMuX21heENhbWVhclgsIGN4KSk7XHJcbiAgICAgICAgdGhpcy5yb2xlQ2FtZXJhLm5vZGUueCA9IGN4O1xyXG4gICAgICAgIGxldCBjeTogbnVtYmVyID0gKHBvcy55IC0gdGhpcy5ub2RlLmhlaWdodCAvIDIpO1xyXG4gICAgICAgIGN5ID0gTWF0aC5tYXgodGhpcy5fbWluQ2FtZXJhWSwgTWF0aC5taW4odGhpcy5fbWF4Q2FtZWFyWSwgY3kpKTtcclxuICAgICAgICB0aGlzLnJvbGVDYW1lcmEubm9kZS55ID0gY3k7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblJvbGVXYWxrKCk6IHZvaWQge1xyXG4gICAgICAgIEFjdG9yKCkud2Fsa0xlZnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUm9sZVN0YW5kKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBhY3RvciA9IEFjdG9yKCk7XHJcbiAgICAgICAgaWYgKGFjdG9yLmdldEFjdGlvbigpID09IEVSb2xlQWN0aW9uLldBTEtfTEVGVCB8fCBhY3Rvci5nZXRBY3Rpb24oKSA9PSBFUm9sZUFjdGlvbi5XQUxLX1JJR0hUKSB7XHJcbiAgICAgICAgICAgIGFjdG9yLnN0YW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblBldFdhbGsoKTogdm9pZCB7XHJcbiAgICAgICAgQWN0b3IoKS5wZXQud2Fsa0xlZnQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUGV0U3RhbmQoKTogdm9pZCB7XHJcbiAgICAgICAgQWN0b3IoKS5wZXQuc3RhbmQoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTW92ZVJvbGUoZXZ0OiAkQUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tb3ZlVG8oZXZ0LndvcmxkUG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY29udmVydFRvTm9kZVNwYWNlKHBvczogY2MuVmVjMik6IGNjLlZlYzIge1xyXG4gICAgICAgIHBvcyA9IG5ldyBjYy5WZWMyKHBvcy54ICsgdGhpcy5ub2RlLndpZHRoICogdGhpcy5ub2RlLmFuY2hvclgsXHJcbiAgICAgICAgICAgIHBvcy55ICsgdGhpcy5ub2RlLmhlaWdodCAqIHRoaXMubm9kZS5hbmNob3JZKTtcclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNvbnZlcnRUb05vZGVTcGFjZUFSKHBvczogY2MuVmVjMik6IGNjLlZlYzIge1xyXG4gICAgICAgIHBvcyA9IHRoaXMubm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUihwb3MpO1xyXG4gICAgICAgIHBvcyA9IG5ldyBjYy5WZWMyKHBvcy54ICsgdGhpcy5ub2RlLndpZHRoICogdGhpcy5ub2RlLmFuY2hvclgsXHJcbiAgICAgICAgICAgIHBvcy55ICsgdGhpcy5ub2RlLmhlaWdodCAqIHRoaXMubm9kZS5hbmNob3JZKTtcclxuICAgICAgICByZXR1cm4gcG9zO1xyXG4gICAgfVxyXG5cclxufSIsIi8qXHJcbiAqIEBEZXNjcmlwdGlvbjogXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgRXZlbnRNZ3IgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgeyBBY3Rvciwgem1ndWlfYnRuX1NpbXBsZUJ0biB9IGZyb20gXCJ6bWdfdWlfbWdyXCI7XHJcbmltcG9ydCB7IEdyYXBoVXRpbCwgZ1dhcm4gfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuaW1wb3J0ICRBWm9uZSBmcm9tIFwiLi9BWm9uZVwiO1xyXG5pbXBvcnQgeyAkQUV2ZW50IH0gZnJvbSBcIi4vQUV2ZW50XCI7XHJcbmltcG9ydCB7ICRBTm9kZSB9IGZyb20gXCIuL0FOb2RlXCI7XHJcbmltcG9ydCAkU2ltcGxlQnRuIGZyb20gXCJ6bWdfdWlfbWdyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgJEFNb3ZlQnV0dG9uIGV4dGVuZHMgem1ndWlfYnRuX1NpbXBsZUJ0biB7XHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBcIuS6uueJqeenu+WKqOWIsOS9jee9ruWQjuinpuWPkVwiIH0pXHJcbiAgICB3b3JsZFBvczogY2MuVmVjMiA9IG5ldyBjYy5WZWMyKCk7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLnp7vliqjlkI7op6blj5FcIiB9KVxyXG4gICAgaXNNb3ZlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgc3VwZXIub25Mb2FkKCk7XHJcbiAgICAgICAgbGV0IHpvbmU6ICRBWm9uZSA9IGNjLkNhbnZhcy5pbnN0YW5jZS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKCRBWm9uZSk7XHJcbiAgICAgICAgem9uZS5vblJlYWR5KHRoaXMuY2hlY2tQb2ludCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4Dmn6Xnp7vliqjkvY3nva7mmK/lkKblj6/ku6XooYzotbBcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGNoZWNrUG9pbnQoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHpvbmU6ICRBWm9uZSA9IGNjLkNhbnZhcy5pbnN0YW5jZS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKCRBWm9uZSk7XHJcbiAgICAgICAgbGV0IGFub2RlOiAkQU5vZGUgPSB6b25lLmdldE5vZGUodGhpcy53b3JsZFBvcyk7XHJcbiAgICAgICAgaWYgKCFhbm9kZSB8fCAhYW5vZGUud2Fsa2FibGUpIHtcclxuICAgICAgICAgICAgZ1dhcm4oXCJuYW1lOlwiICsgdGhpc1tcIm5vZGVcIl0ubmFtZSArIFwiIHg6XCIgKyB0aGlzLndvcmxkUG9zLnggKyBcIiB5OlwiICsgdGhpcy53b3JsZFBvcy55ICsgXCIs5b2T5YmN6K6+5a6a54K55LiN5Y+v56e75YqoIVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uSGFuZGxlcihldnQ/OiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNNb3ZlKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5vblJvbGVTdGFuZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgemV2dDogJEFFdmVudCA9IG5ldyAkQUV2ZW50KCRBRXZlbnQuWk9ORV9NT1ZFKTtcclxuICAgICAgICAgICAgICAgIHpldnQud29ybGRQb3MgPSB0aGlzLndvcmxkUG9zO1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNZ3IuZGlzcGF0Y2hFdmVudCh6ZXZ0KTtcclxuICAgICAgICAgICAgICAgIEFjdG9yKCkubm9kZS5vbigkQUV2ZW50LlJPTEVfU1RBTkQsIHRoaXMub25Sb2xlU3RhbmQsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIEFjdG9yKCkubm9kZS5vbigkQUV2ZW50LlJPTEVfV0FMSywgdGhpcy5vblJvbGVXYWxrLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdXBlci5vbkhhbmRsZXIoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIub25FbmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgQWN0b3IoKS5ub2RlLm9mZigkQUV2ZW50LlJPTEVfU1RBTkQsIHRoaXMub25Sb2xlU3RhbmQsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICBBY3RvcigpLm5vZGUub2ZmKCRBRXZlbnQuUk9MRV9XQUxLLCB0aGlzLm9uUm9sZVdhbGssIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICBzdXBlci5vbkRpc2FibGUoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Sb2xlV2FsayhldnQ/OiAkQUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgQWN0b3IoKS5ub2RlLm9mZigkQUV2ZW50LlJPTEVfU1RBTkQsIHRoaXMub25Sb2xlU3RhbmQsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICBBY3RvcigpLm5vZGUub2ZmKCRBRXZlbnQuUk9MRV9XQUxLLCB0aGlzLm9uUm9sZVdhbGssIHRoaXMsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Sb2xlU3RhbmQoZXZ0PzogJEFFdmVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCB6b25lOiAkQVpvbmUgPSBjYy5DYW52YXMuaW5zdGFuY2UuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbigkQVpvbmUpO1xyXG4gICAgICAgIGxldCByb2xlUG9zOiBjYy5WZWMyID0gQWN0b3IoKS5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgaWYgKHpvbmUuaGl0VGVzdChyb2xlUG9zLngsIHJvbGVQb3MueSwgdGhpcy53b3JsZFBvcy54LCB0aGlzLndvcmxkUG9zLnkpKSB7XHJcbiAgICAgICAgICAgIEFjdG9yKCkubm9kZS5vZmYoJEFFdmVudC5ST0xFX1NUQU5ELCB0aGlzLm9uUm9sZVN0YW5kLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHN1cGVyLm9uSGFuZGxlcigpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy8gb25Mb2FkICgpIHt9XHJcblxyXG4gICAgLy8gc3RhcnQgKCkge30sXHJcblxyXG4gICAgLy8gdXBkYXRlIChkdCkge31cclxuXHJcbn1cclxuIiwiLypcclxuICogQERlc2NyaXB0aW9uOiDnp7vliqjljLrln5/lpZfku7ZcclxuICovXHJcblxyXG5pbXBvcnQgeyBnTG9nLCBHcmFwaFV0aWwsIE5vZGVVdGlsIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7ICRBR3JpZCB9IGZyb20gXCIuL0FHcmlkXCI7XHJcbmltcG9ydCB7ICRBTm9kZSB9IGZyb20gXCIuL0FOb2RlXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgJEFFZGl0TWFwIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5piv5ZCm57uY55S7XCIgfSlcclxuICAgIGlzRGVidWc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Kc29uQXNzZXQsIHRvb2x0aXA6IFwi56Kw5pKe5pWw5o2uXCIgfSlcclxuICAgIGRhdGE6IGNjLkpzb25Bc3NldCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuQ29sbGlkZXIsIHRvb2x0aXA6IFwi54mp5ZOB5Y2g55So5Yy6XCIgfSlcclxuICAgIGNvdmVyczogY2MuQ29sbGlkZXJbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkNvbGxpZGVyLCB0b29sdGlwOiBcIueisOaSnuWMuuWfn1wiIH0pXHJcbiAgICBjb2xsaWRlcjogY2MuQ29sbGlkZXIgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5Yy65Z+f5ZCN56ewLOaJk+WNsOS9v+eUqOWFt+S9k+aVsOWAvOaMieeFp+WKoOi9vei/m+adpeeahGpzb27lhrPlrppcIiB9KVxyXG4gICAgem9uZU5hbWU6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLpl7Tot50s5omT5Y2w5L2/55So5YW35L2T5pWw5YC85oyJ54Wn5Yqg6L296L+b5p2l55qEanNvbuWGs+WumlwiIH0pXHJcbiAgICBkaXN0YW5jZTogbnVtYmVyID0gMTA7XHJcblxyXG4gICAgcHJpdmF0ZSBfZ3JpZDogJEFHcmlkO1xyXG4gICAgLyoqXHJcbiAgICAgKiDmiZPljbDovpPlh7rmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVNYXAoKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgaTogbnVtYmVyO1xyXG4gICAgICAgIHZhciBqOiBudW1iZXI7XHJcbiAgICAgICAgdmFyIG46IG51bWJlcjtcclxuICAgICAgICB2YXIgYTogbnVtYmVyID0gTWF0aC5jZWlsKHRoaXMubm9kZS53aWR0aCAvIHRoaXMuZGlzdGFuY2UpO1xyXG4gICAgICAgIHZhciBiOiBudW1iZXIgPSBNYXRoLmNlaWwodGhpcy5ub2RlLmhlaWdodCAvIHRoaXMuZGlzdGFuY2UpO1xyXG4gICAgICAgIHZhciBwYXRoczogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICB2YXIgcG9zOiBjYy5WZWMyO1xyXG4gICAgICAgIHZhciBoaXRQb3M6IGNjLlZlYzI7XHJcbiAgICAgICAgdmFyIGJvb2w6IHN0cmluZztcclxuICAgICAgICB2YXIgY0xlbjogbnVtYmVyID0gdGhpcy5jb3ZlcnMubGVuZ3RoO1xyXG4gICAgICAgIHZhciBjb2w6IGNjLlBvbHlnb25Db2xsaWRlciA9IHRoaXMuY29sbGlkZXIuZ2V0Q29tcG9uZW50KGNjLlBvbHlnb25Db2xsaWRlcik7XHJcbiAgICAgICAgbGV0IHBvaW50cyA9IGNvbC5wb2ludHMuY29uY2F0KCk7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGE7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgYjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBwb3MgPSBuZXcgY2MuVmVjMihpICogdGhpcy5kaXN0YW5jZSwgaiAqIHRoaXMuZGlzdGFuY2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0SGl0UG9pbnQocG9zLnN1Yihjb2wub2Zmc2V0KSwgcG9pbnRzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgPSBcIjFcIjtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKG4gPSAwOyBuIDwgY0xlbjsgbisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChHcmFwaFV0aWwuaGl0VGVzdChwb3MsIHRoaXMuY292ZXJzW25dKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vbCA9IFwiMFwiO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJvb2wgPSBcIjBcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHBhdGhzICs9IGJvb2w7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gbGV0IGRhdGE6IGFueSA9IHt9O1xyXG4gICAgICAgIC8vIGRhdGEubmFtZSA9IHRoaXMuem9uZU5hbWU7XHJcbiAgICAgICAgLy8gZGF0YS5kaXN0YW5jZSA9IHRoaXMuZGlzdGFuY2U7XHJcbiAgICAgICAgLy8gZGF0YS5wYXRocyA9IHBhdGhzO1xyXG4gICAgICAgIC8vIGxldCBtc2cgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICAvLyBnTG9nLmxvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xyXG4gICAgICAgIC8vIGdMb2cubG9nKG1zZyk7XHJcbiAgICAgICAgLy8gZ0xvZy5sb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcclxuICAgICAgICAvLyB0aGlzLnBhcnNlTWFwKHBhdGhzKTtcclxuICAgICAgICByZXR1cm4gcGF0aHM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHByaW50TWFwKHBhdGhzOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZGF0YTogYW55ID0ge307XHJcbiAgICAgICAgZGF0YS5uYW1lID0gdGhpcy56b25lTmFtZTtcclxuICAgICAgICBkYXRhLmRpc3RhbmNlID0gdGhpcy5kaXN0YW5jZTtcclxuICAgICAgICBkYXRhLnBhdGhzID0gcGF0aHM7XHJcbiAgICAgICAgbGV0IG1zZyA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgIGdMb2coXCI9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcclxuICAgICAgICBnTG9nKG1zZyk7XHJcbiAgICAgICAgZ0xvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XCIpO1xyXG4gICAgICAgIHRoaXMucGFyc2VNYXAocGF0aHMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBwYXJzZU1hcChwYXRoczogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIGk6IG51bWJlcjtcclxuICAgICAgICB2YXIgajogbnVtYmVyO1xyXG4gICAgICAgIHZhciBhOiBudW1iZXIgPSBNYXRoLmNlaWwodGhpcy5ub2RlLndpZHRoIC8gdGhpcy5kaXN0YW5jZSk7XHJcbiAgICAgICAgdmFyIGI6IG51bWJlciA9IE1hdGguY2VpbCh0aGlzLm5vZGUuaGVpZ2h0IC8gdGhpcy5kaXN0YW5jZSk7XHJcbiAgICAgICAgdmFyIGdpcmQgPSBuZXcgJEFHcmlkKGEsIGIsIHRoaXMuZGlzdGFuY2UpO1xyXG4gICAgICAgIHZhciB0ZW1wOiBzdHJpbmdbXSA9IHBhdGhzLnNwbGl0KFwiXCIpO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhOyBpKyspIHtcclxuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGI7IGorKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRlbXBbaSAqIGIgKyBqXSA9PSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGdpcmQuc2V0V2Fsa2FibGUoaSwgaiwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnaXJkLnNldFdhbGthYmxlKGksIGosIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRlbXAubGVuZ3RoID0gMDtcclxuICAgICAgICB0ZW1wID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9ncmlkID0gZ2lyZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkcmF3TWFwKHRhcmdldD86ICRBTm9kZVtdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzRGVidWcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbm9kZTogJEFOb2RlO1xyXG4gICAgICAgIHZhciBpOiBudW1iZXIsIGo6IG51bWJlcjtcclxuICAgICAgICB2YXIgbmQ6IGNjLk5vZGUgPSBOb2RlVXRpbC5jcmVhdGVOb2RlKFwibWFwR3JhcGhpY3NcIiwgdGhpcy5ub2RlKTtcclxuICAgICAgICB2YXIgZzogY2MuR3JhcGhpY3MgPSBOb2RlVXRpbC5jcmVhdGVDb21wb25lbnQoY2MuR3JhcGhpY3MsIG5kKTtcclxuICAgICAgICB2YXIgYTogbnVtYmVyID0gTWF0aC5jZWlsKHRoaXMubm9kZS53aWR0aCAvIHRoaXMuZGlzdGFuY2UpO1xyXG4gICAgICAgIHZhciBiOiBudW1iZXIgPSBNYXRoLmNlaWwodGhpcy5ub2RlLmhlaWdodCAvIHRoaXMuZGlzdGFuY2UpO1xyXG4gICAgICAgIHZhciBkaXg6IG51bWJlciA9IHRoaXMubm9kZS53aWR0aCAqIHRoaXMubm9kZS5hbmNob3JYO1xyXG4gICAgICAgIHZhciBkaXk6IG51bWJlciA9IHRoaXMubm9kZS5oZWlnaHQgKiB0aGlzLm5vZGUuYW5jaG9yWTtcclxuICAgICAgICBnLmNsZWFyKCk7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGE7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgYjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5fZ3JpZC5nZXROb2RlQnlBQihpLCBqKTtcclxuICAgICAgICAgICAgICAgIGlmIChub2RlICYmIG5vZGUud2Fsa2FibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldC5pbmRleE9mKG5vZGUpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcuZmlsbENvbG9yID0gY2MuQ29sb3IuV0hJVEU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcuZmlsbFJlY3QoaSAqIHRoaXMuZGlzdGFuY2UgLSBkaXgsIGogKiB0aGlzLmRpc3RhbmNlIC0gZGl5LCB0aGlzLmRpc3RhbmNlIC8gMiwgdGhpcy5kaXN0YW5jZSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGcuZmlsbENvbG9yID0gY2MuQ29sb3IuUkVEO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnLmZpbGxSZWN0KGkgKiB0aGlzLmRpc3RhbmNlIC0gZGl4LCBqICogdGhpcy5kaXN0YW5jZSAtIGRpeSwgdGhpcy5kaXN0YW5jZSAvIDIsIHRoaXMuZGlzdGFuY2UgLyAyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5kaXN0YW5jZSA9IHRoaXMuZGF0YS5qc29uLmRpc3RhbmNlO1xyXG4gICAgICAgICAgICB0aGlzLm5hbWUgPSB0aGlzLmRhdGEuanNvbi5uYW1lO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnNlTWFwKHRoaXMuZGF0YS5qc29uLnBhdGhzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgcGF0aHM6IHN0cmluZyA9IHRoaXMuY3JlYXRlTWFwKCk7XHJcbiAgICAgICAgICAgIHRoaXMucHJpbnRNYXAocGF0aHMpO1xyXG4gICAgICAgICAgICB0aGlzLnBhcnNlTWFwKHBhdGhzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kcmF3TWFwKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEhpdFBvaW50KHBvczogY2MuVmVjMiwgcG9pbnRzOiBjYy5WZWMyW10pOiBjYy5WZWMyIHtcclxuICAgICAgICAvLyBwb3MgPSBuZXcgY2MuVmVjMihwb3MueCAtIHRoaXMubm9kZS53aWR0aCAqIHRoaXMubm9kZS5hbmNob3JYLFxyXG4gICAgICAgIC8vICAgICBwb3MueSAtIHRoaXMubm9kZS5oZWlnaHQgKiB0aGlzLm5vZGUuYW5jaG9yWSk7XHJcbiAgICAgICAgcG9zLnggPSBwb3MueCAtIHRoaXMubm9kZS53aWR0aCAqIHRoaXMubm9kZS5hbmNob3JYO1xyXG4gICAgICAgIHBvcy55ID0gcG9zLnkgLSB0aGlzLm5vZGUuaGVpZ2h0ICogdGhpcy5ub2RlLmFuY2hvclk7XHJcbiAgICAgICAgaWYgKGNjLkludGVyc2VjdGlvbi5wb2ludEluUG9seWdvbihwb3MsIHBvaW50cykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBvcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEhpdE5vZGUocG9zOiBjYy5WZWMyIHwgY2MuVmVjMyk6ICRBTm9kZSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9ncmlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBwb3MgPSBuZXcgY2MuVmVjMihwb3MueCArIHRoaXMubm9kZS53aWR0aCAqIHRoaXMubm9kZS5hbmNob3JYLFxyXG4gICAgICAgIC8vICAgICBwb3MueSArIHRoaXMubm9kZS5oZWlnaHQgKiB0aGlzLm5vZGUuYW5jaG9yWSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dyaWQuZ2V0V2Fsa0J5UGl4ZWwocG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZmluZFBhdGhQaXhpcyhzdGFydFg6IG51bWJlciwgc3RhcnRZOiBudW1iZXIsIGVuZFg6IG51bWJlciwgZW5kWTogbnVtYmVyKTogJEFOb2RlW10ge1xyXG4gICAgICAgIHZhciBwYXRoczogJEFOb2RlW10gPSB0aGlzLl9ncmlkLmZpbmRQYXRoUGl4aXMoc3RhcnRYLCBzdGFydFksIGVuZFgsIGVuZFkpO1xyXG4gICAgICAgIHJldHVybiBwYXRocztcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgJEFab25lIGZyb20gXCIuL3pvbmUvQVpvbmVcIjtcclxuaW1wb3J0ICRBVGFyZ2V0IGZyb20gXCIuL3pvbmUvQVRhcmdldFwiO1xyXG5pbXBvcnQgJEFTd2FwIGZyb20gXCIuL3pvbmUvQVN3YXBcIjtcclxuaW1wb3J0IHsgJEFTdGFyIH0gZnJvbSBcIi4vem9uZS9BU3RhclwiO1xyXG5pbXBvcnQgeyAkQU5vZGUgfSBmcm9tIFwiLi96b25lL0FOb2RlXCI7XHJcbmltcG9ydCAkQU1vdmVCdXR0b24gZnJvbSBcIi4vem9uZS9BTW92ZUJ1dHRvblwiO1xyXG5pbXBvcnQgJEFNYXAgZnJvbSBcIi4vem9uZS9BTWFwXCI7XHJcbmltcG9ydCB7ICRBR3JpZCB9IGZyb20gXCIuL3pvbmUvQUdyaWRcIjtcclxuaW1wb3J0IHsgJEFFdmVudCB9IGZyb20gXCIuL3pvbmUvQUV2ZW50XCI7XHJcbmltcG9ydCAkQUVkaXRNYXAgZnJvbSBcIi4vem9uZS9BRWRpdE1hcFwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyB6bW1vZHNfem9uZV9BWm9uZSBleHRlbmRzICRBWm9uZSB7IH07XHJcbmV4cG9ydCBjbGFzcyB6bW1vZHNfem9uZV9BVGFyZ2V0IGV4dGVuZHMgJEFUYXJnZXQgeyB9O1xyXG5leHBvcnQgY2xhc3Mgem1tb2RzX3pvbmVfQVN3YXAgZXh0ZW5kcyAkQVRhcmdldCB7IH07XHJcbmV4cG9ydCBjbGFzcyB6bW1vZHNfem9uZV9BU3RhciBleHRlbmRzICRBU3RhciB7IH07XHJcbmV4cG9ydCBjbGFzcyB6bW1vZHNfem9uZV9BTm9kZSBleHRlbmRzICRBTm9kZSB7IH07XHJcbmV4cG9ydCBjbGFzcyB6bW1vZHNfem9uZV9BTW92ZUJ1dHRvbiBleHRlbmRzICRBTW92ZUJ1dHRvbiB7IH07XHJcbmV4cG9ydCBjbGFzcyB6bW1vZHNfem9uZV9BTWFwIGV4dGVuZHMgJEFNYXAgeyB9O1xyXG5leHBvcnQgY2xhc3Mgem1tb2RzX3pvbmVfQUdyaWQgZXh0ZW5kcyAkQUdyaWQgeyB9O1xyXG5leHBvcnQgY2xhc3Mgem1tb2RzX3pvbmVfQUV2ZW50IGV4dGVuZHMgJEFFdmVudCB7IH07XHJcbmV4cG9ydCBjbGFzcyB6bW1vZHNfem9uZV9BRWRpdE1hcCBleHRlbmRzICRBRWRpdE1hcCB7IH07Il0sIm5hbWVzIjpbImdMb2ciLCJnV2FybiIsIkdyYXBoVXRpbCIsIk5vZGVVdGlsIiwiQWN0b3IiLCJFdmVudE5hbWUiLCJfYSIsImNjY2xhc3MiLCJwcm9wZXJ0eSIsIlRpbWVNZ3IiLCJVSU1nciIsIkV2ZW50TWdyIiwiRVJvbGVBY3Rpb24iLCJ6bWd1aV9idG5fU2ltcGxlQnRuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7O0FBS0E7QUFDQTtJQWFDLGdCQUFtQixDQUFTLEVBQUUsQ0FBUyxFQUFFLEdBQVc7UUFQN0MsYUFBUSxHQUFZLElBQUksQ0FBQztRQUV6QixtQkFBYyxHQUFXLEdBQUcs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QUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUM3RSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUN4QztRQUNELElBQUksQ0FBQyxTQUFTLEdBQUdELGlCQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEUsSUFBSSxDQUFDLFFBQVEsR0FBR0EsaUJBQVEsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDL0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUMxQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFP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
