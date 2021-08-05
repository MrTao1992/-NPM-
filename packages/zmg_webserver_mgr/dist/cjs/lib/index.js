'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_util = require('zmg_util');
var zmg_config_mgr = require('zmg_config_mgr');
var zmg_event_mgr = require('zmg_event_mgr');
var zmg_env_mgr = require('zmg_env_mgr');
var zmg_mgr = require('zmg_mgr');
var zmg_ui_mgr = require('zmg_ui_mgr');
var zmg_gamedata_mgr = require('zmg_gamedata_mgr');

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

var $ServerEvent = /** @class */ (function (_super) {
    __extends($ServerEvent, _super);
    function $ServerEvent(type) {
        return _super.call(this, type, false) || this;
    }
    /**
     * 错误消息
     */
    $ServerEvent.prototype.init = function (xhr) {
        if (xhr && zmg_util.StringUtil.isValid(xhr.response)) {
            this._response = JSON.parse(xhr.response);
        }
    };
    Object.defineProperty($ServerEvent.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (v) {
            this._status = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($ServerEvent.prototype, "code", {
        get: function () {
            return this._code ? this._code : "";
        },
        set: function (v) {
            this._code = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($ServerEvent.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (v) {
            this._message = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($ServerEvent.prototype, "response", {
        get: function () {
            return this._response;
        },
        set: function (value) {
            this._response = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($ServerEvent.prototype, "data", {
        get: function () {
            var obj;
            var res = this.response;
            if (res) {
                if (zmg_util.StringUtil.isValid(res.code)) {
                    obj = res.data;
                }
                else {
                    obj = this.response;
                }
            }
            return obj;
        },
        enumerable: false,
        configurable: true
    });
    $ServerEvent.READY = zmg_event_mgr.EventName.SERVER_READY;
    $ServerEvent.ERROR = zmg_event_mgr.EventName.SERVER_ERROR;
    $ServerEvent.COMPLETE = zmg_event_mgr.EventName.SERVER_COMPLETE;
    return $ServerEvent;
}(cc.Event));

/**
 * 服务器拉取过的数据存储的内容
 */
var ServerVo = /** @class */ (function () {
    function ServerVo() {
        this._vo = {};
    }
    ServerVo.prototype.getData = function (cmd) {
        return this._vo[cmd];
    };
    ServerVo.prototype.saveData = function (cmd, data) {
        this._vo[cmd] = data;
    };
    ServerVo.prototype.clearData = function (cmd) {
        delete this._vo[cmd];
    };
    ServerVo.prototype.clear = function () {
        this._vo = {};
    };
    return ServerVo;
}());

var $ServerListener = /** @class */ (function () {
    function $ServerListener(target, launchFun, errorFun) {
        if (launchFun === void 0) { launchFun = null; }
        if (errorFun === void 0) { errorFun = null; }
        this.target = target;
        this.launchFun = launchFun;
        this.errorFun = errorFun;
    }
    $ServerListener.prototype.onLaunch = function (data) {
        if (this.isValid()) {
            if (this.launchFun) {
                this.launchFun.call(this.target, data);
            }
        }
        this.destroy();
    };
    $ServerListener.prototype.onError = function (castData) {
        if (this.isValid()) {
            zmg_util.gWarn("消息错误,", castData);
            if (zmg_util.StringUtil.isValid(castData.message)) {
                zmg_ui_mgr.UIMgr.alert.open(castData.message);
            }
            else if (castData.status == -1) {
                zmg_ui_mgr.UIMgr.toast.open("掌门国服务器走神了...", 3);
            }
            if (this.errorFun) {
                this.errorFun.call(this.target, castData);
            }
        }
        this.destroy();
    };
    $ServerListener.prototype.isValid = function () {
        return this.target ? cc.isValid(this.target) : true;
    };
    $ServerListener.prototype.destroy = function () {
        this.target = null;
        this.errorFun = null;
        this.launchFun = null;
    };
    return $ServerListener;
}());

var $EServerMethod;
(function ($EServerMethod) {
    $EServerMethod["GET"] = "get";
    $EServerMethod["POST"] = "post";
})($EServerMethod || ($EServerMethod = {}));
var $ServerItem = /** @class */ (function () {
    function $ServerItem() {
    }
    $ServerItem.prototype.getKey = function () {
        return this.clsName + "_" + JSON.stringify(this._param);
    };
    Object.defineProperty($ServerItem.prototype, "clsName", {
        get: function () {
            /**
             * 加密后 这个会变化
             */
            // return this.constructor.name;
            return this.path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($ServerItem.prototype, "param", {
        get: function () {
            if (!this._param) {
                this._param = {};
            }
            return this._param;
        },
        enumerable: false,
        configurable: true
    });
    $ServerItem.prototype.setData = function (res) {
        this._data = res;
    };
    Object.defineProperty($ServerItem.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: false,
        configurable: true
    });
    $ServerItem.prototype.clear = function () {
        var key = this.clsName + "_" + JSON.stringify(this.param);
        zmg_gamedata_mgr.DataMgr.living.clearItemByKey(key);
    };
    return $ServerItem;
}());

var WebServerMethod;
(function (WebServerMethod) {
    WebServerMethod["GET"] = "GET";
    WebServerMethod["POST"] = "POST";
})(WebServerMethod || (WebServerMethod = {}));
var _ServerMgr = /** @class */ (function (_super) {
    __extends(_ServerMgr, _super);
    function _ServerMgr() {
        return _super.call(this) || this;
    }
    _ServerMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _ServerMgr();
        }
        return this._instance;
    };
    _ServerMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                if (zmg_env_mgr.EnvMgr.isValid) {
                    this._vo = new ServerVo();
                    this._listeners = [];
                    this.initConfig();
                }
                else {
                    zmg_env_mgr.EnvMgr.once(zmg_event_mgr.EventName.ENV_READY, this.start, this);
                }
                return [2 /*return*/];
            });
        });
    };
    _ServerMgr.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this._vo.clear();
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONFIG_READY, this.onConfigComplete, this);
    };
    Object.defineProperty(_ServerMgr.prototype, "isValid", {
        get: function () {
            return this._config ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    _ServerMgr.prototype.clearVo = function (cmd) {
        this._vo.clearData(cmd);
    };
    _ServerMgr.prototype.resetVo = function () {
        this._vo = new ServerVo();
    };
    _ServerMgr.prototype.changeVo = function (cmd, key, value) {
        var data = this._vo.getData(cmd);
        if (data && zmg_util.StringUtil.isValid(key)) {
            data[key] = value;
        }
        return data;
    };
    _ServerMgr.prototype.getItemCache = function (item, callback, target, errorFun) {
        var _this = this;
        if (errorFun === void 0) { errorFun = null; }
        var key = item.getKey();
        var localData = this._vo.getData(key);
        if (localData) {
            item.setData(localData);
            callback.call(target, item);
        }
        else {
            _ServerMgr.getInstance().send(item, function (pitem, lis) {
                _this._vo.saveData(key, pitem.data);
                callback.call(target, pitem);
            }, target, errorFun);
        }
    };
    _ServerMgr.prototype.send = function (item, listener, target, errorFun, cache) {
        if (errorFun === void 0) { errorFun = null; }
        if (cache === void 0) { cache = false; }
        var lis;
        if ((listener instanceof $ServerListener)) {
            lis = new $ServerListener(target, function (res) {
                item.setData(res);
                listener.onLaunch(item);
            }, listener.errorFun);
        }
        else {
            lis = new $ServerListener(target, function (res) {
                item.setData(res);
                listener.call(target, item, lis);
            }, errorFun);
        }
        if (item.method == $EServerMethod.GET) {
            return this.sendGet(item.path, item.param, lis, this, cache);
        }
        else {
            return this.sendPost(item.path, item.param, lis, this, cache);
        }
    };
    _ServerMgr.prototype.sendGet = function (name, params, listener, target, cache) {
        if (cache === void 0) { cache = false; }
        if (!this._url) {
            zmg_util.gWarn("服务器地址未找到!");
            return null;
        }
        var url = this._url + name;
        params = params || {};
        if (url.indexOf("?") == -1) {
            url += "?";
        }
        var p = zmg_util.StringUtil.getQuery(params);
        p = p.length ? p + "&bu=2" : "bu=2";
        url += p;
        if (!(listener instanceof $ServerListener)) {
            listener = new $ServerListener(target, listener);
        }
        if (cache && this.dealByCache(name, url, listener)) {
            //缓存数据已处理完毕
            return null;
        }
        return this.sendHttp(url, WebServerMethod.GET, null, listener);
    };
    _ServerMgr.prototype.sendPost = function (name, params, listener, target, cache) {
        if (cache === void 0) { cache = false; }
        if (!this._url) {
            zmg_util.gWarn("服务器地址未找到!");
            return null;
        }
        params = params ? params : {};
        var url = this._url + name;
        if (listener instanceof Function) {
            listener = new $ServerListener(target, listener);
        }
        if (cache && this.dealByCache(name, url, listener)) {
            //缓存数据已处理完毕
            return null;
        }
        return this.sendHttp(url, WebServerMethod.POST, params, listener);
    };
    _ServerMgr.prototype.dealByCache = function (name, url, listener) {
        var data = this._vo.getData(name);
        if (data !== undefined) {
            if (listener) {
                this.onComplete(url, data);
            }
            return true;
        }
        return false;
    };
    _ServerMgr.prototype.addListener = function (url, listener) {
        if (listener) {
            listener.url = url;
            this._listeners.push(listener);
        }
    };
    _ServerMgr.prototype.initConfig = function () {
        if (zmg_config_mgr.ConfigMgr.isValid) {
            this.onConfigComplete();
        }
        else {
            zmg_event_mgr.EventMgr.once(zmg_event_mgr.EventName.CONFIG_READY, this.onConfigComplete, this);
        }
    };
    _ServerMgr.prototype.sendHttp = function (url, method, params, listener, cache) {
        if (cache === void 0) { cache = true; }
        zmg_util.gLog("发送消息:", "url:" + url, "method:" + method, "params:" + JSON.stringify(params));
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'text';
        xhr.onreadystatechange = this.onReadyStateChange.bind(this, xhr, url, cache);
        xhr.ontimeout = this.onTimeout.bind(this, xhr);
        xhr.onerror = this.onServerError.bind(this, xhr);
        xhr.onabort = this.onAbort.bind(this, xhr);
        xhr.open(method, url, true);
        this.setHttpHeaders(xhr, { 'Content-Type': 'application/json' });
        this.setHttpHeaders(xhr, { 'Accept': 'application/json' });
        this.setHttpHeaders(xhr, { 'App-Name': 'KidsPC' });
        this.setHttpHeaders(xhr, { 'Api-Version': zmg_env_mgr.EnvMgr.getApiVersion() });
        this.setHttpHeaders(xhr, { 'App-Version': zmg_env_mgr.EnvMgr.getAppVersion() });
        var token = zmg_env_mgr.EnvMgr.getToken();
        this.setHttpHeaders(xhr, { 'accessToken': token });
        if (params) {
            if (typeof params === 'object') {
                params = JSON.stringify(params);
                if (params.length <= 2) {
                    params = '{"bu":"' + this._bu + '"}';
                }
                else {
                    params = params.slice(0, params.length - 1) + ',"bu":"' + this._bu + '"}';
                }
            }
        }
        this.addListener(url, listener);
        xhr.send(params);
        return xhr;
    };
    _ServerMgr.prototype.setHttpHeaders = function (xhr, headers) {
        for (var key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
    };
    _ServerMgr.prototype.onReadyStateChange = function (xhr, url, cache) {
        var response;
        var castData = {
            status: -1,
            code: "",
            message: ""
        };
        if (xhr.readyState === 4) {
            try {
                response = JSON.parse(xhr.responseText);
                if (response) {
                    castData.code = response.code ? response.code : "";
                    castData.message = response.message ? response.message : "";
                    castData.status = xhr.status;
                }
            }
            catch (e) {
                response = null;
            }
            if (xhr.status >= 200 && xhr.status < 300) {
                if (response.code == 0) {
                    this.onComplete(url, response);
                    this.removeXhrEvent(xhr);
                    if (cache) {
                        this._vo.saveData(url, xhr);
                    }
                }
                else {
                    this.onError(xhr, url, castData);
                }
            }
            else {
                this.onError(xhr, url, castData);
            }
        }
    };
    _ServerMgr.prototype.onTimeout = function (url, xhr) {
        this.onError(xhr, url, {
            status: 404,
            code: "-1",
            message: "服务器访问超时。",
        });
    };
    _ServerMgr.prototype.onServerError = function (url, xhr) {
        this.onError(xhr, url, {
            status: 404,
            code: "-1",
            message: "服务器访问错误。",
        });
    };
    _ServerMgr.prototype.onAbort = function (url, xhr) {
        zmg_util.gLog("Server onAbort:");
        this.onError(xhr, url, {
            status: 404,
            code: "-1",
            message: "用户取消访问。",
        });
    };
    _ServerMgr.prototype.onComplete = function (url, response) {
        var evt;
        evt = new $ServerEvent($ServerEvent.COMPLETE);
        evt.response = response;
        this.dispatchEvent(evt);
        var list = this.findListener(url);
        var i;
        var len = list.length;
        for (i = 0; i < len; i++) {
            list[i].onLaunch(evt.data);
        }
    };
    _ServerMgr.prototype.onError = function (xhr, url, castData) {
        var evt;
        evt = new $ServerEvent($ServerEvent.ERROR);
        evt.code = castData.code ? castData.code : "";
        evt.status = castData.status ? castData.status : -1;
        evt.message = castData.message ? castData.message : "";
        this.dispatchEvent(evt);
        var list = this.findListener(url);
        var i;
        var len = list.length;
        for (i = 0; i < len; i++) {
            list[i].onError(castData);
        }
        this.removeXhrEvent(xhr);
    };
    _ServerMgr.prototype.removeXhrEvent = function (xhr) {
        if (xhr) {
            xhr.ontimeout = null;
            xhr.onerror = null;
            xhr.onabort = null;
            xhr.onreadystatechange = null;
            xhr.abort();
        }
    };
    _ServerMgr.prototype.findListener = function (url, isDelete) {
        if (isDelete === void 0) { isDelete = true; }
        var list = [];
        var i;
        var len = this._listeners.length;
        for (i = len - 1; i >= 0; i--) {
            if (this._listeners[i].url == url) {
                list.push(this._listeners[i]);
                if (isDelete) {
                    this._listeners.splice(i, 1);
                }
            }
        }
        return list;
    };
    _ServerMgr.prototype.onConfigComplete = function () {
        zmg_util.gLog("配置服务器地址信息...");
        this._bu = zmg_config_mgr.ConfigMgr.getBu();
        this._config = zmg_config_mgr.ConfigMgr.getServerConfig();
        this._url = this._config.server + this._config.serverPath;
        zmg_util.gLog("bu: " + this._bu);
        zmg_util.gLog("url: " + this._url);
        // gLog("config: " + this._config);
        var evt = new $ServerEvent(zmg_event_mgr.EventName.SERVER_READY);
        zmg_event_mgr.EventMgr.dispatchEvent(evt);
        this.dispatchEvent(evt);
    };
    return _ServerMgr;
}(zmg_mgr.BaseMgr));

/**
 * swagger:
 * http://kids-study-park-c-fat-alhz.inzm.com/swagger-ui.html#/
 */
var $zmgCommands;
(function ($zmgCommands) {
    //-----------------------------------------大厅-----------------------------------------
    /**
     * 获取缓存在服务器的数据
     */
    $zmgCommands["storageBatch"] = "/kids/study/park/c/api/dict/storage/batch";
    $zmgCommands["storagePut"] = "/kids/study/park/c/api/dict/storage/put";
    /**
     * 获取勋章墙宠物信息
     */
    $zmgCommands["carryMedal"] = "/kids/medal-wall/api/user-medal/carry";
})($zmgCommands || ($zmgCommands = {}));

var ServerMgr = _ServerMgr.getInstance();
var ServerEvent = /** @class */ (function (_super) {
    __extends(ServerEvent, _super);
    function ServerEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServerEvent;
}($ServerEvent));
var ServerListener = /** @class */ (function (_super) {
    __extends(ServerListener, _super);
    function ServerListener() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServerListener;
}($ServerListener));
var ServerItem = /** @class */ (function (_super) {
    __extends(ServerItem, _super);
    function ServerItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServerItem;
}($ServerItem));
var zmgCommands = $zmgCommands;
var EServerMethod = $EServerMethod;

exports.EServerMethod = EServerMethod;
exports.ServerEvent = ServerEvent;
exports.ServerItem = ServerItem;
exports.ServerListener = ServerListener;
exports.ServerMgr = ServerMgr;
exports.zmgCommands = zmgCommands;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9TZXJ2ZXJFdmVudC50cyIsIi4uLy4uLy4uL3NyYy9TZXJ2ZXJWby50cyIsIi4uLy4uLy4uL3NyYy9TZXJ2ZXJMaXN0ZW5lci50cyIsIi4uLy4uLy4uL3NyYy9TZXJ2ZXJJdGVtLnRzIiwiLi4vLi4vLi4vc3JjL1NlcnZlck1nci50cyIsIi4uLy4uLy4uL3NyYy96bWdDb21tYW5kcy50cyIsIi4uLy4uLy4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgeyBTdHJpbmdVdGlsIH0gZnJvbSBcInptZ191dGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgJFNlcnZlckV2ZW50IGV4dGVuZHMgY2MuRXZlbnQge1xyXG4gICAgc3RhdGljIFJFQURZOiBzdHJpbmcgPSBFdmVudE5hbWUuU0VSVkVSX1JFQURZO1xyXG4gICAgc3RhdGljIEVSUk9SOiBzdHJpbmcgPSBFdmVudE5hbWUuU0VSVkVSX0VSUk9SO1xyXG4gICAgc3RhdGljIENPTVBMRVRFOiBzdHJpbmcgPSBFdmVudE5hbWUuU0VSVkVSX0NPTVBMRVRFO1xyXG4gICAgcHJpdmF0ZSBfc3RhdHVzOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9jb2RlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9tZXNzYWdlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9yZXNwb25zZTogYW55O1xyXG4gICAgLyoqXHJcbiAgICAgKiDplJnor6/mtojmga8gXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBpbml0KHhocjogWE1MSHR0cFJlcXVlc3QpOiB2b2lkIHtcclxuICAgICAgICBpZiAoeGhyICYmIFN0cmluZ1V0aWwuaXNWYWxpZCh4aHIucmVzcG9uc2UpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jlc3BvbnNlID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHN0YXR1cygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0dXNcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IHN0YXR1cyh2OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zdGF0dXMgPSB2O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgY29kZSh2OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9jb2RlID0gdjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGNvZGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29kZSA/IHRoaXMuX2NvZGUgOiBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgbWVzc2FnZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tZXNzYWdlXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBtZXNzYWdlKHY6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX21lc3NhZ2UgPSB2O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcmVzcG9uc2UoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVzcG9uc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHJlc3BvbnNlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9yZXNwb25zZSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOiBhbnkge1xyXG4gICAgICAgIGxldCBvYmo6IGFueVxyXG4gICAgICAgIGxldCByZXM6IGFueSA9IHRoaXMucmVzcG9uc2U7XHJcbiAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICBpZiAoU3RyaW5nVXRpbC5pc1ZhbGlkKHJlcy5jb2RlKSkge1xyXG4gICAgICAgICAgICAgICAgb2JqID0gcmVzLmRhdGE7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvYmogPSB0aGlzLnJlc3BvbnNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcih0eXBlLCBmYWxzZSk7XHJcbiAgICB9XHJcbn0iLCIvKipcbiAqIOacjeWKoeWZqOaLieWPlui/h+eahOaVsOaNruWtmOWCqOeahOWGheWuuVxuICovXG5leHBvcnQgY2xhc3MgU2VydmVyVm8ge1xuICAgIHByaXZhdGUgX3ZvOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XG4gICAgcHVibGljIGdldERhdGEoY21kOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdm9bY21kXTtcbiAgICB9XG4gICAgcHVibGljIHNhdmVEYXRhKGNtZDogc3RyaW5nLCBkYXRhOiBhbnkpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdm9bY21kXSA9IGRhdGE7XG4gICAgfVxuICAgIHB1YmxpYyBjbGVhckRhdGEoY21kOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuX3ZvW2NtZF07XG4gICAgfVxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fdm8gPSB7fTtcbiAgICB9XG59IiwiaW1wb3J0IHsgZ1dhcm4sIFN0cmluZ1V0aWwgfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuaW1wb3J0IHsgVUlNZ3IgfSBmcm9tIFwiem1nX3VpX21nclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzICRTZXJ2ZXJMaXN0ZW5lciBpbXBsZW1lbnRzIHptZy5JU2VydmVyTGlzdGVuZXIge1xyXG4gICAgdGFyZ2V0OiBhbnk7XHJcbiAgICB1cmw6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0YXJnZXQ6IGFueSwgbGF1bmNoRnVuOiAoZGF0YTogYW55KSA9PiB2b2lkID0gbnVsbCwgZXJyb3JGdW46IChjYXN0RGF0YTogem1nLklTZXJ2ZXJDYXN0RGF0YSkgPT4gdm9pZCA9IG51bGwpIHtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgICAgICB0aGlzLmxhdW5jaEZ1biA9IGxhdW5jaEZ1bjtcclxuICAgICAgICB0aGlzLmVycm9yRnVuID0gZXJyb3JGdW47XHJcbiAgICB9XHJcbiAgICBsYXVuY2hGdW46IChkYXRhOiBhbnkpID0+IHZvaWQ7XHJcblxyXG4gICAgZXJyb3JGdW46IChjYXN0RGF0YTogem1nLklTZXJ2ZXJDYXN0RGF0YSkgPT4gdm9pZDtcclxuXHJcbiAgICBwdWJsaWMgb25MYXVuY2goZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCgpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxhdW5jaEZ1bikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sYXVuY2hGdW4uY2FsbCh0aGlzLnRhcmdldCwgZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uRXJyb3IoY2FzdERhdGE6IHptZy5JU2VydmVyQ2FzdERhdGEpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKCkpIHtcclxuICAgICAgICAgICAgZ1dhcm4oXCLmtojmga/plJnor68sXCIsIGNhc3REYXRhKTtcclxuICAgICAgICAgICAgaWYgKFN0cmluZ1V0aWwuaXNWYWxpZChjYXN0RGF0YS5tZXNzYWdlKSkge1xyXG4gICAgICAgICAgICAgICAgVUlNZ3IuYWxlcnQub3BlbihjYXN0RGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjYXN0RGF0YS5zdGF0dXMgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIFVJTWdyLnRvYXN0Lm9wZW4oXCLmjozpl6jlm73mnI3liqHlmajotbDnpZ7kuoYuLi5cIiwgMyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuZXJyb3JGdW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JGdW4uY2FsbCh0aGlzLnRhcmdldCwgY2FzdERhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhcmdldCA/IGNjLmlzVmFsaWQodGhpcy50YXJnZXQpIDogdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5lcnJvckZ1biA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYXVuY2hGdW4gPSBudWxsO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRGF0YU1nciB9IGZyb20gXCJ6bWdfZ2FtZWRhdGFfbWdyXCI7XG5cbmV4cG9ydCBlbnVtICRFU2VydmVyTWV0aG9kIHtcbiAgICBHRVQgPSBcImdldFwiLFxuICAgIFBPU1QgPSBcInBvc3RcIixcbn1cbmV4cG9ydCBjbGFzcyAkU2VydmVySXRlbSB7XG4gICAgLyoqXG4gICAgICog5o6l5Y+j6K6/6Zeu5Zyw5Z2AXG4gICAgICovXG4gICAgcHVibGljIHBhdGg6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiDliY3nvIDorr/pl67mjqXlj6PvvIjpu5jorqTkuLrnqbrvvIzliJnkvb/nlKjluLjop4TliY3nvIDvvIlcbiAgICAgKi9cbiAgICBwdWJsaWMgcHJlZml4OiBzdHJpbmc7XG5cbiAgICBwdWJsaWMgbWV0aG9kOiAkRVNlcnZlck1ldGhvZDtcblxuICAgIC8qKlxuICAgICAqIOWPkemAgeaOpeWPo+WPguaVsFxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfcGFyYW06IGFueTtcblxuICAgIHByb3RlY3RlZCBfZGF0YTogYW55O1xuXG4gICAgcHVibGljIGdldEtleSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jbHNOYW1lICsgXCJfXCIgKyBKU09OLnN0cmluZ2lmeSh0aGlzLl9wYXJhbSk7XG4gICAgfVxuICAgIHB1YmxpYyBnZXQgY2xzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICAvKipcbiAgICAgICAgICog5Yqg5a+G5ZCOIOi/meS4quS8muWPmOWMllxuICAgICAgICAgKi9cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgcmV0dXJuIHRoaXMucGF0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHBhcmFtKCk6IGFueSB7XG4gICAgICAgIGlmICghdGhpcy5fcGFyYW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmFtID0ge307XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmFtO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXREYXRhKHJlczogYW55KSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSByZXM7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBkYXRhKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH1cblxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcbiAgICAgICAgbGV0IGtleSA9IHRoaXMuY2xzTmFtZSArIFwiX1wiICsgSlNPTi5zdHJpbmdpZnkodGhpcy5wYXJhbSk7XG4gICAgICAgIERhdGFNZ3IubGl2aW5nLmNsZWFySXRlbUJ5S2V5KGtleSk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHsgZ0xvZywgU3RyaW5nVXRpbCB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5pbXBvcnQgeyBDb25maWdNZ3IgfSBmcm9tIFwiem1nX2NvbmZpZ19tZ3JcIjtcclxuaW1wb3J0IHsgRXZlbnRNZ3IsIEV2ZW50TmFtZSwgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgeyBnV2FybiB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5pbXBvcnQgeyBFbnZNZ3IgfSBmcm9tIFwiem1nX2Vudl9tZ3JcIlxyXG5pbXBvcnQgeyAkU2VydmVyRXZlbnQgfSBmcm9tIFwiLi9TZXJ2ZXJFdmVudFwiO1xyXG5pbXBvcnQgeyBCYXNlTWdyIH0gZnJvbSBcInptZ19tZ3JcIjtcclxuaW1wb3J0IHsgU2VydmVyVm8gfSBmcm9tIFwiLi9TZXJ2ZXJWb1wiO1xyXG5pbXBvcnQgeyAkem1nQ29tbWFuZHMgfSBmcm9tIFwiLi96bWdDb21tYW5kc1wiO1xyXG5pbXBvcnQgeyAkU2VydmVyTGlzdGVuZXIgfSBmcm9tIFwiLi9TZXJ2ZXJMaXN0ZW5lclwiO1xyXG5pbXBvcnQgeyAkRVNlcnZlck1ldGhvZCwgJFNlcnZlckl0ZW0gfSBmcm9tIFwiLi9TZXJ2ZXJJdGVtXCI7XHJcbmVudW0gV2ViU2VydmVyTWV0aG9kIHtcclxuICAgIEdFVCA9IFwiR0VUXCIsXHJcbiAgICBQT1NUID0gXCJQT1NUXCJcclxufVxyXG5leHBvcnQgY2xhc3MgX1NlcnZlck1nciBleHRlbmRzIEJhc2VNZ3IgaW1wbGVtZW50cyB6bWcuSVdlYlNlcnZlck1nciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IF9TZXJ2ZXJNZ3I7XHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogX1NlcnZlck1nciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfU2VydmVyTWdyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF92bzogU2VydmVyVm87XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9idTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBfdXJsOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9jb25maWc6IHptZy5JU2VydmVyQ29uZmlnO1xyXG4gICAgcHJpdmF0ZSBfbGlzdGVuZXJzOiB6bWcuSVNlcnZlckxpc3RlbmVyW107XHJcbiAgICBwdWJsaWMgYXN5bmMgc3RhcnQoKSB7XHJcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcclxuICAgICAgICBpZiAoRW52TWdyLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdm8gPSBuZXcgU2VydmVyVm8oKTtcclxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdENvbmZpZygpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEVudk1nci5vbmNlKEV2ZW50TmFtZS5FTlZfUkVBRFksIHRoaXMuc3RhcnQsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl92by5jbGVhcigpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09ORklHX1JFQURZLCB0aGlzLm9uQ29uZmlnQ29tcGxldGUsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9jb25maWcgPyB0cnVlIDogZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xlYXJWbyhjbWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3ZvLmNsZWFyRGF0YShjbWQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldFZvKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3ZvID0gbmV3IFNlcnZlclZvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNoYW5nZVZvKGNtZDogc3RyaW5nLCBrZXk/OiBzdHJpbmcsIHZhbHVlPzogYW55KTogYW55IHtcclxuICAgICAgICBsZXQgZGF0YTogb2JqZWN0ID0gdGhpcy5fdm8uZ2V0RGF0YShjbWQpO1xyXG4gICAgICAgIGlmIChkYXRhICYmIFN0cmluZ1V0aWwuaXNWYWxpZChrZXkpKSB7XHJcbiAgICAgICAgICAgIGRhdGFba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXRlbUNhY2hlKGl0ZW06ICRTZXJ2ZXJJdGVtLCBjYWxsYmFjazogKGl0ZW06ICRTZXJ2ZXJJdGVtKSA9PiB2b2lkLCB0YXJnZXQ6IGFueSwgZXJyb3JGdW46IChjYXN0RGF0YTogem1nLklTZXJ2ZXJDYXN0RGF0YSkgPT4gdm9pZCA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICBsZXQga2V5ID0gaXRlbS5nZXRLZXkoKTtcclxuICAgICAgICBsZXQgbG9jYWxEYXRhID0gdGhpcy5fdm8uZ2V0RGF0YShrZXkpO1xyXG4gICAgICAgIGlmIChsb2NhbERhdGEpIHtcclxuICAgICAgICAgICAgaXRlbS5zZXREYXRhKGxvY2FsRGF0YSk7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0LCBpdGVtKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfU2VydmVyTWdyLmdldEluc3RhbmNlKCkuc2VuZChpdGVtLCAocGl0ZW06ICRTZXJ2ZXJJdGVtLCBsaXM6ICRTZXJ2ZXJMaXN0ZW5lcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdm8uc2F2ZURhdGEoa2V5LCBwaXRlbS5kYXRhKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0LCBwaXRlbSk7XHJcbiAgICAgICAgICAgIH0sIHRhcmdldCwgZXJyb3JGdW4pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2VuZChpdGVtOiAkU2VydmVySXRlbSwgbGlzdGVuZXI6IGFueSwgdGFyZ2V0OiBhbnksIGVycm9yRnVuOiAoY2FzdERhdGE6IHptZy5JU2VydmVyQ2FzdERhdGEpID0+IHZvaWQgPSBudWxsLCBjYWNoZTogYm9vbGVhbiA9IGZhbHNlKTogWE1MSHR0cFJlcXVlc3Qge1xyXG4gICAgICAgIGxldCBsaXM6ICRTZXJ2ZXJMaXN0ZW5lcjtcclxuICAgICAgICBpZiAoKGxpc3RlbmVyIGluc3RhbmNlb2YgJFNlcnZlckxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICBsaXMgPSBuZXcgJFNlcnZlckxpc3RlbmVyKHRhcmdldCwgKHJlczogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNldERhdGEocmVzKTtcclxuICAgICAgICAgICAgICAgIGxpc3RlbmVyLm9uTGF1bmNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9LCBsaXN0ZW5lci5lcnJvckZ1bik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGlzID0gbmV3ICRTZXJ2ZXJMaXN0ZW5lcih0YXJnZXQsIChyZXM6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zZXREYXRhKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAobGlzdGVuZXIgYXMgRnVuY3Rpb24pLmNhbGwodGFyZ2V0LCBpdGVtLCBsaXMpO1xyXG4gICAgICAgICAgICB9LCBlcnJvckZ1bik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpdGVtLm1ldGhvZCA9PSAkRVNlcnZlck1ldGhvZC5HRVQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2VuZEdldChpdGVtLnBhdGgsIGl0ZW0ucGFyYW0sIGxpcywgdGhpcywgY2FjaGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbmRQb3N0KGl0ZW0ucGF0aCwgaXRlbS5wYXJhbSwgbGlzLCB0aGlzLCBjYWNoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNlbmRHZXQobmFtZTogc3RyaW5nLCBwYXJhbXM/OiBhbnksIGxpc3RlbmVyPzogYW55LCB0YXJnZXQ/OiBhbnksIGNhY2hlOiBib29sZWFuID0gZmFsc2UpOiBYTUxIdHRwUmVxdWVzdCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl91cmwpIHtcclxuICAgICAgICAgICAgZ1dhcm4oXCLmnI3liqHlmajlnLDlnYDmnKrmib7liLAhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5fdXJsICsgbmFtZTtcclxuICAgICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge31cclxuICAgICAgICBpZiAodXJsLmluZGV4T2YoXCI/XCIpID09IC0xKSB7XHJcbiAgICAgICAgICAgIHVybCArPSBcIj9cIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHAgPSBTdHJpbmdVdGlsLmdldFF1ZXJ5KHBhcmFtcyk7XHJcbiAgICAgICAgcCA9IHAubGVuZ3RoID8gcCArIFwiJmJ1PTJcIiA6IFwiYnU9MlwiO1xyXG4gICAgICAgIHVybCArPSBwO1xyXG4gICAgICAgIGlmICghKGxpc3RlbmVyIGluc3RhbmNlb2YgJFNlcnZlckxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICBsaXN0ZW5lciA9IG5ldyAkU2VydmVyTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lciBhcyAoKGRhdGE6IGFueSkgPT4gdm9pZCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2FjaGUgJiYgdGhpcy5kZWFsQnlDYWNoZShuYW1lLCB1cmwsIGxpc3RlbmVyKSkge1xyXG4gICAgICAgICAgICAvL+e8k+WtmOaVsOaNruW3suWkhOeQhuWujOavlVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VuZEh0dHAodXJsLCBXZWJTZXJ2ZXJNZXRob2QuR0VULCBudWxsLCBsaXN0ZW5lcik7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2VuZFBvc3QobmFtZTogc3RyaW5nLCBwYXJhbXM/OiBhbnksIGxpc3RlbmVyPzogYW55LCB0YXJnZXQ/OiBhbnksIGNhY2hlOiBib29sZWFuID0gZmFsc2UpOiBYTUxIdHRwUmVxdWVzdCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl91cmwpIHtcclxuICAgICAgICAgICAgZ1dhcm4oXCLmnI3liqHlmajlnLDlnYDmnKrmib7liLAhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcGFyYW1zID0gcGFyYW1zID8gcGFyYW1zIDoge307XHJcbiAgICAgICAgbGV0IHVybDogc3RyaW5nID0gdGhpcy5fdXJsICsgbmFtZTtcclxuICAgICAgICBpZiAobGlzdGVuZXIgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xyXG4gICAgICAgICAgICBsaXN0ZW5lciA9IG5ldyAkU2VydmVyTGlzdGVuZXIodGFyZ2V0LCBsaXN0ZW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYWNoZSAmJiB0aGlzLmRlYWxCeUNhY2hlKG5hbWUsIHVybCwgbGlzdGVuZXIpKSB7XHJcbiAgICAgICAgICAgIC8v57yT5a2Y5pWw5o2u5bey5aSE55CG5a6M5q+VXHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zZW5kSHR0cCh1cmwsIFdlYlNlcnZlck1ldGhvZC5QT1NULCBwYXJhbXMsIGxpc3RlbmVyKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlYWxCeUNhY2hlKG5hbWU6IHN0cmluZywgdXJsOiBzdHJpbmcsIGxpc3RlbmVyPzogem1nLklTZXJ2ZXJMaXN0ZW5lcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBkYXRhOiBYTUxIdHRwUmVxdWVzdCA9IHRoaXMuX3ZvLmdldERhdGEobmFtZSk7XHJcbiAgICAgICAgaWYgKGRhdGEgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBpZiAobGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZSh1cmwsIGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRMaXN0ZW5lcih1cmw6IHN0cmluZywgbGlzdGVuZXI6IHptZy5JU2VydmVyTGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAobGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgbGlzdGVuZXIudXJsID0gdXJsO1xyXG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgaW5pdENvbmZpZygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoQ29uZmlnTWdyLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkNvbmZpZ0NvbXBsZXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRXZlbnRNZ3Iub25jZShFdmVudE5hbWUuQ09ORklHX1JFQURZLCB0aGlzLm9uQ29uZmlnQ29tcGxldGUsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHNlbmRIdHRwKHVybDogc3RyaW5nLCBtZXRob2Q6IFdlYlNlcnZlck1ldGhvZCwgcGFyYW1zPzogYW55LCBsaXN0ZW5lcj86IHptZy5JU2VydmVyTGlzdGVuZXIsIGNhY2hlOiBib29sZWFuID0gdHJ1ZSk6IFhNTEh0dHBSZXF1ZXN0IHtcclxuICAgICAgICBnTG9nKFwi5Y+R6YCB5raI5oGvOlwiLCBcInVybDpcIiArIHVybCwgXCJtZXRob2Q6XCIgKyBtZXRob2QsIFwicGFyYW1zOlwiICsgSlNPTi5zdHJpbmdpZnkocGFyYW1zKSk7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICd0ZXh0JztcclxuICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gdGhpcy5vblJlYWR5U3RhdGVDaGFuZ2UuYmluZCh0aGlzLCB4aHIsIHVybCwgY2FjaGUpO1xyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSB0aGlzLm9uVGltZW91dC5iaW5kKHRoaXMsIHhocik7XHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSB0aGlzLm9uU2VydmVyRXJyb3IuYmluZCh0aGlzLCB4aHIpO1xyXG4gICAgICAgIHhoci5vbmFib3J0ID0gdGhpcy5vbkFib3J0LmJpbmQodGhpcywgeGhyKTtcclxuICAgICAgICB4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgIHRoaXMuc2V0SHR0cEhlYWRlcnMoeGhyLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSlcclxuICAgICAgICB0aGlzLnNldEh0dHBIZWFkZXJzKHhociwgeyAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0SHR0cEhlYWRlcnMoeGhyLCB7ICdBcHAtTmFtZSc6ICdLaWRzUEMnIH0pO1xyXG4gICAgICAgIHRoaXMuc2V0SHR0cEhlYWRlcnMoeGhyLCB7ICdBcGktVmVyc2lvbic6IEVudk1nci5nZXRBcGlWZXJzaW9uKCkgfSk7XHJcbiAgICAgICAgdGhpcy5zZXRIdHRwSGVhZGVycyh4aHIsIHsgJ0FwcC1WZXJzaW9uJzogRW52TWdyLmdldEFwcFZlcnNpb24oKSB9KTtcclxuICAgICAgICBsZXQgdG9rZW4gPSBFbnZNZ3IuZ2V0VG9rZW4oKTtcclxuICAgICAgICB0aGlzLnNldEh0dHBIZWFkZXJzKHhociwgeyAnYWNjZXNzVG9rZW4nOiB0b2tlbiB9KTtcclxuICAgICAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1zID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zID0gSlNPTi5zdHJpbmdpZnkocGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMubGVuZ3RoIDw9IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMgPSAne1wiYnVcIjpcIicgKyB0aGlzLl9idSArICdcIn0nO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMgPSBwYXJhbXMuc2xpY2UoMCwgcGFyYW1zLmxlbmd0aCAtIDEpICsgJyxcImJ1XCI6XCInICsgdGhpcy5fYnUgKyAnXCJ9JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKHVybCwgbGlzdGVuZXIpO1xyXG4gICAgICAgIHhoci5zZW5kKHBhcmFtcyk7XHJcbiAgICAgICAgcmV0dXJuIHhocjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc2V0SHR0cEhlYWRlcnMoeGhyOiBYTUxIdHRwUmVxdWVzdCwgaGVhZGVyczogYW55KTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IGluIGhlYWRlcnMpIHtcclxuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgb25SZWFkeVN0YXRlQ2hhbmdlKHhocjogWE1MSHR0cFJlcXVlc3QsIHVybDogc3RyaW5nLCBjYWNoZTogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGxldCByZXNwb25zZTogYW55O1xyXG4gICAgICAgIGxldCBldnQ6ICRTZXJ2ZXJFdmVudDtcclxuICAgICAgICBsZXQgY2FzdERhdGEgPSB7XHJcbiAgICAgICAgICAgIHN0YXR1czogLTEsXHJcbiAgICAgICAgICAgIGNvZGU6IFwiXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICByZXNwb25zZSA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXN0RGF0YS5jb2RlID0gcmVzcG9uc2UuY29kZSA/IHJlc3BvbnNlLmNvZGUgOiBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgY2FzdERhdGEubWVzc2FnZSA9IHJlc3BvbnNlLm1lc3NhZ2UgPyByZXNwb25zZS5tZXNzYWdlIDogXCJcIlxyXG4gICAgICAgICAgICAgICAgICAgIGNhc3REYXRhLnN0YXR1cyA9IHhoci5zdGF0dXNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID49IDIwMCAmJiB4aHIuc3RhdHVzIDwgMzAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuY29kZSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNvbXBsZXRlKHVybCwgcmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlWGhyRXZlbnQoeGhyKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdm8uc2F2ZURhdGEodXJsLCB4aHIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcih4aHIsIHVybCwgY2FzdERhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkVycm9yKHhociwgdXJsLCBjYXN0RGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uVGltZW91dCh1cmw6IHN0cmluZywgeGhyOiBYTUxIdHRwUmVxdWVzdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25FcnJvcih4aHIsIHVybCwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IDQwNCxcclxuICAgICAgICAgICAgY29kZTogXCItMVwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIuacjeWKoeWZqOiuv+mXrui2heaXtuOAglwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblNlcnZlckVycm9yKHVybDogc3RyaW5nLCB4aHI6IFhNTEh0dHBSZXF1ZXN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vbkVycm9yKHhociwgdXJsLCB7XHJcbiAgICAgICAgICAgIHN0YXR1czogNDA0LFxyXG4gICAgICAgICAgICBjb2RlOiBcIi0xXCIsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwi5pyN5Yqh5Zmo6K6/6Zeu6ZSZ6K+v44CCXCIsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uQWJvcnQodXJsOiBzdHJpbmcsIHhocjogWE1MSHR0cFJlcXVlc3QpOiB2b2lkIHtcclxuICAgICAgICBnTG9nKFwiU2VydmVyIG9uQWJvcnQ6XCIpO1xyXG4gICAgICAgIHRoaXMub25FcnJvcih4aHIsIHVybCwge1xyXG4gICAgICAgICAgICBzdGF0dXM6IDQwNCxcclxuICAgICAgICAgICAgY29kZTogXCItMVwiLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBcIueUqOaIt+WPlua2iOiuv+mXruOAglwiLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkNvbXBsZXRlKHVybDogc3RyaW5nLCByZXNwb25zZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGV2dDogJFNlcnZlckV2ZW50O1xyXG4gICAgICAgIGV2dCA9IG5ldyAkU2VydmVyRXZlbnQoJFNlcnZlckV2ZW50LkNPTVBMRVRFKTtcclxuICAgICAgICBldnQucmVzcG9uc2UgPSByZXNwb25zZTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgICAgICBsZXQgbGlzdDogem1nLklTZXJ2ZXJMaXN0ZW5lcltdID0gdGhpcy5maW5kTGlzdGVuZXIodXJsKTtcclxuICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZW46IG51bWJlciA9IGxpc3QubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBsaXN0W2ldLm9uTGF1bmNoKGV2dC5kYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uRXJyb3IoeGhyOiBYTUxIdHRwUmVxdWVzdCwgdXJsOiBzdHJpbmcsIGNhc3REYXRhPzogem1nLklTZXJ2ZXJDYXN0RGF0YSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBldnQ6ICRTZXJ2ZXJFdmVudDtcclxuICAgICAgICBldnQgPSBuZXcgJFNlcnZlckV2ZW50KCRTZXJ2ZXJFdmVudC5FUlJPUik7XHJcbiAgICAgICAgZXZ0LmNvZGUgPSBjYXN0RGF0YS5jb2RlID8gY2FzdERhdGEuY29kZSA6IFwiXCI7XHJcbiAgICAgICAgZXZ0LnN0YXR1cyA9IGNhc3REYXRhLnN0YXR1cyA/IGNhc3REYXRhLnN0YXR1cyA6IC0xO1xyXG4gICAgICAgIGV2dC5tZXNzYWdlID0gY2FzdERhdGEubWVzc2FnZSA/IGNhc3REYXRhLm1lc3NhZ2UgOiBcIlwiO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgICAgIGxldCBsaXN0OiB6bWcuSVNlcnZlckxpc3RlbmVyW10gPSB0aGlzLmZpbmRMaXN0ZW5lcih1cmwpO1xyXG4gICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpc3RbaV0ub25FcnJvcihjYXN0RGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVtb3ZlWGhyRXZlbnQoeGhyKVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZW1vdmVYaHJFdmVudCh4aHI6IFhNTEh0dHBSZXF1ZXN0KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHhocikge1xyXG4gICAgICAgICAgICB4aHIub250aW1lb3V0ID0gbnVsbDtcclxuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSBudWxsO1xyXG4gICAgICAgICAgICB4aHIub25hYm9ydCA9IG51bGw7XHJcbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICB4aHIuYWJvcnQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgZmluZExpc3RlbmVyKHVybDogc3RyaW5nLCBpc0RlbGV0ZTogYm9vbGVhbiA9IHRydWUpOiB6bWcuSVNlcnZlckxpc3RlbmVyW10ge1xyXG4gICAgICAgIGxldCBsaXN0OiB6bWcuSVNlcnZlckxpc3RlbmVyW10gPSBbXTtcclxuICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZW46IG51bWJlciA9IHRoaXMuX2xpc3RlbmVycy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2xpc3RlbmVyc1tpXS51cmwgPT0gdXJsKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0LnB1c2godGhpcy5fbGlzdGVuZXJzW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0RlbGV0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxpc3Q7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uQ29uZmlnQ29tcGxldGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ0xvZyhcIumFjee9ruacjeWKoeWZqOWcsOWdgOS/oeaBry4uLlwiKTtcclxuICAgICAgICB0aGlzLl9idSA9IENvbmZpZ01nci5nZXRCdSgpO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IENvbmZpZ01nci5nZXRTZXJ2ZXJDb25maWcoKTtcclxuICAgICAgICB0aGlzLl91cmwgPSB0aGlzLl9jb25maWcuc2VydmVyICsgdGhpcy5fY29uZmlnLnNlcnZlclBhdGg7XHJcbiAgICAgICAgZ0xvZyhcImJ1OiBcIiArIHRoaXMuX2J1KTtcclxuICAgICAgICBnTG9nKFwidXJsOiBcIiArIHRoaXMuX3VybCk7XHJcbiAgICAgICAgLy8gZ0xvZyhcImNvbmZpZzogXCIgKyB0aGlzLl9jb25maWcpO1xyXG4gICAgICAgIGxldCBldnQgPSBuZXcgJFNlcnZlckV2ZW50KEV2ZW50TmFtZS5TRVJWRVJfUkVBRFkpO1xyXG4gICAgICAgIEV2ZW50TWdyLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIi8qKlxuICogc3dhZ2dlcjpcbiAqIGh0dHA6Ly9raWRzLXN0dWR5LXBhcmstYy1mYXQtYWxoei5pbnptLmNvbS9zd2FnZ2VyLXVpLmh0bWwjL1xuICovXG5leHBvcnQgZW51bSAkem1nQ29tbWFuZHMge1xuICAgIC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS3lpKfljoUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8qKlxuICAgICAqIOiOt+WPlue8k+WtmOWcqOacjeWKoeWZqOeahOaVsOaNrlxuICAgICAqL1xuICAgIHN0b3JhZ2VCYXRjaCA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9kaWN0L3N0b3JhZ2UvYmF0Y2hcIixcbiAgICBzdG9yYWdlUHV0ID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL2RpY3Qvc3RvcmFnZS9wdXRcIixcblxuICAgIC8qKlxuICAgICAqIOiOt+WPluWLi+eroOWimeWuoOeJqeS/oeaBr1xuICAgICAqL1xuICAgIGNhcnJ5TWVkYWwgPSBcIi9raWRzL21lZGFsLXdhbGwvYXBpL3VzZXItbWVkYWwvY2FycnlcIixcbn0iLCJpbXBvcnQgeyBfU2VydmVyTWdyIH0gZnJvbSBcIi4vU2VydmVyTWdyXCI7XHJcbmltcG9ydCB7ICRTZXJ2ZXJFdmVudCB9IGZyb20gXCIuL1NlcnZlckV2ZW50XCI7XHJcbmltcG9ydCB7ICRTZXJ2ZXJMaXN0ZW5lciB9IGZyb20gXCIuL1NlcnZlckxpc3RlbmVyXCI7XHJcbmltcG9ydCB7ICR6bWdDb21tYW5kcyB9IGZyb20gXCIuL3ptZ0NvbW1hbmRzXCI7XHJcbmltcG9ydCB7ICRFU2VydmVyTWV0aG9kLCAkU2VydmVySXRlbSB9IGZyb20gXCIuL1NlcnZlckl0ZW1cIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIjtcclxuXHJcbmV4cG9ydCBsZXQgU2VydmVyTWdyID0gX1NlcnZlck1nci5nZXRJbnN0YW5jZSgpO1xyXG5leHBvcnQgY2xhc3MgU2VydmVyRXZlbnQgZXh0ZW5kcyAkU2VydmVyRXZlbnQgeyB9O1xyXG5leHBvcnQgY2xhc3MgU2VydmVyTGlzdGVuZXIgZXh0ZW5kcyAkU2VydmVyTGlzdGVuZXIgeyB9O1xyXG5leHBvcnQgY2xhc3MgU2VydmVySXRlbSBleHRlbmRzICRTZXJ2ZXJJdGVtIHsgfTtcclxuZXhwb3J0IGxldCB6bWdDb21tYW5kcyA9ICR6bWdDb21tYW5kcztcclxuZXhwb3J0IGxldCBFU2VydmVyTWV0aG9kID0gJEVTZXJ2ZXJNZXRob2Q7Il0sIm5hbWVzIjpbIlN0cmluZ1V0aWwiLCJFdmVudE5hbWUiLCJnV2FybiIsIlVJTWdyIiwiRGF0YU1nciIsIkVudk1nciIsIkV2ZW50TWdyIiwiQ29uZmlnTWdyIiwiZ0xvZyIsIkJhc2VNZ3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdBO0lBQWtDLGdDQUFRO0lBNER0QyxzQkFBWSxJQUFZO2VBQ3BCLGtCQUFNLElBQUksRUFBRSxLQUFLLENBQUM7S0FDckI7Ozs7SUFuRE0sMkJBQUksR0FBWCxVQUFZLEdBQW1CO1FBQzNCLElBQUksR0FBRyxJQUFJQSxtQkFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDekMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUM3QztLQUNKO0lBRUQsc0JBQVcsZ0NBQU07YUFBakI7WUFDSSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7U0FDdEI7YUFFRCxVQUFrQixDQUFTO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCOzs7T0FKQTtJQU1ELHNCQUFXLDhCQUFJO2FBSWY7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDdkM7YUFORCxVQUFnQixDQUFTO1lBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1NB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
