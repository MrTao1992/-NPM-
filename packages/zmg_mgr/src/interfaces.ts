
declare global {
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
export { }