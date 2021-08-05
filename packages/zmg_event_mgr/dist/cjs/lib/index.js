'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_mgr = require('zmg_mgr');

var $EEventIndex;
(function ($EEventIndex) {
    $EEventIndex[$EEventIndex["ModuleRecord"] = 1000] = "ModuleRecord";
    $EEventIndex[$EEventIndex["ACTOR"] = 1001] = "ACTOR";
})($EEventIndex || ($EEventIndex = {}));

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

var _EventMgr = /** @class */ (function (_super) {
    __extends(_EventMgr, _super);
    function _EventMgr() {
        var _this = _super.call(this) || this;
        _this._eventTargets = {};
        _this._target = new cc.EventTarget();
        return _this;
    }
    _EventMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _EventMgr();
        }
        return this._instance;
    };
    _EventMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                return [2 /*return*/];
            });
        });
    };
    /**
     * 模块销毁
     */
    _EventMgr.prototype.destroy = function () {
        this._target = null;
        this._eventTargets = null;
        _super.prototype.destroy.call(this);
    };
    Object.defineProperty(_EventMgr.prototype, "isValid", {
        /**
         * 未准备
         * 已被销毁
         * 则无法使用
         */
        get: function () {
            return this._target ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    _EventMgr.prototype.getEventTarget = function (key) {
        if (this._eventTargets) {
            if (!this._eventTargets[key]) {
                this._eventTargets[key] = new cc.EventTarget();
            }
        }
        return this._eventTargets[key];
    };
    _EventMgr.prototype.removeEventTarget = function (key) {
        if (this._eventTargets) {
            if (this._eventTargets[key]) {
                //清理缓存...
                this._eventTargets[key] = null;
            }
        }
    };
    _EventMgr.prototype.hasEventListener = function (type) {
        if (this._target) {
            return this._target.hasEventListener(type);
        }
        return false;
    };
    _EventMgr.prototype.on = function (type, callback, target, useCapture, priority) {
        if (this._target) {
            return this._target.on(type, callback, target, useCapture, priority);
        }
        return null;
    };
    _EventMgr.prototype.off = function (type, callback, target) {
        if (this._target) {
            return this._target.off(type, callback, target);
        }
    };
    _EventMgr.prototype.targetOff = function (target) {
        if (this._target) {
            return this._target.targetOff(target);
        }
    };
    _EventMgr.prototype.once = function (type, callback, target, priority) {
        if (this._target) {
            return this._target.once(type, callback, target, priority);
        }
    };
    _EventMgr.prototype.dispatchEvent = function (event) {
        if (this._target) {
            event.target = this;
            return this._target.dispatchEvent(event);
        }
    };
    _EventMgr.prototype.emit = function (key, arg1, arg2, arg3, arg4, arg5) {
        if (this._target) {
            this._target.emit(key, arg1, arg2, arg3, arg4, arg5);
        }
    };
    return _EventMgr;
}(zmg_mgr.BaseMgr));

var $EventName;
(function ($EventName) {
    //base
    $EventName["SURE"] = "sure";
    $EventName["READY"] = "ready";
    $EventName["CANCEL"] = "cancel";
    $EventName["CHANGE"] = "change";
    $EventName["COMPLETE"] = "complete";
    $EventName["CLOSE"] = "close";
    $EventName["CLICK"] = "click";
    $EventName["IN"] = "in";
    $EventName["OUT"] = "out";
    $EventName["DESTROY_NODE"] = "destroyNode";
    //游戏暂停
    $EventName["ON_PAGE_PAUSE"] = "onPagePause";
    $EventName["ON_PAGE_RESUME"] = "onPageResume";
    //游戏恢复
    //zmg_ui_mgr
    $EventName["UI_BACK_BTN"] = "uiBackBtn";
    $EventName["UI_MOUSE_DOWN"] = "uiMouseDown";
    $EventName["UI_MOUSE_MOVE"] = "uiMouseMove";
    $EventName["UI_TOUCH_MOVE"] = "uiTouchMove";
    $EventName["UI_MOUSE_UP"] = "uiMouseUp";
    $EventName["UI_MASK_UP"] = "uiMaskUp";
    $EventName["UI_MASK_DOWN"] = "uiMaskDown";
    $EventName["UI_MASK_MOVE"] = "uiMaskMove";
    $EventName["UI_MASK_TOUCH_MOVE"] = "uiMaskTouchMove";
    $EventName["UI_ZONE_MOVE"] = "uiZoneMove";
    $EventName["UI_FONT_READY"] = "uiFontReady";
    $EventName["UI_VIDEO_SHOW"] = "uiVideoShow";
    $EventName["UI_VIDEO_HIDE"] = "uiVideoHide";
    $EventName["UI_LOAD_HIDE"] = "uiLoadHide";
    $EventName["UI_LOAD_SHOW"] = "uiLoadShow";
    //zmg_core_mgr
    $EventName["CORE_READY"] = "coreReady";
    $EventName["CORE_ERROR"] = "coreError";
    //zmg_env_mgr
    $EventName["ENV_READY"] = "envReady";
    //zmg_config_mgr
    $EventName["CONFIG_READY"] = "configReady";
    $EventName["CONFIG_ERROR"] = "configError";
    $EventName["CONFIG_LOADED"] = "configLoaded";
    //zmg_server_mgr
    $EventName["SERVER_READY"] = "serverReady";
    $EventName["SERVER_ERROR"] = "serverError";
    $EventName["SERVER_COMPLETE"] = "serverComplete";
    //zmg_ui_mgr
    $EventName["UI_READY"] = "uiReady";
    //--role
    $EventName["UI_ROLE_ACTION_CHANGE"] = "uiRoleActionChange";
    //zmg_controller
    $EventName["CONTROLLER_CHANGE_DESTORY"] = "controllerChangeDestory";
    $EventName["CONTROLLER_CHANGE_START"] = "controllerChangeStart";
    $EventName["CONTROLLER_CHANGE_END"] = "controllerChangeEnd";
    $EventName["CONTROLLER_CHANGE_PROGRESS"] = "controllerChangeProgress";
    $EventName["CONTROLLER_CHANGE_FAIL"] = "controllerChangeFail";
    $EventName["CONTROLLER_VIDEO_CLOSE"] = "controllerVideoClose";
    $EventName["CONTROLLER_VIDEO_COMPLETE"] = "controllerVideoComplete";
    $EventName["CONTROLLER_SOUND_CLOSE"] = "controllerSoundClose";
    $EventName["CONTROLLER_SOUND_OPEN"] = "controllerSoundOpen";
    //zmg_module_mgr
    $EventName["MODULE_CHANGE"] = "moduleChange";
    /**
     * 退出游戏
     */
    $EventName["GAME_OVER"] = "gameOver";
})($EventName || ($EventName = {}));

var EventName = $EventName;
var EEventIndex = $EEventIndex;
var EventMgr = _EventMgr.getInstance();

exports.EEventIndex = EEventIndex;
exports.EventMgr = EventMgr;
exports.EventName = EventName;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FRXZlbnRJbmRleC50cyIsIi4uLy4uLy4uL3NyYy9FdmVudE1nci50cyIsIi4uLy4uLy4uL3NyYy9FdmVudE5hbWUudHMiLCIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGVudW0gJEVFdmVudEluZGV4IHtcclxuICAgIE1vZHVsZVJlY29yZCA9IDEwMDAsXHJcbiAgICBBQ1RPUiA9IDEwMDFcclxufSIsImltcG9ydCB7IEJhc2VNZ3IgfSBmcm9tIFwiem1nX21nclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIF9FdmVudE1nciBleHRlbmRzIEJhc2VNZ3IgaW1wbGVtZW50cyB6bWcuSUV2ZW50TWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogX0V2ZW50TWdyO1xyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6IF9FdmVudE1nciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfRXZlbnRNZ3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5fZXZlbnRUYXJnZXRzID0ge307XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gbmV3IGNjLkV2ZW50VGFyZ2V0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfdGFyZ2V0OiBjYy5FdmVudFRhcmdldDtcclxuICAgIHByaXZhdGUgX2V2ZW50VGFyZ2V0czogUmVjb3JkPHN0cmluZywgY2MuRXZlbnRUYXJnZXQ+O1xyXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaooeWdl+mUgOavgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl90YXJnZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0cyA9IG51bGw7XHJcbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmnKrlh4blpIdcclxuICAgICAqIOW3suiiq+mUgOavgVxyXG4gICAgICog5YiZ5peg5rOV5L2/55SoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0ID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRFdmVudFRhcmdldChrZXk6IHN0cmluZyk6IGNjLkV2ZW50VGFyZ2V0IHtcclxuICAgICAgICBpZiAodGhpcy5fZXZlbnRUYXJnZXRzKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fZXZlbnRUYXJnZXRzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50VGFyZ2V0c1trZXldID0gbmV3IGNjLkV2ZW50VGFyZ2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V2ZW50VGFyZ2V0c1trZXldO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmVFdmVudFRhcmdldChrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9ldmVudFRhcmdldHMpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50VGFyZ2V0c1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAvL+a4heeQhue8k+WtmC4uLlxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRUYXJnZXRzW2tleV0gPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoYXNFdmVudExpc3RlbmVyKHR5cGU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLl90YXJnZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldC5oYXNFdmVudExpc3RlbmVyKHR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb248VCBleHRlbmRzIEZ1bmN0aW9uPih0eXBlOiBzdHJpbmcsIGNhbGxiYWNrOiBULCB0YXJnZXQ6IGFueSwgdXNlQ2FwdHVyZT86IGJvb2xlYW4sIHByaW9yaXR5PzogbnVtYmVyKTogVCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RhcmdldCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0Lm9uKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQsIHVzZUNhcHR1cmUsIHByaW9yaXR5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9mZih0eXBlOiBzdHJpbmcsIGNhbGxiYWNrPzogRnVuY3Rpb24sIHRhcmdldD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl90YXJnZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldC5vZmYodHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHRhcmdldE9mZih0YXJnZXQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl90YXJnZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldC50YXJnZXRPZmYodGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25jZSh0eXBlOiBzdHJpbmcsIGNhbGxiYWNrOiAoYXJnMT86IGFueSwgYXJnMj86IGFueSwgYXJnMz86IGFueSwgYXJnND86IGFueSwgYXJnNT86IGFueSkgPT4gdm9pZCwgdGFyZ2V0OiBhbnksIHByaW9yaXR5PzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RhcmdldCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0Lm9uY2UodHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgcHJpb3JpdHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBkaXNwYXRjaEV2ZW50KGV2ZW50OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl90YXJnZXQpIHtcclxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGhpcztcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZW1pdChrZXk6IHN0cmluZywgYXJnMT86IGFueSwgYXJnMj86IGFueSwgYXJnMz86IGFueSwgYXJnND86IGFueSwgYXJnNT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl90YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0LmVtaXQoa2V5LCBhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbiIsImV4cG9ydCBlbnVtICRFdmVudE5hbWUge1xyXG4gICAgLy9iYXNlXHJcbiAgICBTVVJFID0gXCJzdXJlXCIsXHJcbiAgICBSRUFEWSA9IFwicmVhZHlcIixcclxuICAgIENBTkNFTCA9IFwiY2FuY2VsXCIsXHJcbiAgICBDSEFOR0UgPSBcImNoYW5nZVwiLFxyXG4gICAgQ09NUExFVEUgPSBcImNvbXBsZXRlXCIsXHJcbiAgICBDTE9TRSA9IFwiY2xvc2VcIixcclxuICAgIENMSUNLID0gXCJjbGlja1wiLFxyXG5cclxuICAgIElOID0gXCJpblwiLFxyXG4gICAgT1VUID0gXCJvdXRcIixcclxuICAgIERFU1RST1lfTk9ERSA9IFwiZGVzdHJveU5vZGVcIixcclxuICAgIC8v5ri45oiP5pqC5YGcXHJcbiAgICBPTl9QQUdFX1BBVVNFID0gXCJvblBhZ2VQYXVzZVwiLFxyXG4gICAgT05fUEFHRV9SRVNVTUUgPSBcIm9uUGFnZVJlc3VtZVwiLFxyXG4gICAgLy/muLjmiI/mgaLlpI1cclxuXHJcbiAgICAvL3ptZ191aV9tZ3JcclxuICAgIFVJX0JBQ0tfQlROID0gXCJ1aUJhY2tCdG5cIixcclxuICAgIFVJX01PVVNFX0RPV04gPSBcInVpTW91c2VEb3duXCIsXHJcbiAgICBVSV9NT1VTRV9NT1ZFID0gXCJ1aU1vdXNlTW92ZVwiLFxyXG4gICAgVUlfVE9VQ0hfTU9WRSA9IFwidWlUb3VjaE1vdmVcIixcclxuICAgIFVJX01PVVNFX1VQID0gXCJ1aU1vdXNlVXBcIixcclxuXHJcbiAgICBVSV9NQVNLX1VQID0gXCJ1aU1hc2tVcFwiLFxyXG4gICAgVUlfTUFTS19ET1dOID0gXCJ1aU1hc2tEb3duXCIsXHJcbiAgICBVSV9NQVNLX01PVkUgPSBcInVpTWFza01vdmVcIixcclxuICAgIFVJX01BU0tfVE9VQ0hfTU9WRSA9IFwidWlNYXNrVG91Y2hNb3ZlXCIsXHJcblxyXG4gICAgVUlfWk9ORV9NT1ZFID0gXCJ1aVpvbmVNb3ZlXCIsXHJcbiAgICBVSV9GT05UX1JFQURZID0gXCJ1aUZvbnRSZWFkeVwiLFxyXG5cclxuICAgIFVJX1ZJREVPX1NIT1cgPSBcInVpVmlkZW9TaG93XCIsXHJcbiAgICBVSV9WSURFT19ISURFID0gXCJ1aVZpZGVvSGlkZVwiLFxyXG4gICAgVUlfTE9BRF9ISURFID0gJ3VpTG9hZEhpZGUnLFxyXG4gICAgVUlfTE9BRF9TSE9XID0gJ3VpTG9hZFNob3cnLFxyXG4gICAgLy96bWdfY29yZV9tZ3JcclxuICAgIENPUkVfUkVBRFkgPSBcImNvcmVSZWFkeVwiLFxyXG4gICAgQ09SRV9FUlJPUiA9IFwiY29yZUVycm9yXCIsXHJcbiAgICAvL3ptZ19lbnZfbWdyXHJcbiAgICBFTlZfUkVBRFkgPSBcImVudlJlYWR5XCIsXHJcbiAgICAvL3ptZ19jb25maWdfbWdyXHJcbiAgICBDT05GSUdfUkVBRFkgPSBcImNvbmZpZ1JlYWR5XCIsXHJcbiAgICBDT05GSUdfRVJST1IgPSBcImNvbmZpZ0Vycm9yXCIsXHJcbiAgICBDT05GSUdfTE9BREVEID0gJ2NvbmZpZ0xvYWRlZCcsXHJcbiAgICAvL3ptZ19zZXJ2ZXJfbWdyXHJcbiAgICBTRVJWRVJfUkVBRFkgPSBcInNlcnZlclJlYWR5XCIsXHJcbiAgICBTRVJWRVJfRVJST1IgPSBcInNlcnZlckVycm9yXCIsXHJcbiAgICBTRVJWRVJfQ09NUExFVEUgPSBcInNlcnZlckNvbXBsZXRlXCIsXHJcbiAgICAvL3ptZ191aV9tZ3JcclxuICAgIFVJX1JFQURZID0gXCJ1aVJlYWR5XCIsXHJcbiAgICAvLy0tcm9sZVxyXG4gICAgVUlfUk9MRV9BQ1RJT05fQ0hBTkdFID0gXCJ1aVJvbGVBY3Rpb25DaGFuZ2VcIixcclxuXHJcbiAgICAvL3ptZ19jb250cm9sbGVyXHJcbiAgICBDT05UUk9MTEVSX0NIQU5HRV9ERVNUT1JZID0gXCJjb250cm9sbGVyQ2hhbmdlRGVzdG9yeVwiLFxyXG4gICAgQ09OVFJPTExFUl9DSEFOR0VfU1RBUlQgPSBcImNvbnRyb2xsZXJDaGFuZ2VTdGFydFwiLFxyXG4gICAgQ09OVFJPTExFUl9DSEFOR0VfRU5EID0gXCJjb250cm9sbGVyQ2hhbmdlRW5kXCIsXHJcbiAgICBDT05UUk9MTEVSX0NIQU5HRV9QUk9HUkVTUyA9IFwiY29udHJvbGxlckNoYW5nZVByb2dyZXNzXCIsXHJcbiAgICBDT05UUk9MTEVSX0NIQU5HRV9GQUlMID0gXCJjb250cm9sbGVyQ2hhbmdlRmFpbFwiLFxyXG4gICAgQ09OVFJPTExFUl9WSURFT19DTE9TRSA9IFwiY29udHJvbGxlclZpZGVvQ2xvc2VcIixcclxuICAgIENPTlRST0xMRVJfVklERU9fQ09NUExFVEUgPSBcImNvbnRyb2xsZXJWaWRlb0NvbXBsZXRlXCIsXHJcbiAgICBDT05UUk9MTEVSX1NPVU5EX0NMT1NFID0gXCJjb250cm9sbGVyU291bmRDbG9zZVwiLFxyXG4gICAgQ09OVFJPTExFUl9TT1VORF9PUEVOID0gXCJjb250cm9sbGVyU291bmRPcGVuXCIsXHJcblxyXG4gICAgLy96bWdfbW9kdWxlX21nclxyXG4gICAgTU9EVUxFX0NIQU5HRSA9IFwibW9kdWxlQ2hhbmdlXCIsXHJcbiAgICAvKipcclxuICAgICAqIOmAgOWHuua4uOaIj1xyXG4gICAgICovXHJcbiAgICBHQU1FX09WRVIgPSBcImdhbWVPdmVyXCIsXHJcbn1cclxuIiwiaW1wb3J0IHsgJEVFdmVudEluZGV4IH0gZnJvbSBcIi4vRUV2ZW50SW5kZXhcIjtcclxuaW1wb3J0IHsgX0V2ZW50TWdyIH0gZnJvbSBcIi4vRXZlbnRNZ3JcIjtcclxuaW1wb3J0IHsgJEV2ZW50TmFtZSB9IGZyb20gXCIuL0V2ZW50TmFtZVwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IGxldCBFdmVudE5hbWUgPSAkRXZlbnROYW1lO1xyXG5cclxuZXhwb3J0IGxldCBFRXZlbnRJbmRleCA9ICRFRXZlbnRJbmRleDtcclxuXHJcbmV4cG9ydCBsZXQgRXZlbnRNZ3IgPSBfRXZlbnRNZ3IuZ2V0SW5zdGFuY2UoKTsiXSwibmFtZXMiOlsiQmFzZU1nciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBWSxZQUdYO0FBSEQsV0FBWSxZQUFZO0lBQ3BCLGtFQUFtQixDQUFBO0lBQ25CLG9EQUFZLENBQUE7QUFDaEIsQ0FBQyxFQUhXLFlBQVksS0FBWixZQUFZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0V4QjtJQUErQiw2QkFBTztJQVNsQztRQUFBLFlBQ0ksaUJBQU8sU0FHVjtRQUZHLEtBQUksQ0FB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
