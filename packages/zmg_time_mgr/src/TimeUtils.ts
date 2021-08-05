import { gLog } from "zmg_util"

export class TimeUtils {
    /**
     * 客户端和服务器的时间差
     */
    private _diffTime: number = 0
    private _startTime: number = 0

    /**
    * 获取本地时间与服务器时间差
    * @param server_time 秒
    */
    getDiffTime(server_time: number): number {
        this._diffTime = Math.floor((new Date()).valueOf() / 1000) - server_time
        return this._diffTime
    }

    /**
    * 获取当前系统时间单位秒
    */
    getCurTime(): number {
        return Math.floor((new Date()).valueOf() / 1000) - this._diffTime
    }

    /**
    * 格式化时间戳
    * @param time 时间戳毫秒
    * @param format 'YMDhms'年月日时分秒(参数可选)
    */
    formatTime(time: number, format: string) {
        function formatNumber(n: number) {
            let ns = n.toString()
            return ns[1] ? ns : '0' + ns
        }
        const formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
        const returnArr = []
        const date = new Date(time)
        returnArr.push(date.getFullYear())
        returnArr.push(formatNumber(date.getMonth() + 1))
        returnArr.push(formatNumber(date.getDate()))
        returnArr.push(formatNumber(date.getHours()))
        returnArr.push(formatNumber(date.getMinutes()))
        returnArr.push(formatNumber(date.getSeconds()))
        for (const i in returnArr) {
            format = format.replace(formateArr[i], returnArr[i])
        }
        return format
    }

    /**
    * 数组转时间戳毫秒
    * @param arr [年,月,日,时,分,秒]
    */
    getTimeByArr(arr: number[]): number {
        if (typeof arr == 'number') {
            return arr
        }
        for (let i = 0; i < 6; i++) {
            arr[i] = arr[i] ? arr[i] : 0
        }
        let date = `${arr[0]}-${arr[1]}-${arr[2]} ${arr[3]}:${arr[4]}:${arr[5]}`
        return Date.parse(date.replace(/-/g, '/'))
    }


    /**
     * 获取数据{年,月,日,时,分,秒}
     * @param time 时间秒
     */
    getTimeData(time: number): {
        year: number,
        month: number,
        day: number,
        hour: number,
        minute: number,
        second: number
    } {
        time = time * 1000
        let date = new Date(time)
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        let h = date.getHours()
        let minute = date.getMinutes()
        let second = date.getSeconds()
        let timeInfo = {
            year: y,
            month: m,
            day: d,
            hour: h,
            minute: minute,
            second: second
        }
        return timeInfo
    }

    /**
     * 
     * @param time 
     * @param format 0星期x， 1周x
     * @returns 
     */
    getWeek(time: number | string, format: number): string {
        if (cc.js.isString(time)) {
            let b = RegExp(/^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/).test(time as string)
            if (!b) return
        }
        let str = ''
        let dataTime = new Date(time)
        let week = dataTime.getDay()
        let weekstr = ["日", "一", "二", "三", "四", "五", "六"]
        str += "星期" + weekstr[week]
        if (format == 1) {
            return str.replace('星期', '周');
        }
        return str
    }


    getSeconds(s): string {
        let sTime = parseInt(s);// 秒
        let mTime = 0;// 分
        let hTime = 0;// 时
        if (sTime > 60) {//如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            mTime = Math.floor(sTime / 60)
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
        } else {
            result = "" + sTime + "";
        }
        if (mTime >= 0 && mTime < 10) {
            result = "0" + mTime + ":" + result;
        } else {
            result = "" + mTime + ":" + result;
        }
        if (hTime > 0 && hTime < 10) {
            result = "0" + hTime + ":" + result;
        } else {
            if (hTime > 0) {
                result = "" + hTime + ":" + result;
            }
        }
        return result;
    }

    /**
    * 开始计时(和timeEnd配套使用)
    */
    timeStart(): void {
        this._startTime = this.getCurTime()
        gLog("开始计时========", this._startTime)
    }

    /**
     * 结束计时(和timeStart配套使用)
     */
    timeEnd(): number {
        gLog("当前结束时间========", this.getCurTime())
        return this.getCurTime() - this._startTime
    }

    destroy() {
        this._diffTime = 0
        this._startTime = 0
    }
}