'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_mgr = require('zmg_mgr');
var zmg_util = require('zmg_util');
var zmg_module_mgr = require('zmg_module_mgr');
var zmg_ui_mgr = require('zmg_ui_mgr');
var zmg_config_mgr = require('zmg_config_mgr');
var zmg_webserver_mgr = require('zmg_webserver_mgr');
var zmg_event_mgr = require('zmg_event_mgr');
var zmg_env_mgr = require('zmg_env_mgr');
var zmg_controller = require('zmg_controller');
var zmg_gamedata_mgr = require('zmg_gamedata_mgr');
var zmg_audio_mgr = require('zmg_audio_mgr');

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

var CoreEvent = /** @class */ (function (_super) {
    __extends(CoreEvent, _super);
    function CoreEvent(type) {
        return _super.call(this, type, false) || this;
    }
    CoreEvent.READY = zmg_event_mgr.EventName.CORE_READY;
    CoreEvent.ERROR = zmg_event_mgr.EventName.CORE_ERROR;
    return CoreEvent;
}(cc.Event));

var ZMCounter = /** @class */ (function () {
    function ZMCounter(id, opts, now) {
        this._id = id;
        this._opts = opts || {};
        this._value = 0;
        this._total = 0;
        this._averageValue = 0;
        this._accumValue = 0;
        this._accumSamples = 0;
        this._accumStart = now;
    }
    Object.defineProperty(ZMCounter.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: false,
        configurable: true
    });
    ZMCounter.prototype._average = function (v, now) {
        if (this._opts.average) {
            this._accumValue += v;
            ++this._accumSamples;
            var t = now;
            if (t - this._accumStart >= this._opts.average) {
                this._averageValue = this._accumValue / this._accumSamples;
                this._accumValue = 0;
                this._accumStart = t;
                this._accumSamples = 0;
            }
        }
    };
    ZMCounter.prototype.sample = function (now) {
        this._average(this._value, now);
    };
    ZMCounter.prototype.human = function () {
        var v = this._opts.average ? this._averageValue : this._value;
        return Math.round(v * 100) / 100;
    };
    ZMCounter.prototype.alarm = function () {
        return ((this._opts.below && this._value < this._opts.below) ||
            (this._opts.over && this._value > this._opts.over));
    };
    return ZMCounter;
}());

