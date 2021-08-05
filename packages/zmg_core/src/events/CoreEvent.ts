import { EventName, } from "zmg_event_mgr";
import { ECoreCode } from "./ECoreCode";

export class CoreEvent extends cc.Event {
    static READY: string = EventName.CORE_READY;
    static ERROR: string = EventName.CORE_ERROR;
    public code: ECoreCode;
    constructor(type: string) {
        super(type, false);
    }
}