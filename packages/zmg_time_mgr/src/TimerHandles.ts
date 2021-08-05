import { gError } from "zmg_util"
import { ObjectPool } from "zmg_mgr"
export class TimerHandles extends cc.Node {

    private _handlers: Array<TimerHandler>;
    private _delHandlers: Array<TimerHandler>;
    private _currTime: number;
    private _currFrame: number;
    private _count: number;
    private _timeScale: number;

    /**
     * 构造函数
     */
    public constructor() {
        super()
        this._handlers = new Array<TimerHandler>();
        this._delHandlers = new Array<TimerHandler>();
        this._currTime = new Date().getTime()
        this._currFrame = 0;
        this._count = 0;
        this._timeScale = 1;
    }

    /**
     * 设置时间参数
     * @param timeScale
     */
    public setTimeScale(timeScale: number): void {
        this._timeScale = timeScale;
    }

    /**
     * 每帧执行函数
     * @param frameTime
     */
    update(dt): void {
        // try {
        this._currFrame++;
        this._currTime = new Date().getTime()

        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandler = this._handlers[i];
            if (!cc.isValid(handler.target)) {
                this._delHandlers.push(handler);
            } else {
                if (handler.active) {
                    if (handler.userFrame) {
                        handler.durationTime++
                    } else {
                        handler.durationTime += dt
                    }
                } else {
                    handler.pauseTime += dt
                    return
                }

                var t: number = handler.userFrame ? this._currFrame : this._currTime;
                if (t >= handler.exeTime) {
                    let bool: boolean = handler.method.call(handler.target, (this._currTime - handler.dealTime) * this._timeScale);
                    handler.dealTime = this._currTime;
                    handler.exeTime = t + handler.delay;
                    if (bool || !handler.repeat) {
                        if (!bool && handler.repeatCount > 1) {
                            handler.repeatCount--;
                        } else {
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
            var handler: TimerHandler = this._delHandlers.pop();
            this.remove(handler.method, handler.target);
        }
        // } catch (exp) {
        //     gError("TimerManager.onEnterFrame Error....." + exp);
        // }
    }

    private create(useFrame: boolean, delay: number, method: Function, target: any, repeatCount: number, complateMethod: Function = null, handleName: string = "timerHandle"): TimerHandler {
        cc.director.getScheduler().scheduleUpdate(this, 1, false)
        // 先删除相同函数的计时
        if (method) {
            this.remove(method, target);
        } else {
            this.remove(handleName, target);
        }

        // 创建
        var handler: TimerHandler = ObjectPool.pop(TimerHandler, "TimerHandler");
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
        return handler
    }


    /**
     * 定时执行
     * @param delay 执行间隔:毫秒
     * @param repeatCount 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param completeMethod 完成执行函数
     * @param completeMethodObj 完成执行函数所属对象
     */
    public doTimer(delay: number, method: Function, target: any, repeatCount: number, completeMethod: Function = null): TimerHandler {
        return this.create(false, delay, method, target, repeatCount, completeMethod);
    }

    /**
     * 定时执行
     * @param delay 执行间隔:帧频
     * @param repeatCount 执行次数, 0为无限次
     * @param method 执行函数
     * @param methodObj 执行函数所属对象
     * @param completeMethod 完成执行函数
     * @param completeMethodObj 完成执行函数所属对象
     */
    public doFrame(delay: number, method: Function, target: any, repeatCount: number = Number.MAX_SAFE_INTEGER, completeMethod: Function = null): TimerHandler {
        return this.create(true, delay, method, target, repeatCount, completeMethod);
    }


    /**
     * 创建模块计时器
     * @param moduleName 模块名称
     * @param obj 所属对象
     * @param useFrame 是否使用帧率
     */
    public doModule(moduleName: string, obj: any, useFrame: boolean = false): TimerHandler {
        return this.create(useFrame, 0, null, 0, obj, null, null);
    }

    /**
     * 定时器执行数量
     * @return
     */
    public get count(): number {
        return this._count;
    }

    /**
     * 清理
     * @param method 移除需要根据的方式
     * @param methodObj 要移除的函数对应的对象
     */
    public remove(method: any, target: any): void {
        let isRemove = false
        let removeIndex = -1
        let handler: TimerHandler = null
        for (var i: number = 0; i < this._count; i++) {
            handler = this._handlers[i];
            if (typeof (method) == "function") {
                if (handler.method == method && handler.target == target) {
                    removeIndex = i
                    isRemove = true
                    break;
                }
            } else if (typeof (method) == "object") {
                if (handler == method && handler.target == target) {
                    removeIndex = i
                    isRemove = true
                    break;
                }
            } else if (typeof (method) == "string") {
                if (handler.handleName == method && handler.target == target) {
                    removeIndex = i
                    isRemove = true
                    break;
                }
            }
        }
        if (isRemove) {
            this._handlers.splice(removeIndex, 1);
            ObjectPool.push(handler);
            this._count--;
            if (this._count == 0) {
                cc.director.getScheduler().unscheduleUpdate(this)
            }
        }
    }

    /**
     * 清理
     * @param method 要移除的函数对应的对象
     */
    public removeAll(method: any): void {
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandler = this._handlers[i];
            if (handler.target == method
                || handler.handleName == method
                || handler.method == method
                || handler == method) {
                this._handlers.splice(i, 1);
                ObjectPool.push(handler);
                this._count--;
                if (this._count == 0) {
                    cc.director.getScheduler().unscheduleUpdate(this)
                }
                i--;
            }
        }
    }

    /**
     * 获取暂停时间
     * @param name handleName
     */
    getPauseTime(name: string) {
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandler = this._handlers[i];
            if (handler.handleName == name) {
                return handler.pauseTime
            }
        }
    }

    /**
     * 获取持续时间
     * @param name handleName
     */
    getDurationTime(name: string) {
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandler = this._handlers[i];
            if (handler.handleName == name) {
                return handler.durationTime
            }
        }
    }

