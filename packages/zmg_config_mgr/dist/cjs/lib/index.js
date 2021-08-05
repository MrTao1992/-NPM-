'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_res_mgr = require('zmg_res_mgr');
var zmg_util = require('zmg_util');
var zmg_env_mgr = require('zmg_env_mgr');
var zmg_event_mgr = require('zmg_event_mgr');
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

var $ConfigEvent = /** @class */ (function (_super) {
    __extends($ConfigEvent, _super);
    function $ConfigEvent(type) {
        return _super.call(this, type, false) || this;
    }
    $ConfigEvent.ERROR = zmg_event_mgr.EventName.CONFIG_ERROR;
    $ConfigEvent.LOADED = zmg_event_mgr.EventName.CONFIG_LOADED;
    return $ConfigEvent;
}(cc.Event));

var ToolMgr = /** @class */ (function () {
    function ToolMgr() {
    }
    Object.defineProperty(ToolMgr.prototype, "isValid", {
        get: function () {
            return this._data ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    ToolMgr.prototype.parse = function (data) {
        this._data = data ? data : [];
    };
    ToolMgr.prototype.isClose = function (name) {
        var i;
        var len = this._data.length;
        for (i = 0; i < len; i++) {
            if (this._data[i].name == name) {
                return this._data[i].close;
            }
        }
        var item = {
            id: 0,
            name: name,
            displayName: "动态创建",
            close: false
        };
        this._data.push(item);
        return false;
    };
    return ToolMgr;
}());

/**
 * 存放项目描述文件的地址
 */
var TRACK_PATH = "track";
var TOOL_PATH = "tool";
var CONDITION_PATH = "condition";
var CONFIG_PATH = "config";
var MODULE_PATH = 'module';
var UI_PATH = "ui";
var ConfigState;
(function (ConfigState) {
    /**
     * 默认状态
     */
    ConfigState["START"] = "start";
    /**
     * 加载配置表状态
     */
    ConfigState["LOAD"] = "load";
    /**
     * 初始化状态
     */
    ConfigState["INIT"] = "init";
    /**
     * 准备完毕状态
     */
    ConfigState["READY"] = "ready";
})(ConfigState || (ConfigState = {}));
var _ConfigMgr = /** @class */ (function (_super) {
    __extends(_ConfigMgr, _super);
    function _ConfigMgr() {
        return _super.call(this) || this;
    }
    _ConfigMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _ConfigMgr();
        }
        return this._instance;
    };
    Object.defineProperty(_ConfigMgr.prototype, "tool", {
        /**
         *
         * @returns
         */
        get: function () {
            return this._tool;
        },
        enumerable: false,
        configurable: true
    });
    /**
    * 默认启动项
    */
    _ConfigMgr.prototype.getDefaultConfig = function () {
        return this._defaultModule;
    };
    /**
     * 获取视频配置
     */
    _ConfigMgr.prototype.getVideoConfig = function () {
        return this._videoModule;
    };
    /**
     * 获取webview配置
     */
    _ConfigMgr.prototype.getWebviewConfig = function () {
        return this._webviewModule;
    };
    Object.defineProperty(_ConfigMgr.prototype, "bundleFilePath", {
        get: function () {
            return this._bundleFilePath;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_ConfigMgr.prototype, "publishKey", {
        get: function () {
            return this._publishKey;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_ConfigMgr.prototype, "bundlePrefix", {
        get: function () {
            return this._bundlePrefix;
        },
        enumerable: false,
        configurable: true
    });
    /**
    * 模块启动
    * 延迟返回async函数
    */
    _ConfigMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                this._tool = new ToolMgr();
                this._state = ConfigState.START;
                zmg_res_mgr.ResMgr.on(zmg_res_mgr.EResEventName.COMPLETE, this.onResComplete, this, false);
                zmg_res_mgr.ResMgr.on(zmg_res_mgr.EResEventName.ERROR, this.onResError, this, false);
                zmg_res_mgr.ResMgr.loadDir(zmg_res_mgr.SystemBundleName.CONFIG, zmg_env_mgr.EnvMgr.getSourceId().toString(), null, cc.JsonAsset);
                return [2 /*return*/];
            });
        });
    };
    /**
     * 设置加载的bundle地址
     */
    _ConfigMgr.prototype.setConfigMain = function (url, publishKey, bundleFilePath) {
        this._bundlePrefix = url;
        this._publishKey = publishKey;
        this._bundleFilePath = bundleFilePath;
    };
    /**
     * 模块销毁
     */
    _ConfigMgr.prototype.destroy = function () {
        zmg_res_mgr.ResMgr.off(zmg_res_mgr.EResEventName.COMPLETE, this.onResComplete, this);
        zmg_res_mgr.ResMgr.off(zmg_res_mgr.EResEventName.ERROR, this.onResError, this);
        this._state = ConfigState.INIT;
        this._defaultModule = null;
        this._webviewModule = null;
        this._videoModule = null;
        this._appconfig = null;
        this._modules = [];
        _super.prototype.destroy.call(this);
    };
    Object.defineProperty(_ConfigMgr.prototype, "isValid", {
        /**
         * 未准备
         * 已被销毁
         * 则无法使用
         */
        get: function () {
            return this._state == ConfigState.READY;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_ConfigMgr.prototype, "uiconfig", {
        get: function () {
            return this._uiconfig;
        },
        set: function (json) {
            this._uiconfig = json;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_ConfigMgr.prototype, "appconfig", {
        get: function () {
            return this._appconfig;
        },
        set: function (json) {
            zmg_util.gLog("初始化config");
            this._appconfig = json;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_ConfigMgr.prototype, "conditionConfig", {
        get: function () {
            return this._conditionConfig;
        },
        set: function (json) {
            this._conditionConfig = json;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_ConfigMgr.prototype, "trackConfig", {
        get: function () {
            return this._trackConfig;
        },
        set: function (json) {
            this._trackConfig = json;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_ConfigMgr.prototype, "modules", {
        get: function () {
            return this._modules;
        },
        enumerable: false,
        configurable: true
    });
    _ConfigMgr.prototype.setModules = function (json) {
        zmg_util.gLog("初始化module");
        var data = json;
        this._webviewModule = data.webview;
        this._defaultModule = data.main;
        this._videoModule = data.video;
        this._modules = data.modules;
    };
    _ConfigMgr.prototype.getBu = function () {
        return this._appconfig ? this._appconfig.bu : "2";
    };
    _ConfigMgr.prototype.getServerConfig = function (env) {
        var config = this.appconfig;
        if (config) {
            env = env ? env : zmg_env_mgr.EnvMgr.getEnv();
            return config.servers[env];
        }
        return config.servers[zmg_env_mgr.EEnv.PROD];
    };
    _ConfigMgr.prototype.getUseShell = function () {
        return this._appconfig ? this._appconfig.useShell : true;
    };
    _ConfigMgr.prototype.getAppName = function () {
        return this._appconfig ? this._appconfig.appName : "掌门少儿(默认)";
    };
    _ConfigMgr.prototype.getStartModule = function () {
        return null;
    };
    _ConfigMgr.prototype.getAppId = function () {
        return this._appconfig ? this._appconfig.appId : "12584";
    };
    _ConfigMgr.prototype.getTrackConfigByKey = function (key) {
        if (this.trackConfig) {
            for (var index = 0; index < this.trackConfig.length; index++) {
                var element = this.trackConfig[index];
                if (element.key = key) {
                    return element;
                }
            }
        }
        return {
            key: key,
            des: "",
            moduleName: ""
        };
    };
    _ConfigMgr.prototype.getModuleConfigByCode = function (code) {
        code = code.replace(/\s*/g, "");
        code = code.replace("ZM_", "");
        if (code == "Home") {
            code = "House";
        }
        if (this.modules) {
            for (var index = 0; index < this.modules.length; index++) {
                var element = this.modules[index];
                if (element.code == code) {
                    return element;
                }
            }
        }
        return null;
    };
    _ConfigMgr.prototype.getModuleConfigById = function (id) {
        if (this.modules) {
            for (var index = 0; index < this.modules.length; index++) {
                var element = this.modules[index];
                if (element.id == id) {
                    return element;
                }
            }
        }
        return null;
    };
    /**
     * 检查是否所有模块都初始化完毕
     */
    _ConfigMgr.prototype.check = function () {
        var bool = this._appconfig ? true : false;
        bool = bool && (this._uiconfig ? true : false);
        bool = bool && (this._modules ? true : false);
        bool = bool && (this._conditionConfig ? true : false);
        bool = bool && (this._trackConfig ? true : false);
        bool = bool && this._tool.isValid;
        if (bool) {
            this._state = ConfigState.READY;
            zmg_res_mgr.ResMgr.off(zmg_res_mgr.EResEventName.COMPLETE, this.onResComplete, this);
            zmg_res_mgr.ResMgr.off(zmg_res_mgr.EResEventName.ERROR, this.onResError, this);
            zmg_event_mgr.EventMgr.dispatchEvent(new $ConfigEvent(zmg_event_mgr.EventName.CONFIG_READY));
            this.dispatchEvent(new $ConfigEvent(zmg_event_mgr.EventName.READY));
        }
        else {
            zmg_util.gLog("还有资源未初始化完毕");
        }
    };
    _ConfigMgr.prototype.onResComplete = function (evt) {
        var configs = evt.assets;
        var i;
        var cName;
        var len = configs.length;
        for (i = 0; i < len; i++) {
            cName = configs[i].name;
            switch (cName) {
                case CONFIG_PATH:
                    this.appconfig = (configs[i].json);
                    break;
                case MODULE_PATH:
                    this.setModules(configs[i].json);
                    break;
                case UI_PATH:
                    this.uiconfig = (configs[i].json);
                    break;
                case CONDITION_PATH:
                    this.conditionConfig = (configs[i].json);
                    break;
                case TRACK_PATH:
                    this.trackConfig = (configs[i].json);
                    break;
                case TOOL_PATH:
                    this._tool.parse(configs[i].json);
                    break;
            }
        }
        this.dispatchEvent(new $ConfigEvent($ConfigEvent.LOADED));
        this.check();
    };
    _ConfigMgr.prototype.setOnlineModuleConfig = function (response) {
        var i;
        var len = response.studyParkModuleConfigs.length;
        for (i = 0; i < len; i++) {
            var item = this.getModuleConfigByCode(response.studyParkModuleConfigs[i].code);
            if (item) {
                item.main.param = {
                    zipUrl: response.studyParkModuleConfigs[i].manifest,
                    onlineUrl: response.studyParkModuleConfigs[i].onlineUrl,
                    version: response.studyParkModuleConfigs[i].version,
                    isclose: !response.studyParkModuleConfigs[i].moduleSwitch
                };
            }
        }
    };
    _ConfigMgr.prototype.onResError = function (evt) {
        var cevt = new $ConfigEvent($ConfigEvent.ERROR);
        cevt.path = evt.errorPath;
        this.dispatchEvent(cevt);
    };
    return _ConfigMgr;
}(zmg_mgr.BaseMgr));

(function ($EModuleType) {
    $EModuleType["SCENE"] = "scene";
    $EModuleType["PREFAB"] = "prefab";
    $EModuleType["IFRAME"] = "iframe";
})(exports.$EModuleType || (exports.$EModuleType = {}));

var ConfigMgr = _ConfigMgr.getInstance();

exports.$ConfigEvent = $ConfigEvent;
exports.ConfigMgr = ConfigMgr;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9ldmVudHMvQ29uZmlnRXZlbnQudHMiLCIuLi8uLi8uLi9zcmMvVG9vbE1nci50cyIsIi4uLy4uLy4uL3NyYy9Db25maWdNZ3IudHMiLCIuLi8uLi8uLi9zcmMvY29uZmlnL0VNb2R1bGVUeXBlLnRzIiwiLi4vLi4vLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50TmFtZSB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XG5cbmV4cG9ydCBjbGFzcyAkQ29uZmlnRXZlbnQgZXh0ZW5kcyBjYy5FdmVudCB7XG4gICAgc3RhdGljIEVSUk9SOiBzdHJpbmcgPSBFdmVudE5hbWUuQ09ORklHX0VSUk9SO1xuICAgIHN0YXRpYyBMT0FERUQ6IHN0cmluZyA9IEV2ZW50TmFtZS5DT05GSUdfTE9BREVEO1xuXG4gICAgcHVibGljIHBhdGg6IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHR5cGUsIGZhbHNlKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQmFzZU1nciB9IGZyb20gXCJ6bWdfbWdyXCI7XG5pbXBvcnQgeyBSZXNNZ3IgfSBmcm9tIFwiem1nX3Jlc19tZ3JcIjtcblxuZXhwb3J0IGNsYXNzIFRvb2xNZ3Ige1xuICAgIHByaXZhdGUgX2RhdGE6IHptZy5JQ29uZmlnVG9vbFtdO1xuICAgIHB1YmxpYyBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuICAgIHBhcnNlKGRhdGE6IHptZy5JQ29uZmlnVG9vbFtdKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhID8gZGF0YSA6IFtdO1xuICAgIH1cblxuICAgIHB1YmxpYyBpc0Nsb3NlKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgaTogbnVtYmVyO1xuICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSB0aGlzLl9kYXRhLmxlbmd0aDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fZGF0YVtpXS5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtpXS5jbG9zZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgaXRlbTogem1nLklDb25maWdUb29sID0ge1xuICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IFwi5Yqo5oCB5Yib5bu6XCIsXG4gICAgICAgICAgICBjbG9zZTogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fZGF0YS5wdXNoKGl0ZW0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufSIsImltcG9ydCB7IFN5c3RlbUJ1bmRsZU5hbWUsIEVSZXNFdmVudE5hbWUsIFJlc0V2ZW50LCBSZXNNZ3IgfSBmcm9tIFwiem1nX3Jlc19tZ3JcIlxyXG5pbXBvcnQgeyBnTG9nIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7IEVudk1nciwgRUVudiB9IGZyb20gXCJ6bWdfZW52X21nclwiO1xyXG5pbXBvcnQgeyBFdmVudE1nciwgRXZlbnROYW1lIH0gZnJvbSBcInptZ19ldmVudF9tZ3JcIjtcclxuaW1wb3J0IHsgQmFzZU1nciB9IGZyb20gXCJ6bWdfbWdyXCI7XHJcbmltcG9ydCB7ICRDb25maWdFdmVudCB9IGZyb20gXCIuL2V2ZW50cy9Db25maWdFdmVudFwiO1xyXG5pbXBvcnQgeyBUb29sTWdyIH0gZnJvbSBcIi4vVG9vbE1nclwiO1xyXG4vKipcclxuICog5a2Y5pS+6aG555uu5o+P6L+w5paH5Lu255qE5Zyw5Z2AXHJcbiAqL1xyXG5jb25zdCBUUkFDS19QQVRIID0gXCJ0cmFja1wiXHJcbmNvbnN0IFRPT0xfUEFUSCA9IFwidG9vbFwiXHJcbmNvbnN0IENPTkRJVElPTl9QQVRIID0gXCJjb25kaXRpb25cIjtcclxuY29uc3QgQ09ORklHX1BBVEggPSBcImNvbmZpZ1wiO1xyXG5jb25zdCBNT0RVTEVfUEFUSCA9ICdtb2R1bGUnO1xyXG5jb25zdCBVSV9QQVRIID0gXCJ1aVwiO1xyXG5cclxuXHJcbmVudW0gQ29uZmlnU3RhdGUge1xyXG4gICAgLyoqXHJcbiAgICAgKiDpu5jorqTnirbmgIFcclxuICAgICAqL1xyXG4gICAgU1RBUlQgPSBcInN0YXJ0XCIsXHJcbiAgICAvKipcclxuICAgICAqIOWKoOi9vemFjee9ruihqOeKtuaAgVxyXG4gICAgICovXHJcbiAgICBMT0FEID0gXCJsb2FkXCIsXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMlueKtuaAgVxyXG4gICAgICovXHJcbiAgICBJTklUID0gXCJpbml0XCIsXHJcbiAgICAvKipcclxuICAgICAqIOWHhuWkh+WujOavleeKtuaAgVxyXG4gICAgICovXHJcbiAgICBSRUFEWSA9IFwicmVhZHlcIlxyXG59XHJcbmV4cG9ydCBjbGFzcyBfQ29uZmlnTWdyIGV4dGVuZHMgQmFzZU1nciBpbXBsZW1lbnRzIHptZy5JQ29uZmlnTWdyIHtcclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IF9Db25maWdNZ3I7XHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogX0NvbmZpZ01nciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfQ29uZmlnTWdyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF90b29sOiBUb29sTWdyO1xyXG4gICAgcHJpdmF0ZSBfc3RhdGU6IENvbmZpZ1N0YXRlO1xyXG4gICAgcHJpdmF0ZSBfdWljb25maWc6IHptZy5JVUlDb25maWc7XHJcbiAgICBwcml2YXRlIF9hcHBjb25maWc6IHptZy5JQXBwQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfZGVmYXVsdE1vZHVsZTogem1nLklEZWZhdWx0TW9kdWxlQXNzZXQ7XHJcbiAgICBwcml2YXRlIF92aWRlb01vZHVsZTogem1nLklWaWRlb0Fzc2V0O1xyXG4gICAgcHJpdmF0ZSBfd2Vidmlld01vZHVsZTogem1nLklWaWRlb0Fzc2V0O1xyXG4gICAgcHJpdmF0ZSBfY29uZGl0aW9uQ29uZmlnOiB6bWcuSUNvbmRpdGlvbkNvbmZpZ1tdO1xyXG4gICAgcHJpdmF0ZSBfdHJhY2tDb25maWc6IHptZy5JVHJhY2NrQ29uZmlnW11cclxuICAgIHByaXZhdGUgX21vZHVsZXM6IHptZy5JTW9kdWxlQ29uZmlnW107XHJcbiAgICBwcml2YXRlIF9wdWJsaXNoS2V5OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9idW5kbGVGaWxlUGF0aDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfYnVuZGxlUHJlZml4OiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHJldHVybnMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgdG9vbCgpOiBUb29sTWdyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdG9vbDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiDpu5jorqTlkK/liqjpoblcclxuICAgICovXHJcbiAgICBwdWJsaWMgZ2V0RGVmYXVsdENvbmZpZygpOiB6bWcuSURlZmF1bHRNb2R1bGVBc3NldCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmF1bHRNb2R1bGU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluinhumikemFjee9rlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0VmlkZW9Db25maWcoKTogem1nLklWaWRlb0Fzc2V0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmlkZW9Nb2R1bGVcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+Wd2Vidmlld+mFjee9rlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0V2Vidmlld0NvbmZpZygpOiB6bWcuSVdlYlZpZXdBc3NldCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlYnZpZXdNb2R1bGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGJ1bmRsZUZpbGVQYXRoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1bmRsZUZpbGVQYXRoO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBwdWJsaXNoS2V5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3B1Ymxpc2hLZXk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGJ1bmRsZVByZWZpeCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idW5kbGVQcmVmaXg7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICog5qih5Z2X5ZCv5YqoXHJcbiAgICAqIOW7tui/n+i/lOWbnmFzeW5j5Ye95pWwXHJcbiAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5fdG9vbCA9IG5ldyBUb29sTWdyKCk7XHJcbiAgICAgICAgdGhpcy5fc3RhdGUgPSBDb25maWdTdGF0ZS5TVEFSVDtcclxuICAgICAgICBSZXNNZ3Iub24oRVJlc0V2ZW50TmFtZS5DT01QTEVURSwgdGhpcy5vblJlc0NvbXBsZXRlLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgUmVzTWdyLm9uKEVSZXNFdmVudE5hbWUuRVJST1IsIHRoaXMub25SZXNFcnJvciwgdGhpcywgZmFsc2UpO1xyXG4gICAgICAgIFJlc01nci5sb2FkRGlyKFN5c3RlbUJ1bmRsZU5hbWUuQ09ORklHLCBFbnZNZ3IuZ2V0U291cmNlSWQoKS50b1N0cmluZygpLCBudWxsLCBjYy5Kc29uQXNzZXQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDorr7nva7liqDovb3nmoRidW5kbGXlnLDlnYBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldENvbmZpZ01haW4odXJsOiBzdHJpbmcsIHB1Ymxpc2hLZXk6IHN0cmluZywgYnVuZGxlRmlsZVBhdGg6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2J1bmRsZVByZWZpeCA9IHVybDtcclxuICAgICAgICB0aGlzLl9wdWJsaXNoS2V5ID0gcHVibGlzaEtleTtcclxuICAgICAgICB0aGlzLl9idW5kbGVGaWxlUGF0aCA9IGJ1bmRsZUZpbGVQYXRoO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmqKHlnZfplIDmr4FcclxuICAgICAqL1xyXG4gICAgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBSZXNNZ3Iub2ZmKEVSZXNFdmVudE5hbWUuQ09NUExFVEUsIHRoaXMub25SZXNDb21wbGV0ZSwgdGhpcyk7XHJcbiAgICAgICAgUmVzTWdyLm9mZihFUmVzRXZlbnROYW1lLkVSUk9SLCB0aGlzLm9uUmVzRXJyb3IsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMuX3N0YXRlID0gQ29uZmlnU3RhdGUuSU5JVDtcclxuICAgICAgICB0aGlzLl9kZWZhdWx0TW9kdWxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl93ZWJ2aWV3TW9kdWxlID0gbnVsbDtcclxuICAgICAgICB0aGlzLl92aWRlb01vZHVsZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fYXBwY29uZmlnID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9tb2R1bGVzID0gW107XHJcbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmnKrlh4blpIdcclxuICAgICAqIOW3suiiq+mUgOavgVxyXG4gICAgICog5YiZ5peg5rOV5L2/55SoXHJcbiAgICAgKi9cclxuICAgIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZSA9PSBDb25maWdTdGF0ZS5SRUFEWTtcclxuICAgIH1cclxuICAgIGdldCB1aWNvbmZpZygpOiB6bWcuSVVJQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdWljb25maWc7XHJcbiAgICB9XHJcbiAgICBnZXQgYXBwY29uZmlnKCk6IHptZy5JQXBwQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXBwY29uZmlnO1xyXG4gICAgfVxyXG4gICAgZ2V0IGNvbmRpdGlvbkNvbmZpZygpOiB6bWcuSUNvbmRpdGlvbkNvbmZpZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZGl0aW9uQ29uZmlnO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0cmFja0NvbmZpZygpOiB6bWcuSVRyYWNja0NvbmZpZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdHJhY2tDb25maWdcclxuICAgIH1cclxuXHJcbiAgICBnZXQgbW9kdWxlcygpOiB6bWcuSU1vZHVsZUNvbmZpZ1tdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbW9kdWxlc1xyXG4gICAgfVxyXG5cclxuICAgIHNldCBhcHBjb25maWcoanNvbjogem1nLklBcHBDb25maWcpIHtcclxuICAgICAgICBnTG9nKFwi5Yid5aeL5YyWY29uZmlnXCIpO1xyXG4gICAgICAgIHRoaXMuX2FwcGNvbmZpZyA9IGpzb247XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TW9kdWxlcyhqc29uOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBnTG9nKFwi5Yid5aeL5YyWbW9kdWxlXCIpO1xyXG4gICAgICAgIGxldCBkYXRhID0ganNvbjtcclxuICAgICAgICB0aGlzLl93ZWJ2aWV3TW9kdWxlID0gZGF0YS53ZWJ2aWV3O1xyXG4gICAgICAgIHRoaXMuX2RlZmF1bHRNb2R1bGUgPSBkYXRhLm1haW47XHJcbiAgICAgICAgdGhpcy5fdmlkZW9Nb2R1bGUgPSBkYXRhLnZpZGVvO1xyXG4gICAgICAgIHRoaXMuX21vZHVsZXMgPSBkYXRhLm1vZHVsZXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHVpY29uZmlnKGpzb246IHptZy5JVUlDb25maWcpIHtcclxuICAgICAgICB0aGlzLl91aWNvbmZpZyA9IGpzb247XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IGNvbmRpdGlvbkNvbmZpZyhqc29uOiB6bWcuSUNvbmRpdGlvbkNvbmZpZ1tdKSB7XHJcbiAgICAgICAgdGhpcy5fY29uZGl0aW9uQ29uZmlnID0ganNvbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXQgdHJhY2tDb25maWcoanNvbjogem1nLklUcmFjY2tDb25maWdbXSkge1xyXG4gICAgICAgIHRoaXMuX3RyYWNrQ29uZmlnID0ganNvbjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRCdSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBjb25maWcgPyB0aGlzLl9hcHBjb25maWcuYnUgOiBcIjJcIjtcclxuICAgIH1cclxuXHJcbiAgICBnZXRTZXJ2ZXJDb25maWcoZW52Pzogc3RyaW5nKTogem1nLklTZXJ2ZXJDb25maWcge1xyXG4gICAgICAgIGxldCBjb25maWc6IHptZy5JQXBwQ29uZmlnID0gdGhpcy5hcHBjb25maWc7XHJcbiAgICAgICAgaWYgKGNvbmZpZykge1xyXG4gICAgICAgICAgICBlbnYgPSBlbnYgPyBlbnYgOiBFbnZNZ3IuZ2V0RW52KCk7XHJcbiAgICAgICAgICAgIHJldHVybiBjb25maWcuc2VydmVyc1tlbnZdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29uZmlnLnNlcnZlcnNbRUVudi5QUk9EXTtcclxuICAgIH1cclxuICAgIGdldFVzZVNoZWxsKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBjb25maWcgPyB0aGlzLl9hcHBjb25maWcudXNlU2hlbGwgOiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFwcE5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYXBwY29uZmlnID8gdGhpcy5fYXBwY29uZmlnLmFwcE5hbWUgOiBcIuaOjOmXqOWwkeWEvyjpu5jorqQpXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3RhcnRNb2R1bGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBcHBJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hcHBjb25maWcgPyB0aGlzLl9hcHBjb25maWcuYXBwSWQgOiBcIjEyNTg0XCI7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VHJhY2tDb25maWdCeUtleShrZXk6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLnRyYWNrQ29uZmlnKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLnRyYWNrQ29uZmlnLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMudHJhY2tDb25maWdbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQua2V5ID0ga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAga2V5OiBrZXksXHJcbiAgICAgICAgICAgIGRlczogXCJcIixcclxuICAgICAgICAgICAgbW9kdWxlTmFtZTogXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRNb2R1bGVDb25maWdCeUNvZGUoY29kZTogc3RyaW5nKTogem1nLklNb2R1bGVDb25maWcge1xyXG4gICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UoL1xccyovZywgXCJcIik7XHJcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShcIlpNX1wiLCBcIlwiKTtcclxuICAgICAgICBpZiAoY29kZSA9PSBcIkhvbWVcIikge1xyXG4gICAgICAgICAgICBjb2RlID0gXCJIb3VzZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tb2R1bGVzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLm1vZHVsZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5tb2R1bGVzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmNvZGUgPT0gY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGdldE1vZHVsZUNvbmZpZ0J5SWQoaWQ6IG51bWJlcik6IHptZy5JTW9kdWxlQ29uZmlnIHtcclxuICAgICAgICBpZiAodGhpcy5tb2R1bGVzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCB0aGlzLm1vZHVsZXMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5tb2R1bGVzW2luZGV4XTtcclxuICAgICAgICAgICAgICAgIGlmIChlbGVtZW50LmlkID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4Dmn6XmmK/lkKbmiYDmnInmqKHlnZfpg73liJ3lp4vljJblrozmr5VcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjaGVjaygpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYm9vbCA9IHRoaXMuX2FwcGNvbmZpZyA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgICBib29sID0gYm9vbCAmJiAodGhpcy5fdWljb25maWcgPyB0cnVlIDogZmFsc2UpO1xyXG4gICAgICAgIGJvb2wgPSBib29sICYmICh0aGlzLl9tb2R1bGVzID8gdHJ1ZSA6IGZhbHNlKTtcclxuICAgICAgICBib29sID0gYm9vbCAmJiAodGhpcy5fY29uZGl0aW9uQ29uZmlnID8gdHJ1ZSA6IGZhbHNlKTtcclxuICAgICAgICBib29sID0gYm9vbCAmJiAodGhpcy5fdHJhY2tDb25maWcgPyB0cnVlIDogZmFsc2UpO1xyXG4gICAgICAgIGJvb2wgPSBib29sICYmIHRoaXMuX3Rvb2wuaXNWYWxpZDtcclxuICAgICAgICBpZiAoYm9vbCkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGF0ZSA9IENvbmZpZ1N0YXRlLlJFQURZO1xyXG4gICAgICAgICAgICBSZXNNZ3Iub2ZmKEVSZXNFdmVudE5hbWUuQ09NUExFVEUsIHRoaXMub25SZXNDb21wbGV0ZSwgdGhpcyk7XHJcbiAgICAgICAgICAgIFJlc01nci5vZmYoRVJlc0V2ZW50TmFtZS5FUlJPUiwgdGhpcy5vblJlc0Vycm9yLCB0aGlzKTtcclxuICAgICAgICAgICAgRXZlbnRNZ3IuZGlzcGF0Y2hFdmVudChuZXcgJENvbmZpZ0V2ZW50KEV2ZW50TmFtZS5DT05GSUdfUkVBRFkpKTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyAkQ29uZmlnRXZlbnQoRXZlbnROYW1lLlJFQURZKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ0xvZyhcIui/mOaciei1hOa6kOacquWIneWni+WMluWujOavlVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblJlc0NvbXBsZXRlKGV2dDogUmVzRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY29uZmlnczogY2MuSnNvbkFzc2V0W10gPSBldnQuYXNzZXRzIGFzIGNjLkpzb25Bc3NldFtdO1xyXG4gICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGNOYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gY29uZmlncy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNOYW1lID0gY29uZmlnc1tpXS5uYW1lO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGNOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIENPTkZJR19QQVRIOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwY29uZmlnID0gKGNvbmZpZ3NbaV0uanNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIE1PRFVMRV9QQVRIOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TW9kdWxlcyhjb25maWdzW2ldLmpzb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBVSV9QQVRIOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudWljb25maWcgPSAoY29uZmlnc1tpXS5qc29uKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgQ09ORElUSU9OX1BBVEg6XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25kaXRpb25Db25maWcgPSAoY29uZmlnc1tpXS5qc29uKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVFJBQ0tfUEFUSDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYWNrQ29uZmlnID0gKGNvbmZpZ3NbaV0uanNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFRPT0xfUEFUSDpcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl90b29sLnBhcnNlKGNvbmZpZ3NbaV0uanNvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgJENvbmZpZ0V2ZW50KCRDb25maWdFdmVudC5MT0FERUQpKTtcclxuICAgICAgICB0aGlzLmNoZWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldE9ubGluZU1vZHVsZUNvbmZpZyhyZXNwb25zZTogem1nLklTdHVkeVBhcmtDb25maWdJbmYpIHtcclxuICAgICAgICB2YXIgaTogbnVtYmVyO1xyXG4gICAgICAgIHZhciBsZW46IG51bWJlciA9IHJlc3BvbnNlLnN0dWR5UGFya01vZHVsZUNvbmZpZ3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbTogem1nLklNb2R1bGVDb25maWcgPSB0aGlzLmdldE1vZHVsZUNvbmZpZ0J5Q29kZShyZXNwb25zZS5zdHVkeVBhcmtNb2R1bGVDb25maWdzW2ldLmNvZGUpO1xyXG4gICAgICAgICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5tYWluLnBhcmFtID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHppcFVybDogcmVzcG9uc2Uuc3R1ZHlQYXJrTW9kdWxlQ29uZmlnc1tpXS5tYW5pZmVzdCxcclxuICAgICAgICAgICAgICAgICAgICBvbmxpbmVVcmw6IHJlc3BvbnNlLnN0dWR5UGFya01vZHVsZUNvbmZpZ3NbaV0ub25saW5lVXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHZlcnNpb246IHJlc3BvbnNlLnN0dWR5UGFya01vZHVsZUNvbmZpZ3NbaV0udmVyc2lvbixcclxuICAgICAgICAgICAgICAgICAgICBpc2Nsb3NlOiAhcmVzcG9uc2Uuc3R1ZHlQYXJrTW9kdWxlQ29uZmlnc1tpXS5tb2R1bGVTd2l0Y2hcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUmVzRXJyb3IoZXZ0OiBSZXNFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjZXZ0OiAkQ29uZmlnRXZlbnQgPSBuZXcgJENvbmZpZ0V2ZW50KCRDb25maWdFdmVudC5FUlJPUik7XHJcbiAgICAgICAgY2V2dC5wYXRoID0gZXZ0LmVycm9yUGF0aDtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoY2V2dCk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gJEVNb2R1bGVUeXBlIHtcclxuICAgIFNDRU5FID0gXCJzY2VuZVwiLFxyXG4gICAgUFJFRkFCID0gXCJwcmVmYWJcIixcclxuICAgIElGUkFNRSA9IFwiaWZyYW1lXCJcclxufSIsImV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHsgX0NvbmZpZ01nciB9IGZyb20gXCIuL0NvbmZpZ01nclwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9ldmVudHMvQ29uZmlnRXZlbnRcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vY29uZmlnL0VNb2R1bGVUeXBlXCI7XHJcblxyXG5leHBvcnQgbGV0IENvbmZpZ01nciA9IF9Db25maWdNZ3IuZ2V0SW5zdGFuY2UoKTsiXSwibmFtZXMiOlsiRXZlbnROYW1lIiwiUmVzTWdyIiwiRVJlc0V2ZW50TmFtZSIsIlN5c3RlbUJ1bmRsZU5hbWUiLCJFbnZNZ3IiLCJnTG9nIiwiRUVudiIsIkV2ZW50TWdyIiwiQmFzZU1nciIsIiRFTW9kdWxlVHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFa0MsZ0NBQVE7SUFNdEMsc0JBQVksSUFBWTtlQUNwQixrQkFBTSxJQUFJLEVBQUUsS0FBSyxDQUFDO0tBQ3JCO0lBUE0sa0JBQUssR0FBV0EsdUJBQVMsQ0FBQyxZQUFZLENBQUM7SUFDdkMsbUJBQU0sR0FBV0EsdUJBQVMsQ0FBQyxhQUFhLENBQUM7SUFPcEQsbUJBQUM7Q0FURCxDQUFrQyxFQUFFLENBQUMsS0FBSzs7QUNDMUM7SUFBQTtLQTBCQztJQXhCRyxzQkFBVyw0QkFBTzthQUFsQjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ3BDOzs7T0FBQTtJQUNELHVCQUFLLEdBQUwsVUFBTSxJQUF1QjtRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0tBQ2pDO0lBRU0seUJBQU8sR0FBZCxVQUFlLElBQVk7UUFDdkIsSUFBSSxDQUFTLENBQUM7UUFDZCxJQUFJLEdBQUcsR0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNwQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQzthQUM5QjtTQUNKO1FBQ0QsSUFBSSxJQUFJLEdBQW9CO1lBQ3hCLEVBQUUsRUFBRSxDQUFDO1lBQ0wsSUFBSSxFQUFFLElBQUk7WUFDVixXQUFXLEVBQUUsTUFBTTtZQUNuQixLQUFLLEVBQUUsS0FBSztTQUNmLENBQUM7UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixPQUFPLEtBQUssQ0FBQztLQUNoQjtJQUNMLGNBQUM7QUFBRCxDQUFDOztBQ3RCRDs7O0FBR0EsSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFBO0FBQzFCLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQTtBQUN4QixJQUFNLGNBQWMsR0FBRyxXQUFXLENBQUM7QUFDbkMsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDO0FBQzdCLElBQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQztBQUM3QixJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFHckIsSUFBSyxXQWlCSjtBQWpCRCxXQUFLLFdBQVc7Ozs7SUFJWiw4QkFBZSxDQUFBOzs7O0lBSWYsNEJBQWEsQ0FBQTs7OztJQUliLDRCQUFhLENBQUE7Ozs7SUFJYiw4QkFBZSxDQUFBO0FBQ25CLENBQUMsRUFqQkksV0FBVyxLQUFYLFdBQVcsUUFpQmY7QUFDRDtJQUFnQyw4QkFBTztJQVNuQztlQUNJLGlCQUFPO0tBQ1Y7SUFSTSxzQkFBVyxHQUFsQjtRQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQztTQUNyQztRQUNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN6QjtJQXFCRCxzQkFBVyw0QkFBSTs7Ozs7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNyQjs7O09BQUE7Ozs7SUFJTSxxQ0FBZ0IsR0FBdkI7UUFDSSxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7S0FDOUI7Ozs7SUFJTSxtQ0FBYyxHQUFyQjtRQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQTtLQUMzQjs7OztJQUlNLHFDQUFnQixHQUF2QjtRQUNJLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztLQUM5QjtJQUNELHNCQUFXLHNDQUFjO2FBQXpCO1lBQ0ksT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQy9COzs7T0FBQTtJQUNELHNCQUFXLGtDQUFVO2FBQXJCO1lBQ0ksT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzNCOzs7T0FBQTtJQUNELHNCQUFXLG9DQUFZO2FBQXZCO1lBQ0ksT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzdCOzs7T0FBQTs7Ozs7SUFLWSwwQkFBSyxHQUFsQjs7O2dCQUNJLGlCQUFNLEtBQUssV0FBRSxDQUFDO2dCQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO2dCQUNoQ0Msa0JBQU0sQ0FBQyxFQUFFLENBQUNDLHlCQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNuRUQsa0JBQU0sQ0FBQyxFQUFFLENBQUNDLHlCQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUM3REQsa0JBQU0sQ0FBQyxPQUFPLENBQUNFLDRCQUFnQixDQUFDLE1BQU0sRUFBRUMsa0JBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7O0tBQ2hHOzs7O0lBSU0sa0NBQWEsR0FBcEIsVUFBcUIsR0FBVyxFQUFFLFVBQWtCLEVBQUUsY0FBc0I7UUFDeEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7S0FDekM7Ozs7SUFJRCw0QkFBTyxHQUFQO1FBQ0lILGtCQUFNLENBQUMsR0FBRyxDQUFDQyx5QkFBYSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzdERCxrQkFBTSxDQUFDLEdBQUcsQ0FBQ0MseUJBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbkIsaUJBQU0sT0FBTyxXQUFFLENBQUM7S0FDbkI7SUFNRCxzQkFBSSwrQkFBTzs7Ozs7O2FBQVg7WUFDSSxPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQztTQUMzQzs7O09BQUE7SUFDRCxzQkFBSSxnQ0FBUTthQUFaO1lBQ0ksT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ3pCO2FBOEJELFVBQWEsSUFBbUI7WUFDNUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7U0FDekI7OztPQWhDQTtJQUNELHNCQUFJLGlDQUFTO2FBQWI7WUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDMUI7YUFhRCxVQUFjLElBQW9CO1lBQzlCRyxhQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDMUI7OztPQWhCQTtJQUNELHNCQUFJLHVDQUFlO2FBQW5CO1lBQ0ksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDaEM7YUE0QkQsVUFBb0IsSUFBNEI7WUFDNUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztTQUNoQzs7O09BOUJBO0lBRUQsc0JBQUksbUNBQVc7YUFBZjtZQUNJLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQTtTQUMzQjthQTRCRCxVQUFnQixJQUF5QjtZQUNyQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztTQUM1Qjs7O09BOUJBO0lBRUQsc0JBQUksK0JBQU87YUFBWDtZQUNJLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtTQUN2Qjs7O09BQUE7SUFPRCwrQkFBVSxHQUFWLFVBQVcsSUFBUztRQUNoQkEsYUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDbkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7S0FDaEM7SUFjRCwwQkFBSyxHQUFMO1FBQ0ksT0FBTyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztLQUNyRDtJQUVELG9DQUFlLEdBQWYsVUFBZ0IsR0FBWTtRQUN4QixJQUFJLE1BQU0sR0FBbUIsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM1QyxJQUFJLE1BQU0sRUFBRTtZQUNSLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHRCxrQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xDLE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM5QjtRQUNELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQ0UsZ0JBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwQztJQUNELGdDQUFXLEdBQVg7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0tBQzVEO0lBRUQsK0JBQVUsR0FBVjtRQUNJLE9BQU8sSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7S0FDakU7SUFFRCxtQ0FBYyxHQUFkO1FBQ0ksT0FBTyxJQUFJLENBQUM7S0FDZjtJQUVELDZCQUFRLEdBQVI7UUFDSSxPQUFPLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDO0tBQzVEO0lBRUQsd0NBQW1CLEdBQW5CLFVBQW9CLEdBQVc7UUFDM0IsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDMUQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEMsSUFBSSxPQUFPLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRTtvQkFDbkIsT0FBTyxPQUFPLENBQUM7aUJBQ2xCO2FBQ0o7U0FDSjtRQUNELE9BQU87WUFDSCxHQUFHLEVBQUUsR0FBRztZQUNSLEdBQUcsRUFBRSxFQUFFO1lBQ1AsVUFBVSxFQUFFLEVBQUU7U0FDakIsQ0FBQTtLQUNKO0lBRUQsMENBQXFCLEdBQXJCLFVBQXNCLElBQVk7UUFDOUIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7WUFDaEIsSUFBSSxHQUFHLE9BQU8sQ0FBQztTQUNsQjtRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNkLEtBQUssSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDdEQsSUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtvQkFDdEIsT0FBTyxPQUFPLENBQUM7aUJBQ2xCO2FBQ0o7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCx3Q0FBbUIsR0FBbkIsVUFBb0IsRUFBVTtRQUMxQixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ3RELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BDLElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUU7b0JBQ2xCLE9BQU8sT0FBTyxDQUFDO2lCQUNsQjthQUNKO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztLQUNmOzs7O0lBS08sMEJBQUssR0FBYjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUMxQyxJQUFJLEdBQUcsSUFBSSxLQUFLLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQy9DLElBQUksR0FBRyxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDOUMsSUFBSSxHQUFHLElBQUksS0FBSyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3RELElBQUksR0FBRyxJQUFJLEtBQUssSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDbEQsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNsQyxJQUFJLElBQUksRUFBRTtZQUNOLElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztZQUNoQ0wsa0JBQU0sQ0FBQyxHQUFHLENBQUNDLHlCQUFhLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0RELGtCQUFNLENBQUMsR0FBRyxDQUFDQyx5QkFBYSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3ZESyxzQkFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFlBQVksQ0FBQ1AsdUJBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxZQUFZLENBQUNBLHVCQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN6RDthQUFNO1lBQ0hLLGFBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUN0QjtLQUNKO0lBRU8sa0NBQWEsR0FBckIsVUFBc0IsR0FBYTtRQUMvQixJQUFJLE9BQU8sR0FBbUIsR0FBRyxDQUFDLE1BQXdCLENBQUM7UUFDM0QsSUFBSSxDQUFTLENBQUM7UUFDZCxJQUFJLEtBQWEsQ0FBQztRQUNsQixJQUFJLEdBQUcsR0FBVyxPQUFPLENBQUMsTUFBTSxDQUFDO1FBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RCLEtBQUssR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3hCLFFBQVEsS0FBSztnQkFDVCxLQUFLLFdBQVc7b0JBQ1osSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLE1BQU07Z0JBQ1YsS0FBSyxXQUFXO29CQUNaLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNqQyxNQUFNO2dCQUNWLEtBQUssT0FBTztvQkFDUixJQUFJLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsTUFBTTtnQkFDVixLQUFLLGNBQWM7b0JBQ2YsSUFBSSxDQUFDLGVBQWUsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3pDLE1BQU07Z0JBQ1YsS0FBSyxVQUFVO29CQUNYLElBQUksQ0FBQyxXQUFXLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNyQyxNQUFNO2dCQUNWLEtBQUssU0FBUztvQkFDVixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2xDLE1BQU07YUFHYjtTQUNKO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFlBQVksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7S0FDaEI7SUFFTSwwQ0FBcUIsR0FBNUIsVUFBNkIsUUFBaUM7UUFDMUQsSUFBSSxDQUFTLENBQUM7UUFDZCxJQUFJLEdBQUcsR0FBVyxRQUFRLENBQUMsc0JBQXNCLENBQUMsTUFBTSxDQUFDO1FBQ3pELEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RCLElBQUksSUFBSSxHQUFzQixJQUFJLENBQUMscUJBQXFCLENBQUMsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xHLElBQUksSUFBSSxFQUFFO2dCQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHO29CQUNkLE1BQU0sRUFBRSxRQUFRLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTtvQkFDbkQsU0FBUyxFQUFFLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO29CQUN2RCxPQUFPLEVBQUUsUUFBUSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU87b0JBQ25ELE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZO2lCQUM1RCxDQUFBO2FBQ0o7U0FDSjtLQUNKO0lBRU8sK0JBQVUsR0FBbEIsVUFBbUIsR0FBYTtRQUM1QixJQUFJLElBQUksR0FBaUIsSUFBSSxZQUFZLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUMxQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVCO0lBQ0wsaUJBQUM7QUFBRCxDQXRTQSxDQUFnQ0csZUFBTzs7QUNwQ3ZDLFdBQVksWUFBWTtJQUNwQiwrQkFBZSxDQUFBO0lBQ2YsaUNBQWlCLENBQUE7SUFDakIsaUNBQWlCLENBQUE7QUFDckIsQ0FBQyxFQUpXQyxvQkFBWSxLQUFaQSxvQkFBWTs7SUNLYixTQUFTLEdBQUcsVUFBVSxDQUFDLFdBQVc7Ozs7OyJ9
