
/**
 * 倒计时监控
 */
export default class _CaisVo {
    private static _instance: _CaisVo;
    public static getInstance(...args: any[]): _CaisVo {
        if (_CaisVo._instance == null) {
            _CaisVo._instance = new _CaisVo();
        }
        return _CaisVo._instance;
    }

    //服务器已记录数据
    public CaisServerData = {
        configId: 0,
        playTimeList: [10, 20, 30],
        restTimeList: [3, 5, 10]
    };
    /**
     * 要求休息时间
     */
    private _restTime: number = 0;
    /**
     * 可以游戏时间
     */
    private _playTime: number = 0;
    /**
     * 记录已经游戏时间
     */
    private _playRecord: number = 0;
    /**
     * 离开了多久
     */
    private _levelTime: number = 0;
    /**
     * 是否打开防沉迷界面
     */
    private _countTime: number = 0;
    /**
     * 当前状态
     */
    private _active: boolean = false;

    private _isTalkPlay: boolean = false;

    public get isTalkPlay(): boolean {
        return this._isTalkPlay;
    }
    public set isTalkPlay(s: boolean) {
        this._isTalkPlay = s;
    }
    public get countTime(): number {
        return this._countTime;
    }
    public set countTime(s: number) {
        this._countTime = s ? s : 0;
    }
    public get playTime(): number {
        return this._playTime;
    }
    public set playTime(s: number) {
        this._playTime = s ? s : 0;
    }
    public get restTime(): number {
        return this._restTime;
    }
    public set restTime(s: number) {
        this._restTime = s ? s : 0;
    }
    public get active(): boolean {
        return this._active;
    }
    public set active(s: boolean) {
        this._active = s;
    }
    public get levelTime(): number {
        return this._levelTime;
    }
    public set levelTime(s: number) {
        this._levelTime = s ? s : 0;
    }
    public get playRecord(): number {
        return this._playRecord;
    }
    public set playRecord(s: number) {
        this._playRecord = s ? s : 0;
    }

}

export enum $CaisServerVoType {
    //登陆时间(时间戳)
    LOGIN = "Countdown_login",
    //开始游戏时间(最后一次防沉迷后进入游戏时间)
    START_PLAY = "Countdown_startTime",
    //持续在线时间
    PLAY_TIME = "Countdown_countTime",
    //最后一次开始玩的时间
    LAST_PLAY_TIME = "Countdown_lastPlayTime",
    //首次进入大厅，NPC引导
    GUIDE_NPC = "Hall_guideNpc",
    //最后一次签到时间
    SIGN_TIME = "SignTime",
    //进入商城时间
    FIRST_ENTER_MALL = "MagicMall_firstEnterMall",
    /*海报 */
    PosterClipTimes = "PosterClipTimes"
}

export enum $CaisLocalVoType {
    //模块记录
    HALL_LOCAL_ = "hallLocal_",
    //心跳记录(本地存储)
    HEART = "zm_heart",
    //记录玩耍时间
    // PLAYRECORED = "playRecord"
}
