import { AudioMgr } from "zmg_audio_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import { UIMgr, UIMouse, UIMouseEvent } from "zmg_ui_mgr";
import $HitComp from "./HitComp";

const { ccclass, property } = cc._decorator;

export default class $BlackHitComp extends $HitComp {
    @property({ tooltip: '优先级' })
    priority: number = 0;

    addListener(): void {
        EventMgr.on(UIMouseEvent.MOUSE_UP, this.onMouseEnd, this, false, this.priority);
        EventMgr.on(UIMouseEvent.MOUSE_DOWN, this.onMouseStart, this, false, this.priority);
    }
    removeListener(): void {
        EventMgr.off(UIMouseEvent.MOUSE_UP, this.onMouseEnd, this);
        EventMgr.off(UIMouseEvent.MOUSE_DOWN, this.onMouseStart, this);

    }
    onEnable() {
        this.addListener();
    }
    onDisable(): void {
        this.removeListener()
    }

    protected onMouseEnd(evt: UIMouseEvent): void {
        evt.stopped();
    }
    protected onMouseStart(evt: UIMouseEvent): void {
        evt.stopped();
    }

}