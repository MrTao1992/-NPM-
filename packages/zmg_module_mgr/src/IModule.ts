import { } from 'zmg_config_mgr';
import { } from 'zmg_mgr'
import { ModuleState } from 'zmg_module_mgr';
declare global {
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
            getConditionsByCfg(cfg: zmg.IModuleConfig): { condion: zmg.IModuleCondition, param: any }[];
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
            setNow(module: zmg.IModuleAsset);
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
export { }