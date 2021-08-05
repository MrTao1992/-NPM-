export class $StringUtil {
    /**
     * @description: 查询字符串是否包含key，返回number
     * @param {string} msg
     * @param {string} key
     */
    public static findKey(msg: string, key: string): number {
        if (msg) {
            return msg.indexOf(key);
        }
        return -1;
    }

    /**
     * @description: 查询字符串是否包含key，返回boolean
     * @param {string} msg
     * @param {string} key
     */
    public static hasKey(msg: string, key: string): boolean {
        if (msg) {
            return this.findKey(msg, key) != -1;
        }
    }

    /**
     * @description:是否是http链接
     * @param {string} msg
     */
    public static isHttps(msg: string): boolean {
        if (msg) {
            return this.isHttp(msg);
        }
        return false;
    }

    /**
     * @description: 校验网络连接头部是否包含‘https或http’
     * @param {string} msg
     */
    public static isHttp(msg: string): boolean {
        if (msg) {
            return (
                this.findKey(msg, "https://") == 0 || this.findKey(msg, "http://") == 0
            );
        }
        return false;
    }

    /**
     * @description: 校验字符串是否有效
     * @param {string} msg
     */
    public static isValid(msg: string | string[]): boolean {
        if (msg instanceof Array) {
            let i: number;
            let len: number = msg.length;
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
    }

    public static isInt(msg: string): boolean {
        if (msg && msg.length != 0) {
            if (!isNaN(parseInt(msg))) {
                return true;
            }
        }
        return false;
    }
    public static isNumber(msg: string): boolean {
        if (msg && msg.length != 0) {
            if (!isNaN(parseFloat(msg))) {
                return true;
            }
        }
        return false;
    }

    /**
     * @description: 字符串裁切
     * @param {string} msg
     * @param {string} key 裁切字符
     */
    public static split(msg: string, key: string): string[] {
        if (this.isValid(msg)) {
            return msg.split(key);
        }
        return [msg];
    }

    /**
     * @description:获取链接参数
     * @param {string} url 需解析链接
     */
    public static getRequest(url: string) {
        if (!url || url == "") {
            return {};
        }
        var query: any = {};
        var i: number;
        var str: string;
        var strs: string[];
        var arr: string[];
        if (url.indexOf("?") != -1) {
            str = url.substr(1);
            strs = str.split("&");
            for (i = 0; i < strs.length; i++) {
                arr = strs[i].split("=");
                query[arr[0]] = unescape(arr[1]);
            }
        }
        return query;
    }

    /**
     * 将对象拆解成后缀形式
     * @param params
     */
    public static getQuery(params): string {
        const tmps: string[] = [];
        var key: string;
        for (key in params) {
            tmps.push(`${key}=${params[key]}`);
        }
        return tmps.join("&");
    }

    /**
     * 格式化字符串
     * @param str 
     * @param val 
     */
    public static Format(str: string, ...val: string[]): string {
        for (let index = 0; index < val.length; index++) {
            str = str.replace(`{${index}}`, val[index]);
        }
        return str;
    }
    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    public static trimSpace(str: string): string {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    }

    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    public static getStringLength(str: string): number {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            } else {
                length += 1;
            }
        }
        return length;
    }

    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    public static isChinese(str: string): boolean {
        var reg = /^.*[\u4E00-\u9FA5]+.*$/;
        return reg.test(str);
    }

    public static createCharRepaet(char: string, repeat: number): string {
        let i: number = 0;
        let msg: string = "";
        for (i = 0; i < repeat; i++) {
            msg += char;
        }
        return msg;
    }

    /**
     * 数值格式化 万为单位
     * @param num 数值
     */
    public static formatNumber(num) {
        if (num == undefined) return ''
        num = Number(num);
        if (num == 0) {
            return num + '';
        } else
            if (num >= 1 && num < 10000) {
                return num + '';
            } else {
                return (num / 10000).toFixed(2) + '万';
            }
    }

    /**
     * 通过oss获取特定大小的图片
     * @param url 图片地址
     * @param width  宽 
     * @param height 高
     */
    public static generateResizeUrl(url: string, width: number, height: number): string {
        url = url.replace("http://", "https://");
        let prefix = "?x-oss-process=image/resize,m_lfit,h_" + height + ",w_" + width + ",limit_0/auto-orient,0";
        return url + prefix;
    }

    public static array2string(chars: string[], key: string = ""): string {
        let i: number;
        let word: string = "";
        let len: number = chars.length;
        for (i = 0; i < len; i++) {
            if (i == 0) {
                word = chars[i];
            } else {
                word += key + chars[i];
            }
        }
        return word;
    }
}
