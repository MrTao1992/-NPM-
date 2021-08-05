import Resolution from "./Resolution";
import { OrientationType } from "./Orientation";
import BaseAdapt from "./BaseAdapt";


const AdaptTarget = cc.Enum({
    None: 0,
    AdaptPosForTopBang: 1,          //针对顶部刘海，适配元素位置，通过调整Widget属性(竖屏往下移，左横屏往右移)
    AdaptPosForBottomBar: 2,        //针对底部横条，适配元素位置，通过调整Widget属性(竖屏往上移，左横屏往左移)
    AdaptSizeForTopBang: 3,         //针对顶部刘海，适配元素大小，(竖屏往下拉高，左横屏往右拉宽)
    AdaptSizeForBottomBar: 4,       //针对底部横条，适配元素大小，(竖屏往上拉高，左横屏往左拉宽)
});

const { ccclass, property } = cc._decorator;

@ccclass
export default class $BaseUI extends BaseAdapt {
    @property({
        type: AdaptTarget
    })
    target = AdaptTarget.AdaptPosForTopBang;

    @property({
        tooltip: "是否要适配控件大小"
    })
    adaptScale: boolean = false;

    @property({
        tooltip: "是否要动态调整位置距离"
    })
    dynamicDisX: number = 0;

    @property({
        tooltip: "是否要动态调系数"
    })
    coefficient: number = 0.5;

    private _widget: cc.Widget;

    onLoad() {
        this._widget = this.node.getComponent(cc.Widget);
        if (!this._widget) {
            this._widget = this.node.addComponent(cc.Widget);
        }
        let offset = Resolution.getOffset();
        this.adapt(offset);
    }

    public adapt(...args: any[]): void {
        this._widget.enabled = true
        this.adaptNodeWidget(args)
        super.adapt(args)
        var x = this.node.x;
        var y = this.node.y;

        // 实际屏幕比例
        let frameRatio = Resolution.frameAspectRatio;
        // 设计比例
        let designRatio = Resolution.designAspectRatio;

        //换算比例
        let ratio = frameRatio / designRatio

        if (this.dynamicDisX != 0) {
            this._widget.enabled = false
            x += (this.dynamicDisX * (ratio - 1) / this.coefficient)
            this.resetPos(cc.v2(x, y))
        }
        this.resetScale(ratio)
    }


    public resetScale(scale: number) {
        if (this.adaptScale) {
            this.node.setScale(scale)
        }
    }

    public resetPos(pos: cc.Vec2) {
        this.node.setPosition(pos);
    }

    adaptNodeWidget(...args: any[]) {
        let topOffset, bottomOffset = null
        if (args.length > 0 && args[0][0]) {
            let parameter = args[0][0]
            topOffset = parameter[0]
            bottomOffset = parameter[1]
        } else { return }
        switch (this.target) {
            case AdaptTarget.AdaptPosForTopBang:
                if (topOffset == 0) { return; }
                switch (Resolution.orientation) {
                    case OrientationType.Portrait:
                        this._widget.top += topOffset;
                        break;
                    case OrientationType.Landscape:
                        this._widget.left += topOffset;
                        break;
                    case OrientationType.RightLandscape:
                        this._widget.right += topOffset;
                        break;
                }
                break;
            case AdaptTarget.AdaptPosForBottomBar:
                if (bottomOffset == 0) { return; }
                switch (Resolution.orientation) {
                    case OrientationType.Portrait:
                        this._widget.bottom += bottomOffset;
                        break;
                    case OrientationType.Landscape:
                        this._widget.right += bottomOffset;
                        break;
                    case OrientationType.RightLandscape:
                        this._widget.left += bottomOffset;
                        break;
                }
                break;
            case AdaptTarget.AdaptSizeForTopBang:
                if (topOffset == 0) { return; }
                switch (Resolution.orientation) {
                    case OrientationType.Portrait:
                        this.node.anchorY = 1;
                        this.node.height += topOffset;
                        break;
                    case OrientationType.Landscape:
                        this.node.anchorX = 0;
                        this.node.width += topOffset;
                        break;
                    case OrientationType.RightLandscape:
                        this.node.anchorX = 1;
                        this.node.width += topOffset;
                        break;
                }
                break;
            case AdaptTarget.AdaptSizeForBottomBar:
                if (bottomOffset == 0) { return; }
                switch (Resolution.orientation) {
                    case OrientationType.Portrait:
                        this.node.anchorY = 0;
                        this.node.height += bottomOffset;
                        break;
                    case OrientationType.Landscape:
                        this.node.anchorX = 1;
                        this.node.width += bottomOffset;
                        break;
                    case OrientationType.RightLandscape:
                        this.node.anchorX = 0;
                        this.node.width += bottomOffset;
                        break;
                }
                break;
        }
    }

}


