import { ResListener, ResMgr, SystemBundleName } from "zmg_res_mgr";
import { EventMgr, EventName } from "zmg_event_mgr"
import { gWarn, gLog, StringUtil } from "zmg_util";
import { $DirectorEvent as DirectorEvent } from "./DirectorEvent";
import { BaseMgr } from "zmg_mgr";
import { AudioMgr } from "zmg_audio_mgr";
import { EnvMgr } from "zmg_env_mgr";
import { ConfigMgr, $EModuleType } from "zmg_config_mgr";
import { UILayer, UIMgr } from "zmg_ui_mgr";
import { } from "zmg_core";
import { TimeMgr } from "zmg_time_mgr";
import { TrackModule } from "zmg_track_mgr"
export class _DirectorMgr extends BaseMgr implements zmg.IControllerMgr {
    constructor() { super() }
    private static _instance: _DirectorMgr = null
    static getInstance(): _DirectorMgr {
        if (!this._instance) {
            this._instance = new _DirectorMgr();
        }
        return this._instance;
    }
    private _callTime = -1;
    private _openList: zmg.IOpenItem[] = []
    private _isloading: boolean = false;
    private _bgclip: string;
    // private _isVideo: boolean;
    private _isWebview: boolean;
    private _nowBunName: string;
    private _nowSceneName: string;
    private _param: any;
    private _cfg: zmg.IModuleConfig;
    public get nowBunName(): string {
        return this._nowBunName
    }
    public get nowConfig(): zmg.IModuleConfig {
        return this._cfg;
    }
    public get nowParam(): any {
        return this._param;
    }
    public get nowSceneName(): string {
        return this._nowSceneName
    }

