'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_mgr = require('zmg_mgr');
var zmg_env_mgr = require('zmg_env_mgr');
var zmg_config_mgr = require('zmg_config_mgr');

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

var $TrackEventType;
(function ($TrackEventType) {
    //点击类型
    $TrackEventType[$TrackEventType["Touch"] = 0] = "Touch";
    //加载类型
    $TrackEventType[$TrackEventType["Load"] = 1] = "Load";
    //自定义类型
    $TrackEventType[$TrackEventType["Custom"] = 2] = "Custom";
})($TrackEventType || ($TrackEventType = {}));

var TrackModule = {
    //埋点key
    key: "",
    //发起模块名称
    moduleName: "",
    //埋点描述
    description: "",
    //当前埋点时间
    curTime: -1,
    //埋点数据
    param: null,
    //扩展参数
    extParam: {},
    //埋点类型
    eventType: $TrackEventType.Touch,
};

var NativeTrack = /** @class */ (function () {
    function NativeTrack() {
    }
    NativeTrack.prototype.initTrack = function (S) {
        if (S) {
            S.setLogConfig(S.appId(), S.appVersion());
        }
    };
    NativeTrack.prototype.send = function (S) {
        if (S) {
            var type = TrackModule.eventType;
            var eventType = 0;
            switch (type) {
                case $TrackEventType.Load:
                    eventType = 1;
                    break;
                case $TrackEventType.Custom:
                    eventType = 2;
                    break;
            }
            S.sendEvent(TrackModule.key, TrackModule.param, eventType);
        }
    };
    return NativeTrack;
}());

var WebTrack = /** @class */ (function () {
    function WebTrack() {
    }
    WebTrack.prototype.initTrack = function (S) {
        if (zmg_config_mgr.ConfigMgr.isValid) {
            this.init(S);
        }
        else {
            zmg_config_mgr.ConfigMgr.once(zmg_config_mgr.$ConfigEvent.LOADED, this.init.bind(this, S), this);
        }
    };
    WebTrack.prototype.init = function (S) {
        var appVersion = '1.0.2.2';
        var userId = zmg_env_mgr.EnvMgr.getUserId();
        var appId = parseInt(zmg_config_mgr.ConfigMgr.getAppId());
        var curEnv = zmg_env_mgr.EnvMgr.getEnv();
        if (S) {
            S.setConfig({
                environment: curEnv,
                logLevel: curEnv == zmg_env_mgr.EEnv.PROD ? 'error' : 'debug',
            });
            S.setDefaults({
                appId: appId,
                appVersion: appVersion,
                userId: userId
            });
        }
    };
    WebTrack.prototype.send = function (S) {
        var eventData = {
            eventId: TrackModule.key,
            eventType: TrackModule.eventType,
            eventParam: TrackModule.param,
        };
        if (TrackModule.extParam) {
            for (var p in TrackModule.extParam) {
                eventData[p] = TrackModule.extParam[p];
            }
        }
        S.sendEvent(eventData);
    };
    return WebTrack;
}());

var _TrackMgr = /** @class */ (function (_super) {
    __extends(_TrackMgr, _super);
    function _TrackMgr() {
        var _this = _super.call(this) || this;
        _this.trackSdk = null;
        _this.delegate = null;
        return _this;
    }
    _TrackMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _TrackMgr();
        }
        return this._instance;
    };
    _TrackMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                return [2 /*return*/];
            });
        });
    };
    _TrackMgr.prototype.initTrack = function (S) {
        this.trackSdk = S;
        if (cc.sys.isNative) {
            this.delegate = new NativeTrack();
        }
        else {
            this.delegate = new WebTrack();
        }
        this.delegate.initTrack(this.trackSdk);
    };
    _TrackMgr.prototype.send = function (key, data, eventType, moduleName, extParam) {
        if (eventType === void 0) { eventType = $TrackEventType.Touch; }
        if (CC_DEBUG)
            return;
        var trackConfig = zmg_config_mgr.ConfigMgr.getTrackConfigByKey(key);
        var time = new Date();
        TrackModule.key = key;
        TrackModule.description = trackConfig.des;
        TrackModule.eventType = eventType ? eventType : TrackModule.eventType;
        TrackModule.moduleName = moduleName != "" ? moduleName : trackConfig.moduleName;
        TrackModule.curTime = time.getTime();
        TrackModule.extParam = extParam ? extParam : TrackModule.extParam;
        TrackModule.param = data ? data : {};
        TrackModule.param.bu = zmg_config_mgr.ConfigMgr.getBu();
        TrackModule.param.runtime = cc.sys.isNative ? "native" : "web";
        TrackModule.param.device = zmg_env_mgr.EnvMgr.getDevice();
        // TrackModule.param.timeStamp = time.getTime();
        // TrackModule.param.localTime = time.toLocaleString() + '.' + TrackModule.param.timeStamp % 1000;
        if (this.delegate && this.trackSdk) {
            this.delegate.send(this.trackSdk);
        }
    };
    return _TrackMgr;
}(zmg_mgr.BaseMgr));

