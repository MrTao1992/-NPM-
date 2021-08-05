import { EnvMgr } from "zmg_env_mgr";
import { BaseModuleCDN } from "zmg_module_mgr";
import { gWarn } from "zmg_util";
import { ServerListener, ServerMgr } from "zmg_webserver_mgr";
import { $Commands } from "../servers/commands/Commands";
enum EGrayState {
    unknow = 0,
    close = 1,
    open = 2
}
export class ModuleGrayCDN extends BaseModuleCDN implements zmg.IModuleCondition {
    grayList: Record<string, EGrayState> = {};
    /**
    * 是否检测通过
    */
    async check(param?: any): Promise<any> {
        if (!param) {
            gWarn("无法查询空参的灰度开关...");
            return;
        }
        if (this.grayList[param] == EGrayState.open) {
            return Promise.resolve();
        }
        if (this.grayList[param] == EGrayState.close) {
            return Promise.reject();
        }
        //服务器查询
        this.grayList[param] = EGrayState.unknow;
        let sendParam = {
            map: { userId: EnvMgr.getUserId() }, grayCode: param
        }
        return new Promise((resolve, reject) => {
            ServerMgr.sendPost($Commands.graySurvey, sendParam, new ServerListener(this, (data) => {
                if (data) {
                    resolve(true);
                } else {
                    reject(false);
                }
            }, (code: zmg.IServerCastData) => {
                return Promise.reject();
            }), true);
        });
    }
    /**
     * 检查器是否准备完毕，可以进行工作
     */
    public get isValid(): boolean {
        return true;
    }
}