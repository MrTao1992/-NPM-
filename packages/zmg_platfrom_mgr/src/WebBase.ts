export class WebBase {
    public _messageHandlers = {}
    public _clientMsgPool: zmg.IWebMessage[] = [];
    public get messageHandlers() {
        return this._messageHandlers
    }
    private _sendMessageFun: Function = (param: zmg.IWebMessage) => {
        if (param.cmd.main == undefined) {
            param.cmd.main = "jsbMessage"
        }
        if (param.data == undefined) {
            param.data = null
        }
        if (cc.sys.isMobile) {
            //默认处理方式
            if ((<any>window).WebViewJavascriptBridge) {
                if (param.cmd.main === 'jsbMessage') {
                    return (<any>window).WebViewJavascriptBridge.callHandler(param.cmd.main, { action: param.cmd.action, data: param.data });
                } else {
                    return (<any>window).WebViewJavascriptBridge.callHandler(param.cmd.main, param.cmd.action);
                }
            }
            else {
                this._clientMsgPool.push(param)
            }
        } else {
            //默认处理方式
            let target = window.parent && window.parent.window;
            return target.postMessage({ action: param.cmd.action, data: param.data }, "*");
        }
    }


    public set sendMessageFun(v: (param: zmg.IWebMessage) => {}) {
        this._sendMessageFun = v;
    }


    registerHandlers(name: string, command: any): void {
        if (!this._messageHandlers[name]) {
            this._messageHandlers[name] = new command();
        }
    }

    sendMsgToClient(param: zmg.IWebMessage): any {
        return this._sendMessageFun(param)
    }

    clearMsgPool() {
        for (let i = 0; i < this._clientMsgPool.length; i++) {
            if ((<any>window).WebViewJavascriptBridge) {
                let msg = this._clientMsgPool[i]
                this.sendMsgToClient(msg)
            }
        }
        this._clientMsgPool = []
    }
}