var ZMPerfCounter = /** @class */ (function (_super) {
    __extends(ZMPerfCounter, _super);
    function ZMPerfCounter(id, opts, now) {
        var _this = _super.call(this, id, opts, now) || this;
        _this._fps = 60;
        _this._time = now;
        return _this;
    }
    Object.defineProperty(ZMPerfCounter.prototype, "fps", {
        get: function () {
            return this._fps;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 记录中
     */
    ZMPerfCounter.prototype.recorded = function () {
        // cc.director.on(cc.Director.EVENT_BEFORE_UPDATE, this.beforeUpdate, this, false);
        // cc.director.on(cc.Director.EVENT_AFTER_UPDATE, this.afterUpdate, this, false);
        cc.director.on(cc.Director.EVENT_AFTER_DRAW, this.afterDraw, this, false);
    };
    /**
     * 停止
     */
    ZMPerfCounter.prototype.stoped = function () {
        // cc.director.off(cc.Director.EVENT_BEFORE_UPDATE, this.beforeUpdate, this);
        // cc.director.off(cc.Director.EVENT_AFTER_UPDATE, this.afterUpdate, this);
        cc.director.off(cc.Director.EVENT_AFTER_DRAW, this.afterDraw, this);
    };
    ZMPerfCounter.prototype.beforeUpdate = function () {
    };
    ZMPerfCounter.prototype.afterUpdate = function () {
    };
    ZMPerfCounter.prototype.afterDraw = function () {
        var now = performance.now();
        this.frame(now);
        this.sample(now);
        this._fps = Math.round((this._fps + this.human()) / 2);
        // gLog("FPS:" + this.human());
    };
    ZMPerfCounter.prototype.start = function (now) {
        this._time = now;
        // DISABLE: long time running will cause performance drop down
        // window.performance.mark(this._idstart);
    };
    ZMPerfCounter.prototype.end = function (now) {
        this._value = now - this._time;
        // DISABLE: long time running will cause performance drop down
        // window.performance.mark(this._idend);
        // window.performance.measure(this._id, this._idstart, this._idend);
        this._average(this._value, 0);
    };
    ZMPerfCounter.prototype.tick = function () {
        this.end(0);
        this.start(0);
    };
    ZMPerfCounter.prototype.frame = function (now) {
        var t = now;
        var e = t - this._time;
        this._total++;
        var avg = this._opts.average || 1000;
        if (e > avg) {
            this._value = this._total * 1000 / e;
            this._total = 0;
            this._time = t;
            this._average(this._value, 0);
        }
    };
    return ZMPerfCounter;
}(ZMCounter));

var STANDARD_FRAME = 60;
var FrameCtrl = /** @class */ (function () {
    function FrameCtrl() {
        this._frameRatio = 1.0;
        this._averageFps = 0.0;
        var now = performance.now();
        this._count = new ZMPerfCounter("fps", { desc: 'Frame time (ms)', min: 0, max: 50, average: 500, color: '#080' }, now);
        this.start();
    }
    Object.defineProperty(FrameCtrl.prototype, "fps", {
        get: function () {
            return this._averageFps;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 开始计算FPS
     */
    FrameCtrl.prototype.start = function () {
        this._count.recorded();
        zmg_event_mgr.EventMgr.on("frameRatioChange", this.onFrameRatioChange, this, false);
        window.setTimeout(this.localFrame.bind(this), 10 * 1000);
    };
    FrameCtrl.prototype.destory = function () {
        zmg_event_mgr.EventMgr.off("frameRatioChange", this.onFrameRatioChange, this);
    };
    /**记录平均fps */
    FrameCtrl.prototype.localFrame = function () {
        this._count.stoped();
        zmg_util.gLog("计算的平均刷新FPS:" + this._count.fps);
        this._averageFps = Math.max(this._count.fps, 60);
        this.frameRatio = this._frameRatio;
    };
    FrameCtrl.prototype.onFrameRatioChange = function (ratio) {
        this.frameRatio = ratio;
    };
    Object.defineProperty(FrameCtrl.prototype, "frameRatio", {
        get: function () {
            return this._frameRatio;
        },
        set: function (value) {
            this._frameRatio = value;
            cc.game.setFrameRate(60);
            if (this._averageFps) {
                if (this._averageFps == 60) {
                    //正常屏使用framerate
                    cc.game["setFrameRatio"] && cc.game["setFrameRatio"](this._frameRatio);
                }
                else {
                    var ratio = Math.round(this._averageFps / STANDARD_FRAME * this._frameRatio);
                    //高刷屏 使用frameratio
                    cc.game["setFrameRatio"] && cc.game["setFrameRatio"](ratio);
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    return FrameCtrl;
}());

var _ZmgCore = /** @class */ (function (_super) {
    __extends(_ZmgCore, _super);
    function _ZmgCore() {
        var _this = _super.call(this) || this;
        _this._mgrRecord = {};
        _this._mgrRecord = {
            //"env": EnvMgr,
            //"event": EventMgr,
            "audio": zmg_audio_mgr.AudioMgr,
            "config": zmg_config_mgr.ConfigMgr,
            "server": zmg_webserver_mgr.ServerMgr,
            "module": zmg_module_mgr.ModuleMgr,
            "director": zmg_controller.DirectorMgr,
            "data": zmg_gamedata_mgr.DataMgr,
            "ui": zmg_ui_mgr.UIMgr,
            "audioRes": zmg_ui_mgr.AudioRes,
        };
        _this._frameCtrl = new FrameCtrl();
        return _this;
    }
    _ZmgCore.getInstance = function () {
        if (!this._instance) {
            this._instance = new _ZmgCore();
        }
        return this._instance;
    };
    Object.defineProperty(_ZmgCore.prototype, "frameCtrl", {
        get: function () {
            return this._frameCtrl;
        },
        enumerable: false,
        configurable: true
    });
    _ZmgCore.prototype.setMgr = function (key, mgr) {
        this._mgrRecord[key] = mgr;
    };
    _ZmgCore.prototype.clearMgr = function (key) {
        delete this._mgrRecord[key];
    };
    /**
    * 模块启动
    * 延迟返回async函数
    *
    */
    _ZmgCore.prototype.start = function () {
        zmg_env_mgr.EnvMgr.start();
        zmg_event_mgr.EventMgr.start();
        for (var key in this._mgrRecord) {
            if (Object.prototype.hasOwnProperty.call(this._mgrRecord, key)) {
                var element = this._mgrRecord[key];
                element.start();
            }
        }
        this._mgrRecord["env"] = zmg_env_mgr.EnvMgr;
        this._mgrRecord["event"] = zmg_event_mgr.EventMgr;
        this.addEvents();
    };
    /**
     * 模块销毁
     */
    _ZmgCore.prototype.destroy = function () {
        this.removeEvents();
        for (var key in this._mgrRecord) {
            if (Object.prototype.hasOwnProperty.call(this._mgrRecord, key)) {
                var element = this._mgrRecord[key];
                element.destroy();
            }
        }
    };
    Object.defineProperty(_ZmgCore.prototype, "isValid", {
        /**
         * 未准备
         * 已被销毁
         * 则无法使用
         */
        get: function () {
            return this.notVaildItem ? false : true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_ZmgCore.prototype, "notVaildItem", {
        get: function () {
            for (var key in this._mgrRecord) {
                if (Object.prototype.hasOwnProperty.call(this._mgrRecord, key)) {
                    var element = this._mgrRecord[key];
                    if (!element.isValid) {
                        return element;
                    }
                }
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    _ZmgCore.prototype.check = function () {
        var item = this.notVaildItem;
        if (item) {
            //未完成加载，等待加载中...
            zmg_util.gLog("等待itemName: " + item.constructor.name);
        }
        else {
            if (!this._isInit) {
                this.onReady();
            }
        }
    };
    _ZmgCore.prototype.onReady = function () {
        this._isInit = true;
        this.initAudio();
        var cevt = new CoreEvent(CoreEvent.READY);
        this.dispatchEvent(cevt);
    };
    //======================================================子模块监听事件====================================================
    _ZmgCore.prototype.addEvents = function () {
        for (var key in this._mgrRecord) {
            if (Object.prototype.hasOwnProperty.call(this._mgrRecord, key)) {
                var element = this._mgrRecord[key];
                if (!element.isValid) {
                    element.once(zmg_event_mgr.EventName.READY, this.onMgrReady, this);
                }
            }
        }
    };
    _ZmgCore.prototype.removeEvents = function () {
        for (var key in this._mgrRecord) {
            if (Object.prototype.hasOwnProperty.call(this._mgrRecord, key)) {
                var element = this._mgrRecord[key];
                element.off(zmg_event_mgr.EventName.READY, this.onMgrReady, this);
            }
        }
    };
    _ZmgCore.prototype.onMgrReady = function (evt) {
        this.check();
    };
    _ZmgCore.prototype.dispatchEvent = function (cevt) {
        zmg_event_mgr.EventMgr.dispatchEvent(cevt);
        _super.prototype.dispatchEvent.call(this, cevt);
    };
    //======================================================END====================================================
    //======================================================内容初始化==============================================
    _ZmgCore.prototype.initAudio = function () {
        var data = zmg_gamedata_mgr.DataMgr.local.getItem(zmg_gamedata_mgr.ELocalSystemKey.IS_CLOSE_AUDIO);
        if (data) {
            zmg_audio_mgr.AudioMgr.setMusicVolume(0.0);
        }
        else {
            zmg_audio_mgr.AudioMgr.setMusicVolume(1.0);
        }
    };
    return _ZmgCore;
}(zmg_mgr.BaseMgr));
var ZmgCore = _ZmgCore.getInstance();

(function (ECoreCode) {
    ECoreCode["CONFIG_COMPLETE"] = "Config_Ready";
    ECoreCode["SERVER_COMPLETE"] = "SERVER_Ready";
    ECoreCode["UI_COMPLETE"] = "UI_Ready";
    ECoreCode["CONFIG_ERROR"] = "\u521D\u59CB\u5316config\u9519\u8BEF(\u8D44\u6E90\u672A\u52A0\u8F7D\u6210\u529F)";
})(exports.ECoreCode || (exports.ECoreCode = {}));

exports.CoreEvent = CoreEvent;
exports.FrameCtrl = FrameCtrl;
exports.ZmgCore = ZmgCore;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ldmVudHMvQ29yZUV2ZW50LnRzIiwiLi4vLi4vLi4vc3JjL2Zwcy9aTUNvdW50ZXIudHMiLCIuLi8uLi8uLi9zcmMvZnBzL1pNUGVyZkNvdW50ZXIudHMiLCIuLi8uLi8uLi9zcmMvZnBzL0ZyYW1lQ3RybC50cyIsIi4uLy4uLy4uL3NyYy9abWdDb3JlLnRzIiwiLi4vLi4vLi4vc3JjL2V2ZW50cy9FQ29yZUNvZGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnROYW1lLCB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XHJcbmltcG9ydCB7IEVDb3JlQ29kZSB9IGZyb20gXCIuL0VDb3JlQ29kZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvcmVFdmVudCBleHRlbmRzIGNjLkV2ZW50IHtcclxuICAgIHN0YXRpYyBSRUFEWTogc3RyaW5nID0gRXZlbnROYW1lLkNPUkVfUkVBRFk7XHJcbiAgICBzdGF0aWMgRVJST1I6IHN0cmluZyA9IEV2ZW50TmFtZS5DT1JFX0VSUk9SO1xyXG4gICAgcHVibGljIGNvZGU6IEVDb3JlQ29kZTtcclxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKHR5cGUsIGZhbHNlKTtcclxuICAgIH1cclxufSIsImV4cG9ydCBjbGFzcyBaTUNvdW50ZXIge1xuICAgIHByb3RlY3RlZCBfaWQ6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgX29wdHM6IGFueTtcbiAgICBwcm90ZWN0ZWQgX3ZhbHVlOiBudW1iZXI7XG4gICAgcHJvdGVjdGVkIF90b3RhbDogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBfYXZlcmFnZVZhbHVlOiBudW1iZXI7XG4gICAgcHJvdGVjdGVkIF9hY2N1bVZhbHVlOiBudW1iZXI7XG4gICAgcHJvdGVjdGVkIF9hY2N1bVNhbXBsZXM6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgX2FjY3VtU3RhcnQ6IG51bWJlcjtcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBvcHRzLCBub3cpIHtcbiAgICAgICAgdGhpcy5faWQgPSBpZDtcbiAgICAgICAgdGhpcy5fb3B0cyA9IG9wdHMgfHwge307XG5cbiAgICAgICAgdGhpcy5fdmFsdWUgPSAwO1xuICAgICAgICB0aGlzLl90b3RhbCA9IDA7XG4gICAgICAgIHRoaXMuX2F2ZXJhZ2VWYWx1ZSA9IDA7XG4gICAgICAgIHRoaXMuX2FjY3VtVmFsdWUgPSAwO1xuICAgICAgICB0aGlzLl9hY2N1bVNhbXBsZXMgPSAwO1xuICAgICAgICB0aGlzLl9hY2N1bVN0YXJ0ID0gbm93O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfYXZlcmFnZSh2OiBudW1iZXIsIG5vdzogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLl9vcHRzLmF2ZXJhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjY3VtVmFsdWUgKz0gdjtcbiAgICAgICAgICAgICsrdGhpcy5fYWNjdW1TYW1wbGVzO1xuXG4gICAgICAgICAgICBsZXQgdCA9IG5vdztcbiAgICAgICAgICAgIGlmICh0IC0gdGhpcy5fYWNjdW1TdGFydCA+PSB0aGlzLl9vcHRzLmF2ZXJhZ2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hdmVyYWdlVmFsdWUgPSB0aGlzLl9hY2N1bVZhbHVlIC8gdGhpcy5fYWNjdW1TYW1wbGVzO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjY3VtVmFsdWUgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjY3VtU3RhcnQgPSB0O1xuICAgICAgICAgICAgICAgIHRoaXMuX2FjY3VtU2FtcGxlcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2FtcGxlKG5vdzogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2F2ZXJhZ2UodGhpcy5fdmFsdWUsIG5vdyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGh1bWFuKCk6IG51bWJlciB7XG4gICAgICAgIGxldCB2ID0gdGhpcy5fb3B0cy5hdmVyYWdlID8gdGhpcy5fYXZlcmFnZVZhbHVlIDogdGhpcy5fdmFsdWU7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHYgKiAxMDApIC8gMTAwO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhbGFybSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICh0aGlzLl9vcHRzLmJlbG93ICYmIHRoaXMuX3ZhbHVlIDwgdGhpcy5fb3B0cy5iZWxvdykgfHxcbiAgICAgICAgICAgICh0aGlzLl9vcHRzLm92ZXIgJiYgdGhpcy5fdmFsdWUgPiB0aGlzLl9vcHRzLm92ZXIpXG4gICAgICAgICk7XG4gICAgfVxufSIsImltcG9ydCB7IGdMb2cgfSBmcm9tIFwiem1nX3V0aWxcIjtcbmltcG9ydCB7IFpNQ291bnRlciB9IGZyb20gXCIuL1pNQ291bnRlclwiO1xuXG5leHBvcnQgY2xhc3MgWk1QZXJmQ291bnRlciBleHRlbmRzIFpNQ291bnRlciB7XG4gICAgcHJvdGVjdGVkIF9mcHM6IG51bWJlciA9IDYwO1xuICAgIHByb3RlY3RlZCBfdGltZTogbnVtYmVyO1xuICAgIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIG9wdHM6IGFueSwgbm93OiBudW1iZXIpIHtcbiAgICAgICAgc3VwZXIoaWQsIG9wdHMsIG5vdyk7XG4gICAgICAgIHRoaXMuX3RpbWUgPSBub3c7XG5cbiAgICB9XG4gICAgcHVibGljIGdldCBmcHMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZwcztcbiAgICB9XG4gICAgLyoqXG4gICAgICog6K6w5b2V5LitXG4gICAgICovXG4gICAgcHVibGljIHJlY29yZGVkKCk6IHZvaWQge1xuICAgICAgICAvLyBjYy5kaXJlY3Rvci5vbihjYy5EaXJlY3Rvci5FVkVOVF9CRUZPUkVfVVBEQVRFLCB0aGlzLmJlZm9yZVVwZGF0ZSwgdGhpcywgZmFsc2UpO1xuICAgICAgICAvLyBjYy5kaXJlY3Rvci5vbihjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9VUERBVEUsIHRoaXMuYWZ0ZXJVcGRhdGUsIHRoaXMsIGZhbHNlKTtcbiAgICAgICAgY2MuZGlyZWN0b3Iub24oY2MuRGlyZWN0b3IuRVZFTlRfQUZURVJfRFJBVywgdGhpcy5hZnRlckRyYXcsIHRoaXMsIGZhbHNlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICog5YGc5q2iXG4gICAgICovXG4gICAgcHVibGljIHN0b3BlZCgpOiB2b2lkIHtcbiAgICAgICAgLy8gY2MuZGlyZWN0b3Iub2ZmKGNjLkRpcmVjdG9yLkVWRU5UX0JFRk9SRV9VUERBVEUsIHRoaXMuYmVmb3JlVXBkYXRlLCB0aGlzKTtcbiAgICAgICAgLy8gY2MuZGlyZWN0b3Iub2ZmKGNjLkRpcmVjdG9yLkVWRU5UX0FGVEVSX1VQREFURSwgdGhpcy5hZnRlclVwZGF0ZSwgdGhpcyk7XG4gICAgICAgIGNjLmRpcmVjdG9yLm9mZihjYy5EaXJlY3Rvci5FVkVOVF9BRlRFUl9EUkFXLCB0aGlzLmFmdGVyRHJhdywgdGhpcyk7XG4gICAgfVxuICAgIHByaXZhdGUgYmVmb3JlVXBkYXRlKCk6IHZvaWQge1xuICAgIH1cbiAgICBwcml2YXRlIGFmdGVyVXBkYXRlKCk6IHZvaWQge1xuICAgIH1cbiAgICBwcml2YXRlIGFmdGVyRHJhdygpOiB2b2lkIHtcbiAgICAgICAgbGV0IG5vdyA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICB0aGlzLmZyYW1lKG5vdyk7XG4gICAgICAgIHRoaXMuc2FtcGxlKG5vdyk7XG4gICAgICAgIHRoaXMuX2ZwcyA9IE1hdGgucm91bmQoKHRoaXMuX2ZwcyArIHRoaXMuaHVtYW4oKSkgLyAyKTtcbiAgICAgICAgLy8gZ0xvZyhcIkZQUzpcIiArIHRoaXMuaHVtYW4oKSk7XG4gICAgfVxuICAgIHB1YmxpYyBzdGFydChub3cpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdGltZSA9IG5vdztcblxuICAgICAgICAvLyBESVNBQkxFOiBsb25nIHRpbWUgcnVubmluZyB3aWxsIGNhdXNlIHBlcmZvcm1hbmNlIGRyb3AgZG93blxuICAgICAgICAvLyB3aW5kb3cucGVyZm9ybWFuY2UubWFyayh0aGlzLl9pZHN0YXJ0KTtcbiAgICB9XG4gICAgcHVibGljIGVuZChub3cpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSBub3cgLSB0aGlzLl90aW1lO1xuXG4gICAgICAgIC8vIERJU0FCTEU6IGxvbmcgdGltZSBydW5uaW5nIHdpbGwgY2F1c2UgcGVyZm9ybWFuY2UgZHJvcCBkb3duXG4gICAgICAgIC8vIHdpbmRvdy5wZXJmb3JtYW5jZS5tYXJrKHRoaXMuX2lkZW5kKTtcbiAgICAgICAgLy8gd2luZG93LnBlcmZvcm1hbmNlLm1lYXN1cmUodGhpcy5faWQsIHRoaXMuX2lkc3RhcnQsIHRoaXMuX2lkZW5kKTtcblxuICAgICAgICB0aGlzLl9hdmVyYWdlKHRoaXMuX3ZhbHVlLCAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdGljaygpIHtcbiAgICAgICAgdGhpcy5lbmQoMCk7XG4gICAgICAgIHRoaXMuc3RhcnQoMCk7XG4gICAgfVxuICAgIHB1YmxpYyBmcmFtZShub3cpIHtcbiAgICAgICAgbGV0IHQgPSBub3c7XG4gICAgICAgIGxldCBlID0gdCAtIHRoaXMuX3RpbWU7XG4gICAgICAgIHRoaXMuX3RvdGFsKys7XG4gICAgICAgIGxldCBhdmcgPSB0aGlzLl9vcHRzLmF2ZXJhZ2UgfHwgMTAwMDtcblxuICAgICAgICBpZiAoZSA+IGF2Zykge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLl90b3RhbCAqIDEwMDAgLyBlO1xuICAgICAgICAgICAgdGhpcy5fdG90YWwgPSAwO1xuICAgICAgICAgICAgdGhpcy5fdGltZSA9IHQ7XG4gICAgICAgICAgICB0aGlzLl9hdmVyYWdlKHRoaXMuX3ZhbHVlLCAwKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBFdmVudE1nciB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XG5pbXBvcnQgeyBnTG9nIH0gZnJvbSBcInptZ191dGlsXCI7XG5pbXBvcnQgeyBaTVBlcmZDb3VudGVyIH0gZnJvbSBcIi4vWk1QZXJmQ291bnRlclwiO1xuXG5jb25zdCBTVEFOREFSRF9GUkFNRTogbnVtYmVyID0gNjA7XG5leHBvcnQgY2xhc3MgRnJhbWVDdHJsIHtcbiAgICBwcml2YXRlIF9mcmFtZVJhdGlvOiBudW1iZXIgPSAxLjA7XG4gICAgcHJpdmF0ZSBfY291bnQ6IFpNUGVyZkNvdW50ZXI7XG4gICAgcHJvdGVjdGVkIF9hdmVyYWdlRnBzOiBudW1iZXIgPSAwLjA7XG4gICAgcHVibGljIGdldCBmcHMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2F2ZXJhZ2VGcHM7XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBsZXQgbm93ID0gcGVyZm9ybWFuY2Uubm93KCk7XG4gICAgICAgIHRoaXMuX2NvdW50ID0gbmV3IFpNUGVyZkNvdW50ZXIoXCJmcHNcIiwgeyBkZXNjOiAnRnJhbWUgdGltZSAobXMpJywgbWluOiAwLCBtYXg6IDUwLCBhdmVyYWdlOiA1MDAsIGNvbG9yOiAnIzA4MCcgfVxuICAgICAgICAgICAgLCBub3cpO1xuICAgICAgICB0aGlzLnN0YXJ0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOW8gOWni+iuoeeul0ZQU1xuICAgICAqL1xuICAgIHByaXZhdGUgc3RhcnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NvdW50LnJlY29yZGVkKCk7XG4gICAgICAgIEV2ZW50TWdyLm9uKFwiZnJhbWVSYXRpb0NoYW5nZVwiLCB0aGlzLm9uRnJhbWVSYXRpb0NoYW5nZSwgdGhpcywgZmFsc2UpO1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0aGlzLmxvY2FsRnJhbWUuYmluZCh0aGlzKSwgMTAgKiAxMDAwKTtcbiAgICB9XG4gICAgZGVzdG9yeSgpOiB2b2lkIHtcbiAgICAgICAgRXZlbnRNZ3Iub2ZmKFwiZnJhbWVSYXRpb0NoYW5nZVwiLCB0aGlzLm9uRnJhbWVSYXRpb0NoYW5nZSwgdGhpcyk7XG4gICAgfVxuICAgIC8qKuiusOW9leW5s+Wdh2ZwcyAqL1xuICAgIHByaXZhdGUgbG9jYWxGcmFtZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY291bnQuc3RvcGVkKCk7XG4gICAgICAgIGdMb2coXCLorqHnrpfnmoTlubPlnYfliLfmlrBGUFM6XCIgKyB0aGlzLl9jb3VudC5mcHMpO1xuICAgICAgICB0aGlzLl9hdmVyYWdlRnBzID0gTWF0aC5tYXgodGhpcy5fY291bnQuZnBzLCA2MCk7XG4gICAgICAgIHRoaXMuZnJhbWVSYXRpbyA9IHRoaXMuX2ZyYW1lUmF0aW87XG4gICAgfVxuICAgIHByaXZhdGUgb25GcmFtZVJhdGlvQ2hhbmdlKHJhdGlvOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mcmFtZVJhdGlvID0gcmF0aW87XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgZnJhbWVSYXRpbyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2ZyYW1lUmF0aW8gPSB2YWx1ZTtcbiAgICAgICAgY2MuZ2FtZS5zZXRGcmFtZVJhdGUoNjApO1xuICAgICAgICBpZiAodGhpcy5fYXZlcmFnZUZwcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2F2ZXJhZ2VGcHMgPT0gNjApIHtcbiAgICAgICAgICAgICAgICAvL+ato+W4uOWxj+S9v+eUqGZyYW1lcmF0ZVxuICAgICAgICAgICAgICAgIGNjLmdhbWVbXCJzZXRGcmFtZVJhdGlvXCJdICYmIGNjLmdhbWVbXCJzZXRGcmFtZVJhdGlvXCJdKHRoaXMuX2ZyYW1lUmF0aW8pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgcmF0aW86IG51bWJlciA9IE1hdGgucm91bmQodGhpcy5fYXZlcmFnZUZwcyAvIFNUQU5EQVJEX0ZSQU1FICogdGhpcy5fZnJhbWVSYXRpbyk7XG4gICAgICAgICAgICAgICAgLy/pq5jliLflsY8g5L2/55SoZnJhbWVyYXRpb1xuICAgICAgICAgICAgICAgIGNjLmdhbWVbXCJzZXRGcmFtZVJhdGlvXCJdICYmIGNjLmdhbWVbXCJzZXRGcmFtZVJhdGlvXCJdKHJhdGlvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgZ2V0IGZyYW1lUmF0aW8oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZyYW1lUmF0aW87XG4gICAgfVxufSIsImltcG9ydCB7IEJhc2VNZ3IgfSBmcm9tIFwiem1nX21nclwiO1xyXG5pbXBvcnQgeyBnTG9nIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7IE1vZHVsZU1nciB9IGZyb20gXCJ6bWdfbW9kdWxlX21nclwiO1xyXG5pbXBvcnQgeyBBdWRpb1JlcywgVUlFdmVudCwgVUlNZ3IgfSBmcm9tIFwiem1nX3VpX21nclwiO1xyXG5pbXBvcnQgeyBDb25maWdNZ3IgfSBmcm9tIFwiem1nX2NvbmZpZ19tZ3JcIjtcclxuaW1wb3J0IHsgU2VydmVyRXZlbnQsIFNlcnZlck1nciB9IGZyb20gXCJ6bWdfd2Vic2VydmVyX21nclwiO1xyXG5pbXBvcnQgeyBDb3JlRXZlbnQgfSBmcm9tIFwiLi9ldmVudHMvQ29yZUV2ZW50XCI7XHJcbmltcG9ydCB7IEVDb3JlQ29kZSB9IGZyb20gXCIuL2V2ZW50cy9FQ29yZUNvZGVcIjtcclxuaW1wb3J0IHsgRW52TWdyIH0gZnJvbSBcInptZ19lbnZfbWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWdyLCBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgeyBEaXJlY3Rvck1nciB9IGZyb20gXCJ6bWdfY29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyB9IGZyb20gXCJ6bWdfbW9kdWxlX21nclwiO1xyXG5pbXBvcnQgeyBEYXRhTWdyLCBFTG9jYWxTeXN0ZW1LZXkgfSBmcm9tIFwiem1nX2dhbWVkYXRhX21nclwiO1xyXG5pbXBvcnQgeyBBdWRpb01nciB9IGZyb20gXCJ6bWdfYXVkaW9fbWdyXCI7XHJcbmltcG9ydCB7IFpNUGVyZkNvdW50ZXIgfSBmcm9tIFwiLi9mcHMvWk1QZXJmQ291bnRlclwiO1xyXG5pbXBvcnQgeyBGcmFtZUN0cmwgfSBmcm9tIFwiLi9mcHMvRnJhbWVDdHJsXCI7XHJcbmNsYXNzIF9abWdDb3JlIGV4dGVuZHMgQmFzZU1nciBpbXBsZW1lbnRzIHptZy5JTWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogX1ptZ0NvcmU7XHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogX1ptZ0NvcmUge1xyXG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgX1ptZ0NvcmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfbWdyUmVjb3JkOiBSZWNvcmQ8c3RyaW5nLCB6bWcuSU1ncj4gPSB7fTtcclxuICAgIHByaXZhdGUgX2lzSW5pdDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2ZyYW1lQ3RybDogRnJhbWVDdHJsO1xyXG4gICAgcHVibGljIGdldCBmcmFtZUN0cmwoKTogRnJhbWVDdHJsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZnJhbWVDdHJsO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9tZ3JSZWNvcmQgPSB7XHJcbiAgICAgICAgICAgIC8vXCJlbnZcIjogRW52TWdyLFxyXG4gICAgICAgICAgICAvL1wiZXZlbnRcIjogRXZlbnRNZ3IsXHJcbiAgICAgICAgICAgIFwiYXVkaW9cIjogQXVkaW9NZ3IsXHJcbiAgICAgICAgICAgIFwiY29uZmlnXCI6IENvbmZpZ01ncixcclxuICAgICAgICAgICAgXCJzZXJ2ZXJcIjogU2VydmVyTWdyLFxyXG4gICAgICAgICAgICBcIm1vZHVsZVwiOiBNb2R1bGVNZ3IsXHJcbiAgICAgICAgICAgIFwiZGlyZWN0b3JcIjogRGlyZWN0b3JNZ3IsXHJcbiAgICAgICAgICAgIFwiZGF0YVwiOiBEYXRhTWdyLFxyXG4gICAgICAgICAgICBcInVpXCI6IFVJTWdyLFxyXG4gICAgICAgICAgICBcImF1ZGlvUmVzXCI6IEF1ZGlvUmVzLFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9mcmFtZUN0cmwgPSBuZXcgRnJhbWVDdHJsKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0TWdyKGtleTogc3RyaW5nLCBtZ3I6IHptZy5JTWdyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWdyUmVjb3JkW2tleV0gPSBtZ3I7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xlYXJNZ3Ioa2V5OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5fbWdyUmVjb3JkW2tleV07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICog5qih5Z2X5ZCv5YqoXHJcbiAgICAqIOW7tui/n+i/lOWbnmFzeW5j5Ye95pWwXHJcbiAgICAqXHJcbiAgICAqL1xyXG4gICAgc3RhcnQoKTogYW55IHtcclxuICAgICAgICBFbnZNZ3Iuc3RhcnQoKTtcclxuICAgICAgICBFdmVudE1nci5zdGFydCgpO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX21nclJlY29yZCkge1xyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuX21nclJlY29yZCwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudDogem1nLklNZ3IgPSB0aGlzLl9tZ3JSZWNvcmRba2V5XTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9tZ3JSZWNvcmRbXCJlbnZcIl0gPSBFbnZNZ3I7XHJcbiAgICAgICAgdGhpcy5fbWdyUmVjb3JkW1wiZXZlbnRcIl0gPSBFdmVudE1ncjtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50cygpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmqKHlnZfplIDmr4FcclxuICAgICAqL1xyXG4gICAgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50cygpO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX21nclJlY29yZCkge1xyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuX21nclJlY29yZCwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudDogem1nLklNZ3IgPSB0aGlzLl9tZ3JSZWNvcmRba2V5XTtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmnKrlh4blpIdcclxuICAgICAqIOW3suiiq+mUgOavgVxyXG4gICAgICog5YiZ5peg5rOV5L2/55SoXHJcbiAgICAgKi9cclxuICAgIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vdFZhaWxkSXRlbSA/IGZhbHNlIDogdHJ1ZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0IG5vdFZhaWxkSXRlbSgpOiB6bWcuSU1nciB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fbWdyUmVjb3JkKSB7XHJcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGhpcy5fbWdyUmVjb3JkLCBrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50OiB6bWcuSU1nciA9IHRoaXMuX21nclJlY29yZFtrZXldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlbGVtZW50LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY2hlY2soKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGl0ZW06IHptZy5JTWdyID0gdGhpcy5ub3RWYWlsZEl0ZW07XHJcbiAgICAgICAgaWYgKGl0ZW0pIHtcclxuICAgICAgICAgICAgLy/mnKrlrozmiJDliqDovb3vvIznrYnlvoXliqDovb3kuK0uLi5cclxuICAgICAgICAgICAgZ0xvZyhcIuetieW+hWl0ZW1OYW1lOiBcIiArIGl0ZW0uY29uc3RydWN0b3IubmFtZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0luaXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25SZWFkeSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lzSW5pdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pbml0QXVkaW8oKTtcclxuICAgICAgICBsZXQgY2V2dCA9IG5ldyBDb3JlRXZlbnQoQ29yZUV2ZW50LlJFQURZKTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY2V2dCk7XHJcbiAgICB9XHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PeWtkOaooeWdl+ebkeWQrOS6i+S7tj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIHByaXZhdGUgYWRkRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX21nclJlY29yZCkge1xyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuX21nclJlY29yZCwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudDogem1nLklNZ3IgPSB0aGlzLl9tZ3JSZWNvcmRba2V5XTtcclxuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5vbmNlKEV2ZW50TmFtZS5SRUFEWSwgdGhpcy5vbk1nclJlYWR5LCB0aGlzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLl9tZ3JSZWNvcmQpIHtcclxuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0aGlzLl9tZ3JSZWNvcmQsIGtleSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQ6IHptZy5JTWdyID0gdGhpcy5fbWdyUmVjb3JkW2tleV07XHJcbiAgICAgICAgICAgICAgICBlbGVtZW50Lm9mZihFdmVudE5hbWUuUkVBRFksIHRoaXMub25NZ3JSZWFkeSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uTWdyUmVhZHkoZXZ0OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2hlY2soKTtcclxuICAgIH1cclxuICAgIGRpc3BhdGNoRXZlbnQoY2V2dDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBFdmVudE1nci5kaXNwYXRjaEV2ZW50KGNldnQpO1xyXG4gICAgICAgIHN1cGVyLmRpc3BhdGNoRXZlbnQoY2V2dCk7XHJcbiAgICB9XHJcbiAgICAvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PUVORD09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT095YaF5a655Yid5aeL5YyWPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgcHJpdmF0ZSBpbml0QXVkaW8oKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBEYXRhTWdyLmxvY2FsLmdldEl0ZW0oRUxvY2FsU3lzdGVtS2V5LklTX0NMT1NFX0FVRElPKTtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBBdWRpb01nci5zZXRNdXNpY1ZvbHVtZSgwLjApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEF1ZGlvTWdyLnNldE11c2ljVm9sdW1lKDEuMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgbGV0IFptZ0NvcmUgPSBfWm1nQ29yZS5nZXRJbnN0YW5jZSgpOyIsImV4cG9ydCBlbnVtIEVDb3JlQ29kZSB7XHJcbiAgICBDT05GSUdfQ09NUExFVEUgPSBcIkNvbmZpZ19SZWFkeVwiLFxyXG4gICAgU0VSVkVSX0NPTVBMRVRFID0gXCJTRVJWRVJfUmVhZHlcIixcclxuICAgIFVJX0NPTVBMRVRFID0gXCJVSV9SZWFkeVwiLFxyXG4gICAgQ09ORklHX0VSUk9SID0gXCLliJ3lp4vljJZjb25maWfplJnor68o6LWE5rqQ5pyq5Yqg6L295oiQ5YqfKVwiLFxyXG59Il0sIm5hbWVzIjpbIkV2ZW50TmFtZSIsIkV2ZW50TWdyIiwiZ0xvZyIsIkF1ZGlvTWdyIiwiQ29uZmlnTWdyIiwiU2VydmVyTWdyIiwiTW9kdWxlTWdyIiwiRGlyZWN0b3JNZ3IiLCJEYXRhTWdyIiwiVUlNZ3IiLCJBdWRpb1JlcyIsIkVudk1nciIsIkVMb2NhbFN5c3RlbUtleSIsIkJhc2VNZ3IiLCJFQ29yZUNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHK0IsNkJBQVE7SUFJbkMsbUJBQVksSUFBWTtlQUNwQixrQkFBTSxJQUFJLEVBQUUsS0FBSyxDQUFDO0tBQ3JCO0lBTE0sZUFBSyxHQUFXQSx1QkFBUyxDQUFDLFVBQVUsQ0FBQztJQUNyQyxlQUFLLEdBQVdBLHVCQUFTLENBQUMsVUFBVSxDQUFDO0lBS2hELGdCQUFDO0NBUEQsQ0FBK0IsRUFBRSxDQUFDLEtBQUs7O0FDSHZDO0lBU0ksbUJBQVksRUFBVSxFQUFFLElBQUksRUFBRSxHQUFHO1FBQzdCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBRXhCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO0tBQzFCO0lBRUQsc0JBQVcsNEJBQUs7YUFBaEI7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDdEI7YUFDRCxVQUFpQixLQUFhO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FB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
