'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_mgr = require('zmg_mgr');
var zmg_config_mgr = require('zmg_config_mgr');
var zmg_util = require('zmg_util');

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

var NativeBridge = /** @class */ (function () {
    function NativeBridge() {
        this.brigeSdk = null;
    }
    NativeBridge.prototype.initBridge = function (mainHandlers, brigeSdk) {
        if (zmg_config_mgr.ConfigMgr.getUseShell()) {
            this.brigeSdk = brigeSdk;
        }
        if (mainHandlers && mainHandlers.length > 0) {
            for (var index = 0; index < mainHandlers.length; index++) {
                var element = mainHandlers[index];
                this.registMsg(element.name, element.fun);
            }
        }
    };
    NativeBridge.prototype.sendMsgToClient = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var lens = arguments.length;
        if (lens == 2) {
            if (zmg_config_mgr.ConfigMgr.getUseShell()) {
                return this.brigeSdk.sendMsg(args[0], args[1]);
            }
        }
        else if (lens == 3) {
            return this.sendMsgNative(args[0], args[1], args[2]);
        }
        else if (lens == 4) {
            return this.sendMsgNative(args[0], args[1], args[2], args[3]);
        }
    };
    NativeBridge.prototype.sendMsgNative = function (className, methodName, parameters, methodSignature) {
        if (cc.sys.os == cc.sys.OS_IOS) {
            var result = jsb.reflection.callStaticMethod(className, methodName, parameters);
            return result;
        }
        else {
            var result = jsb.reflection.callStaticMethod(className, methodName, methodSignature, parameters);
            return result;
        }
    };
    NativeBridge.prototype.registMsg = function (name, callback) {
        if (zmg_config_mgr.ConfigMgr.getUseShell()) {
            if (this.brigeSdk) {
                this.brigeSdk.registerHandler(name, callback);
            }
        }
        else {
            window[name] = callback;
        }
    };
    return NativeBridge;
}());

var WebBase = /** @class */ (function () {
    function WebBase() {
        var _this = this;
        this._messageHandlers = {};
        this._clientMsgPool = [];
        this._sendMessageFun = function (param) {
            if (param.cmd.main == undefined) {
                param.cmd.main = "jsbMessage";
            }
            if (param.data == undefined) {
                param.data = null;
            }
            if (cc.sys.isMobile) {
                //默认处理方式
                if (window.WebViewJavascriptBridge) {
                    if (param.cmd.main === 'jsbMessage') {
                        return window.WebViewJavascriptBridge.callHandler(param.cmd.main, { action: param.cmd.action, data: param.data });
                    }
                    else {
                        return window.WebViewJavascriptBridge.callHandler(param.cmd.main, param.cmd.action);
                    }
                }
                else {
                    _this._clientMsgPool.push(param);
                }
            }
            else {
                //默认处理方式
                var target = window.parent && window.parent.window;
                return target.postMessage({ action: param.cmd.action, data: param.data }, "*");
            }
        };
    }
    Object.defineProperty(WebBase.prototype, "messageHandlers", {
        get: function () {
            return this._messageHandlers;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebBase.prototype, "sendMessageFun", {
        set: function (v) {
            this._sendMessageFun = v;
        },
        enumerable: false,
        configurable: true
    });
    WebBase.prototype.registerHandlers = function (name, command) {
        if (!this._messageHandlers[name]) {
            this._messageHandlers[name] = new command();
        }
    };
    WebBase.prototype.sendMsgToClient = function (param) {
        return this._sendMessageFun(param);
    };
    WebBase.prototype.clearMsgPool = function () {
        for (var i = 0; i < this._clientMsgPool.length; i++) {
            if (window.WebViewJavascriptBridge) {
                var msg = this._clientMsgPool[i];
                this.sendMsgToClient(msg);
            }
        }
        this._clientMsgPool = [];
    };
    return WebBase;
}());

var WebAndroid = /** @class */ (function (_super) {
    __extends(WebAndroid, _super);
    function WebAndroid() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebAndroid.prototype.initBridge = function (mainHandlers, registerMainHandler) {
        this.connectWebViewJavascriptBridge(function (bridge) { return registerMainHandler(bridge, mainHandlers); });
    };
    WebAndroid.prototype.connectWebViewJavascriptBridge = function (callback) {
        if (window.WebViewJavascriptBridge) {
            callback(window.WebViewJavascriptBridge);
        }
        else {
            document.addEventListener('WebViewJavascriptBridgeReady', function (event) {
                if (window["onWebViewJavascriptBridgeReady"])
                    window["onWebViewJavascriptBridgeReady"](window["__bridge"] = window.WebViewJavascriptBridge);
                callback(window.WebViewJavascriptBridge);
            }, false);
        }
    };
    return WebAndroid;
}(WebBase));

var WebIos = /** @class */ (function (_super) {
    __extends(WebIos, _super);
    function WebIos() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebIos.prototype.initBridge = function (mainHandlers, registerMainHandler) {
        this.setupWebViewJavascriptBridge(function (bridge) { return registerMainHandler(bridge, mainHandlers); });
    };
    WebIos.prototype.setupWebViewJavascriptBridge = function (callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(window.WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement("iframe");
        WVJBIframe.style.display = "none";
        WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe);
        }, 0);
    };
    return WebIos;
}(WebBase));

