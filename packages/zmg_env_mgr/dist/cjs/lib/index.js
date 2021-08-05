'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_util = require('zmg_util');
var zmg_event_mgr = require('zmg_event_mgr');
var zmg_mgr = require('zmg_mgr');
var zmg_config_mgr = require('zmg_config_mgr');

var $EEnv;
(function ($EEnv) {
    $EEnv["FAT"] = "fat";
    $EEnv["TEST"] = "test";
    $EEnv["UAT"] = "uat";
    $EEnv["PROD"] = "prod";
})($EEnv || ($EEnv = {}));

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

var $EDevice;
(function ($EDevice) {
    $EDevice["PC"] = "PC";
    $EDevice["MAC"] = "MAC";
    $EDevice["IPAD"] = "IPAD";
    $EDevice["APAD"] = "APAD";
    $EDevice["IPHONE"] = "IPHONE";
    $EDevice["APHONE"] = "APHONE";
})($EDevice || ($EDevice = {}));

var $ESource;
(function ($ESource) {
    /**
     * 姜帅
     */
    $ESource["PC"] = "11574";
    /**
     * 郑来贤
     */
    $ESource["IPAD"] = "513";
    /**
     * 胡春风
     */
    $ESource["APAD"] = "523";
    /**
     * 谢真真
     */
    $ESource["ANDROID"] = "533";
    /**
     * 陈凯
     */
    $ESource["IPHONE"] = "543";
})($ESource || ($ESource = {}));

