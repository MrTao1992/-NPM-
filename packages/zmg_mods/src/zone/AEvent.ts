import { EventName } from "zmg_event_mgr";
import { Actor } from "zmg_ui_mgr";

export class $AEvent extends cc.Event {
    /**
     * 人物移动过程
     */
    static ROLE_MOVE: string = "roleMove";

    /**
     * 人物开始移动
     */
    static ROLE_WALK: string = "roleWalk";

    /**
     * 人物站立(结束移动)
     */
    static ROLE_STAND: string = "roleStand";

    /**
     * 请求人物移动到当前位置的事件 
     */
    static ZONE_MOVE: string = EventName.UI_ZONE_MOVE;

    protected _worldPos: cc.Vec2;

    public get worldPos(): cc.Vec2 {

        return this._worldPos ? this._worldPos : Actor().node.getPosition();
    }

    public set worldPos(pos: cc.Vec2) {
        this._worldPos = pos;
    }

    constructor(type: string, bubbles: boolean = false) {
        super(type, bubbles);
    }
}