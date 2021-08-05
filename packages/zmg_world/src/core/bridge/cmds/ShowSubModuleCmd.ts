import { EnvMgr } from "zmg_env_mgr";
import { UIMgr } from "zmg_ui_mgr";
import { gLog } from "zmg_util";
import { $BaseCommand } from "./BaseCommand";

export class ShowSubModuleCmd extends $BaseCommand {
    excute(data) {
        let webview: cc.WebView = cc.Canvas.instance.getComponentInChildren(cc.WebView);
        if (EnvMgr.isNative()) {
            webview.node.width = cc.Canvas.instance.node.width;
            webview.node.height = cc.Canvas.instance.node.height;
        } else {
            if (webview && webview.getIframeElement() && webview.getIframeElement().style) {
                webview.getIframeElement().style.zIndex = "0";
            }
        }
        gLog("webview模块准备完毕。");
        UIMgr.hideLoading();
    }

}