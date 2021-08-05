import { $EDevice } from "./EDevice";
import { $EEnv } from "./EEnv";
import { $ESource } from "./ESource";
import { gLog, gWarn, StringUtil, TSlog } from "zmg_util"
import { EventName } from "zmg_event_mgr";
import { BaseMgr } from "zmg_mgr";
import { ConfigMgr } from "zmg_config_mgr";



export class WebEnv extends BaseMgr implements zmg.IEnvMgr {
    private _defaultSearch: string = "";
    private _defaultAppVersion: string = "4.3.0";
    private _defaultApiVersion: string = "4.3.0";
    private _envData: zmg.IEnvData;
    constructor() {
        super();
        this.init();
    }
    public setTestDefault(value: string): void {
        this._defaultSearch = value;
        this.init();
    }
    private init(): void {
        this._envData = this.getRequest(this.search);
        TSlog.doConsole = this.getEnv() !== $EEnv.PROD;
    }
    public async start() {
        super.start();
        this.emit(EventName.ENV_READY);
    }
    public isPC(): boolean {
        let device: $EDevice = this.getDevice()
        return device == $EDevice.PC || device == $EDevice.MAC;
    }
    public isIOS(): boolean {
        let device: $EDevice = this.getDevice()
        return device == $EDevice.IPHONE || device == $EDevice.IPAD;
    }
    public isAndroid(): boolean {
        let device: $EDevice = this.getDevice()
        return device == $EDevice.APAD || device == $EDevice.APHONE;
    }
    public isTest(): boolean {
        let env: $EEnv = this.getEnv();
        return env == $EEnv.FAT || env == $EEnv.TEST;
    }

    public isJsb(): boolean {
        let msg = cc.sys.isNative ? "jsb" : (this._envData.msgSendModle ? this._envData.msgSendModle : "post");
        return msg == "jsb";
    }

    public isDebug(): boolean {
        if (CC_DEV) {
            return true;
        }
        if (CC_JSB) {
            return true;
        }
        if (this.isTest()) {
            return true;
        }
        if (this.getRequest(this.search)['debug'] == "true") {
            return true;
        }
        return false;
        // return false;
    }
    public get search(): string {
        if (CC_JSB) {
            return this._defaultSearch;
        } else {
            if (StringUtil.isValid(window.location.search)) {
                return window.location.search;
            }
            return this._defaultSearch;
        }
    }
    public getRequest(url: string) {
        if (!url || url == "") {
            return {};
        }
        var query: any = {};
        var i: number;
        var str: string;
        var strs: string[];
        var arr: string[];
        if (url.indexOf("?") != -1) {
            str = url.substr(1);
            strs = str.split("&");
            for (i = 0; i < strs.length; i++) {
                arr = strs[i].split("=");
                query[arr[0]] = unescape(arr[1]);
            }
        }
        return query;
    }
    public getCookie(name): string {
        if (document.cookie) {
            var prefix = name + "="
            var start = document.cookie.indexOf(prefix)

            if (start == -1) {
                return null;
            }

            var end = document.cookie.indexOf(";", start + prefix.length)
            if (end == -1) {
                end = document.cookie.length;
            }

            var value = document.cookie.substring(start + prefix.length, end)
            return unescape(value);
        }
        return "";
    }
    public getAppVersion(): string {
        let appVersion: string;
        appVersion = this.getCookie("appVersion");
        return appVersion ? (appVersion != "" ? appVersion : this._defaultAppVersion) : this._defaultAppVersion;
    }
    public getApiVersion(): string {
        let apiVersion: string;
        apiVersion = this.getCookie("apiVersion");
        return apiVersion ? (apiVersion != "" ? apiVersion : this._defaultApiVersion) : this._defaultApiVersion;
    }
    public destroy() {

    }
    public get isValid(): boolean {
        return this._envData ? true : false;
    }
    /**
     * 是否原生模块
     */
    public isNative(): boolean {
        return CC_JSB;
    }

    public getEnvData(): zmg.IEnvData {
        return this._envData;
    }
    /**
     * 获取环境
     */
    public getEnv(): $EEnv {
        return this._envData ? this._envData.env as $EEnv : $EEnv.PROD;
    }
    /**
     * 获取来源(来源appid)
     */
    public getSourceId(): $ESource {
        return this._envData ? (this._envData.appId ? this._envData.appId as $ESource : $ESource.PC) : $ESource.PC;
    }
    /**
     * 获取设备
     */
    public getDevice(): $EDevice {
        return this._envData ? this._envData.device.toUpperCase() as $EDevice : $EDevice.PC;
    }
    /**
     * 获取token
     */
    public getToken(): string {
        return this._envData.token;
    }
    /**
     * 获取用户ID
     */
    public getUserId(): string {
        return this._envData.userId;
    }
    public isFat(): boolean {
        return this._envData.env == $EEnv.FAT || this._envData.env == $EEnv.TEST;
    }
    /**
     * 获取ModuleId
     */
    public getDefaultModuleAsset(): zmg.IDefaultModuleAsset {
        let moduleCode: string = this._envData.moduleCode;
        let moduleId: string = this._envData.moduleId;
        let moduleParam: string = this._envData.moduleParams;
        let module: zmg.IDefaultModuleAsset;
        if (StringUtil.isValid(moduleId)) {
            module = {
                code: ConfigMgr.getModuleConfigById(parseInt(moduleId)).code,
                auto: ConfigMgr.getDefaultConfig().auto,
                param: moduleParam
            };
        } else if (StringUtil.isValid(moduleCode)) {
            let m = ConfigMgr.getModuleConfigByCode(moduleCode);
            if (!m) {
                gWarn("当前" + moduleCode + "模块未配置，无法进入...");
                return;
            }
            module = {
                code: m.code,
                auto: ConfigMgr.getDefaultConfig().auto,
                param: moduleParam
            };
        } else {
            module = ConfigMgr.getDefaultConfig();
        }
        return module;
        // if (!StringUtil.isValid(moduleId)) {
        //     moduleCode = ConfigMgr.getDefaultConfig().code;
        // } else {

        // }
        // if (!StringUtil.isValid(moduleCode)) {
        //     moduleCode = ConfigMgr.getDefaultConfig().code;
        // }
        // let module = ConfigMgr.getModuleConfigByCode(moduleCode);
        // return module ? module.id : ConfigMgr.getModuleConfigByCode(ConfigMgr.getDefaultConfig().code).id;
    }

    public getPlatform(): string {
        let device = this.getDevice();
        switch (device) {
            case $EDevice.PC:
                return "pc";
            case $EDevice.MAC:
                return "pc";
            case $EDevice.APAD:
                return "pad";
            case $EDevice.APHONE:
                return "pad";
            case $EDevice.IPHONE:
                return "pad";
            case $EDevice.IPAD:
                return "pad";
            default:
                return "pc";
        }
    }

    public getShopDevice(): string {
        var device: string = this.getDevice().toUpperCase();
        if (device == "IPHONE") {
            device = "IPAD";
        } else if (device == "APHONE") {
            device = "APAD";
        }
        return device;
    }
}