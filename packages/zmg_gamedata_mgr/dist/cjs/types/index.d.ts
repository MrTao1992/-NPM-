declare module 'zmg_gamedata_mgr/src/LivingDataBase' {
	export class LivingDataBase extends cc.EventTarget implements zmg.IDataBase {
	    private _database;
	    init(): void;
	    get isValid(): boolean;
	    getItem(key: string): any;
	    setItem(key: string, value: any): void;
	    removeItem(key: string): void;
	    clearItemByKey(word: string): void;
	    clear(): void;
	}

}
declare module 'zmg_gamedata_mgr/src/LocalDataBase' {
	export class LocalDataBase extends cc.EventTarget implements zmg.IDataBase {
	    private _database;
	    init(): void;
	    get isValid(): boolean;
	    setAppItem(app: string, key: string, value: any): void;
	    getAppItem(app: string, key: string, def?: any): any;
	    getItem(key: string): any;
	    setItem(key: string, value: any): void;
	    removeItem(key: string): void;
	    clear(): void;
	}

}
declare module 'zmg_gamedata_mgr/src/ServerDataBase' {
	export class ServerDataBase extends cc.EventTarget implements zmg.IDataBase {
	    private _database;
	    init(): void;
	    get isValid(): boolean;
	    getItem(key: string): any;
	    setItem(key: string, value: any): void;
	    removeItem(key: string): void;
	    clear(): void;
	    private getServerData;
	    private sendServerData;
	}

}
declare module 'zmg_gamedata_mgr/src/DataMgr' {
	import { BaseMgr } from 'zmg_mgr';
	import { LivingDataBase } from 'zmg_gamedata_mgr/src/LivingDataBase';
	import { LocalDataBase } from 'zmg_gamedata_mgr/src/LocalDataBase';
	import { ServerDataBase } from 'zmg_gamedata_mgr/src/ServerDataBase';
	export class _DataMgr extends BaseMgr implements zmg.IDataMgr {
	    private static _instance;
	    static getInstance(): _DataMgr;
	    private _local;
	    private _server;
	    private _living;
	    constructor();
	    start(): Promise<void>;
	    private check;
	    get local(): LocalDataBase;
	    get server(): ServerDataBase;
	    get living(): LivingDataBase;
	    get isValid(): boolean;
	}

}
declare module 'zmg_gamedata_mgr/src/ELocalSystemKey' {
	export enum $ELocalSystemKey {
	    /**
	     * 背景音效设置
	     */
	    IS_CLOSE_AUDIO = "isCloseAudio"
	}

}
declare module 'zmg_gamedata_mgr/src/interfaces' {
	 global {
	    namespace zmg {
	        interface IDataBase {
	            readonly isValid: any;
	            getItem(key: string): Promise<any>;
	            setItem(key: string, value: any): void;
	            removeItem(key: string): void;
	            clear(): void;
	        }
	        interface IDataMgr {
	            readonly living: zmg.IDataBase;
	            readonly local: zmg.IDataBase;
	            readonly server: zmg.IDataBase;
	        }
	    }
	}
	export {};

}
declare module 'zmg_gamedata_mgr' {
	import { _DataMgr } from 'zmg_gamedata_mgr/src/DataMgr';
	import { $ELocalSystemKey } from 'zmg_gamedata_mgr/src/ELocalSystemKey';
	export * from 'zmg_gamedata_mgr/src/interfaces';
	export let ELocalSystemKey: typeof $ELocalSystemKey;
	export let DataMgr: _DataMgr;

}
