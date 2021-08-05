const { ccclass, property } = cc._decorator;

export enum EShowHideType {
    alpha,
    scale,
}

export default class $ShowHideSprite extends cc.Component {

    @property({ type: cc.Node })
    target: cc.Node = null;

    @property({ type: cc.Enum(EShowHideType) })
    type: EShowHideType = EShowHideType.alpha;

    @property({ tooltip: "渐变效果时间" })
    time: number = 0.2;

    private _isShow: boolean;
    onLoad(): void {

    }
    public isShow(): boolean {
        return this._isShow;
    }
    public show(effect: boolean = true): void {
        this._isShow = true;
        if (effect) {
            this.target.active = true;
            this.target.stopAllActions();
            switch (this.type) {
                case EShowHideType.alpha:
                    if (this.target.opacity != 0xff) {
                        cc.tween(this.target).to(this.time, { opacity: 0xff }, { easing: "smooth" }).start();
                    }
                    break;
                case EShowHideType.scale:
                    if (this.target.scale != 1) {
                        cc.tween(this.target).to(this.time, { scale: 1 }, { easing: "smooth" }).start();
                    }
                    break;
            }
        } else {
            switch (this.type) {
                case EShowHideType.alpha:
                    this.target.opacity = 0xff;
                    break;
                case EShowHideType.scale:
                    this.target.scale = 1.0;
                    break;
            }
            this.node.active = true;
        }
    }
    public hide(effect: boolean = true): void {
        this._isShow = false;
        if (effect) {
            if (this.target.active) {
                this.target.stopAllActions();
                switch (this.type) {
                    case EShowHideType.alpha:
                        cc.tween(this.target).to(this.time, { opacity: 0 }, { easing: "smooth" }).call(() => {
                            this.target.active = false;
                        }).start();
                        break;
                    case EShowHideType.scale:
                        cc.tween(this.target).to(this.time, { scale: 0 }, { easing: "smooth" }).call(() => {
                            this.target.active = false;
                        }).start();
                        break;
                }
            }
        } else {
            this.target.active = false;
        }

    }
}