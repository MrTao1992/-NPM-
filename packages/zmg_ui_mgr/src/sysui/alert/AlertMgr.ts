import { ConfigMgr } from "zmg_config_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import { SystemBundleName, ResListener, ResMgr, ResAsset, EResEventName } from "zmg_res_mgr";
import { FontMgr } from "zmg_ui_mgr";
import { gLog } from "zmg_util";
import { $Alert } from "./Alert";
import { $AlertAsset } from "./AlertAsset";

export class _AlertMgr extends cc.EventTarget implements zmg.IAlertMgr {
    private static _instance: _AlertMgr;
    static getInstance(): _AlertMgr {
        if (!this._instance) {
            this._instance = new _AlertMgr();
        }
        return this._instance;
    }

    public node: cc.Node;
    private _alert: $Alert;
    private _defalut: $Alert;
    private _assets: zmg.IAlertAsset[] = [];
    public get res(): zmg.IResAsset {
        return this._defalut.res;
    }
    init(url: string) {
        this.node = new cc.Node();
        this.node.group = "UI";
        this.node.width = cc.visibleRect.width;
        this.node.height = cc.visibleRect.height;
        this.node.name = "alertNode";
        let widget = this.node.addComponent(cc.Widget);
        widget.isAlignLeft = true;
        widget.isAlignRight = true;
        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.top = widget.bottom = widget.left = widget.right = 0;
        this._defalut = new $Alert(new ResAsset(ConfigMgr.uiconfig.bunName, url));
        this._defalut.once(EventName.COMPLETE, this.onDefaultComplete, this);
        if (FontMgr.isValid) {
            this.onFontReady();
        } else {
            EventMgr.once(EventName.UI_FONT_READY, this.onFontReady, this);
        }
    }
    public get defaultAlert(): $Alert {
        return this._defalut;
    }
    private onFontReady(): void {
        FontMgr.updateFont(this._defalut.node);
    }
    private onDefaultComplete(): void {
        this.emit(EResEventName.COMPLETE);
    }
    private onAlertClose(alert: $Alert): void {
        alert.off(EventName.COMPLETE, this.onAlertComplete, this);
        alert.node.off(EventName.CLOSE, this.onAlertClose, this);
        if (this._alert == alert) {
            this._alert = null;
        }
        this.openNext();
    }
    /**
     * 
     * @param style 符合要求样式的node,Prefab
     */
    protected getAlert(res: zmg.IResAsset): $Alert {
        res = res ? res : this._defalut.res;
        if (this._defalut.res == res) {
            return this._defalut;
        } else {
            let alert = new $Alert(res);
            return alert;
        }
    }
    /**
     * 销毁
     */
    public destroy(): void {
        EventMgr.off(EventName.UI_FONT_READY, this.onFontReady, this);
        this.node.destroy();
        this.node = null;
    }
    /**
     * 是否初始化完毕
     */
    public get isValid(): boolean {
        return cc.isValid(this.node);
    }

    /**
     * 
     * @param asset 弹框显示
     */
    public open(asset: string | zmg.IAlertAsset): void {
        if (typeof (asset) == "string") {
            asset = new $AlertAsset(asset);
        }
        gLog("显示弹窗:" + asset.text);
        this._assets.push(asset);
        if (this._alert) {
            //等待弹窗结束
            return;
        }
        this.openNext();
    }
    /**
     * 关闭
     */
    public close(now?: boolean): void {
        if (this._alert) {
            this._alert.close(now, this._alert == this._defalut);
            this._alert = null;
        }
    }
    private openNext(): void {
        let asset: zmg.IAlertAsset = this._assets.shift();
        if (asset && asset.isValid) {
            let alert: $Alert = this.getAlert(asset.style);
            alert.setTitle(asset.title);
            this._alert = alert;
            alert.show(asset);
            if (alert.isValid) {
                this.onAlertComplete();
            } else {
                alert.once(EventName.COMPLETE, this.onAlertComplete, this);
            }
        }
    }
    private onAlertComplete(): void {
        this._alert.node.setParent(this.node);
        this._alert.node.on(EventName.CLOSE, this.onAlertClose, this);
    }
}