var WebEnv = /** @class */ (function (_super) {
    __extends(WebEnv, _super);
    function WebEnv() {
        var _this = _super.call(this) || this;
        _this._defaultSearch = "";
        _this._defaultAppVersion = "4.3.0";
        _this._defaultApiVersion = "4.3.0";
        _this.init();
        return _this;
    }
    WebEnv.prototype.setTestDefault = function (value) {
        this._defaultSearch = value;
        this.init();
    };
    WebEnv.prototype.init = function () {
        this._envData = this.getRequest(this.search);
        zmg_util.TSlog.doConsole = this.getEnv() !== $EEnv.PROD;
    };
    WebEnv.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                this.emit(zmg_event_mgr.EventName.ENV_READY);
                return [2 /*return*/];
            });
        });
    };
    WebEnv.prototype.isPC = function () {
        var device = this.getDevice();
        return device == $EDevice.PC || device == $EDevice.MAC;
    };
    WebEnv.prototype.isIOS = function () {
        var device = this.getDevice();
        return device == $EDevice.IPHONE || device == $EDevice.IPAD;
    };
    WebEnv.prototype.isAndroid = function () {
        var device = this.getDevice();
        return device == $EDevice.APAD || device == $EDevice.APHONE;
    };
    WebEnv.prototype.isTest = function () {
        var env = this.getEnv();
        return env == $EEnv.FAT || env == $EEnv.TEST;
    };
    WebEnv.prototype.isJsb = function () {
        var msg = cc.sys.isNative ? "jsb" : (this._envData.msgSendModle ? this._envData.msgSendModle : "post");
        return msg == "jsb";
    };
    WebEnv.prototype.isDebug = function () {
        if (CC_DEV) {
            return true;
        }
        if (CC_JSB) {
            return true;
        }
        if (this.isTest()) {
            return true;
        }
        if (this.getRequest(this.search)['debug'] == "true") {
            return true;
        }
        return false;
        // return false;
    };
    Object.defineProperty(WebEnv.prototype, "search", {
        get: function () {
            if (CC_JSB) {
                return this._defaultSearch;
            }
            else {
                if (zmg_util.StringUtil.isValid(window.location.search)) {
                    return window.location.search;
                }
                return this._defaultSearch;
            }
        },
        enumerable: false,
        configurable: true
    });
    WebEnv.prototype.getRequest = function (url) {
        if (!url || url == "") {
            return {};
        }
        var query = {};
        var i;
        var str;
        var strs;
        var arr;
        if (url.indexOf("?") != -1) {
            str = url.substr(1);
            strs = str.split("&");
            for (i = 0; i < strs.length; i++) {
                arr = strs[i].split("=");
                query[arr[0]] = unescape(arr[1]);
            }
        }
        return query;
    };
    WebEnv.prototype.getCookie = function (name) {
        if (document.cookie) {
            var prefix = name + "=";
            var start = document.cookie.indexOf(prefix);
            if (start == -1) {
                return null;
            }
            var end = document.cookie.indexOf(";", start + prefix.length);
            if (end == -1) {
                end = document.cookie.length;
            }
            var value = document.cookie.substring(start + prefix.length, end);
            return unescape(value);
        }
        return "";
    };
    WebEnv.prototype.getAppVersion = function () {
        var appVersion;
        appVersion = this.getCookie("appVersion");
        return appVersion ? (appVersion != "" ? appVersion : this._defaultAppVersion) : this._defaultAppVersion;
    };
    WebEnv.prototype.getApiVersion = function () {
        var apiVersion;
        apiVersion = this.getCookie("apiVersion");
        return apiVersion ? (apiVersion != "" ? apiVersion : this._defaultApiVersion) : this._defaultApiVersion;
    };
    WebEnv.prototype.destroy = function () {
    };
    Object.defineProperty(WebEnv.prototype, "isValid", {
        get: function () {
            return this._envData ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 是否原生模块
     */
    WebEnv.prototype.isNative = function () {
        return CC_JSB;
    };
    /**
     * 获取环境
     */
    WebEnv.prototype.getEnv = function () {
        return this._envData ? this._envData.env : $EEnv.PROD;
    };
    /**
     * 获取来源(来源appid)
     */
    WebEnv.prototype.getSourceId = function () {
        return this._envData ? (this._envData.appId ? this._envData.appId : $ESource.PC) : $ESource.PC;
    };
    /**
     * 获取设备
     */
    WebEnv.prototype.getDevice = function () {
        return this._envData ? this._envData.device.toUpperCase() : $EDevice.PC;
    };
    /**
     * 获取token
     */
    WebEnv.prototype.getToken = function () {
        return this._envData.token;
    };
    /**
     * 获取用户ID
     */
    WebEnv.prototype.getUserId = function () {
        return this._envData.userId;
    };
    WebEnv.prototype.isFat = function () {
        return this._envData.env == $EEnv.FAT || this._envData.env == $EEnv.TEST;
    };
    /**
     * 获取ModuleId
     */
    WebEnv.prototype.getDefaultModuleAsset = function () {
        var moduleCode = this._envData.moduleCode;
        var moduleId = this._envData.moduleId;
        var moduleParam = this._envData.moduleParams;
        var module;
        if (zmg_util.StringUtil.isValid(moduleId)) {
            module = {
                code: zmg_config_mgr.ConfigMgr.getModuleConfigById(parseInt(moduleId)).code,
                auto: zmg_config_mgr.ConfigMgr.getDefaultConfig().auto,
                param: moduleParam
            };
        }
        else if (zmg_util.StringUtil.isValid(moduleCode)) {
            var m = zmg_config_mgr.ConfigMgr.getModuleConfigByCode(moduleCode);
            if (!m) {
                zmg_util.gLog("当前" + moduleCode + "模块未配置，无法进入...");
                return;
            }
            module = {
                code: m.code,
                auto: zmg_config_mgr.ConfigMgr.getDefaultConfig().auto,
                param: moduleParam
            };
        }
        else {
            module = zmg_config_mgr.ConfigMgr.getDefaultConfig();
        }
        return module;
        // if (!StringUtil.isValid(moduleId)) {
        //     moduleCode = ConfigMgr.getDefaultConfig().code;
        // } else {
        // }
        // if (!StringUtil.isValid(moduleCode)) {
        //     moduleCode = ConfigMgr.getDefaultConfig().code;
        // }
        // let module = ConfigMgr.getModuleConfigByCode(moduleCode);
        // return module ? module.id : ConfigMgr.getModuleConfigByCode(ConfigMgr.getDefaultConfig().code).id;
    };
    WebEnv.prototype.getPlatform = function () {
        var device = this.getDevice();
        switch (device) {
            case $EDevice.PC:
                return "pc";
            case $EDevice.MAC:
                return "pc";
            case $EDevice.APAD:
                return "pad";
            case $EDevice.APHONE:
                return "pad";
            case $EDevice.IPHONE:
                return "pad";
            case $EDevice.IPAD:
                return "pad";
            default:
                return "pc";
        }
    };
    WebEnv.prototype.getShopDevice = function () {
        var device = this.getDevice().toUpperCase();
        if (device == "IPHONE") {
            device = "IPAD";
        }
        else if (device == "APHONE") {
            device = "APAD";
        }
        return device;
    };
    return WebEnv;
}(zmg_mgr.BaseMgr));

var _EnvMgr = /** @class */ (function () {
    function _EnvMgr() {
    }
    _EnvMgr.createInstance = function () {
        var env;
        // if (CC_JSB) {
        //     env = new NativeEnv();
        // } else {
        env = new WebEnv();
        // }
        return env;
    };
    _EnvMgr.getInstance = function () {
        if (!this._env) {
            this._env = this.createInstance();
        }
        return this._env;
    };
    return _EnvMgr;
}());

var EEnv = $EEnv;
var ESource = $ESource;
var EDevice = $EDevice;
var EnvMgr = _EnvMgr.getInstance();

exports.EDevice = EDevice;
exports.EEnv = EEnv;
exports.ESource = ESource;
exports.EnvMgr = EnvMgr;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FRW52LnRzIiwiLi4vLi4vLi4vc3JjL0VEZXZpY2UudHMiLCIuLi8uLi8uLi9zcmMvRVNvdXJjZS50cyIsIi4uLy4uLy4uL3NyYy9XZWJFbnYudHMiLCIuLi8uLi8uLi9zcmMvRW52TWdyLnRzIiwiLi4vLi4vLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBlbnVtICRFRW52IHtcclxuICAgIEZBVCA9IFwiZmF0XCIsXHJcbiAgICBURVNUID0gJ3Rlc3QnLFxyXG4gICAgVUFUID0gJ3VhdCcsXHJcbiAgICBQUk9EID0gJ3Byb2QnXHJcbn0iLCJleHBvcnQgZW51bSAkRURldmljZSB7XHJcbiAgICBQQyA9IFwiUENcIixcclxuICAgIE1BQyA9IFwiTUFDXCIsXHJcbiAgICBJUEFEID0gXCJJUEFEXCIsXHJcbiAgICBBUEFEID0gXCJBUEFEXCIsXHJcbiAgICBJUEhPTkUgPSBcIklQSE9ORVwiLFxyXG4gICAgQVBIT05FID0gXCJBUEhPTkVcIlxyXG59IiwiZXhwb3J0IGVudW0gJEVTb3VyY2Uge1xyXG4gICAgLyoqXHJcbiAgICAgKiDlp5zluIVcclxuICAgICAqL1xyXG4gICAgUEMgPSBcIjExNTc0XCIsXHJcbiAgICAvKipcclxuICAgICAqIOmDkeadpei0pFxyXG4gICAgICovXHJcbiAgICBJUEFEID0gXCI1MTNcIixcclxuICAgIC8qKlxyXG4gICAgICog6IOh5pil6aOOXHJcbiAgICAgKi9cclxuICAgIEFQQUQgPSBcIjUyM1wiLFxyXG4gICAgLyoqXHJcbiAgICAgKiDosKLnnJ/nnJ9cclxuICAgICAqL1xyXG4gICAgQU5EUk9JRCA9IFwiNTMzXCIsXHJcbiAgICAvKipcclxuICAgICAqIOmZiOWHr1xyXG4gICAgICovXHJcbiAgICBJUEhPTkUgPSBcIjU0M1wiLFxyXG59XHJcbiIsImltcG9ydCB7ICRFRGV2aWNlIH0gZnJvbSBcIi4vRURldmljZVwiO1xyXG5pbXBvcnQgeyAkRUVudiB9IGZyb20gXCIuL0VFbnZcIjtcclxuaW1wb3J0IHsgJEVTb3VyY2UgfSBmcm9tIFwiLi9FU291cmNlXCI7XHJcbmltcG9ydCB7IGdMb2csIFN0cmluZ1V0aWwsIFRTbG9nIH0gZnJvbSBcInptZ191dGlsXCJcclxuaW1wb3J0IHsgRXZlbnROYW1lIH0gZnJvbSBcInptZ19ldmVudF9tZ3JcIjtcclxuaW1wb3J0IHsgQmFzZU1nciB9IGZyb20gXCJ6bWdfbWdyXCI7XHJcbmltcG9ydCB7IENvbmZpZ01nciB9IGZyb20gXCJ6bWdfY29uZmlnX21nclwiO1xyXG5cclxuaW50ZXJmYWNlIElFbnZEYXRhIHtcclxuICAgIHRva2VuOiBzdHJpbmc7XHJcbiAgICBhcHBJZDogc3RyaW5nO1xyXG4gICAgdXNlcklkOiBzdHJpbmc7XHJcbiAgICBlbnY6IHN0cmluZztcclxuICAgIGRldmljZTogJEVEZXZpY2U7XHJcbiAgICBtb2R1bGVJZDogc3RyaW5nO1xyXG4gICAgbW9kdWxlUGFyYW1zOiBzdHJpbmc7XHJcbiAgICBtb2R1bGVDb2RlOiBzdHJpbmc7XHJcbiAgICBtc2dTZW5kTW9kbGU6IHN0cmluZztcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFdlYkVudiBleHRlbmRzIEJhc2VNZ3IgaW1wbGVtZW50cyB6bWcuSUVudk1nciB7XHJcbiAgICBwcml2YXRlIF9kZWZhdWx0U2VhcmNoOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdEFwcFZlcnNpb246IHN0cmluZyA9IFwiNC4zLjBcIjtcclxuICAgIHByaXZhdGUgX2RlZmF1bHRBcGlWZXJzaW9uOiBzdHJpbmcgPSBcIjQuMy4wXCI7XHJcbiAgICBwcml2YXRlIF9lbnZEYXRhOiBJRW52RGF0YTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0VGVzdERlZmF1bHQodmFsdWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2RlZmF1bHRTZWFyY2ggPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9lbnZEYXRhID0gdGhpcy5nZXRSZXF1ZXN0KHRoaXMuc2VhcmNoKTtcclxuICAgICAgICBUU2xvZy5kb0NvbnNvbGUgPSB0aGlzLmdldEVudigpICE9PSAkRUVudi5QUk9EO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50TmFtZS5FTlZfUkVBRFkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzUEMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGRldmljZTogJEVEZXZpY2UgPSB0aGlzLmdldERldmljZSgpXHJcbiAgICAgICAgcmV0dXJuIGRldmljZSA9PSAkRURldmljZS5QQyB8fCBkZXZpY2UgPT0gJEVEZXZpY2UuTUFDO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzSU9TKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBkZXZpY2U6ICRFRGV2aWNlID0gdGhpcy5nZXREZXZpY2UoKVxyXG4gICAgICAgIHJldHVybiBkZXZpY2UgPT0gJEVEZXZpY2UuSVBIT05FIHx8IGRldmljZSA9PSAkRURldmljZS5JUEFEO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzQW5kcm9pZCgpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgZGV2aWNlOiAkRURldmljZSA9IHRoaXMuZ2V0RGV2aWNlKClcclxuICAgICAgICByZXR1cm4gZGV2aWNlID09ICRFRGV2aWNlLkFQQUQgfHwgZGV2aWNlID09ICRFRGV2aWNlLkFQSE9ORTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc1Rlc3QoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGVudjogJEVFbnYgPSB0aGlzLmdldEVudigpO1xyXG4gICAgICAgIHJldHVybiBlbnYgPT0gJEVFbnYuRkFUIHx8IGVudiA9PSAkRUVudi5URVNUO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0pzYigpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgbXNnID0gY2Muc3lzLmlzTmF0aXZlID8gXCJqc2JcIiA6ICh0aGlzLl9lbnZEYXRhLm1zZ1NlbmRNb2RsZSA/IHRoaXMuX2VudkRhdGEubXNnU2VuZE1vZGxlIDogXCJwb3N0XCIpO1xyXG4gICAgICAgIHJldHVybiBtc2cgPT0gXCJqc2JcIjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNEZWJ1ZygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoQ0NfREVWKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoQ0NfSlNCKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc1Rlc3QoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0UmVxdWVzdCh0aGlzLnNlYXJjaClbJ2RlYnVnJ10gPT0gXCJ0cnVlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAvLyByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHNlYXJjaCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChDQ19KU0IpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRTZWFyY2g7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKFN0cmluZ1V0aWwuaXNWYWxpZCh3aW5kb3cubG9jYXRpb24uc2VhcmNoKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRTZWFyY2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJlcXVlc3QodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXVybCB8fCB1cmwgPT0gXCJcIikge1xyXG4gICAgICAgICAgICByZXR1cm4ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBxdWVyeTogYW55ID0ge307XHJcbiAgICAgICAgdmFyIGk6IG51bWJlcjtcclxuICAgICAgICB2YXIgc3RyOiBzdHJpbmc7XHJcbiAgICAgICAgdmFyIHN0cnM6IHN0cmluZ1tdO1xyXG4gICAgICAgIHZhciBhcnI6IHN0cmluZ1tdO1xyXG4gICAgICAgIGlmICh1cmwuaW5kZXhPZihcIj9cIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgc3RyID0gdXJsLnN1YnN0cigxKTtcclxuICAgICAgICAgICAgc3RycyA9IHN0ci5zcGxpdChcIiZcIik7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzdHJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhcnIgPSBzdHJzW2ldLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICAgICAgICAgIHF1ZXJ5W2FyclswXV0gPSB1bmVzY2FwZShhcnJbMV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBxdWVyeTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRDb29raWUobmFtZSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGRvY3VtZW50LmNvb2tpZSkge1xyXG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gbmFtZSArIFwiPVwiXHJcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKHByZWZpeClcclxuXHJcbiAgICAgICAgICAgIGlmIChzdGFydCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZhciBlbmQgPSBkb2N1bWVudC5jb29raWUuaW5kZXhPZihcIjtcIiwgc3RhcnQgKyBwcmVmaXgubGVuZ3RoKVxyXG4gICAgICAgICAgICBpZiAoZW5kID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICBlbmQgPSBkb2N1bWVudC5jb29raWUubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBkb2N1bWVudC5jb29raWUuc3Vic3RyaW5nKHN0YXJ0ICsgcHJlZml4Lmxlbmd0aCwgZW5kKVxyXG4gICAgICAgICAgICByZXR1cm4gdW5lc2NhcGUodmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBcHBWZXJzaW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGFwcFZlcnNpb246IHN0cmluZztcclxuICAgICAgICBhcHBWZXJzaW9uID0gdGhpcy5nZXRDb29raWUoXCJhcHBWZXJzaW9uXCIpO1xyXG4gICAgICAgIHJldHVybiBhcHBWZXJzaW9uID8gKGFwcFZlcnNpb24gIT0gXCJcIiA/IGFwcFZlcnNpb24gOiB0aGlzLl9kZWZhdWx0QXBwVmVyc2lvbikgOiB0aGlzLl9kZWZhdWx0QXBwVmVyc2lvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBcGlWZXJzaW9uKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGFwaVZlcnNpb246IHN0cmluZztcclxuICAgICAgICBhcGlWZXJzaW9uID0gdGhpcy5nZXRDb29raWUoXCJhcGlWZXJzaW9uXCIpO1xyXG4gICAgICAgIHJldHVybiBhcGlWZXJzaW9uID8gKGFwaVZlcnNpb24gIT0gXCJcIiA/IGFwaVZlcnNpb24gOiB0aGlzLl9kZWZhdWx0QXBpVmVyc2lvbikgOiB0aGlzLl9kZWZhdWx0QXBpVmVyc2lvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZXN0cm95KCkge1xyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW52RGF0YSA/IHRydWUgOiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5Y6f55Sf5qih5Z2XXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpc05hdGl2ZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gQ0NfSlNCO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bnjq/looNcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldEVudigpOiAkRUVudiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudkRhdGEgPyB0aGlzLl9lbnZEYXRhLmVudiBhcyAkRUVudiA6ICRFRW52LlBST0Q7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluadpea6kCjmnaXmupBhcHBpZClcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFNvdXJjZUlkKCk6ICRFU291cmNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZW52RGF0YSA/ICh0aGlzLl9lbnZEYXRhLmFwcElkID8gdGhpcy5fZW52RGF0YS5hcHBJZCBhcyAkRVNvdXJjZSA6ICRFU291cmNlLlBDKSA6ICRFU291cmNlLlBDO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5borr7lpIdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERldmljZSgpOiAkRURldmljZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudkRhdGEgPyB0aGlzLl9lbnZEYXRhLmRldmljZS50b1VwcGVyQ2FzZSgpIGFzICRFRGV2aWNlIDogJEVEZXZpY2UuUEM7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlnRva2VuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRUb2tlbigpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnZEYXRhLnRva2VuO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bnlKjmiLdJRFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VXNlcklkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2VudkRhdGEudXNlcklkO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzRmF0KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9lbnZEYXRhLmVudiA9PSAkRUVudi5GQVQgfHwgdGhpcy5fZW52RGF0YS5lbnYgPT0gJEVFbnYuVEVTVDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+WTW9kdWxlSWRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldERlZmF1bHRNb2R1bGVBc3NldCgpOiB6bWcuSURlZmF1bHRNb2R1bGVBc3NldCB7XHJcbiAgICAgICAgbGV0IG1vZHVsZUNvZGU6IHN0cmluZyA9IHRoaXMuX2VudkRhdGEubW9kdWxlQ29kZTtcclxuICAgICAgICBsZXQgbW9kdWxlSWQ6IHN0cmluZyA9IHRoaXMuX2VudkRhdGEubW9kdWxlSWQ7XHJcbiAgICAgICAgbGV0IG1vZHVsZVBhcmFtOiBzdHJpbmcgPSB0aGlzLl9lbnZEYXRhLm1vZHVsZVBhcmFtcztcclxuICAgICAgICBsZXQgbW9kdWxlOiB6bWcuSURlZmF1bHRNb2R1bGVBc3NldDtcclxuICAgICAgICBpZiAoU3RyaW5nVXRpbC5pc1ZhbGlkKG1vZHVsZUlkKSkge1xyXG4gICAgICAgICAgICBtb2R1bGUgPSB7XHJcbiAgICAgICAgICAgICAgICBjb2RlOiBDb25maWdNZ3IuZ2V0TW9kdWxlQ29uZmlnQnlJZChwYXJzZUludChtb2R1bGVJZCkpLmNvZGUsXHJcbiAgICAgICAgICAgICAgICBhdXRvOiBDb25maWdNZ3IuZ2V0RGVmYXVsdENvbmZpZygpLmF1dG8sXHJcbiAgICAgICAgICAgICAgICBwYXJhbTogbW9kdWxlUGFyYW1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2UgaWYgKFN0cmluZ1V0aWwuaXNWYWxpZChtb2R1bGVDb2RlKSkge1xyXG4gICAgICAgICAgICBsZXQgbSA9IENvbmZpZ01nci5nZXRNb2R1bGVDb25maWdCeUNvZGUobW9kdWxlQ29kZSk7XHJcbiAgICAgICAgICAgIGlmICghbSkge1xyXG4gICAgICAgICAgICAgICAgZ0xvZyhcIuW9k+WJjVwiICsgbW9kdWxlQ29kZSArIFwi5qih5Z2X5pyq6YWN572u77yM5peg5rOV6L+b5YWlLi4uXCIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1vZHVsZSA9IHtcclxuICAgICAgICAgICAgICAgIGNvZGU6IG0uY29kZSxcclxuICAgICAgICAgICAgICAgIGF1dG86IENvbmZpZ01nci5nZXREZWZhdWx0Q29uZmlnKCkuYXV0byxcclxuICAgICAgICAgICAgICAgIHBhcmFtOiBtb2R1bGVQYXJhbVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1vZHVsZSA9IENvbmZpZ01nci5nZXREZWZhdWx0Q29uZmlnKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtb2R1bGU7XHJcbiAgICAgICAgLy8gaWYgKCFTdHJpbmdVdGlsLmlzVmFsaWQobW9kdWxlSWQpKSB7XHJcbiAgICAgICAgLy8gICAgIG1vZHVsZUNvZGUgPSBDb25maWdNZ3IuZ2V0RGVmYXVsdENvbmZpZygpLmNvZGU7XHJcbiAgICAgICAgLy8gfSBlbHNlIHtcclxuXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGlmICghU3RyaW5nVXRpbC5pc1ZhbGlkKG1vZHVsZUNvZGUpKSB7XHJcbiAgICAgICAgLy8gICAgIG1vZHVsZUNvZGUgPSBDb25maWdNZ3IuZ2V0RGVmYXVsdENvbmZpZygpLmNvZGU7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGxldCBtb2R1bGUgPSBDb25maWdNZ3IuZ2V0TW9kdWxlQ29uZmlnQnlDb2RlKG1vZHVsZUNvZGUpO1xyXG4gICAgICAgIC8vIHJldHVybiBtb2R1bGUgPyBtb2R1bGUuaWQgOiBDb25maWdNZ3IuZ2V0TW9kdWxlQ29uZmlnQnlDb2RlKENvbmZpZ01nci5nZXREZWZhdWx0Q29uZmlnKCkuY29kZSkuaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBsYXRmb3JtKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuZ2V0RGV2aWNlKCk7XHJcbiAgICAgICAgc3dpdGNoIChkZXZpY2UpIHtcclxuICAgICAgICAgICAgY2FzZSAkRURldmljZS5QQzpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInBjXCI7XHJcbiAgICAgICAgICAgIGNhc2UgJEVEZXZpY2UuTUFDOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicGNcIjtcclxuICAgICAgICAgICAgY2FzZSAkRURldmljZS5BUEFEOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicGFkXCI7XHJcbiAgICAgICAgICAgIGNhc2UgJEVEZXZpY2UuQVBIT05FOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicGFkXCI7XHJcbiAgICAgICAgICAgIGNhc2UgJEVEZXZpY2UuSVBIT05FOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicGFkXCI7XHJcbiAgICAgICAgICAgIGNhc2UgJEVEZXZpY2UuSVBBRDpcclxuICAgICAgICAgICAgICAgIHJldHVybiBcInBhZFwiO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwicGNcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFNob3BEZXZpY2UoKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgZGV2aWNlOiBzdHJpbmcgPSB0aGlzLmdldERldmljZSgpLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKGRldmljZSA9PSBcIklQSE9ORVwiKSB7XHJcbiAgICAgICAgICAgIGRldmljZSA9IFwiSVBBRFwiO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGV2aWNlID09IFwiQVBIT05FXCIpIHtcclxuICAgICAgICAgICAgZGV2aWNlID0gXCJBUEFEXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBkZXZpY2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBXZWJFbnYgfSBmcm9tIFwiLi9XZWJFbnZcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBfRW52TWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9lbnY6IHptZy5JRW52TWdyO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlSW5zdGFuY2UoKTogem1nLklFbnZNZ3Ige1xyXG4gICAgICAgIGxldCBlbnY6IHptZy5JRW52TWdyO1xyXG4gICAgICAgIC8vIGlmIChDQ19KU0IpIHtcclxuICAgICAgICAvLyAgICAgZW52ID0gbmV3IE5hdGl2ZUVudigpO1xyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgZW52ID0gbmV3IFdlYkVudigpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICByZXR1cm4gZW52O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiB6bWcuSUVudk1nciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9lbnYpIHtcclxuICAgICAgICAgICAgdGhpcy5fZW52ID0gdGhpcy5jcmVhdGVJbnN0YW5jZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fZW52O1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgeyAkRUVudiB9IGZyb20gXCIuL0VFbnZcIjtcclxuaW1wb3J0IHsgX0Vudk1nciB9IGZyb20gXCIuL0Vudk1nclwiO1xyXG5pbXBvcnQgeyAkRURldmljZSB9IGZyb20gXCIuL0VEZXZpY2VcIjtcclxuaW1wb3J0IHsgJEVTb3VyY2UgfSBmcm9tIFwiLi9FU291cmNlXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG5leHBvcnQgbGV0IEVFbnYgPSAkRUVudjtcclxuZXhwb3J0IGxldCBFU291cmNlID0gJEVTb3VyY2U7XHJcbmV4cG9ydCBsZXQgRURldmljZSA9ICRFRGV2aWNlO1xyXG5leHBvcnQgbGV0IEVudk1ncjogem1nLklFbnZNZ3IgPSBfRW52TWdyLmdldEluc3RhbmNlKCk7Il0sIm5hbWVzIjpbIlRTbG9nIiwiRXZlbnROYW1lIiwiU3RyaW5nVXRpbCIsIkNvbmZpZ01nciIsImdMb2ciLCJCYXNlTWdyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxJQUFZLEtBS1g7QUFMRCxXQUFZLEtBQUs7SUFDYixvQkFBVyxDQUFBO0lBQ1gsc0JBQWEsQ0FBQTtJQUNiLG9CQUFXLENBQUE7SUFDWCxzQkFBYSxDQUFBO0FBQ2pCLENBQUMsRUFMVyxLQUFLLEtBQUwsS0FBSzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBakIsSUFBWSxRQU9YO0FBUEQsV0FBWSxRQUFRO0lBQ2hCLHFCQUFTLENBQUE7SUFDVCx1QkFBVyxDQUFBO0lBQ1gseUJBQWEsQ0FBQTtJQUNiLHlCQUFhLENBQUE7SUFDYiw2QkFBaUIsQ0FBQTtJQUNqQiw2QkFBaUIsQ0FBQTtBQUNyQixDQUFDLEVBUFcsUUFBUSxLQUFSLFFBQVE7O0FDQXBCLElBQVksUUFxQlg7QUFyQkQsV0FBWSxRQUFROzs7O0lBSWhCLHdCQUFZLENBQUE7Ozs7SUFJWix3QkFBWSxDQUFBOzs7O0lBSVosd0JBQVksQ0FBQTs7OztJQUlaLDJCQUFlLENBQUE7Ozs7SUFJZiwwQkFBYyxDQUFBO0FBQ2xCLENBQUMsRUFyQlcsUUFBUSxLQUFSLFFBQVE7O0FD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
