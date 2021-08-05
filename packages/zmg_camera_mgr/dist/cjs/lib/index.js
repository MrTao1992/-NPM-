'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_util = require('zmg_util');
var zmg_mgr = require('zmg_mgr');

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

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var _CamearMgr = /** @class */ (function (_super) {
    __extends(_CamearMgr, _super);
    function _CamearMgr() {
        var _this = _super.call(this) || this;
        _this.isFocusing = false;
        return _this;
    }
    _CamearMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _CamearMgr();
        }
        return this._instance;
    };
    _CamearMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                this.addEvents();
                return [2 /*return*/];
            });
        });
    };
    _CamearMgr.prototype.destroy = function () {
        this.removeEvents();
        _super.prototype.destroy.call(this);
    };
    Object.defineProperty(_CamearMgr.prototype, "isValid", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    _CamearMgr.prototype.getMain = function () {
        return cc.Camera.main;
    };
    _CamearMgr.prototype.getTop = function () {
        var i;
        var now;
        var len = cc.Camera.cameras.length;
        for (i = 0; i < len; i++) {
            if (now == null) {
                now = cc.Camera.cameras[i];
            }
            else {
                if (now.depth > cc.Camera.cameras[i].depth) {
                    now = cc.Camera.cameras[i];
                }
            }
        }
        return now;
    };
    _CamearMgr.prototype.setCameraRect = function (rect) {
        if (rect == null) {
            return;
        }
        this._camearRect = rect;
        if (this.getMain()) {
            this.move(new cc.Vec2(rect.x, rect.y));
        }
    };
    _CamearMgr.prototype.move = function (pos, radio, camera) {
        camera = camera ? camera : this.getMain();
        if (camera) {
            var node = camera.node;
            var width = cc.Canvas.instance.node.width;
            var height = cc.Canvas.instance.node.height;
            var dix = Math.abs(width - this._camearRect.width) / 2;
            var diy = Math.abs(height - this._camearRect.height) / 2;
            pos.x = pos.x - width / 2;
            pos.y = pos.y - height / 2;
            pos.x = Math.max(-dix, pos.x);
            pos.x = Math.min(dix, pos.x);
            pos.y = Math.max(-diy, pos.y);
            pos.y = Math.min(diy, pos.y);
            node.setPosition(pos);
            zmg_util.gLog("设置坐标:", pos.x, pos.y);
        }
        else {
            this._camearRect.x = pos.x;
            this._camearRect.y = pos.y;
        }
    };
    _CamearMgr.prototype.getScreenToWorldPoint = function (pos) {
        var res = pos;
        var top = this.getTop();
        if (top) {
            top.getScreenToWorldPoint(pos, res);
        }
        return res;
    };
    _CamearMgr.prototype.focus = function (camera, radio, point, onLaunched, target) {
        var _this = this;
        if (this.isFocusing)
            return;
        this.isFocusing = true;
        point = point ? point : new cc.Vec2();
        var cNode = camera.node;
        var r = radio / camera.zoomRatio;
        r = r > 1 ? 1 / r : r;
        cc.tween(cNode).stop();
        cc.tween(camera).stop();
        if (r < 1.05 && r > 0.95) {
            camera.zoomRatio = radio;
            this.isFocusing = false;
        }
        else {
            cc.tween(camera).to(r / 2, { zoomRatio: radio }, { easing: "sineInOut" }).call(function () {
                _this.isFocusing = false;
                zmg_util.Utils.start(onLaunched, target);
            }).start();
        }
        if (point) {
            var dis = cc.Vec2.distance(cNode.getPosition(), point);
            var time = Math.round(dis / 10) / 100;
            if (dis < 20) {
                cNode.setPosition(point);
                this.isFocusing = false;
            }
            else {
                cc.tween(cNode).to(time, { x: point.x, y: point.y }, { easing: "sineInOut" }).call(function () {
                    _this.isFocusing = false;
                }).start();
            }
        }
    };
    _CamearMgr.prototype.addEvents = function () {
        // EventMgr.on(EventName.SCENE_CHANGE_END, this.onSceneEnd, this);
        // EventMgr.on(EventName.SCENE_CHANGE_START, this.onSceneStart, this);
    };
    _CamearMgr.prototype.removeEvents = function () {
        // EventMgr.off(EventName.SCENE_CHANGE_END, this.onSceneEnd, this);
        // EventMgr.off(EventName.SCENE_CHANGE_START, this.onSceneStart, this);
    };
    _CamearMgr.prototype.onSceneStart = function () {
        this._camearRect = null;
    };
    _CamearMgr.prototype.onSceneEnd = function () {
        if (this._camearRect) {
            this.setCameraRect(this._camearRect);
        }
        else {
            var rect = new cc.Rect();
            var width = cc.Canvas.instance.node.width;
            var height = cc.Canvas.instance.node.height;
            rect.x = width / 2;
            rect.y = height / 2;
            rect.width = width;
            rect.height = height;
            this.setCameraRect(rect);
        }
    };
    // public hideUI(uiNode: cc.Node): void {
    //     let cameras: cc.Camera[] = cc.Canvas.instance.getComponentsInChildren(cc.Camera);
    //     let i: number;
    //     let len: number = cameras.length;
    //     for (i = 0; i < len; i++) {
    //         if ((cameras[i].cullingMask >> 1) % 10 == 1) {
    //             //ui被渲染
    //             cameras[i].enabled = false;
    //         }
    //     }
    // }
    // public showUI(uiNode: cc.Node): void {
    //     let cameras: cc.Camera[] = cc.Canvas.instance.getComponentsInChildren(cc.Camera);
    //     let i: number;
    //     let len: number = cameras.length;
    //     for (i = 0; i < len; i++) {
    //         if ((cameras[i].cullingMask >> 1) % 10 == 1) {
    //             //uiMgr被渲染
    //             cameras[i].enabled = true;
    //         }
    //     }
    // }
    // public hideCanvas(uiNode: cc.Node): void {
    //     let cameras: cc.Camera[] = cc.Canvas.instance.getComponentsInChildren(cc.Camera);
    //     let i: number;
    //     let len: number = cameras.length;
    //     for (i = 0; i < len; i++) {
    //         if ((parseInt(cameras[i].cullingMask.toString(2))) % 10 == 1) {
    //             //Canvas被渲染
    //             cameras[i].enabled = false;
    //         }
    //     }
    // }
    // public showCanvas(uiNode: cc.Node): void {
    //     let cameras: cc.Camera[] = cc.Canvas.instance.getComponentsInChildren(cc.Camera);
    //     let i: number;
    //     let len: number = cameras.length;
    //     for (i = 0; i < len; i++) {
    //         if ((parseInt(cameras[i].cullingMask.toString(2))) % 10 == 1) {
    //             //Canvas被渲染
    //             cameras[i].enabled = true;
    //         }
    //     }
    // }
    /**
    * 渲染UI的镜头隐藏
    */
    _CamearMgr.prototype.hideCamera = function (containsNode) {
        if (cc.sys.isNative) {
            var i = void 0;
            var len = cc.Canvas.instance.node.childrenCount;
            for (i = 0; i < len; i++) {
                if (!cc.Canvas.instance.node.children[i].getComponent(cc.Camera)) {
                    if (cc.Canvas.instance.node.children[i].groupIndex == containsNode.groupIndex) {
                        if (cc.Canvas.instance.node.children[i].active) {
                            cc.Canvas.instance.node.children[i]["hide"] = true;
                            cc.Canvas.instance.node.children[i].active = false;
                        }
                    }
                }
            }
        }
        else {
            var cameras = cc.Canvas.instance.getComponentsInChildren(cc.Camera);
            var i = void 0;
            var len = cameras.length;
            for (i = 0; i < len; i++) {
                if (cameras[i].containsNode(containsNode)) {
                    cameras[i].node.active = false;
                }
            }
        }
    };
    /**
    * 渲染UI的镜头显示
    */
    _CamearMgr.prototype.showCamera = function (containsNode) {
        if (cc.sys.isNative) {
            var i = void 0;
            var len = cc.Canvas.instance.node.childrenCount;
            for (i = 0; i < len; i++) {
                if (!cc.Canvas.instance.node.children[i].getComponent(cc.Camera)) {
                    if (cc.Canvas.instance.node.children[i].groupIndex == containsNode.groupIndex) {
                        if (cc.Canvas.instance.node.children[i]["hide"]) {
                            cc.Canvas.instance.node.children[i].active = true;
                        }
                    }
                }
            }
        }
        else {
            var cameras = cc.Canvas.instance.getComponentsInChildren(cc.Camera);
            var i = void 0;
            var len = cameras.length;
            for (i = 0; i < len; i++) {
                if (cameras[i].containsNode(containsNode)) {
                    cameras[i].node.active = true;
                }
            }
        }
    };
    return _CamearMgr;
}(zmg_mgr.BaseMgr));

