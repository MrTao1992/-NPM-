import { $EModuleType } from 'zmg_config_mgr';
import { BaseMgr } from 'zmg_mgr';

declare global {
    namespace zmg {
        interface IUIConfig {
            bunName: string;
            bg: string;
            mask: string;
            alert: string;
            toast: string;
            reward: string;
            loading: string;
            backBtn: string;
            transitions: string;
            video: string;
            version: string;
            frameRatio: number;
            mouse: {
                normal: string, link: string, unavailable: string,
                sound: zmg.IResAsset,
                effect: zmg.IResAsset,
            };
            role: Record<string, zmg.IRoleConfig>;
        }
        interface IAppConfig {
            /**
             * bu
             */
            bu: string;
            /**
            * 埋点发送
            */
            appId: string;
            /**
            * 名称(掌门1对1,掌门少儿)
            */
            appName: string;
            /**
             * 
             */
            appCode: string;
            frameWidth: number;
            frameHeight: number;
            /**
             * 服务器配置
             */
            servers: Record<string, IServerConfig>;
            /**
             * 是否使用原生壳
             */
            useShell: boolean;
        }
        interface IServerConfig {
            /**
             * 环境变量
             */
            env: string;
            /**
             * 子目录路径
             */
            path: string;
            /**
             * 网关地址
             */
            gate: string;
            /**
             * 服务器地址
             */
            server: string;
            /**
             * 服务器二级目录
             */
            serverPath: string;
            /**
             * 远程bundle存放地址
             */
            bundle: string;
            /**
             * 远程bundle发布目录
             * 规则:
             * 远程bundle存放地址 + bunName + publish
             */
            publish: string;
            /**
             * 远程描述文件名
             */
            bundleKey: string;
        }
        /**
         * 约束条件
         */
        interface IConditionConfig {
            /**
             * 约束ID
             */
            id: string;
            /**
             * 约束名称
             */
            disName: string;
            /**
             * 约束使用cls
             */
            clsName: string;
            /**
             * 约束参数
             */
            param: object;

        }

        /**
         * 埋点配置
         */
        interface ITracckConfig {
            /**
             * 埋点关键字
             */
            key: string;
            /**
             * 埋点描述
             */
            des: string;
            /**
             * 所属模块
             */
            moduleName: string;
        }

        /**
         * 模块启动方式
         */
        interface IModuleMainConfig {
            /**
             * 启动方式
             * //scene,prefab,url
             */
            type: $EModuleType;
            /**
             * 地址
             */
            path: string;
            /**
             * 启动参数
             */
            param: any;
        }

        interface IModuleAsset {
            /**
             * 模块名称
             */
            code: string;
            /**
             * 跳转模块参数
             */
            param: any;
        }
        interface IDefaultModuleAsset extends IModuleAsset {
            /**
             * 是否自动延迟进入主场景
             * (方便调试)
             */
            auto: boolean;
        }
        interface IRoleConfig {
            /**
            * 人物名称
            */
            rName: string;
            /**
             * 资源Bun名称
             */
            bunName: string;
            /**
             * 裸模位置
             */
            path: string;
            /**
             * 人物阴影地址
             */
            shadow: string;

            talks: string[];
        }
        interface IVideoAsset {
            bunName: string;
            scene: string;
        }
        interface IWebViewAsset {
            bunName: string;
            scene: string;
        }
        /**
         * 模块配置
         */
        interface IModuleConfig {
            /**
             * 模块id
             */
            id: number;
            /**
             * 模块名字
             */
            code: string;
            /**
             * 模块中文名
             */
            displayName: string;
            /**
             * 约束条件
             */
            conditions: [{ clsName: string, param: object }];
            /**
             * 启动方式
             */
            main: IModuleMainConfig;
            /**
             * 背景音乐
             */
            bgclip: string;
            /**
             * 父类跳转模块
             */
            parent: IModuleAsset;
            /**
             * 是否导航，进入back返回列表
             */
            isNav: boolean;
            /**
             * 是否保存缓存
             */
            isCache: boolean;
            /**
             * 当前模块是否强制关闭
             */
            isClose: boolean;
            /**
             * 埋点信息
             */
            durationtime: string;
            /**
             * 关闭防沉迷计时器
             */
            closeCountDown: boolean;
            /**
             * 模块刷新比率
             */
            frameRatio: number;
            /**
             * 是否远程模块
             */
            isRemote: boolean;
            /**
             * 版本
             */
            version: string;
        }
        interface IConfigTool {
            /**
             * 
             */
            id: number;
            name: string;
            displayName: string;
            close: boolean;
        }
        interface IConfigMgr extends zmg.IMgr {
            readonly publishKey: string;
            /**
             * 模块配置
             */
            modules: IModuleConfig[];
            /**
             * ui配置
             */
            uiconfig: IUIConfig;
            /**
              * 获取buconfig，配置在本地包中
              * @param env 环境
              * @param appid bu参数
              */
            appconfig: IAppConfig;
            /**
             * 默认启动项
             */
            getDefaultConfig(): zmg.IModuleAsset;
            /**
             * 获取视频配置
             */
            getVideoConfig(): zmg.IVideoAsset;
            /**
             * 获取webview配置
             */
            getWebviewConfig(): zmg.IWebViewAsset;
            /**
             * 获取服务器配置
             */
            getServerConfig(env: string): IServerConfig;

            /**
             * 获取是否使用原生壳
             */
            getUseShell(): boolean;

            /**
             * 获取AppName
             */
            getAppName(): string;
            /**
             * 获取默认启动项
             */
            getStartModule(): string;
            /**
             * 获取AppID
             */
            getAppId(): string;
            /**
             * 获取模块约束条件
             */
            // getConditionListByCode(code: string): IConditionConfig[];
            /**
             *  获取模块配置表
             * @param id
             */
            getModuleConfigByCode(code: string): IModuleConfig;

            /**
             * 设置在线模块数据
             * @param response 服务数据
             */
            setOnlineModuleConfig(response: zmg.IStudyParkConfigInf): void;
            /**
             * 设置远程bundle参数
             * @param bundlePrefix 
             * @param bundleFilePath 
             * @param bundleFileName 
             */
            setConfigMain(bundlePrefix: string, bundleFilePath: string, bundleFileName: string): void;
        }

        /**
         * 获取到后台学伴公园配置信息
         */
        interface IStudyParkConfigInf {
            code: string;
            playTimeList: number[];
            restTimeList: number[];
            studyParkModuleConfigs: {
                hash: string, manifest: string, code: string, moduleName: string,
                moduleSwitch: boolean, onlineUrl: string, version: string
            }[];
        }
    }
}
export { }