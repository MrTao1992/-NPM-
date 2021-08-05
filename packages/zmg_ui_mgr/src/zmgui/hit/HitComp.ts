import { GraphUtil } from "zmg_util";

const { ccclass, property } = cc._decorator;

export default class $HitComp extends cc.Component {

    protected _col: cc.Collider;
    onLoad(): void {
        this._col = this.node.getComponent(cc.Collider);
    }
    /**
    * 传入为世界坐标
    * @param pos 
    * @param ty 
    */
    public hitTest(pos: cc.Vec2 | number, ty?: number): boolean {
        if (!this.node.activeInHierarchy) return false;
        pos = pos instanceof cc.Vec2 ? pos : new cc.Vec2(pos, ty);
        if (this._col) {
            let ishit = GraphUtil.hitTest(pos, this._col);
            return ishit;
        }
        return this.node["_hitTest"](pos);
    }

}