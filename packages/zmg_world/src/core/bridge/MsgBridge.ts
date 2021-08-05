/**
 * 与子模块交流通道
 */

import { EnvMgr } from "zmg_env_mgr";
import { BaseMgr } from "zmg_mgr";
import { gLog } from "zmg_util";
import { BackToHallCmd } from "./cmds/BackToHallCmd";
import { $BaseCommand } from "./cmds/BaseCommand";
import { GetUserDefaultsCmd } from "./cmds/GetUserDefaultsCmd";
import { SetUserDefaultsCmd } from "./cmds/SetUserDefaultsCmd";
import { LogoutGameCmd } from "./cmds/LogoutGameCmd";
import { ShowSubModuleCmd } from "./cmds/ShowSubModuleCmd";
import { EnterModuleCmd } from "./cmds/EnterModuleCmd";
import { EventMgr, EventName } from "zmg_event_mgr";
import { EDevice } from "zmg_env_mgr";
import { GamePauseCmd } from "./cmds/GamePauseCmd";
import { GameResumeCmd } from "./cmds/GameResumeCmd";

export class _MsgBridge extends BaseMgr {
    private static _instance: _MsgBridge = null
    static getInstance(): _MsgBridge {
        if (!this._instance) {
            this._instance = new _MsgBridge();
        }
        return this._instance;
    }

    private _jsbMsgPool = [];
    private _messageHandlers = {};
    private _isInited: boolean = false;

    get isValid(): boolean {
        return this._isInited;
    }
    async start() {
        gLog("MsgBridge开始初始化...");
        this.registMsg();
        this._initBridge();
        this._initHandler();
        EventMgr.on(EventName.UI_LOAD_HIDE, this.onLoadHide, this, false);
        EventMgr.on(EventName.UI_LOAD_SHOW, this.onLoadShow, this, false);
    }
    constructor() {
        super();
    }
    private onLoadHide(): void {
        this.sendMsgToClient("hideFullScreenLoading");
    }
    private onLoadShow(): void {
        this.sendMsgToClient("showFullScreenLoading");
    }
    private _initBridge() {

        if (this._isInited) return;
        this._isInited = true;
        if (EnvMgr.isJsb()) {
            if (EnvMgr.isIOS()) {
                this._setupWebViewJavascriptBridge(bridge => this.registerHandlers(bridge));
            } else {
                this._connectWebViewJavascriptBridge(bridge => this.registerHandlers(bridge));
            }
        }
    }

    private _initHandler() {
        gLog("注册window监听", window);
        window.addEventListener('message', this._receivePostMsg.bind(this), false);
        EventMgr.on(EventName.GAME_OVER, this.onGameOver, this);
    }
    private onGameOver(): void {
        this.sendMsgToClient("logoutGame");
    }
    private _receivePostMsg(event: MessageEvent) {
        let data = event.data;
        gLog("<<<通过post接受消息", data);
        this._receiveMsg(data);
    }

    private _receiveMsg(data) {
        let action = data['action'];
        try {
            let d = EnvMgr.isNative() ? JSON.parse(data.data) : data.data;
            data.data = d;
        } catch (e) {
            gLog("消息体无法被Json,isNative:" + EnvMgr.isNative());
        }
        let command: $BaseCommand = this._messageHandlers[action];
        if (command) {
            let ret = command.excute(data);
            if (ret) {
                this.sendMsgToSubMudule(ret);
            }
        }
    }

    public jsbReceiveMsg(data) {
        gLog("通过jsb接收客户端消息1", data);
        this._receiveMsg(data);

    }
    private registerHandlers(bridge) {
        gLog("手机端注册jsb成功");
        bridge.registerHandler('jsbReceiveMsg', function (data, responseCallback) {
            data = JSON.parse(data);
            this.jsbReceiveMsg(data);
        }.bind(this));

        bridge.registerHandler('onPageResume', function (data, responseCallback) {
            //页面从息屏状态返回
            //需要重新启动游戏，
            //恢复声音播放 
            new GameResumeCmd().excute(data);
        }.bind(this));

        bridge.registerHandler('onPagePause', function (data, responseCallback) {
            //页面从息屏状态返回
            //需要重新启动游戏，
            //恢复声音播放 
            new GamePauseCmd().excute(data);
        }.bind(this));

        if ((<any>window).WebViewJavascriptBridge) {
            this.clearPool();
        }
    }

