declare module 'zmg_mgr/src/BaseMgr' {
	export class BaseMgr extends cc.EventTarget implements zmg.IMgr {
	    /**
	     *  clsName
	     */
	    _clsName: string;
	    /**
	     *  get clsName
	     */
	    get clsName(): string;
	    constructor(clsName?: string);
	    /**
	     * 模块启动
	    *  延迟返回async函数
	    *
	    */
	    start(): Promise<void>;
	    /**
	     * 模块销毁
	     */
	    destroy(): void;
	    /**
	     * 未准备
	     * 已被销毁
	     * 则无法使用
	     */
	    get isValid(): boolean;
	    dispatchEvent(event: cc.Event): void;
	}

}
declare module 'zmg_mgr/src/ObjectPool' {
	/**
	 * 对象池类
	 * eg: 创建对象池ObjectPool.pop(Timer, "Timer");
	 */
	export class ObjectPool {
	    private static _content;
	    private _objs;
	    /**
	     * 构造函数
	     */
	    constructor();
	    /**
	     * 放回一个对象
	     * @param obj
	     */
	    pushObj(obj: any): void;
	    /**
	     * 取出一个对象
	     * @returns {*}
	     */
	    popObj(): any;
	    /**
	     * 清除所有缓存对象
	     */
	    clear(): void;
	    /**
	     * 取出一个对象
	     * @param classZ Class
	     * @return Object
	     */
	    static pop(classZ: any, classKey: string, ...args: any[]): any;
	    /**
	     * 取出一个对象
	     * @param refKey Class
	     * @param extraKey 标识值
	     * @returns {any}
	     */
	    static popWithExtraKey(refKey: any, extraKey: any): any;
	    /**
	     * 放入一个对象
	     * @param obj
	     */
	    static push(obj: any): boolean;
	    /**
	     * 清除所有对象
	     */
	    static clear(): void;
	    /**
	     * 清除某一类对象
	     * @param classKey Class
	     * @param clearFuncName 清除对象需要执行的函数
	     */
	    static clearClass(classKey: string, clearFuncName?: string): void;
	    /**
	     * 缓存中对象统一执行一个函数
	     * @param refKey Class
	     * @param dealFuncName 要执行的函数名称
	     */
	    static dealFunc(refKey: string, dealFuncName: string): void;
	}

}
declare module 'zmg_mgr/src/interfaces' {
	 global {
	    namespace zmg {
	        interface IMgr extends cc.EventTarget {
	            /**
	             * 原生模块下：this.constructor.name为e 无法获取准确类名
	             */
	            clsName: string;
	            /**
	             * 模块启动
	             * 延迟返回async函数
	             *
	             */
	            start(): any;
	            /**
	             * 模块销毁
	             */
	            destroy(): void;
	            /**
	             * 未准备
	             * 已被销毁
	             * 则无法使用
	             */
	            readonly isValid: boolean;
	        }
	    }
	}
	export {};

}
declare module 'zmg_mgr' {
	export * from 'zmg_mgr/src/interfaces';
	export * from 'zmg_mgr/src/BaseMgr';
	export * from 'zmg_mgr/src/ObjectPool';

}
