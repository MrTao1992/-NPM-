import { BaseMgr } from "zmg_mgr";

export class _EventMgr extends BaseMgr implements zmg.IEventMgr {
    private static _instance: _EventMgr;
    static getInstance(): _EventMgr {
        if (!this._instance) {
            this._instance = new _EventMgr();
        }
        return this._instance;
    }

    constructor() {
        super();
        this._eventTargets = {};
        this._target = new cc.EventTarget();
    }

    private _target: cc.EventTarget;
    private _eventTargets: Record<string, cc.EventTarget>;
    public async start() {
        super.start();
    }
    /**
     * 模块销毁
     */
    public destroy(): void {
        this._target = null;
        this._eventTargets = null;
        super.destroy();
    }
    /**
     * 未准备
     * 已被销毁
     * 则无法使用
     */
    public get isValid(): boolean {
        return this._target ? true : false;
    }

    public getEventTarget(key: string): cc.EventTarget {
        if (this._eventTargets) {
            if (!this._eventTargets[key]) {
                this._eventTargets[key] = new cc.EventTarget();
            }
        }
        return this._eventTargets[key];
    }

    public removeEventTarget(key: string): void {
        if (this._eventTargets) {
            if (this._eventTargets[key]) {
                //清理缓存...
                this._eventTargets[key] = null;
            }
        }
    }

    public hasEventListener(type: string): boolean {
        if (this._target) {
            return this._target.hasEventListener(type);
        }
        return false;
    }
    public on<T extends Function>(type: string, callback: T, target: any, useCapture?: boolean, priority?: number): T {
        if (this._target) {
            return this._target.on(type, callback, target, useCapture, priority);
        }
        return null;
    }

    public off(type: string, callback?: Function, target?: any): void {
        if (this._target) {
            return this._target.off(type, callback, target);
        }
    }
    public targetOff(target: any): void {
        if (this._target) {
            return this._target.targetOff(target);
        }
    }
    public once(type: string, callback: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void, target: any, priority?: number): void {
        if (this._target) {
            return this._target.once(type, callback, target, priority);
        }
    }
    public dispatchEvent(event: cc.Event): void {
        if (this._target) {
            event.target = this;
            return this._target.dispatchEvent(event);
        }
    }
    public emit(key: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): void {
        if (this._target) {
            this._target.emit(key, arg1, arg2, arg3, arg4, arg5);
        }
    }
}

