import { EventName } from "zmg_event_mgr";
import { gLog } from "zmg_util";

export class _zmTween {
    private _target: any;
    constructor(target: any) {
        this._target = target;
    }

    to<OPTS extends Partial<{ progress: Function, easing: Function | String }>>(duration: number, props: any, opts?: OPTS): cc.Tween {
        this.fullFrameRatio();
        if (this._target instanceof cc.Node) {
            this._target.on(EventName.DESTROY_NODE, this.recoverFrameRatioHandler, this);
        }
        return cc.tween(this._target).to(duration, props, opts).call(() => {
            //减慢屏刷速度
            this.recoverFrameRatio();
            if (this._target instanceof cc.Node) {
                this._target.off(EventName.DESTROY_NODE, this.recoverFrameRatioHandler, this);
            }
        });
    }
    recoverFrameRatioHandler(node: cc.Node) {
        this.recoverFrameRatio();
        this._target.off(EventName.DESTROY_NODE, this.recoverFrameRatioHandler, this);
    }
    recoverFrameRatio() {
        cc.game["recoverFrameRatio"] && cc.game["recoverFrameRatio"]();
    }

    fullFrameRatio() {
        cc.game["fullFrameRatio"] && cc.game["fullFrameRatio"]();
    }
    repeatForever(action?: cc.Action | cc.Tween): cc.Tween {
        this.fullFrameRatio();
        if (this._target instanceof cc.Node) {
            this._target.on(EventName.DESTROY_NODE, this.recoverFrameRatioHandler, this);
        }
        return cc.tween(this._target).repeatForever(action);
    }



    stopAllActions(): void {
        if (this._target.stopAllActions()) {
            this.recoverFrameRatio();
            if (this._target instanceof cc.Node) {
                this._target.off(EventName.DESTROY_NODE, this.recoverFrameRatioHandler, this);
            }
        }
    }

}