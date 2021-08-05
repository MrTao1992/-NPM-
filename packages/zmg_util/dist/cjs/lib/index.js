'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function download(filename, text) {
    var element = document.createElement("a");
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
    element.setAttribute("download", filename);
    element.style.display = "none";
    element.target = "_blank";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
function dateFormat(date, fmt) {
    if (fmt === void 0) { fmt = "yyyy-MM-dd hh:mm:ss"; }
    var formatDate = new Date(date);
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (formatDate.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    var o = {
        "M+": formatDate.getMonth() + 1,
        "d+": formatDate.getDate(),
        "h+": formatDate.getHours(),
        "m+": formatDate.getMinutes(),
        "s+": formatDate.getSeconds(),
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            var str = o[k] + "";
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
        }
    }
    return fmt;
}
function padLeftZero(str) {
    return ("00" + str).substr(str.length);
}

var _TsLog = /** @class */ (function () {
    function _TsLog(config) {
        this.doConsole = CC_DEBUG ? true : false;
        this.usetsLog = true;
        this.itemName = "GLog";
        this.maxLen = 500;
        this.logName = "TSLOG";
        if (config) {
            if (undefined !== config.doConsole) {
                this.doConsole = config.doConsole;
            }
            if (undefined !== config.usetsLog) {
                this.usetsLog = config.usetsLog;
            }
            if (undefined !== config.itemName) {
                this.itemName = config.itemName;
            }
            if (undefined !== config.maxLen) {
                this.maxLen = config.maxLen;
            }
            if (undefined !== config.logName) {
                this.logName = config.logName;
            }
        }
        this.logList = [];
        this._initLog();
    }
    _TsLog.getInstance = function () {
        if (!this._instance) {
            this._instance = new _TsLog();
        }
        return this._instance;
    };
    _TsLog.prototype.log = function (obj) {
        if (this.doConsole) {
            // console.log(obj);
            if (CC_JSB) {
                console.log(obj);
            }
            else {
                console.log.apply(console, __spread(["%c Log: %c %s", 'color: #65c294', 'color: #000000'], obj));
            }
        }
        this._doLog(obj, "INFO");
    };
    _TsLog.prototype.warn = function (obj) {
        // if (this.doConsole) {
        // console.warn(obj);
        if (CC_JSB) {
            console.warn(obj);
        }
        else {
            console.log.apply(console, __spread(["%c Warn: %c %s", 'color: #b0a600', 'color: #000000'], obj));
        }
        // }
        this._doLog(obj, "WARN");
    };
    _TsLog.prototype.error = function (obj) {
        // if (this.doConsole) {
        // console.error(obj);
        if (CC_JSB) {
            console.error(obj);
        }
        else {
            console.log.apply(console, __spread(["%c Error: %c %s", 'color: #f83d3d', 'color: #000000'], obj));
        }
        // }
        this._doLog(obj, "ERROR");
    };
    _TsLog.prototype.downloadLog = function () {
        var content = "-----TSLOG START-----\n";
        if (this.logList && this.logList.length > 0) {
            this.logList.forEach(function (log) {
                content = "" + content + dateFormat(log.date) + " " + log.type + "\uFF1A" + log.log + "\n";
            });
        }
        content = content + "-----TSLOG END-----\n";
        download("" + this.logName + dateFormat(new Date().getTime(), "yyyyMMddhhmmss") + ".txt", content);
    };
    _TsLog.prototype.clear = function () {
        this.logList = [];
        window.localStorage.removeItem(this.itemName);
    };
    _TsLog.prototype._initLog = function () {
        if (!window.localStorage) {
            console.log("当前浏览器不支持localStorage!");
            return;
        }
        var logInStorage = window.localStorage.getItem(this.itemName);
        if (logInStorage) {
            try {
                this.logList = JSON.parse(logInStorage);
            }
            catch (error) {
                console.error("\u89E3\u6790\u5B58\u50A8\u65E5\u5FD7\u5931\u8D25\uFF01");
                this.logList = [];
            }
        }
    };
    _TsLog.prototype._doLog = function (obj, type) {
        return;
    };
    _TsLog.prototype._saveLog = function (data, log) {
        if (!window.localStorage) {
            console.log("当前浏览器不支持localStorage!");
            return;
        }
        try {
            window.localStorage.setItem(this.itemName, data);
        }
        catch (e) {
            console.log(e);
            if ("QuotaExceededError" === e.name) {
                this.clear();
                if (undefined !== log) {
                    this.logList.push(log);
                    this._saveLog(JSON.stringify(this.logList));
                }
            }
        }
    };
    return _TsLog;
}());
// export let GLog = TsLog.getInstance();

var TsLog = _TsLog.getInstance();
/**
 * 日志部分
 */
/**
 * 普通日志输出
 * @param args 参数
 */
function _gLog() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    TsLog.log(args);
}
/**
 * 警告日志输出
 * @param args 参数
 */
function _gWarn() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    TsLog.warn(args);
}
/**
 * 错误日志输出
 * @param args 参数
 */
function _gError() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    TsLog.error(args);
}
/**
 * 下载log
 */
function _gDownLoadLog() {
    TsLog.downloadLog();
}
/**
 * 清理log缓存
 */
function _gClearLog() {
    TsLog.clear();
}
/**
 * 将{}内容替换成参数内容
 */
function _$(msg) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var reg = /\{(.*?)\}/;
    var i;
    var len = args.length;
    for (i = 0; i < len; i++) {
        msg = msg.replace(reg, args[i]);
    }
    return msg;
}
/**
 * 日志部分结束
 */

var _ArrayUtil = /** @class */ (function () {
    function _ArrayUtil() {
    }
    _ArrayUtil.isValid = function (record) {
        if (record && record.length) {
            return true;
        }
        return false;
    };
    /**
     * 复制二维数组
     * @param array 目标数组
     */
    _ArrayUtil.copy2DArray = function (array) {
        var newArray = [];
        for (var i = 0; i < array.length; i++) {
            newArray.push(array[i].concat());
        }
        return newArray;
    };
    /**
     * Fisher-Yates Shuffle 随机置乱算法
     * @param array 目标数组
     */
    _ArrayUtil.fisherYatesShuffle = function (array) {
        var count = array.length;
        while (count) {
            var index = Math.floor(Math.random() * count--);
            var temp = array[count];
            array[count] = array[index];
            array[index] = temp;
        }
        return array;
    };
    /**
     * 混淆数组
     * @param array 目标数组
     */
    _ArrayUtil.confound = function (array) {
        var result = array.slice().sort(function () { return Math.random() - 0.5; });
        return result;
    };
    /**
     * 数组扁平化
     * @param array 目标数组
     */
    _ArrayUtil.flattening = function (array) {
        for (; array.some(function (v) { return Array.isArray(v); });) {
            // 判断 array 中是否有数组
            array = [].concat.apply([], array); // 压扁数组
        }
        return array;
    };
    /**
     * 合并数组
     * @param array1 目标数组1
     * @param array2 目标数组2
     */
    _ArrayUtil.combineArrays = function (array1, array2) {
        var newArray = __spread(array1, array2);
        return newArray;
    };
    /**
     * 获取随机数组成员
     * @param array 目标数组
     */
    _ArrayUtil.getRandomValueInArray = function (array) {
        var newArray = array[Math.floor(Math.random() * array.length)];
        return newArray;
    };
    return _ArrayUtil;
}());

var $DateUtilType;
(function ($DateUtilType) {
    //日期格式部分
    $DateUtilType["yyyy_MM_dd_HH_mm_ss"] = "yyyy-MM-dd HH:mm:ss";
    $DateUtilType["yyyy_MM_dd_HH_mm"] = "yyyy-MM-dd HH:mm";
    $DateUtilType["yyyy_MM_dd"] = "yyyy-MM-dd";
    $DateUtilType["yyyy_MM_dd_1"] = "yyyy/MM/dd";
    $DateUtilType["yyyyMMdd"] = "yyyyMMdd";
    $DateUtilType["HH_mm_ss"] = "HH:mm:ss";
})($DateUtilType || ($DateUtilType = {}));
var $DateUtil = /** @class */ (function () {
    function $DateUtil() {
    }
    /**
     * 判断数据是否为空
     * @param data
     * @returns {boolean}
     */
    $DateUtil.isValid = function (data) {
        if (data == null || data == undefined || data == '') {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 判断是否为日期
     * @param date 不支持yyyyMMdd格式
     * @returns {boolean}
     */
    $DateUtil.isDate = function (date) {
        if (isNaN(date) && !isNaN(Date.parse(date))) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 获取当前日期
     * @returns {Date}
     */
    $DateUtil.getNowDate = function () {
        return new Date();
    };
    /**
     * 获取当前时间戳
     * @returns {number}
     */
    $DateUtil.getNowTimeStamp = function () {
        return Math.ceil(new Date().getTime());
    };
    /**
     * Date日期格式化
     * @param date
     * @param pattern 可为空，默认yyyy-MM-dd HH:mm:ss
     * @returns {string}
     */
    $DateUtil.format = function (date, pattern) {
        var yy = date.getFullYear(); //年
        var mm = date.getMonth() + 1; //月
        var dd = date.getDate(); //日
        var hh = date.getHours(); //时
        var ii = date.getMinutes(); //分
        var ss = date.getSeconds(); //秒
        var clock = yy + "-";
        if (mm < 10)
            clock += "0";
        clock += mm + "-";
        if (dd < 10)
            clock += "0";
        clock += dd + " ";
        if (hh < 10)
            clock += "0";
        clock += hh + ":";
        if (ii < 10)
            clock += "0";
        clock += ii;
        if (ss < 10)
            clock += "0";
        if (pattern != $DateUtilType.yyyy_MM_dd_HH_mm)
            clock += (":" + ss);
        if (this.isValid(pattern) || pattern == $DateUtilType.yyyy_MM_dd_HH_mm_ss) {
            return clock;
        }
        else if (pattern == $DateUtilType.yyyy_MM_dd) {
            return clock.substring(0, 10);
        }
        else if (pattern == $DateUtilType.HH_mm_ss) {
            return clock.substring(11);
        }
        else if (pattern == $DateUtilType.yyyy_MM_dd_1) {
            return clock.substring(0, 10).replace(/-/g, "/");
        }
        else if (pattern == $DateUtilType.yyyyMMdd) {
            return clock.substring(0, 10).replace(/-/g, "");
        }
        else {
            return clock;
        }
    };
    /**
     * 日期字符串转时间戳
     * @param date  不支持yyyyMMdd格式
     * @returns {number}
     */
    $DateUtil.strDate2TimeStamp = function (date) {
        date = date.replace(/-/g, "/");
        return new Date(date).getTime();
    };
    /**
     * 时间戳转日期字符串(yyyy-MM-dd HH:mm:ss)
     * @param timeStamp
     * @returns {string}
     */
    $DateUtil.timeStamp2strDate = function (timeStamp) {
        var d = new Date(timeStamp); //根据时间戳生成的时间对象
        var date = d.getFullYear() +
            "-" +
            (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) +
            "-" +
            (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) +
            " " +
            (d.getHours() < 10 ? "0" + d.getHours() : d.getHours()) +
            ":" +
            (d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()) +
            ":" +
            (d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds());
        return date;
    };
    /**
     * 获取几天前日期(1代表明天，-1 代表前一天，-2前两天...)
     * @param date 指定日期
     * @param num
     * @param separator 连接符 如果为-,则结果为:yyyy-MM-dd
     */
    $DateUtil.getDay = function (date, num, separator) {
        var today = new Date(date);
        var nowTime = today.getTime();
        var ms = 24 * 3600 * 1000 * num;
        today.setTime(nowTime + ms);
        var oYear = today.getFullYear();
        var oMoth = (today.getMonth() + 1).toString();
        if (oMoth.length <= 1)
            oMoth = "0" + oMoth;
        var oDay = today.getDate().toString();
        if (oDay.length <= 1)
            oDay = "0" + oDay;
        return oYear + separator + oMoth + separator + oDay;
    };
    /**
     * 获取前几月(1代表下月，-1 代表上月，-2上两月...)
     * @param date 指定日期
     * @param num
     * @param separator 连接符 如果为-,则结果为:yyyy-MM
     */
    $DateUtil.getMonth = function (date, num, separator) {
        var today = new Date(date);
        today.setMonth(today.getMonth() + num);
        var oYear = today.getFullYear();
        var oMoth = (today.getMonth() + 1).toString();
        if (oMoth.length <= 1)
            oMoth = "0" + oMoth;
        return oYear + separator + oMoth;
    };
    /**
     * 判断某一年是否是闰年
     * @param year
     * @returns {boolean}
     */
    $DateUtil.isLeapYear = function (year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };
    /**
     * 获取某年某个月的天数(西方月份)
     * @param year
     * @param month 从0开始
     */
    $DateUtil.getDaysOfMonthEN = function (year, month) {
        return [
            31,
            this.isLeapYear(year) ? 29 : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
        ][month];
    };
    /**
     * 获取某年某个月的天数(中国月份)
     * @param year
     * @param month 从1开始
     */
    $DateUtil.getDaysOfMonthCN = function (year, month) {
        return [
            "中国没有0月",
            31,
            this.isLeapYear(year) ? 29 : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
        ][month];
    };
    /**
     * 计算一个日期是当年的第几天
     * @param date 字符串日期
     * @returns {number}
     */
    $DateUtil.dayOfTheYear = function (date) {
        var obj = new Date(date);
        var year = obj.getFullYear();
        var month = obj.getMonth(); //从0开始
        var days = obj.getDate();
        var daysArr = [
            31,
            this.isLeapYear(year) ? 29 : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
        ];
        for (var i = 0; i < month; i++) {
            days += daysArr[i];
        }
        return days;
    };
    /**
     * 比较两个时间大小(不支持yyyyMMdd格式)
     *    date1>date2 return 1
     *    date1<date2 return -1
     *    date1==date2 return 0
     * @returns {number}
     */
    $DateUtil.compareTime = function (date1, date2) {
        if (Date.parse(date1.replace(/-/g, "/")) >
            Date.parse(date2.replace(/-/g, "/"))) {
            return 1;
        }
        else if (Date.parse(date1.replace(/-/g, "/")) <
            Date.parse(date2.replace(/-/g, "/"))) {
            return -1;
        }
        else if (Date.parse(date1.replace(/-/g, "/")) ==
            Date.parse(date2.replace(/-/g, "/"))) {
            return 0;
        }
    };
    /**
     * 获取本周开始日期
     * @returns {*|string}
     */
    $DateUtil.getWeekStartDay = function () {
        var now = new Date();
        var date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1);
        return this.format(date, $DateUtilType.yyyy_MM_dd);
    };
    /**
     * 获取本周结束日期
     * @returns {*|string}
     */
    $DateUtil.getWeekEndDay = function () {
        var now = new Date();
        var date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - now.getDay()));
        return this.format(date, $DateUtilType.yyyy_MM_dd);
    };
    /**
     * 获取上周开始日期
     * @returns {*|string}
     */
    $DateUtil.getUpWeekStartDay = function () {
        var now = new Date();
        var date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() - 6);
        return this.format(date, $DateUtilType.yyyy_MM_dd);
    };
    /**
     * 获取上周结束日期
     * @returns {*|string}
     */
    $DateUtil.getUpWeekEndDay = function () {
        var now = new Date();
        var date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
        return this.format(date, $DateUtilType.yyyy_MM_dd);
    };
    return $DateUtil;
}());

var $StringUtil = /** @class */ (function () {
    function $StringUtil() {
    }
    /**
     * @description: 查询字符串是否包含key，返回number
     * @param {string} msg
     * @param {string} key
     */
    $StringUtil.findKey = function (msg, key) {
        if (msg) {
            return msg.indexOf(key);
        }
        return -1;
    };
    /**
     * @description: 查询字符串是否包含key，返回boolean
     * @param {string} msg
     * @param {string} key
     */
    $StringUtil.hasKey = function (msg, key) {
        if (msg) {
            return this.findKey(msg, key) != -1;
        }
    };
    /**
     * @description:是否是http链接
     * @param {string} msg
     */
    $StringUtil.isHttps = function (msg) {
        if (msg) {
            return this.isHttp(msg);
        }
        return false;
    };
    /**
     * @description: 校验网络连接头部是否包含‘https或http’
     * @param {string} msg
     */
    $StringUtil.isHttp = function (msg) {
        if (msg) {
            return (this.findKey(msg, "https://") == 0 || this.findKey(msg, "http://") == 0);
        }
        return false;
    };
    /**
     * @description: 校验字符串是否有效
     * @param {string} msg
     */
    $StringUtil.isValid = function (msg) {
        if (msg instanceof Array) {
            var i = void 0;
            var len = msg.length;
            for (i = 0; i < len; i++) {
                if (!cc.js.isString(msg) || msg.length == 0) {
                    return false;
                }
            }
            return true;
        }
        if (cc.js.isString(msg) && msg.length != 0) {
            return true;
        }
        return false;
    };
    $StringUtil.isInt = function (msg) {
        if (msg && msg.length != 0) {
            if (!isNaN(parseInt(msg))) {
                return true;
            }
        }
        return false;
    };
    $StringUtil.isNumber = function (msg) {
        if (msg && msg.length != 0) {
            if (!isNaN(parseFloat(msg))) {
                return true;
            }
        }
        return false;
    };
    /**
     * @description: 字符串裁切
     * @param {string} msg
     * @param {string} key 裁切字符
     */
    $StringUtil.split = function (msg, key) {
        if (this.isValid(msg)) {
            return msg.split(key);
        }
        return [msg];
    };
    /**
     * @description:获取链接参数
     * @param {string} url 需解析链接
     */
    $StringUtil.getRequest = function (url) {
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
    /**
     * 将对象拆解成后缀形式
     * @param params
     */
    $StringUtil.getQuery = function (params) {
        var tmps = [];
        var key;
        for (key in params) {
            tmps.push(key + "=" + params[key]);
        }
        return tmps.join("&");
    };
    /**
     * 格式化字符串
     * @param str
     * @param val
     */
    $StringUtil.Format = function (str) {
        var val = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            val[_i - 1] = arguments[_i];
        }
        for (var index = 0; index < val.length; index++) {
            str = str.replace("{" + index + "}", val[index]);
        }
        return str;
    };
    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    $StringUtil.trimSpace = function (str) {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    };
    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    $StringUtil.getStringLength = function (str) {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            }
            else {
                length += 1;
            }
        }
        return length;
    };
    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    $StringUtil.isChinese = function (str) {
        var reg = /^.*[\u4E00-\u9FA5]+.*$/;
        return reg.test(str);
    };
    $StringUtil.createCharRepaet = function (char, repeat) {
        var i = 0;
        var msg = "";
        for (i = 0; i < repeat; i++) {
            msg += char;
        }
        return msg;
    };
    /**
     * 数值格式化 万为单位
     * @param num 数值
     */
    $StringUtil.formatNumber = function (num) {
        if (num == undefined)
            return '';
        num = Number(num);
        if (num == 0) {
            return num + '';
        }
        else if (num >= 1 && num < 10000) {
            return num + '';
        }
        else {
            return (num / 10000).toFixed(2) + '万';
        }
    };
    /**
     * 通过oss获取特定大小的图片
     * @param url 图片地址
     * @param width  宽
     * @param height 高
     */
    $StringUtil.generateResizeUrl = function (url, width, height) {
        url = url.replace("http://", "https://");
        var prefix = "?x-oss-process=image/resize,m_lfit,h_" + height + ",w_" + width + ",limit_0/auto-orient,0";
        return url + prefix;
    };
    $StringUtil.array2string = function (chars, key) {
        if (key === void 0) { key = ""; }
        var i;
        var word = "";
        var len = chars.length;
        for (i = 0; i < len; i++) {
            if (i == 0) {
                word = chars[i];
            }
            else {
                word += key + chars[i];
            }
        }
        return word;
    };
    return $StringUtil;
}());

var $DragonUtil = /** @class */ (function () {
    function $DragonUtil() {
    }
    $DragonUtil.isValid = function (display) {
        if (display instanceof Array) {
            var i = void 0;
            var d = void 0;
            var len = display.length;
            for (i = 0; i < len; i++) {
                d = display[i];
                if (!cc.isValid(d) || !this.isValidAsset(d.dragonAsset, d.dragonAtlasAsset)) {
                    return false;
                }
            }
            return true;
        }
        else {
            if (!cc.isValid(display)) {
                return false;
            }
        }
        return this.isValidAsset(display.dragonAsset, display.dragonAtlasAsset);
    };
    // public static isValid(display: dragonBones.ArmatureDisplay): boolean {
    //     if (!display) {
    //         return false;
    //     }
    //     if (!display.isValid) {
    //         return false;
    //     }
    //     return this.isValidAsset(display.dragonAsset, display.dragonAtlasAsset);
    // }
    $DragonUtil.isValidAsset = function (asset, atlas) {
        if (!asset) {
            return false;
        }
        if (!atlas) {
            return false;
        }
        if (!asset.isValid) {
            return false;
        }
        if (!atlas.isValid) {
            return false;
        }
        var tex = atlas.texture;
        if (!tex) {
            return false;
        }
        if (!tex.isValid) {
            return false;
        }
        return true;
    };
    $DragonUtil.createDragon = function (dragon, node, name) {
        var node = cc.isValid(node) ? node : new cc.Node();
        name && (node.name = name);
        var d;
        d = node.getComponent(dragonBones.ArmatureDisplay);
        if (d) {
            $DragonUtil.destroyDragon(d);
        }
        else {
            d = node.addComponent(dragonBones.ArmatureDisplay);
        }
        $DragonUtil.install(d, dragon);
        return d;
    };
    $DragonUtil.destroyDragon = function (display) {
        if (display) {
            display.dragonAsset = null;
            display.armatureName = null;
            display.animationName = null;
            display.dragonAtlasAsset = null;
        }
    };
    $DragonUtil.install = function (display, dragon) {
        if (display && display.isValid) {
            this.destroyDragon(display);
            if (dragon && dragon.isValid) {
                var dNode = display.node;
                display.dragonAsset = dragon.asset;
                display.dragonAtlasAsset = dragon.atlas;
                display.premultipliedAlpha = true;
                if (cc.sys.isNative && dragon.asset.dragonBonesJson) {
                    var armature = JSON.parse(dragon.asset.dragonBonesJson).armature[0];
                    if (armature) {
                        var aabb = armature.aabb;
                        dNode && aabb && dNode.setContentSize(aabb.width, aabb.height);
                    }
                }
                var animation = JSON.parse(dragon.asset.dragonBonesJson);
                if (animation && animation.armature && animation.armature.length) {
                    display.armatureName = animation.armature[0].name;
                }
            }
        }
    };
    $DragonUtil.play = function (display, animationName, playTime) {
        if (display == null || !display.isValid) {
            _gWarn("播放对象非法!");
            return null;
        }
        if (display["_cacheMode"] != dragonBones.ArmatureDisplay.AnimationCacheMode.REALTIME) {
            _gWarn("当前非法display：" + display.node.name);
        }
        if (display.dragonAsset == null || !display.dragonAsset.isValid) {
            _gWarn("当前非法dragonAsset：" + display.node.name);
            return;
        }
        if (display.dragonAtlasAsset == null || !display.dragonAtlasAsset.isValid) {
            _gWarn("当前非法dragonAtlasAsset：" + display.node.name);
            return;
        }
        var asset = display.dragonAsset;
        var animation = JSON.parse(asset.dragonBonesJson);
        playTime = playTime ? playTime : 0;
        if (animation && animation.armature && animation.armature.length) {
            if (!$StringUtil.isValid(display.armatureName)) {
                display.armatureName = animation.armature[0].name;
            }
            if (animationName == null || animationName == "") {
                var anis = animation.armature[0].animation;
                animationName = anis[0];
                if (!$StringUtil.isValid(animationName)) {
                    animationName = animationName["name"];
                }
            }
            if ($StringUtil.isValid(animationName)) {
                return display.playAnimation(animationName, playTime);
            }
            else {
                _gLog("动画播放名非法:", animationName);
            }
        }
        return null;
    };
    return $DragonUtil;
}());

