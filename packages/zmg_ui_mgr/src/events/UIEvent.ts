import { EventName } from "zmg_event_mgr";
export class $UIEvent extends cc.Event {
    static COMPLETE: string = EventName.UI_READY;
    static TOAST_HIDE: string = "toastHide";
    static TOAST_SHOW: string = "toastshow";

    static VIDEO_HIDE: string = EventName.UI_VIDEO_HIDE;
    static VIDEO_SHOW: string = EventName.UI_VIDEO_SHOW;

    static LOAD_HIDE: string = EventName.UI_LOAD_HIDE;
    static LOAD_SHOW: string = EventName.UI_LOAD_SHOW;

    public param: any;
    public target: any;
    constructor(type: string, param?: any) {
        super(type, false);
        this.param = param;
    }
}