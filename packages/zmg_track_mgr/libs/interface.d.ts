declare module NATIVEJSB {

    /**
     * 进入模块
     * @param moudleId 模块code
     */
    function enter(moudleId, param?: string);

    /**
     * 返回前面模块
     */
    function back();

    /**
     * 返回主页模块
     */
    function goHome();

    /**
     * 登陆token
     */
    function token();

    /**
     * 用户id
     */
    function userId();

    /**
     * 用户名称
     */
    function userName();

    /**
     * 设备类型
     */
    function device();

    /**
     * 服务器环境
     */
    function env();

    /**
     * 原生端的appId
     */
    function appId();

    /**
     * 调用原生接口
     * @param name 消息名称
     * @param data 消息数据
     */
    function sendMsg(name: string, data?: any): any;

    /**
     * 关闭模块
     */
    function close();

    /**
     * 是否静音
     */
    function isMute(): boolean;

    /**
     * 设置模块code
     * @param name 模块code
     */
    function setAppName(name: string);

    /**
     * 获取缓存资源
     * @param url 资源地址
     * @param type 资源类型
     * @param isCommon 是否共有资源 默认不是
     */
    function getRes(url: string, type?: Function, isCommon: boolean = false);

    /**
     * 检测缓存资源, 包含所有的资源 返回ture, 否则返回flase
     * @param urls 资源地址数组
     * @param isCommon 是否共有资源 默认不是
     */
    function getRess(urls: Array<string>, isCommon: boolean = false);

    /**
    * 加载本地resources资源
    * @param url 资源地址  相对resources文件夹
    * @param type  cc.SpriteFrame, cc.Texture2D, cc.Prefab
    * @param complete 加载完毕回调
    * @param isCommon 是否共有资源 默认不是
    * @param bundleName 子包名称
    */
    function loadRes(url: string, type: typeof cc.Asset, complete: Function, bundleName: string = ''): void;

    /**
     * 加载资源
     * @param url 资源地址
     * @param type 资源类型
     * @param complete 加载完毕回调
     * @param isCommon 是否共有资源 默认不是
     */
    function load(url: string, type: string, complete: Function, isCommon: boolean = false);

    /**
     * 加载资源
     * @param urls 资源数组
     * @param complete 加载完毕回调
     * @param isCommon 是否共有资源 默认不是
     */
    function loads(urls: Array<string>, complete: Function, isCommon: boolean = false);

    /**
     * 提交埋点数据
     * @param name 事件名称
     * @param eventType 事件类型
     * @param eventValue 事件值
     * @param data 扩展参数
     */
    function sendEvent(name: string, data: any = {}, eventType: number = 0, eventValue: number = 1);

    /**
     * 提交日志数据
     * @param name 事件名称
     * @param eventType 事件类型
     * @param eventValue 事件值
     * @param data 扩展参数
     */
    function sendLog(name: string, data: any = {});

    /**
     * 是否测试环境
     */
    function isTest(): boolean;

    /**
     * 是否uat
     */
    function isUat(): boolean;

    /**
     * 是否生产环境
     */
    function isProd(): boolean;

    /**
     * 是否pc
     */
    function isPC(): boolean;

    /**
     * 是否ipad
     */
    function isPad(): boolean;

    /**
     * 是否手机
     */
    function isPhone(): boolean;

    /**
     * 课程uid
     */
    function lessonUid(): string;

    /**
     * 课程id
     */
    function lessonId(): string;

    /**
     * 课程类型
     */
    function lessonType(): string;

    /**
     * 部门编号
     */
    function bu(): string;

    /**
     * request请求
     * @param url request的url
     * @param data json对象
     * @param callBack request完成回调
     * @param method request请求方法  GET,POST
     */
    function http(url: string, data: any, callBack: Function, method:string = 'POST', httpHead?: APP_HTTP_HEADER);

    /**
     * 初始化角色
     * @param role 角色模型容器
     * @param name 角色名字
     * @param action 角色模型动作
     */
    function initRole(role: cc.Node, name: ROLE_NAME = ROLE_NAME.ZXM, action: ROLE_ACTION = ROLE_ACTION.STAND): Role;

    export class Role {
        constructor();

        public destroy();

        /**
         * 角色模型缩放 
         */
        public scale(value: number);

        /**
         * 切换角色模型动作
         * @param action 
         */
        public action(action: ROLE_ACTION, animation: string = '');

        /**
         * 角色初始衣服
         * @param values 完整衣服数据, 衣服ID或者衣服数据, 默认为角色默认衣服数据
         */
        public initCloth(values: ClothInfo[] = null);

        /**
         * 切换角色模型衣服
         * @param values 完整衣服数据, 衣服ID或者衣服数据, 
         * @param isClear 是否清楚其他衣服
         */
        public changeCloth(value: number | ClothInfo, isClear: boolean = false);

        /**
         * 脱衣服
         * @param value 衣服ID数组或者衣服数据数组, 不传全脱
         */
        public takeOffCloth(value: number[] | ClothInfo[] = null);

        /**
         * 当前身上所有的衣服
         */
        public curCloths(): ClothInfo[];

        /**
         * 保存衣服
         */
        public save(callBack: Function);
    }

    export interface APP_HTTP_HEADER {
        AppName: string,
        AppVersion: string,
        ApiVersion: string
    }

    export interface DragonInfo {
        atlasImg: string,
        atlasJson: string,
        dragJson: string
    }

    export interface AlertInfo {
        backgroundAnimation: DragonInfo,
        backgroundImg: string;
        bu: number;
        buttonAnimation: DragonInfo;
        buttonImg: string;
        id: number;
        targetModuleCode: string;
        titleAnimation: DragonInfo;
        titleImg: string;
        triggerType: string;
        type: number;
        voiceUrl: string;
    }

    export interface AwardInfo {
        awardImg: string,
        awardNum: string,
        awardType: number
    }

    export enum ROLE_NAME {
        ZXM = 'zxm',
        MMT = 'mmt',
        DDX = 'ddx'
    }

    export enum ROLE_ACTION {
        WALK_LEFT = 'walkleft',
        WALK_RIGHT = 'walkright',
        STAND = 'stand',
        DIANZAN = 'dianzan'
    }

    export enum ENVIRONMENT {
        TEST,
        UAT,
        PRODUCTION
    }

    export enum DEVICE {
        PC,
        IPAD,
        APAD,
        IPHONE,
        APHONE
    }

    /**
     * 弹出tip
     * @param message 消息
     * @param time 超时时间s
     */
    function showTip(message: string, time: number = 3);

    /**
     * 关闭tip
     */
    function hideTip();

    /**
     * 弹出 消息弹窗
     * @param message 消息
     * @param ok 确认回调
     * @param cancel 取消回调
     */
    function showMessageAlert(message: string, ok: Function = null, cancel: Function = null);

    /**
     * 关闭 消息弹窗
     */
    function hideMessageAlert();

    /**
     * 弹出活动弹窗
     * @param alertInfo 
     * @param ok 
     * @param cancel 
     */
    function showActiveAlert(alertInfo: AlertInfo, ok: Function = null, cancel: Function = null);

    /**
     * 关闭活动弹窗
     */
    function hideActiveAlert();

    /**
     * 弹出奖励弹窗
     * @param awardInfos AwardInfo[]
     * @param ok 
     * @param cancel 
     */
    function showAwardAlert(awardInfos: AwardInfo[], ok: Function = null, cancel: Function = null);

    /**
     * 关闭奖励弹窗
     */
    function hideAwardAlert();

    /**
     * 存储数据
     * @param name 
     * @param value 
     * @param code 
     * @param expires 
     */
    function addItem(name: string, value: any, code: string, expires: number = 60 * 60): boolean;

    /**
     * 获取数据
     * @param name 
     * @param code 
     */
    function getItem(name: string, code: string): any;

    /**
     * 删除数据
     * @param name 
     * @param code 
     */
    function deleteItem(name: string, code: string);

    /**
     * 是否原生环境
     */
    function isNative(): boolean;

    /**
     * 注册消息处理对象
     * @param name 消息名称
     * @param value 消息处理对象。。。CommandBase的子对象
     */
    function registerHandler(name: string, value: any): void;

    /**
     * 注销消息处理对象
     * @param name 消息名称
     */
    function unRegisterHandler(name: string): void;

    /**
     * 入口来源
     */
    function source(): string;

    /**
     * 原生本地调试函数 (自己开发的项目不可调用)
     * @param target 主场景加载脚本
     * @param option 参数配置
     */
    function debugConfig(target:any, option:{bu:string, env:number, device:number, gameId:string, token:string});

    /**
     * 初始化navigation 不要调用
     * @param target 主场景加载脚本
     */
    function appInit(target: any);

    /**
     * 停止热更新, (自己开发的项目不可调用)
     */
    function stop();

    /**
     *当前模块id
     */
    function moudleId(): string;

    /**
     * 清除缓存
     */
    function clearCatche();

    /**
     * 设置埋点信息
     * @param appId 应用id 
     * @param appVersion 应用版本
     */
    function setLogConfig(appId:string, appVersion: string);
    
    /**
     * 端版app版本号
     */
    function appVersion(): string;

    /**
     * 端对应后台的接口版本号
     */
    function apiVersion(): string;
}