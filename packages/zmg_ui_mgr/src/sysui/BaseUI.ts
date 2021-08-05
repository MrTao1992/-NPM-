import { ConfigMgr } from "zmg_config_mgr";
import { EResEventName, ResAsset, ResListener, ResMgr } from "zmg_res_mgr";
import { gLog, StringUtil, gWarn } from "zmg_util";

export default class $BaseUI extends cc.EventTarget implements zmg.IBaseUI {
    protected _node: cc.Node;
    protected _target: cc.Component;
    protected _nowStyle: zmg.IResAsset;
    protected _defaultStyle: zmg.IResAsset;
    protected _res: zmg.IResAsset;
    protected _isActive: boolean;
    protected _parent: cc.Node;
    public set node(n: cc.Node) {
        this._node = n;
    }
    public get node(): cc.Node {
        return this._node;
    }
    public get res(): zmg.IResAsset {
        return this._res;
    }
    constructor(url?: string) {
        super();
        this._isActive = true;
        this.init(url);
    }
    init(url: string): void {
        if (StringUtil.isValid(url)) {
            this._res = { bunName: "", path: "" };
            this._defaultStyle = { bunName: ConfigMgr.uiconfig.bunName, path: url };
            this.setStyle(this._defaultStyle);
        }

    }
    /**
     * 显示
     */
    public show(): void {
        this._isActive = true;
        if (this.isValid) {
            this._node.active = true;
        }
    }
    /**
     * 隐藏
     */
    public hide(): void {
        this._isActive = false;
        if (this.isValid) {
            this._node.active = false;
        }
    }
    /**
     * 
     * @param style 符合要求样式的node,Prefab
     */
    public setStyle(res: string | zmg.IResAsset, resUrl?: string): void {
        let ast: zmg.IResAsset;
        if (typeof (res) === "string") {
            ast = new ResAsset("", "");
            ast.bunName = res;
            ast.path = resUrl;
        } else {
            ast = res;
        }
        if (!this._nowStyle || this._nowStyle.bunName != ast.bunName || this._nowStyle.path != ast.path) {
            if (this.isValid) {
                this._parent = this._node.parent;
                this._node.destroy();
                this._node = null;
            }
            this.load(ast.bunName, ast.path);
        }
    }
    /**
     * 还原默认样式
     */
    public resetStyle(): void {
        this.setStyle(this._defaultStyle);
    }
    /**
     * 销毁
     */
    public destroy(): void {
        if (this.isValid) {
            this._node.destroy();
            this._isActive = false;
            this._parent = null;
            this._node = null;
        }
    }
    /**
     * 是否初始化完毕
     */
    public get isValid(): boolean {
        return cc.isValid(this._node);
    }

    public load(bunName: string, url: string): void {
        if (!StringUtil.isValid(bunName)) {
            gWarn("UI:" + "  bunName为空，无法初始化UI!");
            return;
        }

        if (!StringUtil.isValid(url)) {
            gWarn("UI:" + "  url为空，无法初始化UI!");
            return;
        }
        if (this._res.path == url && this._res.bunName == bunName) {
            gLog("样式重复，无需替换,url: " + url + " bunName:" + bunName);
            return;
        }
        this._res.path = url;
        this._res.bunName = bunName;
        ResMgr.load(bunName, url, this.onLoadComplete, this);
    }

    /**
    * 资源下载完毕
    */
    protected onLoadComplete(pre: cc.Prefab, listener?: zmg.IResListener): void {
        if (listener.path == this._res.path && listener.bunName == this._res.bunName) {
            this.createNode(pre);
        }
    }

    protected createNode(pre: cc.Prefab): void {
        this._node = cc.instantiate(pre);
        this._node.group = "UI";
        this._target = this._node.addComponent(cc.Component);
        if (cc.isValid(this._parent)) {
            this._parent.addChild(this._node);
        }
        this.onLoad();
    }

    /**
     * 初始化
     */
    protected onLoad() {
        this.onComplete();
        this.addEvents();
    }
    protected onComplete(): void {
        this._node.active = this._isActive;
        this.emit(EResEventName.COMPLETE);
    }

    protected opacityHide(time: number): void {
        this._isActive = false;
        if (this._node.active) {
            this._node.stopAllActions();
            cc.tween(this._node).to(time, { opacity: 0 }, { easing: "smooth" }).call(() => {
                this._node.opacity = 0xff;
                this._node.active = false;
            }).start();
        }
    }

    protected opacityShow(time: number): void {
        this._isActive = true;
        if (!this._node.active) {
            this._node.active = true;
            this._node.opacity = 0;
            this._node.stopAllActions();
            cc.tween(this._node).to(time, { opacity: 0xff }, { easing: "smooth" }).call(() => {
                this._node.active = true;
            }).start();
        } else {
            if (this._node.opacity != 0xff) {
                this._node.stopAllActions();
                cc.tween(this._node).to(time, { opacity: 0xff }, { easing: "smooth" }).call(() => {
                    this._node.active = true;
                }).start();
            }
        }
    }

    protected scaleHide(time: number, node?: cc.Node, callback?: Function, target?: any): void {
        this._isActive = false;
        let tn: cc.Node = node ? node : this._node;
        if (tn.active) {
            tn.stopAllActions();
            cc.tween(tn).to(time, { scale: 0 }, { easing: "smooth" }).call(() => {
                tn.active = false;
                if (callback) {
                    callback.call(target, node);
                }
            }).start();
        }
    }

    protected scaleShow(time: number, node?: cc.Node): void {
        this._isActive = true;
        let tn: cc.Node = node ? node : this._node;
        if (!tn.active) {
            tn.scale = 0;
            tn.active = true;
            tn.stopAllActions();
            cc.tween(tn).to(time, { scale: 1 }, { easing: "smooth" }).call(() => {
                tn.active = true;
            }).start();
        } else {
            if (tn.opacity != 0xff) {
                tn.stopAllActions();
                cc.tween(tn).to(time, { scale: 1 }, { easing: "smooth" }).call(() => {
                    tn.active = true;
                }).start();
            }
        }
    }

    public scheduleOnce(callback: Function, delay?: number): void {
        if (this._target) {
            this._target.scheduleOnce(callback, delay);
        }
    }

    public unscheduleAllCallbacks(): void {
        if (this._target) {
            this._target.unscheduleAllCallbacks();
        }
    }

    protected addEvents(): void {

    }
    protected removeEvents(): void {

    }

}