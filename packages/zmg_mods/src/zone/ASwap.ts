import { TimeMgr } from "zmg_time_mgr";
import { UIMgr } from "zmg_ui_mgr";
import { gLog } from "zmg_util";
import $ATarget from "./ATarget";

const { ccclass, property } = cc._decorator;

export default class $ASwap extends cc.Component {
    private _isUpdate: boolean;
    onLoad() {
        TimeMgr.doTimer(200, this.onTimer, this);
    }

    private onTimer(): void {
        if (this._isUpdate) {
            this._isUpdate = false;
            gLog("排序开始..." + this.node.children.length);
            this.node.children.sort(this.sortNode);
            if (CC_JSB) {
                let i: number;
                let len: number = this.node.children.length;
                for (i = 0; i < len; i++) {
                    this.node.children[i].zIndex = i;
                }
            }
        }
    }

    public updateAlignment(): void {
        this._isUpdate = true;
    }
    private sortNode(a: cc.Node, b: cc.Node): number {
        if (a.y > b.y) {
            return -1;
        } else if (a.y < b.y) {
            return 1;
        }
        return 0;
    }
    public addMove(move: $ATarget): void {
        move.node.setParent(this.node);
        this.updateAlignment();
    }

    onEnable(): void {
        UIMgr.mouse.setEffectParent(this.node);
    }
    onDisable(): void {
        UIMgr.mouse.setEffectParent(null);
    }
}