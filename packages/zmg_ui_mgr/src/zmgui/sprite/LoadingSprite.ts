const { ccclass, property } = cc._decorator;

export default class $LoadingSprite extends cc.Component {

    @property({ type: cc.Node })
    target: cc.Node = null;

    @property({ type: cc.Node })
    refresh: cc.Node = null;

    private _isLoading: boolean = true;
    onLoad(): void {
        if (this._isLoading) {
            this.loading();
        }
    }

    public isLoading(): boolean {
        return this._isLoading;
    }

    public loading(): void {
        this._isLoading = true;
        this.refresh.stopAllActions();
        this.target.stopAllActions();
        if (this.target.active) {
            this.target.opacity = 0xff;
            cc.tween(this.refresh).repeatForever(cc.tween().by(1, { angle: -360 }, { easing: "smooth" })).start();
        } else {
            this.target.active = true;
            cc.tween(this.target).to(0.2, { opacity: 0xff }).call(() => {
                cc.tween(this.refresh).repeatForever(cc.tween().by(1, { angle: -360 }, { easing: "smooth" })).start();
                this.target.active = false;
            }).start();
        }
    }

    public loaded(): void {
        this._isLoading = false;
        if (this.target.active) {
            this.target.stopAllActions();
            this.refresh.stopAllActions();
            cc.tween(this.target).to(0.2, { opacity: 0 }).call(() => {
                this.target.active = false;
            }).start();
        }
    }
}