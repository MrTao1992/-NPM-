
import { OrientationType } from "./Orientation";


//这里添加已知刘海机型
let topBangMachines = [
    { matchName: "iPhone X", topOffset: 50 },
    { matchName: "vivo X21A", topOffset: 50 },
];
//这里添加已知底部横条机型
let bottomBarMachines = [
    { matchName: "iPhone X", bottomOffset: 30 },
    { matchName: "vivo X21A", bottomOffset: 30 },
    { matchName: "M4 Pro", bottomOffset: 30 },
    { matchName: "M463C", bottomOffset: 30 },
    { matchName: "M351", bottomOffset: 30 },
];
export default class $Resolution {

    static frameSize;  // 屏幕逐帧大小
    static designSize; // 设计大小

    static frameAspectRatio;
    static screenSize;

    static designAspectRatio;
    static orientation;
    static isFullScreen;

    static offset = [];
    static init() {
        this.frameSize = cc.view.getFrameSize();
        console.log("屏幕宽高 : ", this.frameSize.width, this.frameSize.height);
        this.designSize = cc.Canvas.instance.designResolution;
        console.log("canvas宽高 : ", this.designSize.width, this.designSize.height);
        this.frameAspectRatio = this.frameSize.width / this.frameSize.height;
        console.log("屏幕宽高比: ", this.frameAspectRatio);
        this.designAspectRatio = this.designSize.width / this.designSize.height;
        console.log("canvas宽高比: ", this.designAspectRatio);
        this.orientation = this.designSize.height > this.designSize.width ? OrientationType.Portrait : OrientationType.Landscape;
        console.log("屏幕横竖屏: ", this.orientation);
        console.log('可视宽高 ', cc.view.getVisibleSize().width, cc.view.getVisibleSize().height);

        let R1 = this.frameSize.width / this.frameSize.height
        let R2 = 1136 / 640
        this.isFullScreen = R1 > R2;
        if (Math.abs(R1 - R2) < 0.2) {
            this.isFullScreen = false
        }
        this.setOffset();
    }
    /**
     * 优先根据设配名称做适配，如果不知道的根据分辨率适配。
     */
    static setOffset() {
        let deltaAspectRatio = 1 / $Resolution.designAspectRatio - 1 / $Resolution.frameAspectRatio;
        cc.log("deltaAspectRatio  ", deltaAspectRatio);
        let machine = null;
        if (cc.sys.platform == cc.sys.WECHAT_GAME) {
            // machine = wx.getSystemInfoSync().model;
        } else {
            //其他平台, 需要想办法拿到机型信息
        }
        let topOffset = 0;
        if (machine) {
            for (let i = 0; i < topBangMachines.length; i++) {
                if (machine.search(topBangMachines[i].matchName) > -1) {
                    topOffset = topBangMachines[i].topOffset;
                    break;
                }
            }
        }

        if (topOffset === 0 && deltaAspectRatio > 0) {
            topOffset = deltaAspectRatio * 150;
        }
        $Resolution.offset[0] = topOffset;

        let bottomOffset = 0;
        if (machine) {
            for (let i = 0; i < bottomBarMachines.length; i++) {
                if (machine.search(bottomBarMachines[i].matchName) > -1) {
                    bottomOffset = bottomBarMachines[i].bottomOffset;
                    break;
                }
            }
        }
        if (bottomOffset === 0 && deltaAspectRatio > 0) {
            bottomOffset = deltaAspectRatio * 10;
        }
        $Resolution.offset[1] = bottomOffset;
    }
    static getOffset() {
        return $Resolution.offset;
    }

    static setRoot(root: cc.Node) {
        let offset = this.getOffset();
        if (this.orientation == OrientationType.Portrait) {
            root.height -= offset[0];
            root.height -= offset[1];

        } else {
            root.width -= offset[0];
            root.width -= offset[1];
        }
    }
}
