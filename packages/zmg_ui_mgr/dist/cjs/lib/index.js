'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_event_mgr = require('zmg_event_mgr');
var zmg_audio_mgr = require('zmg_audio_mgr');
var zmg_res_mgr = require('zmg_res_mgr');
var zmg_util = require('zmg_util');
var zmg_webserver_mgr = require('zmg_webserver_mgr');
var zmg_mgr = require('zmg_mgr');
var zmg_config_mgr = require('zmg_config_mgr');
var zmg_ui_mgr = require('zmg_ui_mgr');
var zmg_camera_mgr = require('zmg_camera_mgr');
var zmg_controller = require('zmg_controller');

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
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

var $RoleEvent = /** @class */ (function (_super) {
    __extends($RoleEvent, _super);
    function $RoleEvent(type, param) {
        var _this = _super.call(this, type, false) || this;
        _this.param = param;
        return _this;
    }
    $RoleEvent.ACTION_CHANGE = zmg_event_mgr.EventName.UI_ROLE_ACTION_CHANGE;
    return $RoleEvent;
}(cc.Event));

var $UIEvent = /** @class */ (function (_super) {
    __extends($UIEvent, _super);
    function $UIEvent(type, param) {
        var _this = _super.call(this, type, false) || this;
        _this.param = param;
        return _this;
    }
    $UIEvent.COMPLETE = zmg_event_mgr.EventName.UI_READY;
    $UIEvent.TOAST_HIDE = "toastHide";
    $UIEvent.TOAST_SHOW = "toastshow";
    $UIEvent.VIDEO_HIDE = zmg_event_mgr.EventName.UI_VIDEO_HIDE;
    $UIEvent.VIDEO_SHOW = zmg_event_mgr.EventName.UI_VIDEO_SHOW;
    $UIEvent.LOAD_HIDE = zmg_event_mgr.EventName.UI_LOAD_HIDE;
    $UIEvent.LOAD_SHOW = zmg_event_mgr.EventName.UI_LOAD_SHOW;
    return $UIEvent;
}(cc.Event));

var $UIBackEvent = /** @class */ (function (_super) {
    __extends($UIBackEvent, _super);
    function $UIBackEvent() {
        return _super.call(this, $UIBackEvent.BACK, false) || this;
    }
    $UIBackEvent.BACK = zmg_event_mgr.EventName.UI_BACK_BTN;
    return $UIBackEvent;
}(cc.Event));

var $UIMouseEvent = /** @class */ (function (_super) {
    __extends($UIMouseEvent, _super);
    function $UIMouseEvent(type, worldPos) {
        var _this = _super.call(this, type, false) || this;
        _this.used = false;
        _this.worldPos = worldPos;
        return _this;
    }
    $UIMouseEvent.create = function (type, worldPos) {
        var evt = new $UIMouseEvent(type, worldPos);
        return evt;
    };
    $UIMouseEvent.prototype.getWorldPos = function () {
        return this.worldPos;
    };
    $UIMouseEvent.prototype.getLocation = function (node) {
        if (cc.isValid(node)) {
            return node.convertToNodeSpaceAR(this.worldPos);
        }
        return this.worldPos;
    };
    $UIMouseEvent.prototype.getIsHitNode = function (node) {
        if (cc.isValid(node) && node.activeInHierarchy && node.opacity) {
            return node["_hitTest"](this.worldPos);
        }
        return false;
        // return node.convertToNodeSpaceAR(this.worldPos);
    };
    $UIMouseEvent.prototype.getCanvasPos = function () {
        return this.getLocation(cc.Canvas.instance.node);
    };
    /**
     *
     */
    $UIMouseEvent.MOUSE_UP = zmg_event_mgr.EventName.UI_MOUSE_UP;
    $UIMouseEvent.MOUSE_DOWN = zmg_event_mgr.EventName.UI_MOUSE_DOWN;
    $UIMouseEvent.MOUSE_MOVE = zmg_event_mgr.EventName.UI_MOUSE_MOVE;
    $UIMouseEvent.TOUCH_MOVE = zmg_event_mgr.EventName.UI_TOUCH_MOVE;
    return $UIMouseEvent;
}(cc.Event));

/**
 *
 */
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var $RewardLayer = /** @class */ (function (_super) {
    __extends($RewardLayer, _super);
    function $RewardLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.reward = null;
        _this.noreward = null;
        _this.label = null;
        _this._count = 0;
        return _this;
    }
    $RewardLayer.prototype.setParent = function (parent) {
        this._parent = parent;
    };
    $RewardLayer.prototype.setMask = function (mask) {
        this._mask = mask;
    };
    $RewardLayer.prototype.onLoad = function () {
        var reward = this.node.getChildByName("reward");
        this.reward = reward.getComponent(dragonBones.ArmatureDisplay);
        var noreward = this.node.getChildByName("noreward");
        this.noreward = noreward.getComponent(dragonBones.ArmatureDisplay);
        var labelNode = this.node.getChildByName("label");
        labelNode && (this.label = labelNode.getComponent(cc.Label));
        this.reward.node.active = false;
        this.noreward.node.active = false;
    };
    $RewardLayer.prototype.onEnable = function () {
        this.reward.addEventListener(dragonBones.EventObject.COMPLETE, this.rewardComplete, this);
        this.noreward.addEventListener(dragonBones.EventObject.COMPLETE, this.rewardComplete, this);
    };
    $RewardLayer.prototype.onDisable = function () {
        this._mask && this._mask.hide("RewardLayer");
        this.reward.removeEventListener(dragonBones.EventObject.COMPLETE, this.rewardComplete, this);
        this.noreward.removeEventListener(dragonBones.EventObject.COMPLETE, this.rewardComplete, this);
    };
    $RewardLayer.prototype.rewardComplete = function () {
        this.hide();
        this._mask && this._mask.hide("RewardLayer");
        this.node.emit($RewardLayer.REWARD_OVER);
    };
    $RewardLayer.prototype.show = function (num) {
        this._count = num;
        if (!this.node.parent) {
            this.node.setParent(this._parent);
        }
        if (this._count) {
            this.reward.timeScale = 1;
            this.reward.node.active = true;
            this.reward.playAnimation("donghua", 1);
        }
        else {
            this.noreward.timeScale = 1;
            this.noreward.node.active = true;
            this.noreward.playAnimation("donghua", 1);
        }
        if (num) {
            this.label.node.active = true;
            this.label.string = '+' + num;
            this.label.node.y = 160;
            this.label.node.opacity = 0;
            cc.tween(this.label.node).to(0.3, { opacity: 0xff, x: 0, y: 220 }, { easing: "smooth" }).delay(1.0).start();
        }
        else {
            this.label.node.active = false;
        }
        this._mask && this._mask.show("RewardLayer");
        this.node.emit($RewardLayer.REWARD_START);
    };
    $RewardLayer.prototype.hide = function () {
        if (this.node.parent) {
            this.reward.node.active = false;
            this.noreward.node.active = false;
            this.node.setParent(null);
        }
    };
    $RewardLayer.REWARD_OVER = 'rewardOver';
    $RewardLayer.REWARD_START = 'rewardStart';
    __decorate([
        property({ type: dragonBones.ArmatureDisplay }),
        __metadata("design:type", dragonBones.ArmatureDisplay)
    ], $RewardLayer.prototype, "reward", void 0);
    __decorate([
        property({ type: dragonBones.ArmatureDisplay }),
        __metadata("design:type", dragonBones.ArmatureDisplay)
    ], $RewardLayer.prototype, "noreward", void 0);
    __decorate([
        property({ type: cc.Label }),
        __metadata("design:type", cc.Label)
    ], $RewardLayer.prototype, "label", void 0);
    return $RewardLayer;
}(cc.Component));

var $ERoleAction;
(function ($ERoleAction) {
    $ERoleAction["WALK_RIGHT"] = "walkright";
    $ERoleAction["WALK_LEFT"] = "walkleft";
    $ERoleAction["STAND"] = "stand";
    $ERoleAction["TALK"] = "talk";
    $ERoleAction["DIANZAN"] = "dianzan";
})($ERoleAction || ($ERoleAction = {}));
var $EPetAction;
(function ($EPetAction) {
    $EPetAction["UNKNOW"] = "unknow";
    $EPetAction["STAND"] = "anim_idle_2";
    $EPetAction["WALK"] = "anim_run_1";
})($EPetAction || ($EPetAction = {}));

//服装类型
var RoleClothType;
(function (RoleClothType) {
    /**全部 */
    RoleClothType["ALL"] = "ALL";
    /**套装 */
    RoleClothType["SET"] = "SET";
    /** 头饰 */
    RoleClothType["HEADWEAR"] = "HEADWEAR";
    /** 背饰 */
    RoleClothType["BACKWEAR"] = "BACKWEAR";
    /** 鞋子 */
    RoleClothType["SHOES"] = "SHOES";
    /** 手持道具 */
    RoleClothType["HANDHELD"] = "HANDHELD";
})(RoleClothType || (RoleClothType = {}));

var ERoleLevel;
(function (ERoleLevel) {
    ERoleLevel["HEAD"] = "head";
    ERoleLevel["BODY"] = "body";
    ERoleLevel["LEG_L"] = "leg_l";
    ERoleLevel["LEG_R"] = "leg_r";
    ERoleLevel["TUI_L"] = "tui_l";
    ERoleLevel["TUI_R"] = "tui_r";
    ERoleLevel["HAT"] = "hat";
    ERoleLevel["HAT_1"] = "hat_1";
    ERoleLevel["EYE"] = "eye";
    ERoleLevel["CROTCH"] = "crotch";
    ERoleLevel["NECK"] = "neck";
    ERoleLevel["EAR"] = "ear";
    ERoleLevel["EAR_R"] = "ear_r";
    ERoleLevel["EAR_L"] = "ear_l";
    ERoleLevel["HAND_R"] = "hand_r";
    ERoleLevel["BEARD"] = "beard";
    ERoleLevel["HAND_L"] = "hand_l";
    ERoleLevel["FOOT_L"] = "foot_l";
    ERoleLevel["FOOT_R"] = "foot_r";
    ERoleLevel["HOLD_R"] = "hold_r";
    ERoleLevel["HOLD_L"] = "hold_l";
    ERoleLevel["WING"] = "wing";
    ERoleLevel["WING_1"] = "wing_1";
    ERoleLevel["WING_2"] = "wing_2";
    ERoleLevel["MOUTH"] = "mouth";
    ERoleLevel["EYEBROW"] = "eyebrow";
    ERoleLevel["HAIR"] = "hair";
    ERoleLevel["JACKET"] = "jacket";
    ERoleLevel["TAIL"] = "tail";
})(ERoleLevel || (ERoleLevel = {}));
var RoleDressLevel = /** @class */ (function () {
    function RoleDressLevel() {
    }
    RoleDressLevel.getLevels = function (type) {
        switch (type) {
            case RoleClothType.BACKWEAR:
                return this.WING.concat();
            case RoleClothType.HANDHELD:
                return this.HOLD.concat();
            case RoleClothType.HEADWEAR:
                return this.HAT.concat();
            case RoleClothType.SET:
                return this.CLOTH.concat();
            case RoleClothType.SHOES:
                return this.SHOT.concat();
            case RoleClothType.ALL:
                return this.ALL.concat();
        }
    };
    RoleDressLevel.ALL = [
        ERoleLevel.HEAD,
        ERoleLevel.BODY,
        ERoleLevel.LEG_L,
        ERoleLevel.LEG_R,
        ERoleLevel.TUI_L,
        ERoleLevel.TUI_R,
        ERoleLevel.HAT,
        ERoleLevel.HAT_1,
        ERoleLevel.EYE,
        ERoleLevel.CROTCH,
        ERoleLevel.NECK,
        ERoleLevel.EAR,
        ERoleLevel.EAR_R,
        ERoleLevel.EAR_L,
        ERoleLevel.HAND_R,
        ERoleLevel.BEARD,
        ERoleLevel.HAND_L,
        ERoleLevel.FOOT_L,
        ERoleLevel.FOOT_R,
        ERoleLevel.HOLD_R,
        ERoleLevel.HOLD_L,
        ERoleLevel.WING,
        ERoleLevel.WING_1,
        ERoleLevel.WING_2,
        ERoleLevel.MOUTH,
        ERoleLevel.EYEBROW,
        ERoleLevel.HAIR,
        ERoleLevel.JACKET,
        ERoleLevel.TAIL
    ];
    /**
     * 头饰
     */
    RoleDressLevel.HAT = [ERoleLevel.HAT];
    /**
     * 衣服
     */
    RoleDressLevel.CLOTH = [
        ERoleLevel.JACKET,
        ERoleLevel.CROTCH,
        ERoleLevel.HAND_L,
        ERoleLevel.HAND_R,
        ERoleLevel.LEG_L,
        ERoleLevel.LEG_R,
        ERoleLevel.WING_2,
    ];
    /**
     * 鞋子
     */
    RoleDressLevel.SHOT = [
        ERoleLevel.FOOT_L,
        ERoleLevel.FOOT_R
    ];
    /**
     * 手持
     */
    RoleDressLevel.HOLD = [
        ERoleLevel.HOLD_L,
        ERoleLevel.HOLD_R
    ];
    /**
     * 背饰
     */
    RoleDressLevel.WING = [
        ERoleLevel.WING,
        ERoleLevel.WING_1,
        ERoleLevel.WING_2
    ];
    return RoleDressLevel;
}());

var RoleCloth = /** @class */ (function (_super) {
    __extends(RoleCloth, _super);
    // private onDisplayComplete(asset: DragonAsset): void {
    //     if (true || asset.asset.nativeUrl == this._config.resourceList[0].atlasImg) {
    //         this._display = DragonUtil.createDragon(asset);
    //         this.replaceSlotDisplay();
    //     }
    // }
    function RoleCloth(type) {
        var _this = _super.call(this) || this;
        _this._displays = {};
        _this.loadcount = 0;
        _this.type = type;
        return _this;
    }
    Object.defineProperty(RoleCloth.prototype, "target", {
        set: function (display) {
            this._target = display;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RoleCloth.prototype, "config", {
        set: function (item) {
            if (this._config == item) {
                return;
            }
            this._config = item;
            if (this._config) {
                this.load();
            }
            else {
                this.unLoad();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RoleCloth.prototype, "isLoaded", {
        get: function () {
            if (this.loadcount <= 0) {
                return true;
            }
            return cc.isValid(this._displays[$ERoleAction.STAND]) && cc.isValid(this._displays[$ERoleAction.WALK_LEFT]);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 销毁旧的显示对象
     * 如果有配置则等待加载
     * 如果没有则还原原来的装扮
     */
    RoleCloth.prototype.load = function () {
        this.destorySkin();
        if (this._config) {
            var i = void 0;
            var inf = void 0;
            var walk = void 0;
            var stand = void 0;
            var len = this._config.resourceList.length;
            for (i = 0; i < len; i++) {
                inf = this._config.resourceList[i];
                if (inf.type == 1) {
                    this.loadcount++;
                    walk = inf;
                }
                else if (inf.type == 3) {
                    this.loadcount++;
                    stand = inf;
                }
            }
            if (walk) {
                zmg_res_mgr.ResMgr.loadDragonRemote(new zmg_res_mgr.DragonResAsset(walk.dragJson, walk.atlasJson, walk.atlasImg), this.onDragonWalkComplete, this);
            }
            if (stand) {
                zmg_res_mgr.ResMgr.loadDragonRemote(new zmg_res_mgr.DragonResAsset(stand.dragJson, stand.atlasJson, stand.atlasImg), this.onDragonStandComplete, this);
            }
            return;
        }
    };
    // public get total(): number {
    //     let count: number = 0;
    //     if (this._config) {
    //         let i: number;
    //         let inf: zmg.IDragonInf;
    //         let len: number = this._config.resourceList.length;
    //         for (i = 0; i < len; i++) {
    //             inf = this._config.resourceList[i];
    //             if (inf.type == 1 || inf.type == 3) {
    //                 count++;
    //             }
    //         }
    //     }
    //     return count;
    // }
    RoleCloth.prototype.destorySkin = function () {
        if (cc.isValid(this._displays[$ERoleAction.STAND])) {
            this._displays[$ERoleAction.STAND].destroy();
        }
        if (cc.isValid(this._displays[$ERoleAction.WALK_LEFT])) {
            this._displays[$ERoleAction.WALK_LEFT].destroy();
        }
        this._displays = {};
    };
    RoleCloth.prototype.unLoad = function () {
        // this._displays.forEach((value: dragonBones.ArmatureDisplay, index: number, array: dragonBones.ArmatureDisplay[]) => {
        //     value.destroy();
        // });
        this.destorySkin();
        this.resetSlotDisplay();
    };
    RoleCloth.prototype.onDragonStandComplete = function (asset) {
        var skin = zmg_util.DragonUtil.createDragon(asset);
        this._displays[$ERoleAction.STAND] = skin;
        this.loadcount--;
        if (this.loadcount <= 0) {
            this.emit(zmg_event_mgr.EventName.COMPLETE);
        }
    };
    RoleCloth.prototype.onDragonWalkComplete = function (asset) {
        var skin = zmg_util.DragonUtil.createDragon(asset);
        this._displays[$ERoleAction.WALK_LEFT] = skin;
        this.loadcount--;
        if (this.loadcount <= 0) {
            this.emit(zmg_event_mgr.EventName.COMPLETE);
        }
    };
    Object.defineProperty(RoleCloth.prototype, "isValid", {
        get: function () {
            return this._target ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    RoleCloth.prototype.destroy = function () {
        this.destorySkin();
        this._target = null;
    };
    RoleCloth.prototype.resetSlotDisplay = function () {
        if (!cc.isValid(this._target)) {
            zmg_util.gLog("对象已被销毁，无法进行换装。");
            return;
        }
        var factory = dragonBones.CCFactory.getInstance();
        var i;
        var slot;
        var key;
        var levels = RoleDressLevel.getLevels(this.type);
        var len = levels.length;
        var armature = this._target.armature();
        var animaion = this._target.animationName;
        for (i = 0; i < len; i++) {
            slot = armature.getSlot(levels[i]);
            var atlasUUID = this._target.dragonAtlasAsset["_uuid"];
            key = this._target.dragonAsset["init"](factory, atlasUUID);
            factory.replaceSlotDisplay(key, animaion, levels[i], levels[i], slot);
        }
    };
    RoleCloth.prototype.replaceSlotDisplay = function (skin) {
        if (!cc.isValid(this._target)) {
            zmg_util.gLog("对象已被销毁，无法进行换装。");
            return;
        }
        var armature = this._target.armature();
        if (!cc.isValid(armature)) {
            zmg_util.gLog("armature为空，无法进行换装。");
            return;
        }
        var action = armature.name;
        if (skin === undefined) {
            // this._displays.forEach((value: dragonBones.ArmatureDisplay, index: number, array: dragonBones.ArmatureDisplay[]) => {
            //     this.replaceSlotDisplay(value);
            // });
            var d = this._displays[action == $ERoleAction.WALK_LEFT ? $ERoleAction.WALK_LEFT : $ERoleAction.STAND];
            if (d) {
                this.replaceSlotDisplay(d);
            }
            return;
        }
        if (!cc.isValid(skin)) {
            zmg_util.gLog("skin对象已被销毁，无法进行换装。");
            return;
        }
        // cc.Canvas.instance.scheduleOnce(() => {
        var j, cLen;
        var slot;
        if (!armature) {
            zmg_util.gLog("armature对象已被销毁，无法进行换装。");
            return;
        }
        // skin.armatureName = action;(
        if (skin.getAnimationNames(skin.armatureName).indexOf(action) == -1) {
            zmg_util.gLog("action不存在，无法进行换装。");
            return;
        }
        var factory = dragonBones.CCFactory.getInstance();
        skin.playAnimation(action, 0);
        var clothArmature = skin.armature();
        var slots = cc.sys.isNative ? clothArmature.slots : clothArmature["_slots"];
        if (!slots) {
            zmg_util.gWarn("slots资源为空！！！");
            return;
        }
        cLen = slots.length;
        zmg_util.gLog("进行换装,armature:" + action + " ===================");
        for (j = 0; j < cLen; j++) {
            slot = armature.getSlot(slots[j].name);
            if (slot == null) {
                zmg_util.gWarn("slotName为空:" + slots[j].name);
                continue;
            }
            zmg_util.gLog("替换皮肤,slotName:" + slots[j].name + " ");
            // let atlasUUID = skin.dragonAtlasAsset["_uuid"];
            // key = skin.dragonAsset["init"](factory, atlasUUID);
            var c = cc.sys.isNative ? slots[j].slotData.name : slots[j].displayData.name;
            factory.replaceSlotDisplay(skin.getArmatureKey(), skin.armatureName, slots[j].name, c, slot);
        }
        // gLog("==============================");
        // }, 1);
    };
    return RoleCloth;
}(cc.EventTarget));

var Pet = /** @class */ (function (_super) {
    __extends(Pet, _super);
    function Pet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Pet.prototype, "display", {
        get: function () {
            return this._display;
        },
        enumerable: false,
        configurable: true
    });
    Pet.prototype.getAction = function () {
        return this._action;
    };
    Pet.prototype.setScale = function (value) {
        this.node.setScale(value);
    };
    Pet.prototype.setParent = function (parent) {
        this.node.setParent(parent);
    };
    Pet.prototype.setPostion = function (newPosOrX, y) {
        this.node.setPosition(newPosOrX, y);
    };
    Pet.prototype.onLoad = function () {
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this, false);
    };
    Pet.prototype.onSceneDestory = function () {
        this.setParent(null);
    };
    Pet.prototype.load = function (path, shadowBunName, shadowPath) {
        var _this = this;
        //存在层级问题
        this._action = $EPetAction.UNKNOW;
        zmg_res_mgr.ResMgr.load(shadowBunName, shadowPath, function (tex) {
            _this._shadow = zmg_util.SpriteUtil.createNodeFrame(tex);
            _this._shadow.name = "shadow";
            _this._shadow.zIndex = 0;
            _this._shadow.scale = 0.3;
            _this._shadow.setParent(_this.node);
        }, this);
        zmg_res_mgr.ResMgr.loadDragonRemote(path, function (asset) {
            _this._display = zmg_util.DragonUtil.createDragon(asset, null, "petDisplay");
            _this._display.node.setParent(_this.node);
            _this._display.node.zIndex = 1;
            _this.stand();
        }, this);
    };
    /**
     * 销毁
     */
    Pet.prototype.onDestroy = function () {
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this);
    };
    /**
    * 执行动作
    * @param action
    */
    Pet.prototype.doAction = function (action) {
        if (this._action == action) {
            return;
        }
        this._action = action;
        if (this._display) {
            this._display.playAnimation(action, 0);
        }
    };
    /**
    * 站立
    */
    Pet.prototype.stand = function () {
        this.doAction($EPetAction.STAND);
    };
    /**
     * 向右行走
     */
    Pet.prototype.walkRight = function () {
        if (cc.isValid(this.display)) {
            this.display.node.scaleX = Math.abs(this.display.node.scaleX);
            this.doAction($EPetAction.WALK);
        }
    };
    /**
     * 向左行走
     */
    Pet.prototype.walkLeft = function () {
        if (cc.isValid(this.display)) {
            this.display.node.scaleX = -Math.abs(this.display.node.scaleX);
            this.doAction($EPetAction.WALK);
        }
    };
    return Pet;
}(cc.Component));

/**
 *
 */
var $Role = /** @class */ (function (_super) {
    __extends($Role, _super);
    function $Role() {
        var _this = _super.call(this) || this;
        /**
         * 身上的服装配置
         */
        _this._cloths = [];
        _this._dressList = [];
        _this._cloths = [
            new RoleCloth(RoleClothType.BACKWEAR),
            new RoleCloth(RoleClothType.HANDHELD),
            new RoleCloth(RoleClothType.HEADWEAR),
            new RoleCloth(RoleClothType.SET),
            new RoleCloth(RoleClothType.SHOES),
        ];
        var i;
        var len = _this._cloths.length;
        for (i = 0; i < len; i++) {
            _this._cloths[i].on(zmg_event_mgr.EventName.COMPLETE, _this.onClothComplete, _this, false);
        }
        var pNode = new cc.Node();
        pNode.name = "petNode";
        _this._pet = pNode.addComponent(Pet);
        _this.addEvents();
        var dNode = new cc.Node();
        dNode.name = "roleNode";
        _this._display = zmg_util.DragonUtil.createDragon(null, dNode);
        return _this;
    }
    Object.defineProperty($Role.prototype, "pet", {
        /**
         * 阴影
         */
        get: function () {
            return this._pet;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($Role.prototype, "shadow", {
        get: function () {
            return this._shadow;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($Role.prototype, "halo", {
        get: function () {
            return this._halo;
        },
        enumerable: false,
        configurable: true
    });
    $Role.prototype.getAction = function () {
        return this._action;
    };
    Object.defineProperty($Role.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($Role.prototype, "roleName", {
        get: function () {
            return this._config ? this._config.rName : "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($Role.prototype, "display", {
        get: function () {
            return this._display;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($Role.prototype, "dressList", {
        get: function () {
            return this._dressList;
        },
        enumerable: false,
        configurable: true
    });
    $Role.prototype.setPostion = function (newPosOrX, y) {
        this.node.setPosition(newPosOrX, y);
    };
    $Role.prototype.setParent = function (parent) {
        if (!this.isValid) {
            return;
        }
        this.node.setParent(parent);
        if (parent) {
            this.reset();
        }
    };
    $Role.prototype.loadDragon = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (this._config) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            zmg_res_mgr.ResMgr.loadDragon(_this._config.bunName, _this._config.path, new zmg_res_mgr.DragonResListener(_this, function (dragonAsset) {
                                var dNode = _this.node.getChildByName("roleNode");
                                _this._display = zmg_util.DragonUtil.createDragon(dragonAsset, dNode, "roleNode");
                                dNode = _this._display.node;
                                dNode.anchorY = 0.1;
                                dNode.zIndex = 1;
                                if (dNode.parent == null)
                                    dNode.setParent(_this.node);
                                _this.initDisplay();
                                resolve && resolve();
                            }), _this);
                        })];
                }
                else {
                    return [2 /*return*/];
                }
            });
        });
    };
    $Role.prototype.reset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, len;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.isValid) {
                            return [2 /*return*/];
                        }
                        if (!cc.isValid(this.node)) {
                            return [2 /*return*/];
                        }
                        if (!!cc.isValid(this._display)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadDragon()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        this.updateAction(this._action);
                        len = this._cloths.length;
                        for (i = 0; i < len; i++) {
                            this._cloths[i].load();
                        }
                        this.node.scale = 1;
                        this.node.setPosition(new cc.Vec2(0, 0));
                        if (this._halo && this._shadow) {
                            this._halo.node.scale = 0.7;
                            if (this._halo.dragonAsset) {
                                this._shadow.node.active = false;
                                this._halo.node.active = true;
                            }
                            else {
                                this._shadow.node.active = true;
                                this._halo.node.active = false;
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    $Role.prototype.onLoad = function () {
        var sn;
        if (!this._halo) {
            sn = this.node.getChildByName("halo");
            this._halo = zmg_util.DragonUtil.createDragon(null, sn);
            sn = this._halo.node;
            sn.name = "halo";
            sn.active = false;
            sn.scale = 0.7;
            if (sn.parent == null)
                sn.setParent(this.node);
        }
        if (!this._shadow) {
            sn = this.node.getChildByName("shadow");
            sn = zmg_util.SpriteUtil.createNodeFrame(null, sn);
            this._shadow = sn.getComponent(cc.Sprite);
            sn.name = "shadow";
            sn.active = false;
            if (sn.parent == null)
                sn.setParent(this.node);
        }
        this._display.node.setParent(this.node);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.UI_MOUSE_UP, this.onMouseUp, this, false, 1);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.UI_MOUSE_DOWN, this.onMouseDown, this, false, 1);
    };
    $Role.prototype.initConfig = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log("创建角色");
                this.node.name = config.rName;
                if (this.node.parent) {
                    this._pet.node.setParent(this.node.parent);
                }
                this._pet.setPostion(this.node.x + 150, this.node.y);
                this._action = $ERoleAction.STAND;
                this._config = config;
                zmg_res_mgr.ResMgr.load(config.bunName, config.shadow, function (res) {
                    var sn = _this.node.getChildByName("shadow");
                    sn = zmg_util.SpriteUtil.createNodeFrame(res, sn);
                    _this._shadow = sn.getComponent(cc.Sprite);
                    sn.name = "shadow";
                    sn.zIndex = -1;
                    sn.setParent(_this.node);
                    if (_this._halo && _this._halo.node.active) {
                        sn.active = false;
                    }
                    else {
                        sn.active = true;
                    }
                }, this);
                this.loadDragon().then(function () {
                    _this.updateAction(_this._action);
                    _this.dress(_this._dressList);
                });
                return [2 /*return*/];
            });
        });
    };
    $Role.prototype.setHalo = function (path) {
        var _this = this;
        if (path) {
            zmg_res_mgr.ResMgr.loadDragonRemote(path, function (dragon) {
                _this._shadow && (_this._shadow.node.active = false);
                var sNode = _this.node.getChildByName("halo");
                _this._halo = zmg_util.DragonUtil.createDragon(dragon, sNode);
                sNode = _this._halo.node;
                zmg_util.DragonUtil.play(_this._halo);
                sNode.active = true;
                sNode.name = "halo";
                sNode.scale = 0.7;
                if (!sNode.parent) {
                    sNode.setParent(_this.node);
                }
            }, this);
        }
        else {
            this._shadow.node.active = true;
            this._halo.node.active = false;
        }
    };
    $Role.prototype.hitTest = function (pos) {
        if (this._display) {
            return this._display.node["_hitTest"](pos);
        }
        return false;
    };
    $Role.prototype.takeOff = function (cloth) {
        var i;
        var len = this._dressList.length;
        for (i = 0; i < len; i++) {
            if (this._dressList[i].productLocaCode == cloth.productLocaCode) {
                this._dressList.splice(i, 1);
                break;
            }
        }
        this.dress(this._dressList);
    };
    $Role.prototype.takeOn = function (cloth) {
        var i;
        var isCloth;
        var len = this._dressList.length;
        for (i = 0; i < len; i++) {
            if (this._dressList[i].productLocaCode == cloth.productLocaCode) {
                isCloth = true;
                this._dressList[i] = cloth;
                break;
            }
        }
        if (!isCloth) {
            this._dressList.push(cloth);
        }
        this.dress(this._dressList);
    };
    $Role.prototype.dress = function (cloths) {
        this._dressList = cloths;
        var i, j;
        var isFinded;
        var isChange;
        var c;
        var len = 0;
        var cLen = 0;
        if (this._cloths)
            len = this._cloths.length;
        if (cloths)
            cLen = cloths.length;
        for (i = 0; i < len; i++) {
            isFinded = false;
            c = this._cloths[i];
            for (j = 0; j < cLen; j++) {
                if (c.type == cloths[j].productLocaCode) {
                    c.config = cloths[j];
                    isFinded = true;
                    isChange = true;
                    break;
                }
            }
            if (!isFinded) {
                c.config = null;
            }
        }
        if (!isChange) {
            return;
        }
        if (!cc.isValid(this._display)) {
            return;
        }
        this.onClothComplete();
    };
    $Role.prototype.doAction = function (action) {
        if (this._action == action) {
            return;
        }
        this._action = action;
        if (!cc.isValid(this._display)) {
            //模型未初始化完毕
            return;
        }
        if (action != $ERoleAction.TALK) {
            this.stopTalk();
        }
        this.dispatchEvent(new $RoleEvent($RoleEvent.ACTION_CHANGE, action));
        this.updateAction(action);
        this.updateDress();
    };
    $Role.prototype.stopTalk = function () {
        if (this._currentAudioClip) {
            zmg_audio_mgr.AudioMgr.stopEffect(this._currentAudioClip, true);
            this._currentAudioClip = null;
        }
    };
    $Role.prototype.talk = function (clip) {
        var _this = this;
        if (zmg_audio_mgr.AudioMgr.hasEffect(clip)) {
            return;
        }
        if (this._currentAudioClip) {
            zmg_audio_mgr.AudioMgr.stopEffect(this._currentAudioClip);
            this._currentAudioClip = null;
        }
        this._currentAudioClip = clip;
        zmg_audio_mgr.AudioMgr.playEffect(clip, function () {
            if (_this._currentAudioClip == clip) {
                _this._currentAudioClip = null;
                if (_this._action == $ERoleAction.TALK) {
                    _this.doAction($ERoleAction.STAND);
                }
            }
        }, this, 1);
        this.doAction($ERoleAction.TALK);
    };
    $Role.prototype.stand = function () {
        this.doAction($ERoleAction.STAND);
    };
    $Role.prototype.walkRight = function () {
        this.doAction($ERoleAction.WALK_RIGHT);
    };
    $Role.prototype.walkLeft = function () {
        this.doAction($ERoleAction.WALK_LEFT);
    };
    /**
     * 场景切换的时候进行销毁
     */
    $Role.prototype.onDestroy = function () {
        this._halo = null;
        this._shadow = null;
        this._cloths.length = 0;
        this._cloths = null;
        this._currentAudioClip = null;
        this.setParent(null);
        this._config = null;
        this.removeEvents();
    };
    $Role.prototype.initDisplay = function () {
        if (cc.isValid(this._display)) {
            var i = void 0;
            var len = this._cloths.length;
            for (i = 0; i < len; i++) {
                this._cloths[i].target = this._display;
            }
        }
    };
    $Role.prototype.naked = function () {
    };
    $Role.prototype.onClothComplete = function (cloth) {
        // let i: number;
        // let len: number = this._cloths.length;
        // for (i = 0; i < len; i++) {
        //     if (!this._cloths[i].isLoaded) {
        //         return;
        //     }
        // }
        this.updateDress(cloth);
    };
    $Role.prototype.updateAction = function (action) {
        if (zmg_util.DragonUtil.isValid(this._display)) {
            this._display.armatureName = action;
            this._display.playAnimation(action, 0);
        }
    };
    $Role.prototype.updateDress = function (cloth) {
        var bool = this.node.active;
        this.node.active = true;
        if (!this.node.activeInHierarchy) {
            this.node.active = bool;
            zmg_util.gLog("人物对象显示状态才可以进行服装替换。");
            return;
        }
        if (!zmg_util.DragonUtil.isValid(this.display)) {
            this.node.active = bool;
            zmg_util.gLog("人物对象已初始化才可进行服装替换。");
            return;
        }
        if (cloth) {
            cloth.replaceSlotDisplay();
        }
        else {
            var i = void 0;
            var len = this._cloths.length;
            for (i = 0; i < len; i++) {
                this._cloths[i].replaceSlotDisplay();
            }
        }
        this.node.active = bool;
    };
    $Role.prototype.addEvents = function () {
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this, false);
    };
    $Role.prototype.removeEvents = function () {
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.UI_MOUSE_UP, this.onMouseUp, this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.UI_MOUSE_DOWN, this.onMouseDown, this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this);
    };
    $Role.prototype.onMouseUp = function (evt) {
        if (!this.node.active) {
            return;
        }
        if (this._isMouseDown) {
            this._isMouseDown = false;
            if (this.hitTest(evt.worldPos)) {
                evt["stopped"]();
                this.emit(zmg_event_mgr.EventName.CLICK, this);
            }
        }
    };
    $Role.prototype.onMouseDown = function (evt) {
        if (!this.node.active) {
            return;
        }
        if (this.hitTest(evt.worldPos)) {
            this._isMouseDown = true;
            evt["stopped"]();
        }
    };
    $Role.prototype.onSceneDestory = function () {
        this.onDestroy();
    };
    $Role.prototype.getClothByType = function (type) {
        var i;
        var len = this._cloths.length;
        for (i = 0; i < len; i++) {
            if (this._cloths[i].type == type) {
                return this._cloths[i];
            }
        }
        var cloth = new RoleCloth(type);
        cloth.target = this._display;
        this._cloths.push(cloth);
        return cloth;
    };
    $Role.prototype.hasEventListener = function (type) {
        if (this.isValid) {
            return this.node.hasEventListener(type);
        }
    };
    $Role.prototype.on = function (type, callback, target, useCapture, priority) {
        if (this.isValid) {
            return this.node.on(type, callback, target, useCapture, priority);
        }
    };
    $Role.prototype.off = function (type, callback, target) {
        if (this.isValid) {
            this.node.off(type, callback, target);
        }
    };
    $Role.prototype.targetOff = function (target) {
        if (this.isValid) {
            this.node.targetOff(target);
        }
    };
    $Role.prototype.once = function (type, callback, target) {
        if (this.isValid) {
            this.node.once(type, callback, target);
        }
    };
    $Role.prototype.dispatchEvent = function (event) {
        if (this.isValid) {
            this.node.dispatchEvent(event);
        }
    };
    $Role.prototype.emit = function (key, arg1, arg2, arg3, arg4, arg5) {
        if (this.isValid) {
            this.node.emit(key, arg1, arg2, arg3, arg4, arg5);
        }
    };
    $Role.prototype.removeAll = function () {
    };
    return $Role;
}(cc.Component));

var _Actor = /** @class */ (function (_super) {
    __extends(_Actor, _super);
    function _Actor() {
        var _this = _super.call(this) || this;
        _this._talkAudioClips = [];
        return _this;
    }
    _Actor.getInstance = function () {
        if (!_Actor._instance) {
            if (window["Actor"]) {
                _Actor._instance = window["Actor"];
            }
            else {
                var node = new cc.Node;
                _Actor._instance = node.addComponent(_Actor);
                window["Actor"] = _Actor._instance;
            }
        }
        return _Actor._instance;
    };
    _Actor.setInstance = function (ins) {
        window["Actor"] = ins;
        _Actor._instance = ins;
    };
    Object.defineProperty(_Actor.prototype, "pet", {
        get: function () {
            return this._pet;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_Actor.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_Actor.prototype, "roleName", {
        get: function () {
            return this._config ? this._config.rName : "";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_Actor.prototype, "display", {
        get: function () {
            return this._display;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_Actor.prototype, "shadow", {
        get: function () {
            return this._shadow;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_Actor.prototype, "halo", {
        get: function () {
            return this._halo;
        },
        enumerable: false,
        configurable: true
    });
    _Actor.prototype.hitTest = function (pos) {
        return _super.prototype.hitTest.call(this, pos);
    };
    _Actor.prototype.getAction = function () {
        return this._action;
    };
    Object.defineProperty(_Actor.prototype, "dressList", {
        get: function () {
            return this._dressList;
        },
        enumerable: false,
        configurable: true
    });
    _Actor.prototype.setPostion = function (newPosOrX, y) {
        _super.prototype.setPostion.call(this, newPosOrX, y);
    };
    _Actor.prototype.setParent = function (parent) {
        _super.prototype.setParent.call(this, parent);
    };
    _Actor.prototype.takeOff = function (cloth) {
        _super.prototype.takeOff.call(this, cloth);
    };
    _Actor.prototype.takeOn = function (cloth) {
        _super.prototype.takeOn.call(this, cloth);
    };
    _Actor.prototype.initConfig = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var i, len;
            return __generator(this, function (_a) {
                _super.prototype.initConfig.call(this, config);
                len = config.talks.length;
                for (i = 0; i < len; i++) {
                    zmg_res_mgr.ResMgr.load(config.bunName, config.talks[i], this.onTalkClipComplete, this);
                }
                return [2 /*return*/];
            });
        });
    };
    _Actor.prototype.dress = function (cloths) {
        _super.prototype.dress.call(this, cloths);
    };
    _Actor.prototype.doAction = function (action) {
        _super.prototype.doAction.call(this, action);
    };
    _Actor.prototype.updateAction = function (action) {
        _super.prototype.updateAction.call(this, action);
    };
    _Actor.prototype.talk = function (clip) {
        _super.prototype.talk.call(this, clip);
    };
    _Actor.prototype.talkByRes = function (res) {
        var _this = this;
        zmg_res_mgr.ResMgr.load(res.bunName, res.path, function (clip) {
            _this.talk(clip);
        }, this);
    };
    _Actor.prototype.stand = function () {
        this.doAction($ERoleAction.STAND);
    };
    _Actor.prototype.walkRight = function () {
        this.doAction($ERoleAction.WALK_RIGHT);
    };
    _Actor.prototype.walkLeft = function () {
        this.doAction($ERoleAction.WALK_LEFT);
    };
    _Actor.prototype.talkRandom = function () {
        var clip = this._talkAudioClips[Math.floor(this._talkAudioClips.length * Math.random())];
        if (clip) {
            this.talk(clip);
        }
    };
    /**
     * 场景切换的时候进行销毁
     */
    _Actor.prototype.onDestroy = function () {
        zmg_util.gWarn("人物不进行销毁");
        var c = this.config;
        var node = new cc.Node;
        var a = node.addComponent(_Actor);
        a.initConfig(c);
        a.dress(this._dressList);
        _Actor.setInstance(a);
        _super.prototype.onDestroy.call(this);
    };
    _Actor.prototype.onTalkClipComplete = function (clip) {
        this._talkAudioClips.push(clip);
    };
    _Actor.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CORE_READY, this.onSceneReady, this, false);
    };
    _Actor.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CORE_READY, this.onSceneReady, this);
    };
    _Actor.prototype.onSceneDestory = function () {
        this.stand();
        this.node.active = true;
        this.pet && (this.pet.node.active = true);
        this.setParent(null);
    };
    _Actor.prototype.onSceneReady = function () {
        /**
         * 第一帧衣服未传
         */
        this.initMedal();
    };
    _Actor.prototype.initMedal = function () {
        //替换光圈
        zmg_webserver_mgr.ServerMgr.sendPost(zmg_webserver_mgr.zmgCommands.carryMedal, null, this.onMedalHandler.bind(this), this);
    };
    _Actor.prototype.onMedalHandler = function (res) {
        if (res.userCarryMedalInfo) {
            if (res.userCarryMedalInfo.animation1Url) {
                var ske = res.userCarryMedalInfo.animation1Url;
                var tex = res.userCarryMedalInfo.animation2Url;
                var png = res.userCarryMedalInfo.animation3Url;
                this._pet.load(new zmg_res_mgr.DragonResAsset(ske, tex, png), this._config.bunName, this._config.shadow);
            }
        }
        if (res.userAbilityMedalInfo) {
            if (res.userAbilityMedalInfo.animation1Url) {
                if (this.isValid) {
                    var ske = res.userAbilityMedalInfo.animation1Url;
                    var tex = res.userAbilityMedalInfo.animation2Url;
                    var png = res.userAbilityMedalInfo.animation3Url;
                    this.setHalo(new zmg_res_mgr.DragonResAsset(ske, tex, png));
                }
            }
        }
    };
    _Actor.prototype.hasEventListener = function (type) {
        return _super.prototype.hasEventListener.call(this, type);
    };
    _Actor.prototype.on = function (type, callback, target, useCapture, priority) {
        return _super.prototype.on.call(this, type, callback, target, useCapture);
    };
    _Actor.prototype.off = function (type, callback, target) {
        _super.prototype.off.call(this, type, callback, target);
    };
    _Actor.prototype.targetOff = function (target) {
        _super.prototype.targetOff.call(this, target);
    };
    _Actor.prototype.once = function (type, callback, target) {
        _super.prototype.once.call(this, type, callback, target);
    };
    _Actor.prototype.dispatchEvent = function (event) {
        _super.prototype.dispatchEvent.call(this, event);
    };
    _Actor.prototype.emit = function (key, arg1, arg2, arg3, arg4, arg5) {
        _super.prototype.emit.call(this, key, arg1, arg2, arg3, arg4, arg5);
    };
    return _Actor;
}($Role));

var _FontMgr = /** @class */ (function (_super) {
    __extends(_FontMgr, _super);
    function _FontMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultFontName = "Arial";
        _this.font65Name = "HYZhengYuan-65W";
        _this.font85Name = "HYZhengYuan-85W";
        _this.font65URL = "https://web-data.zmlearn.com/doc/iLdL2f7EgDYg8Q6YX473yL/HYZhengYuan-65W.ttf";
        // public font65URL: string = "https://web-data.zmlearn.com/doc/wX6kmfvQG5VJEKm4uBUxrn/STCAIYUN.ttf";
        _this.font85URL = "https://web-data.zmlearn.com/doc/bA6vTuEziSxMuvXXyiYzEc/HYZhengYuan-85W.ttf";
        return _this;
    }
    _FontMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _FontMgr();
        }
        return this._instance;
    };
    _FontMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                this.CCInstantiate = cc.instantiate;
                this.addEvents();
                return [2 /*return*/];
            });
        });
    };
    _FontMgr.prototype.load = function () {
        if (!this.isValid) {
            var listener = new zmg_res_mgr.ResListener(this, this.onFontHandler);
            zmg_res_mgr.ResMgr.loadRemote(this.font65URL, listener, cc.Font);
            zmg_res_mgr.ResMgr.loadRemote(this.font85URL, listener, cc.Font);
        }
    };
    _FontMgr.prototype.onFontHandler = function (font, lis) {
        if (lis.path == this.font65URL) {
            this._font65 = font;
        }
        else if (lis.path == this.font85URL) {
            this._font85 = font;
        }
        if (this.isValid) {
            this.updateCCInstantiate();
            this.updateFont(cc.Canvas.instance.node);
            zmg_event_mgr.EventMgr.dispatchEvent(new $UIEvent(zmg_event_mgr.EventName.UI_FONT_READY));
        }
    };
    _FontMgr.prototype.destroy = function () {
        this.removeEvents();
        this.resetCCInstantiate();
        this._font65.destroy();
        this._font85.destroy();
        this._font65 = this._font85 = null;
    };
    Object.defineProperty(_FontMgr.prototype, "isValid", {
        get: function () {
            if (cc.isValid(this._font85) && cc.isValid(this._font65)) {
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    _FontMgr.prototype.updateFont = function (node) {
        if (!this.isValid) {
            return;
        }
        if (!cc.isValid(node)) {
            return;
        }
        var i;
        var labels = node.getComponentsInChildren(cc.Label);
        if (!labels) {
            labels = node.getComponentsInChildren(cc.RichText);
        }
        var len = labels.length;
        for (i = 0; i < len; i++) {
            if (labels[i].font instanceof cc.TTFFont || !labels[i].font) {
                if (this._font65) {
                    if (labels[i].fontFamily == this.font65Name || labels[i].fontFamily == this.defaultFontName) {
                        if (labels[i].font != this._font65) {
                            labels[i].useSystemFont = false;
                            labels[i].font = this._font65;
                            labels[i].node.width += 10;
                            labels[i]["setVertsDirty"]();
                            continue;
                        }
                    }
                }
                if (this._font85) {
                    if (labels[i].fontFamily == this.font85Name) {
                        if (labels[i].font != this._font85) {
                            labels[i].useSystemFont = false;
                            labels[i].font = this._font85;
                            labels[i].node.width += 10;
                            labels[i]["setVertsDirty"]();
                            continue;
                        }
                    }
                }
            }
        }
    };
    /**
     * 替换系统生成对象函数
     */
    _FontMgr.prototype.updateCCInstantiate = function () {
        cc.instantiate = function (pre) {
            var node = _FontMgr.getInstance().CCInstantiate(pre);
            _FontMgr.getInstance().updateFont(node);
            return node;
        };
        cc.instantiate["_clone"] = this.CCInstantiate["_clone"];
    };
    _FontMgr.prototype.resetCCInstantiate = function () {
        cc.instantiate = this.CCInstantiate;
    };
    _FontMgr.prototype.addEvents = function () {
        zmg_event_mgr.EventMgr.once(zmg_event_mgr.EventName.CORE_READY, this.onCoreReady, this);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_END, this.onSceneChange, this, false);
    };
    _FontMgr.prototype.removeEvents = function () {
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CORE_READY, this.onCoreReady, this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_END, this.onSceneChange, this);
    };
    _FontMgr.prototype.onCoreReady = function () {
        this.load();
    };
    _FontMgr.prototype.onSceneChange = function () {
        this.updateFont(cc.Canvas.instance.node);
    };
    return _FontMgr;
}(zmg_mgr.BaseMgr));

/*
 * @Description:
 */
var $Alert = /** @class */ (function (_super) {
    __extends($Alert, _super);
    function $Alert(res) {
        var _this = _super.call(this) || this;
        _this.label = null;
        _this.sureBtn = null;
        _this.canelBtn = null;
        _this.sureLabel = null;
        _this.canelLabel = null;
        _this.popup_img = null;
        _this.title = null;
        _this.setStyle(res);
        return _this;
    }
    $Alert.prototype.init = function (node) {
        var _this = this;
        this.node = node;
        this.node.active = true;
        this.node.name = "alertNode";
        this.node.group = "UI";
        var content = this.node.getChildByName("content");
        this.popup_img = content.getChildByName("popup_img");
        this.label = content.getChildByName("label").getComponent(cc.Label);
        this.sureBtn = content.getChildByName("sureBtn").getComponent(cc.Button);
        this.canelBtn = content.getChildByName("canelBtn").getComponent(cc.Button);
        this.sureLabel = this.sureBtn.node.getChildByName("label").getComponent(cc.Label);
        this.canelLabel = this.canelBtn.node.getChildByName("label").getComponent(cc.Label);
        this.title = content.getChildByName("title").getComponent(cc.Sprite);
        this._defaultTitleFrame = this.title.spriteFrame;
        this._content = content;
        this.setTitleActive(false);
        this.show(this.asset);
        this.addEvents();
        this.emit(zmg_event_mgr.EventName.COMPLETE, this);
        zmg_res_mgr.ResMgr.load(zmg_res_mgr.SystemBundleName.UI, "prefabs/Mask", new zmg_res_mgr.ResListener(this, function (pre) {
            _this._mask = cc.instantiate(pre);
            _this._mask.zIndex = -1;
            _this._mask.setParent(_this.node);
        }));
    };
    Object.defineProperty($Alert.prototype, "isValid", {
        get: function () {
            return cc.isValid(this.node);
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param style 符合要求样式的node,Prefab
     */
    $Alert.prototype.setStyle = function (res) {
        var _this = this;
        this.res = res;
        zmg_res_mgr.ResMgr.loadRes(res, new zmg_res_mgr.ResListener(this, function (prefab) {
            _this.init(cc.instantiate(prefab));
        }));
    };
    $Alert.prototype.setTitle = function (res, isDefault) {
        var _this = this;
        if (res) {
            this.titleRes = res;
            zmg_res_mgr.ResMgr.loadRes(res, new zmg_res_mgr.ResListener(this, function (tex) {
                var frame = new cc.SpriteFrame(tex);
                isDefault && (_this._defaultTitleFrame = frame);
                if (_this.title) {
                    _this.title.spriteFrame = frame;
                    _this.setTitleActive(true);
                }
            }));
        }
    };
    $Alert.prototype.setTitleActive = function (bool) {
        this.title.node.active = bool;
    };
    $Alert.prototype.reset = function () {
        if (!this.node) {
            return;
        }
        if (this.title.spriteFrame != this._defaultTitleFrame) {
            this.title.spriteFrame = this._defaultTitleFrame;
            this.title.node.active = true;
        }
        this.node.setParent(null);
    };
    $Alert.prototype.destroy = function () {
        if (this.isValid) {
            this.asset = null;
            this.removeEvents();
            this.node.destroy();
            this.node = null;
        }
    };
    $Alert.prototype.show = function (asset) {
        this.asset = asset;
        if (!this.isValid) {
            return;
        }
        if (!cc.isValid(this.asset)) {
            return;
        }
        this.label.string = asset.text;
        this.label.overflow = cc.Label.Overflow.NONE;
        if (zmg_util.StringUtil.isValid(asset.sureText)) {
            this.sureBtn.node.active = true;
            this.sureLabel.string = asset.sureText;
        }
        else {
            this.sureBtn.node.active = false;
        }
        if (zmg_util.StringUtil.isValid(asset.canelText)) {
            this.canelBtn.node.active = true;
            this.canelLabel.string = asset.canelText;
        }
        else {
            this.canelBtn.node.active = false;
        }
        if (this.canelBtn.node.active || this.sureBtn.node.active) {
            if (this.canelBtn.node.active) {
                this.sureBtn.node.x = -100;
                this.canelBtn.node.x = 100;
            }
            else {
                this.sureBtn.node.x = 0;
            }
            if (!this.sureBtn.node.active) {
                this.canelBtn.node.x = 0;
            }
            this.setContentSize(0, 0);
        }
        else {
            this.setContentSize(0, 0);
        }
        this._content.scale = 0;
        zmg_ui_mgr.zmTween(this._content).to(0.3, { scale: 1 }, { easing: "smooth" }).start();
    };
    $Alert.prototype.close = function (now, isClean) {
        var _this = this;
        if (this.asset) {
            this.asset.clear();
            this.asset = null;
        }
        if (this.isValid) {
            if (now) {
                if (isClean) {
                    this.node.destroy();
                    this.node = null;
                }
                else {
                    this.reset();
                }
                this.node.emit(zmg_event_mgr.EventName.CLOSE, this);
            }
            else {
                zmg_ui_mgr.zmTween(this._content).to(0.3, { scale: 0 }, { easing: "smooth" }).call(function () {
                    _this.close(true);
                }).start();
            }
        }
    };
    $Alert.prototype.onEnable = function () {
        cc.game["fullFrameRatio"] && cc.game["fullFrameRatio"]();
    };
    $Alert.prototype.onDisable = function () {
        cc.game["recoverFrameRatio"] && cc.game["recoverFrameRatio"]();
    };
    $Alert.prototype.addEvents = function () {
        if (!cc.sys.isMobile) {
            var btns = this.node.getComponentsInChildren(cc.Button);
            var i = void 0;
            var len = btns.length;
            for (i = 0; i < len; i++) {
                btns[i].node.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this, false);
                btns[i].node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLevel, this, false);
            }
        }
        this.sureBtn.node.on(cc.Node.EventType.TOUCH_END, this.onSure, this, false);
        this.canelBtn.node.on(cc.Node.EventType.TOUCH_END, this.onCanel, this, false);
    };
    $Alert.prototype.removeEvents = function () {
        if (!cc.sys.isMobile) {
            var btns = this.node.getComponentsInChildren(cc.Button);
            var i = void 0;
            var len = btns.length;
            for (i = 0; i < len; i++) {
                btns[i].node.off(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this, false);
                btns[i].node.off(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLevel, this, false);
            }
        }
        this.sureBtn.node.off(cc.Node.EventType.TOUCH_END, this.onSure, this, false);
        this.canelBtn.node.off(cc.Node.EventType.TOUCH_END, this.onCanel, this, false);
    };
    $Alert.prototype.onMouseEnter = function () {
        zmg_ui_mgr.UIMgr.mouse.setLink();
    };
    $Alert.prototype.onMouseLevel = function () {
        zmg_ui_mgr.UIMgr.mouse.setNormal();
    };
    $Alert.prototype.onSure = function () {
        this.asset && this.asset.sure();
        this.close();
    };
    $Alert.prototype.onCanel = function () {
        this.asset && this.asset.canel();
        this.close();
    };
    $Alert.prototype.setContentSize = function (width, height) {
        var _this = this;
        cc.Canvas.instance.scheduleOnce(function () {
            _this.label.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
            _this.label.node.width = Math.max(Math.min(_this.label.node.width, 800), 520);
            _this.label.node.height = Math.max(Math.min(_this.label.node.height, 600), 312);
            _this.node.width = width + _this.label.node.width;
            _this.node.height = height + _this.label.node.height;
            var wids = _this.node.getComponentsInChildren(cc.Widget);
            var i;
            var len = wids.length;
            for (i = 0; i < len; i++) {
                wids[i].updateAlignment();
            }
        }, 0);
    };
    return $Alert;
}(cc.EventTarget));

var $AlertAsset = /** @class */ (function () {
    function $AlertAsset(text, sureFun, canelFun, sure, canel, target) {
        if (sureFun === void 0) { sureFun = null; }
        if (canelFun === void 0) { canelFun = null; }
        if (sure === void 0) { sure = "确定"; }
        if (canel === void 0) { canel = ""; }
        this.sureText = "确定";
        this.canelText = "取消";
        this.text = text;
        this.sureFun = sureFun;
        this.canelFun = canelFun;
        this.sureText = sure;
        this.canelText = canel;
        this.target = target;
    }
    Object.defineProperty($AlertAsset.prototype, "isValid", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    $AlertAsset.prototype.clear = function () {
        this.text = null;
        this.target = null;
        this.sureFun = null;
        this.canelFun = null;
        this.sureText = null;
        this.canelText = null;
    };
    $AlertAsset.prototype.sure = function () {
        if (cc.isValid(this.target) && this.sureFun) {
            this.sureFun.call(this.target, true);
        }
    };
    $AlertAsset.prototype.canel = function () {
        if (cc.isValid(this.target) && this.canelFun) {
            this.canelFun.call(this.target, false);
        }
    };
    return $AlertAsset;
}());

var _AlertMgr = /** @class */ (function (_super) {
    __extends(_AlertMgr, _super);
    function _AlertMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._assets = [];
        return _this;
    }
    _AlertMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _AlertMgr();
        }
        return this._instance;
    };
    Object.defineProperty(_AlertMgr.prototype, "res", {
        get: function () {
            return this._defalut.res;
        },
        enumerable: false,
        configurable: true
    });
    _AlertMgr.prototype.init = function (url) {
        this.node = new cc.Node();
        this.node.group = "UI";
        this.node.width = cc.visibleRect.width;
        this.node.height = cc.visibleRect.height;
        this.node.name = "alertNode";
        var widget = this.node.addComponent(cc.Widget);
        widget.isAlignLeft = true;
        widget.isAlignRight = true;
        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.top = widget.bottom = widget.left = widget.right = 0;
        this._defalut = new $Alert(new zmg_res_mgr.ResAsset(zmg_config_mgr.ConfigMgr.uiconfig.bunName, url));
        this._defalut.once(zmg_event_mgr.EventName.COMPLETE, this.onDefaultComplete, this);
        if (zmg_ui_mgr.FontMgr.isValid) {
            this.onFontReady();
        }
        else {
            zmg_event_mgr.EventMgr.once(zmg_event_mgr.EventName.UI_FONT_READY, this.onFontReady, this);
        }
    };
    Object.defineProperty(_AlertMgr.prototype, "defaultAlert", {
        get: function () {
            return this._defalut;
        },
        enumerable: false,
        configurable: true
    });
    _AlertMgr.prototype.onFontReady = function () {
        zmg_ui_mgr.FontMgr.updateFont(this._defalut.node);
    };
    _AlertMgr.prototype.onDefaultComplete = function () {
        this.emit(zmg_res_mgr.EResEventName.COMPLETE);
    };
    _AlertMgr.prototype.onAlertClose = function (alert) {
        alert.off(zmg_event_mgr.EventName.COMPLETE, this.onAlertComplete, this);
        alert.node.off(zmg_event_mgr.EventName.CLOSE, this.onAlertClose, this);
        if (this._alert == alert) {
            this._alert = null;
        }
        this.openNext();
    };
    /**
     *
     * @param style 符合要求样式的node,Prefab
     */
    _AlertMgr.prototype.getAlert = function (res) {
        res = res ? res : this._defalut.res;
        if (this._defalut.res == res) {
            return this._defalut;
        }
        else {
            var alert_1 = new $Alert(res);
            return alert_1;
        }
    };
    /**
     * 销毁
     */
    _AlertMgr.prototype.destroy = function () {
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.UI_FONT_READY, this.onFontReady, this);
        this.node.destroy();
        this.node = null;
    };
    Object.defineProperty(_AlertMgr.prototype, "isValid", {
        /**
         * 是否初始化完毕
         */
        get: function () {
            return cc.isValid(this.node);
        },
        enumerable: false,
        configurable: true
    });
    /**
     *
     * @param asset 弹框显示
     */
    _AlertMgr.prototype.open = function (asset) {
        if (typeof (asset) == "string") {
            asset = new $AlertAsset(asset);
        }
        zmg_util.gLog("显示弹窗:" + asset.text);
        this._assets.push(asset);
        if (this._alert) {
            //等待弹窗结束
            return;
        }
        this.openNext();
    };
    /**
     * 关闭
     */
    _AlertMgr.prototype.close = function (now) {
        if (this._alert) {
            this._alert.close(now, this._alert == this._defalut);
            this._alert = null;
        }
    };
    _AlertMgr.prototype.openNext = function () {
        var asset = this._assets.shift();
        if (asset && asset.isValid) {
            var alert_2 = this.getAlert(asset.style);
            alert_2.setTitle(asset.title);
            this._alert = alert_2;
            alert_2.show(asset);
            if (alert_2.isValid) {
                this.onAlertComplete();
            }
            else {
                alert_2.once(zmg_event_mgr.EventName.COMPLETE, this.onAlertComplete, this);
            }
        }
    };
    _AlertMgr.prototype.onAlertComplete = function () {
        this._alert.node.setParent(this.node);
        this._alert.node.on(zmg_event_mgr.EventName.CLOSE, this.onAlertClose, this);
    };
    return _AlertMgr;
}(cc.EventTarget));

var $BaseUI = /** @class */ (function (_super) {
    __extends($BaseUI, _super);
    function $BaseUI(url) {
        var _this = _super.call(this) || this;
        _this._isActive = true;
        _this.init(url);
        return _this;
    }
    Object.defineProperty($BaseUI.prototype, "node", {
        get: function () {
            return this._node;
        },
        set: function (n) {
            this._node = n;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($BaseUI.prototype, "res", {
        get: function () {
            return this._res;
        },
        enumerable: false,
        configurable: true
    });
    $BaseUI.prototype.init = function (url) {
        if (zmg_util.StringUtil.isValid(url)) {
            this._res = { bunName: "", path: "" };
            this._defaultStyle = { bunName: zmg_config_mgr.ConfigMgr.uiconfig.bunName, path: url };
            this.setStyle(this._defaultStyle);
        }
    };
    /**
     * 显示
     */
    $BaseUI.prototype.show = function () {
        this._isActive = true;
        if (this.isValid) {
            this._node.active = true;
        }
    };
    /**
     * 隐藏
     */
    $BaseUI.prototype.hide = function () {
        this._isActive = false;
        if (this.isValid) {
            this._node.active = false;
        }
    };
    /**
     *
     * @param style 符合要求样式的node,Prefab
     */
    $BaseUI.prototype.setStyle = function (res, resUrl) {
        var ast;
        if (typeof (res) === "string") {
            ast = new zmg_res_mgr.ResAsset("", "");
            ast.bunName = res;
            ast.path = resUrl;
        }
        else {
            ast = res;
        }
        if (!this._nowStyle || this._nowStyle.bunName != ast.bunName || this._nowStyle.path != ast.path) {
            if (this.isValid) {
                this._parent = this._node.parent;
                this._node.destroy();
                this._node = null;
            }
            this.load(ast.bunName, ast.path);
        }
    };
    /**
     * 还原默认样式
     */
    $BaseUI.prototype.resetStyle = function () {
        this.setStyle(this._defaultStyle);
    };
    /**
     * 销毁
     */
    $BaseUI.prototype.destroy = function () {
        if (this.isValid) {
            this._node.destroy();
            this._isActive = false;
            this._parent = null;
            this._node = null;
        }
    };
    Object.defineProperty($BaseUI.prototype, "isValid", {
        /**
         * 是否初始化完毕
         */
        get: function () {
            return cc.isValid(this._node);
        },
        enumerable: false,
        configurable: true
    });
    $BaseUI.prototype.load = function (bunName, url) {
        if (!zmg_util.StringUtil.isValid(bunName)) {
            zmg_util.gWarn("UI:" + "  bunName为空，无法初始化UI!");
            return;
        }
        if (!zmg_util.StringUtil.isValid(url)) {
            zmg_util.gWarn("UI:" + "  url为空，无法初始化UI!");
            return;
        }
        if (this._res.path == url && this._res.bunName == bunName) {
            zmg_util.gLog("样式重复，无需替换,url: " + url + " bunName:" + bunName);
            return;
        }
        this._res.path = url;
        this._res.bunName = bunName;
        zmg_res_mgr.ResMgr.load(bunName, url, this.onLoadComplete, this);
    };
    /**
    * 资源下载完毕
    */
    $BaseUI.prototype.onLoadComplete = function (pre, listener) {
        if (listener.path == this._res.path && listener.bunName == this._res.bunName) {
            this.createNode(pre);
        }
    };
    $BaseUI.prototype.createNode = function (pre) {
        this._node = cc.instantiate(pre);
        this._node.group = "UI";
        this._target = this._node.addComponent(cc.Component);
        if (cc.isValid(this._parent)) {
            this._parent.addChild(this._node);
        }
        this.onLoad();
    };
    /**
     * 初始化
     */
    $BaseUI.prototype.onLoad = function () {
        this.onComplete();
        this.addEvents();
    };
    $BaseUI.prototype.onComplete = function () {
        this._node.active = this._isActive;
        this.emit(zmg_res_mgr.EResEventName.COMPLETE);
    };
    $BaseUI.prototype.opacityHide = function (time) {
        var _this = this;
        this._isActive = false;
        if (this._node.active) {
            this._node.stopAllActions();
            cc.tween(this._node).to(time, { opacity: 0 }, { easing: "smooth" }).call(function () {
                _this._node.opacity = 0xff;
                _this._node.active = false;
            }).start();
        }
    };
    $BaseUI.prototype.opacityShow = function (time) {
        var _this = this;
        this._isActive = true;
        if (!this._node.active) {
            this._node.active = true;
            this._node.opacity = 0;
            this._node.stopAllActions();
            cc.tween(this._node).to(time, { opacity: 0xff }, { easing: "smooth" }).call(function () {
                _this._node.active = true;
            }).start();
        }
        else {
            if (this._node.opacity != 0xff) {
                this._node.stopAllActions();
                cc.tween(this._node).to(time, { opacity: 0xff }, { easing: "smooth" }).call(function () {
                    _this._node.active = true;
                }).start();
            }
        }
    };
    $BaseUI.prototype.scaleHide = function (time, node, callback, target) {
        this._isActive = false;
        var tn = node ? node : this._node;
        if (tn.active) {
            tn.stopAllActions();
            cc.tween(tn).to(time, { scale: 0 }, { easing: "smooth" }).call(function () {
                tn.active = false;
                if (callback) {
                    callback.call(target, node);
                }
            }).start();
        }
    };
    $BaseUI.prototype.scaleShow = function (time, node) {
        this._isActive = true;
        var tn = node ? node : this._node;
        if (!tn.active) {
            tn.scale = 0;
            tn.active = true;
            tn.stopAllActions();
            cc.tween(tn).to(time, { scale: 1 }, { easing: "smooth" }).call(function () {
                tn.active = true;
            }).start();
        }
        else {
            if (tn.opacity != 0xff) {
                tn.stopAllActions();
                cc.tween(tn).to(time, { scale: 1 }, { easing: "smooth" }).call(function () {
                    tn.active = true;
                }).start();
            }
        }
    };
    $BaseUI.prototype.scheduleOnce = function (callback, delay) {
        if (this._target) {
            this._target.scheduleOnce(callback, delay);
        }
    };
    $BaseUI.prototype.unscheduleAllCallbacks = function () {
        if (this._target) {
            this._target.unscheduleAllCallbacks();
        }
    };
    $BaseUI.prototype.addEvents = function () {
    };
    $BaseUI.prototype.removeEvents = function () {
    };
    return $BaseUI;
}(cc.EventTarget));

var $Bg = /** @class */ (function (_super) {
    __extends($Bg, _super);
    function $Bg(url, parent) {
        var _this = _super.call(this, url) || this;
        _this._parent = parent;
        return _this;
    }
    $Bg.prototype.opacityHide = function (time) {
        var _this = this;
        this._isActive = false;
        if (this.node.parent) {
            this.node.stopAllActions();
            cc.tween(this.node).to(time, { opacity: 0 }, { easing: "smooth" }).call(function () {
                _this.node.opacity = 0xff;
                _this.node.setParent(null);
            }).start();
        }
    };
    $Bg.prototype.opacityShow = function (time) {
        this._isActive = true;
        if (!this.node.parent) {
            this.node.setParent(this._parent);
            this.node.opacity = 0;
            this.node.stopAllActions();
            cc.tween(this.node).to(time, { opacity: 0xff }, { easing: "smooth" }).start();
        }
        else {
            if (this.node.opacity != 0xff) {
                this.node.stopAllActions();
                cc.tween(this.node).to(time, { opacity: 0xff }, { easing: "smooth" }).start();
            }
        }
    };
    $Bg.prototype.show = function () {
        zmg_util.gLog("显示背景");
        // this.opacityShow(0.4);
        _super.prototype.show.call(this);
    };
    $Bg.prototype.hide = function () {
        zmg_util.gLog("隐藏背景");
        // this.opacityHide(0.4);
        _super.prototype.hide.call(this);
    };
    return $Bg;
}($BaseUI));

var $UIMask = /** @class */ (function (_super) {
    __extends($UIMask, _super);
    function $UIMask(url) {
        var _this = _super.call(this, url) || this;
        _this._opacity = 90;
        _this._keyList = [];
        _this._isActive = false;
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, _this.onSceneStart, _this, false);
        return _this;
    }
    Object.defineProperty($UIMask.prototype, "node", {
        get: function () {
            return this._node;
        },
        enumerable: false,
        configurable: true
    });
    $UIMask.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneStart, this);
    };
    $UIMask.prototype.onSceneStart = function () {
        this.hide();
    };
    $UIMask.prototype.show = function (key, opacity) {
        key = key ? key : "mask";
        var i;
        var index = -1;
        var len = this._keyList.length;
        if (opacity !== undefined) {
            this._opacity = opacity;
        }
        else {
            this._opacity = 90;
        }
        this.setOpacity(this._opacity);
        for (i = 0; i < len; i++) {
            if (this._keyList[i].key == key) {
                index = i;
            }
        }
        if (index == -1) {
            this._keyList.push({ key: key });
        }
        else {
            return;
        }
        zmg_util.gLog("显示操作遮罩");
        _super.prototype.show.call(this);
        this.addMouseEvents();
    };
    $UIMask.prototype.hide = function (key) {
        if (key) {
            var i;
            var index = -1;
            var len = this._keyList.length;
            for (i = 0; i < len; i++) {
                if (this._keyList[i].key == key) {
                    index = i;
                }
            }
            if (index == -1) {
                return;
            }
            this._keyList.splice(index, 1);
        }
        else {
            this._keyList.length = 0;
        }
        if (!this._keyList.length) {
            zmg_util.gLog("隐藏操作遮罩");
            _super.prototype.hide.call(this);
            this.removeMouseEvents();
        }
    };
    /**
    * 透明度
    */
    $UIMask.prototype.setOpacity = function (value) {
        this._opacity = value;
        if (this.node) {
            this.node.opacity = this._opacity;
        }
    };
    $UIMask.prototype.onComplete = function () {
        this.node.opacity = this._opacity;
        _super.prototype.onComplete.call(this);
    };
    $UIMask.prototype.addMouseEvents = function () {
        var canvas = this.node;
        if (cc.sys.isMobile) {
            canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        }
        else {
            //仅pc平台需要
            // cc.Canvas.instance.schedule(this.onTimeCheck.bind(this), UIMouse.CHECK_TIME);
            // canvas.off(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this, true);
            // canvas.off(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLevel, this, true);
            canvas.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this, true);
        }
        canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, true);
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, true);
    };
    $UIMask.prototype.removeMouseEvents = function () {
        var canvas = cc.Canvas.instance.node;
        if (cc.sys.isMobile) {
            canvas.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        }
        else {
            //仅pc平台需要
            // cc.Canvas.instance.schedule(this.onTimeCheck.bind(this), UIMouse.CHECK_TIME);
            // canvas.off(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this, true);
            // canvas.off(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLevel, this, true);
            canvas.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this, true);
        }
        canvas.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, true);
        canvas.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, true);
    };
    $UIMask.prototype.getScreenToWorldPoint = function (screenPosition) {
        var pos = cc.v2(screenPosition.x, screenPosition.y);
        var camear = zmg_camera_mgr.CamearMgr.getMain();
        if (camear) {
            var worldPoint = camear.getScreenToWorldPoint(pos);
            pos = cc.v2(worldPoint.x, worldPoint.y);
        }
        return pos;
    };
    $UIMask.prototype.onTouchMove = function (event) {
        if (!this._isActive)
            return;
        this._mouseV2 = event.getLocation();
        this._mouseV2 = this.getScreenToWorldPoint(this._mouseV2);
        var evt = $UIMouseEvent.create(zmg_event_mgr.EventName.UI_MASK_TOUCH_MOVE, this._mouseV2);
        zmg_event_mgr.EventMgr.dispatchEvent(evt);
    };
    $UIMask.prototype.onMouseEnter = function (event) {
    };
    $UIMask.prototype.onMouseMove = function (event) {
        if (!this._isActive)
            return;
        this._mouseV2 = event.getLocation();
        this._mouseV2 = this.getScreenToWorldPoint(this._mouseV2);
        var evt = $UIMouseEvent.create(zmg_event_mgr.EventName.UI_MASK_MOVE, this._mouseV2);
        zmg_event_mgr.EventMgr.dispatchEvent(evt);
    };
    $UIMask.prototype.onTouchEnd = function (event) {
        if (!this._isActive)
            return;
        this._mouseV2 = event.getLocation();
        this._mouseV2 = this.getScreenToWorldPoint(this._mouseV2);
        var evt = $UIMouseEvent.create(zmg_event_mgr.EventName.UI_MASK_DOWN, this._mouseV2);
        zmg_event_mgr.EventMgr.dispatchEvent(evt);
    };
    $UIMask.prototype.onTouchStart = function (event) {
        if (!this._isActive)
            return;
        this._mouseV2 = event.getLocation();
        this._mouseV2 = this.getScreenToWorldPoint(this._mouseV2);
        var evt = $UIMouseEvent.create(zmg_event_mgr.EventName.UI_MASK_UP, this._mouseV2);
        zmg_event_mgr.EventMgr.dispatchEvent(evt);
    };
    return $UIMask;
}($BaseUI));

var BaseToast = /** @class */ (function (_super) {
    __extends(BaseToast, _super);
    function BaseToast() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._msg = "";
        return _this;
    }
    Object.defineProperty(BaseToast.prototype, "isActive", {
        get: function () {
            return this.node.active;
        },
        enumerable: false,
        configurable: true
    });
    BaseToast.prototype.onEnable = function () {
        cc.game["fullFrameRatio"] && cc.game["fullFrameRatio"]();
    };
    BaseToast.prototype.onDisable = function () {
        cc.game["recoverFrameRatio"] && cc.game["recoverFrameRatio"]();
    };
    Object.defineProperty(BaseToast.prototype, "label", {
        get: function () {
            return this.node.getChildByName("label").getComponent(cc.Label);
        },
        enumerable: false,
        configurable: true
    });
    BaseToast.prototype.show = function (msg, time) {
        var _this = this;
        var lab = this.label;
        this._msg = msg;
        this.init();
        if (lab) {
            this.node.scale = 0;
            this.node.active = true;
            lab.string = msg;
            var height = cc.visibleRect.height;
            this.node.y = -height / 2 - 50;
            this.node.stopAllActions();
            cc.tween(this.node).to(0.3, { y: -height / 2 + 120, scale: 1 }, { easing: "smooth" }).start();
            this.unscheduleAllCallbacks();
            this.scheduleOnce(function () {
                var bg = _this.node.getChildByName("bg");
                bg && (bg.width = Math.min(Math.max(_this.label.node.width, 280), 600) + 30);
            });
            this.scheduleOnce(this.hide.bind(this, false), time);
        }
    };
    BaseToast.prototype.hide = function (now) {
        var _this = this;
        if (!this.node.active) {
            return;
        }
        this.unscheduleAllCallbacks();
        if (this.label) {
            if (now) {
                this.node.active = false;
            }
            else {
                var height = cc.visibleRect.height;
                this.node.stopAllActions();
                cc.tween(this.node).to(0.3, { scale: 0, y: -height / 2 - 50 }, { easing: "smooth" }).call(function () {
                    _this.hide(true);
                }).start();
            }
        }
    };
    BaseToast.prototype.init = function () {
        var height = cc.visibleRect.height;
        this.node.x = 0;
        this.node.y = -height / 2 - 50;
        this.label.string = this._msg;
        this.node.active = false;
        this.node.scale = 0;
    };
    return BaseToast;
}(cc.Component));
var _ToastMgr = /** @class */ (function (_super) {
    __extends(_ToastMgr, _super);
    function _ToastMgr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _ToastMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _ToastMgr();
        }
        return this._instance;
    };
    _ToastMgr.prototype.init = function (url) {
        _super.prototype.init.call(this, url);
    };
    Object.defineProperty(_ToastMgr.prototype, "isValid", {
        get: function () {
            return cc.isValid(this.node);
        },
        enumerable: false,
        configurable: true
    });
    _ToastMgr.prototype.createNode = function (pre) {
        if (!this.node) {
            this.node = new cc.Node();
            this.node.group = "UI";
            this.node.name = "toastNode";
            this.node.width = zmg_config_mgr.ConfigMgr.appconfig.frameWidth;
            this.node.height = zmg_config_mgr.ConfigMgr.appconfig.frameHeight;
            this._target = this.node.addComponent(cc.Component);
        }
        this._prefab = pre;
        this.onLoad();
    };
    _ToastMgr.prototype.getToast = function () {
        if (!this._prefab) {
            return;
        }
        var i;
        var len = this._toasts.length;
        for (i = 0; i < len; i++) {
            if (!this._toasts[i].isActive) {
                return this._toasts[i];
            }
        }
        if (len < 3) {
            var n = cc.instantiate(this._prefab);
            var t = n.addComponent(BaseToast);
            this.node.addChild(n);
            this._toasts.push(t);
            return t;
        }
        return this._toasts[len - 1];
    };
    _ToastMgr.prototype.onLoad = function () {
        this._toasts = [];
        this.onComplete();
    };
    _ToastMgr.prototype.open = function (msg, time) {
        if (time === void 0) { time = _ToastMgr.DEFAULT_TIME; }
        this.close(false);
        var t = this.getToast();
        t.show(msg, time);
        var evt = new $UIEvent($UIEvent.TOAST_SHOW);
        evt.target = t;
        this.node.dispatchEvent(evt);
    };
    _ToastMgr.prototype.close = function (now) {
        var i;
        var len = this._toasts.length;
        for (i = 0; i < len; i++) {
            this._toasts[i].hide(now);
        }
    };
    _ToastMgr.DEFAULT_TIME = 3;
    return _ToastMgr;
}($BaseUI));

var EUIZindex;
(function (EUIZindex) {
    EUIZindex[EUIZindex["BG"] = 2] = "BG";
    EUIZindex[EUIZindex["MASK"] = 3] = "MASK";
    EUIZindex[EUIZindex["uiLayer"] = 4] = "uiLayer";
    EUIZindex[EUIZindex["Loading"] = 5] = "Loading";
    EUIZindex[EUIZindex["BACKBTN"] = 100] = "BACKBTN";
    EUIZindex[EUIZindex["ALERT"] = 101] = "ALERT";
    EUIZindex[EUIZindex["TOAST"] = 102] = "TOAST";
    EUIZindex[EUIZindex["OTHERUI"] = 103] = "OTHERUI";
    EUIZindex[EUIZindex["TRANSITIONS"] = 104] = "TRANSITIONS";
})(EUIZindex || (EUIZindex = {}));

var $UILoading = /** @class */ (function (_super) {
    __extends($UILoading, _super);
    function $UILoading(url, parent) {
        var _this = _super.call(this, url) || this;
        _this._parent = parent;
        return _this;
    }
    Object.defineProperty($UILoading.prototype, "res", {
        // private _zxm: cc.Node;
        // private _ddx: cc.Node;
        // private _mmt: cc.Node;
        get: function () {
            return this._res;
        },
        enumerable: false,
        configurable: true
    });
    $UILoading.prototype.showProgress = function () {
        if (this._proNode && this._proNode.parent) {
            this._proNode.parent.active = true;
            this._effectNode.active = true;
        }
    };
    $UILoading.prototype.hideProgress = function () {
        if (this._proNode && this._proNode.parent) {
            this._proNode.parent.active = false;
            this._effectNode.active = false;
        }
    };
    $UILoading.prototype.setProgress = function (value) {
        this.showProgress();
        value = Math.max(Math.min(1, value), 0);
        var total = this._proNode.parent.width - 6;
        this._effectNode.width = this._proNode.width = Math.max(Math.min(total * value), 32);
    };
    $UILoading.prototype.onLoad = function () {
        this.node.width = cc.Canvas.instance.node.width;
        this.node.height = cc.Canvas.instance.node.height;
        // this._zxm = this.node.getChildByName("zxm");
        // this._ddx = this.node.getChildByName("ddx");
        // this._mmt = this.node.getChildByName("mmt");
        this._proNode = this.node.getChildByName("bar").getChildByName("pro");
        this._effectNode = this.node.getChildByName("effect");
        // this._label = this.node.getChildByName("label").getComponent(cc.Label);
        this.setProgress(0);
        this.onComplete();
        this.show();
        if (zmg_ui_mgr.FontMgr.isValid) {
            this.onFontReady();
        }
        else {
            zmg_event_mgr.EventMgr.once(zmg_event_mgr.EventName.UI_FONT_READY, this.onFontReady, this);
        }
    };
    $UILoading.prototype.onFontReady = function () {
        zmg_ui_mgr.FontMgr.updateFont(this.node);
    };
    $UILoading.prototype.show = function () {
        zmg_util.gLog("显示背景");
        // this._label.node.active = true;
        // this.scaleShow(0.7);
        // this.node.active = true;
        // this.scaleShow(0.7, this._zxm);
        // this.scaleShow(0.7, this._ddx);
        // this.scaleShow(0.7, this._mmt);
        if (this.node && this._parent && !this.node.parent) {
            this.node.setParent(this._parent);
            zmg_event_mgr.EventMgr.dispatchEvent(new $UIEvent($UIEvent.LOAD_SHOW));
            zmg_controller.DirectorMgr.on(zmg_controller.DirectorEvent.SCENE_CHANGE_PROGRESS, this.onDirectProgress, this, false);
        }
    };
    $UILoading.prototype.hide = function () {
        zmg_util.gLog("隐藏Loading");
        // this.scaleHide(0.7);
        if (this.node.parent) {
            this.hideProgress();
            // this.node.active = false;
            // this._label.node.active = false;
            this.node.setParent(null);
            zmg_event_mgr.EventMgr.dispatchEvent(new $UIEvent($UIEvent.LOAD_HIDE));
            zmg_controller.DirectorMgr.off(zmg_controller.DirectorEvent.SCENE_CHANGE_PROGRESS, this.onDirectProgress, this);
        }
    };
    $UILoading.prototype.onDirectProgress = function (evt) {
        this.setProgress(evt.progress);
    };
    return $UILoading;
}($BaseUI));

var $UITransitions = /** @class */ (function (_super) {
    __extends($UITransitions, _super);
    function $UITransitions(url, parent) {
        var _this = _super.call(this, url) || this;
        _this._parent = parent;
        return _this;
    }
    $UITransitions.prototype.show = function () {
        if (!this.node.parent) {
            this.node.setParent(this._parent);
        }
    };
    $UITransitions.prototype.hide = function () {
        if (this.node.parent) {
            this.node.setParent(null);
        }
    };
    $UITransitions.prototype.runScene = function (bunName, sceneUrl, onSceneLoaded, onTransitionFinished, color, movieClip) {
        if (this._transitons) {
            this.show();
            this._transitons.runScene(bunName, sceneUrl, onSceneLoaded, onTransitionFinished, color, movieClip);
        }
    };
    $UITransitions.prototype.onLoad = function () {
        var comps = this.node.getComponents(cc.Component);
        var i;
        var len = comps.length;
        for (i = 0; i < len; i++) {
            if (comps[i]["runScene"]) {
                this._transitons = comps[i];
                break;
            }
        }
        this.onComplete();
    };
    return $UITransitions;
}($BaseUI));

var $UIBackBtn = /** @class */ (function (_super) {
    __extends($UIBackBtn, _super);
    function $UIBackBtn(url) {
        return _super.call(this, url) || this;
    }
    $UIBackBtn.prototype.show = function () {
        _super.prototype.show.call(this);
    };
    $UIBackBtn.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    $UIBackBtn.prototype.addEvents = function () {
        _super.prototype.addEvents.call(this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, false);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_START, this.onSceneStart, this, false);
    };
    $UIBackBtn.prototype.removeEvents = function () {
        _super.prototype.removeEvents.call(this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, false);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_START, this.onSceneStart, this);
    };
    $UIBackBtn.prototype.onSceneStart = function () {
        this.resetStyle();
    };
    $UIBackBtn.prototype.onTouchEnd = function () {
        zmg_audio_mgr.AudioMgr.click();
        zmg_event_mgr.EventMgr.dispatchEvent(new $UIBackEvent());
    };
    return $UIBackBtn;
}($BaseUI));

var $UIMouse = /** @class */ (function (_super) {
    __extends($UIMouse, _super);
    function $UIMouse(normal, link, unavailable, effect, sound) {
        var _this = _super.call(this) || this;
        _this._effect = { bunName: "", path: "" };
        _this._sound = { bunName: "", path: "" };
        _this._active = true;
        _this.start();
        _this._dEffect = effect;
        _this.setSound(sound);
        _this.setEffect(effect);
        _this._mouseV2 = new cc.Vec2();
        _this.setDefaultStyle(normal, link, unavailable);
        return _this;
    }
    Object.defineProperty($UIMouse.prototype, "mouseV2", {
        get: function () {
            return this._mouseV2;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($UIMouse.prototype, "isMouseDown", {
        get: function () {
            return this._isMouseDown;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($UIMouse.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (s) {
            this._active = s;
        },
        enumerable: false,
        configurable: true
    });
    /**
    * 初始化
    */
    $UIMouse.prototype.start = function () {
        var effectNode = new cc.Node();
        effectNode.group = "UI";
        effectNode.zIndex = cc.macro.MAX_ZINDEX;
        this._effectDragon = effectNode.addComponent(dragonBones.ArmatureDisplay);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onCanvasDestory, this, false);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_END, this.onCanvasEnd, this, false);
        // cc.game.addPersistRootNode(effectNode);
    };
    /**
     *
     * @param link 点击状态
     * @param normal 常规移动状态
     * @param unavailable 点击摁下状态
     */
    $UIMouse.prototype.setStyle = function (normal, link, unavailable) {
        this._normal = normal;
        this._link = link;
        this._unavailable = unavailable;
        this.setMouseStyle(this._normal);
    };
    $UIMouse.prototype.setDefaultStyle = function (normal, link, unavailable) {
        this._dNormal = normal;
        this._dLink = link;
        this._dUnavailable = unavailable;
        this.setStyle(normal, link, unavailable);
    };
    $UIMouse.prototype.setNormal = function () {
        this.setMouseStyle(this._normal);
    };
    $UIMouse.prototype.setLink = function () {
        this.setMouseStyle(this._link);
    };
    $UIMouse.prototype.setUnavailable = function () {
        this.setMouseStyle(this._unavailable);
    };
    $UIMouse.prototype.setEffect = function (effect) {
        var _this = this;
        if (!effect) {
            return;
        }
        if ((effect.bunName == this._effect.bunName && effect.path == this._effect.path)) {
            return;
        }
        this._effect.bunName = effect.bunName;
        this._effect.path = effect.path;
        zmg_res_mgr.ResMgr.loadDragon(effect.bunName, new zmg_res_mgr.DragonResAsset(effect.path), new zmg_res_mgr.DragonResListener(this, function (asset) {
            _this._effectDragon = zmg_util.NodeUtil.createDragon(asset, _this._effectDragon.node, "mouseEffect");
            _this._effectDragon.addEventListener(dragonBones.EventObject.COMPLETE, _this.hideEffectDragon, _this);
            _this._effectDragon.node.active = false;
        }));
    };
    $UIMouse.prototype.setSound = function (sound) {
        var _this = this;
        if (!sound) {
            return;
        }
        if ((sound.bunName == this._sound.bunName && sound.path == this._sound.path)) {
            return;
        }
        zmg_res_mgr.ResMgr.loadRes(sound, new zmg_res_mgr.ResListener(this, function (asset) {
            _this._soundClip = asset;
        }), this);
    };
    /**
     * 还原默认样式
     */
    $UIMouse.prototype.resetStyle = function () {
        this.setEffect(this._dEffect);
        this.setStyle(this._dNormal, this._dLink, this._dUnavailable);
    };
    Object.defineProperty($UIMouse.prototype, "isValid", {
        /**
        * 是否初始化完毕
        */
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    /**
    * 销毁
    */
    $UIMouse.prototype.destroy = function () {
        var canvas = cc.Canvas.instance.node;
        if (cc.sys.isMobile) {
            zmg_ui_mgr.UIMgr.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        }
        else {
            zmg_ui_mgr.UIMgr.node.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this, false);
        }
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onCanvasDestory, this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_END, this.onCanvasEnd, this);
    };
    $UIMouse.prototype.onCanvasDestory = function () {
        var canvas = cc.Canvas.instance.node;
        if (cc.sys.isMobile) {
            zmg_ui_mgr.UIMgr.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        }
        else {
            //仅pc平台需要
            // cc.Canvas.instance.schedule(this.onTimeCheck.bind(this), UIMouse.CHECK_TIME);
            canvas.off(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this, true);
            // canvas.off(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLevel, this, true);
            canvas.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this, true);
        }
        canvas.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, true);
        canvas.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, true);
        if (cc.isValid(this._effectDragon)) {
            this._effectDragon.node.setParent(null);
        }
    };
    /**
    * 场景准备完毕
    * 监听碰撞
    */
    $UIMouse.prototype.onCanvasEnd = function () {
        var canvas = cc.Canvas.instance.node;
        canvas["_hitTest"] = function () { return true; };
        if (cc.sys.isMobile) {
            canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, true);
        }
        else {
            //仅pc平台需要
            // cc.Canvas.instance.schedule(this.onTimeCheck.bind(this), UIMouse.CHECK_TIME);
            canvas.on(cc.Node.EventType.MOUSE_ENTER, this.onMouseEnter, this, true);
            // canvas.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseLevel, this, true);
            canvas.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this, true);
        }
        canvas.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, true);
        canvas.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, true);
        if (cc.isValid(this._effectDragon)) {
            this._effectDragon.node.setParent(zmg_ui_mgr.UIMgr.node);
        }
    };
    $UIMouse.prototype.setEffectParent = function (parent) {
        if (cc.isValid(this._effectDragon)) {
            this._effectDragon.node.setParent(parent);
        }
    };
    $UIMouse.prototype.setParent = function (parent) {
        if (cc.isValid(this._effectDragon)) {
            this._effectDragon.node.setParent(parent);
        }
    };
    $UIMouse.prototype.hideEffectDragon = function () {
        this._isMouseDown = false;
        if (cc.isValid(this._effectDragon)) {
            this._effectDragon.node.active = false;
        }
    };
    /**
     * 手性切换检测
     * 检查鼠标显示手性
     */
    $UIMouse.prototype.onTimeCheck = function () {
    };
    $UIMouse.prototype.setMouseStyle = function (url) {
        if (!cc.sys.isMobile) {
            // gLog("设置样式：" + url);
            document.body.style.cursor = "url(" + url + "),auto ";
        }
    };
    $UIMouse.prototype.onMouseMove = function (event) {
        if (!this.active)
            return;
        if (this._isMouseDown) {
            this.onTouchMove(event);
        }
        else {
            //pc平台鼠标移动
            this._mouseV2 = event.getLocation();
            this._mouseV2 = this.getScreenToWorldPoint(this._mouseV2);
            var evt = $UIMouseEvent.create($UIMouseEvent.MOUSE_MOVE, this._mouseV2);
            this.gDispatchEvent(evt);
        }
    };
    $UIMouse.prototype.onTouchMove = function (event) {
        if (!this.active)
            return;
        this._mouseV2 = event.getLocation();
        this._mouseV2 = this.getScreenToWorldPoint(this._mouseV2);
        var evt = $UIMouseEvent.create($UIMouseEvent.TOUCH_MOVE, this._mouseV2);
        this.gDispatchEvent(evt);
    };
    $UIMouse.prototype.onMouseLevel = function (event) {
        if (this._isMouseDown) {
            this._onTouchEnd(event);
        }
        else {
            this.setMouseStyle(this._link);
        }
    };
    $UIMouse.prototype.onMouseEnter = function (event) {
        this.setMouseStyle(this._normal);
    };
    $UIMouse.prototype.onTouchEnd = function (event) {
        var worldpos = event.getLocation();
        this._onTouchEnd(event);
        if (this._effectDragon && event["_done"]) {
            if (!this._effectDragon.node.active) {
                this._effectDragon.node.active = true;
            }
            worldpos = this.getScreenToWorldPoint(worldpos);
            var localpos = this._effectDragon.node.parent.convertToNodeSpaceAR(worldpos);
            this._effectDragon.node.setPosition(localpos);
            this._effectDragon.playAnimation("click", 1);
        }
    };
    $UIMouse.prototype._onTouchEnd = function (event) {
        if (!this.active)
            return;
        var worldpos = event.getLocation();
        this._isMouseDown = false;
        this.setMouseStyle(this._normal);
        worldpos = this.getScreenToWorldPoint(worldpos);
        var evt = $UIMouseEvent.create($UIMouseEvent.MOUSE_UP, worldpos);
        this.gDispatchEvent(evt);
        if (event["_done"]) {
            zmg_audio_mgr.AudioMgr.playEffect(this._soundClip, null, this, 1, false);
        }
    };
    $UIMouse.prototype.onTouchStart = function (event) {
        if (!this.active)
            return;
        this._isMouseDown = true;
        this.setMouseStyle(this._unavailable);
        var worldpos = event.getLocation();
        worldpos = this.getScreenToWorldPoint(worldpos);
        var evt = $UIMouseEvent.create($UIMouseEvent.MOUSE_DOWN, worldpos);
        this.gDispatchEvent(evt);
    };
    $UIMouse.prototype.getScreenToWorldPoint = function (screenPosition) {
        var pos = cc.v2(screenPosition.x, screenPosition.y);
        var camear = zmg_camera_mgr.CamearMgr.getMain();
        if (camear) {
            var worldPoint = camear.getScreenToWorldPoint(pos);
            pos = cc.v2(worldPoint.x, worldPoint.y);
        }
        return pos;
    };
    $UIMouse.prototype.gDispatchEvent = function (evt) {
        evt.used = true;
        zmg_event_mgr.EventMgr.dispatchEvent(evt);
        evt.used = false;
    };
    $UIMouse.CHECK_TIME = 0.3;
    return $UIMouse;
}(cc.EventTarget));

var EUILayerZindex;
(function (EUILayerZindex) {
    EUILayerZindex[EUILayerZindex["video"] = 0] = "video";
    EUILayerZindex[EUILayerZindex["activity"] = 2] = "activity";
    EUILayerZindex[EUILayerZindex["window"] = 1] = "window";
    EUILayerZindex[EUILayerZindex["reward"] = 3] = "reward";
})(EUILayerZindex || (EUILayerZindex = {}));
var $UILayer = /** @class */ (function (_super) {
    __extends($UILayer, _super);
    function $UILayer() {
        return _super.call(this, "") || this;
    }
    $UILayer.prototype.setMask = function (mask) {
        this._mask = mask;
        if (this._rewardLayer) {
            this._rewardLayer.setMask(this._mask);
        }
    };
    Object.defineProperty($UILayer.prototype, "node", {
        get: function () {
            return this._node;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($UILayer.prototype, "activityLayer", {
        get: function () {
            return this._activityLayer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($UILayer.prototype, "isValid", {
        get: function () {
            return this.node ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    $UILayer.prototype.getComponent = function (type) {
        var content = this._windowsLayer.children[0];
        if (content) {
            return content.getComponent(type);
        }
        return null;
    };
    $UILayer.prototype.getContent = function () {
        return this._windowsLayer.children[0];
    };
    $UILayer.prototype.reward = function (num) {
        if (this._rewardLayer) {
            this._rewardLayer.show(num);
        }
    };
    $UILayer.prototype.closeVideo = function () {
        zmg_util.gLog("关闭视频组件");
        if (cc.isValid(this._videoLayer)) {
            zmg_ui_mgr.UIMgr.mask.hide("Video");
            zmg_camera_mgr.CamearMgr.showCamera(cc.Canvas.instance.node);
            this._isVideoUrl = "";
            this._videoLayer.destroy();
            this._videoLayer = null;
            zmg_event_mgr.EventMgr.dispatchEvent(new $UIEvent($UIEvent.VIDEO_HIDE));
        }
    };
    $UILayer.prototype.showVideo = function (url, isCtrl) {
        var _this = this;
        if (isCtrl === void 0) { isCtrl = true; }
        this._isVideoUrl = url;
        if (this._isVideoPrefabLoading) {
            zmg_util.gLog("视频组件正在加载中 ...");
            return;
        }
        if (!zmg_util.StringUtil.isValid(this._isVideoUrl)) {
            zmg_util.gLog("地址为空，无法播放.");
            return;
        }
        if (this._videoLayer) {
            zmg_ui_mgr.UIMgr.hideLoading();
            zmg_ui_mgr.UIMgr.mask.show("Video", 1);
            zmg_util.gLog("开始播放视频:" + this._isVideoUrl);
            zmg_camera_mgr.CamearMgr.hideCamera(cc.Canvas.instance.node);
            var video = this._videoLayer.getComponentInChildren(cc.VideoPlayer);
            video.resourceType = cc.VideoPlayer.ResourceType.REMOTE;
            video.remoteURL = this._isVideoUrl;
            this._videoLayer.setParent(this._node);
            zmg_event_mgr.EventMgr.dispatchEvent(new $UIEvent($UIEvent.VIDEO_SHOW, { isCtrl: isCtrl }));
        }
        else {
            this._isVideoPrefabLoading = true;
            zmg_util.gLog("开始下载视频组件...");
            zmg_res_mgr.ResMgr.load(zmg_res_mgr.SystemBundleName.UI, zmg_config_mgr.ConfigMgr.uiconfig.video, function (prefab) {
                zmg_util.gLog("创建视频组件...");
                _this._isVideoPrefabLoading = false;
                _this._videoLayer = cc.instantiate(prefab);
                _this._videoLayer.zIndex = EUILayerZindex.video;
                _this.showVideo(_this._isVideoUrl, isCtrl);
            }, this);
        }
    };
    $UILayer.prototype.showNode = function (windows, opacity) {
        this.close();
        try {
            if (windows instanceof cc.Prefab) {
                windows = cc.instantiate(windows);
            }
            windows.zIndex = 1;
            this._mask && this._mask.show("UILayer", opacity);
            windows.setParent(this._windowsLayer);
            this.scaleShow(0.3, windows);
            return windows;
        }
        catch (e) {
            zmg_util.gWarn("资源非法，无法进行显示！", windows ? windows.name : "节点无命名");
            return new cc.Node();
        }
    };
    $UILayer.prototype.init = function (url) {
        var n = new cc.Node();
        var widget = n.addComponent(cc.Widget);
        widget.isAlignLeft = true;
        widget.isAlignRight = true;
        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.left = widget.right = widget.top = widget.bottom = 0;
        n.group = "UI";
        n.name = "UILayer";
        n.zIndex = EUIZindex.uiLayer;
        this._target = n.addComponent(cc.Component);
        var ui = zmg_config_mgr.ConfigMgr.uiconfig;
        this._windowsLayer = new cc.Node();
        this._windowsLayer.zIndex = EUILayerZindex.window;
        widget = this._windowsLayer.addComponent(cc.Widget);
        widget.isAlignLeft = true;
        widget.isAlignRight = true;
        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.left = widget.right = widget.top = widget.bottom = 0;
        this._windowsLayer.name = "windowsLayer";
        this._windowsLayer.setParent(n);
        this._activityLayer = new cc.Node();
        this._activityLayer.zIndex = EUILayerZindex.activity;
        widget = this._activityLayer.addComponent(cc.Widget);
        widget.isAlignLeft = true;
        widget.isAlignRight = true;
        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.left = widget.right = widget.top = widget.bottom = 0;
        this._activityLayer.name = "activityLayer";
        this._activityLayer.setParent(n);
        this._node = n;
        this.initReward();
        this.onLoad();
    };
    $UILayer.prototype.addEvents = function () {
        // EventMgr.on(EventName.CONTROLLER_CHANGE_END, this.onSceneEnd, this, false);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this, false);
        // EventMgr.on(EventName.UI_BACK_BTN, this.onBackHanler, this, false, Number.MAX_SAFE_INTEGER);
        _super.prototype.addEvents.call(this);
    };
    $UILayer.prototype.removeEvents = function () {
        // EventMgr.off(EventName.CONTROLLER_CHANGE_END, this.onSceneEnd, this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this);
        // EventMgr.off(EventName.UI_BACK_BTN, this.onBackHanler, this);
        if (this._rewardLayer) {
            this._rewardLayer.node.off($RewardLayer.REWARD_START, this.onRewardStart, this);
            this._rewardLayer.node.off($RewardLayer.REWARD_OVER, this.onRewardOver, this);
        }
        _super.prototype.removeEvents.call(this);
    };
    // private onBackHanler(evt: $UIBackEvent): void {
    //     if (this._videoLayer && this._videoLayer.parent) {
    //         this.closeVideo();
    //         evt["stopped"]();
    //     }
    // }
    $UILayer.prototype.initReward = function () {
        var _this = this;
        zmg_res_mgr.ResMgr.load(zmg_res_mgr.SystemBundleName.UI, zmg_config_mgr.ConfigMgr.uiconfig.reward, function (res) {
            var rNode = cc.instantiate(res);
            rNode.zIndex = EUILayerZindex.reward;
            _this._rewardLayer = rNode.addComponent($RewardLayer);
            _this._rewardLayer.setParent(_this._node);
            if (_this._mask) {
                _this._rewardLayer.setMask(_this._mask);
            }
            _this._rewardLayer.node.on($RewardLayer.REWARD_START, _this.onRewardStart, _this, false);
            _this._rewardLayer.node.on($RewardLayer.REWARD_OVER, _this.onRewardOver, _this, false);
        }, this);
    };
    $UILayer.prototype.onRewardStart = function () {
    };
    $UILayer.prototype.onRewardOver = function () {
    };
    $UILayer.prototype.onSceneDestory = function () {
        this.clear();
    };
    $UILayer.prototype.onSceneEnd = function () {
    };
    $UILayer.prototype.close = function (isTween) {
        if (isTween === void 0) { isTween = true; }
        if (!cc.isValid(this._windowsLayer)) {
            return;
        }
        this._mask && this._mask.hide("UILayer");
        var i;
        var len = this._windowsLayer.childrenCount;
        for (i = len - 1; i >= 0; i--) {
            var tn = this._windowsLayer.children[i];
            if (isTween) {
                this.scaleHide(0.2, tn, function (node) {
                    if (cc.isValid(node)) {
                        node.destroy();
                    }
                }, this);
            }
            else {
                tn.destroy();
            }
        }
    };
    $UILayer.prototype.clear = function () {
        this.close();
        // len = this._activityLayer.childrenCount;
        // for (i = len - 1; i >= 0; i--) {
        //     this._activityLayer.children[i].destroy();
        // }
        this._activityLayer.removeAllChildren(true);
        if (this._rewardLayer) {
            this._rewardLayer.hide();
        }
    };
    return $UILayer;
}($BaseUI));

var _UIMgr = /** @class */ (function (_super) {
    __extends(_UIMgr, _super);
    function _UIMgr() {
        return _super.call(this) || this;
    }
    _UIMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _UIMgr();
        }
        return this._instance;
    };
    Object.defineProperty(_UIMgr.prototype, "node", {
        get: function () {
            return this._node;
        },
        enumerable: false,
        configurable: true
    });
    _UIMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                if (zmg_config_mgr.ConfigMgr.isValid) {
                    this.load();
                }
                else {
                    zmg_event_mgr.EventMgr.once(zmg_event_mgr.EventName.CONFIG_READY, this.load, this);
                }
                return [2 /*return*/];
            });
        });
    };
    _UIMgr.prototype.destroy = function () {
        this.uiLayer.destroy();
        this.mouse.destroy();
        this.bg.destroy();
        this.mask.destroy();
        this.backBtn.destroy();
        this.toast.destroy();
        this.alert.destroy();
        this.loading.destroy();
        this.transitions.destroy();
        this.fontMgr.destroy();
        this.removeEvents();
        _super.prototype.destroy.call(this);
        if (this._node) {
            cc.game.removePersistRootNode(this._node);
            this._node.destroy();
            this._node = null;
        }
        this._isValid = false;
    };
    _UIMgr.prototype.closeAll = function () {
        if (this.bg) {
            this.bg.hide();
        }
        if (this.alert) {
            this.alert.close();
        }
        if (this.loading) {
            this.loading.hide();
        }
    };
    Object.defineProperty(_UIMgr.prototype, "isValid", {
        /**
         * 未准备
         * 已被销毁
         * 则无法使用
         */
        get: function () {
            return this._isValid;
        },
        enumerable: false,
        configurable: true
    });
    _UIMgr.prototype.showLoading = function (isProgress, pro) {
        if (isProgress === void 0) { isProgress = false; }
        if (this.bg) {
            this.bg.show();
        }
        if (this.loading) {
            if (isProgress) {
                this.loading.setProgress(pro);
            }
            else {
                this.loading.hideProgress();
            }
            this.loading.show();
        }
    };
    _UIMgr.prototype.hideLoading = function () {
        if (this.bg) {
            this.bg.hide();
        }
        if (this.loading) {
            this.loading.hide();
        }
    };
    _UIMgr.prototype.check = function () {
        if (!this.loading.node) {
            return;
        }
        if (!this.bg.node) {
            return;
        }
        if (!this.alert.isValid) {
            return;
        }
        if (!this.mask.node) {
            return;
        }
        if (!this.toast.isValid) {
            return;
        }
        if (!this.transitions.node) {
            return;
        }
        if (!this.backBtn.node) {
            return;
        }
        if (!this.uiLayer.node) {
            return;
        }
        this._isValid = true;
        zmg_event_mgr.EventMgr.dispatchEvent(new $UIEvent($UIEvent.COMPLETE));
        this.dispatchEvent(new $UIEvent(zmg_event_mgr.EventName.READY));
    };
    _UIMgr.prototype.updateAlignment = function (node) {
        var wids = node.getComponentsInChildren(cc.Widget);
        var i = 0;
        var len = wids.length;
        for (i = 0; i < len; i++) {
            wids[i].updateAlignment();
        }
    };
    _UIMgr.prototype.sceneChange = function () {
        var clientWidth = Math.round(cc.view.getVisibleSize().width);
        var clientHeight = Math.round(cc.view.getVisibleSize().height);
        if (cc.Canvas.instance.node) {
            cc.Canvas.instance.node.width = clientWidth;
            cc.Canvas.instance.node.height = clientHeight;
        }
        if (this._node) {
            this._node.width = clientWidth;
            this._node.height = clientHeight;
            this._node.x = Math.round(clientWidth / 2);
            this._node.y = Math.round(clientHeight / 2);
        }
    };
    _UIMgr.prototype.load = function () {
        this._node = new cc.Node();
        this.sceneChange();
        this._node.name = "UIMgr";
        this.other = new cc.Node();
        this.other.name = "OtherUI";
        this.other.zIndex = EUIZindex.OTHERUI;
        this.other.parent = this._node;
        var widget = this._node.addComponent(cc.Widget);
        widget.isAlignLeft = true;
        widget.isAlignRight = true;
        widget.isAlignTop = true;
        widget.isAlignBottom = true;
        widget.left = widget.right = widget.top = widget.bottom = 0;
        cc.game.addPersistRootNode(this._node);
        var ui = zmg_config_mgr.ConfigMgr.uiconfig;
        this.uiLayer = new $UILayer();
        this.onUILayer();
        /**
         * 设置鼠标样式
         */
        this.mouse = new $UIMouse(ui.mouse.normal, ui.mouse.link, ui.mouse.unavailable, ui.mouse.effect, ui.mouse.sound);
        this.bg = new $Bg(ui.bg, this.node);
        this.bg.once(zmg_res_mgr.EResEventName.COMPLETE, this.onBgComplete, this);
        this.mask = new $UIMask(ui.mask);
        this.mask.once(zmg_res_mgr.EResEventName.COMPLETE, this.onMaskComplete, this);
        this.backBtn = new $UIBackBtn(ui.backBtn);
        this.backBtn.once(zmg_res_mgr.EResEventName.COMPLETE, this.onBackComplete, this);
        this.toast = _ToastMgr.getInstance();
        this.toast.init(ui.toast);
        this.toast.once(zmg_res_mgr.EResEventName.COMPLETE, this.onToastComplete, this);
        this.alert = _AlertMgr.getInstance();
        this.alert.init(ui.alert);
        this.alert.once(zmg_res_mgr.EResEventName.COMPLETE, this.onAlertComplete, this);
        this.loading = new $UILoading(ui.loading, this.node);
        this.loading.once(zmg_res_mgr.EResEventName.COMPLETE, this.onLoadingComplete, this);
        this.transitions = new $UITransitions(ui.transitions, this.node);
        this.transitions.once(zmg_res_mgr.EResEventName.COMPLETE, this.onTransitionsComplete, this);
        this.fontMgr = zmg_ui_mgr.FontMgr;
        this.fontMgr.start();
        this.addEvents();
    };
    _UIMgr.prototype.onAlertComplete = function () {
        zmg_util.gLog("资源complete: " + this.alert.res.path);
        this.alert.node.zIndex = EUIZindex.ALERT;
        this.alert.node.setParent(this._node);
        // this.alert.node.getComponent(cc.Widget).updateAlignment();
        this.check();
    };
    _UIMgr.prototype.onLoadingComplete = function () {
        zmg_util.gLog("资源complete: " + this.loading.res.path);
        this.loading.node.zIndex = EUIZindex.Loading;
        this.loading.node.setParent(this._node);
        this.check();
    };
    _UIMgr.prototype.onUILayer = function () {
        this.uiLayer.node.zIndex = EUIZindex.uiLayer;
        this.uiLayer.node.setParent(this._node);
        this.updateAlignment(this.uiLayer.node);
    };
    _UIMgr.prototype.onBgComplete = function () {
        zmg_util.gLog("资源complete: " + this.bg.res.path);
        this.bg.node.zIndex = EUIZindex.BG;
        this.bg.node.setParent(this._node);
        this.check();
    };
    _UIMgr.prototype.onMaskComplete = function () {
        zmg_util.gLog("资源complete: " + this.mask.res.path);
        this.mask.node.zIndex = EUIZindex.MASK;
        this.mask.node.setParent(this._node);
        this.uiLayer.setMask(this.mask);
        this.check();
    };
    _UIMgr.prototype.onToastComplete = function () {
        zmg_util.gLog("资源complete: " + this.toast.res.path);
        this.toast.node.zIndex = EUIZindex.TOAST;
        this.toast.node.setParent(this.node);
        this.check();
    };
    _UIMgr.prototype.onTransitionsComplete = function () {
        zmg_util.gLog("场景跳转组件准备完毕...");
        zmg_util.gLog("资源complete: " + this.transitions.res.path);
        this.transitions.node.zIndex = EUIZindex.TRANSITIONS;
        // this.transitions.node.setParent(this.node);
        this.check();
    };
    _UIMgr.prototype.onBackComplete = function () {
        this.backBtn.node.zIndex = EUIZindex.BACKBTN;
        this.backBtn.node.setParent(this.node);
        this.check();
    };
    _UIMgr.prototype.addEvents = function () {
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.UI_VIDEO_HIDE, this.onVideoHide, this, false);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.UI_VIDEO_SHOW, this.onVideoShow, this, false);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneChangeDestory, this, false);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_END, this.onSceneChangeEnd, this, false);
        cc.view.on("canvas-resize", this.onCanvasResize, this, false);
    };
    _UIMgr.prototype.removeEvents = function () {
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.UI_VIDEO_HIDE, this.onVideoHide, this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.UI_VIDEO_SHOW, this.onVideoShow, this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneChangeDestory, this);
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_END, this.onSceneChangeEnd, this);
        cc.view.off("canvas-resize", this.onCanvasResize, this);
    };
    _UIMgr.prototype.onVideoHide = function () {
        this.mask.hide("Video");
    };
    _UIMgr.prototype.onVideoShow = function () {
        this.mask.show("Video");
        this.hideLoading();
    };
    _UIMgr.prototype.onCanvasResize = function () {
        this.sceneChange();
        this.updateAlignment(cc.Canvas.instance.node);
        this.updateAlignment(this.node);
    };
    _UIMgr.prototype.onSceneChangeDestory = function (evt) {
        this.backBtn.show();
        this.mouse.hideEffectDragon();
    };
    _UIMgr.prototype.onSceneChangeEnd = function () {
        this.sceneChange();
        this.updateAlignment(this.node);
    };
    return _UIMgr;
}(zmg_mgr.BaseMgr));

/**
 * 声音资源存储获取
 */
var _AudioRes = /** @class */ (function (_super) {
    __extends(_AudioRes, _super);
    function _AudioRes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _AudioRes.getInstance = function () {
        if (!this._instance) {
            this._instance = new _AudioRes("AudioRes");
        }
        return this._instance;
    };
    _AudioRes.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                zmg_res_mgr.ResMgr.load(zmg_res_mgr.SystemBundleName.STACK, "audio/effect/tap", new zmg_res_mgr.ResListener(this, function (click) {
                    click.addRef();
                    _this._clickClip = click;
                }), this, cc.AudioClip);
                return [2 /*return*/];
            });
        });
    };
    _AudioRes.prototype.destroy = function () {
        if (this._clickClip) {
            this._clickClip.decRef();
            this._clickClip = null;
        }
        _super.prototype.destroy.call(this);
    };
    Object.defineProperty(_AudioRes.prototype, "isValid", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_AudioRes.prototype, "click", {
        get: function () {
            return this._clickClip;
        },
        enumerable: false,
        configurable: true
    });
    return _AudioRes;
}(zmg_mgr.BaseMgr));

var _a$1 = cc._decorator, ccclass$1 = _a$1.ccclass, property$1 = _a$1.property;
var $HitComp = /** @class */ (function (_super) {
    __extends($HitComp, _super);
    function $HitComp() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    $HitComp.prototype.onLoad = function () {
        this._col = this.node.getComponent(cc.Collider);
    };
    /**
    * 传入为世界坐标
    * @param pos
    * @param ty
    */
    $HitComp.prototype.hitTest = function (pos, ty) {
        if (!this.node.activeInHierarchy)
            return false;
        pos = pos instanceof cc.Vec2 ? pos : new cc.Vec2(pos, ty);
        if (this._col) {
            var ishit = zmg_util.GraphUtil.hitTest(pos, this._col);
            return ishit;
        }
        return this.node["_hitTest"](pos);
    };
    return $HitComp;
}(cc.Component));

var _a$2 = cc._decorator, ccclass$2 = _a$2.ccclass, property$2 = _a$2.property;
var $SimpleBtn = /** @class */ (function (_super) {
    __extends($SimpleBtn, _super);
    function $SimpleBtn() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.zoom = 0.90;
        _this.isOriginal = false;
        _this.events = [];
        _this.clickAudio = null;
        _this.priority = 0;
        _this.target = null;
        _this._interactable = true;
        _this._scaleX = 1.0;
        _this._scaleY = 1.0;
        _this._isclicking = false;
        return _this;
    }
    Object.defineProperty($SimpleBtn.prototype, "interactable", {
        get: function () {
            return this._interactable;
        },
        set: function (bool) {
            if (bool) {
                this.active();
            }
            else {
                this.disable();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty($SimpleBtn.prototype, "scale", {
        set: function (s) {
            this._scaleY = s;
            this._scaleX = s;
        },
        enumerable: false,
        configurable: true
    });
    $SimpleBtn.prototype.active = function () {
        this._interactable = true;
        this._scaleX = this.node.scaleX;
        this._scaleY = this.node.scaleY;
        var s = this.node.getComponent(cc.Sprite);
        if (s) {
            // s.setState(cc.Sprite.State.NORMAL);
            // s.setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
            s.setMaterial(0, cc.Material.createWithBuiltin('2d-sprite'));
        }
    };
    $SimpleBtn.prototype.disable = function () {
        this._interactable = false;
        this._scaleX = this.node.scaleX;
        this._scaleY = this.node.scaleY;
        var s = this.node.getComponent(cc.Sprite);
        if (s) {
            // s.setState(cc.Sprite.State.GRAY);
            // s.setMaterial(0, cc.Material.getBuiltinMaterial('2d-gray-sprite'));
            s.setMaterial(0, cc.Material.createWithBuiltin('2d-gray-sprite'));
        }
    };
    //多点屏蔽
    $SimpleBtn.prototype.onLoad = function () {
        if (!this.target) {
            this.target = this.node;
        }
        _super.prototype.onLoad.call(this);
        if (!this.clickAudio) {
            this.clickAudio = _AudioRes.getInstance().click;
        }
        this._scaleX = this.node.scaleX;
        this._scaleY = this.node.scaleY;
    };
    $SimpleBtn.prototype.addListener = function () {
        if (this.isOriginal) {
            this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, false);
            this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, false);
        }
        else {
            zmg_event_mgr.EventMgr.on($UIMouseEvent.MOUSE_UP, this.onMouseEnd, this, false, this.priority);
            zmg_event_mgr.EventMgr.on($UIMouseEvent.MOUSE_DOWN, this.onMouseStart, this, false, this.priority);
        }
    };
    $SimpleBtn.prototype.removeListener = function () {
        if (this.isOriginal) {
            this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, false);
            this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this, false);
        }
        else {
            zmg_event_mgr.EventMgr.off($UIMouseEvent.MOUSE_UP, this.onMouseEnd, this);
            zmg_event_mgr.EventMgr.off($UIMouseEvent.MOUSE_DOWN, this.onMouseStart, this);
        }
    };
    $SimpleBtn.prototype.onEnable = function () {
        this.addListener();
    };
    $SimpleBtn.prototype.onDisable = function () {
        this.removeListener();
    };
    $SimpleBtn.prototype.onDestroy = function () {
        this.events.length = 0;
        this.events = null;
    };
    $SimpleBtn.prototype.onMouseEnd = function (evt) {
        if (!this.node.activeInHierarchy) {
            return;
        }
        if (this._interactable) {
            if (this._isMouseDown) {
                if (this.hitTest(evt.worldPos)) {
                    this.onTouchEnd();
                    evt["stopped"] && evt["stopped"]();
                }
                else {
                    this.onTouchCancel();
                }
            }
        }
    };
    $SimpleBtn.prototype.onMouseStart = function (evt) {
        var ishit = this.hitTest(evt.worldPos);
        if (this._interactable && ishit) {
            this.onTouchStart();
            evt["stopped"] && evt["stopped"]();
        }
    };
    $SimpleBtn.prototype.onMouseMove = function (pos) {
        if (this._interactable && this._isMouseDown) {
            if (this.hitTest(pos)) ;
            else {
                this.onMouseLevel();
            }
        }
    };
    $SimpleBtn.prototype.onTouchStart = function () {
        if (this._interactable) {
            this._isMouseDown = true;
            this._clickDis = zmg_ui_mgr.UIMgr.mouse.mouseV2.clone();
            cc.tween(this.target).to(0.1, {
                scaleX: this._scaleX * this.zoom,
                scaleY: this._scaleY * this.zoom
            }).start();
        }
    };
    $SimpleBtn.prototype.onTouchEnd = function (evt) {
        if (!this.node.activeInHierarchy) {
            return;
        }
        if (this._interactable) {
            this.target.stopAllActions();
            this.target.scaleX = this._scaleX;
            this.target.scaleY = this._scaleY;
            if (cc.Vec2.distance(zmg_ui_mgr.UIMgr.mouse.mouseV2, this._clickDis) < 100) {
                this.onHandler(evt);
            }
            this._isMouseDown = false;
        }
    };
    $SimpleBtn.prototype.onHandler = function (evt) {
        if (this.clickAudio) {
            zmg_audio_mgr.AudioMgr.playEffect(this.clickAudio);
        }
        var i;
        if (!evt) {
            evt = new cc.Event.EventTouch([], false);
            evt.target = this.node;
        }
        var len = this.events.length;
        for (i = 0; i < len; i++) {
            /**
             * 为了兼容cc.event.eventtouch 第一个参数是空
             */
            this.events[i].emit([evt, this.events[i].customEventData, this]);
        }
    };
    $SimpleBtn.prototype.onMouseLevel = function () {
        if (this._interactable && this._isMouseDown) {
            this._isMouseDown = false;
            this.target.scaleX = this._scaleX;
            this.target.scaleY = this._scaleY;
        }
    };
    $SimpleBtn.prototype.onTouchCancel = function () {
        if (this._interactable) {
            this._isMouseDown = false;
            this.target.scaleX = this._scaleX;
            this.target.scaleY = this._scaleY;
        }
    };
    __decorate([
        property$2({ type: cc.Float, tooltip: "点击缩放比例" }),
        __metadata("design:type", Number)
    ], $SimpleBtn.prototype, "zoom", void 0);
    __decorate([
        property$2({ tooltip: "是否使用cc.node事件监听" }),
        __metadata("design:type", Boolean)
    ], $SimpleBtn.prototype, "isOriginal", void 0);
    __decorate([
        property$2({ tooltip: "是否激活状态" }),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], $SimpleBtn.prototype, "interactable", null);
    __decorate([
        property$2({ type: cc.Component.EventHandler }),
        __metadata("design:type", Array)
    ], $SimpleBtn.prototype, "events", void 0);
    __decorate([
        property$2({ type: cc.AudioClip, tooltip: '若不设置使用默认音效' }),
        __metadata("design:type", cc.AudioClip)
    ], $SimpleBtn.prototype, "clickAudio", void 0);
    __decorate([
        property$2({ tooltip: '优先级' }),
        __metadata("design:type", Number)
    ], $SimpleBtn.prototype, "priority", void 0);
    __decorate([
        property$2({ tooltip: '对象，默认空就是自己', type: cc.Node }),
        __metadata("design:type", cc.Node)
    ], $SimpleBtn.prototype, "target", void 0);
    return $SimpleBtn;
}($HitComp));

var _a$3 = cc._decorator, ccclass$3 = _a$3.ccclass, property$3 = _a$3.property;
var $LoadingSprite = /** @class */ (function (_super) {
    __extends($LoadingSprite, _super);
    function $LoadingSprite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.refresh = null;
        _this._isLoading = true;
        return _this;
    }
    $LoadingSprite.prototype.onLoad = function () {
        if (this._isLoading) {
            this.loading();
        }
    };
    $LoadingSprite.prototype.isLoading = function () {
        return this._isLoading;
    };
    $LoadingSprite.prototype.loading = function () {
        var _this = this;
        this._isLoading = true;
        this.refresh.stopAllActions();
        this.target.stopAllActions();
        if (this.target.active) {
            this.target.opacity = 0xff;
            cc.tween(this.refresh).repeatForever(cc.tween().by(1, { angle: -360 }, { easing: "smooth" })).start();
        }
        else {
            this.target.active = true;
            cc.tween(this.target).to(0.2, { opacity: 0xff }).call(function () {
                cc.tween(_this.refresh).repeatForever(cc.tween().by(1, { angle: -360 }, { easing: "smooth" })).start();
                _this.target.active = false;
            }).start();
        }
    };
    $LoadingSprite.prototype.loaded = function () {
        var _this = this;
        this._isLoading = false;
        if (this.target.active) {
            this.target.stopAllActions();
            this.refresh.stopAllActions();
            cc.tween(this.target).to(0.2, { opacity: 0 }).call(function () {
                _this.target.active = false;
            }).start();
        }
    };
    __decorate([
        property$3({ type: cc.Node }),
        __metadata("design:type", cc.Node)
    ], $LoadingSprite.prototype, "target", void 0);
    __decorate([
        property$3({ type: cc.Node }),
        __metadata("design:type", cc.Node)
    ], $LoadingSprite.prototype, "refresh", void 0);
    return $LoadingSprite;
}(cc.Component));

var _a$4 = cc._decorator, ccclass$4 = _a$4.ccclass, property$4 = _a$4.property;
var EShowHideType;
(function (EShowHideType) {
    EShowHideType[EShowHideType["alpha"] = 0] = "alpha";
    EShowHideType[EShowHideType["scale"] = 1] = "scale";
})(EShowHideType || (EShowHideType = {}));
var $ShowHideSprite = /** @class */ (function (_super) {
    __extends($ShowHideSprite, _super);
    function $ShowHideSprite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = null;
        _this.type = EShowHideType.alpha;
        _this.time = 0.2;
        return _this;
    }
    $ShowHideSprite.prototype.onLoad = function () {
    };
    $ShowHideSprite.prototype.isShow = function () {
        return this._isShow;
    };
    $ShowHideSprite.prototype.show = function (effect) {
        if (effect === void 0) { effect = true; }
        this._isShow = true;
        if (effect) {
            this.target.active = true;
            this.target.stopAllActions();
            switch (this.type) {
                case EShowHideType.alpha:
                    if (this.target.opacity != 0xff) {
                        cc.tween(this.target).to(this.time, { opacity: 0xff }, { easing: "smooth" }).start();
                    }
                    break;
                case EShowHideType.scale:
                    if (this.target.scale != 1) {
                        cc.tween(this.target).to(this.time, { scale: 1 }, { easing: "smooth" }).start();
                    }
                    break;
            }
        }
        else {
            switch (this.type) {
                case EShowHideType.alpha:
                    this.target.opacity = 0xff;
                    break;
                case EShowHideType.scale:
                    this.target.scale = 1.0;
                    break;
            }
            this.node.active = true;
        }
    };
    $ShowHideSprite.prototype.hide = function (effect) {
        var _this = this;
        if (effect === void 0) { effect = true; }
        this._isShow = false;
        if (effect) {
            if (this.target.active) {
                this.target.stopAllActions();
                switch (this.type) {
                    case EShowHideType.alpha:
                        cc.tween(this.target).to(this.time, { opacity: 0 }, { easing: "smooth" }).call(function () {
                            _this.target.active = false;
                        }).start();
                        break;
                    case EShowHideType.scale:
                        cc.tween(this.target).to(this.time, { scale: 0 }, { easing: "smooth" }).call(function () {
                            _this.target.active = false;
                        }).start();
                        break;
                }
            }
        }
        else {
            this.target.active = false;
        }
    };
    __decorate([
        property$4({ type: cc.Node }),
        __metadata("design:type", cc.Node)
    ], $ShowHideSprite.prototype, "target", void 0);
    __decorate([
        property$4({ type: cc.Enum(EShowHideType) }),
        __metadata("design:type", Number)
    ], $ShowHideSprite.prototype, "type", void 0);
    __decorate([
        property$4({ tooltip: "渐变效果时间" }),
        __metadata("design:type", Number)
    ], $ShowHideSprite.prototype, "time", void 0);
    return $ShowHideSprite;
}(cc.Component));

/**
 *
 */
var _a$5 = cc._decorator, ccclass$5 = _a$5.ccclass, property$5 = _a$5.property;
var $StateSprite = /** @class */ (function (_super) {
    __extends($StateSprite, _super);
    function $StateSprite() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.frames = [];
        _this.frameIndex = 0;
        _this.sprite = null;
        return _this;
    }
    $StateSprite.prototype.setState = function (v) {
        this.frameIndex = v;
        if (this.sprite) {
            this.sprite.spriteFrame = this.frames[this.frameIndex];
        }
    };
    $StateSprite.prototype.onLoad = function () {
        if (this.sprite == null) {
            this.sprite = this.getComponent(cc.Sprite);
        }
        if (this.sprite) {
            this.sprite.spriteFrame = this.frames[this.frameIndex];
        }
    };
    $StateSprite.prototype.clean = function () {
        this.node.stopAllActions();
        this.destroy();
    };
    $StateSprite.prototype.random = function () {
        this.setState(Math.floor(Math.random() * this.frames.length));
    };
    __decorate([
        property$5({ type: cc.SpriteFrame }),
        __metadata("design:type", Array)
    ], $StateSprite.prototype, "frames", void 0);
    __decorate([
        property$5({ type: cc.Integer }),
        __metadata("design:type", Number)
    ], $StateSprite.prototype, "frameIndex", void 0);
    __decorate([
        property$5({ type: cc.Sprite }),
        __metadata("design:type", cc.Sprite)
    ], $StateSprite.prototype, "sprite", void 0);
    return $StateSprite;
}(cc.Component));

var _zmTween = /** @class */ (function () {
    function _zmTween(target) {
        this._target = target;
    }
    _zmTween.prototype.to = function (duration, props, opts) {
        var _this = this;
        this.fullFrameRatio();
        if (this._target instanceof cc.Node) {
            this._target.on(zmg_event_mgr.EventName.DESTROY_NODE, this.recoverFrameRatioHandler, this);
        }
        return cc.tween(this._target).to(duration, props, opts).call(function () {
            //减慢屏刷速度
            _this.recoverFrameRatio();
            if (_this._target instanceof cc.Node) {
                _this._target.off(zmg_event_mgr.EventName.DESTROY_NODE, _this.recoverFrameRatioHandler, _this);
            }
        });
    };
    _zmTween.prototype.recoverFrameRatioHandler = function (node) {
        this.recoverFrameRatio();
        this._target.off(zmg_event_mgr.EventName.DESTROY_NODE, this.recoverFrameRatioHandler, this);
    };
    _zmTween.prototype.recoverFrameRatio = function () {
        cc.game["recoverFrameRatio"] && cc.game["recoverFrameRatio"]();
    };
    _zmTween.prototype.fullFrameRatio = function () {
        cc.game["fullFrameRatio"] && cc.game["fullFrameRatio"]();
    };
    _zmTween.prototype.repeatForever = function (action) {
        this.fullFrameRatio();
        if (this._target instanceof cc.Node) {
            this._target.on(zmg_event_mgr.EventName.DESTROY_NODE, this.recoverFrameRatioHandler, this);
        }
        return cc.tween(this._target).repeatForever(action);
    };
    _zmTween.prototype.stopAllActions = function () {
        if (this._target.stopAllActions()) {
            this.recoverFrameRatio();
            if (this._target instanceof cc.Node) {
                this._target.off(zmg_event_mgr.EventName.DESTROY_NODE, this.recoverFrameRatioHandler, this);
            }
        }
    };
    return _zmTween;
}());

var AlertAsset = /** @class */ (function (_super) {
    __extends(AlertAsset, _super);
    function AlertAsset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AlertAsset;
}($AlertAsset));
var AlertMgr = _AlertMgr.getInstance();
var ToastMgr = _ToastMgr.getInstance();
var Alert = /** @class */ (function (_super) {
    __extends(Alert, _super);
    function Alert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Alert;
}($Alert));
var UILayer = /** @class */ (function (_super) {
    __extends(UILayer, _super);
    function UILayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UILayer;
}($UILayer));
var UIBackBtn = /** @class */ (function (_super) {
    __extends(UIBackBtn, _super);
    function UIBackBtn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UIBackBtn;
}($UIBackBtn));
var UILoading = /** @class */ (function (_super) {
    __extends(UILoading, _super);
    function UILoading() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UILoading;
}($UILoading));
var UIMask = /** @class */ (function (_super) {
    __extends(UIMask, _super);
    function UIMask() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UIMask;
}($UIMask));
var UIMouse = /** @class */ (function (_super) {
    __extends(UIMouse, _super);
    function UIMouse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UIMouse;
}($UIMouse));
var UITransitions = /** @class */ (function (_super) {
    __extends(UITransitions, _super);
    function UITransitions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UITransitions;
}($UITransitions));
var BaseUI = /** @class */ (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseUI;
}($BaseUI));
// export * from "./UIMgr";
var UIMgr = _UIMgr.getInstance();
// export * from "./components/FontMgr";
var FontMgr = _FontMgr.getInstance();
var Role = /** @class */ (function (_super) {
    __extends(Role, _super);
    function Role() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Role;
}($Role));
// export * from "./components/role/Actor";
// export * from "./components/role/ERoleAction";
// export * from "./components/UILayer/RewardLayer";
var RewardLayer = /** @class */ (function (_super) {
    __extends(RewardLayer, _super);
    function RewardLayer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RewardLayer;
}($RewardLayer));
// export * from "./events/UIBackEvent";
var UIBackEvent = /** @class */ (function (_super) {
    __extends(UIBackEvent, _super);
    function UIBackEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UIBackEvent;
}($UIBackEvent));
// export * from "./events/UIEvent";
var UIEvent = /** @class */ (function (_super) {
    __extends(UIEvent, _super);
    function UIEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UIEvent;
}($UIEvent));
// export * from "./events/UIMouseEvent";
var UIMouseEvent = /** @class */ (function (_super) {
    __extends(UIMouseEvent, _super);
    function UIMouseEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UIMouseEvent;
}($UIMouseEvent));
// export * from "./components/role/RoleEvent";
var RoleEvent = /** @class */ (function (_super) {
    __extends(RoleEvent, _super);
    function RoleEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return RoleEvent;
}($RoleEvent));
var ERoleAction = $ERoleAction;
var EPetAction = $EPetAction;
var Actor = _Actor.getInstance;
var AudioRes = _AudioRes.getInstance();
var zmgui_btn_SimpleBtn = /** @class */ (function (_super) {
    __extends(zmgui_btn_SimpleBtn, _super);
    function zmgui_btn_SimpleBtn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmgui_btn_SimpleBtn;
}($SimpleBtn));
var zmgui_sprite_LoadingSprite = /** @class */ (function (_super) {
    __extends(zmgui_sprite_LoadingSprite, _super);
    function zmgui_sprite_LoadingSprite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmgui_sprite_LoadingSprite;
}($LoadingSprite));
var zmgui_sprite_ShowHideSprite = /** @class */ (function (_super) {
    __extends(zmgui_sprite_ShowHideSprite, _super);
    function zmgui_sprite_ShowHideSprite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmgui_sprite_ShowHideSprite;
}($ShowHideSprite));
var zmgui_sprite_StateSprite = /** @class */ (function (_super) {
    __extends(zmgui_sprite_StateSprite, _super);
    function zmgui_sprite_StateSprite() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmgui_sprite_StateSprite;
}($StateSprite));
var zmTween = function (target) {
    return new _zmTween(target);
};
// let zone = {
//     AZone: $AZone,
//     ATarget: $ATarget,
//     ASwap: $ASwap,
//     AStar: $AStar,
//     ANode: $ANode,
//     AMoveButton: $AMoveButton,
//     AMap: $AMap,
//     AGrid: $AGrid,
//     AEvent: $AEvent,
//     AEditMap: $AEditMap
// }
// export let zmuis = {
//     zone: zone
// };
// export let AZone = $AZone;
// export declare namespace zmuis {
//     export class AZone extends $AZone {
//     }
// }
// window["zmuis"] = zmuis;

exports.Actor = Actor;
exports.Alert = Alert;
exports.AlertAsset = AlertAsset;
exports.AlertMgr = AlertMgr;
exports.AudioRes = AudioRes;
exports.BaseUI = BaseUI;
exports.EPetAction = EPetAction;
exports.ERoleAction = ERoleAction;
exports.FontMgr = FontMgr;
exports.RewardLayer = RewardLayer;
exports.Role = Role;
exports.RoleEvent = RoleEvent;
exports.ToastMgr = ToastMgr;
exports.UIBackBtn = UIBackBtn;
exports.UIBackEvent = UIBackEvent;
exports.UIEvent = UIEvent;
exports.UILayer = UILayer;
exports.UILoading = UILoading;
exports.UIMask = UIMask;
exports.UIMgr = UIMgr;
exports.UIMouse = UIMouse;
exports.UIMouseEvent = UIMouseEvent;
exports.UITransitions = UITransitions;
exports.zmTween = zmTween;
exports.zmgui_btn_SimpleBtn = zmgui_btn_SimpleBtn;
exports.zmgui_sprite_LoadingSprite = zmgui_sprite_LoadingSprite;
exports.zmgui_sprite_ShowHideSprite = zmgui_sprite_ShowHideSprite;
exports.zmgui_sprite_StateSprite = zmgui_sprite_StateSprite;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy96bWd1aS9yb2xlL1JvbGVFdmVudC50cyIsIi4uLy4uLy4uL3NyYy9ldmVudHMvVUlFdmVudC50cyIsIi4uLy4uLy4uL3NyYy9ldmVudHMvVUlCYWNrRXZlbnQudHMiLCIuLi8uLi8uLi9zcmMvZXZlbnRzL1VJTW91c2VFdmVudC50cyIsIi4uLy4uLy4uL3NyYy9zeXN1aS9VSUxheWVyL1Jld2FyZExheWVyLnRzIiwiLi4vLi4vLi4vc3JjL3ptZ3VpL3JvbGUvRVJvbGVBY3Rpb24udHMiLCIuLi8uLi8uLi9zcmMvem1ndWkvcm9sZS9Sb2xlQ2xvdGhUeXBlLnRzIiwiLi4vLi4vLi4vc3JjL3ptZ3VpL3JvbGUvRVJvbGVMZXZlbC50cyIsIi4uLy4uLy4uL3NyYy96bWd1aS9yb2xlL1JvbGVDbG90aC50cyIsIi4uLy4uLy4uL3NyYy96bWd1aS9yb2xlL1BldC50cyIsIi4uLy4uLy4uL3NyYy96bWd1aS9yb2xlL1JvbGUudHMiLCIuLi8uLi8uLi9zcmMvem1ndWkvcm9sZS9BY3Rvci50cyIsIi4uLy4uLy4uL3NyYy9zeXN1aS9Gb250TWdyLnRzIiwiLi4vLi4vLi4vc3JjL3N5c3VpL2FsZXJ0L0FsZXJ0LnRzIiwiLi4vLi4vLi4vc3JjL3N5c3VpL2FsZXJ0L0FsZXJ0QXNzZXQudHMiLCIuLi8uLi8uLi9zcmMvc3lzdWkvYWxlcnQvQWxlcnRNZ3IudHMiLCIuLi8uLi8uLi9zcmMvc3lzdWkvQmFzZVVJLnRzIiwiLi4vLi4vLi4vc3JjL3N5c3VpL0JnLnRzIiwiLi4vLi4vLi4vc3JjL3N5c3VpL1VJTWFzay50cyIsIi4uLy4uLy4uL3NyYy9zeXN1aS9Ub2FzdE1nci50cyIsIi4uLy4uLy4uL3NyYy9zeXN1aS9FVUlaaW5kZXgudHMiLCIuLi8uLi8uLi9zcmMvc3lzdWkvVUlMb2FkaW5nLnRzIiwiLi4vLi4vLi4vc3JjL3N5c3VpL1VJVHJhbnNpdGlvbnMudHMiLCIuLi8uLi8uLi9zcmMvc3lzdWkvVUlCYWNrQnRuLnRzIiwiLi4vLi4vLi4vc3JjL3N5c3VpL1VJTW91c2UudHMiLCIuLi8uLi8uLi9zcmMvc3lzdWkvVUlMYXllci50cyIsIi4uLy4uLy4uL3NyYy9VSU1nci50cyIsIi4uLy4uLy4uL3NyYy96bWd1aS9jYWNoZS9BdWRpb1Jlcy50cyIsIi4uLy4uLy4uL3NyYy96bWd1aS9oaXQvSGl0Q29tcC50cyIsIi4uLy4uLy4uL3NyYy96bWd1aS9idG4vU2ltcGxlQnRuLnRzIiwiLi4vLi4vLi4vc3JjL3ptZ3VpL3Nwcml0ZS9Mb2FkaW5nU3ByaXRlLnRzIiwiLi4vLi4vLi4vc3JjL3ptZ3VpL3Nwcml0ZS9TaG93SGlkZVNwcml0ZS50cyIsIi4uLy4uLy4uL3NyYy96bWd1aS9zcHJpdGUvU3RhdGVTcHJpdGUudHMiLCIuLi8uLi8uLi9zcmMvZnJhbWVSYXRpby96bVR3ZWVuLnRzIiwiLi4vLi4vLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50TmFtZSB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgJFJvbGVFdmVudCBleHRlbmRzIGNjLkV2ZW50IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgQUNUSU9OX0NIQU5HRSA9IEV2ZW50TmFtZS5VSV9ST0xFX0FDVElPTl9DSEFOR0U7XHJcbiAgICBwdWJsaWMgcGFyYW06IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHR5cGU6IHN0cmluZywgcGFyYW06IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHR5cGUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnBhcmFtID0gcGFyYW07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5leHBvcnQgY2xhc3MgJFVJRXZlbnQgZXh0ZW5kcyBjYy5FdmVudCB7XHJcbiAgICBzdGF0aWMgQ09NUExFVEU6IHN0cmluZyA9IEV2ZW50TmFtZS5VSV9SRUFEWTtcclxuICAgIHN0YXRpYyBUT0FTVF9ISURFOiBzdHJpbmcgPSBcInRvYXN0SGlkZVwiO1xyXG4gICAgc3RhdGljIFRPQVNUX1NIT1c6IHN0cmluZyA9IFwidG9hc3RzaG93XCI7XHJcblxyXG4gICAgc3RhdGljIFZJREVPX0hJREU6IHN0cmluZyA9IEV2ZW50TmFtZS5VSV9WSURFT19ISURFO1xyXG4gICAgc3RhdGljIFZJREVPX1NIT1c6IHN0cmluZyA9IEV2ZW50TmFtZS5VSV9WSURFT19TSE9XO1xyXG5cclxuICAgIHN0YXRpYyBMT0FEX0hJREU6IHN0cmluZyA9IEV2ZW50TmFtZS5VSV9MT0FEX0hJREU7XHJcbiAgICBzdGF0aWMgTE9BRF9TSE9XOiBzdHJpbmcgPSBFdmVudE5hbWUuVUlfTE9BRF9TSE9XO1xyXG5cclxuICAgIHB1YmxpYyBwYXJhbTogYW55O1xyXG4gICAgcHVibGljIHRhcmdldDogYW55O1xyXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCBwYXJhbT86IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHR5cGUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnBhcmFtID0gcGFyYW07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5leHBvcnQgY2xhc3MgJFVJQmFja0V2ZW50IGV4dGVuZHMgY2MuRXZlbnQge1xyXG4gICAgc3RhdGljIEJBQ0s6IHN0cmluZyA9IEV2ZW50TmFtZS5VSV9CQUNLX0JUTjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigkVUlCYWNrRXZlbnQuQkFDSywgZmFsc2UpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRXZlbnROYW1lIH0gZnJvbSBcInptZ19ldmVudF9tZ3JcIjtcbmV4cG9ydCBjbGFzcyAkVUlNb3VzZUV2ZW50IGV4dGVuZHMgY2MuRXZlbnQge1xuICAgIC8qKlxuICAgICAqICBcbiAgICAgKi9cbiAgICBzdGF0aWMgTU9VU0VfVVA6IHN0cmluZyA9IEV2ZW50TmFtZS5VSV9NT1VTRV9VUDtcbiAgICBzdGF0aWMgTU9VU0VfRE9XTjogc3RyaW5nID0gRXZlbnROYW1lLlVJX01PVVNFX0RPV047XG4gICAgc3RhdGljIE1PVVNFX01PVkU6IHN0cmluZyA9IEV2ZW50TmFtZS5VSV9NT1VTRV9NT1ZFO1xuICAgIHN0YXRpYyBUT1VDSF9NT1ZFOiBzdHJpbmcgPSBFdmVudE5hbWUuVUlfVE9VQ0hfTU9WRTtcblxuICAgIHN0YXRpYyBjcmVhdGUodHlwZTogc3RyaW5nLCB3b3JsZFBvczogY2MuVmVjMik6ICRVSU1vdXNlRXZlbnQge1xuICAgICAgICBsZXQgZXZ0OiAkVUlNb3VzZUV2ZW50ID0gbmV3ICRVSU1vdXNlRXZlbnQodHlwZSwgd29ybGRQb3MpO1xuICAgICAgICByZXR1cm4gZXZ0O1xuICAgIH1cblxuXG4gICAgcHVibGljIHdvcmxkUG9zOiBjYy5WZWMyO1xuICAgIHB1YmxpYyB1c2VkOiBib29sZWFuID0gZmFsc2U7XG5cblxuXG4gICAgcHVibGljIGdldFdvcmxkUG9zKCk6IGNjLlZlYzIge1xuICAgICAgICByZXR1cm4gdGhpcy53b3JsZFBvcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0TG9jYXRpb24obm9kZT86IGNjLk5vZGUpOiBjYy5WZWMyIHtcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQobm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlLmNvbnZlcnRUb05vZGVTcGFjZUFSKHRoaXMud29ybGRQb3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLndvcmxkUG9zO1xuICAgIH1cbiAgICBwdWJsaWMgZ2V0SXNIaXROb2RlKG5vZGU6IGNjLk5vZGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQobm9kZSkgJiYgbm9kZS5hY3RpdmVJbkhpZXJhcmNoeSAmJiBub2RlLm9wYWNpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlW1wiX2hpdFRlc3RcIl0odGhpcy53b3JsZFBvcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyByZXR1cm4gbm9kZS5jb252ZXJ0VG9Ob2RlU3BhY2VBUih0aGlzLndvcmxkUG9zKTtcbiAgICB9XG4gICAgcHVibGljIGdldENhbnZhc1BvcygpOiBjYy5WZWMyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9jYXRpb24oY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUpO1xuICAgIH1cbiAgICBjb25zdHJ1Y3Rvcih0eXBlOiBzdHJpbmcsIHdvcmxkUG9zOiBjYy5WZWMyLCkge1xuICAgICAgICBzdXBlcih0eXBlLCBmYWxzZSk7XG4gICAgICAgIHRoaXMud29ybGRQb3MgPSB3b3JsZFBvcztcbiAgICB9XG59IiwiLyoqXHJcbiAqIFxyXG4gKi9cclxuXHJcbmltcG9ydCB7ICRVSU1hc2sgfSBmcm9tIFwiLi4vVUlNYXNrXCI7XHJcblxyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBjbGFzcyAkUmV3YXJkTGF5ZXIgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHN0YXRpYyBSRVdBUkRfT1ZFUiA9ICdyZXdhcmRPdmVyJztcclxuICAgIHN0YXRpYyBSRVdBUkRfU1RBUlQgPSAncmV3YXJkU3RhcnQnO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSB9KVxyXG4gICAgcmV3YXJkOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSB9KVxyXG4gICAgbm9yZXdhcmQ6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTGFiZWwgfSlcclxuICAgIGxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgcHJpdmF0ZSBfY291bnQ6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIF9wYXJlbnQ6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIF9tYXNrOiAkVUlNYXNrO1xyXG4gICAgcHVibGljIHNldFBhcmVudChwYXJlbnQ6IGNjLk5vZGUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0TWFzayhtYXNrOiAkVUlNYXNrKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fbWFzayA9IG1hc2s7XHJcbiAgICB9XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgbGV0IHJld2FyZCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInJld2FyZFwiKTtcclxuICAgICAgICB0aGlzLnJld2FyZCA9IHJld2FyZC5nZXRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KTtcclxuICAgICAgICBsZXQgbm9yZXdhcmQgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJub3Jld2FyZFwiKVxyXG4gICAgICAgIHRoaXMubm9yZXdhcmQgPSBub3Jld2FyZC5nZXRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KTtcclxuICAgICAgICBsZXQgbGFiZWxOb2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIilcclxuICAgICAgICBsYWJlbE5vZGUgJiYgKHRoaXMubGFiZWwgPSBsYWJlbE5vZGUuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKSk7XHJcbiAgICAgICAgdGhpcy5yZXdhcmQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vcmV3YXJkLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgb25FbmFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZXdhcmQuYWRkRXZlbnRMaXN0ZW5lcihkcmFnb25Cb25lcy5FdmVudE9iamVjdC5DT01QTEVURSwgdGhpcy5yZXdhcmRDb21wbGV0ZSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5ub3Jld2FyZC5hZGRFdmVudExpc3RlbmVyKGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkNPTVBMRVRFLCB0aGlzLnJld2FyZENvbXBsZXRlLCB0aGlzKTtcclxuICAgIH1cclxuICAgIG9uRGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9tYXNrICYmIHRoaXMuX21hc2suaGlkZShcIlJld2FyZExheWVyXCIpO1xyXG4gICAgICAgIHRoaXMucmV3YXJkLnJlbW92ZUV2ZW50TGlzdGVuZXIoZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuQ09NUExFVEUsIHRoaXMucmV3YXJkQ29tcGxldGUsIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9yZXdhcmQucmVtb3ZlRXZlbnRMaXN0ZW5lcihkcmFnb25Cb25lcy5FdmVudE9iamVjdC5DT01QTEVURSwgdGhpcy5yZXdhcmRDb21wbGV0ZSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSByZXdhcmRDb21wbGV0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB0aGlzLl9tYXNrICYmIHRoaXMuX21hc2suaGlkZShcIlJld2FyZExheWVyXCIpO1xyXG4gICAgICAgIHRoaXMubm9kZS5lbWl0KCRSZXdhcmRMYXllci5SRVdBUkRfT1ZFUik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3cobnVtOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb3VudCA9IG51bTtcclxuICAgICAgICBpZiAoIXRoaXMubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBhcmVudCh0aGlzLl9wYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fY291bnQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmQudGltZVNjYWxlID0gMTtcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnJld2FyZC5wbGF5QW5pbWF0aW9uKFwiZG9uZ2h1YVwiLCAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm5vcmV3YXJkLnRpbWVTY2FsZSA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMubm9yZXdhcmQubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLm5vcmV3YXJkLnBsYXlBbmltYXRpb24oXCJkb25naHVhXCIsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobnVtKSB7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsLnN0cmluZyA9ICcrJyArIG51bTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbC5ub2RlLnkgPSAxNjA7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwubm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5sYWJlbC5ub2RlKS50bygwLjMsIHsgb3BhY2l0eTogMHhmZiwgeDogMCwgeTogMjIwIH0sIHsgZWFzaW5nOiBcInNtb290aFwiIH0pLmRlbGF5KDEuMCkuc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmxhYmVsLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hc2sgJiYgdGhpcy5fbWFzay5zaG93KFwiUmV3YXJkTGF5ZXJcIik7XHJcbiAgICAgICAgdGhpcy5ub2RlLmVtaXQoJFJld2FyZExheWVyLlJFV0FSRF9TVEFSVCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXdhcmQubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5ub3Jld2FyZC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UGFyZW50KG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgZW51bSAkRVJvbGVBY3Rpb24ge1xyXG4gICAgV0FMS19SSUdIVCA9IFwid2Fsa3JpZ2h0XCIsXHJcbiAgICBXQUxLX0xFRlQgPSBcIndhbGtsZWZ0XCIsXHJcbiAgICBTVEFORCA9IFwic3RhbmRcIixcclxuICAgIFRBTEsgPSBcInRhbGtcIixcclxuICAgIERJQU5aQU4gPSBcImRpYW56YW5cIlxyXG59XHJcblxyXG5cclxuZXhwb3J0IGVudW0gJEVQZXRBY3Rpb24ge1xyXG4gICAgVU5LTk9XID0gXCJ1bmtub3dcIixcclxuICAgIFNUQU5EID0gXCJhbmltX2lkbGVfMlwiLFxyXG4gICAgV0FMSyA9IFwiYW5pbV9ydW5fMVwiLFxyXG59XHJcblxyXG4iLCJcclxuLy/mnI3oo4XnsbvlnotcclxuZXhwb3J0IGVudW0gUm9sZUNsb3RoVHlwZSB7XHJcbiAgICAvKirlhajpg6ggKi9cclxuICAgIEFMTCA9ICdBTEwnLFxyXG5cclxuICAgIC8qKuWll+ijhSAqL1xyXG4gICAgU0VUID0gJ1NFVCcsIC8v6KGj5pyNXHJcblxyXG4gICAgLyoqIOWktOmlsCAqL1xyXG4gICAgSEVBRFdFQVIgPSAnSEVBRFdFQVInLCAgIC8vSEVBRFdFQVIg5aS06aWwXHJcblxyXG4gICAgLyoqIOiDjOmlsCAqL1xyXG4gICAgQkFDS1dFQVIgPSAnQkFDS1dFQVInLCAvL0JBQ0tXRUFSIOiDjOmlsFxyXG5cclxuICAgIC8qKiDpnovlrZAgKi9cclxuICAgIFNIT0VTID0gJ1NIT0VTJyxcclxuXHJcbiAgICAvKiog5omL5oyB6YGT5YW3ICovXHJcbiAgICBIQU5ESEVMRCA9ICdIQU5ESEVMRCcsXHJcbn0iLCJpbXBvcnQgeyBSb2xlQ2xvdGhUeXBlIH0gZnJvbSBcIi4vUm9sZUNsb3RoVHlwZVwiO1xyXG5cclxuZXhwb3J0IGVudW0gRVJvbGVMZXZlbCB7XHJcbiAgICBIRUFEID0gJ2hlYWQnLC8v5aS06YOoXHJcbiAgICBCT0RZID0gJ2JvZHknLCAvL+i6q+S9k1xyXG4gICAgTEVHX0wgPSAnbGVnX2wnLFxyXG4gICAgTEVHX1IgPSAnbGVnX3InLFxyXG4gICAgVFVJX0wgPSAndHVpX2wnLFxyXG4gICAgVFVJX1IgPSAndHVpX3InLFxyXG4gICAgSEFUID0gJ2hhdCcsXHJcbiAgICBIQVRfMSA9ICdoYXRfMScsXHJcbiAgICBFWUUgPSAnZXllJyxcclxuICAgIENST1RDSCA9ICdjcm90Y2gnLFxyXG4gICAgTkVDSyA9ICduZWNrJyxcclxuICAgIEVBUiA9ICdlYXInLFxyXG4gICAgRUFSX1IgPSAnZWFyX3InLFxyXG4gICAgRUFSX0wgPSAnZWFyX2wnLFxyXG4gICAgSEFORF9SID0gJ2hhbmRfcicsXHJcbiAgICBCRUFSRCA9ICdiZWFyZCcsXHJcbiAgICBIQU5EX0wgPSAnaGFuZF9sJyxcclxuICAgIEZPT1RfTCA9ICdmb290X2wnLFxyXG4gICAgRk9PVF9SID0gJ2Zvb3RfcicsXHJcbiAgICBIT0xEX1IgPSAnaG9sZF9yJyxcclxuICAgIEhPTERfTCA9ICdob2xkX2wnLFxyXG4gICAgV0lORyA9ICd3aW5nJyxcclxuICAgIFdJTkdfMSA9ICd3aW5nXzEnLFxyXG4gICAgV0lOR18yID0gJ3dpbmdfMicsXHJcbiAgICBNT1VUSCA9ICdtb3V0aCcsXHJcbiAgICBFWUVCUk9XID0gJ2V5ZWJyb3cnLFxyXG4gICAgSEFJUiA9ICdoYWlyJyxcclxuICAgIEpBQ0tFVCA9ICdqYWNrZXQnLFxyXG4gICAgVEFJTCA9ICd0YWlsJyxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJvbGVEcmVzc0xldmVsIHtcclxuICAgIHN0YXRpYyBBTEw6IEVSb2xlTGV2ZWxbXSA9IFtcclxuICAgICAgICBFUm9sZUxldmVsLkhFQUQsLy/lpLTpg6hcclxuICAgICAgICBFUm9sZUxldmVsLkJPRFksIC8v6Lqr5L2TXHJcbiAgICAgICAgRVJvbGVMZXZlbC5MRUdfTCxcclxuICAgICAgICBFUm9sZUxldmVsLkxFR19SLFxyXG4gICAgICAgIEVSb2xlTGV2ZWwuVFVJX0wsXHJcbiAgICAgICAgRVJvbGVMZXZlbC5UVUlfUixcclxuICAgICAgICBFUm9sZUxldmVsLkhBVCxcclxuICAgICAgICBFUm9sZUxldmVsLkhBVF8xLFxyXG4gICAgICAgIEVSb2xlTGV2ZWwuRVlFLFxyXG4gICAgICAgIEVSb2xlTGV2ZWwuQ1JPVENILFxyXG4gICAgICAgIEVSb2xlTGV2ZWwuTkVDSyxcclxuICAgICAgICBFUm9sZUxldmVsLkVBUixcclxuICAgICAgICBFUm9sZUxldmVsLkVBUl9SLFxyXG4gICAgICAgIEVSb2xlTGV2ZWwuRUFSX0wsXHJcbiAgICAgICAgRVJvbGVMZXZlbC5IQU5EX1IsXHJcbiAgICAgICAgRVJvbGVMZXZlbC5CRUFSRCxcclxuICAgICAgICBFUm9sZUxldmVsLkhBTkRfTCxcclxuICAgICAgICBFUm9sZUxldmVsLkZPT1RfTCxcclxuICAgICAgICBFUm9sZUxldmVsLkZPT1RfUixcclxuICAgICAgICBFUm9sZUxldmVsLkhPTERfUixcclxuICAgICAgICBFUm9sZUxldmVsLkhPTERfTCxcclxuICAgICAgICBFUm9sZUxldmVsLldJTkcsXHJcbiAgICAgICAgRVJvbGVMZXZlbC5XSU5HXzEsXHJcbiAgICAgICAgRVJvbGVMZXZlbC5XSU5HXzIsXHJcbiAgICAgICAgRVJvbGVMZXZlbC5NT1VUSCxcclxuICAgICAgICBFUm9sZUxldmVsLkVZRUJST1csXHJcbiAgICAgICAgRVJvbGVMZXZlbC5IQUlSLFxyXG4gICAgICAgIEVSb2xlTGV2ZWwuSkFDS0VULFxyXG4gICAgICAgIEVSb2xlTGV2ZWwuVEFJTFxyXG4gICAgXTtcclxuICAgIC8qKlxyXG4gICAgICog5aS06aWwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBIQVQ6IEVSb2xlTGV2ZWxbXSA9IFtFUm9sZUxldmVsLkhBVF07XHJcbiAgICAvKipcclxuICAgICAqIOiho+acjVxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgQ0xPVEg6IEVSb2xlTGV2ZWxbXSA9IFtcclxuICAgICAgICBFUm9sZUxldmVsLkpBQ0tFVCxcclxuICAgICAgICBFUm9sZUxldmVsLkNST1RDSCxcclxuICAgICAgICBFUm9sZUxldmVsLkhBTkRfTCxcclxuICAgICAgICBFUm9sZUxldmVsLkhBTkRfUixcclxuICAgICAgICBFUm9sZUxldmVsLkxFR19MLFxyXG4gICAgICAgIEVSb2xlTGV2ZWwuTEVHX1IsXHJcbiAgICAgICAgRVJvbGVMZXZlbC5XSU5HXzIsXHJcbiAgICBdO1xyXG4gICAgLyoqXHJcbiAgICAgKiDpnovlrZBcclxuICAgICAqL1xyXG4gICAgc3RhdGljIFNIT1Q6IEVSb2xlTGV2ZWxbXSA9IFtcclxuICAgICAgICBFUm9sZUxldmVsLkZPT1RfTCxcclxuICAgICAgICBFUm9sZUxldmVsLkZPT1RfUlxyXG4gICAgXTtcclxuICAgIC8qKlxyXG4gICAgICog5omL5oyBXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBIT0xEOiBFUm9sZUxldmVsW10gPSBbXHJcbiAgICAgICAgRVJvbGVMZXZlbC5IT0xEX0wsXHJcbiAgICAgICAgRVJvbGVMZXZlbC5IT0xEX1JcclxuICAgIF07XHJcbiAgICAvKipcclxuICAgICAqIOiDjOmlsFxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgV0lORzogRVJvbGVMZXZlbFtdID0gW1xyXG4gICAgICAgIEVSb2xlTGV2ZWwuV0lORyxcclxuICAgICAgICBFUm9sZUxldmVsLldJTkdfMSxcclxuICAgICAgICBFUm9sZUxldmVsLldJTkdfMlxyXG4gICAgXTtcclxuXHJcbiAgICBzdGF0aWMgZ2V0TGV2ZWxzKHR5cGU6IFJvbGVDbG90aFR5cGUpOiBFUm9sZUxldmVsW10ge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFJvbGVDbG90aFR5cGUuQkFDS1dFQVI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5XSU5HLmNvbmNhdCgpO1xyXG4gICAgICAgICAgICBjYXNlIFJvbGVDbG90aFR5cGUuSEFOREhFTEQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5IT0xELmNvbmNhdCgpO1xyXG4gICAgICAgICAgICBjYXNlIFJvbGVDbG90aFR5cGUuSEVBRFdFQVI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5IQVQuY29uY2F0KCk7XHJcbiAgICAgICAgICAgIGNhc2UgUm9sZUNsb3RoVHlwZS5TRVQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5DTE9USC5jb25jYXQoKTtcclxuICAgICAgICAgICAgY2FzZSBSb2xlQ2xvdGhUeXBlLlNIT0VTOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuU0hPVC5jb25jYXQoKTtcclxuICAgICAgICAgICAgY2FzZSBSb2xlQ2xvdGhUeXBlLkFMTDpcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLkFMTC5jb25jYXQoKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRXZlbnROYW1lIH0gZnJvbSBcInptZ19ldmVudF9tZ3JcIjtcclxuaW1wb3J0IHsgRHJhZ29uUmVzQXNzZXQsIERyYWdvblJlc0xpc3RlbmVyLCBSZXNNZ3IgfSBmcm9tIFwiem1nX3Jlc19tZ3JcIjtcclxuaW1wb3J0IHsgRHJhZ29uQXNzZXQsIERyYWdvblV0aWwsIGdMb2csIGdXYXJuIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7ICRFUm9sZUFjdGlvbiB9IGZyb20gXCIuL0VSb2xlQWN0aW9uXCI7XHJcbmltcG9ydCB7IFJvbGVEcmVzc0xldmVsLCBFUm9sZUxldmVsIH0gZnJvbSBcIi4vRVJvbGVMZXZlbFwiO1xyXG5pbXBvcnQgeyBSb2xlQ2xvdGhUeXBlIH0gZnJvbSBcIi4vUm9sZUNsb3RoVHlwZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvbGVDbG90aCBleHRlbmRzIGNjLkV2ZW50VGFyZ2V0IHtcclxuICAgIHB1YmxpYyB0eXBlOiBSb2xlQ2xvdGhUeXBlO1xyXG4gICAgcHJvdGVjdGVkIF9kaXNwbGF5czogUmVjb3JkPHN0cmluZywgZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5PiA9IHt9O1xyXG4gICAgcHJvdGVjdGVkIF90YXJnZXQ6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheTtcclxuICAgIHByb3RlY3RlZCBfb3JpZ2luYWxzOiBzdHJpbmdbXTtcclxuICAgIHByb3RlY3RlZCBfY29uZmlnOiB6bWcuSVJvbGVEcmVzc0l0ZW07XHJcbiAgICBwcm90ZWN0ZWQgbG9hZGNvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgcHVibGljIHNldCB0YXJnZXQoZGlzcGxheTogZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KSB7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gZGlzcGxheTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgY29uZmlnKGl0ZW06IHptZy5JUm9sZURyZXNzSXRlbSkge1xyXG4gICAgICAgIGlmICh0aGlzLl9jb25maWcgPT0gaXRlbSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGl0ZW07XHJcbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZykge1xyXG4gICAgICAgICAgICB0aGlzLmxvYWQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVuTG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXNMb2FkZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMubG9hZGNvdW50IDw9IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYy5pc1ZhbGlkKHRoaXMuX2Rpc3BsYXlzWyRFUm9sZUFjdGlvbi5TVEFORF0pICYmIGNjLmlzVmFsaWQodGhpcy5fZGlzcGxheXNbJEVSb2xlQWN0aW9uLldBTEtfTEVGVF0pO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4Hml6fnmoTmmL7npLrlr7nosaFcclxuICAgICAqIOWmguaenOaciemFjee9ruWImeetieW+heWKoOi9vVxyXG4gICAgICog5aaC5p6c5rKh5pyJ5YiZ6L+Y5Y6f5Y6f5p2l55qE6KOF5omuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBsb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGVzdG9yeVNraW4oKTtcclxuICAgICAgICBpZiAodGhpcy5fY29uZmlnKSB7XHJcbiAgICAgICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxldCBpbmY6IHptZy5JRHJhZ29uSW5mO1xyXG4gICAgICAgICAgICBsZXQgd2Fsazogem1nLklEcmFnb25JbmY7XHJcbiAgICAgICAgICAgIGxldCBzdGFuZDogem1nLklEcmFnb25JbmY7XHJcbiAgICAgICAgICAgIGxldCBsZW4gPSB0aGlzLl9jb25maWcucmVzb3VyY2VMaXN0Lmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpbmYgPSB0aGlzLl9jb25maWcucmVzb3VyY2VMaXN0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGluZi50eXBlID09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHdhbGsgPSBpbmY7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGluZi50eXBlID09IDMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRjb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YW5kID0gaW5mO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh3YWxrKSB7XHJcbiAgICAgICAgICAgICAgICBSZXNNZ3IubG9hZERyYWdvblJlbW90ZShuZXcgRHJhZ29uUmVzQXNzZXQod2Fsay5kcmFnSnNvbiwgd2Fsay5hdGxhc0pzb24sIHdhbGsuYXRsYXNJbWcpLCB0aGlzLm9uRHJhZ29uV2Fsa0NvbXBsZXRlLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc3RhbmQpIHtcclxuICAgICAgICAgICAgICAgIFJlc01nci5sb2FkRHJhZ29uUmVtb3RlKG5ldyBEcmFnb25SZXNBc3NldChzdGFuZC5kcmFnSnNvbiwgc3RhbmQuYXRsYXNKc29uLCBzdGFuZC5hdGxhc0ltZyksIHRoaXMub25EcmFnb25TdGFuZENvbXBsZXRlLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gcHVibGljIGdldCB0b3RhbCgpOiBudW1iZXIge1xyXG4gICAgLy8gICAgIGxldCBjb3VudDogbnVtYmVyID0gMDtcclxuICAgIC8vICAgICBpZiAodGhpcy5fY29uZmlnKSB7XHJcbiAgICAvLyAgICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAvLyAgICAgICAgIGxldCBpbmY6IHptZy5JRHJhZ29uSW5mO1xyXG4gICAgLy8gICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSB0aGlzLl9jb25maWcucmVzb3VyY2VMaXN0Lmxlbmd0aDtcclxuICAgIC8vICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAvLyAgICAgICAgICAgICBpbmYgPSB0aGlzLl9jb25maWcucmVzb3VyY2VMaXN0W2ldO1xyXG4gICAgLy8gICAgICAgICAgICAgaWYgKGluZi50eXBlID09IDEgfHwgaW5mLnR5cGUgPT0gMykge1xyXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvdW50Kys7XHJcbiAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAvLyAgICAgICAgIH1cclxuICAgIC8vICAgICB9XHJcbiAgICAvLyAgICAgcmV0dXJuIGNvdW50O1xyXG4gICAgLy8gfVxyXG4gICAgcHJpdmF0ZSBkZXN0b3J5U2tpbigpOiB2b2lkIHtcclxuICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLl9kaXNwbGF5c1skRVJvbGVBY3Rpb24uU1RBTkRdKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5c1skRVJvbGVBY3Rpb24uU1RBTkRdLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQodGhpcy5fZGlzcGxheXNbJEVSb2xlQWN0aW9uLldBTEtfTEVGVF0pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXlzWyRFUm9sZUFjdGlvbi5XQUxLX0xFRlRdLmRlc3Ryb3koKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZGlzcGxheXMgPSB7fTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgdW5Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHRoaXMuX2Rpc3BsYXlzLmZvckVhY2goKHZhbHVlOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXksIGluZGV4OiBudW1iZXIsIGFycmF5OiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXlbXSkgPT4ge1xyXG4gICAgICAgIC8vICAgICB2YWx1ZS5kZXN0cm95KCk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgdGhpcy5kZXN0b3J5U2tpbigpO1xyXG4gICAgICAgIHRoaXMucmVzZXRTbG90RGlzcGxheSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkRyYWdvblN0YW5kQ29tcGxldGUoYXNzZXQ6IERyYWdvbkFzc2V0KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNraW46IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IERyYWdvblV0aWwuY3JlYXRlRHJhZ29uKGFzc2V0KTtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5c1skRVJvbGVBY3Rpb24uU1RBTkRdID0gc2tpbjtcclxuICAgICAgICB0aGlzLmxvYWRjb3VudC0tO1xyXG4gICAgICAgIGlmICh0aGlzLmxvYWRjb3VudCA8PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChFdmVudE5hbWUuQ09NUExFVEUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgb25EcmFnb25XYWxrQ29tcGxldGUoYXNzZXQ6IERyYWdvbkFzc2V0KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNraW46IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSA9IERyYWdvblV0aWwuY3JlYXRlRHJhZ29uKGFzc2V0KTtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5c1skRVJvbGVBY3Rpb24uV0FMS19MRUZUXSA9IHNraW47XHJcbiAgICAgICAgdGhpcy5sb2FkY291bnQtLTtcclxuICAgICAgICBpZiAodGhpcy5sb2FkY291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnROYW1lLkNPTVBMRVRFKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBwcml2YXRlIG9uRGlzcGxheUNvbXBsZXRlKGFzc2V0OiBEcmFnb25Bc3NldCk6IHZvaWQge1xyXG4gICAgLy8gICAgIGlmICh0cnVlIHx8IGFzc2V0LmFzc2V0Lm5hdGl2ZVVybCA9PSB0aGlzLl9jb25maWcucmVzb3VyY2VMaXN0WzBdLmF0bGFzSW1nKSB7XHJcbiAgICAvLyAgICAgICAgIHRoaXMuX2Rpc3BsYXkgPSBEcmFnb25VdGlsLmNyZWF0ZURyYWdvbihhc3NldCk7XHJcbiAgICAvLyAgICAgICAgIHRoaXMucmVwbGFjZVNsb3REaXNwbGF5KCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgY29uc3RydWN0b3IodHlwZTogc3RyaW5nLCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZSBhcyBSb2xlQ2xvdGhUeXBlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90YXJnZXQgPyB0cnVlIDogZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRlc3RvcnlTa2luKCk7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZXNldFNsb3REaXNwbGF5KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghY2MuaXNWYWxpZCh0aGlzLl90YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIGdMb2coXCLlr7nosaHlt7LooqvplIDmr4HvvIzml6Dms5Xov5vooYzmjaLoo4XjgIJcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZhY3RvcnkgPSBkcmFnb25Cb25lcy5DQ0ZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBzbG90OiBkcmFnb25Cb25lcy5TbG90O1xyXG4gICAgICAgIGxldCBrZXk6IHN0cmluZztcclxuICAgICAgICBsZXQgbGV2ZWxzOiBFUm9sZUxldmVsW10gPSBSb2xlRHJlc3NMZXZlbC5nZXRMZXZlbHModGhpcy50eXBlKTtcclxuICAgICAgICBsZXQgbGVuID0gbGV2ZWxzLmxlbmd0aDtcclxuICAgICAgICBsZXQgYXJtYXR1cmU6IGRyYWdvbkJvbmVzLkFybWF0dXJlID0gdGhpcy5fdGFyZ2V0LmFybWF0dXJlKCk7XHJcbiAgICAgICAgbGV0IGFuaW1haW9uOiBzdHJpbmcgPSB0aGlzLl90YXJnZXQuYW5pbWF0aW9uTmFtZTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgc2xvdCA9IGFybWF0dXJlLmdldFNsb3QobGV2ZWxzW2ldKTtcclxuICAgICAgICAgICAgbGV0IGF0bGFzVVVJRCA9IHRoaXMuX3RhcmdldC5kcmFnb25BdGxhc0Fzc2V0W1wiX3V1aWRcIl07XHJcbiAgICAgICAgICAgIGtleSA9IHRoaXMuX3RhcmdldC5kcmFnb25Bc3NldFtcImluaXRcIl0oZmFjdG9yeSwgYXRsYXNVVUlEKTtcclxuICAgICAgICAgICAgZmFjdG9yeS5yZXBsYWNlU2xvdERpc3BsYXkoa2V5LCBhbmltYWlvbiwgbGV2ZWxzW2ldLCBsZXZlbHNbaV0sIHNsb3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyByZXBsYWNlU2xvdERpc3BsYXkoc2tpbj86IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghY2MuaXNWYWxpZCh0aGlzLl90YXJnZXQpKSB7XHJcbiAgICAgICAgICAgIGdMb2coXCLlr7nosaHlt7LooqvplIDmr4HvvIzml6Dms5Xov5vooYzmjaLoo4XjgIJcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGFybWF0dXJlOiBkcmFnb25Cb25lcy5Bcm1hdHVyZSA9IHRoaXMuX3RhcmdldC5hcm1hdHVyZSgpO1xyXG4gICAgICAgIGlmICghY2MuaXNWYWxpZChhcm1hdHVyZSkpIHtcclxuICAgICAgICAgICAgZ0xvZyhcImFybWF0dXJl5Li656m677yM5peg5rOV6L+b6KGM5o2i6KOF44CCXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBhY3Rpb24gPSBhcm1hdHVyZS5uYW1lO1xyXG4gICAgICAgIGlmIChza2luID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5fZGlzcGxheXMuZm9yRWFjaCgodmFsdWU6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSwgaW5kZXg6IG51bWJlciwgYXJyYXk6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheVtdKSA9PiB7XHJcbiAgICAgICAgICAgIC8vICAgICB0aGlzLnJlcGxhY2VTbG90RGlzcGxheSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIC8vIH0pO1xyXG4gICAgICAgICAgICBsZXQgZCA9IHRoaXMuX2Rpc3BsYXlzW2FjdGlvbiA9PSAkRVJvbGVBY3Rpb24uV0FMS19MRUZUID8gJEVSb2xlQWN0aW9uLldBTEtfTEVGVCA6ICRFUm9sZUFjdGlvbi5TVEFORF07XHJcbiAgICAgICAgICAgIGlmIChkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlcGxhY2VTbG90RGlzcGxheShkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY2MuaXNWYWxpZChza2luKSkge1xyXG4gICAgICAgICAgICBnTG9nKFwic2tpbuWvueixoeW3suiiq+mUgOavge+8jOaXoOazlei/m+ihjOaNouijheOAglwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBjYy5DYW52YXMuaW5zdGFuY2Uuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICBsZXQgaTogbnVtYmVyLCBqOiBudW1iZXIsIGNMZW46IG51bWJlcjtcclxuICAgICAgICBsZXQgc2xvdDogZHJhZ29uQm9uZXMuU2xvdDtcclxuICAgICAgICBsZXQga2V5OiBzdHJpbmc7XHJcblxyXG4gICAgICAgIGlmICghYXJtYXR1cmUpIHtcclxuICAgICAgICAgICAgZ0xvZyhcImFybWF0dXJl5a+56LGh5bey6KKr6ZSA5q+B77yM5peg5rOV6L+b6KGM5o2i6KOF44CCXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNraW4uYXJtYXR1cmVOYW1lID0gYWN0aW9uOyhcclxuICAgICAgICBpZiAoc2tpbi5nZXRBbmltYXRpb25OYW1lcyhza2luLmFybWF0dXJlTmFtZSkuaW5kZXhPZihhY3Rpb24pID09IC0xKSB7XHJcbiAgICAgICAgICAgIGdMb2coXCJhY3Rpb27kuI3lrZjlnKjvvIzml6Dms5Xov5vooYzmjaLoo4XjgIJcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGZhY3RvcnkgPSBkcmFnb25Cb25lcy5DQ0ZhY3RvcnkuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBza2luLnBsYXlBbmltYXRpb24oYWN0aW9uLCAwKTtcclxuICAgICAgICBsZXQgY2xvdGhBcm1hdHVyZSA9IHNraW4uYXJtYXR1cmUoKTtcclxuICAgICAgICBsZXQgc2xvdHMgPSBjYy5zeXMuaXNOYXRpdmUgPyBjbG90aEFybWF0dXJlLnNsb3RzIDogY2xvdGhBcm1hdHVyZVtcIl9zbG90c1wiXTtcclxuICAgICAgICBpZiAoIXNsb3RzKSB7XHJcbiAgICAgICAgICAgIGdXYXJuKFwic2xvdHPotYTmupDkuLrnqbrvvIHvvIHvvIFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgY0xlbiA9IHNsb3RzLmxlbmd0aDtcclxuICAgICAgICBnTG9nKFwi6L+b6KGM5o2i6KOFLGFybWF0dXJlOlwiICsgYWN0aW9uICsgXCIgPT09PT09PT09PT09PT09PT09PVwiKTtcclxuICAgICAgICBmb3IgKGogPSAwOyBqIDwgY0xlbjsgaisrKSB7XHJcbiAgICAgICAgICAgIHNsb3QgPSBhcm1hdHVyZS5nZXRTbG90KHNsb3RzW2pdLm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoc2xvdCA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBnV2FybihcInNsb3ROYW1l5Li656m6OlwiICsgc2xvdHNbal0ubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnTG9nKFwi5pu/5o2i55qu6IKkLHNsb3ROYW1lOlwiICsgc2xvdHNbal0ubmFtZSArIFwiIFwiKTtcclxuICAgICAgICAgICAgLy8gbGV0IGF0bGFzVVVJRCA9IHNraW4uZHJhZ29uQXRsYXNBc3NldFtcIl91dWlkXCJdO1xyXG4gICAgICAgICAgICAvLyBrZXkgPSBza2luLmRyYWdvbkFzc2V0W1wiaW5pdFwiXShmYWN0b3J5LCBhdGxhc1VVSUQpO1xyXG4gICAgICAgICAgICBsZXQgYyA9IGNjLnN5cy5pc05hdGl2ZSA/IHNsb3RzW2pdLnNsb3REYXRhLm5hbWUgOiBzbG90c1tqXS5kaXNwbGF5RGF0YS5uYW1lO1xyXG4gICAgICAgICAgICBmYWN0b3J5LnJlcGxhY2VTbG90RGlzcGxheShza2luLmdldEFybWF0dXJlS2V5KCksIHNraW4uYXJtYXR1cmVOYW1lLCBzbG90c1tqXS5uYW1lLCBjLCBzbG90KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gZ0xvZyhcIj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVwiKTtcclxuICAgICAgICAvLyB9LCAxKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBFdmVudE1nciwgRXZlbnROYW1lIH0gZnJvbSBcInptZ19ldmVudF9tZ3JcIjtcclxuaW1wb3J0IHsgRHJhZ29uUmVzQXNzZXQsIFJlc01nciB9IGZyb20gXCJ6bWdfcmVzX21nclwiO1xyXG5pbXBvcnQgeyBEcmFnb25Bc3NldCwgRHJhZ29uVXRpbCwgU3ByaXRlVXRpbCB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5pbXBvcnQgeyAkRVBldEFjdGlvbiB9IGZyb20gXCIuL0VSb2xlQWN0aW9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFBldCBleHRlbmRzIGNjLkNvbXBvbmVudCBpbXBsZW1lbnRzIHptZy5JUGV0IHtcclxuICAgIHByb3RlY3RlZCBfYWN0aW9uOiAkRVBldEFjdGlvbjtcclxuICAgIHByaXZhdGUgX3NoYWRvdzogY2MuTm9kZTtcclxuICAgIHByaXZhdGUgX2Rpc3BsYXk6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheTtcclxuICAgIHB1YmxpYyBnZXQgZGlzcGxheSgpOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEFjdGlvbigpOiAkRVBldEFjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGlvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRTY2FsZSh2YWx1ZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFNjYWxlKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRQYXJlbnQocGFyZW50OiBjYy5Ob2RlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBhcmVudChwYXJlbnQpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFBvc3Rpb24obmV3UG9zT3JYOiBudW1iZXIgfCBjYy5WZWMyIHwgY2MuVmVjMywgeT86IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbihuZXdQb3NPclgsIHkpO1xyXG4gICAgfVxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIEV2ZW50TWdyLm9uKEV2ZW50TmFtZS5DT05UUk9MTEVSX0NIQU5HRV9ERVNUT1JZLCB0aGlzLm9uU2NlbmVEZXN0b3J5LCB0aGlzLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uU2NlbmVEZXN0b3J5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0UGFyZW50KG51bGwpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxvYWQocGF0aDogRHJhZ29uUmVzQXNzZXQsIHNoYWRvd0J1bk5hbWU6IHN0cmluZywgc2hhZG93UGF0aDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgLy/lrZjlnKjlsYLnuqfpl67pophcclxuICAgICAgICB0aGlzLl9hY3Rpb24gPSAkRVBldEFjdGlvbi5VTktOT1dcclxuICAgICAgICBSZXNNZ3IubG9hZChzaGFkb3dCdW5OYW1lLCBzaGFkb3dQYXRoLCAodGV4OiBjYy5UZXh0dXJlMkQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fc2hhZG93ID0gU3ByaXRlVXRpbC5jcmVhdGVOb2RlRnJhbWUodGV4KTtcclxuICAgICAgICAgICAgdGhpcy5fc2hhZG93Lm5hbWUgPSBcInNoYWRvd1wiO1xyXG4gICAgICAgICAgICB0aGlzLl9zaGFkb3cuekluZGV4ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fc2hhZG93LnNjYWxlID0gMC4zO1xyXG4gICAgICAgICAgICB0aGlzLl9zaGFkb3cuc2V0UGFyZW50KHRoaXMubm9kZSk7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgUmVzTWdyLmxvYWREcmFnb25SZW1vdGUocGF0aCwgKGFzc2V0OiBEcmFnb25Bc3NldCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5ID0gRHJhZ29uVXRpbC5jcmVhdGVEcmFnb24oYXNzZXQsIG51bGwsIFwicGV0RGlzcGxheVwiKTtcclxuICAgICAgICAgICAgdGhpcy5fZGlzcGxheS5ub2RlLnNldFBhcmVudCh0aGlzLm5vZGUpO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5Lm5vZGUuekluZGV4ID0gMTtcclxuICAgICAgICAgICAgdGhpcy5zdGFuZCgpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4FcclxuICAgICAqL1xyXG4gICAgcHVibGljIG9uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBFdmVudE1nci5vZmYoRXZlbnROYW1lLkNPTlRST0xMRVJfQ0hBTkdFX0RFU1RPUlksIHRoaXMub25TY2VuZURlc3RvcnksIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIOaJp+ihjOWKqOS9nFxyXG4gICAgKiBAcGFyYW0gYWN0aW9uIFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBkb0FjdGlvbihhY3Rpb246ICRFUGV0QWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbiA9PSBhY3Rpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgaWYgKHRoaXMuX2Rpc3BsYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5fZGlzcGxheS5wbGF5QW5pbWF0aW9uKGFjdGlvbiwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIOermeeri1xyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzdGFuZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRvQWN0aW9uKCRFUGV0QWN0aW9uLlNUQU5EKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5ZCR5Y+z6KGM6LWwXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyB3YWxrUmlnaHQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQodGhpcy5kaXNwbGF5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkubm9kZS5zY2FsZVggPSBNYXRoLmFicyh0aGlzLmRpc3BsYXkubm9kZS5zY2FsZVgpO1xyXG4gICAgICAgICAgICB0aGlzLmRvQWN0aW9uKCRFUGV0QWN0aW9uLldBTEspO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOWQkeW3puihjOi1sFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgd2Fsa0xlZnQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQodGhpcy5kaXNwbGF5KSkge1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXkubm9kZS5zY2FsZVggPSAtTWF0aC5hYnModGhpcy5kaXNwbGF5Lm5vZGUuc2NhbGVYKTtcclxuICAgICAgICAgICAgdGhpcy5kb0FjdGlvbigkRVBldEFjdGlvbi5XQUxLKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBdWRpb01nciB9IGZyb20gXCJ6bWdfYXVkaW9fbWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWdyLCBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgeyBEcmFnb25SZXNMaXN0ZW5lciwgUmVzTWdyIH0gZnJvbSBcInptZ19yZXNfbWdyXCI7XHJcbmltcG9ydCB7IERyYWdvbkFzc2V0LCBEcmFnb25Bc3NldFVybCwgRHJhZ29uVXRpbCwgZ0xvZywgZ1dhcm4sIFNwcml0ZVV0aWwgfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuaW1wb3J0IHsgUm9sZUNsb3RoIH0gZnJvbSBcIi4vUm9sZUNsb3RoXCI7XHJcbmltcG9ydCB7ICRFUm9sZUFjdGlvbiB9IGZyb20gXCIuL0VSb2xlQWN0aW9uXCI7XHJcbmltcG9ydCB7IFJvbGVDbG90aFR5cGUgfSBmcm9tIFwiLi9Sb2xlQ2xvdGhUeXBlXCI7XHJcbmltcG9ydCB7IFBldCB9IGZyb20gXCIuL1BldFwiO1xyXG5pbXBvcnQgeyAkUm9sZUV2ZW50IH0gZnJvbSBcIi4vUm9sZUV2ZW50XCI7XHJcbmltcG9ydCB7IERyYWdvblJlc0Fzc2V0IH0gZnJvbSBcInptZ19yZXNfbWdyXCI7XHJcbmltcG9ydCB7ICRVSU1vdXNlRXZlbnQgfSBmcm9tIFwiLi4vLi4vZXZlbnRzL1VJTW91c2VFdmVudFwiO1xyXG5cclxuLyoqXHJcbiAqIFxyXG4gKi9cclxuXHJcbmV4cG9ydCBjbGFzcyAkUm9sZSBleHRlbmRzIGNjLkNvbXBvbmVudCBpbXBsZW1lbnRzIHptZy5JUm9sZSwgY2MuRXZlbnRUYXJnZXQge1xyXG4gICAgcHJvdGVjdGVkIF9jb25maWc6IHptZy5JUm9sZUNvbmZpZztcclxuICAgIHByb3RlY3RlZCBfYWN0aW9uOiAkRVJvbGVBY3Rpb247XHJcbiAgICBwcm90ZWN0ZWQgX3BldDogUGV0O1xyXG4gICAgLyoqXHJcbiAgICAgKiDlvZPliY3or63pn7NcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIF9jdXJyZW50QXVkaW9DbGlwOiBjYy5BdWRpb0NsaXA7XHJcbiAgICAvKipcclxuICAgICAqIOm+memqqOWKqOeUu1xyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgX2Rpc3BsYXk6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheTtcclxuICAgIC8qKlxyXG4gICAgICog6Lqr5LiK55qE5pyN6KOF6YWN572uXHJcbiAgICAgKi9cclxuICAgIHByb3RlY3RlZCBfY2xvdGhzOiBSb2xlQ2xvdGhbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfaXNNb3VzZURvd246IGJvb2xlYW47XHJcbiAgICBwcm90ZWN0ZWQgX3NoYWRvdzogY2MuU3ByaXRlO1xyXG4gICAgcHJvdGVjdGVkIF9oYWxvOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXk7XHJcbiAgICBwcm90ZWN0ZWQgX2RyZXNzTGlzdDogem1nLklSb2xlRHJlc3NJdGVtW10gPSBbXTtcclxuICAgIC8qKlxyXG4gICAgICog6Zi05b2xXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgcGV0KCk6IHptZy5JUGV0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGV0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBzaGFkb3coKTogY2MuU3ByaXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBoYWxvKCk6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhbG87XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0QWN0aW9uKCk6ICRFUm9sZUFjdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGlvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IHptZy5JUm9sZUNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcm9sZU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnID8gdGhpcy5fY29uZmlnLnJOYW1lIDogXCJcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgZGlzcGxheSgpOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBkcmVzc0xpc3QoKTogem1nLklSb2xlRHJlc3NJdGVtW10ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kcmVzc0xpc3Q7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0UG9zdGlvbihuZXdQb3NPclg6IG51bWJlciB8IGNjLlZlYzIgfCBjYy5WZWMzLCB5PzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG5ld1Bvc09yWCwgeSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0UGFyZW50KHBhcmVudDogY2MuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBhcmVudChwYXJlbnQpO1xyXG4gICAgICAgIGlmIChwYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgYXN5bmMgbG9hZERyYWdvbigpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICBpZiAodGhpcy5fY29uZmlnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBSZXNNZ3IubG9hZERyYWdvbih0aGlzLl9jb25maWcuYnVuTmFtZSwgdGhpcy5fY29uZmlnLnBhdGgsIG5ldyBEcmFnb25SZXNMaXN0ZW5lcih0aGlzLCAoZHJhZ29uQXNzZXQ6IERyYWdvbkFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGROb2RlOiBjYy5Ob2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwicm9sZU5vZGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlzcGxheSA9IERyYWdvblV0aWwuY3JlYXRlRHJhZ29uKGRyYWdvbkFzc2V0LCBkTm9kZSwgXCJyb2xlTm9kZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBkTm9kZSA9IHRoaXMuX2Rpc3BsYXkubm9kZTtcclxuICAgICAgICAgICAgICAgICAgICBkTm9kZS5hbmNob3JZID0gMC4xO1xyXG4gICAgICAgICAgICAgICAgICAgIGROb2RlLnpJbmRleCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGROb2RlLnBhcmVudCA9PSBudWxsKSBkTm9kZS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmluaXREaXNwbGF5KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSAmJiByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgICAgICB9KSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYXN5bmMgcmVzZXQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNjLmlzVmFsaWQodGhpcy5ub2RlKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY2MuaXNWYWxpZCh0aGlzLl9kaXNwbGF5KSkge1xyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmxvYWREcmFnb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy51cGRhdGVBY3Rpb24odGhpcy5fYWN0aW9uKTtcclxuICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZW46IG51bWJlciA9IHRoaXMuX2Nsb3Rocy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Nsb3Roc1tpXS5sb2FkKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDE7XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKG5ldyBjYy5WZWMyKDAsIDApKTtcclxuICAgICAgICBpZiAodGhpcy5faGFsbyAmJiB0aGlzLl9zaGFkb3cpIHtcclxuICAgICAgICAgICAgdGhpcy5faGFsby5ub2RlLnNjYWxlID0gMC43O1xyXG4gICAgICAgICAgICBpZiAodGhpcy5faGFsby5kcmFnb25Bc3NldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hhZG93Lm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYWxvLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NoYWRvdy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYWxvLm5vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX2Nsb3RocyA9IFtcclxuICAgICAgICAgICAgbmV3IFJvbGVDbG90aChSb2xlQ2xvdGhUeXBlLkJBQ0tXRUFSKSxcclxuICAgICAgICAgICAgbmV3IFJvbGVDbG90aChSb2xlQ2xvdGhUeXBlLkhBTkRIRUxEKSxcclxuICAgICAgICAgICAgbmV3IFJvbGVDbG90aChSb2xlQ2xvdGhUeXBlLkhFQURXRUFSKSxcclxuICAgICAgICAgICAgbmV3IFJvbGVDbG90aChSb2xlQ2xvdGhUeXBlLlNFVCksXHJcbiAgICAgICAgICAgIG5ldyBSb2xlQ2xvdGgoUm9sZUNsb3RoVHlwZS5TSE9FUyksXHJcbiAgICAgICAgXTtcclxuICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZW46IG51bWJlciA9IHRoaXMuX2Nsb3Rocy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Nsb3Roc1tpXS5vbihFdmVudE5hbWUuQ09NUExFVEUsIHRoaXMub25DbG90aENvbXBsZXRlLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgcE5vZGUubmFtZSA9IFwicGV0Tm9kZVwiO1xyXG4gICAgICAgIHRoaXMuX3BldCA9IHBOb2RlLmFkZENvbXBvbmVudChQZXQpO1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIGxldCBkTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgZE5vZGUubmFtZSA9IFwicm9sZU5vZGVcIjtcclxuICAgICAgICB0aGlzLl9kaXNwbGF5ID0gRHJhZ29uVXRpbC5jcmVhdGVEcmFnb24obnVsbCwgZE5vZGUpO1xyXG4gICAgfVxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIGxldCBzbjogY2MuTm9kZTtcclxuICAgICAgICBpZiAoIXRoaXMuX2hhbG8pIHtcclxuICAgICAgICAgICAgc24gPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJoYWxvXCIpO1xyXG4gICAgICAgICAgICB0aGlzLl9oYWxvID0gRHJhZ29uVXRpbC5jcmVhdGVEcmFnb24obnVsbCwgc24pO1xyXG4gICAgICAgICAgICBzbiA9IHRoaXMuX2hhbG8ubm9kZTtcclxuICAgICAgICAgICAgc24ubmFtZSA9IFwiaGFsb1wiO1xyXG4gICAgICAgICAgICBzbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgc24uc2NhbGUgPSAwLjc7XHJcbiAgICAgICAgICAgIGlmIChzbi5wYXJlbnQgPT0gbnVsbCkgc24uc2V0UGFyZW50KHRoaXMubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5fc2hhZG93KSB7XHJcbiAgICAgICAgICAgIHNuID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwic2hhZG93XCIpO1xyXG4gICAgICAgICAgICBzbiA9IFNwcml0ZVV0aWwuY3JlYXRlTm9kZUZyYW1lKG51bGwsIHNuKTtcclxuICAgICAgICAgICAgdGhpcy5fc2hhZG93ID0gc24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIHNuLm5hbWUgPSBcInNoYWRvd1wiO1xyXG4gICAgICAgICAgICBzbi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHNuLnBhcmVudCA9PSBudWxsKSBzbi5zZXRQYXJlbnQodGhpcy5ub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fZGlzcGxheS5ub2RlLnNldFBhcmVudCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9uKEV2ZW50TmFtZS5VSV9NT1VTRV9VUCwgdGhpcy5vbk1vdXNlVXAsIHRoaXMsIGZhbHNlLCAxKTtcclxuICAgICAgICBFdmVudE1nci5vbihFdmVudE5hbWUuVUlfTU9VU0VfRE9XTiwgdGhpcy5vbk1vdXNlRG93biwgdGhpcywgZmFsc2UsIDEpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFzeW5jIGluaXRDb25maWcoY29uZmlnOiB6bWcuSVJvbGVDb25maWcpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIuWIm+W7uuinkuiJslwiKTtcclxuICAgICAgICB0aGlzLm5vZGUubmFtZSA9IGNvbmZpZy5yTmFtZTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLnBhcmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wZXQubm9kZS5zZXRQYXJlbnQodGhpcy5ub2RlLnBhcmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3BldC5zZXRQb3N0aW9uKHRoaXMubm9kZS54ICsgMTUwLCB0aGlzLm5vZGUueSk7XHJcbiAgICAgICAgdGhpcy5fYWN0aW9uID0gJEVSb2xlQWN0aW9uLlNUQU5EO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcclxuICAgICAgICBSZXNNZ3IubG9hZChjb25maWcuYnVuTmFtZSwgY29uZmlnLnNoYWRvdywgKHJlczogY2MuVGV4dHVyZTJEKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBzbjogY2MuTm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInNoYWRvd1wiKTtcclxuICAgICAgICAgICAgc24gPSBTcHJpdGVVdGlsLmNyZWF0ZU5vZGVGcmFtZShyZXMsIHNuKTtcclxuICAgICAgICAgICAgdGhpcy5fc2hhZG93ID0gc24uZ2V0Q29tcG9uZW50KGNjLlNwcml0ZSk7XHJcbiAgICAgICAgICAgIHNuLm5hbWUgPSBcInNoYWRvd1wiO1xyXG4gICAgICAgICAgICBzbi56SW5kZXggPSAtMTtcclxuICAgICAgICAgICAgc24uc2V0UGFyZW50KHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9oYWxvICYmIHRoaXMuX2hhbG8ubm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHNuLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc24uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubG9hZERyYWdvbigpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFjdGlvbih0aGlzLl9hY3Rpb24pO1xyXG4gICAgICAgICAgICB0aGlzLmRyZXNzKHRoaXMuX2RyZXNzTGlzdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gUmVzTWdyLmxvYWREcmFnb24oY29uZmlnLmJ1bk5hbWUsIGNvbmZpZy5wYXRoLCBuZXcgRHJhZ29uUmVzTGlzdGVuZXIodGhpcywgKGRyYWdvbkFzc2V0OiBEcmFnb25Bc3NldCkgPT4ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9kaXNwbGF5ID0gRHJhZ29uVXRpbC5jcmVhdGVEcmFnb24oZHJhZ29uQXNzZXQsIG51bGwsIHRoaXMuX2NvbmZpZy5yTmFtZSArIFwiTm9kZVwiKTtcclxuICAgICAgICAvLyAgICAgdGhpcy5fZGlzcGxheS5ub2RlLmFuY2hvclkgPSAwLjE7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX2Rpc3BsYXkubm9kZS56SW5kZXggPSAxO1xyXG4gICAgICAgIC8vICAgICB0aGlzLl9kaXNwbGF5Lm5vZGUuc2V0UGFyZW50KHRoaXMubm9kZSk7XHJcbiAgICAgICAgLy8gICAgIHRoaXMudXBkYXRlQWN0aW9uKHRoaXMuX2FjdGlvbik7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuaW5pdERpc3BsYXkoKTtcclxuICAgICAgICAvLyB9KSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0SGFsbyhwYXRoOiBEcmFnb25SZXNBc3NldCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChwYXRoKSB7XHJcbiAgICAgICAgICAgIFJlc01nci5sb2FkRHJhZ29uUmVtb3RlKHBhdGgsIChkcmFnb246IERyYWdvbkFzc2V0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaGFkb3cgJiYgKHRoaXMuX3NoYWRvdy5ub2RlLmFjdGl2ZSA9IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGxldCBzTm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImhhbG9cIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYWxvID0gRHJhZ29uVXRpbC5jcmVhdGVEcmFnb24oZHJhZ29uLCBzTm9kZSk7XHJcbiAgICAgICAgICAgICAgICBzTm9kZSA9IHRoaXMuX2hhbG8ubm9kZTtcclxuICAgICAgICAgICAgICAgIERyYWdvblV0aWwucGxheSh0aGlzLl9oYWxvKTtcclxuICAgICAgICAgICAgICAgIHNOb2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBzTm9kZS5uYW1lID0gXCJoYWxvXCI7XHJcbiAgICAgICAgICAgICAgICBzTm9kZS5zY2FsZSA9IDAuNztcclxuICAgICAgICAgICAgICAgIGlmICghc05vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc05vZGUuc2V0UGFyZW50KHRoaXMubm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3NoYWRvdy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhbG8ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaGl0VGVzdChwb3M6IGNjLlZlYzIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5fZGlzcGxheSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGlzcGxheS5ub2RlW1wiX2hpdFRlc3RcIl0ocG9zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0YWtlT2ZmKGNsb3RoOiB6bWcuSVJvbGVEcmVzc0l0ZW0pOiB2b2lkIHtcclxuICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZW46IG51bWJlciA9IHRoaXMuX2RyZXNzTGlzdC5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9kcmVzc0xpc3RbaV0ucHJvZHVjdExvY2FDb2RlID09IGNsb3RoLnByb2R1Y3RMb2NhQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZHJlc3NMaXN0LnNwbGljZShpLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZHJlc3ModGhpcy5fZHJlc3NMaXN0KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB0YWtlT24oY2xvdGg6IHptZy5JUm9sZURyZXNzSXRlbSk6IHZvaWQge1xyXG4gICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgbGV0IGlzQ2xvdGg6IGJvb2xlYW47XHJcbiAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gdGhpcy5fZHJlc3NMaXN0Lmxlbmd0aDtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2RyZXNzTGlzdFtpXS5wcm9kdWN0TG9jYUNvZGUgPT0gY2xvdGgucHJvZHVjdExvY2FDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBpc0Nsb3RoID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RyZXNzTGlzdFtpXSA9IGNsb3RoO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFpc0Nsb3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RyZXNzTGlzdC5wdXNoKGNsb3RoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kcmVzcyh0aGlzLl9kcmVzc0xpc3QpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRyZXNzKGNsb3Roczogem1nLklSb2xlRHJlc3NJdGVtW10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9kcmVzc0xpc3QgPSBjbG90aHM7XHJcbiAgICAgICAgbGV0IGk6IG51bWJlciwgajogbnVtYmVyO1xyXG4gICAgICAgIGxldCBpc0ZpbmRlZDogYm9vbGVhbjtcclxuICAgICAgICBsZXQgaXNDaGFuZ2U6IGJvb2xlYW47XHJcbiAgICAgICAgbGV0IGM6IFJvbGVDbG90aDtcclxuICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGxldCBjTGVuOiBudW1iZXIgPSAwO1xyXG4gICAgICAgIGlmICh0aGlzLl9jbG90aHMpIGxlbiA9IHRoaXMuX2Nsb3Rocy5sZW5ndGg7XHJcbiAgICAgICAgaWYgKGNsb3RocykgY0xlbiA9IGNsb3Rocy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlzRmluZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGMgPSB0aGlzLl9jbG90aHNbaV07XHJcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBjTGVuOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChjLnR5cGUgPT0gY2xvdGhzW2pdLnByb2R1Y3RMb2NhQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGMuY29uZmlnID0gY2xvdGhzW2pdO1xyXG4gICAgICAgICAgICAgICAgICAgIGlzRmluZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpc0NoYW5nZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFpc0ZpbmRlZCkge1xyXG4gICAgICAgICAgICAgICAgYy5jb25maWcgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghaXNDaGFuZ2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNjLmlzVmFsaWQodGhpcy5fZGlzcGxheSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uQ2xvdGhDb21wbGV0ZSgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRvQWN0aW9uKGFjdGlvbjogJEVSb2xlQWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FjdGlvbiA9PSBhY3Rpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hY3Rpb24gPSBhY3Rpb247XHJcbiAgICAgICAgaWYgKCFjYy5pc1ZhbGlkKHRoaXMuX2Rpc3BsYXkpKSB7XHJcbiAgICAgICAgICAgIC8v5qih5Z6L5pyq5Yid5aeL5YyW5a6M5q+VXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGFjdGlvbiAhPSAkRVJvbGVBY3Rpb24uVEFMSykge1xyXG4gICAgICAgICAgICB0aGlzLnN0b3BUYWxrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgJFJvbGVFdmVudCgkUm9sZUV2ZW50LkFDVElPTl9DSEFOR0UsIGFjdGlvbikpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQWN0aW9uKGFjdGlvbik7XHJcbiAgICAgICAgdGhpcy51cGRhdGVEcmVzcygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0b3BUYWxrKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50QXVkaW9DbGlwKSB7XHJcbiAgICAgICAgICAgIEF1ZGlvTWdyLnN0b3BFZmZlY3QodGhpcy5fY3VycmVudEF1ZGlvQ2xpcCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRBdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyB0YWxrKGNsaXA6IGNjLkF1ZGlvQ2xpcCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChBdWRpb01nci5oYXNFZmZlY3QoY2xpcCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5fY3VycmVudEF1ZGlvQ2xpcCkge1xyXG4gICAgICAgICAgICBBdWRpb01nci5zdG9wRWZmZWN0KHRoaXMuX2N1cnJlbnRBdWRpb0NsaXApO1xyXG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50QXVkaW9DbGlwID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY3VycmVudEF1ZGlvQ2xpcCA9IGNsaXA7XHJcbiAgICAgICAgQXVkaW9NZ3IucGxheUVmZmVjdChjbGlwLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jdXJyZW50QXVkaW9DbGlwID09IGNsaXApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRBdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2FjdGlvbiA9PSAkRVJvbGVBY3Rpb24uVEFMSykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZG9BY3Rpb24oJEVSb2xlQWN0aW9uLlNUQU5EKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMsIDEpO1xyXG4gICAgICAgIHRoaXMuZG9BY3Rpb24oJEVSb2xlQWN0aW9uLlRBTEspO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YW5kKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZG9BY3Rpb24oJEVSb2xlQWN0aW9uLlNUQU5EKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB3YWxrUmlnaHQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kb0FjdGlvbigkRVJvbGVBY3Rpb24uV0FMS19SSUdIVCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgd2Fsa0xlZnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kb0FjdGlvbigkRVJvbGVBY3Rpb24uV0FMS19MRUZUKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5Zy65pmv5YiH5o2i55qE5pe25YCZ6L+b6KGM6ZSA5q+BXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faGFsbyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5fc2hhZG93ID0gbnVsbDtcclxuICAgICAgICB0aGlzLl9jbG90aHMubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLl9jbG90aHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX2N1cnJlbnRBdWRpb0NsaXAgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2V0UGFyZW50KG51bGwpO1xyXG4gICAgICAgIHRoaXMuX2NvbmZpZyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudHMoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBpbml0RGlzcGxheSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLl9kaXNwbGF5KSkge1xyXG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSB0aGlzLl9jbG90aHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2Nsb3Roc1tpXS50YXJnZXQgPSB0aGlzLl9kaXNwbGF5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG5ha2VkKCk6IHZvaWQge1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uQ2xvdGhDb21wbGV0ZShjbG90aD86IFJvbGVDbG90aCk6IHZvaWQge1xyXG4gICAgICAgIC8vIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgLy8gbGV0IGxlbjogbnVtYmVyID0gdGhpcy5fY2xvdGhzLmxlbmd0aDtcclxuICAgICAgICAvLyBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAvLyAgICAgaWYgKCF0aGlzLl9jbG90aHNbaV0uaXNMb2FkZWQpIHtcclxuICAgICAgICAvLyAgICAgICAgIHJldHVybjtcclxuICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZURyZXNzKGNsb3RoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCB1cGRhdGVBY3Rpb24oYWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoRHJhZ29uVXRpbC5pc1ZhbGlkKHRoaXMuX2Rpc3BsYXkpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXkuYXJtYXR1cmVOYW1lID0gYWN0aW9uO1xyXG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5LnBsYXlBbmltYXRpb24oYWN0aW9uLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlRHJlc3MoY2xvdGg/OiBSb2xlQ2xvdGgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYm9vbCA9IHRoaXMubm9kZS5hY3RpdmU7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUuYWN0aXZlSW5IaWVyYXJjaHkpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGJvb2w7XHJcbiAgICAgICAgICAgIGdMb2coXCLkurrnianlr7nosaHmmL7npLrnirbmgIHmiY3lj6/ku6Xov5vooYzmnI3oo4Xmm7/mjaLjgIJcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFEcmFnb25VdGlsLmlzVmFsaWQodGhpcy5kaXNwbGF5KSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gYm9vbDtcclxuICAgICAgICAgICAgZ0xvZyhcIuS6uueJqeWvueixoeW3suWIneWni+WMluaJjeWPr+i/m+ihjOacjeijheabv+aNouOAglwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoY2xvdGgpIHtcclxuICAgICAgICAgICAgY2xvdGgucmVwbGFjZVNsb3REaXNwbGF5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IGk6IG51bWJlcjtcclxuICAgICAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gdGhpcy5fY2xvdGhzLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jbG90aHNbaV0ucmVwbGFjZVNsb3REaXNwbGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGJvb2w7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZEV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICBFdmVudE1nci5vbihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfREVTVE9SWSwgdGhpcy5vblNjZW5lRGVzdG9yeSwgdGhpcywgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJlbW92ZUV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICBFdmVudE1nci5vZmYoRXZlbnROYW1lLlVJX01PVVNFX1VQLCB0aGlzLm9uTW91c2VVcCwgdGhpcyk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub2ZmKEV2ZW50TmFtZS5VSV9NT1VTRV9ET1dOLCB0aGlzLm9uTW91c2VEb3duLCB0aGlzKTtcclxuICAgICAgICBFdmVudE1nci5vZmYoRXZlbnROYW1lLkNPTlRST0xMRVJfQ0hBTkdFX0RFU1RPUlksIHRoaXMub25TY2VuZURlc3RvcnksIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbk1vdXNlVXAoZXZ0OiAkVUlNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzTW91c2VEb3duKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmhpdFRlc3QoZXZ0LndvcmxkUG9zKSkge1xyXG4gICAgICAgICAgICAgICAgZXZ0W1wic3RvcHBlZFwiXSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KEV2ZW50TmFtZS5DTElDSywgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1vdXNlRG93bihldnQ6ICRVSU1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMubm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5oaXRUZXN0KGV2dC53b3JsZFBvcykpIHtcclxuICAgICAgICAgICAgdGhpcy5faXNNb3VzZURvd24gPSB0cnVlO1xyXG4gICAgICAgICAgICBldnRbXCJzdG9wcGVkXCJdKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uU2NlbmVEZXN0b3J5KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMub25EZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q2xvdGhCeVR5cGUodHlwZTogc3RyaW5nKTogUm9sZUNsb3RoIHtcclxuICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZW46IG51bWJlciA9IHRoaXMuX2Nsb3Rocy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jbG90aHNbaV0udHlwZSA9PSB0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY2xvdGhzW2ldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBjbG90aDogUm9sZUNsb3RoID0gbmV3IFJvbGVDbG90aCh0eXBlKTtcclxuICAgICAgICBjbG90aC50YXJnZXQgPSB0aGlzLl9kaXNwbGF5O1xyXG4gICAgICAgIHRoaXMuX2Nsb3Rocy5wdXNoKGNsb3RoKTtcclxuICAgICAgICByZXR1cm4gY2xvdGg7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhhc0V2ZW50TGlzdGVuZXIodHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ub2RlLmhhc0V2ZW50TGlzdGVuZXIodHlwZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIG9uPFQgZXh0ZW5kcyBGdW5jdGlvbj4odHlwZTogc3RyaW5nLCBjYWxsYmFjazogVCwgdGFyZ2V0PzogYW55LCB1c2VDYXB0dXJlPzogYm9vbGVhbiwgcHJpb3JpdHk/OiBudW1iZXIpOiBUIHtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGUub24odHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdXNlQ2FwdHVyZSwgcHJpb3JpdHkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb2ZmKHR5cGU6IHN0cmluZywgY2FsbGJhY2s/OiBGdW5jdGlvbiwgdGFyZ2V0PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUub2ZmKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyB0YXJnZXRPZmYodGFyZ2V0OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS50YXJnZXRPZmYodGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25jZSh0eXBlOiBzdHJpbmcsIGNhbGxiYWNrOiAoYXJnMT86IGFueSwgYXJnMj86IGFueSwgYXJnMz86IGFueSwgYXJnND86IGFueSwgYXJnNT86IGFueSkgPT4gdm9pZCwgdGFyZ2V0PzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUub25jZSh0eXBlLCBjYWxsYmFjaywgdGFyZ2V0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGlzcGF0Y2hFdmVudChldmVudDogY2MuRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZW1pdChrZXk6IHN0cmluZywgYXJnMT86IGFueSwgYXJnMj86IGFueSwgYXJnMz86IGFueSwgYXJnND86IGFueSwgYXJnNT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmVtaXQoa2V5LCBhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVtb3ZlQWxsKCk6IHZvaWQge1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRUV2ZW50SW5kZXgsIEV2ZW50TWdyLCBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgeyAkRVJvbGVBY3Rpb24gfSBmcm9tIFwiLi9FUm9sZUFjdGlvblwiO1xyXG5pbXBvcnQgeyAkUm9sZSB9IGZyb20gXCIuL1JvbGVcIjtcclxuaW1wb3J0IHsgU2VydmVyTWdyLCB6bWdDb21tYW5kcyB9IGZyb20gXCJ6bWdfd2Vic2VydmVyX21nclwiO1xyXG5pbXBvcnQgeyBEcmFnb25SZXNBc3NldCwgUmVzQXNzZXQsIFJlc01nciB9IGZyb20gXCJ6bWdfcmVzX21nclwiO1xyXG5pbXBvcnQgeyBnV2FybiB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5pbnRlcmZhY2UgVXNlckFiaWxpdHlNZWRhbE91dFZvIHtcclxuICAgIGFuaW1hdGlvbjFVcmw6IHN0cmluZztcclxuICAgIGFuaW1hdGlvbjJVcmw6IHN0cmluZztcclxuICAgIGFuaW1hdGlvbjNVcmw6IHN0cmluZztcclxufVxyXG5pbnRlcmZhY2UgVXNlckFjaGlldmVtZW50VXBncmFkZU91dFZvIHtcclxuICAgIGFuaW1hdGlvbjFVcmw6IHN0cmluZztcclxuICAgIGFuaW1hdGlvbjJVcmw6IHN0cmluZztcclxuICAgIGFuaW1hdGlvbjNVcmw6IHN0cmluZztcclxufVxyXG5cclxuaW50ZXJmYWNlIElDYXJyeU1lZGFsIHtcclxuICAgIC8v55So5oi35b2T5YmN5pC65bim6IO95Yqb5YWJ546v5L+h5oGvICxcclxuICAgIHVzZXJBYmlsaXR5TWVkYWxJbmZvOiBVc2VyQWJpbGl0eU1lZGFsT3V0Vm87XHJcbiAgICAvL+eUqOaIt+W9k+WJjeaQuuW4pueahOeyvueBteS/oeaBr1xyXG4gICAgdXNlckNhcnJ5TWVkYWxJbmZvOiBVc2VyQWNoaWV2ZW1lbnRVcGdyYWRlT3V0Vm87XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBfQWN0b3IgZXh0ZW5kcyAkUm9sZSBpbXBsZW1lbnRzIHptZy5JQWN0b3Ige1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiB6bWcuSUFjdG9yO1xyXG4gICAgcHJpdmF0ZSBfdGFsa0F1ZGlvQ2xpcHM6IGNjLkF1ZGlvQ2xpcFtdID0gW107XHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogem1nLklBY3RvciB7XHJcbiAgICAgICAgaWYgKCFfQWN0b3IuX2luc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3dbXCJBY3RvclwiXSkge1xyXG4gICAgICAgICAgICAgICAgX0FjdG9yLl9pbnN0YW5jZSA9IHdpbmRvd1tcIkFjdG9yXCJdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBuZXcgY2MuTm9kZTtcclxuICAgICAgICAgICAgICAgIF9BY3Rvci5faW5zdGFuY2UgPSBub2RlLmFkZENvbXBvbmVudChfQWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93W1wiQWN0b3JcIl0gPSBfQWN0b3IuX2luc3RhbmNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBfQWN0b3IuX2luc3RhbmNlO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHNldEluc3RhbmNlKGluczogem1nLklBY3Rvcik6IHZvaWQge1xyXG4gICAgICAgIHdpbmRvd1tcIkFjdG9yXCJdID0gaW5zO1xyXG4gICAgICAgIF9BY3Rvci5faW5zdGFuY2UgPSBpbnM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHBldCgpOiB6bWcuSVBldCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BldDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY29uZmlnKCk6IHptZy5JUm9sZUNvbmZpZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcm9sZU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnID8gdGhpcy5fY29uZmlnLnJOYW1lIDogXCJcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgZGlzcGxheSgpOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBzaGFkb3coKTogY2MuU3ByaXRlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2hhZG93O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBoYWxvKCk6IGRyYWdvbkJvbmVzLkFybWF0dXJlRGlzcGxheSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hhbG87XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaGl0VGVzdChwb3M6IGNjLlZlYzIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuaGl0VGVzdChwb3MpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEFjdGlvbigpOiAkRVJvbGVBY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3Rpb247XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGRyZXNzTGlzdCgpOiB6bWcuSVJvbGVEcmVzc0l0ZW1bXSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RyZXNzTGlzdDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRQb3N0aW9uKG5ld1Bvc09yWDogbnVtYmVyIHwgY2MuVmVjMiB8IGNjLlZlYzMsIHk/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5zZXRQb3N0aW9uKG5ld1Bvc09yWCwgeSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0UGFyZW50KHBhcmVudDogY2MuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnNldFBhcmVudChwYXJlbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB0YWtlT2ZmKGNsb3RoOiB6bWcuSVJvbGVEcmVzc0l0ZW0pOiB2b2lkIHtcclxuICAgICAgICBzdXBlci50YWtlT2ZmKGNsb3RoKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGFrZU9uKGNsb3RoOiB6bWcuSVJvbGVEcmVzc0l0ZW0pOiB2b2lkIHtcclxuICAgICAgICBzdXBlci50YWtlT24oY2xvdGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFzeW5jIGluaXRDb25maWcoY29uZmlnOiB6bWcuSVJvbGVDb25maWcpIHtcclxuICAgICAgICBzdXBlci5pbml0Q29uZmlnKGNvbmZpZyk7XHJcbiAgICAgICAgbGV0IGk6IG51bWJlcjtcclxuICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBjb25maWcudGFsa3MubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBSZXNNZ3IubG9hZChjb25maWcuYnVuTmFtZSwgY29uZmlnLnRhbGtzW2ldLCB0aGlzLm9uVGFsa0NsaXBDb21wbGV0ZSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGRyZXNzKGNsb3Roczogem1nLklSb2xlRHJlc3NJdGVtW10pOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5kcmVzcyhjbG90aHMpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRvQWN0aW9uKGFjdGlvbjogJEVSb2xlQWN0aW9uKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZG9BY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCB1cGRhdGVBY3Rpb24oYWN0aW9uOiAkRVJvbGVBY3Rpb24pOiB2b2lkIHtcclxuICAgICAgICBzdXBlci51cGRhdGVBY3Rpb24oYWN0aW9uKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB0YWxrKGNsaXA6IGNjLkF1ZGlvQ2xpcCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnRhbGsoY2xpcCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdGFsa0J5UmVzKHJlczogUmVzQXNzZXQpOiB2b2lkIHtcclxuICAgICAgICBSZXNNZ3IubG9hZChyZXMuYnVuTmFtZSwgcmVzLnBhdGgsIChjbGlwOiBjYy5BdWRpb0NsaXApID0+IHtcclxuICAgICAgICAgICAgdGhpcy50YWxrKGNsaXApO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YW5kKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZG9BY3Rpb24oJEVSb2xlQWN0aW9uLlNUQU5EKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB3YWxrUmlnaHQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kb0FjdGlvbigkRVJvbGVBY3Rpb24uV0FMS19SSUdIVCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgd2Fsa0xlZnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kb0FjdGlvbigkRVJvbGVBY3Rpb24uV0FMS19MRUZUKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB0YWxrUmFuZG9tKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCBjbGlwOiBjYy5BdWRpb0NsaXAgPSB0aGlzLl90YWxrQXVkaW9DbGlwc1tNYXRoLmZsb29yKHRoaXMuX3RhbGtBdWRpb0NsaXBzLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpXTtcclxuICAgICAgICBpZiAoY2xpcCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhbGsoY2xpcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Zy65pmv5YiH5o2i55qE5pe25YCZ6L+b6KGM6ZSA5q+BXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgZ1dhcm4oXCLkurrniankuI3ov5vooYzplIDmr4FcIik7XHJcbiAgICAgICAgbGV0IGMgPSB0aGlzLmNvbmZpZztcclxuICAgICAgICBsZXQgbm9kZTogY2MuTm9kZSA9IG5ldyBjYy5Ob2RlO1xyXG4gICAgICAgIGxldCBhID0gbm9kZS5hZGRDb21wb25lbnQoX0FjdG9yKTtcclxuICAgICAgICBhLmluaXRDb25maWcoYyk7XHJcbiAgICAgICAgYS5kcmVzcyh0aGlzLl9kcmVzc0xpc3QpO1xyXG4gICAgICAgIF9BY3Rvci5zZXRJbnN0YW5jZShhKTtcclxuICAgICAgICBzdXBlci5vbkRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblRhbGtDbGlwQ29tcGxldGUoY2xpcDogY2MuQXVkaW9DbGlwKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdGFsa0F1ZGlvQ2xpcHMucHVzaChjbGlwKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBhZGRFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuYWRkRXZlbnRzKCk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub24oRXZlbnROYW1lLkNPUkVfUkVBRFksIHRoaXMub25TY2VuZVJlYWR5LCB0aGlzLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVtb3ZlRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLnJlbW92ZUV2ZW50cygpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09SRV9SRUFEWSwgdGhpcy5vblNjZW5lUmVhZHksIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvblNjZW5lRGVzdG9yeSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YW5kKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5wZXQgJiYgKHRoaXMucGV0Lm5vZGUuYWN0aXZlID0gdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5zZXRQYXJlbnQobnVsbCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25TY2VuZVJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIOesrOS4gOW4p+iho+acjeacquS8oFxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMuaW5pdE1lZGFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXRNZWRhbCgpOiB2b2lkIHtcclxuICAgICAgICAvL+abv+aNouWFieWciFxyXG4gICAgICAgIFNlcnZlck1nci5zZW5kUG9zdCh6bWdDb21tYW5kcy5jYXJyeU1lZGFsLCBudWxsLCB0aGlzLm9uTWVkYWxIYW5kbGVyLmJpbmQodGhpcyksIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbk1lZGFsSGFuZGxlcihyZXM6IElDYXJyeU1lZGFsKSB7XHJcbiAgICAgICAgaWYgKHJlcy51c2VyQ2FycnlNZWRhbEluZm8pIHtcclxuICAgICAgICAgICAgaWYgKHJlcy51c2VyQ2FycnlNZWRhbEluZm8uYW5pbWF0aW9uMVVybCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNrZTogc3RyaW5nID0gcmVzLnVzZXJDYXJyeU1lZGFsSW5mby5hbmltYXRpb24xVXJsO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRleDogc3RyaW5nID0gcmVzLnVzZXJDYXJyeU1lZGFsSW5mby5hbmltYXRpb24yVXJsO1xyXG4gICAgICAgICAgICAgICAgdmFyIHBuZzogc3RyaW5nID0gcmVzLnVzZXJDYXJyeU1lZGFsSW5mby5hbmltYXRpb24zVXJsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcGV0LmxvYWQobmV3IERyYWdvblJlc0Fzc2V0KHNrZSwgdGV4LCBwbmcpLCB0aGlzLl9jb25maWcuYnVuTmFtZSwgdGhpcy5fY29uZmlnLnNoYWRvdyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlcy51c2VyQWJpbGl0eU1lZGFsSW5mbykge1xyXG4gICAgICAgICAgICBpZiAocmVzLnVzZXJBYmlsaXR5TWVkYWxJbmZvLmFuaW1hdGlvbjFVcmwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2tlOiBzdHJpbmcgPSByZXMudXNlckFiaWxpdHlNZWRhbEluZm8uYW5pbWF0aW9uMVVybDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4OiBzdHJpbmcgPSByZXMudXNlckFiaWxpdHlNZWRhbEluZm8uYW5pbWF0aW9uMlVybDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcG5nOiBzdHJpbmcgPSByZXMudXNlckFiaWxpdHlNZWRhbEluZm8uYW5pbWF0aW9uM1VybDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEhhbG8obmV3IERyYWdvblJlc0Fzc2V0KHNrZSwgdGV4LCBwbmcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGFzRXZlbnRMaXN0ZW5lcih0eXBlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuaGFzRXZlbnRMaXN0ZW5lcih0eXBlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBvbjxUIGV4dGVuZHMgRnVuY3Rpb24+KHR5cGU6IHN0cmluZywgY2FsbGJhY2s6IFQsIHRhcmdldDogYW55LCB1c2VDYXB0dXJlPzogYm9vbGVhbiwgcHJpb3JpdHk/OiBudW1iZXIpOiBUIHtcclxuICAgICAgICByZXR1cm4gc3VwZXIub24odHlwZSwgY2FsbGJhY2ssIHRhcmdldCwgdXNlQ2FwdHVyZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9mZih0eXBlOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbiwgdGFyZ2V0OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vZmYodHlwZSwgY2FsbGJhY2ssIHRhcmdldCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdGFyZ2V0T2ZmKHRhcmdldDogYW55KTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIudGFyZ2V0T2ZmKHRhcmdldCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25jZSh0eXBlOiBzdHJpbmcsIGNhbGxiYWNrOiAoYXJnMT86IGFueSwgYXJnMj86IGFueSwgYXJnMz86IGFueSwgYXJnND86IGFueSwgYXJnNT86IGFueSkgPT4gdm9pZCwgdGFyZ2V0OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5vbmNlKHR5cGUsIGNhbGxiYWNrLCB0YXJnZXQpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRpc3BhdGNoRXZlbnQoZXZlbnQ6IGNjLkV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZGlzcGF0Y2hFdmVudChldmVudCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZW1pdChrZXk6IHN0cmluZywgYXJnMT86IGFueSwgYXJnMj86IGFueSwgYXJnMz86IGFueSwgYXJnND86IGFueSwgYXJnNT86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHN1cGVyLmVtaXQoa2V5LCBhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEV2ZW50TWdyLCBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgeyBCYXNlTWdyIH0gZnJvbSBcInptZ19tZ3JcIjtcclxuaW1wb3J0IHsgUmVzTGlzdGVuZXIsIFJlc01nciB9IGZyb20gXCJ6bWdfcmVzX21nclwiO1xyXG5pbXBvcnQgeyAkVUlFdmVudCB9IGZyb20gXCIuLi9ldmVudHMvVUlFdmVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIF9Gb250TWdyIGV4dGVuZHMgQmFzZU1nciBpbXBsZW1lbnRzIHptZy5JRm9udE1nciB7XHJcblxyXG4gICAgcHVibGljIGRlZmF1bHRGb250TmFtZTogc3RyaW5nID0gXCJBcmlhbFwiO1xyXG4gICAgcHVibGljIGZvbnQ2NU5hbWU6IHN0cmluZyA9IFwiSFlaaGVuZ1l1YW4tNjVXXCI7XHJcbiAgICBwdWJsaWMgZm9udDg1TmFtZTogc3RyaW5nID0gXCJIWVpoZW5nWXVhbi04NVdcIjtcclxuICAgIHB1YmxpYyBmb250NjVVUkw6IHN0cmluZyA9IFwiaHR0cHM6Ly93ZWItZGF0YS56bWxlYXJuLmNvbS9kb2MvaUxkTDJmN0VnRFlnOFE2WVg0NzN5TC9IWVpoZW5nWXVhbi02NVcudHRmXCI7XHJcbiAgICAvLyBwdWJsaWMgZm9udDY1VVJMOiBzdHJpbmcgPSBcImh0dHBzOi8vd2ViLWRhdGEuem1sZWFybi5jb20vZG9jL3dYNmttZnZRRzVWSkVLbTR1QlV4cm4vU1RDQUlZVU4udHRmXCI7XHJcbiAgICBwdWJsaWMgZm9udDg1VVJMOiBzdHJpbmcgPSBcImh0dHBzOi8vd2ViLWRhdGEuem1sZWFybi5jb20vZG9jL2JBNnZUdUV6aVN4TXV2WFh5aVl6RWMvSFlaaGVuZ1l1YW4tODVXLnR0ZlwiO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogX0ZvbnRNZ3I7XHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogX0ZvbnRNZ3Ige1xyXG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgX0ZvbnRNZ3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2ZvbnQ2NTogY2MuRm9udDtcclxuICAgIHByaXZhdGUgX2ZvbnQ4NTogY2MuRm9udDtcclxuICAgIHB1YmxpYyBDQ0luc3RhbnRpYXRlOiAocHJlOiBhbnkpID0+IGNjLk5vZGU7XHJcblxyXG4gICAgYXN5bmMgc3RhcnQoKSB7XHJcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcclxuICAgICAgICB0aGlzLkNDSW5zdGFudGlhdGUgPSBjYy5pbnN0YW50aWF0ZTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50cygpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBsb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcjogUmVzTGlzdGVuZXIgPSBuZXcgUmVzTGlzdGVuZXIodGhpcywgdGhpcy5vbkZvbnRIYW5kbGVyKTtcclxuICAgICAgICAgICAgUmVzTWdyLmxvYWRSZW1vdGUodGhpcy5mb250NjVVUkwsIGxpc3RlbmVyLCBjYy5Gb250KTtcclxuICAgICAgICAgICAgUmVzTWdyLmxvYWRSZW1vdGUodGhpcy5mb250ODVVUkwsIGxpc3RlbmVyLCBjYy5Gb250KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uRm9udEhhbmRsZXIoZm9udDogY2MuRm9udCwgbGlzOiBSZXNMaXN0ZW5lcik6IHZvaWQge1xyXG4gICAgICAgIGlmIChsaXMucGF0aCA9PSB0aGlzLmZvbnQ2NVVSTCkge1xyXG4gICAgICAgICAgICB0aGlzLl9mb250NjUgPSBmb250O1xyXG4gICAgICAgIH0gZWxzZSBpZiAobGlzLnBhdGggPT0gdGhpcy5mb250ODVVUkwpIHtcclxuICAgICAgICAgICAgdGhpcy5fZm9udDg1ID0gZm9udDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNDSW5zdGFudGlhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVGb250KGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlKTtcclxuICAgICAgICAgICAgRXZlbnRNZ3IuZGlzcGF0Y2hFdmVudChuZXcgJFVJRXZlbnQoRXZlbnROYW1lLlVJX0ZPTlRfUkVBRFkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50cygpO1xyXG4gICAgICAgIHRoaXMucmVzZXRDQ0luc3RhbnRpYXRlKCk7XHJcbiAgICAgICAgdGhpcy5fZm9udDY1LmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLl9mb250ODUuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuX2ZvbnQ2NSA9IHRoaXMuX2ZvbnQ4NSA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcblxyXG4gICAgICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMuX2ZvbnQ4NSkgJiYgY2MuaXNWYWxpZCh0aGlzLl9mb250NjUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlRm9udChub2RlOiBjYy5Ob2RlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWNjLmlzVmFsaWQobm9kZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsYWJlbHM6IGNjLkxhYmVsW10gfCBjYy5SaWNoVGV4dFtdID0gbm9kZS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihjYy5MYWJlbCk7XHJcbiAgICAgICAgaWYgKCFsYWJlbHMpIHtcclxuICAgICAgICAgICAgbGFiZWxzID0gbm9kZS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihjYy5SaWNoVGV4dCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsZW46IG51bWJlciA9IGxhYmVscy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChsYWJlbHNbaV0uZm9udCBpbnN0YW5jZW9mIGNjLlRURkZvbnQgfHwgIWxhYmVsc1tpXS5mb250KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZm9udDY1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsc1tpXS5mb250RmFtaWx5ID09IHRoaXMuZm9udDY1TmFtZSB8fCBsYWJlbHNbaV0uZm9udEZhbWlseSA9PSB0aGlzLmRlZmF1bHRGb250TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGFiZWxzW2ldLmZvbnQgIT0gdGhpcy5fZm9udDY1KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbHNbaV0udXNlU3lzdGVtRm9udCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxzW2ldLmZvbnQgPSB0aGlzLl9mb250NjU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbHNbaV0ubm9kZS53aWR0aCArPSAxMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsc1tpXVtcInNldFZlcnRzRGlydHlcIl0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2ZvbnQ4NSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbHNbaV0uZm9udEZhbWlseSA9PSB0aGlzLmZvbnQ4NU5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsc1tpXS5mb250ICE9IHRoaXMuX2ZvbnQ4NSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxzW2ldLnVzZVN5c3RlbUZvbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsc1tpXS5mb250ID0gdGhpcy5fZm9udDg1O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWxzW2ldLm5vZGUud2lkdGggKz0gMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYWJlbHNbaV1bXCJzZXRWZXJ0c0RpcnR5XCJdKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOabv+aNouezu+e7n+eUn+aIkOWvueixoeWHveaVsFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHVwZGF0ZUNDSW5zdGFudGlhdGUoKTogdm9pZCB7XHJcbiAgICAgICAgY2MuaW5zdGFudGlhdGUgPSBmdW5jdGlvbiAocHJlOiBhbnkpOiBjYy5Ob2RlIHtcclxuICAgICAgICAgICAgbGV0IG5vZGU6IGNjLk5vZGUgPSBfRm9udE1nci5nZXRJbnN0YW5jZSgpLkNDSW5zdGFudGlhdGUocHJlKTtcclxuICAgICAgICAgICAgX0ZvbnRNZ3IuZ2V0SW5zdGFuY2UoKS51cGRhdGVGb250KG5vZGUpO1xyXG4gICAgICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2MuaW5zdGFudGlhdGVbXCJfY2xvbmVcIl0gPSB0aGlzLkNDSW5zdGFudGlhdGVbXCJfY2xvbmVcIl07XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJlc2V0Q0NJbnN0YW50aWF0ZSgpOiB2b2lkIHtcclxuICAgICAgICBjYy5pbnN0YW50aWF0ZSA9IHRoaXMuQ0NJbnN0YW50aWF0ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZEV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICBFdmVudE1nci5vbmNlKEV2ZW50TmFtZS5DT1JFX1JFQURZLCB0aGlzLm9uQ29yZVJlYWR5LCB0aGlzKTtcclxuICAgICAgICBFdmVudE1nci5vbihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfRU5ELCB0aGlzLm9uU2NlbmVDaGFuZ2UsIHRoaXMsIGZhbHNlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlbW92ZUV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICBFdmVudE1nci5vZmYoRXZlbnROYW1lLkNPUkVfUkVBRFksIHRoaXMub25Db3JlUmVhZHksIHRoaXMpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfRU5ELCB0aGlzLm9uU2NlbmVDaGFuZ2UsIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Db3JlUmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5sb2FkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIG9uU2NlbmVDaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVGb250KGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlKTtcclxuICAgIH1cclxufSIsIi8qXHJcbiAqIEBEZXNjcmlwdGlvbjogXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgRXZlbnRNZ3IsIEV2ZW50TmFtZSB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XHJcbmltcG9ydCB7IFJlc0xpc3RlbmVyLCBSZXNNZ3IsIFN5c3RlbUJ1bmRsZU5hbWUgfSBmcm9tIFwiem1nX3Jlc19tZ3JcIjtcclxuaW1wb3J0IHsgRm9udE1nciwgVUlNZ3IsIHptVHdlZW4gfSBmcm9tIFwiem1nX3VpX21nclwiO1xyXG5pbXBvcnQgeyBTdHJpbmdVdGlsIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7ICRBbGVydEFzc2V0IH0gZnJvbSBcIi4vQWxlcnRBc3NldFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzICRBbGVydCBleHRlbmRzIGNjLkV2ZW50VGFyZ2V0IHtcclxuXHJcbiAgICBsYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIHN1cmVCdG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgY2FuZWxCdG46IGNjLkJ1dHRvbiA9IG51bGw7XHJcblxyXG4gICAgc3VyZUxhYmVsOiBjYy5MYWJlbCA9IG51bGw7XHJcblxyXG4gICAgY2FuZWxMYWJlbDogY2MuTGFiZWwgPSBudWxsO1xyXG5cclxuICAgIHBvcHVwX2ltZzogY2MuTm9kZSA9IG51bGw7XHJcblxyXG4gICAgdGl0bGU6IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIG5vZGU6IGNjLk5vZGU7XHJcbiAgICBwdWJsaWMgcmVzOiB6bWcuSVJlc0Fzc2V0O1xyXG4gICAgcHVibGljIHRpdGxlUmVzOiB6bWcuSVJlc0Fzc2V0O1xyXG4gICAgcHVibGljIGFzc2V0OiB6bWcuSUFsZXJ0QXNzZXQ7XHJcbiAgICBwcml2YXRlIF9kZWZhdWx0VGl0bGVGcmFtZTogY2MuU3ByaXRlRnJhbWU7XHJcbiAgICBwcml2YXRlIF9tYXNrOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBfY29udGVudDogY2MuTm9kZTtcclxuICAgIGNvbnN0cnVjdG9yKHJlczogem1nLklSZXNBc3NldCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdHlsZShyZXMpO1xyXG4gICAgfVxyXG4gICAgaW5pdChub2RlOiBjYy5Ob2RlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm5vZGUubmFtZSA9IFwiYWxlcnROb2RlXCI7XHJcbiAgICAgICAgdGhpcy5ub2RlLmdyb3VwID0gXCJVSVwiO1xyXG4gICAgICAgIGxldCBjb250ZW50OiBjYy5Ob2RlID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwiY29udGVudFwiKTtcclxuICAgICAgICB0aGlzLnBvcHVwX2ltZyA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJwb3B1cF9pbWdcIik7XHJcbiAgICAgICAgdGhpcy5sYWJlbCA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJsYWJlbFwiKS5nZXRDb21wb25lbnQoY2MuTGFiZWwpO1xyXG4gICAgICAgIHRoaXMuc3VyZUJ0biA9IGNvbnRlbnQuZ2V0Q2hpbGRCeU5hbWUoXCJzdXJlQnRuXCIpLmdldENvbXBvbmVudChjYy5CdXR0b24pO1xyXG4gICAgICAgIHRoaXMuY2FuZWxCdG4gPSBjb250ZW50LmdldENoaWxkQnlOYW1lKFwiY2FuZWxCdG5cIikuZ2V0Q29tcG9uZW50KGNjLkJ1dHRvbik7XHJcbiAgICAgICAgdGhpcy5zdXJlTGFiZWwgPSB0aGlzLnN1cmVCdG4ubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5jYW5lbExhYmVsID0gdGhpcy5jYW5lbEJ0bi5ub2RlLmdldENoaWxkQnlOYW1lKFwibGFiZWxcIikuZ2V0Q29tcG9uZW50KGNjLkxhYmVsKTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gY29udGVudC5nZXRDaGlsZEJ5TmFtZShcInRpdGxlXCIpLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIHRoaXMuX2RlZmF1bHRUaXRsZUZyYW1lID0gdGhpcy50aXRsZS5zcHJpdGVGcmFtZTtcclxuICAgICAgICB0aGlzLl9jb250ZW50ID0gY29udGVudDtcclxuICAgICAgICB0aGlzLnNldFRpdGxlQWN0aXZlKGZhbHNlKTtcclxuICAgICAgICB0aGlzLnNob3codGhpcy5hc3NldCk7XHJcbiAgICAgICAgdGhpcy5hZGRFdmVudHMoKTtcclxuICAgICAgICB0aGlzLmVtaXQoRXZlbnROYW1lLkNPTVBMRVRFLCB0aGlzKTtcclxuXHJcbiAgICAgICAgUmVzTWdyLmxvYWQoU3lzdGVtQnVuZGxlTmFtZS5VSSwgXCJwcmVmYWJzL01hc2tcIiwgbmV3IFJlc0xpc3RlbmVyKHRoaXMsIChwcmU6IGNjLlByZWZhYikgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9tYXNrID0gY2MuaW5zdGFudGlhdGUocHJlKTtcclxuICAgICAgICAgICAgdGhpcy5fbWFzay56SW5kZXggPSAtMTtcclxuICAgICAgICAgICAgdGhpcy5fbWFzay5zZXRQYXJlbnQodGhpcy5ub2RlKTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbiAgICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gY2MuaXNWYWxpZCh0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBzdHlsZSDnrKblkIjopoHmsYLmoLflvI/nmoRub2RlLFByZWZhYlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3R5bGUocmVzOiB6bWcuSVJlc0Fzc2V0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZXMgPSByZXM7XHJcbiAgICAgICAgUmVzTWdyLmxvYWRSZXMocmVzLCBuZXcgUmVzTGlzdGVuZXIodGhpcywgKHByZWZhYjogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuaW5pdChjYy5pbnN0YW50aWF0ZShwcmVmYWIpKTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0VGl0bGUocmVzOiB6bWcuSVJlc0Fzc2V0LCBpc0RlZmF1bHQ/OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlUmVzID0gcmVzO1xyXG4gICAgICAgICAgICBSZXNNZ3IubG9hZFJlcyhyZXMsIG5ldyBSZXNMaXN0ZW5lcih0aGlzLCAodGV4OiBjYy5UZXh0dXJlMkQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmcmFtZSA9IG5ldyBjYy5TcHJpdGVGcmFtZSh0ZXgpO1xyXG4gICAgICAgICAgICAgICAgaXNEZWZhdWx0ICYmICh0aGlzLl9kZWZhdWx0VGl0bGVGcmFtZSA9IGZyYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRpdGxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50aXRsZS5zcHJpdGVGcmFtZSA9IGZyYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGl0bGVBY3RpdmUodHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0VGl0bGVBY3RpdmUoYm9vbDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudGl0bGUubm9kZS5hY3RpdmUgPSBib29sO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5ub2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudGl0bGUuc3ByaXRlRnJhbWUgIT0gdGhpcy5fZGVmYXVsdFRpdGxlRnJhbWUpIHtcclxuICAgICAgICAgICAgdGhpcy50aXRsZS5zcHJpdGVGcmFtZSA9IHRoaXMuX2RlZmF1bHRUaXRsZUZyYW1lO1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub2RlLnNldFBhcmVudChudWxsKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5hc3NldCA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRzKCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNob3coYXNzZXQ6IHptZy5JQWxlcnRBc3NldCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYXNzZXQgPSBhc3NldDtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghY2MuaXNWYWxpZCh0aGlzLmFzc2V0KSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMubGFiZWwuc3RyaW5nID0gYXNzZXQudGV4dDtcclxuICAgICAgICB0aGlzLmxhYmVsLm92ZXJmbG93ID0gY2MuTGFiZWwuT3ZlcmZsb3cuTk9ORTtcclxuICAgICAgICBpZiAoU3RyaW5nVXRpbC5pc1ZhbGlkKGFzc2V0LnN1cmVUZXh0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnN1cmVCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnN1cmVMYWJlbC5zdHJpbmcgPSBhc3NldC5zdXJlVGV4dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnN1cmVCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKFN0cmluZ1V0aWwuaXNWYWxpZChhc3NldC5jYW5lbFRleHQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuZWxCdG4ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmNhbmVsTGFiZWwuc3RyaW5nID0gYXNzZXQuY2FuZWxUZXh0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuZWxCdG4ubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY2FuZWxCdG4ubm9kZS5hY3RpdmUgfHwgdGhpcy5zdXJlQnRuLm5vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNhbmVsQnRuLm5vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1cmVCdG4ubm9kZS54ID0gLTEwMDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuZWxCdG4ubm9kZS54ID0gMTAwO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdXJlQnRuLm5vZGUueCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN1cmVCdG4ubm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FuZWxCdG4ubm9kZS54ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldENvbnRlbnRTaXplKDAsIDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q29udGVudFNpemUoMCwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2NvbnRlbnQuc2NhbGUgPSAwO1xyXG4gICAgICAgIHptVHdlZW4odGhpcy5fY29udGVudCkudG8oMC4zLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcInNtb290aFwiIH0pLnN0YXJ0KCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xvc2Uobm93PzogYm9vbGVhbiwgaXNDbGVhbj86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5hc3NldCkge1xyXG4gICAgICAgICAgICB0aGlzLmFzc2V0LmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuYXNzZXQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIGlmIChub3cpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0NsZWFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuZW1pdChFdmVudE5hbWUuQ0xPU0UsIHRoaXMpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgem1Ud2Vlbih0aGlzLl9jb250ZW50KS50bygwLjMsIHsgc2NhbGU6IDAgfSwgeyBlYXNpbmc6IFwic21vb3RoXCIgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICBjYy5nYW1lW1wiZnVsbEZyYW1lUmF0aW9cIl0gJiYgY2MuZ2FtZVtcImZ1bGxGcmFtZVJhdGlvXCJdKCk7XHJcbiAgICB9XHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgY2MuZ2FtZVtcInJlY292ZXJGcmFtZVJhdGlvXCJdICYmIGNjLmdhbWVbXCJyZWNvdmVyRnJhbWVSYXRpb1wiXSgpO1xyXG4gICAgfVxyXG4gICAgYWRkRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICghY2Muc3lzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgIGxldCBidG5zOiBjYy5CdXR0b25bXSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnRzSW5DaGlsZHJlbihjYy5CdXR0b24pO1xyXG4gICAgICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSBidG5zLmxlbmd0aDtcclxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBidG5zW2ldLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfRU5URVIsIHRoaXMub25Nb3VzZUVudGVyLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBidG5zW2ldLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZUxldmVsLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdXJlQnRuLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uU3VyZSwgdGhpcywgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuY2FuZWxCdG4ubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25DYW5lbCwgdGhpcywgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUV2ZW50cygpIHtcclxuICAgICAgICBpZiAoIWNjLnN5cy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICBsZXQgYnRuczogY2MuQnV0dG9uW10gPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50c0luQ2hpbGRyZW4oY2MuQnV0dG9uKTtcclxuICAgICAgICAgICAgbGV0IGk6IG51bWJlcjtcclxuICAgICAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gYnRucy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgYnRuc1tpXS5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlRW50ZXIsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGJ0bnNbaV0ubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTEVBVkUsIHRoaXMub25Nb3VzZUxldmVsLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3VyZUJ0bi5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25TdXJlLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5jYW5lbEJ0bi5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25DYW5lbCwgdGhpcywgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XHJcbiAgICAgICAgVUlNZ3IubW91c2Uuc2V0TGluaygpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbk1vdXNlTGV2ZWwoKTogdm9pZCB7XHJcbiAgICAgICAgVUlNZ3IubW91c2Uuc2V0Tm9ybWFsKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uU3VyZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmFzc2V0ICYmIHRoaXMuYXNzZXQuc3VyZSgpO1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQ2FuZWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5hc3NldCAmJiB0aGlzLmFzc2V0LmNhbmVsKCk7XHJcbiAgICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Q29udGVudFNpemUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBjYy5DYW52YXMuaW5zdGFuY2Uuc2NoZWR1bGVPbmNlKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbC5vdmVyZmxvdyA9IGNjLkxhYmVsLk92ZXJmbG93LlJFU0laRV9IRUlHSFQ7XHJcbiAgICAgICAgICAgIHRoaXMubGFiZWwubm9kZS53aWR0aCA9IE1hdGgubWF4KE1hdGgubWluKHRoaXMubGFiZWwubm9kZS53aWR0aCwgODAwKSwgNTIwKTtcclxuICAgICAgICAgICAgdGhpcy5sYWJlbC5ub2RlLmhlaWdodCA9IE1hdGgubWF4KE1hdGgubWluKHRoaXMubGFiZWwubm9kZS5oZWlnaHQsIDYwMCksIDMxMik7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS53aWR0aCA9IHdpZHRoICsgdGhpcy5sYWJlbC5ub2RlLndpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gaGVpZ2h0ICsgdGhpcy5sYWJlbC5ub2RlLmhlaWdodDtcclxuICAgICAgICAgICAgbGV0IHdpZHM6IGNjLldpZGdldFtdID0gdGhpcy5ub2RlLmdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNjLldpZGdldCk7XHJcbiAgICAgICAgICAgIGxldCBpOiBudW1iZXI7XHJcbiAgICAgICAgICAgIGxldCBsZW46IG51bWJlciA9IHdpZHMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHdpZHNbaV0udXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAwKTtcclxuICAgIH1cclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgUmVzTGlzdGVuZXIsIFJlc01nciB9IGZyb20gXCJ6bWdfcmVzX21nclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzICRBbGVydEFzc2V0IGltcGxlbWVudHMgem1nLklBbGVydEFzc2V0IHtcclxuICAgIHB1YmxpYyB0ZXh0OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgdGFyZ2V0OiBhbnk7XHJcbiAgICBwdWJsaWMgc3VyZUZ1bjogRnVuY3Rpb247XHJcbiAgICBwdWJsaWMgY2FuZWxGdW46IEZ1bmN0aW9uO1xyXG4gICAgcHVibGljIHN0eWxlOiB6bWcuSVJlc0Fzc2V0O1xyXG4gICAgcHVibGljIHRpdGxlOiB6bWcuSVJlc0Fzc2V0O1xyXG4gICAgcHVibGljIHN1cmVUZXh0OiBzdHJpbmcgPSBcIuehruWumlwiO1xyXG4gICAgcHVibGljIGNhbmVsVGV4dDogc3RyaW5nID0gXCLlj5bmtohcIjtcclxuICAgIHB1YmxpYyBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih0ZXh0OiBzdHJpbmcsIHN1cmVGdW46IEZ1bmN0aW9uID0gbnVsbCwgY2FuZWxGdW46IEZ1bmN0aW9uID0gbnVsbCwgc3VyZTogc3RyaW5nID0gXCLnoa7lrppcIiwgY2FuZWw6IHN0cmluZyA9IFwiXCIsIHRhcmdldD86IGFueSkge1xyXG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgdGhpcy5zdXJlRnVuID0gc3VyZUZ1bjtcclxuICAgICAgICB0aGlzLmNhbmVsRnVuID0gY2FuZWxGdW47XHJcbiAgICAgICAgdGhpcy5zdXJlVGV4dCA9IHN1cmU7XHJcbiAgICAgICAgdGhpcy5jYW5lbFRleHQgPSBjYW5lbDtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRhcmdldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdXJlRnVuID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNhbmVsRnVuID0gbnVsbDtcclxuICAgICAgICB0aGlzLnN1cmVUZXh0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNhbmVsVGV4dCA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN1cmUoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQodGhpcy50YXJnZXQpICYmIHRoaXMuc3VyZUZ1bikge1xyXG4gICAgICAgICAgICB0aGlzLnN1cmVGdW4uY2FsbCh0aGlzLnRhcmdldCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNhbmVsKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMudGFyZ2V0KSAmJiB0aGlzLmNhbmVsRnVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FuZWxGdW4uY2FsbCh0aGlzLnRhcmdldCwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IENvbmZpZ01nciB9IGZyb20gXCJ6bWdfY29uZmlnX21nclwiO1xyXG5pbXBvcnQgeyBFdmVudE1nciwgRXZlbnROYW1lIH0gZnJvbSBcInptZ19ldmVudF9tZ3JcIjtcclxuaW1wb3J0IHsgU3lzdGVtQnVuZGxlTmFtZSwgUmVzTGlzdGVuZXIsIFJlc01nciwgUmVzQXNzZXQsIEVSZXNFdmVudE5hbWUgfSBmcm9tIFwiem1nX3Jlc19tZ3JcIjtcclxuaW1wb3J0IHsgRm9udE1nciB9IGZyb20gXCJ6bWdfdWlfbWdyXCI7XHJcbmltcG9ydCB7IGdMb2cgfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuaW1wb3J0IHsgJEFsZXJ0IH0gZnJvbSBcIi4vQWxlcnRcIjtcclxuaW1wb3J0IHsgJEFsZXJ0QXNzZXQgfSBmcm9tIFwiLi9BbGVydEFzc2V0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgX0FsZXJ0TWdyIGV4dGVuZHMgY2MuRXZlbnRUYXJnZXQgaW1wbGVtZW50cyB6bWcuSUFsZXJ0TWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogX0FsZXJ0TWdyO1xyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6IF9BbGVydE1nciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfQWxlcnRNZ3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBub2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBfYWxlcnQ6ICRBbGVydDtcclxuICAgIHByaXZhdGUgX2RlZmFsdXQ6ICRBbGVydDtcclxuICAgIHByaXZhdGUgX2Fzc2V0czogem1nLklBbGVydEFzc2V0W10gPSBbXTtcclxuICAgIHB1YmxpYyBnZXQgcmVzKCk6IHptZy5JUmVzQXNzZXQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9kZWZhbHV0LnJlcztcclxuICAgIH1cclxuICAgIGluaXQodXJsOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5vZGUgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIHRoaXMubm9kZS5ncm91cCA9IFwiVUlcIjtcclxuICAgICAgICB0aGlzLm5vZGUud2lkdGggPSBjYy52aXNpYmxlUmVjdC53aWR0aDtcclxuICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gY2MudmlzaWJsZVJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubm9kZS5uYW1lID0gXCJhbGVydE5vZGVcIjtcclxuICAgICAgICBsZXQgd2lkZ2V0ID0gdGhpcy5ub2RlLmFkZENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgIHdpZGdldC5pc0FsaWduTGVmdCA9IHRydWU7XHJcbiAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IHRydWU7XHJcbiAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSB0cnVlO1xyXG4gICAgICAgIHdpZGdldC5pc0FsaWduQm90dG9tID0gdHJ1ZTtcclxuICAgICAgICB3aWRnZXQudG9wID0gd2lkZ2V0LmJvdHRvbSA9IHdpZGdldC5sZWZ0ID0gd2lkZ2V0LnJpZ2h0ID0gMDtcclxuICAgICAgICB0aGlzLl9kZWZhbHV0ID0gbmV3ICRBbGVydChuZXcgUmVzQXNzZXQoQ29uZmlnTWdyLnVpY29uZmlnLmJ1bk5hbWUsIHVybCkpO1xyXG4gICAgICAgIHRoaXMuX2RlZmFsdXQub25jZShFdmVudE5hbWUuQ09NUExFVEUsIHRoaXMub25EZWZhdWx0Q29tcGxldGUsIHRoaXMpO1xyXG4gICAgICAgIGlmIChGb250TWdyLmlzVmFsaWQpIHtcclxuICAgICAgICAgICAgdGhpcy5vbkZvbnRSZWFkeSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEV2ZW50TWdyLm9uY2UoRXZlbnROYW1lLlVJX0ZPTlRfUkVBRFksIHRoaXMub25Gb250UmVhZHksIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgZGVmYXVsdEFsZXJ0KCk6ICRBbGVydCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RlZmFsdXQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uRm9udFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgIEZvbnRNZ3IudXBkYXRlRm9udCh0aGlzLl9kZWZhbHV0Lm5vZGUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkRlZmF1bHRDb21wbGV0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVtaXQoRVJlc0V2ZW50TmFtZS5DT01QTEVURSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uQWxlcnRDbG9zZShhbGVydDogJEFsZXJ0KTogdm9pZCB7XHJcbiAgICAgICAgYWxlcnQub2ZmKEV2ZW50TmFtZS5DT01QTEVURSwgdGhpcy5vbkFsZXJ0Q29tcGxldGUsIHRoaXMpO1xyXG4gICAgICAgIGFsZXJ0Lm5vZGUub2ZmKEV2ZW50TmFtZS5DTE9TRSwgdGhpcy5vbkFsZXJ0Q2xvc2UsIHRoaXMpO1xyXG4gICAgICAgIGlmICh0aGlzLl9hbGVydCA9PSBhbGVydCkge1xyXG4gICAgICAgICAgICB0aGlzLl9hbGVydCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub3Blbk5leHQoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gc3R5bGUg56ym5ZCI6KaB5rGC5qC35byP55qEbm9kZSxQcmVmYWJcclxuICAgICAqL1xyXG4gICAgcHJvdGVjdGVkIGdldEFsZXJ0KHJlczogem1nLklSZXNBc3NldCk6ICRBbGVydCB7XHJcbiAgICAgICAgcmVzID0gcmVzID8gcmVzIDogdGhpcy5fZGVmYWx1dC5yZXM7XHJcbiAgICAgICAgaWYgKHRoaXMuX2RlZmFsdXQucmVzID09IHJlcykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGVmYWx1dDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgYWxlcnQgPSBuZXcgJEFsZXJ0KHJlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBhbGVydDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOmUgOavgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBFdmVudE1nci5vZmYoRXZlbnROYW1lLlVJX0ZPTlRfUkVBRFksIHRoaXMub25Gb250UmVhZHksIHRoaXMpO1xyXG4gICAgICAgIHRoaXMubm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gbnVsbDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5piv5ZCm5Yid5aeL5YyW5a6M5q+VXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gY2MuaXNWYWxpZCh0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gYXNzZXQg5by55qGG5pi+56S6XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvcGVuKGFzc2V0OiBzdHJpbmcgfCB6bWcuSUFsZXJ0QXNzZXQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodHlwZW9mIChhc3NldCkgPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBhc3NldCA9IG5ldyAkQWxlcnRBc3NldChhc3NldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdMb2coXCLmmL7npLrlvLnnqpc6XCIgKyBhc3NldC50ZXh0KTtcclxuICAgICAgICB0aGlzLl9hc3NldHMucHVzaChhc3NldCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FsZXJ0KSB7XHJcbiAgICAgICAgICAgIC8v562J5b6F5by556qX57uT5p2fXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vcGVuTmV4dCgpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbPpl61cclxuICAgICAqL1xyXG4gICAgcHVibGljIGNsb3NlKG5vdz86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fYWxlcnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fYWxlcnQuY2xvc2Uobm93LCB0aGlzLl9hbGVydCA9PSB0aGlzLl9kZWZhbHV0KTtcclxuICAgICAgICAgICAgdGhpcy5fYWxlcnQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgb3Blbk5leHQoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGFzc2V0OiB6bWcuSUFsZXJ0QXNzZXQgPSB0aGlzLl9hc3NldHMuc2hpZnQoKTtcclxuICAgICAgICBpZiAoYXNzZXQgJiYgYXNzZXQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICBsZXQgYWxlcnQ6ICRBbGVydCA9IHRoaXMuZ2V0QWxlcnQoYXNzZXQuc3R5bGUpO1xyXG4gICAgICAgICAgICBhbGVydC5zZXRUaXRsZShhc3NldC50aXRsZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2FsZXJ0ID0gYWxlcnQ7XHJcbiAgICAgICAgICAgIGFsZXJ0LnNob3coYXNzZXQpO1xyXG4gICAgICAgICAgICBpZiAoYWxlcnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkFsZXJ0Q29tcGxldGUoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0Lm9uY2UoRXZlbnROYW1lLkNPTVBMRVRFLCB0aGlzLm9uQWxlcnRDb21wbGV0ZSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uQWxlcnRDb21wbGV0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9hbGVydC5ub2RlLnNldFBhcmVudCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIHRoaXMuX2FsZXJ0Lm5vZGUub24oRXZlbnROYW1lLkNMT1NFLCB0aGlzLm9uQWxlcnRDbG9zZSwgdGhpcyk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBDb25maWdNZ3IgfSBmcm9tIFwiem1nX2NvbmZpZ19tZ3JcIjtcclxuaW1wb3J0IHsgRVJlc0V2ZW50TmFtZSwgUmVzQXNzZXQsIFJlc0xpc3RlbmVyLCBSZXNNZ3IgfSBmcm9tIFwiem1nX3Jlc19tZ3JcIjtcclxuaW1wb3J0IHsgZ0xvZywgU3RyaW5nVXRpbCwgZ1dhcm4gfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzICRCYXNlVUkgZXh0ZW5kcyBjYy5FdmVudFRhcmdldCBpbXBsZW1lbnRzIHptZy5JQmFzZVVJIHtcclxuICAgIHByb3RlY3RlZCBfbm9kZTogY2MuTm9kZTtcclxuICAgIHByb3RlY3RlZCBfdGFyZ2V0OiBjYy5Db21wb25lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgX25vd1N0eWxlOiB6bWcuSVJlc0Fzc2V0O1xyXG4gICAgcHJvdGVjdGVkIF9kZWZhdWx0U3R5bGU6IHptZy5JUmVzQXNzZXQ7XHJcbiAgICBwcm90ZWN0ZWQgX3Jlczogem1nLklSZXNBc3NldDtcclxuICAgIHByb3RlY3RlZCBfaXNBY3RpdmU6IGJvb2xlYW47XHJcbiAgICBwcm90ZWN0ZWQgX3BhcmVudDogY2MuTm9kZTtcclxuICAgIHB1YmxpYyBzZXQgbm9kZShuOiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgdGhpcy5fbm9kZSA9IG47XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IG5vZGUoKTogY2MuTm9kZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX25vZGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHJlcygpOiB6bWcuSVJlc0Fzc2V0IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcmVzO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IodXJsPzogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl9pc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pbml0KHVybCk7XHJcbiAgICB9XHJcbiAgICBpbml0KHVybDogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKFN0cmluZ1V0aWwuaXNWYWxpZCh1cmwpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlcyA9IHsgYnVuTmFtZTogXCJcIiwgcGF0aDogXCJcIiB9O1xyXG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0U3R5bGUgPSB7IGJ1bk5hbWU6IENvbmZpZ01nci51aWNvbmZpZy5idW5OYW1lLCBwYXRoOiB1cmwgfTtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdHlsZSh0aGlzLl9kZWZhdWx0U3R5bGUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaYvuekulxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2hvdygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDpmpDol49cclxuICAgICAqL1xyXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25vZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBzdHlsZSDnrKblkIjopoHmsYLmoLflvI/nmoRub2RlLFByZWZhYlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3R5bGUocmVzOiBzdHJpbmcgfCB6bWcuSVJlc0Fzc2V0LCByZXNVcmw/OiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsZXQgYXN0OiB6bWcuSVJlc0Fzc2V0O1xyXG4gICAgICAgIGlmICh0eXBlb2YgKHJlcykgPT09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgYXN0ID0gbmV3IFJlc0Fzc2V0KFwiXCIsIFwiXCIpO1xyXG4gICAgICAgICAgICBhc3QuYnVuTmFtZSA9IHJlcztcclxuICAgICAgICAgICAgYXN0LnBhdGggPSByZXNVcmw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYXN0ID0gcmVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX25vd1N0eWxlIHx8IHRoaXMuX25vd1N0eWxlLmJ1bk5hbWUgIT0gYXN0LmJ1bk5hbWUgfHwgdGhpcy5fbm93U3R5bGUucGF0aCAhPSBhc3QucGF0aCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9wYXJlbnQgPSB0aGlzLl9ub2RlLnBhcmVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX25vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9kZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5sb2FkKGFzdC5idW5OYW1lLCBhc3QucGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDov5jljp/pu5jorqTmoLflvI9cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlc2V0U3R5bGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRTdHlsZSh0aGlzLl9kZWZhdWx0U3R5bGUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDplIDmr4FcclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ub2RlLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5faXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy5fbm9kZSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmmK/lkKbliJ3lp4vljJblrozmr5VcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBjYy5pc1ZhbGlkKHRoaXMuX25vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkKGJ1bk5hbWU6IHN0cmluZywgdXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIVN0cmluZ1V0aWwuaXNWYWxpZChidW5OYW1lKSkge1xyXG4gICAgICAgICAgICBnV2FybihcIlVJOlwiICsgXCIgIGJ1bk5hbWXkuLrnqbrvvIzml6Dms5XliJ3lp4vljJZVSSFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghU3RyaW5nVXRpbC5pc1ZhbGlkKHVybCkpIHtcclxuICAgICAgICAgICAgZ1dhcm4oXCJVSTpcIiArIFwiICB1cmzkuLrnqbrvvIzml6Dms5XliJ3lp4vljJZVSSFcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX3Jlcy5wYXRoID09IHVybCAmJiB0aGlzLl9yZXMuYnVuTmFtZSA9PSBidW5OYW1lKSB7XHJcbiAgICAgICAgICAgIGdMb2coXCLmoLflvI/ph43lpI3vvIzml6DpnIDmm7/mjaIsdXJsOiBcIiArIHVybCArIFwiIGJ1bk5hbWU6XCIgKyBidW5OYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9yZXMucGF0aCA9IHVybDtcclxuICAgICAgICB0aGlzLl9yZXMuYnVuTmFtZSA9IGJ1bk5hbWU7XHJcbiAgICAgICAgUmVzTWdyLmxvYWQoYnVuTmFtZSwgdXJsLCB0aGlzLm9uTG9hZENvbXBsZXRlLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICog6LWE5rqQ5LiL6L295a6M5q+VXHJcbiAgICAqL1xyXG4gICAgcHJvdGVjdGVkIG9uTG9hZENvbXBsZXRlKHByZTogY2MuUHJlZmFiLCBsaXN0ZW5lcj86IHptZy5JUmVzTGlzdGVuZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAobGlzdGVuZXIucGF0aCA9PSB0aGlzLl9yZXMucGF0aCAmJiBsaXN0ZW5lci5idW5OYW1lID09IHRoaXMuX3Jlcy5idW5OYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlTm9kZShwcmUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlTm9kZShwcmU6IGNjLlByZWZhYik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX25vZGUgPSBjYy5pbnN0YW50aWF0ZShwcmUpO1xyXG4gICAgICAgIHRoaXMuX25vZGUuZ3JvdXAgPSBcIlVJXCI7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdGhpcy5fbm9kZS5hZGRDb21wb25lbnQoY2MuQ29tcG9uZW50KTtcclxuICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLl9wYXJlbnQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudC5hZGRDaGlsZCh0aGlzLl9ub2RlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWIneWni+WMllxyXG4gICAgICovXHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMub25Db21wbGV0ZSgpO1xyXG4gICAgICAgIHRoaXMuYWRkRXZlbnRzKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25Db21wbGV0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9ub2RlLmFjdGl2ZSA9IHRoaXMuX2lzQWN0aXZlO1xyXG4gICAgICAgIHRoaXMuZW1pdChFUmVzRXZlbnROYW1lLkNPTVBMRVRFKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb3BhY2l0eUhpZGUodGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faXNBY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5fbm9kZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLl9ub2RlKS50byh0aW1lLCB7IG9wYWNpdHk6IDAgfSwgeyBlYXNpbmc6IFwic21vb3RoXCIgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ub2RlLm9wYWNpdHkgPSAweGZmO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9wYWNpdHlTaG93KHRpbWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBpZiAoIXRoaXMuX25vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX25vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fbm9kZS5vcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgdGhpcy5fbm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLl9ub2RlKS50byh0aW1lLCB7IG9wYWNpdHk6IDB4ZmYgfSwgeyBlYXNpbmc6IFwic21vb3RoXCIgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX25vZGUub3BhY2l0eSAhPSAweGZmKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLl9ub2RlKS50byh0aW1lLCB7IG9wYWNpdHk6IDB4ZmYgfSwgeyBlYXNpbmc6IFwic21vb3RoXCIgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2NhbGVIaWRlKHRpbWU6IG51bWJlciwgbm9kZT86IGNjLk5vZGUsIGNhbGxiYWNrPzogRnVuY3Rpb24sIHRhcmdldD86IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lzQWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgbGV0IHRuOiBjYy5Ob2RlID0gbm9kZSA/IG5vZGUgOiB0aGlzLl9ub2RlO1xyXG4gICAgICAgIGlmICh0bi5hY3RpdmUpIHtcclxuICAgICAgICAgICAgdG4uc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odG4pLnRvKHRpbWUsIHsgc2NhbGU6IDAgfSwgeyBlYXNpbmc6IFwic21vb3RoXCIgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0bi5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0LCBub2RlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIHNjYWxlU2hvdyh0aW1lOiBudW1iZXIsIG5vZGU/OiBjYy5Ob2RlKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faXNBY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIGxldCB0bjogY2MuTm9kZSA9IG5vZGUgPyBub2RlIDogdGhpcy5fbm9kZTtcclxuICAgICAgICBpZiAoIXRuLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0bi5zY2FsZSA9IDA7XHJcbiAgICAgICAgICAgIHRuLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIHRuLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRuKS50byh0aW1lLCB7IHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcInNtb290aFwiIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodG4ub3BhY2l0eSAhPSAweGZmKSB7XHJcbiAgICAgICAgICAgICAgICB0bi5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odG4pLnRvKHRpbWUsIHsgc2NhbGU6IDEgfSwgeyBlYXNpbmc6IFwic21vb3RoXCIgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG4uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjaGVkdWxlT25jZShjYWxsYmFjazogRnVuY3Rpb24sIGRlbGF5PzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RhcmdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl90YXJnZXQuc2NoZWR1bGVPbmNlKGNhbGxiYWNrLCBkZWxheSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB1bnNjaGVkdWxlQWxsQ2FsbGJhY2tzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl90YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0LnVuc2NoZWR1bGVBbGxDYWxsYmFja3MoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGFkZEV2ZW50cygpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVtb3ZlRXZlbnRzKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBnTG9nIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCAkQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzICRCZyBleHRlbmRzICRCYXNlVUkgaW1wbGVtZW50cyB6bWcuSUJnIHtcclxuICAgIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nLCBwYXJlbnQ6IGNjLk5vZGUpIHtcclxuICAgICAgICBzdXBlcih1cmwpO1xyXG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvcGFjaXR5SGlkZSh0aW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pc0FjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKHRpbWUsIHsgb3BhY2l0eTogMCB9LCB7IGVhc2luZzogXCJzbW9vdGhcIiB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5vcGFjaXR5ID0gMHhmZjtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQYXJlbnQobnVsbCk7XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBvcGFjaXR5U2hvdyh0aW1lOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pc0FjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQYXJlbnQodGhpcy5fcGFyZW50KTtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50byh0aW1lLCB7IG9wYWNpdHk6IDB4ZmYgfSwgeyBlYXNpbmc6IFwic21vb3RoXCIgfSkuc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5ub2RlLm9wYWNpdHkgIT0gMHhmZikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLm5vZGUpLnRvKHRpbWUsIHsgb3BhY2l0eTogMHhmZiB9LCB7IGVhc2luZzogXCJzbW9vdGhcIiB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNob3coKTogdm9pZCB7XHJcbiAgICAgICAgZ0xvZyhcIuaYvuekuuiDjOaZr1wiKTtcclxuICAgICAgICAvLyB0aGlzLm9wYWNpdHlTaG93KDAuNCk7XHJcbiAgICAgICAgc3VwZXIuc2hvdygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGhpZGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ0xvZyhcIumakOiXj+iDjOaZr1wiKTtcclxuICAgICAgICAvLyB0aGlzLm9wYWNpdHlIaWRlKDAuNCk7XHJcbiAgICAgICAgc3VwZXIuaGlkZSgpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0ICRCYXNlVUkgZnJvbSBcIi4vQmFzZVVJXCI7XHJcbmltcG9ydCB7IGdMb2cgfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuaW1wb3J0IHsgQ2FtZWFyTWdyIH0gZnJvbSBcInptZ19jYW1lcmFfbWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWdyLCBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgeyAkVUlNb3VzZUV2ZW50IH0gZnJvbSBcIi4uL2V2ZW50cy9VSU1vdXNlRXZlbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyAkVUlNYXNrIGV4dGVuZHMgJEJhc2VVSSBpbXBsZW1lbnRzIHptZy5JTWFzayB7XHJcbiAgICBwcml2YXRlIF9tb3VzZVYyOiBjYy5WZWMyO1xyXG5cclxuICAgIHByaXZhdGUgX29wYWNpdHk6IG51bWJlciA9IDkwO1xyXG5cclxuXHJcbiAgICBwcml2YXRlIF9rZXlMaXN0OiB7IGtleTogc3RyaW5nIH1bXSA9IFtdO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgbm9kZSgpOiBjYy5Ob2RlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fbm9kZTtcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHVybDogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIodXJsKTtcclxuICAgICAgICB0aGlzLl9pc0FjdGl2ZSA9IGZhbHNlO1xyXG5cclxuICAgICAgICBFdmVudE1nci5vbihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfREVTVE9SWSwgdGhpcy5vblNjZW5lU3RhcnQsIHRoaXMsIGZhbHNlKTtcclxuICAgIH1cclxuICAgIGRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfREVTVE9SWSwgdGhpcy5vblNjZW5lU3RhcnQsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblNjZW5lU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvdyhrZXk/OiBzdHJpbmcsIG9wYWNpdHk/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBrZXkgPSBrZXkgPyBrZXkgOiBcIm1hc2tcIjtcclxuICAgICAgICB2YXIgaTogbnVtYmVyO1xyXG4gICAgICAgIHZhciBpbmRleDogbnVtYmVyID0gLTE7XHJcbiAgICAgICAgdmFyIGxlbjogbnVtYmVyID0gdGhpcy5fa2V5TGlzdC5sZW5ndGg7XHJcbiAgICAgICAgaWYgKG9wYWNpdHkgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9vcGFjaXR5ID0gb3BhY2l0eTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9vcGFjaXR5ID0gOTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0T3BhY2l0eSh0aGlzLl9vcGFjaXR5KTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX2tleUxpc3RbaV0ua2V5ID09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpbmRleCA9PSAtMSkge1xyXG4gICAgICAgICAgICB0aGlzLl9rZXlMaXN0LnB1c2goeyBrZXk6IGtleSB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGdMb2coXCLmmL7npLrmk43kvZzpga7nvalcIik7XHJcbiAgICAgICAgc3VwZXIuc2hvdygpO1xyXG4gICAgICAgIHRoaXMuYWRkTW91c2VFdmVudHMoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBoaWRlKGtleT86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChrZXkpIHtcclxuICAgICAgICAgICAgdmFyIGk6IG51bWJlcjtcclxuICAgICAgICAgICAgdmFyIGluZGV4OiBudW1iZXIgPSAtMTtcclxuICAgICAgICAgICAgdmFyIGxlbjogbnVtYmVyID0gdGhpcy5fa2V5TGlzdC5sZW5ndGg7XHJcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2tleUxpc3RbaV0ua2V5ID09IGtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9rZXlMaXN0LnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fa2V5TGlzdC5sZW5ndGggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuX2tleUxpc3QubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGdMb2coXCLpmpDol4/mk43kvZzpga7nvalcIik7XHJcbiAgICAgICAgICAgIHN1cGVyLmhpZGUoKTtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVNb3VzZUV2ZW50cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiDpgI/mmI7luqZcclxuICAgICovXHJcbiAgICBwdWJsaWMgc2V0T3BhY2l0eSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm9wYWNpdHkgPSB0aGlzLl9vcGFjaXR5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Db21wbGV0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUub3BhY2l0eSA9IHRoaXMuX29wYWNpdHk7XHJcbiAgICAgICAgc3VwZXIub25Db21wbGV0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBhZGRNb3VzZUV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICB2YXIgY2FudmFzOiBjYy5Ob2RlID0gdGhpcy5ub2RlO1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgY2FudmFzLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmUsIHRoaXMsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5LuFcGPlubPlj7DpnIDopoFcclxuICAgICAgICAgICAgLy8gY2MuQ2FudmFzLmluc3RhbmNlLnNjaGVkdWxlKHRoaXMub25UaW1lQ2hlY2suYmluZCh0aGlzKSwgVUlNb3VzZS5DSEVDS19USU1FKTtcclxuICAgICAgICAgICAgLy8gY2FudmFzLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlRW50ZXIsIHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICAvLyBjYW52YXMub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCB0aGlzLm9uTW91c2VMZXZlbCwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNhbnZhcy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9NT1ZFLCB0aGlzLm9uTW91c2VNb3ZlLCB0aGlzLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FudmFzLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzLCB0cnVlKTtcclxuICAgICAgICBjYW52YXMub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzLCB0cnVlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCByZW1vdmVNb3VzZUV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICB2YXIgY2FudmFzOiBjYy5Ob2RlID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGU7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICBjYW52YXMub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmUsIHRoaXMsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5LuFcGPlubPlj7DpnIDopoFcclxuICAgICAgICAgICAgLy8gY2MuQ2FudmFzLmluc3RhbmNlLnNjaGVkdWxlKHRoaXMub25UaW1lQ2hlY2suYmluZCh0aGlzKSwgVUlNb3VzZS5DSEVDS19USU1FKTtcclxuICAgICAgICAgICAgLy8gY2FudmFzLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlRW50ZXIsIHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICAvLyBjYW52YXMub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCB0aGlzLm9uTW91c2VMZXZlbCwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNhbnZhcy5vZmYoY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTU9WRSwgdGhpcy5vbk1vdXNlTW92ZSwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhbnZhcy5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMsIHRydWUpO1xyXG4gICAgICAgIGNhbnZhcy5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzLCB0cnVlKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2NyZWVuVG9Xb3JsZFBvaW50KHNjcmVlblBvc2l0aW9uOiBjYy5WZWMyIHwgY2MuVmVjMyk6IGNjLlZlYzIge1xyXG4gICAgICAgIGxldCBwb3MgPSBjYy52MihzY3JlZW5Qb3NpdGlvbi54LCBzY3JlZW5Qb3NpdGlvbi55KVxyXG4gICAgICAgIGxldCBjYW1lYXIgPSBDYW1lYXJNZ3IuZ2V0TWFpbigpXHJcbiAgICAgICAgaWYgKGNhbWVhcikge1xyXG4gICAgICAgICAgICBsZXQgd29ybGRQb2ludCA9IGNhbWVhci5nZXRTY3JlZW5Ub1dvcmxkUG9pbnQocG9zKVxyXG4gICAgICAgICAgICBwb3MgPSBjYy52Mih3b3JsZFBvaW50LngsIHdvcmxkUG9pbnQueSlcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBvc1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Ub3VjaE1vdmUoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2lzQWN0aXZlKSByZXR1cm5cclxuICAgICAgICB0aGlzLl9tb3VzZVYyID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICB0aGlzLl9tb3VzZVYyID0gdGhpcy5nZXRTY3JlZW5Ub1dvcmxkUG9pbnQodGhpcy5fbW91c2VWMilcclxuICAgICAgICBsZXQgZXZ0OiAkVUlNb3VzZUV2ZW50ID0gJFVJTW91c2VFdmVudC5jcmVhdGUoRXZlbnROYW1lLlVJX01BU0tfVE9VQ0hfTU9WRSwgdGhpcy5fbW91c2VWMik7XHJcbiAgICAgICAgRXZlbnRNZ3IuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Nb3VzZUVudGVyKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1vdXNlTW92ZShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNBY3RpdmUpIHJldHVyblxyXG4gICAgICAgIHRoaXMuX21vdXNlVjIgPSBldmVudC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuX21vdXNlVjIgPSB0aGlzLmdldFNjcmVlblRvV29ybGRQb2ludCh0aGlzLl9tb3VzZVYyKVxyXG4gICAgICAgIGxldCBldnQ6ICRVSU1vdXNlRXZlbnQgPSAkVUlNb3VzZUV2ZW50LmNyZWF0ZShFdmVudE5hbWUuVUlfTUFTS19NT1ZFLCB0aGlzLl9tb3VzZVYyKTtcclxuICAgICAgICBFdmVudE1nci5kaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRvdWNoRW5kKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pc0FjdGl2ZSkgcmV0dXJuXHJcbiAgICAgICAgdGhpcy5fbW91c2VWMiA9IGV2ZW50LmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5fbW91c2VWMiA9IHRoaXMuZ2V0U2NyZWVuVG9Xb3JsZFBvaW50KHRoaXMuX21vdXNlVjIpXHJcbiAgICAgICAgbGV0IGV2dDogJFVJTW91c2VFdmVudCA9ICRVSU1vdXNlRXZlbnQuY3JlYXRlKEV2ZW50TmFtZS5VSV9NQVNLX0RPV04sIHRoaXMuX21vdXNlVjIpO1xyXG4gICAgICAgIEV2ZW50TWdyLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVG91Y2hTdGFydChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5faXNBY3RpdmUpIHJldHVyblxyXG4gICAgICAgIHRoaXMuX21vdXNlVjIgPSBldmVudC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuX21vdXNlVjIgPSB0aGlzLmdldFNjcmVlblRvV29ybGRQb2ludCh0aGlzLl9tb3VzZVYyKVxyXG4gICAgICAgIGxldCBldnQ6ICRVSU1vdXNlRXZlbnQgPSAkVUlNb3VzZUV2ZW50LmNyZWF0ZShFdmVudE5hbWUuVUlfTUFTS19VUCwgdGhpcy5fbW91c2VWMik7XHJcbiAgICAgICAgRXZlbnRNZ3IuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgQ29uZmlnTWdyIH0gZnJvbSBcInptZ19jb25maWdfbWdyXCI7XHJcbmltcG9ydCB7ICRVSUV2ZW50IH0gZnJvbSBcIi4uL2V2ZW50cy9VSUV2ZW50XCI7XHJcbmltcG9ydCAkQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiO1xyXG5cclxuY2xhc3MgQmFzZVRvYXN0IGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuICAgIHByaXZhdGUgX21zZzogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBnZXQgaXNBY3RpdmUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5hY3RpdmU7XHJcbiAgICB9XHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICBjYy5nYW1lW1wiZnVsbEZyYW1lUmF0aW9cIl0gJiYgY2MuZ2FtZVtcImZ1bGxGcmFtZVJhdGlvXCJdKCk7XHJcbiAgICB9XHJcbiAgICBvbkRpc2FibGUoKSB7XHJcbiAgICAgICAgY2MuZ2FtZVtcInJlY292ZXJGcmFtZVJhdGlvXCJdICYmIGNjLmdhbWVbXCJyZWNvdmVyRnJhbWVSYXRpb1wiXSgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBsYWJlbCgpOiBjYy5MYWJlbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvdyhtc2c6IHN0cmluZywgdGltZTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGxhYiA9IHRoaXMubGFiZWw7XHJcbiAgICAgICAgdGhpcy5fbXNnID0gbXNnO1xyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIGlmIChsYWIpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNjYWxlID0gMDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGxhYi5zdHJpbmcgPSBtc2c7XHJcbiAgICAgICAgICAgIGxldCBoZWlnaHQ6IG51bWJlciA9IGNjLnZpc2libGVSZWN0LmhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnkgPSAtaGVpZ2h0IC8gMiAtIDUwO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50bygwLjMsIHsgeTogLWhlaWdodCAvIDIgKyAxMjAsIHNjYWxlOiAxIH0sIHsgZWFzaW5nOiBcInNtb290aFwiIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgICAgICB0aGlzLnNjaGVkdWxlT25jZSgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgYmcgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiZ1wiKTtcclxuICAgICAgICAgICAgICAgIGJnICYmIChiZy53aWR0aCA9IE1hdGgubWluKE1hdGgubWF4KHRoaXMubGFiZWwubm9kZS53aWR0aCwgMjgwKSwgNjAwKSArIDMwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVPbmNlKHRoaXMuaGlkZS5iaW5kKHRoaXMsIGZhbHNlKSwgdGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGhpZGUobm93PzogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5ub2RlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudW5zY2hlZHVsZUFsbENhbGxiYWNrcygpO1xyXG4gICAgICAgIGlmICh0aGlzLmxhYmVsKSB7XHJcbiAgICAgICAgICAgIGlmIChub3cpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxldCBoZWlnaHQ6IG51bWJlciA9IGNjLnZpc2libGVSZWN0LmhlaWdodDtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy5ub2RlKS50bygwLjMsIHsgc2NhbGU6IDAsIHk6IC1oZWlnaHQgLyAyIC0gNTAgfSwgeyBlYXNpbmc6IFwic21vb3RoXCIgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgbGV0IGhlaWdodDogbnVtYmVyID0gY2MudmlzaWJsZVJlY3QuaGVpZ2h0O1xyXG4gICAgICAgIHRoaXMubm9kZS54ID0gMDtcclxuICAgICAgICB0aGlzLm5vZGUueSA9IC1oZWlnaHQgLyAyIC0gNTA7XHJcbiAgICAgICAgdGhpcy5sYWJlbC5zdHJpbmcgPSB0aGlzLl9tc2c7XHJcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubm9kZS5zY2FsZSA9IDA7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgX1RvYXN0TWdyIGV4dGVuZHMgJEJhc2VVSSBpbXBsZW1lbnRzIHptZy5JVG9hc3RNZ3Ige1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogX1RvYXN0TWdyO1xyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6IF9Ub2FzdE1nciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfVG9hc3RNZ3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBERUZBVUxUX1RJTUU6IG51bWJlciA9IDM7XHJcbiAgICBwcml2YXRlIF90b2FzdHM6IEJhc2VUb2FzdFtdO1xyXG4gICAgcHJpdmF0ZSBfcHJlZmFiOiBjYy5QcmVmYWI7XHJcbiAgICBwdWJsaWMgaW5pdCh1cmw6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyLmluaXQodXJsKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGNjLmlzVmFsaWQodGhpcy5ub2RlKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlTm9kZShwcmU6IGNjLlByZWZhYik6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5ub2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5ncm91cCA9IFwiVUlcIjtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLm5hbWUgPSBcInRvYXN0Tm9kZVwiO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggPSBDb25maWdNZ3IuYXBwY29uZmlnLmZyYW1lV2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5oZWlnaHQgPSBDb25maWdNZ3IuYXBwY29uZmlnLmZyYW1lSGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl90YXJnZXQgPSB0aGlzLm5vZGUuYWRkQ29tcG9uZW50KGNjLkNvbXBvbmVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3ByZWZhYiA9IHByZTtcclxuICAgICAgICB0aGlzLm9uTG9hZCgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRUb2FzdCgpOiBCYXNlVG9hc3Qge1xyXG4gICAgICAgIGlmICghdGhpcy5fcHJlZmFiKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGk6IG51bWJlcjtcclxuICAgICAgICBsZXQgbGVuOiBudW1iZXIgPSB0aGlzLl90b2FzdHMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3RvYXN0c1tpXS5pc0FjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RvYXN0c1tpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobGVuIDwgMykge1xyXG4gICAgICAgICAgICBsZXQgbjogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHRoaXMuX3ByZWZhYik7XHJcbiAgICAgICAgICAgIGxldCB0OiBCYXNlVG9hc3QgPSBuLmFkZENvbXBvbmVudChCYXNlVG9hc3QpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuYWRkQ2hpbGQobik7XHJcbiAgICAgICAgICAgIHRoaXMuX3RvYXN0cy5wdXNoKHQpO1xyXG4gICAgICAgICAgICByZXR1cm4gdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvYXN0c1tsZW4gLSAxXTtcclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fdG9hc3RzID0gW107XHJcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb3Blbihtc2c6IHN0cmluZywgdGltZTogbnVtYmVyID0gX1RvYXN0TWdyLkRFRkFVTFRfVElNRSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoZmFsc2UpO1xyXG4gICAgICAgIGxldCB0OiBCYXNlVG9hc3QgPSB0aGlzLmdldFRvYXN0KCk7XHJcbiAgICAgICAgdC5zaG93KG1zZywgdGltZSk7XHJcbiAgICAgICAgbGV0IGV2dDogJFVJRXZlbnQgPSBuZXcgJFVJRXZlbnQoJFVJRXZlbnQuVE9BU1RfU0hPVyk7XHJcbiAgICAgICAgZXZ0LnRhcmdldCA9IHQ7XHJcbiAgICAgICAgdGhpcy5ub2RlLmRpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjbG9zZShub3c/OiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGk6IG51bWJlclxyXG4gICAgICAgIGxldCBsZW46IG51bWJlciA9IHRoaXMuX3RvYXN0cy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RvYXN0c1tpXS5oaWRlKG5vdyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImV4cG9ydCBlbnVtIEVVSVppbmRleCB7XHJcbiAgICBCRyA9IDIsXHJcbiAgICBNQVNLID0gMyxcclxuICAgIHVpTGF5ZXIgPSA0LFxyXG4gICAgTG9hZGluZyA9IDUsXHJcbiAgICBCQUNLQlROID0gMTAwLFxyXG4gICAgQUxFUlQgPSAxMDEsXHJcbiAgICBUT0FTVCA9IDEwMixcclxuICAgIE9USEVSVUkgPSAxMDMsXHJcbiAgICBUUkFOU0lUSU9OUyA9IDEwNFxyXG59IiwiaW1wb3J0IHsgRXZlbnRNZ3IsIEV2ZW50TmFtZSB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XHJcbmltcG9ydCB7IGdMb2cgfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3JFdmVudCwgRGlyZWN0b3JNZ3IgfSBmcm9tIFwiem1nX2NvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgRm9udE1nciB9IGZyb20gXCJ6bWdfdWlfbWdyXCI7XHJcbmltcG9ydCAkQmFzZVVJIGZyb20gXCIuL0Jhc2VVSVwiO1xyXG5pbXBvcnQgeyAkVUlFdmVudCB9IGZyb20gXCIuLi9ldmVudHMvVUlFdmVudFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzICRVSUxvYWRpbmcgZXh0ZW5kcyAkQmFzZVVJIGltcGxlbWVudHMgem1nLklMb2FkaW5nIHtcclxuXHJcbiAgICAvLyBwcml2YXRlIF9sYWJlbDogY2MuTGFiZWw7XHJcbiAgICBwcml2YXRlIF9wcm9Ob2RlOiBjYy5Ob2RlO1xyXG4gICAgcHJpdmF0ZSBfZWZmZWN0Tm9kZTogY2MuTm9kZTtcclxuICAgIC8vIHByaXZhdGUgX3p4bTogY2MuTm9kZTtcclxuICAgIC8vIHByaXZhdGUgX2RkeDogY2MuTm9kZTtcclxuICAgIC8vIHByaXZhdGUgX21tdDogY2MuTm9kZTtcclxuICAgIHB1YmxpYyBnZXQgcmVzKCk6IHptZy5JUmVzQXNzZXQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXM7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZywgcGFyZW50OiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgc3VwZXIodXJsKTtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzaG93UHJvZ3Jlc3MoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3Byb05vZGUgJiYgdGhpcy5fcHJvTm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5fcHJvTm9kZS5wYXJlbnQuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fZWZmZWN0Tm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZVByb2dyZXNzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9wcm9Ob2RlICYmIHRoaXMuX3Byb05vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Byb05vZGUucGFyZW50LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLl9lZmZlY3ROb2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0UHJvZ3Jlc3ModmFsdWU6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2hvd1Byb2dyZXNzKCk7XHJcbiAgICAgICAgdmFsdWUgPSBNYXRoLm1heChNYXRoLm1pbigxLCB2YWx1ZSksIDApO1xyXG4gICAgICAgIGxldCB0b3RhbCA9IHRoaXMuX3Byb05vZGUucGFyZW50LndpZHRoIC0gNjtcclxuICAgICAgICB0aGlzLl9lZmZlY3ROb2RlLndpZHRoID0gdGhpcy5fcHJvTm9kZS53aWR0aCA9IE1hdGgubWF4KE1hdGgubWluKHRvdGFsICogdmFsdWUpLCAzMik7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLm5vZGUud2lkdGggPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aDtcclxuICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUuaGVpZ2h0O1xyXG4gICAgICAgIC8vIHRoaXMuX3p4bSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcInp4bVwiKTtcclxuICAgICAgICAvLyB0aGlzLl9kZHggPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJkZHhcIik7XHJcbiAgICAgICAgLy8gdGhpcy5fbW10ID0gdGhpcy5ub2RlLmdldENoaWxkQnlOYW1lKFwibW10XCIpO1xyXG4gICAgICAgIHRoaXMuX3Byb05vZGUgPSB0aGlzLm5vZGUuZ2V0Q2hpbGRCeU5hbWUoXCJiYXJcIikuZ2V0Q2hpbGRCeU5hbWUoXCJwcm9cIik7XHJcbiAgICAgICAgdGhpcy5fZWZmZWN0Tm9kZSA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImVmZmVjdFwiKTtcclxuICAgICAgICAvLyB0aGlzLl9sYWJlbCA9IHRoaXMubm9kZS5nZXRDaGlsZEJ5TmFtZShcImxhYmVsXCIpLmdldENvbXBvbmVudChjYy5MYWJlbCk7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9ncmVzcygwKTtcclxuICAgICAgICB0aGlzLm9uQ29tcGxldGUoKTtcclxuICAgICAgICB0aGlzLnNob3coKTtcclxuICAgICAgICBpZiAoRm9udE1nci5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25Gb250UmVhZHkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBFdmVudE1nci5vbmNlKEV2ZW50TmFtZS5VSV9GT05UX1JFQURZLCB0aGlzLm9uRm9udFJlYWR5LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uRm9udFJlYWR5KCk6IHZvaWQge1xyXG4gICAgICAgIEZvbnRNZ3IudXBkYXRlRm9udCh0aGlzLm5vZGUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNob3coKTogdm9pZCB7XHJcbiAgICAgICAgZ0xvZyhcIuaYvuekuuiDjOaZr1wiKTtcclxuICAgICAgICAvLyB0aGlzLl9sYWJlbC5ub2RlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgLy8gdGhpcy5zY2FsZVNob3coMC43KTtcclxuICAgICAgICAvLyB0aGlzLm5vZGUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvLyB0aGlzLnNjYWxlU2hvdygwLjcsIHRoaXMuX3p4bSk7XHJcbiAgICAgICAgLy8gdGhpcy5zY2FsZVNob3coMC43LCB0aGlzLl9kZHgpO1xyXG4gICAgICAgIC8vIHRoaXMuc2NhbGVTaG93KDAuNywgdGhpcy5fbW10KTtcclxuICAgICAgICBpZiAodGhpcy5ub2RlICYmIHRoaXMuX3BhcmVudCAmJiAhdGhpcy5ub2RlLnBhcmVudCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UGFyZW50KHRoaXMuX3BhcmVudCk7XHJcbiAgICAgICAgICAgIEV2ZW50TWdyLmRpc3BhdGNoRXZlbnQobmV3ICRVSUV2ZW50KCRVSUV2ZW50LkxPQURfU0hPVykpO1xyXG4gICAgICAgICAgICBEaXJlY3Rvck1nci5vbihEaXJlY3RvckV2ZW50LlNDRU5FX0NIQU5HRV9QUk9HUkVTUywgdGhpcy5vbkRpcmVjdFByb2dyZXNzLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgIGdMb2coXCLpmpDol49Mb2FkaW5nXCIpO1xyXG4gICAgICAgIC8vIHRoaXMuc2NhbGVIaWRlKDAuNyk7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5oaWRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgLy8gdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAvLyB0aGlzLl9sYWJlbC5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0UGFyZW50KG51bGwpO1xyXG4gICAgICAgICAgICBFdmVudE1nci5kaXNwYXRjaEV2ZW50KG5ldyAkVUlFdmVudCgkVUlFdmVudC5MT0FEX0hJREUpKTtcclxuICAgICAgICAgICAgRGlyZWN0b3JNZ3Iub2ZmKERpcmVjdG9yRXZlbnQuU0NFTkVfQ0hBTkdFX1BST0dSRVNTLCB0aGlzLm9uRGlyZWN0UHJvZ3Jlc3MsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkRpcmVjdFByb2dyZXNzKGV2dDogRGlyZWN0b3JFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0UHJvZ3Jlc3MoZXZ0LnByb2dyZXNzKTtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgJEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyAkVUlUcmFuc2l0aW9ucyBleHRlbmRzICRCYXNlVUkgaW1wbGVtZW50cyB6bWcuSVRyYW5zaXRpb25zIHtcclxuICAgIHByaXZhdGUgX3RyYW5zaXRvbnM6IHptZy5JVHJhbnNpdGlvbnM7XHJcbiAgICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZywgcGFyZW50OiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgc3VwZXIodXJsKTtcclxuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvdygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMubm9kZS5wYXJlbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFBhcmVudCh0aGlzLl9wYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBoaWRlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLm5vZGUucGFyZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5zZXRQYXJlbnQobnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcnVuU2NlbmUoYnVuTmFtZTogc3RyaW5nLCBzY2VuZVVybDogc3RyaW5nLCBvblNjZW5lTG9hZGVkOiBGdW5jdGlvbiwgb25UcmFuc2l0aW9uRmluaXNoZWQ6IEZ1bmN0aW9uLCBjb2xvcjogY2MuQ29sb3IsIG1vdmllQ2xpcDogY2MuTm9kZSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl90cmFuc2l0b25zKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0b25zLnJ1blNjZW5lKGJ1bk5hbWUsIHNjZW5lVXJsLCBvblNjZW5lTG9hZGVkLCBvblRyYW5zaXRpb25GaW5pc2hlZCwgY29sb3IsIG1vdmllQ2xpcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZCgpIHtcclxuICAgICAgICBsZXQgY29tcHM6IGNjLkNvbXBvbmVudFtdID0gdGhpcy5ub2RlLmdldENvbXBvbmVudHMoY2MuQ29tcG9uZW50KTtcclxuICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZW46IG51bWJlciA9IGNvbXBzLmxlbmd0aDtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNvbXBzW2ldW1wicnVuU2NlbmVcIl0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zaXRvbnMgPSAoY29tcHNbaV0gYXMgYW55KSBhcyB6bWcuSVRyYW5zaXRpb25zO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlKCk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBBdWRpb01nciB9IGZyb20gXCJ6bWdfYXVkaW9fbWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWdyLCBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgJEJhc2VVSSBmcm9tIFwiem1nX3VpX21nci9zcmMvc3lzdWkvQmFzZVVJXCI7XHJcbmltcG9ydCB7ICRVSUJhY2tFdmVudCB9IGZyb20gXCIuLi9ldmVudHMvVUlCYWNrRXZlbnRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyAkVUlCYWNrQnRuIGV4dGVuZHMgJEJhc2VVSSBpbXBsZW1lbnRzIHptZy5JQmFja0J0biB7XHJcbiAgICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKHVybCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvdygpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5zaG93KCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaGlkZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5oaWRlKCk7XHJcbiAgICB9XHJcbiAgICBhZGRFdmVudHMoKSB7XHJcbiAgICAgICAgc3VwZXIuYWRkRXZlbnRzKCk7XHJcbiAgICAgICAgdGhpcy5ub2RlLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub24oRXZlbnROYW1lLkNPTlRST0xMRVJfQ0hBTkdFX1NUQVJULCB0aGlzLm9uU2NlbmVTdGFydCwgdGhpcywgZmFsc2UpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbW92ZUV2ZW50cygpIHtcclxuICAgICAgICBzdXBlci5yZW1vdmVFdmVudHMoKTtcclxuICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub2ZmKEV2ZW50TmFtZS5DT05UUk9MTEVSX0NIQU5HRV9TVEFSVCwgdGhpcy5vblNjZW5lU3RhcnQsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblNjZW5lU3RhcnQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZXNldFN0eWxlKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uVG91Y2hFbmQoKTogdm9pZCB7XHJcbiAgICAgICAgQXVkaW9NZ3IuY2xpY2soKTtcclxuICAgICAgICBFdmVudE1nci5kaXNwYXRjaEV2ZW50KG5ldyAkVUlCYWNrRXZlbnQoKSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBFdmVudE1nciwgRXZlbnROYW1lIH0gZnJvbSBcInptZ19ldmVudF9tZ3JcIjtcclxuaW1wb3J0IHsgRHJhZ29uUmVzQXNzZXQsIERyYWdvblJlc0xpc3RlbmVyLCBSZXNMaXN0ZW5lciwgUmVzTWdyIH0gZnJvbSBcInptZ19yZXNfbWdyXCI7XHJcbmltcG9ydCB7IERyYWdvbkFzc2V0LCBOb2RlVXRpbCB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5pbXBvcnQgeyBBdWRpb01nciB9IGZyb20gXCJ6bWdfYXVkaW9fbWdyXCI7XHJcbmltcG9ydCB7ICRVSU1vdXNlRXZlbnQgfSBmcm9tIFwiLi4vZXZlbnRzL1VJTW91c2VFdmVudFwiO1xyXG5pbXBvcnQgeyBVSU1nciB9IGZyb20gXCJ6bWdfdWlfbWdyXCI7XHJcbmltcG9ydCB7IENhbWVhck1nciB9IGZyb20gXCJ6bWdfY2FtZXJhX21nclwiXHJcblxyXG5leHBvcnQgY2xhc3MgJFVJTW91c2UgZXh0ZW5kcyBjYy5FdmVudFRhcmdldCBpbXBsZW1lbnRzIHptZy5JTW91c2Uge1xyXG4gICAgc3RhdGljIENIRUNLX1RJTUU6IG51bWJlciA9IDAuMztcclxuICAgIC8v5bi46KeE56e75Yqo54q25oCBXHJcbiAgICBwcml2YXRlIF9ub3JtYWw6IHN0cmluZztcclxuICAgIC8v5b6F54K55Ye754q25oCBXHJcbiAgICBwcml2YXRlIF9saW5rOiBzdHJpbmc7XHJcbiAgICAvL+eCueWHu+aRgeS4i+eKtuaAgVxyXG4gICAgcHJpdmF0ZSBfdW5hdmFpbGFibGU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2VmZmVjdDogem1nLklSZXNBc3NldCA9IHsgYnVuTmFtZTogXCJcIiwgcGF0aDogXCJcIiB9O1xyXG4gICAgcHJpdmF0ZSBfc291bmQ6IHptZy5JUmVzQXNzZXQgPSB7IGJ1bk5hbWU6IFwiXCIsIHBhdGg6IFwiXCIgfTtcclxuICAgIHByaXZhdGUgX2ROb3JtYWw6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2RMaW5rOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIF9kVW5hdmFpbGFibGU6IHN0cmluZztcclxuICAgIHByaXZhdGUgX2RFZmZlY3Q6IHtcclxuICAgICAgICBidW5OYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgcGF0aDogc3RyaW5nO1xyXG4gICAgfTtcclxuICAgIHByaXZhdGUgX2FjdGl2ZTogYm9vbGVhbiA9IHRydWVcclxuICAgIHByaXZhdGUgX21vdXNlVjI6IGNjLlZlYzI7XHJcbiAgICBwcml2YXRlIF9pc01vdXNlRG93bjogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX3NvdW5kQ2xpcDogY2MuQXVkaW9DbGlwO1xyXG4gICAgcHJpdmF0ZSBfZWZmZWN0RHJhZ29uOiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXk7XHJcbiAgICBwdWJsaWMgZ2V0IG1vdXNlVjIoKTogY2MuVmVjMiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX21vdXNlVjI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzTW91c2VEb3duKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc01vdXNlRG93bjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgYWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3RpdmVcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgYWN0aXZlKHM6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9hY3RpdmUgPSBzXHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihub3JtYWw6IHN0cmluZywgbGluazogc3RyaW5nLCB1bmF2YWlsYWJsZTogc3RyaW5nLCBlZmZlY3Q6IHptZy5JUmVzQXNzZXQsIHNvdW5kOiB6bWcuSVJlc0Fzc2V0KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnN0YXJ0KCk7XHJcbiAgICAgICAgdGhpcy5fZEVmZmVjdCA9IGVmZmVjdDtcclxuICAgICAgICB0aGlzLnNldFNvdW5kKHNvdW5kKTtcclxuICAgICAgICB0aGlzLnNldEVmZmVjdChlZmZlY3QpO1xyXG4gICAgICAgIHRoaXMuX21vdXNlVjIgPSBuZXcgY2MuVmVjMigpO1xyXG4gICAgICAgIHRoaXMuc2V0RGVmYXVsdFN0eWxlKG5vcm1hbCwgbGluaywgdW5hdmFpbGFibGUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIOWIneWni+WMllxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBzdGFydCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgZWZmZWN0Tm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgZWZmZWN0Tm9kZS5ncm91cCA9IFwiVUlcIjtcclxuICAgICAgICBlZmZlY3ROb2RlLnpJbmRleCA9IGNjLm1hY3JvLk1BWF9aSU5ERVg7XHJcbiAgICAgICAgdGhpcy5fZWZmZWN0RHJhZ29uID0gZWZmZWN0Tm9kZS5hZGRDb21wb25lbnQoZHJhZ29uQm9uZXMuQXJtYXR1cmVEaXNwbGF5KTtcclxuICAgICAgICBFdmVudE1nci5vbihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfREVTVE9SWSwgdGhpcy5vbkNhbnZhc0Rlc3RvcnksIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICBFdmVudE1nci5vbihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfRU5ELCB0aGlzLm9uQ2FudmFzRW5kLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgLy8gY2MuZ2FtZS5hZGRQZXJzaXN0Um9vdE5vZGUoZWZmZWN0Tm9kZSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIGxpbmsg54K55Ye754q25oCBXHJcbiAgICAgKiBAcGFyYW0gbm9ybWFsIOW4uOinhOenu+WKqOeKtuaAgVxyXG4gICAgICogQHBhcmFtIHVuYXZhaWxhYmxlIOeCueWHu+aRgeS4i+eKtuaAgVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0U3R5bGUobm9ybWFsOiBzdHJpbmcsIGxpbms6IHN0cmluZywgdW5hdmFpbGFibGU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX25vcm1hbCA9IG5vcm1hbDtcclxuICAgICAgICB0aGlzLl9saW5rID0gbGluaztcclxuICAgICAgICB0aGlzLl91bmF2YWlsYWJsZSA9IHVuYXZhaWxhYmxlO1xyXG4gICAgICAgIHRoaXMuc2V0TW91c2VTdHlsZSh0aGlzLl9ub3JtYWwpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldERlZmF1bHRTdHlsZShub3JtYWw6IHN0cmluZywgbGluazogc3RyaW5nLCB1bmF2YWlsYWJsZTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fZE5vcm1hbCA9IG5vcm1hbDtcclxuICAgICAgICB0aGlzLl9kTGluayA9IGxpbms7XHJcbiAgICAgICAgdGhpcy5fZFVuYXZhaWxhYmxlID0gdW5hdmFpbGFibGU7XHJcbiAgICAgICAgdGhpcy5zZXRTdHlsZShub3JtYWwsIGxpbmssIHVuYXZhaWxhYmxlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXROb3JtYWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRNb3VzZVN0eWxlKHRoaXMuX25vcm1hbCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0TGluaygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldE1vdXNlU3R5bGUodGhpcy5fbGluayk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0VW5hdmFpbGFibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5zZXRNb3VzZVN0eWxlKHRoaXMuX3VuYXZhaWxhYmxlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRFZmZlY3QoZWZmZWN0OiB6bWcuSVJlc0Fzc2V0KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCFlZmZlY3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKGVmZmVjdC5idW5OYW1lID09IHRoaXMuX2VmZmVjdC5idW5OYW1lICYmIGVmZmVjdC5wYXRoID09IHRoaXMuX2VmZmVjdC5wYXRoKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2VmZmVjdC5idW5OYW1lID0gZWZmZWN0LmJ1bk5hbWU7XHJcbiAgICAgICAgdGhpcy5fZWZmZWN0LnBhdGggPSBlZmZlY3QucGF0aDtcclxuICAgICAgICBSZXNNZ3IubG9hZERyYWdvbihlZmZlY3QuYnVuTmFtZSwgbmV3IERyYWdvblJlc0Fzc2V0KGVmZmVjdC5wYXRoKSwgbmV3IERyYWdvblJlc0xpc3RlbmVyKHRoaXMsIChhc3NldDogRHJhZ29uQXNzZXQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fZWZmZWN0RHJhZ29uID0gTm9kZVV0aWwuY3JlYXRlRHJhZ29uKGFzc2V0LCB0aGlzLl9lZmZlY3REcmFnb24ubm9kZSwgXCJtb3VzZUVmZmVjdFwiKTtcclxuICAgICAgICAgICAgdGhpcy5fZWZmZWN0RHJhZ29uLmFkZEV2ZW50TGlzdGVuZXIoZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuQ09NUExFVEUsIHRoaXMuaGlkZUVmZmVjdERyYWdvbiwgdGhpcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VmZmVjdERyYWdvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH0pKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRTb3VuZChzb3VuZDogem1nLklSZXNBc3NldCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghc291bmQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoKHNvdW5kLmJ1bk5hbWUgPT0gdGhpcy5fc291bmQuYnVuTmFtZSAmJiBzb3VuZC5wYXRoID09IHRoaXMuX3NvdW5kLnBhdGgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgUmVzTWdyLmxvYWRSZXMoc291bmQsIG5ldyBSZXNMaXN0ZW5lcih0aGlzLCAoYXNzZXQ6IGNjLkF1ZGlvQ2xpcCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLl9zb3VuZENsaXAgPSBhc3NldDtcclxuICAgICAgICB9KSwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOi/mOWOn+m7mOiupOagt+W8j1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVzZXRTdHlsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldEVmZmVjdCh0aGlzLl9kRWZmZWN0KTtcclxuICAgICAgICB0aGlzLnNldFN0eWxlKHRoaXMuX2ROb3JtYWwsIHRoaXMuX2RMaW5rLCB0aGlzLl9kVW5hdmFpbGFibGUpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIOaYr+WQpuWIneWni+WMluWujOavlVxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiDplIDmr4FcclxuICAgICovXHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgY2FudmFzOiBjYy5Ob2RlID0gY2MuQ2FudmFzLmluc3RhbmNlLm5vZGU7XHJcbiAgICAgICAgaWYgKGNjLnN5cy5pc01vYmlsZSkge1xyXG4gICAgICAgICAgICBVSU1nci5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uVG91Y2hNb3ZlLCB0aGlzLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBVSU1nci5ub2RlLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9NT1ZFLCB0aGlzLm9uTW91c2VNb3ZlLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfREVTVE9SWSwgdGhpcy5vbkNhbnZhc0Rlc3RvcnksIHRoaXMpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfRU5ELCB0aGlzLm9uQ2FudmFzRW5kLCB0aGlzKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25DYW52YXNEZXN0b3J5KCk6IHZvaWQge1xyXG4gICAgICAgIHZhciBjYW52YXM6IGNjLk5vZGUgPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZTtcclxuICAgICAgICBpZiAoY2Muc3lzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgIFVJTWdyLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmUsIHRoaXMsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5LuFcGPlubPlj7DpnIDopoFcclxuICAgICAgICAgICAgLy8gY2MuQ2FudmFzLmluc3RhbmNlLnNjaGVkdWxlKHRoaXMub25UaW1lQ2hlY2suYmluZCh0aGlzKSwgVUlNb3VzZS5DSEVDS19USU1FKTtcclxuICAgICAgICAgICAgY2FudmFzLm9mZihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9FTlRFUiwgdGhpcy5vbk1vdXNlRW50ZXIsIHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICAvLyBjYW52YXMub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0xFQVZFLCB0aGlzLm9uTW91c2VMZXZlbCwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGNhbnZhcy5vZmYoY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTU9WRSwgdGhpcy5vbk1vdXNlTW92ZSwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhbnZhcy5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMsIHRydWUpO1xyXG4gICAgICAgIGNhbnZhcy5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzLCB0cnVlKTtcclxuICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLl9lZmZlY3REcmFnb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VmZmVjdERyYWdvbi5ub2RlLnNldFBhcmVudChudWxsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICog5Zy65pmv5YeG5aSH5a6M5q+VXHJcbiAgICAqIOebkeWQrOeisOaSnlxyXG4gICAgKi9cclxuICAgIHByaXZhdGUgb25DYW52YXNFbmQoKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIGNhbnZhczogY2MuTm9kZSA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlO1xyXG4gICAgICAgIGNhbnZhc1tcIl9oaXRUZXN0XCJdID0gKCkgPT4geyByZXR1cm4gdHJ1ZSB9O1xyXG4gICAgICAgIGlmIChjYy5zeXMuaXNNb2JpbGUpIHtcclxuICAgICAgICAgICAgY2FudmFzLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmUsIHRoaXMsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5LuFcGPlubPlj7DpnIDopoFcclxuICAgICAgICAgICAgLy8gY2MuQ2FudmFzLmluc3RhbmNlLnNjaGVkdWxlKHRoaXMub25UaW1lQ2hlY2suYmluZCh0aGlzKSwgVUlNb3VzZS5DSEVDS19USU1FKTtcclxuICAgICAgICAgICAgY2FudmFzLm9uKGNjLk5vZGUuRXZlbnRUeXBlLk1PVVNFX0VOVEVSLCB0aGlzLm9uTW91c2VFbnRlciwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIC8vIGNhbnZhcy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5NT1VTRV9MRUFWRSwgdGhpcy5vbk1vdXNlTGV2ZWwsIHRoaXMsIHRydWUpO1xyXG4gICAgICAgICAgICBjYW52YXMub24oY2MuTm9kZS5FdmVudFR5cGUuTU9VU0VfTU9WRSwgdGhpcy5vbk1vdXNlTW92ZSwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhbnZhcy5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZCwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgY2FudmFzLm9uKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hTdGFydCwgdGhpcywgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQodGhpcy5fZWZmZWN0RHJhZ29uKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9lZmZlY3REcmFnb24ubm9kZS5zZXRQYXJlbnQoVUlNZ3Iubm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldEVmZmVjdFBhcmVudChwYXJlbnQ6IGNjLk5vZGUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLl9lZmZlY3REcmFnb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VmZmVjdERyYWdvbi5ub2RlLnNldFBhcmVudChwYXJlbnQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRQYXJlbnQocGFyZW50OiBjYy5Ob2RlKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKGNjLmlzVmFsaWQodGhpcy5fZWZmZWN0RHJhZ29uKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9lZmZlY3REcmFnb24ubm9kZS5zZXRQYXJlbnQocGFyZW50KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGhpZGVFZmZlY3REcmFnb24oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faXNNb3VzZURvd24gPSBmYWxzZTtcclxuICAgICAgICBpZiAoY2MuaXNWYWxpZCh0aGlzLl9lZmZlY3REcmFnb24pKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2VmZmVjdERyYWdvbi5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5omL5oCn5YiH5o2i5qOA5rWLXHJcbiAgICAgKiDmo4Dmn6XpvKDmoIfmmL7npLrmiYvmgKdcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBvblRpbWVDaGVjaygpOiB2b2lkIHtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc2V0TW91c2VTdHlsZSh1cmw6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICghY2Muc3lzLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgIC8vIGdMb2coXCLorr7nva7moLflvI/vvJpcIiArIHVybCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY3Vyc29yID0gXCJ1cmwoXCIgKyB1cmwgKyBcIiksYXV0byBcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbk1vdXNlTW92ZShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5hY3RpdmUpIHJldHVyblxyXG4gICAgICAgIGlmICh0aGlzLl9pc01vdXNlRG93bikge1xyXG4gICAgICAgICAgICB0aGlzLm9uVG91Y2hNb3ZlKGV2ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvL3Bj5bmz5Y+w6byg5qCH56e75YqoXHJcbiAgICAgICAgICAgIHRoaXMuX21vdXNlVjIgPSBldmVudC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgICAgICB0aGlzLl9tb3VzZVYyID0gdGhpcy5nZXRTY3JlZW5Ub1dvcmxkUG9pbnQodGhpcy5fbW91c2VWMilcclxuICAgICAgICAgICAgbGV0IGV2dDogJFVJTW91c2VFdmVudCA9ICRVSU1vdXNlRXZlbnQuY3JlYXRlKCRVSU1vdXNlRXZlbnQuTU9VU0VfTU9WRSwgdGhpcy5fbW91c2VWMik7XHJcbiAgICAgICAgICAgIHRoaXMuZ0Rpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblRvdWNoTW92ZShldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5hY3RpdmUpIHJldHVyblxyXG4gICAgICAgIHRoaXMuX21vdXNlVjIgPSBldmVudC5nZXRMb2NhdGlvbigpO1xyXG4gICAgICAgIHRoaXMuX21vdXNlVjIgPSB0aGlzLmdldFNjcmVlblRvV29ybGRQb2ludCh0aGlzLl9tb3VzZVYyKVxyXG4gICAgICAgIGxldCBldnQ6ICRVSU1vdXNlRXZlbnQgPSAkVUlNb3VzZUV2ZW50LmNyZWF0ZSgkVUlNb3VzZUV2ZW50LlRPVUNIX01PVkUsIHRoaXMuX21vdXNlVjIpO1xyXG4gICAgICAgIHRoaXMuZ0Rpc3BhdGNoRXZlbnQoZXZ0KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uTW91c2VMZXZlbChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc01vdXNlRG93bikge1xyXG4gICAgICAgICAgICB0aGlzLl9vblRvdWNoRW5kKGV2ZW50KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldE1vdXNlU3R5bGUodGhpcy5fbGluayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbk1vdXNlRW50ZXIoZXZlbnQ6IGNjLkV2ZW50LkV2ZW50VG91Y2gpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNldE1vdXNlU3R5bGUodGhpcy5fbm9ybWFsKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Ub3VjaEVuZChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB3b3JsZHBvczogY2MuVmVjMiA9IGV2ZW50LmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgdGhpcy5fb25Ub3VjaEVuZChldmVudCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2VmZmVjdERyYWdvbiAmJiBldmVudFtcIl9kb25lXCJdKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fZWZmZWN0RHJhZ29uLm5vZGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9lZmZlY3REcmFnb24ubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdvcmxkcG9zID0gdGhpcy5nZXRTY3JlZW5Ub1dvcmxkUG9pbnQod29ybGRwb3MpXHJcbiAgICAgICAgICAgIGxldCBsb2NhbHBvcyA9IHRoaXMuX2VmZmVjdERyYWdvbi5ub2RlLnBhcmVudC5jb252ZXJ0VG9Ob2RlU3BhY2VBUih3b3JsZHBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2VmZmVjdERyYWdvbi5ub2RlLnNldFBvc2l0aW9uKGxvY2FscG9zKTtcclxuICAgICAgICAgICAgdGhpcy5fZWZmZWN0RHJhZ29uLnBsYXlBbmltYXRpb24oXCJjbGlja1wiLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9vblRvdWNoRW5kKGV2ZW50OiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZSkgcmV0dXJuXHJcbiAgICAgICAgbGV0IHdvcmxkcG9zOiBjYy5WZWMyID0gZXZlbnQuZ2V0TG9jYXRpb24oKTtcclxuICAgICAgICB0aGlzLl9pc01vdXNlRG93biA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc2V0TW91c2VTdHlsZSh0aGlzLl9ub3JtYWwpO1xyXG4gICAgICAgIHdvcmxkcG9zID0gdGhpcy5nZXRTY3JlZW5Ub1dvcmxkUG9pbnQod29ybGRwb3MpXHJcbiAgICAgICAgbGV0IGV2dDogJFVJTW91c2VFdmVudCA9ICRVSU1vdXNlRXZlbnQuY3JlYXRlKCRVSU1vdXNlRXZlbnQuTU9VU0VfVVAsIHdvcmxkcG9zKTtcclxuICAgICAgICB0aGlzLmdEaXNwYXRjaEV2ZW50KGV2dCk7XHJcbiAgICAgICAgaWYgKGV2ZW50W1wiX2RvbmVcIl0pIHtcclxuICAgICAgICAgICAgQXVkaW9NZ3IucGxheUVmZmVjdCh0aGlzLl9zb3VuZENsaXAsIG51bGwsIHRoaXMsIDEsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uVG91Y2hTdGFydChldmVudDogY2MuRXZlbnQuRXZlbnRUb3VjaCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5hY3RpdmUpIHJldHVyblxyXG4gICAgICAgIHRoaXMuX2lzTW91c2VEb3duID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNldE1vdXNlU3R5bGUodGhpcy5fdW5hdmFpbGFibGUpO1xyXG4gICAgICAgIGxldCB3b3JsZHBvczogY2MuVmVjMiA9IGV2ZW50LmdldExvY2F0aW9uKCk7XHJcbiAgICAgICAgd29ybGRwb3MgPSB0aGlzLmdldFNjcmVlblRvV29ybGRQb2ludCh3b3JsZHBvcylcclxuICAgICAgICBsZXQgZXZ0OiAkVUlNb3VzZUV2ZW50ID0gJFVJTW91c2VFdmVudC5jcmVhdGUoJFVJTW91c2VFdmVudC5NT1VTRV9ET1dOLCB3b3JsZHBvcyk7XHJcbiAgICAgICAgdGhpcy5nRGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRTY3JlZW5Ub1dvcmxkUG9pbnQoc2NyZWVuUG9zaXRpb246IGNjLlZlYzIgfCBjYy5WZWMzKTogY2MuVmVjMiB7XHJcbiAgICAgICAgbGV0IHBvcyA9IGNjLnYyKHNjcmVlblBvc2l0aW9uLngsIHNjcmVlblBvc2l0aW9uLnkpXHJcbiAgICAgICAgbGV0IGNhbWVhciA9IENhbWVhck1nci5nZXRNYWluKClcclxuICAgICAgICBpZiAoY2FtZWFyKSB7XHJcbiAgICAgICAgICAgIGxldCB3b3JsZFBvaW50ID0gY2FtZWFyLmdldFNjcmVlblRvV29ybGRQb2ludChwb3MpXHJcbiAgICAgICAgICAgIHBvcyA9IGNjLnYyKHdvcmxkUG9pbnQueCwgd29ybGRQb2ludC55KVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcG9zXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnRGlzcGF0Y2hFdmVudChldnQ6ICRVSU1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBldnQudXNlZCA9IHRydWU7XHJcbiAgICAgICAgRXZlbnRNZ3IuZGlzcGF0Y2hFdmVudChldnQpO1xyXG4gICAgICAgIGV2dC51c2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgJEJhc2VVSSBmcm9tIFwiLi9CYXNlVUlcIjtcclxuaW1wb3J0IHsgRXZlbnRNZ3IsIEV2ZW50TmFtZSB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XHJcbmltcG9ydCB7IFJlc01nciwgU3lzdGVtQnVuZGxlTmFtZSB9IGZyb20gXCJ6bWdfcmVzX21nclwiO1xyXG5pbXBvcnQgeyBDb25maWdNZ3IgfSBmcm9tIFwiem1nX2NvbmZpZ19tZ3JcIjtcclxuaW1wb3J0IHsgJFVJTWFzayB9IGZyb20gXCIuL1VJTWFza1wiO1xyXG5pbXBvcnQgeyAkUmV3YXJkTGF5ZXIgfSBmcm9tIFwiLi9VSUxheWVyL1Jld2FyZExheWVyXCI7XHJcbmltcG9ydCB7IEVVSVppbmRleCB9IGZyb20gXCIuL0VVSVppbmRleFwiO1xyXG5pbXBvcnQgeyBnTG9nLCBnV2FybiwgU3RyaW5nVXRpbCB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5pbXBvcnQgeyAkVUlFdmVudCB9IGZyb20gXCIuLi9ldmVudHMvVUlFdmVudFwiO1xyXG5pbXBvcnQgeyBDYW1lYXJNZ3IgfSBmcm9tIFwiem1nX2NhbWVyYV9tZ3JcIjtcclxuaW1wb3J0IHsgVUlNZ3IgfSBmcm9tIFwiem1nX3VpX21nclwiO1xyXG5cclxuZW51bSBFVUlMYXllclppbmRleCB7XHJcbiAgICB2aWRlbyA9IDAsXHJcbiAgICBhY3Rpdml0eSA9IDIsXHJcbiAgICB3aW5kb3cgPSAxLFxyXG4gICAgcmV3YXJkID0gMyxcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyAkVUlMYXllciBleHRlbmRzICRCYXNlVUkgaW1wbGVtZW50cyB6bWcuSUJnIHtcclxuICAgIC8qKlxyXG4gICAgICog56qX5Y+j55WM6Z2iXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3dpbmRvd3NMYXllcjogY2MuTm9kZTtcclxuXHJcbiAgICAvKipcclxuICAgICog6KeG6aKR55WM6Z2iXHJcbiAgICAqL1xyXG4gICAgcHJpdmF0ZSBfdmlkZW9MYXllcjogY2MuTm9kZTtcclxuICAgIC8qKlxyXG4gICAgICog5Lqk5LqS5bGCXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX2FjdGl2aXR5TGF5ZXI6IGNjLk5vZGU7XHJcbiAgICAvKipcclxuICAgICAqIOWlluWKseW8ueeql1xyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9yZXdhcmRMYXllcjogJFJld2FyZExheWVyO1xyXG4gICAgcHJpdmF0ZSBfbWFzazogJFVJTWFzaztcclxuICAgIHByaXZhdGUgX2lzVmlkZW9QcmVmYWJMb2FkaW5nOiBib29sZWFuO1xyXG4gICAgcHJpdmF0ZSBfaXNWaWRlb1VybDogc3RyaW5nO1xyXG4gICAgcHVibGljIHNldE1hc2sobWFzazogJFVJTWFzayk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX21hc2sgPSBtYXNrO1xyXG4gICAgICAgIGlmICh0aGlzLl9yZXdhcmRMYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXdhcmRMYXllci5zZXRNYXNrKHRoaXMuX21hc2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBub2RlKCk6IGNjLk5vZGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ub2RlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBhY3Rpdml0eUxheWVyKCk6IGNjLk5vZGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9hY3Rpdml0eUxheWVyO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm5vZGUgPyB0cnVlIDogZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldENvbXBvbmVudDxUIGV4dGVuZHMgY2MuQ29tcG9uZW50Pih0eXBlOiB7IHByb3RvdHlwZTogVCB9KTogVCB7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQ6IGNjLk5vZGUgPSB0aGlzLl93aW5kb3dzTGF5ZXIuY2hpbGRyZW5bMF07XHJcbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRlbnQuZ2V0Q29tcG9uZW50KHR5cGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0Q29udGVudCgpOiBjYy5Ob2RlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fd2luZG93c0xheWVyLmNoaWxkcmVuWzBdO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXdhcmQobnVtOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fcmV3YXJkTGF5ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5fcmV3YXJkTGF5ZXIuc2hvdyhudW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2VWaWRlbygpOiB2b2lkIHtcclxuICAgICAgICBnTG9nKFwi5YWz6Zet6KeG6aKR57uE5Lu2XCIpO1xyXG4gICAgICAgIGlmIChjYy5pc1ZhbGlkKHRoaXMuX3ZpZGVvTGF5ZXIpKSB7XHJcbiAgICAgICAgICAgIFVJTWdyLm1hc2suaGlkZShcIlZpZGVvXCIpO1xyXG4gICAgICAgICAgICBDYW1lYXJNZ3Iuc2hvd0NhbWVyYShjYy5DYW52YXMuaW5zdGFuY2Uubm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzVmlkZW9VcmwgPSBcIlwiO1xyXG4gICAgICAgICAgICB0aGlzLl92aWRlb0xheWVyLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgdGhpcy5fdmlkZW9MYXllciA9IG51bGw7XHJcbiAgICAgICAgICAgIEV2ZW50TWdyLmRpc3BhdGNoRXZlbnQobmV3ICRVSUV2ZW50KCRVSUV2ZW50LlZJREVPX0hJREUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dWaWRlbyh1cmw6IHN0cmluZywgaXNDdHJsOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lzVmlkZW9VcmwgPSB1cmw7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzVmlkZW9QcmVmYWJMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIGdMb2coXCLop4bpopHnu4Tku7bmraPlnKjliqDovb3kuK0gLi4uXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghU3RyaW5nVXRpbC5pc1ZhbGlkKHRoaXMuX2lzVmlkZW9VcmwpKSB7XHJcbiAgICAgICAgICAgIGdMb2coXCLlnLDlnYDkuLrnqbrvvIzml6Dms5Xmkq3mlL4uXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl92aWRlb0xheWVyKSB7XHJcbiAgICAgICAgICAgIFVJTWdyLmhpZGVMb2FkaW5nKCk7XHJcbiAgICAgICAgICAgIFVJTWdyLm1hc2suc2hvdyhcIlZpZGVvXCIsIDEpO1xyXG4gICAgICAgICAgICBnTG9nKFwi5byA5aeL5pKt5pS+6KeG6aKROlwiICsgdGhpcy5faXNWaWRlb1VybCk7XHJcbiAgICAgICAgICAgIENhbWVhck1nci5oaWRlQ2FtZXJhKGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlKTtcclxuICAgICAgICAgICAgbGV0IHZpZGVvOiBjYy5WaWRlb1BsYXllciA9IHRoaXMuX3ZpZGVvTGF5ZXIuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5WaWRlb1BsYXllcik7XHJcbiAgICAgICAgICAgIHZpZGVvLnJlc291cmNlVHlwZSA9IGNjLlZpZGVvUGxheWVyLlJlc291cmNlVHlwZS5SRU1PVEU7XHJcbiAgICAgICAgICAgIHZpZGVvLnJlbW90ZVVSTCA9IHRoaXMuX2lzVmlkZW9Vcmw7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpZGVvTGF5ZXIuc2V0UGFyZW50KHRoaXMuX25vZGUpO1xyXG4gICAgICAgICAgICBFdmVudE1nci5kaXNwYXRjaEV2ZW50KG5ldyAkVUlFdmVudCgkVUlFdmVudC5WSURFT19TSE9XLCB7IGlzQ3RybDogaXNDdHJsIH0pKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9pc1ZpZGVvUHJlZmFiTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgICAgIGdMb2coXCLlvIDlp4vkuIvovb3op4bpopHnu4Tku7YuLi5cIik7XHJcbiAgICAgICAgICAgIFJlc01nci5sb2FkKFN5c3RlbUJ1bmRsZU5hbWUuVUksIENvbmZpZ01nci51aWNvbmZpZy52aWRlbywgKHByZWZhYjogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnTG9nKFwi5Yib5bu66KeG6aKR57uE5Lu2Li4uXCIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5faXNWaWRlb1ByZWZhYkxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZGVvTGF5ZXIgPSBjYy5pbnN0YW50aWF0ZShwcmVmYWIpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlkZW9MYXllci56SW5kZXggPSBFVUlMYXllclppbmRleC52aWRlbztcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1ZpZGVvKHRoaXMuX2lzVmlkZW9VcmwsIGlzQ3RybCk7XHJcbiAgICAgICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNob3dOb2RlKHdpbmRvd3M6IGNjLk5vZGUgfCBjYy5QcmVmYWIsIG9wYWNpdHk/OiBudW1iZXIpOiBjYy5Ob2RlIHtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvd3MgaW5zdGFuY2VvZiBjYy5QcmVmYWIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvd3MgPSBjYy5pbnN0YW50aWF0ZSh3aW5kb3dzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB3aW5kb3dzLnpJbmRleCA9IDE7XHJcbiAgICAgICAgICAgIHRoaXMuX21hc2sgJiYgdGhpcy5fbWFzay5zaG93KFwiVUlMYXllclwiLCBvcGFjaXR5KTtcclxuICAgICAgICAgICAgd2luZG93cy5zZXRQYXJlbnQodGhpcy5fd2luZG93c0xheWVyKTtcclxuICAgICAgICAgICAgdGhpcy5zY2FsZVNob3coMC4zLCB3aW5kb3dzKVxyXG4gICAgICAgICAgICByZXR1cm4gd2luZG93cztcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGdXYXJuKFwi6LWE5rqQ6Z2e5rOV77yM5peg5rOV6L+b6KGM5pi+56S677yBXCIsIHdpbmRvd3MgPyB3aW5kb3dzLm5hbWUgOiBcIuiKgueCueaXoOWRveWQjVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGluaXQodXJsOiBzdHJpbmcpOiB2b2lkIHtcclxuICAgICAgICBsZXQgbjogY2MuTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgbGV0IHdpZGdldCA9IG4uYWRkQ29tcG9uZW50KGNjLldpZGdldCk7XHJcbiAgICAgICAgd2lkZ2V0LmlzQWxpZ25MZWZ0ID0gdHJ1ZTtcclxuICAgICAgICB3aWRnZXQuaXNBbGlnblJpZ2h0ID0gdHJ1ZTtcclxuICAgICAgICB3aWRnZXQuaXNBbGlnblRvcCA9IHRydWU7XHJcbiAgICAgICAgd2lkZ2V0LmlzQWxpZ25Cb3R0b20gPSB0cnVlO1xyXG4gICAgICAgIHdpZGdldC5sZWZ0ID0gd2lkZ2V0LnJpZ2h0ID0gd2lkZ2V0LnRvcCA9IHdpZGdldC5ib3R0b20gPSAwO1xyXG4gICAgICAgIG4uZ3JvdXAgPSBcIlVJXCI7XHJcbiAgICAgICAgbi5uYW1lID0gXCJVSUxheWVyXCI7XHJcbiAgICAgICAgbi56SW5kZXggPSBFVUlaaW5kZXgudWlMYXllcjtcclxuICAgICAgICB0aGlzLl90YXJnZXQgPSBuLmFkZENvbXBvbmVudChjYy5Db21wb25lbnQpO1xyXG4gICAgICAgIGxldCB1aTogem1nLklVSUNvbmZpZyA9IENvbmZpZ01nci51aWNvbmZpZztcclxuXHJcbiAgICAgICAgdGhpcy5fd2luZG93c0xheWVyID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICB0aGlzLl93aW5kb3dzTGF5ZXIuekluZGV4ID0gRVVJTGF5ZXJaaW5kZXgud2luZG93O1xyXG4gICAgICAgIHdpZGdldCA9IHRoaXMuX3dpbmRvd3NMYXllci5hZGRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICB3aWRnZXQuaXNBbGlnbkxlZnQgPSB0cnVlO1xyXG4gICAgICAgIHdpZGdldC5pc0FsaWduUmlnaHQgPSB0cnVlO1xyXG4gICAgICAgIHdpZGdldC5pc0FsaWduVG9wID0gdHJ1ZTtcclxuICAgICAgICB3aWRnZXQuaXNBbGlnbkJvdHRvbSA9IHRydWU7XHJcbiAgICAgICAgd2lkZ2V0LmxlZnQgPSB3aWRnZXQucmlnaHQgPSB3aWRnZXQudG9wID0gd2lkZ2V0LmJvdHRvbSA9IDA7XHJcbiAgICAgICAgdGhpcy5fd2luZG93c0xheWVyLm5hbWUgPSBcIndpbmRvd3NMYXllclwiO1xyXG4gICAgICAgIHRoaXMuX3dpbmRvd3NMYXllci5zZXRQYXJlbnQobik7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZpdHlMYXllciA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgdGhpcy5fYWN0aXZpdHlMYXllci56SW5kZXggPSBFVUlMYXllclppbmRleC5hY3Rpdml0eTtcclxuICAgICAgICB3aWRnZXQgPSB0aGlzLl9hY3Rpdml0eUxheWVyLmFkZENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgIHdpZGdldC5pc0FsaWduTGVmdCA9IHRydWU7XHJcbiAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IHRydWU7XHJcbiAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSB0cnVlO1xyXG4gICAgICAgIHdpZGdldC5pc0FsaWduQm90dG9tID0gdHJ1ZTtcclxuICAgICAgICB3aWRnZXQubGVmdCA9IHdpZGdldC5yaWdodCA9IHdpZGdldC50b3AgPSB3aWRnZXQuYm90dG9tID0gMDtcclxuICAgICAgICB0aGlzLl9hY3Rpdml0eUxheWVyLm5hbWUgPSBcImFjdGl2aXR5TGF5ZXJcIjtcclxuICAgICAgICB0aGlzLl9hY3Rpdml0eUxheWVyLnNldFBhcmVudChuKTtcclxuXHJcbiAgICAgICAgdGhpcy5fbm9kZSA9IG47XHJcbiAgICAgICAgdGhpcy5pbml0UmV3YXJkKCk7XHJcbiAgICAgICAgdGhpcy5vbkxvYWQoKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGRFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gRXZlbnRNZ3Iub24oRXZlbnROYW1lLkNPTlRST0xMRVJfQ0hBTkdFX0VORCwgdGhpcy5vblNjZW5lRW5kLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub24oRXZlbnROYW1lLkNPTlRST0xMRVJfQ0hBTkdFX0RFU1RPUlksIHRoaXMub25TY2VuZURlc3RvcnksIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICAvLyBFdmVudE1nci5vbihFdmVudE5hbWUuVUlfQkFDS19CVE4sIHRoaXMub25CYWNrSGFubGVyLCB0aGlzLCBmYWxzZSwgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpO1xyXG4gICAgICAgIHN1cGVyLmFkZEV2ZW50cygpO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfRU5ELCB0aGlzLm9uU2NlbmVFbmQsIHRoaXMpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfREVTVE9SWSwgdGhpcy5vblNjZW5lRGVzdG9yeSwgdGhpcyk7XHJcbiAgICAgICAgLy8gRXZlbnRNZ3Iub2ZmKEV2ZW50TmFtZS5VSV9CQUNLX0JUTiwgdGhpcy5vbkJhY2tIYW5sZXIsIHRoaXMpO1xyXG4gICAgICAgIGlmICh0aGlzLl9yZXdhcmRMYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXdhcmRMYXllci5ub2RlLm9mZigkUmV3YXJkTGF5ZXIuUkVXQVJEX1NUQVJULCB0aGlzLm9uUmV3YXJkU3RhcnQsIHRoaXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXdhcmRMYXllci5ub2RlLm9mZigkUmV3YXJkTGF5ZXIuUkVXQVJEX09WRVIsIHRoaXMub25SZXdhcmRPdmVyLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3VwZXIucmVtb3ZlRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gcHJpdmF0ZSBvbkJhY2tIYW5sZXIoZXZ0OiAkVUlCYWNrRXZlbnQpOiB2b2lkIHtcclxuICAgIC8vICAgICBpZiAodGhpcy5fdmlkZW9MYXllciAmJiB0aGlzLl92aWRlb0xheWVyLnBhcmVudCkge1xyXG4gICAgLy8gICAgICAgICB0aGlzLmNsb3NlVmlkZW8oKTtcclxuICAgIC8vICAgICAgICAgZXZ0W1wic3RvcHBlZFwiXSgpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuXHJcbiAgICBwcml2YXRlIGluaXRSZXdhcmQoKTogdm9pZCB7XHJcbiAgICAgICAgUmVzTWdyLmxvYWQoU3lzdGVtQnVuZGxlTmFtZS5VSSwgQ29uZmlnTWdyLnVpY29uZmlnLnJld2FyZCwgKHJlczogY2MuUHJlZmFiKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCByTm9kZTogY2MuTm9kZSA9IGNjLmluc3RhbnRpYXRlKHJlcyk7XHJcbiAgICAgICAgICAgIHJOb2RlLnpJbmRleCA9IEVVSUxheWVyWmluZGV4LnJld2FyZDtcclxuICAgICAgICAgICAgdGhpcy5fcmV3YXJkTGF5ZXIgPSByTm9kZS5hZGRDb21wb25lbnQoJFJld2FyZExheWVyKTtcclxuICAgICAgICAgICAgdGhpcy5fcmV3YXJkTGF5ZXIuc2V0UGFyZW50KHRoaXMuX25vZGUpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5fbWFzaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmV3YXJkTGF5ZXIuc2V0TWFzayh0aGlzLl9tYXNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9yZXdhcmRMYXllci5ub2RlLm9uKCRSZXdhcmRMYXllci5SRVdBUkRfU1RBUlQsIHRoaXMub25SZXdhcmRTdGFydCwgdGhpcywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZXdhcmRMYXllci5ub2RlLm9uKCRSZXdhcmRMYXllci5SRVdBUkRfT1ZFUiwgdGhpcy5vblJld2FyZE92ZXIsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25SZXdhcmRTdGFydCgpOiB2b2lkIHtcclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uUmV3YXJkT3ZlcigpOiB2b2lkIHtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25TY2VuZURlc3RvcnkoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jbGVhcigpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblNjZW5lRW5kKCk6IHZvaWQge1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xvc2UoaXNUd2VlbjogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIWNjLmlzVmFsaWQodGhpcy5fd2luZG93c0xheWVyKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX21hc2sgJiYgdGhpcy5fbWFzay5oaWRlKFwiVUlMYXllclwiKTtcclxuICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZW46IG51bWJlciA9IHRoaXMuX3dpbmRvd3NMYXllci5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIGxldCB0bjogY2MuTm9kZSA9IHRoaXMuX3dpbmRvd3NMYXllci5jaGlsZHJlbltpXTtcclxuICAgICAgICAgICAgaWYgKGlzVHdlZW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2NhbGVIaWRlKDAuMiwgdG4sIChub2RlOiBjYy5Ob2RlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNjLmlzVmFsaWQobm9kZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgdGhpcylcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRuLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGVhcigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaTogbnVtYmVyO1xyXG4gICAgICAgIGxldCBsZW46IG51bWJlcjtcclxuICAgICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICAgICAgLy8gbGVuID0gdGhpcy5fYWN0aXZpdHlMYXllci5jaGlsZHJlbkNvdW50O1xyXG4gICAgICAgIC8vIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuX2FjdGl2aXR5TGF5ZXIuY2hpbGRyZW5baV0uZGVzdHJveSgpO1xyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLl9hY3Rpdml0eUxheWVyLnJlbW92ZUFsbENoaWxkcmVuKHRydWUpO1xyXG4gICAgICAgIGlmICh0aGlzLl9yZXdhcmRMYXllcikge1xyXG4gICAgICAgICAgICB0aGlzLl9yZXdhcmRMYXllci5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7IEV2ZW50TWdyLCBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgeyBCYXNlTWdyIH0gZnJvbSBcInptZ19tZ3JcIjtcclxuaW1wb3J0IHsgRVJlc0V2ZW50TmFtZSwgUmVzTWdyIH0gZnJvbSBcInptZ19yZXNfbWdyXCI7XHJcbmltcG9ydCB7IGdMb2cgfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuaW1wb3J0IHsgX0FsZXJ0TWdyIH0gZnJvbSBcIi4vc3lzdWkvYWxlcnQvQWxlcnRNZ3JcIjtcclxuaW1wb3J0IHsgJFVJRXZlbnQgfSBmcm9tIFwiLi9ldmVudHMvVUlFdmVudFwiO1xyXG5pbXBvcnQgeyAkQ29uZmlnRXZlbnQsIENvbmZpZ01nciB9IGZyb20gXCJ6bWdfY29uZmlnX21nclwiO1xyXG5pbXBvcnQgeyAkQmcgfSBmcm9tIFwiLi9zeXN1aS9CZ1wiO1xyXG5pbXBvcnQgeyAkVUlNYXNrIH0gZnJvbSBcIi4vc3lzdWkvVUlNYXNrXCI7XHJcbmltcG9ydCB7IF9Ub2FzdE1nciB9IGZyb20gXCIuL3N5c3VpL1RvYXN0TWdyXCI7XHJcbmltcG9ydCB7IEVVSVppbmRleCB9IGZyb20gXCIuL3N5c3VpL0VVSVppbmRleFwiO1xyXG5pbXBvcnQgeyAkVUlMb2FkaW5nIH0gZnJvbSBcIi4vc3lzdWkvVUlMb2FkaW5nXCI7XHJcbmltcG9ydCB7ICRVSVRyYW5zaXRpb25zIH0gZnJvbSBcIi4vc3lzdWkvVUlUcmFuc2l0aW9uc1wiO1xyXG5pbXBvcnQgeyAkVUlCYWNrQnRuIH0gZnJvbSBcIi4vc3lzdWkvVUlCYWNrQnRuXCI7XHJcbmltcG9ydCB7ICRVSU1vdXNlIH0gZnJvbSBcIi4vc3lzdWkvVUlNb3VzZVwiO1xyXG5pbXBvcnQgeyBGb250TWdyIH0gZnJvbSBcInptZ191aV9tZ3JcIjtcclxuXHJcbmltcG9ydCB7ICRVSUxheWVyIH0gZnJvbSBcIi4vc3lzdWkvVUlMYXllclwiO1xyXG5pbXBvcnQgeyBEaXJlY3RvckV2ZW50LCBEaXJlY3Rvck1nciB9IGZyb20gXCJ6bWdfY29udHJvbGxlclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIF9VSU1nciBleHRlbmRzIEJhc2VNZ3IgaW1wbGVtZW50cyB6bWcuSVVJTWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogX1VJTWdyO1xyXG4gICAgc3RhdGljIGdldEluc3RhbmNlKCk6IF9VSU1nciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfVUlNZ3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOaYvuekuuS4gOS6m+eql+WPo+eahOiKgueCuVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdWlMYXllcjogJFVJTGF5ZXI7XHJcblxyXG4gICAgcHVibGljIGJnOiAkQmc7XHJcblxyXG4gICAgcHVibGljIG1hc2s6ICRVSU1hc2s7XHJcbiAgICAvKipcclxuICAgICAqIOi/lOWbnuaMiemSrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYmFja0J0bjogJFVJQmFja0J0bjtcclxuICAgIC8qKlxyXG4gICAgICogbG9hZGluZ+eVjOmdolxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbG9hZGluZzogJFVJTG9hZGluZztcclxuICAgIC8qKlxyXG4gICAgICogdG9hc3TnrqHnkIblmahcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRvYXN0OiB6bWcuSVRvYXN0TWdyO1xyXG4gICAgLyoqXHJcbiAgICAgKiDlvLnnqpfnrqHnkIblmahcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFsZXJ0OiB6bWcuSUFsZXJ0TWdyO1xyXG4gICAgLyoqXHJcbiAgICAgKiDliIflnLrmma/nibnmlYjnu4Tku7ZcclxuICAgICAqL1xyXG4gICAgcHVibGljIHRyYW5zaXRpb25zOiAkVUlUcmFuc2l0aW9ucztcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWtl+S9k+euoeeQhuWZqFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZm9udE1ncjogem1nLklGb250TWdyO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6byg5qCH57uE5Lu2XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb3VzZTogJFVJTW91c2U7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlhbbku5blvLnlh7rlsYJcclxuICAgICAqL1xyXG4gICAgcHVibGljIG90aGVyOiBjYy5Ob2RlO1xyXG5cclxuICAgIHByaXZhdGUgX25vZGU6IGNjLk5vZGU7XHJcbiAgICBwcml2YXRlIF9pc1ZhbGlkOiBib29sZWFuO1xyXG4gICAgcHVibGljIGdldCBub2RlKCk6IGNjLk5vZGUge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9ub2RlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgaWYgKENvbmZpZ01nci5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEV2ZW50TWdyLm9uY2UoRXZlbnROYW1lLkNPTkZJR19SRUFEWSwgdGhpcy5sb2FkLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVpTGF5ZXIuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMubW91c2UuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuYmcuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMubWFzay5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5iYWNrQnRuLmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLnRvYXN0LmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLmFsZXJ0LmRlc3Ryb3koKTtcclxuICAgICAgICB0aGlzLmxvYWRpbmcuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMudHJhbnNpdGlvbnMuZGVzdHJveSgpO1xyXG4gICAgICAgIHRoaXMuZm9udE1nci5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudHMoKTtcclxuICAgICAgICBzdXBlci5kZXN0cm95KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX25vZGUpIHtcclxuICAgICAgICAgICAgY2MuZ2FtZS5yZW1vdmVQZXJzaXN0Um9vdE5vZGUodGhpcy5fbm9kZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX25vZGUuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9ub2RlID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faXNWYWxpZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNsb3NlQWxsKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmJnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmcuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5hbGVydCkge1xyXG4gICAgICAgICAgICB0aGlzLmFsZXJ0LmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOacquWHhuWkh1xyXG4gICAgICog5bey6KKr6ZSA5q+BXHJcbiAgICAgKiDliJnml6Dms5Xkvb/nlKhcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1ZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93TG9hZGluZyhpc1Byb2dyZXNzOiBib29sZWFuID0gZmFsc2UsIHBybz86IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmJnKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmcuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5sb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIGlmIChpc1Byb2dyZXNzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmcuc2V0UHJvZ3Jlc3MocHJvKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZGluZy5oaWRlUHJvZ3Jlc3MoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmxvYWRpbmcuc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZUxvYWRpbmcoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuYmcpIHtcclxuICAgICAgICAgICAgdGhpcy5iZy5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmxvYWRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjaGVjaygpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXRoaXMubG9hZGluZy5ub2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmJnLm5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuYWxlcnQuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5tYXNrLm5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMudG9hc3QuaXNWYWxpZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy50cmFuc2l0aW9ucy5ub2RlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmJhY2tCdG4ubm9kZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy51aUxheWVyLm5vZGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9pc1ZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBFdmVudE1nci5kaXNwYXRjaEV2ZW50KG5ldyAkVUlFdmVudCgkVUlFdmVudC5DT01QTEVURSkpO1xyXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgJFVJRXZlbnQoRXZlbnROYW1lLlJFQURZKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdXBkYXRlQWxpZ25tZW50KG5vZGU6IGNjLk5vZGUpOiB2b2lkIHtcclxuICAgICAgICBsZXQgd2lkczogY2MuV2lkZ2V0W10gPSBub2RlLmdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNjLldpZGdldCk7XHJcbiAgICAgICAgbGV0IGk6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gd2lkcy5sZW5ndGg7XHJcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgIHdpZHNbaV0udXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzY2VuZUNoYW5nZSgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgY2xpZW50V2lkdGggPSBNYXRoLnJvdW5kKGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS53aWR0aCk7XHJcbiAgICAgICAgbGV0IGNsaWVudEhlaWdodCA9IE1hdGgucm91bmQoY2Mudmlldy5nZXRWaXNpYmxlU2l6ZSgpLmhlaWdodCk7XHJcbiAgICAgICAgaWYgKGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlKSB7XHJcbiAgICAgICAgICAgIGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLndpZHRoID0gY2xpZW50V2lkdGg7XHJcbiAgICAgICAgICAgIGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodCA9IGNsaWVudEhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuX25vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fbm9kZS53aWR0aCA9IGNsaWVudFdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLl9ub2RlLmhlaWdodCA9IGNsaWVudEhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5fbm9kZS54ID0gTWF0aC5yb3VuZChjbGllbnRXaWR0aCAvIDIpO1xyXG4gICAgICAgICAgICB0aGlzLl9ub2RlLnkgPSBNYXRoLnJvdW5kKGNsaWVudEhlaWdodCAvIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgbG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9ub2RlID0gbmV3IGNjLk5vZGUoKTtcclxuICAgICAgICB0aGlzLnNjZW5lQ2hhbmdlKCk7XHJcbiAgICAgICAgdGhpcy5fbm9kZS5uYW1lID0gXCJVSU1nclwiO1xyXG4gICAgICAgIHRoaXMub3RoZXIgPSBuZXcgY2MuTm9kZSgpO1xyXG4gICAgICAgIHRoaXMub3RoZXIubmFtZSA9IFwiT3RoZXJVSVwiXHJcbiAgICAgICAgdGhpcy5vdGhlci56SW5kZXggPSBFVUlaaW5kZXguT1RIRVJVSVxyXG4gICAgICAgIHRoaXMub3RoZXIucGFyZW50ID0gdGhpcy5fbm9kZVxyXG4gICAgICAgIGxldCB3aWRnZXQgPSB0aGlzLl9ub2RlLmFkZENvbXBvbmVudChjYy5XaWRnZXQpO1xyXG4gICAgICAgIHdpZGdldC5pc0FsaWduTGVmdCA9IHRydWU7XHJcbiAgICAgICAgd2lkZ2V0LmlzQWxpZ25SaWdodCA9IHRydWU7XHJcbiAgICAgICAgd2lkZ2V0LmlzQWxpZ25Ub3AgPSB0cnVlO1xyXG4gICAgICAgIHdpZGdldC5pc0FsaWduQm90dG9tID0gdHJ1ZTtcclxuICAgICAgICB3aWRnZXQubGVmdCA9IHdpZGdldC5yaWdodCA9IHdpZGdldC50b3AgPSB3aWRnZXQuYm90dG9tID0gMDtcclxuICAgICAgICBjYy5nYW1lLmFkZFBlcnNpc3RSb290Tm9kZSh0aGlzLl9ub2RlKTtcclxuXHJcbiAgICAgICAgbGV0IHVpOiB6bWcuSVVJQ29uZmlnID0gQ29uZmlnTWdyLnVpY29uZmlnO1xyXG4gICAgICAgIHRoaXMudWlMYXllciA9IG5ldyAkVUlMYXllcigpO1xyXG4gICAgICAgIHRoaXMub25VSUxheWVyKCk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6K6+572u6byg5qCH5qC35byPXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy5tb3VzZSA9IG5ldyAkVUlNb3VzZSh1aS5tb3VzZS5ub3JtYWwsIHVpLm1vdXNlLmxpbmssIHVpLm1vdXNlLnVuYXZhaWxhYmxlLCB1aS5tb3VzZS5lZmZlY3QsIHVpLm1vdXNlLnNvdW5kKTtcclxuICAgICAgICB0aGlzLmJnID0gbmV3ICRCZyh1aS5iZywgdGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLmJnLm9uY2UoRVJlc0V2ZW50TmFtZS5DT01QTEVURSwgdGhpcy5vbkJnQ29tcGxldGUsIHRoaXMpO1xyXG5cclxuICAgICAgICB0aGlzLm1hc2sgPSBuZXcgJFVJTWFzayh1aS5tYXNrKTtcclxuICAgICAgICB0aGlzLm1hc2sub25jZShFUmVzRXZlbnROYW1lLkNPTVBMRVRFLCB0aGlzLm9uTWFza0NvbXBsZXRlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5iYWNrQnRuID0gbmV3ICRVSUJhY2tCdG4odWkuYmFja0J0bik7XHJcbiAgICAgICAgdGhpcy5iYWNrQnRuLm9uY2UoRVJlc0V2ZW50TmFtZS5DT01QTEVURSwgdGhpcy5vbkJhY2tDb21wbGV0ZSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMudG9hc3QgPSBfVG9hc3RNZ3IuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB0aGlzLnRvYXN0LmluaXQodWkudG9hc3QpO1xyXG4gICAgICAgIHRoaXMudG9hc3Qub25jZShFUmVzRXZlbnROYW1lLkNPTVBMRVRFLCB0aGlzLm9uVG9hc3RDb21wbGV0ZSwgdGhpcylcclxuXHJcblxyXG4gICAgICAgIHRoaXMuYWxlcnQgPSBfQWxlcnRNZ3IuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICB0aGlzLmFsZXJ0LmluaXQodWkuYWxlcnQpO1xyXG4gICAgICAgIHRoaXMuYWxlcnQub25jZShFUmVzRXZlbnROYW1lLkNPTVBMRVRFLCB0aGlzLm9uQWxlcnRDb21wbGV0ZSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMubG9hZGluZyA9IG5ldyAkVUlMb2FkaW5nKHVpLmxvYWRpbmcsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nLm9uY2UoRVJlc0V2ZW50TmFtZS5DT01QTEVURSwgdGhpcy5vbkxvYWRpbmdDb21wbGV0ZSwgdGhpcyk7XHJcblxyXG4gICAgICAgIHRoaXMudHJhbnNpdGlvbnMgPSBuZXcgJFVJVHJhbnNpdGlvbnModWkudHJhbnNpdGlvbnMsIHRoaXMubm9kZSk7XHJcbiAgICAgICAgdGhpcy50cmFuc2l0aW9ucy5vbmNlKEVSZXNFdmVudE5hbWUuQ09NUExFVEUsIHRoaXMub25UcmFuc2l0aW9uc0NvbXBsZXRlLCB0aGlzKTtcclxuXHJcbiAgICAgICAgdGhpcy5mb250TWdyID0gRm9udE1ncjtcclxuICAgICAgICB0aGlzLmZvbnRNZ3Iuc3RhcnQoKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50cygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25BbGVydENvbXBsZXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGdMb2coXCLotYTmupBjb21wbGV0ZTogXCIgKyB0aGlzLmFsZXJ0LnJlcy5wYXRoKTtcclxuICAgICAgICB0aGlzLmFsZXJ0Lm5vZGUuekluZGV4ID0gRVVJWmluZGV4LkFMRVJUO1xyXG4gICAgICAgIHRoaXMuYWxlcnQubm9kZS5zZXRQYXJlbnQodGhpcy5fbm9kZSk7XHJcbiAgICAgICAgLy8gdGhpcy5hbGVydC5ub2RlLmdldENvbXBvbmVudChjYy5XaWRnZXQpLnVwZGF0ZUFsaWdubWVudCgpO1xyXG4gICAgICAgIHRoaXMuY2hlY2soKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Mb2FkaW5nQ29tcGxldGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ0xvZyhcIui1hOa6kGNvbXBsZXRlOiBcIiArIHRoaXMubG9hZGluZy5yZXMucGF0aCk7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nLm5vZGUuekluZGV4ID0gRVVJWmluZGV4LkxvYWRpbmc7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nLm5vZGUuc2V0UGFyZW50KHRoaXMuX25vZGUpO1xyXG4gICAgICAgIHRoaXMuY2hlY2soKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVUlMYXllcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnVpTGF5ZXIubm9kZS56SW5kZXggPSBFVUlaaW5kZXgudWlMYXllcjtcclxuICAgICAgICB0aGlzLnVpTGF5ZXIubm9kZS5zZXRQYXJlbnQodGhpcy5fbm9kZSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVBbGlnbm1lbnQodGhpcy51aUxheWVyLm5vZGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25CZ0NvbXBsZXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGdMb2coXCLotYTmupBjb21wbGV0ZTogXCIgKyB0aGlzLmJnLnJlcy5wYXRoKTtcclxuICAgICAgICB0aGlzLmJnLm5vZGUuekluZGV4ID0gRVVJWmluZGV4LkJHO1xyXG4gICAgICAgIHRoaXMuYmcubm9kZS5zZXRQYXJlbnQodGhpcy5fbm9kZSk7XHJcbiAgICAgICAgdGhpcy5jaGVjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25NYXNrQ29tcGxldGUoKTogdm9pZCB7XHJcbiAgICAgICAgZ0xvZyhcIui1hOa6kGNvbXBsZXRlOiBcIiArIHRoaXMubWFzay5yZXMucGF0aCk7XHJcbiAgICAgICAgdGhpcy5tYXNrLm5vZGUuekluZGV4ID0gRVVJWmluZGV4Lk1BU0s7XHJcbiAgICAgICAgdGhpcy5tYXNrLm5vZGUuc2V0UGFyZW50KHRoaXMuX25vZGUpO1xyXG4gICAgICAgIHRoaXMudWlMYXllci5zZXRNYXNrKHRoaXMubWFzayk7XHJcbiAgICAgICAgdGhpcy5jaGVjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25Ub2FzdENvbXBsZXRlKCk6IHZvaWQge1xyXG4gICAgICAgIGdMb2coXCLotYTmupBjb21wbGV0ZTogXCIgKyB0aGlzLnRvYXN0LnJlcy5wYXRoKTtcclxuICAgICAgICB0aGlzLnRvYXN0Lm5vZGUuekluZGV4ID0gRVVJWmluZGV4LlRPQVNUO1xyXG4gICAgICAgIHRoaXMudG9hc3Qubm9kZS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLmNoZWNrKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uVHJhbnNpdGlvbnNDb21wbGV0ZSgpOiB2b2lkIHtcclxuICAgICAgICBnTG9nKFwi5Zy65pmv6Lez6L2s57uE5Lu25YeG5aSH5a6M5q+VLi4uXCIpO1xyXG4gICAgICAgIGdMb2coXCLotYTmupBjb21wbGV0ZTogXCIgKyB0aGlzLnRyYW5zaXRpb25zLnJlcy5wYXRoKTtcclxuICAgICAgICB0aGlzLnRyYW5zaXRpb25zLm5vZGUuekluZGV4ID0gRVVJWmluZGV4LlRSQU5TSVRJT05TO1xyXG4gICAgICAgIC8vIHRoaXMudHJhbnNpdGlvbnMubm9kZS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLmNoZWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkJhY2tDb21wbGV0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmJhY2tCdG4ubm9kZS56SW5kZXggPSBFVUlaaW5kZXguQkFDS0JUTjtcclxuICAgICAgICB0aGlzLmJhY2tCdG4ubm9kZS5zZXRQYXJlbnQodGhpcy5ub2RlKTtcclxuICAgICAgICB0aGlzLmNoZWNrKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBhZGRFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgRXZlbnRNZ3Iub24oRXZlbnROYW1lLlVJX1ZJREVPX0hJREUsIHRoaXMub25WaWRlb0hpZGUsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICBFdmVudE1nci5vbihFdmVudE5hbWUuVUlfVklERU9fU0hPVywgdGhpcy5vblZpZGVvU2hvdywgdGhpcywgZmFsc2UpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9uKEV2ZW50TmFtZS5DT05UUk9MTEVSX0NIQU5HRV9ERVNUT1JZLCB0aGlzLm9uU2NlbmVDaGFuZ2VEZXN0b3J5LCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub24oRXZlbnROYW1lLkNPTlRST0xMRVJfQ0hBTkdFX0VORCwgdGhpcy5vblNjZW5lQ2hhbmdlRW5kLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgY2Mudmlldy5vbihcImNhbnZhcy1yZXNpemVcIiwgdGhpcy5vbkNhbnZhc1Jlc2l6ZSwgdGhpcywgZmFsc2UpO1xyXG5cclxuICAgIH1cclxuICAgIHByaXZhdGUgcmVtb3ZlRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuVUlfVklERU9fSElERSwgdGhpcy5vblZpZGVvSGlkZSwgdGhpcyk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub2ZmKEV2ZW50TmFtZS5VSV9WSURFT19TSE9XLCB0aGlzLm9uVmlkZW9TaG93LCB0aGlzKTtcclxuICAgICAgICBFdmVudE1nci5vZmYoRXZlbnROYW1lLkNPTlRST0xMRVJfQ0hBTkdFX0RFU1RPUlksIHRoaXMub25TY2VuZUNoYW5nZURlc3RvcnksIHRoaXMpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfRU5ELCB0aGlzLm9uU2NlbmVDaGFuZ2VFbmQsIHRoaXMpO1xyXG4gICAgICAgIGNjLnZpZXcub2ZmKFwiY2FudmFzLXJlc2l6ZVwiLCB0aGlzLm9uQ2FudmFzUmVzaXplLCB0aGlzKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25WaWRlb0hpZGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXNrLmhpZGUoXCJWaWRlb1wiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25WaWRlb1Nob3coKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5tYXNrLnNob3coXCJWaWRlb1wiKTtcclxuICAgICAgICB0aGlzLmhpZGVMb2FkaW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNhbnZhc1Jlc2l6ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNjZW5lQ2hhbmdlKCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVBbGlnbm1lbnQoY2MuQ2FudmFzLmluc3RhbmNlLm5vZGUpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQWxpZ25tZW50KHRoaXMubm9kZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uU2NlbmVDaGFuZ2VEZXN0b3J5KGV2dDogRGlyZWN0b3JFdmVudCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuYmFja0J0bi5zaG93KCk7XHJcbiAgICAgICAgdGhpcy5tb3VzZS5oaWRlRWZmZWN0RHJhZ29uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNjZW5lQ2hhbmdlRW5kKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2NlbmVDaGFuZ2UoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUFsaWdubWVudCh0aGlzLm5vZGUpO1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7IEJhc2VNZ3IgfSBmcm9tIFwiem1nX21nclwiO1xyXG5pbXBvcnQgeyBSZXNMaXN0ZW5lciwgUmVzTWdyLCBTeXN0ZW1CdW5kbGVOYW1lIH0gZnJvbSBcInptZ19yZXNfbWdyXCI7XHJcblxyXG4vKipcclxuICog5aOw6Z+z6LWE5rqQ5a2Y5YKo6I635Y+WXHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgX0F1ZGlvUmVzIGV4dGVuZHMgQmFzZU1nciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBfQXVkaW9SZXM7XHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogX0F1ZGlvUmVzIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IF9BdWRpb1JlcyhcIkF1ZGlvUmVzXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfY2xpY2tDbGlwOiBjYy5BdWRpb0NsaXA7XHJcblxyXG4gICAgYXN5bmMgc3RhcnQoKSB7XHJcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcclxuICAgICAgICBSZXNNZ3IubG9hZChTeXN0ZW1CdW5kbGVOYW1lLlNUQUNLLCBcImF1ZGlvL2VmZmVjdC90YXBcIiwgbmV3IFJlc0xpc3RlbmVyKHRoaXMsIChjbGljazogY2MuQXVkaW9DbGlwKSA9PiB7XHJcbiAgICAgICAgICAgIGNsaWNrLmFkZFJlZigpO1xyXG4gICAgICAgICAgICB0aGlzLl9jbGlja0NsaXAgPSBjbGljaztcclxuICAgICAgICB9KSwgdGhpcywgY2MuQXVkaW9DbGlwKTtcclxuICAgIH1cclxuICAgIGRlc3Ryb3koKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2NsaWNrQ2xpcCkge1xyXG4gICAgICAgICAgICB0aGlzLl9jbGlja0NsaXAuZGVjUmVmKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsaWNrQ2xpcCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xpY2soKTogY2MuQXVkaW9DbGlwIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY2xpY2tDbGlwO1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgR3JhcGhVdGlsIH0gZnJvbSBcInptZ191dGlsXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgJEhpdENvbXAgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG5cclxuICAgIHByb3RlY3RlZCBfY29sOiBjYy5Db2xsaWRlcjtcclxuICAgIG9uTG9hZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9jb2wgPSB0aGlzLm5vZGUuZ2V0Q29tcG9uZW50KGNjLkNvbGxpZGVyKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiDkvKDlhaXkuLrkuJbnlYzlnZDmoIdcclxuICAgICogQHBhcmFtIHBvcyBcclxuICAgICogQHBhcmFtIHR5IFxyXG4gICAgKi9cclxuICAgIHB1YmxpYyBoaXRUZXN0KHBvczogY2MuVmVjMiB8IG51bWJlciwgdHk/OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMubm9kZS5hY3RpdmVJbkhpZXJhcmNoeSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHBvcyA9IHBvcyBpbnN0YW5jZW9mIGNjLlZlYzIgPyBwb3MgOiBuZXcgY2MuVmVjMihwb3MsIHR5KTtcclxuICAgICAgICBpZiAodGhpcy5fY29sKSB7XHJcbiAgICAgICAgICAgIGxldCBpc2hpdCA9IEdyYXBoVXRpbC5oaXRUZXN0KHBvcywgdGhpcy5fY29sKTtcclxuICAgICAgICAgICAgcmV0dXJuIGlzaGl0O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5ub2RlW1wiX2hpdFRlc3RcIl0ocG9zKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBBdWRpb01nciB9IGZyb20gXCJ6bWdfYXVkaW9fbWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWdyLCBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgeyBVSU1nciB9IGZyb20gXCJ6bWdfdWlfbWdyXCI7XHJcbmltcG9ydCB7IGdMb2cgfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuaW1wb3J0IHsgR3JhcGhVdGlsIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7ICRVSU1vdXNlRXZlbnQgfSBmcm9tIFwiLi4vLi4vZXZlbnRzL1VJTW91c2VFdmVudFwiO1xyXG5pbXBvcnQgeyBfQXVkaW9SZXMgfSBmcm9tIFwiLi4vY2FjaGUvQXVkaW9SZXNcIjtcclxuaW1wb3J0ICRIaXRDb21wIGZyb20gXCJ6bWdfdWlfbWdyL3NyYy96bWd1aS9oaXQvSGl0Q29tcFwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzICRTaW1wbGVCdG4gZXh0ZW5kcyAkSGl0Q29tcCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuRmxvYXQsIHRvb2x0aXA6IFwi54K55Ye757yp5pS+5q+U5L6LXCIgfSlcclxuICAgIHpvb206IG51bWJlciA9IDAuOTA7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLmmK/lkKbkvb/nlKhjYy5ub2Rl5LqL5Lu255uR5ZCsXCIgfSlcclxuICAgIGlzT3JpZ2luYWw6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBcIuaYr+WQpua/gOa0u+eKtuaAgVwiIH0pXHJcbiAgICBzZXQgaW50ZXJhY3RhYmxlKGJvb2w6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoYm9vbCkge1xyXG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldCBpbnRlcmFjdGFibGUoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludGVyYWN0YWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Db21wb25lbnQuRXZlbnRIYW5kbGVyIH0pXHJcbiAgICBldmVudHM6IGNjLkNvbXBvbmVudC5FdmVudEhhbmRsZXJbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkF1ZGlvQ2xpcCwgdG9vbHRpcDogJ+iLpeS4jeiuvue9ruS9v+eUqOm7mOiupOmfs+aViCcgfSlcclxuICAgIGNsaWNrQXVkaW86IGNjLkF1ZGlvQ2xpcCA9IG51bGw7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogJ+S8mOWFiOe6pycgfSlcclxuICAgIHByaW9yaXR5OiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6ICflr7nosaHvvIzpu5jorqTnqbrlsLHmmK/oh6rlt7EnLCB0eXBlOiBjYy5Ob2RlIH0pXHJcbiAgICB0YXJnZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIHByb3RlY3RlZCBfaW50ZXJhY3RhYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHByb3RlY3RlZCBfc2NhbGVYOiBudW1iZXIgPSAxLjA7XHJcbiAgICBwcm90ZWN0ZWQgX3NjYWxlWTogbnVtYmVyID0gMS4wO1xyXG4gICAgcHVibGljIHNldCBzY2FsZShzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9zY2FsZVkgPSBzO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IHM7XHJcbiAgICB9XHJcblxyXG4gICAgX2lzY2xpY2tpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9pc01vdXNlRG93bjogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2NsaWNrRGlzOiBjYy5WZWMyO1xyXG4gICAgcHVibGljIGFjdGl2ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pbnRlcmFjdGFibGUgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlWCA9IHRoaXMubm9kZS5zY2FsZVg7XHJcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gdGhpcy5ub2RlLnNjYWxlWTtcclxuICAgICAgICBsZXQgczogY2MuU3ByaXRlID0gdGhpcy5ub2RlLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIGlmIChzKSB7XHJcbiAgICAgICAgICAgIC8vIHMuc2V0U3RhdGUoY2MuU3ByaXRlLlN0YXRlLk5PUk1BTCk7XHJcbiAgICAgICAgICAgIC8vIHMuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuZ2V0QnVpbHRpbk1hdGVyaWFsKCcyZC1zcHJpdGUnKSk7XHJcbiAgICAgICAgICAgIHMuc2V0TWF0ZXJpYWwoMCwgY2MuTWF0ZXJpYWwuY3JlYXRlV2l0aEJ1aWx0aW4oJzJkLXNwcml0ZScpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGlzYWJsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pbnRlcmFjdGFibGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLl9zY2FsZVggPSB0aGlzLm5vZGUuc2NhbGVYO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IHRoaXMubm9kZS5zY2FsZVk7XHJcbiAgICAgICAgbGV0IHM6IGNjLlNwcml0ZSA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuU3ByaXRlKTtcclxuICAgICAgICBpZiAocykge1xyXG4gICAgICAgICAgICAvLyBzLnNldFN0YXRlKGNjLlNwcml0ZS5TdGF0ZS5HUkFZKTtcclxuICAgICAgICAgICAgLy8gcy5zZXRNYXRlcmlhbCgwLCBjYy5NYXRlcmlhbC5nZXRCdWlsdGluTWF0ZXJpYWwoJzJkLWdyYXktc3ByaXRlJykpO1xyXG4gICAgICAgICAgICBzLnNldE1hdGVyaWFsKDAsIGNjLk1hdGVyaWFsLmNyZWF0ZVdpdGhCdWlsdGluKCcyZC1ncmF5LXNwcml0ZScpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvL+WkmueCueWxj+iUvVxyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy50YXJnZXQpIHtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQgPSB0aGlzLm5vZGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLm9uTG9hZCgpO1xyXG4gICAgICAgIGlmICghdGhpcy5jbGlja0F1ZGlvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpY2tBdWRpbyA9IF9BdWRpb1Jlcy5nZXRJbnN0YW5jZSgpLmNsaWNrO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zY2FsZVggPSB0aGlzLm5vZGUuc2NhbGVYO1xyXG4gICAgICAgIHRoaXMuX3NjYWxlWSA9IHRoaXMubm9kZS5zY2FsZVk7XHJcbiAgICB9XHJcbiAgICBhZGRMaXN0ZW5lcigpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5pc09yaWdpbmFsKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vbihjYy5Ob2RlLkV2ZW50VHlwZS5UT1VDSF9FTkQsIHRoaXMub25Ub3VjaEVuZCwgdGhpcywgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUub24oY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRXZlbnRNZ3Iub24oJFVJTW91c2VFdmVudC5NT1VTRV9VUCwgdGhpcy5vbk1vdXNlRW5kLCB0aGlzLCBmYWxzZSwgdGhpcy5wcmlvcml0eSk7XHJcbiAgICAgICAgICAgIEV2ZW50TWdyLm9uKCRVSU1vdXNlRXZlbnQuTU9VU0VfRE9XTiwgdGhpcy5vbk1vdXNlU3RhcnQsIHRoaXMsIGZhbHNlLCB0aGlzLnByaW9yaXR5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgcmVtb3ZlTGlzdGVuZXIoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNPcmlnaW5hbCkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUub2ZmKGNjLk5vZGUuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5vZmYoY2MuTm9kZS5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaFN0YXJ0LCB0aGlzLCBmYWxzZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgRXZlbnRNZ3Iub2ZmKCRVSU1vdXNlRXZlbnQuTU9VU0VfVVAsIHRoaXMub25Nb3VzZUVuZCwgdGhpcyk7XHJcbiAgICAgICAgICAgIEV2ZW50TWdyLm9mZigkVUlNb3VzZUV2ZW50Lk1PVVNFX0RPV04sIHRoaXMub25Nb3VzZVN0YXJ0LCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkVuYWJsZSgpIHtcclxuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKCk7XHJcbiAgICB9XHJcbiAgICBvbkRpc2FibGUoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcigpXHJcbiAgICB9XHJcbiAgICBvbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ldmVudHMubGVuZ3RoID0gMDtcclxuICAgICAgICB0aGlzLmV2ZW50cyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uTW91c2VFbmQoZXZ0OiAkVUlNb3VzZUV2ZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUuYWN0aXZlSW5IaWVyYXJjaHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faW50ZXJhY3RhYmxlKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc01vdXNlRG93bikge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGl0VGVzdChldnQud29ybGRQb3MpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblRvdWNoRW5kKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZ0W1wic3RvcHBlZFwiXSAmJiBldnRbXCJzdG9wcGVkXCJdKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ub3VjaENhbmNlbCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uTW91c2VTdGFydChldnQ6ICRVSU1vdXNlRXZlbnQpOiB2b2lkIHtcclxuICAgICAgICBsZXQgaXNoaXQgPSB0aGlzLmhpdFRlc3QoZXZ0LndvcmxkUG9zKVxyXG4gICAgICAgIGlmICh0aGlzLl9pbnRlcmFjdGFibGUgJiYgaXNoaXQpIHtcclxuICAgICAgICAgICAgdGhpcy5vblRvdWNoU3RhcnQoKTtcclxuICAgICAgICAgICAgZXZ0W1wic3RvcHBlZFwiXSAmJiBldnRbXCJzdG9wcGVkXCJdKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uTW91c2VNb3ZlKHBvczogY2MuVmVjMik6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnRlcmFjdGFibGUgJiYgdGhpcy5faXNNb3VzZURvd24pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGl0VGVzdChwb3MpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBNb3VzZS5pbnN0YW5jZS5zZXRTdHlsZShFbnVtTW91c2VTdHlsZS5jbGljayk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uTW91c2VMZXZlbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uVG91Y2hTdGFydCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faW50ZXJhY3RhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzTW91c2VEb3duID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5fY2xpY2tEaXMgPSBVSU1nci5tb3VzZS5tb3VzZVYyLmNsb25lKCk7XHJcbiAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudGFyZ2V0KS50bygwLjEsIHtcclxuICAgICAgICAgICAgICAgIHNjYWxlWDogdGhpcy5fc2NhbGVYICogdGhpcy56b29tLFxyXG4gICAgICAgICAgICAgICAgc2NhbGVZOiB0aGlzLl9zY2FsZVkgKiB0aGlzLnpvb21cclxuICAgICAgICAgICAgfSkuc3RhcnQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25Ub3VjaEVuZChldnQ/OiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm5vZGUuYWN0aXZlSW5IaWVyYXJjaHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5faW50ZXJhY3RhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnNjYWxlWCA9IHRoaXMuX3NjYWxlWDtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQuc2NhbGVZID0gdGhpcy5fc2NhbGVZO1xyXG4gICAgICAgICAgICBpZiAoY2MuVmVjMi5kaXN0YW5jZShVSU1nci5tb3VzZS5tb3VzZVYyLCB0aGlzLl9jbGlja0RpcykgPCAxMDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25IYW5kbGVyKGV2dCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2lzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uSGFuZGxlcihldnQ/OiBjYy5FdmVudC5FdmVudFRvdWNoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2xpY2tBdWRpbykge1xyXG4gICAgICAgICAgICBBdWRpb01nci5wbGF5RWZmZWN0KHRoaXMuY2xpY2tBdWRpbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpOiBudW1iZXI7XHJcbiAgICAgICAgaWYgKCFldnQpIHtcclxuICAgICAgICAgICAgZXZ0ID0gbmV3IGNjLkV2ZW50LkV2ZW50VG91Y2goW10sIGZhbHNlKTtcclxuICAgICAgICAgICAgZXZ0LnRhcmdldCA9IHRoaXMubm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGxlbjogbnVtYmVyID0gdGhpcy5ldmVudHMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICAvKipcclxuICAgICAgICAgICAgICog5Li65LqG5YW85a65Y2MuZXZlbnQuZXZlbnR0b3VjaCDnrKzkuIDkuKrlj4LmlbDmmK/nqbpcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2ldLmVtaXQoW2V2dCwgdGhpcy5ldmVudHNbaV0uY3VzdG9tRXZlbnREYXRhLCB0aGlzXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uTW91c2VMZXZlbCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faW50ZXJhY3RhYmxlICYmIHRoaXMuX2lzTW91c2VEb3duKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnNjYWxlWCA9IHRoaXMuX3NjYWxlWDtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQuc2NhbGVZID0gdGhpcy5fc2NhbGVZO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgb25Ub3VjaENhbmNlbCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5faW50ZXJhY3RhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2lzTW91c2VEb3duID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LnNjYWxlWCA9IHRoaXMuX3NjYWxlWDtcclxuICAgICAgICAgICAgdGhpcy50YXJnZXQuc2NhbGVZID0gdGhpcy5fc2NhbGVZO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyAkTG9hZGluZ1Nwcml0ZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuTm9kZSB9KVxyXG4gICAgdGFyZ2V0OiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlIH0pXHJcbiAgICByZWZyZXNoOiBjYy5Ob2RlID0gbnVsbDtcclxuXHJcbiAgICBwcml2YXRlIF9pc0xvYWRpbmc6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgb25Mb2FkKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9pc0xvYWRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0xvYWRpbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzTG9hZGluZztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbG9hZGluZygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgIHRoaXMudGFyZ2V0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5vcGFjaXR5ID0gMHhmZjtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy5yZWZyZXNoKS5yZXBlYXRGb3JldmVyKGNjLnR3ZWVuKCkuYnkoMSwgeyBhbmdsZTogLTM2MCB9LCB7IGVhc2luZzogXCJzbW9vdGhcIiB9KSkuc3RhcnQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICBjYy50d2Vlbih0aGlzLnRhcmdldCkudG8oMC4yLCB7IG9wYWNpdHk6IDB4ZmYgfSkuY2FsbCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjYy50d2Vlbih0aGlzLnJlZnJlc2gpLnJlcGVhdEZvcmV2ZXIoY2MudHdlZW4oKS5ieSgxLCB7IGFuZ2xlOiAtMzYwIH0sIHsgZWFzaW5nOiBcInNtb290aFwiIH0pKS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBsb2FkZWQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5faXNMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0LmFjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2guc3RvcEFsbEFjdGlvbnMoKTtcclxuICAgICAgICAgICAgY2MudHdlZW4odGhpcy50YXJnZXQpLnRvKDAuMiwgeyBvcGFjaXR5OiAwIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBlbnVtIEVTaG93SGlkZVR5cGUge1xyXG4gICAgYWxwaGEsXHJcbiAgICBzY2FsZSxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgJFNob3dIaWRlU3ByaXRlIGV4dGVuZHMgY2MuQ29tcG9uZW50IHtcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0eXBlOiBjYy5Ob2RlIH0pXHJcbiAgICB0YXJnZXQ6IGNjLk5vZGUgPSBudWxsO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkVudW0oRVNob3dIaWRlVHlwZSkgfSlcclxuICAgIHR5cGU6IEVTaG93SGlkZVR5cGUgPSBFU2hvd0hpZGVUeXBlLmFscGhhO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHRvb2x0aXA6IFwi5riQ5Y+Y5pWI5p6c5pe26Ze0XCIgfSlcclxuICAgIHRpbWU6IG51bWJlciA9IDAuMjtcclxuXHJcbiAgICBwcml2YXRlIF9pc1Nob3c6IGJvb2xlYW47XHJcbiAgICBvbkxvYWQoKTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG4gICAgcHVibGljIGlzU2hvdygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNTaG93O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNob3coZWZmZWN0OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2lzU2hvdyA9IHRydWU7XHJcbiAgICAgICAgaWYgKGVmZmVjdCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnRhcmdldC5zdG9wQWxsQWN0aW9ucygpO1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFU2hvd0hpZGVUeXBlLmFscGhhOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldC5vcGFjaXR5ICE9IDB4ZmYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy50YXJnZXQpLnRvKHRoaXMudGltZSwgeyBvcGFjaXR5OiAweGZmIH0sIHsgZWFzaW5nOiBcInNtb290aFwiIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFU2hvd0hpZGVUeXBlLnNjYWxlOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldC5zY2FsZSAhPSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNjLnR3ZWVuKHRoaXMudGFyZ2V0KS50byh0aGlzLnRpbWUsIHsgc2NhbGU6IDEgfSwgeyBlYXNpbmc6IFwic21vb3RoXCIgfSkuc3RhcnQoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFU2hvd0hpZGVUeXBlLmFscGhhOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0Lm9wYWNpdHkgPSAweGZmO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBFU2hvd0hpZGVUeXBlLnNjYWxlOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnNjYWxlID0gMS4wO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBoaWRlKGVmZmVjdDogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9pc1Nob3cgPSBmYWxzZTtcclxuICAgICAgICBpZiAoZWZmZWN0KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRhcmdldC5hY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHRoaXMudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRVNob3dIaWRlVHlwZS5hbHBoYTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy50YXJnZXQpLnRvKHRoaXMudGltZSwgeyBvcGFjaXR5OiAwIH0sIHsgZWFzaW5nOiBcInNtb290aFwiIH0pLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50YXJnZXQuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnN0YXJ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgRVNob3dIaWRlVHlwZS5zY2FsZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2MudHdlZW4odGhpcy50YXJnZXQpLnRvKHRoaXMudGltZSwgeyBzY2FsZTogMCB9LCB7IGVhc2luZzogXCJzbW9vdGhcIiB9KS5jYWxsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudGFyZ2V0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5zdGFydCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogXHJcbiAqL1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzICRTdGF0ZVNwcml0ZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlRnJhbWUgfSlcclxuICAgIGZyYW1lczogY2MuU3ByaXRlRnJhbWVbXSA9IFtdO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7IHR5cGU6IGNjLkludGVnZXIgfSlcclxuICAgIGZyYW1lSW5kZXg6IG51bWJlciA9IDA7XHJcblxyXG4gICAgQHByb3BlcnR5KHsgdHlwZTogY2MuU3ByaXRlIH0pXHJcbiAgICBzcHJpdGU6IGNjLlNwcml0ZSA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIHNldFN0YXRlKHY6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuZnJhbWVJbmRleCA9IHY7XHJcbiAgICAgICAgaWYgKHRoaXMuc3ByaXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3ByaXRlLnNwcml0ZUZyYW1lID0gdGhpcy5mcmFtZXNbdGhpcy5mcmFtZUluZGV4XTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3ByaXRlID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGUgPSB0aGlzLmdldENvbXBvbmVudChjYy5TcHJpdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zcHJpdGUpIHtcclxuICAgICAgICAgICAgdGhpcy5zcHJpdGUuc3ByaXRlRnJhbWUgPSB0aGlzLmZyYW1lc1t0aGlzLmZyYW1lSW5kZXhdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYW4oKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5ub2RlLnN0b3BBbGxBY3Rpb25zKCk7XHJcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmFuZG9tKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5mcmFtZXMubGVuZ3RoKSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgRXZlbnROYW1lIH0gZnJvbSBcInptZ19ldmVudF9tZ3JcIjtcclxuaW1wb3J0IHsgZ0xvZyB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIF96bVR3ZWVuIHtcclxuICAgIHByaXZhdGUgX3RhcmdldDogYW55O1xyXG4gICAgY29uc3RydWN0b3IodGFyZ2V0OiBhbnkpIHtcclxuICAgICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XHJcbiAgICB9XHJcblxyXG4gICAgdG88T1BUUyBleHRlbmRzIFBhcnRpYWw8eyBwcm9ncmVzczogRnVuY3Rpb24sIGVhc2luZzogRnVuY3Rpb24gfCBTdHJpbmcgfT4+KGR1cmF0aW9uOiBudW1iZXIsIHByb3BzOiBhbnksIG9wdHM/OiBPUFRTKTogY2MuVHdlZW4ge1xyXG4gICAgICAgIHRoaXMuZnVsbEZyYW1lUmF0aW8oKTtcclxuICAgICAgICBpZiAodGhpcy5fdGFyZ2V0IGluc3RhbmNlb2YgY2MuTm9kZSkge1xyXG4gICAgICAgICAgICB0aGlzLl90YXJnZXQub24oRXZlbnROYW1lLkRFU1RST1lfTk9ERSwgdGhpcy5yZWNvdmVyRnJhbWVSYXRpb0hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2MudHdlZW4odGhpcy5fdGFyZ2V0KS50byhkdXJhdGlvbiwgcHJvcHMsIG9wdHMpLmNhbGwoKCkgPT4ge1xyXG4gICAgICAgICAgICAvL+WHj+aFouWxj+WIt+mAn+W6plxyXG4gICAgICAgICAgICB0aGlzLnJlY292ZXJGcmFtZVJhdGlvKCk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl90YXJnZXQgaW5zdGFuY2VvZiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXQub2ZmKEV2ZW50TmFtZS5ERVNUUk9ZX05PREUsIHRoaXMucmVjb3ZlckZyYW1lUmF0aW9IYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmVjb3ZlckZyYW1lUmF0aW9IYW5kbGVyKG5vZGU6IGNjLk5vZGUpIHtcclxuICAgICAgICB0aGlzLnJlY292ZXJGcmFtZVJhdGlvKCk7XHJcbiAgICAgICAgdGhpcy5fdGFyZ2V0Lm9mZihFdmVudE5hbWUuREVTVFJPWV9OT0RFLCB0aGlzLnJlY292ZXJGcmFtZVJhdGlvSGFuZGxlciwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICByZWNvdmVyRnJhbWVSYXRpbygpIHtcclxuICAgICAgICBjYy5nYW1lW1wicmVjb3ZlckZyYW1lUmF0aW9cIl0gJiYgY2MuZ2FtZVtcInJlY292ZXJGcmFtZVJhdGlvXCJdKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVsbEZyYW1lUmF0aW8oKSB7XHJcbiAgICAgICAgY2MuZ2FtZVtcImZ1bGxGcmFtZVJhdGlvXCJdICYmIGNjLmdhbWVbXCJmdWxsRnJhbWVSYXRpb1wiXSgpO1xyXG4gICAgfVxyXG4gICAgcmVwZWF0Rm9yZXZlcihhY3Rpb24/OiBjYy5BY3Rpb24gfCBjYy5Ud2Vlbik6IGNjLlR3ZWVuIHtcclxuICAgICAgICB0aGlzLmZ1bGxGcmFtZVJhdGlvKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RhcmdldCBpbnN0YW5jZW9mIGNjLk5vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0Lm9uKEV2ZW50TmFtZS5ERVNUUk9ZX05PREUsIHRoaXMucmVjb3ZlckZyYW1lUmF0aW9IYW5kbGVyLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGNjLnR3ZWVuKHRoaXMuX3RhcmdldCkucmVwZWF0Rm9yZXZlcihhY3Rpb24pO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgc3RvcEFsbEFjdGlvbnMoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RhcmdldC5zdG9wQWxsQWN0aW9ucygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3ZlckZyYW1lUmF0aW8oKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuX3RhcmdldCBpbnN0YW5jZW9mIGNjLk5vZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldC5vZmYoRXZlbnROYW1lLkRFU1RST1lfTk9ERSwgdGhpcy5yZWNvdmVyRnJhbWVSYXRpb0hhbmRsZXIsIHRoaXMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7ICRSb2xlRXZlbnQgfSBmcm9tIFwiLi96bWd1aS9yb2xlL1JvbGVFdmVudFwiO1xyXG5pbXBvcnQgeyAkVUlFdmVudCB9IGZyb20gXCIuL2V2ZW50cy9VSUV2ZW50XCI7XHJcbmltcG9ydCB7ICRVSUJhY2tFdmVudCB9IGZyb20gXCIuL2V2ZW50cy9VSUJhY2tFdmVudFwiO1xyXG5pbXBvcnQgeyAkVUlNb3VzZUV2ZW50IH0gZnJvbSBcIi4vZXZlbnRzL1VJTW91c2VFdmVudFwiO1xyXG5pbXBvcnQgeyAkUmV3YXJkTGF5ZXIgfSBmcm9tIFwiLi9zeXN1aS9VSUxheWVyL1Jld2FyZExheWVyXCI7XHJcbmltcG9ydCB7ICRFUm9sZUFjdGlvbiwgJEVQZXRBY3Rpb24gfSBmcm9tIFwiLi96bWd1aS9yb2xlL0VSb2xlQWN0aW9uXCI7XHJcbmltcG9ydCB7IF9BY3RvciB9IGZyb20gXCIuL3ptZ3VpL3JvbGUvQWN0b3JcIjtcclxuaW1wb3J0IHsgJFJvbGUgfSBmcm9tIFwiLi96bWd1aS9yb2xlL1JvbGVcIjtcclxuaW1wb3J0IHsgX0ZvbnRNZ3IgfSBmcm9tIFwiLi9zeXN1aS9Gb250TWdyXCI7XHJcbmltcG9ydCB7IF9VSU1nciB9IGZyb20gXCIuL1VJTWdyXCI7XHJcbmltcG9ydCAkQmFzZVVJIGZyb20gXCIuL3N5c3VpL0Jhc2VVSVwiO1xyXG5pbXBvcnQgeyAkVUlUcmFuc2l0aW9ucyB9IGZyb20gXCIuL3N5c3VpL1VJVHJhbnNpdGlvbnNcIjtcclxuaW1wb3J0IHsgJFVJTW91c2UgfSBmcm9tIFwiLi9zeXN1aS9VSU1vdXNlXCI7XHJcbmltcG9ydCB7ICRVSU1hc2sgfSBmcm9tIFwiLi9zeXN1aS9VSU1hc2tcIjtcclxuaW1wb3J0IHsgJFVJTG9hZGluZyB9IGZyb20gXCIuL3N5c3VpL1VJTG9hZGluZ1wiO1xyXG5pbXBvcnQgeyAkVUlCYWNrQnRuIH0gZnJvbSBcIi4vc3lzdWkvVUlCYWNrQnRuXCI7XHJcbmltcG9ydCB7ICRVSUxheWVyIH0gZnJvbSBcIi4vc3lzdWkvVUlMYXllclwiO1xyXG5pbXBvcnQgeyAkQWxlcnQgfSBmcm9tIFwiLi9zeXN1aS9hbGVydC9BbGVydFwiO1xyXG5pbXBvcnQgeyBfVG9hc3RNZ3IgfSBmcm9tIFwiLi9zeXN1aS9Ub2FzdE1nclwiO1xyXG5pbXBvcnQgeyBfQWxlcnRNZ3IgfSBmcm9tIFwiLi9zeXN1aS9hbGVydC9BbGVydE1nclwiO1xyXG5pbXBvcnQgeyAkQWxlcnRBc3NldCB9IGZyb20gXCIuL3N5c3VpL2FsZXJ0L0FsZXJ0QXNzZXRcIjtcclxuaW1wb3J0ICRTaW1wbGVCdG4gZnJvbSBcInptZ191aV9tZ3Ivc3JjL3ptZ3VpL2J0bi9TaW1wbGVCdG5cIjtcclxuaW1wb3J0IHsgX0F1ZGlvUmVzIH0gZnJvbSBcIi4vem1ndWkvY2FjaGUvQXVkaW9SZXNcIjtcclxuaW1wb3J0ICRMb2FkaW5nU3ByaXRlIGZyb20gXCIuL3ptZ3VpL3Nwcml0ZS9Mb2FkaW5nU3ByaXRlXCI7XHJcbmltcG9ydCAkU2hvd0hpZGVTcHJpdGUgZnJvbSBcIi4vem1ndWkvc3ByaXRlL1Nob3dIaWRlU3ByaXRlXCI7XHJcbmltcG9ydCAkU3RhdGVTcHJpdGUgZnJvbSBcIi4vem1ndWkvc3ByaXRlL1N0YXRlU3ByaXRlXCI7XHJcbmltcG9ydCB7IF96bVR3ZWVuIH0gZnJvbSBcIi4vZnJhbWVSYXRpby96bVR3ZWVuXCI7XHJcblxyXG5leHBvcnQgKiBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQWxlcnRBc3NldCBleHRlbmRzICRBbGVydEFzc2V0IHsgfTtcclxuZXhwb3J0IGxldCBBbGVydE1nciA9IF9BbGVydE1nci5nZXRJbnN0YW5jZSgpO1xyXG5leHBvcnQgbGV0IFRvYXN0TWdyID0gX1RvYXN0TWdyLmdldEluc3RhbmNlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgQWxlcnQgZXh0ZW5kcyAkQWxlcnQgeyB9O1xyXG5leHBvcnQgY2xhc3MgVUlMYXllciBleHRlbmRzICRVSUxheWVyIHsgfTtcclxuZXhwb3J0IGNsYXNzIFVJQmFja0J0biBleHRlbmRzICRVSUJhY2tCdG4geyB9XHJcbmV4cG9ydCBjbGFzcyBVSUxvYWRpbmcgZXh0ZW5kcyAkVUlMb2FkaW5nIHsgfTtcclxuZXhwb3J0IGNsYXNzIFVJTWFzayBleHRlbmRzICRVSU1hc2sgeyB9O1xyXG5cclxuZXhwb3J0IGNsYXNzIFVJTW91c2UgZXh0ZW5kcyAkVUlNb3VzZSB7IH07XHJcblxyXG5leHBvcnQgY2xhc3MgVUlUcmFuc2l0aW9ucyBleHRlbmRzICRVSVRyYW5zaXRpb25zIHsgfTtcclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlVUkgZXh0ZW5kcyAkQmFzZVVJIHsgfVxyXG4vLyBleHBvcnQgKiBmcm9tIFwiLi9VSU1nclwiO1xyXG5leHBvcnQgbGV0IFVJTWdyID0gX1VJTWdyLmdldEluc3RhbmNlKCk7XHJcblxyXG4vLyBleHBvcnQgKiBmcm9tIFwiLi9jb21wb25lbnRzL0ZvbnRNZ3JcIjtcclxuZXhwb3J0IGxldCBGb250TWdyID0gX0ZvbnRNZ3IuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbmV4cG9ydCBjbGFzcyBSb2xlIGV4dGVuZHMgJFJvbGUgeyB9O1xyXG4vLyBleHBvcnQgKiBmcm9tIFwiLi9jb21wb25lbnRzL3JvbGUvQWN0b3JcIjtcclxuXHJcbi8vIGV4cG9ydCAqIGZyb20gXCIuL2NvbXBvbmVudHMvcm9sZS9FUm9sZUFjdGlvblwiO1xyXG4vLyBleHBvcnQgKiBmcm9tIFwiLi9jb21wb25lbnRzL1VJTGF5ZXIvUmV3YXJkTGF5ZXJcIjtcclxuZXhwb3J0IGNsYXNzIFJld2FyZExheWVyIGV4dGVuZHMgJFJld2FyZExheWVyIHsgfTtcclxuLy8gZXhwb3J0ICogZnJvbSBcIi4vZXZlbnRzL1VJQmFja0V2ZW50XCI7XHJcbmV4cG9ydCBjbGFzcyBVSUJhY2tFdmVudCBleHRlbmRzICRVSUJhY2tFdmVudCB7IH1cclxuLy8gZXhwb3J0ICogZnJvbSBcIi4vZXZlbnRzL1VJRXZlbnRcIjtcclxuZXhwb3J0IGNsYXNzIFVJRXZlbnQgZXh0ZW5kcyAkVUlFdmVudCB7IH1cclxuLy8gZXhwb3J0ICogZnJvbSBcIi4vZXZlbnRzL1VJTW91c2VFdmVudFwiO1xyXG5leHBvcnQgY2xhc3MgVUlNb3VzZUV2ZW50IGV4dGVuZHMgJFVJTW91c2VFdmVudCB7IH1cclxuXHJcbi8vIGV4cG9ydCAqIGZyb20gXCIuL2NvbXBvbmVudHMvcm9sZS9Sb2xlRXZlbnRcIjtcclxuZXhwb3J0IGNsYXNzIFJvbGVFdmVudCBleHRlbmRzICRSb2xlRXZlbnQgeyB9O1xyXG5cclxuZXhwb3J0IGxldCBFUm9sZUFjdGlvbiA9ICRFUm9sZUFjdGlvbjtcclxuZXhwb3J0IGxldCBFUGV0QWN0aW9uID0gJEVQZXRBY3Rpb247XHJcblxyXG5leHBvcnQgbGV0IEFjdG9yID0gX0FjdG9yLmdldEluc3RhbmNlO1xyXG5leHBvcnQgbGV0IEF1ZGlvUmVzID0gX0F1ZGlvUmVzLmdldEluc3RhbmNlKCk7XHJcblxyXG5leHBvcnQgY2xhc3Mgem1ndWlfYnRuX1NpbXBsZUJ0biBleHRlbmRzICRTaW1wbGVCdG4geyB9O1xyXG5leHBvcnQgY2xhc3Mgem1ndWlfc3ByaXRlX0xvYWRpbmdTcHJpdGUgZXh0ZW5kcyAkTG9hZGluZ1Nwcml0ZSB7IH07XHJcbmV4cG9ydCBjbGFzcyB6bWd1aV9zcHJpdGVfU2hvd0hpZGVTcHJpdGUgZXh0ZW5kcyAkU2hvd0hpZGVTcHJpdGUgeyB9O1xyXG5leHBvcnQgY2xhc3Mgem1ndWlfc3ByaXRlX1N0YXRlU3ByaXRlIGV4dGVuZHMgJFN0YXRlU3ByaXRlIHsgfTtcclxuZXhwb3J0IGxldCB6bVR3ZWVuID0gZnVuY3Rpb24gKHRhcmdldCkge1xyXG4gICAgcmV0dXJuIG5ldyBfem1Ud2Vlbih0YXJnZXQpO1xyXG59O1xyXG5cclxuLy8gbGV0IHpvbmUgPSB7XHJcbi8vICAgICBBWm9uZTogJEFab25lLFxyXG4vLyAgICAgQVRhcmdldDogJEFUYXJnZXQsXHJcbi8vICAgICBBU3dhcDogJEFTd2FwLFxyXG4vLyAgICAgQVN0YXI6ICRBU3RhcixcclxuLy8gICAgIEFOb2RlOiAkQU5vZGUsXHJcbi8vICAgICBBTW92ZUJ1dHRvbjogJEFNb3ZlQnV0dG9uLFxyXG4vLyAgICAgQU1hcDogJEFNYXAsXHJcbi8vICAgICBBR3JpZDogJEFHcmlkLFxyXG4vLyAgICAgQUV2ZW50OiAkQUV2ZW50LFxyXG4vLyAgICAgQUVkaXRNYXA6ICRBRWRpdE1hcFxyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgbGV0IHptdWlzID0ge1xyXG4vLyAgICAgem9uZTogem9uZVxyXG4vLyB9O1xyXG5cclxuLy8gZXhwb3J0IGxldCBBWm9uZSA9ICRBWm9uZTtcclxuLy8gZXhwb3J0IGRlY2xhcmUgbmFtZXNwYWNlIHptdWlzIHtcclxuLy8gICAgIGV4cG9ydCBjbGFzcyBBWm9uZSBleHRlbmRzICRBWm9uZSB7XHJcblxyXG4vLyAgICAgfVxyXG4vLyB9XHJcbi8vIHdpbmRvd1tcInptdWlzXCJdID0gem11aXM7XHJcbiJdLCJuYW1lcyI6WyJFdmVudE5hbWUiLCJSZXNNZ3IiLCJEcmFnb25SZXNBc3NldCIsIkRyYWdvblV0aWwiLCJnTG9nIiwiZ1dhcm4iLCJFdmVudE1nciIsIlNwcml0ZVV0aWwiLCJEcmFnb25SZXNMaXN0ZW5lciIsIkF1ZGlvTWdyIiwiU2VydmVyTWdyIiwiem1nQ29tbWFuZHMiLCJSZXNMaXN0ZW5lciIsIkJhc2VNZ3IiLCJTeXN0ZW1CdW5kbGVOYW1lIiwiU3RyaW5nVXRpbCIsInptVHdlZW4iLCJVSU1nciIsIlJlc0Fzc2V0IiwiQ29uZmlnTWdyIiwiRm9udE1nciIsIkVSZXNFdmVudE5hbWUiLCJDYW1lYXJNZ3IiLCJEaXJlY3Rvck1nciIsIkRpcmVjdG9yRXZlbnQiLCJOb2RlVXRpbCIsIl9hIiwiY2NjbGFzcyIsInByb3BlcnR5IiwiR3JhcGhVdGlsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
