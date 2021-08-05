import { EnvMgr } from "zmg_env_mgr";
import { gLog, gWarn, StringUtil } from "zmg_util";

export class LivingDataBase extends cc.EventTarget implements zmg.IDataBase {
    private _database: Record<string, string>;
    public init(): void {
        this._database = {};
    }
    public get isValid(): boolean {
        return this._database ? true : false;
    }
    public getItem(key: string): any {
        return this._database[key];
    }
    public setItem(key: string, value: any): void {
        if (!this.isValid) {
            gWarn("数据初始化失败");
            return;
        }
        gLog("写入本地存储数据...");
        if (cc.isValid(value)) {
            this._database[key] = value;
        } else {
            delete this._database[key];
        }
    }
    public removeItem(key: string): void {
        this.setItem(key, "");
    }
    public clearItemByKey(word: string): void {
        for (const key in this._database) {
            if (Object.prototype.hasOwnProperty.call(this._database, key)) {
                const element = this._database[key];
                if (key.indexOf(word) != -1) {
                    this._database[key] = null;
                    delete this._database[key];
                }
            }
        }
    }
    public clear(): void {
        this._database = {};
    }
}