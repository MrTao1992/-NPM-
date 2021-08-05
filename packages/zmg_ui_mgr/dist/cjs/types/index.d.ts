declare module 'zmg_ui_mgr/src/sysui/alert/AlertAsset' {
	export class $AlertAsset implements zmg.IAlertAsset {
	    text: string;
	    target: any;
	    sureFun: Function;
	    canelFun: Function;
	    style: zmg.IResAsset;
	    title: zmg.IResAsset;
	    sureText: string;
	    canelText: string;
	    get isValid(): boolean;
	    constructor(text: string, sureFun?: Function, canelFun?: Function, sure?: string, canel?: string, target?: any);
	    clear(): void;
	    sure(): void;
	    canel(): void;
	}

}
declare module 'zmg_ui_mgr/src/sysui/alert/Alert' {
	export class $Alert extends cc.EventTarget {
	    label: cc.Label;
	    sureBtn: cc.Button;
	    canelBtn: cc.Button;
	    sureLabel: cc.Label;
	    canelLabel: cc.Label;
	    popup_img: cc.Node;
	    title: cc.Sprite;
	    node: cc.Node;
	    res: zmg.IResAsset;
	    titleRes: zmg.IResAsset;
	    asset: zmg.IAlertAsset;
	    private _defaultTitleFrame;
	    private _mask;
	    private _content;
	    constructor(res: zmg.IResAsset);
	    init(node: cc.Node): void;
	    get isValid(): boolean;
	    /**
	     *
	     * @param style 符合要求样式的node,Prefab
	     */
	    setStyle(res: zmg.IResAsset): void;
	    setTitle(res: zmg.IResAsset, isDefault?: boolean): void;
	    setTitleActive(bool: boolean): void;
	    reset(): void;
	    destroy(): void;
	    show(asset: zmg.IAlertAsset): void;
	    close(now?: boolean, isClean?: boolean): void;
	    onEnable(): void;
	    onDisable(): void;
	    addEvents(): void;
	    removeEvents(): void;
	    private onMouseEnter;
	    private onMouseLevel;
	    private onSure;
	    private onCanel;
	    private setContentSize;
	}

}
declare module 'zmg_ui_mgr/src/sysui/alert/AlertMgr' {
	import { $Alert } from 'zmg_ui_mgr/src/Alert';
	export class _AlertMgr extends cc.EventTarget implements zmg.IAlertMgr {
	    private static _instance;
	    static getInstance(): _AlertMgr;
	    node: cc.Node;
	    private _alert;
	    private _defalut;
	    private _assets;
	    get res(): zmg.IResAsset;
	    init(url: string): void;
	    get defaultAlert(): $Alert;
	    private onFontReady;
	    private onDefaultComplete;
	    private onAlertClose;
	    /**
	     *
	     * @param style 符合要求样式的node,Prefab
	     */
	    protected getAlert(res: zmg.IResAsset): $Alert;
	    /**
	     * 销毁
	     */
	    destroy(): void;
	    /**
	     * 是否初始化完毕
	     */
	    get isValid(): boolean;
	    /**
	     *
	     * @param asset 弹框显示
	     */
	    open(asset: string | zmg.IAlertAsset): void;
	    /**
	     * 关闭
	     */
	    close(now?: boolean): void;
	    private openNext;
	    private onAlertComplete;
	}

}
declare module 'zmg_ui_mgr/src/events/UIEvent' {
	export class $UIEvent extends cc.Event {
	    static COMPLETE: string;
	    static TOAST_HIDE: string;
	    static TOAST_SHOW: string;
	    static VIDEO_HIDE: string;
	    static VIDEO_SHOW: string;
	    static LOAD_HIDE: string;
	    static LOAD_SHOW: string;
	    param: any;
	    target: any;
	    constructor(type: string, param?: any);
	}

}
declare module 'zmg_ui_mgr/src/sysui/BaseUI' {
	export default class $BaseUI extends cc.EventTarget implements zmg.IBaseUI {
	    protected _node: cc.Node;
	    protected _target: cc.Component;
	    protected _nowStyle: zmg.IResAsset;
	    protected _defaultStyle: zmg.IResAsset;
	    protected _res: zmg.IResAsset;
	    protected _isActive: boolean;
	    protected _parent: cc.Node;
	    set node(n: cc.Node);
	    get node(): cc.Node;
	    get res(): zmg.IResAsset;
	    constructor(url?: string);
	    init(url: string): void;
	    /**
	     * 显示
	     */
	    show(): void;
	    /**
	     * 隐藏
	     */
	    hide(): void;
	    /**
	     *
	     * @param style 符合要求样式的node,Prefab
	     */
	    setStyle(res: string | zmg.IResAsset, resUrl?: string): void;
	    /**
	     * 还原默认样式
	     */
	    resetStyle(): void;
	    /**
	     * 销毁
	     */
	    destroy(): void;
	    /**
	     * 是否初始化完毕
	     */
	    get isValid(): boolean;
	    load(bunName: string, url: string): void;
	    /**
	    * 资源下载完毕
	    */
	    protected onLoadComplete(pre: cc.Prefab, listener?: zmg.IResListener): void;
	    protected createNode(pre: cc.Prefab): void;
	    /**
	     * 初始化
	     */
	    protected onLoad(): void;
	    protected onComplete(): void;
	    protected opacityHide(time: number): void;
	    protected opacityShow(time: number): void;
	    protected scaleHide(time: number, node?: cc.Node, callback?: Function, target?: any): void;
	    protected scaleShow(time: number, node?: cc.Node): void;
	    scheduleOnce(callback: Function, delay?: number): void;
	    unscheduleAllCallbacks(): void;
	    protected addEvents(): void;
	    protected removeEvents(): void;
	}

}
declare module 'zmg_ui_mgr/src/sysui/Bg' {
	import $BaseUI from 'zmg_ui_mgr/src/BaseUI';
	export class $Bg extends $BaseUI implements zmg.IBg {
	    constructor(url: string, parent: cc.Node);
	    protected opacityHide(time: number): void;
	    protected opacityShow(time: number): void;
	    show(): void;
	    hide(): void;
	}

}
declare module 'zmg_ui_mgr/src/events/UIMouseEvent' {
	export class $UIMouseEvent extends cc.Event {
	    /**
	     *
	     */
	    static MOUSE_UP: string;
	    static MOUSE_DOWN: string;
	    static MOUSE_MOVE: string;
	    static TOUCH_MOVE: string;
	    static create(type: string, worldPos: cc.Vec2): $UIMouseEvent;
	    worldPos: cc.Vec2;
	    used: boolean;
	    getWorldPos(): cc.Vec2;
	    getLocation(node?: cc.Node): cc.Vec2;
	    getIsHitNode(node: cc.Node): boolean;
	    getCanvasPos(): cc.Vec2;
	    constructor(type: string, worldPos: cc.Vec2);
	}

}
declare module 'zmg_ui_mgr/src/sysui/UIMask' {
	import $BaseUI from 'zmg_ui_mgr/src/BaseUI';
	export class $UIMask extends $BaseUI implements zmg.IMask {
	    private _mouseV2;
	    private _opacity;
	    private _keyList;
	    get node(): cc.Node;
	    constructor(url: string);
	    destroy(): void;
	    private onSceneStart;
	    show(key?: string, opacity?: number): void;
	    hide(key?: string): void;
	    /**
	    * 透明度
	    */
	    setOpacity(value: number): void;
	    protected onComplete(): void;
	    protected addMouseEvents(): void;
	    protected removeMouseEvents(): void;
	    getScreenToWorldPoint(screenPosition: cc.Vec2 | cc.Vec3): cc.Vec2;
	    private onTouchMove;
	    private onMouseEnter;
	    private onMouseMove;
	    private onTouchEnd;
	    private onTouchStart;
	}

}
declare module 'zmg_ui_mgr/src/sysui/ToastMgr' {
	import $BaseUI from 'zmg_ui_mgr/src/BaseUI';
	export class _ToastMgr extends $BaseUI implements zmg.IToastMgr {
	    private static _instance;
	    static getInstance(): _ToastMgr;
	    static DEFAULT_TIME: number;
	    private _toasts;
	    private _prefab;
	    init(url: string): void;
	    get isValid(): boolean;
	    protected createNode(pre: cc.Prefab): void;
	    private getToast;
	    onLoad(): void;
	    open(msg: string, time?: number): void;
	    close(now?: boolean): void;
	}

}
declare module 'zmg_ui_mgr/src/sysui/EUIZindex' {
	export enum EUIZindex {
	    BG = 2,
	    MASK = 3,
	    uiLayer = 4,
	    Loading = 5,
	    BACKBTN = 100,
	    ALERT = 101,
	    TOAST = 102,
	    OTHERUI = 103,
	    TRANSITIONS = 104
	}

}
declare module 'zmg_ui_mgr/src/sysui/UILoading' {
	import { DirectorEvent } from 'zmg_controller';
	import $BaseUI from 'zmg_ui_mgr/src/BaseUI';
	export class $UILoading extends $BaseUI implements zmg.ILoading {
	    private _proNode;
	    private _effectNode;
	    get res(): zmg.IResAsset;
	    constructor(url: string, parent: cc.Node);
	    showProgress(): void;
	    hideProgress(): void;
	    setProgress(value: number): void;
	    protected onLoad(): void;
	    private onFontReady;
	    show(): void;
	    hide(): void;
	    protected onDirectProgress(evt: DirectorEvent): void;
	}

}
declare module 'zmg_ui_mgr/src/sysui/UITransitions' {
	import $BaseUI from 'zmg_ui_mgr/src/BaseUI';
	export class $UITransitions extends $BaseUI implements zmg.ITransitions {
	    private _transitons;
	    constructor(url: string, parent: cc.Node);
	    show(): void;
	    hide(): void;
	    runScene(bunName: string, sceneUrl: string, onSceneLoaded: Function, onTransitionFinished: Function, color: cc.Color, movieClip: cc.Node): void;
	    protected onLoad(): void;
	}

}
declare module 'zmg_ui_mgr/src/events/UIBackEvent' {
	export class $UIBackEvent extends cc.Event {
	    static BACK: string;
	    constructor();
	}

}
declare module 'zmg_ui_mgr/src/sysui/UIBackBtn' {
	import $BaseUI from 'zmg_ui_mgr/src/sysui/BaseUI';
	export class $UIBackBtn extends $BaseUI implements zmg.IBackBtn {
	    constructor(url: string);
	    show(): void;
	    hide(): void;
	    addEvents(): void;
	    removeEvents(): void;
	    private onSceneStart;
	    private onTouchEnd;
	}

}
declare module 'zmg_ui_mgr/src/sysui/UIMouse' {
	export class $UIMouse extends cc.EventTarget implements zmg.IMouse {
	    static CHECK_TIME: number;
	    private _normal;
	    private _link;
	    private _unavailable;
	    private _effect;
	    private _sound;
	    private _dNormal;
	    private _dLink;
	    private _dUnavailable;
	    private _dEffect;
	    private _active;
	    private _mouseV2;
	    private _isMouseDown;
	    private _soundClip;
	    private _effectDragon;
	    get mouseV2(): cc.Vec2;
	    get isMouseDown(): boolean;
	    get active(): boolean;
	    set active(s: boolean);
	    constructor(normal: string, link: string, unavailable: string, effect: zmg.IResAsset, sound: zmg.IResAsset);
	    /**
	    * 初始化
	    */
	    start(): void;
	    /**
	     *
	     * @param link 点击状态
	     * @param normal 常规移动状态
	     * @param unavailable 点击摁下状态
	     */
	    setStyle(normal: string, link: string, unavailable: string): void;
	    setDefaultStyle(normal: string, link: string, unavailable: string): void;
	    setNormal(): void;
	    setLink(): void;
	    setUnavailable(): void;
	    setEffect(effect: zmg.IResAsset): void;
	    setSound(sound: zmg.IResAsset): void;
	    /**
	     * 还原默认样式
	     */
	    resetStyle(): void;
	    /**
	    * 是否初始化完毕
	    */
	    get isValid(): boolean;
	    /**
	    * 销毁
	    */
	    destroy(): void;
	    private onCanvasDestory;
	    /**
	    * 场景准备完毕
	    * 监听碰撞
	    */
	    private onCanvasEnd;
	    setEffectParent(parent: cc.Node): void;
	    setParent(parent: cc.Node): void;
	    hideEffectDragon(): void;
	    /**
	     * 手性切换检测
	     * 检查鼠标显示手性
	     */
	    private onTimeCheck;
	    private setMouseStyle;
	    private onMouseMove;
	    private onTouchMove;
	    private onMouseLevel;
	    private onMouseEnter;
	    private onTouchEnd;
	    private _onTouchEnd;
	    private onTouchStart;
	    getScreenToWorldPoint(screenPosition: cc.Vec2 | cc.Vec3): cc.Vec2;
	    private gDispatchEvent;
	}

}
declare module 'zmg_ui_mgr/src/sysui/UILayer/RewardLayer' {
	/**
	 *
	 */
	import { $UIMask } from 'zmg_ui_mgr/src';
	export class $RewardLayer extends cc.Component {
	    static REWARD_OVER: string;
	    static REWARD_START: string;
	    reward: dragonBones.ArmatureDisplay;
	    noreward: dragonBones.ArmatureDisplay;
	    label: cc.Label;
	    private _count;
	    private _parent;
	    private _mask;
	    setParent(parent: cc.Node): void;
	    setMask(mask: $UIMask): void;
	    onLoad(): void;
	    onEnable(): void;
	    onDisable(): void;
	    private rewardComplete;
	    show(num: number): void;
	    hide(): void;
	}

}
declare module 'zmg_ui_mgr/src/sysui/UILayer' {
	import $BaseUI from 'zmg_ui_mgr/src/BaseUI';
	import { $UIMask } from 'zmg_ui_mgr/src/UIMask';
	export class $UILayer extends $BaseUI implements zmg.IBg {
	    /**
	     * 窗口界面
	     */
	    private _windowsLayer;
	    /**
	    * 视频界面
	    */
	    private _videoLayer;
	    /**
	     * 交互层
	     */
	    private _activityLayer;
	    /**
	     * 奖励弹窗
	     */
	    private _rewardLayer;
	    private _mask;
	    private _isVideoPrefabLoading;
	    private _isVideoUrl;
	    setMask(mask: $UIMask): void;
	    constructor();
	    get node(): cc.Node;
	    get activityLayer(): cc.Node;
	    get isValid(): boolean;
	    getComponent<T extends cc.Component>(type: {
	        prototype: T;
	    }): T;
	    getContent(): cc.Node;
	    reward(num: number): void;
	    closeVideo(): void;
	    showVideo(url: string, isCtrl?: boolean): void;
	    showNode(windows: cc.Node | cc.Prefab, opacity?: number): cc.Node;
	    init(url: string): void;
	    addEvents(): void;
	    removeEvents(): void;
	    private initReward;
	    private onRewardStart;
	    private onRewardOver;
	    private onSceneDestory;
	    private onSceneEnd;
	    close(isTween?: boolean): void;
	    clear(): void;
	}

}
declare module 'zmg_ui_mgr/src/UIMgr' {
	import { BaseMgr } from 'zmg_mgr';
	import { $Bg } from 'zmg_ui_mgr/src/sysui/Bg';
	import { $UIMask } from 'zmg_ui_mgr/src/sysui/UIMask';
	import { $UILoading } from 'zmg_ui_mgr/src/sysui/UILoading';
	import { $UITransitions } from 'zmg_ui_mgr/src/sysui/UITransitions';
	import { $UIBackBtn } from 'zmg_ui_mgr/src/sysui/UIBackBtn';
	import { $UIMouse } from 'zmg_ui_mgr/src/sysui/UIMouse';
	import { $UILayer } from 'zmg_ui_mgr/src/sysui/UILayer';
	export class _UIMgr extends BaseMgr implements zmg.IUIMgr {
	    private static _instance;
	    static getInstance(): _UIMgr;
	    constructor();
	    /**
	     * 显示一些窗口的节点
	     */
	    uiLayer: $UILayer;
	    bg: $Bg;
	    mask: $UIMask;
	    /**
	     * 返回按钮
	     */
	    backBtn: $UIBackBtn;
	    /**
	     * loading界面
	     */
	    loading: $UILoading;
	    /**
	     * toast管理器
	     */
	    toast: zmg.IToastMgr;
	    /**
	     * 弹窗管理器
	     */
	    alert: zmg.IAlertMgr;
	    /**
	     * 切场景特效组件
	     */
	    transitions: $UITransitions;
	    /**
	     * 字体管理器
	     */
	    fontMgr: zmg.IFontMgr;
	    /**
	     * 鼠标组件
	     */
	    mouse: $UIMouse;
	    /**
	     * 其他弹出层
	     */
	    other: cc.Node;
	    private _node;
	    private _isValid;
	    get node(): cc.Node;
	    start(): Promise<void>;
	    destroy(): void;
	    closeAll(): void;
	    /**
	     * 未准备
	     * 已被销毁
	     * 则无法使用
	     */
	    get isValid(): boolean;
	    showLoading(isProgress?: boolean, pro?: number): void;
	    hideLoading(): void;
	    private check;
	    updateAlignment(node: cc.Node): void;
	    private sceneChange;
	    private load;
	    private onAlertComplete;
	    private onLoadingComplete;
	    private onUILayer;
	    private onBgComplete;
	    private onMaskComplete;
	    private onToastComplete;
	    private onTransitionsComplete;
	    private onBackComplete;
	    private addEvents;
	    private removeEvents;
	    private onVideoHide;
	    private onVideoShow;
	    private onCanvasResize;
	    private onSceneChangeDestory;
	    private onSceneChangeEnd;
	}

}
declare module 'zmg_ui_mgr/src/zmgui/role/RoleEvent' {
	/// <reference types="zmg_event_mgr/dist/cjs/types" />
	export class $RoleEvent extends cc.Event {
	    static ACTION_CHANGE: import("zmg_event_mgr/src/EventName").$EventName;
	    param: any;
	    constructor(type: string, param: any);
	}

}
declare module 'zmg_ui_mgr/src/zmgui/role/ERoleAction' {
	export enum $ERoleAction {
	    WALK_RIGHT = "walkright",
	    WALK_LEFT = "walkleft",
	    STAND = "stand",
	    TALK = "talk",
	    DIANZAN = "dianzan"
	}
	export enum $EPetAction {
	    UNKNOW = "unknow",
	    STAND = "anim_idle_2",
	    WALK = "anim_run_1"
	}

}
declare module 'zmg_ui_mgr/src/zmgui/role/RoleClothType' {
	export enum RoleClothType {
	    /**全部 */
	    ALL = "ALL",
	    /**套装 */
	    SET = "SET",
	    /** 头饰 */
	    HEADWEAR = "HEADWEAR",
	    /** 背饰 */
	    BACKWEAR = "BACKWEAR",
	    /** 鞋子 */
	    SHOES = "SHOES",
	    /** 手持道具 */
	    HANDHELD = "HANDHELD"
	}

}
declare module 'zmg_ui_mgr/src/zmgui/role/ERoleLevel' {
	import { RoleClothType } from 'zmg_ui_mgr/src/RoleClothType';
	export enum ERoleLevel {
	    HEAD = "head",
	    BODY = "body",
	    LEG_L = "leg_l",
	    LEG_R = "leg_r",
	    TUI_L = "tui_l",
	    TUI_R = "tui_r",
	    HAT = "hat",
	    HAT_1 = "hat_1",
	    EYE = "eye",
	    CROTCH = "crotch",
	    NECK = "neck",
	    EAR = "ear",
	    EAR_R = "ear_r",
	    EAR_L = "ear_l",
	    HAND_R = "hand_r",
	    BEARD = "beard",
	    HAND_L = "hand_l",
	    FOOT_L = "foot_l",
	    FOOT_R = "foot_r",
	    HOLD_R = "hold_r",
	    HOLD_L = "hold_l",
	    WING = "wing",
	    WING_1 = "wing_1",
	    WING_2 = "wing_2",
	    MOUTH = "mouth",
	    EYEBROW = "eyebrow",
	    HAIR = "hair",
	    JACKET = "jacket",
	    TAIL = "tail"
	}
	export class RoleDressLevel {
	    static ALL: ERoleLevel[];
	    /**
	     * 头饰
	     */
	    static HAT: ERoleLevel[];
	    /**
	     * 衣服
	     */
	    static CLOTH: ERoleLevel[];
	    /**
	     * 鞋子
	     */
	    static SHOT: ERoleLevel[];
	    /**
	     * 手持
	     */
	    static HOLD: ERoleLevel[];
	    /**
	     * 背饰
	     */
	    static WING: ERoleLevel[];
	    static getLevels(type: RoleClothType): ERoleLevel[];
	}

}
declare module 'zmg_ui_mgr/src/zmgui/role/RoleCloth' {
	import { RoleClothType } from 'zmg_ui_mgr/src/RoleClothType';
	export class RoleCloth extends cc.EventTarget {
	    type: RoleClothType;
	    protected _displays: Record<string, dragonBones.ArmatureDisplay>;
	    protected _target: dragonBones.ArmatureDisplay;
	    protected _originals: string[];
	    protected _config: zmg.IRoleDressItem;
	    protected loadcount: number;
	    set target(display: dragonBones.ArmatureDisplay);
	    set config(item: zmg.IRoleDressItem);
	    get isLoaded(): boolean;
	    /**
	     * 销毁旧的显示对象
	     * 如果有配置则等待加载
	     * 如果没有则还原原来的装扮
	     */
	    load(): void;
	    private destorySkin;
	    private unLoad;
	    private onDragonStandComplete;
	    private onDragonWalkComplete;
	    constructor(type: string);
	    get isValid(): boolean;
	    destroy(): void;
	    resetSlotDisplay(): void;
	    replaceSlotDisplay(skin?: dragonBones.ArmatureDisplay): void;
	}

}
declare module 'zmg_ui_mgr/src/zmgui/role/Pet' {
	import { DragonResAsset } from 'zmg_res_mgr';
	import { $EPetAction } from 'zmg_ui_mgr/src/ERoleAction';
	export class Pet extends cc.Component implements zmg.IPet {
	    protected _action: $EPetAction;
	    private _shadow;
	    private _display;
	    get display(): dragonBones.ArmatureDisplay;
	    getAction(): $EPetAction;
	    setScale(value: number): void;
	    setParent(parent: cc.Node): void;
	    setPostion(newPosOrX: number | cc.Vec2 | cc.Vec3, y?: number): void;
	    onLoad(): void;
	    private onSceneDestory;
	    load(path: DragonResAsset, shadowBunName: string, shadowPath: string): void;
	    /**
	     * 销毁
	     */
	    onDestroy(): void;
	    /**
	    * 执行动作
	    * @param action
	    */
	    doAction(action: $EPetAction): void;
	    /**
	    * 站立
	    */
	    stand(): void;
	    /**
	     * 向右行走
	     */
	    walkRight(): void;
	    /**
	     * 向左行走
	     */
	    walkLeft(): void;
	}

}
declare module 'zmg_ui_mgr/src/zmgui/role/Role' {
	import { RoleCloth } from 'zmg_ui_mgr/src/RoleCloth';
	import { $ERoleAction } from 'zmg_ui_mgr/src/ERoleAction';
	import { Pet } from 'zmg_ui_mgr/src/Pet';
	import { DragonResAsset } from 'zmg_res_mgr';
	/**
	 *
	 */
	export class $Role extends cc.Component implements zmg.IRole, cc.EventTarget {
	    protected _config: zmg.IRoleConfig;
	    protected _action: $ERoleAction;
	    protected _pet: Pet;
	    /**
	     * 当前语音
	     */
	    protected _currentAudioClip: cc.AudioClip;
	    /**
	     * 龙骨动画
	     */
	    protected _display: dragonBones.ArmatureDisplay;
	    /**
	     * 身上的服装配置
	     */
	    protected _cloths: RoleCloth[];
	    private _isMouseDown;
	    protected _shadow: cc.Sprite;
	    protected _halo: dragonBones.ArmatureDisplay;
	    protected _dressList: zmg.IRoleDressItem[];
	    /**
	     * 阴影
	     */
	    get pet(): zmg.IPet;
	    get shadow(): cc.Sprite;
	    get halo(): dragonBones.ArmatureDisplay;
	    getAction(): $ERoleAction;
	    get config(): zmg.IRoleConfig;
	    get roleName(): string;
	    get display(): dragonBones.ArmatureDisplay;
	    get dressList(): zmg.IRoleDressItem[];
	    setPostion(newPosOrX: number | cc.Vec2 | cc.Vec3, y?: number): void;
	    setParent(parent: cc.Node): void;
	    private loadDragon;
	    reset(): Promise<void>;
	    constructor();
	    onLoad(): void;
	    initConfig(config: zmg.IRoleConfig): Promise<void>;
	    setHalo(path: DragonResAsset): void;
	    hitTest(pos: cc.Vec2): boolean;
	    takeOff(cloth: zmg.IRoleDressItem): void;
	    takeOn(cloth: zmg.IRoleDressItem): void;
	    dress(cloths: zmg.IRoleDressItem[]): void;
	    doAction(action: $ERoleAction): void;
	    stopTalk(): void;
	    talk(clip: cc.AudioClip): void;
	    stand(): void;
	    walkRight(): void;
	    walkLeft(): void;
	    /**
	     * 场景切换的时候进行销毁
	     */
	    onDestroy(): void;
	    protected initDisplay(): void;
	    protected naked(): void;
	    protected onClothComplete(cloth?: RoleCloth): void;
	    protected updateAction(action: string): void;
	    protected updateDress(cloth?: RoleCloth): void;
	    protected addEvents(): void;
	    protected removeEvents(): void;
	    private onMouseUp;
	    private onMouseDown;
	    protected onSceneDestory(): void;
	    protected getClothByType(type: string): RoleCloth;
	    hasEventListener(type: string): boolean;
	    on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean, priority?: number): T;
	    off(type: string, callback?: Function, target?: any): void;
	    targetOff(target: any): void;
	    once(type: string, callback: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void, target?: any): void;
	    dispatchEvent(event: cc.Event): void;
	    emit(key: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): void;
	    removeAll(): void;
	}

}
declare module 'zmg_ui_mgr/src/zmgui/role/Actor' {
	import { $ERoleAction } from 'zmg_ui_mgr/src/ERoleAction';
	import { $Role } from 'zmg_ui_mgr/src/Role';
	import { ResAsset } from 'zmg_res_mgr';
	export class _Actor extends $Role implements zmg.IActor {
	    private static _instance;
	    private _talkAudioClips;
	    static getInstance(): zmg.IActor;
	    static setInstance(ins: zmg.IActor): void;
	    get pet(): zmg.IPet;
	    get config(): zmg.IRoleConfig;
	    get roleName(): string;
	    get display(): dragonBones.ArmatureDisplay;
	    get shadow(): cc.Sprite;
	    get halo(): dragonBones.ArmatureDisplay;
	    hitTest(pos: cc.Vec2): boolean;
	    getAction(): $ERoleAction;
	    get dressList(): zmg.IRoleDressItem[];
	    setPostion(newPosOrX: number | cc.Vec2 | cc.Vec3, y?: number): void;
	    setParent(parent: cc.Node): void;
	    takeOff(cloth: zmg.IRoleDressItem): void;
	    takeOn(cloth: zmg.IRoleDressItem): void;
	    constructor();
	    initConfig(config: zmg.IRoleConfig): Promise<void>;
	    dress(cloths: zmg.IRoleDressItem[]): void;
	    doAction(action: $ERoleAction): void;
	    protected updateAction(action: $ERoleAction): void;
	    talk(clip: cc.AudioClip): void;
	    talkByRes(res: ResAsset): void;
	    stand(): void;
	    walkRight(): void;
	    walkLeft(): void;
	    talkRandom(): void;
	    /**
	     * 场景切换的时候进行销毁
	     */
	    onDestroy(): void;
	    protected onTalkClipComplete(clip: cc.AudioClip): void;
	    protected addEvents(): void;
	    protected removeEvents(): void;
	    protected onSceneDestory(): void;
	    protected onSceneReady(): void;
	    initMedal(): void;
	    private onMedalHandler;
	    hasEventListener(type: string): boolean;
	    on<T extends Function>(type: string, callback: T, target: any, useCapture?: boolean, priority?: number): T;
	    off(type: string, callback: Function, target: any): void;
	    targetOff(target: any): void;
	    once(type: string, callback: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void, target: any): void;
	    dispatchEvent(event: cc.Event): void;
	    emit(key: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): void;
	}

}
declare module 'zmg_ui_mgr/src/sysui/FontMgr' {
	import { BaseMgr } from 'zmg_mgr';
	export class _FontMgr extends BaseMgr implements zmg.IFontMgr {
	    defaultFontName: string;
	    font65Name: string;
	    font85Name: string;
	    font65URL: string;
	    font85URL: string;
	    private static _instance;
	    static getInstance(): _FontMgr;
	    private _font65;
	    private _font85;
	    CCInstantiate: (pre: any) => cc.Node;
	    start(): Promise<void>;
	    private load;
	    private onFontHandler;
	    destroy(): void;
	    get isValid(): boolean;
	    updateFont(node: cc.Node): void;
	    /**
	     * 替换系统生成对象函数
	     */
	    private updateCCInstantiate;
	    private resetCCInstantiate;
	    private addEvents;
	    private removeEvents;
	    private onCoreReady;
	    onSceneChange(): void;
	}

}
declare module 'zmg_ui_mgr/src/zmgui/cache/AudioRes' {
	import { BaseMgr } from 'zmg_mgr';
	/**
	 * 声音资源存储获取
	 */
	export class _AudioRes extends BaseMgr {
	    private static _instance;
	    static getInstance(): _AudioRes;
	    private _clickClip;
	    start(): Promise<void>;
	    destroy(): void;
	    get isValid(): boolean;
	    get click(): cc.AudioClip;
	}

}
declare module 'zmg_ui_mgr/src/zmgui/hit/HitComp' {
	export default class $HitComp extends cc.Component {
	    protected _col: cc.Collider;
	    onLoad(): void;
	    /**
	    * 传入为世界坐标
	    * @param pos
	    * @param ty
	    */
	    hitTest(pos: cc.Vec2 | number, ty?: number): boolean;
	}

}
declare module 'zmg_ui_mgr/src/zmgui/btn/SimpleBtn' {
	import { $UIMouseEvent } from 'zmg_ui_mgr/src';
	import $HitComp from 'zmg_ui_mgr/src/zmgui/hit/HitComp';
	export default class $SimpleBtn extends $HitComp {
	    zoom: number;
	    isOriginal: boolean;
	    set interactable(bool: boolean);
	    get interactable(): boolean;
	    events: cc.Component.EventHandler[];
	    clickAudio: cc.AudioClip;
	    priority: number;
	    target: cc.Node;
	    protected _interactable: boolean;
	    protected _scaleX: number;
	    protected _scaleY: number;
	    set scale(s: number);
	    _isclicking: boolean;
	    private _isMouseDown;
	    private _clickDis;
	    active(): void;
	    disable(): void;
	    onLoad(): void;
	    addListener(): void;
	    removeListener(): void;
	    onEnable(): void;
	    onDisable(): void;
	    onDestroy(): void;
	    protected onMouseEnd(evt: $UIMouseEvent): void;
	    protected onMouseStart(evt: $UIMouseEvent): void;
	    protected onMouseMove(pos: cc.Vec2): void;
	    protected onTouchStart(): void;
	    protected onTouchEnd(evt?: cc.Event.EventTouch): void;
	    protected onHandler(evt?: cc.Event.EventTouch): void;
	    protected onMouseLevel(): void;
	    protected onTouchCancel(): void;
	}

}
declare module 'zmg_ui_mgr/src/zmgui/sprite/LoadingSprite' {
	export default class $LoadingSprite extends cc.Component {
	    target: cc.Node;
	    refresh: cc.Node;
	    private _isLoading;
	    onLoad(): void;
	    isLoading(): boolean;
	    loading(): void;
	    loaded(): void;
	}

}
declare module 'zmg_ui_mgr/src/zmgui/sprite/ShowHideSprite' {
	export enum EShowHideType {
	    alpha = 0,
	    scale = 1
	}
	export default class $ShowHideSprite extends cc.Component {
	    target: cc.Node;
	    type: EShowHideType;
	    time: number;
	    private _isShow;
	    onLoad(): void;
	    isShow(): boolean;
	    show(effect?: boolean): void;
	    hide(effect?: boolean): void;
	}

}
declare module 'zmg_ui_mgr/src/zmgui/sprite/StateSprite' {
	/**
	 *
	 */
	export default class $StateSprite extends cc.Component {
	    frames: cc.SpriteFrame[];
	    frameIndex: number;
	    sprite: cc.Sprite;
	    setState(v: number): void;
	    onLoad(): void;
	    clean(): void;
	    random(): void;
	}

}
declare module 'zmg_ui_mgr/src/frameRatio/zmTween' {
	export class _zmTween {
	    private _target;
	    constructor(target: any);
	    to<OPTS extends Partial<{
	        progress: Function;
	        easing: Function | String;
	    }>>(duration: number, props: any, opts?: OPTS): cc.Tween;
	    recoverFrameRatioHandler(node: cc.Node): void;
	    recoverFrameRatio(): void;
	    fullFrameRatio(): void;
	    repeatForever(action?: cc.Action | cc.Tween): cc.Tween;
	    stopAllActions(): void;
	}

}
declare module 'zmg_ui_mgr/src/interfaces' {
	import { DragonResAsset, ResAsset } from 'zmg_res_mgr';
	import { $EPetAction, $ERoleAction } from 'zmg_ui_mgr/src/zmgui/role/ERoleAction'; global {
	    namespace zmg {
	        interface IDragonInf {
	            type: number;
	            atlasImg: string;
	            atlasJson: string;
	            dragJson: string;
	        }
	        interface IRoleDressItem {
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
	        interface IPet {
	            readonly isValid: boolean;
	            readonly node: cc.Node;
	            readonly display: dragonBones.ArmatureDisplay;
	            setScale(value: number): void;
	            setParent(parent: cc.Node): void;
	            setPostion(newPosOrX: number | cc.Vec2 | cc.Vec3, y?: number): void;
	            load(path: DragonResAsset, shadowBunName: string, shadowPath: string): void;
	            /**
	             * 销毁
	             */
	            destroy(): void;
	            /**
	            * 执行动作
	            * @param action
	            */
	            doAction(action: $EPetAction): void;
	            /**
	            * 站立
	            */
	            stand(): void;
	            /**
	             * 向右行走
	             */
	            walkRight(): void;
	            /**
	             * 向左行走
	             */
	            walkLeft(): void;
	        }
	        interface IRole {
	            readonly pet: IPet;
	            readonly isValid: boolean;
	            readonly node: cc.Node;
	            readonly roleName: string;
	            readonly config: zmg.IRoleConfig;
	            readonly dressList: zmg.IRoleDressItem[];
	            readonly display: dragonBones.ArmatureDisplay;
	            getAction(): $ERoleAction;
	            hitTest(pos: cc.Vec2): boolean;
	            setParent(parent: cc.Node): void;
	            setPostion(newPosOrX: number | cc.Vec2 | cc.Vec3, y?: number): void;
	            /**
	             * 传入人物模型基本数据
	             */
	            initConfig(config: zmg.IRoleConfig): void;
	            /**
	             * 销毁
	             */
	            destroy(): void;
	            /**
	             * 穿上衣服
	             * @param cloths
	             */
	            dress(cloths: zmg.IRoleDressItem[]): void;
	            takeOff(cloth: zmg.IRoleDressItem): void;
	            takeOn(cloth: zmg.IRoleDressItem): void;
	            /**
	             * 执行动作
	             * @param action
	             */
	            doAction(action: $ERoleAction): void;
	            /**
	             * 说话
	             */
	            talk(clip: cc.AudioClip): void;
	            /**
	             * 停止说话
	             */
	            stopTalk(): void;
	            /**
	             * 站立
	             */
	            stand(): void;
	            /**
	             * 向右行走
	             */
	            walkRight(): void;
	            /**
	             * 向左行走
	             */
	            walkLeft(): void;
	        }
	        interface IActor extends IRole, cc.EventTarget {
	            talkRandom(): void;
	            talkByRes(res: ResAsset): void;
	        }
	        interface IMouse {
	            readonly mouseV2: cc.Vec2;
	            /**
	             * 初始化
	             */
	            start(): void;
	            setNormal(): void;
	            setLink(): void;
	            setUnavailable(): void;
	            setParent(parent: cc.Node): void;
	            /**
	             *
	             * @param link 点击状态
	             * @param normal 常规移动状态
	             * @param unavailable 点击摁下状态
	             */
	            setStyle(link: string, normal: string, unavailable: string): void;
	            /**
	             * 设置默认style
	             * @param link
	             * @param normal
	             * @param unavailable
	             */
	            setDefaultStyle(link: string, normal: string, unavailable: string): void;
	            /**
	             * 还原默认样式
	             */
	            resetStyle(): void;
	            /**
	            * 销毁
	            */
	            destroy(): void;
	            /**
	             * 转换相机坐标到屏幕
	             * @param screenPosition
	             */
	            getScreenToWorldPoint(screenPosition: cc.Vec2 | cc.Vec3): cc.Vec2;
	            /**
	             * 是否初始化完毕
	             */
	            readonly isValid: boolean;
	        }
	        interface IBaseUI {
	            readonly node: cc.Node;
	            init(url: string): void;
	            /**
	             * 显示
	             */
	            show(): void;
	            /**
	             * 隐藏
	             */
	            hide(): void;
	            /**
	             *
	             * @param style 符合要求样式的node,Prefab
	             */
	            setStyle(res: string | zmg.IResAsset, resUrl: string): void;
	            /**
	             * 还原默认样式
	             */
	            resetStyle(): void;
	            /**
	             * 销毁
	             */
	            destroy(): void;
	            /**
	             * 是否初始化完毕
	             */
	            readonly isValid: boolean;
	        }
	        interface ITransitions {
	            runScene(bunName: string, sceneUrl: string, onSceneLoaded: Function, onTransitionFinished: Function, color: cc.Color, movieClip: cc.Node): void;
	        }
	        interface IAlertAsset {
	            /**
	             * 显示文本
	             */
	            text: string;
	            /**
	             * 调用对象
	             */
	            target: any;
	            /**
	             * 确定回调
	             */
	            sureFun: Function;
	            /**
	             * 取消回调
	             */
	            canelFun: Function;
	            /**
	             * 确定按钮文本
	             */
	            sureText: string;
	            /**
	             * 取消按钮文本
	             */
	            canelText: string;
	            /**
	             * 修改样式
	             */
	            style: zmg.IResAsset;
	            /**
	             * 标题图片
	             */
	            title: zmg.IResAsset;
	            readonly isValid: boolean;
	            /**
	             * 清理资源
	             */
	            clear(): void;
	            canel(): void;
	            sure(): void;
	        }
	        interface INode extends cc.Component {
	        }
	        interface IFontMgr extends zmg.IMgr, cc.EventTarget {
	            updateFont(node: cc.Node): void;
	        }
	        interface IAlertMgr extends cc.EventTarget {
	            readonly defaultAlert: any;
	            res: zmg.IResAsset;
	            node: cc.Node;
	            init(url: string): void;
	            /**
	             * 销毁
	             */
	            destroy(): void;
	            /**
	             * 是否初始化完毕
	             */
	            readonly isValid: boolean;
	            /**
	             *
	             * @param asset 弹框显示
	             */
	            open(asset: string | IAlertAsset): void;
	            /**
	             * 关闭
	             */
	            close(now?: boolean): void;
	        }
	        interface IMask extends IBaseUI {
	            show(key?: string, opacity?: number): void;
	            /**
	             * 透明度
	             */
	            setOpacity(value: number): any;
	        }
	        interface IToastMgr extends IBaseUI, cc.EventTarget {
	            node: cc.Node;
	            res: zmg.IResAsset;
	            /**
	             *
	             * @param msg toast文本
	             * @param time 显示时间
	             */
	            open(msg: string, time: number): void;
	            /**
	            * 关闭
	            */
	            close(now?: boolean): void;
	        }
	        interface IBg extends IBaseUI {
	        }
	        interface ILoading extends IBaseUI, cc.EventTarget {
	            readonly res: zmg.IResAsset;
	            setProgress(value: number): void;
	            hideProgress(): void;
	        }
	        interface IBackBtn extends IBaseUI {
	        }
	        interface ISettingBtn extends IBaseUI {
	        }
	        interface IUIMgr extends zmg.IMgr {
	            /**
	             * 背景图
	             */
	            bg: IBg;
	            /**
	             * 操作遮罩层
	             */
	            mask: IMask;
	            /**
	             * 返回按钮
	             */
	            backBtn: IBackBtn;
	            /**
	             * loading界面
	             */
	            loading: zmg.ILoading;
	            /**
	             * toast管理器
	             */
	            toast: IToastMgr;
	            /**
	             * 弹窗管理器
	             */
	            alert: IAlertMgr;
	            /**
	             * 切场景特效组件
	             */
	            transitions: ITransitions;
	            /**
	             *
	             * @param isProgress 是否显示进度条
	             * @param pro 进度
	             */
	            showLoading(isProgress: boolean, pro?: number): any;
	            /**
	             * 隐藏进度条
	             */
	            hideLoading(): any;
	            /**
	             *
	             */
	            closeAll(): any;
	            /**
	             * 刷新排版
	             */
	            updateAlignment(node: cc.Node): void;
	        }
	    }
	}
	export {};

}
declare module 'zmg_ui_mgr' {
	import { $RoleEvent } from 'zmg_ui_mgr/src/zmgui/role/RoleEvent';
	import { $UIEvent } from 'zmg_ui_mgr/src/events/UIEvent';
	import { $UIBackEvent } from 'zmg_ui_mgr/src/events/UIBackEvent';
	import { $UIMouseEvent } from 'zmg_ui_mgr/src/events/UIMouseEvent';
	import { $RewardLayer } from 'zmg_ui_mgr/src/sysui/UILayer/RewardLayer';
	import { $ERoleAction, $EPetAction } from 'zmg_ui_mgr/src/zmgui/role/ERoleAction';
	import { _Actor } from 'zmg_ui_mgr/src/zmgui/role/Actor';
	import { $Role } from 'zmg_ui_mgr/src/zmgui/role/Role';
	import { _FontMgr } from 'zmg_ui_mgr/src/sysui/FontMgr';
	import { _UIMgr } from 'zmg_ui_mgr/src/UIMgr';
	import $BaseUI from 'zmg_ui_mgr/src/sysui/BaseUI';
	import { $UITransitions } from 'zmg_ui_mgr/src/sysui/UITransitions';
	import { $UIMouse } from 'zmg_ui_mgr/src/sysui/UIMouse';
	import { $UIMask } from 'zmg_ui_mgr/src/sysui/UIMask';
	import { $UILoading } from 'zmg_ui_mgr/src/sysui/UILoading';
	import { $UIBackBtn } from 'zmg_ui_mgr/src/sysui/UIBackBtn';
	import { $UILayer } from 'zmg_ui_mgr/src/sysui/UILayer';
	import { $Alert } from 'zmg_ui_mgr/src/sysui/alert/Alert';
	import { _ToastMgr } from 'zmg_ui_mgr/src/sysui/ToastMgr';
	import { _AlertMgr } from 'zmg_ui_mgr/src/sysui/alert/AlertMgr';
	import { $AlertAsset } from 'zmg_ui_mgr/src/sysui/alert/AlertAsset';
	import $SimpleBtn from 'zmg_ui_mgr/src/zmgui/btn/SimpleBtn';
	import { _AudioRes } from 'zmg_ui_mgr/src/zmgui/cache/AudioRes';
	import $LoadingSprite from 'zmg_ui_mgr/src/zmgui/sprite/LoadingSprite';
	import $ShowHideSprite from 'zmg_ui_mgr/src/zmgui/sprite/ShowHideSprite';
	import $StateSprite from 'zmg_ui_mgr/src/zmgui/sprite/StateSprite';
	import { _zmTween } from 'zmg_ui_mgr/src/frameRatio/zmTween';
	export * from 'zmg_ui_mgr/src/interfaces';
	export class AlertAsset extends $AlertAsset {
	}
	export let AlertMgr: _AlertMgr;
	export let ToastMgr: _ToastMgr;
	export class Alert extends $Alert {
	}
	export class UILayer extends $UILayer {
	}
	export class UIBackBtn extends $UIBackBtn {
	}
	export class UILoading extends $UILoading {
	}
	export class UIMask extends $UIMask {
	}
	export class UIMouse extends $UIMouse {
	}
	export class UITransitions extends $UITransitions {
	}
	export class BaseUI extends $BaseUI {
	}
	export let UIMgr: _UIMgr;
	export let FontMgr: _FontMgr;
	export class Role extends $Role {
	}
	export class RewardLayer extends $RewardLayer {
	}
	export class UIBackEvent extends $UIBackEvent {
	}
	export class UIEvent extends $UIEvent {
	}
	export class UIMouseEvent extends $UIMouseEvent {
	}
	export class RoleEvent extends $RoleEvent {
	}
	export let ERoleAction: typeof $ERoleAction;
	export let EPetAction: typeof $EPetAction;
	export let Actor: typeof _Actor.getInstance;
	export let AudioRes: _AudioRes;
	export class zmgui_btn_SimpleBtn extends $SimpleBtn {
	}
	export class zmgui_sprite_LoadingSprite extends $LoadingSprite {
	}
	export class zmgui_sprite_ShowHideSprite extends $ShowHideSprite {
	}
	export class zmgui_sprite_StateSprite extends $StateSprite {
	}
	export let zmTween: (target: any) => _zmTween;

}
declare module 'zmg_ui_mgr/src/components/UILoading' {
	import { DirectorEvent } from 'zmg_controller';
	import $BaseUI from 'zmg_ui_mgr/src/sysui/BaseUI';
	export class $UILoading extends $BaseUI implements zmg.ILoading {
	    private _proNode;
	    private _effectNode;
	    get res(): zmg.IResAsset;
	    constructor(url: string, parent: cc.Node);
	    showProgress(): void;
	    hideProgress(): void;
	    setProgress(value: number): void;
	    protected onLoad(): void;
	    private onFontReady;
	    show(): void;
	    hide(): void;
	    protected onDirectProgress(evt: DirectorEvent): void;
	}

}
declare module 'zmg_ui_mgr/src/sysui/SettingBtn' {
	export class SettingBtn {
	}

}
declare module 'zmg_ui_mgr/src/zmgui/hit/BlackHitComp' {
	import { UIMouseEvent } from 'zmg_ui_mgr';
	import $HitComp from 'zmg_ui_mgr/src/HitComp';
	export default class $BlackHitComp extends $HitComp {
	    priority: number;
	    addListener(): void;
	    removeListener(): void;
	    onEnable(): void;
	    onDisable(): void;
	    protected onMouseEnd(evt: UIMouseEvent): void;
	    protected onMouseStart(evt: UIMouseEvent): void;
	}

}
