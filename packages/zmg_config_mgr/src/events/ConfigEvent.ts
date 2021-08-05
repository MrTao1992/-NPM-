import { EventName } from "zmg_event_mgr";

export class $ConfigEvent extends cc.Event {
    static ERROR: string = EventName.CONFIG_ERROR;
    static LOADED: string = EventName.CONFIG_LOADED;

    public path: string | string[];

    constructor(type: string) {
        super(type, false);
    }
}