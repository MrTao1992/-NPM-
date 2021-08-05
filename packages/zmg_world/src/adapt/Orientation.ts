
import Resolution from "./Resolution";

//屏幕方向，小游戏中只有两种。竖屏和左横屏
export enum OrientationType {
    Portrait,
    Landscape,
    RightLandscape, // 暂时还不支持。
};

export default class $Orientation {
    private static _isOrientationH(val: OrientationType) {
        var frameSize = cc.view.getFrameSize();
        if (val) {
            return frameSize.height < frameSize.width;
        } else {
            return frameSize.height > frameSize.width;
        }

    }

    // true 是切换到横屏false 是切换到竖屏
    static changeOrientation(val: OrientationType, cb) {

        if (this._isOrientationH(val)) {
            console.log(" 已经是竖屏游戏")
            return;
        }

        if (val == OrientationType.Landscape) {
            Resolution.orientation = OrientationType.Landscape
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        } else {
            Resolution.orientation = OrientationType.Portrait
            cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
        }

        if (cb) {
            cb();
        }

    }
}