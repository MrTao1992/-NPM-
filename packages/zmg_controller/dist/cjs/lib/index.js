'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_res_mgr = require('zmg_res_mgr');
var zmg_event_mgr = require('zmg_event_mgr');
var zmg_util = require('zmg_util');
var zmg_mgr = require('zmg_mgr');
var zmg_audio_mgr = require('zmg_audio_mgr');
var zmg_env_mgr = require('zmg_env_mgr');
var zmg_config_mgr = require('zmg_config_mgr');
var zmg_ui_mgr = require('zmg_ui_mgr');
var zmg_time_mgr = require('zmg_time_mgr');
var zmg_track_mgr = require('zmg_track_mgr');

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

var $DirectorEvent = /** @class */ (function (_super) {
    __extends($DirectorEvent, _super);
    function $DirectorEvent(type, preSceneName, nextSceneName) {
        var _this = _super.call(this, type, false) || this;
        _this.preSceneName = preSceneName;
        _this.nextSceneName = nextSceneName;
        return _this;
    }
    $DirectorEvent.SCENE_CHANGE_DESTORY = zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY;
    $DirectorEvent.SCENE_CHANGE_START = zmg_event_mgr.EventName.CONTROLLER_CHANGE_START;
    $DirectorEvent.SCENE_CHANGE_END = zmg_event_mgr.EventName.CONTROLLER_CHANGE_END;
    $DirectorEvent.SCENE_CHANGE_PROGRESS = zmg_event_mgr.EventName.CONTROLLER_CHANGE_PROGRESS;
    $DirectorEvent.SCENE_CHANGE_FAIL = zmg_event_mgr.EventName.CONTROLLER_CHANGE_FAIL;
    $DirectorEvent.SOUND_CLOSE = zmg_event_mgr.EventName.CONTROLLER_SOUND_CLOSE;
    $DirectorEvent.SOUND_OPEN = zmg_event_mgr.EventName.CONTROLLER_SOUND_OPEN;
    return $DirectorEvent;
}(cc.Event));

