'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_util = require('zmg_util');
var zmg_config_mgr = require('zmg_config_mgr');
var zmg_mgr = require('zmg_mgr');

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

var $DragonResAsset = /** @class */ (function () {
    function $DragonResAsset(dir, asset, tex) {
        if (asset && tex) {
            this.atlas = dir;
            this.asset = asset;
            this.tex = tex;
        }
        else {
            this.dir = dir;
        }
    }
    $DragonResAsset.prototype.isDir = function () {
        return zmg_util.StringUtil.isValid(this.dir);
    };
    return $DragonResAsset;
}());

var $ResUtil = /** @class */ (function () {
    function $ResUtil() {
    }
    $ResUtil.isValidAsset = function (asset) {
        if (asset instanceof Array) {
            var i = void 0;
            var len = asset.length;
            for (i = 0; i < len; i++) {
                if (!asset[i] || !asset[i].isValid || !asset[i].loaded) {
                    return false;
                }
            }
        }
        else {
            if (!asset || !asset.isValid || !asset.loaded) {
                return false;
            }
        }
        return true;
    };
    $ResUtil.setPremultiplyAlpha = function (asset) {
        if (asset instanceof Array) {
            var i = void 0;
            var len = asset.length;
            for (i = 0; i < len; i++) {
                if (asset[i] instanceof cc.SceneAsset) {
                    return;
                }
                if (asset[i] instanceof cc.Texture2D) {
                    var t = asset[i];
                    t.width && t.height && t.setPremultiplyAlpha(true);
                }
            }
        }
        else if (asset instanceof cc.Texture2D) {
            asset.width && asset.height && asset.setPremultiplyAlpha(true);
        }
    };
    return $ResUtil;
}());

var $ResListener = /** @class */ (function () {
    function $ResListener(target, onLaunch, errorBack, progressFun) {
        this.target = target;
        this.launchFun = onLaunch;
        this.errorFun = errorBack;
        this.progressFun = progressFun;
    }
    $ResListener.prototype.clone = function () {
        var result = new $ResListener(this.target, this.launchFun, this.errorFun, this.progressFun);
        result.bunName = this.bunName;
        result.path = this.path;
        result.libs = this.libs;
        result.isDir = this.isDir;
        return result;
    };
    Object.defineProperty($ResListener.prototype, "path", {
        get: function () {
            return this._path;
        },
        set: function (value) {
            this._path = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
    * 完成后函数调用
    */
    $ResListener.prototype.onLaunch = function (asset) {
        if (!cc.isValid(this.target, true)) {
            //节点已被销毁
            zmg_util.gWarn("节点已被销毁，不进行加载回调！", this.target ? this.target.name : "");
            return null;
        }
        if (!this.launchFun) {
            return null;
        }
        var assets = asset ? asset : this.getAsset();
        if (assets) {
            this.launchFun.call(this.target, assets, this);
        }
        return null;
    };
    /**
    * 报错后函数调用
    */
    $ResListener.prototype.onError = function (errorPath) {
        if (cc.isValid(this.target, true) && this.errorFun) {
            this.errorFun.call(this.target, errorPath, this);
            return true;
        }
        return false;
    };
    /**
     * 进度中函数调用
     */
    $ResListener.prototype.onProgress = function (path, pro, total) {
        if (cc.isValid(this.target, true) && this.progressFun) {
            this.progressFun.call(this.target, path, pro, total, this);
            return true;
        }
        return false;
    };
    $ResListener.prototype.isValid = function () {
        if (!cc.isValid(this.target, true)) {
            //节点已被销毁
            return false;
        }
        var lib = this.libs;
        var asset;
        if (this.path instanceof Array) {
            var i = void 0;
            var len = this.path.length;
            for (i = 0; i < len; i++) {
                asset = lib.getAsset(this.path[i], this.isDir);
                if (!$ResUtil.isValidAsset(asset)) {
                    return false;
                }
            }
        }
        else {
            asset = lib.getAsset(this.path, this.isDir);
            if (!$ResUtil.isValidAsset(asset)) {
                return false;
            }
        }
        return true;
    };
    $ResListener.prototype.isLoaded = function () {
        if (!cc.isValid(this.target, true)) {
            //节点已被销毁
            return false;
        }
        var lib = this.libs;
        if (this.path instanceof Array) {
            var i = void 0;
            var len = this.path.length;
            for (i = 0; i < len; i++) {
                if (!lib.getAsset(this.path[i], this.isDir)) {
                    return false;
                }
            }
        }
        else {
            if (!lib.getAsset(this.path, this.isDir)) {
                return false;
            }
        }
        return true;
    };
    $ResListener.prototype.getAsset = function () {
        // let lib: ResCacheLib = ResMgr.getCacheLib(this.bunName);
        var lib = this.libs;
        var assets;
        if (this.path instanceof Array) {
            var i = void 0;
            assets = [];
            var len = this.path.length;
            for (i = 0; i < len; i++) {
                var item = lib.getAsset(this.path[i], this.isDir);
                if (!$ResUtil.isValidAsset(item)) {
                    //this.onError(this.path[i]);
                    return null;
                }
                assets = assets.concat(item);
            }
        }
        else {
            assets = lib.getAsset(this.path, this.isDir);
            if (!$ResUtil.isValidAsset(assets)) {
                //this.onError(this.path);
                return null;
            }
        }
        return assets;
    };
    return $ResListener;
}());

var $ResEvent = /** @class */ (function (_super) {
    __extends($ResEvent, _super);
    function $ResEvent(type, bunName, path, assets) {
        var _this = _super.call(this, type, false) || this;
        _this.bunName = bunName;
        _this.errorPath = path;
        _this.path = path;
        _this.assets = assets;
        return _this;
    }
    return $ResEvent;
}(cc.Event));

var $EResEventName;
(function ($EResEventName) {
    /**
     * 完成
     */
    $EResEventName["COMPLETE"] = "complete";
    $EResEventName["DRAGON_COMPLETE"] = "dragonComplete";
    /**
     * 进度
     */
    $EResEventName["PROGRESS"] = "progress";
    /**
     * 下载错误
     */
    $EResEventName["ERROR"] = "error";
    $EResEventName["DRAGON_ERROR"] = "dragonError";
})($EResEventName || ($EResEventName = {}));

var $DragonResListener = /** @class */ (function (_super) {
    __extends($DragonResListener, _super);
    function $DragonResListener(target, onLaunch, errorBack, progressFun) {
        return _super.call(this, target, onLaunch, errorBack, progressFun) || this;
    }
    Object.defineProperty($DragonResListener.prototype, "path", {
        get: function () {
            return this._path;
        },
        set: function (value) {
            if (!this.source) {
                this.source = new $DragonResAsset("");
            }
            if (value instanceof Array) {
                this.source.asset = value[0];
                this.source.atlas = value[1];
                this.source.tex = value[2];
            }
            else {
                this.source.dir = value;
            }
            this._path = value;
        },
        enumerable: false,
        configurable: true
    });
    $DragonResListener.prototype.onLaunch = function (assets) {
        if (!cc.isValid(this.target)) {
            //节点已被销毁
            return null;
        }
        assets = assets ? assets : this.getAsset();
        var bool;
        var evt;
        var dragAsset = new zmg_util.DragonAsset();
        if (assets) {
            if (this.source.isDir()) {
                bool = dragAsset.initByAsset(assets);
            }
            else {
                bool = dragAsset.initRemoteAsset(assets[0], assets[1], assets[2]);
            }
        }
        if (bool) {
            evt = new $ResEvent($EResEventName.DRAGON_COMPLETE, this.bunName, this.path, dragAsset);
            if (this.launchFun) {
                this.launchFun.call(this.target, dragAsset, this);
            }
        }
        else {
            evt = new $ResEvent($EResEventName.DRAGON_ERROR, this.bunName, this.path);
            this.onError(this.path);
        }
        return evt;
    };
    return $DragonResListener;
}($ResListener));

var $ResAsset = /** @class */ (function () {
    function $ResAsset(bunName, path) {
        this.bunName = bunName;
        this.path = path;
    }
    return $ResAsset;
}());

var _ResErrorAsset = /** @class */ (function (_super) {
    __extends(_ResErrorAsset, _super);
    function _ResErrorAsset() {
        var _this = _super.call(this) || this;
        _this.loaded = false;
        _this.destroy();
        return _this;
    }
    _ResErrorAsset.create = function () {
        return new _ResErrorAsset();
    };
    return _ResErrorAsset;
}(cc.Asset));
var ResErrorAsset = _ResErrorAsset.create();

var ECode = /** @class */ (function () {
    function ECode() {
    }
    ECode.DOWN_BUNDLE_ERROR = "bunName:{resources} Path:{timg1}  Reasons:{res}";
    return ECode;
}());

var _SystemBundleName = /** @class */ (function () {
    function _SystemBundleName() {
    }
    // private static _instance: _SystemBundleName;
    // static getInstance(): _SystemBundleName {
    //     if (!this._instance) {
    //         this._instance = new _SystemBundleName();
    //     }
    //     return this._instance;
    // }
    /**
     * 远程资源
     */
    _SystemBundleName.REMOTE = "remote";
    /**
     * 本地资源
     */
    // public static RESOURCES = "resources";
    _SystemBundleName.STACK = "stack";
    /**
     * 配置数据
     */
    _SystemBundleName.CONFIG = "config";
    _SystemBundleName.UI = "ui";
    return _SystemBundleName;
}());

var $ResCacheLib = /** @class */ (function (_super) {
    __extends($ResCacheLib, _super);
    function $ResCacheLib(bunName) {
        var _this = _super.call(this) || this;
        _this.bunName = bunName;
        return _this;
    }
    Object.defineProperty($ResCacheLib.prototype, "name", {
        get: function () {
            return this.bunName;
        },
        enumerable: false,
        configurable: true
    });
    $ResCacheLib.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this._bundle) {
                    return [2 /*return*/, Promise.resolve()];
                }
                else {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            _this.loadBundle().then(function (b) {
                                _this._bundle = b;
                                resolve && resolve();
                            }, function () {
                                zmg_util.gLog("当前bundle初始化失败:" + _this.bunName);
                                reject && reject();
                            });
                        })];
                }
            });
        });
    };
    $ResCacheLib.prototype.release = function () {
        this.clear();
    };
    $ResCacheLib.prototype.isRemote = function () {
        return this.bunName == _SystemBundleName.REMOTE;
    };
    $ResCacheLib.prototype.clear = function () {
        if (this._bundle) {
            this._bundle.releaseAll();
            cc.assetManager.removeBundle(this._bundle);
            cc.js.clearBundle(this._bundle.name);
            this._bundle = null;
        }
    };
    $ResCacheLib.prototype.getBundle = function () {
        return this._bundle;
    };
    /**
     * 有就返回，没有就加载等事件
     * @param path
     */
    $ResCacheLib.prototype.loadAsset = function (path, isDir, type) {
        if (!this._bundle) {
            this.errorBundleFun(path, this.bunName);
            return;
        }
        var assets = this.getAsset(path, isDir);
        if (!assets) {
            this._bundle && this.onLaunch(path, isDir, type, this._bundle);
        }
        else {
            console.log("当前资源已加载");
        }
    };
    $ResCacheLib.prototype.getAsset = function (path, isDir) {
        var assets;
        if (isDir) {
            var infos = this._bundle.getDirWithPath(path);
            var i = void 0;
            var a = void 0;
            assets = [];
            var len = infos.length;
            for (i = 0; i < len; i++) {
                a = this._bundle.getByInfo(infos[i]);
                if (!a) {
                    assets.length = 0;
                    assets = null;
                    break;
                }
                assets.push(a);
            }
        }
        else {
            assets = this._bundle.get(path);
        }
        return assets;
    };
    /**
     * 预处理
     * prefab类型资源需要字体替换
     * 图片类资源需要设置透明度
     * @param path
     * @param asset
     */
    $ResCacheLib.prototype.setAsset = function (path, asset) {
        if (asset instanceof cc.SceneAsset) {
            return;
        }
        if (asset instanceof cc.Prefab) {
            return;
        }
        $ResUtil.setPremultiplyAlpha(asset);
    };
    // public assetHandle(asset: cc.Asset): void {
    //     if (asset instanceof cc.Prefab) {
    //         FontMgr.updateFont(asset);
    //     }
    // }
    $ResCacheLib.prototype.loadBundle = function () {
        var _this = this;
        var bun = cc.assetManager.getBundle(this.bunName);
        if (bun) {
            return Promise.resolve(bun);
        }
        if (this._promise) {
            return this._promise;
        }
        return this._promise = new Promise(function (resolve, reject) {
            cc.assetManager.loadBundle(_this.bunName, null, function (err, bundle) {
                if (err) {
                    reject && reject(_this.bunName);
                }
                else {
                    resolve && resolve(bundle);
                }
                _this._promise = null;
            });
        });
    };
    $ResCacheLib.prototype.errorBundleFun = function (path, bunName) {
        this.setAsset(path, ResErrorAsset);
        this.dispatchEvent(new $ResEvent($EResEventName.ERROR, bunName, path));
    };
    $ResCacheLib.prototype.errorFun = function (path, error) {
        zmg_util.gWarn(zmg_util.$(ECode.DOWN_BUNDLE_ERROR, this.bunName, path, error.message));
        this.setAsset(path, ResErrorAsset);
        this.dispatchEvent(new $ResEvent($EResEventName.ERROR, this.bunName, path));
    };
    $ResCacheLib.prototype.onComplete = function (path, assets) {
        this.setAsset(path, assets);
        this.dispatchEvent(new $ResEvent($EResEventName.COMPLETE, this.bunName, path, assets));
    };
    $ResCacheLib.prototype.onLaunch = function (path, isDir, type, bundle) {
        zmg_util.gLog("开始加载资源：" + this.bunName + " path:" + path);
        // this.setAsset(path, ResLoadingAsset);
        if (isDir) {
            //认为是目录结构    
            if (type) {
                bundle.loadDir(path, type, this._onLaunch.bind(this, path, type));
            }
            else {
                bundle.loadDir(path, this._onLaunch.bind(this, path, null));
            }
        }
        else {
            if (type) {
                if (type == cc.SceneAsset) {
                    bundle.loadScene(path, this._onLoadSceneProgress.bind(this, path), this._onLaunch.bind(this, path, null));
                }
                else {
                    bundle.load(path, type, this._onLoadProgress.bind(this, path), this._onLaunch.bind(this, path, type));
                }
            }
            else {
                bundle.load(path, this._onLoadProgress.bind(this, path), this._onLaunch.bind(this, path, null));
            }
        }
    };
    $ResCacheLib.prototype._onLoadSceneProgress = function (path, finish, total, item) {
        var evt = new $ResEvent($EResEventName.PROGRESS, this.bunName, path);
        evt.finish = finish;
        evt.total = total;
        this.dispatchEvent(evt);
    };
    $ResCacheLib.prototype._onLoadProgress = function (path, finish, total, item) {
        var evt = new $ResEvent($EResEventName.PROGRESS, this.bunName, path);
        evt.finish = finish;
        evt.total = total;
        this.dispatchEvent(evt);
    };
    $ResCacheLib.prototype._onLaunch = function (path, type, err, assets) {
        if (err) {
            this.errorFun(path, err);
            return;
        }
        if (assets instanceof Array && assets.length == 0) {
            this.errorFun(path, new Error("加载数组内容为空"));
            return;
        }
        zmg_util.gLog("资源加载成功：" + this.bunName + " path:" + path);
        var bool = true;
        if (type) {
            if (assets instanceof Array) {
                var i = void 0;
                var len = assets.length;
                for (i = 0; i < len; i++) {
                    if (!(assets[i] instanceof type)) {
                        zmg_util.gWarn("加载进来的数组资源有与内容规定类型不符情况出现：" + assets[i].nativeUrl);
                        bool = false;
                        break;
                    }
                }
            }
            else {
                if (!(assets instanceof type)) {
                    bool = false;
                    zmg_util.gWarn("加载进来的资源有与内容规定类型不符情况出现：" + assets["nativeUrl"]);
                }
            }
        }
        if (bool) {
            this.onComplete(path, assets);
        }
    };
    return $ResCacheLib;
}(cc.EventTarget));

