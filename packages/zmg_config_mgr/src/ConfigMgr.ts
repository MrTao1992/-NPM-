import { SystemBundleName, EResEventName, ResEvent, ResMgr } from "zmg_res_mgr"
import { gLog } from "zmg_util";
import { EnvMgr, EEnv } from "zmg_env_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import { BaseMgr } from "zmg_mgr";
import { $ConfigEvent } from "./events/ConfigEvent";
import { ToolMgr } from "./ToolMgr";
/**
 * 存放项目描述文件的地址
 */
const TRACK_PATH = "track"
const TOOL_PATH = "tool"
const CONDITION_PATH = "condition";
const CONFIG_PATH = "config";
const MODULE_PATH = 'module';
const UI_PATH = "ui";


enum ConfigState {
    /**
     * 默认状态
     */
    START = "start",
    /**
     * 加载配置表状态
     */
    LOAD = "load",
    /**
     * 初始化状态
     */
    INIT = "init",
    /**
     * 准备完毕状态
     */
    READY = "ready"
}
export class _ConfigMgr extends BaseMgr implements zmg.IConfigMgr {

    private static _instance: _ConfigMgr;
    static getInstance(): _ConfigMgr {
        if (!this._instance) {
            this._instance = new _ConfigMgr();
        }
        return this._instance;
    }
    constructor() {
        super();
    }
    private _tool: ToolMgr;
    private _state: ConfigState;
    private _uiconfig: zmg.IUIConfig;
    private _appconfig: zmg.IAppConfig;
    private _defaultModule: zmg.IDefaultModuleAsset;
    private _videoModule: zmg.IVideoAsset;
    private _webviewModule: zmg.IVideoAsset;
    private _conditionConfig: zmg.IConditionConfig[];
    private _trackConfig: zmg.ITracckConfig[]
    private _modules: zmg.IModuleConfig[];
    private _publishKey: string;
    private _bundleFilePath: string;
    private _bundlePrefix: string;
    /**
     * 
     * @returns 
     */
    public get tool(): ToolMgr {
        return this._tool;
    }
    /**
    * 默认启动项
    */
    public getDefaultConfig(): zmg.IDefaultModuleAsset {
        return this._defaultModule;
    }
    /**
     * 获取视频配置
     */
    public getVideoConfig(): zmg.IVideoAsset {
        return this._videoModule
    }
    /**
     * 获取webview配置
     */
    public getWebviewConfig(): zmg.IWebViewAsset {
        return this._webviewModule;
    }
    public get bundleFilePath(): string {
        return this._bundleFilePath;
    }
    public get publishKey(): string {
        return this._publishKey;
    }
    public get bundlePrefix(): string {
        return this._bundlePrefix;
    }
    /**
    * 模块启动
    * 延迟返回async函数
    */
    public async start() {
        super.start();
        this._tool = new ToolMgr();
        this._state = ConfigState.START;
        ResMgr.on(EResEventName.COMPLETE, this.onResComplete, this, false);
        ResMgr.on(EResEventName.ERROR, this.onResError, this, false);
        ResMgr.loadDir(SystemBundleName.CONFIG, EnvMgr.getSourceId().toString(), null, cc.JsonAsset);
    }
    /**
     * 设置加载的bundle地址
     */
    public setConfigMain(url: string, publishKey: string, bundleFilePath: string): void {
        this._bundlePrefix = url;
        this._publishKey = publishKey;
        this._bundleFilePath = bundleFilePath;
    }
    /**
     * 模块销毁
     */
    destroy(): void {
        ResMgr.off(EResEventName.COMPLETE, this.onResComplete, this);
        ResMgr.off(EResEventName.ERROR, this.onResError, this);
        this._state = ConfigState.INIT;
        this._defaultModule = null;
        this._webviewModule = null;
        this._videoModule = null;
        this._appconfig = null;
        this._modules = [];
        super.destroy();
    }
    /**
     * 未准备
     * 已被销毁
     * 则无法使用
     */
    get isValid(): boolean {
        return this._state == ConfigState.READY;
    }
    get uiconfig(): zmg.IUIConfig {
        return this._uiconfig;
    }
    get appconfig(): zmg.IAppConfig {
        return this._appconfig;
    }
    get conditionConfig(): zmg.IConditionConfig[] {
        return this._conditionConfig;
    }

    get trackConfig(): zmg.ITracckConfig[] {
        return this._trackConfig
    }

    get modules(): zmg.IModuleConfig[] {
        return this._modules
    }

    set appconfig(json: zmg.IAppConfig) {
        gLog("初始化config");
        this._appconfig = json;
    }

    setModules(json: any): void {
        gLog("初始化module");
        let data = json;
        this._webviewModule = data.webview;
        this._defaultModule = data.main;
        this._videoModule = data.video;
        this._modules = data.modules;
    }

