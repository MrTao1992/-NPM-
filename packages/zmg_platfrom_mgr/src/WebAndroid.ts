import { WebBase } from "./WebBase";

export class WebAndroid extends WebBase {
    initBridge(mainHandlers: zmg.IHandler[], registerMainHandler: Function): void {
        this.connectWebViewJavascriptBridge(bridge => registerMainHandler(bridge, mainHandlers));
    }

    connectWebViewJavascriptBridge(callback: Function): void {
        if ((<any>window).WebViewJavascriptBridge) {
            callback((<any>window).WebViewJavascriptBridge);
        } else {
            document.addEventListener('WebViewJavascriptBridgeReady', function (event) {
                if (window["onWebViewJavascriptBridgeReady"]) window["onWebViewJavascriptBridgeReady"](window["__bridge"] = (<any>window).WebViewJavascriptBridge);
                callback((<any>window).WebViewJavascriptBridge);
            }, false)
        }
    }
}