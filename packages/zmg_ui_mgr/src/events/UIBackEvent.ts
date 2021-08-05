import { EventName } from "zmg_event_mgr";
export class $UIBackEvent extends cc.Event {
    static BACK: string = EventName.UI_BACK_BTN;

    constructor() {
        super($UIBackEvent.BACK, false);
    }
}