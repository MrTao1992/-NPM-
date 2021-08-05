import { gLog, gWarn } from 'zmg_util'
import { BaseCommand } from './BaseCommand'
import { WebAndroid } from './WebAndroid';
import { WebIos } from './WebIos';
import { WebPost } from './WebPost';
export class WebViewBridge implements zmg.IWebViewBridge {
    private _web: WebAndroid | WebIos | WebPost = null

    public get web(): WebAndroid | WebIos | WebPost {
        return this._web
    }

    initBridge(mainHandlers?: zmg.IHandler[]): void {
        if (cc.sys.isMobile) {
            if (cc.sys.OS_IOS) {
                gLog("ios开始注册webviewJavasctiptBridge");
                this._web = new WebIos()
            } else {
                gLog("android开始注册webviewJavasctiptBridge");
                this._web = new WebAndroid()
            }
            this._web.initBridge(mainHandlers, this.registerMainHandler)
        } else {
            this._web = new WebPost()
            this._web.initBridge(mainHandlers, this.receiveMsg)
        }
        gLog("webviewJavasctiptBridge注册完毕")
    }

    registerMainHandler(bridge: any, mainHandlers: zmg.IHandler[]): void {
        if (mainHandlers != undefined) {
            mainHandlers.forEach(element => {
                bridge.registerHandler(element.name, function (data, responseCallback) {
                    if (element.fun) {
                        element.fun(data, responseCallback)
                    } else {
                        data = JSON.parse(data);
                        this.receiveMsg(data);
                    }
                }.bind(this));
            });
        }
        else {
            gWarn("原生交互主消息未注册")
        }
        if (this._web) {
            this._web.clearMsgPool()
        }
    }

    receiveMsg(data: any): void {
        let action = data['action'];
        let command: BaseCommand = this._web.messageHandlers[action];
        if (command) {
            command.excute(data);
        }
    }

    sendMsgToClient(param: zmg.IWebMessage): void {
        return this.web.sendMsgToClient(param)
    }

    registMsg(name: string, command: any) {
        this.web.registerHandlers(name, command)
    }

    setSendMessageFun(fun: (param: zmg.IWebMessage) => {}) {
        if (this.web) {
            this.web.sendMessageFun = fun
        }
    }

}