    set uiconfig(json: zmg.IUIConfig) {
        this._uiconfig = json;
    }

    set conditionConfig(json: zmg.IConditionConfig[]) {
        this._conditionConfig = json;
    }

    set trackConfig(json: zmg.ITracckConfig[]) {
        this._trackConfig = json;
    }

    getBu(): string {
        return this._appconfig ? this._appconfig.bu : "2";
    }

    getServerConfig(env?: string): zmg.IServerConfig {
        let config: zmg.IAppConfig = this.appconfig;
        if (config) {
            env = env ? env : EnvMgr.getEnv();
            return config.servers[env];
        }
        return config.servers[EEnv.PROD];
    }
    getUseShell(): boolean {
        return this._appconfig ? this._appconfig.useShell : true;
    }

    getAppName(): string {
        return this._appconfig ? this._appconfig.appName : "掌门少儿(默认)";
    }

    getStartModule(): string {
        return null;
    }

    getAppId(): string {
        return this._appconfig ? this._appconfig.appId : "12584";
    }

    getTrackConfigByKey(key: string) {
        if (this.trackConfig) {
            for (let index = 0; index < this.trackConfig.length; index++) {
                const element = this.trackConfig[index];
                if (element.key = key) {
                    return element;
                }
            }
        }
        return {
            key: key,
            des: "",
            moduleName: ""
        }
    }

    getModuleConfigByCode(code: string): zmg.IModuleConfig {
        code = code.replace(/\s*/g, "");
        code = code.replace("ZM_", "");
        if (code == "Home") {
            code = "House";
        }
        if (this.modules) {
            for (let index = 0; index < this.modules.length; index++) {
                const element = this.modules[index];
                if (element.code == code) {
                    return element;
                }
            }
        }
        return null;
    }

    getModuleConfigById(id: number): zmg.IModuleConfig {
        if (this.modules) {
            for (let index = 0; index < this.modules.length; index++) {
                const element = this.modules[index];
                if (element.id == id) {
                    return element;
                }
            }
        }
        return null;
    }

    /**
     * 检查是否所有模块都初始化完毕
     */
    private check(): void {
        let bool = this._appconfig ? true : false;
        bool = bool && (this._uiconfig ? true : false);
        bool = bool && (this._modules ? true : false);
        bool = bool && (this._conditionConfig ? true : false);
        bool = bool && (this._trackConfig ? true : false);
        bool = bool && this._tool.isValid;
        if (bool) {
            this._state = ConfigState.READY;
            ResMgr.off(EResEventName.COMPLETE, this.onResComplete, this);
            ResMgr.off(EResEventName.ERROR, this.onResError, this);
            EventMgr.dispatchEvent(new $ConfigEvent(EventName.CONFIG_READY));
            this.dispatchEvent(new $ConfigEvent(EventName.READY));
        } else {
            gLog("还有资源未初始化完毕");
        }
    }

    private onResComplete(evt: ResEvent): void {
        let configs: cc.JsonAsset[] = evt.assets as cc.JsonAsset[];
        let i: number;
        let cName: string;
        let len: number = configs.length;
        for (i = 0; i < len; i++) {
            cName = configs[i].name;
            switch (cName) {
                case CONFIG_PATH:
                    this.appconfig = (configs[i].json);
                    break;
                case MODULE_PATH:
                    this.setModules(configs[i].json);
                    break;
                case UI_PATH:
                    this.uiconfig = (configs[i].json);
                    break;
                case CONDITION_PATH:
                    this.conditionConfig = (configs[i].json);
                    break;
                case TRACK_PATH:
                    this.trackConfig = (configs[i].json);
                    break;
                case TOOL_PATH:
                    this._tool.parse(configs[i].json);
                    break;
                default:
                    break;
            }
        }
        this.dispatchEvent(new $ConfigEvent($ConfigEvent.LOADED));
        this.check();
    }

    public setOnlineModuleConfig(response: zmg.IStudyParkConfigInf) {
        var i: number;
        var len: number = response.studyParkModuleConfigs.length;
        for (i = 0; i < len; i++) {
            var item: zmg.IModuleConfig = this.getModuleConfigByCode(response.studyParkModuleConfigs[i].code);
            if (item) {
                item.main.param = {
                    zipUrl: response.studyParkModuleConfigs[i].manifest,
                    onlineUrl: response.studyParkModuleConfigs[i].onlineUrl,
                    version: response.studyParkModuleConfigs[i].version,
                    isclose: !response.studyParkModuleConfigs[i].moduleSwitch
                }
            }
        }
    }

    private onResError(evt: ResEvent): void {
        let cevt: $ConfigEvent = new $ConfigEvent($ConfigEvent.ERROR);
        cevt.path = evt.errorPath;
        this.dispatchEvent(cevt);
    }
}