var WebPost = /** @class */ (function (_super) {
    __extends(WebPost, _super);
    function WebPost() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._receiveMsg = null;
        return _this;
    }
    WebPost.prototype.initBridge = function (mainHandlers, reviceMsgFun) {
        this._receiveMsg = reviceMsgFun;
        this.registerPostMessage(mainHandlers);
    };
    WebPost.prototype.registerPostMessage = function (mainHandlers) {
        var _this = this;
        mainHandlers.forEach(function (element) {
            window.addEventListener(element.name, _this.receivePostMsg.bind(_this), false);
        });
    };
    WebPost.prototype.receivePostMsg = function (event) {
        var data = event.data;
        this._receiveMsg(data);
    };
    return WebPost;
}(WebBase));

var WebViewBridge = /** @class */ (function () {
    function WebViewBridge() {
        this._web = null;
    }
    Object.defineProperty(WebViewBridge.prototype, "web", {
        get: function () {
            return this._web;
        },
        enumerable: false,
        configurable: true
    });
    WebViewBridge.prototype.initBridge = function (mainHandlers) {
        if (cc.sys.isMobile) {
            if (cc.sys.OS_IOS) {
                zmg_util.gLog("ios开始注册webviewJavasctiptBridge");
                this._web = new WebIos();
            }
            else {
                zmg_util.gLog("android开始注册webviewJavasctiptBridge");
                this._web = new WebAndroid();
            }
            this._web.initBridge(mainHandlers, this.registerMainHandler);
        }
        else {
            this._web = new WebPost();
            this._web.initBridge(mainHandlers, this.receiveMsg);
        }
        zmg_util.gLog("webviewJavasctiptBridge注册完毕");
    };
    WebViewBridge.prototype.registerMainHandler = function (bridge, mainHandlers) {
        var _this = this;
        if (mainHandlers != undefined) {
            mainHandlers.forEach(function (element) {
                bridge.registerHandler(element.name, function (data, responseCallback) {
                    if (element.fun) {
                        element.fun(data, responseCallback);
                    }
                    else {
                        data = JSON.parse(data);
                        this.receiveMsg(data);
                    }
                }.bind(_this));
            });
        }
        else {
            zmg_util.gWarn("原生交互主消息未注册");
        }
        if (this._web) {
            this._web.clearMsgPool();
        }
    };
    WebViewBridge.prototype.receiveMsg = function (data) {
        var action = data['action'];
        var command = this._web.messageHandlers[action];
        if (command) {
            command.excute(data);
        }
    };
    WebViewBridge.prototype.sendMsgToClient = function (param) {
        return this.web.sendMsgToClient(param);
    };
    WebViewBridge.prototype.registMsg = function (name, command) {
        this.web.registerHandlers(name, command);
    };
    WebViewBridge.prototype.setSendMessageFun = function (fun) {
        if (this.web) {
            this.web.sendMessageFun = fun;
        }
    };
    return WebViewBridge;
}());

