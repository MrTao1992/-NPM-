'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_mgr = require('zmg_mgr');
var zmg_util = require('zmg_util');
var zmg_module_mgr = require('zmg_module_mgr');
var zmg_config_mgr = require('zmg_config_mgr');
var zmg_event_mgr = require('zmg_event_mgr');
var zmg_controller = require('zmg_controller');
var zmg_res_mgr = require('zmg_res_mgr');
var zmg_env_mgr = require('zmg_env_mgr');
var zmg_ui_mgr = require('zmg_ui_mgr');

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

var ModuleConditionMgr = /** @class */ (function (_super) {
    __extends(ModuleConditionMgr, _super);
    function ModuleConditionMgr() {
        return _super.call(this) || this;
    }
    ModuleConditionMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                this._libs = {};
                return [2 /*return*/];
            });
        });
    };
    ModuleConditionMgr.prototype.destroy = function () {
        this._libs = null;
    };
    Object.defineProperty(ModuleConditionMgr.prototype, "isValid", {
        get: function () {
            return this._libs ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    ModuleConditionMgr.prototype.addCondition = function (cdn) {
        this._libs[cdn.cfg.clsName] = cdn;
    };
    ModuleConditionMgr.prototype.removeCondition = function (name) {
        delete this._libs[name];
    };
    ModuleConditionMgr.prototype.getConditionByName = function (value) {
        return this._libs[value];
    };
    /**
     * 移除约束条件
     */
    ModuleConditionMgr.prototype.removeConditionById = function (id) {
        delete this._libs[this.getConditionById(id).cfg.clsName];
    };
    ModuleConditionMgr.prototype.getConditionById = function (id) {
        var lib = this._libs;
        for (var key in lib) {
            if (Object.prototype.hasOwnProperty.call(lib, key)) {
                var element = lib[key];
                if (element.cfg.id == id) {
                    return element;
                }
            }
        }
        return null;
    };
    ModuleConditionMgr.prototype.getConditionsByCfg = function (cfg) {
        var lib = this._libs;
        var resuts = [];
        var _loop_1 = function (key) {
            if (Object.prototype.hasOwnProperty.call(lib, key)) {
                var element_1 = lib[key];
                cfg.conditions.forEach(function (c) {
                    if (element_1.cfg.clsName == c.clsName) {
                        resuts.push({ condion: element_1, param: c.param });
                    }
                });
            }
        };
        for (var key in lib) {
            _loop_1(key);
        }
        return resuts;
    };
    ModuleConditionMgr.prototype.check = function (cfg) {
        return __awaiter(this, void 0, void 0, function () {
            var state, conditions;
            var _this = this;
            return __generator(this, function (_a) {
                if (cfg == null) {
                    state = new zmg_module_mgr.ModuleState();
                    state.failed(null, "模块为空，无法开启!");
                    return [2 /*return*/, Promise.reject(state)];
                }
                //模块开关
                if (cfg.isClose) {
                    state = new zmg_module_mgr.ModuleState();
                    state.failed(null, "当前模块配置表关闭:" + cfg.code);
                    return [2 /*return*/, Promise.reject(state)];
                }
                this._isWait = false;
                conditions = this.getConditionsByCfg(cfg);
                // this._checkTimeId = Window.setInterval(this.updata.bind(this), 50);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        zmg_util.gLog("======== 检测项目: " + cfg.displayName + " ========");
                        var interval = setInterval(function () {
                            if (_this._isWait) {
                                return;
                            }
                            var len = conditions.length;
                            if (len) {
                                _this._isWait = true;
                                var c_1 = conditions.pop();
                                c_1.condion.check(c_1.param).then(function () {
                                    _this._isWait = false;
                                    zmg_util.gLog("Module, Name: " + cfg.code + "(" + cfg.displayName + ")" + "" +
                                        " condionName: " + c_1.condion.cfg.clsName + "(" + c_1.condion.cfg.disName + ")" + " param:" + (c_1.param !== undefined ? c_1.param : c_1.condion.cfg.param));
                                }, function () {
                                    _this._isWait = false;
                                    state = new zmg_module_mgr.ModuleState();
                                    clearInterval(interval);
                                    zmg_util.gLog("======== 当前模块检测未通过" + cfg.displayName + " ========");
                                    state.failed(c_1, "ModuleName: " + cfg.code + "(" + cfg.displayName + ")" + "" +
                                        " condionName: " + c_1.condion.cfg.clsName + "(" + c_1.condion.cfg.disName + ")" + " param:" + (c_1.param !== undefined ? c_1.param : c_1.condion.cfg.param));
                                    reject(state);
                                });
                            }
                            else {
                                clearInterval(interval);
                                state = new zmg_module_mgr.ModuleState();
                                state.succeed("======== 检测通过,允许进入项目中: " + cfg.displayName + " ========");
                                resolve(state);
                            }
                        }, 50, cc.macro.REPEAT_FOREVER);
                    })];
            });
        });
    };
    return ModuleConditionMgr;
}(zmg_mgr.BaseMgr));

