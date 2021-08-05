import { gLog } from "zmg_util";

export class BaseMgr extends cc.EventTarget implements zmg.IMgr {
    /**
     *  clsName
     */
    public _clsName: string = "unKnow";
    /**
     *  get clsName
     */
    public get clsName(): string {
        return this._clsName;
    }
    constructor(clsName?: string) {
        super();
        this._clsName = CC_JSB ? (clsName ? clsName : "unKnow") : (clsName ? clsName : this.constructor.name);
    }
    /**
     * 模块启动
    *  延迟返回async函数
    * 
    */
    async start() {
        gLog("-------------------" + this._clsName + " start--------------");
    }
    /**
     * 模块销毁
     */
    destroy(): void {
        gLog("-------------------" + this._clsName + " end--------------");
    }
    /**
     * 未准备
     * 已被销毁
     * 则无法使用
     */
    get isValid(): boolean {
        return false;
    }


    dispatchEvent(event: cc.Event): void {
        event.target = this;
        super.dispatchEvent(event);
    }
}