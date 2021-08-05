import $BaseUI from "./BaseUI";
import { EventMgr, EventName } from "zmg_event_mgr";
import { ResMgr, SystemBundleName } from "zmg_res_mgr";
import { ConfigMgr } from "zmg_config_mgr";
import { $UIMask } from "./UIMask";
import { $RewardLayer } from "./UILayer/RewardLayer";
import { EUIZindex } from "./EUIZindex";
import { gLog, gWarn, StringUtil } from "zmg_util";
import { $UIEvent } from "../events/UIEvent";
import { CamearMgr } from "zmg_camera_mgr";
import { UIMgr } from "zmg_ui_mgr";

enum EUILayerZindex {
    video = 0,
    activity = 2,
    window = 1,
    reward = 3,

}

export class $UILayer extends $BaseUI implements zmg.IBg {
    /**
     * 窗口界面
     */
    private _windowsLayer: cc.Node;

    /**
    * 视频界面
    */
    private _videoLayer: cc.Node;
    /**
     * 交互层
     */
    private _activityLayer: cc.Node;
    /**
     * 奖励弹窗
     */
    private _rewardLayer: $RewardLayer;
    private _mask: $UIMask;
    private _isVideoPrefabLoading: boolean;
    private _isVideoUrl: string;
    public setMask(mask: $UIMask): void {
        this._mask = mask;
        if (this._rewardLayer) {
            this._rewardLayer.setMask(this._mask);
        }
    }
    constructor() {
        super("");
    }
    public get node(): cc.Node {
        return this._node;
    }
    public get activityLayer(): cc.Node {
        return this._activityLayer;
    }

    get isValid(): boolean {
        return this.node ? true : false;
    }

    public getComponent<T extends cc.Component>(type: { prototype: T }): T {
        let content: cc.Node = this._windowsLayer.children[0];
        if (content) {
            return content.getComponent(type);
        }
        return null;
    }

    public getContent(): cc.Node {
        return this._windowsLayer.children[0];
    }

    public reward(num: number): void {
        if (this._rewardLayer) {
            this._rewardLayer.show(num);
        }
    }

    public closeVideo(): void {
        gLog("关闭视频组件");
        if (cc.isValid(this._videoLayer)) {
            UIMgr.mask.hide("Video");
            CamearMgr.showCamera(cc.Canvas.instance.node);
            this._isVideoUrl = "";
            this._videoLayer.destroy();
            this._videoLayer = null;
            EventMgr.dispatchEvent(new $UIEvent($UIEvent.VIDEO_HIDE));
        }
    }

    public showVideo(url: string, isCtrl: boolean = true): void {
        this._isVideoUrl = url;
        if (this._isVideoPrefabLoading) {
            gLog("视频组件正在加载中 ...");
            return;
        }
        if (!StringUtil.isValid(this._isVideoUrl)) {
            gLog("地址为空，无法播放.");
            return;
        }
        if (this._videoLayer) {
            UIMgr.hideLoading();
            UIMgr.mask.show("Video", 1);
            gLog("开始播放视频:" + this._isVideoUrl);
            CamearMgr.hideCamera(cc.Canvas.instance.node);
            let video: cc.VideoPlayer = this._videoLayer.getComponentInChildren(cc.VideoPlayer);
            video.resourceType = cc.VideoPlayer.ResourceType.REMOTE;
            video.remoteURL = this._isVideoUrl;
            this._videoLayer.setParent(this._node);
            EventMgr.dispatchEvent(new $UIEvent($UIEvent.VIDEO_SHOW, { isCtrl: isCtrl }));
        } else {
            this._isVideoPrefabLoading = true;
            gLog("开始下载视频组件...");
            ResMgr.load(SystemBundleName.UI, ConfigMgr.uiconfig.video, (prefab: cc.Prefab) => {
                gLog("创建视频组件...");
                this._isVideoPrefabLoading = false;
                this._videoLayer = cc.instantiate(prefab);
                this._videoLayer.zIndex = EUILayerZindex.video;
                this.showVideo(this._isVideoUrl, isCtrl);
            }, this);
        }

    }

    public showNode(windows: cc.Node | cc.Prefab, opacity?: number): cc.Node {
        this.close();
        try {
            if (windows instanceof cc.Prefab) {
                windows = cc.instantiate(windows);
            }
            windows.zIndex = 1;
            this._mask && this._mask.show("UILayer", opacity);
            windows.setParent(this._windowsLayer);
            this.scaleShow(0.3, windows)
            return windows;
        } catch (e) {
            gWarn("资源非法，无法进行显示！", windows ? windows.name : "节点无命名");
            return new cc.Node();
        }
    }

