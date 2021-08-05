/**
 * 
 */

import { $UIMask } from "../UIMask";


const { ccclass, property } = cc._decorator;

export class $RewardLayer extends cc.Component {

    static REWARD_OVER = 'rewardOver';
    static REWARD_START = 'rewardStart';

    @property({ type: dragonBones.ArmatureDisplay })
    reward: dragonBones.ArmatureDisplay = null;

    @property({ type: dragonBones.ArmatureDisplay })
    noreward: dragonBones.ArmatureDisplay = null;

    @property({ type: cc.Label })
    label: cc.Label = null;

    private _count: number = 0;
    private _parent: cc.Node;
    private _mask: $UIMask;
    public setParent(parent: cc.Node): void {
        this._parent = parent;
    }
    public setMask(mask: $UIMask): void {
        this._mask = mask;
    }
    onLoad() {
        let reward = this.node.getChildByName("reward");
        this.reward = reward.getComponent(dragonBones.ArmatureDisplay);
        let noreward = this.node.getChildByName("noreward")
        this.noreward = noreward.getComponent(dragonBones.ArmatureDisplay);
        let labelNode = this.node.getChildByName("label")
        labelNode && (this.label = labelNode.getComponent(cc.Label));
        this.reward.node.active = false;
        this.noreward.node.active = false;
    }

    onEnable(): void {
        this.reward.addEventListener(dragonBones.EventObject.COMPLETE, this.rewardComplete, this);
        this.noreward.addEventListener(dragonBones.EventObject.COMPLETE, this.rewardComplete, this);
    }
    onDisable(): void {
        this._mask && this._mask.hide("RewardLayer");
        this.reward.removeEventListener(dragonBones.EventObject.COMPLETE, this.rewardComplete, this);
        this.noreward.removeEventListener(dragonBones.EventObject.COMPLETE, this.rewardComplete, this);
    }

    private rewardComplete(): void {
        this.hide();
        this._mask && this._mask.hide("RewardLayer");
        this.node.emit($RewardLayer.REWARD_OVER);
    }

    public show(num: number): void {
        this._count = num;
        if (!this.node.parent) {
            this.node.setParent(this._parent);
        }
        if (this._count) {
            this.reward.timeScale = 1;
            this.reward.node.active = true;
            this.reward.playAnimation("donghua", 1);
        } else {
            this.noreward.timeScale = 1;
            this.noreward.node.active = true;
            this.noreward.playAnimation("donghua", 1);
        }
        if (num) {
            this.label.node.active = true;
            this.label.string = '+' + num;
            this.label.node.y = 160;
            this.label.node.opacity = 0;
            cc.tween(this.label.node).to(0.3, { opacity: 0xff, x: 0, y: 220 }, { easing: "smooth" }).delay(1.0).start();
        } else {
            this.label.node.active = false;
        }
        this._mask && this._mask.show("RewardLayer");
        this.node.emit($RewardLayer.REWARD_START);
    }

    public hide(): void {
        if (this.node.parent) {
            this.reward.node.active = false;
            this.noreward.node.active = false;
            this.node.setParent(null);
        }
    }
}