var $BundleCacheLib = /** @class */ (function (_super) {
    __extends($BundleCacheLib, _super);
    function $BundleCacheLib(bunName) {
        return _super.call(this, bunName) || this;
    }
    $BundleCacheLib.prototype.clear = function () {
        if (this._bundle) {
            this._bundle.releaseAll();
            cc.assetManager.removeRemoteBundle(this._bundle);
            this._bundle = null;
        }
    };
    $BundleCacheLib.prototype.getRemoteUrl = function () {
        return zmg_config_mgr.ConfigMgr.bundlePrefix + "/" + this.bunName + "/" + zmg_config_mgr.ConfigMgr.publishKey + "/";
    };
    $BundleCacheLib.prototype.loadBundle = function () {
        var _this = this;
        var bun = cc.assetManager.getBundle(this.bunName);
        if (bun) {
            return Promise.resolve(bun);
        }
        if (this._promise) {
            return this._promise;
        }
        return this._promise = new Promise(function (resolve, reject) {
            var url = _this.getRemoteUrl();
            cc.assetManager.loadRemote(url + zmg_config_mgr.ConfigMgr.bundleFilePath + "?time=" + new Date().valueOf(), function (err, data) {
                //当前版本的描述文件
                if (err) {
                    zmg_util.gWarn("当前模块无版本文件:" + _this.bunName);
                    reject && reject(_this.bunName);
                }
                else {
                    var list = data.json;
                    var i = void 0;
                    var version = "";
                    var len = list.length;
                    for (i = 0; i < len; i++) {
                        if (list[i].checked) {
                            version = list[i].version;
                            break;
                        }
                    }
                    if (version == "") {
                        zmg_util.gWarn("当前模块无版本描述:" + _this.bunName);
                    }
                    cc.assetManager.loadRemoteBundle(url, { version: version }, function (err, bundle) {
                        if (err) {
                            reject && reject(_this.bunName);
                        }
                        else {
                            _this._bundle = bundle;
                            resolve && resolve(bundle);
                        }
                        _this._promise = null;
                    });
                }
            });
        });
    };
    return $BundleCacheLib;
}($ResCacheLib));

var $ResRemoteCacheLib = /** @class */ (function (_super) {
    __extends($ResRemoteCacheLib, _super);
    function $ResRemoteCacheLib() {
        var _this = _super.call(this, _SystemBundleName.REMOTE) || this;
        _this.assetsList = {};
        return _this;
    }
    $ResRemoteCacheLib.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Promise.resolve()];
            });
        });
    };
    $ResRemoteCacheLib.prototype.clear = function () {
    };
    $ResRemoteCacheLib.prototype.setAsset = function (path, asset) {
        if (asset instanceof cc.SceneAsset) {
            return;
        }
        $ResUtil.setPremultiplyAlpha(asset);
        this.assetsList[path] = asset;
    };
    $ResRemoteCacheLib.prototype.getAsset = function (path) {
        var assets = this.assetsList[path];
        if ($ResUtil.isValidAsset(assets)) {
            return assets;
        }
        return null;
    };
    $ResRemoteCacheLib.prototype.loadAsset = function (path, isDir, type) {
        if (!path) {
            zmg_util.gWarn("资源地址未定义，无法加载");
            return;
        }
        if (isDir) {
            zmg_util.gError("远程地址，无法按照文件夹形式下载资源");
            return;
        }
        var key;
        if (type) {
            switch (type) {
                case cc.TextAsset:
                    key = ".txt";
                    break;
                case cc.JsonAsset:
                    key = ".json";
                    break;
                case cc.Texture2D:
                    key = ".png";
                    break;
                case cc.Font:
                    key = ".ttf";
                    break;
            }
        }
        if (key) {
            cc.assetManager.loadRemote(path, { ext: key }, this._onLaunch.bind(this, path, type));
        }
        else {
            cc.assetManager.loadRemote(path, this._onLaunch.bind(this, path, null));
        }
    };
    return $ResRemoteCacheLib;
}($ResCacheLib));

