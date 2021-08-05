import { BaseMgr } from "zmg_mgr";
import { gError, gLog } from "zmg_util";
import { EventMgr, EventName } from "zmg_event_mgr";
import { TimeMgr } from "zmg_time_mgr";
import { AudioRes } from "zmg_ui_mgr";
import { DataMgr, ELocalSystemKey } from "zmg_gamedata_mgr";
export class _AudioMgr extends BaseMgr implements zmg.IAudioMgr {
    private static _instance: _AudioMgr;
    static getInstance(): _AudioMgr {
        if (!this._instance) {
            this._instance = new _AudioMgr();
        }
        return this._instance;
    }
    private _music: Map<cc.AudioClip, number> = new Map();

    private _effect: Map<number, cc.AudioClip> = new Map();

    private _musicVolume: number = 1.0;

    private _isActive: boolean = true;

    private _effectVolume: number = 1.0;
    private _pauseMusic: boolean;

    constructor() {
        super();
    }

    async start() {
        super.start();
        EventMgr.on(EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this);
        EventMgr.on(EventName.CONTROLLER_SOUND_CLOSE, this.onControllerClose, this, false, Number.MAX_SAFE_INTEGER);
        EventMgr.on(EventName.CONTROLLER_SOUND_OPEN, this.onControllerOpen, this, false, Number.MAX_SAFE_INTEGER);
    }
    destroy() {
        EventMgr.off(EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this);
        super.destroy();
        EventMgr.off(EventName.CONTROLLER_SOUND_CLOSE, this.onControllerClose, this);
        EventMgr.off(EventName.CONTROLLER_SOUND_OPEN, this.onControllerOpen, this);
    }
    private onSceneDestory(): void {
        //可能有音效需要延续到切换场景结束时刻
        // this.stopAllEffect();
    }

    get isValid(): boolean {
        return true;
    }

    public get isMuiscPlaying(): boolean {
        return this._musicVolume != 0.0;
    }

    private onControllerClose(): void {
        this.setMusicVolume(0.0);
        DataMgr.local.setItem(ELocalSystemKey.IS_CLOSE_AUDIO, true);
    }

    private onControllerOpen(): void {
        this.setMusicVolume(1.0);
        DataMgr.local.setItem(ELocalSystemKey.IS_CLOSE_AUDIO, false);
    }
    /**
     * 声音文件是否合法
     * @param clip 
     */
    public isValidClip(clip: cc.AudioClip): boolean {
        if (clip && clip.isValid) {
            if (cc.sys.isNative) {
                return true;
            }
            let dur;
            dur = clip["_audio"]['duration'];
            if (dur < clip.duration * 2) {
                return true;
            } else {
                if (dur > 300) {
                    cc.game.pause();
                    // throw new Error("声音非法:" + clip.name);
                    gError("声音非法:" + clip.name)
                }
            }
        }
        return false;
    }

    /**
     * 声音是否存在
     * @param clip 声音文件
     */
    public hasEffect(clip: cc.AudioClip): boolean {
        if (clip) {
            var bool: boolean = false;
            this._effect.forEach((_clip, id) => {
                if (_clip === clip) {
                    bool = true;
                }
            });
            return bool;
        }
    }

    /**
    * 
    * @param clip 播放音效
    * @param callback 回调函数
    * @param target 播放对象（检测是否合法）
    * @param count 播放次数
    * @param alone 是否屏蔽其他音效进行播放
    */
    public playEffect(clip: cc.AudioClip, callback?: Function, target?: any, count: number = 1, replay?: boolean, stopAll?: boolean): void {
        if (!this.isValidClip(clip)) {
            return;
        }
        if (this.hasEffect(clip)) {
            if (replay) {
                //重新播放
                this.stopEffect(clip);
            } else {
                //已经在播放
                return;
            }
        } else {
            if (stopAll) {
                this.stopAllEffect();
            }
        }
        let id = cc.audioEngine.playEffect(clip, count <= 0 ? true : false);
        this._effect.set(id, clip);
        if (count) {
            cc.audioEngine.setFinishCallback(id, () => {
                count--;
                this._effect.delete(id);
                if (count <= 0) {
                    if (cc.isValid(target) && callback) {
                        callback.call(target);
                    }
                } else {
                    this.playEffect(clip, callback, target, count);
                }
            });
        } else {
            cc.audioEngine.setFinishCallback(id, () => this._effect.delete(id));
        }
    }
    /**
     * 
     * @param clip 播放音效
     * @param callback 回调函数
     * @param target 播放对象
     * @param count 播放次数
     */
    public playMusic(clip: cc.AudioClip, callback?: Function, target?: any, count?: number,): void {
        if (!this.isValidClip(clip)) {
            return;
        }
        if (this._isActive) {
            if (this._music.get(clip)) {
                return;
            }
            this.stopMusic();
            let id = cc.audioEngine.playMusic(clip, true);
            this._music.set(clip, id);
            cc.audioEngine.setVolume(id, this._musicVolume);
            if (cc.sys.os === cc.sys.OS_IOS && this._musicVolume == 0.0) {
                cc.audioEngine.pause(id);
            }
            if (this._pauseMusic) {
                cc.audioEngine.pause(id);
            }
        }
    }
    /**
     * 设置音效音量
     * IOS暂时无效
     * @param value 
     */
    public setEffectVolume(value: number): void {
        if (value < 0) value = 0.0;
        else if (value > 1) value = 1.0;
        this._effectVolume = value;
        this._effect.forEach((clip, id) => cc.audioEngine.setVolume(id, this._effectVolume));
    }
    /**
     * 设置背景音量
     * IOS暂时无效
     * @param value 
     */
    public setMusicVolume(value: number): void {
        if (value <= 0) value = 0.0;
        else if (value > 1) value = 1.0;
        this._musicVolume = value;
        if (this._musicVolume == 0.0) {
            gLog("设置静音");
        } else {
            gLog("恢复声音");
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            if (value == 0.0) {
                this.pauseAllMusic();
            } else {
                this.resumeAllMusic();
            }
        } else {
            this._music.forEach(id => cc.audioEngine.setVolume(id, this._musicVolume));
        }
    }

