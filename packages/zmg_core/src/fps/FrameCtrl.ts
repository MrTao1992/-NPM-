import { EventMgr } from "zmg_event_mgr";
import { gLog } from "zmg_util";
import { ZMPerfCounter } from "./ZMPerfCounter";

const STANDARD_FRAME: number = 60;
export class FrameCtrl {
    private _frameRatio: number = 1.0;
    private _count: ZMPerfCounter;
    protected _averageFps: number = 0.0;
    public get fps(): number {
        return this._averageFps;
    }
    constructor() {
        let now = performance.now();
        this._count = new ZMPerfCounter("fps", { desc: 'Frame time (ms)', min: 0, max: 50, average: 500, color: '#080' }
            , now);
        this.start();
    }
    /**
     * 开始计算FPS
     */
    private start(): void {
        this._count.recorded();
        EventMgr.on("frameRatioChange", this.onFrameRatioChange, this, false);
        window.setTimeout(this.localFrame.bind(this), 10 * 1000);
    }
    destory(): void {
        EventMgr.off("frameRatioChange", this.onFrameRatioChange, this);
    }
    /**记录平均fps */
    private localFrame(): void {
        this._count.stoped();
        gLog("计算的平均刷新FPS:" + this._count.fps);
        this._averageFps = Math.max(this._count.fps, 60);
        this.frameRatio = this._frameRatio;
    }
    private onFrameRatioChange(ratio: number): void {
        this.frameRatio = ratio;
    }
    public set frameRatio(value: number) {
        this._frameRatio = value;
        cc.game.setFrameRate(60);
        if (this._averageFps) {
            if (this._averageFps == 60) {
                //正常屏使用framerate
                cc.game["setFrameRatio"] && cc.game["setFrameRatio"](this._frameRatio);
            } else {
                let ratio: number = Math.round(this._averageFps / STANDARD_FRAME * this._frameRatio);
                //高刷屏 使用frameratio
                cc.game["setFrameRatio"] && cc.game["setFrameRatio"](ratio);
            }
        }
    }
    public get frameRatio(): number {
        return this._frameRatio;
    }
}