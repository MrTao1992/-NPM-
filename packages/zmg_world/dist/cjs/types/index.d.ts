declare module 'zmg_world/src/AppBundleName' {
	export class _AppBundleName {
	    /**
	     * 杂物
	     */
	    static Stack: string;
	    /**
	     * 领取学伴
	     */
	    static RECEIVE_ROLE: string;
	    /**
	     * 大厅
	     */
	    static HALL: string;
	    /**
	     * 奖励中心
	     */
	    static REWARD_CENTER: string;
	    /**
	     * 弹窗资源目录
	     */
	    static POP_LAYER: string;
	    /**
	     * 防沉迷
	     */
	    static CAIS: string;
	    /**
	     * 学伴房间
	     */
	    static HOUSE: string;
	    /**
	     * 任务中心
	     */
	    static TASKCENTER: string;
	    /**
	     * 精灵墙
	     */
	    static MEDALWALL: string;
	    /**
	     * 商城
	     */
	    static MAGIC_MALL: string;
	    /**
	     * 贺卡
	     */
	    static GREETCARD: string;
	    /**
	     * AI引流课
	     */
	    static AICLASS: string;
	    /**
	     * 试衣间
	     */
	    static WARDROBE: string;
	    /**
	     * 阶段复习课
	     */
	    static ZMREVIEW: string;
	}

}
declare module 'zmg_world/src/cais/CaisVo' {
	/**
	 * 倒计时监控
	 */
	export default class _CaisVo {
	    private static _instance;
	    static getInstance(...args: any[]): _CaisVo;
	    CaisServerData: {
	        configId: number;
	        playTimeList: number[];
	        restTimeList: number[];
	    };
	    /**
	     * 要求休息时间
	     */
	    private _restTime;
	    /**
	     * 可以游戏时间
	     */
	    private _playTime;
	    /**
	     * 记录已经游戏时间
	     */
	    private _playRecord;
	    /**
	     * 离开了多久
	     */
	    private _levelTime;
	    /**
	     * 是否打开防沉迷界面
	     */
	    private _countTime;
	    /**
	     * 当前状态
	     */
	    private _active;
	    private _isTalkPlay;
	    get isTalkPlay(): boolean;
	    set isTalkPlay(s: boolean);
	    get countTime(): number;
	    set countTime(s: number);
	    get playTime(): number;
	    set playTime(s: number);
	    get restTime(): number;
	    set restTime(s: number);
	    get active(): boolean;
	    set active(s: boolean);
	    get levelTime(): number;
	    set levelTime(s: number);
	    get playRecord(): number;
	    set playRecord(s: number);
	}
	export enum $CaisServerVoType {
	    LOGIN = "Countdown_login",
	    START_PLAY = "Countdown_startTime",
	    PLAY_TIME = "Countdown_countTime",
	    LAST_PLAY_TIME = "Countdown_lastPlayTime",
	    GUIDE_NPC = "Hall_guideNpc",
	    SIGN_TIME = "SignTime",
	    FIRST_ENTER_MALL = "MagicMall_firstEnterMall",
	    PosterClipTimes = "PosterClipTimes"
	}
	export enum $CaisLocalVoType {
	    HALL_LOCAL_ = "hallLocal_",
	    HEART = "zm_heart"
	}

}
declare module 'zmg_world/src/servers/commands/Commands' {
	/**
	 * swagger:
	 * http://kids-study-park-c-fat-alhz.inzm.com/swagger-ui.html#/
	 */
	export enum $Commands {
	    /**
	     * 获取大厅基本信息
	     */
	    getHallBaseInfo = "/kids/study/park/c/api/hall/getHallBaseInfo",
	    getStudentBaseInfo = "/kids/study/park/c/api/config/getStudentBaseInfo",
	    /**
	    * 获取彩蛋信息
	    */
	    eggReward = "/kids/study/park/c/api/hall/checkpointReward",
	    eggInfo = "/kids/study/park/c/api/hall/getHallCheckpointInfo",
	    /**
	     * 获取学伴信息
	     */
	    getPartnerInfo = "/kids/study/park/c/api/v2/partner/optimize/getPartnerInfo",
	    getLandInfo = "/kids/study/park/c/api/partner/poster/wall/posterFrameShow",
	    hangingPoster = "/kids/study/park/c/api/partner/poster/wall/hangingPoster",
	    posterPage = "/kids/study/park/c/api/partner/poster/wall/posterPage",
	    /**
	     * 获取装扮
	     */
	    getRoleDressUps = "/kids/study/park/c/api/partner/dressUp/query/userDressUps",
	    /**
	     * 更新能量果
	     */
	    getFruitTotalNum = "/kids/study/park/c/api/v2/partner/energyFruit/amount",
	    /**
	     * 领取学伴
	     */
	    gainCompanion = "/kids/study/park/c/api/v2/partner/addPartner",
	    /**
	     * 灰度查询
	     */
	    graySurvey = "/kids/api/grayApi/toc/gray/findGrayEffectByCodeAndParam",
	    grayListSurvey = "/kids/api/grayApi/toc/gray/findMany",
	    /**
	     * 原生模块信息列表
	     */
	    moduleList = "/kids/study/park/c/api/native/module/query/list",
	    /**
	     * 获取存储服务器数据
	     */
	    getStorage = "/kids/study/park/c/api/dict/storage/batch",
	    setStorage = "/kids/study/park/c/api/dict/storage/put",
	    /**
	     * 奖励中心
	     */
	    rewardCenterInit = "/kidsStuApi/award/centre/task/init",
	    getRewardCenterList = "/kidsStuApi/award/centre/task/list",
	    getRewardCenterAward = "/kidsStuApi/award/centre/take/award",
	    getRewardCenterRemind = "/kidsStuApi/award/centre/task/remind",
	    /**
	     * 签到
	     */
	    signList = "/kids/study/park/c/api/signIn/current/signIn/list",
	    isSignIn = "/kids/study/park/c/api/signIn/isSignIn",
	    signIn = "/kids/study/park/c/api/signIn/signIn",
	    /**
	     * 广告弹窗
	     */
	    addOperationInfo = "/kids/study/park/c/api/popup/window/addOperationInfo",
	    window_award = "/kids/study/park/c/api/popup/window/get/award",
	    window_get = "/kids/study/park/c/api/popup/window/get",
	    getQuestionnaireConfig = "/kidsStuApi/api/feedback/list",
	    /**
	     * npc领奖
	     */
	    npcReward = "/kids/study/park/c/api/hall/npcReward",
	    /**
	     * 大厅NPC
	     */
	    npcInfo = "/kids/study/park/c/api/hall/getHallNpcInfo",
	    getHallModuleIconInfo = "/kids/study/park/c/api/hall/getHallModuleIconInfo",
	    /**勋章 */
	    carryMedal = "/kids/medal-wall/api/medal/carry",
	    ownMedal = "/kids/medal-wall/api/user-medal/own",
	    getDressDetail = "/kids/study/park/c/api/partner/dressUp/product/detail",
	    getWardrobeList = "/kids/study/park/c/api/partner/dressUp/query/dressUps",
	    saveRoleDressUps = "/kids/study/park/c/api/partner/dressUp/save/userDressUps",
	    getWardrobeBar = "/kids/study/park/c/api/partner/dressUp/wardrobe/bar",
	    getNewClothProduct = "/kids/study/park/c/api/partner/dressUp/remind/newFreeProduct",
	    uploadTryOnRecord = "/kids/study/park/c/api/partner/dressUp/save/userDressRecord",
	    getWardrobeCategInfo = "/kids/study/park/c/api/partner/dressUp/product/directory",
	    uploadImg = "/kids/study/park/c/api/file/data/image/upload",
	    /**House************************************************************************************************************/
	    subtractFruit = "/kids/study/park/c/api/partner/subtractFruit",
	    sleep = "/kids/study/park/c/api/v2/partner/sleep",
	    wash = "/kids/study/park/c/api/v2/partner/wash",
	    recordClean = "/kids/study/park/stat/api/park/partner/record/clean",
	    recordCleanRsult = "/kids/study/park/stat/api/park/partner/record/cleanRsult",
	    recordEat = "/kids/study/park/stat/api/park/partner/record/eat",
	    recordSleep = "/kids/study/park/stat/api/park/partner/record/sleep",
	    recordWash = "/kids/study/park/stat/api/park/partner/record/wash",
	    actionConfig = "/kids/study/park/c/api/partner/actionConfig",
	    cleanRoom = "/kids/study/park/c/api/partner/clean",
	    dressList = "/kids/study/park/c/api/furniture/dressList",
	    purchase = "/kids/study/park/c/api/furniture/purchase",
	    saveUserFurniture = "/kids/study/park/c/api/furniture/saveUserFurniture",
	    types = "/kids/study/park/c/api/furniture/types",
	    userFurniturDressList = "/kids/study/park/c/api/furniture/userFurniturDressList",
	    /**Cais************************************************************************************************************/
	    setPlayAndRestTimeConfig = "/kids/api/study/park/api/config/setPlayAndRestTimeConfig",
	    getPlayAndRestTimeConfig = "/kids/api/study/park/api/config/getPlayAndRestTimeConfig",
	    /**
	     * 引导奖励
	     */
	    getEnergyFruit = "/kids/study/park/c/api/hall/getEnergyFruit",
	    recordGuideMedal = "/kids/medal-wall/api/guide/record-guide",
	    allMedal = "/kids/medal-wall/api/user-medal-wall/all",
	    noviewMedal = "/kids/medal-wall/api/user-medal/no-view",
	    viewMedal = "/kids/medal-wall/api/user-medal/save/view-medal",
	    removeMedal = "/kids/medal-wall/api/medal/remove",
	    acceptMedal = "/kids/medal-wall/api/medal/accept",
	    countMedal = "/kids/medal-wall/api/medal/not-accepted/count",
	    listMedal = "/kids/medal-wall/api/medal/not-accepted/list",
	    achievementMedal = "/kids/medal-wall/api/user-medal-wall/achievement/page",
	    infoMedal = "/kids/medal-wall/api/user-medal/info",
	    isGuidedMedal = "/kids/medal-wall/api/guide/is-guided",
	    carryUserMedal = "/kids/medal-wall/api/user-medal/carry",
	    catalogueMedal = "/kids/medal-wall/api/rank/medal/catalogue",
	    getRankMedal = "/kids/medal-wall/api/rank/medal/getRank",
	    getBatchMedal = "/kids/study/park/c/api/partner/dressUp/query/userDressUps/batch",
	    /**Mall奇妙商城相关接口************************************************************************************************************/
	    getMallDesc = "/kids/study/park/c/api/fantastic/mall/desc",
	    getGooldsTypeList = "/kids/study/park/c/api/v3/fantastic/mall/product/type/list",
	    getRecommendList = "/kids/study/park/c/api/v3/fantastic/mall/product/recommendList",
	    getActivityList = "/kids/study/park/c/api/v3/fantastic/mall/activity/product/list",
	    getGoodsDetailInf = "/kids/study/park/c/api/v3/fantastic/mall/product/detail",
	    getOrderList = "/kids/study/park/c/api/fantastic/mall/order/list",
	    purchaseGoods = "/kids/study/park/c/api/v3/fantastic/mall/purchase",
	    getGoodsList = "/kids/study/park/c/api/v3/fantastic/mall/product/list",
	    /**
	     * 任务中心
	    */
	    taskAward = "/kidsStuApi/task/centre/take/award",
	    taskInit = "/kidsStuApi/task/centre/take/init",
	    todoTaskList = "/kidsStuApi/task/centre/todo/list",
	    getTaskUrl = "/kidsStuApi/task/centre/task/getUrl",
	    unClaimed = "/kidsStuApi/task/centre/unclaimed",
	    boxAward = "/kidsStuApi/task/centre/box/award",
	    boxNode = "/kidsStuApi/task/centre/box/node",
	    boxList = "/kidsStuApi/task/centre/box/list",
	    /**
	     * 贺卡相关接口
	     */
	    festivalRead = "/kids/study/park/c/api/greet/card/festival/tip/read",
	    greetCardInbox = "/kids/study/park/c/api/greet/card/receive/greetCardInbox",
	    readGreetMessage = "/kids/study/park/c/api/greet/card/receive/readMessage",
	    unGreetReadMessage = "/kids/study/park/c/api/greet/card/receive/unReadMessage",
	    greetCardSend = "/kids/study/park/c/api/greet/card/send/sendCard",
	    sendCardDecorateInfo = "/kids/study/park/c/api/greet/card/send/sendCardDecorateInfo",
	    sendGreetCardInfo = "/kids/study/park/c/api/greet/card/send/sendCardInfo",
	    unReadMessageCount = "/kids/study/park/c/api/greet/card/receive/unReadMessageCount"
	}

}
declare module 'zmg_world/src/ServerModuleMgr' {
	import { BaseMgr } from 'zmg_mgr';
	/**
	 * 模块配置信息服务器获取管理
	 */
	export class _ServerModuleMgr extends BaseMgr {
	    private static _instance;
	    static getInstance(): _ServerModuleMgr;
	    private _isValid;
	    start(): Promise<void>;
	    private updateModuleData;
	    private getHallBaseInfo;
	    destory(): void;
	    get isValid(): boolean;
	}

}
declare module 'zmg_world/src/userdatas/UserEventName' {
	export class _UserEventName {
	    static FRUIT_CHANGE: string;
	    static SLEEP_CHANGE: string;
	    static WASH_CHANGE: string;
	    static ENERGY_CHANGE: string;
	    static CLEAN_CHANGE: string;
	    static GREET_CARD: string;
	}

}
declare module 'zmg_world/src/userdatas/UserCardVo' {
	export class UserCardVo extends cc.EventTarget {
	    private _hasGreetCard;
	    private _hasNewGreetCard;
	    private _hasReciveGreetCard;
	    private _info;
	    private _greetCardTip;
	    setData(res: WebServerVo.IGetPartnerInfo): void;
	    set isGreetCard(s: boolean);
	    get isGreetCard(): boolean;
	    set hasGreetCard(value: boolean);
	    get hasGreetCard(): boolean;
	    set hasReciveGreetCard(value: boolean);
	    get hasReciveGreetCard(): boolean;
	    /**
	     * @description: 是否有新贺卡查收提醒
	     */
	    set hasNewGreetCard(value: boolean);
	    get greetCardTip(): WebServerVo.IGreetCardTip;
	    set greetCardTip(value: WebServerVo.IGreetCardTip);
	}

}
declare module 'zmg_world/src/userdatas/UserCleanVo' {
	export class UserClearVo extends cc.EventTarget {
	    CLEAN_CHANGE: string;
	    private _cleanRoomInfo;
	    setData(res: WebServerVo.IGetPartnerInfo): void;
	    /**
	        * 根据房间楼层号设置楼层垃圾信息
	        */
	    setRoomCleanLinessByFloorId(info: WebServerVo.ICleanRoomInfo): WebServerVo.ICleanRoomInfo;
	    /**
	     * 根据房间楼层号获取楼层垃圾信息
	     */
	    getRoomCleanLinessByFloorId(id: number): WebServerVo.ICleanRoomInfo;
	    /**
	     *  根据房间楼层号设置楼层清洁值
	     */
	    setRoomCleanValueByFloorId(id: number, Value: number): WebServerVo.ICleanRoomInfo;
	    /**
	     *  根据房间楼层号设置楼层清洁值
	     */
	    setRoomIsToCleanByFloorId(id: number, Value: boolean): WebServerVo.ICleanRoomInfo;
	    /**
	     *  根据房间楼层号获取楼层清洁值
	     */
	    getRoomCleanValueByFloorId(id: number): number;
	    /**
	     *  根据房间楼层号获取楼层是否需要清洁
	     */
	    getRoomIsToCleanByFloorId(id: number): boolean;
	    sortFun(aa: WebServerVo.ICleanRoomInfo, bb: WebServerVo.ICleanRoomInfo): number;
	    /**
	     *  根据房间楼层号获取楼层是否需要清洁
	     */
	    getRoomIsToClean(): number;
	    /**
	     * 获取垃圾数目
	     */
	    getRubbishsByFloorId(id: number, rubbishTotal: number): number;
	}

}
declare module 'zmg_world/src/userdatas/UserMgr' {
	import { BaseMgr } from 'zmg_mgr';
	import { UserCardVo } from 'zmg_world/src/UserCardVo';
	import { UserClearVo } from 'zmg_world/src/UserCleanVo';
	/**
	 * 用户数据保存
	 */
	export class _UserMgr extends BaseMgr implements zmg.IMgr {
	    private static _instance;
	    static getInstance(): _UserMgr;
	    private _actor;
	    /**
	     * 学伴信息
	     */
	    private _userVo;
	    private _studentVo;
	    get userVo(): WebServerVo.IGetPartnerInfo;
	    set userVo(data: WebServerVo.IGetPartnerInfo);
	    private _cleanVo;
	    private _cardVo;
	    roleTypeList: string[];
	    get cleanVo(): UserClearVo;
	    get cardVo(): UserCardVo;
	    /**
	     * 获取人物形象
	     */
	    get actor(): zmg.IRole;
	    get partnerId(): number;
	    start(): any;
	    getStudentInfo(callback: (data: WebServerVo.IGetStudentBaseInfo) => void, target: any): void;
	    updateUserData(): void;
	    updateCloth(): void;
	    getActionConfig(): void;
	    onActionConfig(res: any): void;
	    updateFruitValue(): void;
	    /**
	     * 获取学伴信息
	     * @param res
	     */
	    onServer(res: WebServerVo.IGetPartnerInfo): void;
	    private onCleanChange;
	    private onCardChange;
	    /**
	     * 获取学伴装扮信息
	     */
	    onServerCloth(res: WebServerVo.IDress): void;
	    destory(): void;
	    /**
	    * @description: 睡觉总时间
	    */
	    private _sleepFullSeconds;
	    get sleepFullSeconds(): number;
	    set sleepFullSeconds(value: number);
	    /**
	     * 学伴饥饿值
	     */
	    get totalEnergy(): number;
	    set totalEnergy(value: number);
	    /**
	     * @description: 洗澡总时间
	     */
	    private _washFullSeconds;
	    get washFullSeconds(): number;
	    set washFullSeconds(value: number);
	    get isValid(): boolean;
	    get rubbishTotal(): number;
	    set rubbishTotal(value: number);
	    set isToWash(bool: boolean);
	    get isToWash(): boolean;
	    get washValue(): number;
	    set washValue(value: number);
	    get isAdoption(): boolean;
	    get fruitValue(): number;
	    set fruitValue(value: number);
	    set isHunger(bool: boolean);
	    get isHunger(): boolean;
	    set hasNewGreetCard(value: boolean);
	    get hasNewGreetCard(): boolean;
	    set isGreetCard(s: boolean);
	    get isGreetCard(): boolean;
	    get partnerCurrentEnergy(): number;
	    set partnerCurrentEnergy(value: number);
	    set isToSleep(bool: boolean);
	    get isToSleep(): boolean;
	    get sleepValue(): number;
	    set sleepValue(value: number);
	    /**
	     * 根据房间楼层号获取楼层垃圾信息
	     */
	    getRoomCleanLinessByFloorId(id: number): WebServerVo.ICleanRoomInfo;
	    /**
	     *  根据房间楼层号设置楼层清洁值
	     */
	    setRoomCleanValueByFloorId(id: number, Value: number): WebServerVo.ICleanRoomInfo;
	    /**
	     *  根据房间楼层号设置楼层清洁值
	     */
	    setRoomIsToCleanByFloorId(id: number, Value: boolean): WebServerVo.ICleanRoomInfo;
	    /**
	     *  根据房间楼层号获取楼层清洁值
	     */
	    getRoomCleanValueByFloorId(id: number): number;
	    /**
	     *  根据房间楼层号获取楼层是否需要清洁
	     */
	    getRoomIsToCleanByFloorId(id: number): boolean;
	    /**
	     *  根据房间楼层号获取楼层是否需要清洁
	     */
	    getRoomIsToClean(): number;
	    /**
	     * 获取垃圾数目
	     */
	    getRubbishsByFloorId(id: number): number;
	    getEatProgerss(): number;
	    getSleepProgress(): number;
	    getWashProgress(): number;
	    get roleName(): string;
	    private addEvents;
	    private removeEvents;
	    private onCoreReady;
	    /**
	     *  //1,走路,3:说话，站立
	     * @param type
	     */
	    private getActionByType;
	}

}
declare module 'zmg_world/src/conditions/HasPartnersCDN' {
	import { BaseModuleCDN } from 'zmg_module_mgr';
	/**
	 * 检查学伴信息约束条件
	 */
	export class HasPartnersCDN extends BaseModuleCDN implements zmg.IModuleCondition {
	    /**
	    * 是否检测通过
	    */
	    check(param?: any): Promise<any>;
	    /**
	     * 检查器是否准备完毕，可以进行工作
	     */
	    get isValid(): boolean;
	    catchHandler(param?: any): boolean;
	}

}
declare module 'zmg_world/src/conditions/FruitValueCDN' {
	import { BaseModuleCDN } from 'zmg_module_mgr';
	export class FruitValueCDN extends BaseModuleCDN implements zmg.IModuleCondition {
	    check(param?: any): Promise<any>;
	    get isValid(): boolean;
	    catchHandler(param?: any): boolean;
	}

}
declare module 'zmg_world/src/conditions/ModuleGrayCDN' {
	import { BaseModuleCDN } from 'zmg_module_mgr'; enum EGrayState {
	    unknow = 0,
	    close = 1,
	    open = 2
	}
	export class ModuleGrayCDN extends BaseModuleCDN implements zmg.IModuleCondition {
	    grayList: Record<string, EGrayState>;
	    /**
	    * 是否检测通过
	    */
	    check(param?: any): Promise<any>;
	    /**
	     * 检查器是否准备完毕，可以进行工作
	     */
	    get isValid(): boolean;
	}
	export {};

}
declare module 'zmg_world/src/conditions/ModuleConditionInit' {
	import { BaseMgr } from 'zmg_mgr';
	/**
	 * 增加所有模块约束条件
	 */
	export class _ModuleConditionInit extends BaseMgr implements zmg.IMgr {
	    private static _instance;
	    static getInstance(): _ModuleConditionInit;
	    start(): Promise<void>;
	    get isValid(): boolean;
	}

}
declare module 'zmg_world/src/core/bridge/cmds/BaseCommand' {
	export class $BaseCommand {
	    protected _packet: any;
	    constructor();
	    set packet(value: any);
	    run(data: any): void;
	    excute(data: any): any;
	}

}
declare module 'zmg_world/src/core/bridge/cmds/BackToHallCmd' {
	import { $BaseCommand } from 'zmg_world/src/BaseCommand';
	export class BackToHallCmd extends $BaseCommand {
	    excute(data: any): void;
	}

}
declare module 'zmg_world/src/core/bridge/cmds/GetUserDefaultsCmd' {
	import { $BaseCommand } from 'zmg_world/src/BaseCommand';
	export class GetUserDefaultsCmd extends $BaseCommand {
	    excute(data: any): void;
	}

}
declare module 'zmg_world/src/core/bridge/cmds/SetUserDefaultsCmd' {
	import { $BaseCommand } from 'zmg_world/src/BaseCommand';
	export class SetUserDefaultsCmd extends $BaseCommand {
	    excute(data: any): void;
	}

}
declare module 'zmg_world/src/core/bridge/cmds/LogoutGameCmd' {
	import { $BaseCommand } from 'zmg_world/src/BaseCommand';
	export class LogoutGameCmd extends $BaseCommand {
	    excute(data: any): void;
	}

}
declare module 'zmg_world/src/core/bridge/cmds/ShowSubModuleCmd' {
	import { $BaseCommand } from 'zmg_world/src/BaseCommand';
	export class ShowSubModuleCmd extends $BaseCommand {
	    excute(data: any): void;
	}

}
declare module 'zmg_world/src/core/bridge/cmds/EnterModuleCmd' {
	import { $BaseCommand } from 'zmg_world/src/BaseCommand';
	export class EnterModuleCmd extends $BaseCommand {
	    excute(data: any): void;
	}

}
declare module 'zmg_world/src/core/bridge/cmds/GamePauseCmd' {
	import { $BaseCommand } from 'zmg_world/src/BaseCommand';
	export class GamePauseCmd extends $BaseCommand {
	    excute(data: any): {
	        action: string;
	    };
	}

}
declare module 'zmg_world/src/core/bridge/cmds/GameResumeCmd' {
	import { $BaseCommand } from 'zmg_world/src/BaseCommand';
	export class GameResumeCmd extends $BaseCommand {
	    excute(data: any): {
	        action: string;
	    };
	}

}
declare module 'zmg_world/src/core/bridge/MsgBridge' {
	/**
	 * 与子模块交流通道
	 */
	import { BaseMgr } from 'zmg_mgr';
	export class _MsgBridge extends BaseMgr {
	    private static _instance;
	    static getInstance(): _MsgBridge;
	    private _jsbMsgPool;
	    private _messageHandlers;
	    private _isInited;
	    get isValid(): boolean;
	    start(): Promise<void>;
	    constructor();
	    private onLoadHide;
	    private onLoadShow;
	    private _initBridge;
	    private _initHandler;
	    private onGameOver;
	    private _receivePostMsg;
	    private _receiveMsg;
	    jsbReceiveMsg(data: any): void;
	    private registerHandlers;
	    private registMsg;
	    private clearPool;
	    sengPageInMsgToClient(msg: string, scheme: string, callback: Function): void;
	    sendMsgToClient(msg: string, data?: any, handlerName?: string): void;
	    sendMsgToSubMudule(data: any): boolean;
	    registerHandler(name: string, command: any): void;
	    unRegisterHandler(name: string): void;
	    registerNativeHandler(name: string, command: any): void;
	    unRegisterNativeHandler(name: string): void;
	    private _setupWebViewJavascriptBridge;
	    private _connectWebViewJavascriptBridge;
	}

}
declare module 'zmg_world/src/comp/RoleTips' {
	export default class RoleTips extends cc.Component {
	    private _display;
	    private _tipsNode;
	    onLoad(): void;
	    onDisable(): void;
	    showRoleTip(): void;
	    hideTip(): void;
	    private addEvents;
	    private removeEvents;
	    talkHunger(): void;
	    talkSleep(): void;
	    talkWash(): void;
	    talkClean(): void;
	    talkNewCard(): void;
	    talkReciveCard(): void;
	    randomTalk(): void;
	    open(): boolean;
	    talk(): void;
	    private onActorClick;
	    private onSceneDestory;
	    private getNextStatu;
	    private check;
	    private onDragonDisplay;
	}

}
declare module 'zmg_world/src/scene/zmBaseScene' {
	import { DirectorEvent } from 'zmg_controller';
	export default class $zmBaseScene extends cc.Component {
	    private _sceneName;
	    audioPath: string;
	    onLoad(): void;
	    onDestroy(): void;
	    protected onSceneEnd(evt: DirectorEvent): void;
	    protected playBgclip(): void;
	}

}
declare module 'zmg_world/src/consts/GameEvent' {
	export enum $GameEvent {
	    /**
	     * 屏幕调整事件
	     */
	    VIEW_RESIZE = "viewresize",
	    MAIN_READY = "mainReady",
	    SCENE_CHANGE = "sceneChange",
	    /**
	     * 模块发生变化
	     */
	    MODULE_CHANGE = "moduleChange",
	    COUNT_DOWN_OPEN = "countDownOpen",
	    COUNT_DOWN_CLOSE = "countDownClose",
	    SCENE_BACK = "sceneBack",
	    /**
	     * 奖励特效结束
	     */
	    REWARD_OVER = "rewardOver",
	    /**
	     * 引导结束
	     */
	    GUIDE_OVER = "guideOver",
	    /**
	     * 引导奖励结束后
	     */
	    GUIDE_REWAD_OVER = "guideRewadOver",
	    SCENE_CHANGE_COMPLETE = "sceneChangeComplete",
	    /**
	     * 一秒触发一次
	     */
	    TIME_CHANGE = "timeChange",
	    /**
	     * 60s触发一次
	     */
	    TIME_CHECK = "timeCheck",
	    CAMRRA_RESIZE = "camerasize",
	    /**
	     * 垃圾桶被触动
	     */
	    BUCKET_HIT = "bucketHit",
	    RUBBISH_UI_CHANGE = "rubbishUIChange",
	    /**
	     * 学伴房间相关状态变化
	     */
	    FRUIT_CHANGE = "fruitChange",
	    SLEEP_CHANGE = "sleepChange",
	    WASH_CHANGE = "washChange",
	    ENERGY_CHANGE = "energyChange",
	    CLEAN_CHANGE = "cleanChange",
	    CLOTH_CHANGE = "clothChange",
	    GL_COMPLETE = "glComplete",
	    GL_CANCEL = "glCancel",
	    HOME_ROLE_COMPLETE = "homeRoleComplete",
	    PET_COMPLETE = "petComplete",
	    START_WALK = "startWalk",
	    POSTER_CHANGE = "posterChange"
	}

}
declare module 'zmg_world/src/cais/CaisControl' {
	import _CaisVo from 'zmg_world/src/CaisVo';
	export default class _CaisControl {
	    private static _instance;
	    static getInstance(...args: any[]): _CaisControl;
	    private _isRest;
	    set isRest(b: boolean);
	    get caisVo(): _CaisVo;
	    start(): void;
	    init(res: WebServerVo.IPlayAndRestTimeConfig): void;
	    private onTimer;
	    setCaisStatu(module: zmg.IModuleConfig): void;
	    pause(): void;
	    reset(): void;
	    private startEnd;
	    resetTimer(now?: Date, restTime?: number, playTime?: number): void;
	    check(): boolean;
	    private closeCountDown;
	    private getDefaultPlayTime;
	    private getDefaultRestTime;
	    private onTimeChange;
	    private distance;
	}

}
declare module 'zmg_world/src/core/Router' {
	export default class _Router {
	    private constructor();
	    private static _inst;
	    static getInstance(): _Router;
	    jumpTo(data: any): void;
	    jsbJumpToPractise(reqInfo: any): void;
	    jsbJumpToAIRecord(reqInfo: any): void;
	    jsbJumpToAIBroadcast(reqInfo: any): void;
	    jsbJumpToPreview(reqInfo: any): void;
	    pcJumpToPractise(reqInfo: any): void;
	    pcJumpToAIRecord(reqInfo: any): void;
	    pcJumpToAIBroadcast(reqInfo: any): void;
	    pcJumpToPreview(reqInfo: any): void;
	}

}
declare module 'zmg_world/src/consts/ELocalAppKey' {
	export enum $ELocalAppKey {
	    /**
	     * 是否引导过视频
	     */
	    IS_GUILD_VIDEO = "isGuildVideo"
	}
	/**
	 * bu平台类型
	 */
	export enum $BU_TYPE {
	    ZM = "2",
	    ALI = "4",
	    Z1V1 = "1"
	}
	/**
	 * bu平台名称
	 */
	export enum $BU_NAME {
	    ZM = "zm",
	    ALI = "ali",
	    Z1V1 = "1v1"
	}

}
declare module 'zmg_world/src/adapt/Orientation' {
	export enum OrientationType {
	    Portrait = 0,
	    Landscape = 1,
	    RightLandscape = 2
	}
	export default class $Orientation {
	    private static _isOrientationH;
	    static changeOrientation(val: OrientationType, cb: any): void;
	}

}
declare module 'zmg_world/src/adapt/Resolution' {
	export default class $Resolution {
	    static frameSize: any;
	    static designSize: any;
	    static frameAspectRatio: any;
	    static screenSize: any;
	    static designAspectRatio: any;
	    static orientation: any;
	    static isFullScreen: any;
	    static offset: any[];
	    static init(): void;
	    /**
	     * 优先根据设配名称做适配，如果不知道的根据分辨率适配。
	     */
	    static setOffset(): void;
	    static getOffset(): any[];
	    static setRoot(root: cc.Node): void;
	}

}
declare module 'zmg_world/src/adapt/BaseAdapt' {
	export default class $BaseAdapt extends cc.Component {
	    protected wids: cc.Widget[];
	    onLoad(): void;
	    adapt(...args: any[]): void;
	    private onResize;
	    protected onEnable(): void;
	    protected onDisable(): void;
	    onDestroy(): void;
	}

}
declare module 'zmg_world/src/adapt/BtnAdapt' {
	import BaseAdapt from 'zmg_world/src/BaseAdapt';
	export default class $BtnAdapt extends BaseAdapt {
	    isAddWidth: boolean;
	    isOrginSize: boolean;
	    adapt(): void;
	}

}
declare module 'zmg_world/src/adapt/BaseUI' {
	import BaseAdapt from 'zmg_world/src/BaseAdapt';
	export default class $BaseUI extends BaseAdapt {
	    target: number;
	    adaptScale: boolean;
	    dynamicDisX: number;
	    coefficient: number;
	    private _widget;
	    onLoad(): void;
	    adapt(...args: any[]): void;
	    resetScale(scale: number): void;
	    resetPos(pos: cc.Vec2): void;
	    adaptNodeWidget(...args: any[]): void;
	}

}
declare module 'zmg_world' {
	import { _UserMgr } from 'zmg_world/src/userdatas/UserMgr';
	import { _ModuleConditionInit } from 'zmg_world/src/conditions/ModuleConditionInit';
	import { _ServerModuleMgr } from 'zmg_world/src/ServerModuleMgr';
	import { _MsgBridge } from 'zmg_world/src/core/bridge/MsgBridge';
	import { $BaseCommand } from 'zmg_world/src/core/bridge/cmds/BaseCommand';
	import { _UserEventName } from 'zmg_world/src/userdatas/UserEventName';
	import { _AppBundleName } from 'zmg_world/src/AppBundleName';
	import $zmBaseScene from 'zmg_world/src/scene/zmBaseScene';
	import _CaisControl from 'zmg_world/src/cais/CaisControl';
	import _CaisVo, { $CaisLocalVoType, $CaisServerVoType } from 'zmg_world/src/cais/CaisVo';
	import { $Commands } from 'zmg_world/src/servers/commands/Commands';
	import _Router from 'zmg_world/src/core/Router';
	import { $ELocalAppKey, $BU_TYPE, $BU_NAME } from 'zmg_world/src/consts/ELocalAppKey';
	import { $GameEvent } from 'zmg_world/src/consts/GameEvent';
	import $BaseAdapt from 'zmg_world/src/adapt/BaseAdapt';
	import $BtnAdapt from 'zmg_world/src/adapt/BtnAdapt';
	import $Resolution from 'zmg_world/src/adapt/Resolution';
	import $Orientation from 'zmg_world/src/adapt/Orientation';
	import $BaseUI from 'zmg_world/src/adapt/BaseUI';
	export let UserMgr: _UserMgr;
	export let MsgBridge: _MsgBridge;
	export let CaisControl: _CaisControl;
	export let CaisVo: _CaisVo;
	export let ServerModuleMgr: _ServerModuleMgr;
	export let ModuleConditionInit: _ModuleConditionInit;
	export let AppBundleName: typeof _AppBundleName;
	export let UserEventName: typeof _UserEventName;
	export let Commands: typeof $Commands;
	export let BU_TYPE: typeof $BU_TYPE;
	export let ELocalAppKey: typeof $ELocalAppKey;
	export let BU_NAME: typeof $BU_NAME;
	export let GameEvent: typeof $GameEvent;
	export let CaisServerVoType: typeof $CaisServerVoType;
	export let CaisLocalVoType: typeof $CaisLocalVoType;
	export let Router: _Router;
	export class BaseUI extends $BaseUI {
	}
	export class BaseAdapt extends $BaseAdapt {
	}
	export class BtnAdapt extends $BtnAdapt {
	}
	export class Resolution extends $Resolution {
	}
	export class Orientation extends $Orientation {
	}
	export class BaseCommand extends $BaseCommand {
	}
	export class zmBaseScene extends $zmBaseScene {
	}

}
declare module 'zmg_world/src/interfaces' {
	 global {
	    namespace zmg {
	    }
	}
	export {};

}
declare module 'zmg_world/src/conditions/BuCDN' {
	import { BaseModuleCDN } from 'zmg_module_mgr';
	export class BuCDN extends BaseModuleCDN implements zmg.IModuleCondition {
	    check(param?: any): Promise<any>;
	    get isValid(): boolean;
	    catchHandler(param?: any): boolean;
	}

}
declare var bgMusicUrl: string;
declare var canOpen: boolean;
declare module 'zmg_world/src/core/bridge/cmds/BirthdayInfoCmd' {
	import { $BaseCommand } from 'zmg_world/src/BaseCommand';
	/** 从子模块接受的消息 */
	export class BirthdayInfoCmd extends $BaseCommand {
	    excute(data: any): void;
	}

}
declare module 'zmg_world/src/core/bridge/cmds/PageInCmd' {
	import { $BaseCommand } from 'zmg_world/src/BaseCommand';
	/** 从子模块接受的消息 */
	export class PageInCmd extends $BaseCommand {
	    excute(data: any): void;
	}

}
declare module 'zmg_world/src/core/tool/ToolSwitch' {
	/**
	 * 工具开关
	 * 根据Tool.json
	 * 显示隐藏模块
	 */
	export default class ToolSwitch extends cc.Component {
	    toolName: string;
	    isClose(): boolean;
	}

}
/**
 * 后台返回消息格式定义
 */
