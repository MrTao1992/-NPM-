import { EnvMgr } from "zmg_env_mgr";
import { EventName } from "zmg_event_mgr";
import { gLog, gWarn, StringUtil } from "zmg_util";
import { ServerEvent, ServerListener, ServerMgr, zmgCommands } from "zmg_webserver_mgr";
export class ServerDataBase extends cc.EventTarget implements zmg.IDataBase {

    private _database: Record<string, string>;

    public init(): void {
        if (ServerMgr.isValid) {
            this.getServerData();
        } else {
            ServerMgr.once(ServerEvent.READY, this.getServerData, this);
        }
    }
    public get isValid(): boolean {
        return this._database ? true : false;
    }
    public getItem(key: string): any {
        if (!this.isValid) {
            return null;
        }
        let msg: string = this._database[key];
        if (msg == "undefined") {
            return null;
        }
        return msg ? (typeof (msg) == 'string' ? msg : JSON.stringify(msg)) : null;
    }
    public setItem(key: string, value: any): void {
        let msg: string = value ? (typeof (value) == "string" ? value : JSON.stringify(value)) : "undefined";
        if (this._database) {
            this._database[key] = msg;
        }
        //发送后台
        if (ServerMgr.isValid) {
            this.sendServerData(key, msg);
        } else {
            ServerMgr.once(ServerEvent.READY, () => {
                this.sendServerData(key, msg);
            });
        }
        gLog("写入服务器存储数据...");
    }
    public removeItem(key: string): void {
        if (this._database) {
            delete this._database[key];
        }
        //发送后台
        //发送后台
        if (ServerMgr.isValid) {
            this.sendServerData(key, "");
        } else {
            ServerMgr.once(ServerEvent.READY, () => {
                this.sendServerData(key, "");
            });
        }
    }
    public clear(): void {
        if (this._database) {
            for (const key in this._database) {
                if (Object.prototype.hasOwnProperty.call(this._database, key)) {
                    //清除所有数据
                    if (ServerMgr.isValid) {
                        this.sendServerData(key, "");
                    } else {
                        ServerMgr.once(ServerEvent.READY, () => {
                            this.sendServerData(key, "");
                        });
                    }
                }
            }
            this._database = {};
        }
    }

    private getServerData(): void {
        let param: any = {
            userId: EnvMgr.getUserId(),
        }
        ServerMgr.sendGet(zmgCommands.storageBatch, param, new ServerListener(this, (data) => {
            if (data) {
                this._database = data;
                this.emit(EventName.READY);
            } else {
                gWarn("返回消息为空...");
                this._database = {};
            }
        }))
    }

    private sendServerData(key: string, msg: string): void {
        if (!key) {
            gWarn("键值不能为空!");
            return;
        }
        msg = StringUtil.isValid(msg) ? msg : "undefined";
        let param: any = {
            "key": key,
            "value": msg
        }
        ServerMgr.sendPost(zmgCommands.storagePut, param, new ServerListener(this, (data) => {
            if (data) {
                gLog("数据保存成功,key: " + key + " value:" + msg);
                this._database[key] = msg;
            } else {
                gLog("数据保存失败,key: " + key + " value:" + msg);
            }
        }))
    }
}