var TrackMgr = _TrackMgr.getInstance();
var TrackEventType = $TrackEventType;

exports.TrackEventType = TrackEventType;
exports.TrackMgr = TrackMgr;
exports.TrackModule = TrackModule;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UcmFja0V2ZW50VHlwZS50cyIsIi4uLy4uLy4uL3NyYy9UcmFja01vZHVsZS50cyIsIi4uLy4uLy4uL3NyYy9OYXRpdmVUcmFjay50cyIsIi4uLy4uLy4uL3NyYy9XZWJUcmFjay50cyIsIi4uLy4uLy4uL3NyYy9UcmFja01nci50cyIsIi4uLy4uLy4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZW51bSAkVHJhY2tFdmVudFR5cGUge1xyXG4gICAgLy/ngrnlh7vnsbvlnotcclxuICAgIFRvdWNoID0gMCxcclxuICAgIC8v5Yqg6L2957G75Z6LXHJcbiAgICBMb2FkID0gMSxcclxuICAgIC8v6Ieq5a6a5LmJ57G75Z6LXHJcbiAgICBDdXN0b20gPSAyLFxyXG59IiwiaW1wb3J0IHsgJFRyYWNrRXZlbnRUeXBlIH0gZnJvbSBcIi4vVHJhY2tFdmVudFR5cGVcIjtcclxuXHJcbmV4cG9ydCB2YXIgVHJhY2tNb2R1bGUgPSB7XHJcbiAgICAvL+Wfi+eCuWtleVxyXG4gICAga2V5OiBcIlwiLFxyXG4gICAgLy/lj5HotbfmqKHlnZflkI3np7BcclxuICAgIG1vZHVsZU5hbWU6IFwiXCIsXHJcbiAgICAvL+Wfi+eCueaPj+i/sFxyXG4gICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICAvL+W9k+WJjeWfi+eCueaXtumXtFxyXG4gICAgY3VyVGltZTogLTEsXHJcbiAgICAvL+Wfi+eCueaVsOaNrlxyXG4gICAgcGFyYW06IG51bGwsXHJcbiAgICAvL+aJqeWxleWPguaVsFxyXG4gICAgZXh0UGFyYW06IHt9LFxyXG4gICAgLy/ln4vngrnnsbvlnotcclxuICAgIGV2ZW50VHlwZTogJFRyYWNrRXZlbnRUeXBlLlRvdWNoLFxyXG59IiwiaW1wb3J0IHsgJFRyYWNrRXZlbnRUeXBlIH0gZnJvbSBcIi4vVHJhY2tFdmVudFR5cGVcIjtcclxuaW1wb3J0IHsgVHJhY2tNb2R1bGUgfSBmcm9tIFwiLi9UcmFja01vZHVsZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE5hdGl2ZVRyYWNrIHtcclxuXHJcbiAgICBwdWJsaWMgaW5pdFRyYWNrKFM6IHptZy5JTmF0aXZlVHJhY2tTREspIHtcclxuICAgICAgICBpZiAoUykge1xyXG4gICAgICAgICAgICBTLnNldExvZ0NvbmZpZyhTLmFwcElkKCksIFMuYXBwVmVyc2lvbigpKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZChTOiB6bWcuSU5hdGl2ZVRyYWNrU0RLKSB7XHJcbiAgICAgICAgaWYgKFMpIHtcclxuICAgICAgICAgICAgbGV0IHR5cGUgPSBUcmFja01vZHVsZS5ldmVudFR5cGVcclxuICAgICAgICAgICAgbGV0IGV2ZW50VHlwZSA9IDBcclxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlICRUcmFja0V2ZW50VHlwZS5Mb2FkOlxyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50VHlwZSA9IDFcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgJFRyYWNrRXZlbnRUeXBlLkN1c3RvbTpcclxuICAgICAgICAgICAgICAgICAgICBldmVudFR5cGUgPSAyXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFMuc2VuZEV2ZW50KFRyYWNrTW9kdWxlLmtleSwgVHJhY2tNb2R1bGUucGFyYW0sIGV2ZW50VHlwZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRUVudiwgRW52TWdyIH0gZnJvbSBcInptZ19lbnZfbWdyXCJcclxuaW1wb3J0IHsgVHJhY2tNb2R1bGUgfSBmcm9tIFwiLi9UcmFja01vZHVsZVwiXHJcbmltcG9ydCB7ICRDb25maWdFdmVudCB9IGZyb20gXCJ6bWdfY29uZmlnX21nclwiO1xyXG5pbXBvcnQgeyBDb25maWdNZ3IgfSBmcm9tIFwiem1nX2NvbmZpZ19tZ3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBXZWJUcmFjayB7XHJcbiAgICBwdWJsaWMgaW5pdFRyYWNrKFM6IGFueSkge1xyXG4gICAgICAgIGlmIChDb25maWdNZ3IuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLmluaXQoUylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBDb25maWdNZ3Iub25jZSgkQ29uZmlnRXZlbnQuTE9BREVELCB0aGlzLmluaXQuYmluZCh0aGlzLCBTKSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXQoUzogem1nLklXZWJUcmFja1NESykge1xyXG4gICAgICAgIGxldCBhcHBWZXJzaW9uID0gJzEuMC4yLjInXHJcbiAgICAgICAgbGV0IHVzZXJJZCA9IEVudk1nci5nZXRVc2VySWQoKVxyXG4gICAgICAgIGxldCBhcHBJZCA9IHBhcnNlSW50KENvbmZpZ01nci5nZXRBcHBJZCgpKVxyXG4gICAgICAgIGxldCBjdXJFbnYgPSBFbnZNZ3IuZ2V0RW52KClcclxuICAgICAgICBpZiAoUykge1xyXG4gICAgICAgICAgICBTLnNldENvbmZpZyh7XHJcbiAgICAgICAgICAgICAgICBlbnZpcm9ubWVudDogY3VyRW52LFxyXG4gICAgICAgICAgICAgICAgbG9nTGV2ZWw6IGN1ckVudiA9PSBFRW52LlBST0QgPyAnZXJyb3InIDogJ2RlYnVnJyxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgUy5zZXREZWZhdWx0cyh7XHJcbiAgICAgICAgICAgICAgICBhcHBJZDogYXBwSWQsXHJcbiAgICAgICAgICAgICAgICBhcHBWZXJzaW9uOiBhcHBWZXJzaW9uLFxyXG4gICAgICAgICAgICAgICAgdXNlcklkOiB1c2VySWRcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZW5kKFM6IHptZy5JV2ViVHJhY2tTREspIHtcclxuICAgICAgICBsZXQgZXZlbnREYXRhID0ge1xyXG4gICAgICAgICAgICBldmVudElkOiBUcmFja01vZHVsZS5rZXksXHJcbiAgICAgICAgICAgIGV2ZW50VHlwZTogVHJhY2tNb2R1bGUuZXZlbnRUeXBlLFxyXG4gICAgICAgICAgICBldmVudFBhcmFtOiBUcmFja01vZHVsZS5wYXJhbSxcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFRyYWNrTW9kdWxlLmV4dFBhcmFtKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gVHJhY2tNb2R1bGUuZXh0UGFyYW0pIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50RGF0YVtwXSA9IFRyYWNrTW9kdWxlLmV4dFBhcmFtW3BdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgUy5zZW5kRXZlbnQoZXZlbnREYXRhKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEJhc2VNZ3IgfSBmcm9tIFwiem1nX21nclwiXHJcbmltcG9ydCB7IEVudk1nciB9IGZyb20gXCJ6bWdfZW52X21nclwiXHJcbmltcG9ydCB7IENvbmZpZ01nciB9IGZyb20gXCJ6bWdfY29uZmlnX21nclwiXHJcbmltcG9ydCB7IFRyYWNrTW9kdWxlIH0gZnJvbSBcIi4vVHJhY2tNb2R1bGVcIjtcclxuaW1wb3J0IHsgTmF0aXZlVHJhY2sgfSBmcm9tIFwiLi9OYXRpdmVUcmFja1wiO1xyXG5pbXBvcnQgeyBXZWJUcmFjayB9IGZyb20gXCIuL1dlYlRyYWNrXCI7XHJcbmltcG9ydCB7ICRUcmFja0V2ZW50VHlwZSB9IGZyb20gXCIuL1RyYWNrRXZlbnRUeXBlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgX1RyYWNrTWdyIGV4dGVuZHMgQmFzZU1nciBpbXBsZW1lbnRzIHptZy5JVHJhY2tNZ3Ige1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBfVHJhY2tNZ3I7XHJcbiAgICBwcml2YXRlIHRyYWNrU2RrOiB6bWcuSVdlYlRyYWNrU0RLIHwgem1nLklOYXRpdmVUcmFja1NESyA9IG51bGxcclxuICAgIHByaXZhdGUgZGVsZWdhdGU6IGFueSA9IG51bGxcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfVHJhY2tNZ3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRUcmFjayhTPzogem1nLklXZWJUcmFja1NESyB8IHptZy5JTmF0aXZlVHJhY2tTREspIHtcclxuICAgICAgICB0aGlzLnRyYWNrU2RrID0gU1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG5ldyBOYXRpdmVUcmFjaygpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG5ldyBXZWJUcmFjaygpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGVsZWdhdGUuaW5pdFRyYWNrKHRoaXMudHJhY2tTZGspXHJcbiAgICB9XHJcbiAgICBzZW5kKGtleTogc3RyaW5nLCBkYXRhPzogYW55LCBldmVudFR5cGU6ICRUcmFja0V2ZW50VHlwZSA9ICRUcmFja0V2ZW50VHlwZS5Ub3VjaCwgbW9kdWxlTmFtZT86IHN0cmluZywgZXh0UGFyYW0/OiBhbnkpIHtcclxuICAgICAgICBpZiAoQ0NfREVCVUcpIHJldHVyblxyXG4gICAgICAgIGxldCB0cmFja0NvbmZpZyA9IENvbmZpZ01nci5nZXRUcmFja0NvbmZpZ0J5S2V5KGtleSlcclxuICAgICAgICBsZXQgdGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgVHJhY2tNb2R1bGUua2V5ID0ga2V5O1xyXG4gICAgICAgIFRyYWNrTW9kdWxlLmRlc2NyaXB0aW9uID0gdHJhY2tDb25maWcuZGVzXHJcbiAgICAgICAgVHJhY2tNb2R1bGUuZXZlbnRUeXBlID0gZXZlbnRUeXBlID8gZXZlbnRUeXBlIDogVHJhY2tNb2R1bGUuZXZlbnRUeXBlXHJcbiAgICAgICAgVHJhY2tNb2R1bGUubW9kdWxlTmFtZSA9IG1vZHVsZU5hbWUgIT0gXCJcIiA/IG1vZHVsZU5hbWUgOiB0cmFja0NvbmZpZy5tb2R1bGVOYW1lXHJcbiAgICAgICAgVHJhY2tNb2R1bGUuY3VyVGltZSA9IHRpbWUuZ2V0VGltZSgpXHJcbiAgICAgICAgVHJhY2tNb2R1bGUuZXh0UGFyYW0gPSBleHRQYXJhbSA/IGV4dFBhcmFtIDogVHJhY2tNb2R1bGUuZXh0UGFyYW1cclxuICAgICAgICBUcmFja01vZHVsZS5wYXJhbSA9IGRhdGEgPyBkYXRhIDoge31cclxuICAgICAgICBUcmFja01vZHVsZS5wYXJhbS5idSA9IENvbmZpZ01nci5nZXRCdSgpO1xyXG4gICAgICAgIFRyYWNrTW9kdWxlLnBhcmFtLnJ1bnRpbWUgPSBjYy5zeXMuaXNOYXRpdmUgPyBcIm5hdGl2ZVwiIDogXCJ3ZWJcIjtcclxuICAgICAgICBUcmFja01vZHVsZS5wYXJhbS5kZXZpY2UgPSBFbnZNZ3IuZ2V0RGV2aWNlKClcclxuICAgICAgICAvLyBUcmFja01vZHVsZS5wYXJhbS50aW1lU3RhbXAgPSB0aW1lLmdldFRpbWUoKTtcclxuICAgICAgICAvLyBUcmFja01vZHVsZS5wYXJhbS5sb2NhbFRpbWUgPSB0aW1lLnRvTG9jYWxlU3RyaW5nKCkgKyAnLicgKyBUcmFja01vZHVsZS5wYXJhbS50aW1lU3RhbXAgJSAxMDAwO1xyXG4gICAgICAgIGlmICh0aGlzLmRlbGVnYXRlICYmIHRoaXMudHJhY2tTZGspIHtcclxuICAgICAgICAgICAgdGhpcy5kZWxlZ2F0ZS5zZW5kKHRoaXMudHJhY2tTZGspXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBfVHJhY2tNZ3IgfSBmcm9tIFwiLi9UcmFja01nclwiO1xyXG5pbXBvcnQgeyAkVHJhY2tFdmVudFR5cGUgfSBmcm9tIFwiLi9UcmFja0V2ZW50VHlwZVwiO1xyXG5leHBvcnQgbGV0IFRyYWNrTWdyOiB6bWcuSVRyYWNrTWdyID0gX1RyYWNrTWdyLmdldEluc3RhbmNlKCk7XHJcbmV4cG9ydCBsZXQgVHJhY2tFdmVudFR5cGUgPSAkVHJhY2tFdmVudFR5cGU7XHJcbmV4cG9ydCAqIGZyb20gXCIuL1RyYWNrTW9kdWxlXCI7Il0sIm5hbWVzIjpbIkNvbmZpZ01nciIsIiRDb25maWdFdmVudCIsIkVudk1nciIsIkVFbnYiLCJCYXNlTWdyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQVksZUFPWDtBQVBELFdBQVksZUFBZTs7SUFFdkIsdURBQVMsQ0FBQTs7SUFFVCxxREFBUSxDQUFBOztJQUVSLHlEQUFVLENBQUE7QUFDZCxDQUFDLEVBUFcsZUFBZSxLQUFmLGVBQWU7O0lDRWhCLFdBQVcsR0FBRzs7SUFFckIsR0FBRyxFQUFFLEVBQUU7O0lBRVAsVUFBVSxFQUFFLEVBQUU7O0lBRWQsV0FBVyxFQUFFLEVBQUU7O0lBRWYsT0FBTyxFQUFFLENBQUMsQ0FBQzs7SUFFWCxLQUFLLEVBQUUsSUFBSTs7SUFFWCxRQUFRLEVBQUUsRUFBRTs7SUFFWixTQUFTLEVBQUUsZUFBZSxDQUFDLEtBQUs7OztBQ2JwQztJQUFBO0tBeUJDO0lBdkJVLCtCQUFTLEdBQWhCLFVBQWlCLENBQXNCO1FBQ25DLElBQUksQ0FBQyxFQUFFO1lBQ0gsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUE7U0FDNUM7S0FDSjtJQUVNLDBCQUFJLEdBQVgsVUFBWSxDQUFzQjtRQUM5QixJQUFJLENBQUMsRUFBRTtZQUNILElBQUksSUFBSSxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUE7WUFDaEMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFBO1lBQ2pCLFFBQVEsSUFBSTtnQkFDUixLQUFLLGVBQWUsQ0FBQyxJQUFJO29CQUNyQixTQUFTLEdBQUcsQ0FBQyxDQUFBO29CQUNiLE1BQU07Z0JBQ1YsS0FBSyxlQUFlLENBQUMsTUFBTTtvQkFDdkIsU0FBUyxHQUFHLENBQUMsQ0FBQTtvQkFDYixNQUFNO2FBR2I7WUFDRCxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQTtTQUM3RDtLQUNKO0lBQ0wsa0JBQUM7QUFBRCxDQUFDOztBQ3ZCRDtJQUFBO0tBd0NDO0lBdkNVLDRCQUFTLEdBQWhCLFVBQWlCLENBQU07UUFDbkIsSUFBSUEsd0JBQVMsQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNmO2FBQU07WUFDSEEsd0JBQVMsQ0FBQyxJQUFJLENBQUNDLDJCQUFZLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN0RTtLQUNKO0lBRUQsdUJBQUksR0FBSixVQUFLLENBQW1CO1FBQ3BCLElBQUksVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMxQixJQUFJLE1BQU0sR0FBR0Msa0JBQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUMvQixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUNGLHdCQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUMxQyxJQUFJLE1BQU0sR0FBR0Usa0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUM1QixJQUFJLENBQUMsRUFBRTtZQUNILENBQUMsQ0FBQyxTQUFTLENBQUM7Z0JBQ1IsV0FBVyxFQUFFLE1BQU07Z0JBQ25CLFFBQVEsRUFBRSxNQUFNLElBQUlDLGdCQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sR0FBRyxPQUFPO2FBQ3BELENBQUMsQ0FBQTtZQUNGLENBQUMsQ0FBQyxXQUFXLENBQUM7Z0JBQ1YsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osVUFBVSxFQUFFLFVBQVU7Z0JBQ3RCLE1BQU0sRUFBRSxNQUFNO2FBQ2pCLENBQUMsQ0FBQztTQUNOO0tBQ0o7SUFFTSx1QkFBSSxHQUFYLFVBQVksQ0FBbUI7UUFDM0IsSUFBSSxTQUFTLEdBQUc7WUFDWixPQUFPLEVBQUUsV0FBVyxDQUFDLEdBQUc7WUFDeEIsU0FBUyxFQUFFLFdBQVcsQ0FBQyxTQUFTO1lBQ2hDLFVBQVUsRUFBRSxXQUFXLENBQUMsS0FBSztTQUNoQyxDQUFBO1FBQ0QsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQ3RCLEtBQUssSUFBSSxDQUFDLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtnQkFDaEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDekM7U0FDSjtRQUNELENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDMUI7SUFDTCxlQUFDO0FBQUQsQ0FBQzs7QUNyQ0Q7SUFBK0IsNkJBQU87SUFXbEM7UUFBQSxZQUNJLGlCQUFPLFNBQ1Y7UUFYTyxjQUFRLEdBQTJDLElBQUksQ0FBQTtRQUN2RCxjQUFRLEdBQVEsSUFBSSxDQUFBOztLQVUzQjtJQVRhLHFCQUFXLEdBQXpCO1FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFDO1NBQ3BDO1FBQ0QsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3pCO0lBTVkseUJBQUssR0FBbEI7OztnQkFDSSxpQkFBTSxLQUFLLFdBQUUsQ0FBQzs7OztLQUNqQjtJQUVNLDZCQUFTLEdBQWhCLFVBQWlCLENBQTBDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFBO1FBQ2pCLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFBO1NBQ3BDO2FBQU07WUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUE7U0FDakM7UUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDekM7SUFDRCx3QkFBSSxHQUFKLFVBQUssR0FBVyxFQUFFLElBQVUsRUFBRSxTQUFrRCxFQUFFLFVBQW1CLEVBQUUsUUFBYztRQUF2RiwwQkFBQSxFQUFBLFlBQTZCLGVBQWUsQ0FBQyxLQUFLO1FBQzVFLElBQUksUUFBUTtZQUFFLE9BQU07UUFDcEIsSUFBSSxXQUFXLEdBQUdILHdCQUFTLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDcEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUN0QixXQUFXLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUN0QixXQUFXLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUE7UUFDekMsV0FBVyxDQUFDLFNBQVMsR0FBRyxTQUFTLEdBQUcsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLENBQUE7UUFDckUsV0FBVyxDQUFDLFVBQVUsR0FBRyxVQUFVLElBQUksRUFBRSxHQUFHLFVBQVUsR0FBRyxXQUFXLENBQUMsVUFBVSxDQUFBO1FBQy9FLFdBQVcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ3BDLFdBQVcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxHQUFHLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFBO1FBQ2pFLFdBQVcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUE7UUFDcEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFLEdBQUdBLHdCQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDekMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUMvRCxXQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBR0Usa0JBQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQTs7O1FBRzdDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtTQUNwQztLQUNKO0lBQ0wsZ0JBQUM7QUFBRCxDQWhEQSxDQUErQkUsZUFBTzs7SUNOM0IsUUFBUSxHQUFrQixTQUFTLENBQUMsV0FBVyxHQUFHO0lBQ2xELGNBQWMsR0FBRzs7Ozs7OyJ9
