// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import BaseAdapt from "./BaseAdapt";
import Resolution from "./Resolution";

const { ccclass, property } = cc._decorator;

@ccclass
export default class $BtnAdapt extends BaseAdapt {
    @property({ tooltip: "全面屏下是否是加长宽适配" })
    isAddWidth: boolean = true

    @property({ tooltip: "全面屏下是否是保持按钮视图大小" })
    isOrginSize: boolean = false

    adapt() {
        let widght = this.node.getComponent(cc.Widget)
        let top = widght.top
        let left = widght.left
        let right = widght.right
        let bottom = widght.bottom
        if (Resolution.isFullScreen && !widght['isAdapt']) {
            if (this.isAddWidth) {
                if (widght.left != 0)
                    widght.left = left + 30
                if (widght.right != 0)
                    widght.right = right + 30
            } else {
                if (widght.top != 0)
                    widght.top = top + 15
                if (widght.bottom != 0)
                    widght.bottom = bottom + 15
            }
            widght['isAdapt'] = true
        }
        if (this.isOrginSize) {
            //换算比例
            let ratio = Resolution.frameAspectRatio / Resolution.designAspectRatio
            let scaleTempX = this.node.scaleX * ratio
            let scaleTempY = this.node.scaleY * ratio
            if (this.node['oldScaleX'] != undefined && this.node['oldScaleY'] != undefined) {
                scaleTempX = this.node['oldScaleX'] * ratio
                scaleTempY = this.node['oldScaleY'] * ratio
            } else {
                this.node['oldScaleX'] = this.node.scaleX
                this.node['oldScaleY'] = this.node.scaleY
            }
            this.node.setScale(Math.max(scaleTempX, 0.9), Math.max(scaleTempY, 0.9))
        }
        widght.updateAlignment();

    }

}