var _PlatfromMgr = /** @class */ (function (_super) {
    __extends(_PlatfromMgr, _super);
    function _PlatfromMgr() {
        return _super.call(this) || this;
    }
    _PlatfromMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _PlatfromMgr();
        }
        return this._instance;
    };
    _PlatfromMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                return [2 /*return*/];
            });
        });
    };
    _PlatfromMgr.prototype.registerMsg = function (name, callback) {
        this.bridge.registMsg(name, callback);
    };
    _PlatfromMgr.prototype.sendMsg = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var lens = arguments.length;
        if (lens == 1) {
            return this.bridge.sendMsgToClient(args[0]); //web使用参数
        }
        else if (lens == 2) {
            return this.bridge.sendMsgToClient(args[0], args[1]); //原生壳使用参数
        }
        else if (lens == 3) {
            return this.bridge.sendMsgToClient(args[0], args[1], args[2]); //android原生使用参数
        }
        else if (lens == 4) {
            return this.bridge.sendMsgToClient(args[0], args[1], args[2], args[3]); //ios原生使用参数
        }
    };
    _PlatfromMgr.prototype.setSendMessageFun = function (fun) {
        if (!CC_JSB) {
            this.bridge ? this.bridge.setSendMessageFun(fun) : zmg_util.gLog("bridge为空");
        }
    };
    _PlatfromMgr.prototype.initBridge = function (mainHandlers, brigeSdk) {
        if (CC_JSB) {
            this.bridge = new NativeBridge();
            this.bridge.initBridge(mainHandlers, brigeSdk);
        }
        else {
            this.bridge = new WebViewBridge();
            this.bridge.initBridge(mainHandlers);
        }
    };
    Object.defineProperty(_PlatfromMgr.prototype, "isValid", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    return _PlatfromMgr;
}(zmg_mgr.BaseMgr));

var BaseCommand = /** @class */ (function () {
    function BaseCommand() {
    }
    Object.defineProperty(BaseCommand.prototype, "packet", {
        set: function (value) {
            this._packet = value;
        },
        enumerable: false,
        configurable: true
    });
    BaseCommand.prototype.run = function (data) {
        this.excute(data);
    };
    return BaseCommand;
}());

var PlatfromMgr = _PlatfromMgr.getInstance();