    public set bgclip(url: string) {
        this._bgclip = url;
        if (StringUtil.isValid(url)) {
            ResMgr.loadRemote(url, new ResListener(this, (assets: cc.Asset | cc.Asset[], listener: zmg.IResListener) => {
                /**
                 * 是否依旧需要播放
                 * 注意这里音乐加载完毕，可能已经切换过模块了
                 * 所以需要重新判断
                 */
                if (url == this._bgclip) {
                    setTimeout(() => {
                        AudioMgr.playMusic(assets as cc.AudioClip);
                    }, 100)

                }
            }));
        } else {
            AudioMgr.stopAllMusic();
        }
    }
    public get bgclip(): string {
        return this._bgclip;
    }
    openConfig(cfg: zmg.IModuleConfig, param?: object): void {
        let type = cfg.main.type;
        this.bgclip = cfg.bgclip;
        let uparam = param ? param : this._param ? this._param : cfg.main.param;
        this._param = param;
        this._cfg = cfg;
        let ratio = cfg.frameRatio ? cfg.frameRatio : ConfigMgr.uiconfig.frameRatio;
        //添加切换时长限制
        if (this._callTime < 0) {
            this._callTime = TimeMgr.getCurTime();
        } else {
            let curTime = TimeMgr.getCurTime();
            if (curTime - this._callTime < 1) {
                let item: zmg.IOpenItem = {
                    cfg: cfg,
                    param: param
                }
                this._openList.push(item)
                TimeMgr.doTimer(1000, () => {
                    if (this._openList.length > 0) {
                        let m = this._openList[this._openList.length - 1]
                        if (m)
                            this.openConfig(m.cfg, m.param)
                    }
                }, this, 1)
                return
            }
            else {
                this._callTime = curTime
                this._openList = []
            }
        }
        switch (type) {
            case $EModuleType.IFRAME:
                EventMgr.emit("frameRatioChange", 1.0);
                this.openWebview(cfg.main.path, uparam);
                break;
            case $EModuleType.PREFAB:
                cc.game.resume();
                AudioMgr.resumeAll();
                EventMgr.emit("frameRatioChange", ratio);
                this.openPrefab(cfg.code, cfg.main.path, uparam);
                break;
            case $EModuleType.SCENE:
                cc.game.resume();
                AudioMgr.resumeAll();
                EventMgr.emit("frameRatioChange", ratio);
                this.openScene(cfg.code, cfg.main.path, uparam);
                break;
        }
    }
    openScene(bunName: string, sceneName: string, param?: any, transitions: {
        color: cc.Color, movieclip: cc.Node
    } = null): void {
        let nowScene: string = cc.director.getScene().name;
        if (!this.onSceneDestory(nowScene, bunName, sceneName, param).isStopped()) {
            if (this._isloading) {
                gWarn("场景正在加载过程中")
                return
            }
            this._isloading = true
            ResMgr.releaseLib(SystemBundleName.REMOTE);
            if (transitions) {
                UIMgr.hideLoading();
            }
            gWarn("打开BunName:" + bunName + " sceneName:" + sceneName + " " + JSON.stringify(param));
            ResMgr.loadScene(bunName, sceneName, new ResListener(this, (assets: cc.Asset | cc.Asset[], listener: zmg.IResListener) => {
                if (transitions) {
                    UIMgr.transitions.runScene(bunName, sceneName, () => {
                        this.onSceneStart(nowScene, bunName, sceneName, param);
                    }, () => {
                        this.onSceneEnd(nowScene, bunName, sceneName, param);
                    }, transitions.color, transitions.movieclip);
                } else {
                    gWarn("回调场景打开---------------", nowScene, sceneName)
                    cc.director.runScene(assets as cc.SceneAsset, () => {
                        this.onSceneStart(nowScene, bunName, sceneName, param);
                    }, () => {
                        this.onSceneEnd(nowScene, bunName, sceneName, param);
                    });
                }

            }, () => {
                gWarn("########场景加载失败,bunName: " + bunName + " sceneName:" + sceneName + "########");
                let evt: DirectorEvent = new DirectorEvent(DirectorEvent.SCENE_CHANGE_FAIL, nowScene, sceneName);
                evt.param = param;
                evt.progress = 0;
                this.dispatchEvent(evt);
                this._isloading = false
            }, (path, pro: number, total: number) => {
                let evt: DirectorEvent = new DirectorEvent(DirectorEvent.SCENE_CHANGE_PROGRESS, nowScene, sceneName);
                evt.progress = Math.round(Math.round(pro / total) * 1000) / 1000;
                evt.param = param;
                this.dispatchEvent(evt);
            }));
        }
    }
    /**
     * 过度效果切换场景
     * @param bunName 
     * @param path 
     */
    public tranToScene(bunName: string, sceneName: string, param?: any, color?: cc.Color, movieclip?: cc.Node): void {
        this.openScene(bunName, sceneName, param, { color: color, movieclip: movieclip });
    }

    /**
     * 视频播放
     * @param url 
     */
    // public openVideo(url: string): void {
    //     // this.openScene(video.bunName, video.scene, { url: url, bunName: backBunname, scene: backSceneName });
    //     UIMgr.uiLayer.showVideo(url);
    // }

    openWebview(url: string, params?: any): void {
        params = (StringUtil.isValid(params) ? params + "&" : "") + StringUtil.getQuery({
            userId: EnvMgr.getUserId(),
            token: EnvMgr.getToken(),
            device: EnvMgr.getEnvData().device,
            appVersion: EnvMgr.getAppVersion(),
            msgSendModle: "post",
            env: EnvMgr.getEnv(),
            mic: AudioMgr.isMuiscPlaying,
        });
        //原生需要这个字段，h5不需要这个字段
        // webRender: false,
        if (url.indexOf("?") == -1) {
            url = url + "?" + params;
        } else {
            url = url + "&" + params;
        }
        let webview: zmg.IWebViewAsset = ConfigMgr.getWebviewConfig();
        this.openScene(webview.bunName, webview.scene, url);
    }

