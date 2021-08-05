import { DataMgr } from "zmg_gamedata_mgr";

export enum $EServerMethod {
    GET = "get",
    POST = "post",
}
export class $ServerItem {
    /**
     * 接口访问地址
     */
    public path: string;
    /**
     * 前缀访问接口（默认为空，则使用常规前缀）
     */
    public prefix: string;

    public method: $EServerMethod;

    /**
     * 发送接口参数
     */
    protected _param: any;

    protected _data: any;

    public getKey(): string {
        return this.clsName + "_" + JSON.stringify(this._param);
    }
    public get clsName(): string {
        /**
         * 加密后 这个会变化
         */
        // return this.constructor.name;
        return this.path;
    }

    public get param(): any {
        if (!this._param) {
            this._param = {};
        }
        return this._param;
    }

    public setData(res: any) {
        this._data = res;
    }

    public get data(): any {
        return this._data;
    }

    public clear(): void {
        let key = this.clsName + "_" + JSON.stringify(this.param);
        DataMgr.living.clearItemByKey(key);
    }

}