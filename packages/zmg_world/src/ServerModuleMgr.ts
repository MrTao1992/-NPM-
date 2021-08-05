import { ConfigMgr, $EModuleType } from "zmg_config_mgr";
import { EnvMgr } from "zmg_env_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import { BaseMgr } from "zmg_mgr";
import { StringUtil } from "zmg_util";
import { gWarn } from "zmg_util";
import { ServerListener, ServerMgr } from "zmg_webserver_mgr";
import _CaisVo from "./cais/CaisVo";
import { $Commands } from "./servers/commands/Commands";

/**
 * 模块配置信息服务器获取管理
 */
export class _ServerModuleMgr extends BaseMgr {
    private static _instance: _ServerModuleMgr;
    static getInstance(): _ServerModuleMgr {
        if (!this._instance) {
            this._instance = new _ServerModuleMgr("ServerModuleMgr");
        }
        return this._instance;
    }

    private _isValid: boolean;

    async start() {
        super.start();
        if (ServerMgr.isValid) {
            this.updateModuleData();
        } else {
            EventMgr.once(EventName.SERVER_READY, this.updateModuleData, this);
        }
    }
    private updateModuleData(): void {
        let sendParam = {
            userId: EnvMgr.getUserId(), type: 1
        }
        this.getHallBaseInfo();
        ServerMgr.sendGet($Commands.moduleList, sendParam, new ServerListener(this, (data: WebServerVo.IModuleList[]) => {
            let modules = ConfigMgr.modules;
            let i: number, j: number;
            let cLen: number = data.length;
            let len: number = modules.length;
            for (i = 0; i < len; i++) {
                if (modules[i].main.type == $EModuleType.IFRAME) {
                    if (!StringUtil.isHttps(modules[i].main.path)) {
                        for (j = 0; j < cLen; j++) {
                            if (data[j].moduleCode == "ZM_" + modules[i].code) {
                                modules[i].main.path = data[j].onlineUrl;
                                modules[i].isClose = modules[i].isClose && data[j].moduleSwitch;
                            }
                        }
                    }
                }
            }
            this._isValid = true;
            this.emit(EventName.READY);
        }, (code: zmg.IServerCastData) => {
            gWarn("获取模块配置信息报错！");
        }), true);
    }
    private getHallBaseInfo() {
        let params = {
            platform: EnvMgr.getPlatform()
        }
        ServerMgr.sendGet($Commands.getHallBaseInfo, params, new ServerListener(this, (data: WebServerVo.IHallBaseInfo) => {
            // bgMusicUrl = data.bgMusicUrl;
            // canOpen = data.canOpen;
            _CaisVo.getInstance().CaisServerData.configId = data.configId
            _CaisVo.getInstance().CaisServerData.playTimeList = data.playTimeList
            _CaisVo.getInstance().CaisServerData.restTimeList = data.restTimeList
        }, (code: zmg.IServerCastData) => {
            gWarn("获取学习乐园入口配置报错！");
        }), true);
    }
    destory() {
        super.destroy();
    }
    get isValid(): boolean {
        return this._isValid;
    }
}