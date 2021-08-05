import { EventName } from "zmg_event_mgr";

export class $DirectorEvent extends cc.Event {
    public static SCENE_CHANGE_DESTORY = EventName.CONTROLLER_CHANGE_DESTORY;
    public static SCENE_CHANGE_START = EventName.CONTROLLER_CHANGE_START;
    public static SCENE_CHANGE_END = EventName.CONTROLLER_CHANGE_END;
    public static SCENE_CHANGE_PROGRESS = EventName.CONTROLLER_CHANGE_PROGRESS;
    public static SCENE_CHANGE_FAIL = EventName.CONTROLLER_CHANGE_FAIL;

    public static SOUND_CLOSE = EventName.CONTROLLER_SOUND_CLOSE;
    public static SOUND_OPEN = EventName.CONTROLLER_SOUND_OPEN;

    public preSceneName: string;
    public nextSceneName: string;
    public param: any;
    public progress: number;
    constructor(type: string, preSceneName?: string, nextSceneName?: string) {
        super(type, false);
        this.preSceneName = preSceneName;
        this.nextSceneName = nextSceneName;
    }
}