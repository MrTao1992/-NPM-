import { BaseMgr } from 'zmg_mgr';
import { NativeBridge } from './NativeBridge';
import { WebViewBridge } from './WebViewBridge';
import { gLog } from 'zmg_util';

export class _PlatfromMgr extends BaseMgr implements zmg.IPlatfromMgr {

    bridge: any;

    private static _instance: _PlatfromMgr;

    static getInstance(): _PlatfromMgr {
        if (!this._instance) {
            this._instance = new _PlatfromMgr();
        }
        return this._instance;
    }
    constructor() {
        super();
    }
    public async start() {
        super.start();
    }
    registerMsg(name: string, callback: any): void {
        this.bridge.registMsg(name, callback)
    }

    sendMsg(...args): any {
        let lens = arguments.length
        if (lens == 1) {
            return this.bridge.sendMsgToClient(args[0])//web使用参数
        } else if (lens == 2) {
            return this.bridge.sendMsgToClient(args[0], args[1])//原生壳使用参数
        } else if (lens == 3) {
            return this.bridge.sendMsgToClient(args[0], args[1], args[2])//android原生使用参数
        } else if (lens == 4) {
            return this.bridge.sendMsgToClient(args[0], args[1], args[2], args[3])//ios原生使用参数
        }
    }

    setSendMessageFun(fun: (param: zmg.IWebMessage) => {}) {
        if (!CC_JSB) {
            this.bridge ? (<WebViewBridge>this.bridge).setSendMessageFun(fun) : gLog("bridge为空")
        }
    }

    initBridge(mainHandlers?: zmg.IHandler[], brigeSdk?: zmg.INativeBrigeSdk) {
        if (CC_JSB) {
            this.bridge = new NativeBridge()
            this.bridge.initBridge(mainHandlers, brigeSdk)
        }
        else {
            this.bridge = new WebViewBridge()
            this.bridge.initBridge(mainHandlers)
        }
    }

    get isValid(): boolean {
        return true;
    }
}