exports.BaseCommand = BaseCommand;
exports.PlatfromMgr = PlatfromMgr;
exports.WebAndroid = WebAndroid;
exports.WebIos = WebIos;
exports.WebPost = WebPost;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9OYXRpdmVCcmlkZ2UudHMiLCIuLi8uLi8uLi9zcmMvV2ViQmFzZS50cyIsIi4uLy4uLy4uL3NyYy9XZWJBbmRyb2lkLnRzIiwiLi4vLi4vLi4vc3JjL1dlYklvcy50cyIsIi4uLy4uLy4uL3NyYy9XZWJQb3N0LnRzIiwiLi4vLi4vLi4vc3JjL1dlYlZpZXdCcmlkZ2UudHMiLCIuLi8uLi8uLi9zcmMvUGxhdGZyb21NZ3IudHMiLCIuLi8uLi8uLi9zcmMvQmFzZUNvbW1hbmQudHMiLCIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnTWdyIH0gZnJvbSBcInptZ19jb25maWdfbWdyXCJcclxuZXhwb3J0IGNsYXNzIE5hdGl2ZUJyaWRnZSBpbXBsZW1lbnRzIHptZy5JTmF0aXZlQnJpZGdlIHtcclxuXHJcbiAgICBwcml2YXRlIGJyaWdlU2RrOiB6bWcuSU5hdGl2ZUJyaWdlU2RrID0gbnVsbFxyXG5cclxuICAgIGluaXRCcmlkZ2UobWFpbkhhbmRsZXJzOiB6bWcuSUhhbmRsZXJbXSwgYnJpZ2VTZGs6IHptZy5JTmF0aXZlQnJpZ2VTZGspIHtcclxuICAgICAgICBpZiAoQ29uZmlnTWdyLmdldFVzZVNoZWxsKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5icmlnZVNkayA9IGJyaWdlU2RrXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtYWluSGFuZGxlcnMgJiYgbWFpbkhhbmRsZXJzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IG1haW5IYW5kbGVycy5sZW5ndGg7IGluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBtYWluSGFuZGxlcnNbaW5kZXhdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWdpc3RNc2coZWxlbWVudC5uYW1lLCBlbGVtZW50LmZ1bilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZW5kTXNnVG9DbGllbnQoLi4uYXJncyk6IGFueSB7XHJcbiAgICAgICAgbGV0IGxlbnMgPSBhcmd1bWVudHMubGVuZ3RoXHJcbiAgICAgICAgaWYgKGxlbnMgPT0gMikge1xyXG4gICAgICAgICAgICBpZiAoQ29uZmlnTWdyLmdldFVzZVNoZWxsKCkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJyaWdlU2RrLnNlbmRNc2coYXJnc1swXSwgYXJnc1sxXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAobGVucyA9PSAzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbmRNc2dOYXRpdmUoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSlcclxuICAgICAgICB9IGVsc2UgaWYgKGxlbnMgPT0gNCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zZW5kTXNnTmF0aXZlKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzZW5kTXNnTmF0aXZlKGNsYXNzTmFtZTogc3RyaW5nLCBtZXRob2ROYW1lOiBzdHJpbmcsIHBhcmFtZXRlcnM6IGFueSwgbWV0aG9kU2lnbmF0dXJlPzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PSBjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBqc2IucmVmbGVjdGlvbi5jYWxsU3RhdGljTWV0aG9kKGNsYXNzTmFtZSwgbWV0aG9kTmFtZSwgcGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0ganNiLnJlZmxlY3Rpb24uY2FsbFN0YXRpY01ldGhvZChjbGFzc05hbWUsIG1ldGhvZE5hbWUsIG1ldGhvZFNpZ25hdHVyZSwgcGFyYW1ldGVycylcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWdpc3RNc2cobmFtZTogc3RyaW5nLCBjYWxsYmFjazogYW55KSB7XHJcbiAgICAgICAgaWYgKENvbmZpZ01nci5nZXRVc2VTaGVsbCgpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmJyaWdlU2RrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJyaWdlU2RrLnJlZ2lzdGVySGFuZGxlcihuYW1lLCBjYWxsYmFjaylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvd1tuYW1lXSA9IGNhbGxiYWNrXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzIFdlYkJhc2Uge1xyXG4gICAgcHVibGljIF9tZXNzYWdlSGFuZGxlcnMgPSB7fVxyXG4gICAgcHVibGljIF9jbGllbnRNc2dQb29sOiB6bWcuSVdlYk1lc3NhZ2VbXSA9IFtdO1xyXG4gICAgcHVibGljIGdldCBtZXNzYWdlSGFuZGxlcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21lc3NhZ2VIYW5kbGVyc1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfc2VuZE1lc3NhZ2VGdW46IEZ1bmN0aW9uID0gKHBhcmFtOiB6bWcuSVdlYk1lc3NhZ2UpID0+IHtcclxuICAgICAgICBpZiAocGFyYW0uY21kLm1haW4gPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHBhcmFtLmNtZC5tYWluID0gXCJqc2JNZXNzYWdlXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhcmFtLmRhdGEgPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHBhcmFtLmRhdGEgPSBudWxsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYy5zeXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgLy/pu5jorqTlpITnkIbmlrnlvI9cclxuICAgICAgICAgICAgaWYgKCg8YW55PndpbmRvdykuV2ViVmlld0phdmFzY3JpcHRCcmlkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbS5jbWQubWFpbiA9PT0gJ2pzYk1lc3NhZ2UnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8YW55PndpbmRvdykuV2ViVmlld0phdmFzY3JpcHRCcmlkZ2UuY2FsbEhhbmRsZXIocGFyYW0uY21kLm1haW4sIHsgYWN0aW9uOiBwYXJhbS5jbWQuYWN0aW9uLCBkYXRhOiBwYXJhbS5kYXRhIH0pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxhbnk+d2luZG93KS5XZWJWaWV3SmF2YXNjcmlwdEJyaWRnZS5jYWxsSGFuZGxlcihwYXJhbS5jbWQubWFpbiwgcGFyYW0uY21kLmFjdGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbGllbnRNc2dQb29sLnB1c2gocGFyYW0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL+m7mOiupOWkhOeQhuaWueW8j1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gd2luZG93LnBhcmVudCAmJiB3aW5kb3cucGFyZW50LndpbmRvdztcclxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5wb3N0TWVzc2FnZSh7IGFjdGlvbjogcGFyYW0uY21kLmFjdGlvbiwgZGF0YTogcGFyYW0uZGF0YSB9LCBcIipcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgc2V0IHNlbmRNZXNzYWdlRnVuKHY6IChwYXJhbTogem1nLklXZWJNZXNzYWdlKSA9PiB7fSkge1xyXG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlRnVuID0gdjtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVnaXN0ZXJIYW5kbGVycyhuYW1lOiBzdHJpbmcsIGNvbW1hbmQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fbWVzc2FnZUhhbmRsZXJzW25hbWVdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX21lc3NhZ2VIYW5kbGVyc1tuYW1lXSA9IG5ldyBjb21tYW5kKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNlbmRNc2dUb0NsaWVudChwYXJhbTogem1nLklXZWJNZXNzYWdlKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2VuZE1lc3NhZ2VGdW4ocGFyYW0pXHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJNc2dQb29sKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY2xpZW50TXNnUG9vbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoKDxhbnk+d2luZG93KS5XZWJWaWV3SmF2YXNjcmlwdEJyaWRnZSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG1zZyA9IHRoaXMuX2NsaWVudE1zZ1Bvb2xbaV1cclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1zZ1RvQ2xpZW50KG1zZylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jbGllbnRNc2dQb29sID0gW11cclxuICAgIH1cclxufSIsImltcG9ydCB7IFdlYkJhc2UgfSBmcm9tIFwiLi9XZWJCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV2ViQW5kcm9pZCBleHRlbmRzIFdlYkJhc2Uge1xyXG4gICAgaW5pdEJyaWRnZShtYWluSGFuZGxlcnM6IHptZy5JSGFuZGxlcltdLCByZWdpc3Rlck1haW5IYW5kbGVyOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY29ubmVjdFdlYlZpZXdKYXZhc2NyaXB0QnJpZGdlKGJyaWRnZSA9PiByZWdpc3Rlck1haW5IYW5kbGVyKGJyaWRnZSwgbWFpbkhhbmRsZXJzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29ubmVjdFdlYlZpZXdKYXZhc2NyaXB0QnJpZGdlKGNhbGxiYWNrOiBGdW5jdGlvbik6IHZvaWQge1xyXG4gICAgICAgIGlmICgoPGFueT53aW5kb3cpLldlYlZpZXdKYXZhc2NyaXB0QnJpZGdlKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCg8YW55PndpbmRvdykuV2ViVmlld0phdmFzY3JpcHRCcmlkZ2UpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ1dlYlZpZXdKYXZhc2NyaXB0QnJpZGdlUmVhZHknLCBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3dbXCJvbldlYlZpZXdKYXZhc2NyaXB0QnJpZGdlUmVhZHlcIl0pIHdpbmRvd1tcIm9uV2ViVmlld0phdmFzY3JpcHRCcmlkZ2VSZWFkeVwiXSh3aW5kb3dbXCJfX2JyaWRnZVwiXSA9ICg8YW55PndpbmRvdykuV2ViVmlld0phdmFzY3JpcHRCcmlkZ2UpO1xyXG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKDxhbnk+d2luZG93KS5XZWJWaWV3SmF2YXNjcmlwdEJyaWRnZSk7XHJcbiAgICAgICAgICAgIH0sIGZhbHNlKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IFdlYkJhc2UgfSBmcm9tIFwiLi9XZWJCYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgV2ViSW9zIGV4dGVuZHMgV2ViQmFzZSB7XHJcbiAgICBpbml0QnJpZGdlKG1haW5IYW5kbGVyczogem1nLklIYW5kbGVyW10sIHJlZ2lzdGVyTWFpbkhhbmRsZXI6IEZ1bmN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXR1cFdlYlZpZXdKYXZhc2NyaXB0QnJpZGdlKGJyaWRnZSA9PiByZWdpc3Rlck1haW5IYW5kbGVyKGJyaWRnZSwgbWFpbkhhbmRsZXJzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0dXBXZWJWaWV3SmF2YXNjcmlwdEJyaWRnZShjYWxsYmFjazogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBpZiAoKDxhbnk+d2luZG93KS5XZWJWaWV3SmF2YXNjcmlwdEJyaWRnZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soKDxhbnk+d2luZG93KS5XZWJWaWV3SmF2YXNjcmlwdEJyaWRnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICgoPGFueT53aW5kb3cpLldWSkJDYWxsYmFja3MpIHtcclxuICAgICAgICAgICAgcmV0dXJuICg8YW55PndpbmRvdykuV1ZKQkNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgKDxhbnk+d2luZG93KS5XVkpCQ2FsbGJhY2tzID0gW2NhbGxiYWNrXTtcclxuICAgICAgICB2YXIgV1ZKQklmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7XHJcbiAgICAgICAgV1ZKQklmcmFtZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgICAgV1ZKQklmcmFtZS5zcmMgPSBcInd2amJzY2hlbWU6Ly9fX0JSSURHRV9MT0FERURfX1wiO1xyXG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZChXVkpCSWZyYW1lKTtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnJlbW92ZUNoaWxkKFdWSkJJZnJhbWUpO1xyXG4gICAgICAgIH0sIDApO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgV2ViQmFzZSB9IGZyb20gXCIuL1dlYkJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBXZWJQb3N0IGV4dGVuZHMgV2ViQmFzZSB7XHJcbiAgICBwcml2YXRlIF9yZWNlaXZlTXNnOiBGdW5jdGlvbiA9IG51bGxcclxuXHJcbiAgICBpbml0QnJpZGdlKG1haW5IYW5kbGVyczogem1nLklIYW5kbGVyW10sIHJldmljZU1zZ0Z1bjogRnVuY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlTXNnID0gcmV2aWNlTXNnRnVuXHJcbiAgICAgICAgdGhpcy5yZWdpc3RlclBvc3RNZXNzYWdlKG1haW5IYW5kbGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJQb3N0TWVzc2FnZShtYWluSGFuZGxlcnM6IHptZy5JSGFuZGxlcltdKTogdm9pZCB7XHJcbiAgICAgICAgbWFpbkhhbmRsZXJzLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKGVsZW1lbnQubmFtZSwgdGhpcy5yZWNlaXZlUG9zdE1zZy5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVjZWl2ZVBvc3RNc2coZXZlbnQ6IE1lc3NhZ2VFdmVudCkge1xyXG4gICAgICAgIGxldCBkYXRhID0gZXZlbnQuZGF0YTtcclxuICAgICAgICB0aGlzLl9yZWNlaXZlTXNnKGRhdGEpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgZ0xvZywgZ1dhcm4gfSBmcm9tICd6bWdfdXRpbCdcclxuaW1wb3J0IHsgQmFzZUNvbW1hbmQgfSBmcm9tICcuL0Jhc2VDb21tYW5kJ1xyXG5pbXBvcnQgeyBXZWJBbmRyb2lkIH0gZnJvbSAnLi9XZWJBbmRyb2lkJztcclxuaW1wb3J0IHsgV2ViSW9zIH0gZnJvbSAnLi9XZWJJb3MnO1xyXG5pbXBvcnQgeyBXZWJQb3N0IH0gZnJvbSAnLi9XZWJQb3N0JztcclxuZXhwb3J0IGNsYXNzIFdlYlZpZXdCcmlkZ2UgaW1wbGVtZW50cyB6bWcuSVdlYlZpZXdCcmlkZ2Uge1xyXG4gICAgcHJpdmF0ZSBfd2ViOiBXZWJBbmRyb2lkIHwgV2ViSW9zIHwgV2ViUG9zdCA9IG51bGxcclxuXHJcbiAgICBwdWJsaWMgZ2V0IHdlYigpOiBXZWJBbmRyb2lkIHwgV2ViSW9zIHwgV2ViUG9zdCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3dlYlxyXG4gICAgfVxyXG5cclxuICAgIGluaXRCcmlkZ2UobWFpbkhhbmRsZXJzPzogem1nLklIYW5kbGVyW10pOiB2b2lkIHtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMuT1NfSU9TKSB7XHJcbiAgICAgICAgICAgICAgICBnTG9nKFwiaW9z5byA5aeL5rOo5YaMd2Vidmlld0phdmFzY3RpcHRCcmlkZ2VcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWIgPSBuZXcgV2ViSW9zKClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGdMb2coXCJhbmRyb2lk5byA5aeL5rOo5YaMd2Vidmlld0phdmFzY3RpcHRCcmlkZ2VcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWIgPSBuZXcgV2ViQW5kcm9pZCgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fd2ViLmluaXRCcmlkZ2UobWFpbkhhbmRsZXJzLCB0aGlzLnJlZ2lzdGVyTWFpbkhhbmRsZXIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fd2ViID0gbmV3IFdlYlBvc3QoKVxyXG4gICAgICAgICAgICB0aGlzLl93ZWIuaW5pdEJyaWRnZShtYWluSGFuZGxlcnMsIHRoaXMucmVjZWl2ZU1zZylcclxuICAgICAgICB9XHJcbiAgICAgICAgZ0xvZyhcIndlYnZpZXdKYXZhc2N0aXB0QnJpZGdl5rOo5YaM5a6M5q+VXCIpXHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJNYWluSGFuZGxlcihicmlkZ2U6IGFueSwgbWFpbkhhbmRsZXJzOiB6bWcuSUhhbmRsZXJbXSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChtYWluSGFuZGxlcnMgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIG1haW5IYW5kbGVycy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgYnJpZGdlLnJlZ2lzdGVySGFuZGxlcihlbGVtZW50Lm5hbWUsIGZ1bmN0aW9uIChkYXRhLCByZXNwb25zZUNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnQuZnVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZnVuKGRhdGEsIHJlc3BvbnNlQ2FsbGJhY2spXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVjZWl2ZU1zZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGdXYXJuKFwi5Y6f55Sf5Lqk5LqS5Li75raI5oGv5pyq5rOo5YaMXCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl93ZWIpIHtcclxuICAgICAgICAgICAgdGhpcy5fd2ViLmNsZWFyTXNnUG9vbCgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlY2VpdmVNc2coZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IGRhdGFbJ2FjdGlvbiddO1xyXG4gICAgICAgIGxldCBjb21tYW5kOiBCYXNlQ29tbWFuZCA9IHRoaXMuX3dlYi5tZXNzYWdlSGFuZGxlcnNbYWN0aW9uXTtcclxuICAgICAgICBpZiAoY29tbWFuZCkge1xyXG4gICAgICAgICAgICBjb21tYW5kLmV4Y3V0ZShkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2VuZE1zZ1RvQ2xpZW50KHBhcmFtOiB6bWcuSVdlYk1lc3NhZ2UpOiB2b2lkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53ZWIuc2VuZE1zZ1RvQ2xpZW50KHBhcmFtKVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdE1zZyhuYW1lOiBzdHJpbmcsIGNvbW1hbmQ6IGFueSkge1xyXG4gICAgICAgIHRoaXMud2ViLnJlZ2lzdGVySGFuZGxlcnMobmFtZSwgY29tbWFuZClcclxuICAgIH1cclxuXHJcbiAgICBzZXRTZW5kTWVzc2FnZUZ1bihmdW46IChwYXJhbTogem1nLklXZWJNZXNzYWdlKSA9PiB7fSkge1xyXG4gICAgICAgIGlmICh0aGlzLndlYikge1xyXG4gICAgICAgICAgICB0aGlzLndlYi5zZW5kTWVzc2FnZUZ1biA9IGZ1blxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBCYXNlTWdyIH0gZnJvbSAnem1nX21ncic7XHJcbmltcG9ydCB7IE5hdGl2ZUJyaWRnZSB9IGZyb20gJy4vTmF0aXZlQnJpZGdlJztcclxuaW1wb3J0IHsgV2ViVmlld0JyaWRnZSB9IGZyb20gJy4vV2ViVmlld0JyaWRnZSc7XHJcbmltcG9ydCB7IGdMb2cgfSBmcm9tICd6bWdfdXRpbCc7XHJcblxyXG5leHBvcnQgY2xhc3MgX1BsYXRmcm9tTWdyIGV4dGVuZHMgQmFzZU1nciBpbXBsZW1lbnRzIHptZy5JUGxhdGZyb21NZ3Ige1xyXG5cclxuICAgIGJyaWRnZTogYW55O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogX1BsYXRmcm9tTWdyO1xyXG5cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBfUGxhdGZyb21NZ3Ige1xyXG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgX1BsYXRmcm9tTWdyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYXN5bmMgc3RhcnQoKSB7XHJcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcclxuICAgIH1cclxuICAgIHJlZ2lzdGVyTXNnKG5hbWU6IHN0cmluZywgY2FsbGJhY2s6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYnJpZGdlLnJlZ2lzdE1zZyhuYW1lLCBjYWxsYmFjaylcclxuICAgIH1cclxuXHJcbiAgICBzZW5kTXNnKC4uLmFyZ3MpOiBhbnkge1xyXG4gICAgICAgIGxldCBsZW5zID0gYXJndW1lbnRzLmxlbmd0aFxyXG4gICAgICAgIGlmIChsZW5zID09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnJpZGdlLnNlbmRNc2dUb0NsaWVudChhcmdzWzBdKS8vd2Vi5L2/55So5Y+C5pWwXHJcbiAgICAgICAgfSBlbHNlIGlmIChsZW5zID09IDIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnJpZGdlLnNlbmRNc2dUb0NsaWVudChhcmdzWzBdLCBhcmdzWzFdKS8v5Y6f55Sf5aOz5L2/55So5Y+C5pWwXHJcbiAgICAgICAgfSBlbHNlIGlmIChsZW5zID09IDMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnJpZGdlLnNlbmRNc2dUb0NsaWVudChhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKS8vYW5kcm9pZOWOn+eUn+S9v+eUqOWPguaVsFxyXG4gICAgICAgIH0gZWxzZSBpZiAobGVucyA9PSA0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJyaWRnZS5zZW5kTXNnVG9DbGllbnQoYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSkvL2lvc+WOn+eUn+S9v+eUqOWPguaVsFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRTZW5kTWVzc2FnZUZ1bihmdW46IChwYXJhbTogem1nLklXZWJNZXNzYWdlKSA9PiB7fSkge1xyXG4gICAgICAgIGlmICghQ0NfSlNCKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnJpZGdlID8gKDxXZWJWaWV3QnJpZGdlPnRoaXMuYnJpZGdlKS5zZXRTZW5kTWVzc2FnZUZ1bihmdW4pIDogZ0xvZyhcImJyaWRnZeS4uuepulwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbml0QnJpZGdlKG1haW5IYW5kbGVycz86IHptZy5JSGFuZGxlcltdLCBicmlnZVNkaz86IHptZy5JTmF0aXZlQnJpZ2VTZGspIHtcclxuICAgICAgICBpZiAoQ0NfSlNCKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnJpZGdlID0gbmV3IE5hdGl2ZUJyaWRnZSgpXHJcbiAgICAgICAgICAgIHRoaXMuYnJpZGdlLmluaXRCcmlkZ2UobWFpbkhhbmRsZXJzLCBicmlnZVNkaylcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYnJpZGdlID0gbmV3IFdlYlZpZXdCcmlkZ2UoKVxyXG4gICAgICAgICAgICB0aGlzLmJyaWRnZS5pbml0QnJpZGdlKG1haW5IYW5kbGVycylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuIiwiXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlQ29tbWFuZCB7XHJcbiAgICBwcm90ZWN0ZWQgX3BhY2tldDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGFja2V0KHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9wYWNrZXQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcnVuKGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZXhjdXRlKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhYnN0cmFjdCBleGN1dGUoZGF0YTogYW55KTtcclxuXHJcbn0iLCJpbXBvcnQgeyBfUGxhdGZyb21NZ3IgfSBmcm9tIFwiLi9QbGF0ZnJvbU1nclwiO1xyXG5cclxuZXhwb3J0ICogZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9CYXNlQ29tbWFuZFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9XZWJJb3NcIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vV2ViUG9zdFwiO1xyXG5leHBvcnQgKiBmcm9tIFwiLi9XZWJBbmRyb2lkXCI7XHJcbmV4cG9ydCBsZXQgUGxhdGZyb21NZ3IgPSBfUGxhdGZyb21NZ3IuZ2V0SW5zdGFuY2UoKTsiXSwibmFtZXMiOlsiQ29uZmlnTWdyIiwiZ0xvZyIsImdXYXJuIiwiQmFzZU1nciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtJQUFBO1FBRVksYUFBUSxHQUF3QixJQUFJLENBQUE7S0ErQy9DO0lBN0NHLGlDQUFVLEdBQVYsVUFBVyxZQUE0QixFQUFFLFFBQTZCO1FBQ2xFLElBQUlBLHdCQUFTLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUE7U0FDM0I7UUFDRCxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUN6QyxLQUFLLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDdEQsSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQzVDO1NBQ0o7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
