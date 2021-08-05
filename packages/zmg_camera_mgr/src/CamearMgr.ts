import { Utils, gLog } from "zmg_util";
import { BaseMgr } from "zmg_mgr";

export class _CamearMgr extends BaseMgr implements zmg.ICamearMgr {
    private static _instance: _CamearMgr;
    private isFocusing: boolean = false

    public static getInstance(): _CamearMgr {
        if (!this._instance) {
            this._instance = new _CamearMgr();
        }
        return this._instance;
    }

    constructor() {
        super();
    }

    private _camearRect: cc.Rect;

    async start() {
        super.start();
        this.addEvents();
    }
    destroy() {
        this.removeEvents();
        super.destroy();
    }
    get isValid() {
        return true;
    }

    public getMain(): cc.Camera {
        return cc.Camera.main;
    }
    public getTop(): cc.Camera {
        var i: number;
        var now: cc.Camera;
        var len: number = cc.Camera.cameras.length;
        for (i = 0; i < len; i++) {
            if (now == null) {
                now = cc.Camera.cameras[i];
            } else {
                if (now.depth > cc.Camera.cameras[i].depth) {
                    now = cc.Camera.cameras[i];
                }
            }
        }
        return now;
    }

    public setCameraRect(rect: cc.Rect): void {
        if (rect == null) {
            return;
        }
        this._camearRect = rect;
        if (this.getMain()) {
            this.move(new cc.Vec2(rect.x, rect.y));
        }
    }

    public move(pos: cc.Vec2, radio?: number, camera?: cc.Camera): void {
        camera = camera ? camera : this.getMain();
        if (camera) {
            var node: cc.Node = camera.node;
            let width: number = cc.Canvas.instance.node.width;
            let height: number = cc.Canvas.instance.node.height;
            let dix: number = Math.abs(width - this._camearRect.width) / 2;
            let diy: number = Math.abs(height - this._camearRect.height) / 2;
            pos.x = pos.x - width / 2;
            pos.y = pos.y - height / 2;
            pos.x = Math.max(-dix, pos.x);
            pos.x = Math.min(dix, pos.x);
            pos.y = Math.max(-diy, pos.y);
            pos.y = Math.min(diy, pos.y);
            node.setPosition(pos);
            gLog("设置坐标:", pos.x, pos.y);
        } else {
            this._camearRect.x = pos.x;
            this._camearRect.y = pos.y;
        }
    }

    public getScreenToWorldPoint(pos: cc.Vec2): cc.Vec2 {
        let res: cc.Vec2 = pos;
        let top: cc.Camera = this.getTop();
        if (top) {
            top.getScreenToWorldPoint(pos, res);
        }
        return res;
    }
    public focus(camera: cc.Camera, radio: number, point?: cc.Vec2, onLaunched?: Function, target?: any): void {
        if (this.isFocusing) return
        this.isFocusing = true
        point = point ? point : new cc.Vec2();
        var cNode: cc.Node = camera.node;
        var r: number = radio / camera.zoomRatio;
        r = r > 1 ? 1 / r : r;
        cc.tween(cNode).stop();
        cc.tween(camera).stop();
        if (r < 1.05 && r > 0.95) {
            camera.zoomRatio = radio;
            this.isFocusing = false
        } else {
            cc.tween(camera).to(r / 2, { zoomRatio: radio }, { easing: "sineInOut" }).call(() => {
                this.isFocusing = false
                Utils.start(onLaunched, target);
            }).start();
        }
        if (point) {
            var dis: number = cc.Vec2.distance(cNode.getPosition(), point);
            var time: number = Math.round(dis / 10) / 100;
            if (dis < 20) {
                cNode.setPosition(point);
                this.isFocusing = false
            } else {
                cc.tween(cNode).to(time, { x: point.x, y: point.y }, { easing: "sineInOut" }).call(() => {
                    this.isFocusing = false
                }).start();
            }
        }
    }

    private addEvents(): void {
        // EventMgr.on(EventName.SCENE_CHANGE_END, this.onSceneEnd, this);
        // EventMgr.on(EventName.SCENE_CHANGE_START, this.onSceneStart, this);
    }

    private removeEvents(): void {
        // EventMgr.off(EventName.SCENE_CHANGE_END, this.onSceneEnd, this);
        // EventMgr.off(EventName.SCENE_CHANGE_START, this.onSceneStart, this);
    }

