import { WebBase } from "./WebBase";

export class WebPost extends WebBase {
    private _receiveMsg: Function = null

    initBridge(mainHandlers: zmg.IHandler[], reviceMsgFun: Function): void {
        this._receiveMsg = reviceMsgFun
        this.registerPostMessage(mainHandlers);
    }

    registerPostMessage(mainHandlers: zmg.IHandler[]): void {
        mainHandlers.forEach(element => {
            window.addEventListener(element.name, this.receivePostMsg.bind(this), false);
        });
    }

    receivePostMsg(event: MessageEvent) {
        let data = event.data;
        this._receiveMsg(data);
    }
}