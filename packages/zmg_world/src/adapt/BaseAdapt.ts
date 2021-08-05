
import { EventMgr } from "zmg_event_mgr";
import Resolution from "./Resolution";
import { GameEvent } from "..";


const { ccclass } = cc._decorator;

@ccclass
export default class $BaseAdapt extends cc.Component {
    protected wids: cc.Widget[] = []
    onLoad() {
        // 设置游戏窗口变化的回调
        cc.view.setResizeCallback(() => this.onResize());
    }

    public adapt(...args: any[]): void {
        this.wids = this.node.getComponentsInChildren(cc.Widget);
        var i: number;
        var len: number = this.wids.length;
        for (i = 0; i < len; i++) {
            this.wids[i].updateAlignment();
        }
    }

    private onResize() {
        let offset = Resolution.getOffset();
        EventMgr.emit(GameEvent.VIEW_RESIZE, offset);
    }

    protected onEnable() {
        this.adapt()
        EventMgr.on(GameEvent.VIEW_RESIZE, this.adapt, this);
    }
    protected onDisable() {
        EventMgr.off(GameEvent.VIEW_RESIZE, this.adapt, this);
    }
    onDestroy() { }
}