declare namespace WebServerVo {
    /**
     * 获取大厅基本信息
     */
    interface IHallBaseInfo {
        bgMusicUrl: string;
        canOpen: boolean;
        configId: number;
        playTimeList: number[];
        restTimeList: number[];
    }
    /**
     * 用户基本数据
     */
    interface IGetStudentBaseInfo {
        /**
         * 头像
         */
        avatar: string;
        /**
         * 生日
         */
        birthday: string;
        /**
         * 创建时间
         */
        createdAt: string;
        id: number;
        name: string;
        /**
         * 性别 0女;1男
         */
        sex: number;
        /**
         * 所在区域
         */
        stuArea: string;
        /**
         * 所在城市
         */
        stuCity: string;
        /**
         * 学生创建时间
         */
        stuCreatedAt: string;
        /**
         * 年级
         */
        stuGrade: string;
        /**
         * 年级Code
         */
        stuGradeCode: string;
        /**
         * 所在省份
         */
        stuProv: string;
        /**
         * 就读学校
         */
        stuSchool: string;
        userId: number;
    }
    /**
     * 获取到后台学伴公园配置信息
     */
    interface IStudyParkConfigInf {
        configId: number;
        playTimeList: number[];
        restTimeList: number[];
        studyParkModuleConfigs: {
            hash: string;
            manifest: string;
            moduleId: string;
            moduleName: string;
            moduleSwitch: boolean;
            onlineUrl: string;
            version: string;
        }[];
    }
    interface IModuleList {
        createTime: string;
        hash: string;
        hotUpdateUrl: string;
        id: number;
        moduleCode: string;
        moduleName: string;
        moduleSwitch: boolean;
        moduleSwitchMsg: string;
        onlineUrl: string;
        type: number;
        updateTime: string;
        version: string;
    }
    /**
     * 防沉迷返回
     * 返回的是分钟数
     */
    interface IPlayAndRestTimeConfig {
        playTime: number;
        restTime: number;
    }
    /**
     * 学伴的基础类型
     */
    interface IPartner {
        partnerId: string;
        partnerName: string;
    }
    /**
     * 学伴基础属性类型
     */
    interface IPartnerAttri {
        fruitValue: number;
        partnerCurrentEnergy: number;
        totalEnergy: number;
        isHunger: boolean;
    }
    /**
     * 学伴动作类型
     */
    interface IPartnerAction {
        key: string;
    }
    interface IDragonInf {
        type: number;
        atlasImg: string;
        atlasJson: string;
        dragJson: string;
    }
    interface IDressItem {
        isNewProduct: number;
        directoryId: number;
        benefitDays: number;
        /**
         * 预览图
         */
        cover: string;
        createTime: number;
        pictureList: string[];
        productId: number;
        productName: string;
        remark: number;
        productLocaCode: string;
        resourceList: IDragonInf[];
        top: string;
    }
    interface IDress {
        details: IDressItem[];
    }
    /**
     * 获取学伴信息的返回类型
     */
    interface IGetPartnerInfo {
        cleanRoomInfo: ICleanRoomInfo[];
        fruitValue: number;
        greetCardTip: IGreetCardTip;
        hasFeed: boolean;
        isAdoption: boolean;
        isHunger: boolean;
        isToSleep: boolean;
        isToWash: boolean;
        partnerCurrentEnergy: number;
        partnerId: string;
        partnerName: string;
        rubbishTotal: number;
        sleepValue: number;
        totalEnergy: number;
        voicePlayIntervalSeconds: number;
        washValue: number;
        isSign: boolean;
        hungerValue: number;
    }
    /**
     * 打扫房间dto返回类型
     */
    interface ICleanRoomInfo {
        cleanValue: number;
        index: number;
        isToClean: boolean;
    }
    /**
     * 获取学伴列表的返回类型
     */
    interface IGetPartnerList {
        list: IPartner[];
    }
    interface IGreetCardTip {
        cardNum: number;
        status: number;
    }
    /**
     * 领取学伴的返回类型
     */
    interface IAddPartner {
        isSuccess: boolean;
        partnerId: string;
        fruitValue: number;
        partnerCurrentEnergy: number;
        totalEnergy: number;
        hungerValue: number;
        isHunger: boolean;
        isToWash: boolean;
    }
    /**
     * 是否签到的返回类型
     */
    interface IGetSign {
        sign: boolean;
    }
    /**
     * 增加魔力果的返回类型
     */
    interface IAddFruit {
        total: number;
        detail: {
            sign: number;
            homework: number;
            liked: number;
            attendance: number;
        };
    }
    /**
     * 喂食的返回类型
     */
    interface ISubtractFruit {
        haveBeenFed: boolean;
        isSuccess: boolean;
        partnerCurrentEnergy: number;
        totalEnergy: number;
        fruitValue: number;
        isHunger: boolean;
    }
    /**
     * 魔力果获取、消费记录的单元类型
     */
    interface IFuitRecordItem {
        desc: string;
        fruitNum: number;
        createTime: string;
    }
    /**
     * 魔力果消耗，奖励记录返回类型
     */
    interface IFruitRecordList {
        surplus: number;
        totalRecord: number;
        list: IFuitRecordItem[];
    }
    /**
     * 获取饥饿值接口的返回
     */
    interface IGetHunger {
        isHunger: boolean;
        partnerCurrentEnergy: number;
        totalEnergy: number;
    }
    /**
     * 魔力果获取攻略的单个条目
     */
    interface IGetFruitWayItem {
        title: string;
        text: string;
    }
    /**
     * 魔力果获取攻略列表的返回类型
     */
    interface IGetFruitWays {
    }
    interface IGetMusicSwitch {
        switchs: boolean;
    }
    /**
     * 喂食返回
     */
    interface ISubtractFruit {
        fruitValue: number;
        haveBeenFed: boolean;
        hungerValue: number;
        isHunger: boolean;
        isSuccess: boolean;
        partnerCurrentEnergy: number;
        totalEnergy: number;
        isToSleep: boolean;
        feedResultCode: string;
    }
    interface ISleep {
        data: number;
    }
    interface IBath {
        data: number;
    }
    interface UserAbilityMedalOutVo {
        animation1Url: string;
        animation2Url: string;
        animation3Url: string;
    }
    interface UserAchievementUpgradeOutVo {
        animation1Url: string;
        animation2Url: string;
        animation3Url: string;
    }
    interface ICarryMedal {
        userAbilityMedalInfo: UserAbilityMedalOutVo;
        userCarryMedalInfo: UserAchievementUpgradeOutVo;
    }
    interface IWindowGet {
        bu: string;
        id: number;
        buttonImg: string;
        backgroundImg: string;
        buttonAnimation: IDragItem;
        /**
         * 失效时机 101 触发N次后消失 102/202 关闭N次后消失 103 点击N次后消失 201 领奖后消
         */
        invalidType: number;
        targetModuleCode: string;
        titleAnimation: IDragItem;
        titleImg: string;
        triggerType: number;
        type: number;
        voiceUrl: string;
        isOpened: boolean;
        grayState: number;
    }
    interface IWindowReward {
        awardImg: string;
        awardNum: number;
        awardType: number;
    }
    interface IDragItem {
        dragJson: string;
        atlasImg: string;
        atlasJson: string;
    }
    /**
     * 签到
     */
    interface ISignListItem {
        /**奖励类型 1 普通 2 中等 3 高级*/
        awardLevel: number;
        /**奖励数量 已签到的天数该字段为空*/
        awardNum: number;
        /**奖励类型 1 能量果 2 装扮 3 皮肤 已签到的天数该字段为空*/
        awardType: number;
        day: number;
        signIn: boolean;
        today: boolean;
    }
    /**
     * 签到
     */
    interface ISignIn {
        awardNum: number;
        awardType: number;
    }
}
