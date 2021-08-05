/**
 * 
 */

const { ccclass, property } = cc._decorator;

export default class $StateSprite extends cc.Component {

    @property({ type: cc.SpriteFrame })
    frames: cc.SpriteFrame[] = [];

    @property({ type: cc.Integer })
    frameIndex: number = 0;

    @property({ type: cc.Sprite })
    sprite: cc.Sprite = null;

    public setState(v: number) {
        this.frameIndex = v;
        if (this.sprite) {
            this.sprite.spriteFrame = this.frames[this.frameIndex];
        }
    }
    onLoad() {
        if (this.sprite == null) {
            this.sprite = this.getComponent(cc.Sprite);
        }
        if (this.sprite) {
            this.sprite.spriteFrame = this.frames[this.frameIndex];
        }
    }

    public clean(): void {
        this.node.stopAllActions();
        this.destroy();
    }
    public random(): void {
        this.setState(Math.floor(Math.random() * this.frames.length));
    }
}
