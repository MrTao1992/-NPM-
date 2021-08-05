import { AudioMgr } from "zmg_audio_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import $BaseUI from "zmg_ui_mgr/src/sysui/BaseUI";
import { $UIBackEvent } from "../events/UIBackEvent";

export class $UIBackBtn extends $BaseUI implements zmg.IBackBtn {
    constructor(url: string) {
        super(url);
    }
    public show(): void {
        super.show();
    }
    public hide(): void {
        super.hide();
    }
    addEvents() {
        super.addEvents();
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, false);
        EventMgr.on(EventName.CONTROLLER_CHANGE_START, this.onSceneStart, this, false);
    }

    removeEvents() {
        super.removeEvents();
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, false);
        EventMgr.off(EventName.CONTROLLER_CHANGE_START, this.onSceneStart, this);
    }
    private onSceneStart(): void {
        this.resetStyle();
    }
    private onTouchEnd(): void {
        AudioMgr.click();
        EventMgr.dispatchEvent(new $UIBackEvent());
    }
}