    private registMsg() {
        gLog("开始注册与子模块沟通信令。");
        this.registerHandler("back", BackToHallCmd);
        this.registerHandler('logoutGame', LogoutGameCmd);
        this.registerHandler("zmhall_backToHall", BackToHallCmd);
        this.registerHandler('enterModule', EnterModuleCmd);
        //存储数据
        this.registerHandler('getUserDefaults', GetUserDefaultsCmd);
        this.registerHandler('setUserDefaults', SetUserDefaultsCmd);
        //子模块准备完毕
        this.registerHandler('showWebView', ShowSubModuleCmd);
        this.registerHandler('ZMHall_show_subModule', ShowSubModuleCmd);
        /**
         * 端 页面暂停和恢复
         */
        this.registerHandler("onPagePause", GamePauseCmd);
        this.registerHandler("onPageResume", GameResumeCmd);
        gLog("子模块沟通信令监听初始化完毕。");
    }
    private clearPool() {
        gLog(">>>注册成功后，将延迟的消息发送出去...");
        for (let i = 0; i < this._jsbMsgPool.length; i++) {
            if ((<any>window).WebViewJavascriptBridge) {
                this.sendMsgToClient(this._jsbMsgPool[i].action, this._jsbMsgPool[i].data, this._jsbMsgPool[i].handlerName)
            }
        }
        this._jsbMsgPool = [];
    }
    public sengPageInMsgToClient(msg: string, scheme: string, callback: Function) {
        if (EnvMgr.isJsb()) {
            gLog("22通过jsb向客户端发送消息", scheme);
            // (<any>window).WebViewJavascriptBridge.callHandler(msg, scheme);
            let bridge = (<any>window).WebViewJavascriptBridge;
            if (bridge) {
                bridge.callHandler(msg, scheme, function responseCallback(responseData) {
                    callback && callback(responseData);
                });
            }
        } else {
            gLog("33通过post向客户端发送消息", { action: msg, data: scheme });
            let target = window.parent && window.parent.window;
            target.postMessage({ action: msg, data: scheme }, "*");
        }
    }
    public sendMsgToClient(msg: string, data = null, handlerName: string = 'jsbMessage') {
        //gLog("准备向客户端发送消息啦", { action: msg, data: data }, UrlParse.isJsb())
        if (EnvMgr.isJsb()) {
            if ((<any>window).WebViewJavascriptBridge) {
                gLog(">>>通过jsb向客户端发送消息", { action: msg, data: data });
                if (handlerName === 'jsbMessage') {
                    (<any>window).WebViewJavascriptBridge.callHandler(handlerName, { action: msg, data: data });
                } else {
                    (<any>window).WebViewJavascriptBridge.callHandler(handlerName, msg, data);
                }

            } else {
                // gLog("安卓6");
                this._jsbMsgPool.push({ action: msg, data: data, handlerName: handlerName })
            }
        } else {
            gLog(">>>通过post向客户端发送消息" + msg, { action: msg, data: data });
            let target = window.parent && window.parent.window;
            if (target && target.postMessage) target.postMessage({ action: msg, data: data }, "*");
        }
    }

    public sendMsgToSubMudule(data: any): boolean {
        let webview = cc.Canvas.instance.getComponentInChildren(cc.WebView);
        if (EnvMgr.isJsb() && webview) {
            let tempData = JSON.stringify(data);
            console.log(">>>发送消息为:", tempData, new Date().getTime());
            webview.evaluateJS(`receiveMsg(${tempData})`);
        } else {
            let webCom = cc.Canvas.instance.getComponentInChildren(cc.WebView);
            if (webCom) {
                let iframe = webCom['getIframeElement']();
                if (iframe) {
                    gLog(">>>向子模块发送消息啦 消息为", data);
                    let win = iframe.contentWindow;
                    win && win.postMessage(data, "*");
                }
                return true;
            }
            return false;
        }
    }
    public registerHandler(name: string, command) {
        if (!this._messageHandlers[name]) {
            this._messageHandlers[name] = new command() as $BaseCommand;
        }
    }
    public unRegisterHandler(name: string): void {
        delete this._messageHandlers[name];
    }

    public registerNativeHandler(name: string, command) {
        if (!this._messageHandlers[name]) {
            this._messageHandlers[name] = new command() as $BaseCommand;
        }
    }

    public unRegisterNativeHandler(name: string): void {
        delete this._messageHandlers[name];
    }

    //ios 前置注入
    private _setupWebViewJavascriptBridge(callback) {
        gLog("ios开始前置注入");
        if ((<any>window).WebViewJavascriptBridge) { return callback((<any>window).WebViewJavascriptBridge); }
        if ((<any>window).WVJBCallbacks) { return (<any>window).WVJBCallbacks.push(callback); }
        (<any>window).WVJBCallbacks = [callback];
        let WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0);
        gLog("ios注入完成");
    }

    //android 后置注入
    private _connectWebViewJavascriptBridge(callback) {
        gLog("安卓开始后置注入");
        if ((<any>window).WebViewJavascriptBridge) {
            callback((<any>window).WebViewJavascriptBridge);
            gLog("安卓原生注入完成");
        } else {
            gLog("安卓document注入开始");
            // document.addEventListener(
            //     'WebViewJavascriptBridgeReady'
            //     , function () {
            //         callback((<any>window).WebViewJavascriptBridge);
            //         gLog("安卓注入完成");
            //     },
            //     false
            // );
            document.addEventListener('WebViewJavascriptBridgeReady', function (event) {
                if (window["onWebViewJavascriptBridgeReady"]) window["onWebViewJavascriptBridgeReady"](window["__bridge"] = (<any>window).WebViewJavascriptBridge);
                callback((<any>window).WebViewJavascriptBridge);
                gLog("安卓注入完成");
            }, false)
        }
    }
}