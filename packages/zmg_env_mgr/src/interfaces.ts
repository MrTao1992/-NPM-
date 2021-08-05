
import { BaseMgr } from 'zmg_mgr';
import { $EDevice } from './EDevice';
import { $EEnv } from './EEnv';
import { $ESource } from './ESource';

declare global {
    namespace zmg {
        interface IEnvData {
            token: string;
            appId: string;
            userId: string;
            env: string;
            device: $EDevice;
            moduleId: string;
            moduleParams: string;
            moduleCode: string;
            msgSendModle: string;
        }
        interface IEnvMgr extends zmg.IMgr {
            isJsb(): boolean;
            /**
             * 是否调试模式
             */
            isDebug(): boolean;
            /**
             * 
             */
            isFat(): boolean;
            /**
             * 设置默认测试账号
             */
            setTestDefault(value: string): void;
            /**
             * 是否原生模块
             */
            isNative(): boolean;
            /**
             * 获取环境
             */
            getEnv(): $EEnv;

            /**
             * 获取环境数据 
             * */
            getEnvData(): IEnvData;
            /**
             * 获取来源(来源appid)
             */
            getSourceId(): $ESource;
            /**
             * 获取设备本地版本
             */
            getAppVersion(): string;
            /**
             * 获取服务器版本
             */
            getApiVersion(): string;
            /**
             * 获取设备
             */
            getDevice(): $EDevice;

            /**
             * 获取token
             */
            getToken(): string;
            /**
             * 获取用户ID
             */
            getUserId(): string;
            /**
             * 获取ModuleId
             */
            getDefaultModuleAsset(): zmg.IDefaultModuleAsset;

            /**
             * 协议发送使用
             * pc/pad
             */
            getPlatform(): string;

            isIOS(): boolean;

            isAndroid(): boolean;

            isPC(): boolean;
            /**
             * 专商城提供的设备字段
             */
            getShopDevice(): string;

        }
    }
}
export { }