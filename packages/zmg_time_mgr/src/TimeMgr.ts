import { BaseMgr } from "zmg_mgr"
import { TimerHandles, TimerHandler } from "./TimerHandles";
import { TimeUtils } from "./TimeUtils";
export class _TimeMgr extends BaseMgr implements zmg.ITimeMgr {
    private static _instance: _TimeMgr;
    private _TimerHandles: TimerHandles = null
    private _TimeUtils: TimeUtils = null

    static getInstance(): _TimeMgr {
        if (!this._instance) {
            this._instance = new _TimeMgr();
        }
        return this._instance;
    }
    constructor() {
        super();
        this._TimerHandles = new TimerHandles()
        this._TimeUtils = new TimeUtils()
    }

    public get TimerHandles(): TimerHandles {
        return this._TimerHandles
    }

    public get TimeUtils(): TimeUtils {
        return this._TimeUtils
    }
    /*********************************************时间工具TimeUtils**************************************************/
    getSeconds(s): string {
        return this.TimeUtils.getSeconds(s)
    }
    getWeek(time: number | string, format: number = 0): string {
        return this.TimeUtils.getWeek(time, format)
    }
    getDiffTime(server_time: number): number {
        return this.TimeUtils.getDiffTime(server_time)
    }
    getCurTime(): number {
        return this.TimeUtils.getCurTime()
    }
    formatTime(time: number, format: string): string {
        return this.TimeUtils.formatTime(time, format)
    }
    getTimeByArr(arr: number[]): number {
        return this.TimeUtils.getTimeByArr(arr)
    }
    getTimeData(time: number): { year: number; month: number; day: number; hour: number; minute: number; second: number; } {
        return this.TimeUtils.getTimeData(time)
    }
    timeStart(): void {
        return this.TimeUtils.timeStart()
    }
    timeEnd(): number {
        return this.TimeUtils.timeEnd()
    }
    /*********************************************时间计时器TimerHandles**************************************************/

    public doTimer(delay: number, method: Function, target: any, repeatCount: number = Number.MAX_SAFE_INTEGER, completeMethod: Function = null): TimerHandler {
        return this.TimerHandles.doTimer(delay, method, target, repeatCount, completeMethod)
    }
    public doFrame(delay: number, method: Function, target: any, repeatCount: number = Number.MAX_SAFE_INTEGER, completeMethod: Function = null): TimerHandler {
        return this.TimerHandles.doFrame(delay, method, target, repeatCount, completeMethod)
    }

    public doModule(moduleName: string, obj: any, useFrame: boolean = false): TimerHandler {
        return this.TimerHandles.doModule(moduleName, obj, useFrame)
    }

    public remove(method: any, methodObj: any): void {
        return this.TimerHandles.remove(method, methodObj)
    }

    public removeAll(method: any): void {
        return this.TimerHandles.removeAll(method)
    }

    public getPauseTime(name: string): number {
        return this.TimerHandles.getPauseTime(name)
    }
    public getDurationTime(name: string): number {
        return this.TimerHandles.getDurationTime(name)
    }

    public pauseHandle(name: string) {
        return this.TimerHandles.pauseHandle(name)
    }

    public recoverHandle(name: string) {
        return this.TimerHandles.recoverHandle(name)
    }

    destroy() {
        this.TimerHandles.destroy()
        this.TimeUtils.destroy()
    }
}
