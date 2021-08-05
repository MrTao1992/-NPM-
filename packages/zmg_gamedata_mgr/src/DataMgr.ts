
import { EventName } from "zmg_event_mgr";
import { BaseMgr } from "zmg_mgr";
import { LivingDataBase } from "./LivingDataBase";
import { LocalDataBase } from "./LocalDataBase";
import { ServerDataBase } from "./ServerDataBase";
export class _DataMgr extends BaseMgr implements zmg.IDataMgr {
    private static _instance: _DataMgr;
    static getInstance(): _DataMgr {
        if (!this._instance) {
            this._instance = new _DataMgr();
        }
        return this._instance;
    }
    private _local: LocalDataBase;
    private _server: ServerDataBase;
    private _living: LivingDataBase;

    constructor() {
        super();
    }
    async start() {
        this._local = new LocalDataBase();
        this._server = new ServerDataBase();
        this._living = new LivingDataBase();
        this._local.init();
        this._server.init();
        this._living.init();
        if (this._server.isValid) {
            this.check();
        } else {
            this._server.once(EventName.READY, this.check, this);
        }
    }
    private check(): void {
        if (this.isValid) {
            this.emit(EventName.READY);
        }
    }

    public get local(): LocalDataBase {
        return this._local;
    }
    public get server(): ServerDataBase {
        return this._server;
    }

    public get living(): LivingDataBase {
        return this._living;
    }

    public get isValid(): boolean {
        return this._server.isValid && this._local.isValid;
    }
}

