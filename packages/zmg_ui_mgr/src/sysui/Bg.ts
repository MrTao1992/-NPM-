import { gLog } from "zmg_util";
import $BaseUI from "./BaseUI";

export class $Bg extends $BaseUI implements zmg.IBg {
    constructor(url: string, parent: cc.Node) {
        super(url);
        this._parent = parent;
    }
    protected opacityHide(time: number): void {
        this._isActive = false;
        if (this.node.parent) {
            this.node.stopAllActions();
            cc.tween(this.node).to(time, { opacity: 0 }, { easing: "smooth" }).call(() => {
                this.node.opacity = 0xff;
                this.node.setParent(null);
            }).start();
        }
    }

    protected opacityShow(time: number): void {
        this._isActive = true;
        if (!this.node.parent) {
            this.node.setParent(this._parent);
            this.node.opacity = 0;
            this.node.stopAllActions();
            cc.tween(this.node).to(time, { opacity: 0xff }, { easing: "smooth" }).start();
        } else {
            if (this.node.opacity != 0xff) {
                this.node.stopAllActions();
                cc.tween(this.node).to(time, { opacity: 0xff }, { easing: "smooth" }).start();
            }
        }
    }
    public show(): void {
        gLog("显示背景");
        // this.opacityShow(0.4);
        super.show();
    }
    public hide(): void {
        gLog("隐藏背景");
        // this.opacityHide(0.4);
        super.hide();
    }
}