'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

var BaseMgr = /** @class */ (function (_super) {
    __extends(BaseMgr, _super);
    function BaseMgr(clsName) {
        var _this = _super.call(this) || this;
        /**
         *  clsName
         */
        _this._clsName = "unKnow";
        _this._clsName = CC_JSB ? (clsName ? clsName : "unKnow") : (clsName ? clsName : _this.constructor.name);
        return _this;
    }
    Object.defineProperty(BaseMgr.prototype, "clsName", {
        /**
         *  get clsName
         */
        get: function () {
            return this._clsName;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 模块启动
    *  延迟返回async函数
    *
    */
    BaseMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                zmg_util.gLog("-------------------" + this._clsName + " start--------------");
                return [2 /*return*/];
            });
        });
    };
    /**
     * 模块销毁
     */
    BaseMgr.prototype.destroy = function () {
        zmg_util.gLog("-------------------" + this._clsName + " end--------------");
    };
    Object.defineProperty(BaseMgr.prototype, "isValid", {
        /**
         * 未准备
         * 已被销毁
         * 则无法使用
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    BaseMgr.prototype.dispatchEvent = function (event) {
        event.target = this;
        _super.prototype.dispatchEvent.call(this, event);
    };
    return BaseMgr;
}(cc.EventTarget));

/**
 * 对象池类
 * eg: 创建对象池ObjectPool.pop(Timer, "Timer");
 */
var ObjectPool = /** @class */ (function () {
    /**
     * 构造函数
     */
    function ObjectPool() {
        this._objs = new Array();
    }
    /**
     * 放回一个对象
     * @param obj
     */
    ObjectPool.prototype.pushObj = function (obj) {
        this._objs.push(obj);
    };
    /**
     * 取出一个对象
     * @returns {*}
     */
    ObjectPool.prototype.popObj = function () {
        if (this._objs.length > 0) {
            return this._objs.pop();
        }
        else {
            return null;
        }
    };
    /**
     * 清除所有缓存对象
     */
    ObjectPool.prototype.clear = function () {
        while (this._objs.length > 0) {
            this._objs.pop();
        }
    };
    /**
     * 取出一个对象
     * @param classZ Class
     * @return Object
     */
    ObjectPool.pop = function (classZ, classKey) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (!ObjectPool._content[classKey]) {
            ObjectPool._content[classKey] = [];
        }
        var list = ObjectPool._content[classKey];
        if (list.length) {
            return list.pop();
        }
        else {
            var argsLen = args.length;
            var obj;
            if (argsLen == 0) {
                obj = new classZ();
            }
            else if (argsLen == 1) {
                obj = new classZ(args[0]);
            }
            else if (argsLen == 2) {
                obj = new classZ(args[0], args[1]);
            }
            else if (argsLen == 3) {
                obj = new classZ(args[0], args[1], args[2]);
            }
            else if (argsLen == 4) {
                obj = new classZ(args[0], args[1], args[2], args[3]);
            }
            else if (argsLen == 5) {
                obj = new classZ(args[0], args[1], args[2], args[3], args[4]);
            }
            obj.ObjectPoolKey = classKey;
            return obj;
        }
    };
    /**
     * 取出一个对象
     * @param refKey Class
     * @param extraKey 标识值
     * @returns {any}
     */
    ObjectPool.popWithExtraKey = function (refKey, extraKey) {
        if (!ObjectPool._content[refKey]) {
            ObjectPool._content[refKey] = [];
        }
        var obj;
        var list = ObjectPool._content[refKey];
        if (list.length) {
            for (var i = 0; i < list.length; i++) {
                if (list[i].extraKey == extraKey) {
                    obj = list[i];
                    list.splice(i, 1);
                    break;
                }
            }
        }
        if (!obj) {
            var classZ = refKey;
            obj = new classZ(extraKey);
            obj.extraKey = extraKey;
            obj.ObjectPoolKey = refKey;
        }
        return obj;
    };
    /**
     * 放入一个对象
     * @param obj
     */
    ObjectPool.push = function (obj) {
        if (obj == null) {
            return false;
        }
        var refKey = obj.ObjectPoolKey;
        // 保证只有pop出来的对象可以放进来，或者是已经清除的无法放入
        if (!ObjectPool._content[refKey]) {
            return false;
        }
        ObjectPool._content[refKey].push(obj);
        return true;
    };
    /**
     * 清除所有对象
     */
    ObjectPool.clear = function () {
        ObjectPool._content = {};
    };
    /**
     * 清除某一类对象
     * @param classKey Class
     * @param clearFuncName 清除对象需要执行的函数
     */
    ObjectPool.clearClass = function (classKey, clearFuncName) {
        if (clearFuncName === void 0) { clearFuncName = null; }
        var list = ObjectPool._content[classKey];
        while (list && list.length) {
            var obj = list.pop();
            if (clearFuncName) {
                obj[clearFuncName]();
            }
            obj = null;
        }
        ObjectPool._content[classKey] = null;
        delete ObjectPool._content[classKey];
    };
    /**
     * 缓存中对象统一执行一个函数
     * @param refKey Class
     * @param dealFuncName 要执行的函数名称
     */
    ObjectPool.dealFunc = function (refKey, dealFuncName) {
        var list = ObjectPool._content[refKey];
        if (list == null) {
            return;
        }
        var i = 0;
        var len = list.length;
        for (i; i < len; i++) {
            list[i][dealFuncName]();
        }
    };
    ObjectPool._content = {};
    return ObjectPool;
}());

exports.BaseMgr = BaseMgr;
exports.ObjectPool = ObjectPool;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9CYXNlTWdyLnRzIiwiLi4vLi4vLi4vc3JjL09iamVjdFBvb2wudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ0xvZyB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2VNZ3IgZXh0ZW5kcyBjYy5FdmVudFRhcmdldCBpbXBsZW1lbnRzIHptZy5JTWdyIHtcclxuICAgIC8qKlxyXG4gICAgICogIGNsc05hbWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIF9jbHNOYW1lOiBzdHJpbmcgPSBcInVuS25vd1wiO1xyXG4gICAgLyoqXHJcbiAgICAgKiAgZ2V0IGNsc05hbWVcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBjbHNOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Nsc05hbWU7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihjbHNOYW1lPzogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9jbHNOYW1lID0gQ0NfSlNCID8gKGNsc05hbWUgPyBjbHNOYW1lIDogXCJ1bktub3dcIikgOiAoY2xzTmFtZSA/IGNsc05hbWUgOiB0aGlzLmNvbnN0cnVjdG9yLm5hbWUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmqKHlnZflkK/liqhcclxuICAgICogIOW7tui/n+i/lOWbnmFzeW5j5Ye95pWwXHJcbiAgICAqIFxyXG4gICAgKi9cclxuICAgIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgICAgIGdMb2coXCItLS0tLS0tLS0tLS0tLS0tLS0tXCIgKyB0aGlzLl9jbHNOYW1lICsgXCIgc3RhcnQtLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5qih5Z2X6ZSA5q+BXHJcbiAgICAgKi9cclxuICAgIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgZ0xvZyhcIi0tLS0tLS0tLS0tLS0tLS0tLS1cIiArIHRoaXMuX2Nsc05hbWUgKyBcIiBlbmQtLS0tLS0tLS0tLS0tLVwiKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5pyq5YeG5aSHXHJcbiAgICAgKiDlt7LooqvplIDmr4FcclxuICAgICAqIOWImeaXoOazleS9v+eUqFxyXG4gICAgICovXHJcbiAgICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGRpc3BhdGNoRXZlbnQoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgZXZlbnQudGFyZ2V0ID0gdGhpcztcclxuICAgICAgICBzdXBlci5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgIH1cclxufSIsIi8qKlxyXG4gKiDlr7nosaHmsaDnsbtcclxuICogZWc6IOWIm+W7uuWvueixoeaxoE9iamVjdFBvb2wucG9wKFRpbWVyLCBcIlRpbWVyXCIpO1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIE9iamVjdFBvb2wge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9jb250ZW50OiBhbnkgPSB7fTtcclxuICAgIHByaXZhdGUgX29ianM6IEFycmF5PGFueT47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnoTpgKDlh73mlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuX29ianMgPSBuZXcgQXJyYXk8YW55PigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pS+5Zue5LiA5Liq5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gb2JqXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwdXNoT2JqKG9iajogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fb2Jqcy5wdXNoKG9iaik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5blh7rkuIDkuKrlr7nosaFcclxuICAgICAqIEByZXR1cm5zIHsqfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcG9wT2JqKCk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX29ianMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb2Jqcy5wb3AoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXpmaTmiYDmnInnvJPlrZjlr7nosaFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHdoaWxlICh0aGlzLl9vYmpzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fb2Jqcy5wb3AoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlj5blh7rkuIDkuKrlr7nosaFcclxuICAgICAqIEBwYXJhbSBjbGFzc1ogQ2xhc3NcclxuICAgICAqIEByZXR1cm4gT2JqZWN0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgcG9wKGNsYXNzWjogYW55LCBjbGFzc0tleTogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSk6IGFueSB7XHJcbiAgICAgICAgaWYgKCFPYmplY3RQb29sLl9jb250ZW50W2NsYXNzS2V5XSkge1xyXG4gICAgICAgICAgICBPYmplY3RQb29sLl9jb250ZW50W2NsYXNzS2V5XSA9IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGxpc3Q6IEFycmF5PGFueT4gPSBPYmplY3RQb29sLl9jb250ZW50W2NsYXNzS2V5XTtcclxuICAgICAgICBpZiAobGlzdC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpc3QucG9wKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGFyZ3NMZW46IG51bWJlciA9IGFyZ3MubGVuZ3RoO1xyXG4gICAgICAgICAgICB2YXIgb2JqOiBhbnk7XHJcbiAgICAgICAgICAgIGlmIChhcmdzTGVuID09IDApIHtcclxuICAgICAgICAgICAgICAgIG9iaiA9IG5ldyBjbGFzc1ooKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhcmdzTGVuID09IDEpIHtcclxuICAgICAgICAgICAgICAgIG9iaiA9IG5ldyBjbGFzc1ooYXJnc1swXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnc0xlbiA9PSAyKSB7XHJcbiAgICAgICAgICAgICAgICBvYmogPSBuZXcgY2xhc3NaKGFyZ3NbMF0sIGFyZ3NbMV0pO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFyZ3NMZW4gPT0gMykge1xyXG4gICAgICAgICAgICAgICAgb2JqID0gbmV3IGNsYXNzWihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChhcmdzTGVuID09IDQpIHtcclxuICAgICAgICAgICAgICAgIG9iaiA9IG5ldyBjbGFzc1ooYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSwgYXJnc1szXSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXJnc0xlbiA9PSA1KSB7XHJcbiAgICAgICAgICAgICAgICBvYmogPSBuZXcgY2xhc3NaKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10sIGFyZ3NbNF0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9iai5PYmplY3RQb29sS2V5ID0gY2xhc3NLZXk7XHJcbiAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Y+W5Ye65LiA5Liq5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gcmVmS2V5IENsYXNzXHJcbiAgICAgKiBAcGFyYW0gZXh0cmFLZXkg5qCH6K+G5YC8XHJcbiAgICAgKiBAcmV0dXJucyB7YW55fVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHBvcFdpdGhFeHRyYUtleShyZWZLZXk6IGFueSwgZXh0cmFLZXk6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKCFPYmplY3RQb29sLl9jb250ZW50W3JlZktleV0pIHtcclxuICAgICAgICAgICAgT2JqZWN0UG9vbC5fY29udGVudFtyZWZLZXldID0gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2YXIgb2JqOiBhbnk7XHJcbiAgICAgICAgdmFyIGxpc3Q6IEFycmF5PGFueT4gPSBPYmplY3RQb29sLl9jb250ZW50W3JlZktleV07XHJcbiAgICAgICAgaWYgKGxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3RbaV0uZXh0cmFLZXkgPT0gZXh0cmFLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmogPSBsaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3Quc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghb2JqKSB7XHJcbiAgICAgICAgICAgIHZhciBjbGFzc1o6IGFueSA9IHJlZktleTtcclxuICAgICAgICAgICAgb2JqID0gbmV3IGNsYXNzWihleHRyYUtleSk7XHJcbiAgICAgICAgICAgIG9iai5leHRyYUtleSA9IGV4dHJhS2V5O1xyXG4gICAgICAgICAgICBvYmouT2JqZWN0UG9vbEtleSA9IHJlZktleTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaUvuWFpeS4gOS4quWvueixoVxyXG4gICAgICogQHBhcmFtIG9ialxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHB1c2gob2JqOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAob2JqID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIHJlZktleTogYW55ID0gb2JqLk9iamVjdFBvb2xLZXk7XHJcbiAgICAgICAgLy8g5L+d6K+B5Y+q5pyJcG9w5Ye65p2l55qE5a+56LGh5Y+v5Lul5pS+6L+b5p2l77yM5oiW6ICF5piv5bey57uP5riF6Zmk55qE5peg5rOV5pS+5YWlXHJcbiAgICAgICAgaWYgKCFPYmplY3RQb29sLl9jb250ZW50W3JlZktleV0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgT2JqZWN0UG9vbC5fY29udGVudFtyZWZLZXldLnB1c2gob2JqKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpOaJgOacieWvueixoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIE9iamVjdFBvb2wuX2NvbnRlbnQgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4hemZpOafkOS4gOexu+WvueixoVxyXG4gICAgICogQHBhcmFtIGNsYXNzS2V5IENsYXNzXHJcbiAgICAgKiBAcGFyYW0gY2xlYXJGdW5jTmFtZSDmuIXpmaTlr7nosaHpnIDopoHmiafooYznmoTlh73mlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjbGVhckNsYXNzKGNsYXNzS2V5OiBzdHJpbmcsIGNsZWFyRnVuY05hbWU6IHN0cmluZyA9IG51bGwpOiB2b2lkIHtcclxuICAgICAgICB2YXIgbGlzdDogQXJyYXk8YW55PiA9IE9iamVjdFBvb2wuX2NvbnRlbnRbY2xhc3NLZXldO1xyXG4gICAgICAgIHdoaWxlIChsaXN0ICYmIGxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmo6IGFueSA9IGxpc3QucG9wKCk7XHJcbiAgICAgICAgICAgIGlmIChjbGVhckZ1bmNOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBvYmpbY2xlYXJGdW5jTmFtZV0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvYmogPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBPYmplY3RQb29sLl9jb250ZW50W2NsYXNzS2V5XSA9IG51bGw7XHJcbiAgICAgICAgZGVsZXRlIE9iamVjdFBvb2wuX2NvbnRlbnRbY2xhc3NLZXldO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57yT5a2Y5Lit5a+56LGh57uf5LiA5omn6KGM5LiA5Liq5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gcmVmS2V5IENsYXNzXHJcbiAgICAgKiBAcGFyYW0gZGVhbEZ1bmNOYW1lIOimgeaJp+ihjOeahOWHveaVsOWQjeensFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGRlYWxGdW5jKHJlZktleTogc3RyaW5nLCBkZWFsRnVuY05hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHZhciBsaXN0OiBBcnJheTxhbnk+ID0gT2JqZWN0UG9vbC5fY29udGVudFtyZWZLZXldO1xyXG4gICAgICAgIGlmIChsaXN0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdmFyIGk6IG51bWJlciA9IDA7XHJcbiAgICAgICAgdmFyIGxlbjogbnVtYmVyID0gbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgbGlzdFtpXVtkZWFsRnVuY05hbWVdKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59Il0sIm5hbWVzIjpbImdMb2ciXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7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