var _ResMgr = /** @class */ (function (_super) {
    __extends(_ResMgr, _super);
    function _ResMgr() {
        var _this = _super.call(this) || this;
        _this._listeners = [];
        _this._libs = {};
        _this.setCacheLib(new $BundleCacheLib(_SystemBundleName.UI));
        _this.setCacheLib(new $BundleCacheLib(_SystemBundleName.STACK));
        _this.setCacheLib(new $BundleCacheLib(_SystemBundleName.CONFIG));
        return _this;
    }
    _ResMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _ResMgr();
        }
        return this._instance;
    };
    _ResMgr.prototype.setCacheLib = function (lib) {
        var old = this._libs[lib.name];
        if (old) {
            old.off($EResEventName.COMPLETE, this.onResComplete, this);
            old.off($EResEventName.PROGRESS, this.onProgress, this);
            old.off($EResEventName.ERROR, this.onResError, this);
        }
        if (lib) {
            lib.on($EResEventName.COMPLETE, this.onResComplete, this, false);
            lib.on($EResEventName.PROGRESS, this.onProgress, this, false);
            lib.on($EResEventName.ERROR, this.onResError, this, false);
        }
        this._libs[lib.name] = lib;
    };
    _ResMgr.prototype.getCacheLib = function (bunName) {
        var lib = this._libs[bunName];
        if (lib) {
            return lib;
        }
        if (bunName == _SystemBundleName.REMOTE) {
            lib = new $ResRemoteCacheLib();
        }
        else {
            var module_1 = zmg_config_mgr.ConfigMgr.getModuleConfigByCode(bunName);
            if (!module_1 || !module_1.isRemote) {
                lib = new $ResCacheLib(bunName);
            }
            else {
                lib = new $BundleCacheLib(bunName);
            }
        }
        this._libs[bunName] = lib;
        lib.on($EResEventName.COMPLETE, this.onResComplete, this, false);
        lib.on($EResEventName.PROGRESS, this.onProgress, this, false);
        lib.on($EResEventName.ERROR, this.onResError, this, false);
        return lib;
    };
    _ResMgr.prototype.start = function () {
    };
    _ResMgr.prototype.destroy = function () {
    };
    _ResMgr.prototype.releaseLib = function (bunName) {
        var lib = this._libs[bunName];
        if (lib) {
            lib.release();
        }
    };
    Object.defineProperty(_ResMgr.prototype, "isValid", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    /**
    * 增加监听者
    * @param listener
    */
    _ResMgr.prototype.addListener = function (listener, libs, bunName, path, isDir) {
        var list = this.initListener(listener, libs, bunName, path, isDir);
        list && this._listeners.push(list);
    };
    _ResMgr.prototype.initListener = function (listener, libs, bunName, path, isDir) {
        if (listener) {
            listener.libs = libs;
            /**
             * 外部可能一个lister监听多个下载回调
             * 所以需要保证克隆出来
             */
            if (listener.path == null) {
                listener.path = path;
            }
            else {
                listener = listener.clone();
                listener.path = path;
            }
            // listener.path = path;
            listener.isDir = isDir;
            listener.bunName = bunName;
        }
        return listener;
    };
    /**
     * 移除监听者
     * @param target
     */
    _ResMgr.prototype.removeLister = function (target) {
    };
    /**
     * 下载资源
     * @param bundle
     * @param path
     * @param listener
     */
    _ResMgr.prototype.load = function (bunName, path, handlerOrListener, target, type) {
        if (handlerOrListener instanceof $ResListener) {
            this.$$load(bunName, path, handlerOrListener, type);
        }
        else {
            this.$load(bunName, path, handlerOrListener, target, type);
        }
    };
    _ResMgr.prototype.$load = function (bunName, path, handler, target, type) {
        this.$$load(bunName, path, new $ResListener(target, handler), type);
    };
    _ResMgr.prototype.$$load = function (bunName, path, listener, type) {
        if (!path) {
            zmg_util.gWarn("资源地址未定义，无法加载文件!");
            return;
        }
        this._load(bunName, path, false, listener, type);
    };
    // public $loadAny(param: zmg.IResAsset | string, handler?: (assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void, target?: any, path?: string, type?: typeof cc.Asset): void {
    //     this.loadAny(param, new ResListener(target, handler), path, type);
    // }
    // loadAny(param: zmg.IResAsset | string, listener?: zmg.IResListener, path?: string, type?: typeof cc.Asset): void {
    //     if (typeof (param) == "string") {
    //         if (StringUtil.isHttp(param)) {
    //             this.loadRemote(param, listener, type);
    //         } else {
    //             this.load(param, path, listener, type);
    //         }
    //     } else {
    //         this.loadRes(param, listener, type);
    //     }
    // }
    /**
     * 下载资源
     * @param res
     * @param handler
     * @param target
     * @param type
     */
    _ResMgr.prototype.loadRes = function (res, handlerOrListener, target, type) {
        if (handlerOrListener instanceof $ResListener) {
            this.$$loadRes(res, handlerOrListener, type);
        }
        else {
            this.$loadRes(res, handlerOrListener, target, type);
        }
    };
    _ResMgr.prototype.$loadRes = function (res, handler, target, type) {
        this.$$loadRes(res, new $ResListener(target, handler), type);
    };
    _ResMgr.prototype.$$loadRes = function (res, listener, type) {
        if (!res || !zmg_util.StringUtil.isValid(res.bunName) || !zmg_util.StringUtil.isValid(res.path)) {
            zmg_util.gWarn("资源不明确，无法加载文件!", res);
            return;
        }
        this._load(res.bunName, res.path, false, listener, type);
    };
    /**
     * 下载场景
     * @param bunName
     * @param path
     * @param handler
     * @param target
     */
    _ResMgr.prototype.loadScene = function (bunName, path, handler, target) {
        if (handler instanceof $ResListener) {
            this.$$loadScene(bunName, path, handler);
        }
        else {
            this.$loadScene(bunName, path, handler, target);
        }
    };
    _ResMgr.prototype.$loadScene = function (bunName, path, handler, target) {
        this.$$loadScene(bunName, path, new $ResListener(target, handler));
    };
    _ResMgr.prototype.$$loadScene = function (bunName, path, listener) {
        if (!path) {
            zmg_util.gWarn("资源地址未定义，无法加载场景!");
            return;
        }
        // let lib: ResCacheLib = this.getCacheLib(bunName);
        // this._loadLunch(bunName, path, false, cc.SceneAsset);
        // this.addListener(listener, lib, bunName, path);
        this._load(bunName, path, false, listener, cc.SceneAsset);
    };
    /**
     * 下载目录内资源
     * @param resName
     * @param path
     * @param listener
     */
    _ResMgr.prototype.loadDir = function (bunName, path, handler, target, type) {
        if (handler instanceof $ResListener) {
            this.$$loadDir(bunName, path, handler, target);
        }
        else {
            this.$loadDir(bunName, path, handler, target, type);
        }
    };
    _ResMgr.prototype.$loadDir = function (bunName, path, handler, target, type) {
        this.$$loadDir(bunName, path, new $ResListener(target, handler), type);
    };
    _ResMgr.prototype.$$loadDir = function (bunName, path, listener, type) {
        if (!path) {
            zmg_util.gWarn("资源地址未定义，无法加载目录!");
            return;
        }
        this._load(bunName, path, true, listener, type);
    };
    /**
     * 下载bundle龙骨资源
     * @param resName
     * @param path
     * @param listener
     */
    _ResMgr.prototype.loadDragon = function (bunName, path, handler, target) {
        if (handler instanceof $DragonResListener) {
            this.$$loadDragon(bunName, path, handler);
        }
        else {
            this.$loadDragon(bunName, path, handler, target);
        }
    };
    _ResMgr.prototype.$loadDragon = function (bunName, path, handler, target) {
        this.$$loadDragon(bunName, path, new $DragonResListener(target, handler));
    };
    _ResMgr.prototype.$$loadDragon = function (bunName, path, listener) {
        if (!path) {
            zmg_util.gWarn("资源地址未定义，无法加载");
            return;
        }
        if (!listener) {
            listener = new $DragonResListener(this, null, null, null);
        }
        if (typeof (path) == "string") {
            path = new $DragonResAsset(path);
        }
        if (path.isDir()) {
            this._load(bunName, path.dir, true, listener);
        }
        else {
            this._load(bunName, [path.asset, path.atlas, path.tex], false, listener);
        }
    };
    /**
     * 下载远程资源
     * @param path
     * @param listener
     */
    _ResMgr.prototype.loadRemote = function (path, handler, target, type) {
        if (handler instanceof $ResListener) {
            this.$$loadRemote(path, handler, type);
        }
        else {
            this.$loadRemote(path, handler, target, type);
        }
    };
    _ResMgr.prototype.$loadRemote = function (path, handler, target, type) {
        this.$$loadRemote(path, new $ResListener(target, handler), type);
    };
    _ResMgr.prototype.$$loadRemote = function (path, listener, type) {
        this._load(_SystemBundleName.REMOTE, path, false, listener, type);
    };
    /**
     * 下载远程龙骨资源
     * @param path
     * @param listener
     */
    _ResMgr.prototype.loadDragonRemote = function (path, handler, target) {
        if (handler instanceof $DragonResListener) {
            this.$$loadDragonRemote(path, handler);
        }
        else {
            this.$loadDragonRemote(path, handler, target);
        }
    };
    _ResMgr.prototype.$loadDragonRemote = function (path, handler, target) {
        this.$$loadDragonRemote(path, new $DragonResListener(target, handler));
    };
    _ResMgr.prototype.$$loadDragonRemote = function (path, listener) {
        if (path.isDir()) {
            zmg_util.gWarn("远程资源无法按照目录加载");
            return;
        }
        this._load(_SystemBundleName.REMOTE, [path.atlas, path.asset, path.tex], false, listener, [cc.TextAsset, cc.TextAsset]);
    };
    _ResMgr.prototype.isVaildAsset = function (bunName, path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        cc.assetManager.loadBundle(bunName, function (err, bundle) {
                            if (err) {
                                zmg_util.gLog("资源下载错误:" + bunName);
                                reject("bunName: " + bunName + " 不存在！");
                            }
                            else {
                                zmg_util.gLog("模块配置表已下载，bundleName: " + bunName);
                                var info = bundle.getInfoWithPath(path);
                                if (info) {
                                    resolve && resolve(info);
                                }
                                else {
                                    reject("bunName: " + bunName + " path:" + path + " 不存在!");
                                }
                            }
                        });
                    })];
            });
        });
    };
    /**
     * 清理所有缓存
     */
    _ResMgr.prototype.clearCache = function () {
    };
    /**
     * 按照bundle清理缓存
     * @param resName
     */
    _ResMgr.prototype.clearBundleCache = function (resName) {
    };
    _ResMgr.prototype._load = function (bunName, path, isDir, listener, type) {
        return __awaiter(this, void 0, void 0, function () {
            var evt, isLoaded, resAsset, lib, i, len, assets, list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isLoaded = true;
                        lib = this.getCacheLib(bunName);
                        return [4 /*yield*/, lib.init()];
                    case 1:
                        _a.sent();
                        if (path instanceof Array) {
                            i = void 0;
                            resAsset = [];
                            len = path.length;
                            for (i = 0; i < len; i++) {
                                assets = lib.getAsset(path[i], isDir);
                                if (cc.isValid(assets)) {
                                    resAsset = resAsset.concat(assets);
                                    evt = new $ResEvent($EResEventName.COMPLETE, bunName, path[i], assets);
                                    this.onResComplete(evt);
                                }
                                else {
                                    if (assets) {
                                        //正在加载中....
                                        //或者其中存在错误资源...
                                        if (assets == ResErrorAsset) {
                                            evt = new $ResEvent($EResEventName.ERROR, bunName, path[i], null);
                                            this.onResError(evt);
                                        }
                                    }
                                    else {
                                        this._loadLunch(bunName, path[i], isDir, (type instanceof Array) ? type[i] : type);
                                        isLoaded = false;
                                    }
                                }
                            }
                        }
                        else {
                            resAsset = lib.getAsset(path, isDir);
                            if (cc.isValid(resAsset)) {
                                evt = new $ResEvent($EResEventName.COMPLETE, bunName, path, resAsset);
                                this.onResComplete(evt);
                            }
                            else {
                                if (resAsset) {
                                    if (resAsset == ResErrorAsset) {
                                        evt = new $ResEvent($EResEventName.ERROR, bunName, path, null);
                                        this.onResError(evt);
                                    }
                                    else {
                                        //资源被销毁，需要重新加载
                                        this._loadLunch(bunName, path, isDir, type);
                                        isLoaded = false;
                                    }
                                }
                                else {
                                    this._loadLunch(bunName, path, isDir, type);
                                    isLoaded = false;
                                }
                            }
                        }
                        if (isLoaded) {
                            list = this.initListener(listener, lib, bunName, path, isDir);
                            list && list.onLaunch();
                        }
                        else {
                            //加载中...
                            this.addListener(listener, lib, bunName, path, isDir);
                            (resAsset instanceof Array) && (resAsset.length = 0);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    _ResMgr.prototype._loadLunch = function (bunName, path, isDir, type) {
        var lib = this.getCacheLib(bunName);
        // let loadAssets: cc.Asset | cc.Asset[];
        // loadAssets = lib.getAsset(path);
        // if (loadAssets) {
        //     //资源已下载完毕
        //     if (cc.isValid(loadAssets)) {
        //         evt = new ResEvent(EResEventName.COMPLETE, bunName, path, loadAssets);
        //         this.onResComplete(evt);
        //     } else {
        //         //非法资源
        //         evt = new ResEvent(EResEventName.ERROR, bunName, path, loadAssets);
        //         this.onResError(evt);
        //     }
        // } else {
        //等待资源下载...
        lib.loadAsset(path, isDir, type);
        // }
    };
    _ResMgr.prototype.onResComplete = function (evt) {
        this.dispatchEvent(evt);
        this.onResLunch(this.findListener(evt.bunName, evt.path, false, true), evt.assets);
    };
    _ResMgr.prototype.onProgress = function (evt) {
        var listners = this.findListener(evt.bunName, evt.path, false, true);
        if (listners) {
            var i = void 0;
            var len = listners.length;
            for (i = 0; i < len; i++) {
                listners[i].onProgress(evt.path, evt.finish, evt.total);
            }
        }
    };
    _ResMgr.prototype.onResError = function (evt) {
        this.dispatchEvent(evt);
        var list = this.findListener(evt.bunName, evt.path, false, true);
        var i;
        var len = list.length;
        for (i = 0; i < len; i++) {
            list[i].onError(evt.path);
        }
    };
    _ResMgr.prototype.onResLunch = function (listeners, asset) {
        var i;
        var listener;
        var len = listeners.length;
        for (i = len - 1; i >= 0; i--) {
            listener = listeners[i];
            if (listener) {
                //全部下载都进行过尝试
                var assets = void 0;
                if ((listener.path instanceof Array)) {
                    var tas = listener.getAsset();
                    if (tas && tas.length == listener.path.length) {
                        assets = tas;
                    }
                }
                else {
                    assets = asset;
                }
                if (assets) {
                    this._listeners.splice(this._listeners.indexOf(listener), 1);
                    var evt = listener.onLaunch(assets);
                    if (evt) {
                        this.dispatchEvent(evt);
                    }
                }
            }
        }
    };
    _ResMgr.prototype.findListener = function (bunName, path, isDelete, isInclude) {
        if (isDelete === void 0) { isDelete = true; }
        if (isInclude === void 0) { isInclude = false; }
        var i;
        var bool;
        var listener;
        var resListener = [];
        var len = this._listeners.length;
        for (i = len - 1; i >= 0; i--) {
            listener = this._listeners[i];
            if (cc.isValid(listener.target)) {
                if (listener.bunName == bunName) {
                    bool = listener.path == path;
                    if (!bool && isInclude) {
                        if (listener.path instanceof Array) {
                            bool = (listener.path.indexOf(path) != -1);
                        }
                    }
                    if (bool) {
                        if (isDelete)
                            this._listeners.splice(i, 1);
                        resListener.push(listener);
                    }
                }
            }
            else {
                this._listeners.splice(i, 1);
                // this.removeLister(listener);
            }
        }
        return resListener;
    };
    return _ResMgr;
}(zmg_mgr.BaseMgr));

var EResEventName = $EResEventName;
var ResAsset = /** @class */ (function (_super) {
    __extends(ResAsset, _super);
    function ResAsset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResAsset;
}($ResAsset));
var ResEvent = /** @class */ (function (_super) {
    __extends(ResEvent, _super);
    function ResEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResEvent;
}($ResEvent));
var ResListener = /** @class */ (function (_super) {
    __extends(ResListener, _super);
    function ResListener() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResListener;
}($ResListener));
var DragonResAsset = /** @class */ (function (_super) {
    __extends(DragonResAsset, _super);
    function DragonResAsset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DragonResAsset;
}($DragonResAsset));
var ResCacheLib = /** @class */ (function (_super) {
    __extends(ResCacheLib, _super);
    function ResCacheLib() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResCacheLib;
}($ResCacheLib));
var BundleCacheLib = /** @class */ (function (_super) {
    __extends(BundleCacheLib, _super);
    function BundleCacheLib() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BundleCacheLib;
}($BundleCacheLib));
var DragonResListener = /** @class */ (function (_super) {
    __extends(DragonResListener, _super);
    function DragonResListener() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DragonResListener;
}($DragonResListener));
var ResUtil = /** @class */ (function (_super) {
    __extends(ResUtil, _super);
    function ResUtil() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResUtil;
}($ResUtil));
var SystemBundleName = _SystemBundleName;
var ResMgr = _ResMgr.getInstance();

exports.BundleCacheLib = BundleCacheLib;
exports.DragonResAsset = DragonResAsset;
exports.DragonResListener = DragonResListener;
exports.EResEventName = EResEventName;
exports.ResAsset = ResAsset;
exports.ResCacheLib = ResCacheLib;
exports.ResEvent = ResEvent;
exports.ResListener = ResListener;
exports.ResMgr = ResMgr;
exports.ResUtil = ResUtil;
exports.SystemBundleName = SystemBundleName;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hc3NldHMvRHJhZ29uUmVzQXNzZXQudHMiLCIuLi8uLi8uLi9zcmMvUmVzVXRpbHMudHMiLCIuLi8uLi8uLi9zcmMvUmVzTGlzdGVuZXIudHMiLCIuLi8uLi8uLi9zcmMvUmVzRXZlbnQudHMiLCIuLi8uLi8uLi9zcmMvRVJlc0V2ZW50TmFtZS50cyIsIi4uLy4uLy4uL3NyYy9hc3NldHMvRHJhZ29uUmVzTGlzdGVuZXIudHMiLCIuLi8uLi8uLi9zcmMvYXNzZXRzL1Jlc0Fzc2V0LnRzIiwiLi4vLi4vLi4vc3JjL2Fzc2V0cy9SZXNFcnJvckFzc2V0LnRzIiwiLi4vLi4vLi4vc3JjL2NvbW1vbi9FQ29kZS50cyIsIi4uLy4uLy4uL3NyYy9TeXN0ZW1CdW5kbGVOYW1lLnRzIiwiLi4vLi4vLi4vc3JjL1Jlc0NhY2hlTGliLnRzIiwiLi4vLi4vLi4vc3JjL0J1bmRsZUNhY2hlTGliLnRzIiwiLi4vLi4vLi4vc3JjL1Jlc1JlbW90ZUNhY2hlTGliLnRzIiwiLi4vLi4vLi4vc3JjL1Jlc01nci50cyIsIi4uLy4uLy4uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdHJpbmdVdGlsIH0gZnJvbSBcInptZ191dGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgJERyYWdvblJlc0Fzc2V0IGltcGxlbWVudHMgem1nLklEcmFnb25SZXNBc3NldCB7XHJcbiAgICAvKipcclxuICAgICog55uu5b2VXHJcbiAgICAqL1xyXG4gICAgZGlyOiBzdHJpbmc7XHJcbiAgICAvKipcclxuICAgICAqIOWbvueJh+WcsOWdgFxyXG4gICAgICovXHJcbiAgICB0ZXg6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogYXNzZXTlnLDlnYBcclxuICAgICAqL1xyXG4gICAgYXNzZXQ6IHN0cmluZztcclxuICAgIC8qKlxyXG4gICAgICogYXRsYXPlnLDlnYBcclxuICAgICAqL1xyXG4gICAgYXRsYXM6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKGRpcjogc3RyaW5nLCBhc3NldD86IHN0cmluZywgdGV4Pzogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKGFzc2V0ICYmIHRleCkge1xyXG4gICAgICAgICAgICB0aGlzLmF0bGFzID0gZGlyO1xyXG4gICAgICAgICAgICB0aGlzLmFzc2V0ID0gYXNzZXQ7XHJcbiAgICAgICAgICAgIHRoaXMudGV4ID0gdGV4O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyID0gZGlyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaXNEaXIoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIFN0cmluZ1V0aWwuaXNWYWxpZCh0aGlzLmRpcik7XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgJFJlc1V0aWwge1xuICAgIHB1YmxpYyBzdGF0aWMgaXNWYWxpZEFzc2V0KGFzc2V0OiBjYy5Bc3NldCB8IGNjLkFzc2V0W10pOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGFzc2V0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIGxldCBpOiBudW1iZXI7XG4gICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBhc3NldC5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoIWFzc2V0W2ldIHx8ICFhc3NldFtpXS5pc1ZhbGlkIHx8ICFhc3NldFtpXS5sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghYXNzZXQgfHwgIWFzc2V0LmlzVmFsaWQgfHwgIWFzc2V0LmxvYWRlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhdGljIHNldFByZW11bHRpcGx5QWxwaGEoYXNzZXQ6IGNjLkFzc2V0IHwgY2MuQXNzZXRbXSk6IHZvaWQge1xuICAgICAgICBpZiAoYXNzZXQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgbGV0IGk6IG51bWJlcjtcbiAgICAgICAgICAgIGxldCBsZW46IG51bWJlciA9IGFzc2V0Lmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChhc3NldFtpXSBpbnN0YW5jZW9mIGNjLlNjZW5lQXNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXNzZXRbaV0gaW5zdGFuY2VvZiBjYy5UZXh0dXJlMkQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHQgPSAoYXNzZXRbaV0gYXMgY2MuVGV4dHVyZTJEKTtcbiAgICAgICAgICAgICAgICAgICAgdC53aWR0aCAmJiB0LmhlaWdodCAmJiB0LnNldFByZW11bHRpcGx5QWxwaGEodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGFzc2V0IGluc3RhbmNlb2YgY2MuVGV4dHVyZTJEKSB7XG4gICAgICAgICAgICBhc3NldC53aWR0aCAmJiBhc3NldC5oZWlnaHQgJiYgYXNzZXQuc2V0UHJlbXVsdGlwbHlBbHBoYSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBnV2FybiB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5pbXBvcnQgeyAkUmVzRXZlbnQgfSBmcm9tIFwiLi9SZXNFdmVudFwiO1xyXG5pbXBvcnQgeyBfUmVzTWdyIH0gZnJvbSBcIi4vUmVzTWdyXCI7XHJcbmltcG9ydCB7ICRSZXNVdGlsIH0gZnJvbSBcIi4vUmVzVXRpbHNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyAkUmVzTGlzdGVuZXIgaW1wbGVtZW50cyB6bWcuSVJlc0xpc3RlbmVyIHtcclxuICAgIC8qKlxyXG4gICAgKiDopoHmsYLnm5HlkKzlr7nosaFcclxuICAgICovXHJcbiAgICB0YXJnZXQ6IGFueTtcclxuICAgIC8qKlxyXG4gICAgICog5qih5Z2X5ZCNXHJcbiAgICAgKi9cclxuICAgIGJ1bk5hbWU6IHN0cmluZztcclxuXHJcbiAgICBpc0RpcjogYm9vbGVhbjtcclxuXHJcbiAgICBsaWJzOiB6bWcuSVJlc0NhY2hlTGliO1xyXG4gICAgLyoqXHJcbiAgICAgKiDot6/lvoRcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIF9wYXRoOiBzdHJpbmcgfCBzdHJpbmdbXTtcclxuICAgIC8qKlxyXG4gICAgICog5LiL6L295a6M5oiQ5Zue6LCD5Ye95pWwXHJcbiAgICAgKi9cclxuICAgIGxhdW5jaEZ1bjogKGFzc2V0czogY2MuQXNzZXQgfCBjYy5Bc3NldFtdKSA9PiB2b2lkO1xyXG4gICAgLyoqXHJcbiAgICAgKiDkuIvovb3plJnor6/lm57osINcclxuICAgICAqL1xyXG4gICAgZXJyb3JGdW46IChwYXRoOiBzdHJpbmcpID0+IHZvaWQ7XHJcbiAgICAvKipcclxuICAgICAqIOS4i+i9vei/m+W6plxyXG4gICAgICovXHJcbiAgICBwcm9ncmVzc0Z1bjogKHBhdGg6IHN0cmluZywgcHJvOiBudW1iZXIsIHRvdGFsOiBudW1iZXIpID0+IHZvaWQ7XHJcblxyXG4gICAgY2xvbmUoKTogem1nLklSZXNMaXN0ZW5lciB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyAkUmVzTGlzdGVuZXIodGhpcy50YXJnZXQsXHJcbiAgICAgICAgICAgIHRoaXMubGF1bmNoRnVuLFxyXG4gICAgICAgICAgICB0aGlzLmVycm9yRnVuLFxyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzRnVuKTtcclxuICAgICAgICByZXN1bHQuYnVuTmFtZSA9IHRoaXMuYnVuTmFtZTtcclxuICAgICAgICByZXN1bHQucGF0aCA9IHRoaXMucGF0aDtcclxuICAgICAgICByZXN1bHQubGlicyA9IHRoaXMubGlicztcclxuICAgICAgICByZXN1bHQuaXNEaXIgPSB0aGlzLmlzRGlyO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBwYXRoKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xyXG4gICAgICAgIHRoaXMuX3BhdGggPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcGF0aCgpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IodGFyZ2V0OiBhbnksXHJcbiAgICAgICAgb25MYXVuY2g6IChhc3NldHM6IGNjLkFzc2V0IHwgY2MuQXNzZXRbXSwgbGlzdGVuZXI/OiB6bWcuSVJlc0xpc3RlbmVyKSA9PiB2b2lkLFxyXG4gICAgICAgIGVycm9yQmFjaz86IChwYXRoOiBzdHJpbmcsIGxpc3RlbmVyPzogem1nLklSZXNMaXN0ZW5lcikgPT4gdm9pZCxcclxuICAgICAgICBwcm9ncmVzc0Z1bj86IChwYXRoOiBzdHJpbmcsIHBybzogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBsaXN0ZW5lcj86IHptZy5JUmVzTGlzdGVuZXIpID0+IHZvaWRcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG4gICAgICAgIHRoaXMubGF1bmNoRnVuID0gb25MYXVuY2g7XHJcbiAgICAgICAgdGhpcy5lcnJvckZ1biA9IGVycm9yQmFjaztcclxuICAgICAgICB0aGlzLnByb2dyZXNzRnVuID0gcHJvZ3Jlc3NGdW47XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOWujOaIkOWQjuWHveaVsOiwg+eUqFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBvbkxhdW5jaChhc3NldD86IGNjLkFzc2V0IHwgY2MuQXNzZXRbXSk6ICRSZXNFdmVudCB7XHJcbiAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKHRoaXMudGFyZ2V0LCB0cnVlKSkge1xyXG4gICAgICAgICAgICAvL+iKgueCueW3suiiq+mUgOavgVxyXG4gICAgICAgICAgICBnV2FybihcIuiKgueCueW3suiiq+mUgOavge+8jOS4jei/m+ihjOWKoOi9veWbnuiwg++8gVwiLCB0aGlzLnRhcmdldCA/IHRoaXMudGFyZ2V0Lm5hbWUgOiBcIlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5sYXVuY2hGdW4pIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhc3NldHMgPSBhc3NldCA/IGFzc2V0IDogdGhpcy5nZXRBc3NldCgpO1xyXG4gICAgICAgIGlmIChhc3NldHMpIHtcclxuICAgICAgICAgICAgdGhpcy5sYXVuY2hGdW4uY2FsbCh0aGlzLnRhcmdldCwgYXNzZXRzLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICog5oql6ZSZ5ZCO5Ye95pWw6LCD55SoXHJcbiAgICAqL1xyXG4gICAgcHVibGljIG9uRXJyb3IoZXJyb3JQYXRoOiBzdHJpbmcgfCBzdHJpbmdbXSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMudGFyZ2V0LCB0cnVlKSAmJiB0aGlzLmVycm9yRnVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JGdW4uY2FsbCh0aGlzLnRhcmdldCwgZXJyb3JQYXRoLCB0aGlzKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6L+b5bqm5Lit5Ye95pWw6LCD55SoXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblByb2dyZXNzKHBhdGg6IHN0cmluZywgcHJvOiBudW1iZXIsIHRvdGFsOiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLnRhcmdldCwgdHJ1ZSkgJiYgdGhpcy5wcm9ncmVzc0Z1bikge1xyXG4gICAgICAgICAgICB0aGlzLnByb2dyZXNzRnVuLmNhbGwodGhpcy50YXJnZXQsIHBhdGgsIHBybywgdG90YWwsIHRoaXMpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKHRoaXMudGFyZ2V0LCB0cnVlKSkge1xyXG4gICAgICAgICAgICAvL+iKgueCueW3suiiq+mUgOavgVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsaWIgPSB0aGlzLmxpYnM7XHJcbiAgICAgICAgbGV0IGFzc2V0OiBjYy5Bc3NldCB8IGNjLkFzc2V0W107XHJcbiAgICAgICAgaWYgKHRoaXMucGF0aCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxldCBsZW46IG51bWJlciA9IHRoaXMucGF0aC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYXNzZXQgPSBsaWIuZ2V0QXNzZXQodGhpcy5wYXRoW2ldLCB0aGlzLmlzRGlyKTtcclxuICAgICAgICAgICAgICAgIGlmICghJFJlc1V0aWwuaXNWYWxpZEFzc2V0KGFzc2V0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFzc2V0ID0gbGliLmdldEFzc2V0KHRoaXMucGF0aCwgdGhpcy5pc0Rpcik7XHJcbiAgICAgICAgICAgIGlmICghJFJlc1V0aWwuaXNWYWxpZEFzc2V0KGFzc2V0KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0xvYWRlZCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIWNjLmlzVmFsaWQodGhpcy50YXJnZXQsIHRydWUpKSB7XHJcbiAgICAgICAgICAgIC8v6IqC54K55bey6KKr6ZSA5q+BXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGxpYiA9IHRoaXMubGlicztcclxuICAgICAgICBpZiAodGhpcy5wYXRoIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgbGV0IGk6IG51bWJlcjtcclxuICAgICAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gdGhpcy5wYXRoLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWxpYi5nZXRBc3NldCh0aGlzLnBhdGhbaV0sIHRoaXMuaXNEaXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKCFsaWIuZ2V0QXNzZXQodGhpcy5wYXRoLCB0aGlzLmlzRGlyKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRBc3NldCgpOiBjYy5Bc3NldCB8IGNjLkFzc2V0W10ge1xyXG4gICAgICAgIC8vIGxldCBsaWI6IFJlc0NhY2hlTGliID0gUmVzTWdyLmdldENhY2hlTGliKHRoaXMuYnVuTmFtZSk7XHJcbiAgICAgICAgbGV0IGxpYiA9IHRoaXMubGlicztcclxuICAgICAgICBsZXQgYXNzZXRzOiBjYy5Bc3NldCB8IGNjLkFzc2V0W107XHJcbiAgICAgICAgaWYgKHRoaXMucGF0aCBpbnN0YW5jZW9mIEFycmF5KSB7XHJcbiAgICAgICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGFzc2V0cyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSB0aGlzLnBhdGgubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gbGliLmdldEFzc2V0KHRoaXMucGF0aFtpXSwgdGhpcy5pc0Rpcik7XHJcbiAgICAgICAgICAgICAgICBpZiAoISRSZXNVdGlsLmlzVmFsaWRBc3NldChpdGVtKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5vbkVycm9yKHRoaXMucGF0aFtpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhc3NldHMgPSBhc3NldHMuY29uY2F0KGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXNzZXRzID0gbGliLmdldEFzc2V0KHRoaXMucGF0aCwgdGhpcy5pc0Rpcik7XHJcbiAgICAgICAgICAgIGlmICghJFJlc1V0aWwuaXNWYWxpZEFzc2V0KGFzc2V0cykpIHtcclxuICAgICAgICAgICAgICAgIC8vdGhpcy5vbkVycm9yKHRoaXMucGF0aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXNzZXRzO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgJEVSZXNFdmVudE5hbWUgfSBmcm9tIFwiLi9FUmVzRXZlbnROYW1lXCI7XHJcbmltcG9ydCB7IERyYWdvbkFzc2V0IH0gZnJvbSBcInptZ191dGlsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgJFJlc0V2ZW50IGV4dGVuZHMgY2MuRXZlbnQge1xyXG4gICAgLyoqXHJcbiAgICAgKiDot6/lvoRcclxuICAgICAqL1xyXG4gICAgcHVibGljIGVycm9yUGF0aDogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgICBwdWJsaWMgcGF0aDogc3RyaW5nIHwgc3RyaW5nW107XHJcbiAgICBwdWJsaWMgYnVuTmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIGZpbmlzaDogbnVtYmVyO1xyXG4gICAgcHVibGljIHRvdGFsOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgYXNzZXRzOiBjYy5Bc3NldCB8IGNjLkFzc2V0W10gfCBEcmFnb25Bc3NldDtcclxuICAgIGNvbnN0cnVjdG9yKHR5cGU6ICRFUmVzRXZlbnROYW1lLCBidW5OYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZyB8IHN0cmluZ1tdLCBhc3NldHM/OiBjYy5Bc3NldCB8IGNjLkFzc2V0W10gfCBEcmFnb25Bc3NldCkge1xyXG4gICAgICAgIHN1cGVyKHR5cGUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLmJ1bk5hbWUgPSBidW5OYW1lO1xyXG4gICAgICAgIHRoaXMuZXJyb3JQYXRoID0gcGF0aDtcclxuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xyXG4gICAgICAgIHRoaXMuYXNzZXRzID0gYXNzZXRzO1xyXG4gICAgfVxyXG59IiwiZXhwb3J0IGVudW0gJEVSZXNFdmVudE5hbWUge1xyXG4gICAgLyoqXHJcbiAgICAgKiDlrozmiJBcclxuICAgICAqL1xyXG4gICAgQ09NUExFVEUgPSAnY29tcGxldGUnLFxyXG4gICAgRFJBR09OX0NPTVBMRVRFID0gJ2RyYWdvbkNvbXBsZXRlJyxcclxuICAgIC8qKlxyXG4gICAgICog6L+b5bqmXHJcbiAgICAgKi9cclxuICAgIFBST0dSRVNTID0gJ3Byb2dyZXNzJyxcclxuICAgIC8qKlxyXG4gICAgICog5LiL6L296ZSZ6K+vXHJcbiAgICAgKi9cclxuICAgIEVSUk9SID0gJ2Vycm9yJyxcclxuICAgIERSQUdPTl9FUlJPUiA9ICdkcmFnb25FcnJvcicsXHJcbn0iLCJpbXBvcnQgeyAkUmVzTGlzdGVuZXIgfSBmcm9tIFwiLi4vUmVzTGlzdGVuZXJcIjtcclxuaW1wb3J0IHsgRHJhZ29uQXNzZXQgfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuaW1wb3J0IHsgJFJlc0V2ZW50IH0gZnJvbSBcIi4uL1Jlc0V2ZW50XCI7XHJcbmltcG9ydCB7ICRFUmVzRXZlbnROYW1lIH0gZnJvbSBcIi4uL0VSZXNFdmVudE5hbWVcIjtcclxuaW1wb3J0IHsgJERyYWdvblJlc0Fzc2V0IH0gZnJvbSBcIi4vRHJhZ29uUmVzQXNzZXRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyAkRHJhZ29uUmVzTGlzdGVuZXIgZXh0ZW5kcyAkUmVzTGlzdGVuZXIgaW1wbGVtZW50cyB6bWcuSURyYWdvblJlc0xpc3RlbmVyIHtcclxuXHJcbiAgICBzb3VyY2U6IHptZy5JRHJhZ29uUmVzQXNzZXQ7XHJcblxyXG4gICAgcHVibGljIHNldCBwYXRoKHZhbHVlOiBzdHJpbmcgfCBzdHJpbmdbXSkge1xyXG4gICAgICAgIGlmICghdGhpcy5zb3VyY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zb3VyY2UgPSBuZXcgJERyYWdvblJlc0Fzc2V0KFwiXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5hc3NldCA9IHZhbHVlWzBdO1xyXG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5hdGxhcyA9IHZhbHVlWzFdO1xyXG4gICAgICAgICAgICB0aGlzLnNvdXJjZS50ZXggPSB2YWx1ZVsyXTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNvdXJjZS5kaXIgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fcGF0aCA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcGF0aCgpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGg7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IodGFyZ2V0OiBhbnksXHJcbiAgICAgICAgb25MYXVuY2g6IChhc3NldHM6IERyYWdvbkFzc2V0LCBsaXN0ZW5lcj86IHptZy5JUmVzTGlzdGVuZXIpID0+IHZvaWQsXHJcbiAgICAgICAgZXJyb3JCYWNrPzogKHBhdGg6IHN0cmluZywgbGlzdGVuZXI/OiB6bWcuSVJlc0xpc3RlbmVyKSA9PiB2b2lkLFxyXG4gICAgICAgIHByb2dyZXNzRnVuPzogKHBhdGg6IHN0cmluZywgcHJvOiBudW1iZXIsIHRvdGFsOiBudW1iZXIsIGxpc3RlbmVyPzogem1nLklSZXNMaXN0ZW5lcikgPT4gdm9pZFxyXG4gICAgKSB7XHJcbiAgICAgICAgc3VwZXIodGFyZ2V0LCBvbkxhdW5jaCwgZXJyb3JCYWNrLCBwcm9ncmVzc0Z1bik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uTGF1bmNoKGFzc2V0czogY2MuQXNzZXRbXSk6ICRSZXNFdmVudCB7XHJcbiAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKHRoaXMudGFyZ2V0KSkge1xyXG4gICAgICAgICAgICAvL+iKgueCueW3suiiq+mUgOavgVxyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgYXNzZXRzID0gYXNzZXRzID8gYXNzZXRzIDogdGhpcy5nZXRBc3NldCgpIGFzIGNjLkFzc2V0W107XHJcbiAgICAgICAgbGV0IGJvb2w6IGJvb2xlYW47XHJcbiAgICAgICAgbGV0IGV2dDogJFJlc0V2ZW50O1xyXG4gICAgICAgIGxldCBkcmFnQXNzZXQ6IERyYWdvbkFzc2V0ID0gbmV3IERyYWdvbkFzc2V0KCk7XHJcbiAgICAgICAgaWYgKGFzc2V0cykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zb3VyY2UuaXNEaXIoKSkge1xyXG4gICAgICAgICAgICAgICAgYm9vbCA9IGRyYWdBc3NldC5pbml0QnlBc3NldChhc3NldHMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYm9vbCA9IGRyYWdBc3NldC5pbml0UmVtb3RlQXNzZXQoKGFzc2V0c1swXSBhcyBjYy5UZXh0QXNzZXQpLCAoYXNzZXRzWzFdIGFzIGNjLlRleHRBc3NldCksIGFzc2V0c1syXSBhcyBjYy5UZXh0dXJlMkQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib29sKSB7XHJcbiAgICAgICAgICAgIGV2dCA9IG5ldyAkUmVzRXZlbnQoJEVSZXNFdmVudE5hbWUuRFJBR09OX0NPTVBMRVRFLCB0aGlzLmJ1bk5hbWUsIHRoaXMucGF0aCwgZHJhZ0Fzc2V0KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMubGF1bmNoRnVuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhdW5jaEZ1bi5jYWxsKHRoaXMudGFyZ2V0LCBkcmFnQXNzZXQsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZXZ0ID0gbmV3ICRSZXNFdmVudCgkRVJlc0V2ZW50TmFtZS5EUkFHT05fRVJST1IsIHRoaXMuYnVuTmFtZSwgdGhpcy5wYXRoKTtcclxuICAgICAgICAgICAgdGhpcy5vbkVycm9yKHRoaXMucGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBldnQ7XHJcbiAgICB9XHJcblxyXG59IiwiZXhwb3J0IGNsYXNzICRSZXNBc3NldCBpbXBsZW1lbnRzIHptZy5JUmVzQXNzZXQge1xuICAgIHB1YmxpYyBidW5OYW1lOiBzdHJpbmc7XG4gICAgcHVibGljIHBhdGg6IHN0cmluZztcbiAgICBjb25zdHJ1Y3RvcihidW5OYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZykge1xuICAgICAgICB0aGlzLmJ1bk5hbWUgPSBidW5OYW1lO1xuICAgICAgICB0aGlzLnBhdGggPSBwYXRoO1xuICAgIH1cbn0iLCJjbGFzcyBfUmVzRXJyb3JBc3NldCBleHRlbmRzIGNjLkFzc2V0IHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogX1Jlc0Vycm9yQXNzZXQ7XHJcbiAgICBzdGF0aWMgY3JlYXRlKCk6IF9SZXNFcnJvckFzc2V0IHtcclxuICAgICAgICByZXR1cm4gbmV3IF9SZXNFcnJvckFzc2V0KClcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGxldCBSZXNFcnJvckFzc2V0ID0gX1Jlc0Vycm9yQXNzZXQuY3JlYXRlKCk7IiwiXHJcbmV4cG9ydCBjbGFzcyBFQ29kZSB7XHJcblxyXG4gICAgc3RhdGljIERPV05fQlVORExFX0VSUk9SOiBzdHJpbmcgPSBcImJ1bk5hbWU6e3Jlc291cmNlc30gUGF0aDp7dGltZzF9ICBSZWFzb25zOntyZXN9XCI7XHJcbn0iLCJleHBvcnQgY2xhc3MgX1N5c3RlbUJ1bmRsZU5hbWUge1xyXG4gICAgLy8gcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBfU3lzdGVtQnVuZGxlTmFtZTtcclxuICAgIC8vIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBfU3lzdGVtQnVuZGxlTmFtZSB7XHJcbiAgICAvLyAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgLy8gICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfU3lzdGVtQnVuZGxlTmFtZSgpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICAvLyB9XHJcbiAgICAvKipcclxuICAgICAqIOi/nOeoi+i1hOa6kFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFJFTU9URSA9IFwicmVtb3RlXCI7XHJcbiAgICAvKipcclxuICAgICAqIOacrOWcsOi1hOa6kFxyXG4gICAgICovXHJcbiAgICAvLyBwdWJsaWMgc3RhdGljIFJFU09VUkNFUyA9IFwicmVzb3VyY2VzXCI7XHJcbiAgICBwdWJsaWMgc3RhdGljIFNUQUNLID0gXCJzdGFja1wiO1xyXG4gICAgLyoqXHJcbiAgICAgKiDphY3nva7mlbDmja5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBDT05GSUcgPSBcImNvbmZpZ1wiO1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgVUkgPSBcInVpXCI7XHJcblxyXG5cclxufVxyXG4iLCJpbXBvcnQgeyAkLCBnTG9nLCBnV2FybiB9IGZyb20gJ3ptZ191dGlsJztcclxuaW1wb3J0IHsgJFJlc0V2ZW50IH0gZnJvbSBcIi4vUmVzRXZlbnRcIjtcclxuaW1wb3J0IHsgJEVSZXNFdmVudE5hbWUgfSBmcm9tIFwiLi9FUmVzRXZlbnROYW1lXCI7XHJcbmltcG9ydCB7IFJlc0Vycm9yQXNzZXQgfSBmcm9tIFwiLi9hc3NldHMvUmVzRXJyb3JBc3NldFwiO1xyXG5pbXBvcnQgeyBFQ29kZSB9IGZyb20gXCIuL2NvbW1vbi9FQ29kZVwiO1xyXG5pbXBvcnQgeyBSZXNMb2FkaW5nQXNzZXQgfSBmcm9tIFwiLi9hc3NldHMvUmVzTG9hZGluZ0Fzc2V0XCI7XHJcbmltcG9ydCB7IF9TeXN0ZW1CdW5kbGVOYW1lIH0gZnJvbSAnLi9TeXN0ZW1CdW5kbGVOYW1lJztcclxuaW1wb3J0IHsgX1Jlc01nciB9IGZyb20gJy4vUmVzTWdyJztcclxuaW1wb3J0IHsgJFJlc1V0aWwgfSBmcm9tICcuL1Jlc1V0aWxzJztcclxuXHJcbmV4cG9ydCBjbGFzcyAkUmVzQ2FjaGVMaWIgZXh0ZW5kcyBjYy5FdmVudFRhcmdldCBpbXBsZW1lbnRzIHptZy5JUmVzQ2FjaGVMaWIge1xyXG4gICAgcHJvdGVjdGVkIGJ1bk5hbWU6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBfYnVuZGxlOiBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlO1xyXG4gICAgcHJvdGVjdGVkIF9wcm9taXNlOiBQcm9taXNlPGNjLkFzc2V0TWFuYWdlci5CdW5kbGU+O1xyXG4gICAgcHVibGljIGdldCBuYW1lKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYnVuTmFtZTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKGJ1bk5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5idW5OYW1lID0gYnVuTmFtZTtcclxuICAgIH1cclxuICAgIGFzeW5jIGluaXQoKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2J1bmRsZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZEJ1bmRsZSgpLnRoZW4oKGI6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9idW5kbGUgPSBiO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUgJiYgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdMb2coXCLlvZPliY1idW5kbGXliJ3lp4vljJblpLHotKU6XCIgKyB0aGlzLmJ1bk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCAmJiByZWplY3QoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVsZWFzZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsZWFyKCk7XHJcbiAgICB9XHJcbiAgICBpc1JlbW90ZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5idW5OYW1lID09IF9TeXN0ZW1CdW5kbGVOYW1lLlJFTU9URTtcclxuICAgIH1cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9idW5kbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVuZGxlLnJlbGVhc2VBbGwoKTtcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbW92ZUJ1bmRsZSh0aGlzLl9idW5kbGUpO1xyXG4gICAgICAgICAgICBjYy5qcy5jbGVhckJ1bmRsZSh0aGlzLl9idW5kbGUubmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2J1bmRsZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0QnVuZGxlKCk6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9idW5kbGU7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOacieWwsei/lOWbnu+8jOayoeacieWwseWKoOi9veetieS6i+S7tlxyXG4gICAgICogQHBhcmFtIHBhdGggXHJcbiAgICAgKi9cclxuICAgIGxvYWRBc3NldChwYXRoOiBzdHJpbmcsIGlzRGlyOiBib29sZWFuLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2J1bmRsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yQnVuZGxlRnVuKHBhdGgsIHRoaXMuYnVuTmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFzc2V0czogY2MuQXNzZXQgfCBjYy5Bc3NldFtdID0gdGhpcy5nZXRBc3NldChwYXRoLCBpc0Rpcik7XHJcbiAgICAgICAgaWYgKCFhc3NldHMpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVuZGxlICYmIHRoaXMub25MYXVuY2gocGF0aCwgaXNEaXIsIHR5cGUsIHRoaXMuX2J1bmRsZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvZPliY3otYTmupDlt7LliqDovb1cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2V0QXNzZXQocGF0aDogc3RyaW5nLCBpc0RpcjogYm9vbGVhbik6IGNjLkFzc2V0IHwgY2MuQXNzZXRbXSB7XHJcbiAgICAgICAgbGV0IGFzc2V0czogY2MuQXNzZXQgfCBjYy5Bc3NldFtdO1xyXG4gICAgICAgIGlmIChpc0Rpcikge1xyXG4gICAgICAgICAgICBsZXQgaW5mb3M6IFJlY29yZDxzdHJpbmcsIGFueT5bXSA9IHRoaXMuX2J1bmRsZS5nZXREaXJXaXRoUGF0aChwYXRoKTtcclxuICAgICAgICAgICAgbGV0IGk6IG51bWJlcjtcclxuICAgICAgICAgICAgbGV0IGE6IGNjLkFzc2V0O1xyXG4gICAgICAgICAgICBhc3NldHMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gaW5mb3MubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGEgPSB0aGlzLl9idW5kbGUuZ2V0QnlJbmZvKGluZm9zW2ldKTtcclxuICAgICAgICAgICAgICAgIGlmICghYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc2V0cy5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGFzc2V0cyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhc3NldHMucHVzaChhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFzc2V0cyA9IHRoaXMuX2J1bmRsZS5nZXQocGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhc3NldHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpooTlpITnkIZcclxuICAgICAqIHByZWZhYuexu+Wei+i1hOa6kOmcgOimgeWtl+S9k+abv+aNolxyXG4gICAgICog5Zu+54mH57G76LWE5rqQ6ZyA6KaB6K6+572u6YCP5piO5bqmXHJcbiAgICAgKiBAcGFyYW0gcGF0aCBcclxuICAgICAqIEBwYXJhbSBhc3NldCBcclxuICAgICAqL1xyXG4gICAgc2V0QXNzZXQocGF0aDogc3RyaW5nLCBhc3NldDogY2MuQXNzZXQgfCBjYy5Bc3NldFtdKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGFzc2V0IGluc3RhbmNlb2YgY2MuU2NlbmVBc3NldCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChhc3NldCBpbnN0YW5jZW9mIGNjLlByZWZhYikge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRSZXNVdGlsLnNldFByZW11bHRpcGx5QWxwaGEoYXNzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHB1YmxpYyBhc3NldEhhbmRsZShhc3NldDogY2MuQXNzZXQpOiB2b2lkIHtcclxuICAgIC8vICAgICBpZiAoYXNzZXQgaW5zdGFuY2VvZiBjYy5QcmVmYWIpIHtcclxuICAgIC8vICAgICAgICAgRm9udE1nci51cGRhdGVGb250KGFzc2V0KTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcblxyXG4gICAgcHVibGljIGxvYWRCdW5kbGUoKTogUHJvbWlzZTxjYy5Bc3NldE1hbmFnZXIuQnVuZGxlPiB7XHJcbiAgICAgICAgdmFyIGJ1bjogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSA9IGNjLmFzc2V0TWFuYWdlci5nZXRCdW5kbGUodGhpcy5idW5OYW1lKTtcclxuICAgICAgICBpZiAoYnVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoYnVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3Byb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2U8Y2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEJ1bmRsZSh0aGlzLmJ1bk5hbWUsIG51bGwsIChlcnIsIGJ1bmRsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCAmJiByZWplY3QodGhpcy5idW5OYW1lKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSAmJiByZXNvbHZlKGJ1bmRsZSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3Byb21pc2UgPSBudWxsO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZXJyb3JCdW5kbGVGdW4ocGF0aDogc3RyaW5nLCBidW5OYW1lOiBzdHJpbmcsKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRBc3NldChwYXRoLCBSZXNFcnJvckFzc2V0KTtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3ICRSZXNFdmVudCgkRVJlc0V2ZW50TmFtZS5FUlJPUiwgYnVuTmFtZSwgcGF0aCkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBlcnJvckZ1bihwYXRoOiBzdHJpbmcsIGVycm9yOiBFcnJvcik6IHZvaWQge1xyXG4gICAgICAgIGdXYXJuKCQoRUNvZGUuRE9XTl9CVU5ETEVfRVJST1IsIHRoaXMuYnVuTmFtZSwgcGF0aCwgZXJyb3IubWVzc2FnZSkpO1xyXG4gICAgICAgIHRoaXMuc2V0QXNzZXQocGF0aCwgUmVzRXJyb3JBc3NldCk7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyAkUmVzRXZlbnQoJEVSZXNFdmVudE5hbWUuRVJST1IsIHRoaXMuYnVuTmFtZSwgcGF0aCkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkNvbXBsZXRlKHBhdGg6IHN0cmluZywgYXNzZXRzOiBjYy5Bc3NldCB8IGNjLkFzc2V0W10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldEFzc2V0KHBhdGgsIGFzc2V0cyk7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyAkUmVzRXZlbnQoJEVSZXNFdmVudE5hbWUuQ09NUExFVEUsIHRoaXMuYnVuTmFtZSwgcGF0aCwgYXNzZXRzKSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uTGF1bmNoKHBhdGg6IHN0cmluZywgaXNEaXI6IGJvb2xlYW4sIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCwgYnVuZGxlOiBjYy5Bc3NldE1hbmFnZXIuQnVuZGxlKTogdm9pZCB7XHJcbiAgICAgICAgZ0xvZyhcIuW8gOWni+WKoOi9vei1hOa6kO+8mlwiICsgdGhpcy5idW5OYW1lICsgXCIgcGF0aDpcIiArIHBhdGgpO1xyXG4gICAgICAgIC8vIHRoaXMuc2V0QXNzZXQocGF0aCwgUmVzTG9hZGluZ0Fzc2V0KTtcclxuICAgICAgICBpZiAoaXNEaXIpIHtcclxuICAgICAgICAgICAgLy/orqTkuLrmmK/nm67lvZXnu5PmnoQgICAgXHJcbiAgICAgICAgICAgIGlmICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBidW5kbGUubG9hZERpcihwYXRoLCB0eXBlLCB0aGlzLl9vbkxhdW5jaC5iaW5kKHRoaXMsIHBhdGgsIHR5cGUpKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1bmRsZS5sb2FkRGlyKHBhdGgsIHRoaXMuX29uTGF1bmNoLmJpbmQodGhpcywgcGF0aCwgbnVsbCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IGNjLlNjZW5lQXNzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBidW5kbGUubG9hZFNjZW5lKHBhdGgsIHRoaXMuX29uTG9hZFNjZW5lUHJvZ3Jlc3MuYmluZCh0aGlzLCBwYXRoKSwgdGhpcy5fb25MYXVuY2guYmluZCh0aGlzLCBwYXRoLCBudWxsKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1bmRsZS5sb2FkKHBhdGgsIHR5cGUsIHRoaXMuX29uTG9hZFByb2dyZXNzLmJpbmQodGhpcywgcGF0aCksIHRoaXMuX29uTGF1bmNoLmJpbmQodGhpcywgcGF0aCwgdHlwZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ1bmRsZS5sb2FkKHBhdGgsIHRoaXMuX29uTG9hZFByb2dyZXNzLmJpbmQodGhpcywgcGF0aCksIHRoaXMuX29uTGF1bmNoLmJpbmQodGhpcywgcGF0aCwgbnVsbCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBfb25Mb2FkU2NlbmVQcm9ncmVzcyhwYXRoOiBzdHJpbmcsIGZpbmlzaDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW0pOiB2b2lkIHtcclxuICAgICAgICBsZXQgZXZ0OiAkUmVzRXZlbnQgPSBuZXcgJFJlc0V2ZW50KCRFUmVzRXZlbnROYW1lLlBST0dSRVNTLCB0aGlzLmJ1bk5hbWUsIHBhdGgpO1xyXG4gICAgICAgIGV2dC5maW5pc2ggPSBmaW5pc2g7XHJcbiAgICAgICAgZXZ0LnRvdGFsID0gdG90YWw7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9vbkxvYWRQcm9ncmVzcyhwYXRoOiBzdHJpbmcsIGZpbmlzaDogbnVtYmVyLCB0b3RhbDogbnVtYmVyLCBpdGVtOiBjYy5Bc3NldE1hbmFnZXIuUmVxdWVzdEl0ZW0pOiB2b2lkIHtcclxuICAgICAgICBsZXQgZXZ0OiAkUmVzRXZlbnQgPSBuZXcgJFJlc0V2ZW50KCRFUmVzRXZlbnROYW1lLlBST0dSRVNTLCB0aGlzLmJ1bk5hbWUsIHBhdGgpO1xyXG4gICAgICAgIGV2dC5maW5pc2ggPSBmaW5pc2g7XHJcbiAgICAgICAgZXZ0LnRvdGFsID0gdG90YWw7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIF9vbkxhdW5jaChwYXRoOiBzdHJpbmcsIHR5cGU6IHR5cGVvZiBjYy5Bc3NldCB8IG51bGwsIGVycjogRXJyb3IsIGFzc2V0czogY2MuQXNzZXQgfCBjYy5Bc3NldFtdKSB7XHJcbiAgICAgICAgaWYgKGVycikge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yRnVuKHBhdGgsIGVycik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFzc2V0cyBpbnN0YW5jZW9mIEFycmF5ICYmIGFzc2V0cy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9yRnVuKHBhdGgsIG5ldyBFcnJvcihcIuWKoOi9veaVsOe7hOWGheWuueS4uuepulwiKSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgZ0xvZyhcIui1hOa6kOWKoOi9veaIkOWKn++8mlwiICsgdGhpcy5idW5OYW1lICsgXCIgcGF0aDpcIiArIHBhdGgpO1xyXG4gICAgICAgIGxldCBib29sOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICBpZiAodHlwZSkge1xyXG4gICAgICAgICAgICBpZiAoYXNzZXRzIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBhc3NldHMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoYXNzZXRzW2ldIGluc3RhbmNlb2YgdHlwZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ1dhcm4oXCLliqDovb3ov5vmnaXnmoTmlbDnu4TotYTmupDmnInkuI7lhoXlrrnop4TlrprnsbvlnovkuI3nrKbmg4XlhrXlh7rnjrDvvJpcIiArIGFzc2V0c1tpXS5uYXRpdmVVcmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBib29sID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghKGFzc2V0cyBpbnN0YW5jZW9mIHR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGdXYXJuKFwi5Yqg6L296L+b5p2l55qE6LWE5rqQ5pyJ5LiO5YaF5a656KeE5a6a57G75Z6L5LiN56ym5oOF5Ya15Ye6546w77yaXCIgKyBhc3NldHNbXCJuYXRpdmVVcmxcIl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChib29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Db21wbGV0ZShwYXRoLCBhc3NldHMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IENvbmZpZ01nciB9IGZyb20gXCJ6bWdfY29uZmlnX21nclwiO1xyXG5pbXBvcnQgeyBnV2FybiB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5pbXBvcnQgeyAkUmVzQ2FjaGVMaWIgfSBmcm9tIFwiLi9SZXNDYWNoZUxpYlwiO1xyXG5cclxuZXhwb3J0IGNsYXNzICRCdW5kbGVDYWNoZUxpYiBleHRlbmRzICRSZXNDYWNoZUxpYiB7XHJcbiAgICBjb25zdHJ1Y3RvcihidW5OYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihidW5OYW1lKTtcclxuICAgIH1cclxuICAgIGNsZWFyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLl9idW5kbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fYnVuZGxlLnJlbGVhc2VBbGwoKTtcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLnJlbW92ZVJlbW90ZUJ1bmRsZSh0aGlzLl9idW5kbGUpO1xyXG4gICAgICAgICAgICB0aGlzLl9idW5kbGUgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRSZW1vdGVVcmwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gQ29uZmlnTWdyLmJ1bmRsZVByZWZpeCArIFwiL1wiICsgdGhpcy5idW5OYW1lICsgXCIvXCIgKyBDb25maWdNZ3IucHVibGlzaEtleSArIFwiL1wiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxvYWRCdW5kbGUoKTogUHJvbWlzZTxjYy5Bc3NldE1hbmFnZXIuQnVuZGxlPiB7XHJcbiAgICAgICAgdmFyIGJ1bjogY2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZSA9IGNjLmFzc2V0TWFuYWdlci5nZXRCdW5kbGUodGhpcy5idW5OYW1lKTtcclxuICAgICAgICBpZiAoYnVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoYnVuKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3Byb21pc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb21pc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9wcm9taXNlID0gbmV3IFByb21pc2U8Y2MuQXNzZXRNYW5hZ2VyLkJ1bmRsZT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdXJsOiBzdHJpbmcgPSB0aGlzLmdldFJlbW90ZVVybCgpO1xyXG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZSh1cmwgKyBDb25maWdNZ3IuYnVuZGxlRmlsZVBhdGggKyBcIj90aW1lPVwiICsgbmV3IERhdGUoKS52YWx1ZU9mKCksIChlcnIsIGRhdGE6IGNjLkpzb25Bc3NldCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy/lvZPliY3niYjmnKznmoTmj4/ov7Dmlofku7ZcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBnV2FybihcIuW9k+WJjeaooeWdl+aXoOeJiOacrOaWh+S7tjpcIiArIHRoaXMuYnVuTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0ICYmIHJlamVjdCh0aGlzLmJ1bk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGlzdDogeyB2ZXJzaW9uOiBzdHJpbmcsIHRpbWU6IHN0cmluZywgdGlwczogc3RyaW5nLCBjaGVja2VkOiBib29sZWFuIH1bXSA9IGRhdGEuanNvbjtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB2ZXJzaW9uOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBsZW46IG51bWJlciA9IGxpc3QubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGlzdFtpXS5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2ZXJzaW9uID0gbGlzdFtpXS52ZXJzaW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZlcnNpb24gPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnV2FybihcIuW9k+WJjeaooeWdl+aXoOeJiOacrOaPj+i/sDpcIiArIHRoaXMuYnVuTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNjLmFzc2V0TWFuYWdlci5sb2FkUmVtb3RlQnVuZGxlKHVybCwgeyB2ZXJzaW9uOiB2ZXJzaW9uIH0sIChlcnIsIGJ1bmRsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWplY3QgJiYgcmVqZWN0KHRoaXMuYnVuTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9idW5kbGUgPSBidW5kbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlICYmIHJlc29sdmUoYnVuZGxlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9wcm9taXNlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7ICRSZXNDYWNoZUxpYiB9IGZyb20gXCIuL1Jlc0NhY2hlTGliXCI7XHJcblxyXG5pbXBvcnQgeyBnRXJyb3IsIGdXYXJuIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7IF9TeXN0ZW1CdW5kbGVOYW1lIH0gZnJvbSBcIi4vU3lzdGVtQnVuZGxlTmFtZVwiO1xyXG5pbXBvcnQgeyAkUmVzVXRpbCB9IGZyb20gXCIuL1Jlc1V0aWxzXCI7XHJcbmV4cG9ydCBjbGFzcyAkUmVzUmVtb3RlQ2FjaGVMaWIgZXh0ZW5kcyAkUmVzQ2FjaGVMaWIge1xyXG4gICAgcHJvdGVjdGVkIGFzc2V0c0xpc3Q6IFJlY29yZDxzdHJpbmcsIGNjLkFzc2V0IHwgY2MuQXNzZXRbXT4gPSB7fTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKF9TeXN0ZW1CdW5kbGVOYW1lLlJFTU9URSk7XHJcbiAgICB9XHJcbiAgICBhc3luYyBpbml0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhcigpIHtcclxuICAgIH1cclxuXHJcbiAgICBzZXRBc3NldChwYXRoOiBzdHJpbmcsIGFzc2V0OiBjYy5Bc3NldCB8IGNjLkFzc2V0W10pOiB2b2lkIHtcclxuICAgICAgICBpZiAoYXNzZXQgaW5zdGFuY2VvZiBjYy5TY2VuZUFzc2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgJFJlc1V0aWwuc2V0UHJlbXVsdGlwbHlBbHBoYShhc3NldCk7XHJcbiAgICAgICAgdGhpcy5hc3NldHNMaXN0W3BhdGhdID0gYXNzZXQ7XHJcbiAgICB9XHJcbiAgICBnZXRBc3NldChwYXRoOiBzdHJpbmcpOiBjYy5Bc3NldCB8IGNjLkFzc2V0W10ge1xyXG4gICAgICAgIGxldCBhc3NldHM6IGNjLkFzc2V0IHwgY2MuQXNzZXRbXSA9IHRoaXMuYXNzZXRzTGlzdFtwYXRoXTtcclxuICAgICAgICBpZiAoJFJlc1V0aWwuaXNWYWxpZEFzc2V0KGFzc2V0cykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGFzc2V0cztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGxvYWRBc3NldChwYXRoOiBzdHJpbmcsIGlzRGlyOiBib29sZWFuLCB0eXBlOiB0eXBlb2YgY2MuQXNzZXQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXBhdGgpIHtcclxuICAgICAgICAgICAgZ1dhcm4oXCLotYTmupDlnLDlnYDmnKrlrprkuYnvvIzml6Dms5XliqDovb1cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzRGlyKSB7XHJcbiAgICAgICAgICAgIGdFcnJvcihcIui/nOeoi+WcsOWdgO+8jOaXoOazleaMieeFp+aWh+S7tuWkueW9ouW8j+S4i+i9vei1hOa6kFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQga2V5OiBzdHJpbmc7XHJcbiAgICAgICAgaWYgKHR5cGUpIHtcclxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIGNjLlRleHRBc3NldDpcclxuICAgICAgICAgICAgICAgICAgICBrZXkgPSBcIi50eHRcIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgY2MuSnNvbkFzc2V0OlxyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IFwiLmpzb25cIjtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgY2MuVGV4dHVyZTJEOlxyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IFwiLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBjYy5Gb250OlxyXG4gICAgICAgICAgICAgICAgICAgIGtleSA9IFwiLnR0ZlwiO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgY2MuYXNzZXRNYW5hZ2VyLmxvYWRSZW1vdGUocGF0aCwgeyBleHQ6IGtleSB9LCB0aGlzLl9vbkxhdW5jaC5iaW5kKHRoaXMsIHBhdGgsIHR5cGUpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZFJlbW90ZShwYXRoLCB0aGlzLl9vbkxhdW5jaC5iaW5kKHRoaXMsIHBhdGgsIG51bGwpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyAkLCBEcmFnb25Bc3NldCwgZ0xvZywgZ1dhcm4gfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuaW1wb3J0IHsgJERyYWdvblJlc0xpc3RlbmVyIH0gZnJvbSBcIi4vYXNzZXRzL0RyYWdvblJlc0xpc3RlbmVyXCI7XHJcbmltcG9ydCB7IFJlc0Vycm9yQXNzZXQgfSBmcm9tIFwiLi9hc3NldHMvUmVzRXJyb3JBc3NldFwiO1xyXG5pbXBvcnQgeyBSZXNMb2FkaW5nQXNzZXQgfSBmcm9tIFwiLi9hc3NldHMvUmVzTG9hZGluZ0Fzc2V0XCI7XHJcbmltcG9ydCB7IEVSZXNFcnJvciB9IGZyb20gXCIuL2NvbW1vbi9FUmVzRXJyb3JcIjtcclxuaW1wb3J0IHsgJEVSZXNFdmVudE5hbWUgfSBmcm9tIFwiLi9FUmVzRXZlbnROYW1lXCI7XHJcbmltcG9ydCB7ICRSZXNFdmVudCB9IGZyb20gXCIuL1Jlc0V2ZW50XCI7XHJcbmltcG9ydCB7IEJhc2VNZ3IgfSBmcm9tIFwiem1nX21nclwiO1xyXG5pbXBvcnQgeyBTdHJpbmdVdGlsIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7ICREcmFnb25SZXNBc3NldCB9IGZyb20gXCIuL2Fzc2V0cy9EcmFnb25SZXNBc3NldFwiO1xyXG5pbXBvcnQgeyAkUmVzTGlzdGVuZXIgfSBmcm9tIFwiLi9SZXNMaXN0ZW5lclwiO1xyXG5pbXBvcnQgeyBfU3lzdGVtQnVuZGxlTmFtZSB9IGZyb20gXCIuL1N5c3RlbUJ1bmRsZU5hbWVcIjtcclxuaW1wb3J0IHsgQ29uZmlnTWdyIH0gZnJvbSBcInptZ19jb25maWdfbWdyXCI7XHJcbmltcG9ydCB7ICRSZXNDYWNoZUxpYiB9IGZyb20gXCIuL1Jlc0NhY2hlTGliXCI7XHJcbmltcG9ydCB7ICRSZXNSZW1vdGVDYWNoZUxpYiB9IGZyb20gXCIuL1Jlc1JlbW90ZUNhY2hlTGliXCI7XHJcbmltcG9ydCB7ICRCdW5kbGVDYWNoZUxpYiB9IGZyb20gXCIuL0J1bmRsZUNhY2hlTGliXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgX1Jlc01nciBleHRlbmRzIEJhc2VNZ3IgaW1wbGVtZW50cyB6bWcuSVJlc01nciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IF9SZXNNZ3I7XHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogX1Jlc01nciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfUmVzTWdyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDYWNoZUxpYihuZXcgJEJ1bmRsZUNhY2hlTGliKF9TeXN0ZW1CdW5kbGVOYW1lLlVJKSk7XHJcbiAgICAgICAgdGhpcy5zZXRDYWNoZUxpYihuZXcgJEJ1bmRsZUNhY2hlTGliKF9TeXN0ZW1CdW5kbGVOYW1lLlNUQUNLKSk7XHJcbiAgICAgICAgdGhpcy5zZXRDYWNoZUxpYihuZXcgJEJ1bmRsZUNhY2hlTGliKF9TeXN0ZW1CdW5kbGVOYW1lLkNPTkZJRykpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfbGlzdGVuZXJzOiB6bWcuSVJlc0xpc3RlbmVyW10gPSBbXTtcclxuICAgIHByaXZhdGUgX2xpYnM6IFJlY29yZDxzdHJpbmcsICRSZXNDYWNoZUxpYj4gPSB7fTtcclxuICAgIHB1YmxpYyBzZXRDYWNoZUxpYihsaWI6ICRSZXNDYWNoZUxpYik6IHZvaWQge1xyXG4gICAgICAgIGxldCBvbGQgPSB0aGlzLl9saWJzW2xpYi5uYW1lXTtcclxuICAgICAgICBpZiAob2xkKSB7XHJcbiAgICAgICAgICAgIG9sZC5vZmYoJEVSZXNFdmVudE5hbWUuQ09NUExFVEUsIHRoaXMub25SZXNDb21wbGV0ZSwgdGhpcyk7XHJcbiAgICAgICAgICAgIG9sZC5vZmYoJEVSZXNFdmVudE5hbWUuUFJPR1JFU1MsIHRoaXMub25Qcm9ncmVzcywgdGhpcyk7XHJcbiAgICAgICAgICAgIG9sZC5vZmYoJEVSZXNFdmVudE5hbWUuRVJST1IsIHRoaXMub25SZXNFcnJvciwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChsaWIpIHtcclxuICAgICAgICAgICAgbGliLm9uKCRFUmVzRXZlbnROYW1lLkNPTVBMRVRFLCB0aGlzLm9uUmVzQ29tcGxldGUsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgbGliLm9uKCRFUmVzRXZlbnROYW1lLlBST0dSRVNTLCB0aGlzLm9uUHJvZ3Jlc3MsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgbGliLm9uKCRFUmVzRXZlbnROYW1lLkVSUk9SLCB0aGlzLm9uUmVzRXJyb3IsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGlic1tsaWIubmFtZV0gPSBsaWI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Q2FjaGVMaWIoYnVuTmFtZTogc3RyaW5nKTogJFJlc0NhY2hlTGliIHtcclxuICAgICAgICB2YXIgbGliOiAkUmVzQ2FjaGVMaWIgPSB0aGlzLl9saWJzW2J1bk5hbWVdO1xyXG4gICAgICAgIGlmIChsaWIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGxpYjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJ1bk5hbWUgPT0gX1N5c3RlbUJ1bmRsZU5hbWUuUkVNT1RFKSB7XHJcbiAgICAgICAgICAgIGxpYiA9IG5ldyAkUmVzUmVtb3RlQ2FjaGVMaWIoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgbW9kdWxlID0gQ29uZmlnTWdyLmdldE1vZHVsZUNvbmZpZ0J5Q29kZShidW5OYW1lKTtcclxuICAgICAgICAgICAgaWYgKCFtb2R1bGUgfHwgIW1vZHVsZS5pc1JlbW90ZSkge1xyXG4gICAgICAgICAgICAgICAgbGliID0gbmV3ICRSZXNDYWNoZUxpYihidW5OYW1lKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxpYiA9IG5ldyAkQnVuZGxlQ2FjaGVMaWIoYnVuTmFtZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbGlic1tidW5OYW1lXSA9IGxpYjtcclxuICAgICAgICBsaWIub24oJEVSZXNFdmVudE5hbWUuQ09NUExFVEUsIHRoaXMub25SZXNDb21wbGV0ZSwgdGhpcywgZmFsc2UpO1xyXG4gICAgICAgIGxpYi5vbigkRVJlc0V2ZW50TmFtZS5QUk9HUkVTUywgdGhpcy5vblByb2dyZXNzLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgbGliLm9uKCRFUmVzRXZlbnROYW1lLkVSUk9SLCB0aGlzLm9uUmVzRXJyb3IsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICByZXR1cm4gbGliO1xyXG4gICAgfVxyXG4gICAgc3RhcnQoKTogYW55IHtcclxuICAgIH1cclxuICAgIGRlc3Ryb3koKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgcmVsZWFzZUxpYihidW5OYW1lOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbGliOiAkUmVzQ2FjaGVMaWIgPSB0aGlzLl9saWJzW2J1bk5hbWVdO1xyXG4gICAgICAgIGlmIChsaWIpIHtcclxuICAgICAgICAgICAgbGliLnJlbGVhc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiDlop7liqDnm5HlkKzogIVcclxuICAgICogQHBhcmFtIGxpc3RlbmVyIFxyXG4gICAgKi9cclxuICAgIGFkZExpc3RlbmVyKGxpc3RlbmVyOiB6bWcuSVJlc0xpc3RlbmVyLCBsaWJzOiB6bWcuSVJlc0NhY2hlTGliLCBidW5OYW1lPzogc3RyaW5nLCBwYXRoPzogc3RyaW5nIHwgc3RyaW5nW10sIGlzRGlyPzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGxldCBsaXN0ID0gdGhpcy5pbml0TGlzdGVuZXIobGlzdGVuZXIsIGxpYnMsIGJ1bk5hbWUsIHBhdGgsIGlzRGlyKTtcclxuICAgICAgICBsaXN0ICYmIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3QpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpbml0TGlzdGVuZXIobGlzdGVuZXI6IHptZy5JUmVzTGlzdGVuZXIsIGxpYnM6IHptZy5JUmVzQ2FjaGVMaWIsIGJ1bk5hbWU/OiBzdHJpbmcsIHBhdGg/OiBzdHJpbmcgfCBzdHJpbmdbXSwgaXNEaXI/OiBib29sZWFuKTogem1nLklSZXNMaXN0ZW5lciB7XHJcbiAgICAgICAgaWYgKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyLmxpYnMgPSBsaWJzO1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5aSW6YOo5Y+v6IO95LiA5LiqbGlzdGVy55uR5ZCs5aSa5Liq5LiL6L295Zue6LCDXHJcbiAgICAgICAgICAgICAqIOaJgOS7pemcgOimgeS/neivgeWFi+mahuWHuuadpVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVyLnBhdGggPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbGlzdGVuZXIucGF0aCA9IHBhdGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyLmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5wYXRoID0gcGF0aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBsaXN0ZW5lci5wYXRoID0gcGF0aDtcclxuICAgICAgICAgICAgbGlzdGVuZXIuaXNEaXIgPSBpc0RpcjtcclxuICAgICAgICAgICAgbGlzdGVuZXIuYnVuTmFtZSA9IGJ1bk5hbWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBsaXN0ZW5lcjtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog56e76Zmk55uR5ZCs6ICFXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxyXG4gICAgICovXHJcbiAgICByZW1vdmVMaXN0ZXIodGFyZ2V0OiBhbnkgfCB6bWcuSVJlc0xpc3RlbmVyKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiL6L296LWE5rqQXHJcbiAgICAgKiBAcGFyYW0gYnVuZGxlIFxyXG4gICAgICogQHBhcmFtIHBhdGggXHJcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkKGJ1bk5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nIHwgc3RyaW5nW10sIGhhbmRsZXJPckxpc3RlbmVyOiBhbnksIHRhcmdldD86IGFueSwgdHlwZT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChoYW5kbGVyT3JMaXN0ZW5lciBpbnN0YW5jZW9mICRSZXNMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLiQkbG9hZChidW5OYW1lLCBwYXRoLCBoYW5kbGVyT3JMaXN0ZW5lciwgdHlwZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy4kbG9hZChidW5OYW1lLCBwYXRoLCBoYW5kbGVyT3JMaXN0ZW5lciwgdGFyZ2V0LCB0eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlICRsb2FkKGJ1bk5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nIHwgc3RyaW5nW10sIGhhbmRsZXI6IChhc3NldHM6IGNjLkFzc2V0IHwgY2MuQXNzZXRbXSwgbGlzdGVuZXI/OiB6bWcuSVJlc0xpc3RlbmVyKSA9PiB2b2lkLCB0YXJnZXQ6IGFueSwgdHlwZT86IHR5cGVvZiBjYy5Bc3NldCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuJCRsb2FkKGJ1bk5hbWUsIHBhdGgsIG5ldyAkUmVzTGlzdGVuZXIodGFyZ2V0LCBoYW5kbGVyKSwgdHlwZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlICQkbG9hZChidW5OYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZyB8IHN0cmluZ1tdLCBsaXN0ZW5lcj86IHptZy5JUmVzTGlzdGVuZXIsIHR5cGU/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXBhdGgpIHtcclxuICAgICAgICAgICAgZ1dhcm4oXCLotYTmupDlnLDlnYDmnKrlrprkuYnvvIzml6Dms5XliqDovb3mlofku7YhXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvYWQoYnVuTmFtZSwgcGF0aCwgZmFsc2UsIGxpc3RlbmVyLCB0eXBlKTtcclxuICAgIH1cclxuICAgIC8vIHB1YmxpYyAkbG9hZEFueShwYXJhbTogem1nLklSZXNBc3NldCB8IHN0cmluZywgaGFuZGxlcj86IChhc3NldHM6IGNjLkFzc2V0IHwgY2MuQXNzZXRbXSwgbGlzdGVuZXI/OiB6bWcuSVJlc0xpc3RlbmVyKSA9PiB2b2lkLCB0YXJnZXQ/OiBhbnksIHBhdGg/OiBzdHJpbmcsIHR5cGU/OiB0eXBlb2YgY2MuQXNzZXQpOiB2b2lkIHtcclxuICAgIC8vICAgICB0aGlzLmxvYWRBbnkocGFyYW0sIG5ldyBSZXNMaXN0ZW5lcih0YXJnZXQsIGhhbmRsZXIpLCBwYXRoLCB0eXBlKTtcclxuICAgIC8vIH1cclxuICAgIC8vIGxvYWRBbnkocGFyYW06IHptZy5JUmVzQXNzZXQgfCBzdHJpbmcsIGxpc3RlbmVyPzogem1nLklSZXNMaXN0ZW5lciwgcGF0aD86IHN0cmluZywgdHlwZT86IHR5cGVvZiBjYy5Bc3NldCk6IHZvaWQge1xyXG4gICAgLy8gICAgIGlmICh0eXBlb2YgKHBhcmFtKSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAvLyAgICAgICAgIGlmIChTdHJpbmdVdGlsLmlzSHR0cChwYXJhbSkpIHtcclxuICAgIC8vICAgICAgICAgICAgIHRoaXMubG9hZFJlbW90ZShwYXJhbSwgbGlzdGVuZXIsIHR5cGUpO1xyXG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICAgICAgdGhpcy5sb2FkKHBhcmFtLCBwYXRoLCBsaXN0ZW5lciwgdHlwZSk7XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgLy8gICAgICAgICB0aGlzLmxvYWRSZXMocGFyYW0sIGxpc3RlbmVyLCB0eXBlKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICAvKipcclxuICAgICAqIOS4i+i9vei1hOa6kFxyXG4gICAgICogQHBhcmFtIHJlcyBcclxuICAgICAqIEBwYXJhbSBoYW5kbGVyIFxyXG4gICAgICogQHBhcmFtIHRhcmdldCBcclxuICAgICAqIEBwYXJhbSB0eXBlIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZFJlcyhyZXM6IHptZy5JUmVzQXNzZXQsIGhhbmRsZXJPckxpc3RlbmVyOiBhbnksIHRhcmdldD86IGFueSwgdHlwZT86IHR5cGVvZiBjYy5Bc3NldCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChoYW5kbGVyT3JMaXN0ZW5lciBpbnN0YW5jZW9mICRSZXNMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLiQkbG9hZFJlcyhyZXMsIGhhbmRsZXJPckxpc3RlbmVyLCB0eXBlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLiRsb2FkUmVzKHJlcywgaGFuZGxlck9yTGlzdGVuZXIsIHRhcmdldCwgdHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSAkbG9hZFJlcyhyZXM6IHptZy5JUmVzQXNzZXQsIGhhbmRsZXI/OiAoYXNzZXRzOiBjYy5Bc3NldCB8IGNjLkFzc2V0W10sIGxpc3RlbmVyPzogem1nLklSZXNMaXN0ZW5lcikgPT4gdm9pZCwgdGFyZ2V0PzogYW55LCB0eXBlPzogdHlwZW9mIGNjLkFzc2V0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kJGxvYWRSZXMocmVzLCBuZXcgJFJlc0xpc3RlbmVyKHRhcmdldCwgaGFuZGxlciksIHR5cGUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSAkJGxvYWRSZXMocmVzOiB6bWcuSVJlc0Fzc2V0LCBsaXN0ZW5lcj86IHptZy5JUmVzTGlzdGVuZXIsIHR5cGU/OiB0eXBlb2YgY2MuQXNzZXQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXJlcyB8fCAhU3RyaW5nVXRpbC5pc1ZhbGlkKHJlcy5idW5OYW1lKSB8fCAhU3RyaW5nVXRpbC5pc1ZhbGlkKHJlcy5wYXRoKSkge1xyXG4gICAgICAgICAgICBnV2FybihcIui1hOa6kOS4jeaYjuehru+8jOaXoOazleWKoOi9veaWh+S7tiFcIiwgcmVzKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9sb2FkKHJlcy5idW5OYW1lLCByZXMucGF0aCwgZmFsc2UsIGxpc3RlbmVyLCB0eXBlKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5LiL6L295Zy65pmvXHJcbiAgICAgKiBAcGFyYW0gYnVuTmFtZSBcclxuICAgICAqIEBwYXJhbSBwYXRoIFxyXG4gICAgICogQHBhcmFtIGhhbmRsZXIgXHJcbiAgICAgKiBAcGFyYW0gdGFyZ2V0IFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZFNjZW5lKGJ1bk5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBoYW5kbGVyPzogYW55LCB0YXJnZXQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAoaGFuZGxlciBpbnN0YW5jZW9mICRSZXNMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLiQkbG9hZFNjZW5lKGJ1bk5hbWUsIHBhdGgsIGhhbmRsZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxvYWRTY2VuZShidW5OYW1lLCBwYXRoLCBoYW5kbGVyLCB0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgJGxvYWRTY2VuZShidW5OYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZywgaGFuZGxlcj86IChhc3NldHM6IGNjLkFzc2V0IHwgY2MuQXNzZXRbXSwgbGlzdGVuZXI/OiB6bWcuSVJlc0xpc3RlbmVyKSA9PiB2b2lkLCB0YXJnZXQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiQkbG9hZFNjZW5lKGJ1bk5hbWUsIHBhdGgsIG5ldyAkUmVzTGlzdGVuZXIodGFyZ2V0LCBoYW5kbGVyKSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlICQkbG9hZFNjZW5lKGJ1bk5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBsaXN0ZW5lcj86IHptZy5JUmVzTGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXBhdGgpIHtcclxuICAgICAgICAgICAgZ1dhcm4oXCLotYTmupDlnLDlnYDmnKrlrprkuYnvvIzml6Dms5XliqDovb3lnLrmma8hXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGxldCBsaWI6IFJlc0NhY2hlTGliID0gdGhpcy5nZXRDYWNoZUxpYihidW5OYW1lKTtcclxuICAgICAgICAvLyB0aGlzLl9sb2FkTHVuY2goYnVuTmFtZSwgcGF0aCwgZmFsc2UsIGNjLlNjZW5lQXNzZXQpO1xyXG4gICAgICAgIC8vIHRoaXMuYWRkTGlzdGVuZXIobGlzdGVuZXIsIGxpYiwgYnVuTmFtZSwgcGF0aCk7XHJcbiAgICAgICAgdGhpcy5fbG9hZChidW5OYW1lLCBwYXRoLCBmYWxzZSwgbGlzdGVuZXIsIGNjLlNjZW5lQXNzZXQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5LiL6L2955uu5b2V5YaF6LWE5rqQXHJcbiAgICAgKiBAcGFyYW0gcmVzTmFtZSBcclxuICAgICAqIEBwYXJhbSBwYXRoIFxyXG4gICAgICogQHBhcmFtIGxpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZERpcihidW5OYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZyB8IHN0cmluZ1tdLCBoYW5kbGVyPzogYW55LCB0YXJnZXQ/OiBhbnksIHR5cGU/OiB0eXBlb2YgY2MuQXNzZXQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoaGFuZGxlciBpbnN0YW5jZW9mICRSZXNMaXN0ZW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLiQkbG9hZERpcihidW5OYW1lLCBwYXRoLCBoYW5kbGVyLCB0YXJnZXQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxvYWREaXIoYnVuTmFtZSwgcGF0aCwgaGFuZGxlciwgdGFyZ2V0LCB0eXBlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlICRsb2FkRGlyKGJ1bk5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nIHwgc3RyaW5nW10sIGhhbmRsZXI/OiAoYXNzZXRzOiBjYy5Bc3NldCB8IGNjLkFzc2V0W10sIGxpc3RlbmVyPzogem1nLklSZXNMaXN0ZW5lcikgPT4gdm9pZCwgdGFyZ2V0PzogYW55LCB0eXBlPzogdHlwZW9mIGNjLkFzc2V0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kJGxvYWREaXIoYnVuTmFtZSwgcGF0aCwgbmV3ICRSZXNMaXN0ZW5lcih0YXJnZXQsIGhhbmRsZXIpLCB0eXBlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgJCRsb2FkRGlyKGJ1bk5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nIHwgc3RyaW5nW10sIGxpc3RlbmVyPzogem1nLklSZXNMaXN0ZW5lciwgdHlwZT86IHR5cGVvZiBjYy5Bc3NldCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghcGF0aCkge1xyXG4gICAgICAgICAgICBnV2FybihcIui1hOa6kOWcsOWdgOacquWumuS5ie+8jOaXoOazleWKoOi9veebruW9lSFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fbG9hZChidW5OYW1lLCBwYXRoLCB0cnVlLCBsaXN0ZW5lciwgdHlwZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIvovb1idW5kbGXpvpnpqqjotYTmupBcclxuICAgICAqIEBwYXJhbSByZXNOYW1lIFxyXG4gICAgICogQHBhcmFtIHBhdGggXHJcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkRHJhZ29uKGJ1bk5hbWU6IHN0cmluZywgcGF0aDogem1nLklEcmFnb25SZXNBc3NldCB8IHN0cmluZywgaGFuZGxlcj86IGFueSwgdGFyZ2V0PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGhhbmRsZXIgaW5zdGFuY2VvZiAkRHJhZ29uUmVzTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy4kJGxvYWREcmFnb24oYnVuTmFtZSwgcGF0aCwgaGFuZGxlcik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy4kbG9hZERyYWdvbihidW5OYW1lLCBwYXRoLCBoYW5kbGVyLCB0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgJGxvYWREcmFnb24oYnVuTmFtZTogc3RyaW5nLCBwYXRoOiB6bWcuSURyYWdvblJlc0Fzc2V0IHwgc3RyaW5nLCBoYW5kbGVyPzogKGFzc2V0czogRHJhZ29uQXNzZXQsIGxpc3RlbmVyPzogem1nLklSZXNMaXN0ZW5lcikgPT4gdm9pZCwgdGFyZ2V0PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kJGxvYWREcmFnb24oYnVuTmFtZSwgcGF0aCwgbmV3ICREcmFnb25SZXNMaXN0ZW5lcih0YXJnZXQsIGhhbmRsZXIpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgJCRsb2FkRHJhZ29uKGJ1bk5hbWU6IHN0cmluZywgcGF0aDogem1nLklEcmFnb25SZXNBc3NldCB8IHN0cmluZywgbGlzdGVuZXI/OiAkRHJhZ29uUmVzTGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXBhdGgpIHtcclxuICAgICAgICAgICAgZ1dhcm4oXCLotYTmupDlnLDlnYDmnKrlrprkuYnvvIzml6Dms5XliqDovb1cIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFsaXN0ZW5lcikge1xyXG4gICAgICAgICAgICBsaXN0ZW5lciA9IG5ldyAkRHJhZ29uUmVzTGlzdGVuZXIodGhpcywgbnVsbCwgbnVsbCwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgKHBhdGgpID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgcGF0aCA9IG5ldyAkRHJhZ29uUmVzQXNzZXQocGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXRoLmlzRGlyKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5fbG9hZChidW5OYW1lLCBwYXRoLmRpciwgdHJ1ZSwgbGlzdGVuZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2xvYWQoYnVuTmFtZSwgW3BhdGguYXNzZXQsIHBhdGguYXRsYXMsIHBhdGgudGV4XSwgZmFsc2UsIGxpc3RlbmVyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDkuIvovb3ov5znqIvotYTmupBcclxuICAgICAqIEBwYXJhbSBwYXRoIFxyXG4gICAgICogQHBhcmFtIGxpc3RlbmVyIFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZFJlbW90ZShwYXRoOiBzdHJpbmcgfCBzdHJpbmdbXSwgaGFuZGxlcj86IGFueSwgdGFyZ2V0PzogYW55LCB0eXBlPzogdHlwZW9mIGNjLkFzc2V0KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGhhbmRsZXIgaW5zdGFuY2VvZiAkUmVzTGlzdGVuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy4kJGxvYWRSZW1vdGUocGF0aCwgaGFuZGxlciwgdHlwZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy4kbG9hZFJlbW90ZShwYXRoLCBoYW5kbGVyLCB0YXJnZXQsIHR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgJGxvYWRSZW1vdGUocGF0aDogc3RyaW5nIHwgc3RyaW5nW10sIGhhbmRsZXI/OiAoYXNzZXRzOiBjYy5Bc3NldCB8IGNjLkFzc2V0W10sIGxpc3RlbmVyPzogem1nLklSZXNMaXN0ZW5lcikgPT4gdm9pZCwgdGFyZ2V0PzogYW55LCB0eXBlPzogdHlwZW9mIGNjLkFzc2V0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy4kJGxvYWRSZW1vdGUocGF0aCwgbmV3ICRSZXNMaXN0ZW5lcih0YXJnZXQsIGhhbmRsZXIpLCB0eXBlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgJCRsb2FkUmVtb3RlKHBhdGg6IHN0cmluZyB8IHN0cmluZ1tdLCBsaXN0ZW5lcj86IHptZy5JUmVzTGlzdGVuZXIsIHR5cGU/OiB0eXBlb2YgY2MuQXNzZXQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9sb2FkKF9TeXN0ZW1CdW5kbGVOYW1lLlJFTU9URSwgcGF0aCwgZmFsc2UsIGxpc3RlbmVyLCB0eXBlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4i+i9vei/nOeoi+m+memqqOi1hOa6kFxyXG4gICAgICogQHBhcmFtIHBhdGggXHJcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXIgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkRHJhZ29uUmVtb3RlKHBhdGg6IHptZy5JRHJhZ29uUmVzQXNzZXQsIGhhbmRsZXI/OiBhbnksIHRhcmdldD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChoYW5kbGVyIGluc3RhbmNlb2YgJERyYWdvblJlc0xpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuJCRsb2FkRHJhZ29uUmVtb3RlKHBhdGgsIGhhbmRsZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuJGxvYWREcmFnb25SZW1vdGUocGF0aCwgaGFuZGxlciwgdGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlICRsb2FkRHJhZ29uUmVtb3RlKHBhdGg6IHptZy5JRHJhZ29uUmVzQXNzZXQsIGhhbmRsZXI/OiAoYXNzZXRzOiBEcmFnb25Bc3NldCwgbGlzdGVuZXI/OiB6bWcuSVJlc0xpc3RlbmVyKSA9PiB2b2lkLCB0YXJnZXQ/OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLiQkbG9hZERyYWdvblJlbW90ZShwYXRoLCBuZXcgJERyYWdvblJlc0xpc3RlbmVyKHRhcmdldCwgaGFuZGxlcikpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSAkJGxvYWREcmFnb25SZW1vdGUocGF0aDogem1nLklEcmFnb25SZXNBc3NldCwgbGlzdGVuZXI/OiAkRHJhZ29uUmVzTGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAocGF0aC5pc0RpcigpKSB7XHJcbiAgICAgICAgICAgIGdXYXJuKFwi6L+c56iL6LWE5rqQ5peg5rOV5oyJ54Wn55uu5b2V5Yqg6L29XCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2xvYWQoX1N5c3RlbUJ1bmRsZU5hbWUuUkVNT1RFLCBbcGF0aC5hdGxhcywgcGF0aC5hc3NldCwgcGF0aC50ZXhdLCBmYWxzZSwgbGlzdGVuZXIsIFtjYy5UZXh0QXNzZXQsIGNjLlRleHRBc3NldF0pO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGlzVmFpbGRBc3NldChidW5OYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPGFueT4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBjYy5hc3NldE1hbmFnZXIubG9hZEJ1bmRsZShidW5OYW1lLCAoZXJyLCBidW5kbGU6IGNjLkFzc2V0TWFuYWdlci5CdW5kbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICBnTG9nKFwi6LWE5rqQ5LiL6L296ZSZ6K+vOlwiICsgYnVuTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KFwiYnVuTmFtZTogXCIgKyBidW5OYW1lICsgXCIg5LiN5a2Y5Zyo77yBXCIpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBnTG9nKFwi5qih5Z2X6YWN572u6KGo5bey5LiL6L2977yMYnVuZGxlTmFtZTogXCIgKyBidW5OYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgaW5mbzogUmVjb3JkPHN0cmluZywgYW55PiA9IGJ1bmRsZS5nZXRJbmZvV2l0aFBhdGgocGF0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZm8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSAmJiByZXNvbHZlKGluZm8pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdChcImJ1bk5hbWU6IFwiICsgYnVuTmFtZSArIFwiIHBhdGg6XCIgKyBwYXRoICsgXCIg5LiN5a2Y5ZyoIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5riF55CG5omA5pyJ57yT5a2YXHJcbiAgICAgKi9cclxuICAgIGNsZWFyQ2FjaGUoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmjInnhadidW5kbGXmuIXnkIbnvJPlrZhcclxuICAgICAqIEBwYXJhbSByZXNOYW1lIFxyXG4gICAgICovXHJcbiAgICBjbGVhckJ1bmRsZUNhY2hlKHJlc05hbWU6IHN0cmluZyk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBfbG9hZChidW5OYW1lOiBzdHJpbmcsIHBhdGg6IHN0cmluZyB8IHN0cmluZ1tdLCBpc0RpcjogYm9vbGVhbiwgbGlzdGVuZXI/OiB6bWcuSVJlc0xpc3RlbmVyLCB0eXBlPzogdHlwZW9mIGNjLkFzc2V0IHwgdHlwZW9mIGNjLkFzc2V0W10pIHtcclxuICAgICAgICBsZXQgZXZ0OiAkUmVzRXZlbnQ7XHJcbiAgICAgICAgbGV0IGlzTG9hZGVkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgICAgICBsZXQgcmVzQXNzZXQ6IGNjLkFzc2V0IHwgY2MuQXNzZXRbXTtcclxuICAgICAgICBsZXQgbGliOiAkUmVzQ2FjaGVMaWIgPSB0aGlzLmdldENhY2hlTGliKGJ1bk5hbWUpO1xyXG4gICAgICAgIGF3YWl0IGxpYi5pbml0KCk7XHJcbiAgICAgICAgaWYgKHBhdGggaW5zdGFuY2VvZiBBcnJheSkge1xyXG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgICAgICByZXNBc3NldCA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBwYXRoLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYXNzZXRzOiBjYy5Bc3NldCB8IGNjLkFzc2V0W10gPSBsaWIuZ2V0QXNzZXQocGF0aFtpXSwgaXNEaXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQoYXNzZXRzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc0Fzc2V0ID0gcmVzQXNzZXQuY29uY2F0KGFzc2V0cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZ0ID0gbmV3ICRSZXNFdmVudCgkRVJlc0V2ZW50TmFtZS5DT01QTEVURSwgYnVuTmFtZSwgcGF0aFtpXSwgYXNzZXRzKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUmVzQ29tcGxldGUoZXZ0KTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2V0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL+ato+WcqOWKoOi9veS4rS4uLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/miJbogIXlhbbkuK3lrZjlnKjplJnor6/otYTmupAuLi5cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFzc2V0cyA9PSBSZXNFcnJvckFzc2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldnQgPSBuZXcgJFJlc0V2ZW50KCRFUmVzRXZlbnROYW1lLkVSUk9SLCBidW5OYW1lLCBwYXRoW2ldLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25SZXNFcnJvcihldnQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZEx1bmNoKGJ1bk5hbWUsIHBhdGhbaV0sIGlzRGlyLCAodHlwZSBpbnN0YW5jZW9mIEFycmF5KSA/IHR5cGVbaV0gOiB0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXNBc3NldCA9IGxpYi5nZXRBc3NldChwYXRoLCBpc0Rpcik7XHJcbiAgICAgICAgICAgIGlmIChjYy5pc1ZhbGlkKHJlc0Fzc2V0KSkge1xyXG4gICAgICAgICAgICAgICAgZXZ0ID0gbmV3ICRSZXNFdmVudCgkRVJlc0V2ZW50TmFtZS5DT01QTEVURSwgYnVuTmFtZSwgcGF0aCwgcmVzQXNzZXQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vblJlc0NvbXBsZXRlKGV2dCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzQXNzZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzQXNzZXQgPT0gUmVzRXJyb3JBc3NldCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBldnQgPSBuZXcgJFJlc0V2ZW50KCRFUmVzRXZlbnROYW1lLkVSUk9SLCBidW5OYW1lLCBwYXRoLCBudWxsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJlc0Vycm9yKGV2dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy/otYTmupDooqvplIDmr4HvvIzpnIDopoHph43mlrDliqDovb1cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9hZEx1bmNoKGJ1bk5hbWUsIHBhdGgsIGlzRGlyLCB0eXBlIGFzIHR5cGVvZiBjYy5Bc3NldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2FkTHVuY2goYnVuTmFtZSwgcGF0aCwgaXNEaXIsIHR5cGUgYXMgdHlwZW9mIGNjLkFzc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICBpc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc0xvYWRlZCkge1xyXG4gICAgICAgICAgICAvL+WKoOi9veWujOavlVxyXG4gICAgICAgICAgICBsZXQgbGlzdCA9IHRoaXMuaW5pdExpc3RlbmVyKGxpc3RlbmVyLCBsaWIsIGJ1bk5hbWUsIHBhdGgsIGlzRGlyKTtcclxuICAgICAgICAgICAgbGlzdCAmJiBsaXN0Lm9uTGF1bmNoKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy/liqDovb3kuK0uLi5cclxuICAgICAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcihsaXN0ZW5lciwgbGliLCBidW5OYW1lLCBwYXRoLCBpc0Rpcik7XHJcbiAgICAgICAgICAgIChyZXNBc3NldCBpbnN0YW5jZW9mIEFycmF5KSAmJiAocmVzQXNzZXQubGVuZ3RoID0gMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfbG9hZEx1bmNoKGJ1bk5hbWU6IHN0cmluZywgcGF0aDogc3RyaW5nLCBpc0RpcjogYm9vbGVhbiwgdHlwZTogdHlwZW9mIGNjLkFzc2V0KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGV2dDogJFJlc0V2ZW50O1xyXG4gICAgICAgIGxldCBsaWI6ICRSZXNDYWNoZUxpYiA9IHRoaXMuZ2V0Q2FjaGVMaWIoYnVuTmFtZSk7XHJcbiAgICAgICAgLy8gbGV0IGxvYWRBc3NldHM6IGNjLkFzc2V0IHwgY2MuQXNzZXRbXTtcclxuICAgICAgICAvLyBsb2FkQXNzZXRzID0gbGliLmdldEFzc2V0KHBhdGgpO1xyXG4gICAgICAgIC8vIGlmIChsb2FkQXNzZXRzKSB7XHJcbiAgICAgICAgLy8gICAgIC8v6LWE5rqQ5bey5LiL6L295a6M5q+VXHJcbiAgICAgICAgLy8gICAgIGlmIChjYy5pc1ZhbGlkKGxvYWRBc3NldHMpKSB7XHJcbiAgICAgICAgLy8gICAgICAgICBldnQgPSBuZXcgUmVzRXZlbnQoRVJlc0V2ZW50TmFtZS5DT01QTEVURSwgYnVuTmFtZSwgcGF0aCwgbG9hZEFzc2V0cyk7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm9uUmVzQ29tcGxldGUoZXZ0KTtcclxuICAgICAgICAvLyAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAgICAgICAgIC8v6Z2e5rOV6LWE5rqQXHJcbiAgICAgICAgLy8gICAgICAgICBldnQgPSBuZXcgUmVzRXZlbnQoRVJlc0V2ZW50TmFtZS5FUlJPUiwgYnVuTmFtZSwgcGF0aCwgbG9hZEFzc2V0cyk7XHJcbiAgICAgICAgLy8gICAgICAgICB0aGlzLm9uUmVzRXJyb3IoZXZ0KTtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgLy/nrYnlvoXotYTmupDkuIvovb0uLi5cclxuICAgICAgICBsaWIubG9hZEFzc2V0KHBhdGgsIGlzRGlyLCB0eXBlKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblJlc0NvbXBsZXRlKGV2dDogJFJlc0V2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgICAgICAgdGhpcy5vblJlc0x1bmNoKHRoaXMuZmluZExpc3RlbmVyKGV2dC5idW5OYW1lLCBldnQucGF0aCwgZmFsc2UsIHRydWUpLCBldnQuYXNzZXRzKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblByb2dyZXNzKGV2dDogJFJlc0V2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxpc3RuZXJzID0gdGhpcy5maW5kTGlzdGVuZXIoZXZ0LmJ1bk5hbWUsIGV2dC5wYXRoLCBmYWxzZSwgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKGxpc3RuZXJzKSB7XHJcbiAgICAgICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxldCBsZW46IG51bWJlciA9IGxpc3RuZXJzLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsaXN0bmVyc1tpXS5vblByb2dyZXNzKGV2dC5wYXRoIGFzIHN0cmluZywgZXZ0LmZpbmlzaCwgZXZ0LnRvdGFsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uUmVzRXJyb3IoZXZ0OiAkUmVzRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgICAgICBsZXQgbGlzdCA9IHRoaXMuZmluZExpc3RlbmVyKGV2dC5idW5OYW1lLCBldnQucGF0aCwgZmFsc2UsIHRydWUpO1xyXG4gICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gbGlzdC5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpc3RbaV0ub25FcnJvcihldnQucGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblJlc0x1bmNoKGxpc3RlbmVyczogem1nLklSZXNMaXN0ZW5lcltdLCBhc3NldDogY2MuQXNzZXQgfCBjYy5Bc3NldFtdKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGk6IG51bWJlcjtcclxuICAgICAgICBsZXQgbGlzdGVuZXI6IHptZy5JUmVzTGlzdGVuZXI7XHJcbiAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gbGlzdGVuZXJzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmVyc1tpXTtcclxuICAgICAgICAgICAgaWYgKGxpc3RlbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAvL+WFqOmDqOS4i+i9vemDvei/m+ihjOi/h+WwneivlVxyXG4gICAgICAgICAgICAgICAgbGV0IGFzc2V0czogY2MuQXNzZXRbXSB8IGNjLkFzc2V0O1xyXG4gICAgICAgICAgICAgICAgaWYgKChsaXN0ZW5lci5wYXRoIGluc3RhbmNlb2YgQXJyYXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhcyA9IGxpc3RlbmVyLmdldEFzc2V0KCkgYXMgY2MuQXNzZXRbXTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFzICYmIHRhcy5sZW5ndGggPT0gbGlzdGVuZXIucGF0aC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXRzID0gdGFzO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXNzZXRzID0gYXNzZXQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoYXNzZXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnNwbGljZSh0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lciksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBldnQgPSBsaXN0ZW5lci5vbkxhdW5jaChhc3NldHMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChldnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBmaW5kTGlzdGVuZXIoYnVuTmFtZTogc3RyaW5nLCBwYXRoOiBzdHJpbmcgfCBzdHJpbmdbXSwgaXNEZWxldGU6IGJvb2xlYW4gPSB0cnVlLCBpc0luY2x1ZGUgPSBmYWxzZSk6IHptZy5JUmVzTGlzdGVuZXJbXSB7XHJcbiAgICAgICAgbGV0IGk6IG51bWJlcjtcclxuICAgICAgICBsZXQgYm9vbDogYm9vbGVhbjtcclxuICAgICAgICBsZXQgbGlzdGVuZXI6IHptZy5JUmVzTGlzdGVuZXI7XHJcbiAgICAgICAgbGV0IHJlc0xpc3RlbmVyOiB6bWcuSVJlc0xpc3RlbmVyW10gPSBbXTtcclxuICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSB0aGlzLl9saXN0ZW5lcnMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxpc3RlbmVyID0gdGhpcy5fbGlzdGVuZXJzW2ldO1xyXG4gICAgICAgICAgICBpZiAoY2MuaXNWYWxpZChsaXN0ZW5lci50YXJnZXQpKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIuYnVuTmFtZSA9PSBidW5OYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYm9vbCA9IGxpc3RlbmVyLnBhdGggPT0gcGF0aDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWJvb2wgJiYgaXNJbmNsdWRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5wYXRoIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvb2wgPSAobGlzdGVuZXIucGF0aC5pbmRleE9mKHBhdGggYXMgc3RyaW5nKSAhPSAtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJvb2wpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRGVsZXRlKSB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNMaXN0ZW5lci5wdXNoKGxpc3RlbmVyKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcy5yZW1vdmVMaXN0ZXIobGlzdGVuZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXNMaXN0ZW5lcjtcclxuICAgIH1cclxufSIsImltcG9ydCB7ICREcmFnb25SZXNBc3NldCB9IGZyb20gXCIuL2Fzc2V0cy9EcmFnb25SZXNBc3NldFwiO1xyXG5pbXBvcnQgeyAkRHJhZ29uUmVzTGlzdGVuZXIgfSBmcm9tIFwiLi9hc3NldHMvRHJhZ29uUmVzTGlzdGVuZXJcIjtcclxuaW1wb3J0IHsgJFJlc0Fzc2V0IH0gZnJvbSBcIi4vYXNzZXRzL1Jlc0Fzc2V0XCI7XHJcbmltcG9ydCB7ICRCdW5kbGVDYWNoZUxpYiB9IGZyb20gXCIuL0J1bmRsZUNhY2hlTGliXCI7XHJcbmltcG9ydCB7ICRFUmVzRXZlbnROYW1lIH0gZnJvbSBcIi4vRVJlc0V2ZW50TmFtZVwiO1xyXG5pbXBvcnQgeyAkUmVzQ2FjaGVMaWIgfSBmcm9tIFwiLi9SZXNDYWNoZUxpYlwiO1xyXG5pbXBvcnQgeyAkUmVzRXZlbnQgfSBmcm9tIFwiLi9SZXNFdmVudFwiO1xyXG5pbXBvcnQgeyAkUmVzTGlzdGVuZXIgfSBmcm9tIFwiLi9SZXNMaXN0ZW5lclwiO1xyXG5pbXBvcnQgeyBfUmVzTWdyIH0gZnJvbSBcIi4vUmVzTWdyXCI7XHJcbmltcG9ydCB7ICRSZXNVdGlsIH0gZnJvbSBcIi4vUmVzVXRpbHNcIjtcclxuaW1wb3J0IHsgX1N5c3RlbUJ1bmRsZU5hbWUgfSBmcm9tIFwiLi9TeXN0ZW1CdW5kbGVOYW1lXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmV4cG9ydCBsZXQgRVJlc0V2ZW50TmFtZSA9ICRFUmVzRXZlbnROYW1lO1xyXG5leHBvcnQgY2xhc3MgUmVzQXNzZXQgZXh0ZW5kcyAkUmVzQXNzZXQgeyB9O1xyXG5leHBvcnQgY2xhc3MgUmVzRXZlbnQgZXh0ZW5kcyAkUmVzRXZlbnQgeyB9O1xyXG5leHBvcnQgY2xhc3MgUmVzTGlzdGVuZXIgZXh0ZW5kcyAkUmVzTGlzdGVuZXIgeyB9O1xyXG5leHBvcnQgY2xhc3MgRHJhZ29uUmVzQXNzZXQgZXh0ZW5kcyAkRHJhZ29uUmVzQXNzZXQgeyB9O1xyXG5leHBvcnQgY2xhc3MgUmVzQ2FjaGVMaWIgZXh0ZW5kcyAkUmVzQ2FjaGVMaWIgeyB9O1xyXG5leHBvcnQgY2xhc3MgQnVuZGxlQ2FjaGVMaWIgZXh0ZW5kcyAkQnVuZGxlQ2FjaGVMaWIgeyB9O1xyXG5leHBvcnQgY2xhc3MgRHJhZ29uUmVzTGlzdGVuZXIgZXh0ZW5kcyAkRHJhZ29uUmVzTGlzdGVuZXIgeyB9O1xyXG5leHBvcnQgY2xhc3MgUmVzVXRpbCBleHRlbmRzICRSZXNVdGlsIHsgfTtcclxuXHJcblxyXG5leHBvcnQgbGV0IFN5c3RlbUJ1bmRsZU5hbWUgPSBfU3lzdGVtQnVuZGxlTmFtZTtcclxuXHJcbmV4cG9ydCBsZXQgUmVzTWdyID0gX1Jlc01nci5nZXRJbnN0YW5jZSgpOyJdLCJuYW1lcyI6WyJTdHJpbmdVdGlsIiwiZ1dhcm4iLCJEcmFnb25Bc3NldCIsImdMb2ciLCIkIiwiQ29uZmlnTWdyIiwiZ0Vycm9yIiwiQmFzZU1nciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
