'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_mgr = require('zmg_mgr');
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

var TimerHandles = /** @class */ (function (_super) {
    __extends(TimerHandles, _super);
    /**
     * 构造函数
     */
    function TimerHandles() {
        var _this = _super.call(this) || this;
        _this._handlers = new Array();
        _this._delHandlers = new Array();
        _this._currTime = new Date().getTime();
        _this._currFrame = 0;
        _this._count = 0;
        _this._timeScale = 1;
        return _this;
    }
    /**
     * 设置时间参数
     * @param timeScale
     */
    TimerHandles.prototype.setTimeScale = function (timeScale) {
        this._timeScale = timeScale;
    };
    /**
     * 每帧执行函数
     * @param frameTime
     */
    TimerHandles.prototype.update = function (dt) {
        // try {
        this._currFrame++;
        this._currTime = new Date().getTime();
        for (var i = 0; i < this._count; i++) {
            var handler = this._handlers[i];
            if (!cc.isValid(handler.target)) {
                this._delHandlers.push(handler);
            }
            else {
                if (handler.active) {
                    if (handler.userFrame) {
                        handler.durationTime++;
                    }
                    else {
                        handler.durationTime += dt;
                    }
                }
                else {
                    handler.pauseTime += dt;
                    return;
                }
                var t = handler.userFrame ? this._currFrame : this._currTime;
                if (t >= handler.exeTime) {
                    var bool = handler.method.call(handler.target, (this._currTime - handler.dealTime) * this._timeScale);
                    handler.dealTime = this._currTime;
                    handler.exeTime = t + handler.delay;
                    if (bool || !handler.repeat) {
                        if (!bool && handler.repeatCount > 1) {
                            handler.repeatCount--;
                        }
                        else {
                            if (handler.complateMethod) {
                                handler.complateMethod.apply(handler.target);
                            }
                            this._delHandlers.push(handler);
                        }
                    }
                }
            }
        }
        while (this._delHandlers.length) {
            var handler = this._delHandlers.pop();
            this.remove(handler.method, handler.target);
        }
        // } catch (exp) {
        //     gError("TimerManager.onEnterFrame Error....." + exp);
        // }
    };
    TimerHandles.prototype.create = function (useFrame, delay, method, target, repeatCount, complateMethod, handleName) {
        if (complateMethod === void 0) { complateMethod = null; }
        if (handleName === void 0) { handleName = "timerHandle"; }
        cc.director.getScheduler().scheduleUpdate(this, 1, false);
        // 先删除相同函数的计时
        if (method) {
            this.remove(method, target);
        }
        else {
            this.remove(handleName, target);
        }
        // 创建
        var handler = zmg_mgr.ObjectPool.pop(TimerHandler, "TimerHandler");
        handler.userFrame = useFrame;
        handler.repeat = repeatCount == 0;
        handler.repeatCount = repeatCount;
        handler.handleName = handleName;
        handler.delay = delay;
        handler.method = method;
        handler.target = target;
        handler.complateMethod = complateMethod;
        handler.exeTime = delay + (useFrame ? this._currFrame : this._currTime);
        handler.dealTime = this._currTime;
        this._handlers.push(handler);
        this._count++;
        return handler;
    };
    /**
     * 定时执行
     * @param delay 执行间隔:毫秒
     * @param repeatCount 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param completeMethod 完成执行函数
     * @param completeMethodObj 完成执行函数所属对象
     */
    TimerHandles.prototype.doTimer = function (delay, method, target, repeatCount, completeMethod) {
        if (completeMethod === void 0) { completeMethod = null; }
        return this.create(false, delay, method, target, repeatCount, completeMethod);
    };
    /**
     * 定时执行
     * @param delay 执行间隔:帧频
     * @param repeatCount 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param completeMethod 完成执行函数
     * @param completeMethodObj 完成执行函数所属对象
     */
    TimerHandles.prototype.doFrame = function (delay, method, target, repeatCount, completeMethod) {
        if (repeatCount === void 0) { repeatCount = Number.MAX_SAFE_INTEGER; }
        if (completeMethod === void 0) { completeMethod = null; }
        return this.create(true, delay, method, target, repeatCount, completeMethod);
    };
    /**
     * 创建模块计时器
     * @param moduleName 模块名称
     * @param obj 所属对象
     * @param useFrame 是否使用帧率
     */
    TimerHandles.prototype.doModule = function (moduleName, obj, useFrame) {
        if (useFrame === void 0) { useFrame = false; }
        return this.create(useFrame, 0, null, 0, obj, null, null);
    };
    Object.defineProperty(TimerHandles.prototype, "count", {
        /**
         * 定时器执行数量
         * @return
         */
        get: function () {
            return this._count;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 清理
     * @param method 移除需要根据的方式
     * @param methodObj 要移除的函数对应的对象
     */
    TimerHandles.prototype.remove = function (method, target) {
        var isRemove = false;
        var removeIndex = -1;
        var handler = null;
        for (var i = 0; i < this._count; i++) {
            handler = this._handlers[i];
            if (typeof (method) == "function") {
                if (handler.method == method && handler.target == target) {
                    removeIndex = i;
                    isRemove = true;
                    break;
                }
            }
            else if (typeof (method) == "object") {
                if (handler == method && handler.target == target) {
                    removeIndex = i;
                    isRemove = true;
                    break;
                }
            }
            else if (typeof (method) == "string") {
                if (handler.handleName == method && handler.target == target) {
                    removeIndex = i;
                    isRemove = true;
                    break;
                }
            }
        }
        if (isRemove) {
            this._handlers.splice(removeIndex, 1);
            zmg_mgr.ObjectPool.push(handler);
            this._count--;
            if (this._count == 0) {
                cc.director.getScheduler().unscheduleUpdate(this);
            }
        }
    };
    /**
     * 清理
     * @param method 要移除的函数对应的对象
     */
    TimerHandles.prototype.removeAll = function (method) {
        for (var i = 0; i < this._count; i++) {
            var handler = this._handlers[i];
            if (handler.target == method
                || handler.handleName == method
                || handler.method == method
                || handler == method) {
                this._handlers.splice(i, 1);
                zmg_mgr.ObjectPool.push(handler);
                this._count--;
                if (this._count == 0) {
                    cc.director.getScheduler().unscheduleUpdate(this);
                }
                i--;
            }
        }
    };
    /**
     * 获取暂停时间
     * @param name handleName
     */
    TimerHandles.prototype.getPauseTime = function (name) {
        for (var i = 0; i < this._count; i++) {
            var handler = this._handlers[i];
            if (handler.handleName == name) {
                return handler.pauseTime;
            }
        }
    };
    /**
     * 获取持续时间
     * @param name handleName
     */
    TimerHandles.prototype.getDurationTime = function (name) {
        for (var i = 0; i < this._count; i++) {
            var handler = this._handlers[i];
            if (handler.handleName == name) {
                return handler.durationTime;
            }
        }
    };
    /**
     * 暂停计时器
     * @param name handleName
     */
    TimerHandles.prototype.pauseHandle = function (name) {
        for (var i = 0; i < this._count; i++) {
            var handler = this._handlers[i];
            if (handler.handleName == name) {
                handler.active = false;
            }
        }
    };
    /**
     * 恢复计时器
     * @param name handleName
     */
    TimerHandles.prototype.recoverHandle = function (name) {
        for (var i = 0; i < this._count; i++) {
            var handler = this._handlers[i];
            if (handler.handleName == name) {
                handler.pauseTime = 0;
                handler.active = true;
            }
        }
    };
    /**
     * 检测是否已经存在
     * @param method
     * @param methodObj
     */
    TimerHandles.prototype.isExists = function (method, target) {
        for (var i = 0; i < this._count; i++) {
            var handler = this._handlers[i];
            if (handler.method == method && handler.target == target) {
                return true;
            }
        }
        return false;
    };
    /** 销毁函数 */
    TimerHandles.prototype.destroy = function () {
        for (var index = 0; index < this._handlers.length; index++) {
            var handler = this._handlers[index];
            this._handlers.splice(index, 1);
            zmg_mgr.ObjectPool.push(handler);
        }
        this._currFrame = 0;
        this._count = 0;
        this._timeScale = 1;
        this._handlers = [];
        this._delHandlers = [];
        return true;
    };
    return TimerHandles;
}(cc.Node));
var TimerHandler = /** @class */ (function () {
    function TimerHandler() {
        /** 执行间隔 */
        this.delay = 0;
        /** 重复执行次数 */
        this.repeatCount = 0;
        /** 下一次执行时间 */
        this.exeTime = 0;
        /** 上次的执行时间 */
        this.dealTime = 0;
        /** 已持续时间 */
        this.durationTime = 0;
        /** 暂停时长 */
        this.pauseTime = 0;
        /** 当前是否活跃 */
        this.active = true;
        /** handle名称 */
        this.handleName = "";
    }
    /** 清理 */
    TimerHandler.prototype.clear = function () {
        this.method = null;
        this.target = null;
        this.complateMethod = null;
    };
    return TimerHandler;
}());

var TimeUtils = /** @class */ (function () {
    function TimeUtils() {
        /**
         * 客户端和服务器的时间差
         */
        this._diffTime = 0;
        this._startTime = 0;
    }
    /**
    * 获取本地时间与服务器时间差
    * @param server_time 秒
    */
    TimeUtils.prototype.getDiffTime = function (server_time) {
        this._diffTime = Math.floor((new Date()).valueOf() / 1000) - server_time;
        return this._diffTime;
    };
    /**
    * 获取当前系统时间单位秒
    */
    TimeUtils.prototype.getCurTime = function () {
        return Math.floor((new Date()).valueOf() / 1000) - this._diffTime;
    };
    /**
    * 格式化时间戳
    * @param time 时间戳毫秒
    * @param format 'YMDhms'年月日时分秒(参数可选)
    */
    TimeUtils.prototype.formatTime = function (time, format) {
        function formatNumber(n) {
            var ns = n.toString();
            return ns[1] ? ns : '0' + ns;
        }
        var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
        var returnArr = [];
        var date = new Date(time);
        returnArr.push(date.getFullYear());
        returnArr.push(formatNumber(date.getMonth() + 1));
        returnArr.push(formatNumber(date.getDate()));
        returnArr.push(formatNumber(date.getHours()));
        returnArr.push(formatNumber(date.getMinutes()));
        returnArr.push(formatNumber(date.getSeconds()));
        for (var i in returnArr) {
            format = format.replace(formateArr[i], returnArr[i]);
        }
        return format;
    };
    /**
    * 数组转时间戳毫秒
    * @param arr [年,月,日,时,分,秒]
    */
    TimeUtils.prototype.getTimeByArr = function (arr) {
        if (typeof arr == 'number') {
            return arr;
        }
        for (var i = 0; i < 6; i++) {
            arr[i] = arr[i] ? arr[i] : 0;
        }
        var date = arr[0] + "-" + arr[1] + "-" + arr[2] + " " + arr[3] + ":" + arr[4] + ":" + arr[5];
        return Date.parse(date.replace(/-/g, '/'));
    };
    /**
     * 获取数据{年,月,日,时,分,秒}
     * @param time 时间秒
     */
    TimeUtils.prototype.getTimeData = function (time) {
        time = time * 1000;
        var date = new Date(time);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var timeInfo = {
            year: y,
            month: m,
            day: d,
            hour: h,
            minute: minute,
            second: second
        };
        return timeInfo;
    };
    /**
     *
     * @param time
     * @param format 0星期x， 1周x
     * @returns
     */
    TimeUtils.prototype.getWeek = function (time, format) {
        if (cc.js.isString(time)) {
            var b = RegExp(/^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/).test(time);
            if (!b)
                return;
        }
        var str = '';
        var dataTime = new Date(time);
        var week = dataTime.getDay();
        var weekstr = ["日", "一", "二", "三", "四", "五", "六"];
        str += "星期" + weekstr[week];
        if (format == 1) {
            return str.replace('星期', '周');
        }
        return str;
    };
    TimeUtils.prototype.getSeconds = function (s) {
        var sTime = parseInt(s); // 秒
        var mTime = 0; // 分
        var hTime = 0; // 时
        if (sTime > 60) { //如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            mTime = Math.floor(sTime / 60);
            //获取秒数，秒数取佘，得到整数秒数
            sTime = sTime % 60;
            //如果分钟大于60，将分钟转换成小时
            if (mTime > 60) {
                //获取小时，获取分钟除以60，得到整数小时
                hTime = Math.floor(mTime / 60);
                //获取小时后取佘的分，获取分钟除以60取佘的分
                mTime = mTime % 60;
            }
        }
        var result = '';
        if (sTime >= 0 && sTime < 10) {
            result = "0" + sTime + "";
        }
        else {
            result = "" + sTime + "";
        }
        if (mTime >= 0 && mTime < 10) {
            result = "0" + mTime + ":" + result;
        }
        else {
            result = "" + mTime + ":" + result;
        }
        if (hTime > 0 && hTime < 10) {
            result = "0" + hTime + ":" + result;
        }
        else {
            if (hTime > 0) {
                result = "" + hTime + ":" + result;
            }
        }
        return result;
    };
    /**
    * 开始计时(和timeEnd配套使用)
    */
    TimeUtils.prototype.timeStart = function () {
        this._startTime = this.getCurTime();
        zmg_util.gLog("开始计时========", this._startTime);
    };
    /**
     * 结束计时(和timeStart配套使用)
     */
    TimeUtils.prototype.timeEnd = function () {
        zmg_util.gLog("当前结束时间========", this.getCurTime());
        return this.getCurTime() - this._startTime;
    };
    TimeUtils.prototype.destroy = function () {
        this._diffTime = 0;
        this._startTime = 0;
    };
    return TimeUtils;
}());

var _TimeMgr = /** @class */ (function (_super) {
    __extends(_TimeMgr, _super);
    function _TimeMgr() {
        var _this = _super.call(this) || this;
        _this._TimerHandles = null;
        _this._TimeUtils = null;
        _this._TimerHandles = new TimerHandles();
        _this._TimeUtils = new TimeUtils();
        return _this;
    }
    _TimeMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _TimeMgr();
        }
        return this._instance;
    };
    Object.defineProperty(_TimeMgr.prototype, "TimerHandles", {
        get: function () {
            return this._TimerHandles;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_TimeMgr.prototype, "TimeUtils", {
        get: function () {
            return this._TimeUtils;
        },
        enumerable: false,
        configurable: true
    });
    /*********************************************时间工具TimeUtils**************************************************/
    _TimeMgr.prototype.getSeconds = function (s) {
        return this.TimeUtils.getSeconds(s);
    };
    _TimeMgr.prototype.getWeek = function (time, format) {
        if (format === void 0) { format = 0; }
        return this.TimeUtils.getWeek(time, format);
    };
    _TimeMgr.prototype.getDiffTime = function (server_time) {
        return this.TimeUtils.getDiffTime(server_time);
    };
    _TimeMgr.prototype.getCurTime = function () {
        return this.TimeUtils.getCurTime();
    };
    _TimeMgr.prototype.formatTime = function (time, format) {
        return this.TimeUtils.formatTime(time, format);
    };
    _TimeMgr.prototype.getTimeByArr = function (arr) {
        return this.TimeUtils.getTimeByArr(arr);
    };
    _TimeMgr.prototype.getTimeData = function (time) {
        return this.TimeUtils.getTimeData(time);
    };
    _TimeMgr.prototype.timeStart = function () {
        return this.TimeUtils.timeStart();
    };
    _TimeMgr.prototype.timeEnd = function () {
        return this.TimeUtils.timeEnd();
    };
    /*********************************************时间计时器TimerHandles**************************************************/
    _TimeMgr.prototype.doTimer = function (delay, method, target, repeatCount, completeMethod) {
        if (repeatCount === void 0) { repeatCount = Number.MAX_SAFE_INTEGER; }
        if (completeMethod === void 0) { completeMethod = null; }
        return this.TimerHandles.doTimer(delay, method, target, repeatCount, completeMethod);
    };
    _TimeMgr.prototype.doFrame = function (delay, method, target, repeatCount, completeMethod) {
        if (repeatCount === void 0) { repeatCount = Number.MAX_SAFE_INTEGER; }
        if (completeMethod === void 0) { completeMethod = null; }
        return this.TimerHandles.doFrame(delay, method, target, repeatCount, completeMethod);
    };
    _TimeMgr.prototype.doModule = function (moduleName, obj, useFrame) {
        if (useFrame === void 0) { useFrame = false; }
        return this.TimerHandles.doModule(moduleName, obj, useFrame);
    };
    _TimeMgr.prototype.remove = function (method, methodObj) {
        return this.TimerHandles.remove(method, methodObj);
    };
    _TimeMgr.prototype.removeAll = function (method) {
        return this.TimerHandles.removeAll(method);
    };
    _TimeMgr.prototype.getPauseTime = function (name) {
        return this.TimerHandles.getPauseTime(name);
    };
    _TimeMgr.prototype.getDurationTime = function (name) {
        return this.TimerHandles.getDurationTime(name);
    };
    _TimeMgr.prototype.pauseHandle = function (name) {
        return this.TimerHandles.pauseHandle(name);
    };
    _TimeMgr.prototype.recoverHandle = function (name) {
        return this.TimerHandles.recoverHandle(name);
    };
    _TimeMgr.prototype.destroy = function () {
        this.TimerHandles.destroy();
        this.TimeUtils.destroy();
    };
    return _TimeMgr;
}(zmg_mgr.BaseMgr));

var TimeMgr = _TimeMgr.getInstance();

exports.TimeMgr = TimeMgr;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9UaW1lckhhbmRsZXMudHMiLCIuLi8uLi8uLi9zcmMvVGltZVV0aWxzLnRzIiwiLi4vLi4vLi4vc3JjL1RpbWVNZ3IudHMiLCIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ0Vycm9yIH0gZnJvbSBcInptZ191dGlsXCJcclxuaW1wb3J0IHsgT2JqZWN0UG9vbCB9IGZyb20gXCJ6bWdfbWdyXCJcclxuZXhwb3J0IGNsYXNzIFRpbWVySGFuZGxlcyBleHRlbmRzIGNjLk5vZGUge1xyXG5cclxuICAgIHByaXZhdGUgX2hhbmRsZXJzOiBBcnJheTxUaW1lckhhbmRsZXI+O1xyXG4gICAgcHJpdmF0ZSBfZGVsSGFuZGxlcnM6IEFycmF5PFRpbWVySGFuZGxlcj47XHJcbiAgICBwcml2YXRlIF9jdXJyVGltZTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfY3VyckZyYW1lOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIF9jb3VudDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBfdGltZVNjYWxlOiBudW1iZXI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmnoTpgKDlh73mlbBcclxuICAgICAqL1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLl9oYW5kbGVycyA9IG5ldyBBcnJheTxUaW1lckhhbmRsZXI+KCk7XHJcbiAgICAgICAgdGhpcy5fZGVsSGFuZGxlcnMgPSBuZXcgQXJyYXk8VGltZXJIYW5kbGVyPigpO1xyXG4gICAgICAgIHRoaXMuX2N1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgICAgICB0aGlzLl9jdXJyRnJhbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2NvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl90aW1lU2NhbGUgPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u5pe26Ze05Y+C5pWwXHJcbiAgICAgKiBAcGFyYW0gdGltZVNjYWxlXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRUaW1lU2NhbGUodGltZVNjYWxlOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl90aW1lU2NhbGUgPSB0aW1lU2NhbGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmr4/luKfmiafooYzlh73mlbBcclxuICAgICAqIEBwYXJhbSBmcmFtZVRpbWVcclxuICAgICAqL1xyXG4gICAgdXBkYXRlKGR0KTogdm9pZCB7XHJcbiAgICAgICAgLy8gdHJ5IHtcclxuICAgICAgICB0aGlzLl9jdXJyRnJhbWUrKztcclxuICAgICAgICB0aGlzLl9jdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXHJcblxyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLl9jb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBoYW5kbGVyOiBUaW1lckhhbmRsZXIgPSB0aGlzLl9oYW5kbGVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKGhhbmRsZXIudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGVsSGFuZGxlcnMucHVzaChoYW5kbGVyKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyLnVzZXJGcmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLmR1cmF0aW9uVGltZSsrXHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5kdXJhdGlvblRpbWUgKz0gZHRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZXIucGF1c2VUaW1lICs9IGR0XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIHQ6IG51bWJlciA9IGhhbmRsZXIudXNlckZyYW1lID8gdGhpcy5fY3VyckZyYW1lIDogdGhpcy5fY3VyclRpbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAodCA+PSBoYW5kbGVyLmV4ZVRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgYm9vbDogYm9vbGVhbiA9IGhhbmRsZXIubWV0aG9kLmNhbGwoaGFuZGxlci50YXJnZXQsICh0aGlzLl9jdXJyVGltZSAtIGhhbmRsZXIuZGVhbFRpbWUpICogdGhpcy5fdGltZVNjYWxlKTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLmRlYWxUaW1lID0gdGhpcy5fY3VyclRpbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5leGVUaW1lID0gdCArIGhhbmRsZXIuZGVsYXk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvb2wgfHwgIWhhbmRsZXIucmVwZWF0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYm9vbCAmJiBoYW5kbGVyLnJlcGVhdENvdW50ID4gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlci5yZXBlYXRDb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIuY29tcGxhdGVNZXRob2QpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLmNvbXBsYXRlTWV0aG9kLmFwcGx5KGhhbmRsZXIudGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2RlbEhhbmRsZXJzLnB1c2goaGFuZGxlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuX2RlbEhhbmRsZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB2YXIgaGFuZGxlcjogVGltZXJIYW5kbGVyID0gdGhpcy5fZGVsSGFuZGxlcnMucG9wKCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKGhhbmRsZXIubWV0aG9kLCBoYW5kbGVyLnRhcmdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIH0gY2F0Y2ggKGV4cCkge1xyXG4gICAgICAgIC8vICAgICBnRXJyb3IoXCJUaW1lck1hbmFnZXIub25FbnRlckZyYW1lIEVycm9yLi4uLi5cIiArIGV4cCk7XHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY3JlYXRlKHVzZUZyYW1lOiBib29sZWFuLCBkZWxheTogbnVtYmVyLCBtZXRob2Q6IEZ1bmN0aW9uLCB0YXJnZXQ6IGFueSwgcmVwZWF0Q291bnQ6IG51bWJlciwgY29tcGxhdGVNZXRob2Q6IEZ1bmN0aW9uID0gbnVsbCwgaGFuZGxlTmFtZTogc3RyaW5nID0gXCJ0aW1lckhhbmRsZVwiKTogVGltZXJIYW5kbGVyIHtcclxuICAgICAgICBjYy5kaXJlY3Rvci5nZXRTY2hlZHVsZXIoKS5zY2hlZHVsZVVwZGF0ZSh0aGlzLCAxLCBmYWxzZSlcclxuICAgICAgICAvLyDlhYjliKDpmaTnm7jlkIzlh73mlbDnmoTorqHml7ZcclxuICAgICAgICBpZiAobWV0aG9kKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKG1ldGhvZCwgdGFyZ2V0KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZShoYW5kbGVOYW1lLCB0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8g5Yib5bu6XHJcbiAgICAgICAgdmFyIGhhbmRsZXI6IFRpbWVySGFuZGxlciA9IE9iamVjdFBvb2wucG9wKFRpbWVySGFuZGxlciwgXCJUaW1lckhhbmRsZXJcIik7XHJcbiAgICAgICAgaGFuZGxlci51c2VyRnJhbWUgPSB1c2VGcmFtZTtcclxuICAgICAgICBoYW5kbGVyLnJlcGVhdCA9IHJlcGVhdENvdW50ID09IDA7XHJcbiAgICAgICAgaGFuZGxlci5yZXBlYXRDb3VudCA9IHJlcGVhdENvdW50O1xyXG4gICAgICAgIGhhbmRsZXIuaGFuZGxlTmFtZSA9IGhhbmRsZU5hbWU7XHJcbiAgICAgICAgaGFuZGxlci5kZWxheSA9IGRlbGF5O1xyXG4gICAgICAgIGhhbmRsZXIubWV0aG9kID0gbWV0aG9kO1xyXG4gICAgICAgIGhhbmRsZXIudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIGhhbmRsZXIuY29tcGxhdGVNZXRob2QgPSBjb21wbGF0ZU1ldGhvZDtcclxuICAgICAgICBoYW5kbGVyLmV4ZVRpbWUgPSBkZWxheSArICh1c2VGcmFtZSA/IHRoaXMuX2N1cnJGcmFtZSA6IHRoaXMuX2N1cnJUaW1lKTtcclxuICAgICAgICBoYW5kbGVyLmRlYWxUaW1lID0gdGhpcy5fY3VyclRpbWU7XHJcbiAgICAgICAgdGhpcy5faGFuZGxlcnMucHVzaChoYW5kbGVyKTtcclxuICAgICAgICB0aGlzLl9jb3VudCsrO1xyXG4gICAgICAgIHJldHVybiBoYW5kbGVyXHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a6a5pe25omn6KGMXHJcbiAgICAgKiBAcGFyYW0gZGVsYXkg5omn6KGM6Ze06ZqUOuavq+enklxyXG4gICAgICogQHBhcmFtIHJlcGVhdENvdW50IOaJp+ihjOasoeaVsCwgMOS4uuaXoOmZkOasoVxyXG4gICAgICogQHBhcmFtIG1ldGhvZCDmiafooYzlh73mlbBcclxuICAgICAqIEBwYXJhbSBtZXRob2RPYmog5omn6KGM5Ye95pWw5omA5bGe5a+56LGhXHJcbiAgICAgKiBAcGFyYW0gY29tcGxldGVNZXRob2Qg5a6M5oiQ5omn6KGM5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gY29tcGxldGVNZXRob2RPYmog5a6M5oiQ5omn6KGM5Ye95pWw5omA5bGe5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkb1RpbWVyKGRlbGF5OiBudW1iZXIsIG1ldGhvZDogRnVuY3Rpb24sIHRhcmdldDogYW55LCByZXBlYXRDb3VudDogbnVtYmVyLCBjb21wbGV0ZU1ldGhvZDogRnVuY3Rpb24gPSBudWxsKTogVGltZXJIYW5kbGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUoZmFsc2UsIGRlbGF5LCBtZXRob2QsIHRhcmdldCwgcmVwZWF0Q291bnQsIGNvbXBsZXRlTWV0aG9kKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWumuaXtuaJp+ihjFxyXG4gICAgICogQHBhcmFtIGRlbGF5IOaJp+ihjOmXtOmalDrluKfpopFcclxuICAgICAqIEBwYXJhbSByZXBlYXRDb3VudCDmiafooYzmrKHmlbAsIDDkuLrml6DpmZDmrKFcclxuICAgICAqIEBwYXJhbSBtZXRob2Qg5omn6KGM5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gbWV0aG9kT2JqIOaJp+ihjOWHveaVsOaJgOWxnuWvueixoVxyXG4gICAgICogQHBhcmFtIGNvbXBsZXRlTWV0aG9kIOWujOaIkOaJp+ihjOWHveaVsFxyXG4gICAgICogQHBhcmFtIGNvbXBsZXRlTWV0aG9kT2JqIOWujOaIkOaJp+ihjOWHveaVsOaJgOWxnuWvueixoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG9GcmFtZShkZWxheTogbnVtYmVyLCBtZXRob2Q6IEZ1bmN0aW9uLCB0YXJnZXQ6IGFueSwgcmVwZWF0Q291bnQ6IG51bWJlciA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLCBjb21wbGV0ZU1ldGhvZDogRnVuY3Rpb24gPSBudWxsKTogVGltZXJIYW5kbGVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUodHJ1ZSwgZGVsYXksIG1ldGhvZCwgdGFyZ2V0LCByZXBlYXRDb3VudCwgY29tcGxldGVNZXRob2QpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIm+W7uuaooeWdl+iuoeaXtuWZqFxyXG4gICAgICogQHBhcmFtIG1vZHVsZU5hbWUg5qih5Z2X5ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gb2JqIOaJgOWxnuWvueixoVxyXG4gICAgICogQHBhcmFtIHVzZUZyYW1lIOaYr+WQpuS9v+eUqOW4p+eOh1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZG9Nb2R1bGUobW9kdWxlTmFtZTogc3RyaW5nLCBvYmo6IGFueSwgdXNlRnJhbWU6IGJvb2xlYW4gPSBmYWxzZSk6IFRpbWVySGFuZGxlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHVzZUZyYW1lLCAwLCBudWxsLCAwLCBvYmosIG51bGwsIG51bGwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a6a5pe25Zmo5omn6KGM5pWw6YePXHJcbiAgICAgKiBAcmV0dXJuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgY291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXnkIZcclxuICAgICAqIEBwYXJhbSBtZXRob2Qg56e76Zmk6ZyA6KaB5qC55o2u55qE5pa55byPXHJcbiAgICAgKiBAcGFyYW0gbWV0aG9kT2JqIOimgeenu+mZpOeahOWHveaVsOWvueW6lOeahOWvueixoVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVtb3ZlKG1ldGhvZDogYW55LCB0YXJnZXQ6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBpc1JlbW92ZSA9IGZhbHNlXHJcbiAgICAgICAgbGV0IHJlbW92ZUluZGV4ID0gLTFcclxuICAgICAgICBsZXQgaGFuZGxlcjogVGltZXJIYW5kbGVyID0gbnVsbFxyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLl9jb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXIgPSB0aGlzLl9oYW5kbGVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAobWV0aG9kKSA9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyLm1ldGhvZCA9PSBtZXRob2QgJiYgaGFuZGxlci50YXJnZXQgPT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSW5kZXggPSBpXHJcbiAgICAgICAgICAgICAgICAgICAgaXNSZW1vdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIChtZXRob2QpID09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChoYW5kbGVyID09IG1ldGhvZCAmJiBoYW5kbGVyLnRhcmdldCA9PSB0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVJbmRleCA9IGlcclxuICAgICAgICAgICAgICAgICAgICBpc1JlbW92ZSA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgKG1ldGhvZCkgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIuaGFuZGxlTmFtZSA9PSBtZXRob2QgJiYgaGFuZGxlci50YXJnZXQgPT0gdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlSW5kZXggPSBpXHJcbiAgICAgICAgICAgICAgICAgICAgaXNSZW1vdmUgPSB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzUmVtb3ZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZXJzLnNwbGljZShyZW1vdmVJbmRleCwgMSk7XHJcbiAgICAgICAgICAgIE9iamVjdFBvb2wucHVzaChoYW5kbGVyKTtcclxuICAgICAgICAgICAgdGhpcy5fY291bnQtLTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NvdW50ID09IDApIHtcclxuICAgICAgICAgICAgICAgIGNjLmRpcmVjdG9yLmdldFNjaGVkdWxlcigpLnVuc2NoZWR1bGVVcGRhdGUodGhpcylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOa4heeQhlxyXG4gICAgICogQHBhcmFtIG1ldGhvZCDopoHnp7vpmaTnmoTlh73mlbDlr7nlupTnmoTlr7nosaFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlbW92ZUFsbChtZXRob2Q6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLl9jb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBoYW5kbGVyOiBUaW1lckhhbmRsZXIgPSB0aGlzLl9oYW5kbGVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZXIudGFyZ2V0ID09IG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgfHwgaGFuZGxlci5oYW5kbGVOYW1lID09IG1ldGhvZFxyXG4gICAgICAgICAgICAgICAgfHwgaGFuZGxlci5tZXRob2QgPT0gbWV0aG9kXHJcbiAgICAgICAgICAgICAgICB8fCBoYW5kbGVyID09IG1ldGhvZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFuZGxlcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgT2JqZWN0UG9vbC5wdXNoKGhhbmRsZXIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY291bnQtLTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jb3VudCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IuZ2V0U2NoZWR1bGVyKCkudW5zY2hlZHVsZVVwZGF0ZSh0aGlzKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pqC5YGc5pe26Ze0XHJcbiAgICAgKiBAcGFyYW0gbmFtZSBoYW5kbGVOYW1lXHJcbiAgICAgKi9cclxuICAgIGdldFBhdXNlVGltZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5fY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaGFuZGxlcjogVGltZXJIYW5kbGVyID0gdGhpcy5faGFuZGxlcnNbaV07XHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVyLmhhbmRsZU5hbWUgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZXIucGF1c2VUaW1lXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmjIHnu63ml7bpl7RcclxuICAgICAqIEBwYXJhbSBuYW1lIGhhbmRsZU5hbWVcclxuICAgICAqL1xyXG4gICAgZ2V0RHVyYXRpb25UaW1lKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLl9jb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBoYW5kbGVyOiBUaW1lckhhbmRsZXIgPSB0aGlzLl9oYW5kbGVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKGhhbmRsZXIuaGFuZGxlTmFtZSA9PSBuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlci5kdXJhdGlvblRpbWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaaguWBnOiuoeaXtuWZqFxyXG4gICAgICogQHBhcmFtIG5hbWUgaGFuZGxlTmFtZVxyXG4gICAgICovXHJcbiAgICBwYXVzZUhhbmRsZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5fY291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaGFuZGxlcjogVGltZXJIYW5kbGVyID0gdGhpcy5faGFuZGxlcnNbaV07XHJcbiAgICAgICAgICAgIGlmIChoYW5kbGVyLmhhbmRsZU5hbWUgPT0gbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlci5hY3RpdmUgPSBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5oGi5aSN6K6h5pe25ZmoXHJcbiAgICAgKiBAcGFyYW0gbmFtZSBoYW5kbGVOYW1lXHJcbiAgICAgKi9cclxuICAgIHJlY292ZXJIYW5kbGUobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMuX2NvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGhhbmRsZXI6IFRpbWVySGFuZGxlciA9IHRoaXMuX2hhbmRsZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlci5oYW5kbGVOYW1lID09IG5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZXIucGF1c2VUaW1lID0gMFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlci5hY3RpdmUgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmo4DmtYvmmK/lkKblt7Lnu4/lrZjlnKhcclxuICAgICAqIEBwYXJhbSBtZXRob2RcclxuICAgICAqIEBwYXJhbSBtZXRob2RPYmpcclxuICAgICAqL1xyXG4gICAgcHVibGljIGlzRXhpc3RzKG1ldGhvZDogRnVuY3Rpb24sIHRhcmdldDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMuX2NvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGhhbmRsZXI6IFRpbWVySGFuZGxlciA9IHRoaXMuX2hhbmRsZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAoaGFuZGxlci5tZXRob2QgPT0gbWV0aG9kICYmIGhhbmRsZXIudGFyZ2V0ID09IHRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKiDplIDmr4Hlh73mlbAgKi9cclxuICAgIGRlc3Ryb3koKTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHRoaXMuX2hhbmRsZXJzLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBsZXQgaGFuZGxlciA9IHRoaXMuX2hhbmRsZXJzW2luZGV4XVxyXG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVycy5zcGxpY2UoaW5kZXgsIDEpO1xyXG5cclxuICAgICAgICAgICAgT2JqZWN0UG9vbC5wdXNoKGhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9jdXJyRnJhbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuX2NvdW50ID0gMDtcclxuICAgICAgICB0aGlzLl90aW1lU2NhbGUgPSAxO1xyXG4gICAgICAgIHRoaXMuX2hhbmRsZXJzID0gW11cclxuICAgICAgICB0aGlzLl9kZWxIYW5kbGVycyA9IFtdXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1lckhhbmRsZXIge1xyXG4gICAgLyoqIOaJp+ihjOmXtOmalCAqL1xyXG4gICAgcHVibGljIGRlbGF5OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKiDmmK/lkKbph43lpI3miafooYwgKi9cclxuICAgIHB1YmxpYyByZXBlYXQ6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqIOmHjeWkjeaJp+ihjOasoeaVsCAqL1xyXG4gICAgcHVibGljIHJlcGVhdENvdW50OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKiDmmK/lkKbnlKjluKfnjocgKi9cclxuICAgIHB1YmxpYyB1c2VyRnJhbWU6IGJvb2xlYW47XHJcblxyXG4gICAgLyoqIOS4i+S4gOasoeaJp+ihjOaXtumXtCAqL1xyXG4gICAgcHVibGljIGV4ZVRpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqIOWkhOeQhuWHveaVsCAqL1xyXG4gICAgcHVibGljIG1ldGhvZDogRnVuY3Rpb247XHJcblxyXG4gICAgLyoqIOWujOaIkOWkhOeQhuWHveaVsCAqL1xyXG4gICAgcHVibGljIGNvbXBsYXRlTWV0aG9kOiBGdW5jdGlvbjtcclxuXHJcbiAgICAvKiog5LiK5qyh55qE5omn6KGM5pe26Ze0ICovXHJcbiAgICBwdWJsaWMgZGVhbFRpbWU6IG51bWJlciA9IDA7XHJcblxyXG4gICAgLyoqIOW3suaMgee7reaXtumXtCAqL1xyXG4gICAgcHVibGljIGR1cmF0aW9uVGltZTogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKiog5pqC5YGc5pe26ZW/ICovXHJcbiAgICBwdWJsaWMgcGF1c2VUaW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIC8qKiDlvZPliY3mmK/lkKbmtLvot4MgKi9cclxuICAgIHB1YmxpYyBhY3RpdmU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIC8qKiBoYW5kbGXlkI3np7AgKi9cclxuICAgIHB1YmxpYyBoYW5kbGVOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+56LGhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0YXJnZXQ6IGFueTtcclxuXHJcbiAgICAvKiog5riF55CGICovXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tZXRob2QgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvbXBsYXRlTWV0aG9kID0gbnVsbDtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgZ0xvZyB9IGZyb20gXCJ6bWdfdXRpbFwiXHJcblxyXG5leHBvcnQgY2xhc3MgVGltZVV0aWxzIHtcclxuICAgIC8qKlxyXG4gICAgICog5a6i5oi356uv5ZKM5pyN5Yqh5Zmo55qE5pe26Ze05beuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2RpZmZUaW1lOiBudW1iZXIgPSAwXHJcbiAgICBwcml2YXRlIF9zdGFydFRpbWU6IG51bWJlciA9IDBcclxuXHJcbiAgICAvKipcclxuICAgICog6I635Y+W5pys5Zyw5pe26Ze05LiO5pyN5Yqh5Zmo5pe26Ze05beuXHJcbiAgICAqIEBwYXJhbSBzZXJ2ZXJfdGltZSDnp5JcclxuICAgICovXHJcbiAgICBnZXREaWZmVGltZShzZXJ2ZXJfdGltZTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICB0aGlzLl9kaWZmVGltZSA9IE1hdGguZmxvb3IoKG5ldyBEYXRlKCkpLnZhbHVlT2YoKSAvIDEwMDApIC0gc2VydmVyX3RpbWVcclxuICAgICAgICByZXR1cm4gdGhpcy5fZGlmZlRpbWVcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog6I635Y+W5b2T5YmN57O757uf5pe26Ze05Y2V5L2N56eSXHJcbiAgICAqL1xyXG4gICAgZ2V0Q3VyVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChuZXcgRGF0ZSgpKS52YWx1ZU9mKCkgLyAxMDAwKSAtIHRoaXMuX2RpZmZUaW1lXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOagvOW8j+WMluaXtumXtOaIs1xyXG4gICAgKiBAcGFyYW0gdGltZSDml7bpl7TmiLPmr6vnp5JcclxuICAgICogQHBhcmFtIGZvcm1hdCAnWU1EaG1zJ+W5tOaciOaXpeaXtuWIhuenkijlj4LmlbDlj6/pgIkpXHJcbiAgICAqL1xyXG4gICAgZm9ybWF0VGltZSh0aW1lOiBudW1iZXIsIGZvcm1hdDogc3RyaW5nKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gZm9ybWF0TnVtYmVyKG46IG51bWJlcikge1xyXG4gICAgICAgICAgICBsZXQgbnMgPSBuLnRvU3RyaW5nKClcclxuICAgICAgICAgICAgcmV0dXJuIG5zWzFdID8gbnMgOiAnMCcgKyBuc1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBmb3JtYXRlQXJyID0gWydZJywgJ00nLCAnRCcsICdoJywgJ20nLCAncyddXHJcbiAgICAgICAgY29uc3QgcmV0dXJuQXJyID0gW11cclxuICAgICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUodGltZSlcclxuICAgICAgICByZXR1cm5BcnIucHVzaChkYXRlLmdldEZ1bGxZZWFyKCkpXHJcbiAgICAgICAgcmV0dXJuQXJyLnB1c2goZm9ybWF0TnVtYmVyKGRhdGUuZ2V0TW9udGgoKSArIDEpKVxyXG4gICAgICAgIHJldHVybkFyci5wdXNoKGZvcm1hdE51bWJlcihkYXRlLmdldERhdGUoKSkpXHJcbiAgICAgICAgcmV0dXJuQXJyLnB1c2goZm9ybWF0TnVtYmVyKGRhdGUuZ2V0SG91cnMoKSkpXHJcbiAgICAgICAgcmV0dXJuQXJyLnB1c2goZm9ybWF0TnVtYmVyKGRhdGUuZ2V0TWludXRlcygpKSlcclxuICAgICAgICByZXR1cm5BcnIucHVzaChmb3JtYXROdW1iZXIoZGF0ZS5nZXRTZWNvbmRzKCkpKVxyXG4gICAgICAgIGZvciAoY29uc3QgaSBpbiByZXR1cm5BcnIpIHtcclxuICAgICAgICAgICAgZm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoZm9ybWF0ZUFycltpXSwgcmV0dXJuQXJyW2ldKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZm9ybWF0XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOaVsOe7hOi9rOaXtumXtOaIs+avq+enklxyXG4gICAgKiBAcGFyYW0gYXJyIFvlubQs5pyILOaXpSzml7Ys5YiGLOenkl1cclxuICAgICovXHJcbiAgICBnZXRUaW1lQnlBcnIoYXJyOiBudW1iZXJbXSk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBhcnIgPT0gJ251bWJlcicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFyclxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xyXG4gICAgICAgICAgICBhcnJbaV0gPSBhcnJbaV0gPyBhcnJbaV0gOiAwXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBkYXRlID0gYCR7YXJyWzBdfS0ke2FyclsxXX0tJHthcnJbMl19ICR7YXJyWzNdfToke2Fycls0XX06JHthcnJbNV19YFxyXG4gICAgICAgIHJldHVybiBEYXRlLnBhcnNlKGRhdGUucmVwbGFjZSgvLS9nLCAnLycpKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluaVsOaNrnvlubQs5pyILOaXpSzml7Ys5YiGLOenkn1cclxuICAgICAqIEBwYXJhbSB0aW1lIOaXtumXtOenklxyXG4gICAgICovXHJcbiAgICBnZXRUaW1lRGF0YSh0aW1lOiBudW1iZXIpOiB7XHJcbiAgICAgICAgeWVhcjogbnVtYmVyLFxyXG4gICAgICAgIG1vbnRoOiBudW1iZXIsXHJcbiAgICAgICAgZGF5OiBudW1iZXIsXHJcbiAgICAgICAgaG91cjogbnVtYmVyLFxyXG4gICAgICAgIG1pbnV0ZTogbnVtYmVyLFxyXG4gICAgICAgIHNlY29uZDogbnVtYmVyXHJcbiAgICB9IHtcclxuICAgICAgICB0aW1lID0gdGltZSAqIDEwMDBcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHRpbWUpXHJcbiAgICAgICAgbGV0IHkgPSBkYXRlLmdldEZ1bGxZZWFyKClcclxuICAgICAgICBsZXQgbSA9IGRhdGUuZ2V0TW9udGgoKSArIDFcclxuICAgICAgICBsZXQgZCA9IGRhdGUuZ2V0RGF0ZSgpXHJcbiAgICAgICAgbGV0IGggPSBkYXRlLmdldEhvdXJzKClcclxuICAgICAgICBsZXQgbWludXRlID0gZGF0ZS5nZXRNaW51dGVzKClcclxuICAgICAgICBsZXQgc2Vjb25kID0gZGF0ZS5nZXRTZWNvbmRzKClcclxuICAgICAgICBsZXQgdGltZUluZm8gPSB7XHJcbiAgICAgICAgICAgIHllYXI6IHksXHJcbiAgICAgICAgICAgIG1vbnRoOiBtLFxyXG4gICAgICAgICAgICBkYXk6IGQsXHJcbiAgICAgICAgICAgIGhvdXI6IGgsXHJcbiAgICAgICAgICAgIG1pbnV0ZTogbWludXRlLFxyXG4gICAgICAgICAgICBzZWNvbmQ6IHNlY29uZFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltZUluZm9cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHRpbWUgXHJcbiAgICAgKiBAcGFyYW0gZm9ybWF0IDDmmJ/mnJ9477yMIDHlkah4XHJcbiAgICAgKiBAcmV0dXJucyBcclxuICAgICAqL1xyXG4gICAgZ2V0V2Vlayh0aW1lOiBudW1iZXIgfCBzdHJpbmcsIGZvcm1hdDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoY2MuanMuaXNTdHJpbmcodGltZSkpIHtcclxuICAgICAgICAgICAgbGV0IGIgPSBSZWdFeHAoL15cXGR7NH0oLSkoMVswLTJdfDA/XFxkKVxcMShbMC0yXVxcZHxcXGR8MzB8MzEpJC8pLnRlc3QodGltZSBhcyBzdHJpbmcpXHJcbiAgICAgICAgICAgIGlmICghYikgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBzdHIgPSAnJ1xyXG4gICAgICAgIGxldCBkYXRhVGltZSA9IG5ldyBEYXRlKHRpbWUpXHJcbiAgICAgICAgbGV0IHdlZWsgPSBkYXRhVGltZS5nZXREYXkoKVxyXG4gICAgICAgIGxldCB3ZWVrc3RyID0gW1wi5pelXCIsIFwi5LiAXCIsIFwi5LqMXCIsIFwi5LiJXCIsIFwi5ZubXCIsIFwi5LqUXCIsIFwi5YWtXCJdXHJcbiAgICAgICAgc3RyICs9IFwi5pif5pyfXCIgKyB3ZWVrc3RyW3dlZWtdXHJcbiAgICAgICAgaWYgKGZvcm1hdCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgn5pif5pyfJywgJ+WRqCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldFNlY29uZHMocyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHNUaW1lID0gcGFyc2VJbnQocyk7Ly8g56eSXHJcbiAgICAgICAgbGV0IG1UaW1lID0gMDsvLyDliIZcclxuICAgICAgICBsZXQgaFRpbWUgPSAwOy8vIOaXtlxyXG4gICAgICAgIGlmIChzVGltZSA+IDYwKSB7Ly/lpoLmnpznp5LmlbDlpKfkuo42MO+8jOWwhuenkuaVsOi9rOaNouaIkOaVtOaVsFxyXG4gICAgICAgICAgICAvL+iOt+WPluWIhumSn++8jOmZpOS7pTYw5Y+W5pW05pWw77yM5b6X5Yiw5pW05pWw5YiG6ZKfXHJcbiAgICAgICAgICAgIG1UaW1lID0gTWF0aC5mbG9vcihzVGltZSAvIDYwKVxyXG4gICAgICAgICAgICAvL+iOt+WPluenkuaVsO+8jOenkuaVsOWPluS9mO+8jOW+l+WIsOaVtOaVsOenkuaVsFxyXG4gICAgICAgICAgICBzVGltZSA9IHNUaW1lICUgNjA7XHJcbiAgICAgICAgICAgIC8v5aaC5p6c5YiG6ZKf5aSn5LqONjDvvIzlsIbliIbpkp/ovazmjaLmiJDlsI/ml7ZcclxuICAgICAgICAgICAgaWYgKG1UaW1lID4gNjApIHtcclxuICAgICAgICAgICAgICAgIC8v6I635Y+W5bCP5pe277yM6I635Y+W5YiG6ZKf6Zmk5LulNjDvvIzlvpfliLDmlbTmlbDlsI/ml7ZcclxuICAgICAgICAgICAgICAgIGhUaW1lID0gTWF0aC5mbG9vcihtVGltZSAvIDYwKTtcclxuICAgICAgICAgICAgICAgIC8v6I635Y+W5bCP5pe25ZCO5Y+W5L2Y55qE5YiG77yM6I635Y+W5YiG6ZKf6Zmk5LulNjDlj5bkvZjnmoTliIZcclxuICAgICAgICAgICAgICAgIG1UaW1lID0gbVRpbWUgJSA2MDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmVzdWx0ID0gJyc7XHJcbiAgICAgICAgaWYgKHNUaW1lID49IDAgJiYgc1RpbWUgPCAxMCkge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBcIjBcIiArIHNUaW1lICsgXCJcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBcIlwiICsgc1RpbWUgKyBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobVRpbWUgPj0gMCAmJiBtVGltZSA8IDEwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFwiMFwiICsgbVRpbWUgKyBcIjpcIiArIHJlc3VsdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBcIlwiICsgbVRpbWUgKyBcIjpcIiArIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGhUaW1lID4gMCAmJiBoVGltZSA8IDEwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IFwiMFwiICsgaFRpbWUgKyBcIjpcIiArIHJlc3VsdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAoaFRpbWUgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBcIlwiICsgaFRpbWUgKyBcIjpcIiArIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgKiDlvIDlp4vorqHml7Yo5ZKMdGltZUVuZOmFjeWll+S9v+eUqClcclxuICAgICovXHJcbiAgICB0aW1lU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc3RhcnRUaW1lID0gdGhpcy5nZXRDdXJUaW1lKClcclxuICAgICAgICBnTG9nKFwi5byA5aeL6K6h5pe2PT09PT09PT1cIiwgdGhpcy5fc3RhcnRUaW1lKVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog57uT5p2f6K6h5pe2KOWSjHRpbWVTdGFydOmFjeWll+S9v+eUqClcclxuICAgICAqL1xyXG4gICAgdGltZUVuZCgpOiBudW1iZXIge1xyXG4gICAgICAgIGdMb2coXCLlvZPliY3nu5PmnZ/ml7bpl7Q9PT09PT09PVwiLCB0aGlzLmdldEN1clRpbWUoKSlcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDdXJUaW1lKCkgLSB0aGlzLl9zdGFydFRpbWVcclxuICAgIH1cclxuXHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuX2RpZmZUaW1lID0gMFxyXG4gICAgICAgIHRoaXMuX3N0YXJ0VGltZSA9IDBcclxuICAgIH1cclxufSIsImltcG9ydCB7IEJhc2VNZ3IgfSBmcm9tIFwiem1nX21nclwiXHJcbmltcG9ydCB7IFRpbWVySGFuZGxlcywgVGltZXJIYW5kbGVyIH0gZnJvbSBcIi4vVGltZXJIYW5kbGVzXCI7XHJcbmltcG9ydCB7IFRpbWVVdGlscyB9IGZyb20gXCIuL1RpbWVVdGlsc1wiO1xyXG5leHBvcnQgY2xhc3MgX1RpbWVNZ3IgZXh0ZW5kcyBCYXNlTWdyIGltcGxlbWVudHMgem1nLklUaW1lTWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogX1RpbWVNZ3I7XHJcbiAgICBwcml2YXRlIF9UaW1lckhhbmRsZXM6IFRpbWVySGFuZGxlcyA9IG51bGxcclxuICAgIHByaXZhdGUgX1RpbWVVdGlsczogVGltZVV0aWxzID0gbnVsbFxyXG5cclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBfVGltZU1nciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfVGltZU1ncigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX1RpbWVySGFuZGxlcyA9IG5ldyBUaW1lckhhbmRsZXMoKVxyXG4gICAgICAgIHRoaXMuX1RpbWVVdGlscyA9IG5ldyBUaW1lVXRpbHMoKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgVGltZXJIYW5kbGVzKCk6IFRpbWVySGFuZGxlcyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1RpbWVySGFuZGxlc1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgVGltZVV0aWxzKCk6IFRpbWVVdGlscyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1RpbWVVdGlsc1xyXG4gICAgfVxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuaXtumXtOW3peWFt1RpbWVVdGlscyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgZ2V0U2Vjb25kcyhzKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5UaW1lVXRpbHMuZ2V0U2Vjb25kcyhzKVxyXG4gICAgfVxyXG4gICAgZ2V0V2Vlayh0aW1lOiBudW1iZXIgfCBzdHJpbmcsIGZvcm1hdDogbnVtYmVyID0gMCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVGltZVV0aWxzLmdldFdlZWsodGltZSwgZm9ybWF0KVxyXG4gICAgfVxyXG4gICAgZ2V0RGlmZlRpbWUoc2VydmVyX3RpbWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVGltZVV0aWxzLmdldERpZmZUaW1lKHNlcnZlcl90aW1lKVxyXG4gICAgfVxyXG4gICAgZ2V0Q3VyVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlRpbWVVdGlscy5nZXRDdXJUaW1lKClcclxuICAgIH1cclxuICAgIGZvcm1hdFRpbWUodGltZTogbnVtYmVyLCBmb3JtYXQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVGltZVV0aWxzLmZvcm1hdFRpbWUodGltZSwgZm9ybWF0KVxyXG4gICAgfVxyXG4gICAgZ2V0VGltZUJ5QXJyKGFycjogbnVtYmVyW10pOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlRpbWVVdGlscy5nZXRUaW1lQnlBcnIoYXJyKVxyXG4gICAgfVxyXG4gICAgZ2V0VGltZURhdGEodGltZTogbnVtYmVyKTogeyB5ZWFyOiBudW1iZXI7IG1vbnRoOiBudW1iZXI7IGRheTogbnVtYmVyOyBob3VyOiBudW1iZXI7IG1pbnV0ZTogbnVtYmVyOyBzZWNvbmQ6IG51bWJlcjsgfSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVGltZVV0aWxzLmdldFRpbWVEYXRhKHRpbWUpXHJcbiAgICB9XHJcbiAgICB0aW1lU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVGltZVV0aWxzLnRpbWVTdGFydCgpXHJcbiAgICB9XHJcbiAgICB0aW1lRW5kKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVGltZVV0aWxzLnRpbWVFbmQoKVxyXG4gICAgfVxyXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKuaXtumXtOiuoeaXtuWZqFRpbWVySGFuZGxlcyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuICAgIHB1YmxpYyBkb1RpbWVyKGRlbGF5OiBudW1iZXIsIG1ldGhvZDogRnVuY3Rpb24sIHRhcmdldDogYW55LCByZXBlYXRDb3VudDogbnVtYmVyID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsIGNvbXBsZXRlTWV0aG9kOiBGdW5jdGlvbiA9IG51bGwpOiBUaW1lckhhbmRsZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlRpbWVySGFuZGxlcy5kb1RpbWVyKGRlbGF5LCBtZXRob2QsIHRhcmdldCwgcmVwZWF0Q291bnQsIGNvbXBsZXRlTWV0aG9kKVxyXG4gICAgfVxyXG4gICAgcHVibGljIGRvRnJhbWUoZGVsYXk6IG51bWJlciwgbWV0aG9kOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnksIHJlcGVhdENvdW50OiBudW1iZXIgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiwgY29tcGxldGVNZXRob2Q6IEZ1bmN0aW9uID0gbnVsbCk6IFRpbWVySGFuZGxlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVGltZXJIYW5kbGVzLmRvRnJhbWUoZGVsYXksIG1ldGhvZCwgdGFyZ2V0LCByZXBlYXRDb3VudCwgY29tcGxldGVNZXRob2QpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRvTW9kdWxlKG1vZHVsZU5hbWU6IHN0cmluZywgb2JqOiBhbnksIHVzZUZyYW1lOiBib29sZWFuID0gZmFsc2UpOiBUaW1lckhhbmRsZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlRpbWVySGFuZGxlcy5kb01vZHVsZShtb2R1bGVOYW1lLCBvYmosIHVzZUZyYW1lKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZW1vdmUobWV0aG9kOiBhbnksIG1ldGhvZE9iajogYW55KTogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVGltZXJIYW5kbGVzLnJlbW92ZShtZXRob2QsIG1ldGhvZE9iailcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVtb3ZlQWxsKG1ldGhvZDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuVGltZXJIYW5kbGVzLnJlbW92ZUFsbChtZXRob2QpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFBhdXNlVGltZShuYW1lOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlRpbWVySGFuZGxlcy5nZXRQYXVzZVRpbWUobmFtZSlcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXREdXJhdGlvblRpbWUobmFtZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5UaW1lckhhbmRsZXMuZ2V0RHVyYXRpb25UaW1lKG5hbWUpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBhdXNlSGFuZGxlKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlRpbWVySGFuZGxlcy5wYXVzZUhhbmRsZShuYW1lKVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZWNvdmVySGFuZGxlKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiB0aGlzLlRpbWVySGFuZGxlcy5yZWNvdmVySGFuZGxlKG5hbWUpXHJcbiAgICB9XHJcblxyXG4gICAgZGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLlRpbWVySGFuZGxlcy5kZXN0cm95KClcclxuICAgICAgICB0aGlzLlRpbWVVdGlscy5kZXN0cm95KClcclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBfVGltZU1nciB9IGZyb20gXCIuL1RpbWVNZ3JcIjtcclxuXHJcbmV4cG9ydCAqIGZyb20gXCIuL2ludGVyZmFjZXNcIlxyXG5cclxuZXhwb3J0IGxldCBUaW1lTWdyID0gX1RpbWVNZ3IuZ2V0SW5zdGFuY2UoKTsiXSwibmFtZXMiOlsiT2JqZWN0UG9vbCIsImdMb2ciLCJCYXNlTWdyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
