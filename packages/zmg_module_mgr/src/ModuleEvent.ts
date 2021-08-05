import { EventName } from "zmg_event_mgr";

export class ModuleEvent extends cc.Event {
    public static CHANGE: string = EventName.MODULE_CHANGE;
    public static GAME_OVER: string = EventName.GAME_OVER;
    public nowModule: string;
    public toModule: string;
    constructor(type: string, nowModule?: string, toModule?: string) {
        super(type, false);
        this.toModule = toModule;
        this.nowModule = nowModule;
    }
}