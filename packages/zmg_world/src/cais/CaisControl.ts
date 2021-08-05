import { AudioMgr } from "zmg_audio_mgr";
import { ConfigMgr } from "zmg_config_mgr";
import { DirectorMgr } from "zmg_controller";
import { EnvMgr } from "zmg_env_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import { DataMgr } from "zmg_gamedata_mgr";
import { ModuleMgr } from "zmg_module_mgr";
import { ResListener, ResMgr } from "zmg_res_mgr";
import { TimeMgr } from "zmg_time_mgr";
import { UIMgr } from "zmg_ui_mgr";
import { DateUtil, DateUtilType, gLog } from "zmg_util";
import { ServerMgr } from "zmg_webserver_mgr";
import { _AppBundleName } from "../AppBundleName";
import { $GameEvent } from "../consts/GameEvent";
import { $Commands } from "../servers/commands/Commands";
import { _UserMgr } from "../userdatas/UserMgr";

import _CaisVo, { $CaisLocalVoType, $CaisServerVoType } from "./CaisVo";


export default class _CaisControl {

    private static _instance: _CaisControl;
    public static getInstance(...args: any[]): _CaisControl {
        if (_CaisControl._instance == null) {
            _CaisControl._instance = new _CaisControl();
        }
        return _CaisControl._instance;
    }
    private _isRest = false;
    set isRest(b: boolean) {
        this._isRest = b
    }
    public get caisVo(): _CaisVo {
        return _CaisVo.getInstance()
    }

    start() {
        //检查防沉迷
        ServerMgr.sendGet($Commands.getPlayAndRestTimeConfig, { configId: 0 }, (res: WebServerVo.IPlayAndRestTimeConfig) => {
            //通知，服务器准备完毕
            this.init(res);
            if (this.check()) {
                //进入防沉迷
                //back的时候能正确返回
                ModuleMgr.record.setNow(EnvMgr.getDefaultModuleAsset());
            } else {
                //未进入防沉迷
                ModuleMgr.openDefault();
            }
        });
        EventMgr.on(EventName.CONTROLLER_CHANGE_END, () => {
            let m = ModuleMgr.record.getNowConfig();
            if (m && m.closeCountDown) {
                this.pause();
            } else {
                this.reset();
            }
        }, this);
    }

    public init(res: WebServerVo.IPlayAndRestTimeConfig): void {
        if (!res.playTime) {
            res.playTime = this.getDefaultPlayTime();
        }
        if (!res.restTime) {
            res.restTime = this.getDefaultRestTime();
        }
        // 测试
        // this.caisVo.restTime = 10;   //休息一分钟
        // this.caisVo.playTime = 20; //玩18秒
        //正式
        this.caisVo.restTime = res.restTime * 60;//换算为秒
        this.caisVo.playTime = res.playTime * 60;//换算为秒

        this.startEnd();
        /**
         * 进入超能学院等webview的时候，cocos系统会暂停
         * 所以不能使用TimerMgr
         */
        // TimeMgr.doTimer(1000, this.onTimer, this);
        window.setInterval(this.onTimer.bind(this), 1000);
    }
    private onTimer(): void {
        if (_CaisVo.getInstance().active) {
            this.onTimeChange();
        }
        EventMgr.emit($GameEvent.TIME_CHANGE);
    }

    setCaisStatu(module: zmg.IModuleConfig) {
        if (module.closeCountDown) {
            this.caisVo.active = false
            this.caisVo.restTime = 0;
            this.caisVo.playTime = Number.MAX_SAFE_INTEGER;
        }
    }

    public pause(): void {
        this.caisVo.active = false;
        var now: Date = DateUtil.getNowDate();
        DataMgr.server.setItem($CaisServerVoType.LOGIN, now.valueOf());
        // EventMgr.off(GameEvent.TIME_CHANGE, this.onTimeChange, this)
    }


    public reset(): void {
        this.startEnd();
    }

