import { EventName } from "zmg_event_mgr";
export class $UIMouseEvent extends cc.Event {
    /**
     *  
     */
    static MOUSE_UP: string = EventName.UI_MOUSE_UP;
    static MOUSE_DOWN: string = EventName.UI_MOUSE_DOWN;
    static MOUSE_MOVE: string = EventName.UI_MOUSE_MOVE;
    static TOUCH_MOVE: string = EventName.UI_TOUCH_MOVE;

    static create(type: string, worldPos: cc.Vec2): $UIMouseEvent {
        let evt: $UIMouseEvent = new $UIMouseEvent(type, worldPos);
        return evt;
    }


    public worldPos: cc.Vec2;
    public used: boolean = false;



    public getWorldPos(): cc.Vec2 {
        return this.worldPos;
    }

    public getLocation(node?: cc.Node): cc.Vec2 {
        if (cc.isValid(node)) {
            return node.convertToNodeSpaceAR(this.worldPos);
        }
        return this.worldPos;
    }
    public getIsHitNode(node: cc.Node): boolean {
        if (cc.isValid(node) && node.activeInHierarchy && node.opacity) {
            return node["_hitTest"](this.worldPos);
        }
        return false;
        // return node.convertToNodeSpaceAR(this.worldPos);
    }
    public getCanvasPos(): cc.Vec2 {
        return this.getLocation(cc.Canvas.instance.node);
    }
    constructor(type: string, worldPos: cc.Vec2,) {
        super(type, false);
        this.worldPos = worldPos;
    }
}