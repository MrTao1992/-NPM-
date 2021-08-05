import { TimerHandler } from "./TimerHandles";
declare global {
    namespace zmg {
        interface ITimeMgr {
            /**
             * 获取本地时间与服务器时间差
             * @param server_time 秒
             */
            getDiffTime(server_time: number): number;
            /**
             * 获取当前系统时间单位秒
             */
            getCurTime(): number;
            /**
             * 格式化时间戳
             * @param time 时间戳毫秒
             * @param format 'YMDhms'年月日时分秒
             */
            formatTime(time: number, format: string): string;
            /**
             * 数组转时间戳秒
             * @param arr [年,月,日,时,分,秒]
             */
            getTimeByArr(arr: number[]): number;
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
            };

            /**
             *根据时间戳获取星期一~星期日
             * @param time 时间戳
             * @param format 0星期x， 1周x
             */
            getWeek(time: number | string, format: number): string;

            /**
             * 获取如00:00:00
             * @param s 秒数
             */
            getSeconds(s): string;

            /**
             * 开始计时
             */
            timeStart(): void;
            /**
             * 结束计时
             */
            timeEnd(): number;

            /**
            * 定时执行
            * @param delay 执行间隔:毫秒
            * @param repeatCount 执行次数, 0为无限次
            * @param method 执行函数
            * @param methodObj 执行函数所属对象
            * @param completeMethod 完成执行函数
            * @param completeMethodObj 完成执行函数所属对象
            */
            doTimer(delay: number, method: Function, target: any, repeatCount: number, completeMethod: Function): TimerHandler;

            /**
             * 帧定时执行
             * @param delay 执行间隔:帧频
             * @param repeatCount 执行次数, 0为无限次
             * @param method 执行函数
             * @param methodObj 执行函数所属对象
             * @param completeMethod 完成执行函数
             * @param completeMethodObj 完成执行函数所属对象
             */
            doFrame(delay: number, method: Function, target: any, repeatCount: number, completeMethod: Function): TimerHandler;

            /**
             * 创建模块计时器
             * @param moduleName 模块名称
             * @param obj 所属对象
             * @param useFrame 是否使用帧率
             */
            doModule(moduleName: string, obj: any, useFrame?: boolean): TimerHandler;

            /**
            * 清理
            * @param method 移除需要根据的方式（3种方式:Function,TimerHandler,String)
            * @param methodObj 要移除的函数对应的对象
            * @example
            * #zh 根据处理函数移除
            * TimeMgr.remove(this.onClick,this)
            * #zh 根据TimerHandler移除
            * TimeMgr.remove(handle,this)
            * #zh 根据TimerHandle.handleName移除
            * TimeMgr.remove("Hall",this)
            */
            remove(method: any, methodObj: any): void;

            /**
             * 清理
             * @param method 要移除的函数对应的对象
             * @example
             * #zh 根据处理函数移除
             * TimeMgr.remove(this.onClick)
             * #zh 根据TimerHandler移除
             * TimeMgr.remove(handle)
             * #zh 根据TimerHandle.handleName移除
             * TimeMgr.remove("Hall")
             * #zh 根据Handle所属对象移除
             * TimeMgr.remove(this)
             */
            removeAll(method: any): void;

            /**
             * 获取暂停时间
             * @param name handleName
             */
            getPauseTime(name: string): number;

            /**
            * 获取持续时间
            * @param name handleName
            */
            getDurationTime(name: string): number;

            /**
             * 暂停计时器
             * @param name handleName
             */
            pauseHandle(name: string);

            /**
             * 恢复计时器
             * @param name handleName
             */
            recoverHandle(name: string);

            /** 销毁函数 */
            destroy();

            // /**
            //  * 增加间断计时器
            //  */
            // setTimeout(func: Function, time: number, area?: string): NodeJS.Timeout;

            // /**
            //  * 增加计时器
            //  */
            // setInterval(func: Function, time: number, area?: string): NodeJS.Timeout;
            // /**
            //  * 清理计时器，通过区域
            //  */
            // clearTimerByArea(area: string): void;

            // /**
            //  * 清理计时器
            //  * @param t 
            //  */
            // clearTimeout(t: NodeJS.Timeout): void;

            // /**
            //  * 清理所有计时器
            //  */
            // clearTimer(): void;
        }
    }
}
export { }