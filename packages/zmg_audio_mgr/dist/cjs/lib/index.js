'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_mgr = require('zmg_mgr');
var zmg_util = require('zmg_util');
var zmg_event_mgr = require('zmg_event_mgr');
var zmg_time_mgr = require('zmg_time_mgr');
var zmg_ui_mgr = require('zmg_ui_mgr');
var zmg_gamedata_mgr = require('zmg_gamedata_mgr');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var _AudioMgr = /** @class */ (function (_super) {
    __extends(_AudioMgr, _super);
    function _AudioMgr() {
        var _this = _super.call(this) || this;
        _this._music = new Map();
        _this._effect = new Map();
        _this._musicVolume = 1.0;
        _this._isActive = true;
        _this._effectVolume = 1.0;
        return _this;
    }
    _AudioMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _AudioMgr();
        }
        return this._instance;
    };
    _AudioMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this);
                zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_SOUND_CLOSE, this.onControllerClose, this, false, Number.MAX_SAFE_INTEGER);
                zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_SOUND_OPEN, this.onControllerOpen, this, false, Number.MAX_SAFE_INTEGER);
                return [2 /*return*/];
            });
        });
    };
    _AudioMgr.prototype.destroy = function () {
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this);
        _super.prototype.destroy.call(this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_SOUND_CLOSE, this.onControllerClose, this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_SOUND_OPEN, this.onControllerOpen, this);
    };
    _AudioMgr.prototype.onSceneDestory = function () {
        //可能有音效需要延续到切换场景结束时刻
        // this.stopAllEffect();
    };
    Object.defineProperty(_AudioMgr.prototype, "isValid", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_AudioMgr.prototype, "isMuiscPlaying", {
        get: function () {
            return this._musicVolume != 0.0;
        },
        enumerable: false,
        configurable: true
    });
    _AudioMgr.prototype.onControllerClose = function () {
        this.setMusicVolume(0.0);
        zmg_gamedata_mgr.DataMgr.local.setItem(zmg_gamedata_mgr.ELocalSystemKey.IS_CLOSE_AUDIO, true);
    };
    _AudioMgr.prototype.onControllerOpen = function () {
        this.setMusicVolume(1.0);
        zmg_gamedata_mgr.DataMgr.local.setItem(zmg_gamedata_mgr.ELocalSystemKey.IS_CLOSE_AUDIO, false);
    };
    /**
     * 声音文件是否合法
     * @param clip
     */
    _AudioMgr.prototype.isValidClip = function (clip) {
        if (clip && clip.isValid) {
            if (cc.sys.isNative) {
                return true;
            }
            var dur = void 0;
            dur = clip["_audio"]['duration'];
            if (dur < clip.duration * 2) {
                return true;
            }
            else {
                if (dur > 300) {
                    cc.game.pause();
                    // throw new Error("声音非法:" + clip.name);
                    zmg_util.gError("声音非法:" + clip.name);
                }
            }
        }
        return false;
    };
    /**
     * 声音是否存在
     * @param clip 声音文件
     */
    _AudioMgr.prototype.hasEffect = function (clip) {
        if (clip) {
            var bool = false;
            this._effect.forEach(function (_clip, id) {
                if (_clip === clip) {
                    bool = true;
                }
            });
            return bool;
        }
    };
    /**
    *
    * @param clip 播放音效
    * @param callback 回调函数
    * @param target 播放对象（检测是否合法）
    * @param count 播放次数
    * @param alone 是否屏蔽其他音效进行播放
    */
    _AudioMgr.prototype.playEffect = function (clip, callback, target, count, replay, stopAll) {
        var _this = this;
        if (count === void 0) { count = 1; }
        if (!this.isValidClip(clip)) {
            return;
        }
        if (this.hasEffect(clip)) {
            if (replay) {
                //重新播放
                this.stopEffect(clip);
            }
            else {
                //已经在播放
                return;
            }
        }
        else {
            if (stopAll) {
                this.stopAllEffect();
            }
        }
        var id = cc.audioEngine.playEffect(clip, count <= 0 ? true : false);
        this._effect.set(id, clip);
        if (count) {
            cc.audioEngine.setFinishCallback(id, function () {
                count--;
                _this._effect.delete(id);
                if (count <= 0) {
                    if (cc.isValid(target) && callback) {
                        callback.call(target);
                    }
                }
                else {
                    _this.playEffect(clip, callback, target, count);
                }
            });
        }
        else {
            cc.audioEngine.setFinishCallback(id, function () { return _this._effect.delete(id); });
        }
    };
    /**
     *
     * @param clip 播放音效
     * @param callback 回调函数
     * @param target 播放对象
     * @param count 播放次数
     */
    _AudioMgr.prototype.playMusic = function (clip, callback, target, count) {
        if (!this.isValidClip(clip)) {
            return;
        }
        if (this._isActive) {
            if (this._music.get(clip)) {
                return;
            }
            this.stopMusic();
            var id = cc.audioEngine.playMusic(clip, true);
            this._music.set(clip, id);
            cc.audioEngine.setVolume(id, this._musicVolume);
            if (cc.sys.os === cc.sys.OS_IOS && this._musicVolume == 0.0) {
                cc.audioEngine.pause(id);
            }
            if (this._pauseMusic) {
                cc.audioEngine.pause(id);
            }
        }
    };
    /**
     * 设置音效音量
     * IOS暂时无效
     * @param value
     */
    _AudioMgr.prototype.setEffectVolume = function (value) {
        var _this = this;
        if (value < 0)
            value = 0.0;
        else if (value > 1)
            value = 1.0;
        this._effectVolume = value;
        this._effect.forEach(function (clip, id) { return cc.audioEngine.setVolume(id, _this._effectVolume); });
    };
    /**
     * 设置背景音量
     * IOS暂时无效
     * @param value
     */
    _AudioMgr.prototype.setMusicVolume = function (value) {
        var _this = this;
        if (value <= 0)
            value = 0.0;
        else if (value > 1)
            value = 1.0;
        this._musicVolume = value;
        if (this._musicVolume == 0.0) {
            zmg_util.gLog("设置静音");
        }
        else {
            zmg_util.gLog("恢复声音");
        }
        if (cc.sys.os === cc.sys.OS_IOS) {
            if (value == 0.0) {
                this.pauseAllMusic();
            }
            else {
                this.resumeAllMusic();
            }
        }
        else {
            this._music.forEach(function (id) { return cc.audioEngine.setVolume(id, _this._musicVolume); });
        }
    };
    /**
     * 停止音乐
     * @param clip 音频
     */
    _AudioMgr.prototype.stopMusic = function (clip) {
        var _this = this;
        if (clip) {
            var id = this._music.get(clip);
            cc.audioEngine.stop(id);
            this._music.delete(clip);
            this._music.set(null, id);
        }
        else {
            if (this._music) {
                this._music.forEach(function (id, clip) {
                    cc.audioEngine.stop(id);
                    _this._music.delete(clip);
                });
            }
            else {
                this._music = new Map();
            }
        }
    };
    /**
     * 停止所有背景音乐
     */
    _AudioMgr.prototype.stopAllMusic = function () {
        var _this = this;
        this._music.forEach(function (id, clip) { return _this.stopMusic(clip); });
    };
    /**
     * 暂停所有音乐
     */
    _AudioMgr.prototype.pauseAllMusic = function () {
        this._pauseMusic = true;
        this._music.forEach(function (id, clip) {
            cc.audioEngine.pause(id);
        });
    };
    /**
    * 恢复所有音乐
    */
    _AudioMgr.prototype.resumeAllMusic = function () {
        this._pauseMusic = false;
        if (cc.sys.os === cc.sys.OS_IOS) {
            if (this._musicVolume != 0.0) {
                this._music.forEach(function (id, clip) {
                    cc.audioEngine.resume(id);
                });
            }
        }
        else {
            this._music.forEach(function (id, clip) {
                cc.audioEngine.resume(id);
            });
        }
    };
    /**
     * 停止所有音量
     */
    _AudioMgr.prototype.stopAllEffect = function () {
        var _this = this;
        this._effect.forEach(function (clip, id) {
            cc.audioEngine.setFinishCallback(id, null);
            cc.audioEngine.stopEffect(id);
            _this._effect.delete(id);
        });
    };
    /**
     *  停止音效
     * @param clip
     */
    _AudioMgr.prototype.stopEffect = function (clip, isTween) {
        var _this = this;
        if (clip) {
            this._effect.forEach(function (value, id, map) {
                if (value == clip) {
                    if (isTween) {
                        var total_1 = 20;
                        var count_1 = 1;
                        zmg_time_mgr.TimeMgr.doFrame(1, function () {
                            if (_this._effect.get(id)) {
                                count_1++;
                                cc.audioEngine.setVolume(id, (total_1 - count_1) / total_1 * _this._effectVolume);
                                if (total_1 == count_1) {
                                    cc.audioEngine.setFinishCallback(id, null);
                                    cc.audioEngine.stopEffect(id);
                                    _this._effect.delete(id);
                                    return true;
                                }
                            }
                            else {
                                return true;
                            }
                            return false;
                        }, _this, total_1);
                    }
                    else {
                        cc.audioEngine.setFinishCallback(id, null);
                        cc.audioEngine.stopEffect(id);
                        _this._effect.delete(id);
                    }
                }
            });
        }
    };
    /**
     * 暂停特效音频
     * @param clip 音频
     */
    _AudioMgr.prototype.pauseEffect = function (clip) {
        this._effect.forEach(function (_clip, id) { return _clip === clip && cc.audioEngine.pause(id); });
    };
    /**
     * 暂停所有特效音频
     */
    _AudioMgr.prototype.pauseAllEffect = function () {
        this._effect.forEach(function (clip, id) { return cc.audioEngine.pause(id); });
    };
    /**
     * 恢复特效音频
     * @param clip 音频
     */
    _AudioMgr.prototype.resumeEffect = function (clip) {
        this._effect.forEach(function (_clip, id) { return _clip === clip && cc.audioEngine.resume(id); });
    };
    /**
     * 恢复所有特效音频
     */
    _AudioMgr.prototype.resumeAllEffect = function () {
        this._effect.forEach(function (clip, id) { return cc.audioEngine.resume(id); });
    };
    /**
     * 停止所有音频
     */
    _AudioMgr.prototype.stopAll = function () {
        this.stopAllMusic();
        this.stopAllEffect();
    };
    /**
     * 暂停所有音频
     */
    _AudioMgr.prototype.pauseAll = function () {
        this.pauseAllMusic();
        this.pauseAllEffect();
    };
    /**
     * 恢复所有音频
     */
    _AudioMgr.prototype.resumeAll = function () {
        this.resumeAllMusic();
        this.resumeAllEffect();
    };
    /**
     * 播放点击声音
     */
    _AudioMgr.prototype.click = function () {
        this.playEffect(zmg_ui_mgr.AudioRes.click);
    };
    return _AudioMgr;
}(zmg_mgr.BaseMgr));

