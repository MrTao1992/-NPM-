import { gLog } from "zmg_util";
import { ZMCounter } from "./ZMCounter";

export class ZMPerfCounter extends ZMCounter {
    protected _fps: number = 60;
    protected _time: number;
    constructor(id: string, opts: any, now: number) {
        super(id, opts, now);
        this._time = now;

    }
    public get fps(): number {
        return this._fps;
    }
    /**
     * 记录中
     */
    public recorded(): void {
        // cc.director.on(cc.Director.EVENT_BEFORE_UPDATE, this.beforeUpdate, this, false);
        // cc.director.on(cc.Director.EVENT_AFTER_UPDATE, this.afterUpdate, this, false);
        cc.director.on(cc.Director.EVENT_AFTER_DRAW, this.afterDraw, this, false);
    }
    /**
     * 停止
     */
    public stoped(): void {
        // cc.director.off(cc.Director.EVENT_BEFORE_UPDATE, this.beforeUpdate, this);
        // cc.director.off(cc.Director.EVENT_AFTER_UPDATE, this.afterUpdate, this);
        cc.director.off(cc.Director.EVENT_AFTER_DRAW, this.afterDraw, this);
    }
    private beforeUpdate(): void {
    }
    private afterUpdate(): void {
    }
    private afterDraw(): void {
        let now = performance.now();
        this.frame(now);
        this.sample(now);
        this._fps = Math.round((this._fps + this.human()) / 2);
        // gLog("FPS:" + this.human());
    }
    public start(now): void {
        this._time = now;

        // DISABLE: long time running will cause performance drop down
        // window.performance.mark(this._idstart);
    }
    public end(now): void {
        this._value = now - this._time;

        // DISABLE: long time running will cause performance drop down
        // window.performance.mark(this._idend);
        // window.performance.measure(this._id, this._idstart, this._idend);

        this._average(this._value, 0);
    }

    public tick() {
        this.end(0);
        this.start(0);
    }
    public frame(now) {
        let t = now;
        let e = t - this._time;
        this._total++;
        let avg = this._opts.average || 1000;

        if (e > avg) {
            this._value = this._total * 1000 / e;
            this._total = 0;
            this._time = t;
            this._average(this._value, 0);
        }
    }
}