import { EventName } from "zmg_event_mgr";

export class $RoleEvent extends cc.Event {
    public static ACTION_CHANGE = EventName.UI_ROLE_ACTION_CHANGE;
    public param: any;
    constructor(type: string, param: any) {
        super(type, false);
        this.param = param;
    }
}