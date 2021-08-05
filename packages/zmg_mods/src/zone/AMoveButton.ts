/*
 * @Description: 
 */

import { EventMgr } from "zmg_event_mgr";
import { Actor, zmgui_btn_SimpleBtn } from "zmg_ui_mgr";
import { GraphUtil, gWarn } from "zmg_util";
import $AZone from "./AZone";
import { $AEvent } from "./AEvent";
import { $ANode } from "./ANode";
import $SimpleBtn from "zmg_ui_mgr";

const { ccclass, property } = cc._decorator;

export default class $AMoveButton extends zmgui_btn_SimpleBtn {
    @property({ tooltip: "人物移动到位置后触发" })
    worldPos: cc.Vec2 = new cc.Vec2();

    @property({ tooltip: "移动后触发" })
    isMove: boolean = true;

    onLoad() {
        super.onLoad();
        let zone: $AZone = cc.Canvas.instance.getComponentInChildren($AZone);
        zone.onReady(this.checkPoint, this);
    }

    /**
     * 检查移动位置是否可以行走
     */
    protected checkPoint(): void {
        let zone: $AZone = cc.Canvas.instance.getComponentInChildren($AZone);
        let anode: $ANode = zone.getNode(this.worldPos);
        if (!anode || !anode.walkable) {
            gWarn("name:" + this["node"].name + " x:" + this.worldPos.x + " y:" + this.worldPos.y + ",当前设定点不可移动!");
        }
    }

    protected onHandler(evt?: cc.Event.EventTouch): void {
        if (this.isMove) {
            if (!this.onRoleStand()) {
                let zevt: $AEvent = new $AEvent($AEvent.ZONE_MOVE);
                zevt.worldPos = this.worldPos;
                EventMgr.dispatchEvent(zevt);
                Actor().node.on($AEvent.ROLE_STAND, this.onRoleStand, this, false);
                Actor().node.on($AEvent.ROLE_WALK, this.onRoleWalk, this, false);
            }
        } else {
            super.onHandler();
        }
    }

    onEnable(): void {
        super.onEnable();
    }

    onDisable(): void {
        Actor().node.off($AEvent.ROLE_STAND, this.onRoleStand, this, false);
        Actor().node.off($AEvent.ROLE_WALK, this.onRoleWalk, this, false);
        super.onDisable();
    }
    private onRoleWalk(evt?: $AEvent): void {
        Actor().node.off($AEvent.ROLE_STAND, this.onRoleStand, this, false);
        Actor().node.off($AEvent.ROLE_WALK, this.onRoleWalk, this, false);
    }
    private onRoleStand(evt?: $AEvent): boolean {
        let zone: $AZone = cc.Canvas.instance.getComponentInChildren($AZone);
        let rolePos: cc.Vec2 = Actor().node.getPosition();
        if (zone.hitTest(rolePos.x, rolePos.y, this.worldPos.x, this.worldPos.y)) {
            Actor().node.off($AEvent.ROLE_STAND, this.onRoleStand, this, false);
            super.onHandler();
            return true;
        }
        return false;
    }
    // onLoad () {}

    // start () {},

    // update (dt) {}

}
