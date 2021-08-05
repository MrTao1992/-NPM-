import { gWarn, StringUtil } from "zmg_util";
import { UIMgr } from "zmg_ui_mgr";

export class $ServerListener implements zmg.IServerListener {
    target: any;
    url: string;

    constructor(target: any, launchFun: (data: any) => void = null, errorFun: (castData: zmg.IServerCastData) => void = null) {
        this.target = target;
        this.launchFun = launchFun;
        this.errorFun = errorFun;
    }
    launchFun: (data: any) => void;

    errorFun: (castData: zmg.IServerCastData) => void;

    public onLaunch(data: any): void {
        if (this.isValid()) {
            if (this.launchFun) {
                this.launchFun.call(this.target, data);
            }
        }
        this.destroy();
    }

    public onError(castData: zmg.IServerCastData): void {
        if (this.isValid()) {
            gWarn("消息错误,", castData);
            if (StringUtil.isValid(castData.message)) {
                UIMgr.alert.open(castData.message);
            } else if (castData.status == -1) {
                UIMgr.toast.open("掌门国服务器走神了...", 3);
            }
            if (this.errorFun) {
                this.errorFun.call(this.target, castData);
            }
        }
        this.destroy();
    }

    public isValid(): boolean {
        return this.target ? cc.isValid(this.target) : true;
    }

    public destroy(): void {
        this.target = null;
        this.errorFun = null;
        this.launchFun = null;
    }
}