var $Utils = /** @class */ (function () {
    function $Utils() {
    }
    $Utils.start = function (fun, target, params) {
        if (fun) {
            if (target) {
                if (target instanceof cc.Component || target instanceof cc.Node) {
                    if (target.isValid) {
                        // params = (params instanceof Array) ? params : [params];
                        // fun.apply(target, params);
                        fun.call(target, params);
                    }
                }
                else {
                    // params = (params instanceof Array) ? params : [params];
                    // fun.apply(target, params);
                    fun.call(target, params);
                }
            }
            else {
                fun.call(target, params);
            }
        }
    };
    $Utils.throwError = function () {
        throw _gLog("FunUtil Error!");
    };
    $Utils.JsonDeepCopy = function (param) {
        if (param == null || param == undefined)
            param = {};
        if (typeof (param) == "string") {
            return param;
        }
        return JSON.parse(JSON.stringify(param));
    };
    return $Utils;
}());

var $GraphUtil = /** @class */ (function () {
    function $GraphUtil() {
    }
    /**
     * 创建空节点
     */
    $GraphUtil.createEmpty = function () {
        return new cc.Vec2(0, 0);
    };
    $GraphUtil.colliderNoOffect = function (polygon) {
        polygon.world.points.forEach(function (value, index, array) {
            value.add(polygon.offset);
        });
        polygon.offset = new cc.Vec2(0, 0);
    };
    //碰撞
    $GraphUtil.hitTest = function (pos, col) {
        if (col == null || pos == null) {
            return false;
        }
        var cameraOff = cc.Camera.main.node.getPosition();
        pos = pos.add(cameraOff);
        pos = col.node.convertToNodeSpaceAR(pos);
        if (col instanceof cc.PolygonCollider) {
            pos = pos.sub(col.offset);
            return cc.Intersection.pointInPolygon(pos, col.points);
        }
        else if (col instanceof cc.CircleCollider) {
            pos = pos.sub(col.offset);
            if (pos.x * pos.x + pos.y * pos.y < col.radius * col.radius) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (col instanceof cc.BoxCollider) {
            pos = pos.sub(col.offset);
            // convertWorldSpaceAR
            // return cc.Intersection.pointInPolygon(pos, col.points);
            pos.x += col.size.width / 2;
            pos.y += col.size.height / 2;
            if (pos.x > 0 && pos.x < col.size.width && pos.y > 0 && pos.y < col.size.height) {
                return true;
            }
            return false;
        }
    };
    $GraphUtil.squareDis = function (x1, y1, x2, y2) {
        var tx = x1 - x2;
        var ty = y1 - y2;
        return tx * tx + ty * ty;
    };
    $GraphUtil.getAngle = function (x1, y1, x2, y2) {
        var begin = cc.v2(x1, y1);
        var end = cc.v2(x2, y2);
        var dir = end.sub(begin);
        if (dir.x == 0 && dir.y == 0) {
            return 360;
        }
        var angle = dir.signAngle(cc.v2(0, 1));
        var degree = angle / Math.PI * 180;
        return degree;
    };
    //点击坐标转换成为居中坐标
    $GraphUtil.convertTouchCenter = function (evt) {
        var node = evt.target;
        var pos = node.convertToWorldSpaceAR(evt.getLocation());
        pos.sub(new cc.Vec2(cc.view.getVisibleSize().width, cc.view.getVisibleSize().height), pos);
        return pos;
    };
    //矩形四角
    //当前移动的目标点
    $GraphUtil.angleLib = [
        [Math.sin(0 * Math.PI / 180), Math.cos(0 * Math.PI / 180)],
        [Math.sin(45 * Math.PI / 180), Math.cos(45 * Math.PI / 180)],
        [Math.sin(90 * Math.PI / 180), Math.cos(90 * Math.PI / 180)],
        [Math.sin(135 * Math.PI / 180), Math.cos(135 * Math.PI / 180)],
        [Math.sin(180 * Math.PI / 180), Math.cos(180 * Math.PI / 180)],
        [Math.sin(225 * Math.PI / 180), Math.cos(225 * Math.PI / 180)],
        [Math.sin(270 * Math.PI / 180), Math.cos(270 * Math.PI / 180)],
        [Math.sin(315 * Math.PI / 180), Math.cos(315 * Math.PI / 180)],
    ];
    return $GraphUtil;
}());

var $NodeUtil = /** @class */ (function () {
    function $NodeUtil() {
    }
    $NodeUtil.isValid = function (node) {
        if (node instanceof Array) {
            var i = void 0;
            var len = node.length;
            for (i = 0; i < len; i++) {
                if (!cc.isValid(node[i])) {
                    return false;
                }
            }
            return true;
        }
        return cc.isValid(node);
    };
    // if (!node) {
    //     return false;
    // }
    // if (!node.isValid) {
    //     return false;
    // }
    // return true;
    $NodeUtil.isValidComponent = function (com) {
        return cc.isValid(com);
    };
    $NodeUtil.createNode = function (name, parent) {
        var node = new cc.Node();
        node.name = name;
        if (this.isValid(parent)) {
            node.setParent(parent);
        }
        return node;
    };
    $NodeUtil.createNodeByPre = function (pre, parent, name) {
        if (name && this.isValid(parent)) {
            if (parent.getChildByName(name)) {
                _gLog("当前节点:" + parent.name, "已有对象:" + pre.name);
            }
        }
        var node = cc.instantiate(pre);
        if (this.isValid(parent)) {
            node.setParent(parent);
        }
        if ($StringUtil.isValid(name)) {
            node.name = name;
        }
        return node;
    };
    $NodeUtil.createComponent = function (className, node, name) {
        var node = this.isValid(node) ? node : new cc.Node();
        if ($StringUtil.isValid(name)) {
            node.name = name;
        }
        var c = node.getComponent(className);
        if (!c) {
            c = node.addComponent(className);
        }
        return c;
    };
    $NodeUtil.createSprite = function (tex, node, name) {
        var node = this.isValid(node) ? node : new cc.Node();
        name && (node.name = name);
        var s;
        s = node.getComponent(cc.Sprite);
        if (!s) {
            s = node.addComponent(cc.Sprite);
        }
        s.spriteFrame = new cc.SpriteFrame(tex);
        return s;
    };
    $NodeUtil.createDragon = function (dragon, node, name) {
        return $DragonUtil.createDragon(dragon, node, name);
    };
    /**
    * 获取节点在目标节点（容器）下的相对位置
    * @param node 节点
    * @param target 目标节点（容器）
    */
    $NodeUtil.getRelativePosition = function (node, target) {
        if (!this.isValid(node)) {
            return new cc.Vec2();
        }
        var worldPos = node.getParent().convertToWorldSpaceAR(node.getPosition());
        var targetPos = target.convertToNodeSpaceAR(worldPos);
        return targetPos;
    };
    /**
     * @description: 通过name获取节点
     * @param {string} name
     * @param {cc} node
     */
    $NodeUtil.getChildByName = function (name, node) {
        if (!this.isValid(node)) {
            return null;
        }
        var child = node.getChildByName(name);
        if (child == null) {
            child = new cc.Node(name);
            node.addChild(child);
        }
        return child;
    };
    $NodeUtil.hasChildByName = function (name, node) {
        if (!this.isValid(node)) {
            return null;
        }
        var child = node.getChildByName(name);
        if (child == null || !child.isValid) {
            return null;
        }
        return child;
    };
    /**
     * @description: 限制节点大小
     */
    $NodeUtil.restrictRect = function (node, maxWidth, maxHeight) {
        var screenRatio = node.height / node.width;
        var designRatio = maxHeight / maxWidth;
        if (screenRatio >= designRatio) {
            var scale = maxHeight / node.height;
            node.scale = scale;
        }
        else {
            var scale = maxWidth / node.width;
            node.scale = scale;
        }
    };
    /**
     * @description: 设置节点颜色值
     * @param {cc} node
     * @param {cc} color
     */
    $NodeUtil.setNodeColor = function (node, color) {
        if (!this.isValid(node)) {
            return;
        }
        if (!node.color.equals(color)) {
            node.color = color;
        }
    };
    $NodeUtil.setParent = function (node, parent) {
        if ($NodeUtil.isValid(node) && $NodeUtil.isValid(parent)) {
            node.setParent(parent);
        }
    };
    $NodeUtil.getStagePoint = function (node, pos) {
        return node.convertToWorldSpaceAR(pos);
    };
    /**
     *
     * @param pos 必须是世界坐标体系下的坐标
     * @param node
     */
    $NodeUtil.hitTest = function (pos, node) {
        var colliders = node.getComponents(cc.Collider);
        for (var index = 0; index < colliders.length; index++) {
            var col = colliders[index];
            if (col) {
                return $GraphUtil.hitTest(pos, col);
            }
        }
        return node["_hitTest"](pos);
    };
    return $NodeUtil;
}());

var $NumUtil = /** @class */ (function () {
    function $NumUtil() {
    }
    $NumUtil.getValid = function (num) {
        if (isNaN(num)) {
            return 0;
        }
        return num;
    };
    return $NumUtil;
}());

var $SpriteUtil = /** @class */ (function () {
    function $SpriteUtil() {
    }
    $SpriteUtil.isValid = function (tex) {
        if (tex instanceof Array) {
            var i = void 0;
            var len = tex.length;
            for (i = 0; i < len; i++) {
                if (!cc.isValid(tex[i])) {
                    return false;
                }
            }
            return true;
        }
        return cc.isValid(tex);
    };
    $SpriteUtil.createNodeFrame = function (tex, node) {
        node = node ? node : new cc.Node();
        var frame = tex instanceof cc.SpriteFrame ? tex : new cc.SpriteFrame(tex);
        var sprite = node.getComponent(cc.Sprite);
        if (sprite == null) {
            sprite = node.addComponent(cc.Sprite);
        }
        sprite.srcBlendFactor = cc.macro.BlendFactor.ONE;
        sprite.spriteFrame = frame;
        return node;
    };
    $SpriteUtil.createSprite = function (name, parent, tex, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var node = $NodeUtil.getChildByName(name, parent);
        if (node == null) {
            node = new cc.Node();
            node.name = name;
            parent && node.setParent(parent);
        }
        var sprite = node.getComponent(cc.Sprite);
        if (sprite == null) {
            sprite = node.addComponent(cc.Sprite);
            sprite.srcBlendFactor = cc.macro.BlendFactor.ONE;
        }
        var frame = tex instanceof cc.SpriteFrame ? tex : new cc.SpriteFrame(tex);
        sprite.spriteFrame = frame;
        node.setPosition(x, y);
        return sprite;
    };
    $SpriteUtil.createOneNode = function (name, parent, tex, index, x, y) {
        if (index === void 0) { index = -1; }
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var node = new cc.Node();
        parent.addChild(node);
        var sprite = node.getComponent(cc.Sprite);
        if (sprite == null) {
            sprite = node.addComponent(cc.Sprite);
            sprite.srcBlendFactor = cc.macro.BlendFactor.ONE;
        }
        var frame = tex instanceof cc.SpriteFrame ? tex : new cc.SpriteFrame(tex);
        sprite.spriteFrame = frame;
        node.setPosition(x, y);
        node.zIndex = index;
        return sprite;
    };
    return $SpriteUtil;
}());

var $TextureUtil = /** @class */ (function () {
    function $TextureUtil() {
    }
    $TextureUtil.isValid = function (tex) {
        if (tex instanceof Array) {
            var i = void 0;
            var len = tex.length;
            for (i = 0; i < len; i++) {
                if (!cc.isValid(tex[i])) {
                    return false;
                }
            }
            return true;
        }
        return cc.isValid(tex);
    };
    $TextureUtil.format = function (tex) {
        if (tex) {
            if (tex instanceof cc.Texture2D) {
                tex.setPremultiplyAlpha(true);
            }
            else if (tex instanceof dragonBones.ArmatureDisplay) {
                tex.premultipliedAlpha = true;
            }
            else if (tex instanceof cc.Sprite) {
                tex.srcBlendFactor = cc.macro.ONE;
            }
            else if (tex instanceof cc.Node) {
                this.format(tex.getComponent(cc.Sprite));
                this.format(tex.getComponent(dragonBones.ArmatureDisplay));
            }
            else if (tex instanceof Array) {
                tex.forEach(function (value, index, array) {
                    $TextureUtil.format(value);
                });
            }
        }
    };
    return $TextureUtil;
}());

var $DragonAsset = /** @class */ (function (_super) {
    __extends($DragonAsset, _super);
    function $DragonAsset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    $DragonAsset.prototype.destroy = function () {
        this.asset.destroy();
        this.atlas.destroy();
        this.asset = null;
        this.atlas = null;
        return _super.prototype.destroy.call(this);
    };
    // public addRef(): cc.Asset {
    //     this.asset.addRef();
    //     this.atlas.addRef();
    //     return this;
    // }
    // public decRef(): cc.Asset {
    //     this.asset.decRef();
    //     this.atlas.decRef();
    //     return this;
    // }
    $DragonAsset.prototype.init = function (asset, atlas) {
        if (!$DragonUtil.isValidAsset(asset, atlas)) {
            _gLog("资源不存在或已被销毁，无法使用!");
            return false;
        }
        this.asset = asset;
        this.atlas = atlas;
        this.loaded = true;
        return true;
    };
    $DragonAsset.prototype.initRemoteAsset = function (assetAsset, atlasAsset, tex) {
        if (!cc.isValid(tex)) {
            return false;
        }
        var asset = new dragonBones.DragonBonesAsset();
        asset["_uuid"] = assetAsset["_uuid"];
        if (assetAsset instanceof cc.TextAsset) {
            asset.dragonBonesJson = assetAsset.text;
        }
        else {
            asset.dragonBonesJson = JSON.stringify(assetAsset.json);
        }
        var atlas = new dragonBones.DragonBonesAtlasAsset();
        tex && tex.width && tex.height && tex.setPremultiplyAlpha(true);
        atlas["_uuid"] = atlasAsset["_uuid"];
        if (atlasAsset instanceof cc.TextAsset) {
            atlas.atlasJson = atlasAsset.text;
        }
        else {
            atlas.atlasJson = JSON.stringify(atlasAsset.json);
        }
        atlas.texture = tex;
        this.loaded = true;
        return this.init(asset, atlas);
    };
    $DragonAsset.prototype.initByAsset = function (assets) {
        var i;
        var ast;
        var tex;
        var asset;
        var atlas;
        var len = assets.length;
        for (i = 0; i < len; i++) {
            ast = assets[i];
            if (ast instanceof dragonBones.DragonBonesAsset) {
                asset = ast;
            }
            else if (ast instanceof dragonBones.DragonBonesAtlasAsset) {
                atlas = ast;
            }
            else if (ast instanceof cc.Texture2D) {
                ast && ast.width && ast.height && ast.setPremultiplyAlpha(true);
                tex = ast;
            }
            else if (ast instanceof cc.JsonAsset) {
                if (ast.nativeUrl.indexOf("ske") != -1) {
                    asset = new dragonBones.DragonBonesAsset();
                    asset.dragonBonesJson = ast.json;
                }
                else if (ast.nativeUrl.indexOf("tex") != -1) {
                    atlas = new dragonBones.DragonBonesAtlasAsset();
                    atlas.atlasJson = ast.json;
                }
            }
        }
        if (!cc.isValid(tex)) {
            return false;
        }
        if (atlas) {
            if (atlas.texture == null || !atlas.texture.isValid) {
                atlas.texture = tex;
            }
            else {
                if (!atlas.texture.isValid) {
                    atlas.isValid = true;
                    atlas.texture = tex;
                }
            }
        }
        return this.init(asset, atlas);
    };
    return $DragonAsset;
}(cc.Asset));

var $DragonAssetUrl = /** @class */ (function () {
    function $DragonAssetUrl(atlasImg, assetJson, atlasJson, action) {
        this.atlasImg = atlasImg;
        this.assetJson = assetJson;
        this.atlasJson = atlasJson;
        this.action = action;
    }
    return $DragonAssetUrl;
}());

var $RecordUtil = /** @class */ (function () {
    function $RecordUtil() {
    }
    $RecordUtil.isValid = function (record) {
        if (record instanceof Array) {
            var i = void 0;
            var len = record.length;
            for (i = 0; i < len; i++) {
                if (this.getLength(record[i]) == 0) {
                    return false;
                }
            }
            return true;
        }
        else {
            return this.getLength(record) != 0;
        }
    };
    $RecordUtil.getLength = function (record) {
        if (record) {
            var count = 0;
            for (var key in record) {
                if (Object.prototype.hasOwnProperty.call(record, key)) {
                    count++;
                }
            }
            return count;
        }
        return 0;
    };
    return $RecordUtil;
}());

/**
 * 数学计算工具类
 */
var $MathUtils = /** @class */ (function () {
    function $MathUtils() {
    }
    /**
     * 弧度制转换为角度值
     * @param radian 弧度制
     * @returns {number}
     */
    $MathUtils.getAngle = function (radian) {
        return 180 * radian / Math.PI;
    };
    /**
     * 角度值转换为弧度制
     * @param angle
     */
    $MathUtils.getRadian = function (angle) {
        return angle / 180 * Math.PI;
    };
    /**
     * 获取两点间弧度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    $MathUtils.getRadian2 = function (p1X, p1Y, p2X, p2Y) {
        var xdis = p2X - p1X;
        var ydis = p2Y - p1Y;
        return Math.atan2(ydis, xdis);
    };
    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    $MathUtils.getDistance = function (p1X, p1Y, p2X, p2Y) {
        var disX = p2X - p1X;
        var disY = p2Y - p1Y;
        var disQ = disX * disX + disY * disY;
        return Math.sqrt(disQ);
    };
    /**
     * 获取区间随机数
     * @param min 最小值
     * @param max 最大值
     * @returns {number} 随机数
     */
    $MathUtils.get_random_interval = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
    return $MathUtils;
}());

/**
 * 对象存储器,可根据字符名称和对象作为标签名来存储的数据.
 * 建议"get"一次后缓存好数据不要频繁使用"get对象key","字符key"不影响
 * 支持用对象作为key存储数据.
 */
var $DictRecord = /** @class */ (function () {
    function $DictRecord() {
        /** 字典计数器 */
        this._count = 0;
        this._maps = {};
        this._hashMaps = {};
        this._objKeys = [];
        this._objDatum = [];
    }
    /**
     * 添加指定类型的数据
     * @param key 可以是对象、字符、数字
     * @param data 任何类型
     */
    $DictRecord.prototype.add = function (key, data) {
        if (typeof (key) != "object") {
            if (!this._maps[key]) {
                this._count++;
            }
            this._maps[key] = data;
        }
        else {
            var index = this._objKeys.lastIndexOf(key);
            if (index == -1) {
                this._objKeys.push(key);
                this._objDatum.push(data);
                this._count++;
            }
            else {
                this._objDatum[index] = data;
            }
        }
    };
    /**
     * 删除指定类型的全部数据
     * @param key  可以是对象、字符、数字
     */
    $DictRecord.prototype.del = function (key) {
        var index;
        if (typeof (key) != "object") {
            if (this._maps[key]) {
                delete this._maps[key];
                this._count--;
            }
        }
        else {
            index = this._objKeys.lastIndexOf(key);
            if (index != -1) {
                this._objKeys.splice(index, 1);
                this._objDatum.splice(index, 1);
                this._count--;
            }
        }
    };
    /**
     * 获取存储中的数据,对象作为key实际上需要进行遍历索引，所以在同一个字典中尽量不要添加过多的key会影响性能,
     * 建议get一次后缓存好数据不要频繁使用get对象key,字符key不影响
     * @param key 可以是对象、字符、数字
     * @return
     */
    $DictRecord.prototype.get = function (key) {
        if (typeof (key) != "object") {
            if (!this._maps[key]) {
                return null;
            }
            return this._maps[key];
        }
        else {
            var index = this._objKeys.lastIndexOf(key);
            if (index != -1) {
                return this._objDatum[index];
            }
            return null;
        }
    };
    /**
     * 检查是否有该类型的数据存在
     * @param key 可以是对象、字符、数字
     * @return
     */
    $DictRecord.prototype.has = function (key) {
        if (typeof (key) != "object") {
            return this._maps[key] ? true : false;
        }
        else {
            var index = this._objKeys.lastIndexOf(key);
            if (index != -1) {
                return true;
            }
            return false;
        }
    };
    Object.defineProperty($DictRecord.prototype, "count", {
        /**
         * 获取字典中储存数据的个数
         */
        get: function () {
            return this._count;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 对字典中的每一项执行函数，用该函数可以省去for循环，
     * 允许回调函数中删除当前正在执行的key，
     * 但是删除字典中的其他key可能会出现少遍历或重复遍历的情况.
     */
    $DictRecord.prototype.forEach = function (callback, thisObject) {
        if (thisObject === void 0) { thisObject = null; }
        var name, arr;
        for (name in this._maps) {
            callback.call(thisObject, name, this._maps[name]);
        }
        for (name in this._hashMaps) {
            arr = this._hashMaps[name];
            callback.call(thisObject, arr[0], arr[1]);
        }
        for (var j = 0; j < this._objKeys.length; j++) {
            var key = this._objKeys[j];
            callback.call(thisObject, this._objKeys[j], this._objDatum[j]);
            if (key != this._objKeys[j]) {
                j--;
            }
        }
    };
    Object.defineProperty($DictRecord.prototype, "elements", {
        /**
         * 获取字典中储存key和data的队列
         */
        get: function () {
            var _list = [];
            var name, arr;
            for (name in this._maps) {
                _list.push({ key: name, data: this._maps[name] });
            }
            for (name in this._hashMaps) {
                arr = this._hashMaps[name];
                _list.push({ key: arr[0], data: arr[1] });
            }
            var len = this._objKeys.length;
            for (var j = 0; j < len; j++) {
                _list.push({ key: this._objKeys[j], data: this._objDatum[j] });
            }
            return _list;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($DictRecord.prototype, "keys", {
        /**
         * 获取字典中储存key队列
         */
        get: function () {
            var _list = [];
            var name;
            for (name in this._maps) {
                _list.push(name);
            }
            for (name in this._hashMaps) {
                _list.push(this._hashMaps[name][0]);
            }
            _list = _list.concat(this._objKeys);
            return _list;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($DictRecord.prototype, "datas", {
        /**
         * 获取字典中储存data的队列
         */
        get: function () {
            var _list = [];
            var name;
            for (name in this._maps) {
                _list.push(this._maps[name]);
            }
            for (name in this._hashMaps) {
                _list.push(this._hashMaps[name][1]);
            }
            _list = _list.concat(this._objDatum);
            return _list;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 清空字典中的所有数据
     */
    $DictRecord.prototype.clear = function () {
        this._maps = {};
        this._hashMaps = {};
        this._objKeys.length = 0;
        this._objDatum.length = 0;
        this._count = 0;
    };
    /**
     * 打印字典中的所有数据
     */
    $DictRecord.prototype.dump = function () {
        var name, arr;
        for (name in this._maps) {
            console.log("key:", name, "---> data:", this._maps[name]);
        }
        for (name in this._hashMaps) {
            arr = this._hashMaps[name];
            console.log("key:", arr[0], "---> data:", arr[1]);
        }
        var len = this._objKeys.length;
        for (var j = 0; j < len; j++) {
            console.log("key:", typeof (this._objKeys[j]), " ---> data:", this._objDatum[j]);
        }
    };
    return $DictRecord;
}());

/**
* 测试模块，用来测试调优
*/
var GTestInfo = new /** @class */ (function () {
    function class_1() {
        /**调试信息总节点 */
        this._debugInfo = null;
    }
    class_1.prototype.cacheInfo = function () {
        var e_1, _a, e_2, _b;
        var rawCacheData = cc.assetManager.assets["_map"];
        //统计各类型资源极其数量
        var typeAndNum = {};
        var allPngSize = 0;
        var pngCount = 0;
        try {
            for (var _c = __values(Object.keys(rawCacheData)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var key = _d.value;
                var value = rawCacheData[key];
                var __classname__ = value.__classname__;
                if (typeAndNum[__classname__]) {
                    typeAndNum[__classname__]++;
                }
                else {
                    typeAndNum[__classname__] = 1;
                }
                //如果是 cc.Texture2D 图片资源，就计算其大小
                if (__classname__ == "cc.Texture2D") {
                    var textureSize = value.width * value.height * ((value._native == ".jpg" ? 3 : 4) / 1024 / 1024);
                    allPngSize += textureSize;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            for (var _e = __values(Object.keys(typeAndNum)), _f = _e.next(); !_f.done; _f = _e.next()) {
                var key = _f.value;
                var value = typeAndNum[key];
                // gError(`${key}数量：${value}`);
                if (key == "cc.Texture2D") {
                    pngCount = value;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
        // gError(`所有资源信息: `, typeAndNum);
        // gError("资源总数", Object.keys(rawCacheData).length);
        // gError(`图片数量: ${pngCount}`);
        // gError(`图片总大小: ${allPngSize.toFixed(2)}M`);
        var assetsNum = Object.keys(rawCacheData).length;
        var pngNum = pngCount;
        var pngSize = allPngSize.toFixed(2) + "M";
        return { assetsNum: assetsNum, pngNum: pngNum, pngSize: pngSize };
    };
    /**计算某个节点的子节点个数，默认为计算当前场景节点个数，
     * 如果子节点数一直增加，说明可能有未销毁的节点，有内存泄露的风险 */
    class_1.prototype.countChildNodeNum = function (parent) {
        if (parent === void 0) { parent = cc.director.getScene(); }
        var num = 0;
        for (var i = 0; i < parent.childrenCount; i++) {
            var node = parent.children[i];
            num++;
            if (node.childrenCount > 0) {
                num += this.countChildNodeNum(node);
            }
        }
        if (parent instanceof cc.Scene) ;
        // _gError(`${typeName}${parent.name}的子节点个数:`, num);
        return num;
    };
    /**显示调试信息，调试信息节点为常驻节点 */
    class_1.prototype.showDebugInfo = function () {
        var _this = this;
        if (!this._debugInfo) {
            //生成调试信息节点, 显示各种调试信息
            this._debugInfo = new cc.Node();
            this._debugInfo.parent = cc.director.getScene();
            this._debugInfo.zIndex = 9999;
            cc.game.addPersistRootNode(this._debugInfo);
            //显示在右上角
            this._debugInfo.position = cc.v3(cc.winSize.width - 200, 100);
            //内存和节点数信息节点
            var cacheAndNodeNumInfo = new cc.Node();
            cacheAndNodeNumInfo.color = cc.Color.BLUE;
            cacheAndNodeNumInfo.parent = this._debugInfo;
            cacheAndNodeNumInfo.width = 200;
            cacheAndNodeNumInfo.height = 200;
            var cacheAndNodeNumLabel_1 = cacheAndNodeNumInfo.addComponent(cc.Label);
            cacheAndNodeNumLabel_1.fontSize = 20;
            //1秒刷新一次信息
            setInterval(function () {
                var info = _this.cacheInfo();
                var nodeNum = _this.countChildNodeNum();
                cacheAndNodeNumLabel_1.string =
                    "\u8D44\u6E90\u603B\u6570\uFF1A" + info.assetsNum + "\n\u56FE\u7247\u6570\u91CF\uFF1A" + info.pngNum + "\n\u56FE\u7247\u5927\u5C0F\uFF1A" + info.pngSize + "\n\u8282\u70B9\u603B\u6570\uFF1A" + nodeNum;
            }, 1000);
        }
        this._debugInfo.active = true;
    };
    /**隐藏调试信息 */
    class_1.prototype.hideDebugInfo = function () {
        if (this._debugInfo && cc.isValid(this._debugInfo)) {
            this._debugInfo.active = false;
        }
    };
    return class_1;
}())();
window["GTestInfo"] = GTestInfo;

// export * from "./ArrayUtil";
// export * from './utils/ArrayUtil';
var TSlog = _TsLog.getInstance();
var ArrayUtil = /** @class */ (function (_super) {
    __extends(ArrayUtil, _super);
    function ArrayUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ArrayUtil;
}(_ArrayUtil));
var DateUtil = /** @class */ (function (_super) {
    __extends(DateUtil, _super);
    function DateUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DateUtil;
}($DateUtil));
var DateUtilType = $DateUtilType;
var DragonUtil = /** @class */ (function (_super) {
    __extends(DragonUtil, _super);
    function DragonUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DragonUtil;
}($DragonUtil));
var Utils = /** @class */ (function (_super) {
    __extends(Utils, _super);
    function Utils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Utils;
}($Utils));
var GraphUtil = /** @class */ (function (_super) {
    __extends(GraphUtil, _super);
    function GraphUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GraphUtil;
}($GraphUtil));
var NodeUtil = /** @class */ (function (_super) {
    __extends(NodeUtil, _super);
    function NodeUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NodeUtil;
}($NodeUtil));
var NumUtil = /** @class */ (function (_super) {
    __extends(NumUtil, _super);
    function NumUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NumUtil;
}($NumUtil));
var SpriteUtil = /** @class */ (function (_super) {
    __extends(SpriteUtil, _super);
    function SpriteUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SpriteUtil;
}($SpriteUtil));
var StringUtil = /** @class */ (function (_super) {
    __extends(StringUtil, _super);
    function StringUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StringUtil;
}($StringUtil));
var TextureUtil = /** @class */ (function (_super) {
    __extends(TextureUtil, _super);
    function TextureUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TextureUtil;
}($TextureUtil));
var DragonAsset = /** @class */ (function (_super) {
    __extends(DragonAsset, _super);
    function DragonAsset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DragonAsset;
}($DragonAsset));
var DragonAssetUrl = /** @class */ (function (_super) {
    __extends(DragonAssetUrl, _super);
    function DragonAssetUrl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DragonAssetUrl;
}($DragonAssetUrl));
var RecordUtil = /** @class */ (function (_super) {
    __extends(RecordUtil, _super);
    function RecordUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RecordUtil;
}($RecordUtil));
var MathUtils = /** @class */ (function (_super) {
    __extends(MathUtils, _super);
    function MathUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MathUtils;
}($MathUtils));
var DictRecord = /** @class */ (function (_super) {
    __extends(DictRecord, _super);
    function DictRecord() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DictRecord;
}($DictRecord));
/**
 * 日志部分
 */
/**
 * 普通日志输出
 * @param args 参数
 */
var gLog = _gLog;
var gWarn = _gWarn;
var gError = _gError;
var gDownLoadLog = _gDownLoadLog;
var gClearLog = _gClearLog;
var $ = _$;

exports.$ = $;
exports.ArrayUtil = ArrayUtil;
exports.DateUtil = DateUtil;
exports.DateUtilType = DateUtilType;
exports.DictRecord = DictRecord;
exports.DragonAsset = DragonAsset;
exports.DragonAssetUrl = DragonAssetUrl;
exports.DragonUtil = DragonUtil;
exports.GTestInfo = GTestInfo;
exports.GraphUtil = GraphUtil;
exports.MathUtils = MathUtils;
exports.NodeUtil = NodeUtil;
exports.NumUtil = NumUtil;
exports.RecordUtil = RecordUtil;
exports.SpriteUtil = SpriteUtil;
exports.StringUtil = StringUtil;
exports.TSlog = TSlog;
exports.TextureUtil = TextureUtil;
exports.Utils = Utils;
exports.gClearLog = gClearLog;
exports.gDownLoadLog = gDownLoadLog;
exports.gError = gError;
exports.gLog = gLog;
exports.gWarn = gWarn;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9sb2cvVHNMb2cudXRpbC50cyIsIi4uLy4uLy4uL3NyYy9sb2cvVHNMb2cudHMiLCIuLi8uLi8uLi9zcmMvbG9nL2dMb2cudHMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvQXJyYXlVdGlsLnRzIiwiLi4vLi4vLi4vc3JjL3V0aWxzL0RhdGVVdGlsLnRzIiwiLi4vLi4vLi4vc3JjL3V0aWxzL1N0cmluZ1V0aWwudHMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvRHJhZ29uVXRpbC50cyIsIi4uLy4uLy4uL3NyYy91dGlscy9VdGlscy50cyIsIi4uLy4uLy4uL3NyYy91dGlscy9HcmFwaFV0aWwudHMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvTm9kZVV0aWwudHMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvTnVtVXRpbC50cyIsIi4uLy4uLy4uL3NyYy91dGlscy9TcHJpdGVVdGlsLnRzIiwiLi4vLi4vLi4vc3JjL3V0aWxzL1RleHR1cmVVdGlsLnRzIiwiLi4vLi4vLi4vc3JjL2Fzc2V0cy9EcmFnb25Bc3NldC50cyIsIi4uLy4uLy4uL3NyYy9hc3NldHMvRHJhZ29uQXNzZXRVcmwudHMiLCIuLi8uLi8uLi9zcmMvdXRpbHMvUmVjb3JkVXRpbC50cyIsIi4uLy4uLy4uL3NyYy91dGlscy9NYXRoVXRpbC50cyIsIi4uLy4uLy4uL3NyYy91dGlscy9EaWN0UmVjb3JkLnRzIiwiLi4vLi4vLi4vc3JjL2xvZy9nVGVzdEluZm8udHMiLCIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlY2xhcmUgdHlwZSBhY3Rpb24gPSBcIklORk9cIiB8IFwiRVJST1JcIiB8IFwiV0FSTlwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBMb2dJdGVtIHtcclxuICAgIGxvZzogc3RyaW5nO1xyXG4gICAgZGF0ZTogbnVtYmVyO1xyXG4gICAgdHlwZTogYWN0aW9uO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZG93bmxvYWQoZmlsZW5hbWU6IHN0cmluZywgdGV4dDogc3RyaW5nKSB7XHJcbiAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXHJcbiAgICAgICAgXCJocmVmXCIsXHJcbiAgICAgICAgXCJkYXRhOnRleHQvcGxhaW47Y2hhcnNldD11dGYtOCxcIiArIGVuY29kZVVSSUNvbXBvbmVudCh0ZXh0KVxyXG4gICAgKTtcclxuICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZG93bmxvYWRcIiwgZmlsZW5hbWUpO1xyXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICBlbGVtZW50LnRhcmdldCA9IFwiX2JsYW5rXCI7XHJcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xyXG4gICAgZWxlbWVudC5jbGljaygpO1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRhdGVGb3JtYXQoZGF0ZTogbnVtYmVyLCBmbXQ6IHN0cmluZyA9IFwieXl5eS1NTS1kZCBoaDptbTpzc1wiKSB7XHJcbiAgICBsZXQgZm9ybWF0RGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgaWYgKC8oeSspLy50ZXN0KGZtdCkpIHtcclxuICAgICAgICBmbXQgPSBmbXQucmVwbGFjZShcclxuICAgICAgICAgICAgUmVnRXhwLiQxLFxyXG4gICAgICAgICAgICAoZm9ybWF0RGF0ZS5nZXRGdWxsWWVhcigpICsgXCJcIikuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBsZXQgbzogYW55ID0ge1xyXG4gICAgICAgIFwiTStcIjogZm9ybWF0RGF0ZS5nZXRNb250aCgpICsgMSxcclxuICAgICAgICBcImQrXCI6IGZvcm1hdERhdGUuZ2V0RGF0ZSgpLFxyXG4gICAgICAgIFwiaCtcIjogZm9ybWF0RGF0ZS5nZXRIb3VycygpLFxyXG4gICAgICAgIFwibStcIjogZm9ybWF0RGF0ZS5nZXRNaW51dGVzKCksXHJcbiAgICAgICAgXCJzK1wiOiBmb3JtYXREYXRlLmdldFNlY29uZHMoKSxcclxuICAgIH07XHJcbiAgICBmb3IgKGxldCBrIGluIG8pIHtcclxuICAgICAgICBpZiAobmV3IFJlZ0V4cChgKCR7a30pYCkudGVzdChmbXQpKSB7XHJcbiAgICAgICAgICAgIGxldCBzdHIgPSBvW2tdICsgXCJcIjtcclxuICAgICAgICAgICAgZm10ID0gZm10LnJlcGxhY2UoXHJcbiAgICAgICAgICAgICAgICBSZWdFeHAuJDEsXHJcbiAgICAgICAgICAgICAgICBSZWdFeHAuJDEubGVuZ3RoID09PSAxID8gc3RyIDogcGFkTGVmdFplcm8oc3RyKVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBmbXQ7XHJcbn1cclxuZnVuY3Rpb24gcGFkTGVmdFplcm8oc3RyOiBzdHJpbmcpIHtcclxuICAgIHJldHVybiAoXCIwMFwiICsgc3RyKS5zdWJzdHIoc3RyLmxlbmd0aCk7XHJcbn1cclxuIiwiXHJcbmltcG9ydCAqIGFzIHRzTG9nVXRpbCBmcm9tIFwiLi9Uc0xvZy51dGlsXCI7XHJcbmV4cG9ydCBjbGFzcyBfVHNMb2cgaW1wbGVtZW50cyB6bWcuSUxvZ1NlcnZpY2Uge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogX1RzTG9nO1xyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6IF9Uc0xvZyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfVHNMb2coKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHVzZXRzTG9nOiBib29sZWFuOyAvLyDkvb/nlKjlrZjlgqjlj4rkuIvovb3ml6Xlv5flip/og71cclxuICAgIGRvQ29uc29sZTogYm9vbGVhbjsgLy8g5Zyo5o6n5Yi25Y+w5omT5Y2w5pel5b+XXHJcbiAgICBpdGVtTmFtZTogc3RyaW5nOyAvLyDoh6rlrprkuYlsb2NhbFN0b3JhZ2XlrZjlgqhrZXnlgLxcclxuICAgIG1heExlbjogbnVtYmVyOyAvLyDml6Xlv5fmlbDph4/kuIrpmZBcclxuICAgIGxvZ05hbWU6IHN0cmluZzsgLy8g5pel5b+X5paH5Lu25ZCNXHJcbiAgICBsb2dMaXN0OiB0c0xvZ1V0aWwuTG9nSXRlbVtdOyAvLyDml6Xlv5fliJfooahcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihjb25maWc/OiB6bWcuSUxvZ1NlcnZpY2UpIHtcclxuICAgICAgICB0aGlzLmRvQ29uc29sZSA9IENDX0RFQlVHID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXNldHNMb2cgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXRlbU5hbWUgPSBcIkdMb2dcIjtcclxuICAgICAgICB0aGlzLm1heExlbiA9IDUwMDtcclxuICAgICAgICB0aGlzLmxvZ05hbWUgPSBcIlRTTE9HXCI7XHJcbiAgICAgICAgaWYgKGNvbmZpZykge1xyXG4gICAgICAgICAgICBpZiAodW5kZWZpbmVkICE9PSBjb25maWcuZG9Db25zb2xlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29uc29sZSA9IGNvbmZpZy5kb0NvbnNvbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gY29uZmlnLnVzZXRzTG9nKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVzZXRzTG9nID0gY29uZmlnLnVzZXRzTG9nO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh1bmRlZmluZWQgIT09IGNvbmZpZy5pdGVtTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtTmFtZSA9IGNvbmZpZy5pdGVtTmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodW5kZWZpbmVkICE9PSBjb25maWcubWF4TGVuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1heExlbiA9IGNvbmZpZy5tYXhMZW47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gY29uZmlnLmxvZ05hbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9nTmFtZSA9IGNvbmZpZy5sb2dOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9nTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuX2luaXRMb2coKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2cob2JqOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5kb0NvbnNvbGUpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cob2JqKTtcclxuICAgICAgICAgICAgaWYgKENDX0pTQikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cob2JqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYyBMb2c6ICVjICVzYCwgJ2NvbG9yOiAjNjVjMjk0JywgJ2NvbG9yOiAjMDAwMDAwJywgLi4ub2JqKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZG9Mb2cob2JqLCBcIklORk9cIik7XHJcbiAgICB9XHJcblxyXG4gICAgd2FybihvYmo6IGFueSkge1xyXG4gICAgICAgIC8vIGlmICh0aGlzLmRvQ29uc29sZSkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUud2FybihvYmopO1xyXG4gICAgICAgIGlmIChDQ19KU0IpIHtcclxuICAgICAgICAgICAgY29uc29sZS53YXJuKG9iaik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coYCVjIFdhcm46ICVjICVzYCwgJ2NvbG9yOiAjYjBhNjAwJywgJ2NvbG9yOiAjMDAwMDAwJywgLi4ub2JqKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuX2RvTG9nKG9iaiwgXCJXQVJOXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGVycm9yKG9iajogYW55KSB7XHJcbiAgICAgICAgLy8gaWYgKHRoaXMuZG9Db25zb2xlKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5lcnJvcihvYmopO1xyXG4gICAgICAgIGlmIChDQ19KU0IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcihvYmopO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGAlYyBFcnJvcjogJWMgJXNgLCAnY29sb3I6ICNmODNkM2QnLCAnY29sb3I6ICMwMDAwMDAnLCAuLi5vYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIHRoaXMuX2RvTG9nKG9iaiwgXCJFUlJPUlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBkb3dubG9hZExvZygpIHtcclxuICAgICAgICBsZXQgY29udGVudDogc3RyaW5nID0gXCItLS0tLVRTTE9HIFNUQVJULS0tLS1cXG5cIjtcclxuICAgICAgICBpZiAodGhpcy5sb2dMaXN0ICYmIHRoaXMubG9nTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nTGlzdC5mb3JFYWNoKChsb2c6IHRzTG9nVXRpbC5Mb2dJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gYCR7Y29udGVudH0ke3RzTG9nVXRpbC5kYXRlRm9ybWF0KGxvZy5kYXRlKX0gJHtsb2cudHlwZX3vvJoke2xvZy5sb2dcclxuICAgICAgICAgICAgICAgICAgICB9XFxuYDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnRlbnQgPSBgJHtjb250ZW50fS0tLS0tVFNMT0cgRU5ELS0tLS1cXG5gO1xyXG4gICAgICAgIHRzTG9nVXRpbC5kb3dubG9hZChcclxuICAgICAgICAgICAgYCR7dGhpcy5sb2dOYW1lfSR7dHNMb2dVdGlsLmRhdGVGb3JtYXQoXHJcbiAgICAgICAgICAgICAgICBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgICAgIFwieXl5eU1NZGRoaG1tc3NcIlxyXG4gICAgICAgICAgICApfS50eHRgLFxyXG4gICAgICAgICAgICBjb250ZW50XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmxvZ0xpc3QgPSBbXTtcclxuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5pdGVtTmFtZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5pdExvZygpIHtcclxuICAgICAgICBpZiAoIXdpbmRvdy5sb2NhbFN0b3JhZ2UpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvZPliY3mtY/op4jlmajkuI3mlK/mjIFsb2NhbFN0b3JhZ2UhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsb2dJblN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5pdGVtTmFtZSk7XHJcbiAgICAgICAgaWYgKGxvZ0luU3RvcmFnZSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dMaXN0ID0gSlNPTi5wYXJzZShsb2dJblN0b3JhZ2UpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihg6Kej5p6Q5a2Y5YKo5pel5b+X5aSx6LSl77yBYCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ0xpc3QgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9kb0xvZyhvYmo6IGFueSwgdHlwZTogdHNMb2dVdGlsLmFjdGlvbikge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgICBpZiAoIXRoaXMudXNldHNMb2cpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5sb2dMaXN0ICYmIHRoaXMubG9nTGlzdC5sZW5ndGggPT09IHRoaXMubWF4TGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nTGlzdC5zaGlmdCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdGVtcExvZzogdHNMb2dVdGlsLkxvZ0l0ZW0gPSB7XHJcbiAgICAgICAgICAgIGxvZzogXCJcIixcclxuICAgICAgICAgICAgZGF0ZTogbmV3IERhdGUoKS5nZXRUaW1lKCksXHJcbiAgICAgICAgICAgIHR5cGUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB0ZW1wTG9nLmxvZyA9IG9iajtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0ZW1wTG9nLmxvZyA9IEpTT04uc3RyaW5naWZ5KG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubG9nTGlzdC5wdXNoKHRlbXBMb2cpO1xyXG4gICAgICAgIHRoaXMuX3NhdmVMb2coSlNPTi5zdHJpbmdpZnkodGhpcy5sb2dMaXN0KSwgdGVtcExvZyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfc2F2ZUxvZyhkYXRhOiBzdHJpbmcsIGxvZz86IHRzTG9nVXRpbC5Mb2dJdGVtKSB7XHJcbiAgICAgICAgaWYgKCF3aW5kb3cubG9jYWxTdG9yYWdlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5b2T5YmN5rWP6KeI5Zmo5LiN5pSv5oyBbG9jYWxTdG9yYWdlIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5pdGVtTmFtZSwgZGF0YSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICAgICAgaWYgKFwiUXVvdGFFeGNlZWRlZEVycm9yXCIgPT09IGUubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHVuZGVmaW5lZCAhPT0gbG9nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2dMaXN0LnB1c2gobG9nKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zYXZlTG9nKEpTT04uc3RyaW5naWZ5KHRoaXMubG9nTGlzdCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8vIGV4cG9ydCBsZXQgR0xvZyA9IFRzTG9nLmdldEluc3RhbmNlKCk7IiwiaW1wb3J0IHsgX1RzTG9nIH0gZnJvbSBcIi4vVHNMb2dcIjtcblxubGV0IFRzTG9nID0gX1RzTG9nLmdldEluc3RhbmNlKCk7XG4vKipcbiAqIOaXpeW/l+mDqOWIhlxuICovXG4vKipcbiAqIOaZrumAmuaXpeW/l+i+k+WHulxuICogQHBhcmFtIGFyZ3Mg5Y+C5pWwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfZ0xvZyguLi5hcmdzKTogdm9pZCB7XG4gICAgVHNMb2cubG9nKGFyZ3MpO1xufVxuLyoqXG4gKiDorablkYrml6Xlv5fovpPlh7pcbiAqIEBwYXJhbSBhcmdzIOWPguaVsFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2dXYXJuKC4uLmFyZ3MpOiB2b2lkIHtcbiAgICBUc0xvZy53YXJuKGFyZ3MpO1xufVxuLyoqXG4gKiDplJnor6/ml6Xlv5fovpPlh7pcbiAqIEBwYXJhbSBhcmdzIOWPguaVsFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2dFcnJvciguLi5hcmdzKTogdm9pZCB7XG4gICAgVHNMb2cuZXJyb3IoYXJncyk7XG59XG5cbi8qKlxuICog5LiL6L29bG9nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBfZ0Rvd25Mb2FkTG9nKCk6IHZvaWQge1xuICAgIFRzTG9nLmRvd25sb2FkTG9nKClcbn1cblxuLyoqXG4gKiDmuIXnkIZsb2fnvJPlrZhcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF9nQ2xlYXJMb2coKTogdm9pZCB7XG4gICAgVHNMb2cuY2xlYXIoKVxufVxuLyoqXG4gKiDlsIZ7feWGheWuueabv+aNouaIkOWPguaVsOWGheWuuVxuICovXG5leHBvcnQgZnVuY3Rpb24gXyQobXNnOiBzdHJpbmcsIC4uLmFyZ3MpIHtcbiAgICBsZXQgcmVnID0gL1xceyguKj8pXFx9LztcbiAgICBsZXQgaTtcbiAgICBsZXQgbGVuID0gYXJncy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIG1zZyA9IG1zZy5yZXBsYWNlKHJlZywgYXJnc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiBtc2c7XG59XG5cbi8qKlxuICog5pel5b+X6YOo5YiG57uT5p2fXG4gKi8iLCJleHBvcnQgY2xhc3MgX0FycmF5VXRpbCB7XHJcblxyXG4gICAgc3RhdGljIGlzVmFsaWQocmVjb3JkOiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHJlY29yZCAmJiByZWNvcmQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpI3liLbkuoznu7TmlbDnu4RcclxuICAgICAqIEBwYXJhbSBhcnJheSDnm67moIfmlbDnu4RcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBjb3B5MkRBcnJheShhcnJheTogYW55W11bXSk6IGFueVtdW10ge1xyXG4gICAgICAgIGxldCBuZXdBcnJheTogYW55W11bXSA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbmV3QXJyYXkucHVzaChhcnJheVtpXS5jb25jYXQoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdBcnJheTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEZpc2hlci1ZYXRlcyBTaHVmZmxlIOmaj+acuue9ruS5seeul+azlVxyXG4gICAgICogQHBhcmFtIGFycmF5IOebruagh+aVsOe7hFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZpc2hlcllhdGVzU2h1ZmZsZShhcnJheTogYW55W10pOiBhbnlbXSB7XHJcbiAgICAgICAgbGV0IGNvdW50ID0gYXJyYXkubGVuZ3RoO1xyXG4gICAgICAgIHdoaWxlIChjb3VudCkge1xyXG4gICAgICAgICAgICBsZXQgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb3VudC0tKTtcclxuICAgICAgICAgICAgbGV0IHRlbXAgPSBhcnJheVtjb3VudF07XHJcbiAgICAgICAgICAgIGFycmF5W2NvdW50XSA9IGFycmF5W2luZGV4XTtcclxuICAgICAgICAgICAgYXJyYXlbaW5kZXhdID0gdGVtcDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5re35reG5pWw57uEXHJcbiAgICAgKiBAcGFyYW0gYXJyYXkg55uu5qCH5pWw57uEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29uZm91bmQoYXJyYXk6IFtdKTogYW55W10ge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBhcnJheS5zbGljZSgpLnNvcnQoKCkgPT4gTWF0aC5yYW5kb20oKSAtIDAuNSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaVsOe7hOaJgeW5s+WMllxyXG4gICAgICogQHBhcmFtIGFycmF5IOebruagh+aVsOe7hFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZsYXR0ZW5pbmcoYXJyYXk6IGFueVtdKSB7XHJcbiAgICAgICAgZm9yICg7IGFycmF5LnNvbWUoKHYpID0+IEFycmF5LmlzQXJyYXkodikpOykge1xyXG4gICAgICAgICAgICAvLyDliKTmlq0gYXJyYXkg5Lit5piv5ZCm5pyJ5pWw57uEXHJcbiAgICAgICAgICAgIGFycmF5ID0gW10uY29uY2F0LmFwcGx5KFtdLCBhcnJheSk7IC8vIOWOi+aJgeaVsOe7hFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlkIjlubbmlbDnu4RcclxuICAgICAqIEBwYXJhbSBhcnJheTEg55uu5qCH5pWw57uEMVxyXG4gICAgICogQHBhcmFtIGFycmF5MiDnm67moIfmlbDnu4QyXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29tYmluZUFycmF5cyhhcnJheTE6IGFueVtdLCBhcnJheTI6IGFueVtdKTogYW55W10ge1xyXG4gICAgICAgIGxldCBuZXdBcnJheSA9IFsuLi5hcnJheTEsIC4uLmFycmF5Ml07XHJcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W6ZqP5py65pWw57uE5oiQ5ZGYXHJcbiAgICAgKiBAcGFyYW0gYXJyYXkg55uu5qCH5pWw57uEXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UmFuZG9tVmFsdWVJbkFycmF5KGFycmF5OiBhbnlbXSk6IGFueSB7XHJcbiAgICAgICAgbGV0IG5ld0FycmF5ID0gYXJyYXlbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXJyYXkubGVuZ3RoKV07XHJcbiAgICAgICAgcmV0dXJuIG5ld0FycmF5O1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBlbnVtICREYXRlVXRpbFR5cGUge1xyXG4gICAgLy/ml6XmnJ/moLzlvI/pg6jliIZcclxuICAgIHl5eXlfTU1fZGRfSEhfbW1fc3MgPSBcInl5eXktTU0tZGQgSEg6bW06c3NcIixcclxuICAgIHl5eXlfTU1fZGRfSEhfbW0gPSBcInl5eXktTU0tZGQgSEg6bW1cIixcclxuICAgIHl5eXlfTU1fZGQgPSBcInl5eXktTU0tZGRcIixcclxuICAgIHl5eXlfTU1fZGRfMSA9IFwieXl5eS9NTS9kZFwiLFxyXG4gICAgeXl5eU1NZGQgPSBcInl5eXlNTWRkXCIsXHJcbiAgICBISF9tbV9zcyA9IFwiSEg6bW06c3NcIixcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzICREYXRlVXRpbCB7XHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreaVsOaNruaYr+WQpuS4uuepulxyXG4gICAgICogQHBhcmFtIGRhdGFcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHN0YXRpYyBpc1ZhbGlkKGRhdGE6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChkYXRhID09IG51bGwgfHwgZGF0YSA9PSB1bmRlZmluZWQgfHwgZGF0YSA9PSAnJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5piv5ZCm5Li65pel5pyfXHJcbiAgICAgKiBAcGFyYW0gZGF0ZSDkuI3mlK/mjIF5eXl5TU1kZOagvOW8j1xyXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3RhdGljIGlzRGF0ZShkYXRlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGlzTmFOKGRhdGUpICYmICFpc05hTihEYXRlLnBhcnNlKGRhdGUpKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmN5pel5pyfXHJcbiAgICAgKiBAcmV0dXJucyB7RGF0ZX1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXROb3dEYXRlKCk6IERhdGUge1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmN5pe26Ze05oizXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldE5vd1RpbWVTdGFtcCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwobmV3IERhdGUoKS5nZXRUaW1lKCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogRGF0ZeaXpeacn+agvOW8j+WMllxyXG4gICAgICogQHBhcmFtIGRhdGVcclxuICAgICAqIEBwYXJhbSBwYXR0ZXJuIOWPr+S4uuepuu+8jOm7mOiupHl5eXktTU0tZGQgSEg6bW06c3NcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZm9ybWF0KGRhdGU6IERhdGUsIHBhdHRlcm46ICREYXRlVXRpbFR5cGUpIHtcclxuICAgICAgICBsZXQgeXkgPSBkYXRlLmdldEZ1bGxZZWFyKCk7IC8v5bm0XHJcbiAgICAgICAgbGV0IG1tID0gZGF0ZS5nZXRNb250aCgpICsgMTsgLy/mnIhcclxuICAgICAgICBsZXQgZGQgPSBkYXRlLmdldERhdGUoKTsgLy/ml6VcclxuICAgICAgICBsZXQgaGggPSBkYXRlLmdldEhvdXJzKCk7IC8v5pe2XHJcbiAgICAgICAgbGV0IGlpID0gZGF0ZS5nZXRNaW51dGVzKCk7IC8v5YiGXHJcbiAgICAgICAgbGV0IHNzID0gZGF0ZS5nZXRTZWNvbmRzKCk7IC8v56eSXHJcblxyXG4gICAgICAgIGxldCBjbG9jayA9IHl5ICsgXCItXCI7XHJcbiAgICAgICAgaWYgKG1tIDwgMTApIGNsb2NrICs9IFwiMFwiO1xyXG4gICAgICAgIGNsb2NrICs9IG1tICsgXCItXCI7XHJcbiAgICAgICAgaWYgKGRkIDwgMTApIGNsb2NrICs9IFwiMFwiO1xyXG4gICAgICAgIGNsb2NrICs9IGRkICsgXCIgXCI7XHJcbiAgICAgICAgaWYgKGhoIDwgMTApIGNsb2NrICs9IFwiMFwiO1xyXG4gICAgICAgIGNsb2NrICs9IGhoICsgXCI6XCI7XHJcbiAgICAgICAgaWYgKGlpIDwgMTApIGNsb2NrICs9IFwiMFwiO1xyXG4gICAgICAgIGNsb2NrICs9IGlpO1xyXG4gICAgICAgIGlmIChzcyA8IDEwKSBjbG9jayArPSBcIjBcIjtcclxuICAgICAgICBpZiAocGF0dGVybiAhPSAkRGF0ZVV0aWxUeXBlLnl5eXlfTU1fZGRfSEhfbW0pIGNsb2NrICs9IChcIjpcIiArIHNzKTtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKHBhdHRlcm4pIHx8IHBhdHRlcm4gPT0gJERhdGVVdGlsVHlwZS55eXl5X01NX2RkX0hIX21tX3NzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjbG9jaztcclxuICAgICAgICB9IGVsc2UgaWYgKHBhdHRlcm4gPT0gJERhdGVVdGlsVHlwZS55eXl5X01NX2RkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjbG9jay5zdWJzdHJpbmcoMCwgMTApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGF0dGVybiA9PSAkRGF0ZVV0aWxUeXBlLkhIX21tX3NzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjbG9jay5zdWJzdHJpbmcoMTEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocGF0dGVybiA9PSAkRGF0ZVV0aWxUeXBlLnl5eXlfTU1fZGRfMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2xvY2suc3Vic3RyaW5nKDAsIDEwKS5yZXBsYWNlKC8tL2csIFwiL1wiKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHBhdHRlcm4gPT0gJERhdGVVdGlsVHlwZS55eXl5TU1kZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gY2xvY2suc3Vic3RyaW5nKDAsIDEwKS5yZXBsYWNlKC8tL2csIFwiXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBjbG9jaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaXpeacn+Wtl+espuS4sui9rOaXtumXtOaIs1xyXG4gICAgICogQHBhcmFtIGRhdGUgIOS4jeaUr+aMgXl5eXlNTWRk5qC85byPXHJcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHN0ckRhdGUyVGltZVN0YW1wKGRhdGUpOiBudW1iZXIge1xyXG4gICAgICAgIGRhdGUgPSBkYXRlLnJlcGxhY2UoLy0vZywgXCIvXCIpO1xyXG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlKS5nZXRUaW1lKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDml7bpl7TmiLPovazml6XmnJ/lrZfnrKbkuLIoeXl5eS1NTS1kZCBISDptbTpzcylcclxuICAgICAqIEBwYXJhbSB0aW1lU3RhbXBcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdGltZVN0YW1wMnN0ckRhdGUodGltZVN0YW1wKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgZCA9IG5ldyBEYXRlKHRpbWVTdGFtcCk7IC8v5qC55o2u5pe26Ze05oiz55Sf5oiQ55qE5pe26Ze05a+56LGhXHJcbiAgICAgICAgbGV0IGRhdGUgPVxyXG4gICAgICAgICAgICBkLmdldEZ1bGxZZWFyKCkgK1xyXG4gICAgICAgICAgICBcIi1cIiArXHJcbiAgICAgICAgICAgIChkLmdldE1vbnRoKCkgKyAxIDwgMTAgPyBcIjBcIiArIChkLmdldE1vbnRoKCkgKyAxKSA6IGQuZ2V0TW9udGgoKSArIDEpICtcclxuICAgICAgICAgICAgXCItXCIgK1xyXG4gICAgICAgICAgICAoZC5nZXREYXRlKCkgPCAxMCA/IFwiMFwiICsgZC5nZXREYXRlKCkgOiBkLmdldERhdGUoKSkgK1xyXG4gICAgICAgICAgICBcIiBcIiArXHJcbiAgICAgICAgICAgIChkLmdldEhvdXJzKCkgPCAxMCA/IFwiMFwiICsgZC5nZXRIb3VycygpIDogZC5nZXRIb3VycygpKSArXHJcbiAgICAgICAgICAgIFwiOlwiICtcclxuICAgICAgICAgICAgKGQuZ2V0TWludXRlcygpIDwgMTAgPyBcIjBcIiArIGQuZ2V0TWludXRlcygpIDogZC5nZXRNaW51dGVzKCkpICtcclxuICAgICAgICAgICAgXCI6XCIgK1xyXG4gICAgICAgICAgICAoZC5nZXRTZWNvbmRzKCkgPCAxMCA/IFwiMFwiICsgZC5nZXRTZWNvbmRzKCkgOiBkLmdldFNlY29uZHMoKSk7XHJcbiAgICAgICAgcmV0dXJuIGRhdGU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blh6DlpKnliY3ml6XmnJ8oMeS7o+ihqOaYjuWkqe+8jC0xIOS7o+ihqOWJjeS4gOWkqe+8jC0y5YmN5Lik5aSpLi4uKVxyXG4gICAgICogQHBhcmFtIGRhdGUg5oyH5a6a5pel5pyfXHJcbiAgICAgKiBAcGFyYW0gbnVtXHJcbiAgICAgKiBAcGFyYW0gc2VwYXJhdG9yIOi/nuaOpeespiDlpoLmnpzkuLotLOWImee7k+aenOS4ujp5eXl5LU1NLWRkXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RGF5KGRhdGUsIG51bSwgc2VwYXJhdG9yKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdG9kYXkgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICBsZXQgbm93VGltZSA9IHRvZGF5LmdldFRpbWUoKTtcclxuICAgICAgICBsZXQgbXMgPSAyNCAqIDM2MDAgKiAxMDAwICogbnVtO1xyXG4gICAgICAgIHRvZGF5LnNldFRpbWUobm93VGltZSArIG1zKTtcclxuICAgICAgICBsZXQgb1llYXIgPSB0b2RheS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgIGxldCBvTW90aCA9ICh0b2RheS5nZXRNb250aCgpICsgMSkudG9TdHJpbmcoKTtcclxuICAgICAgICBpZiAob01vdGgubGVuZ3RoIDw9IDEpIG9Nb3RoID0gXCIwXCIgKyBvTW90aDtcclxuICAgICAgICBsZXQgb0RheSA9IHRvZGF5LmdldERhdGUoKS50b1N0cmluZygpO1xyXG4gICAgICAgIGlmIChvRGF5Lmxlbmd0aCA8PSAxKSBvRGF5ID0gXCIwXCIgKyBvRGF5O1xyXG4gICAgICAgIHJldHVybiBvWWVhciArIHNlcGFyYXRvciArIG9Nb3RoICsgc2VwYXJhdG9yICsgb0RheTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWJjeWHoOaciCgx5Luj6KGo5LiL5pyI77yMLTEg5Luj6KGo5LiK5pyI77yMLTLkuIrkuKTmnIguLi4pXHJcbiAgICAgKiBAcGFyYW0gZGF0ZSDmjIflrprml6XmnJ9cclxuICAgICAqIEBwYXJhbSBudW1cclxuICAgICAqIEBwYXJhbSBzZXBhcmF0b3Ig6L+e5o6l56ymIOWmguaenOS4ui0s5YiZ57uT5p6c5Li6Onl5eXktTU1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRNb250aChkYXRlLCBudW0sIHNlcGFyYXRvcik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHRvZGF5ID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgdG9kYXkuc2V0TW9udGgodG9kYXkuZ2V0TW9udGgoKSArIG51bSk7XHJcbiAgICAgICAgbGV0IG9ZZWFyID0gdG9kYXkuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBsZXQgb01vdGggPSAodG9kYXkuZ2V0TW9udGgoKSArIDEpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKG9Nb3RoLmxlbmd0aCA8PSAxKSBvTW90aCA9IFwiMFwiICsgb01vdGg7XHJcbiAgICAgICAgcmV0dXJuIG9ZZWFyICsgc2VwYXJhdG9yICsgb01vdGg7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWIpOaWreafkOS4gOW5tOaYr+WQpuaYr+mXsOW5tFxyXG4gICAgICogQHBhcmFtIHllYXJcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzTGVhcFllYXIoeWVhcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoeWVhciAlIDQgPT09IDAgJiYgeWVhciAlIDEwMCAhPT0gMCkgfHwgeWVhciAlIDQwMCA9PT0gMDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluafkOW5tOafkOS4quaciOeahOWkqeaVsCjopb/mlrnmnIjku70pXHJcbiAgICAgKiBAcGFyYW0geWVhclxyXG4gICAgICogQHBhcmFtIG1vbnRoIOS7jjDlvIDlp4tcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXREYXlzT2ZNb250aEVOKHllYXIsIG1vbnRoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAzMSxcclxuICAgICAgICAgICAgdGhpcy5pc0xlYXBZZWFyKHllYXIpID8gMjkgOiAyOCxcclxuICAgICAgICAgICAgMzEsXHJcbiAgICAgICAgICAgIDMwLFxyXG4gICAgICAgICAgICAzMSxcclxuICAgICAgICAgICAgMzAsXHJcbiAgICAgICAgICAgIDMxLFxyXG4gICAgICAgICAgICAzMSxcclxuICAgICAgICAgICAgMzAsXHJcbiAgICAgICAgICAgIDMxLFxyXG4gICAgICAgICAgICAzMCxcclxuICAgICAgICAgICAgMzEsXHJcbiAgICAgICAgXVttb250aF07XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluafkOW5tOafkOS4quaciOeahOWkqeaVsCjkuK3lm73mnIjku70pXHJcbiAgICAgKiBAcGFyYW0geWVhclxyXG4gICAgICogQHBhcmFtIG1vbnRoIOS7jjHlvIDlp4tcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXREYXlzT2ZNb250aENOKHllYXIsIG1vbnRoKTogc3RyaW5nIHwgbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBcIuS4reWbveayoeaciTDmnIhcIixcclxuICAgICAgICAgICAgMzEsXHJcbiAgICAgICAgICAgIHRoaXMuaXNMZWFwWWVhcih5ZWFyKSA/IDI5IDogMjgsXHJcbiAgICAgICAgICAgIDMxLFxyXG4gICAgICAgICAgICAzMCxcclxuICAgICAgICAgICAgMzEsXHJcbiAgICAgICAgICAgIDMwLFxyXG4gICAgICAgICAgICAzMSxcclxuICAgICAgICAgICAgMzEsXHJcbiAgICAgICAgICAgIDMwLFxyXG4gICAgICAgICAgICAzMSxcclxuICAgICAgICAgICAgMzAsXHJcbiAgICAgICAgICAgIDMxLFxyXG4gICAgICAgIF1bbW9udGhdO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDorqHnrpfkuIDkuKrml6XmnJ/mmK/lvZPlubTnmoTnrKzlh6DlpKlcclxuICAgICAqIEBwYXJhbSBkYXRlIOWtl+espuS4suaXpeacn1xyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBkYXlPZlRoZVllYXIoZGF0ZSk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IG9iaiA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgIGxldCB5ZWFyID0gb2JqLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgbGV0IG1vbnRoID0gb2JqLmdldE1vbnRoKCk7IC8v5LuOMOW8gOWni1xyXG4gICAgICAgIGxldCBkYXlzID0gb2JqLmdldERhdGUoKTtcclxuICAgICAgICBsZXQgZGF5c0FyciA9IFtcclxuICAgICAgICAgICAgMzEsXHJcbiAgICAgICAgICAgIHRoaXMuaXNMZWFwWWVhcih5ZWFyKSA/IDI5IDogMjgsXHJcbiAgICAgICAgICAgIDMxLFxyXG4gICAgICAgICAgICAzMCxcclxuICAgICAgICAgICAgMzEsXHJcbiAgICAgICAgICAgIDMwLFxyXG4gICAgICAgICAgICAzMSxcclxuICAgICAgICAgICAgMzEsXHJcbiAgICAgICAgICAgIDMwLFxyXG4gICAgICAgICAgICAzMSxcclxuICAgICAgICAgICAgMzAsXHJcbiAgICAgICAgICAgIDMxLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb250aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRheXMgKz0gZGF5c0FycltpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGRheXM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmr5TovoPkuKTkuKrml7bpl7TlpKflsI8o5LiN5pSv5oyBeXl5eU1NZGTmoLzlvI8pXHJcbiAgICAgKiAgICBkYXRlMT5kYXRlMiByZXR1cm4gMVxyXG4gICAgICogICAgZGF0ZTE8ZGF0ZTIgcmV0dXJuIC0xXHJcbiAgICAgKiAgICBkYXRlMT09ZGF0ZTIgcmV0dXJuIDBcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY29tcGFyZVRpbWUoZGF0ZTEsIGRhdGUyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgIERhdGUucGFyc2UoZGF0ZTEucmVwbGFjZSgvLS9nLCBcIi9cIikpID5cclxuICAgICAgICAgICAgRGF0ZS5wYXJzZShkYXRlMi5yZXBsYWNlKC8tL2csIFwiL1wiKSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgRGF0ZS5wYXJzZShkYXRlMS5yZXBsYWNlKC8tL2csIFwiL1wiKSkgPFxyXG4gICAgICAgICAgICBEYXRlLnBhcnNlKGRhdGUyLnJlcGxhY2UoLy0vZywgXCIvXCIpKVxyXG4gICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm4gLTE7XHJcbiAgICAgICAgfSBlbHNlIGlmIChcclxuICAgICAgICAgICAgRGF0ZS5wYXJzZShkYXRlMS5yZXBsYWNlKC8tL2csIFwiL1wiKSkgPT1cclxuICAgICAgICAgICAgRGF0ZS5wYXJzZShkYXRlMi5yZXBsYWNlKC8tL2csIFwiL1wiKSlcclxuICAgICAgICApIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bmnKzlkajlvIDlp4vml6XmnJ9cclxuICAgICAqIEByZXR1cm5zIHsqfHN0cmluZ31cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRXZWVrU3RhcnREYXkoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKFxyXG4gICAgICAgICAgICBub3cuZ2V0RnVsbFllYXIoKSxcclxuICAgICAgICAgICAgbm93LmdldE1vbnRoKCksXHJcbiAgICAgICAgICAgIG5vdy5nZXREYXRlKCkgLSBub3cuZ2V0RGF5KCkgKyAxXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQoZGF0ZSwgJERhdGVVdGlsVHlwZS55eXl5X01NX2RkKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5pys5ZGo57uT5p2f5pel5pyfXHJcbiAgICAgKiBAcmV0dXJucyB7KnxzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0V2Vla0VuZERheSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoXHJcbiAgICAgICAgICAgIG5vdy5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICBub3cuZ2V0TW9udGgoKSxcclxuICAgICAgICAgICAgbm93LmdldERhdGUoKSArICg3IC0gbm93LmdldERheSgpKVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0KGRhdGUsICREYXRlVXRpbFR5cGUueXl5eV9NTV9kZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bkuIrlkajlvIDlp4vml6XmnJ9cclxuICAgICAqIEByZXR1cm5zIHsqfHN0cmluZ31cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRVcFdlZWtTdGFydERheSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoXHJcbiAgICAgICAgICAgIG5vdy5nZXRGdWxsWWVhcigpLFxyXG4gICAgICAgICAgICBub3cuZ2V0TW9udGgoKSxcclxuICAgICAgICAgICAgbm93LmdldERhdGUoKSAtIG5vdy5nZXREYXkoKSAtIDZcclxuICAgICAgICApO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZvcm1hdChkYXRlLCAkRGF0ZVV0aWxUeXBlLnl5eXlfTU1fZGQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5LiK5ZGo57uT5p2f5pel5pyfXHJcbiAgICAgKiBAcmV0dXJucyB7KnxzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0VXBXZWVrRW5kRGF5KCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShcclxuICAgICAgICAgICAgbm93LmdldEZ1bGxZZWFyKCksXHJcbiAgICAgICAgICAgIG5vdy5nZXRNb250aCgpLFxyXG4gICAgICAgICAgICBub3cuZ2V0RGF0ZSgpIC0gbm93LmdldERheSgpXHJcbiAgICAgICAgKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQoZGF0ZSwgJERhdGVVdGlsVHlwZS55eXl5X01NX2RkKTtcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgJFN0cmluZ1V0aWwge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IOafpeivouWtl+espuS4suaYr+WQpuWMheWQq2tlee+8jOi/lOWbnm51bWJlclxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZpbmRLZXkobXNnOiBzdHJpbmcsIGtleTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAobXNnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtc2cuaW5kZXhPZihrZXkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IOafpeivouWtl+espuS4suaYr+WQpuWMheWQq2tlee+8jOi/lOWbnmJvb2xlYW5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtc2dcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBoYXNLZXkobXNnOiBzdHJpbmcsIGtleTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG1zZykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kS2V5KG1zZywga2V5KSAhPSAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb2465piv5ZCm5pivaHR0cOmTvuaOpVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzSHR0cHMobXNnOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAobXNnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmlzSHR0cChtc2cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IOagoemqjOe9kee7nOi/nuaOpeWktOmDqOaYr+WQpuWMheWQq+KAmGh0dHBz5oiWaHR0cOKAmVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzSHR0cChtc2c6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChtc2cpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIHRoaXMuZmluZEtleShtc2csIFwiaHR0cHM6Ly9cIikgPT0gMCB8fCB0aGlzLmZpbmRLZXkobXNnLCBcImh0dHA6Ly9cIikgPT0gMFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IOagoemqjOWtl+espuS4suaYr+WQpuacieaViFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzVmFsaWQobXNnOiBzdHJpbmcgfCBzdHJpbmdbXSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChtc2cgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBtc2cubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghY2MuanMuaXNTdHJpbmcobXNnKSB8fCBtc2cubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChjYy5qcy5pc1N0cmluZyhtc2cpICYmIG1zZy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNJbnQobXNnOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAobXNnICYmIG1zZy5sZW5ndGggIT0gMCkge1xyXG4gICAgICAgICAgICBpZiAoIWlzTmFOKHBhcnNlSW50KG1zZykpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGlzTnVtYmVyKG1zZzogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG1zZyAmJiBtc2cubGVuZ3RoICE9IDApIHtcclxuICAgICAgICAgICAgaWYgKCFpc05hTihwYXJzZUZsb2F0KG1zZykpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IOWtl+espuS4suijgeWIh1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1zZ1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSDoo4HliIflrZfnrKZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBzcGxpdChtc2c6IHN0cmluZywga2V5OiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZChtc2cpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBtc2cuc3BsaXQoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFttc2ddO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uOuiOt+WPlumTvuaOpeWPguaVsFxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybCDpnIDop6PmnpDpk77mjqVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRSZXF1ZXN0KHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF1cmwgfHwgdXJsID09IFwiXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcXVlcnk6IGFueSA9IHt9O1xyXG4gICAgICAgIHZhciBpOiBudW1iZXI7XHJcbiAgICAgICAgdmFyIHN0cjogc3RyaW5nO1xyXG4gICAgICAgIHZhciBzdHJzOiBzdHJpbmdbXTtcclxuICAgICAgICB2YXIgYXJyOiBzdHJpbmdbXTtcclxuICAgICAgICBpZiAodXJsLmluZGV4T2YoXCI/XCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgIHN0ciA9IHVybC5zdWJzdHIoMSk7XHJcbiAgICAgICAgICAgIHN0cnMgPSBzdHIuc3BsaXQoXCImXCIpO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3Rycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYXJyID0gc3Ryc1tpXS5zcGxpdChcIj1cIik7XHJcbiAgICAgICAgICAgICAgICBxdWVyeVthcnJbMF1dID0gdW5lc2NhcGUoYXJyWzFdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcXVlcnk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlsIblr7nosaHmi4bop6PmiJDlkI7nvIDlvaLlvI9cclxuICAgICAqIEBwYXJhbSBwYXJhbXNcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRRdWVyeShwYXJhbXMpOiBzdHJpbmcge1xyXG4gICAgICAgIGNvbnN0IHRtcHM6IHN0cmluZ1tdID0gW107XHJcbiAgICAgICAgdmFyIGtleTogc3RyaW5nO1xyXG4gICAgICAgIGZvciAoa2V5IGluIHBhcmFtcykge1xyXG4gICAgICAgICAgICB0bXBzLnB1c2goYCR7a2V5fT0ke3BhcmFtc1trZXldfWApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG1wcy5qb2luKFwiJlwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOagvOW8j+WMluWtl+espuS4slxyXG4gICAgICogQHBhcmFtIHN0ciBcclxuICAgICAqIEBwYXJhbSB2YWwgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgRm9ybWF0KHN0cjogc3RyaW5nLCAuLi52YWw6IHN0cmluZ1tdKTogc3RyaW5nIHtcclxuICAgICAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgdmFsLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICAgICAgICBzdHIgPSBzdHIucmVwbGFjZShgeyR7aW5kZXh9fWAsIHZhbFtpbmRleF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3RyO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDljrvmjonliY3lkI7nqbrmoLxcclxuICAgICAqIEBwYXJhbSBzdHJcclxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgdHJpbVNwYWNlKHN0cjogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqKC4qPylbXFxzXFxuXSokL2csICckMScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5a2X56ym5Liy6ZW/5bqm77yM5Lit5paH5Li6MlxyXG4gICAgICogQHBhcmFtIHN0clxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFN0cmluZ0xlbmd0aChzdHI6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIHN0ckFyciA9IHN0ci5zcGxpdChcIlwiKTtcclxuICAgICAgICB2YXIgbGVuZ3RoID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ckFyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcyA9IHN0ckFycltpXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNDaGluZXNlKHMpKSB7XHJcbiAgICAgICAgICAgICAgICBsZW5ndGggKz0gMjtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxlbmd0aCArPSAxO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKTmlq3kuIDkuKrlrZfnrKbkuLLmmK/lkKbljIXlkKvkuK3mlodcclxuICAgICAqIEBwYXJhbSBzdHJcclxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGlzQ2hpbmVzZShzdHI6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciByZWcgPSAvXi4qW1xcdTRFMDAtXFx1OUZBNV0rLiokLztcclxuICAgICAgICByZXR1cm4gcmVnLnRlc3Qoc3RyKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUNoYXJSZXBhZXQoY2hhcjogc3RyaW5nLCByZXBlYXQ6IG51bWJlcik6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IG1zZzogc3RyaW5nID0gXCJcIjtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcmVwZWF0OyBpKyspIHtcclxuICAgICAgICAgICAgbXNnICs9IGNoYXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtc2c7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmlbDlgLzmoLzlvI/ljJYg5LiH5Li65Y2V5L2NXHJcbiAgICAgKiBAcGFyYW0gbnVtIOaVsOWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGZvcm1hdE51bWJlcihudW0pIHtcclxuICAgICAgICBpZiAobnVtID09IHVuZGVmaW5lZCkgcmV0dXJuICcnXHJcbiAgICAgICAgbnVtID0gTnVtYmVyKG51bSk7XHJcbiAgICAgICAgaWYgKG51bSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudW0gKyAnJztcclxuICAgICAgICB9IGVsc2VcclxuICAgICAgICAgICAgaWYgKG51bSA+PSAxICYmIG51bSA8IDEwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVtICsgJyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKG51bSAvIDEwMDAwKS50b0ZpeGVkKDIpICsgJ+S4hyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOmAmui/h29zc+iOt+WPlueJueWumuWkp+Wwj+eahOWbvueJh1xyXG4gICAgICogQHBhcmFtIHVybCDlm77niYflnLDlnYBcclxuICAgICAqIEBwYXJhbSB3aWR0aCAg5a69IFxyXG4gICAgICogQHBhcmFtIGhlaWdodCDpq5hcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZW5lcmF0ZVJlc2l6ZVVybCh1cmw6IHN0cmluZywgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHVybCA9IHVybC5yZXBsYWNlKFwiaHR0cDovL1wiLCBcImh0dHBzOi8vXCIpO1xyXG4gICAgICAgIGxldCBwcmVmaXggPSBcIj94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSxtX2xmaXQsaF9cIiArIGhlaWdodCArIFwiLHdfXCIgKyB3aWR0aCArIFwiLGxpbWl0XzAvYXV0by1vcmllbnQsMFwiO1xyXG4gICAgICAgIHJldHVybiB1cmwgKyBwcmVmaXg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBhcnJheTJzdHJpbmcoY2hhcnM6IHN0cmluZ1tdLCBrZXk6IHN0cmluZyA9IFwiXCIpOiBzdHJpbmcge1xyXG4gICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IHdvcmQ6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gY2hhcnMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaSA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB3b3JkID0gY2hhcnNbaV07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB3b3JkICs9IGtleSArIGNoYXJzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB3b3JkO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7ICREcmFnb25Bc3NldCB9IGZyb20gXCIuLi9hc3NldHMvRHJhZ29uQXNzZXRcIjtcclxuaW1wb3J0IHsgX2dMb2csIF9nV2FybiB9IGZyb20gXCIuLi9sb2cvZ0xvZ1wiO1xyXG5pbXBvcnQgeyAkU3RyaW5nVXRpbCB9IGZyb20gXCIuL1N0cmluZ1V0aWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyAkRHJhZ29uVXRpbCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGlzVmFsaWQoZGlzcGxheTogZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5IHwgZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5W10pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoZGlzcGxheSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxldCBkOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXk7XHJcbiAgICAgICAgICAgIGxldCBsZW46IG51bWJlciA9IGRpc3BsYXkubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGQgPSBkaXNwbGF5W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKGQpIHx8ICF0aGlzLmlzVmFsaWRBc3NldChkLmRyYWdvbkFzc2V0LCBkLmRyYWdvbkF0bGFzQXNzZXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghY2MuaXNWYWxpZChkaXNwbGF5KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWRBc3NldChkaXNwbGF5LmRyYWdvbkFzc2V0LCBkaXNwbGF5LmRyYWdvbkF0bGFzQXNzZXQpO1xyXG4gICAgfVxyXG4gICAgLy8gcHVibGljIHN0YXRpYyBpc1ZhbGlkKGRpc3BsYXk6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSk6IGJvb2xlYW4ge1xyXG4gICAgLy8gICAgIGlmICghZGlzcGxheSkge1xyXG4gICAgLy8gICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGlmICghZGlzcGxheS5pc1ZhbGlkKSB7XHJcbiAgICAvLyAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZEFzc2V0KGRpc3BsYXkuZHJhZ29uQXNzZXQsIGRpc3BsYXkuZHJhZ29uQXRsYXNBc3NldCk7XHJcbiAgICAvLyB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGlzVmFsaWRBc3NldChhc3NldDogZHJhZ29uQm9uZXMuRHJhZ29uQm9uZXNBc3NldCwgYXRsYXM6IGRyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXRsYXNBc3NldCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghYXNzZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWF0bGFzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhc3NldC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFhdGxhcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHRleCA9IGF0bGFzLnRleHR1cmU7XHJcbiAgICAgICAgaWYgKCF0ZXgpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRleC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZURyYWdvbihkcmFnb246ICREcmFnb25Bc3NldCwgbm9kZT86IGNjLk5vZGUsIG5hbWU/OiBzdHJpbmcpOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkge1xyXG4gICAgICAgIHZhciBub2RlOiBjYy5Ob2RlID0gY2MuaXNWYWxpZChub2RlKSA/IG5vZGUgOiBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIG5hbWUgJiYgKG5vZGUubmFtZSA9IG5hbWUpO1xyXG4gICAgICAgIHZhciBkOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXk7XHJcbiAgICAgICAgZCA9IG5vZGUuZ2V0Q29tcG9uZW50KGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSk7XHJcbiAgICAgICAgaWYgKGQpIHtcclxuICAgICAgICAgICAgJERyYWdvblV0aWwuZGVzdHJveURyYWdvbihkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBkID0gbm9kZS5hZGRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJERyYWdvblV0aWwuaW5zdGFsbChkLCBkcmFnb24pO1xyXG4gICAgICAgIHJldHVybiBkO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBkZXN0cm95RHJhZ29uKGRpc3BsYXk6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChkaXNwbGF5KSB7XHJcbiAgICAgICAgICAgIGRpc3BsYXkuZHJhZ29uQXNzZXQgPSBudWxsO1xyXG4gICAgICAgICAgICBkaXNwbGF5LmFybWF0dXJlTmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGRpc3BsYXkuYW5pbWF0aW9uTmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGRpc3BsYXkuZHJhZ29uQXRsYXNBc3NldCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBpbnN0YWxsKGRpc3BsYXk6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSwgZHJhZ29uOiAkRHJhZ29uQXNzZXQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoZGlzcGxheSAmJiBkaXNwbGF5LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95RHJhZ29uKGRpc3BsYXkpO1xyXG4gICAgICAgICAgICBpZiAoZHJhZ29uICYmIGRyYWdvbi5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZE5vZGU6IGNjLk5vZGUgPSBkaXNwbGF5Lm5vZGU7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5LmRyYWdvbkFzc2V0ID0gZHJhZ29uLmFzc2V0O1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheS5kcmFnb25BdGxhc0Fzc2V0ID0gZHJhZ29uLmF0bGFzO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheS5wcmVtdWx0aXBsaWVkQWxwaGEgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLnN5cy5pc05hdGl2ZSAmJiBkcmFnb24uYXNzZXQuZHJhZ29uQm9uZXNKc29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFybWF0dXJlID0gSlNPTi5wYXJzZShkcmFnb24uYXNzZXQuZHJhZ29uQm9uZXNKc29uKS5hcm1hdHVyZVswXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYXJtYXR1cmUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFhYmI6IGFueSA9IGFybWF0dXJlLmFhYmI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGROb2RlICYmIGFhYmIgJiYgZE5vZGUuc2V0Q29udGVudFNpemUoYWFiYi53aWR0aCwgYWFiYi5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBhbmltYXRpb246IGFueSA9IEpTT04ucGFyc2UoZHJhZ29uLmFzc2V0LmRyYWdvbkJvbmVzSnNvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uICYmIGFuaW1hdGlvbi5hcm1hdHVyZSAmJiBhbmltYXRpb24uYXJtYXR1cmUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheS5hcm1hdHVyZU5hbWUgPSBhbmltYXRpb24uYXJtYXR1cmVbMF0ubmFtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgcGxheShkaXNwbGF5OiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXksIGFuaW1hdGlvbk5hbWU/OiBzdHJpbmcsIHBsYXlUaW1lPzogbnVtYmVyKTogZHJhZ29uQm9uZXMuQW5pbWF0aW9uU3RhdGUge1xyXG5cclxuICAgICAgICBpZiAoZGlzcGxheSA9PSBudWxsIHx8ICFkaXNwbGF5LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgX2dXYXJuKFwi5pKt5pS+5a+56LGh6Z2e5rOVIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkaXNwbGF5W1wiX2NhY2hlTW9kZVwiXSAhPSBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkuQW5pbWF0aW9uQ2FjaGVNb2RlLlJFQUxUSU1FKSB7XHJcbiAgICAgICAgICAgIF9nV2FybihcIuW9k+WJjemdnuazlWRpc3BsYXnvvJpcIiArIGRpc3BsYXkubm9kZS5uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpc3BsYXkuZHJhZ29uQXNzZXQgPT0gbnVsbCB8fCAhZGlzcGxheS5kcmFnb25Bc3NldC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIF9nV2FybihcIuW9k+WJjemdnuazlWRyYWdvbkFzc2V077yaXCIgKyBkaXNwbGF5Lm5vZGUubmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRpc3BsYXkuZHJhZ29uQXRsYXNBc3NldCA9PSBudWxsIHx8ICFkaXNwbGF5LmRyYWdvbkF0bGFzQXNzZXQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBfZ1dhcm4oXCLlvZPliY3pnZ7ms5VkcmFnb25BdGxhc0Fzc2V077yaXCIgKyBkaXNwbGF5Lm5vZGUubmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGFzc2V0OiBkcmFnb25Cb25lcy5EcmFnb25Cb25lc0Fzc2V0ID0gZGlzcGxheS5kcmFnb25Bc3NldDtcclxuICAgICAgICB2YXIgYW5pbWF0aW9uOiBhbnkgPSBKU09OLnBhcnNlKGFzc2V0LmRyYWdvbkJvbmVzSnNvbik7XHJcbiAgICAgICAgcGxheVRpbWUgPSBwbGF5VGltZSA/IHBsYXlUaW1lIDogMDtcclxuICAgICAgICBpZiAoYW5pbWF0aW9uICYmIGFuaW1hdGlvbi5hcm1hdHVyZSAmJiBhbmltYXRpb24uYXJtYXR1cmUubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGlmICghJFN0cmluZ1V0aWwuaXNWYWxpZChkaXNwbGF5LmFybWF0dXJlTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIGRpc3BsYXkuYXJtYXR1cmVOYW1lID0gYW5pbWF0aW9uLmFybWF0dXJlWzBdLm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGFuaW1hdGlvbk5hbWUgPT0gbnVsbCB8fCBhbmltYXRpb25OYW1lID09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbmlzOiBhbnkgPSBhbmltYXRpb24uYXJtYXR1cmVbMF0uYW5pbWF0aW9uO1xyXG4gICAgICAgICAgICAgICAgYW5pbWF0aW9uTmFtZSA9IGFuaXNbMF07XHJcbiAgICAgICAgICAgICAgICBpZiAoISRTdHJpbmdVdGlsLmlzVmFsaWQoYW5pbWF0aW9uTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbmltYXRpb25OYW1lID0gYW5pbWF0aW9uTmFtZVtcIm5hbWVcIl07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCRTdHJpbmdVdGlsLmlzVmFsaWQoYW5pbWF0aW9uTmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkaXNwbGF5LnBsYXlBbmltYXRpb24oYW5pbWF0aW9uTmFtZSwgcGxheVRpbWUpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgX2dMb2coXCLliqjnlLvmkq3mlL7lkI3pnZ7ms5U6XCIsIGFuaW1hdGlvbk5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgX2dMb2cgfSBmcm9tIFwiLi4vbG9nL2dMb2dcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyAkVXRpbHMge1xyXG4gICAgc3RhdGljIHN0YXJ0KGZ1bjogRnVuY3Rpb24sIHRhcmdldD86IGFueSwgcGFyYW1zPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGZ1bikge1xyXG4gICAgICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgY2MuQ29tcG9uZW50IHx8IHRhcmdldCBpbnN0YW5jZW9mIGNjLk5vZGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0LmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcGFyYW1zID0gKHBhcmFtcyBpbnN0YW5jZW9mIEFycmF5KSA/IHBhcmFtcyA6IFtwYXJhbXNdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmdW4uYXBwbHkodGFyZ2V0LCBwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW4uY2FsbCh0YXJnZXQsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/oioLngrnlt7LooqvplIDmr4HvvIzml6DpnIDlm57osINcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhcmFtcyA9IChwYXJhbXMgaW5zdGFuY2VvZiBBcnJheSkgPyBwYXJhbXMgOiBbcGFyYW1zXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmdW4uYXBwbHkodGFyZ2V0LCBwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1bi5jYWxsKHRhcmdldCwgcGFyYW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZ1bi5jYWxsKHRhcmdldCwgcGFyYW1zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyB0aHJvd0Vycm9yKCk6IHZvaWQge1xyXG4gICAgICAgIHRocm93IF9nTG9nKFwiRnVuVXRpbCBFcnJvciFcIik7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIEpzb25EZWVwQ29weShwYXJhbTogYW55KTogYW55IHtcclxuICAgICAgICBpZiAocGFyYW0gPT0gbnVsbCB8fCBwYXJhbSA9PSB1bmRlZmluZWQpIHBhcmFtID0ge307XHJcbiAgICAgICAgaWYgKHR5cGVvZiAocGFyYW0pID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcmFtO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwYXJhbSkpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzICRHcmFwaFV0aWwge1xyXG5cclxuICAgIC8v55+p5b2i5Zub6KeSXHJcbiAgICAvL+W9k+WJjeenu+WKqOeahOebruagh+eCuVxyXG4gICAgcHVibGljIHN0YXRpYyBhbmdsZUxpYjogbnVtYmVyW11bXSA9IFtcclxuICAgICAgICBbTWF0aC5zaW4oMCAqIE1hdGguUEkgLyAxODApLCBNYXRoLmNvcygwICogTWF0aC5QSSAvIDE4MCldLCAvLzBcclxuICAgICAgICBbTWF0aC5zaW4oNDUgKiBNYXRoLlBJIC8gMTgwKSwgTWF0aC5jb3MoNDUgKiBNYXRoLlBJIC8gMTgwKV0sIC8vMVxyXG4gICAgICAgIFtNYXRoLnNpbig5MCAqIE1hdGguUEkgLyAxODApLCBNYXRoLmNvcyg5MCAqIE1hdGguUEkgLyAxODApXSwgIC8vMlxyXG4gICAgICAgIFtNYXRoLnNpbigxMzUgKiBNYXRoLlBJIC8gMTgwKSwgTWF0aC5jb3MoMTM1ICogTWF0aC5QSSAvIDE4MCldLC8vM1xyXG4gICAgICAgIFtNYXRoLnNpbigxODAgKiBNYXRoLlBJIC8gMTgwKSwgTWF0aC5jb3MoMTgwICogTWF0aC5QSSAvIDE4MCldLC8vNFxyXG4gICAgICAgIFtNYXRoLnNpbigyMjUgKiBNYXRoLlBJIC8gMTgwKSwgTWF0aC5jb3MoMjI1ICogTWF0aC5QSSAvIDE4MCldLC8vNVxyXG4gICAgICAgIFtNYXRoLnNpbigyNzAgKiBNYXRoLlBJIC8gMTgwKSwgTWF0aC5jb3MoMjcwICogTWF0aC5QSSAvIDE4MCldLC8vNlxyXG4gICAgICAgIFtNYXRoLnNpbigzMTUgKiBNYXRoLlBJIC8gMTgwKSwgTWF0aC5jb3MoMzE1ICogTWF0aC5QSSAvIDE4MCldLC8vN1xyXG4gICAgXTtcclxuICAgIC8qKlxyXG4gICAgICog5Yib5bu656m66IqC54K5XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgY3JlYXRlRW1wdHkoKTogY2MuVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBjYy5WZWMyKDAsIDApO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgY29sbGlkZXJOb09mZmVjdChwb2x5Z29uOiBjYy5Qb2x5Z29uQ29sbGlkZXIpOiB2b2lkIHtcclxuICAgICAgICBwb2x5Z29uLndvcmxkLnBvaW50cy5mb3JFYWNoKCh2YWx1ZTogY2MuVmVjMiwgaW5kZXg6IG51bWJlciwgYXJyYXk6IGNjLlZlYzJbXSkgPT4ge1xyXG4gICAgICAgICAgICB2YWx1ZS5hZGQocG9seWdvbi5vZmZzZXQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHBvbHlnb24ub2Zmc2V0ID0gbmV3IGNjLlZlYzIoMCwgMCk7XHJcbiAgICB9XHJcbiAgICAvL+eisOaSnlxyXG4gICAgcHVibGljIHN0YXRpYyBoaXRUZXN0KHBvczogY2MuVmVjMiwgY29sOiBjYy5Db2xsaWRlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChjb2wgPT0gbnVsbCB8fCBwb3MgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjYW1lcmFPZmY6IGNjLlZlYzIgPSBjYy5DYW1lcmEubWFpbi5ub2RlLmdldFBvc2l0aW9uKCk7XHJcbiAgICAgICAgcG9zID0gcG9zLmFkZChjYW1lcmFPZmYpO1xyXG4gICAgICAgIHBvcyA9IGNvbC5ub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHBvcyk7XHJcbiAgICAgICAgaWYgKGNvbCBpbnN0YW5jZW9mIGNjLlBvbHlnb25Db2xsaWRlcikge1xyXG4gICAgICAgICAgICBwb3MgPSBwb3Muc3ViKGNvbC5vZmZzZXQpO1xyXG4gICAgICAgICAgICByZXR1cm4gY2MuSW50ZXJzZWN0aW9uLnBvaW50SW5Qb2x5Z29uKHBvcywgY29sLnBvaW50cyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChjb2wgaW5zdGFuY2VvZiBjYy5DaXJjbGVDb2xsaWRlcikge1xyXG4gICAgICAgICAgICBwb3MgPSBwb3Muc3ViKGNvbC5vZmZzZXQpO1xyXG4gICAgICAgICAgICBpZiAocG9zLnggKiBwb3MueCArIHBvcy55ICogcG9zLnkgPCBjb2wucmFkaXVzICogY29sLnJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKGNvbCBpbnN0YW5jZW9mIGNjLkJveENvbGxpZGVyKSB7XHJcbiAgICAgICAgICAgIHBvcyA9IHBvcy5zdWIoY29sLm9mZnNldCk7XHJcbiAgICAgICAgICAgIC8vIGNvbnZlcnRXb3JsZFNwYWNlQVJcclxuICAgICAgICAgICAgLy8gcmV0dXJuIGNjLkludGVyc2VjdGlvbi5wb2ludEluUG9seWdvbihwb3MsIGNvbC5wb2ludHMpO1xyXG4gICAgICAgICAgICBwb3MueCArPSBjb2wuc2l6ZS53aWR0aCAvIDI7XHJcbiAgICAgICAgICAgIHBvcy55ICs9IGNvbC5zaXplLmhlaWdodCAvIDI7XHJcbiAgICAgICAgICAgIGlmIChwb3MueCA+IDAgJiYgcG9zLnggPCBjb2wuc2l6ZS53aWR0aCAmJiBwb3MueSA+IDAgJiYgcG9zLnkgPCBjb2wuc2l6ZS5oZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzcXVhcmVEaXMoeDE6IG51bWJlciwgeTE6IG51bWJlciwgeDI6IG51bWJlciwgeTI6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIHR4OiBudW1iZXIgPSB4MSAtIHgyO1xyXG4gICAgICAgIHZhciB0eTogbnVtYmVyID0geTEgLSB5MjtcclxuICAgICAgICByZXR1cm4gdHggKiB0eCArIHR5ICogdHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBnZXRBbmdsZSh4MTogbnVtYmVyLCB5MTogbnVtYmVyLCB4MjogbnVtYmVyLCB5MjogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgYmVnaW4gPSBjYy52Mih4MSwgeTEpO1xyXG4gICAgICAgIHZhciBlbmQgPSBjYy52Mih4MiwgeTIpO1xyXG4gICAgICAgIHZhciBkaXIgPSBlbmQuc3ViKGJlZ2luKTtcclxuICAgICAgICBpZiAoZGlyLnggPT0gMCAmJiBkaXIueSA9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAzNjA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBhbmdsZSA9IGRpci5zaWduQW5nbGUoY2MudjIoMCwgMSkpO1xyXG4gICAgICAgIHZhciBkZWdyZWUgPSBhbmdsZSAvIE1hdGguUEkgKiAxODA7XHJcbiAgICAgICAgcmV0dXJuIGRlZ3JlZTtcclxuICAgIH1cclxuXHJcbiAgICAvL+eCueWHu+WdkOagh+i9rOaNouaIkOS4uuWxheS4reWdkOagh1xyXG4gICAgc3RhdGljIGNvbnZlcnRUb3VjaENlbnRlcihldnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpOiBjYy5WZWMyIHtcclxuICAgICAgICB2YXIgbm9kZTogY2MuTm9kZSA9IGV2dC50YXJnZXQ7XHJcbiAgICAgICAgdmFyIHBvczogY2MuVmVjMiA9IG5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKGV2dC5nZXRMb2NhdGlvbigpKTtcclxuICAgICAgICBwb3Muc3ViKG5ldyBjYy5WZWMyKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCwgY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCksIHBvcyk7XHJcbiAgICAgICAgcmV0dXJuIHBvcztcclxuICAgIH1cclxufSIsImltcG9ydCB7ICREcmFnb25Bc3NldCB9IGZyb20gXCIuLi9hc3NldHMvRHJhZ29uQXNzZXRcIjtcclxuaW1wb3J0IHsgX2dMb2cgfSBmcm9tIFwiLi4vbG9nL2dMb2dcIjtcclxuaW1wb3J0IHsgJERyYWdvblV0aWwgfSBmcm9tIFwiLi9EcmFnb25VdGlsXCI7XHJcbmltcG9ydCB7ICRHcmFwaFV0aWwgfSBmcm9tIFwiLi9HcmFwaFV0aWxcIjtcclxuaW1wb3J0IHsgJFN0cmluZ1V0aWwgfSBmcm9tIFwiLi9TdHJpbmdVdGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgJE5vZGVVdGlsIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgaXNWYWxpZChub2RlOiBjYy5Ob2RlIHwgY2MuTm9kZVtdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKG5vZGUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBub2RlLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQobm9kZVtpXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5pc1ZhbGlkKG5vZGUpO1xyXG4gICAgfVxyXG4gICAgLy8gaWYgKCFub2RlKSB7XHJcbiAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gaWYgKCFub2RlLmlzVmFsaWQpIHtcclxuICAgIC8vICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAvLyB9XHJcbiAgICAvLyByZXR1cm4gdHJ1ZTtcclxuICAgIHB1YmxpYyBzdGF0aWMgaXNWYWxpZENvbXBvbmVudChjb206IGNjLkNvbXBvbmVudCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBjYy5pc1ZhbGlkKGNvbSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZU5vZGUobmFtZTogc3RyaW5nLCBwYXJlbnQ6IGNjLk5vZGUpOiBjYy5Ob2RlIHtcclxuICAgICAgICB2YXIgbm9kZTogY2MuTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgbm9kZS5uYW1lID0gbmFtZTtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKHBhcmVudCkpIHtcclxuICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQocGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZU5vZGVCeVByZShwcmU6IGNjLlByZWZhYiwgcGFyZW50PzogY2MuTm9kZSwgbmFtZT86IHN0cmluZyk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmIChuYW1lICYmIHRoaXMuaXNWYWxpZChwYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnQuZ2V0Q2hpbGRCeU5hbWUobmFtZSkpIHtcclxuICAgICAgICAgICAgICAgIF9nTG9nKFwi5b2T5YmN6IqC54K5OlwiICsgcGFyZW50Lm5hbWUsIFwi5bey5pyJ5a+56LGhOlwiICsgcHJlLm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBub2RlOiBjYy5Ob2RlID0gY2MuaW5zdGFudGlhdGUocHJlKTtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKHBhcmVudCkpIHtcclxuICAgICAgICAgICAgbm9kZS5zZXRQYXJlbnQocGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCRTdHJpbmdVdGlsLmlzVmFsaWQobmFtZSkpIHtcclxuICAgICAgICAgICAgbm9kZS5uYW1lID0gbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZUNvbXBvbmVudChjbGFzc05hbWU6IGFueSwgbm9kZT86IGNjLk5vZGUsIG5hbWU/OiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIHZhciBub2RlOiBjYy5Ob2RlID0gdGhpcy5pc1ZhbGlkKG5vZGUpID8gbm9kZSA6IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgaWYgKCRTdHJpbmdVdGlsLmlzVmFsaWQobmFtZSkpIHtcclxuICAgICAgICAgICAgbm9kZS5uYW1lID0gbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGMgPSBub2RlLmdldENvbXBvbmVudChjbGFzc05hbWUpO1xyXG4gICAgICAgIGlmICghYykge1xyXG4gICAgICAgICAgICBjID0gbm9kZS5hZGRDb21wb25lbnQoY2xhc3NOYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZVNwcml0ZSh0ZXg6IGNjLlRleHR1cmUyRCwgbm9kZT86IGNjLk5vZGUsIG5hbWU/OiBzdHJpbmcpOiBjYy5TcHJpdGUge1xyXG4gICAgICAgIHZhciBub2RlOiBjYy5Ob2RlID0gdGhpcy5pc1ZhbGlkKG5vZGUpID8gbm9kZSA6IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgbmFtZSAmJiAobm9kZS5uYW1lID0gbmFtZSk7XHJcbiAgICAgICAgdmFyIHM6IGNjLlNwcml0ZTtcclxuICAgICAgICBzID0gbm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBpZiAoIXMpIHtcclxuICAgICAgICAgICAgcyA9IG5vZGUuYWRkQ29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHMuc3ByaXRlRnJhbWUgPSBuZXcgY2MuU3ByaXRlRnJhbWUodGV4KTtcclxuICAgICAgICByZXR1cm4gcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZURyYWdvbihkcmFnb246ICREcmFnb25Bc3NldCwgbm9kZT86IGNjLk5vZGUsIG5hbWU/OiBzdHJpbmcpOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkge1xyXG4gICAgICAgIHJldHVybiAkRHJhZ29uVXRpbC5jcmVhdGVEcmFnb24oZHJhZ29uLCBub2RlLCBuYW1lKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog6I635Y+W6IqC54K55Zyo55uu5qCH6IqC54K577yI5a655Zmo77yJ5LiL55qE55u45a+55L2N572uXHJcbiAgICAqIEBwYXJhbSBub2RlIOiKgueCuVxyXG4gICAgKiBAcGFyYW0gdGFyZ2V0IOebruagh+iKgueCue+8iOWuueWZqO+8iVxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0UmVsYXRpdmVQb3NpdGlvbihub2RlOiBjYy5Ob2RlLCB0YXJnZXQ6IGNjLk5vZGUpOiBjYy5WZWMyIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZChub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IGNjLlZlYzIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHdvcmxkUG9zID0gbm9kZS5nZXRQYXJlbnQoKS5jb252ZXJ0VG9Xb3JsZFNwYWNlQVIobm9kZS5nZXRQb3NpdGlvbigpKTtcclxuICAgICAgICBsZXQgdGFyZ2V0UG9zID0gdGFyZ2V0LmNvbnZlcnRUb05vZGVTcGFjZUFSKHdvcmxkUG9zKTtcclxuICAgICAgICByZXR1cm4gdGFyZ2V0UG9zO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uOiDpgJrov4duYW1l6I635Y+W6IqC54K5XHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxyXG4gICAgICogQHBhcmFtIHtjY30gbm9kZVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldENoaWxkQnlOYW1lKG5hbWU6IHN0cmluZywgbm9kZTogY2MuTm9kZSk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKG5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hpbGQ6IGNjLk5vZGUgPSBub2RlLmdldENoaWxkQnlOYW1lKG5hbWUpO1xyXG4gICAgICAgIGlmIChjaGlsZCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGNoaWxkID0gbmV3IGNjLk5vZGUobmFtZSk7XHJcbiAgICAgICAgICAgIG5vZGUuYWRkQ2hpbGQoY2hpbGQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGhhc0NoaWxkQnlOYW1lKG5hbWU6IHN0cmluZywgbm9kZTogY2MuTm9kZSk6IGNjLk5vZGUge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKG5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgY2hpbGQ6IGNjLk5vZGUgPSBub2RlLmdldENoaWxkQnlOYW1lKG5hbWUpO1xyXG4gICAgICAgIGlmIChjaGlsZCA9PSBudWxsIHx8ICFjaGlsZC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IOmZkOWItuiKgueCueWkp+Wwj1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIHJlc3RyaWN0UmVjdChcclxuICAgICAgICBub2RlOiBjYy5Ob2RlLFxyXG4gICAgICAgIG1heFdpZHRoOiBudW1iZXIsXHJcbiAgICAgICAgbWF4SGVpZ2h0OiBudW1iZXJcclxuICAgICk6IHZvaWQge1xyXG4gICAgICAgIGxldCBzY3JlZW5SYXRpbyA9IG5vZGUuaGVpZ2h0IC8gbm9kZS53aWR0aDtcclxuICAgICAgICBsZXQgZGVzaWduUmF0aW8gPSBtYXhIZWlnaHQgLyBtYXhXaWR0aDtcclxuXHJcbiAgICAgICAgaWYgKHNjcmVlblJhdGlvID49IGRlc2lnblJhdGlvKSB7XHJcbiAgICAgICAgICAgIGxldCBzY2FsZSA9IG1heEhlaWdodCAvIG5vZGUuaGVpZ2h0O1xyXG4gICAgICAgICAgICBub2RlLnNjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IHNjYWxlID0gbWF4V2lkdGggLyBub2RlLndpZHRoO1xyXG4gICAgICAgICAgICBub2RlLnNjYWxlID0gc2NhbGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uOiDorr7nva7oioLngrnpopzoibLlgLxcclxuICAgICAqIEBwYXJhbSB7Y2N9IG5vZGVcclxuICAgICAqIEBwYXJhbSB7Y2N9IGNvbG9yXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0Tm9kZUNvbG9yKG5vZGU6IGNjLk5vZGUsIGNvbG9yOiBjYy5Db2xvcik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKG5vZGUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFub2RlLmNvbG9yLmVxdWFscyhjb2xvcikpIHtcclxuICAgICAgICAgICAgbm9kZS5jb2xvciA9IGNvbG9yO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIHNldFBhcmVudChub2RlOiBjYy5Ob2RlLCBwYXJlbnQ6IGNjLk5vZGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoJE5vZGVVdGlsLmlzVmFsaWQobm9kZSkgJiYgJE5vZGVVdGlsLmlzVmFsaWQocGFyZW50KSkge1xyXG4gICAgICAgICAgICBub2RlLnNldFBhcmVudChwYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldFN0YWdlUG9pbnQobm9kZTogY2MuTm9kZSwgcG9zOiBjYy5WZWMyKTogY2MuVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIG5vZGUuY29udmVydFRvV29ybGRTcGFjZUFSKHBvcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwb3Mg5b+F6aG75piv5LiW55WM5Z2Q5qCH5L2T57O75LiL55qE5Z2Q5qCHXHJcbiAgICAgKiBAcGFyYW0gbm9kZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBoaXRUZXN0KHBvczogY2MuVmVjMiwgbm9kZTogY2MuTm9kZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBjb2xsaWRlcnM6IGNjLkNvbGxpZGVyW10gPSBub2RlLmdldENvbXBvbmVudHMoY2MuQ29sbGlkZXIpO1xyXG4gICAgICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBjb2xsaWRlcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbCA9IGNvbGxpZGVyc1tpbmRleF07XHJcbiAgICAgICAgICAgIGlmIChjb2wpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkR3JhcGhVdGlsLmhpdFRlc3QocG9zLCBjb2wpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBub2RlW1wiX2hpdFRlc3RcIl0ocG9zKTtcclxuICAgIH1cclxuXHJcbn0iLCJleHBvcnQgY2xhc3MgJE51bVV0aWwge1xyXG4gICAgc3RhdGljIGdldFZhbGlkKG51bTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoaXNOYU4obnVtKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bTtcclxuICAgIH1cclxufSIsImltcG9ydCB7ICROb2RlVXRpbCB9IGZyb20gXCIuL05vZGVVdGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgJFNwcml0ZVV0aWwge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgaXNWYWxpZCh0ZXg6IGNjLlNwcml0ZSB8IGNjLlNwcml0ZVtdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRleCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxldCBsZW46IG51bWJlciA9IHRleC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKHRleFtpXSkpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5pc1ZhbGlkKHRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVOb2RlRnJhbWUoXHJcbiAgICAgICAgdGV4OiBjYy5TcHJpdGVGcmFtZSB8IGNjLlRleHR1cmUyRCxcclxuICAgICAgICBub2RlPzogY2MuTm9kZVxyXG4gICAgKTogY2MuTm9kZSB7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUgPyBub2RlIDogbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICB2YXIgZnJhbWU6IGNjLlNwcml0ZUZyYW1lID1cclxuICAgICAgICAgICAgdGV4IGluc3RhbmNlb2YgY2MuU3ByaXRlRnJhbWUgPyB0ZXggOiBuZXcgY2MuU3ByaXRlRnJhbWUodGV4KTtcclxuICAgICAgICB2YXIgc3ByaXRlOiBjYy5TcHJpdGUgPSBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGlmIChzcHJpdGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzcHJpdGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzcHJpdGUuc3JjQmxlbmRGYWN0b3IgPSBjYy5tYWNyby5CbGVuZEZhY3Rvci5PTkU7XHJcbiAgICAgICAgc3ByaXRlLnNwcml0ZUZyYW1lID0gZnJhbWU7XHJcbiAgICAgICAgcmV0dXJuIG5vZGU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBjcmVhdGVTcHJpdGUoXHJcbiAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIHBhcmVudDogY2MuTm9kZSxcclxuICAgICAgICB0ZXg6IGNjLlNwcml0ZUZyYW1lIHwgY2MuVGV4dHVyZTJELFxyXG4gICAgICAgIHg6IG51bWJlciA9IDAsXHJcbiAgICAgICAgeTogbnVtYmVyID0gMFxyXG4gICAgKTogY2MuU3ByaXRlIHtcclxuICAgICAgICB2YXIgbm9kZTogY2MuTm9kZSA9ICROb2RlVXRpbC5nZXRDaGlsZEJ5TmFtZShuYW1lLCBwYXJlbnQpO1xyXG4gICAgICAgIGlmIChub2RlID09IG51bGwpIHtcclxuICAgICAgICAgICAgbm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgIG5vZGUubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgIHBhcmVudCAmJiBub2RlLnNldFBhcmVudChwYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc3ByaXRlOiBjYy5TcHJpdGUgPSBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGlmIChzcHJpdGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzcHJpdGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBzcHJpdGUuc3JjQmxlbmRGYWN0b3IgPSBjYy5tYWNyby5CbGVuZEZhY3Rvci5PTkU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmcmFtZTogY2MuU3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICB0ZXggaW5zdGFuY2VvZiBjYy5TcHJpdGVGcmFtZSA/IHRleCA6IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXgpO1xyXG4gICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IGZyYW1lO1xyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24oeCwgeSk7XHJcbiAgICAgICAgcmV0dXJuIHNwcml0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGNyZWF0ZU9uZU5vZGUoXHJcbiAgICAgICAgbmFtZTogc3RyaW5nLFxyXG4gICAgICAgIHBhcmVudDogY2MuTm9kZSxcclxuICAgICAgICB0ZXg6IGNjLlNwcml0ZUZyYW1lIHwgY2MuVGV4dHVyZTJELFxyXG4gICAgICAgIGluZGV4OiBudW1iZXIgPSAtMSxcclxuICAgICAgICB4OiBudW1iZXIgPSAwLFxyXG4gICAgICAgIHk6IG51bWJlciA9IDBcclxuICAgICk6IGNjLlNwcml0ZSB7XHJcbiAgICAgICAgdmFyIG5vZGU6IGNjLk5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIHBhcmVudC5hZGRDaGlsZChub2RlKTtcclxuICAgICAgICB2YXIgc3ByaXRlOiBjYy5TcHJpdGUgPSBub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGlmIChzcHJpdGUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBzcHJpdGUgPSBub2RlLmFkZENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgICAgICBzcHJpdGUuc3JjQmxlbmRGYWN0b3IgPSBjYy5tYWNyby5CbGVuZEZhY3Rvci5PTkU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBmcmFtZTogY2MuU3ByaXRlRnJhbWUgPVxyXG4gICAgICAgICAgICB0ZXggaW5zdGFuY2VvZiBjYy5TcHJpdGVGcmFtZSA/IHRleCA6IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXgpO1xyXG4gICAgICAgIHNwcml0ZS5zcHJpdGVGcmFtZSA9IGZyYW1lO1xyXG4gICAgICAgIG5vZGUuc2V0UG9zaXRpb24oeCwgeSk7XHJcbiAgICAgICAgbm9kZS56SW5kZXggPSBpbmRleDtcclxuICAgICAgICByZXR1cm4gc3ByaXRlO1xyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBjbGFzcyAkVGV4dHVyZVV0aWwge1xyXG4gICAgcHVibGljIHN0YXRpYyBpc1ZhbGlkKHRleDogY2MuVGV4dHVyZTJEIHwgY2MuVGV4dHVyZTJEW10pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGV4IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgbGV0IGk6IG51bWJlcjtcclxuICAgICAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gdGV4Lmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNjLmlzVmFsaWQodGV4W2ldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNjLmlzVmFsaWQodGV4KTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBmb3JtYXQodGV4OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGV4KSB7XHJcbiAgICAgICAgICAgIGlmICh0ZXggaW5zdGFuY2VvZiBjYy5UZXh0dXJlMkQpIHtcclxuICAgICAgICAgICAgICAgIHRleC5zZXRQcmVtdWx0aXBseUFscGhhKHRydWUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRleCBpbnN0YW5jZW9mIGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSkge1xyXG4gICAgICAgICAgICAgICAgdGV4LnByZW11bHRpcGxpZWRBbHBoYSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGV4IGluc3RhbmNlb2YgY2MuU3ByaXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0ZXguc3JjQmxlbmRGYWN0b3IgPSBjYy5tYWNyby5PTkU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGV4IGluc3RhbmNlb2YgY2MuTm9kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtYXQodGV4LmdldENvbXBvbmVudChjYy5TcHJpdGUpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0KHRleC5nZXRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGV4IGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIHRleC5mb3JFYWNoKCh2YWx1ZTogYW55LCBpbmRleDogbnVtYmVyLCBhcnJheTogYW55W10pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAkVGV4dHVyZVV0aWwuZm9ybWF0KHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgX2dMb2cgfSBmcm9tIFwiLi4vbG9nL2dMb2dcIjtcclxuaW1wb3J0IHsgJERyYWdvblV0aWwgfSBmcm9tIFwiLi4vdXRpbHMvRHJhZ29uVXRpbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzICREcmFnb25Bc3NldCBleHRlbmRzIGNjLkFzc2V0IHtcclxuICAgIHB1YmxpYyBhc3NldDogZHJhZ29uQm9uZXMuRHJhZ29uQm9uZXNBc3NldDtcclxuICAgIHB1YmxpYyBhdGxhczogZHJhZ29uQm9uZXMuRHJhZ29uQm9uZXNBdGxhc0Fzc2V0O1xyXG5cclxuICAgIHB1YmxpYyBkZXN0cm95KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMuYXNzZXQuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuYXRsYXMuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuYXNzZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYXRsYXMgPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBzdXBlci5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIGFkZFJlZigpOiBjYy5Bc3NldCB7XHJcbiAgICAvLyAgICAgdGhpcy5hc3NldC5hZGRSZWYoKTtcclxuICAgIC8vICAgICB0aGlzLmF0bGFzLmFkZFJlZigpO1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzO1xyXG4gICAgLy8gfVxyXG4gICAgLy8gcHVibGljIGRlY1JlZigpOiBjYy5Bc3NldCB7XHJcbiAgICAvLyAgICAgdGhpcy5hc3NldC5kZWNSZWYoKTtcclxuICAgIC8vICAgICB0aGlzLmF0bGFzLmRlY1JlZigpO1xyXG4gICAgLy8gICAgIHJldHVybiB0aGlzO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIGluaXQoYXNzZXQ6IGRyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXNzZXQsIGF0bGFzOiBkcmFnb25Cb25lcy5EcmFnb25Cb25lc0F0bGFzQXNzZXQpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoISREcmFnb25VdGlsLmlzVmFsaWRBc3NldChhc3NldCwgYXRsYXMpKSB7XHJcbiAgICAgICAgICAgIF9nTG9nKFwi6LWE5rqQ5LiN5a2Y5Zyo5oiW5bey6KKr6ZSA5q+B77yM5peg5rOV5L2/55SoIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFzc2V0ID0gYXNzZXQ7XHJcbiAgICAgICAgdGhpcy5hdGxhcyA9IGF0bGFzO1xyXG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGluaXRSZW1vdGVBc3NldChhc3NldEFzc2V0OiBjYy5UZXh0QXNzZXQgfCBjYy5Kc29uQXNzZXQsIGF0bGFzQXNzZXQ6IGNjLlRleHRBc3NldCB8IGNjLkpzb25Bc3NldCwgdGV4OiBjYy5UZXh0dXJlMkQpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIWNjLmlzVmFsaWQodGV4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBhc3NldCA9IG5ldyBkcmFnb25Cb25lcy5EcmFnb25Cb25lc0Fzc2V0KCk7XHJcbiAgICAgICAgYXNzZXRbXCJfdXVpZFwiXSA9IGFzc2V0QXNzZXRbXCJfdXVpZFwiXTtcclxuICAgICAgICBpZiAoYXNzZXRBc3NldCBpbnN0YW5jZW9mIGNjLlRleHRBc3NldCkge1xyXG4gICAgICAgICAgICBhc3NldC5kcmFnb25Cb25lc0pzb24gPSBhc3NldEFzc2V0LnRleHQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXNzZXQuZHJhZ29uQm9uZXNKc29uID0gSlNPTi5zdHJpbmdpZnkoYXNzZXRBc3NldC5qc29uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGF0bGFzID0gbmV3IGRyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXRsYXNBc3NldCgpO1xyXG4gICAgICAgIHRleCAmJiB0ZXgud2lkdGggJiYgdGV4LmhlaWdodCAmJiB0ZXguc2V0UHJlbXVsdGlwbHlBbHBoYSh0cnVlKTtcclxuICAgICAgICBhdGxhc1tcIl91dWlkXCJdID0gYXRsYXNBc3NldFtcIl91dWlkXCJdO1xyXG4gICAgICAgIGlmIChhdGxhc0Fzc2V0IGluc3RhbmNlb2YgY2MuVGV4dEFzc2V0KSB7XHJcbiAgICAgICAgICAgIGF0bGFzLmF0bGFzSnNvbiA9IGF0bGFzQXNzZXQudGV4dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhdGxhcy5hdGxhc0pzb24gPSBKU09OLnN0cmluZ2lmeShhdGxhc0Fzc2V0Lmpzb24pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYXRsYXMudGV4dHVyZSA9IHRleDtcclxuICAgICAgICB0aGlzLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdChhc3NldCwgYXRsYXMpO1xyXG4gICAgfVxyXG4gICAgaW5pdEJ5QXNzZXQoYXNzZXRzOiBjYy5Bc3NldFtdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIGk6IG51bWJlcjtcclxuICAgICAgICB2YXIgYXN0OiBjYy5Bc3NldDtcclxuICAgICAgICB2YXIgdGV4OiBjYy5UZXh0dXJlMkQ7XHJcbiAgICAgICAgdmFyIGFzc2V0OiBkcmFnb25Cb25lcy5EcmFnb25Cb25lc0Fzc2V0O1xyXG4gICAgICAgIHZhciBhdGxhczogZHJhZ29uQm9uZXMuRHJhZ29uQm9uZXNBdGxhc0Fzc2V0O1xyXG4gICAgICAgIHZhciBsZW46IG51bWJlciA9IGFzc2V0cy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGFzdCA9IGFzc2V0c1tpXTtcclxuICAgICAgICAgICAgaWYgKGFzdCBpbnN0YW5jZW9mIGRyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXNzZXQpIHtcclxuICAgICAgICAgICAgICAgIGFzc2V0ID0gYXN0O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFzdCBpbnN0YW5jZW9mIGRyYWdvbkJvbmVzLkRyYWdvbkJvbmVzQXRsYXNBc3NldCkge1xyXG4gICAgICAgICAgICAgICAgYXRsYXMgPSBhc3Q7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXN0IGluc3RhbmNlb2YgY2MuVGV4dHVyZTJEKSB7XHJcbiAgICAgICAgICAgICAgICBhc3QgJiYgYXN0LndpZHRoICYmIGFzdC5oZWlnaHQgJiYgYXN0LnNldFByZW11bHRpcGx5QWxwaGEodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB0ZXggPSBhc3Q7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYXN0IGluc3RhbmNlb2YgY2MuSnNvbkFzc2V0KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXN0Lm5hdGl2ZVVybC5pbmRleE9mKFwic2tlXCIpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXNzZXQgPSBuZXcgZHJhZ29uQm9uZXMuRHJhZ29uQm9uZXNBc3NldCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc2V0LmRyYWdvbkJvbmVzSnNvbiA9IGFzdC5qc29uO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhc3QubmF0aXZlVXJsLmluZGV4T2YoXCJ0ZXhcIikgIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBhdGxhcyA9IG5ldyBkcmFnb25Cb25lcy5EcmFnb25Cb25lc0F0bGFzQXNzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBhdGxhcy5hdGxhc0pzb24gPSBhc3QuanNvbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNjLmlzVmFsaWQodGV4KSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhdGxhcykge1xyXG4gICAgICAgICAgICBpZiAoYXRsYXMudGV4dHVyZSA9PSBudWxsIHx8ICFhdGxhcy50ZXh0dXJlLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIGF0bGFzLnRleHR1cmUgPSB0ZXg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWF0bGFzLnRleHR1cmUuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF0bGFzLmlzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGF0bGFzLnRleHR1cmUgPSB0ZXg7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5pdChhc3NldCwgYXRsYXMpO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGNsYXNzICREcmFnb25Bc3NldFVybCB7XHJcbiAgICAvLzEs6LWw6LevLDM66K+06K+d77yM56uZ56uLXHJcbiAgICBhY3Rpb246IHN0cmluZztcclxuICAgIGF0bGFzSW1nOiBzdHJpbmc7XHJcbiAgICBhdGxhc0pzb246IHN0cmluZztcclxuICAgIGFzc2V0SnNvbjogc3RyaW5nO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGF0bGFzSW1nOiBzdHJpbmcsIGFzc2V0SnNvbjogc3RyaW5nLCBhdGxhc0pzb246IHN0cmluZywgYWN0aW9uOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmF0bGFzSW1nID0gYXRsYXNJbWc7XHJcbiAgICAgICAgdGhpcy5hc3NldEpzb24gPSBhc3NldEpzb247XHJcbiAgICAgICAgdGhpcy5hdGxhc0pzb24gPSBhdGxhc0pzb247XHJcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgJFJlY29yZFV0aWwge1xyXG4gICAgc3RhdGljIGlzVmFsaWQocmVjb3JkOiBSZWNvcmQ8c3RyaW5nLCBhbnk+IHwgUmVjb3JkPHN0cmluZywgYW55PltdKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHJlY29yZCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxldCBsZW46IG51bWJlciA9IHJlY29yZC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0TGVuZ3RoKHJlY29yZFtpXSkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRMZW5ndGgocmVjb3JkKSAhPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRMZW5ndGgocmVjb3JkOiBSZWNvcmQ8c3RyaW5nLCBhbnk+KTogbnVtYmVyIHtcclxuICAgICAgICBpZiAocmVjb3JkKSB7XHJcbiAgICAgICAgICAgIGxldCBjb3VudDogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gcmVjb3JkKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlY29yZCwga2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gMDtcclxuICAgIH1cclxufSIsIi8qKlxyXG4gKiDmlbDlraborqHnrpflt6XlhbfnsbtcclxuICovXHJcbmV4cG9ydCBjbGFzcyAkTWF0aFV0aWxzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW8p+W6puWItui9rOaNouS4uuinkuW6puWAvFxyXG4gICAgICogQHBhcmFtIHJhZGlhbiDlvKfluqbliLZcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0QW5nbGUocmFkaWFuOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAxODAgKiByYWRpYW4gLyBNYXRoLlBJO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6KeS5bqm5YC86L2s5o2i5Li65byn5bqm5Yi2XHJcbiAgICAgKiBAcGFyYW0gYW5nbGVcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRSYWRpYW4oYW5nbGU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIGFuZ2xlIC8gMTgwICogTWF0aC5QSTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluS4pOeCuemXtOW8p+W6plxyXG4gICAgICogQHBhcmFtIHAxWFxyXG4gICAgICogQHBhcmFtIHAxWVxyXG4gICAgICogQHBhcmFtIHAyWFxyXG4gICAgICogQHBhcmFtIHAyWVxyXG4gICAgICogQHJldHVybnMge251bWJlcn1cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRSYWRpYW4yKHAxWDogbnVtYmVyLCBwMVk6IG51bWJlciwgcDJYOiBudW1iZXIsIHAyWTogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgeGRpczogbnVtYmVyID0gcDJYIC0gcDFYO1xyXG4gICAgICAgIHZhciB5ZGlzOiBudW1iZXIgPSBwMlkgLSBwMVk7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguYXRhbjIoeWRpcywgeGRpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5bkuKTngrnpl7Tot53nprtcclxuICAgICAqIEBwYXJhbSBwMVhcclxuICAgICAqIEBwYXJhbSBwMVlcclxuICAgICAqIEBwYXJhbSBwMlhcclxuICAgICAqIEBwYXJhbSBwMllcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0RGlzdGFuY2UocDFYOiBudW1iZXIsIHAxWTogbnVtYmVyLCBwMlg6IG51bWJlciwgcDJZOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciBkaXNYOiBudW1iZXIgPSBwMlggLSBwMVg7XHJcbiAgICAgICAgdmFyIGRpc1k6IG51bWJlciA9IHAyWSAtIHAxWTtcclxuICAgICAgICB2YXIgZGlzUTogbnVtYmVyID0gZGlzWCAqIGRpc1ggKyBkaXNZICogZGlzWTtcclxuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KGRpc1EpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Yy66Ze06ZqP5py65pWwXHJcbiAgICAgKiBAcGFyYW0gbWluIOacgOWwj+WAvFxyXG4gICAgICogQHBhcmFtIG1heCDmnIDlpKflgLxcclxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9IOmaj+acuuaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIGdldF9yYW5kb21faW50ZXJ2YWwobWluOiBudW1iZXIsIG1heDogbnVtYmVyKSB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XHJcbiAgICB9XHJcbn0iLCIvKipcclxuICog5a+56LGh5a2Y5YKo5ZmoLOWPr+agueaNruWtl+espuWQjeensOWSjOWvueixoeS9nOS4uuagh+etvuWQjeadpeWtmOWCqOeahOaVsOaNri5cclxuICog5bu66K6uXCJnZXRcIuS4gOasoeWQjue8k+WtmOWlveaVsOaNruS4jeimgemikee5geS9v+eUqFwiZ2V05a+56LGha2V5XCIsXCLlrZfnrKZrZXlcIuS4jeW9seWTjVxyXG4gKiDmlK/mjIHnlKjlr7nosaHkvZzkuLprZXnlrZjlgqjmlbDmja4uXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgJERpY3RSZWNvcmQge1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLl9tYXBzID0ge307XHJcbiAgICAgICAgdGhpcy5faGFzaE1hcHMgPSB7fTtcclxuICAgICAgICB0aGlzLl9vYmpLZXlzID0gW107XHJcbiAgICAgICAgdGhpcy5fb2JqRGF0dW0gPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICAvKiog5a2X5YW46K6h5pWw5ZmoICovXHJcbiAgICBwcml2YXRlIF9jb3VudDogbnVtYmVyID0gMDtcclxuXHJcbiAgICAvKiog5a2X56ym57Si5byV5a+56LGhICovXHJcbiAgICBwcml2YXRlIF9tYXBzOiBPYmplY3Q7XHJcblxyXG4gICAgLyoqIGhhc2hDb2Rl57Si5byV5a+56LGhICovXHJcbiAgICBwcml2YXRlIF9oYXNoTWFwczogT2JqZWN0O1xyXG5cclxuICAgIC8qKiDlr7nosaHntKLlvJXmlbDnu4QgKi9cclxuICAgIHByaXZhdGUgX29iaktleXM6IEFycmF5PGFueT47XHJcblxyXG4gICAgLyoqIOWvueixoee0ouW8leaVsOe7hOWvueW6lOeahOaVsOaNriAqL1xyXG4gICAgcHJpdmF0ZSBfb2JqRGF0dW06IEFycmF5PGFueT47XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmt7vliqDmjIflrprnsbvlnovnmoTmlbDmja5cclxuICAgICAqIEBwYXJhbSBrZXkg5Y+v5Lul5piv5a+56LGh44CB5a2X56ym44CB5pWw5a2XXHJcbiAgICAgKiBAcGFyYW0gZGF0YSDku7vkvZXnsbvlnotcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFkZChrZXk6IGFueSwgZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoa2V5KSAhPSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbWFwc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3VudCsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX21hcHNba2V5XSA9IGRhdGE7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4OiBudW1iZXIgPSB0aGlzLl9vYmpLZXlzLmxhc3RJbmRleE9mKGtleSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2JqS2V5cy5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vYmpEYXR1bS5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY291bnQrKztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX29iakRhdHVtW2luZGV4XSA9IGRhdGE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDliKDpmaTmjIflrprnsbvlnovnmoTlhajpg6jmlbDmja5cclxuICAgICAqIEBwYXJhbSBrZXkgIOWPr+S7peaYr+WvueixoeOAgeWtl+espuOAgeaVsOWtl1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVsKGtleTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdmFyIGluZGV4OiBudW1iZXI7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoa2V5KSAhPSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tYXBzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9tYXBzW2tleV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3VudC0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaW5kZXggPSB0aGlzLl9vYmpLZXlzLmxhc3RJbmRleE9mKGtleSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2JqS2V5cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fb2JqRGF0dW0uc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50LS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blrZjlgqjkuK3nmoTmlbDmja4s5a+56LGh5L2c5Li6a2V55a6e6ZmF5LiK6ZyA6KaB6L+b6KGM6YGN5Y6G57Si5byV77yM5omA5Lul5Zyo5ZCM5LiA5Liq5a2X5YW45Lit5bC96YeP5LiN6KaB5re75Yqg6L+H5aSa55qEa2V55Lya5b2x5ZON5oCn6IO9LFxyXG4gICAgICog5bu66K6uZ2V05LiA5qyh5ZCO57yT5a2Y5aW95pWw5o2u5LiN6KaB6aKR57mB5L2/55SoZ2V05a+56LGha2V5LOWtl+espmtleeS4jeW9seWTjVxyXG4gICAgICogQHBhcmFtIGtleSDlj6/ku6XmmK/lr7nosaHjgIHlrZfnrKbjgIHmlbDlrZdcclxuICAgICAqIEByZXR1cm5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldChrZXk6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoa2V5KSAhPSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fbWFwc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwc1trZXldO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleDogbnVtYmVyID0gdGhpcy5fb2JqS2V5cy5sYXN0SW5kZXhPZihrZXkpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9vYmpEYXR1bVtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qOA5p+l5piv5ZCm5pyJ6K+l57G75Z6L55qE5pWw5o2u5a2Y5ZyoXHJcbiAgICAgKiBAcGFyYW0ga2V5IOWPr+S7peaYr+WvueixoeOAgeWtl+espuOAgeaVsOWtl1xyXG4gICAgICogQHJldHVyblxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaGFzKGtleTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiAoa2V5KSAhPSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXBzW2tleV0gPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIGluZGV4OiBudW1iZXIgPSB0aGlzLl9vYmpLZXlzLmxhc3RJbmRleE9mKGtleSk7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCAhPSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWtl+WFuOS4reWCqOWtmOaVsOaNrueahOS4quaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a+55a2X5YW45Lit55qE5q+P5LiA6aG55omn6KGM5Ye95pWw77yM55So6K+l5Ye95pWw5Y+v5Lul55yB5Y67Zm9y5b6q546v77yMXHJcbiAgICAgKiDlhYHorrjlm57osIPlh73mlbDkuK3liKDpmaTlvZPliY3mraPlnKjmiafooYznmoRrZXnvvIxcclxuICAgICAqIOS9huaYr+WIoOmZpOWtl+WFuOS4reeahOWFtuS7lmtleeWPr+iDveS8muWHuueOsOWwkemBjeWOhuaIlumHjeWkjemBjeWOhueahOaDheWGtS5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGZvckVhY2goY2FsbGJhY2s6IChrZXk6IGFueSwgZGF0YTogYW55KSA9PiB2b2lkLCB0aGlzT2JqZWN0OiBhbnkgPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIG5hbWUsIGFycjtcclxuICAgICAgICBmb3IgKG5hbWUgaW4gdGhpcy5fbWFwcykge1xyXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNPYmplY3QsIG5hbWUsIHRoaXMuX21hcHNbbmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKG5hbWUgaW4gdGhpcy5faGFzaE1hcHMpIHtcclxuICAgICAgICAgICAgYXJyID0gdGhpcy5faGFzaE1hcHNbbmFtZV07XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc09iamVjdCwgYXJyWzBdLCBhcnJbMV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBqOiBudW1iZXIgPSAwOyBqIDwgdGhpcy5fb2JqS2V5cy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICB2YXIga2V5OiBhbnkgPSB0aGlzLl9vYmpLZXlzW2pdO1xyXG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNPYmplY3QsIHRoaXMuX29iaktleXNbal0sIHRoaXMuX29iakRhdHVtW2pdKTtcclxuICAgICAgICAgICAgaWYgKGtleSAhPSB0aGlzLl9vYmpLZXlzW2pdKSB7XHJcbiAgICAgICAgICAgICAgICBqLS07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blrZflhbjkuK3lgqjlrZhrZXnlkoxkYXRh55qE6Zif5YiXXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZWxlbWVudHMoKTogQXJyYXk8eyBrZXk6IGFueTsgZGF0YTogYW55IH0+IHtcclxuICAgICAgICB2YXIgX2xpc3Q6IEFycmF5PHsga2V5OiBhbnk7IGRhdGE6IGFueSB9PiA9IFtdO1xyXG4gICAgICAgIHZhciBuYW1lLCBhcnI7XHJcbiAgICAgICAgZm9yIChuYW1lIGluIHRoaXMuX21hcHMpIHtcclxuICAgICAgICAgICAgX2xpc3QucHVzaCh7IGtleTogbmFtZSwgZGF0YTogdGhpcy5fbWFwc1tuYW1lXSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChuYW1lIGluIHRoaXMuX2hhc2hNYXBzKSB7XHJcbiAgICAgICAgICAgIGFyciA9IHRoaXMuX2hhc2hNYXBzW25hbWVdO1xyXG4gICAgICAgICAgICBfbGlzdC5wdXNoKHsga2V5OiBhcnJbMF0sIGRhdGE6IGFyclsxXSB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxlbjogbnVtYmVyID0gdGhpcy5fb2JqS2V5cy5sZW5ndGg7XHJcbiAgICAgICAgZm9yICh2YXIgajogbnVtYmVyID0gMDsgaiA8IGxlbjsgaisrKSB7XHJcbiAgICAgICAgICAgIF9saXN0LnB1c2goeyBrZXk6IHRoaXMuX29iaktleXNbal0sIGRhdGE6IHRoaXMuX29iakRhdHVtW2pdIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blrZflhbjkuK3lgqjlrZhrZXnpmJ/liJdcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBrZXlzKCk6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIHZhciBfbGlzdDogQXJyYXk8eyBrZXk6IGFueTsgZGF0YTogYW55IH0+ID0gW107XHJcbiAgICAgICAgdmFyIG5hbWU7XHJcbiAgICAgICAgZm9yIChuYW1lIGluIHRoaXMuX21hcHMpIHtcclxuICAgICAgICAgICAgX2xpc3QucHVzaChuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChuYW1lIGluIHRoaXMuX2hhc2hNYXBzKSB7XHJcbiAgICAgICAgICAgIF9saXN0LnB1c2godGhpcy5faGFzaE1hcHNbbmFtZV1bMF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBfbGlzdCA9IF9saXN0LmNvbmNhdCh0aGlzLl9vYmpLZXlzKTtcclxuICAgICAgICByZXR1cm4gX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blrZflhbjkuK3lgqjlrZhkYXRh55qE6Zif5YiXXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgZGF0YXMoKTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgdmFyIF9saXN0OiBBcnJheTx7IGtleTogYW55OyBkYXRhOiBhbnkgfT4gPSBbXTtcclxuICAgICAgICB2YXIgbmFtZTtcclxuICAgICAgICBmb3IgKG5hbWUgaW4gdGhpcy5fbWFwcykge1xyXG4gICAgICAgICAgICBfbGlzdC5wdXNoKHRoaXMuX21hcHNbbmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKG5hbWUgaW4gdGhpcy5faGFzaE1hcHMpIHtcclxuICAgICAgICAgICAgX2xpc3QucHVzaCh0aGlzLl9oYXNoTWFwc1tuYW1lXVsxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9saXN0ID0gX2xpc3QuY29uY2F0KHRoaXMuX29iakRhdHVtKTtcclxuICAgICAgICByZXR1cm4gX2xpc3Q7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmuIXnqbrlrZflhbjkuK3nmoTmiYDmnInmlbDmja5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsZWFyKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hcHMgPSB7fTtcclxuICAgICAgICB0aGlzLl9oYXNoTWFwcyA9IHt9O1xyXG4gICAgICAgIHRoaXMuX29iaktleXMubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl9vYmpEYXR1bS5sZW5ndGggPSAwO1xyXG4gICAgICAgIHRoaXMuX2NvdW50ID0gMFxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5omT5Y2w5a2X5YW45Lit55qE5omA5pyJ5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBkdW1wKCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBuYW1lLCBhcnI7XHJcbiAgICAgICAgZm9yIChuYW1lIGluIHRoaXMuX21hcHMpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJrZXk6XCIsIG5hbWUsIFwiLS0tPiBkYXRhOlwiLCB0aGlzLl9tYXBzW25hbWVdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChuYW1lIGluIHRoaXMuX2hhc2hNYXBzKSB7XHJcbiAgICAgICAgICAgIGFyciA9IHRoaXMuX2hhc2hNYXBzW25hbWVdO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImtleTpcIiwgYXJyWzBdLCBcIi0tLT4gZGF0YTpcIiwgYXJyWzFdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxlbjogbnVtYmVyID0gdGhpcy5fb2JqS2V5cy5sZW5ndGg7XHJcbiAgICAgICAgZm9yICh2YXIgajogbnVtYmVyID0gMDsgaiA8IGxlbjsgaisrKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwia2V5OlwiLCB0eXBlb2YgKHRoaXMuX29iaktleXNbal0pLCBcIiAtLS0+IGRhdGE6XCIsIHRoaXMuX29iakRhdHVtW2pdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBfZ0Vycm9yIH0gZnJvbSBcIi4vZ0xvZ1wiO1xyXG5cclxuLyoqXHJcbiog5rWL6K+V5qih5Z2X77yM55So5p2l5rWL6K+V6LCD5LyYXHJcbiovXHJcbmV4cG9ydCBsZXQgR1Rlc3RJbmZvID0gbmV3IGNsYXNzIHtcclxuICAgIC8qKuiwg+ivleS/oeaBr+aAu+iKgueCuSAqL1xyXG4gICAgcHVibGljIF9kZWJ1Z0luZm86IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIGNhY2hlSW5mbygpIHtcclxuICAgICAgICBsZXQgcmF3Q2FjaGVEYXRhID0gY2MuYXNzZXRNYW5hZ2VyLmFzc2V0c1tcIl9tYXBcIl07XHJcbiAgICAgICAgLy/nu5/orqHlkITnsbvlnovotYTmupDmnoHlhbbmlbDph49cclxuICAgICAgICBsZXQgdHlwZUFuZE51bTogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xyXG4gICAgICAgIGxldCBhbGxQbmdTaXplID0gMDtcclxuICAgICAgICBsZXQgcG5nQ291bnQgPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGtleSBvZiBPYmplY3Qua2V5cyhyYXdDYWNoZURhdGEpKSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IHJhd0NhY2hlRGF0YVtrZXldO1xyXG4gICAgICAgICAgICBsZXQgX19jbGFzc25hbWVfXyA9IHZhbHVlLl9fY2xhc3NuYW1lX187XHJcbiAgICAgICAgICAgIGlmICh0eXBlQW5kTnVtW19fY2xhc3NuYW1lX19dKSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlQW5kTnVtW19fY2xhc3NuYW1lX19dKys7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlQW5kTnVtW19fY2xhc3NuYW1lX19dID0gMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL+WmguaenOaYryBjYy5UZXh0dXJlMkQg5Zu+54mH6LWE5rqQ77yM5bCx6K6h566X5YW25aSn5bCPXHJcbiAgICAgICAgICAgIGlmIChfX2NsYXNzbmFtZV9fID09IFwiY2MuVGV4dHVyZTJEXCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCB0ZXh0dXJlU2l6ZSA9IHZhbHVlLndpZHRoICogdmFsdWUuaGVpZ2h0ICogKCh2YWx1ZS5fbmF0aXZlID09IFwiLmpwZ1wiID8gMyA6IDQpIC8gMTAyNCAvIDEwMjQpO1xyXG4gICAgICAgICAgICAgICAgYWxsUG5nU2l6ZSArPSB0ZXh0dXJlU2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGxldCBrZXkgb2YgT2JqZWN0LmtleXModHlwZUFuZE51bSkpIHtcclxuICAgICAgICAgICAgbGV0IHZhbHVlID0gdHlwZUFuZE51bVtrZXldO1xyXG4gICAgICAgICAgICAvLyBnRXJyb3IoYCR7a2V5feaVsOmHj++8miR7dmFsdWV9YCk7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gXCJjYy5UZXh0dXJlMkRcIikge1xyXG4gICAgICAgICAgICAgICAgcG5nQ291bnQgPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBnRXJyb3IoYOaJgOaciei1hOa6kOS/oeaBrzogYCwgdHlwZUFuZE51bSk7XHJcbiAgICAgICAgLy8gZ0Vycm9yKFwi6LWE5rqQ5oC75pWwXCIsIE9iamVjdC5rZXlzKHJhd0NhY2hlRGF0YSkubGVuZ3RoKTtcclxuICAgICAgICAvLyBnRXJyb3IoYOWbvueJh+aVsOmHjzogJHtwbmdDb3VudH1gKTtcclxuICAgICAgICAvLyBnRXJyb3IoYOWbvueJh+aAu+Wkp+WwjzogJHthbGxQbmdTaXplLnRvRml4ZWQoMil9TWApO1xyXG4gICAgICAgIGxldCBhc3NldHNOdW0gPSBPYmplY3Qua2V5cyhyYXdDYWNoZURhdGEpLmxlbmd0aDtcclxuICAgICAgICBsZXQgcG5nTnVtID0gcG5nQ291bnQ7XHJcbiAgICAgICAgbGV0IHBuZ1NpemUgPSBgJHthbGxQbmdTaXplLnRvRml4ZWQoMil9TWA7XHJcbiAgICAgICAgcmV0dXJuIHsgYXNzZXRzTnVtLCBwbmdOdW0sIHBuZ1NpemUgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKirorqHnrpfmn5DkuKroioLngrnnmoTlrZDoioLngrnkuKrmlbDvvIzpu5jorqTkuLrorqHnrpflvZPliY3lnLrmma/oioLngrnkuKrmlbDvvIxcclxuICAgICAqIOWmguaenOWtkOiKgueCueaVsOS4gOebtOWinuWKoO+8jOivtOaYjuWPr+iDveacieacqumUgOavgeeahOiKgueCue+8jOacieWGheWtmOazhOmcsueahOmjjumZqSAqL1xyXG4gICAgY291bnRDaGlsZE5vZGVOdW0ocGFyZW50OiBjYy5Ob2RlID0gY2MuZGlyZWN0b3IuZ2V0U2NlbmUoKSkge1xyXG4gICAgICAgIGxldCBudW0gPSAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFyZW50LmNoaWxkcmVuQ291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IHBhcmVudC5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgbnVtKys7XHJcbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBudW0gKz0gdGhpcy5jb3VudENoaWxkTm9kZU51bShub2RlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdHlwZU5hbWUgPSBcIuiKgueCuVwiO1xyXG4gICAgICAgIGlmIChwYXJlbnQgaW5zdGFuY2VvZiBjYy5TY2VuZSkge1xyXG4gICAgICAgICAgICB0eXBlTmFtZSA9IFwi5Zy65pmvXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gX2dFcnJvcihgJHt0eXBlTmFtZX0ke3BhcmVudC5uYW1lfeeahOWtkOiKgueCueS4quaVsDpgLCBudW0pO1xyXG4gICAgICAgIHJldHVybiBudW07XHJcbiAgICB9XHJcblxyXG4gICAgLyoq5pi+56S66LCD6K+V5L+h5oGv77yM6LCD6K+V5L+h5oGv6IqC54K55Li65bi46am76IqC54K5ICovXHJcbiAgICBzaG93RGVidWdJbmZvKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZGVidWdJbmZvKSB7XHJcbiAgICAgICAgICAgIC8v55Sf5oiQ6LCD6K+V5L+h5oGv6IqC54K5LCDmmL7npLrlkITnp43osIPor5Xkv6Hmga9cclxuICAgICAgICAgICAgdGhpcy5fZGVidWdJbmZvID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICAgICAgdGhpcy5fZGVidWdJbmZvLnBhcmVudCA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnSW5mby56SW5kZXggPSA5OTk5O1xyXG4gICAgICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLl9kZWJ1Z0luZm8pO1xyXG4gICAgICAgICAgICAvL+aYvuekuuWcqOWPs+S4iuinklxyXG4gICAgICAgICAgICB0aGlzLl9kZWJ1Z0luZm8ucG9zaXRpb24gPSBjYy52MyhjYy53aW5TaXplLndpZHRoIC0gMjAwLCAxMDApO1xyXG4gICAgICAgICAgICAvL+WGheWtmOWSjOiKgueCueaVsOS/oeaBr+iKgueCuVxyXG4gICAgICAgICAgICBsZXQgY2FjaGVBbmROb2RlTnVtSW5mbyA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgIGNhY2hlQW5kTm9kZU51bUluZm8uY29sb3IgPSBjYy5Db2xvci5CTFVFO1xyXG4gICAgICAgICAgICBjYWNoZUFuZE5vZGVOdW1JbmZvLnBhcmVudCA9IHRoaXMuX2RlYnVnSW5mbztcclxuICAgICAgICAgICAgY2FjaGVBbmROb2RlTnVtSW5mby53aWR0aCA9IDIwMDtcclxuICAgICAgICAgICAgY2FjaGVBbmROb2RlTnVtSW5mby5oZWlnaHQgPSAyMDA7XHJcbiAgICAgICAgICAgIGxldCBjYWNoZUFuZE5vZGVOdW1MYWJlbCA9IGNhY2hlQW5kTm9kZU51bUluZm8uYWRkQ29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICAgICAgY2FjaGVBbmROb2RlTnVtTGFiZWwuZm9udFNpemUgPSAyMFxyXG4gICAgICAgICAgICAvLzHnp5LliLfmlrDkuIDmrKHkv6Hmga9cclxuICAgICAgICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGluZm8gPSB0aGlzLmNhY2hlSW5mbygpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGVOdW0gPSB0aGlzLmNvdW50Q2hpbGROb2RlTnVtKCk7XHJcbiAgICAgICAgICAgICAgICBjYWNoZUFuZE5vZGVOdW1MYWJlbC5zdHJpbmcgPVxyXG4gICAgICAgICAgICAgICAgICAgIGDotYTmupDmgLvmlbDvvJoke2luZm8uYXNzZXRzTnVtfVxcbuWbvueJh+aVsOmHj++8miR7aW5mby5wbmdOdW19XFxu5Zu+54mH5aSn5bCP77yaJHtpbmZvLnBuZ1NpemV9XFxu6IqC54K55oC75pWw77yaJHtub2RlTnVtfWA7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9kZWJ1Z0luZm8uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvKirpmpDol4/osIPor5Xkv6Hmga8gKi9cclxuICAgIGhpZGVEZWJ1Z0luZm8oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RlYnVnSW5mbyAmJiBjYy5pc1ZhbGlkKHRoaXMuX2RlYnVnSW5mbykpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGVidWdJbmZvLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59KCk7XHJcbndpbmRvd1tcIkdUZXN0SW5mb1wiXSA9IEdUZXN0SW5mbztcclxuXHJcbiIsIi8vIGV4cG9ydCAqIGZyb20gXCIuL0FycmF5VXRpbFwiO1xyXG5cclxuaW1wb3J0IHsgXyQsIF9nQ2xlYXJMb2csIF9nRG93bkxvYWRMb2csIF9nRXJyb3IsIF9nTG9nLCBfZ1dhcm4gfSBmcm9tICcuL2xvZy9nTG9nJztcclxuaW1wb3J0IHsgX0FycmF5VXRpbCB9IGZyb20gJy4vdXRpbHMvQXJyYXlVdGlsJztcclxuaW1wb3J0IHsgJERhdGVVdGlsLCAkRGF0ZVV0aWxUeXBlIH0gZnJvbSAnLi91dGlscy9EYXRlVXRpbCc7XHJcbmltcG9ydCB7ICREcmFnb25VdGlsIH0gZnJvbSAnLi91dGlscy9EcmFnb25VdGlsJztcclxuXHJcbmltcG9ydCB7ICRVdGlscyB9IGZyb20gJy4vdXRpbHMvVXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgJEdyYXBoVXRpbCB9IGZyb20gJy4vdXRpbHMvR3JhcGhVdGlsJztcclxuXHJcbmltcG9ydCB7ICROb2RlVXRpbCB9IGZyb20gJy4vdXRpbHMvTm9kZVV0aWwnO1xyXG5cclxuXHJcbmltcG9ydCB7ICROdW1VdGlsIH0gZnJvbSAnLi91dGlscy9OdW1VdGlsJztcclxuXHJcblxyXG5pbXBvcnQgeyAkU3ByaXRlVXRpbCB9IGZyb20gJy4vdXRpbHMvU3ByaXRlVXRpbCc7XHJcblxyXG5pbXBvcnQgeyAkU3RyaW5nVXRpbCB9IGZyb20gJy4vdXRpbHMvU3RyaW5nVXRpbCc7XHJcblxyXG5pbXBvcnQgeyAkVGV4dHVyZVV0aWwgfSBmcm9tICcuL3V0aWxzL1RleHR1cmVVdGlsJztcclxuXHJcbmltcG9ydCB7ICREcmFnb25Bc3NldCB9IGZyb20gJy4vYXNzZXRzL0RyYWdvbkFzc2V0JztcclxuXHJcbmltcG9ydCB7ICREcmFnb25Bc3NldFVybCB9IGZyb20gJy4vYXNzZXRzL0RyYWdvbkFzc2V0VXJsJztcclxuXHJcbmltcG9ydCB7ICRSZWNvcmRVdGlsIH0gZnJvbSAnLi91dGlscy9SZWNvcmRVdGlsJztcclxuXHJcbmltcG9ydCB7ICRNYXRoVXRpbHMgfSBmcm9tICcuL3V0aWxzL01hdGhVdGlsJztcclxuXHJcbmltcG9ydCB7ICREaWN0UmVjb3JkIH0gZnJvbSAnLi91dGlscy9EaWN0UmVjb3JkJztcclxuaW1wb3J0IHsgX1RzTG9nIH0gZnJvbSAnLi9sb2cvVHNMb2cnO1xyXG5cclxuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2VzJztcclxuLy8gZXhwb3J0IGRlZmF1bHQgXHJcbmV4cG9ydCAqIGZyb20gJy4vbG9nL2dUZXN0SW5mbyc7XHJcblxyXG4vLyBleHBvcnQgKiBmcm9tICcuL3V0aWxzL0FycmF5VXRpbCc7XHJcbmV4cG9ydCBsZXQgVFNsb2cgPSBfVHNMb2cuZ2V0SW5zdGFuY2UoKTtcclxuZXhwb3J0IGNsYXNzIEFycmF5VXRpbCBleHRlbmRzIF9BcnJheVV0aWwgeyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIERhdGVVdGlsIGV4dGVuZHMgJERhdGVVdGlsIHsgfTtcclxuXHJcbmV4cG9ydCBsZXQgRGF0ZVV0aWxUeXBlID0gJERhdGVVdGlsVHlwZTtcclxuXHJcbmV4cG9ydCBjbGFzcyBEcmFnb25VdGlsIGV4dGVuZHMgJERyYWdvblV0aWwgeyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIFV0aWxzIGV4dGVuZHMgJFV0aWxzIHsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBHcmFwaFV0aWwgZXh0ZW5kcyAkR3JhcGhVdGlsIHsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBOb2RlVXRpbCBleHRlbmRzICROb2RlVXRpbCB7IH07XHJcblxyXG5leHBvcnQgY2xhc3MgTnVtVXRpbCBleHRlbmRzICROdW1VdGlsIHsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBTcHJpdGVVdGlsIGV4dGVuZHMgJFNwcml0ZVV0aWwgeyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIFN0cmluZ1V0aWwgZXh0ZW5kcyAkU3RyaW5nVXRpbCB7IH07XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dHVyZVV0aWwgZXh0ZW5kcyAkVGV4dHVyZVV0aWwgeyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIERyYWdvbkFzc2V0IGV4dGVuZHMgJERyYWdvbkFzc2V0IHsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBEcmFnb25Bc3NldFVybCBleHRlbmRzICREcmFnb25Bc3NldFVybCB7IH07XHJcblxyXG5leHBvcnQgY2xhc3MgUmVjb3JkVXRpbCBleHRlbmRzICRSZWNvcmRVdGlsIHsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRoVXRpbHMgZXh0ZW5kcyAkTWF0aFV0aWxzIHsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBEaWN0UmVjb3JkIGV4dGVuZHMgJERpY3RSZWNvcmQgeyB9O1xyXG5cclxuLyoqXHJcbiAqIOaXpeW/l+mDqOWIhlxyXG4gKi9cclxuLyoqXHJcbiAqIOaZrumAmuaXpeW/l+i+k+WHulxyXG4gKiBAcGFyYW0gYXJncyDlj4LmlbBcclxuICovXHJcbmV4cG9ydCBsZXQgZ0xvZyA9IF9nTG9nO1xyXG5leHBvcnQgbGV0IGdXYXJuID0gX2dXYXJuO1xyXG5leHBvcnQgbGV0IGdFcnJvciA9IF9nRXJyb3I7XHJcbmV4cG9ydCBsZXQgZ0Rvd25Mb2FkTG9nID0gX2dEb3duTG9hZExvZztcclxuZXhwb3J0IGxldCBnQ2xlYXJMb2cgPSBfZ0NsZWFyTG9nO1xyXG5leHBvcnQgbGV0ICQgPSBfJDsiXSwibmFtZXMiOlsidHNMb2dVdGlsLmRhdGVGb3JtYXQiLCJ0c0xvZ1V0aWwuZG93bmxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FRZ0IsUUFBUSxDQUFDLFFBQWdCLEVBQUUsSUFBWTtJQUNuRCxJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFDLE9BQU8sQ0FBQyxZQUFZLENBQ2hCLE1BQU0sRUFDTixnQ0FBZ0MsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FDOUQsQ0FBQztJQUNGLE9BQU8sQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUMvQixPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUMxQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQyxPQUFPLENBQUMsS0FBSyxF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QUFDLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDMUQsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUQsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUks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
