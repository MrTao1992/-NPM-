import { ResListener, ResMgr } from "zmg_res_mgr";

export class $AlertAsset implements zmg.IAlertAsset {
    public text: string;
    public target: any;
    public sureFun: Function;
    public canelFun: Function;
    public style: zmg.IResAsset;
    public title: zmg.IResAsset;
    public sureText: string = "确定";
    public canelText: string = "取消";
    public get isValid(): boolean {
        return true;
    }

    constructor(text: string, sureFun: Function = null, canelFun: Function = null, sure: string = "确定", canel: string = "", target?: any) {
        this.text = text;
        this.sureFun = sureFun;
        this.canelFun = canelFun;
        this.sureText = sure;
        this.canelText = canel;
        this.target = target;
    }

    public clear(): void {
        this.text = null;
        this.target = null;
        this.sureFun = null;
        this.canelFun = null;
        this.sureText = null;
        this.canelText = null;
    }

    public sure(): void {
        if (cc.isValid(this.target) && this.sureFun) {
            this.sureFun.call(this.target, true);
        }
    }
    public canel(): void {
        if (cc.isValid(this.target) && this.canelFun) {
            this.canelFun.call(this.target, false);
        }
    }
}