var ModuleRecordMgr = /** @class */ (function (_super) {
    __extends(ModuleRecordMgr, _super);
    function ModuleRecordMgr() {
        return _super.call(this) || this;
    }
    ModuleRecordMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                this._assets = [];
                zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_END, this.onChangeEnd, this, false, zmg_event_mgr.EEventIndex.ModuleRecord);
                return [2 /*return*/];
            });
        });
    };
    ModuleRecordMgr.prototype.destroy = function () {
        this._assets = null;
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_END, this.onChangeEnd, this);
    };
    ModuleRecordMgr.prototype.onChangeEnd = function () {
        var oldLast = this.getLast();
        var old = this.getNow();
        var now = zmg_controller.DirectorMgr.nowConfig;
        if (old && now) {
            if (old.code !== now.code) {
                if (oldLast && oldLast.code !== now.code) {
                    zmg_res_mgr.ResMgr.releaseLib(oldLast.code);
                }
                if (now && this._assets[this._assets.length - 2] && this._assets[this._assets.length - 2].code == now.code) {
                    this.back();
                }
                else {
                    if (now.isNav) {
                        this.setNow({ code: now.code, param: zmg_controller.DirectorMgr.nowParam }, null);
                    }
                }
            }
        }
        else {
            if (now && now.isNav) {
                this.setNow({ code: now.code, param: zmg_controller.DirectorMgr.nowParam }, null);
            }
        }
    };
    Object.defineProperty(ModuleRecordMgr.prototype, "isValid", {
        get: function () {
            return this._assets ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    ModuleRecordMgr.prototype.getLast = function () {
        var len = this._assets.length;
        if (len < 1) {
            return null;
        }
        if (len < 2) {
            return null;
        }
        var last = this._assets[len - 2];
        return last;
    };
    ModuleRecordMgr.prototype.back = function () {
        var len = this._assets.length;
        if (len >= 2) {
            this._assets.length = len - 1;
        }
    };
    /**
     * 设置当前链路最新
     */
    ModuleRecordMgr.prototype.setNow = function (module, saveparam) {
        if (saveparam) {
            var last = (this._assets[this._assets.length - 1]);
            last && (last.param = saveparam);
        }
        this._assets.push(module);
    };
    /**
     * back的时候 无法准确获取当前模块，所以必须单独存储
     */
    ModuleRecordMgr.prototype.getNow = function () {
        var now = this._assets ? this._assets[this._assets.length - 1] : null;
        // let config = now ? ConfigMgr.getModuleConfigByCode(now.code) : null;
        return now;
    };
    ModuleRecordMgr.prototype.getNowConfig = function () {
        var now = this.getNow();
        if (now) {
            return zmg_config_mgr.ConfigMgr.getModuleConfigByCode(now.code);
        }
        return null;
    };
    /**
     * 清除所有链路
     */
    ModuleRecordMgr.prototype.clear = function () {
        this._assets.length = 0;
    };
    /**
     * 获取主页链路
     */
    ModuleRecordMgr.prototype.getMain = function () {
        return null;
    };
    return ModuleRecordMgr;
}(zmg_mgr.BaseMgr));

var ModuleEvent = /** @class */ (function (_super) {
    __extends(ModuleEvent, _super);
    function ModuleEvent(type, nowModule, toModule) {
        var _this = _super.call(this, type, false) || this;
        _this.toModule = toModule;
        _this.nowModule = nowModule;
        return _this;
    }
    ModuleEvent.CHANGE = zmg_event_mgr.EventName.MODULE_CHANGE;
    ModuleEvent.GAME_OVER = zmg_event_mgr.EventName.GAME_OVER;
    return ModuleEvent;
}(cc.Event));

var _ModuleMgr = /** @class */ (function (_super) {
    __extends(_ModuleMgr, _super);
    function _ModuleMgr() {
        var _this = _super.call(this) || this;
        _this._record = new ModuleRecordMgr();
        _this._condition = new ModuleConditionMgr();
        return _this;
    }
    _ModuleMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _ModuleMgr();
        }
        return this._instance;
    };
    _ModuleMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                this._record.start();
                this.condition.start();
                this.addEvents();
                return [2 /*return*/];
            });
        });
    };
    _ModuleMgr.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.removeEvents();
        this._record.destroy();
        this.condition.destroy();
    };
    Object.defineProperty(_ModuleMgr.prototype, "isValid", {
        get: function () {
            return this.condition.isValid && this._record.isValid;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_ModuleMgr.prototype, "condition", {
        get: function () {
            return this._condition;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_ModuleMgr.prototype, "record", {
        get: function () {
            return this._record;
        },
        enumerable: false,
        configurable: true
    });
    _ModuleMgr.prototype.getConditionState = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var cfg;
            return __generator(this, function (_a) {
                cfg = zmg_config_mgr.ConfigMgr.getModuleConfigByCode(code);
                return [2 /*return*/, this._condition.check(cfg)];
            });
        });
    };
    _ModuleMgr.prototype.openByCode = function (code, param, nowparam) {
        if (zmg_util.StringUtil.isValid(code)) {
            this.open(zmg_config_mgr.ConfigMgr.getModuleConfigByCode(code), param, nowparam);
        }
        else {
            zmg_util.gWarn("当前模块命为空，无法进入。");
        }
    };
    _ModuleMgr.prototype.openById = function (id, param, nowparam) {
        var moduleCfg = zmg_config_mgr.ConfigMgr.getModuleConfigById(id);
        if (moduleCfg) {
            this.open(moduleCfg, param, nowparam);
        }
        else {
            zmg_util.gWarn("当前模块id为空，无法进入。");
        }
    };
    _ModuleMgr.prototype.open = function (cfg, param, nowparam, isback) {
        var moduleState;
        if (!cfg) {
            zmg_util.gWarn("当前模块配置信息为空，无法进入。");
            moduleState = new zmg_module_mgr.ModuleState();
            moduleState.failed(null, "当前模块配置信息为空，无法进入。");
            return;
        }
        var now = this._record.getNow();
        var nowCode = now ? now.code : "";
        if (nowCode == cfg.code) {
            //
            zmg_util.gWarn("模块相同，不用跳转");
            moduleState = new zmg_module_mgr.ModuleState();
            moduleState.failed(null, "模块相同，不用跳转");
            return;
        }
        var evt = new ModuleEvent(ModuleEvent.CHANGE, nowCode, cfg.code);
        this.dispatchEvent(evt);
        if (evt.isStopped()) {
            zmg_util.gLog("模块跳转行为被终止。");
            moduleState = new zmg_module_mgr.ModuleState();
            moduleState.failed(null, "模块跳转行为被终止。");
            return;
        }
        this._open(cfg, param, nowparam, isback);
    };
    _ModuleMgr.prototype._open = function (cfg, param, nowparam, isback) {
        var state = this._condition.check(cfg);
        if (state) {
            state.then(function (state) {
                //允许进入
                /**
                 * 先进行跳转，之后在进行record设置
                 */
                zmg_controller.DirectorMgr.openConfig(cfg, param);
                zmg_util.gLog(state.message);
            }, function (state) {
                //失败进入
                zmg_util.gLog("=====约束条件判断无法进入======");
                zmg_util.gWarn(state.message);
                if (state.condition) {
                    state.condition.condion.catchHandler(state.condition.param);
                }
            });
        }
    };
    _ModuleMgr.prototype.back = function () {
        var backItem = this._record.getLast();
        if (backItem) {
            var cfg = zmg_config_mgr.ConfigMgr.getModuleConfigByCode(backItem.code);
            this.open(cfg, backItem.param, null, true);
        }
        else {
            this.exit();
        }
    };
    _ModuleMgr.prototype.refurbish = function () {
        var backItem = this._record.getNow();
        if (backItem) {
            var cfg = zmg_config_mgr.ConfigMgr.getModuleConfigByCode(backItem.code);
            this._open(cfg, backItem.param, null, true);
        }
    };
    _ModuleMgr.prototype.exit = function () {
        zmg_event_mgr.EventMgr.dispatchEvent(new ModuleEvent(ModuleEvent.GAME_OVER));
        cc.game.end();
    };
    _ModuleMgr.prototype.dispatchEvent = function (evt) {
        _super.prototype.dispatchEvent.call(this, evt);
        zmg_event_mgr.EventMgr.dispatchEvent(evt);
    };
    _ModuleMgr.prototype.addEvents = function () {
        //预先判断防沉迷后，执行进入默认模块
        // EventMgr.once(EventName.CORE_READY, this.openDefault, this);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.UI_BACK_BTN, this.onUIBackBtn, this, false, -1);
    };
    _ModuleMgr.prototype.removeEvents = function () {
        // EventMgr.off(EventName.CORE_READY, this.openDefault, this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.UI_BACK_BTN, this.onUIBackBtn, this);
    };
    _ModuleMgr.prototype.openDefault = function () {
        var _this = this;
        var module = zmg_env_mgr.EnvMgr.getDefaultModuleAsset();
        if (module.auto) {
            this.openByCode(module.code, module.param);
        }
        else {
            zmg_ui_mgr.UIMgr.alert.open(new zmg_ui_mgr.AlertAsset("开始游戏初始化...", function () {
                _this.openByCode(module.code, module.param);
            }, null, "确定", "取消", this));
        }
    };
    /**
     * 点击左上角按钮返回
     */
    _ModuleMgr.prototype.onUIBackBtn = function (evt) {
        if (!evt.isStopped()) {
            this.back();
        }
    };
    return _ModuleMgr;
}(zmg_mgr.BaseMgr));
var ModuleMgr = _ModuleMgr.getInstance();