    private startEnd(): void {
        if (this.caisVo.active) {
            return;
        }
        this.caisVo.active = true;
        //当前时间
        var now: Date = DateUtil.getNowDate();

        //上一次最后心跳时间
        var lastHeart: { heart: number, record: number } = DataMgr.local.getItem($CaisLocalVoType.HEART);
        lastHeart = lastHeart ? lastHeart : { heart: 0, record: 0 }
        //离开时间
        var level = this.distance(lastHeart.heart, now.valueOf());
        gLog("离开时间====", level)
        //设置登陆时间
        DataMgr.server.setItem($CaisServerVoType.LOGIN, now.valueOf());

        /**
         * 离开时间超过休息时间
         */
        if (level > this.caisVo.restTime) {
            this.resetTimer(now);
        } else {
            /**累计游戏时间 */
            var playing: number
            //最后一次开始玩的时间
            let time = DataMgr.server.getItem($CaisServerVoType.LAST_PLAY_TIME)
            var lastPlay = (!time) ? now.valueOf() : time;
            playing = this.distance(lastPlay, lastHeart.heart);
            this.caisVo.levelTime = level;
            if (playing >= this.caisVo.playTime) {//是否处于休息状态
                this.caisVo.playRecord = lastHeart.record + level
            } else {
                this.caisVo.playRecord = lastHeart.record;
            }
            gLog("剩余游戏时间:" + (this.caisVo.playRecord - this.caisVo.playTime));
        }
        // EventMgr.on(GameEvent.TIME_CHANGE, this.onTimeChange, this);
    }

    public resetTimer(now?: Date, restTime?: number, playTime?: number): void {
        this.caisVo.levelTime = 0;
        this.caisVo.countTime = 0;
        this.caisVo.playRecord = 0;
        now = now ? now : new Date();
        this.caisVo.restTime = restTime ? restTime * 60 : this.caisVo.restTime;
        this.caisVo.playTime = playTime ? playTime * 60 : this.caisVo.playTime;
        DataMgr.local.setItem($CaisLocalVoType.HEART, { heart: now.valueOf(), recored: 0 });
        DataMgr.server.setItem($CaisServerVoType.LAST_PLAY_TIME, now.valueOf());
        this.closeCountDown();
    }

    public check(): boolean {
        if (!_UserMgr.getInstance().isAdoption) {
            return false;
        }
        var now: Date = DateUtil.getNowDate();
        DataMgr.local.setItem($CaisLocalVoType.HEART, { heart: now.valueOf(), record: this.caisVo.playRecord });
        //超出游戏时间
        var time: number = this.caisVo.playRecord - this.caisVo.playTime;
        if (time >= 0) {
            //进入防沉迷
            if (time >= this.caisVo.restTime) {
                this.resetTimer();
            } else {
                this.caisVo.countTime = this.caisVo.restTime - time;
                if (!this._isRest) {
                    //打开模块
                    let time = DataMgr.server.getItem($CaisServerVoType.LAST_PLAY_TIME)
                    let timeDate = new Date(time)
                    gLog("最后一次开始玩的时间====", DateUtil.format(timeDate, DateUtilType.yyyy_MM_dd_HH_mm_ss))
                    this._isRest = true
                    this.caisVo.isTalkPlay = true;
                    ModuleMgr.openByCode(_AppBundleName.CAIS);
                    //通知所有节点开始休息
                    EventMgr.emit($GameEvent.COUNT_DOWN_OPEN);
                    return true;
                }
            }
        } else {
            this.caisVo.countTime = 0;
        }
        return false;
    }

    private closeCountDown(): void {
        if (this._isRest) {
            this._isRest = false;
            ResMgr.load(_AppBundleName.CAIS, "audio/gotoPlay", new ResListener(this, (clip: cc.AudioClip, lis: zmg.IResListener) => {
                AudioMgr.playEffect(clip);
                ModuleMgr.refurbish();
            }, (path, lis: zmg.IResListener) => {
                gLog("下载失败:" + path);
            }));

        }
    }

    private getDefaultPlayTime(): number {
        var config = this.caisVo.CaisServerData;
        var mid = Math.floor(config["playTimeList"].length / 2);
        var res: number = config["playTimeList"][mid];
        return res ? res : 10;
    }

    private getDefaultRestTime(): number {
        var config = this.caisVo.CaisServerData;
        var mid = Math.floor(config["restTimeList"].length / 2);
        var res: number = config["restTimeList"][mid];
        return res ? res : 10;
    }

    private onTimeChange(): void {
        this.caisVo.playRecord++;
        this.check();
    }

    private distance(a: number, b: number): number {
        return Math.max(Math.floor((b - a) / 1000), 0);
    }

}