    private onSceneStart(): void {
        this._camearRect = null;
    }
    private onSceneEnd(): void {
        if (this._camearRect) {
            this.setCameraRect(this._camearRect);
        } else {
            let rect: cc.Rect = new cc.Rect();
            var width: number = cc.Canvas.instance.node.width;
            var height: number = cc.Canvas.instance.node.height;
            rect.x = width / 2;
            rect.y = height / 2;
            rect.width = width;
            rect.height = height;
            this.setCameraRect(rect);
        }
    }

    // public hideUI(uiNode: cc.Node): void {
    //     let cameras: cc.Camera[] = cc.Canvas.instance.getComponentsInChildren(cc.Camera);
    //     let i: number;
    //     let len: number = cameras.length;
    //     for (i = 0; i < len; i++) {
    //         if ((cameras[i].cullingMask >> 1) % 10 == 1) {
    //             //ui被渲染
    //             cameras[i].enabled = false;
    //         }
    //     }
    // }
    // public showUI(uiNode: cc.Node): void {
    //     let cameras: cc.Camera[] = cc.Canvas.instance.getComponentsInChildren(cc.Camera);
    //     let i: number;
    //     let len: number = cameras.length;
    //     for (i = 0; i < len; i++) {
    //         if ((cameras[i].cullingMask >> 1) % 10 == 1) {
    //             //uiMgr被渲染
    //             cameras[i].enabled = true;
    //         }
    //     }
    // }
    // public hideCanvas(uiNode: cc.Node): void {
    //     let cameras: cc.Camera[] = cc.Canvas.instance.getComponentsInChildren(cc.Camera);
    //     let i: number;
    //     let len: number = cameras.length;
    //     for (i = 0; i < len; i++) {
    //         if ((parseInt(cameras[i].cullingMask.toString(2))) % 10 == 1) {
    //             //Canvas被渲染
    //             cameras[i].enabled = false;
    //         }
    //     }
    // }
    // public showCanvas(uiNode: cc.Node): void {
    //     let cameras: cc.Camera[] = cc.Canvas.instance.getComponentsInChildren(cc.Camera);
    //     let i: number;
    //     let len: number = cameras.length;
    //     for (i = 0; i < len; i++) {
    //         if ((parseInt(cameras[i].cullingMask.toString(2))) % 10 == 1) {
    //             //Canvas被渲染
    //             cameras[i].enabled = true;
    //         }
    //     }
    // }

    /**
    * 渲染UI的镜头隐藏
    */
    public hideCamera(containsNode: cc.Node): void {
        if (cc.sys.isNative) {
            let i: number;
            let len: number = cc.Canvas.instance.node.childrenCount;
            for (i = 0; i < len; i++) {
                if (!cc.Canvas.instance.node.children[i].getComponent(cc.Camera)) {
                    if (cc.Canvas.instance.node.children[i].groupIndex == containsNode.groupIndex) {
                        if (cc.Canvas.instance.node.children[i].active) {
                            cc.Canvas.instance.node.children[i]["hide"] = true;
                            cc.Canvas.instance.node.children[i].active = false;
                        }
                    }
                }
            }
        } else {
            let cameras: cc.Camera[] = cc.Canvas.instance.getComponentsInChildren(cc.Camera);
            let i: number;
            let len: number = cameras.length;
            for (i = 0; i < len; i++) {
                if (cameras[i].containsNode(containsNode)) {
                    cameras[i].node.active = false;
                }
            }
        }

    }
    /**
    * 渲染UI的镜头显示
    */
    public showCamera(containsNode: cc.Node): void {
        if (cc.sys.isNative) {
            let i: number;
            let len: number = cc.Canvas.instance.node.childrenCount;
            for (i = 0; i < len; i++) {
                if (!cc.Canvas.instance.node.children[i].getComponent(cc.Camera)) {
                    if (cc.Canvas.instance.node.children[i].groupIndex == containsNode.groupIndex) {
                        if (cc.Canvas.instance.node.children[i]["hide"]) {
                            cc.Canvas.instance.node.children[i].active = true;
                        }
                    }
                }
            }
        } else {
            let cameras: cc.Camera[] = cc.Canvas.instance.getComponentsInChildren(cc.Camera);
            let i: number;
            let len: number = cameras.length;
            for (i = 0; i < len; i++) {
                if (cameras[i].containsNode(containsNode)) {
                    cameras[i].node.active = true;
                }
            }
        }
    }
}