var CamearMgr = _CamearMgr.getInstance();

exports.CamearMgr = CamearMgr;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9DYW1lYXJNZ3IudHMiLCIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVXRpbHMsIGdMb2cgfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuaW1wb3J0IHsgQmFzZU1nciB9IGZyb20gXCJ6bWdfbWdyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgX0NhbWVhck1nciBleHRlbmRzIEJhc2VNZ3IgaW1wbGVtZW50cyB6bWcuSUNhbWVhck1nciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IF9DYW1lYXJNZ3I7XHJcbiAgICBwcml2YXRlIGlzRm9jdXNpbmc6IGJvb2xlYW4gPSBmYWxzZVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogX0NhbWVhck1nciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfQ2FtZWFyTWdyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2NhbWVhclJlY3Q6IGNjLlJlY3Q7XHJcblxyXG4gICAgYXN5bmMgc3RhcnQoKSB7XHJcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50cygpO1xyXG4gICAgfVxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50cygpO1xyXG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIGdldCBpc1ZhbGlkKCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRNYWluKCk6IGNjLkNhbWVyYSB7XHJcbiAgICAgICAgcmV0dXJuIGNjLkNhbWVyYS5tYWluO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFRvcCgpOiBjYy5DYW1lcmEge1xyXG4gICAgICAgIHZhciBpOiBudW1iZXI7XHJcbiAgICAgICAgdmFyIG5vdzogY2MuQ2FtZXJhO1xyXG4gICAgICAgIHZhciBsZW46IG51bWJlciA9IGNjLkNhbWVyYS5jYW1lcmFzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKG5vdyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBub3cgPSBjYy5DYW1lcmEuY2FtZXJhc1tpXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChub3cuZGVwdGggPiBjYy5DYW1lcmEuY2FtZXJhc1tpXS5kZXB0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIG5vdyA9IGNjLkNhbWVyYS5jYW1lcmFzW2ldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub3c7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldENhbWVyYVJlY3QocmVjdDogY2MuUmVjdCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChyZWN0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jYW1lYXJSZWN0ID0gcmVjdDtcclxuICAgICAgICBpZiAodGhpcy5nZXRNYWluKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKG5ldyBjYy5WZWMyKHJlY3QueCwgcmVjdC55KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBtb3ZlKHBvczogY2MuVmVjMiwgcmFkaW8/OiBudW1iZXIsIGNhbWVyYT86IGNjLkNhbWVyYSk6IHZvaWQge1xyXG4gICAgICAgIGNhbWVyYSA9IGNhbWVyYSA/IGNhbWVyYSA6IHRoaXMuZ2V0TWFpbigpO1xyXG4gICAgICAgIGlmIChjYW1lcmEpIHtcclxuICAgICAgICAgICAgdmFyIG5vZGU6IGNjLk5vZGUgPSBjYW1lcmEubm9kZTtcclxuICAgICAgICAgICAgbGV0IHdpZHRoOiBudW1iZXIgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aDtcclxuICAgICAgICAgICAgbGV0IGhlaWdodDogbnVtYmVyID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuaGVpZ2h0O1xyXG4gICAgICAgICAgICBsZXQgZGl4OiBudW1iZXIgPSBNYXRoLmFicyh3aWR0aCAtIHRoaXMuX2NhbWVhclJlY3Qud2lkdGgpIC8gMjtcclxuICAgICAgICAgICAgbGV0IGRpeTogbnVtYmVyID0gTWF0aC5hYnMoaGVpZ2h0IC0gdGhpcy5fY2FtZWFyUmVjdC5oZWlnaHQpIC8gMjtcclxuICAgICAgICAgICAgcG9zLnggPSBwb3MueCAtIHdpZHRoIC8gMjtcclxuICAgICAgICAgICAgcG9zLnkgPSBwb3MueSAtIGhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIHBvcy54ID0gTWF0aC5tYXgoLWRpeCwgcG9zLngpO1xyXG4gICAgICAgICAgICBwb3MueCA9IE1hdGgubWluKGRpeCwgcG9zLngpO1xyXG4gICAgICAgICAgICBwb3MueSA9IE1hdGgubWF4KC1kaXksIHBvcy55KTtcclxuICAgICAgICAgICAgcG9zLnkgPSBNYXRoLm1pbihkaXksIHBvcy55KTtcclxuICAgICAgICAgICAgbm9kZS5zZXRQb3NpdGlvbihwb3MpO1xyXG4gICAgICAgICAgICBnTG9nKFwi6K6+572u5Z2Q5qCHOlwiLCBwb3MueCwgcG9zLnkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbWVhclJlY3QueCA9IHBvcy54O1xyXG4gICAgICAgICAgICB0aGlzLl9jYW1lYXJSZWN0LnkgPSBwb3MueTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNjcmVlblRvV29ybGRQb2ludChwb3M6IGNjLlZlYzIpOiBjYy5WZWMyIHtcclxuICAgICAgICBsZXQgcmVzOiBjYy5WZWMyID0gcG9zO1xyXG4gICAgICAgIGxldCB0b3A6IGNjLkNhbWVyYSA9IHRoaXMuZ2V0VG9wKCk7XHJcbiAgICAgICAgaWYgKHRvcCkge1xyXG4gICAgICAgICAgICB0b3AuZ2V0U2NyZWVuVG9Xb3JsZFBvaW50KHBvcywgcmVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBmb2N1cyhjYW1lcmE6IGNjLkNhbWVyYSwgcmFkaW86IG51bWJlciwgcG9pbnQ/OiBjYy5WZWMyLCBvbkxhdW5jaGVkPzogRnVuY3Rpb24sIHRhcmdldD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRm9jdXNpbmcpIHJldHVyblxyXG4gICAgICAgIHRoaXMuaXNGb2N1c2luZyA9IHRydWVcclxuICAgICAgICBwb2ludCA9IHBvaW50ID8gcG9pbnQgOiBuZXcgY2MuVmVjMigpO1xyXG4gICAgICAgIHZhciBjTm9kZTogY2MuTm9kZSA9IGNhbWVyYS5ub2RlO1xyXG4gICAgICAgIHZhciByOiBudW1iZXIgPSByYWRpbyAvIGNhbWVyYS56b29tUmF0aW87XHJcbiAgICAgICAgciA9IHIgPiAxID8gMSAvIHIgOiByO1xyXG4gICAgICAgIGNjLnR3ZWVuKGNOb2RlKS5zdG9wKCk7XHJcbiAgICAgICAgY2MudHdlZW4oY2FtZXJhKS5zdG9wKCk7XHJcbiAgICAgICAgaWYgKHIgPCAxLjA1ICYmIHIgPiAwLjk1KSB7XHJcbiAgICAgICAgICAgIGNhbWVyYS56b29tUmF0aW8gPSByYWRpbztcclxuICAgICAgICAgICAgdGhpcy5pc0ZvY3VzaW5nID0gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy50d2VlbihjYW1lcmEpLnRvKHIgLyAyLCB7IHpvb21SYXRpbzogcmFkaW8gfSwgeyBlYXNpbmc6IFwic2luZUluT3V0XCIgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzRm9jdXNpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgVXRpbHMuc3RhcnQob25MYXVuY2hlZCwgdGFyZ2V0KTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBvaW50KSB7XHJcbiAgICAgICAgICAgIHZhciBkaXM6IG51bWJlciA9IGNjLlZlYzIuZGlzdGFuY2UoY05vZGUuZ2V0UG9zaXRpb24oKSwgcG9pbnQpO1xyXG4gICAgICAgICAgICB2YXIgdGltZTogbnVtYmVyID0gTWF0aC5yb3VuZChkaXMgLyAxMCkgLyAxMDA7XHJcbiAgICAgICAgICAgIGlmIChkaXMgPCAyMCkge1xyXG4gICAgICAgICAgICAgICAgY05vZGUuc2V0UG9zaXRpb24ocG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc0ZvY3VzaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNjLnR3ZWVuKGNOb2RlKS50byh0aW1lLCB7IHg6IHBvaW50LngsIHk6IHBvaW50LnkgfSwgeyBlYXNpbmc6IFwic2luZUluT3V0XCIgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pc0ZvY3VzaW5nID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gRXZlbnRNZ3Iub24oRXZlbnROYW1lLlNDRU5FX0NIQU5HRV9FTkQsIHRoaXMub25TY2VuZUVuZCwgdGhpcyk7XHJcbiAgICAgICAgLy8gRXZlbnRNZ3Iub24oRXZlbnROYW1lLlNDRU5FX0NIQU5HRV9TVEFSVCwgdGhpcy5vblNjZW5lU3RhcnQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVtb3ZlRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuU0NFTkVfQ0hBTkdFX0VORCwgdGhpcy5vblNjZW5lRW5kLCB0aGlzKTtcclxuICAgICAgICAvLyBFdmVudE1nci5vZmYoRXZlbnROYW1lLlNDRU5FX0NIQU5HRV9TVEFSVCwgdGhpcy5vblNjZW5lU3RhcnQsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25TY2VuZVN0YXJ0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NhbWVhclJlY3QgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblNjZW5lRW5kKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9jYW1lYXJSZWN0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q2FtZXJhUmVjdCh0aGlzLl9jYW1lYXJSZWN0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmVjdDogY2MuUmVjdCA9IG5ldyBjYy5SZWN0KCk7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aDogbnVtYmVyID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQ6IG51bWJlciA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuICAgICAgICAgICAgcmVjdC54ID0gd2lkdGggLyAyO1xyXG4gICAgICAgICAgICByZWN0LnkgPSBoZWlnaHQgLyAyO1xyXG4gICAgICAgICAgICByZWN0LndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIHJlY3QuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLnNldENhbWVyYVJlY3QocmVjdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyBoaWRlVUkodWlOb2RlOiBjYy5Ob2RlKTogdm9pZCB7XHJcbiAgICAvLyAgICAgbGV0IGNhbWVyYXM6IGNjLkNhbWVyYVtdID0gY2MuQ2FudmFzLmluc3RhbmNlLmdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNjLkNhbWVyYSk7XHJcbiAgICAvLyAgICAgbGV0IGk6IG51bWJlcjtcclxuICAgIC8vICAgICBsZXQgbGVuOiBudW1iZXIgPSBjYW1lcmFzLmxlbmd0aDtcclxuICAgIC8vICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgIC8vICAgICAgICAgaWYgKChjYW1lcmFzW2ldLmN1bGxpbmdNYXNrID4+IDEpICUgMTAgPT0gMSkge1xyXG4gICAgLy8gICAgICAgICAgICAgLy91aeiiq+a4suafk1xyXG4gICAgLy8gICAgICAgICAgICAgY2FtZXJhc1tpXS5lbmFibGVkID0gZmFsc2U7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICAvLyBwdWJsaWMgc2hvd1VJKHVpTm9kZTogY2MuTm9kZSk6IHZvaWQge1xyXG4gICAgLy8gICAgIGxldCBjYW1lcmFzOiBjYy5DYW1lcmFbXSA9IGNjLkNhbnZhcy5pbnN0YW5jZS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihjYy5DYW1lcmEpO1xyXG4gICAgLy8gICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAvLyAgICAgbGV0IGxlbjogbnVtYmVyID0gY2FtZXJhcy5sZW5ndGg7XHJcbiAgICAvLyAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAvLyAgICAgICAgIGlmICgoY2FtZXJhc1tpXS5jdWxsaW5nTWFzayA+PiAxKSAlIDEwID09IDEpIHtcclxuICAgIC8vICAgICAgICAgICAgIC8vdWlNZ3LooqvmuLLmn5NcclxuICAgIC8vICAgICAgICAgICAgIGNhbWVyYXNbaV0uZW5hYmxlZCA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICAvLyBwdWJsaWMgaGlkZUNhbnZhcyh1aU5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcclxuICAgIC8vICAgICBsZXQgY2FtZXJhczogY2MuQ2FtZXJhW10gPSBjYy5DYW52YXMuaW5zdGFuY2UuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oY2MuQ2FtZXJhKTtcclxuICAgIC8vICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgLy8gICAgIGxldCBsZW46IG51bWJlciA9IGNhbWVyYXMubGVuZ3RoO1xyXG4gICAgLy8gICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgLy8gICAgICAgICBpZiAoKHBhcnNlSW50KGNhbWVyYXNbaV0uY3VsbGluZ01hc2sudG9TdHJpbmcoMikpKSAlIDEwID09IDEpIHtcclxuICAgIC8vICAgICAgICAgICAgIC8vQ2FudmFz6KKr5riy5p+TXHJcbiAgICAvLyAgICAgICAgICAgICBjYW1lcmFzW2ldLmVuYWJsZWQgPSBmYWxzZTtcclxuICAgIC8vICAgICAgICAgfVxyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIC8vIHB1YmxpYyBzaG93Q2FudmFzKHVpTm9kZTogY2MuTm9kZSk6IHZvaWQge1xyXG4gICAgLy8gICAgIGxldCBjYW1lcmFzOiBjYy5DYW1lcmFbXSA9IGNjLkNhbnZhcy5pbnN0YW5jZS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihjYy5DYW1lcmEpO1xyXG4gICAgLy8gICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAvLyAgICAgbGV0IGxlbjogbnVtYmVyID0gY2FtZXJhcy5sZW5ndGg7XHJcbiAgICAvLyAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAvLyAgICAgICAgIGlmICgocGFyc2VJbnQoY2FtZXJhc1tpXS5jdWxsaW5nTWFzay50b1N0cmluZygyKSkpICUgMTAgPT0gMSkge1xyXG4gICAgLy8gICAgICAgICAgICAgLy9DYW52YXPooqvmuLLmn5NcclxuICAgIC8vICAgICAgICAgICAgIGNhbWVyYXNbaV0uZW5hYmxlZCA9IHRydWU7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOa4suafk1VJ55qE6ZWc5aS06ZqQ6JePXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGhpZGVDYW1lcmEoY29udGFpbnNOb2RlOiBjYy5Ob2RlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuY2hpbGRyZW5baV0uZ3JvdXBJbmRleCA9PSBjb250YWluc05vZGUuZ3JvdXBJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuY2hpbGRyZW5baV0uYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5jaGlsZHJlbltpXVtcImhpZGVcIl0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuY2hpbGRyZW5baV0uYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgY2FtZXJhczogY2MuQ2FtZXJhW10gPSBjYy5DYW52YXMuaW5zdGFuY2UuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oY2MuQ2FtZXJhKTtcclxuICAgICAgICAgICAgbGV0IGk6IG51bWJlcjtcclxuICAgICAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gY2FtZXJhcy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhbWVyYXNbaV0uY29udGFpbnNOb2RlKGNvbnRhaW5zTm9kZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYW1lcmFzW2ldLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIOa4suafk1VJ55qE6ZWc5aS05pi+56S6XHJcbiAgICAqL1xyXG4gICAgcHVibGljIHNob3dDYW1lcmEoY29udGFpbnNOb2RlOiBjYy5Ob2RlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSkge1xyXG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuY2hpbGRyZW5baV0uZ2V0Q29tcG9uZW50KGNjLkNhbWVyYSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuY2hpbGRyZW5baV0uZ3JvdXBJbmRleCA9PSBjb250YWluc05vZGUuZ3JvdXBJbmRleCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuY2hpbGRyZW5baV1bXCJoaWRlXCJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5jaGlsZHJlbltpXS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGNhbWVyYXM6IGNjLkNhbWVyYVtdID0gY2MuQ2FudmFzLmluc3RhbmNlLmdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNjLkNhbWVyYSk7XHJcbiAgICAgICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxldCBsZW46IG51bWJlciA9IGNhbWVyYXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYW1lcmFzW2ldLmNvbnRhaW5zTm9kZShjb250YWluc05vZGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FtZXJhc1tpXS5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgX0NhbWVhck1nciB9IGZyb20gXCIuL0NhbWVhck1nclwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5leHBvcnQgbGV0IENhbWVhck1nciA9IF9DYW1lYXJNZ3IuZ2V0SW5zdGFuY2UoKTsiXSwibmFtZXMiOlsiZ0xvZyIsIlV0aWxzIiwiQmFzZU1nciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
