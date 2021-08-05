declare module 'zmg_module_mgr/src/ModuleConditionMgr' {
	import { BaseMgr } from 'zmg_mgr';
	import { ModuleState } from 'zmg_module_mgr';
	export class ModuleConditionMgr extends BaseMgr implements zmg.IModuleConditionMgr {
	    private _isWait;
	    private _checkTimeId;
	    private _libs;
	    constructor();
	    start(): Promise<void>;
	    destroy(): void;
	    get isValid(): boolean;
	    addCondition(cdn: zmg.IModuleCondition): void;
	    removeCondition(name: string): void;
	    getConditionByName(value: string): zmg.IModuleCondition;
	    /**
	     * 移除约束条件
	     */
	    removeConditionById(id: string): void;
	    getConditionById(id: string): zmg.IModuleCondition;
	    getConditionsByCfg(cfg: zmg.IModuleConfig): {
	        condion: zmg.IModuleCondition;
	        param: any;
	    }[];
	    check(cfg: zmg.IModuleConfig): Promise<ModuleState>;
	}

}
declare module 'zmg_module_mgr/src/ModuleRecordMgr' {
	import { BaseMgr } from 'zmg_mgr';
	export class ModuleRecordMgr extends BaseMgr implements zmg.IModuleRecordMgr {
	    private _assets;
	    constructor();
	    start(): Promise<void>;
	    destroy(): void;
	    private onChangeEnd;
	    get isValid(): boolean;
	    getLast(): zmg.IModuleAsset;
	    back(): void;
	    /**
	     * 设置当前链路最新
	     */
	    setNow(module: zmg.IModuleAsset, saveparam?: any): void;
	    /**
	     * back的时候 无法准确获取当前模块，所以必须单独存储
	     */
	    getNow(): zmg.IModuleAsset;
	    getNowConfig(): zmg.IModuleConfig;
	    /**
	     * 清除所有链路
	     */
	    clear(): void;
	    /**
	     * 获取主页链路
	     */
	    getMain(): zmg.IModuleAsset;
	}

}
declare module 'zmg_module_mgr/src/ModuleEvent' {
	export class ModuleEvent extends cc.Event {
	    static CHANGE: string;
	    static GAME_OVER: string;
	    nowModule: string;
	    toModule: string;
	    constructor(type: string, nowModule?: string, toModule?: string);
	}

}
declare module 'zmg_module_mgr/src/ModuleMgr' {
	import { BaseMgr } from 'zmg_mgr';
	import { ModuleConditionMgr } from 'zmg_module_mgr/src/ModuleConditionMgr';
	import { ModuleRecordMgr } from 'zmg_module_mgr/src/ModuleRecordMgr';
	import { ModuleState } from 'zmg_module_mgr'; class _ModuleMgr extends BaseMgr implements zmg.IModuleMgr {
	    private static _instance;
	    static getInstance(): _ModuleMgr;
	    /**
	     * 链路存储器
	     */
	    private _record;
	    /**
	     * 约束器
	     */
	    private _condition;
	    constructor();
	    start(): Promise<void>;
	    destroy(): void;
	    get isValid(): boolean;
	    get condition(): ModuleConditionMgr;
	    get record(): ModuleRecordMgr;
	    getConditionState(code: string): Promise<ModuleState>;
	    openByCode(code: string, param?: any, nowparam?: any): void;
	    openById(id: number, param?: any, nowparam?: any): void;
	    open(cfg: zmg.IModuleConfig, param?: any, nowparam?: any, isback?: boolean): void;
	    private _open;
	    back(): void;
	    refurbish(): void;
	    exit(): void;
	    dispatchEvent(evt: cc.Event): void;
	    private addEvents;
	    private removeEvents;
	    openDefault(): void;
	    /**
	     * 点击左上角按钮返回
	     */
	    private onUIBackBtn;
	}
	export let ModuleMgr: _ModuleMgr;
	export {};

}
declare module 'zmg_module_mgr/src/BaseModuleCDN' {
	export class BaseModuleCDN implements zmg.IModuleCondition {
	    protected _cfg: zmg.IConditionConfig;
	    protected _clsName: string;
	    /**
	     *  get clsName
	     */
	    get clsName(): string;
	    get cfg(): zmg.IConditionConfig;
	    constructor(clsName: string);
	    catchHandler(param?: any): boolean;
	    /**
	     * 初始化配置
	     * @param cfg
	     */
	    init(cfg: zmg.IConditionConfig): void;
	    /**
	    * 是否检测通过
	    */
	    check(param?: any): Promise<any>;
	    /**
	     * 检查器是否准备完毕，可以进行工作
	     */
	    get isVaild(): boolean;
	    protected onCoreReady(): void;
	}

}
declare module 'zmg_module_mgr/src/IModule' {
	import { ModuleState } from 'zmg_module_mgr'; global {
	    namespace zmg {
	        /**
	         * 模块检查器
	         * 检查是否通过
	         */
	        interface IModuleCondition {
	            /**
	             * 原生无法获取类名
	             * 需要设置
	             */
	            readonly clsName: string;
	            /**
	             * 获取id
	             */
	            cfg: zmg.IConditionConfig;
	            /**
	             * 初始化配置
	             * @param cfg
	             */
	            init(cfg: zmg.IConditionConfig): void;
	            /**
	            * 是否检测通过
	            */
	            check(param?: any): Promise<any>;
	            /**
	             * 异常处理
	             */
	            catchHandler(param?: any, cfg?: zmg.IModuleConfig): boolean;
	            /**
	             * 检查器是否准备完毕，可以进行工作
	             */
	            readonly isVaild: boolean;
	        }
	        interface IModuleConditionMgr extends zmg.IMgr {
	            /**
	            * 获取约束条件
	            * @param value
	            */
	            getConditionById(id: string): zmg.IModuleCondition;
	            /**
	             * 获取约束条件
	             * @param value
	             */
	            getConditionByName(value: string): zmg.IModuleCondition;
	            /**
	             * 添加约束条件
	             */
	            addCondition(cdn: zmg.IModuleCondition): void;
	            /**
	             * 获取约束条件列表
	             * @param cfg
	             */
	            getConditionsByCfg(cfg: zmg.IModuleConfig): {
	                condion: zmg.IModuleCondition;
	                param: any;
	            }[];
	            /**
	             * 移除约束条件
	             */
	            removeCondition(id: string): void;
	            /**
	             * 检查当前模块是否允许进入
	             * @param cfg
	             */
	            check(cfg: zmg.IModuleConfig): Promise<ModuleState>;
	        }
	        /**
	         * 模块管理器
	         */
	        interface IModuleMgr extends zmg.IMgr {
	            /**
	             * 打开当前模块
	             */
	            open(cfg: zmg.IModuleConfig, param?: object): void;
	            openByCode(code: string, param?: object): void;
	            openById(id: number, param?: any, nowparam?: any): void;
	            getConditionState(code: string): Promise<ModuleState>;
	            /**
	             * 打开项目默认启动项
	             */
	            openDefault(): void;
	            /**
	             * 返回上一节
	             */
	            back(): void;
	            /**
	             * 离开主程序
	             */
	            exit(): void;
	            condition: zmg.IModuleConditionMgr;
	            record: zmg.IModuleRecordMgr;
	        }
	        /**
	         * 存储链路
	         */
	        interface IModuleRecordMgr {
	            /**
	             * 设置当前链路最新
	             */
	            setNow(module: zmg.IModuleAsset): any;
	            /**
	             * 清除所有链路
	             */
	            clear(): void;
	            /**
	             * 获取主页链路
	             */
	            getMain(): zmg.IModuleAsset;
	            /**
	             * 重新设置长度，
	             * 回退节点
	             */
	            getLast(): zmg.IModuleAsset;
	        }
	    }
	}
	export {};

}
declare module 'zmg_module_mgr/src/ModuleState' {
	export class ModuleState {
	    private _isVaild;
	    message: string;
	    condition: {
	        condion: zmg.IModuleCondition;
	        param: any;
	    };
	    succeed(message: string): void;
	    failed(condition: {
	        condion: zmg.IModuleCondition;
	        param: any;
	    }, message: string): void;
	    get isVaild(): boolean;
	}

}
declare module 'zmg_module_mgr' {
	export * from 'zmg_module_mgr/src/IModule';
	export * from 'zmg_module_mgr/src/ModuleConditionMgr';
	export * from 'zmg_module_mgr/src/ModuleMgr';
	export * from 'zmg_module_mgr/src/ModuleState';
	export * from 'zmg_module_mgr/src/ModuleEvent';
	export * from 'zmg_module_mgr/src/BaseModuleCDN';

}