var ModuleState = /** @class */ (function () {
    function ModuleState() {
    }
    ModuleState.prototype.succeed = function (message) {
        this._isVaild = true;
        this.message = message;
    };
    ModuleState.prototype.failed = function (condition, message) {
        this.condition = condition;
        this.message = message;
        this._isVaild = false;
    };
    Object.defineProperty(ModuleState.prototype, "isVaild", {
        get: function () {
            return this._isVaild;
        },
        enumerable: false,
        configurable: true
    });
    return ModuleState;
}());

var BaseModuleCDN = /** @class */ (function () {
    function BaseModuleCDN(clsName) {
        this._clsName = clsName;
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CORE_READY, this.onCoreReady, this, false, Number.MAX_SAFE_INTEGER);
    }
    Object.defineProperty(BaseModuleCDN.prototype, "clsName", {
        /**
         *  get clsName
         */
        get: function () {
            return this._clsName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseModuleCDN.prototype, "cfg", {
        get: function () {
            return this._cfg;
        },
        enumerable: false,
        configurable: true
    });
    BaseModuleCDN.prototype.catchHandler = function (param) {
        return false;
    };
    /**
     * 初始化配置
     * @param cfg
     */
    BaseModuleCDN.prototype.init = function (cfg) {
        this._cfg = cfg;
    };
    /**
    * 是否检测通过
    */
    BaseModuleCDN.prototype.check = function (param) {
        return Promise.reject();
    };
    Object.defineProperty(BaseModuleCDN.prototype, "isVaild", {
        /**
         * 检查器是否准备完毕，可以进行工作
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    BaseModuleCDN.prototype.onCoreReady = function () {
        var i;
        var len = zmg_config_mgr.ConfigMgr.conditionConfig.length;
        for (i = 0; i < len; i++) {
            if (zmg_config_mgr.ConfigMgr.conditionConfig[i].clsName == this.clsName) {
                this.init(zmg_config_mgr.ConfigMgr.conditionConfig[i]);
                break;
            }
        }
        if (this._cfg) {
            ModuleMgr.condition.addCondition(this);
            zmg_util.gLog("约束条件已添加:" + this.clsName);
        }
        else {
            zmg_util.gWarn("约束条件配置表信息未找到:" + this.clsName);
        }
    };
    return BaseModuleCDN;
}());

exports.BaseModuleCDN = BaseModuleCDN;
exports.ModuleConditionMgr = ModuleConditionMgr;
exports.ModuleEvent = ModuleEvent;
exports.ModuleMgr = ModuleMgr;
exports.ModuleState = ModuleState;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2R1bGVDb25kaXRpb25NZ3IudHMiLCIuLi8uLi8uLi9zcmMvTW9kdWxlUmVjb3JkTWdyLnRzIiwiLi4vLi4vLi4vc3JjL01vZHVsZUV2ZW50LnRzIiwiLi4vLi4vLi4vc3JjL01vZHVsZU1nci50cyIsIi4uLy4uLy4uL3NyYy9Nb2R1bGVTdGF0ZS50cyIsIi4uLy4uLy4uL3NyYy9CYXNlTW9kdWxlQ0ROLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJhc2VNZ3IgfSBmcm9tIFwiem1nX21nclwiO1xuaW1wb3J0IHsgZ0xvZyB9IGZyb20gXCJ6bWdfdXRpbFwiO1xuaW1wb3J0IHsgTW9kdWxlU3RhdGUgfSBmcm9tIFwiem1nX21vZHVsZV9tZ3JcIjtcblxuZXhwb3J0IGNsYXNzIE1vZHVsZUNvbmRpdGlvbk1nciBleHRlbmRzIEJhc2VNZ3IgaW1wbGVtZW50cyB6bWcuSU1vZHVsZUNvbmRpdGlvbk1nciB7XG5cbiAgICBwcml2YXRlIF9pc1dhaXQ6IGJvb2xlYW47XG4gICAgcHJpdmF0ZSBfY2hlY2tUaW1lSWQ6IG51bWJlcjtcbiAgICBwcml2YXRlIF9saWJzOiBSZWNvcmQ8c3RyaW5nLCB6bWcuSU1vZHVsZUNvbmRpdGlvbj47XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuICAgIGFzeW5jIHN0YXJ0KCkge1xuICAgICAgICBzdXBlci5zdGFydCgpO1xuICAgICAgICB0aGlzLl9saWJzID0ge307XG4gICAgfVxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9saWJzID0gbnVsbDtcbiAgICB9XG4gICAgcHVibGljIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlicyA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgYWRkQ29uZGl0aW9uKGNkbjogem1nLklNb2R1bGVDb25kaXRpb24pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fbGlic1tjZG4uY2ZnLmNsc05hbWVdID0gY2RuO1xuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlQ29uZGl0aW9uKG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBkZWxldGUgdGhpcy5fbGlic1tuYW1lXTtcbiAgICB9XG4gICAgcHVibGljIGdldENvbmRpdGlvbkJ5TmFtZSh2YWx1ZTogc3RyaW5nKTogem1nLklNb2R1bGVDb25kaXRpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlic1t2YWx1ZV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOenu+mZpOe6puadn+adoeS7tlxuICAgICAqL1xuICAgIHB1YmxpYyByZW1vdmVDb25kaXRpb25CeUlkKGlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2xpYnNbdGhpcy5nZXRDb25kaXRpb25CeUlkKGlkKS5jZmcuY2xzTmFtZV07XG4gICAgfVxuICAgIHB1YmxpYyBnZXRDb25kaXRpb25CeUlkKGlkOiBzdHJpbmcpOiB6bWcuSU1vZHVsZUNvbmRpdGlvbiB7XG4gICAgICAgIGxldCBsaWI6IFJlY29yZDxzdHJpbmcsIHptZy5JTW9kdWxlQ29uZGl0aW9uPiA9IHRoaXMuX2xpYnM7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGxpYikge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChsaWIsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gbGliW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2ZnLmlkID09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcHVibGljIGdldENvbmRpdGlvbnNCeUNmZyhjZmc6IHptZy5JTW9kdWxlQ29uZmlnKTogeyBjb25kaW9uOiB6bWcuSU1vZHVsZUNvbmRpdGlvbiwgcGFyYW06IGFueSB9W10ge1xuICAgICAgICBsZXQgbGliOiBSZWNvcmQ8c3RyaW5nLCB6bWcuSU1vZHVsZUNvbmRpdGlvbj4gPSB0aGlzLl9saWJzO1xuICAgICAgICBsZXQgcmVzdXRzOiB7IGNvbmRpb246IHptZy5JTW9kdWxlQ29uZGl0aW9uLCBwYXJhbTogYW55IH1bXSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBsaWIpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwobGliLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGxpYltrZXldO1xuICAgICAgICAgICAgICAgIGNmZy5jb25kaXRpb25zLmZvckVhY2goKGM6IHtcbiAgICAgICAgICAgICAgICAgICAgY2xzTmFtZTogc3RyaW5nO1xuICAgICAgICAgICAgICAgICAgICBwYXJhbTogb2JqZWN0O1xuICAgICAgICAgICAgICAgIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuY2ZnLmNsc05hbWUgPT0gYy5jbHNOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1dHMucHVzaCh7IGNvbmRpb246IGVsZW1lbnQsIHBhcmFtOiBjLnBhcmFtIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3V0cztcbiAgICB9XG5cbiAgICBhc3luYyBjaGVjayhjZmc6IHptZy5JTW9kdWxlQ29uZmlnKTogUHJvbWlzZTxNb2R1bGVTdGF0ZT4ge1xuICAgICAgICBsZXQgc3RhdGU6IE1vZHVsZVN0YXRlO1xuICAgICAgICBpZiAoY2ZnID09IG51bGwpIHtcbiAgICAgICAgICAgIHN0YXRlID0gbmV3IE1vZHVsZVN0YXRlKCk7XG4gICAgICAgICAgICBzdGF0ZS5mYWlsZWQobnVsbCwgXCLmqKHlnZfkuLrnqbrvvIzml6Dms5XlvIDlkK8hXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICAvL+aooeWdl+W8gOWFs1xuICAgICAgICBpZiAoY2ZnLmlzQ2xvc2UpIHtcbiAgICAgICAgICAgIHN0YXRlID0gbmV3IE1vZHVsZVN0YXRlKCk7XG4gICAgICAgICAgICBzdGF0ZS5mYWlsZWQobnVsbCwgXCLlvZPliY3mqKHlnZfphY3nva7ooajlhbPpl606XCIgKyBjZmcuY29kZSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3Qoc3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzV2FpdCA9IGZhbHNlO1xuICAgICAgICBsZXQgY29uZGl0aW9uczogeyBjb25kaW9uOiB6bWcuSU1vZHVsZUNvbmRpdGlvbiwgcGFyYW06IGFueSB9W10gPSB0aGlzLmdldENvbmRpdGlvbnNCeUNmZyhjZmcpO1xuICAgICAgICAvLyB0aGlzLl9jaGVja1RpbWVJZCA9IFdpbmRvdy5zZXRJbnRlcnZhbCh0aGlzLnVwZGF0YS5iaW5kKHRoaXMpLCA1MCk7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxNb2R1bGVTdGF0ZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgZ0xvZyhcIj09PT09PT09IOajgOa1i+mhueebrjogXCIgKyBjZmcuZGlzcGxheU5hbWUgKyBcIiA9PT09PT09PVwiKTtcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNXYWl0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gY29uZGl0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgaWYgKGxlbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1dhaXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBsZXQgYzogeyBjb25kaW9uOiB6bWcuSU1vZHVsZUNvbmRpdGlvbiwgcGFyYW06IGFueSB9ID0gY29uZGl0aW9ucy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgYy5jb25kaW9uLmNoZWNrKGMucGFyYW0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faXNXYWl0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBnTG9nKFwiTW9kdWxlLCBOYW1lOiBcIiArIGNmZy5jb2RlICsgXCIoXCIgKyBjZmcuZGlzcGxheU5hbWUgKyBcIilcIiArIFwiXCIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiIGNvbmRpb25OYW1lOiBcIiArIGMuY29uZGlvbi5jZmcuY2xzTmFtZSArIFwiKFwiICsgYy5jb25kaW9uLmNmZy5kaXNOYW1lICsgXCIpXCIgKyBcIiBwYXJhbTpcIiArIChjLnBhcmFtICE9PSB1bmRlZmluZWQgPyBjLnBhcmFtIDogYy5jb25kaW9uLmNmZy5wYXJhbSkpO1xuICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc1dhaXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gbmV3IE1vZHVsZVN0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdMb2coXCI9PT09PT09PSDlvZPliY3mqKHlnZfmo4DmtYvmnKrpgJrov4dcIiArIGNmZy5kaXNwbGF5TmFtZSArIFwiID09PT09PT09XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUuZmFpbGVkKGMsIFwiTW9kdWxlTmFtZTogXCIgKyBjZmcuY29kZSArIFwiKFwiICsgY2ZnLmRpc3BsYXlOYW1lICsgXCIpXCIgKyBcIlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBjb25kaW9uTmFtZTogXCIgKyBjLmNvbmRpb24uY2ZnLmNsc05hbWUgKyBcIihcIiArIGMuY29uZGlvbi5jZmcuZGlzTmFtZSArIFwiKVwiICsgXCIgcGFyYW06XCIgKyAoYy5wYXJhbSAhPT0gdW5kZWZpbmVkID8gYy5wYXJhbSA6IGMuY29uZGlvbi5jZmcucGFyYW0pKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gbmV3IE1vZHVsZVN0YXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlLnN1Y2NlZWQoXCI9PT09PT09PSDmo4DmtYvpgJrov4cs5YWB6K646L+b5YWl6aG555uu5LitOiBcIiArIGNmZy5kaXNwbGF5TmFtZSArIFwiID09PT09PT09XCIpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCA1MCwgY2MubWFjcm8uUkVQRUFUX0ZPUkVWRVIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCB7IENvbmZpZ01nciB9IGZyb20gXCJ6bWdfY29uZmlnX21nclwiO1xyXG5pbXBvcnQgeyBEaXJlY3Rvck1nciB9IGZyb20gXCJ6bWdfY29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBFRXZlbnRJbmRleCwgRXZlbnRNZ3IsIEV2ZW50TmFtZSB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XHJcbmltcG9ydCB7IEJhc2VNZ3IgfSBmcm9tIFwiem1nX21nclwiXHJcbmltcG9ydCB7IFJlc01nciwgU3lzdGVtQnVuZGxlTmFtZSB9IGZyb20gXCJ6bWdfcmVzX21nclwiO1xyXG5pbXBvcnQgeyBnV2FybiB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1vZHVsZVJlY29yZE1nciBleHRlbmRzIEJhc2VNZ3IgaW1wbGVtZW50cyB6bWcuSU1vZHVsZVJlY29yZE1nciB7XHJcbiAgICBwcml2YXRlIF9hc3NldHM6IHptZy5JTW9kdWxlQXNzZXRbXTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBzdGFydCgpIHtcclxuICAgICAgICBzdXBlci5zdGFydCgpO1xyXG4gICAgICAgIHRoaXMuX2Fzc2V0cyA9IFtdO1xyXG4gICAgICAgIEV2ZW50TWdyLm9uKEV2ZW50TmFtZS5DT05UUk9MTEVSX0NIQU5HRV9FTkQsIHRoaXMub25DaGFuZ2VFbmQsIHRoaXMsIGZhbHNlLCBFRXZlbnRJbmRleC5Nb2R1bGVSZWNvcmQpO1xyXG4gICAgfVxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLl9hc3NldHMgPSBudWxsO1xyXG4gICAgICAgIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfRU5ELCB0aGlzLm9uQ2hhbmdlRW5kLCB0aGlzKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25DaGFuZ2VFbmQoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG9sZExhc3Q6IHptZy5JTW9kdWxlQXNzZXQgPSB0aGlzLmdldExhc3QoKTtcclxuICAgICAgICBsZXQgb2xkOiB6bWcuSU1vZHVsZUFzc2V0ID0gdGhpcy5nZXROb3coKTtcclxuICAgICAgICBsZXQgbm93OiB6bWcuSU1vZHVsZUNvbmZpZyA9IERpcmVjdG9yTWdyLm5vd0NvbmZpZztcclxuICAgICAgICBpZiAob2xkICYmIG5vdykge1xyXG4gICAgICAgICAgICBpZiAob2xkLmNvZGUgIT09IG5vdy5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob2xkTGFzdCAmJiBvbGRMYXN0LmNvZGUgIT09IG5vdy5jb2RlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgUmVzTWdyLnJlbGVhc2VMaWIob2xkTGFzdC5jb2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChub3cgJiYgdGhpcy5fYXNzZXRzW3RoaXMuX2Fzc2V0cy5sZW5ndGggLSAyXSAmJiB0aGlzLl9hc3NldHNbdGhpcy5fYXNzZXRzLmxlbmd0aCAtIDJdLmNvZGUgPT0gbm93LmNvZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhY2soKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5vdy5pc05hdikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE5vdyh7IGNvZGU6IG5vdy5jb2RlLCBwYXJhbTogRGlyZWN0b3JNZ3Iubm93UGFyYW0gfSwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKG5vdyAmJiBub3cuaXNOYXYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Tm93KHsgY29kZTogbm93LmNvZGUsIHBhcmFtOiBEaXJlY3Rvck1nci5ub3dQYXJhbSB9LCBudWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Fzc2V0cyA/IHRydWUgOiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRMYXN0KCk6IHptZy5JTW9kdWxlQXNzZXQge1xyXG4gICAgICAgIGxldCBsZW4gPSB0aGlzLl9hc3NldHMubGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW4gPCAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGVuIDwgMikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxhc3Q6IHptZy5JTW9kdWxlQXNzZXQgPSB0aGlzLl9hc3NldHNbbGVuIC0gMl07XHJcbiAgICAgICAgcmV0dXJuIGxhc3Q7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYmFjaygpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGVuID0gdGhpcy5fYXNzZXRzLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuID49IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5fYXNzZXRzLmxlbmd0aCA9IGxlbiAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5b2T5YmN6ZO+6Lev5pyA5pawXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXROb3cobW9kdWxlOiB6bWcuSU1vZHVsZUFzc2V0LCBzYXZlcGFyYW0/OiBhbnkpIHtcclxuICAgICAgICBpZiAoc2F2ZXBhcmFtKSB7XHJcbiAgICAgICAgICAgIGxldCBsYXN0ID0gKHRoaXMuX2Fzc2V0c1t0aGlzLl9hc3NldHMubGVuZ3RoIC0gMV0pO1xyXG4gICAgICAgICAgICBsYXN0ICYmIChsYXN0LnBhcmFtID0gc2F2ZXBhcmFtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYXNzZXRzLnB1c2gobW9kdWxlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogYmFja+eahOaXtuWAmSDml6Dms5Xlh4bnoa7ojrflj5blvZPliY3mqKHlnZfvvIzmiYDku6Xlv4XpobvljZXni6zlrZjlgqhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldE5vdygpOiB6bWcuSU1vZHVsZUFzc2V0IHtcclxuICAgICAgICBsZXQgbm93ID0gdGhpcy5fYXNzZXRzID8gdGhpcy5fYXNzZXRzW3RoaXMuX2Fzc2V0cy5sZW5ndGggLSAxXSA6IG51bGw7XHJcbiAgICAgICAgLy8gbGV0IGNvbmZpZyA9IG5vdyA/IENvbmZpZ01nci5nZXRNb2R1bGVDb25maWdCeUNvZGUobm93LmNvZGUpIDogbnVsbDtcclxuICAgICAgICByZXR1cm4gbm93O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXROb3dDb25maWcoKTogem1nLklNb2R1bGVDb25maWcge1xyXG4gICAgICAgIGxldCBub3cgPSB0aGlzLmdldE5vdygpO1xyXG4gICAgICAgIGlmIChub3cpIHtcclxuICAgICAgICAgICAgcmV0dXJuIENvbmZpZ01nci5nZXRNb2R1bGVDb25maWdCeUNvZGUobm93LmNvZGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5riF6Zmk5omA5pyJ6ZO+6LevXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9hc3NldHMubGVuZ3RoID0gMDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Li76aG16ZO+6LevXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRNYWluKCk6IHptZy5JTW9kdWxlQXNzZXQge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRXZlbnROYW1lIH0gZnJvbSBcInptZ19ldmVudF9tZ3JcIjtcblxuZXhwb3J0IGNsYXNzIE1vZHVsZUV2ZW50IGV4dGVuZHMgY2MuRXZlbnQge1xuICAgIHB1YmxpYyBzdGF0aWMgQ0hBTkdFOiBzdHJpbmcgPSBFdmVudE5hbWUuTU9EVUxFX0NIQU5HRTtcbiAgICBwdWJsaWMgc3RhdGljIEdBTUVfT1ZFUjogc3RyaW5nID0gRXZlbnROYW1lLkdBTUVfT1ZFUjtcbiAgICBwdWJsaWMgbm93TW9kdWxlOiBzdHJpbmc7XG4gICAgcHVibGljIHRvTW9kdWxlOiBzdHJpbmc7XG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBub3dNb2R1bGU/OiBzdHJpbmcsIHRvTW9kdWxlPzogc3RyaW5nKSB7XG4gICAgICAgIHN1cGVyKHR5cGUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy50b01vZHVsZSA9IHRvTW9kdWxlO1xuICAgICAgICB0aGlzLm5vd01vZHVsZSA9IG5vd01vZHVsZTtcbiAgICB9XG59IiwiaW1wb3J0IHsgQ29uZmlnTWdyIH0gZnJvbSAnem1nX2NvbmZpZ19tZ3InXHJcbmltcG9ydCB7IEV2ZW50TWdyLCBFdmVudE5hbWUgfSBmcm9tICd6bWdfZXZlbnRfbWdyJztcclxuaW1wb3J0IHsgQmFzZU1nciB9IGZyb20gJ3ptZ19tZ3InO1xyXG5pbXBvcnQgeyBnTG9nLCBnV2FybiwgU3RyaW5nVXRpbCB9IGZyb20gJ3ptZ191dGlsJ1xyXG5pbXBvcnQgeyBNb2R1bGVDb25kaXRpb25NZ3IgfSBmcm9tICcuL01vZHVsZUNvbmRpdGlvbk1ncic7XHJcbmltcG9ydCB7IE1vZHVsZVJlY29yZE1nciB9IGZyb20gJy4vTW9kdWxlUmVjb3JkTWdyJztcclxuaW1wb3J0IHsgTW9kdWxlU3RhdGUgfSBmcm9tICd6bWdfbW9kdWxlX21ncic7XHJcbmltcG9ydCB7IERpcmVjdG9yTWdyIH0gZnJvbSBcInptZ19jb250cm9sbGVyXCI7XHJcbmltcG9ydCB7IEF1ZGlvTWdyIH0gZnJvbSBcInptZ19hdWRpb19tZ3JcIjtcclxuaW1wb3J0IHsgRW52TWdyIH0gZnJvbSBcInptZ19lbnZfbWdyXCI7XHJcbmltcG9ydCB7IE1vZHVsZUV2ZW50IH0gZnJvbSAnLi9Nb2R1bGVFdmVudCc7XHJcbmltcG9ydCB7IEFsZXJ0QXNzZXQsIFVJTWdyIH0gZnJvbSBcInptZ191aV9tZ3JcIjtcclxuY2xhc3MgX01vZHVsZU1nciBleHRlbmRzIEJhc2VNZ3IgaW1wbGVtZW50cyB6bWcuSU1vZHVsZU1nciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBfTW9kdWxlTWdyO1xyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6IF9Nb2R1bGVNZ3Ige1xyXG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgX01vZHVsZU1ncigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmTvui3r+WtmOWCqOWZqFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9yZWNvcmQ6IE1vZHVsZVJlY29yZE1ncjtcclxuICAgIC8qKlxyXG4gICAgICog57qm5p2f5ZmoXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2NvbmRpdGlvbjogTW9kdWxlQ29uZGl0aW9uTWdyO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9yZWNvcmQgPSBuZXcgTW9kdWxlUmVjb3JkTWdyKCk7XHJcbiAgICAgICAgdGhpcy5fY29uZGl0aW9uID0gbmV3IE1vZHVsZUNvbmRpdGlvbk1ncigpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5fcmVjb3JkLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb24uc3RhcnQoKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5fcmVjb3JkLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvbi5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZGl0aW9uLmlzVmFsaWQgJiYgdGhpcy5fcmVjb3JkLmlzVmFsaWQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBnZXQgY29uZGl0aW9uKCk6IE1vZHVsZUNvbmRpdGlvbk1nciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmRpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJlY29yZCgpOiBNb2R1bGVSZWNvcmRNZ3Ige1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZWNvcmQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGdldENvbmRpdGlvblN0YXRlKGNvZGU6IHN0cmluZyk6IFByb21pc2U8TW9kdWxlU3RhdGU+IHtcclxuICAgICAgICBsZXQgY2ZnID0gQ29uZmlnTWdyLmdldE1vZHVsZUNvbmZpZ0J5Q29kZShjb2RlKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZGl0aW9uLmNoZWNrKGNmZyk7XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbkJ5Q29kZShjb2RlOiBzdHJpbmcsIHBhcmFtPzogYW55LCBub3dwYXJhbT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChTdHJpbmdVdGlsLmlzVmFsaWQoY29kZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5vcGVuKENvbmZpZ01nci5nZXRNb2R1bGVDb25maWdCeUNvZGUoY29kZSksIHBhcmFtLCBub3dwYXJhbSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ1dhcm4oXCLlvZPliY3mqKHlnZflkb3kuLrnqbrvvIzml6Dms5Xov5vlhaXjgIJcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9wZW5CeUlkKGlkOiBudW1iZXIsIHBhcmFtPzogYW55LCBub3dwYXJhbT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBtb2R1bGVDZmcgPSBDb25maWdNZ3IuZ2V0TW9kdWxlQ29uZmlnQnlJZChpZCk7XHJcbiAgICAgICAgaWYgKG1vZHVsZUNmZykge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW4obW9kdWxlQ2ZnLCBwYXJhbSwgbm93cGFyYW0pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ1dhcm4oXCLlvZPliY3mqKHlnZdpZOS4uuepuu+8jOaXoOazlei/m+WFpeOAglwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb3BlbihjZmc6IHptZy5JTW9kdWxlQ29uZmlnLCBwYXJhbT86IGFueSwgbm93cGFyYW0/OiBhbnksIGlzYmFjaz86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBsZXQgbW9kdWxlU3RhdGU6IE1vZHVsZVN0YXRlO1xyXG4gICAgICAgIGlmICghY2ZnKSB7XHJcbiAgICAgICAgICAgIGdXYXJuKFwi5b2T5YmN5qih5Z2X6YWN572u5L+h5oGv5Li656m677yM5peg5rOV6L+b5YWl44CCXCIpO1xyXG4gICAgICAgICAgICBtb2R1bGVTdGF0ZSA9IG5ldyBNb2R1bGVTdGF0ZSgpO1xyXG4gICAgICAgICAgICBtb2R1bGVTdGF0ZS5mYWlsZWQobnVsbCwgXCLlvZPliY3mqKHlnZfphY3nva7kv6Hmga/kuLrnqbrvvIzml6Dms5Xov5vlhaXjgIJcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG5vdzogem1nLklNb2R1bGVBc3NldCA9IHRoaXMuX3JlY29yZC5nZXROb3coKTtcclxuICAgICAgICBsZXQgbm93Q29kZTogc3RyaW5nID0gbm93ID8gbm93LmNvZGUgOiBcIlwiO1xyXG4gICAgICAgIGlmIChub3dDb2RlID09IGNmZy5jb2RlKSB7XHJcbiAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgIGdXYXJuKFwi5qih5Z2X55u45ZCM77yM5LiN55So6Lez6L2sXCIpO1xyXG4gICAgICAgICAgICBtb2R1bGVTdGF0ZSA9IG5ldyBNb2R1bGVTdGF0ZSgpO1xyXG4gICAgICAgICAgICBtb2R1bGVTdGF0ZS5mYWlsZWQobnVsbCwgXCLmqKHlnZfnm7jlkIzvvIzkuI3nlKjot7PovaxcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGV2dDogTW9kdWxlRXZlbnQgPSBuZXcgTW9kdWxlRXZlbnQoTW9kdWxlRXZlbnQuQ0hBTkdFLCBub3dDb2RlLCBjZmcuY29kZSk7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgICAgICAgaWYgKGV2dC5pc1N0b3BwZWQoKSkge1xyXG4gICAgICAgICAgICBnTG9nKFwi5qih5Z2X6Lez6L2s6KGM5Li66KKr57uI5q2i44CCXCIpO1xyXG4gICAgICAgICAgICBtb2R1bGVTdGF0ZSA9IG5ldyBNb2R1bGVTdGF0ZSgpO1xyXG4gICAgICAgICAgICBtb2R1bGVTdGF0ZS5mYWlsZWQobnVsbCwgXCLmqKHlnZfot7PovazooYzkuLrooqvnu4jmraLjgIJcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fb3BlbihjZmcsIHBhcmFtLCBub3dwYXJhbSwgaXNiYWNrKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX29wZW4oY2ZnOiB6bWcuSU1vZHVsZUNvbmZpZywgcGFyYW0/OiBhbnksIG5vd3BhcmFtPzogYW55LCBpc2JhY2s/OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHN0YXRlID0gdGhpcy5fY29uZGl0aW9uLmNoZWNrKGNmZyk7XHJcbiAgICAgICAgaWYgKHN0YXRlKSB7XHJcbiAgICAgICAgICAgIHN0YXRlLnRoZW4oKHN0YXRlOiBNb2R1bGVTdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy/lhYHorrjov5vlhaVcclxuICAgICAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgICAgICog5YWI6L+b6KGM6Lez6L2s77yM5LmL5ZCO5Zyo6L+b6KGMcmVjb3Jk6K6+572uXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIERpcmVjdG9yTWdyLm9wZW5Db25maWcoY2ZnLCBwYXJhbSk7XHJcbiAgICAgICAgICAgICAgICBnTG9nKHN0YXRlLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICB9LCAoc3RhdGU6IE1vZHVsZVN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL+Wksei0pei/m+WFpVxyXG4gICAgICAgICAgICAgICAgZ0xvZyhcIj09PT0957qm5p2f5p2h5Lu25Yik5pat5peg5rOV6L+b5YWlPT09PT09XCIpO1xyXG4gICAgICAgICAgICAgICAgZ1dhcm4oc3RhdGUubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdGUuY29uZGl0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuY29uZGl0aW9uLmNvbmRpb24uY2F0Y2hIYW5kbGVyKHN0YXRlLmNvbmRpdGlvbi5wYXJhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGJhY2soKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGJhY2tJdGVtOiB6bWcuSU1vZHVsZUFzc2V0ID0gdGhpcy5fcmVjb3JkLmdldExhc3QoKTtcclxuICAgICAgICBpZiAoYmFja0l0ZW0pIHtcclxuICAgICAgICAgICAgbGV0IGNmZyA9IENvbmZpZ01nci5nZXRNb2R1bGVDb25maWdCeUNvZGUoYmFja0l0ZW0uY29kZSk7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbihjZmcsIGJhY2tJdGVtLnBhcmFtLCBudWxsLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmV4aXQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZWZ1cmJpc2goKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGJhY2tJdGVtOiB6bWcuSU1vZHVsZUFzc2V0ID0gdGhpcy5fcmVjb3JkLmdldE5vdygpO1xyXG4gICAgICAgIGlmIChiYWNrSXRlbSkge1xyXG4gICAgICAgICAgICBsZXQgY2ZnID0gQ29uZmlnTWdyLmdldE1vZHVsZUNvbmZpZ0J5Q29kZShiYWNrSXRlbS5jb2RlKTtcclxuICAgICAgICAgICAgdGhpcy5fb3BlbihjZmcsIGJhY2tJdGVtLnBhcmFtLCBudWxsLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBleGl0KCk6IHZvaWQge1xyXG4gICAgICAgIEV2ZW50TWdyLmRpc3BhdGNoRXZlbnQobmV3IE1vZHVsZUV2ZW50KE1vZHVsZUV2ZW50LkdBTUVfT1ZFUikpO1xyXG4gICAgICAgIGNjLmdhbWUuZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRpc3BhdGNoRXZlbnQoZXZ0OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgICAgICBFdmVudE1nci5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFkZEV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICAvL+mihOWFiOWIpOaWremYsuayiei/t+WQju+8jOaJp+ihjOi/m+WFpem7mOiupOaooeWdl1xyXG4gICAgICAgIC8vIEV2ZW50TWdyLm9uY2UoRXZlbnROYW1lLkNPUkVfUkVBRFksIHRoaXMub3BlbkRlZmF1bHQsIHRoaXMpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9uKEV2ZW50TmFtZS5VSV9CQUNLX0JUTiwgdGhpcy5vblVJQmFja0J0biwgdGhpcywgZmFsc2UsIC0xKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcmVtb3ZlRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09SRV9SRUFEWSwgdGhpcy5vcGVuRGVmYXVsdCwgdGhpcyk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub2ZmKEV2ZW50TmFtZS5VSV9CQUNLX0JUTiwgdGhpcy5vblVJQmFja0J0biwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb3BlbkRlZmF1bHQoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1vZHVsZTogem1nLklEZWZhdWx0TW9kdWxlQXNzZXQgPSBFbnZNZ3IuZ2V0RGVmYXVsdE1vZHVsZUFzc2V0KCk7XHJcbiAgICAgICAgaWYgKG1vZHVsZS5hdXRvKSB7XHJcbiAgICAgICAgICAgIHRoaXMub3BlbkJ5Q29kZShtb2R1bGUuY29kZSwgbW9kdWxlLnBhcmFtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBVSU1nci5hbGVydC5vcGVuKG5ldyBBbGVydEFzc2V0KFwi5byA5aeL5ri45oiP5Yid5aeL5YyWLi4uXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3BlbkJ5Q29kZShtb2R1bGUuY29kZSwgbW9kdWxlLnBhcmFtKTtcclxuICAgICAgICAgICAgfSwgbnVsbCwgXCLnoa7lrppcIiwgXCLlj5bmtohcIiwgdGhpcykpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog54K55Ye75bem5LiK6KeS5oyJ6ZKu6L+U5ZueXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25VSUJhY2tCdG4oZXZ0OiBjYy5FdmVudCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghZXZ0LmlzU3RvcHBlZCgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBNb2R1bGVNZ3I6IF9Nb2R1bGVNZ3IgPSBfTW9kdWxlTWdyLmdldEluc3RhbmNlKCk7IiwiZXhwb3J0IGNsYXNzIE1vZHVsZVN0YXRlIHtcbiAgICBwcml2YXRlIF9pc1ZhaWxkOiBib29sZWFuO1xuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmc7XG4gICAgcHVibGljIGNvbmRpdGlvbjogeyBjb25kaW9uOiB6bWcuSU1vZHVsZUNvbmRpdGlvbiwgcGFyYW06IGFueSB9O1xuICAgIHB1YmxpYyBzdWNjZWVkKG1lc3NhZ2U6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLl9pc1ZhaWxkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG4gICAgcHVibGljIGZhaWxlZChjb25kaXRpb246IHsgY29uZGlvbjogem1nLklNb2R1bGVDb25kaXRpb24sIHBhcmFtOiBhbnkgfSwgbWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29uZGl0aW9uID0gY29uZGl0aW9uO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICB0aGlzLl9pc1ZhaWxkID0gZmFsc2U7XG4gICAgfVxuICAgIHB1YmxpYyBnZXQgaXNWYWlsZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzVmFpbGQ7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgQ29uZmlnTWdyIH0gZnJvbSBcInptZ19jb25maWdfbWdyXCI7XG5pbXBvcnQgeyBFdmVudE1nciwgRXZlbnROYW1lIH0gZnJvbSBcInptZ19ldmVudF9tZ3JcIjtcbmltcG9ydCB7IGdMb2csIGdXYXJuIH0gZnJvbSBcInptZ191dGlsXCI7XG5pbXBvcnQgeyBNb2R1bGVNZ3IgfSBmcm9tIFwiLi9Nb2R1bGVNZ3JcIjtcblxuZXhwb3J0IGNsYXNzIEJhc2VNb2R1bGVDRE4gaW1wbGVtZW50cyB6bWcuSU1vZHVsZUNvbmRpdGlvbiB7XG4gICAgcHJvdGVjdGVkIF9jZmc6IHptZy5JQ29uZGl0aW9uQ29uZmlnO1xuICAgIHByb3RlY3RlZCBfY2xzTmFtZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqICBnZXQgY2xzTmFtZVxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgY2xzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xzTmFtZTtcbiAgICB9XG4gICAgcHVibGljIGdldCBjZmcoKTogem1nLklDb25kaXRpb25Db25maWcge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2ZnO1xuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihjbHNOYW1lOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fY2xzTmFtZSA9IGNsc05hbWU7XG4gICAgICAgIEV2ZW50TWdyLm9uKEV2ZW50TmFtZS5DT1JFX1JFQURZLCB0aGlzLm9uQ29yZVJlYWR5LCB0aGlzLCBmYWxzZSwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpO1xuICAgIH1cbiAgICBjYXRjaEhhbmRsZXIocGFyYW0/OiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDliJ3lp4vljJbphY3nva5cbiAgICAgKiBAcGFyYW0gY2ZnIFxuICAgICAqL1xuICAgIHB1YmxpYyBpbml0KGNmZzogem1nLklDb25kaXRpb25Db25maWcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY2ZnID0gY2ZnO1xuICAgIH1cbiAgICAvKipcbiAgICAqIOaYr+WQpuajgOa1i+mAmui/h1xuICAgICovXG4gICAgcHVibGljIGNoZWNrKHBhcmFtPzogYW55KTogUHJvbWlzZTxhbnk+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOajgOafpeWZqOaYr+WQpuWHhuWkh+WujOavle+8jOWPr+S7pei/m+ihjOW3peS9nFxuICAgICAqL1xuICAgIHB1YmxpYyBnZXQgaXNWYWlsZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkNvcmVSZWFkeSgpOiB2b2lkIHtcbiAgICAgICAgbGV0IGk6IG51bWJlcjtcbiAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gQ29uZmlnTWdyLmNvbmRpdGlvbkNvbmZpZy5sZW5ndGg7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKENvbmZpZ01nci5jb25kaXRpb25Db25maWdbaV0uY2xzTmFtZSA9PSB0aGlzLmNsc05hbWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmluaXQoQ29uZmlnTWdyLmNvbmRpdGlvbkNvbmZpZ1tpXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NmZykge1xuICAgICAgICAgICAgTW9kdWxlTWdyLmNvbmRpdGlvbi5hZGRDb25kaXRpb24odGhpcyk7XG4gICAgICAgICAgICBnTG9nKFwi57qm5p2f5p2h5Lu25bey5re75YqgOlwiICsgdGhpcy5jbHNOYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdXYXJuKFwi57qm5p2f5p2h5Lu26YWN572u6KGo5L+h5oGv5pyq5om+5YiwOlwiICsgdGhpcy5jbHNOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJNb2R1bGVTdGF0ZSIsImdMb2ciLCJCYXNlTWdyIiwiRXZlbnRNZ3IiLCJFdmVudE5hbWUiLCJFRXZlbnRJbmRleCIsIkRpcmVjdG9yTWdyIiwiUmVzTWdyIiwiQ29uZmlnTWdyIiwiU3RyaW5nVXRpbCIsImdXYXJuIiwiRW52TWdyIiwiVUlNZ3IiLCJBbGVydEFzc2V0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJd0Msc0NBQU87SUFLM0M7ZUFDSSxpQkFBTztLQUNWO0lBQ0ssa0NBQUssR0FBWDs7O2dCQUNJLGlCQUFNLEtBQUssV0FBRSxDQUFDO2dCQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDOzs7O0tBQ25CO0lBQ00sb0NBQU8sR0FBZDtRQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ3JCO0lBQ0Qsc0JBQVcsdUNBQU87YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxL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