    openPrefab(bunName: string, path: string, param?: any): void {
        ResMgr.load(bunName, path, new ResListener(this, (assets: cc.Asset | cc.Asset[], listener: zmg.IResListener) => {
            gLog("-----------------Prefab构造函数运行完毕---------------");
            let node = cc.instantiate(assets as cc.Prefab);
            let coms = node.getComponents(cc.Component)
            coms.forEach(element => {
                if (element['init']) {
                    element['init'](param)
                }
            });
            cc.Canvas.instance.node.addChild(cc.instantiate(assets as cc.Prefab));
        }, (path: string, listener?: zmg.IResListener) => {
            gWarn("当前预制体加载失败,bunName: " + bunName + " path:" + path);
            let evt: DirectorEvent = new DirectorEvent(DirectorEvent.SCENE_CHANGE_FAIL,);
            evt.param = param;
            evt.progress = 0;
            this.dispatchEvent(evt);
        }), cc.Prefab);
    }

    async start() {
        super.start();
        // EventMgr.on(EventName.UI_BACK_BTN, this.onUIBackBtn, this, false, 1);
        // EventMgr.on(DirectorEvent.VIDEO_CLOSE, this.videoClose, this, false, 1);
    }
    destroy() {
        super.destroy();
        // EventMgr.off(EventName.UI_BACK_BTN, this.onUIBackBtn, this);
        // EventMgr.off(DirectorEvent.VIDEO_CLOSE, this.videoClose, this);
    }
    // private videoClose(): void {
    //     let video: cc.VideoPlayer = cc.Canvas.instance.getComponentInChildren(cc.VideoPlayer);
    //     let bunName = video["bunName"];
    //     let scene = video["scene"];
    //     if (StringUtil.isValid(bunName) && StringUtil.isValid(scene)) {
    //         this.openScene(bunName, scene);
    //     }
    // }
    // private onUIBackBtn(evt: UIBackEvent): void {
    //     if (this.isVideoScene()) {
    //         let evt2 = new DirectorEvent(DirectorEvent.VIDEO_CLOSE);
    //         this.dispatchEvent(evt2);
    //         evt["stopped"]();
    //     }
    // }
    get isValid(): boolean {
        return true;
    }

    public curCanvas(): cc.Node {
        return cc.Canvas.instance.node;
    }

    public curSence(): cc.Scene {
        return cc.director.getScene()
    }

