declare module 'zmg_core/src/events/ECoreCode' {
	export enum ECoreCode {
	    CONFIG_COMPLETE = "Config_Ready",
	    SERVER_COMPLETE = "SERVER_Ready",
	    UI_COMPLETE = "UI_Ready",
	    CONFIG_ERROR = "\u521D\u59CB\u5316config\u9519\u8BEF(\u8D44\u6E90\u672A\u52A0\u8F7D\u6210\u529F)"
	}

}
declare module 'zmg_core/src/events/CoreEvent' {
	import { ECoreCode } from 'zmg_core/src/ECoreCode';
	export class CoreEvent extends cc.Event {
	    static READY: string;
	    static ERROR: string;
	    code: ECoreCode;
	    constructor(type: string);
	}

}
declare module 'zmg_core/src/fps/ZMCounter' {
	export class ZMCounter {
	    protected _id: string;
	    protected _opts: any;
	    protected _value: number;
	    protected _total: number;
	    protected _averageValue: number;
	    protected _accumValue: number;
	    protected _accumSamples: number;
	    protected _accumStart: number;
	    constructor(id: string, opts: any, now: any);
	    get value(): number;
	    set value(value: number);
	    protected _average(v: number, now: number): void;
	    protected sample(now: number): void;
	    protected human(): number;
	    protected alarm(): boolean;
	}

}
declare module 'zmg_core/src/fps/ZMPerfCounter' {
	import { ZMCounter } from 'zmg_core/src/ZMCounter';
	export class ZMPerfCounter extends ZMCounter {
	    protected _fps: number;
	    protected _time: number;
	    constructor(id: string, opts: any, now: number);
	    get fps(): number;
	    /**
	     * 记录中
	     */
	    recorded(): void;
	    /**
	     * 停止
	     */
	    stoped(): void;
	    private beforeUpdate;
	    private afterUpdate;
	    private afterDraw;
	    start(now: any): void;
	    end(now: any): void;
	    tick(): void;
	    frame(now: any): void;
	}

}
declare module 'zmg_core/src/fps/FrameCtrl' {
	export class FrameCtrl {
	    private _frameRatio;
	    private _count;
	    protected _averageFps: number;
	    get fps(): number;
	    constructor();
	    /**
	     * 开始计算FPS
	     */
	    private start;
	    destory(): void;
	    /**记录平均fps */
	    private localFrame;
	    private onFrameRatioChange;
	    set frameRatio(value: number);
	    get frameRatio(): number;
	}

}
declare module 'zmg_core/src/ZmgCore' {
	import { BaseMgr } from 'zmg_mgr';
	import { FrameCtrl } from 'zmg_core/src/fps/FrameCtrl'; class _ZmgCore extends BaseMgr implements zmg.IMgr {
	    private static _instance;
	    static getInstance(): _ZmgCore;
	    private _mgrRecord;
	    private _isInit;
	    private _frameCtrl;
	    get frameCtrl(): FrameCtrl;
	    constructor();
	    setMgr(key: string, mgr: zmg.IMgr): void;
	    clearMgr(key: string): void;
	    /**
	    * 模块启动
	    * 延迟返回async函数
	    *
	    */
	    start(): any;
	    /**
	     * 模块销毁
	     */
	    destroy(): void;
	    /**
	     * 未准备
	     * 已被销毁
	     * 则无法使用
	     */
	    get isValid(): boolean;
	    private get notVaildItem();
	    private check;
	    private onReady;
	    private addEvents;
	    private removeEvents;
	    private onMgrReady;
	    dispatchEvent(cevt: cc.Event): void;
	    private initAudio;
	}
	export let ZmgCore: _ZmgCore;
	export {};

}
declare module 'zmg_core/src/interfaces' {
	 global {
	    namespace zmg {
	        interface IZmgCore extends zmg.IMgr {
	        }
	    }
	}
	export {};

}
declare module 'zmg_core' {
	export * from 'zmg_core/src/interfaces';
	export * from 'zmg_core/src/ZmgCore';
	export * from 'zmg_core/src/events/CoreEvent';
	export * from 'zmg_core/src/events/ECoreCode';
	export * from 'zmg_core/src/fps/FrameCtrl';

}
