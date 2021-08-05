import { EventMgr, EventName } from "zmg_event_mgr";
import { BaseMgr } from "zmg_mgr";
import { ResListener, ResMgr } from "zmg_res_mgr";
import { $UIEvent } from "../events/UIEvent";

export class _FontMgr extends BaseMgr implements zmg.IFontMgr {

    public defaultFontName: string = "Arial";
    public font65Name: string = "HYZhengYuan-65W";
    public font85Name: string = "HYZhengYuan-85W";
    public font65URL: string = "https://web-data.zmlearn.com/doc/iLdL2f7EgDYg8Q6YX473yL/HYZhengYuan-65W.ttf";
    // public font65URL: string = "https://web-data.zmlearn.com/doc/wX6kmfvQG5VJEKm4uBUxrn/STCAIYUN.ttf";
    public font85URL: string = "https://web-data.zmlearn.com/doc/bA6vTuEziSxMuvXXyiYzEc/HYZhengYuan-85W.ttf";

    private static _instance: _FontMgr;
    static getInstance(): _FontMgr {
        if (!this._instance) {
            this._instance = new _FontMgr();
        }
        return this._instance;
    }

    private _font65: cc.Font;
    private _font85: cc.Font;
    public CCInstantiate: (pre: any) => cc.Node;

    async start() {
        super.start();
        this.CCInstantiate = cc.instantiate;
        this.addEvents();
    }
    private load(): void {
        if (!this.isValid) {
            let listener: ResListener = new ResListener(this, this.onFontHandler);
            ResMgr.loadRemote(this.font65URL, listener, cc.Font);
            ResMgr.loadRemote(this.font85URL, listener, cc.Font);
        }
    }
    private onFontHandler(font: cc.Font, lis: ResListener): void {
        if (lis.path == this.font65URL) {
            this._font65 = font;
        } else if (lis.path == this.font85URL) {
            this._font85 = font;
        }
        if (this.isValid) {
            this.updateCCInstantiate();
            this.updateFont(cc.Canvas.instance.node);
            EventMgr.dispatchEvent(new $UIEvent(EventName.UI_FONT_READY));
        }
    }
    public destroy(): void {
        this.removeEvents();
        this.resetCCInstantiate();
        this._font65.destroy();
        this._font85.destroy();
        this._font65 = this._font85 = null;
    }
    public get isValid(): boolean {

        if (cc.isValid(this._font85) && cc.isValid(this._font65)) {
            return true;
        }
        return false;
    }

    updateFont(node: cc.Node): void {
        if (!this.isValid) {
            return;
        }
        if (!cc.isValid(node)) {
            return;
        }
        let i: number;
        let labels: cc.Label[] | cc.RichText[] = node.getComponentsInChildren(cc.Label);
        if (!labels) {
            labels = node.getComponentsInChildren(cc.RichText);
        }
        let len: number = labels.length;
        for (i = 0; i < len; i++) {
            if (labels[i].font instanceof cc.TTFFont || !labels[i].font) {
                if (this._font65) {
                    if (labels[i].fontFamily == this.font65Name || labels[i].fontFamily == this.defaultFontName) {
                        if (labels[i].font != this._font65) {
                            labels[i].useSystemFont = false;
                            labels[i].font = this._font65;
                            labels[i].node.width += 10;
                            labels[i]["setVertsDirty"]();
                            continue;
                        }
                    }
                }
                if (this._font85) {
                    if (labels[i].fontFamily == this.font85Name) {
                        if (labels[i].font != this._font85) {
                            labels[i].useSystemFont = false;
                            labels[i].font = this._font85;
                            labels[i].node.width += 10;
                            labels[i]["setVertsDirty"]();
                            continue;
                        }
                    }
                }

            }
        }
    }
    /**
     * 替换系统生成对象函数
     */
    private updateCCInstantiate(): void {
        cc.instantiate = function (pre: any): cc.Node {
            let node: cc.Node = _FontMgr.getInstance().CCInstantiate(pre);
            _FontMgr.getInstance().updateFont(node);
            return node;
        }
        cc.instantiate["_clone"] = this.CCInstantiate["_clone"];
    }
    private resetCCInstantiate(): void {
        cc.instantiate = this.CCInstantiate;
    }

    private addEvents(): void {
        EventMgr.once(EventName.CORE_READY, this.onCoreReady, this);
        EventMgr.on(EventName.CONTROLLER_CHANGE_END, this.onSceneChange, this, false);
    }

    private removeEvents(): void {
        EventMgr.off(EventName.CORE_READY, this.onCoreReady, this);
        EventMgr.off(EventName.CONTROLLER_CHANGE_END, this.onSceneChange, this);
    }

    private onCoreReady(): void {
        this.load();
    }

    public onSceneChange(): void {
        this.updateFont(cc.Canvas.instance.node);
    }
}