var _DirectorMgr = /** @class */ (function (_super) {
    __extends(_DirectorMgr, _super);
    function _DirectorMgr() {
        var _this = _super.call(this) || this;
        _this._callTime = -1;
        _this._openList = [];
        _this._isloading = false;
        return _this;
    }
    _DirectorMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _DirectorMgr();
        }
        return this._instance;
    };
    Object.defineProperty(_DirectorMgr.prototype, "nowBunName", {
        get: function () {
            return this._nowBunName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_DirectorMgr.prototype, "nowConfig", {
        get: function () {
            return this._cfg;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_DirectorMgr.prototype, "nowParam", {
        get: function () {
            return this._param;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_DirectorMgr.prototype, "nowSceneName", {
        get: function () {
            return this._nowSceneName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_DirectorMgr.prototype, "bgclip", {
        get: function () {
            return this._bgclip;
        },
        set: function (url) {
            var _this = this;
            this._bgclip = url;
            if (zmg_util.StringUtil.isValid(url)) {
                zmg_res_mgr.ResMgr.loadRemote(url, new zmg_res_mgr.ResListener(this, function (asset) {
                    /**
                     * 是否依旧需要播放
                     * 注意这里音乐加载完毕，可能已经切换过模块了
                     * 所以需要重新判断
                     */
                    if (url == _this._bgclip) {
                        setTimeout(function () {
                            zmg_audio_mgr.AudioMgr.playMusic(asset);
                        }, 100);
                    }
                }));
            }
            else {
                zmg_audio_mgr.AudioMgr.stopAllMusic();
            }
        },
        enumerable: false,
        configurable: true
    });
    _DirectorMgr.prototype.openConfig = function (cfg, param) {
        var _this = this;
        var type = cfg.main.type;
        this.bgclip = cfg.bgclip;
        var uparam = param ? param : this._param ? this._param : cfg.main.param;
        this._param = param;
        this._cfg = cfg;
        var ratio = cfg.frameRatio ? cfg.frameRatio : zmg_config_mgr.ConfigMgr.uiconfig.frameRatio;
        //添加切换时长限制
        if (this._callTime < 0) {
            this._callTime = zmg_time_mgr.TimeMgr.getCurTime();
        }
        else {
            var curTime = zmg_time_mgr.TimeMgr.getCurTime();
            if (curTime - this._callTime < 1) {
                var item = {
                    cfg: cfg,
                    param: param
                };
                this._openList.push(item);
                zmg_time_mgr.TimeMgr.doTimer(1000, function () {
                    if (_this._openList.length > 0) {
                        var m = _this._openList[_this._openList.length - 1];
                        if (m)
                            _this.openConfig(m.cfg, m.param);
                    }
                }, this, 1);
                return;
            }
            else {
                this._callTime = curTime;
                this._openList = [];
            }
        }
        switch (type) {
            case zmg_config_mgr.$EModuleType.IFRAME:
                zmg_event_mgr.EventMgr.emit("frameRatioChange", 1.0);
                this.openWebview(cfg.main.path, uparam);
                break;
            case zmg_config_mgr.$EModuleType.PREFAB:
                cc.game.resume();
                zmg_audio_mgr.AudioMgr.resumeAll();
                zmg_event_mgr.EventMgr.emit("frameRatioChange", ratio);
                this.openPrefab(cfg.code, cfg.main.path, uparam);
                break;
            case zmg_config_mgr.$EModuleType.SCENE:
                cc.game.resume();
                zmg_audio_mgr.AudioMgr.resumeAll();
                zmg_event_mgr.EventMgr.emit("frameRatioChange", ratio);
                this.openScene(cfg.code, cfg.main.path, uparam);
                break;
        }
    };
    _DirectorMgr.prototype.openScene = function (bunName, sceneName, param, transitions) {
        var _this = this;
        if (transitions === void 0) { transitions = null; }
        var nowScene = cc.director.getScene().name;
        if (!this.onSceneDestory(nowScene, bunName, sceneName, param).isStopped()) {
            if (this._isloading) {
                zmg_util.gWarn("场景正在加载过程中");
                return;
            }
            this._isloading = true;
            zmg_res_mgr.ResMgr.releaseLib(zmg_res_mgr.SystemBundleName.REMOTE);
            if (transitions) {
                zmg_ui_mgr.UIMgr.hideLoading();
            }
            zmg_util.gWarn("打开BunName:" + bunName + " sceneName:" + sceneName + " " + JSON.stringify(param));
            zmg_res_mgr.ResMgr.loadScene(bunName, sceneName, new zmg_res_mgr.ResListener(this, function (assets, listener) {
                if (transitions) {
                    zmg_ui_mgr.UIMgr.transitions.runScene(bunName, sceneName, function () {
                        _this.onSceneStart(nowScene, bunName, sceneName, param);
                    }, function () {
                        _this.onSceneEnd(nowScene, bunName, sceneName, param);
                    }, transitions.color, transitions.movieclip);
                }
                else {
                    zmg_util.gWarn("回调场景打开---------------", nowScene, sceneName);
                    cc.director.runScene(assets, function () {
                        _this.onSceneStart(nowScene, bunName, sceneName, param);
                    }, function () {
                        _this.onSceneEnd(nowScene, bunName, sceneName, param);
                    });
                }
            }, function () {
                zmg_util.gWarn("########场景加载失败,bunName: " + bunName + " sceneName:" + sceneName + "########");
                var evt = new $DirectorEvent($DirectorEvent.SCENE_CHANGE_FAIL, nowScene, sceneName);
                evt.param = param;
                evt.progress = 0;
                _this.dispatchEvent(evt);
                _this._isloading = false;
            }, function (path, pro, total) {
                var evt = new $DirectorEvent($DirectorEvent.SCENE_CHANGE_PROGRESS, nowScene, sceneName);
                evt.progress = Math.round(Math.round(pro / total) * 1000) / 1000;
                evt.param = param;
                _this.dispatchEvent(evt);
            }));
        }
    };
    /**
     * 过度效果切换场景
     * @param bunName
     * @param path
     */
    _DirectorMgr.prototype.tranToScene = function (bunName, sceneName, param, color, movieclip) {
        this.openScene(bunName, sceneName, param, { color: color, movieclip: movieclip });
    };
    /**
     * 视频播放
     * @param url
     */
    // public openVideo(url: string): void {
    //     // this.openScene(video.bunName, video.scene, { url: url, bunName: backBunname, scene: backSceneName });
    //     UIMgr.uiLayer.showVideo(url);
    // }
    _DirectorMgr.prototype.openWebview = function (url, params) {
        params = (zmg_util.StringUtil.isValid(params) ? params + "&" : "") + zmg_util.StringUtil.getQuery({
            userId: zmg_env_mgr.EnvMgr.getUserId(),
            token: zmg_env_mgr.EnvMgr.getToken(),
            device: zmg_env_mgr.EnvMgr.getEnvData().device,
            appVersion: zmg_env_mgr.EnvMgr.getAppVersion(),
            msgSendModle: "post",
            env: zmg_env_mgr.EnvMgr.getEnv(),
            mic: zmg_audio_mgr.AudioMgr.isMuiscPlaying,
        });
        //原生需要这个字段，h5不需要这个字段
        // webRender: false,
        if (url.indexOf("?") == -1) {
            url = url + "?" + params;
        }
        else {
            url = url + "&" + params;
        }
        var webview = zmg_config_mgr.ConfigMgr.getWebviewConfig();
        this.openScene(webview.bunName, webview.scene, url);
    };
    _DirectorMgr.prototype.openPrefab = function (bunName, path, param) {
        var _this = this;
        zmg_res_mgr.ResMgr.load(bunName, path, new zmg_res_mgr.ResListener(this, function (assets, lis) {
            zmg_util.gLog("-----------------Prefab构造函数运行完毕---------------");
            var node = cc.instantiate(assets);
            var coms = node.getComponents(cc.Component);
            coms.forEach(function (element) {
                if (element['init']) {
                    element['init'](param);
                }
            });
            cc.Canvas.instance.node.addChild(cc.instantiate(assets));
        }, function (path, listener) {
            zmg_util.gWarn("当前预制体加载失败,bunName: " + bunName + " path:" + path);
            var evt = new $DirectorEvent($DirectorEvent.SCENE_CHANGE_FAIL);
            evt.param = param;
            evt.progress = 0;
            _this.dispatchEvent(evt);
        }), cc.Prefab);
    };
    _DirectorMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                return [2 /*return*/];
            });
        });
    };
    _DirectorMgr.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        // EventMgr.off(EventName.UI_BACK_BTN, this.onUIBackBtn, this);
        // EventMgr.off(DirectorEvent.VIDEO_CLOSE, this.videoClose, this);
    };
    Object.defineProperty(_DirectorMgr.prototype, "isValid", {
        // private videoClose(): void {
        //     let video: cc.VideoPlayer = cc.Canvas.instance.getComponentInChildren(cc.VideoPlayer);
        //     let bunName = video["bunName"];
        //     let scene = video["scene"];
        //     if (StringUtil.isValid(bunName) && StringUtil.isValid(scene)) {
        //         this.openScene(bunName, scene);
        //     }
        // }
        // private onUIBackBtn(evt: UIBackEvent): void {
        //     if (this.isVideoScene()) {
        //         let evt2 = new DirectorEvent(DirectorEvent.VIDEO_CLOSE);
        //         this.dispatchEvent(evt2);
        //         evt["stopped"]();
        //     }
        // }
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    _DirectorMgr.prototype.curCanvas = function () {
        return cc.Canvas.instance.node;
    };
    _DirectorMgr.prototype.curSence = function () {
        return cc.director.getScene();
    };
    // public isVideoScene(): boolean {
    //     return this._isVideo;
    // }
    _DirectorMgr.prototype.isWebviewScene = function () {
        return this._isWebview;
    };
    /**
    * 场景切换开始处理函数
    */
    _DirectorMgr.prototype.onSceneStart = function (nowScene, bunName, sceneName, param) {
        zmg_track_mgr.TrackModule.extParam = {};
        var evt = new $DirectorEvent($DirectorEvent.SCENE_CHANGE_START, nowScene, sceneName);
        evt.param = param;
        evt.progress = 1;
        this.dispatchEvent(evt);
        zmg_util.gLog("========场景切换请求开始" + " sceneName: " + nowScene + "====================");
        return evt;
    };
    _DirectorMgr.prototype.onSceneDestory = function (nowScene, bunName, sceneName, param) {
        // let video: zmg.IVideoAsset = ConfigMgr.getVideoConfig();
        var webview = zmg_config_mgr.ConfigMgr.getVideoConfig();
        // if (this._nowSceneName == video.scene && this._nowBunName == video.bunName) {
        //     this.destroyVideo();
        // } else 
        if (this._nowSceneName == webview.scene && this._nowBunName == webview.bunName) {
            this.destroyWebview();
        }
        var evt = new $DirectorEvent($DirectorEvent.SCENE_CHANGE_DESTORY, nowScene, sceneName);
        evt.param = param;
        evt.progress = 1;
        this.dispatchEvent(evt);
        zmg_util.gLog("========销毁场景" + " sceneName: " + nowScene + "====================");
        return evt;
    };
    /**
     * 场景切换完毕处理函数
     */
    _DirectorMgr.prototype.onSceneEnd = function (nowScene, bunName, sceneName, param) {
        this._isWebview = false;
        this._isloading = false;
        var webview = zmg_config_mgr.ConfigMgr.getWebviewConfig();
        if (sceneName == webview.scene && bunName == webview.bunName) {
            this._isWebview = true;
            this.initWebview(param);
        }
        this._nowBunName = bunName;
        this._nowSceneName = sceneName;
        var evt = new $DirectorEvent($DirectorEvent.SCENE_CHANGE_END, nowScene, sceneName);
        evt.param = param;
        evt.progress = 1;
        this.dispatchEvent(evt);
        zmg_util.gLog("========场景切换请求结束" + "bunName:" + bunName + " sceneName: " + sceneName + "=========");
        return evt;
    };
    _DirectorMgr.prototype.dispatchEvent = function (evt) {
        zmg_event_mgr.EventMgr.dispatchEvent(evt);
        _super.prototype.dispatchEvent.call(this, evt);
    };
    /**
     *
     * @param param 视频场景初始化
     */
    // private initVideo(param?: any): void {
    //     if (!param) {
    //         gWarn("视频地址为空，无法进行播放!");
    //         return;
    //     }
    //     let video: cc.VideoPlayer = cc.Canvas.instance.getComponentInChildren(cc.VideoPlayer);
    //     video.resourceType = cc.VideoPlayer.ResourceType.REMOTE;
    //     video.remoteURL = param.url;
    //     video["bunName"] = param.bunName;
    //     video["scene"] = param.scene;
    //     // cc.Canvas.instance.node.once(DirectorEvent.VIDEO_CLOSE, () => {
    //     //     let evt = new DirectorEvent(DirectorEvent.VIDEO_CLOSE);
    //     //     this.dispatchEvent(evt);
    //     // }, this, false);
    //     // cc.Canvas.instance.node.on(DirectorEvent.SOUND_CLOSE, () => {
    //     //     let evt = new DirectorEvent(DirectorEvent.SOUND_CLOSE);
    //     //     EventMgr.dispatchEvent(evt);
    //     //     this.dispatchEvent(evt);
    //     // }, this, false);
    //     // cc.Canvas.instance.node.on(DirectorEvent.SOUND_OPEN, () => {
    //     //     let evt = new DirectorEvent(DirectorEvent.SOUND_OPEN);
    //     //     EventMgr.dispatchEvent(evt);
    //     //     this.dispatchEvent(evt);
    //     // }, this, false);
    //     // video.play();
    // }
    _DirectorMgr.prototype.destroyVideo = function () {
        zmg_util.gLog("清除视频组件");
    };
    _DirectorMgr.prototype.destroyWebview = function () {
        zmg_util.gLog("清除webview组件");
        var webview = cc.Canvas.instance.getComponentInChildren(cc.WebView);
        webview.node.off("error", this.onWebViewError, this, false);
        webview.node.off("loaded", this.onWebViewLoaded, this, false);
    };
    /**
     *
     * @param param webview场景初始化
     */
    _DirectorMgr.prototype.initWebview = function (param) {
        if (!param) {
            zmg_util.gWarn("webview地址为空，无法进行加载!");
            return;
        }
        var webview = cc.Canvas.instance.getComponentInChildren(cc.WebView);
        if (cc.isValid(webview)) {
            // if (webview.getIframeElement() && webview.getIframeElement().style) {
            //     webview.getIframeElement().style.zIndex = "-1";
            // }
            webview.node.on("error", this.onWebViewError, this, false);
            webview.node.on("loaded", this.onWebViewLoaded, this, false);
            webview.url = param;
        }
        else {
            zmg_util.gWarn("未找到webview对象。");
        }
    };
    _DirectorMgr.prototype.onWebViewError = function (e) {
        var list = [];
        for (var key in e) {
            list.push("key:" + key + " value:" + e[key] + " ");
        }
        zmg_util.gWarn("webview加载错误", list);
    };
    _DirectorMgr.prototype.onWebViewLoaded = function (e) {
        zmg_util.gLog("webview loaded!");
        cc.game.pause();
        zmg_audio_mgr.AudioMgr.stopAll();
    };
    _DirectorMgr._instance = null;
    return _DirectorMgr;
}(zmg_mgr.BaseMgr));

var DirectorEvent = /** @class */ (function (_super) {
    __extends(DirectorEvent, _super);
    function DirectorEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DirectorEvent;
}($DirectorEvent));
var DirectorMgr = _DirectorMgr.getInstance();

exports.DirectorEvent = DirectorEvent;
exports.DirectorMgr = DirectorMgr;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9EaXJlY3RvckV2ZW50LnRzIiwiLi4vLi4vLi4vc3JjL0RpcmVjdG9yTWdyLnRzIiwiLi4vLi4vLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50TmFtZSB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgJERpcmVjdG9yRXZlbnQgZXh0ZW5kcyBjYy5FdmVudCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNDRU5FX0NIQU5HRV9ERVNUT1JZID0gRXZlbnROYW1lLkNPTlRST0xMRVJfQ0hBTkdFX0RFU1RPUlk7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNDRU5FX0NIQU5HRV9TVEFSVCA9IEV2ZW50TmFtZS5DT05UUk9MTEVSX0NIQU5HRV9TVEFSVDtcclxuICAgIHB1YmxpYyBzdGF0aWMgU0NFTkVfQ0hBTkdFX0VORCA9IEV2ZW50TmFtZS5DT05UUk9MTEVSX0NIQU5HRV9FTkQ7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNDRU5FX0NIQU5HRV9QUk9HUkVTUyA9IEV2ZW50TmFtZS5DT05UUk9MTEVSX0NIQU5HRV9QUk9HUkVTUztcclxuICAgIHB1YmxpYyBzdGF0aWMgU0NFTkVfQ0hBTkdFX0ZBSUwgPSBFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfRkFJTDtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIFNPVU5EX0NMT1NFID0gRXZlbnROYW1lLkNPTlRST0xMRVJfU09VTkRfQ0xPU0U7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNPVU5EX09QRU4gPSBFdmVudE5hbWUuQ09OVFJPTExFUl9TT1VORF9PUEVOO1xyXG5cclxuICAgIHB1YmxpYyBwcmVTY2VuZU5hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBuZXh0U2NlbmVOYW1lOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgcGFyYW06IGFueTtcclxuICAgIHB1YmxpYyBwcm9ncmVzczogbnVtYmVyO1xyXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBwcmVTY2VuZU5hbWU/OiBzdHJpbmcsIG5leHRTY2VuZU5hbWU/OiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcih0eXBlLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5wcmVTY2VuZU5hbWUgPSBwcmVTY2VuZU5hbWU7XHJcbiAgICAgICAgdGhpcy5uZXh0U2NlbmVOYW1lID0gbmV4dFNjZW5lTmFtZTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IFJlc0xpc3RlbmVyLCBSZXNNZ3IsIFN5c3RlbUJ1bmRsZU5hbWUgfSBmcm9tIFwiem1nX3Jlc19tZ3JcIjtcclxuaW1wb3J0IHsgRXZlbnRNZ3IsIEV2ZW50TmFtZSB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCJcclxuaW1wb3J0IHsgZ1dhcm4sIGdMb2csIFN0cmluZ1V0aWwgfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuaW1wb3J0IHsgJERpcmVjdG9yRXZlbnQgYXMgRGlyZWN0b3JFdmVudCB9IGZyb20gXCIuL0RpcmVjdG9yRXZlbnRcIjtcclxuaW1wb3J0IHsgQmFzZU1nciB9IGZyb20gXCJ6bWdfbWdyXCI7XHJcbmltcG9ydCB7IEF1ZGlvTWdyIH0gZnJvbSBcInptZ19hdWRpb19tZ3JcIjtcclxuaW1wb3J0IHsgRW52TWdyIH0gZnJvbSBcInptZ19lbnZfbWdyXCI7XHJcbmltcG9ydCB7IENvbmZpZ01nciwgJEVNb2R1bGVUeXBlIH0gZnJvbSBcInptZ19jb25maWdfbWdyXCI7XHJcbmltcG9ydCB7IFVJTGF5ZXIsIFVJTWdyIH0gZnJvbSBcInptZ191aV9tZ3JcIjtcclxuaW1wb3J0IHsgfSBmcm9tIFwiem1nX2NvcmVcIjtcclxuaW1wb3J0IHsgVGltZU1nciB9IGZyb20gXCJ6bWdfdGltZV9tZ3JcIjtcclxuaW1wb3J0IHsgVHJhY2tNb2R1bGUgfSBmcm9tIFwiem1nX3RyYWNrX21nclwiXHJcbmV4cG9ydCBjbGFzcyBfRGlyZWN0b3JNZ3IgZXh0ZW5kcyBCYXNlTWdyIGltcGxlbWVudHMgem1nLklDb250cm9sbGVyTWdyIHtcclxuICAgIGNvbnN0cnVjdG9yKCkgeyBzdXBlcigpIH1cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogX0RpcmVjdG9yTWdyID0gbnVsbFxyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6IF9EaXJlY3Rvck1nciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfRGlyZWN0b3JNZ3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfY2FsbFRpbWUgPSAtMTtcclxuICAgIHByaXZhdGUgX29wZW5MaXN0OiB6bWcuSU9wZW5JdGVtW10gPSBbXVxyXG4gICAgcHJpdmF0ZSBfaXNsb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIF9iZ2NsaXA6IHN0cmluZztcclxuICAgIC8vIHByaXZhdGUgX2lzVmlkZW86IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9pc1dlYnZpZXc6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIF9ub3dCdW5OYW1lOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9ub3dTY2VuZU5hbWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX3BhcmFtOiBhbnk7XHJcbiAgICBwcml2YXRlIF9jZmc6IHptZy5JTW9kdWxlQ29uZmlnO1xyXG4gICAgcHVibGljIGdldCBub3dCdW5OYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vd0J1bk5hbWVcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgbm93Q29uZmlnKCk6IHptZy5JTW9kdWxlQ29uZmlnIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2ZnO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBub3dQYXJhbSgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wYXJhbTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgbm93U2NlbmVOYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vd1NjZW5lTmFtZVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgYmdjbGlwKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5fYmdjbGlwID0gdXJsO1xyXG4gICAgICAgIGlmIChTdHJpbmdVdGlsLmlzVmFsaWQodXJsKSkge1xyXG4gICAgICAgICAgICBSZXNNZ3IubG9hZFJlbW90ZSh1cmwsIG5ldyBSZXNMaXN0ZW5lcih0aGlzLCAoYXNzZXQ6IGNjLkF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgKiDmmK/lkKbkvp3ml6fpnIDopoHmkq3mlL5cclxuICAgICAgICAgICAgICAgICAqIOazqOaEj+i/memHjOmfs+S5kOWKoOi9veWujOavle+8jOWPr+iDveW3sue7j+WIh+aNoui/h+aooeWdl+S6hlxyXG4gICAgICAgICAgICAgICAgICog5omA5Lul6ZyA6KaB6YeN5paw5Yik5patXHJcbiAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgIGlmICh1cmwgPT0gdGhpcy5fYmdjbGlwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEF1ZGlvTWdyLnBsYXlNdXNpYyhhc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKVxyXG5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEF1ZGlvTWdyLnN0b3BBbGxNdXNpYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgYmdjbGlwKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JnY2xpcDtcclxuICAgIH1cclxuICAgIG9wZW5Db25maWcoY2ZnOiB6bWcuSU1vZHVsZUNvbmZpZywgcGFyYW0/OiBvYmplY3QpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdHlwZSA9IGNmZy5tYWluLnR5cGU7XHJcbiAgICAgICAgdGhpcy5iZ2NsaXAgPSBjZmcuYmdjbGlwO1xyXG4gICAgICAgIGxldCB1cGFyYW0gPSBwYXJhbSA/IHBhcmFtIDogdGhpcy5fcGFyYW0gPyB0aGlzLl9wYXJhbSA6IGNmZy5tYWluLnBhcmFtO1xyXG4gICAgICAgIHRoaXMuX3BhcmFtID0gcGFyYW07XHJcbiAgICAgICAgdGhpcy5fY2ZnID0gY2ZnO1xyXG4gICAgICAgIGxldCByYXRpbyA9IGNmZy5mcmFtZVJhdGlvID8gY2ZnLmZyYW1lUmF0aW8gOiBDb25maWdNZ3IudWljb25maWcuZnJhbWVSYXRpbztcclxuICAgICAgICAvL+a3u+WKoOWIh+aNouaXtumVv+mZkOWItlxyXG4gICAgICAgIGlmICh0aGlzLl9jYWxsVGltZSA8IDApIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FsbFRpbWUgPSBUaW1lTWdyLmdldEN1clRpbWUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgY3VyVGltZSA9IFRpbWVNZ3IuZ2V0Q3VyVGltZSgpO1xyXG4gICAgICAgICAgICBpZiAoY3VyVGltZSAtIHRoaXMuX2NhbGxUaW1lIDwgMSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW06IHptZy5JT3Blbkl0ZW0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2ZnOiBjZmcsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW06IHBhcmFtXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcGVuTGlzdC5wdXNoKGl0ZW0pXHJcbiAgICAgICAgICAgICAgICBUaW1lTWdyLmRvVGltZXIoMTAwMCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcGVuTGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBtID0gdGhpcy5fb3Blbkxpc3RbdGhpcy5fb3Blbkxpc3QubGVuZ3RoIC0gMV1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5Db25maWcobS5jZmcsIG0ucGFyYW0pXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgdGhpcywgMSlcclxuICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY2FsbFRpbWUgPSBjdXJUaW1lXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9vcGVuTGlzdCA9IFtdXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJEVNb2R1bGVUeXBlLklGUkFNRTpcclxuICAgICAgICAgICAgICAgIEV2ZW50TWdyLmVtaXQoXCJmcmFtZVJhdGlvQ2hhbmdlXCIsIDEuMCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5XZWJ2aWV3KGNmZy5tYWluLnBhdGgsIHVwYXJhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAkRU1vZHVsZVR5cGUuUFJFRkFCOlxyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5yZXN1bWUoKTtcclxuICAgICAgICAgICAgICAgIEF1ZGlvTWdyLnJlc3VtZUFsbCgpO1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNZ3IuZW1pdChcImZyYW1lUmF0aW9DaGFuZ2VcIiwgcmF0aW8pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuUHJlZmFiKGNmZy5jb2RlLCBjZmcubWFpbi5wYXRoLCB1cGFyYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJEVNb2R1bGVUeXBlLlNDRU5FOlxyXG4gICAgICAgICAgICAgICAgY2MuZ2FtZS5yZXN1bWUoKTtcclxuICAgICAgICAgICAgICAgIEF1ZGlvTWdyLnJlc3VtZUFsbCgpO1xyXG4gICAgICAgICAgICAgICAgRXZlbnRNZ3IuZW1pdChcImZyYW1lUmF0aW9DaGFuZ2VcIiwgcmF0aW8pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuU2NlbmUoY2ZnLmNvZGUsIGNmZy5tYWluLnBhdGgsIHVwYXJhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvcGVuU2NlbmUoYnVuTmFtZTogc3RyaW5nLCBzY2VuZU5hbWU6IHN0cmluZywgcGFyYW0/OiBhbnksIHRyYW5zaXRpb25zOiB7XHJcbiAgICAgICAgY29sb3I6IGNjLkNvbG9yLCBtb3ZpZWNsaXA6IGNjLk5vZGVcclxuICAgIH0gPSBudWxsKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG5vd1NjZW5lOiBzdHJpbmcgPSBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpLm5hbWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLm9uU2NlbmVEZXN0b3J5KG5vd1NjZW5lLCBidW5OYW1lLCBzY2VuZU5hbWUsIHBhcmFtKS5pc1N0b3BwZWQoKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faXNsb2FkaW5nKSB7XHJcbiAgICAgICAgICAgICAgICBnV2FybihcIuWcuuaZr+ato+WcqOWKoOi9vei/h+eoi+S4rVwiKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5faXNsb2FkaW5nID0gdHJ1ZVxyXG4gICAgICAgICAgICBSZXNNZ3IucmVsZWFzZUxpYihTeXN0ZW1CdW5kbGVOYW1lLlJFTU9URSk7XHJcbiAgICAgICAgICAgIGlmICh0cmFuc2l0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgVUlNZ3IuaGlkZUxvYWRpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnV2FybihcIuaJk+W8gEJ1bk5hbWU6XCIgKyBidW5OYW1lICsgXCIgc2NlbmVOYW1lOlwiICsgc2NlbmVOYW1lICsgXCIgXCIgKyBKU09OLnN0cmluZ2lmeShwYXJhbSkpO1xyXG4gICAgICAgICAgICBSZXNNZ3IubG9hZFNjZW5lKGJ1bk5hbWUsIHNjZW5lTmFtZSwgbmV3IFJlc0xpc3RlbmVyKHRoaXMsIChhc3NldHM6IGNjLlNjZW5lQXNzZXQsIGxpc3RlbmVyOiBSZXNMaXN0ZW5lcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zaXRpb25zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgVUlNZ3IudHJhbnNpdGlvbnMucnVuU2NlbmUoYnVuTmFtZSwgc2NlbmVOYW1lLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25TY2VuZVN0YXJ0KG5vd1NjZW5lLCBidW5OYW1lLCBzY2VuZU5hbWUsIHBhcmFtKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25TY2VuZUVuZChub3dTY2VuZSwgYnVuTmFtZSwgc2NlbmVOYW1lLCBwYXJhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgdHJhbnNpdGlvbnMuY29sb3IsIHRyYW5zaXRpb25zLm1vdmllY2xpcCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGdXYXJuKFwi5Zue6LCD5Zy65pmv5omT5byALS0tLS0tLS0tLS0tLS0tXCIsIG5vd1NjZW5lLCBzY2VuZU5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgY2MuZGlyZWN0b3IucnVuU2NlbmUoYXNzZXRzLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25TY2VuZVN0YXJ0KG5vd1NjZW5lLCBidW5OYW1lLCBzY2VuZU5hbWUsIHBhcmFtKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25TY2VuZUVuZChub3dTY2VuZSwgYnVuTmFtZSwgc2NlbmVOYW1lLCBwYXJhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnV2FybihcIiMjIyMjIyMj5Zy65pmv5Yqg6L295aSx6LSlLGJ1bk5hbWU6IFwiICsgYnVuTmFtZSArIFwiIHNjZW5lTmFtZTpcIiArIHNjZW5lTmFtZSArIFwiIyMjIyMjIyNcIik7XHJcbiAgICAgICAgICAgICAgICBsZXQgZXZ0OiBEaXJlY3RvckV2ZW50ID0gbmV3IERpcmVjdG9yRXZlbnQoRGlyZWN0b3JFdmVudC5TQ0VORV9DSEFOR0VfRkFJTCwgbm93U2NlbmUsIHNjZW5lTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBldnQucGFyYW0gPSBwYXJhbTtcclxuICAgICAgICAgICAgICAgIGV2dC5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2lzbG9hZGluZyA9IGZhbHNlXHJcbiAgICAgICAgICAgIH0sIChwYXRoLCBwcm86IG51bWJlciwgdG90YWw6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2dDogRGlyZWN0b3JFdmVudCA9IG5ldyBEaXJlY3RvckV2ZW50KERpcmVjdG9yRXZlbnQuU0NFTkVfQ0hBTkdFX1BST0dSRVNTLCBub3dTY2VuZSwgc2NlbmVOYW1lKTtcclxuICAgICAgICAgICAgICAgIGV2dC5wcm9ncmVzcyA9IE1hdGgucm91bmQoTWF0aC5yb3VuZChwcm8gLyB0b3RhbCkgKiAxMDAwKSAvIDEwMDA7XHJcbiAgICAgICAgICAgICAgICBldnQucGFyYW0gPSBwYXJhbTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDov4fluqbmlYjmnpzliIfmjaLlnLrmma9cclxuICAgICAqIEBwYXJhbSBidW5OYW1lIFxyXG4gICAgICogQHBhcmFtIHBhdGggXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB0cmFuVG9TY2VuZShidW5OYW1lOiBzdHJpbmcsIHNjZW5lTmFtZTogc3RyaW5nLCBwYXJhbT86IGFueSwgY29sb3I/OiBjYy5Db2xvciwgbW92aWVjbGlwPzogY2MuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub3BlblNjZW5lKGJ1bk5hbWUsIHNjZW5lTmFtZSwgcGFyYW0sIHsgY29sb3I6IGNvbG9yLCBtb3ZpZWNsaXA6IG1vdmllY2xpcCB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOinhumikeaSreaUvlxyXG4gICAgICogQHBhcmFtIHVybCBcclxuICAgICAqL1xyXG4gICAgLy8gcHVibGljIG9wZW5WaWRlbyh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgLy8gICAgIC8vIHRoaXMub3BlblNjZW5lKHZpZGVvLmJ1bk5hbWUsIHZpZGVvLnNjZW5lLCB7IHVybDogdXJsLCBidW5OYW1lOiBiYWNrQnVubmFtZSwgc2NlbmU6IGJhY2tTY2VuZU5hbWUgfSk7XHJcbiAgICAvLyAgICAgVUlNZ3IudWlMYXllci5zaG93VmlkZW8odXJsKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICBvcGVuV2Vidmlldyh1cmw6IHN0cmluZywgcGFyYW1zPzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgcGFyYW1zID0gKFN0cmluZ1V0aWwuaXNWYWxpZChwYXJhbXMpID8gcGFyYW1zICsgXCImXCIgOiBcIlwiKSArIFN0cmluZ1V0aWwuZ2V0UXVlcnkoe1xyXG4gICAgICAgICAgICB1c2VySWQ6IEVudk1nci5nZXRVc2VySWQoKSxcclxuICAgICAgICAgICAgdG9rZW46IEVudk1nci5nZXRUb2tlbigpLFxyXG4gICAgICAgICAgICBkZXZpY2U6IEVudk1nci5nZXRFbnZEYXRhKCkuZGV2aWNlLFxyXG4gICAgICAgICAgICBhcHBWZXJzaW9uOiBFbnZNZ3IuZ2V0QXBwVmVyc2lvbigpLFxyXG4gICAgICAgICAgICBtc2dTZW5kTW9kbGU6IFwicG9zdFwiLFxyXG4gICAgICAgICAgICBlbnY6IEVudk1nci5nZXRFbnYoKSxcclxuICAgICAgICAgICAgbWljOiBBdWRpb01nci5pc011aXNjUGxheWluZyxcclxuICAgICAgICB9KTtcclxuICAgICAgICAvL+WOn+eUn+mcgOimgei/meS4quWtl+aute+8jGg15LiN6ZyA6KaB6L+Z5Liq5a2X5q61XHJcbiAgICAgICAgLy8gd2ViUmVuZGVyOiBmYWxzZSxcclxuICAgICAgICBpZiAodXJsLmluZGV4T2YoXCI/XCIpID09IC0xKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybCArIFwiP1wiICsgcGFyYW1zO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHVybCA9IHVybCArIFwiJlwiICsgcGFyYW1zO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgd2Vidmlldzogem1nLklXZWJWaWV3QXNzZXQgPSBDb25maWdNZ3IuZ2V0V2Vidmlld0NvbmZpZygpO1xyXG4gICAgICAgIHRoaXMub3BlblNjZW5lKHdlYnZpZXcuYnVuTmFtZSwgd2Vidmlldy5zY2VuZSwgdXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBvcGVuUHJlZmFiKGJ1bk5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBwYXJhbT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIFJlc01nci5sb2FkKGJ1bk5hbWUsIHBhdGgsIG5ldyBSZXNMaXN0ZW5lcih0aGlzLCAoYXNzZXRzOiBjYy5QcmVmYWIsIGxpczogUmVzTGlzdGVuZXIpID0+IHtcclxuICAgICAgICAgICAgZ0xvZyhcIi0tLS0tLS0tLS0tLS0tLS0tUHJlZmFi5p6E6YCg5Ye95pWw6L+Q6KGM5a6M5q+VLS0tLS0tLS0tLS0tLS0tXCIpO1xyXG4gICAgICAgICAgICBsZXQgbm9kZSA9IGNjLmluc3RhbnRpYXRlKGFzc2V0cylcclxuICAgICAgICAgICAgbGV0IGNvbXMgPSBub2RlLmdldENvbXBvbmVudHMoY2MuQ29tcG9uZW50KVxyXG4gICAgICAgICAgICBjb21zLmZvckVhY2goZWxlbWVudCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZWxlbWVudFsnaW5pdCddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbWVudFsnaW5pdCddKHBhcmFtKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuYWRkQ2hpbGQoY2MuaW5zdGFudGlhdGUoYXNzZXRzKSk7XHJcbiAgICAgICAgfSwgKHBhdGg6IHN0cmluZywgbGlzdGVuZXI/OiB6bWcuSVJlc0xpc3RlbmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGdXYXJuKFwi5b2T5YmN6aKE5Yi25L2T5Yqg6L295aSx6LSlLGJ1bk5hbWU6IFwiICsgYnVuTmFtZSArIFwiIHBhdGg6XCIgKyBwYXRoKTtcclxuICAgICAgICAgICAgbGV0IGV2dDogRGlyZWN0b3JFdmVudCA9IG5ldyBEaXJlY3RvckV2ZW50KERpcmVjdG9yRXZlbnQuU0NFTkVfQ0hBTkdFX0ZBSUwsKTtcclxuICAgICAgICAgICAgZXZ0LnBhcmFtID0gcGFyYW07XHJcbiAgICAgICAgICAgIGV2dC5wcm9ncmVzcyA9IDA7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgICAgIH0pLCBjYy5QcmVmYWIpO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgLy8gRXZlbnRNZ3Iub24oRXZlbnROYW1lLlVJX0JBQ0tfQlROLCB0aGlzLm9uVUlCYWNrQnRuLCB0aGlzLCBmYWxzZSwgMSk7XHJcbiAgICAgICAgLy8gRXZlbnRNZ3Iub24oRGlyZWN0b3JFdmVudC5WSURFT19DTE9TRSwgdGhpcy52aWRlb0Nsb3NlLCB0aGlzLCBmYWxzZSwgMSk7XHJcbiAgICB9XHJcbiAgICBkZXN0cm95KCkge1xyXG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcclxuICAgICAgICAvLyBFdmVudE1nci5vZmYoRXZlbnROYW1lLlVJX0JBQ0tfQlROLCB0aGlzLm9uVUlCYWNrQnRuLCB0aGlzKTtcclxuICAgICAgICAvLyBFdmVudE1nci5vZmYoRGlyZWN0b3JFdmVudC5WSURFT19DTE9TRSwgdGhpcy52aWRlb0Nsb3NlLCB0aGlzKTtcclxuICAgIH1cclxuICAgIC8vIHByaXZhdGUgdmlkZW9DbG9zZSgpOiB2b2lkIHtcclxuICAgIC8vICAgICBsZXQgdmlkZW86IGNjLlZpZGVvUGxheWVyID0gY2MuQ2FudmFzLmluc3RhbmNlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuVmlkZW9QbGF5ZXIpO1xyXG4gICAgLy8gICAgIGxldCBidW5OYW1lID0gdmlkZW9bXCJidW5OYW1lXCJdO1xyXG4gICAgLy8gICAgIGxldCBzY2VuZSA9IHZpZGVvW1wic2NlbmVcIl07XHJcbiAgICAvLyAgICAgaWYgKFN0cmluZ1V0aWwuaXNWYWxpZChidW5OYW1lKSAmJiBTdHJpbmdVdGlsLmlzVmFsaWQoc2NlbmUpKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMub3BlblNjZW5lKGJ1bk5hbWUsIHNjZW5lKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICAvLyBwcml2YXRlIG9uVUlCYWNrQnRuKGV2dDogVUlCYWNrRXZlbnQpOiB2b2lkIHtcclxuICAgIC8vICAgICBpZiAodGhpcy5pc1ZpZGVvU2NlbmUoKSkge1xyXG4gICAgLy8gICAgICAgICBsZXQgZXZ0MiA9IG5ldyBEaXJlY3RvckV2ZW50KERpcmVjdG9yRXZlbnQuVklERU9fQ0xPU0UpO1xyXG4gICAgLy8gICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZ0Mik7XHJcbiAgICAvLyAgICAgICAgIGV2dFtcInN0b3BwZWRcIl0oKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3VyQ2FudmFzKCk6IGNjLk5vZGUge1xyXG4gICAgICAgIHJldHVybiBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY3VyU2VuY2UoKTogY2MuU2NlbmUge1xyXG4gICAgICAgIHJldHVybiBjYy5kaXJlY3Rvci5nZXRTY2VuZSgpXHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHVibGljIGlzVmlkZW9TY2VuZSgpOiBib29sZWFuIHtcclxuICAgIC8vICAgICByZXR1cm4gdGhpcy5faXNWaWRlbztcclxuICAgIC8vIH1cclxuICAgIHB1YmxpYyBpc1dlYnZpZXdTY2VuZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNXZWJ2aWV3O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIOWcuuaZr+WIh+aNouW8gOWni+WkhOeQhuWHveaVsFxyXG4gICAgKi9cclxuICAgIHByaXZhdGUgb25TY2VuZVN0YXJ0KG5vd1NjZW5lOiBzdHJpbmcsIGJ1bk5hbWU6IHN0cmluZywgc2NlbmVOYW1lOiBzdHJpbmcsIHBhcmFtPzogYW55KTogRGlyZWN0b3JFdmVudCB7XHJcbiAgICAgICAgVHJhY2tNb2R1bGUuZXh0UGFyYW0gPSB7fVxyXG4gICAgICAgIGxldCBldnQ6IERpcmVjdG9yRXZlbnQgPSBuZXcgRGlyZWN0b3JFdmVudChEaXJlY3RvckV2ZW50LlNDRU5FX0NIQU5HRV9TVEFSVCwgbm93U2NlbmUsIHNjZW5lTmFtZSk7XHJcbiAgICAgICAgZXZ0LnBhcmFtID0gcGFyYW07XHJcbiAgICAgICAgZXZ0LnByb2dyZXNzID0gMTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgICAgICBnTG9nKFwiPT09PT09PT3lnLrmma/liIfmjaLor7fmsYLlvIDlp4tcIiArIFwiIHNjZW5lTmFtZTogXCIgKyBub3dTY2VuZSArIFwiPT09PT09PT09PT09PT09PT09PT1cIik7XHJcbiAgICAgICAgcmV0dXJuIGV2dDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25TY2VuZURlc3Rvcnkobm93U2NlbmU6IHN0cmluZywgYnVuTmFtZTogc3RyaW5nLCBzY2VuZU5hbWU6IHN0cmluZywgcGFyYW0/OiBhbnkpOiBEaXJlY3RvckV2ZW50IHtcclxuICAgICAgICAvLyBsZXQgdmlkZW86IHptZy5JVmlkZW9Bc3NldCA9IENvbmZpZ01nci5nZXRWaWRlb0NvbmZpZygpO1xyXG4gICAgICAgIGxldCB3ZWJ2aWV3OiB6bWcuSVZpZGVvQXNzZXQgPSBDb25maWdNZ3IuZ2V0VmlkZW9Db25maWcoKTtcclxuICAgICAgICAvLyBpZiAodGhpcy5fbm93U2NlbmVOYW1lID09IHZpZGVvLnNjZW5lICYmIHRoaXMuX25vd0J1bk5hbWUgPT0gdmlkZW8uYnVuTmFtZSkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLmRlc3Ryb3lWaWRlbygpO1xyXG4gICAgICAgIC8vIH0gZWxzZSBcclxuICAgICAgICBpZiAodGhpcy5fbm93U2NlbmVOYW1lID09IHdlYnZpZXcuc2NlbmUgJiYgdGhpcy5fbm93QnVuTmFtZSA9PSB3ZWJ2aWV3LmJ1bk5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5kZXN0cm95V2VidmlldygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZXZ0OiBEaXJlY3RvckV2ZW50ID0gbmV3IERpcmVjdG9yRXZlbnQoRGlyZWN0b3JFdmVudC5TQ0VORV9DSEFOR0VfREVTVE9SWSwgbm93U2NlbmUsIHNjZW5lTmFtZSk7XHJcbiAgICAgICAgZXZ0LnBhcmFtID0gcGFyYW07XHJcbiAgICAgICAgZXZ0LnByb2dyZXNzID0gMTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgICAgICBnTG9nKFwiPT09PT09PT3plIDmr4HlnLrmma9cIiArIFwiIHNjZW5lTmFtZTogXCIgKyBub3dTY2VuZSArIFwiPT09PT09PT09PT09PT09PT09PT1cIik7XHJcbiAgICAgICAgcmV0dXJuIGV2dDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Zy65pmv5YiH5o2i5a6M5q+V5aSE55CG5Ye95pWwXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgb25TY2VuZUVuZChub3dTY2VuZTogc3RyaW5nLCBidW5OYW1lOiBzdHJpbmcsIHNjZW5lTmFtZTogc3RyaW5nLCBwYXJhbT86IGFueSk6IERpcmVjdG9yRXZlbnQge1xyXG4gICAgICAgIHRoaXMuX2lzV2VidmlldyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2lzbG9hZGluZyA9IGZhbHNlXHJcbiAgICAgICAgbGV0IHdlYnZpZXc6IHptZy5JV2ViVmlld0Fzc2V0ID0gQ29uZmlnTWdyLmdldFdlYnZpZXdDb25maWcoKTtcclxuICAgICAgICBpZiAoc2NlbmVOYW1lID09IHdlYnZpZXcuc2NlbmUgJiYgYnVuTmFtZSA9PSB3ZWJ2aWV3LmJ1bk5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNXZWJ2aWV3ID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5pbml0V2VidmlldyhwYXJhbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX25vd0J1bk5hbWUgPSBidW5OYW1lO1xyXG4gICAgICAgIHRoaXMuX25vd1NjZW5lTmFtZSA9IHNjZW5lTmFtZTtcclxuICAgICAgICBsZXQgZXZ0OiBEaXJlY3RvckV2ZW50ID0gbmV3IERpcmVjdG9yRXZlbnQoRGlyZWN0b3JFdmVudC5TQ0VORV9DSEFOR0VfRU5ELCBub3dTY2VuZSwgc2NlbmVOYW1lKTtcclxuICAgICAgICBldnQucGFyYW0gPSBwYXJhbTtcclxuICAgICAgICBldnQucHJvZ3Jlc3MgPSAxO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgICAgIGdMb2coXCI9PT09PT09PeWcuuaZr+WIh+aNouivt+axgue7k+adn1wiICsgXCJidW5OYW1lOlwiICsgYnVuTmFtZSArIFwiIHNjZW5lTmFtZTogXCIgKyBzY2VuZU5hbWUgKyBcIj09PT09PT09PVwiKTtcclxuICAgICAgICByZXR1cm4gZXZ0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRpc3BhdGNoRXZlbnQoZXZ0OiBjYy5FdmVudCkge1xyXG4gICAgICAgIEV2ZW50TWdyLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgICAgICBzdXBlci5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHBhcmFtIOinhumikeWcuuaZr+WIneWni+WMllxyXG4gICAgICovXHJcbiAgICAvLyBwcml2YXRlIGluaXRWaWRlbyhwYXJhbT86IGFueSk6IHZvaWQge1xyXG4gICAgLy8gICAgIGlmICghcGFyYW0pIHtcclxuICAgIC8vICAgICAgICAgZ1dhcm4oXCLop4bpopHlnLDlnYDkuLrnqbrvvIzml6Dms5Xov5vooYzmkq3mlL4hXCIpO1xyXG4gICAgLy8gICAgICAgICByZXR1cm47XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGxldCB2aWRlbzogY2MuVmlkZW9QbGF5ZXIgPSBjYy5DYW52YXMuaW5zdGFuY2UuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5WaWRlb1BsYXllcik7XHJcbiAgICAvLyAgICAgdmlkZW8ucmVzb3VyY2VUeXBlID0gY2MuVmlkZW9QbGF5ZXIuUmVzb3VyY2VUeXBlLlJFTU9URTtcclxuICAgIC8vICAgICB2aWRlby5yZW1vdGVVUkwgPSBwYXJhbS51cmw7XHJcbiAgICAvLyAgICAgdmlkZW9bXCJidW5OYW1lXCJdID0gcGFyYW0uYnVuTmFtZTtcclxuICAgIC8vICAgICB2aWRlb1tcInNjZW5lXCJdID0gcGFyYW0uc2NlbmU7XHJcbiAgICAvLyAgICAgLy8gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUub25jZShEaXJlY3RvckV2ZW50LlZJREVPX0NMT1NFLCAoKSA9PiB7XHJcbiAgICAvLyAgICAgLy8gICAgIGxldCBldnQgPSBuZXcgRGlyZWN0b3JFdmVudChEaXJlY3RvckV2ZW50LlZJREVPX0NMT1NFKTtcclxuICAgIC8vICAgICAvLyAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgICAvLyAgICAgLy8gfSwgdGhpcywgZmFsc2UpO1xyXG5cclxuICAgIC8vICAgICAvLyBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS5vbihEaXJlY3RvckV2ZW50LlNPVU5EX0NMT1NFLCAoKSA9PiB7XHJcbiAgICAvLyAgICAgLy8gICAgIGxldCBldnQgPSBuZXcgRGlyZWN0b3JFdmVudChEaXJlY3RvckV2ZW50LlNPVU5EX0NMT1NFKTtcclxuICAgIC8vICAgICAvLyAgICAgRXZlbnRNZ3IuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgLy8gICAgIC8vICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgIC8vICAgICAvLyB9LCB0aGlzLCBmYWxzZSk7XHJcblxyXG4gICAgLy8gICAgIC8vIGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLm9uKERpcmVjdG9yRXZlbnQuU09VTkRfT1BFTiwgKCkgPT4ge1xyXG4gICAgLy8gICAgIC8vICAgICBsZXQgZXZ0ID0gbmV3IERpcmVjdG9yRXZlbnQoRGlyZWN0b3JFdmVudC5TT1VORF9PUEVOKTtcclxuICAgIC8vICAgICAvLyAgICAgRXZlbnRNZ3IuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgLy8gICAgIC8vICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgIC8vICAgICAvLyB9LCB0aGlzLCBmYWxzZSk7XHJcbiAgICAvLyAgICAgLy8gdmlkZW8ucGxheSgpO1xyXG4gICAgLy8gfVxyXG4gICAgcHJpdmF0ZSBkZXN0cm95VmlkZW8oKTogdm9pZCB7XHJcbiAgICAgICAgZ0xvZyhcIua4hemZpOinhumikee7hOS7tlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGRlc3Ryb3lXZWJ2aWV3KCk6IHZvaWQge1xyXG4gICAgICAgIGdMb2coXCLmuIXpmaR3ZWJ2aWV357uE5Lu2XCIpO1xyXG4gICAgICAgIGxldCB3ZWJ2aWV3OiBjYy5XZWJWaWV3ID0gY2MuQ2FudmFzLmluc3RhbmNlLmdldENvbXBvbmVudEluQ2hpbGRyZW4oY2MuV2ViVmlldyk7XHJcbiAgICAgICAgd2Vidmlldy5ub2RlLm9mZihcImVycm9yXCIsIHRoaXMub25XZWJWaWV3RXJyb3IsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICB3ZWJ2aWV3Lm5vZGUub2ZmKFwibG9hZGVkXCIsIHRoaXMub25XZWJWaWV3TG9hZGVkLCB0aGlzLCBmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBwYXJhbSB3ZWJ2aWV35Zy65pmv5Yid5aeL5YyWXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaW5pdFdlYnZpZXcocGFyYW0/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXBhcmFtKSB7XHJcbiAgICAgICAgICAgIGdXYXJuKFwid2Vidmlld+WcsOWdgOS4uuepuu+8jOaXoOazlei/m+ihjOWKoOi9vSFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHdlYnZpZXc6IGNjLldlYlZpZXcgPSBjYy5DYW52YXMuaW5zdGFuY2UuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5XZWJWaWV3KTtcclxuICAgICAgICBpZiAoY2MuaXNWYWxpZCh3ZWJ2aWV3KSkge1xyXG4gICAgICAgICAgICAvLyBpZiAod2Vidmlldy5nZXRJZnJhbWVFbGVtZW50KCkgJiYgd2Vidmlldy5nZXRJZnJhbWVFbGVtZW50KCkuc3R5bGUpIHtcclxuICAgICAgICAgICAgLy8gICAgIHdlYnZpZXcuZ2V0SWZyYW1lRWxlbWVudCgpLnN0eWxlLnpJbmRleCA9IFwiLTFcIjtcclxuICAgICAgICAgICAgLy8gfVxyXG4gICAgICAgICAgICB3ZWJ2aWV3Lm5vZGUub24oXCJlcnJvclwiLCB0aGlzLm9uV2ViVmlld0Vycm9yLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHdlYnZpZXcubm9kZS5vbihcImxvYWRlZFwiLCB0aGlzLm9uV2ViVmlld0xvYWRlZCwgdGhpcywgZmFsc2UpO1xyXG4gICAgICAgICAgICB3ZWJ2aWV3LnVybCA9IHBhcmFtO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdXYXJuKFwi5pyq5om+5Yiwd2Vidmlld+WvueixoeOAglwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uV2ViVmlld0Vycm9yKGU/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGlzdDogc3RyaW5nW10gPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZSkge1xyXG4gICAgICAgICAgICBsaXN0LnB1c2goXCJrZXk6XCIgKyBrZXkgKyBcIiB2YWx1ZTpcIiArIGVba2V5XSArIFwiIFwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ1dhcm4oXCJ3ZWJ2aWV35Yqg6L296ZSZ6K+vXCIsIGxpc3QpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbldlYlZpZXdMb2FkZWQoZT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGdMb2coXCJ3ZWJ2aWV3IGxvYWRlZCFcIik7XHJcbiAgICAgICAgY2MuZ2FtZS5wYXVzZSgpO1xyXG4gICAgICAgIEF1ZGlvTWdyLnN0b3BBbGwoKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgX0RpcmVjdG9yTWdyIH0gZnJvbSBcIi4vRGlyZWN0b3JNZ3JcIjtcclxuaW1wb3J0IHsgJERpcmVjdG9yRXZlbnQgfSBmcm9tIFwiLi9EaXJlY3RvckV2ZW50XCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgRGlyZWN0b3JFdmVudCBleHRlbmRzICREaXJlY3RvckV2ZW50IHsgfVxyXG5cclxuZXhwb3J0IGxldCBEaXJlY3Rvck1nciA9IF9EaXJlY3Rvck1nci5nZXRJbnN0YW5jZSgpIl0sIm5hbWVzIjpbIkV2ZW50TmFtZSIsIlN0cmluZ1V0aWwiLCJSZXNNZ3IiLCJSZXNMaXN0ZW5lciIsIkF1ZGlvTWdyIiwiQ29uZmlnTWdyIiwiVGltZU1nciIsIiRFTW9kdWxlVHlwZSIsIkV2ZW50TWdyIiwiZ1dhcm4iLCJTeXN0ZW1CdW5kbGVOYW1lIiwiVUlNZ3IiLCJEaXJlY3RvckV2ZW50IiwiRW52TWdyIiwiZ0xvZyIsIlRyYWNrTW9kdWxlIiwiQmFzZU1nciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUE7SUFBb0Msa0NBQVE7SUFjeEMsd0JBQVksSUFBWSxFQUFFLFlBQXFCLEVBQUUsYUFBc0I7UUFBdkUsWUFDSSxrQkFBTSxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBR3JCO1FBRkcsS0FBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsS0FBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7O0tBQ3RDO0lBakJhLG1DQUFvQixHQUFHQSx1QkFBUyxDQUFDLHlCQUF5QixDQUFDO0lBQzNELGlDQUFrQixHQUFHQSx1QkFBUyxDQUFDLHVCQUF1QixDQUFDO0lBQ3ZELCtCQUFnQixHQUFHQSx1QkFBUyxDQUFDLHFCQUFxQixDQUFDO0lBQ25ELG9DQUFxQixHQUFHQSx1QkFBUyxDQUFDLDBCQUEwQixDQUFDO0lBQzdELGdDQUFpQixHQUFHQSx1QkFBUyxDQUFDLHNCQUFzQixDQUFDO0lB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