    /**
     * 停止音乐
     * @param clip 音频
     */
    public stopMusic(clip?: cc.AudioClip): void {
        if (clip) {
            var id: number = this._music.get(clip);
            cc.audioEngine.stop(id);
            this._music.delete(clip);
            this._music.set(null, id);
        } else {
            if (this._music) {
                this._music.forEach((id, clip) => {
                    cc.audioEngine.stop(id);
                    this._music.delete(clip);
                });
            } else {
                this._music = new Map();
            }
        }
    }

    /**
     * 停止所有背景音乐
     */
    public stopAllMusic(): void {
        this._music.forEach((id, clip) => this.stopMusic(clip));
    }

    /**
     * 暂停所有音乐
     */
    public pauseAllMusic(): void {
        this._pauseMusic = true;
        this._music.forEach((id, clip) => {
            cc.audioEngine.pause(id);
        });
    }

    /**
    * 恢复所有音乐
    */
    public resumeAllMusic(): void {
        this._pauseMusic = false;
        if (cc.sys.os === cc.sys.OS_IOS) {
            if (this._musicVolume != 0.0) {
                this._music.forEach((id, clip) => {
                    cc.audioEngine.resume(id);
                });
            }
        } else {
            this._music.forEach((id, clip) => {
                cc.audioEngine.resume(id);
            });
        }
    }

    /**
     * 停止所有音量
     */
    public stopAllEffect(): void {
        this._effect.forEach((clip, id) => {
            cc.audioEngine.setFinishCallback(id, null);
            cc.audioEngine.stopEffect(id);
            this._effect.delete(id);
        });
    }

    /**
     *  停止音效
     * @param clip 
     */
    public stopEffect(clip: cc.AudioClip, isTween?: boolean): void {
        if (clip) {
            this._effect.forEach((value: cc.AudioClip, id: number, map: Map<number, cc.AudioClip>) => {
                if (value == clip) {
                    if (isTween) {
                        let total = 20;
                        let count = 1;
                        TimeMgr.doFrame(1, () => {
                            if (this._effect.get(id)) {
                                count++;
                                cc.audioEngine.setVolume(id, (total - count) / total * this._effectVolume)
                                if (total == count) {
                                    cc.audioEngine.setFinishCallback(id, null);
                                    cc.audioEngine.stopEffect(id);
                                    this._effect.delete(id);
                                    return true;
                                }
                            } else {
                                return true;
                            }
                            return false;
                        }, this, total);
                    } else {
                        cc.audioEngine.setFinishCallback(id, null);
                        cc.audioEngine.stopEffect(id);
                        this._effect.delete(id);
                    }
                }
            })
        }
    }

    /**
     * 暂停特效音频
     * @param clip 音频
     */
    public pauseEffect(clip: cc.AudioClip): void {
        this._effect.forEach((_clip, id) => _clip === clip && cc.audioEngine.pause(id));
    }

    /**
     * 暂停所有特效音频
     */
    public pauseAllEffect(): void {
        this._effect.forEach((clip, id) => cc.audioEngine.pause(id));
    }

    /**
     * 恢复特效音频
     * @param clip 音频
     */
    public resumeEffect(clip: cc.AudioClip): void {
        this._effect.forEach((_clip, id) => _clip === clip && cc.audioEngine.resume(id));
    }

    /**
     * 恢复所有特效音频
     */
    public resumeAllEffect(): void {
        this._effect.forEach((clip, id) => cc.audioEngine.resume(id));
    }

    /**
     * 停止所有音频
     */
    public stopAll(): void {
        this.stopAllMusic();
        this.stopAllEffect();
    }
    /**
     * 暂停所有音频
     */
    public pauseAll(): void {
        this.pauseAllMusic();
        this.pauseAllEffect();
    }

    /**
     * 恢复所有音频
     */
    public resumeAll(): void {
        this.resumeAllMusic();
        this.resumeAllEffect();
    }

    /**
     * 播放点击声音
     */
    public click(): void {
        this.playEffect(AudioRes.click);
    }
}

