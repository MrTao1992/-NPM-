declare module 'zmg_time_mgr/src/TimerHandles' {
	export class TimerHandles extends cc.Node {
	    private _handlers;
	    private _delHandlers;
	    private _currTime;
	    private _currFrame;
	    private _count;
	    private _timeScale;
	    /**
	     * 构造函数
	     */
	    constructor();
	    /**
	     * 设置时间参数
	     * @param timeScale
	     */
	    setTimeScale(timeScale: number): void;
	    /**
	     * 每帧执行函数
	     * @param frameTime
	     */
	    update(dt: any): void;
	    private create;
	    /**
	     * 定时执行
	     * @param delay 执行间隔:毫秒
	     * @param repeatCount 执行次数, 0为无限次
	     * @param method 执行函数
	     * @param methodObj 执行函数所属对象
	     * @param completeMethod 完成执行函数
	     * @param completeMethodObj 完成执行函数所属对象
	     */
	    doTimer(delay: number, method: Function, target: any, repeatCount: number, completeMethod?: Function): TimerHandler;
	    /**
	     * 定时执行
	     * @param delay 执行间隔:帧频
	     * @param repeatCount 执行次数, 0为无限次
	     * @param method 执行函数
	     * @param methodObj 执行函数所属对象
	     * @param completeMethod 完成执行函数
	     * @param completeMethodObj 完成执行函数所属对象
	     */
	    doFrame(delay: number, method: Function, target: any, repeatCount?: number, completeMethod?: Function): TimerHandler;
	    /**
	     * 创建模块计时器
	     * @param moduleName 模块名称
	     * @param obj 所属对象
	     * @param useFrame 是否使用帧率
	     */
	    doModule(moduleName: string, obj: any, useFrame?: boolean): TimerHandler;
	    /**
	     * 定时器执行数量
	     * @return
	     */
	    get count(): number;
	    /**
	     * 清理
	     * @param method 移除需要根据的方式
	     * @param methodObj 要移除的函数对应的对象
	     */
	    remove(method: any, target: any): void;
	    /**
	     * 清理
	     * @param method 要移除的函数对应的对象
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
	    pauseHandle(name: string): void;
	    /**
	     * 恢复计时器
	     * @param name handleName
	     */
	    recoverHandle(name: string): void;
	    /**
	     * 检测是否已经存在
	     * @param method
	     * @param methodObj
	     */
	    isExists(method: Function, target: any): boolean;
	    /** 销毁函数 */
	    destroy(): boolean;
	}
	export class TimerHandler {
	    /** 执行间隔 */
	    delay: number;
	    /** 是否重复执行 */
	    repeat: boolean;
	    /** 重复执行次数 */
	    repeatCount: number;
	    /** 是否用帧率 */
	    userFrame: boolean;
	    /** 下一次执行时间 */
	    exeTime: number;
	    /** 处理函数 */
	    method: Function;
	    /** 完成处理函数 */
	    complateMethod: Function;
	    /** 上次的执行时间 */
	    dealTime: number;
	    /** 已持续时间 */
	    durationTime: number;
	    /** 暂停时长 */
	    pauseTime: number;
	    /** 当前是否活跃 */
	    active: boolean;
	    /** handle名称 */
	    handleName: string;
	    /**
	     * 对象
	     */
	    target: any;
	    /** 清理 */
	    clear(): void;
	}

}
declare module 'zmg_time_mgr/src/TimeUtils' {
	export class TimeUtils {
	    /**
	     * 客户端和服务器的时间差
	     */
	    private _diffTime;
	    private _startTime;
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
	    * @param format 'YMDhms'年月日时分秒(参数可选)
	    */
	    formatTime(time: number, format: string): string;
	    /**
	    * 数组转时间戳毫秒
	    * @param arr [年,月,日,时,分,秒]
	    */
	    getTimeByArr(arr: number[]): number;
	    /**
	     * 获取数据{年,月,日,时,分,秒}
	     * @param time 时间秒
	     */
	    getTimeData(time: number): {
	        year: number;
	        month: number;
	        day: number;
	        hour: number;
	        minute: number;
	        second: number;
	    };
	    /**
	     *
	     * @param time
	     * @param format 0星期x， 1周x
	     * @returns
	     */
	    getWeek(time: number | string, format: number): string;
	    getSeconds(s: any): string;
	    /**
	    * 开始计时(和timeEnd配套使用)
	    */
	    timeStart(): void;
	    /**
	     * 结束计时(和timeStart配套使用)
	     */
	    timeEnd(): number;
	    destroy(): void;
	}

}
declare module 'zmg_time_mgr/src/TimeMgr' {
	import { BaseMgr } from 'zmg_mgr';
	import { TimerHandles, TimerHandler } from 'zmg_time_mgr/src/TimerHandles';
	import { TimeUtils } from 'zmg_time_mgr/src/TimeUtils';
	export class _TimeMgr extends BaseMgr implements zmg.ITimeMgr {
	    private static _instance;
	    private _TimerHandles;
	    private _TimeUtils;
	    static getInstance(): _TimeMgr;
	    constructor();
	    get TimerHandles(): TimerHandles;
	    get TimeUtils(): TimeUtils;
	    /*********************************************时间工具TimeUtils**************************************************/
	    getSeconds(s: any): string;
	    getWeek(time: number | string, format?: number): string;
	    getDiffTime(server_time: number): number;
	    getCurTime(): number;
	    formatTime(time: number, format: string): string;
	    getTimeByArr(arr: number[]): number;
	    getTimeData(time: number): {
	        year: number;
	        month: number;
	        day: number;
	        hour: number;
	        minute: number;
	        second: number;
	    };
	    timeStart(): void;
	    timeEnd(): number;
	    /*********************************************时间计时器TimerHandles**************************************************/
	    doTimer(delay: number, method: Function, target: any, repeatCount?: number, completeMethod?: Function): TimerHandler;
	    doFrame(delay: number, method: Function, target: any, repeatCount?: number, completeMethod?: Function): TimerHandler;
	    doModule(moduleName: string, obj: any, useFrame?: boolean): TimerHandler;
	    remove(method: any, methodObj: any): void;
	    removeAll(method: any): void;
	    getPauseTime(name: string): number;
	    getDurationTime(name: string): number;
	    pauseHandle(name: string): void;
	    recoverHandle(name: string): void;
	    destroy(): void;
	}

}
/// <reference types="node" />
declare class TimeOut {
    private _timerMap;
    get timerMap(): Map<string, NodeJS.Timeout[]>;
    setTimeout(func: Function, time: number, area?: string): NodeJS.Timeout;
    setInterval(func: Function, time: number, area?: string): NodeJS.Timeout;
    clearTimerByArea(area: string): void;
    clearTimeout(t: NodeJS.Timeout): void;
    clearTimer(): void;
    destroy(): void;
}
declare module 'zmg_time_mgr/src/interfaces' {
	import { TimerHandler } from 'zmg_time_mgr/src/TimerHandles'; global {
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
	                year: number;
	                month: number;
	                day: number;
	                hour: number;
	                minute: number;
	                second: number;
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
	            getSeconds(s: any): string;
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
	            pauseHandle(name: string): any;
	            /**
	             * 恢复计时器
	             * @param name handleName
	             */
	            recoverHandle(name: string): any;
	            /** 销毁函数 */
	            destroy(): any;
	        }
	    }
	}
	export {};

}
declare module 'zmg_time_mgr' {
	import { _TimeMgr } from 'zmg_time_mgr/src/TimeMgr';
	export * from 'zmg_time_mgr/src/interfaces';
	export let TimeMgr: _TimeMgr;

}