    // public isVideoScene(): boolean {
    //     return this._isVideo;
    // }
    public isWebviewScene(): boolean {
        return this._isWebview;
    }
    /**
    * 场景切换开始处理函数
    */
    private onSceneStart(nowScene: string, bunName: string, sceneName: string, param?: any): DirectorEvent {
        TrackModule.extParam = {}
        let evt: DirectorEvent = new DirectorEvent(DirectorEvent.SCENE_CHANGE_START, nowScene, sceneName);
        evt.param = param;
        evt.progress = 1;
        this.dispatchEvent(evt);
        gLog("========场景切换请求开始" + " sceneName: " + nowScene + "====================");
        return evt;
    }
    private onSceneDestory(nowScene: string, bunName: string, sceneName: string, param?: any): DirectorEvent {
        // let video: zmg.IVideoAsset = ConfigMgr.getVideoConfig();
        let webview: zmg.IVideoAsset = ConfigMgr.getVideoConfig();
        // if (this._nowSceneName == video.scene && this._nowBunName == video.bunName) {
        //     this.destroyVideo();
        // } else 
        if (this._nowSceneName == webview.scene && this._nowBunName == webview.bunName) {
            this.destroyWebview();
        }
        let evt: DirectorEvent = new DirectorEvent(DirectorEvent.SCENE_CHANGE_DESTORY, nowScene, sceneName);
        evt.param = param;
        evt.progress = 1;
        this.dispatchEvent(evt);
        gLog("========销毁场景" + " sceneName: " + nowScene + "====================");
        return evt;
    }
    /**
     * 场景切换完毕处理函数
     */
    private onSceneEnd(nowScene: string, bunName: string, sceneName: string, param?: any): DirectorEvent {
        this._isWebview = false;
        this._isloading = false
        let webview: zmg.IWebViewAsset = ConfigMgr.getWebviewConfig();
        if (sceneName == webview.scene && bunName == webview.bunName) {
            this._isWebview = true;
            this.initWebview(param);
        }
        this._nowBunName = bunName;
        this._nowSceneName = sceneName;
        let evt: DirectorEvent = new DirectorEvent(DirectorEvent.SCENE_CHANGE_END, nowScene, sceneName);
        evt.param = param;
        evt.progress = 1;
        this.dispatchEvent(evt);
        gLog("========场景切换请求结束" + "bunName:" + bunName + " sceneName: " + sceneName + "=========");
        return evt;
    }
    public dispatchEvent(evt: cc.Event) {
        EventMgr.dispatchEvent(evt);
        super.dispatchEvent(evt);
    }
    /**
     * 
     * @param param 视频场景初始化
     */
    // private initVideo(param?: any): void {
    //     if (!param) {
    //         gWarn("视频地址为空，无法进行播放!");
    //         return;
    //     }
    //     let video: cc.VideoPlayer = cc.Canvas.instance.getComponentInChildren(cc.VideoPlayer);
    //     video.resourceType = cc.VideoPlayer.ResourceType.REMOTE;
    //     video.remoteURL = param.url;
    //     video["bunName"] = param.bunName;
    //     video["scene"] = param.scene;
    //     // cc.Canvas.instance.node.once(DirectorEvent.VIDEO_CLOSE, () => {
    //     //     let evt = new DirectorEvent(DirectorEvent.VIDEO_CLOSE);
    //     //     this.dispatchEvent(evt);
    //     // }, this, false);

    //     // cc.Canvas.instance.node.on(DirectorEvent.SOUND_CLOSE, () => {
    //     //     let evt = new DirectorEvent(DirectorEvent.SOUND_CLOSE);
    //     //     EventMgr.dispatchEvent(evt);
    //     //     this.dispatchEvent(evt);
    //     // }, this, false);

    //     // cc.Canvas.instance.node.on(DirectorEvent.SOUND_OPEN, () => {
    //     //     let evt = new DirectorEvent(DirectorEvent.SOUND_OPEN);
    //     //     EventMgr.dispatchEvent(evt);
    //     //     this.dispatchEvent(evt);
    //     // }, this, false);
    //     // video.play();
    // }
    private destroyVideo(): void {
        gLog("清除视频组件");
    }

    private destroyWebview(): void {
        gLog("清除webview组件");
        let webview: cc.WebView = cc.Canvas.instance.getComponentInChildren(cc.WebView);
        webview.node.off("error", this.onWebViewError, this, false);
        webview.node.off("loaded", this.onWebViewLoaded, this, false);
    }

    /**
     * 
     * @param param webview场景初始化
     */
    private initWebview(param?: any): void {
        if (!param) {
            gWarn("webview地址为空，无法进行加载!");
            return;
        }
        let webview: cc.WebView = cc.Canvas.instance.getComponentInChildren(cc.WebView);
        if (cc.isValid(webview)) {
            // if (webview.getIframeElement() && webview.getIframeElement().style) {
            //     webview.getIframeElement().style.zIndex = "-1";
            // }
            webview.node.on("error", this.onWebViewError, this, false);
            webview.node.on("loaded", this.onWebViewLoaded, this, false);
            webview.url = param;
        } else {
            gWarn("未找到webview对象。");
        }
    }
    private onWebViewError(e?: any): void {
        let list: string[] = [];
        for (let key in e) {
            list.push("key:" + key + " value:" + e[key] + " ");
        }
        gWarn("webview加载错误", list);
    }
    private onWebViewLoaded(e?: any): void {
        gLog("webview loaded!");
        cc.game.pause();
        AudioMgr.stopAll();
    }

}