    /**
     * 暂停计时器
     * @param name handleName
     */
    pauseHandle(name: string) {
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandler = this._handlers[i];
            if (handler.handleName == name) {
                handler.active = false
            }
        }
    }

    /**
     * 恢复计时器
     * @param name handleName
     */
    recoverHandle(name: string) {
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandler = this._handlers[i];
            if (handler.handleName == name) {
                handler.pauseTime = 0
                handler.active = true
            }
        }
    }

    /**
     * 检测是否已经存在
     * @param method
     * @param methodObj
     */
    public isExists(method: Function, target: any): boolean {
        for (var i: number = 0; i < this._count; i++) {
            var handler: TimerHandler = this._handlers[i];
            if (handler.method == method && handler.target == target) {
                return true;
            }
        }
        return false;
    }

    /** 销毁函数 */
    destroy(): boolean {
        for (let index = 0; index < this._handlers.length; index++) {
            let handler = this._handlers[index]
            this._handlers.splice(index, 1);

            ObjectPool.push(handler);
        }
        this._currFrame = 0;
        this._count = 0;
        this._timeScale = 1;
        this._handlers = []
        this._delHandlers = []
        return true;
    }
}

export class TimerHandler {
    /** 执行间隔 */
    public delay: number = 0;

    /** 是否重复执行 */
    public repeat: boolean;

    /** 重复执行次数 */
    public repeatCount: number = 0;

    /** 是否用帧率 */
    public userFrame: boolean;

    /** 下一次执行时间 */
    public exeTime: number = 0;

    /** 处理函数 */
    public method: Function;

    /** 完成处理函数 */
    public complateMethod: Function;

    /** 上次的执行时间 */
    public dealTime: number = 0;

    /** 已持续时间 */
    public durationTime: number = 0;

    /** 暂停时长 */
    public pauseTime: number = 0;

    /** 当前是否活跃 */
    public active: boolean = true;

    /** handle名称 */
    public handleName: string = "";

    /**
     * 对象
     */
    public target: any;

    /** 清理 */
    public clear(): void {
        this.method = null;
        this.target = null;
        this.complateMethod = null;
    }
}

