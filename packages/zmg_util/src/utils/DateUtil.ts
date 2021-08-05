export enum $DateUtilType {
    //日期格式部分
    yyyy_MM_dd_HH_mm_ss = "yyyy-MM-dd HH:mm:ss",
    yyyy_MM_dd_HH_mm = "yyyy-MM-dd HH:mm",
    yyyy_MM_dd = "yyyy-MM-dd",
    yyyy_MM_dd_1 = "yyyy/MM/dd",
    yyyyMMdd = "yyyyMMdd",
    HH_mm_ss = "HH:mm:ss",
}

export class $DateUtil {
    /**
     * 判断数据是否为空
     * @param data
     * @returns {boolean}
     */
    private static isValid(data: any): boolean {
        if (data == null || data == undefined || data == '') {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 判断是否为日期
     * @param date 不支持yyyyMMdd格式
     * @returns {boolean}
     */
    private static isDate(date): boolean {
        if (isNaN(date) && !isNaN(Date.parse(date))) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取当前日期
     * @returns {Date}
     */
    public static getNowDate(): Date {
        return new Date();
    }

    /**
     * 获取当前时间戳
     * @returns {number}
     */
    public static getNowTimeStamp(): number {
        return Math.ceil(new Date().getTime());
    }

    /**
     * Date日期格式化
     * @param date
     * @param pattern 可为空，默认yyyy-MM-dd HH:mm:ss
     * @returns {string}
     */
    public static format(date: Date, pattern: $DateUtilType) {
        let yy = date.getFullYear(); //年
        let mm = date.getMonth() + 1; //月
        let dd = date.getDate(); //日
        let hh = date.getHours(); //时
        let ii = date.getMinutes(); //分
        let ss = date.getSeconds(); //秒

        let clock = yy + "-";
        if (mm < 10) clock += "0";
        clock += mm + "-";
        if (dd < 10) clock += "0";
        clock += dd + " ";
        if (hh < 10) clock += "0";
        clock += hh + ":";
        if (ii < 10) clock += "0";
        clock += ii;
        if (ss < 10) clock += "0";
        if (pattern != $DateUtilType.yyyy_MM_dd_HH_mm) clock += (":" + ss);
        if (this.isValid(pattern) || pattern == $DateUtilType.yyyy_MM_dd_HH_mm_ss) {
            return clock;
        } else if (pattern == $DateUtilType.yyyy_MM_dd) {
            return clock.substring(0, 10);
        } else if (pattern == $DateUtilType.HH_mm_ss) {
            return clock.substring(11);
        } else if (pattern == $DateUtilType.yyyy_MM_dd_1) {
            return clock.substring(0, 10).replace(/-/g, "/");
        } else if (pattern == $DateUtilType.yyyyMMdd) {
            return clock.substring(0, 10).replace(/-/g, "");
        } else {
            return clock;
        }
    }
    /**
     * 日期字符串转时间戳
     * @param date  不支持yyyyMMdd格式
     * @returns {number}
     */
    public static strDate2TimeStamp(date): number {
        date = date.replace(/-/g, "/");
        return new Date(date).getTime();
    }

    /**
     * 时间戳转日期字符串(yyyy-MM-dd HH:mm:ss)
     * @param timeStamp
     * @returns {string}
     */
    public static timeStamp2strDate(timeStamp): string {
        let d = new Date(timeStamp); //根据时间戳生成的时间对象
        let date =
            d.getFullYear() +
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
    }

    /**
     * 获取几天前日期(1代表明天，-1 代表前一天，-2前两天...)
     * @param date 指定日期
     * @param num
     * @param separator 连接符 如果为-,则结果为:yyyy-MM-dd
     */
    public static getDay(date, num, separator): string {
        let today = new Date(date);
        let nowTime = today.getTime();
        let ms = 24 * 3600 * 1000 * num;
        today.setTime(nowTime + ms);
        let oYear = today.getFullYear();
        let oMoth = (today.getMonth() + 1).toString();
        if (oMoth.length <= 1) oMoth = "0" + oMoth;
        let oDay = today.getDate().toString();
        if (oDay.length <= 1) oDay = "0" + oDay;
        return oYear + separator + oMoth + separator + oDay;
    }

    /**
     * 获取前几月(1代表下月，-1 代表上月，-2上两月...)
     * @param date 指定日期
     * @param num
     * @param separator 连接符 如果为-,则结果为:yyyy-MM
     */
    public static getMonth(date, num, separator): string {
        let today = new Date(date);
        today.setMonth(today.getMonth() + num);
        let oYear = today.getFullYear();
        let oMoth = (today.getMonth() + 1).toString();
        if (oMoth.length <= 1) oMoth = "0" + oMoth;
        return oYear + separator + oMoth;
    }
    /**
     * 判断某一年是否是闰年
     * @param year
     * @returns {boolean}
     */
    public static isLeapYear(year): boolean {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    /**
     * 获取某年某个月的天数(西方月份)
     * @param year
     * @param month 从0开始
     */
    public static getDaysOfMonthEN(year, month): number {
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
    }
    /**
     * 获取某年某个月的天数(中国月份)
     * @param year
     * @param month 从1开始
     */
    public static getDaysOfMonthCN(year, month): string | number {
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
    }
    /**
     * 计算一个日期是当年的第几天
     * @param date 字符串日期
     * @returns {number}
     */
    public static dayOfTheYear(date): number {
        let obj = new Date(date);
        let year = obj.getFullYear();
        let month = obj.getMonth(); //从0开始
        let days = obj.getDate();
        let daysArr = [
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
    }

    /**
     * 比较两个时间大小(不支持yyyyMMdd格式)
     *    date1>date2 return 1
     *    date1<date2 return -1
     *    date1==date2 return 0
     * @returns {number}
     */
    public static compareTime(date1, date2): number {
        if (
            Date.parse(date1.replace(/-/g, "/")) >
            Date.parse(date2.replace(/-/g, "/"))
        ) {
            return 1;
        } else if (
            Date.parse(date1.replace(/-/g, "/")) <
            Date.parse(date2.replace(/-/g, "/"))
        ) {
            return -1;
        } else if (
            Date.parse(date1.replace(/-/g, "/")) ==
            Date.parse(date2.replace(/-/g, "/"))
        ) {
            return 0;
        }
    }
    /**
     * 获取本周开始日期
     * @returns {*|string}
     */
    public static getWeekStartDay(): string {
        let now = new Date();
        let date = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - now.getDay() + 1
        );
        return this.format(date, $DateUtilType.yyyy_MM_dd);
    }
    /**
     * 获取本周结束日期
     * @returns {*|string}
     */
    public static getWeekEndDay(): string {
        let now = new Date();
        let date = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + (7 - now.getDay())
        );
        return this.format(date, $DateUtilType.yyyy_MM_dd);
    }

    /**
     * 获取上周开始日期
     * @returns {*|string}
     */
    public static getUpWeekStartDay(): string {
        let now = new Date();
        let date = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - now.getDay() - 6
        );
        return this.format(date, $DateUtilType.yyyy_MM_dd);
    }

    /**
     * 获取上周结束日期
     * @returns {*|string}
     */
    public static getUpWeekEndDay(): string {
        let now = new Date();
        let date = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() - now.getDay()
        );
        return this.format(date, $DateUtilType.yyyy_MM_dd);
    }
}
