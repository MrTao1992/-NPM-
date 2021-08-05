'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_event_mgr = require('zmg_event_mgr');
var zmg_mgr = require('zmg_mgr');
var zmg_util = require('zmg_util');
var zmg_env_mgr = require('zmg_env_mgr');
var zmg_webserver_mgr = require('zmg_webserver_mgr');

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

var LivingDataBase = /** @class */ (function (_super) {
    __extends(LivingDataBase, _super);
    function LivingDataBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LivingDataBase.prototype.init = function () {
        this._database = {};
    };
    Object.defineProperty(LivingDataBase.prototype, "isValid", {
        get: function () {
            return this._database ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    LivingDataBase.prototype.getItem = function (key) {
        return this._database[key];
    };
    LivingDataBase.prototype.setItem = function (key, value) {
        if (!this.isValid) {
            zmg_util.gWarn("数据初始化失败");
            return;
        }
        zmg_util.gLog("写入本地存储数据...");
        if (cc.isValid(value)) {
            this._database[key] = value;
        }
        else {
            delete this._database[key];
        }
    };
    LivingDataBase.prototype.removeItem = function (key) {
        this.setItem(key, "");
    };
    LivingDataBase.prototype.clearItemByKey = function (word) {
        for (var key in this._database) {
            if (Object.prototype.hasOwnProperty.call(this._database, key)) {
                var element = this._database[key];
                if (key.indexOf(word) != -1) {
                    this._database[key] = null;
                    delete this._database[key];
                }
            }
        }
    };
    LivingDataBase.prototype.clear = function () {
        this._database = {};
    };
    return LivingDataBase;
}(cc.EventTarget));

var LocalDataBase = /** @class */ (function (_super) {
    __extends(LocalDataBase, _super);
    function LocalDataBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LocalDataBase.prototype.init = function () {
        var msg = cc.sys.localStorage.getItem(zmg_env_mgr.EnvMgr.getUserId());
        this._database = zmg_util.StringUtil.isValid(msg) ? JSON.parse(msg) : {};
    };
    Object.defineProperty(LocalDataBase.prototype, "isValid", {
        get: function () {
            return this._database ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    LocalDataBase.prototype.setAppItem = function (app, key, value) {
        this.setItem(app + "_" + key, value);
    };
    LocalDataBase.prototype.getAppItem = function (app, key, def) {
        var data = this.getItem(app + "_" + key);
        return data === undefined ? def : data;
    };
    LocalDataBase.prototype.getItem = function (key) {
        return this._database[key];
    };
    LocalDataBase.prototype.setItem = function (key, value) {
        if (!this.isValid) {
            zmg_util.gWarn("数据初始化失败");
            return;
        }
        var userId = zmg_env_mgr.EnvMgr.getUserId();
        if (!value || (typeof (value) == "string" && value.length != 0)) {
            delete this._database[key];
        }
        else {
            this._database[key] = value;
        }
        cc.sys.localStorage.setItem(userId, JSON.stringify(this._database));
    };
    LocalDataBase.prototype.removeItem = function (key) {
        this.setItem(key, "");
    };
    LocalDataBase.prototype.clear = function () {
        this._database = {};
        var userId = zmg_env_mgr.EnvMgr.getUserId();
        cc.sys.localStorage.setItem(userId, "");
    };
    return LocalDataBase;
}(cc.EventTarget));

var ServerDataBase = /** @class */ (function (_super) {
    __extends(ServerDataBase, _super);
    function ServerDataBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ServerDataBase.prototype.init = function () {
        if (zmg_webserver_mgr.ServerMgr.isValid) {
            this.getServerData();
        }
        else {
            zmg_webserver_mgr.ServerMgr.once(zmg_webserver_mgr.ServerEvent.READY, this.getServerData, this);
        }
    };
    Object.defineProperty(ServerDataBase.prototype, "isValid", {
        get: function () {
            return this._database ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    ServerDataBase.prototype.getItem = function (key) {
        if (!this.isValid) {
            return null;
        }
        var msg = this._database[key];
        if (msg == "undefined") {
            return null;
        }
        return msg ? (typeof (msg) == 'string' ? msg : JSON.stringify(msg)) : null;
    };
    ServerDataBase.prototype.setItem = function (key, value) {
        var _this = this;
        var msg = value ? (typeof (value) == "string" ? value : JSON.stringify(value)) : "undefined";
        if (this._database) {
            this._database[key] = msg;
        }
        //发送后台
        if (zmg_webserver_mgr.ServerMgr.isValid) {
            this.sendServerData(key, msg);
        }
        else {
            zmg_webserver_mgr.ServerMgr.once(zmg_webserver_mgr.ServerEvent.READY, function () {
                _this.sendServerData(key, msg);
            });
        }
        zmg_util.gLog("写入服务器存储数据...");
    };
    ServerDataBase.prototype.removeItem = function (key) {
        var _this = this;
        if (this._database) {
            delete this._database[key];
        }
        //发送后台
        //发送后台
        if (zmg_webserver_mgr.ServerMgr.isValid) {
            this.sendServerData(key, "");
        }
        else {
            zmg_webserver_mgr.ServerMgr.once(zmg_webserver_mgr.ServerEvent.READY, function () {
                _this.sendServerData(key, "");
            });
        }
    };
    ServerDataBase.prototype.clear = function () {
        var _this = this;
        if (this._database) {
            var _loop_1 = function (key) {
                if (Object.prototype.hasOwnProperty.call(this_1._database, key)) {
                    //清除所有数据
                    if (zmg_webserver_mgr.ServerMgr.isValid) {
                        this_1.sendServerData(key, "");
                    }
                    else {
                        zmg_webserver_mgr.ServerMgr.once(zmg_webserver_mgr.ServerEvent.READY, function () {
                            _this.sendServerData(key, "");
                        });
                    }
                }
            };
            var this_1 = this;
            for (var key in this._database) {
                _loop_1(key);
            }
            this._database = {};
        }
    };
    ServerDataBase.prototype.getServerData = function () {
        var _this = this;
        var param = {
            userId: zmg_env_mgr.EnvMgr.getUserId(),
        };
        zmg_webserver_mgr.ServerMgr.sendGet(zmg_webserver_mgr.zmgCommands.storageBatch, param, new zmg_webserver_mgr.ServerListener(this, function (data) {
            if (data) {
                _this._database = data;
                _this.emit(zmg_event_mgr.EventName.READY);
            }
            else {
                zmg_util.gWarn("返回消息为空...");
                _this._database = {};
            }
        }));
    };
    ServerDataBase.prototype.sendServerData = function (key, msg) {
        var _this = this;
        if (!key) {
            zmg_util.gWarn("键值不能为空!");
            return;
        }
        msg = zmg_util.StringUtil.isValid(msg) ? msg : "undefined";
        var param = {
            "key": key,
            "value": msg
        };
        zmg_webserver_mgr.ServerMgr.sendPost(zmg_webserver_mgr.zmgCommands.storagePut, param, new zmg_webserver_mgr.ServerListener(this, function (data) {
            if (data) {
                zmg_util.gLog("数据保存成功,key: " + key + " value:" + msg);
                _this._database[key] = msg;
            }
            else {
                zmg_util.gLog("数据保存失败,key: " + key + " value:" + msg);
            }
        }));
    };
    return ServerDataBase;
}(cc.EventTarget));

var _DataMgr = /** @class */ (function (_super) {
    __extends(_DataMgr, _super);
    function _DataMgr() {
        return _super.call(this) || this;
    }
    _DataMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _DataMgr();
        }
        return this._instance;
    };
    _DataMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this._local = new LocalDataBase();
                this._server = new ServerDataBase();
                this._living = new LivingDataBase();
                this._local.init();
                this._server.init();
                this._living.init();
                if (this._server.isValid) {
                    this.check();
                }
                else {
                    this._server.once(zmg_event_mgr.EventName.READY, this.check, this);
                }
                return [2 /*return*/];
            });
        });
    };
    _DataMgr.prototype.check = function () {
        if (this.isValid) {
            this.emit(zmg_event_mgr.EventName.READY);
        }
    };
    Object.defineProperty(_DataMgr.prototype, "local", {
        get: function () {
            return this._local;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_DataMgr.prototype, "server", {
        get: function () {
            return this._server;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_DataMgr.prototype, "living", {
        get: function () {
            return this._living;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_DataMgr.prototype, "isValid", {
        get: function () {
            return this._server.isValid && this._local.isValid;
        },
        enumerable: false,
        configurable: true
    });
    return _DataMgr;
}(zmg_mgr.BaseMgr));

var $ELocalSystemKey;
(function ($ELocalSystemKey) {
    /**
     * 背景音效设置
     */
    $ELocalSystemKey["IS_CLOSE_AUDIO"] = "isCloseAudio";
})($ELocalSystemKey || ($ELocalSystemKey = {}));

var ELocalSystemKey = $ELocalSystemKey;
var DataMgr = _DataMgr.getInstance();

exports.DataMgr = DataMgr;
exports.ELocalSystemKey = ELocalSystemKey;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9MaXZpbmdEYXRhQmFzZS50cyIsIi4uLy4uLy4uL3NyYy9Mb2NhbERhdGFCYXNlLnRzIiwiLi4vLi4vLi4vc3JjL1NlcnZlckRhdGFCYXNlLnRzIiwiLi4vLi4vLi4vc3JjL0RhdGFNZ3IudHMiLCIuLi8uLi8uLi9zcmMvRUxvY2FsU3lzdGVtS2V5LnRzIiwiLi4vLi4vLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVudk1nciB9IGZyb20gXCJ6bWdfZW52X21nclwiO1xuaW1wb3J0IHsgZ0xvZywgZ1dhcm4sIFN0cmluZ1V0aWwgfSBmcm9tIFwiem1nX3V0aWxcIjtcblxuZXhwb3J0IGNsYXNzIExpdmluZ0RhdGFCYXNlIGV4dGVuZHMgY2MuRXZlbnRUYXJnZXQgaW1wbGVtZW50cyB6bWcuSURhdGFCYXNlIHtcbiAgICBwcml2YXRlIF9kYXRhYmFzZTogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgICBwdWJsaWMgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZGF0YWJhc2UgPSB7fTtcbiAgICB9XG4gICAgcHVibGljIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YWJhc2UgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuICAgIHB1YmxpYyBnZXRJdGVtKGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFiYXNlW2tleV07XG4gICAgfVxuICAgIHB1YmxpYyBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICBnV2FybihcIuaVsOaNruWIneWni+WMluWksei0pVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBnTG9nKFwi5YaZ5YWl5pys5Zyw5a2Y5YKo5pWw5o2uLi4uXCIpO1xuICAgICAgICBpZiAoY2MuaXNWYWxpZCh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGFiYXNlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kYXRhYmFzZVtrZXldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHB1YmxpYyByZW1vdmVJdGVtKGtleTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0SXRlbShrZXksIFwiXCIpO1xuICAgIH1cbiAgICBwdWJsaWMgY2xlYXJJdGVtQnlLZXkod29yZDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuX2RhdGFiYXNlKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuX2RhdGFiYXNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuX2RhdGFiYXNlW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKHdvcmQpICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFiYXNlW2tleV0gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fZGF0YWJhc2Vba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9kYXRhYmFzZSA9IHt9O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBFbnZNZ3IgfSBmcm9tIFwiem1nX2Vudl9tZ3JcIjtcclxuaW1wb3J0IHsgZ0xvZywgZ1dhcm4sIFN0cmluZ1V0aWwgfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2NhbERhdGFCYXNlIGV4dGVuZHMgY2MuRXZlbnRUYXJnZXQgaW1wbGVtZW50cyB6bWcuSURhdGFCYXNlIHtcclxuICAgIHByaXZhdGUgX2RhdGFiYXNlOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+O1xyXG4gICAgcHVibGljIGluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1zZzogYW55ID0gY2Muc3lzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKEVudk1nci5nZXRVc2VySWQoKSk7XHJcbiAgICAgICAgdGhpcy5fZGF0YWJhc2UgPSBTdHJpbmdVdGlsLmlzVmFsaWQobXNnKSA/IEpTT04ucGFyc2UobXNnKSA6IHt9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhYmFzZSA/IHRydWUgOiBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRBcHBJdGVtKGFwcDogc3RyaW5nLCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0SXRlbShhcHAgKyBcIl9cIiArIGtleSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEFwcEl0ZW0oYXBwOiBzdHJpbmcsIGtleTogc3RyaW5nLCBkZWY/OiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5nZXRJdGVtKGFwcCArIFwiX1wiICsga2V5KTtcclxuICAgICAgICByZXR1cm4gZGF0YSA9PT0gdW5kZWZpbmVkID8gZGVmIDogZGF0YTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRJdGVtKGtleTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YWJhc2Vba2V5XTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgZ1dhcm4oXCLmlbDmja7liJ3lp4vljJblpLHotKVcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVzZXJJZCA9IEVudk1nci5nZXRVc2VySWQoKTtcclxuICAgICAgICBpZiAoIXZhbHVlIHx8ICh0eXBlb2YgKHZhbHVlKSA9PSBcInN0cmluZ1wiICYmIHZhbHVlLmxlbmd0aCAhPSAwKSkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZGF0YWJhc2Vba2V5XTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhYmFzZVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNjLnN5cy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh1c2VySWQsIEpTT04uc3RyaW5naWZ5KHRoaXMuX2RhdGFiYXNlKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0SXRlbShrZXksIFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2RhdGFiYXNlID0ge307XHJcbiAgICAgICAgbGV0IHVzZXJJZCA9IEVudk1nci5nZXRVc2VySWQoKTtcclxuICAgICAgICBjYy5zeXMubG9jYWxTdG9yYWdlLnNldEl0ZW0odXNlcklkLCBcIlwiKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEVudk1nciB9IGZyb20gXCJ6bWdfZW52X21nclwiO1xuaW1wb3J0IHsgRXZlbnROYW1lIH0gZnJvbSBcInptZ19ldmVudF9tZ3JcIjtcbmltcG9ydCB7IGdMb2csIGdXYXJuLCBTdHJpbmdVdGlsIH0gZnJvbSBcInptZ191dGlsXCI7XG5pbXBvcnQgeyBTZXJ2ZXJFdmVudCwgU2VydmVyTGlzdGVuZXIsIFNlcnZlck1nciwgem1nQ29tbWFuZHMgfSBmcm9tIFwiem1nX3dlYnNlcnZlcl9tZ3JcIjtcbmV4cG9ydCBjbGFzcyBTZXJ2ZXJEYXRhQmFzZSBleHRlbmRzIGNjLkV2ZW50VGFyZ2V0IGltcGxlbWVudHMgem1nLklEYXRhQmFzZSB7XG5cbiAgICBwcml2YXRlIF9kYXRhYmFzZTogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcblxuICAgIHB1YmxpYyBpbml0KCk6IHZvaWQge1xuICAgICAgICBpZiAoU2VydmVyTWdyLmlzVmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0U2VydmVyRGF0YSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgU2VydmVyTWdyLm9uY2UoU2VydmVyRXZlbnQuUkVBRFksIHRoaXMuZ2V0U2VydmVyRGF0YSwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHVibGljIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YWJhc2UgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuICAgIHB1YmxpYyBnZXRJdGVtKGtleTogc3RyaW5nKTogYW55IHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBtc2c6IHN0cmluZyA9IHRoaXMuX2RhdGFiYXNlW2tleV07XG4gICAgICAgIGlmIChtc2cgPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1zZyA/ICh0eXBlb2YgKG1zZykgPT0gJ3N0cmluZycgPyBtc2cgOiBKU09OLnN0cmluZ2lmeShtc2cpKSA6IG51bGw7XG4gICAgfVxuICAgIHB1YmxpYyBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogYW55KTogdm9pZCB7XG4gICAgICAgIGxldCBtc2c6IHN0cmluZyA9IHZhbHVlID8gKHR5cGVvZiAodmFsdWUpID09IFwic3RyaW5nXCIgPyB2YWx1ZSA6IEpTT04uc3RyaW5naWZ5KHZhbHVlKSkgOiBcInVuZGVmaW5lZFwiO1xuICAgICAgICBpZiAodGhpcy5fZGF0YWJhc2UpIHtcbiAgICAgICAgICAgIHRoaXMuX2RhdGFiYXNlW2tleV0gPSBtc2c7XG4gICAgICAgIH1cbiAgICAgICAgLy/lj5HpgIHlkI7lj7BcbiAgICAgICAgaWYgKFNlcnZlck1nci5pc1ZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbmRTZXJ2ZXJEYXRhKGtleSwgbXNnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFNlcnZlck1nci5vbmNlKFNlcnZlckV2ZW50LlJFQURZLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kU2VydmVyRGF0YShrZXksIG1zZyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBnTG9nKFwi5YaZ5YWl5pyN5Yqh5Zmo5a2Y5YKo5pWw5o2uLi4uXCIpO1xuICAgIH1cbiAgICBwdWJsaWMgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZGF0YWJhc2UpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9kYXRhYmFzZVtrZXldO1xuICAgICAgICB9XG4gICAgICAgIC8v5Y+R6YCB5ZCO5Y+wXG4gICAgICAgIC8v5Y+R6YCB5ZCO5Y+wXG4gICAgICAgIGlmIChTZXJ2ZXJNZ3IuaXNWYWxpZCkge1xuICAgICAgICAgICAgdGhpcy5zZW5kU2VydmVyRGF0YShrZXksIFwiXCIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgU2VydmVyTWdyLm9uY2UoU2VydmVyRXZlbnQuUkVBRFksICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRTZXJ2ZXJEYXRhKGtleSwgXCJcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9kYXRhYmFzZSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5fZGF0YWJhc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRoaXMuX2RhdGFiYXNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8v5riF6Zmk5omA5pyJ5pWw5o2uXG4gICAgICAgICAgICAgICAgICAgIGlmIChTZXJ2ZXJNZ3IuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kU2VydmVyRGF0YShrZXksIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgU2VydmVyTWdyLm9uY2UoU2VydmVyRXZlbnQuUkVBRFksICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRTZXJ2ZXJEYXRhKGtleSwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2RhdGFiYXNlID0ge307XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFNlcnZlckRhdGEoKTogdm9pZCB7XG4gICAgICAgIGxldCBwYXJhbTogYW55ID0ge1xuICAgICAgICAgICAgdXNlcklkOiBFbnZNZ3IuZ2V0VXNlcklkKCksXG4gICAgICAgIH1cbiAgICAgICAgU2VydmVyTWdyLnNlbmRHZXQoem1nQ29tbWFuZHMuc3RvcmFnZUJhdGNoLCBwYXJhbSwgbmV3IFNlcnZlckxpc3RlbmVyKHRoaXMsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGFiYXNlID0gZGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnROYW1lLlJFQURZKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ1dhcm4oXCLov5Tlm57mtojmga/kuLrnqbouLi5cIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YWJhc2UgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZW5kU2VydmVyRGF0YShrZXk6IHN0cmluZywgbXNnOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgIGdXYXJuKFwi6ZSu5YC85LiN6IO95Li656m6IVwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBtc2cgPSBTdHJpbmdVdGlsLmlzVmFsaWQobXNnKSA/IG1zZyA6IFwidW5kZWZpbmVkXCI7XG4gICAgICAgIGxldCBwYXJhbTogYW55ID0ge1xuICAgICAgICAgICAgXCJrZXlcIjoga2V5LFxuICAgICAgICAgICAgXCJ2YWx1ZVwiOiBtc2dcbiAgICAgICAgfVxuICAgICAgICBTZXJ2ZXJNZ3Iuc2VuZFBvc3Qoem1nQ29tbWFuZHMuc3RvcmFnZVB1dCwgcGFyYW0sIG5ldyBTZXJ2ZXJMaXN0ZW5lcih0aGlzLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBnTG9nKFwi5pWw5o2u5L+d5a2Y5oiQ5YqfLGtleTogXCIgKyBrZXkgKyBcIiB2YWx1ZTpcIiArIG1zZyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0YWJhc2Vba2V5XSA9IG1zZztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZ0xvZyhcIuaVsOaNruS/neWtmOWksei0pSxrZXk6IFwiICsga2V5ICsgXCIgdmFsdWU6XCIgKyBtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSlcbiAgICB9XG59IiwiXG5pbXBvcnQgeyBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xuaW1wb3J0IHsgQmFzZU1nciB9IGZyb20gXCJ6bWdfbWdyXCI7XG5pbXBvcnQgeyBMaXZpbmdEYXRhQmFzZSB9IGZyb20gXCIuL0xpdmluZ0RhdGFCYXNlXCI7XG5pbXBvcnQgeyBMb2NhbERhdGFCYXNlIH0gZnJvbSBcIi4vTG9jYWxEYXRhQmFzZVwiO1xuaW1wb3J0IHsgU2VydmVyRGF0YUJhc2UgfSBmcm9tIFwiLi9TZXJ2ZXJEYXRhQmFzZVwiO1xuZXhwb3J0IGNsYXNzIF9EYXRhTWdyIGV4dGVuZHMgQmFzZU1nciBpbXBsZW1lbnRzIHptZy5JRGF0YU1nciB7XG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBfRGF0YU1ncjtcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogX0RhdGFNZ3Ige1xuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfRGF0YU1ncigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcbiAgICB9XG4gICAgcHJpdmF0ZSBfbG9jYWw6IExvY2FsRGF0YUJhc2U7XG4gICAgcHJpdmF0ZSBfc2VydmVyOiBTZXJ2ZXJEYXRhQmFzZTtcbiAgICBwcml2YXRlIF9saXZpbmc6IExpdmluZ0RhdGFCYXNlO1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuICAgIGFzeW5jIHN0YXJ0KCkge1xuICAgICAgICB0aGlzLl9sb2NhbCA9IG5ldyBMb2NhbERhdGFCYXNlKCk7XG4gICAgICAgIHRoaXMuX3NlcnZlciA9IG5ldyBTZXJ2ZXJEYXRhQmFzZSgpO1xuICAgICAgICB0aGlzLl9saXZpbmcgPSBuZXcgTGl2aW5nRGF0YUJhc2UoKTtcbiAgICAgICAgdGhpcy5fbG9jYWwuaW5pdCgpO1xuICAgICAgICB0aGlzLl9zZXJ2ZXIuaW5pdCgpO1xuICAgICAgICB0aGlzLl9saXZpbmcuaW5pdCgpO1xuICAgICAgICBpZiAodGhpcy5fc2VydmVyLmlzVmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NlcnZlci5vbmNlKEV2ZW50TmFtZS5SRUFEWSwgdGhpcy5jaGVjaywgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcHJpdmF0ZSBjaGVjaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50TmFtZS5SRUFEWSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGxvY2FsKCk6IExvY2FsRGF0YUJhc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9jYWw7XG4gICAgfVxuICAgIHB1YmxpYyBnZXQgc2VydmVyKCk6IFNlcnZlckRhdGFCYXNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlcnZlcjtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGxpdmluZygpOiBMaXZpbmdEYXRhQmFzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXZpbmc7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VydmVyLmlzVmFsaWQgJiYgdGhpcy5fbG9jYWwuaXNWYWxpZDtcbiAgICB9XG59XG5cbiIsImV4cG9ydCBlbnVtICRFTG9jYWxTeXN0ZW1LZXkge1xuICAgIC8qKlxuICAgICAqIOiDjOaZr+mfs+aViOiuvue9rlxuICAgICAqL1xuICAgIElTX0NMT1NFX0FVRElPID0gXCJpc0Nsb3NlQXVkaW9cIixcbn0iLCJpbXBvcnQgeyBfRGF0YU1nciB9IGZyb20gXCIuL0RhdGFNZ3JcIjtcclxuaW1wb3J0IHsgJEVMb2NhbFN5c3RlbUtleSB9IGZyb20gXCIuL0VMb2NhbFN5c3RlbUtleVwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IGxldCBFTG9jYWxTeXN0ZW1LZXkgPSAkRUxvY2FsU3lzdGVtS2V5O1xyXG5cclxuZXhwb3J0IGxldCBEYXRhTWdyID0gX0RhdGFNZ3IuZ2V0SW5zdGFuY2UoKTsiXSwibmFtZXMiOlsiZ1dhcm4iLCJnTG9nIiwiRW52TWdyIiwiU3RyaW5nVXRpbCIsIlNlcnZlck1nciIsIlNlcnZlckV2ZW50Iiwiem1nQ29tbWFuZHMiLCJTZXJ2ZXJMaXN0ZW5lciIsIkV2ZW50TmFtZSIsIkJhc2VNZ3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQTtJQUFvQyxrQ0FBYztJQUFsRDs7S0F3Q0M7SUF0Q1UsNkJBQUksR0FBWDtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0tBQ3ZCO0lBQ0Qsc0JBQVcsbUNBQU87YUFBbEI7WUFDSSxPQUFPLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQztTQUN4Qzs7O09BQUE7SUFDTSxnQ0FBTyxHQUFkLFVBQWUsR0FBVztRQUN0QixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDOUI7SUFDTSxnQ0FBTyxHQUFkLFVBQWUsR0FBVyxFQUFFLEtBQVU7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZkEsY0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU87U0FDVjtRQUNEQyxhQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEIsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1NBQy9CO2FBQU07WUFDSCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDOUI7S0FDSjtJQUNNLG1DQUFVLEdBQWpCLFVBQWtCLEdBQVc7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDekI7SUFD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
