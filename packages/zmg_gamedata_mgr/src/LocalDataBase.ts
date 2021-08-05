import { EnvMgr } from "zmg_env_mgr";
import { gLog, gWarn, StringUtil } from "zmg_util";

export class LocalDataBase extends cc.EventTarget implements zmg.IDataBase {
    private _database: Record<string, string>;
    public init(): void {
        let msg: any = cc.sys.localStorage.getItem(EnvMgr.getUserId());
        this._database = StringUtil.isValid(msg) ? JSON.parse(msg) : {};
    }
    public get isValid(): boolean {
        return this._database ? true : false;
    }
    public setAppItem(app: string, key: string, value: any): void {
        this.setItem(app + "_" + key, value);
    }
    public getAppItem(app: string, key: string, def?: any): any {
        let data = this.getItem(app + "_" + key);
        return data === undefined ? def : data;
    }
    public getItem(key: string): any {
        return this._database[key];
    }
    public setItem(key: string, value: any): void {
        if (!this.isValid) {
            gWarn("数据初始化失败");
            return;
        }
        let userId = EnvMgr.getUserId();
        if (!value || (typeof (value) == "string" && value.length != 0)) {
            delete this._database[key];
        } else {
            this._database[key] = value;
        }
        cc.sys.localStorage.setItem(userId, JSON.stringify(this._database));
    }
    public removeItem(key: string): void {
        this.setItem(key, "");
    }
    public clear(): void {
        this._database = {};
        let userId = EnvMgr.getUserId();
        cc.sys.localStorage.setItem(userId, "");
    }
}