    init(url: string): void {
        let n: cc.Node = new cc.Node();
        let widget = n.addComponent(cc.Widget);
        widget.isAlignLeft = true;
        widget.isAlignRight = true;
        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.left = widget.right = widget.top = widget.bottom = 0;
        n.group = "UI";
        n.name = "UILayer";
        n.zIndex = EUIZindex.uiLayer;
        this._target = n.addComponent(cc.Component);
        let ui: zmg.IUIConfig = ConfigMgr.uiconfig;

        this._windowsLayer = new cc.Node();
        this._windowsLayer.zIndex = EUILayerZindex.window;
        widget = this._windowsLayer.addComponent(cc.Widget);
        widget.isAlignLeft = true;
        widget.isAlignRight = true;
        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.left = widget.right = widget.top = widget.bottom = 0;
        this._windowsLayer.name = "windowsLayer";
        this._windowsLayer.setParent(n);
        this._activityLayer = new cc.Node();
        this._activityLayer.zIndex = EUILayerZindex.activity;
        widget = this._activityLayer.addComponent(cc.Widget);
        widget.isAlignLeft = true;
        widget.isAlignRight = true;
        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.left = widget.right = widget.top = widget.bottom = 0;
        this._activityLayer.name = "activityLayer";
        this._activityLayer.setParent(n);

        this._node = n;
        this.initReward();
        this.onLoad();
    }

    addEvents(): void {
        // EventMgr.on(EventName.CONTROLLER_CHANGE_END, this.onSceneEnd, this, false);
        EventMgr.on(EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this, false);
        // EventMgr.on(EventName.UI_BACK_BTN, this.onBackHanler, this, false, Number.MAX_SAFE_INTEGER);
        super.addEvents();
    }
    removeEvents(): void {
        // EventMgr.off(EventName.CONTROLLER_CHANGE_END, this.onSceneEnd, this);
        EventMgr.off(EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this);
        // EventMgr.off(EventName.UI_BACK_BTN, this.onBackHanler, this);
        if (this._rewardLayer) {
            this._rewardLayer.node.off($RewardLayer.REWARD_START, this.onRewardStart, this);
            this._rewardLayer.node.off($RewardLayer.REWARD_OVER, this.onRewardOver, this);
        }
        super.removeEvents();
    }

    // private onBackHanler(evt: $UIBackEvent): void {
    //     if (this._videoLayer && this._videoLayer.parent) {
    //         this.closeVideo();
    //         evt["stopped"]();
    //     }
    // }

    private initReward(): void {
        ResMgr.load(SystemBundleName.UI, ConfigMgr.uiconfig.reward, (res: cc.Prefab) => {
            let rNode: cc.Node = cc.instantiate(res);
            rNode.zIndex = EUILayerZindex.reward;
            this._rewardLayer = rNode.addComponent($RewardLayer);
            this._rewardLayer.setParent(this._node);
            if (this._mask) {
                this._rewardLayer.setMask(this._mask);
            }
            this._rewardLayer.node.on($RewardLayer.REWARD_START, this.onRewardStart, this, false);
            this._rewardLayer.node.on($RewardLayer.REWARD_OVER, this.onRewardOver, this, false);
        }, this);
    }
    private onRewardStart(): void {

    }
    private onRewardOver(): void {
    }
    private onSceneDestory(): void {
        this.clear();
    }
    private onSceneEnd(): void {

    }

    public close(isTween: boolean = true): void {
        if (!cc.isValid(this._windowsLayer)) {
            return;
        }
        this._mask && this._mask.hide("UILayer");
        let i: number;
        let len: number = this._windowsLayer.childrenCount;
        for (i = len - 1; i >= 0; i--) {
            let tn: cc.Node = this._windowsLayer.children[i];
            if (isTween) {
                this.scaleHide(0.2, tn, (node: cc.Node) => {
                    if (cc.isValid(node)) {
                        node.destroy();
                    }
                }, this)
            } else {
                tn.destroy();
            }
        }
    }
    public clear(): void {
        let i: number;
        let len: number;
        this.close();
        // len = this._activityLayer.childrenCount;
        // for (i = len - 1; i >= 0; i--) {
        //     this._activityLayer.children[i].destroy();
        // }
        this._activityLayer.removeAllChildren(true);
        if (this._rewardLayer) {
            this._rewardLayer.hide();
        }
    }

}