var AudioMgr = _AudioMgr.getInstance();

exports.AudioMgr = AudioMgr;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9BdWRpb01nci50cyIsIi4uLy4uLy4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCYXNlTWdyIH0gZnJvbSBcInptZ19tZ3JcIjtcclxuaW1wb3J0IHsgZ0Vycm9yLCBnTG9nIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7IEV2ZW50TWdyLCBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgeyBUaW1lTWdyIH0gZnJvbSBcInptZ190aW1lX21nclwiO1xyXG5pbXBvcnQgeyBBdWRpb1JlcyB9IGZyb20gXCJ6bWdfdWlfbWdyXCI7XHJcbmltcG9ydCB7IERhdGFNZ3IsIEVMb2NhbFN5c3RlbUtleSB9IGZyb20gXCJ6bWdfZ2FtZWRhdGFfbWdyXCI7XHJcbmV4cG9ydCBjbGFzcyBfQXVkaW9NZ3IgZXh0ZW5kcyBCYXNlTWdyIGltcGxlbWVudHMgem1nLklBdWRpb01nciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IF9BdWRpb01ncjtcclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBfQXVkaW9NZ3Ige1xyXG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgX0F1ZGlvTWdyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX211c2ljOiBNYXA8Y2MuQXVkaW9DbGlwLCBudW1iZXI+ID0gbmV3IE1hcCgpO1xyXG5cclxuICAgIHByaXZhdGUgX2VmZmVjdDogTWFwPG51bWJlciwgY2MuQXVkaW9DbGlwPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBwcml2YXRlIF9tdXNpY1ZvbHVtZTogbnVtYmVyID0gMS4wO1xyXG5cclxuICAgIHByaXZhdGUgX2lzQWN0aXZlOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBwcml2YXRlIF9lZmZlY3RWb2x1bWU6IG51bWJlciA9IDEuMDtcclxuICAgIHByaXZhdGUgX3BhdXNlTXVzaWM6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBzdGFydCgpIHtcclxuICAgICAgICBzdXBlci5zdGFydCgpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9uKEV2ZW50TmFtZS5DT05UUk9MTEVSX0NIQU5HRV9ERVNUT1JZLCB0aGlzLm9uU2NlbmVEZXN0b3J5LCB0aGlzKTtcclxuICAgICAgICBFdmVudE1nci5vbihFdmVudE5hbWUuQ09OVFJPTExFUl9TT1VORF9DTE9TRSwgdGhpcy5vbkNvbnRyb2xsZXJDbG9zZSwgdGhpcywgZmFsc2UsIE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKTtcclxuICAgICAgICBFdmVudE1nci5vbihFdmVudE5hbWUuQ09OVFJPTExFUl9TT1VORF9PUEVOLCB0aGlzLm9uQ29udHJvbGxlck9wZW4sIHRoaXMsIGZhbHNlLCBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUik7XHJcbiAgICB9XHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfREVTVE9SWSwgdGhpcy5vblNjZW5lRGVzdG9yeSwgdGhpcyk7XHJcbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09OVFJPTExFUl9TT1VORF9DTE9TRSwgdGhpcy5vbkNvbnRyb2xsZXJDbG9zZSwgdGhpcyk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub2ZmKEV2ZW50TmFtZS5DT05UUk9MTEVSX1NPVU5EX09QRU4sIHRoaXMub25Db250cm9sbGVyT3BlbiwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uU2NlbmVEZXN0b3J5KCk6IHZvaWQge1xyXG4gICAgICAgIC8v5Y+v6IO95pyJ6Z+z5pWI6ZyA6KaB5bu257ut5Yiw5YiH5o2i5Zy65pmv57uT5p2f5pe25Yi7XHJcbiAgICAgICAgLy8gdGhpcy5zdG9wQWxsRWZmZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc011aXNjUGxheWluZygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbXVzaWNWb2x1bWUgIT0gMC4wO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Db250cm9sbGVyQ2xvc2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRNdXNpY1ZvbHVtZSgwLjApO1xyXG4gICAgICAgIERhdGFNZ3IubG9jYWwuc2V0SXRlbShFTG9jYWxTeXN0ZW1LZXkuSVNfQ0xPU0VfQVVESU8sIHRydWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Db250cm9sbGVyT3BlbigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldE11c2ljVm9sdW1lKDEuMCk7XHJcbiAgICAgICAgRGF0YU1nci5sb2NhbC5zZXRJdGVtKEVMb2NhbFN5c3RlbUtleS5JU19DTE9TRV9BVURJTywgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlo7Dpn7Pmlofku7bmmK/lkKblkIjms5VcclxuICAgICAqIEBwYXJhbSBjbGlwIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgaXNWYWxpZENsaXAoY2xpcDogY2MuQXVkaW9DbGlwKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGNsaXAgJiYgY2xpcC5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMuaXNOYXRpdmUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBkdXI7XHJcbiAgICAgICAgICAgIGR1ciA9IGNsaXBbXCJfYXVkaW9cIl1bJ2R1cmF0aW9uJ107XHJcbiAgICAgICAgICAgIGlmIChkdXIgPCBjbGlwLmR1cmF0aW9uICogMikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZHVyID4gMzAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZ2FtZS5wYXVzZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRocm93IG5ldyBFcnJvcihcIuWjsOmfs+mdnuazlTpcIiArIGNsaXAubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ0Vycm9yKFwi5aOw6Z+z6Z2e5rOVOlwiICsgY2xpcC5uYW1lKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWjsOmfs+aYr+WQpuWtmOWcqFxyXG4gICAgICogQHBhcmFtIGNsaXAg5aOw6Z+z5paH5Lu2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBoYXNFZmZlY3QoY2xpcDogY2MuQXVkaW9DbGlwKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGNsaXApIHtcclxuICAgICAgICAgICAgdmFyIGJvb2w6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fZWZmZWN0LmZvckVhY2goKF9jbGlwLCBpZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKF9jbGlwID09PSBjbGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gYm9vbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIFxyXG4gICAgKiBAcGFyYW0gY2xpcCDmkq3mlL7pn7PmlYhcclxuICAgICogQHBhcmFtIGNhbGxiYWNrIOWbnuiwg+WHveaVsFxyXG4gICAgKiBAcGFyYW0gdGFyZ2V0IOaSreaUvuWvueixoe+8iOajgOa1i+aYr+WQpuWQiOazle+8iVxyXG4gICAgKiBAcGFyYW0gY291bnQg5pKt5pS+5qyh5pWwXHJcbiAgICAqIEBwYXJhbSBhbG9uZSDmmK/lkKblsY/olL3lhbbku5bpn7PmlYjov5vooYzmkq3mlL5cclxuICAgICovXHJcbiAgICBwdWJsaWMgcGxheUVmZmVjdChjbGlwOiBjYy5BdWRpb0NsaXAsIGNhbGxiYWNrPzogRnVuY3Rpb24sIHRhcmdldD86IGFueSwgY291bnQ6IG51bWJlciA9IDEsIHJlcGxheT86IGJvb2xlYW4sIHN0b3BBbGw/OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRDbGlwKGNsaXApKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRWZmZWN0KGNsaXApKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXBsYXkpIHtcclxuICAgICAgICAgICAgICAgIC8v6YeN5paw5pKt5pS+XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3BFZmZlY3QoY2xpcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL+W3sue7j+WcqOaSreaUvlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHN0b3BBbGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcEFsbEVmZmVjdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBpZCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlFZmZlY3QoY2xpcCwgY291bnQgPD0gMCA/IHRydWUgOiBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5fZWZmZWN0LnNldChpZCwgY2xpcCk7XHJcbiAgICAgICAgaWYgKGNvdW50KSB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldEZpbmlzaENhbGxiYWNrKGlkLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb3VudC0tO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZWZmZWN0LmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHRhcmdldCkgJiYgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5RWZmZWN0KGNsaXAsIGNhbGxiYWNrLCB0YXJnZXQsIGNvdW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0RmluaXNoQ2FsbGJhY2soaWQsICgpID0+IHRoaXMuX2VmZmVjdC5kZWxldGUoaWQpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGNsaXAg5pKt5pS+6Z+z5pWIXHJcbiAgICAgKiBAcGFyYW0gY2FsbGJhY2sg5Zue6LCD5Ye95pWwXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IOaSreaUvuWvueixoVxyXG4gICAgICogQHBhcmFtIGNvdW50IOaSreaUvuasoeaVsFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGxheU11c2ljKGNsaXA6IGNjLkF1ZGlvQ2xpcCwgY2FsbGJhY2s/OiBGdW5jdGlvbiwgdGFyZ2V0PzogYW55LCBjb3VudD86IG51bWJlciwpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZENsaXAoY2xpcCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faXNBY3RpdmUpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX211c2ljLmdldChjbGlwKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc3RvcE11c2ljKCk7XHJcbiAgICAgICAgICAgIGxldCBpZCA9IGNjLmF1ZGlvRW5naW5lLnBsYXlNdXNpYyhjbGlwLCB0cnVlKTtcclxuICAgICAgICAgICAgdGhpcy5fbXVzaWMuc2V0KGNsaXAsIGlkKTtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc2V0Vm9sdW1lKGlkLCB0aGlzLl9tdXNpY1ZvbHVtZSk7XHJcbiAgICAgICAgICAgIGlmIChjYy5zeXMub3MgPT09IGNjLnN5cy5PU19JT1MgJiYgdGhpcy5fbXVzaWNWb2x1bWUgPT0gMC4wKSB7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZShpZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX3BhdXNlTXVzaWMpIHtcclxuICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnBhdXNlKGlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6K6+572u6Z+z5pWI6Z+z6YePXHJcbiAgICAgKiBJT1PmmoLml7bml6DmlYhcclxuICAgICAqIEBwYXJhbSB2YWx1ZSBcclxuICAgICAqL1xyXG4gICAgcHVibGljIHNldEVmZmVjdFZvbHVtZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAwLjA7XHJcbiAgICAgICAgZWxzZSBpZiAodmFsdWUgPiAxKSB2YWx1ZSA9IDEuMDtcclxuICAgICAgICB0aGlzLl9lZmZlY3RWb2x1bWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9lZmZlY3QuZm9yRWFjaCgoY2xpcCwgaWQpID0+IGNjLmF1ZGlvRW5naW5lLnNldFZvbHVtZShpZCwgdGhpcy5fZWZmZWN0Vm9sdW1lKSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOiuvue9ruiDjOaZr+mfs+mHj1xyXG4gICAgICogSU9T5pqC5pe25peg5pWIXHJcbiAgICAgKiBAcGFyYW0gdmFsdWUgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRNdXNpY1ZvbHVtZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDw9IDApIHZhbHVlID0gMC4wO1xyXG4gICAgICAgIGVsc2UgaWYgKHZhbHVlID4gMSkgdmFsdWUgPSAxLjA7XHJcbiAgICAgICAgdGhpcy5fbXVzaWNWb2x1bWUgPSB2YWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5fbXVzaWNWb2x1bWUgPT0gMC4wKSB7XHJcbiAgICAgICAgICAgIGdMb2coXCLorr7nva7pnZnpn7NcIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ0xvZyhcIuaBouWkjeWjsOmfs1wiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgPT0gMC4wKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlQWxsTXVzaWMoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzdW1lQWxsTXVzaWMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211c2ljLmZvckVhY2goaWQgPT4gY2MuYXVkaW9FbmdpbmUuc2V0Vm9sdW1lKGlkLCB0aGlzLl9tdXNpY1ZvbHVtZSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWBnOatoumfs+S5kFxyXG4gICAgICogQHBhcmFtIGNsaXAg6Z+z6aKRXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdG9wTXVzaWMoY2xpcD86IGNjLkF1ZGlvQ2xpcCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChjbGlwKSB7XHJcbiAgICAgICAgICAgIHZhciBpZDogbnVtYmVyID0gdGhpcy5fbXVzaWMuZ2V0KGNsaXApO1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wKGlkKTtcclxuICAgICAgICAgICAgdGhpcy5fbXVzaWMuZGVsZXRlKGNsaXApO1xyXG4gICAgICAgICAgICB0aGlzLl9tdXNpYy5zZXQobnVsbCwgaWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9tdXNpYykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbXVzaWMuZm9yRWFjaCgoaWQsIGNsaXApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zdG9wKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tdXNpYy5kZWxldGUoY2xpcCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX211c2ljID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YGc5q2i5omA5pyJ6IOM5pmv6Z+z5LmQXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdG9wQWxsTXVzaWMoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbXVzaWMuZm9yRWFjaCgoaWQsIGNsaXApID0+IHRoaXMuc3RvcE11c2ljKGNsaXApKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaaguWBnOaJgOaciemfs+S5kFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGF1c2VBbGxNdXNpYygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wYXVzZU11c2ljID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLl9tdXNpYy5mb3JFYWNoKChpZCwgY2xpcCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5wYXVzZShpZCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOaBouWkjeaJgOaciemfs+S5kFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyByZXN1bWVBbGxNdXNpYygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wYXVzZU11c2ljID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5vcyA9PT0gY2Muc3lzLk9TX0lPUykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbXVzaWNWb2x1bWUgIT0gMC4wKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9tdXNpYy5mb3JFYWNoKChpZCwgY2xpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnJlc3VtZShpZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX211c2ljLmZvckVhY2goKGlkLCBjbGlwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5yZXN1bWUoaWQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLmiYDmnInpn7Pph49cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0b3BBbGxFZmZlY3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZWZmZWN0LmZvckVhY2goKGNsaXAsIGlkKSA9PiB7XHJcbiAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldEZpbmlzaENhbGxiYWNrKGlkLCBudWxsKTtcclxuICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEVmZmVjdChpZCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VmZmVjdC5kZWxldGUoaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIOWBnOatoumfs+aViFxyXG4gICAgICogQHBhcmFtIGNsaXAgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdG9wRWZmZWN0KGNsaXA6IGNjLkF1ZGlvQ2xpcCwgaXNUd2Vlbj86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAoY2xpcCkge1xyXG4gICAgICAgICAgICB0aGlzLl9lZmZlY3QuZm9yRWFjaCgodmFsdWU6IGNjLkF1ZGlvQ2xpcCwgaWQ6IG51bWJlciwgbWFwOiBNYXA8bnVtYmVyLCBjYy5BdWRpb0NsaXA+KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT0gY2xpcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1R3ZWVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB0b3RhbCA9IDIwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY291bnQgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBUaW1lTWdyLmRvRnJhbWUoMSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2VmZmVjdC5nZXQoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRWb2x1bWUoaWQsICh0b3RhbCAtIGNvdW50KSAvIHRvdGFsICogdGhpcy5fZWZmZWN0Vm9sdW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbCA9PSBjb3VudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYy5hdWRpb0VuZ2luZS5zZXRGaW5pc2hDYWxsYmFjayhpZCwgbnVsbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnN0b3BFZmZlY3QoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZmZlY3QuZGVsZXRlKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgdGhpcywgdG90YWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLmF1ZGlvRW5naW5lLnNldEZpbmlzaENhbGxiYWNrKGlkLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MuYXVkaW9FbmdpbmUuc3RvcEVmZmVjdChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2VmZmVjdC5kZWxldGUoaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmmoLlgZznibnmlYjpn7PpopFcclxuICAgICAqIEBwYXJhbSBjbGlwIOmfs+mikVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGF1c2VFZmZlY3QoY2xpcDogY2MuQXVkaW9DbGlwKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZWZmZWN0LmZvckVhY2goKF9jbGlwLCBpZCkgPT4gX2NsaXAgPT09IGNsaXAgJiYgY2MuYXVkaW9FbmdpbmUucGF1c2UoaWQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaaguWBnOaJgOacieeJueaViOmfs+mikVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcGF1c2VBbGxFZmZlY3QoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZWZmZWN0LmZvckVhY2goKGNsaXAsIGlkKSA9PiBjYy5hdWRpb0VuZ2luZS5wYXVzZShpZCkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5oGi5aSN54m55pWI6Z+z6aKRXHJcbiAgICAgKiBAcGFyYW0gY2xpcCDpn7PpopFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc3VtZUVmZmVjdChjbGlwOiBjYy5BdWRpb0NsaXApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9lZmZlY3QuZm9yRWFjaCgoX2NsaXAsIGlkKSA9PiBfY2xpcCA9PT0gY2xpcCAmJiBjYy5hdWRpb0VuZ2luZS5yZXN1bWUoaWQpKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaBouWkjeaJgOacieeJueaViOmfs+mikVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzdW1lQWxsRWZmZWN0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2VmZmVjdC5mb3JFYWNoKChjbGlwLCBpZCkgPT4gY2MuYXVkaW9FbmdpbmUucmVzdW1lKGlkKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlgZzmraLmiYDmnInpn7PpopFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0b3BBbGwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zdG9wQWxsTXVzaWMoKTtcclxuICAgICAgICB0aGlzLnN0b3BBbGxFZmZlY3QoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5pqC5YGc5omA5pyJ6Z+z6aKRXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwYXVzZUFsbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnBhdXNlQWxsTXVzaWMoKTtcclxuICAgICAgICB0aGlzLnBhdXNlQWxsRWZmZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmgaLlpI3miYDmnInpn7PpopFcclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc3VtZUFsbCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlc3VtZUFsbE11c2ljKCk7XHJcbiAgICAgICAgdGhpcy5yZXN1bWVBbGxFZmZlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOaSreaUvueCueWHu+WjsOmfs1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2xpY2soKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5wbGF5RWZmZWN0KEF1ZGlvUmVzLmNsaWNrKTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0IHsgX0F1ZGlvTWdyIH0gZnJvbSBcIi4vQXVkaW9NZ3JcIjtcclxuXHJcbmV4cG9ydCBsZXQgQXVkaW9NZ3IgPSBfQXVkaW9NZ3IuZ2V0SW5zdGFuY2UoKTtcclxuIl0sIm5hbWVzIjpbIkV2ZW50TWdyIiwiRXZlbnROYW1lIiwiRGF0YU1nciIsIkVMb2NhbFN5c3RlbUtleSIsImdFcnJvciIsImdMb2ciLCJUaW1lTWdyIiwiQXVkaW9SZXMiLCJCYXNlTWdyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BO0lBQStCLDZCQUFPO0lBbUJsQztRQUFBLFlBQ0ksaUJBQU8sU0FDVjtRQWJPLFlBQU0sR0FBOEIs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
