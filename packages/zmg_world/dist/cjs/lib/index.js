'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zmg_config_mgr = require('zmg_config_mgr');
var zmg_env_mgr = require('zmg_env_mgr');
var zmg_event_mgr = require('zmg_event_mgr');
var zmg_mgr = require('zmg_mgr');
var zmg_ui_mgr = require('zmg_ui_mgr');
var zmg_util = require('zmg_util');
var zmg_webserver_mgr = require('zmg_webserver_mgr');
var zmg_res_mgr = require('zmg_res_mgr');
var zmg_module_mgr = require('zmg_module_mgr');
var zmg_gamedata_mgr = require('zmg_gamedata_mgr');
var zmg_audio_mgr = require('zmg_audio_mgr');
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

var _UserEventName = /** @class */ (function () {
    function _UserEventName() {
    }
    _UserEventName.FRUIT_CHANGE = 'fruitChange';
    _UserEventName.SLEEP_CHANGE = 'sleepChange';
    _UserEventName.WASH_CHANGE = 'washChange';
    _UserEventName.ENERGY_CHANGE = 'energyChange';
    _UserEventName.CLEAN_CHANGE = 'cleanChange';
    _UserEventName.GREET_CARD = 'greetCard';
    return _UserEventName;
}());

var UserCardVo = /** @class */ (function (_super) {
    __extends(UserCardVo, _super);
    function UserCardVo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UserCardVo.prototype.setData = function (res) {
        this._info = res;
        this.greetCardTip = res.greetCardTip;
    };
    Object.defineProperty(UserCardVo.prototype, "isGreetCard", {
        get: function () {
            var module = zmg_config_mgr.ConfigMgr.getModuleConfigByCode("GreetCard");
            if (module && module.isClose) {
                return false;
            }
            if (this.greetCardTip.status > 0) {
                return true;
            }
            else {
                return false;
            }
        },
        set: function (s) {
            if (!s) {
                this.greetCardTip.status = 0;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserCardVo.prototype, "hasGreetCard", {
        get: function () {
            if (this._hasGreetCard === undefined) {
                this._hasGreetCard = false;
                return this._hasGreetCard;
            }
            else {
                return this._hasGreetCard;
            }
        },
        set: function (value) {
            if (this._hasGreetCard === undefined) {
                this._hasGreetCard = false;
            }
            else {
                this._hasGreetCard = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserCardVo.prototype, "hasReciveGreetCard", {
        get: function () {
            if (this._hasReciveGreetCard === undefined) {
                this._hasReciveGreetCard = false;
                return this._hasReciveGreetCard;
            }
            else {
                return this._hasReciveGreetCard;
            }
        },
        set: function (value) {
            if (this._hasReciveGreetCard === undefined) {
                this._hasReciveGreetCard = false;
            }
            else {
                this._hasReciveGreetCard = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserCardVo.prototype, "hasNewGreetCard", {
        /**
         * @description: 是否有新贺卡查收提醒
         */
        set: function (value) {
            if (this._hasNewGreetCard === undefined) {
                this._hasNewGreetCard = false;
            }
            else {
                this._hasNewGreetCard = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UserCardVo.prototype, "greetCardTip", {
        get: function () {
            if (this._greetCardTip === undefined) {
                this._greetCardTip = { cardNum: 0, status: 0 };
                return this._greetCardTip;
            }
            else {
                return this._greetCardTip;
            }
        },
        set: function (value) {
            if (this._greetCardTip === undefined) {
                this._greetCardTip = value;
            }
            else {
                this._greetCardTip = value;
            }
            this._info.greetCardTip = value;
            this.hasGreetCard = false;
            this.hasReciveGreetCard = false;
            this.hasNewGreetCard = false;
            if (this._greetCardTip) {
                switch (this._greetCardTip.status) {
                    //0 无提醒 1 收到贺卡 2 收到回复 3 贺卡上新
                    case 0:
                        break;
                    case 1:
                        this.hasGreetCard = true;
                        break;
                    case 2:
                        this.hasReciveGreetCard = true;
                        break;
                    case 3:
                        this.hasNewGreetCard = true;
                        break;
                }
            }
            // let user = _UserMgr.getInstance();
            // user.emit(_UserEventName.GREET_CARD, this._greetCardTip)
            this.emit(_UserEventName.GREET_CARD, this._greetCardTip);
        },
        enumerable: false,
        configurable: true
    });
    return UserCardVo;
}(cc.EventTarget));

/**
 * swagger:
 * http://kids-study-park-c-fat-alhz.inzm.com/swagger-ui.html#/
 */
var $Commands;
(function ($Commands) {
    //-----------------------------------------大厅-----------------------------------------
    /**
     * 获取大厅基本信息
     */
    $Commands["getHallBaseInfo"] = "/kids/study/park/c/api/hall/getHallBaseInfo";
    $Commands["getStudentBaseInfo"] = "/kids/study/park/c/api/config/getStudentBaseInfo";
    /**
    * 获取彩蛋信息
    */
    $Commands["eggReward"] = "/kids/study/park/c/api/hall/checkpointReward";
    $Commands["eggInfo"] = "/kids/study/park/c/api/hall/getHallCheckpointInfo";
    /**
     * 获取学伴信息
     */
    $Commands["getPartnerInfo"] = "/kids/study/park/c/api/v2/partner/optimize/getPartnerInfo";
    //海报
    $Commands["getLandInfo"] = "/kids/study/park/c/api/partner/poster/wall/posterFrameShow";
    $Commands["hangingPoster"] = "/kids/study/park/c/api/partner/poster/wall/hangingPoster";
    $Commands["posterPage"] = "/kids/study/park/c/api/partner/poster/wall/posterPage";
    /**
     * 获取装扮
     */
    $Commands["getRoleDressUps"] = "/kids/study/park/c/api/partner/dressUp/query/userDressUps";
    /**
     * 更新能量果
     */
    $Commands["getFruitTotalNum"] = "/kids/study/park/c/api/v2/partner/energyFruit/amount";
    /**
     * 领取学伴
     */
    $Commands["gainCompanion"] = "/kids/study/park/c/api/v2/partner/addPartner";
    /**
     * 灰度查询
     */
    $Commands["graySurvey"] = "/kids/api/grayApi/toc/gray/findGrayEffectByCodeAndParam";
    $Commands["grayListSurvey"] = "/kids/api/grayApi/toc/gray/findMany";
    /**
     * 原生模块信息列表
     */
    $Commands["moduleList"] = "/kids/study/park/c/api/native/module/query/list";
    /**
     * 获取存储服务器数据
     */
    $Commands["getStorage"] = "/kids/study/park/c/api/dict/storage/batch";
    $Commands["setStorage"] = "/kids/study/park/c/api/dict/storage/put";
    /**
     * 奖励中心
     */
    $Commands["rewardCenterInit"] = "/kidsStuApi/award/centre/task/init";
    $Commands["getRewardCenterList"] = "/kidsStuApi/award/centre/task/list";
    $Commands["getRewardCenterAward"] = "/kidsStuApi/award/centre/take/award";
    $Commands["getRewardCenterRemind"] = "/kidsStuApi/award/centre/task/remind";
    /**
     * 签到
     */
    $Commands["signList"] = "/kids/study/park/c/api/signIn/current/signIn/list";
    $Commands["isSignIn"] = "/kids/study/park/c/api/signIn/isSignIn";
    $Commands["signIn"] = "/kids/study/park/c/api/signIn/signIn";
    /**
     * 广告弹窗
     */
    $Commands["addOperationInfo"] = "/kids/study/park/c/api/popup/window/addOperationInfo";
    $Commands["window_award"] = "/kids/study/park/c/api/popup/window/get/award";
    $Commands["window_get"] = "/kids/study/park/c/api/popup/window/get";
    $Commands["getQuestionnaireConfig"] = "/kidsStuApi/api/feedback/list";
    /**
     * npc领奖
     */
    $Commands["npcReward"] = "/kids/study/park/c/api/hall/npcReward";
    /**
     * 大厅NPC
     */
    $Commands["npcInfo"] = "/kids/study/park/c/api/hall/getHallNpcInfo";
    //角标点击通知
    $Commands["getHallModuleIconInfo"] = "/kids/study/park/c/api/hall/getHallModuleIconInfo";
    /**勋章 */
    $Commands["carryMedal"] = "/kids/medal-wall/api/medal/carry";
    $Commands["ownMedal"] = "/kids/medal-wall/api/user-medal/own";
    //试衣间
    $Commands["getDressDetail"] = "/kids/study/park/c/api/partner/dressUp/product/detail";
    $Commands["getWardrobeList"] = "/kids/study/park/c/api/partner/dressUp/query/dressUps";
    $Commands["saveRoleDressUps"] = "/kids/study/park/c/api/partner/dressUp/save/userDressUps";
    $Commands["getWardrobeBar"] = "/kids/study/park/c/api/partner/dressUp/wardrobe/bar";
    $Commands["getNewClothProduct"] = "/kids/study/park/c/api/partner/dressUp/remind/newFreeProduct";
    $Commands["uploadTryOnRecord"] = "/kids/study/park/c/api/partner/dressUp/save/userDressRecord";
    $Commands["getWardrobeCategInfo"] = "/kids/study/park/c/api/partner/dressUp/product/directory";
    //上传图片
    $Commands["uploadImg"] = "/kids/study/park/c/api/file/data/image/upload";
    /**House************************************************************************************************************/
    $Commands["subtractFruit"] = "/kids/study/park/c/api/partner/subtractFruit";
    $Commands["sleep"] = "/kids/study/park/c/api/v2/partner/sleep";
    $Commands["wash"] = "/kids/study/park/c/api/v2/partner/wash";
    $Commands["recordClean"] = "/kids/study/park/stat/api/park/partner/record/clean";
    $Commands["recordCleanRsult"] = "/kids/study/park/stat/api/park/partner/record/cleanRsult";
    $Commands["recordEat"] = "/kids/study/park/stat/api/park/partner/record/eat";
    $Commands["recordSleep"] = "/kids/study/park/stat/api/park/partner/record/sleep";
    $Commands["recordWash"] = "/kids/study/park/stat/api/park/partner/record/wash";
    $Commands["actionConfig"] = "/kids/study/park/c/api/partner/actionConfig";
    $Commands["cleanRoom"] = "/kids/study/park/c/api/partner/clean";
    //房间道具换肤
    $Commands["dressList"] = "/kids/study/park/c/api/furniture/dressList";
    $Commands["purchase"] = "/kids/study/park/c/api/furniture/purchase";
    $Commands["saveUserFurniture"] = "/kids/study/park/c/api/furniture/saveUserFurniture";
    $Commands["types"] = "/kids/study/park/c/api/furniture/types";
    $Commands["userFurniturDressList"] = "/kids/study/park/c/api/furniture/userFurniturDressList";
    /**Cais************************************************************************************************************/
    $Commands["setPlayAndRestTimeConfig"] = "/kids/api/study/park/api/config/setPlayAndRestTimeConfig";
    $Commands["getPlayAndRestTimeConfig"] = "/kids/api/study/park/api/config/getPlayAndRestTimeConfig";
    /**
     * 引导奖励
     */
    $Commands["getEnergyFruit"] = "/kids/study/park/c/api/hall/getEnergyFruit";
    //勋章墙
    $Commands["recordGuideMedal"] = "/kids/medal-wall/api/guide/record-guide";
    $Commands["allMedal"] = "/kids/medal-wall/api/user-medal-wall/all";
    $Commands["noviewMedal"] = "/kids/medal-wall/api/user-medal/no-view";
    $Commands["viewMedal"] = "/kids/medal-wall/api/user-medal/save/view-medal";
    $Commands["removeMedal"] = "/kids/medal-wall/api/medal/remove";
    $Commands["acceptMedal"] = "/kids/medal-wall/api/medal/accept";
    $Commands["countMedal"] = "/kids/medal-wall/api/medal/not-accepted/count";
    $Commands["listMedal"] = "/kids/medal-wall/api/medal/not-accepted/list";
    $Commands["achievementMedal"] = "/kids/medal-wall/api/user-medal-wall/achievement/page";
    $Commands["infoMedal"] = "/kids/medal-wall/api/user-medal/info";
    $Commands["isGuidedMedal"] = "/kids/medal-wall/api/guide/is-guided";
    $Commands["carryUserMedal"] = "/kids/medal-wall/api/user-medal/carry";
    $Commands["catalogueMedal"] = "/kids/medal-wall/api/rank/medal/catalogue";
    $Commands["getRankMedal"] = "/kids/medal-wall/api/rank/medal/getRank";
    $Commands["getBatchMedal"] = "/kids/study/park/c/api/partner/dressUp/query/userDressUps/batch";
    /**Mall奇妙商城相关接口************************************************************************************************************/
    $Commands["getMallDesc"] = "/kids/study/park/c/api/fantastic/mall/desc";
    $Commands["getGooldsTypeList"] = "/kids/study/park/c/api/v3/fantastic/mall/product/type/list";
    $Commands["getRecommendList"] = "/kids/study/park/c/api/v3/fantastic/mall/product/recommendList";
    $Commands["getActivityList"] = "/kids/study/park/c/api/v3/fantastic/mall/activity/product/list";
    $Commands["getGoodsDetailInf"] = "/kids/study/park/c/api/v3/fantastic/mall/product/detail";
    $Commands["getOrderList"] = "/kids/study/park/c/api/fantastic/mall/order/list";
    $Commands["purchaseGoods"] = "/kids/study/park/c/api/v3/fantastic/mall/purchase";
    $Commands["getGoodsList"] = "/kids/study/park/c/api/v3/fantastic/mall/product/list";
    /**
     * 任务中心
    */
    $Commands["taskAward"] = "/kidsStuApi/task/centre/take/award";
    $Commands["taskInit"] = "/kidsStuApi/task/centre/take/init";
    $Commands["todoTaskList"] = "/kidsStuApi/task/centre/todo/list";
    $Commands["getTaskUrl"] = "/kidsStuApi/task/centre/task/getUrl";
    $Commands["unClaimed"] = "/kidsStuApi/task/centre/unclaimed";
    $Commands["boxAward"] = "/kidsStuApi/task/centre/box/award";
    $Commands["boxNode"] = "/kidsStuApi/task/centre/box/node";
    $Commands["boxList"] = "/kidsStuApi/task/centre/box/list";
    /**
     * 贺卡相关接口
     */
    $Commands["festivalRead"] = "/kids/study/park/c/api/greet/card/festival/tip/read";
    $Commands["greetCardInbox"] = "/kids/study/park/c/api/greet/card/receive/greetCardInbox";
    $Commands["readGreetMessage"] = "/kids/study/park/c/api/greet/card/receive/readMessage";
    $Commands["unGreetReadMessage"] = "/kids/study/park/c/api/greet/card/receive/unReadMessage";
    $Commands["greetCardSend"] = "/kids/study/park/c/api/greet/card/send/sendCard";
    $Commands["sendCardDecorateInfo"] = "/kids/study/park/c/api/greet/card/send/sendCardDecorateInfo";
    $Commands["sendGreetCardInfo"] = "/kids/study/park/c/api/greet/card/send/sendCardInfo";
    $Commands["unReadMessageCount"] = "/kids/study/park/c/api/greet/card/receive/unReadMessageCount";
})($Commands || ($Commands = {}));

var UserClearVo = /** @class */ (function (_super) {
    __extends(UserClearVo, _super);
    function UserClearVo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.CLEAN_CHANGE = 'cleanChange';
        return _this;
    }
    UserClearVo.prototype.setData = function (res) {
        var _this = this;
        this._cleanRoomInfo = [];
        if (res.cleanRoomInfo) {
            res.cleanRoomInfo.forEach(function (element) {
                _this.setRoomCleanLinessByFloorId(element);
            });
        }
    };
    /**
        * 根据房间楼层号设置楼层垃圾信息
        */
    UserClearVo.prototype.setRoomCleanLinessByFloorId = function (info) {
        if (!this._cleanRoomInfo) {
            this._cleanRoomInfo = this._cleanRoomInfo || [];
            this._cleanRoomInfo.push(info);
            return info;
        }
        else {
            for (var i = 0; i < this._cleanRoomInfo.length; i++) {
                if (this._cleanRoomInfo[i].index == info.index) {
                    this._cleanRoomInfo[i].cleanValue = info.cleanValue;
                    this._cleanRoomInfo[i].isToClean = info.isToClean;
                    return info;
                }
            }
            this._cleanRoomInfo = this._cleanRoomInfo || [];
            this._cleanRoomInfo.push(info);
            return info;
        }
    };
    /**
     * 根据房间楼层号获取楼层垃圾信息
     */
    UserClearVo.prototype.getRoomCleanLinessByFloorId = function (id) {
        if (!this._cleanRoomInfo) {
            if (id < 0)
                zmg_util.gLog('检索楼层id有误');
            var m = {
                cleanValue: 0,
                index: id,
                isToClean: true,
            };
            this._cleanRoomInfo = this._cleanRoomInfo || [];
            this._cleanRoomInfo.push(m);
            return m;
        }
        else {
            for (var i = 0; i < this._cleanRoomInfo.length; i++) {
                if (this._cleanRoomInfo[i].index == id) {
                    return this._cleanRoomInfo[i];
                }
            }
            if (id < 0)
                zmg_util.gLog('检索楼层id有误');
            var m = {
                cleanValue: 0,
                index: id,
                isToClean: true,
            };
            this._cleanRoomInfo = this._cleanRoomInfo || [];
            this._cleanRoomInfo.push(m);
            return m;
        }
    };
    /**
     *  根据房间楼层号设置楼层清洁值
     */
    UserClearVo.prototype.setRoomCleanValueByFloorId = function (id, Value) {
        if (!this._cleanRoomInfo) {
            if (id < 0)
                zmg_util.gLog('检索楼层id有误');
            var m = {
                cleanValue: Value,
                index: id,
                isToClean: Value > 30 ? false : true,
            };
            this._cleanRoomInfo = this._cleanRoomInfo || [];
            this._cleanRoomInfo.push(m);
            this.emit(_UserEventName.CLEAN_CHANGE);
            return m;
        }
        else {
            for (var i = 0; i < this._cleanRoomInfo.length; i++) {
                if (this._cleanRoomInfo[i].index == id) {
                    this._cleanRoomInfo[i].cleanValue = Value;
                    this.setRoomIsToCleanByFloorId(id, Value > 30 ? false : true);
                    this.emit(_UserEventName.CLEAN_CHANGE);
                    return this._cleanRoomInfo[i];
                }
            }
            if (id < 0)
                zmg_util.gLog('检索楼层id有误');
            var m = {
                cleanValue: Value,
                index: id,
                isToClean: Value > 30 ? false : true,
            };
            this._cleanRoomInfo = this._cleanRoomInfo || [];
            this._cleanRoomInfo.push(m);
            this.emit(_UserEventName.CLEAN_CHANGE);
            return m;
        }
    };
    /**
     *  根据房间楼层号设置楼层清洁值
     */
    UserClearVo.prototype.setRoomIsToCleanByFloorId = function (id, Value) {
        if (!this._cleanRoomInfo) {
            if (id < 0)
                zmg_util.gLog('检索楼层id有误');
            var m = {
                cleanValue: Value ? 0 : 100,
                index: id,
                isToClean: Value,
            };
            this._cleanRoomInfo = this._cleanRoomInfo || [];
            this._cleanRoomInfo.push(m);
            return m;
        }
        else {
            for (var i = 0; i < this._cleanRoomInfo.length; i++) {
                if (this._cleanRoomInfo[i].index == id) {
                    this._cleanRoomInfo[i].isToClean = Value;
                    return this._cleanRoomInfo[i];
                }
            }
            if (id < 0)
                zmg_util.gLog('检索楼层id有误');
            var m = {
                cleanValue: Value ? 0 : 100,
                index: id,
                isToClean: Value,
            };
            this._cleanRoomInfo = this._cleanRoomInfo || [];
            this._cleanRoomInfo.push(m);
            return m;
        }
    };
    /**
     *  根据房间楼层号获取楼层清洁值
     */
    UserClearVo.prototype.getRoomCleanValueByFloorId = function (id) {
        if (!this._cleanRoomInfo) {
            if (id < 0)
                zmg_util.gLog('检索楼层id有误');
            var m = {
                cleanValue: 0,
                index: id,
                isToClean: true,
            };
            this._cleanRoomInfo = this._cleanRoomInfo || [];
            this._cleanRoomInfo.push(m);
            return m.cleanValue;
        }
        else {
            for (var i = 0; i < this._cleanRoomInfo.length; i++) {
                if (this._cleanRoomInfo[i].index == id) {
                    return this._cleanRoomInfo[i].cleanValue;
                }
            }
            if (id < 0)
                zmg_util.gLog('检索楼层id有误');
            var m = {
                cleanValue: 0,
                index: id,
                isToClean: true,
            };
            this._cleanRoomInfo = this._cleanRoomInfo || [];
            this._cleanRoomInfo.push(m);
            return m.cleanValue;
        }
    };
    /**
     *  根据房间楼层号获取楼层是否需要清洁
     */
    UserClearVo.prototype.getRoomIsToCleanByFloorId = function (id) {
        if (!this._cleanRoomInfo) {
            if (id < 0)
                zmg_util.gLog('检索楼层id有误');
            var m = {
                cleanValue: 0,
                index: id,
                isToClean: true,
            };
            this._cleanRoomInfo = this._cleanRoomInfo || [];
            this._cleanRoomInfo.push(m);
            return m.isToClean;
        }
        else {
            for (var i = 0; i < this._cleanRoomInfo.length; i++) {
                if (this._cleanRoomInfo[i].index == id) {
                    return this._cleanRoomInfo[i].cleanValue < 100 ? true : false;
                }
            }
            if (id < 0)
                zmg_util.gLog('检索楼层id有误');
            var m = {
                cleanValue: 0,
                index: id,
                isToClean: true,
            };
            this._cleanRoomInfo = this._cleanRoomInfo || [];
            this._cleanRoomInfo.push(m);
            return m.isToClean;
        }
    };
    UserClearVo.prototype.sortFun = function (aa, bb) {
        return aa.index - bb.index;
    };
    /**
     *  根据房间楼层号获取楼层是否需要清洁
     */
    UserClearVo.prototype.getRoomIsToClean = function () {
        if (!this._cleanRoomInfo) {
            return 1;
        }
        this._cleanRoomInfo.sort(this.sortFun);
        var i = 0;
        for (var j = 0, len = this._cleanRoomInfo.length; j < len; j++) {
            i++;
            if (this._cleanRoomInfo[j].index != i) {
                return i;
            }
            if (this._cleanRoomInfo[j].cleanValue < 100 ? true : false) {
                return i;
            }
        }
        if (i == 4) { //暂时定为4层
            return 0;
        }
        else {
            i++;
            return i;
        }
    };
    /**
     * 获取垃圾数目
     */
    UserClearVo.prototype.getRubbishsByFloorId = function (id, rubbishTotal) {
        var roomClean = this.getRoomCleanLinessByFloorId(id);
        if (roomClean.cleanValue < 100 ? true : false) {
            var num = Math.ceil((1 - roomClean.cleanValue / 100) * rubbishTotal);
            return num;
        }
        else {
            return 0;
        }
    };
    return UserClearVo;
}(cc.EventTarget));

/**
 * 用户数据保存
 */
var _UserMgr = /** @class */ (function (_super) {
    __extends(_UserMgr, _super);
    function _UserMgr() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // zxm = 1,
        // mmt = 2,
        // ddx = 3
        _this.roleTypeList = ["", "zxm", "mmt", "ddx"];
        return _this;
    }
    _UserMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _UserMgr();
        }
        return this._instance;
    };
    Object.defineProperty(_UserMgr.prototype, "userVo", {
        get: function () {
            return this._userVo;
        },
        set: function (data) {
            this._userVo = data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "cleanVo", {
        get: function () {
            return this._cleanVo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "cardVo", {
        get: function () {
            return this._cardVo;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "actor", {
        /**
         * 获取人物形象
         */
        get: function () {
            return this._actor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "partnerId", {
        get: function () {
            return parseInt(this._userVo.partnerId);
        },
        enumerable: false,
        configurable: true
    });
    _UserMgr.prototype.start = function () {
        if (zmg_webserver_mgr.ServerMgr.isValid) {
            this.updateUserData();
        }
        else {
            zmg_event_mgr.EventMgr.once(zmg_event_mgr.EventName.SERVER_READY, this.updateUserData, this);
        }
        this.addEvents();
    };
    _UserMgr.prototype.getStudentInfo = function (callback, target) {
        var _this = this;
        if (this._studentVo) {
            callback.call(target, this._studentVo);
        }
        else {
            if (zmg_webserver_mgr.ServerMgr.isValid) {
                zmg_webserver_mgr.ServerMgr.sendGet($Commands.getStudentBaseInfo, null, function (data) {
                    if (data) {
                        _this._studentVo = data;
                        _this.getStudentInfo(callback, target);
                    }
                    else {
                        zmg_util.gWarn("学生信息获取失败!");
                    }
                }, target);
            }
            else {
                zmg_event_mgr.EventMgr.once(zmg_event_mgr.EventName.SERVER_READY, function () {
                    _this.getStudentInfo(callback, target);
                }, this);
            }
        }
    };
    _UserMgr.prototype.updateUserData = function () {
        var param = {
            bu: zmg_config_mgr.ConfigMgr.getBu(),
            needCardTip: true,
            needPartnerStatus: true,
            userId: zmg_env_mgr.EnvMgr.getUserId(),
        };
        //获取学伴信息
        zmg_webserver_mgr.ServerMgr.sendGet($Commands.getPartnerInfo, param, new zmg_webserver_mgr.ServerListener(this, this.onServer), this, false);
    };
    _UserMgr.prototype.updateCloth = function () {
        zmg_webserver_mgr.ServerMgr.sendPost($Commands.getRoleDressUps, null, new zmg_webserver_mgr.ServerListener(this, this.onServerCloth), this, false);
    };
    _UserMgr.prototype.getActionConfig = function () {
        zmg_webserver_mgr.ServerMgr.sendGet($Commands.actionConfig, null, new zmg_webserver_mgr.ServerListener(this, this.onActionConfig), false);
    };
    _UserMgr.prototype.onActionConfig = function (res) {
        if (res) {
            this.sleepFullSeconds = res.sleepFullSeconds;
            this.washFullSeconds = res.washFullSeconds;
        }
    };
    _UserMgr.prototype.updateFruitValue = function () {
        var _this = this;
        zmg_webserver_mgr.ServerMgr.sendGet($Commands.getFruitTotalNum, { userId: zmg_env_mgr.EnvMgr.getUserId() }, function (response) {
            _this.fruitValue = response;
        }, this);
    };
    /**
     * 获取学伴信息
     * @param res
     */
    _UserMgr.prototype.onServer = function (res) {
        this._userVo = res;
        this._cardVo = new UserCardVo();
        this._cleanVo = new UserClearVo();
        this._cardVo.setData(this._userVo);
        this._cleanVo.setData(this._userVo);
        this._cardVo.on(_UserEventName.GREET_CARD, this.onCardChange, this, false);
        this._cleanVo.on(_UserEventName.CLEAN_CHANGE, this.onCleanChange, this, false);
        if (this.isAdoption && (!this._actor || this._actor.config.rName != this.roleName)) {
            if (this._actor) {
                this._actor.destroy();
            }
            this._actor = zmg_ui_mgr.Actor();
            this._actor.initConfig(zmg_config_mgr.ConfigMgr.uiconfig.role[this.roleName]);
            this.updateCloth();
        }
        this.emit(zmg_event_mgr.EventName.READY);
    };
    _UserMgr.prototype.onCleanChange = function () {
        this.emit(_UserEventName.CLEAN_CHANGE);
    };
    _UserMgr.prototype.onCardChange = function (greetCardTip) {
        this.emit(_UserEventName.GREET_CARD, greetCardTip);
    };
    /**
     * 获取学伴装扮信息
     */
    _UserMgr.prototype.onServerCloth = function (res) {
        if (this._actor) {
            var details = res ? res.details : null;
            if (details) {
                var i = void 0;
                var item = void 0;
                var cloth = void 0;
                var len = details.length;
                var cloths = [];
                for (i = 0; i < len; i++) {
                    // assets = [];
                    item = details[i];
                    // infs = item.resourceList;
                    // cLen = infs.length;
                    // for (j = 0; j < cLen; j++) {
                    //     action = this.getActionByType(infs[j].type);
                    // if (action) {
                    // url = new DragonAssetUrl(infs[j].atlasImg, infs[j].atlasJson, infs[j].dragJson, action);
                    // assets.push(url);
                    // }
                    // }
                    cloth = {
                        isNewProduct: item.isNewProduct,
                        directoryId: item.directoryId,
                        benefitDays: item.benefitDays,
                        /**
                         * 预览图
                         */
                        cover: item.cover,
                        createTime: item.createTime,
                        pictureList: item.pictureList,
                        productId: item.productId,
                        productName: item.productName,
                        remark: item.remark,
                        productLocaCode: item.productLocaCode,
                        resourceList: item.resourceList,
                        top: item.top
                    };
                    cloths.push(cloth);
                }
                this._actor.dress(cloths);
            }
        }
    };
    _UserMgr.prototype.destory = function () {
        this._userVo = null;
        this.removeEvents();
    };
    Object.defineProperty(_UserMgr.prototype, "sleepFullSeconds", {
        get: function () {
            if (this._sleepFullSeconds) {
                return this._sleepFullSeconds;
            }
            else {
                this._sleepFullSeconds = 10;
                return this._sleepFullSeconds;
            }
        },
        set: function (value) {
            if (this._sleepFullSeconds != value) {
                this._sleepFullSeconds = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "totalEnergy", {
        /**
         * 学伴饥饿值
         */
        get: function () {
            if (this.userVo.totalEnergy) {
                return this.userVo.totalEnergy;
            }
            else {
                this.userVo.totalEnergy = 100;
                return this.userVo.totalEnergy;
            }
        },
        set: function (value) {
            if (this.userVo.totalEnergy != value) {
                this.userVo.totalEnergy = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "washFullSeconds", {
        get: function () {
            if (this._washFullSeconds) {
                return this._washFullSeconds;
            }
            else {
                this._washFullSeconds = 10;
                return this._washFullSeconds;
            }
        },
        set: function (value) {
            if (this._washFullSeconds != value) {
                this._washFullSeconds = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "isValid", {
        get: function () {
            return this._userVo ? true : false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "rubbishTotal", {
        get: function () {
            if (this._userVo.rubbishTotal) {
                return this._userVo.rubbishTotal;
            }
            else {
                this._userVo.rubbishTotal = 0;
                return this._userVo.rubbishTotal;
            }
        },
        set: function (value) {
            if (this._userVo.rubbishTotal != value) {
                this._userVo.rubbishTotal = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "isToWash", {
        get: function () {
            if (this._userVo.isToWash === undefined) {
                this._userVo.isToWash = true;
                return this._userVo.isToWash;
            }
            else {
                return this._userVo.isToWash;
            }
        },
        set: function (bool) {
            if (this._userVo.isToWash != bool) {
                this._userVo.isToWash = bool;
                this.emit(_UserEventName.WASH_CHANGE, this.washValue);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "washValue", {
        get: function () {
            if (this._userVo.washValue !== undefined) {
                return this._userVo.washValue;
            }
            else {
                this._userVo.washValue = 0;
                return this._userVo.washValue;
            }
        },
        set: function (value) {
            if (this._userVo.washValue != value) {
                this._userVo.washValue = value ? value : 0;
                this.emit(_UserEventName.WASH_CHANGE, this.getWashProgress());
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "isAdoption", {
        get: function () {
            if (this._userVo) {
                return this._userVo.isAdoption;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "fruitValue", {
        get: function () {
            if (this._userVo) {
                return this._userVo.fruitValue;
            }
            return 0;
        },
        set: function (value) {
            if (this._userVo) {
                this._userVo.fruitValue = value ? value : 0;
                this.emit(_UserEventName.FRUIT_CHANGE, value);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "isHunger", {
        get: function () {
            if (this._userVo.isHunger === undefined) {
                this._userVo.isHunger = true;
                return this._userVo.isHunger;
            }
            else {
                return this._userVo.isHunger;
            }
        },
        set: function (bool) {
            if (this._userVo.isHunger != bool) {
                this._userVo.isHunger = bool;
                this.emit(_UserEventName.ENERGY_CHANGE, this.getEatProgerss());
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "hasNewGreetCard", {
        get: function () {
            return this.cardVo.hasNewGreetCard;
        },
        set: function (value) {
            this.cardVo.hasNewGreetCard = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "isGreetCard", {
        get: function () {
            return this.cardVo.isGreetCard;
        },
        set: function (s) {
            this.cardVo.isGreetCard = s;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "partnerCurrentEnergy", {
        get: function () {
            if (this._userVo.partnerCurrentEnergy) {
                return this._userVo.partnerCurrentEnergy;
            }
            else {
                this._userVo.partnerCurrentEnergy = 0;
                return this._userVo.partnerCurrentEnergy;
            }
        },
        set: function (value) {
            if (this._userVo.partnerCurrentEnergy != value) {
                this._userVo.partnerCurrentEnergy = value;
                this.emit(_UserEventName.ENERGY_CHANGE, this.getEatProgerss());
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "isToSleep", {
        get: function () {
            if (this._userVo.isToSleep === undefined) {
                this._userVo.isToSleep = true;
                return this._userVo.isToSleep;
            }
            else {
                return this._userVo.isToSleep;
            }
        },
        set: function (bool) {
            if (this._userVo.isToSleep != bool) {
                this._userVo.isToSleep = bool;
                this.emit(_UserEventName.SLEEP_CHANGE, this._userVo.isToSleep);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_UserMgr.prototype, "sleepValue", {
        get: function () {
            if (this._userVo.sleepValue !== undefined) {
                return this._userVo.sleepValue;
            }
            else {
                this._userVo.sleepValue = 0;
                return this._userVo.sleepValue;
            }
        },
        set: function (value) {
            if (this._userVo.sleepValue != value) {
                this._userVo.sleepValue = value;
                this.emit(_UserEventName.SLEEP_CHANGE, this.getSleepProgress());
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 根据房间楼层号获取楼层垃圾信息
     */
    _UserMgr.prototype.getRoomCleanLinessByFloorId = function (id) {
        if (this.cleanVo) {
            return this.cleanVo.getRoomCleanLinessByFloorId(id);
        }
    };
    /**
     *  根据房间楼层号设置楼层清洁值
     */
    _UserMgr.prototype.setRoomCleanValueByFloorId = function (id, Value) {
        if (this.cleanVo) {
            return this.cleanVo.setRoomCleanValueByFloorId(id, Value);
        }
    };
    /**
     *  根据房间楼层号设置楼层清洁值
     */
    _UserMgr.prototype.setRoomIsToCleanByFloorId = function (id, Value) {
        if (this.cleanVo) {
            return this.cleanVo.setRoomIsToCleanByFloorId(id, Value);
        }
    };
    /**
     *  根据房间楼层号获取楼层清洁值
     */
    _UserMgr.prototype.getRoomCleanValueByFloorId = function (id) {
        if (this.cleanVo) {
            return this.cleanVo.getRoomCleanValueByFloorId(id);
        }
    };
    /**
     *  根据房间楼层号获取楼层是否需要清洁
     */
    _UserMgr.prototype.getRoomIsToCleanByFloorId = function (id) {
        if (this.cleanVo) {
            return this.cleanVo.getRoomIsToCleanByFloorId(id);
        }
    };
    /**
     *  根据房间楼层号获取楼层是否需要清洁
     */
    _UserMgr.prototype.getRoomIsToClean = function () {
        if (this.cleanVo) {
            return this.cleanVo.getRoomIsToClean();
        }
    };
    /**
     * 获取垃圾数目
     */
    _UserMgr.prototype.getRubbishsByFloorId = function (id) {
        if (this.cleanVo) {
            return this.cleanVo.getRubbishsByFloorId(id, this.rubbishTotal);
        }
    };
    _UserMgr.prototype.getEatProgerss = function () {
        return Math.max(0, Math.min(this._userVo.partnerCurrentEnergy / this._userVo.totalEnergy, 1));
    };
    _UserMgr.prototype.getSleepProgress = function () {
        return Math.max(0, Math.min(this._userVo.sleepValue / 100, 1));
    };
    _UserMgr.prototype.getWashProgress = function () {
        return Math.max(0, Math.min(this._userVo.washValue / 100, 1));
    };
    Object.defineProperty(_UserMgr.prototype, "roleName", {
        get: function () {
            var rName = this.roleTypeList[this._userVo.partnerId];
            return rName ? rName : this.roleTypeList[0];
        },
        enumerable: false,
        configurable: true
    });
    _UserMgr.prototype.addEvents = function () {
        zmg_event_mgr.EventMgr.once(zmg_event_mgr.EventName.CORE_READY, this.onCoreReady, this);
    };
    _UserMgr.prototype.removeEvents = function () {
        if (this._cardVo) {
            this._cardVo.off(_UserEventName.GREET_CARD, this.onCardChange, this);
        }
        if (this._cleanVo) {
            this._cleanVo.off(_UserEventName.CLEAN_CHANGE, this.onCleanChange, this);
        }
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CORE_READY, this.onCoreReady, this);
    };
    _UserMgr.prototype.onCoreReady = function () {
        var alert = zmg_ui_mgr.UIMgr.alert.defaultAlert;
        alert.setTitle(new zmg_res_mgr.ResAsset(zmg_res_mgr.SystemBundleName.UI, "textures/cry" + this.roleName));
    };
    /**
     *  //1,走路,3:说话，站立
     * @param type
     */
    _UserMgr.prototype.getActionByType = function (type) {
        switch (type) {
            case 1:
                return zmg_ui_mgr.ERoleAction.WALK_LEFT;
            case 3:
                return zmg_ui_mgr.ERoleAction.STAND;
            default:
                return null;
        }
    };
    return _UserMgr;
}(zmg_mgr.BaseMgr));

var _AppBundleName = /** @class */ (function () {
    function _AppBundleName() {
    }
    // private static _instance: _AppBundleName;
    // static getInstance(): _AppBundleName {
    //     if (!this._instance) {
    //         this._instance = new _AppBundleName();
    //     }
    //     return this._instance;
    // }
    /**
     * 杂物
     */
    _AppBundleName.Stack = "Stack";
    /**
     * 领取学伴
     */
    _AppBundleName.RECEIVE_ROLE = "ReceiveRole";
    /**
     * 大厅
     */
    _AppBundleName.HALL = "Hall";
    /**
     * 奖励中心
     */
    _AppBundleName.REWARD_CENTER = "RewardCenter";
    /**
     * 弹窗资源目录
     */
    _AppBundleName.POP_LAYER = "PopLayer";
    /**
     * 防沉迷
     */
    _AppBundleName.CAIS = "Cais";
    /**
     * 学伴房间
     */
    _AppBundleName.HOUSE = "House";
    /**
     * 任务中心
     */
    _AppBundleName.TASKCENTER = "TaskCenter";
    /**
     * 精灵墙
     */
    _AppBundleName.MEDALWALL = "Medalwall";
    /**
     * 商城
     */
    _AppBundleName.MAGIC_MALL = "MagicMall";
    /**
     * 贺卡
     */
    _AppBundleName.GREETCARD = "GreetCard";
    /**
     * AI引流课
     */
    _AppBundleName.AICLASS = "AIClass";
    /**
     * 试衣间
     */
    _AppBundleName.WARDROBE = "Wardrobe";
    /**
     * 阶段复习课
     */
    _AppBundleName.ZMREVIEW = "zmreview";
    return _AppBundleName;
}());

/**
 * 检查学伴信息约束条件
 */
var HasPartnersCDN = /** @class */ (function (_super) {
    __extends(HasPartnersCDN, _super);
    function HasPartnersCDN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
    * 是否检测通过
    */
    HasPartnersCDN.prototype.check = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                user = _UserMgr.getInstance();
                param = param !== undefined ? param : this._cfg.param;
                if (user.isAdoption == (param ? true : false)) {
                    return [2 /*return*/, Promise.resolve()];
                }
                else {
                    return [2 /*return*/, Promise.reject()];
                }
            });
        });
    };
    Object.defineProperty(HasPartnersCDN.prototype, "isValid", {
        /**
         * 检查器是否准备完毕，可以进行工作
         */
        get: function () {
            return _UserMgr.getInstance().isValid;
        },
        enumerable: false,
        configurable: true
    });
    HasPartnersCDN.prototype.catchHandler = function (param) {
        //跳转模块
        if (param) {
            //需要学伴,当前不满足要求
            zmg_module_mgr.ModuleMgr.openByCode(_AppBundleName.RECEIVE_ROLE);
        }
        else {
            var asset = zmg_module_mgr.ModuleMgr.record.getMain();
            //不需要学伴方可进入，当前有学伴
            zmg_module_mgr.ModuleMgr.openByCode(asset.code, asset.param);
        }
        return _super.prototype.catchHandler.call(this, param);
    };
    return HasPartnersCDN;
}(zmg_module_mgr.BaseModuleCDN));

var FruitValueCDN = /** @class */ (function (_super) {
    __extends(FruitValueCDN, _super);
    function FruitValueCDN() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FruitValueCDN.prototype.check = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                param = param !== undefined ? param : this._cfg.param;
                if (_UserMgr.getInstance().fruitValue > param) {
                    return [2 /*return*/, Promise.resolve()];
                }
                else {
                    return [2 /*return*/, Promise.reject()];
                }
            });
        });
    };
    Object.defineProperty(FruitValueCDN.prototype, "isValid", {
        get: function () {
            return _UserMgr.getInstance().isValid;
        },
        enumerable: false,
        configurable: true
    });
    FruitValueCDN.prototype.catchHandler = function (param) {
        zmg_util.gLog("异常处理能量不足消息...");
        return _super.prototype.catchHandler.call(this, param);
    };
    return FruitValueCDN;
}(zmg_module_mgr.BaseModuleCDN));

var EGrayState;
(function (EGrayState) {
    EGrayState[EGrayState["unknow"] = 0] = "unknow";
    EGrayState[EGrayState["close"] = 1] = "close";
    EGrayState[EGrayState["open"] = 2] = "open";
})(EGrayState || (EGrayState = {}));
var ModuleGrayCDN = /** @class */ (function (_super) {
    __extends(ModuleGrayCDN, _super);
    function ModuleGrayCDN() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.grayList = {};
        return _this;
    }
    /**
    * 是否检测通过
    */
    ModuleGrayCDN.prototype.check = function (param) {
        return __awaiter(this, void 0, void 0, function () {
            var sendParam;
            var _this = this;
            return __generator(this, function (_a) {
                if (!param) {
                    zmg_util.gWarn("无法查询空参的灰度开关...");
                    return [2 /*return*/];
                }
                if (this.grayList[param] == EGrayState.open) {
                    return [2 /*return*/, Promise.resolve()];
                }
                if (this.grayList[param] == EGrayState.close) {
                    return [2 /*return*/, Promise.reject()];
                }
                //服务器查询
                this.grayList[param] = EGrayState.unknow;
                sendParam = {
                    map: { userId: zmg_env_mgr.EnvMgr.getUserId() }, grayCode: param
                };
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        zmg_webserver_mgr.ServerMgr.sendPost($Commands.graySurvey, sendParam, new zmg_webserver_mgr.ServerListener(_this, function (data) {
                            if (data) {
                                resolve(true);
                            }
                            else {
                                reject(false);
                            }
                        }, function (code) {
                            return Promise.reject();
                        }), true);
                    })];
            });
        });
    };
    Object.defineProperty(ModuleGrayCDN.prototype, "isValid", {
        /**
         * 检查器是否准备完毕，可以进行工作
         */
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    return ModuleGrayCDN;
}(zmg_module_mgr.BaseModuleCDN));

/**
 * 增加所有模块约束条件
 */
var _ModuleConditionInit = /** @class */ (function (_super) {
    __extends(_ModuleConditionInit, _super);
    function _ModuleConditionInit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _ModuleConditionInit.getInstance = function () {
        if (!this._instance) {
            this._instance = new _ModuleConditionInit("ModuleConditionInit");
        }
        return this._instance;
    };
    _ModuleConditionInit.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                new HasPartnersCDN("HasPartnersCDN");
                new FruitValueCDN("FruitValueCDN");
                new ModuleGrayCDN("ModuleGrayCDN");
                return [2 /*return*/];
            });
        });
    };
    Object.defineProperty(_ModuleConditionInit.prototype, "isValid", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    return _ModuleConditionInit;
}(zmg_mgr.BaseMgr));

/**
 * 倒计时监控
 */
var _CaisVo = /** @class */ (function () {
    function _CaisVo() {
        //服务器已记录数据
        this.CaisServerData = {
            configId: 0,
            playTimeList: [10, 20, 30],
            restTimeList: [3, 5, 10]
        };
        /**
         * 要求休息时间
         */
        this._restTime = 0;
        /**
         * 可以游戏时间
         */
        this._playTime = 0;
        /**
         * 记录已经游戏时间
         */
        this._playRecord = 0;
        /**
         * 离开了多久
         */
        this._levelTime = 0;
        /**
         * 是否打开防沉迷界面
         */
        this._countTime = 0;
        /**
         * 当前状态
         */
        this._active = false;
        this._isTalkPlay = false;
    }
    _CaisVo.getInstance = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (_CaisVo._instance == null) {
            _CaisVo._instance = new _CaisVo();
        }
        return _CaisVo._instance;
    };
    Object.defineProperty(_CaisVo.prototype, "isTalkPlay", {
        get: function () {
            return this._isTalkPlay;
        },
        set: function (s) {
            this._isTalkPlay = s;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_CaisVo.prototype, "countTime", {
        get: function () {
            return this._countTime;
        },
        set: function (s) {
            this._countTime = s ? s : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_CaisVo.prototype, "playTime", {
        get: function () {
            return this._playTime;
        },
        set: function (s) {
            this._playTime = s ? s : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_CaisVo.prototype, "restTime", {
        get: function () {
            return this._restTime;
        },
        set: function (s) {
            this._restTime = s ? s : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_CaisVo.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (s) {
            this._active = s;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_CaisVo.prototype, "levelTime", {
        get: function () {
            return this._levelTime;
        },
        set: function (s) {
            this._levelTime = s ? s : 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_CaisVo.prototype, "playRecord", {
        get: function () {
            return this._playRecord;
        },
        set: function (s) {
            this._playRecord = s ? s : 0;
        },
        enumerable: false,
        configurable: true
    });
    return _CaisVo;
}());
var $CaisServerVoType;
(function ($CaisServerVoType) {
    //登陆时间(时间戳)
    $CaisServerVoType["LOGIN"] = "Countdown_login";
    //开始游戏时间(最后一次防沉迷后进入游戏时间)
    $CaisServerVoType["START_PLAY"] = "Countdown_startTime";
    //持续在线时间
    $CaisServerVoType["PLAY_TIME"] = "Countdown_countTime";
    //最后一次开始玩的时间
    $CaisServerVoType["LAST_PLAY_TIME"] = "Countdown_lastPlayTime";
    //首次进入大厅，NPC引导
    $CaisServerVoType["GUIDE_NPC"] = "Hall_guideNpc";
    //最后一次签到时间
    $CaisServerVoType["SIGN_TIME"] = "SignTime";
    //进入商城时间
    $CaisServerVoType["FIRST_ENTER_MALL"] = "MagicMall_firstEnterMall";
    /*海报 */
    $CaisServerVoType["PosterClipTimes"] = "PosterClipTimes";
})($CaisServerVoType || ($CaisServerVoType = {}));
var $CaisLocalVoType;
(function ($CaisLocalVoType) {
    //模块记录
    $CaisLocalVoType["HALL_LOCAL_"] = "hallLocal_";
    //心跳记录(本地存储)
    $CaisLocalVoType["HEART"] = "zm_heart";
    //记录玩耍时间
    // PLAYRECORED = "playRecord"
})($CaisLocalVoType || ($CaisLocalVoType = {}));

/**
 * 模块配置信息服务器获取管理
 */
var _ServerModuleMgr = /** @class */ (function (_super) {
    __extends(_ServerModuleMgr, _super);
    function _ServerModuleMgr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    _ServerModuleMgr.getInstance = function () {
        if (!this._instance) {
            this._instance = new _ServerModuleMgr("ServerModuleMgr");
        }
        return this._instance;
    };
    _ServerModuleMgr.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                if (zmg_webserver_mgr.ServerMgr.isValid) {
                    this.updateModuleData();
                }
                else {
                    zmg_event_mgr.EventMgr.once(zmg_event_mgr.EventName.SERVER_READY, this.updateModuleData, this);
                }
                return [2 /*return*/];
            });
        });
    };
    _ServerModuleMgr.prototype.updateModuleData = function () {
        var _this = this;
        var sendParam = {
            userId: zmg_env_mgr.EnvMgr.getUserId(), type: 1
        };
        this.getHallBaseInfo();
        zmg_webserver_mgr.ServerMgr.sendGet($Commands.moduleList, sendParam, new zmg_webserver_mgr.ServerListener(this, function (data) {
            var modules = zmg_config_mgr.ConfigMgr.modules;
            var i, j;
            var cLen = data.length;
            var len = modules.length;
            for (i = 0; i < len; i++) {
                if (modules[i].main.type == zmg_config_mgr.$EModuleType.IFRAME) {
                    if (!zmg_util.StringUtil.isHttps(modules[i].main.path)) {
                        for (j = 0; j < cLen; j++) {
                            if (data[j].moduleCode == "ZM_" + modules[i].code) {
                                modules[i].main.path = data[j].onlineUrl;
                                modules[i].isClose = modules[i].isClose && data[j].moduleSwitch;
                            }
                        }
                    }
                }
            }
            _this._isValid = true;
            _this.emit(zmg_event_mgr.EventName.READY);
        }, function (code) {
            zmg_util.gWarn("获取模块配置信息报错！");
        }), true);
    };
    _ServerModuleMgr.prototype.getHallBaseInfo = function () {
        var params = {
            platform: zmg_env_mgr.EnvMgr.getPlatform()
        };
        zmg_webserver_mgr.ServerMgr.sendGet($Commands.getHallBaseInfo, params, new zmg_webserver_mgr.ServerListener(this, function (data) {
            // bgMusicUrl = data.bgMusicUrl;
            // canOpen = data.canOpen;
            _CaisVo.getInstance().CaisServerData.configId = data.configId;
            _CaisVo.getInstance().CaisServerData.playTimeList = data.playTimeList;
            _CaisVo.getInstance().CaisServerData.restTimeList = data.restTimeList;
        }, function (code) {
            zmg_util.gWarn("获取学习乐园入口配置报错！");
        }), true);
    };
    _ServerModuleMgr.prototype.destory = function () {
        _super.prototype.destroy.call(this);
    };
    Object.defineProperty(_ServerModuleMgr.prototype, "isValid", {
        get: function () {
            return this._isValid;
        },
        enumerable: false,
        configurable: true
    });
    return _ServerModuleMgr;
}(zmg_mgr.BaseMgr));

var $BaseCommand = /** @class */ (function () {
    function $BaseCommand() {
    }
    Object.defineProperty($BaseCommand.prototype, "packet", {
        set: function (value) {
            this._packet = value;
        },
        enumerable: false,
        configurable: true
    });
    $BaseCommand.prototype.run = function (data) {
        this.excute(data);
    };
    $BaseCommand.prototype.excute = function (data) {
        throw new Error("虚拟函数，需要实现方法。");
    };
    return $BaseCommand;
}());

var BackToHallCmd = /** @class */ (function (_super) {
    __extends(BackToHallCmd, _super);
    function BackToHallCmd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BackToHallCmd.prototype.excute = function (data) {
        zmg_module_mgr.ModuleMgr.back();
    };
    return BackToHallCmd;
}($BaseCommand));

var GetUserDefaultsCmd = /** @class */ (function (_super) {
    __extends(GetUserDefaultsCmd, _super);
    function GetUserDefaultsCmd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GetUserDefaultsCmd.prototype.excute = function (data) {
        var key = data.data.key;
        var dd = zmg_gamedata_mgr.DataMgr.server.getItem(key);
        dd = dd ? dd : "";
        // _MsgBridge.getInstance().sendMsgToSubMudule({ action: "userDefaults", data: { key: key, value: data } });
        // return { action: "userDefaults", data: { key: key, value: dd } };
        _MsgBridge.getInstance().sendMsgToSubMudule({ action: "userDefaults", data: { key: key, value: dd } });
    };
    return GetUserDefaultsCmd;
}($BaseCommand));

var SetUserDefaultsCmd = /** @class */ (function (_super) {
    __extends(SetUserDefaultsCmd, _super);
    function SetUserDefaultsCmd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SetUserDefaultsCmd.prototype.excute = function (data) {
        var key = data.data['key'];
        var value = data.data['value'];
        zmg_gamedata_mgr.DataMgr.server.setItem(key, value);
    };
    return SetUserDefaultsCmd;
}($BaseCommand));

var LogoutGameCmd = /** @class */ (function (_super) {
    __extends(LogoutGameCmd, _super);
    function LogoutGameCmd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogoutGameCmd.prototype.excute = function (data) {
        // ModuleMgr.exit();
        // ModuleMgr.back();
        cc.game.end();
    };
    return LogoutGameCmd;
}($BaseCommand));

var ShowSubModuleCmd = /** @class */ (function (_super) {
    __extends(ShowSubModuleCmd, _super);
    function ShowSubModuleCmd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShowSubModuleCmd.prototype.excute = function (data) {
        var webview = cc.Canvas.instance.getComponentInChildren(cc.WebView);
        if (zmg_env_mgr.EnvMgr.isNative()) {
            webview.node.width = cc.Canvas.instance.node.width;
            webview.node.height = cc.Canvas.instance.node.height;
        }
        else {
            if (webview && webview.getIframeElement() && webview.getIframeElement().style) {
                webview.getIframeElement().style.zIndex = "0";
            }
        }
        zmg_util.gLog("webview模块准备完毕。");
        zmg_ui_mgr.UIMgr.hideLoading();
    };
    return ShowSubModuleCmd;
}($BaseCommand));

var EnterModuleCmd = /** @class */ (function (_super) {
    __extends(EnterModuleCmd, _super);
    function EnterModuleCmd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnterModuleCmd.prototype.excute = function (data) {
        var key = data.data['key'];
        key = key.replace("ZM_", "");
        zmg_module_mgr.ModuleMgr.openByCode(key);
    };
    return EnterModuleCmd;
}($BaseCommand));

var GamePauseCmd = /** @class */ (function (_super) {
    __extends(GamePauseCmd, _super);
    function GamePauseCmd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GamePauseCmd.prototype.excute = function (data) {
        cc.game.pause();
        zmg_audio_mgr.AudioMgr.stopAll();
        zmg_util.gLog("onPagePause data:", data);
        zmg_event_mgr.EventMgr.emit(zmg_event_mgr.EventName.ON_PAGE_PAUSE);
        // _MsgBridge.getInstance().sendMsgToSubMudule("onPagePause");
        return { action: "onPagePause" };
    };
    return GamePauseCmd;
}($BaseCommand));

var GameResumeCmd = /** @class */ (function (_super) {
    __extends(GameResumeCmd, _super);
    function GameResumeCmd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameResumeCmd.prototype.excute = function (data) {
        cc.game.resume();
        zmg_audio_mgr.AudioMgr.resumeAllMusic();
        zmg_util.gLog("onPageResume data:", data);
        zmg_event_mgr.EventMgr.emit(zmg_event_mgr.EventName.ON_PAGE_RESUME);
        // _MsgBridge.getInstance().sendMsgToSubMudule("onPageResume");
        return { action: "onPageResume" };
    };
    return GameResumeCmd;
}($BaseCommand));

/**
 * 与子模块交流通道
 */
var _MsgBridge = /** @class */ (function (_super) {
    __extends(_MsgBridge, _super);
    function _MsgBridge() {
        var _this = _super.call(this) || this;
        _this._jsbMsgPool = [];
        _this._messageHandlers = {};
        _this._isInited = false;
        return _this;
    }
    _MsgBridge.getInstance = function () {
        if (!this._instance) {
            this._instance = new _MsgBridge();
        }
        return this._instance;
    };
    Object.defineProperty(_MsgBridge.prototype, "isValid", {
        get: function () {
            return this._isInited;
        },
        enumerable: false,
        configurable: true
    });
    _MsgBridge.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                zmg_util.gLog("MsgBridge开始初始化...");
                this.registMsg();
                this._initBridge();
                this._initHandler();
                zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.UI_LOAD_HIDE, this.onLoadHide, this, false);
                zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.UI_LOAD_SHOW, this.onLoadShow, this, false);
                return [2 /*return*/];
            });
        });
    };
    _MsgBridge.prototype.onLoadHide = function () {
        this.sendMsgToClient("hideFullScreenLoading");
    };
    _MsgBridge.prototype.onLoadShow = function () {
        this.sendMsgToClient("showFullScreenLoading");
    };
    _MsgBridge.prototype._initBridge = function () {
        var _this = this;
        if (this._isInited)
            return;
        this._isInited = true;
        if (zmg_env_mgr.EnvMgr.isJsb()) {
            if (zmg_env_mgr.EnvMgr.isIOS()) {
                this._setupWebViewJavascriptBridge(function (bridge) { return _this.registerHandlers(bridge); });
            }
            else {
                this._connectWebViewJavascriptBridge(function (bridge) { return _this.registerHandlers(bridge); });
            }
        }
    };
    _MsgBridge.prototype._initHandler = function () {
        zmg_util.gLog("注册window监听", window);
        window.addEventListener('message', this._receivePostMsg.bind(this), false);
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.GAME_OVER, this.onGameOver, this);
    };
    _MsgBridge.prototype.onGameOver = function () {
        this.sendMsgToClient("logoutGame");
    };
    _MsgBridge.prototype._receivePostMsg = function (event) {
        var data = event.data;
        zmg_util.gLog("<<<通过post接受消息", data);
        this._receiveMsg(data);
    };
    _MsgBridge.prototype._receiveMsg = function (data) {
        var action = data['action'];
        try {
            var d = zmg_env_mgr.EnvMgr.isNative() ? JSON.parse(data.data) : data.data;
            data.data = d;
        }
        catch (e) {
            zmg_util.gLog("消息体无法被Json,isNative:" + zmg_env_mgr.EnvMgr.isNative());
        }
        var command = this._messageHandlers[action];
        if (command) {
            var ret = command.excute(data);
            if (ret) {
                this.sendMsgToSubMudule(ret);
            }
        }
    };
    _MsgBridge.prototype.jsbReceiveMsg = function (data) {
        zmg_util.gLog("通过jsb接收客户端消息1", data);
        this._receiveMsg(data);
    };
    _MsgBridge.prototype.registerHandlers = function (bridge) {
        zmg_util.gLog("手机端注册jsb成功");
        bridge.registerHandler('jsbReceiveMsg', function (data, responseCallback) {
            data = JSON.parse(data);
            this.jsbReceiveMsg(data);
        }.bind(this));
        bridge.registerHandler('onPageResume', function (data, responseCallback) {
            //页面从息屏状态返回
            //需要重新启动游戏，
            //恢复声音播放 
            new GameResumeCmd().excute(data);
        }.bind(this));
        bridge.registerHandler('onPagePause', function (data, responseCallback) {
            //页面从息屏状态返回
            //需要重新启动游戏，
            //恢复声音播放 
            new GamePauseCmd().excute(data);
        }.bind(this));
        if (window.WebViewJavascriptBridge) {
            this.clearPool();
        }
    };
    _MsgBridge.prototype.registMsg = function () {
        zmg_util.gLog("开始注册与子模块沟通信令。");
        this.registerHandler("back", BackToHallCmd);
        this.registerHandler('logoutGame', LogoutGameCmd);
        this.registerHandler("zmhall_backToHall", BackToHallCmd);
        this.registerHandler('enterModule', EnterModuleCmd);
        //存储数据
        this.registerHandler('getUserDefaults', GetUserDefaultsCmd);
        this.registerHandler('setUserDefaults', SetUserDefaultsCmd);
        //子模块准备完毕
        this.registerHandler('showWebView', ShowSubModuleCmd);
        this.registerHandler('ZMHall_show_subModule', ShowSubModuleCmd);
        /**
         * 端 页面暂停和恢复
         */
        this.registerHandler("onPagePause", GamePauseCmd);
        this.registerHandler("onPageResume", GameResumeCmd);
        zmg_util.gLog("子模块沟通信令监听初始化完毕。");
    };
    _MsgBridge.prototype.clearPool = function () {
        zmg_util.gLog(">>>注册成功后，将延迟的消息发送出去...");
        for (var i = 0; i < this._jsbMsgPool.length; i++) {
            if (window.WebViewJavascriptBridge) {
                this.sendMsgToClient(this._jsbMsgPool[i].action, this._jsbMsgPool[i].data, this._jsbMsgPool[i].handlerName);
            }
        }
        this._jsbMsgPool = [];
    };
    _MsgBridge.prototype.sengPageInMsgToClient = function (msg, scheme, callback) {
        if (zmg_env_mgr.EnvMgr.isJsb()) {
            zmg_util.gLog("22通过jsb向客户端发送消息", scheme);
            // (<any>window).WebViewJavascriptBridge.callHandler(msg, scheme);
            var bridge = window.WebViewJavascriptBridge;
            if (bridge) {
                bridge.callHandler(msg, scheme, function responseCallback(responseData) {
                    callback && callback(responseData);
                });
            }
        }
        else {
            zmg_util.gLog("33通过post向客户端发送消息", { action: msg, data: scheme });
            var target = window.parent && window.parent.window;
            target.postMessage({ action: msg, data: scheme }, "*");
        }
    };
    _MsgBridge.prototype.sendMsgToClient = function (msg, data, handlerName) {
        if (data === void 0) { data = null; }
        if (handlerName === void 0) { handlerName = 'jsbMessage'; }
        //gLog("准备向客户端发送消息啦", { action: msg, data: data }, UrlParse.isJsb())
        if (zmg_env_mgr.EnvMgr.isJsb()) {
            if (window.WebViewJavascriptBridge) {
                zmg_util.gLog(">>>通过jsb向客户端发送消息", { action: msg, data: data });
                if (handlerName === 'jsbMessage') {
                    window.WebViewJavascriptBridge.callHandler(handlerName, { action: msg, data: data });
                }
                else {
                    window.WebViewJavascriptBridge.callHandler(handlerName, msg, data);
                }
            }
            else {
                // gLog("安卓6");
                this._jsbMsgPool.push({ action: msg, data: data, handlerName: handlerName });
            }
        }
        else {
            zmg_util.gLog(">>>通过post向客户端发送消息" + msg, { action: msg, data: data });
            var target = window.parent && window.parent.window;
            if (target && target.postMessage)
                target.postMessage({ action: msg, data: data }, "*");
        }
    };
    _MsgBridge.prototype.sendMsgToSubMudule = function (data) {
        var webview = cc.Canvas.instance.getComponentInChildren(cc.WebView);
        if (zmg_env_mgr.EnvMgr.isJsb() && webview) {
            var tempData = JSON.stringify(data);
            console.log(">>>发送消息为:", tempData, new Date().getTime());
            webview.evaluateJS("receiveMsg(" + tempData + ")");
        }
        else {
            var webCom = cc.Canvas.instance.getComponentInChildren(cc.WebView);
            if (webCom) {
                var iframe = webCom['getIframeElement']();
                if (iframe) {
                    zmg_util.gLog(">>>向子模块发送消息啦 消息为", data);
                    var win = iframe.contentWindow;
                    win && win.postMessage(data, "*");
                }
                return true;
            }
            return false;
        }
    };
    _MsgBridge.prototype.registerHandler = function (name, command) {
        if (!this._messageHandlers[name]) {
            this._messageHandlers[name] = new command();
        }
    };
    _MsgBridge.prototype.unRegisterHandler = function (name) {
        delete this._messageHandlers[name];
    };
    _MsgBridge.prototype.registerNativeHandler = function (name, command) {
        if (!this._messageHandlers[name]) {
            this._messageHandlers[name] = new command();
        }
    };
    _MsgBridge.prototype.unRegisterNativeHandler = function (name) {
        delete this._messageHandlers[name];
    };
    //ios 前置注入
    _MsgBridge.prototype._setupWebViewJavascriptBridge = function (callback) {
        zmg_util.gLog("ios开始前置注入");
        if (window.WebViewJavascriptBridge) {
            return callback(window.WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () { document.documentElement.removeChild(WVJBIframe); }, 0);
        zmg_util.gLog("ios注入完成");
    };
    //android 后置注入
    _MsgBridge.prototype._connectWebViewJavascriptBridge = function (callback) {
        zmg_util.gLog("安卓开始后置注入");
        if (window.WebViewJavascriptBridge) {
            callback(window.WebViewJavascriptBridge);
            zmg_util.gLog("安卓原生注入完成");
        }
        else {
            zmg_util.gLog("安卓document注入开始");
            // document.addEventListener(
            //     'WebViewJavascriptBridgeReady'
            //     , function () {
            //         callback((<any>window).WebViewJavascriptBridge);
            //         gLog("安卓注入完成");
            //     },
            //     false
            // );
            document.addEventListener('WebViewJavascriptBridgeReady', function (event) {
                if (window["onWebViewJavascriptBridgeReady"])
                    window["onWebViewJavascriptBridgeReady"](window["__bridge"] = window.WebViewJavascriptBridge);
                callback(window.WebViewJavascriptBridge);
                zmg_util.gLog("安卓注入完成");
            }, false);
        }
    };
    _MsgBridge._instance = null;
    return _MsgBridge;
}(zmg_mgr.BaseMgr));

var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RoleTips = /** @class */ (function (_super) {
    __extends(RoleTips, _super);
    function RoleTips() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RoleTips.prototype.onLoad = function () {
        var _this = this;
        this._tipsNode = new cc.Node();
        this._tipsNode.setParent(this.node);
        zmg_res_mgr.ResMgr.loadDragon(_AppBundleName.Stack, 'role/tips', function (dragon) {
            _this._tipsNode.setPosition(188, 178);
            _this._tipsNode.zIndex = 10;
            _this._tipsNode.scale = 0.8;
            _this._display = zmg_util.DragonUtil.createDragon(dragon, _this._tipsNode, "roleTips");
            _this._display.addEventListener(dragonBones.EventObject.COMPLETE, _this.onDragonDisplay, _this);
            _this.check();
        }, this);
        this.addEvents();
    };
    RoleTips.prototype.onDisable = function () {
        if (this._display) {
            this._display.removeEventListener(dragonBones.EventObject.COMPLETE, this.onDragonDisplay, this);
        }
    };
    RoleTips.prototype.showRoleTip = function () {
        if (this._tipsNode) {
            this._tipsNode.active = true;
            this._tipsNode.setPosition(zmg_ui_mgr.Actor().node.width, zmg_ui_mgr.Actor().display.node.height);
            this.check();
        }
    };
    RoleTips.prototype.hideTip = function () {
        if (this._tipsNode) {
            this._tipsNode.active = false;
        }
    };
    RoleTips.prototype.addEvents = function () {
        var user = _UserMgr.getInstance();
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this, false);
        user.on(_UserEventName.ENERGY_CHANGE, this.check, this);
        zmg_ui_mgr.Actor().on(zmg_event_mgr.EventName.CLICK, this.onActorClick, this);
        user.on(_UserEventName.SLEEP_CHANGE, this.check, this);
        user.on(_UserEventName.CLEAN_CHANGE, this.check, this);
        user.on(_UserEventName.WASH_CHANGE, this.check, this);
        user.on(_UserEventName.GREET_CARD, this.check, this);
    };
    RoleTips.prototype.removeEvents = function () {
        var user = _UserMgr.getInstance();
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this);
        user.off(_UserEventName.ENERGY_CHANGE, this.check, this);
        zmg_ui_mgr.Actor().off(zmg_event_mgr.EventName.CLICK, this.onActorClick, this);
        user.off(_UserEventName.CLEAN_CHANGE, this.check, this);
        user.off(_UserEventName.SLEEP_CHANGE, this.check, this);
        user.off(_UserEventName.WASH_CHANGE, this.check, this);
        user.off(_UserEventName.GREET_CARD, this.check, this);
    };
    RoleTips.prototype.talkHunger = function () {
        var user = _UserMgr.getInstance();
        zmg_ui_mgr.Actor().talkByRes(new zmg_res_mgr.ResAsset(_AppBundleName.Stack, "audio/" + user.roleName + "/" + "我饿了"));
    };
    RoleTips.prototype.talkSleep = function () {
        var user = _UserMgr.getInstance();
        zmg_ui_mgr.Actor().talkByRes(new zmg_res_mgr.ResAsset(_AppBundleName.Stack, "audio/" + user.roleName + "/" + "我困了"));
    };
    RoleTips.prototype.talkWash = function () {
        var user = _UserMgr.getInstance();
        zmg_ui_mgr.Actor().talkByRes(new zmg_res_mgr.ResAsset(_AppBundleName.Stack, "audio/" + user.roleName + "/" + "小主人，我身上脏兮兮，快送我去洗个澡吧~"));
    };
    RoleTips.prototype.talkClean = function () {
        var user = _UserMgr.getInstance();
        zmg_ui_mgr.Actor().talkByRes(new zmg_res_mgr.ResAsset(_AppBundleName.Stack, "audio/" + user.roleName + "/" + "小主人，房间有垃圾了，快帮我打扫下吧~"));
    };
    RoleTips.prototype.talkNewCard = function () {
        var user = _UserMgr.getInstance();
        zmg_ui_mgr.Actor().talkByRes(new zmg_res_mgr.ResAsset(_AppBundleName.Stack, "audio/" + user.roleName + "/" + "贺卡上新了"));
    };
    RoleTips.prototype.talkReciveCard = function () {
        var user = _UserMgr.getInstance();
        zmg_ui_mgr.Actor().talkByRes(new zmg_res_mgr.ResAsset(_AppBundleName.Stack, "audio/" + user.roleName + "/" + "贺卡回复了"));
    };
    RoleTips.prototype.randomTalk = function () {
        zmg_ui_mgr.Actor().talkRandom();
    };
    RoleTips.prototype.open = function () {
        var user = _UserMgr.getInstance();
        var budleName = zmg_controller.DirectorMgr.nowBunName;
        if (budleName == _AppBundleName.HOUSE) {
            return true;
        }
        else {
            var floorNum = 2;
            if (user.isGreetCard) ;
            else if (user.isHunger) {
                floorNum = 2;
                zmg_module_mgr.ModuleMgr.openByCode(_AppBundleName.HOUSE, { floor: floorNum });
            }
            else if (user.isToSleep) {
                floorNum = 3;
                zmg_module_mgr.ModuleMgr.openByCode(_AppBundleName.HOUSE, { floor: floorNum });
            }
            else if (user.isToWash) {
                floorNum = 4;
                zmg_module_mgr.ModuleMgr.openByCode(_AppBundleName.HOUSE, { floor: floorNum });
            }
            else if (user.getRoomIsToClean()) {
                floorNum = user.getRoomIsToClean();
                zmg_module_mgr.ModuleMgr.openByCode(_AppBundleName.HOUSE, { floor: floorNum });
            }
            else {
                return true;
            }
        }
        return false;
    };
    RoleTips.prototype.talk = function () {
        var user = _UserMgr.getInstance();
        if (user.cardVo.hasNewGreetCard) {
            this.talkNewCard();
        }
        else if (user.cardVo.hasReciveGreetCard || user.cardVo.hasGreetCard) {
            this.talkReciveCard();
        }
        else if (user.isHunger) {
            this.talkHunger();
        }
        else if (user.isToSleep) {
            this.talkSleep();
        }
        else if (user.isToWash) {
            this.talkWash();
        }
        else if (user.cleanVo.getRoomIsToClean()) {
            this.talkClean();
        }
        else {
            this.randomTalk();
        }
    };
    RoleTips.prototype.onActorClick = function () {
        if (this.open())
            return;
        this.talk();
    };
    RoleTips.prototype.onSceneDestory = function () {
        this._tipsNode.destroy();
        this.removeEvents();
        this.destroy();
    };
    RoleTips.prototype.getNextStatu = function () {
        if (!this._display) {
            return;
        }
        var user = _UserMgr.getInstance();
        var lastAniname;
        var ani = this._display.animationName.slice(0, 3); //截取3个字符
        switch (ani) {
            case 'hek':
                if (!user.cardVo.hasGreetCard) {
                    lastAniname = 'hekaxiaoshi';
                }
                break;
            case 'rec':
                if (!user.cardVo.hasReciveGreetCard) {
                    lastAniname = 'recivehekaxiaoshi';
                }
                break;
            case 'new':
                if (!user.cardVo.hasNewGreetCard) {
                    lastAniname = 'newhekaxiaoshi';
                }
                break;
            case 'ele':
                if (!user.isHunger) {
                    lastAniname = 'elexiaoshi';
                }
                break;
            case 'kun':
                if (!user.isToSleep) {
                    lastAniname = 'kunxiaoshi';
                }
                break;
            case 'xiz':
                if (!user.isToWash) {
                    lastAniname = 'xizaoxiaoshi';
                }
                break;
            case 'sao':
                if (!user.cleanVo.getRoomIsToClean()) {
                    lastAniname = 'saodixiaoshi';
                }
                break;
        }
        return lastAniname;
    };
    RoleTips.prototype.check = function () {
        if (!this._display) {
            return;
        }
        var nowani;
        var user = _UserMgr.getInstance();
        var ani = this._display.animationName;
        if (ani && ani.indexOf('xunhuan') != -1) {
            //改变了状态
            nowani = this.getNextStatu();
        }
        else if (user.cardVo.isGreetCard) {
            if (user.cardVo.hasGreetCard) {
                nowani = 'hekachuxian';
            }
            else if (user.cardVo.hasReciveGreetCard) {
                nowani = 'recivehekachuxian';
            }
            else if (user.cardVo.hasNewGreetCard) {
                this.node.active = false;
                this.hideTip();
                // nowani = 'newhekachuxian'
            }
        }
        else if (user.isHunger) {
            nowani = 'elechuxian';
        }
        else if (user.isToSleep) {
            nowani = 'kunchuxian';
        }
        else if (user.isToWash) {
            nowani = 'xizaochuxian';
        }
        else if (user.cleanVo.getRoomIsToClean()) {
            //新加
            nowani = 'saodichuxian';
        }
        else {
            this.hideTip();
        }
        if (nowani) {
            zmg_util.DragonUtil.play(this._display, nowani, 1);
        }
    };
    RoleTips.prototype.onDragonDisplay = function () {
        if (!this._display) {
            return;
        }
        var ani = this._display.animationName;
        if (ani == 'hekachuxian') {
            zmg_util.DragonUtil.play(this._display, 'hekaxunhuan', 0);
        }
        else if (ani == 'recivehekachuxian') {
            zmg_util.DragonUtil.play(this._display, 'recivehekaxunhuan', 0);
        }
        else if (ani == 'newhekachuxian') {
            zmg_util.DragonUtil.play(this._display, 'newhekaxunhuan', 0);
        }
        else if (ani == 'elechuxian') {
            zmg_util.DragonUtil.play(this._display, 'elexunhuan', 0);
        }
        else if (ani == 'kunchuxian') {
            zmg_util.DragonUtil.play(this._display, 'kunxunhuan', 0);
        }
        else if (ani == 'xizaochuxian') {
            zmg_util.DragonUtil.play(this._display, 'xizaoxunhuan', 0);
        }
        else if (ani == 'saodichuxian') {
            //新加
            zmg_util.DragonUtil.play(this._display, 'saodixunhuan', 0);
        }
        else {
            if (ani.indexOf('xiaoshi') != -1) {
                //消失重新检测
                this.check();
            }
        }
    };
    return RoleTips;
}(cc.Component));

var _a$1 = cc._decorator, ccclass$1 = _a$1.ccclass, property$1 = _a$1.property;
var $zmBaseScene = /** @class */ (function (_super) {
    __extends($zmBaseScene, _super);
    function $zmBaseScene() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.audioPath = "";
        return _this;
    }
    $zmBaseScene.prototype.onLoad = function () {
        this._sceneName = cc.director.getScene().name;
        this.playBgclip();
        zmg_util.gLog("SceneName: " + this._sceneName + " onLoaded");
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_END, this.onSceneEnd, this, false);
    };
    $zmBaseScene.prototype.onDestroy = function () {
        zmg_util.gLog("SceneName: " + this._sceneName + " onDestroy");
        var factory = dragonBones.CCFactory.getInstance();
        zmg_event_mgr.EventMgr.off(zmg_event_mgr.EventName.CONTROLLER_CHANGE_END, this.onSceneEnd, this);
        if (zmg_ui_mgr.Actor().node) {
            zmg_ui_mgr.Actor().node.removeComponent(RoleTips);
        }
    };
    $zmBaseScene.prototype.onSceneEnd = function (evt) {
    };
    $zmBaseScene.prototype.playBgclip = function () {
        if (zmg_util.StringUtil.isValid(this.audioPath)) {
            if (this.audioPath != zmg_controller.DirectorMgr.bgclip) {
                zmg_controller.DirectorMgr.bgclip = this.audioPath;
            }
        }
    };
    __decorate([
        property$1({ tooltip: "背景音乐" }),
        __metadata("design:type", String)
    ], $zmBaseScene.prototype, "audioPath", void 0);
    return $zmBaseScene;
}(cc.Component));

var $GameEvent;
(function ($GameEvent) {
    /**
     * 屏幕调整事件
     */
    $GameEvent["VIEW_RESIZE"] = "viewresize";
    $GameEvent["MAIN_READY"] = "mainReady";
    //场景开始变化
    $GameEvent["SCENE_CHANGE"] = "sceneChange";
    /**
     * 模块发生变化
     */
    $GameEvent["MODULE_CHANGE"] = "moduleChange";
    $GameEvent["COUNT_DOWN_OPEN"] = "countDownOpen";
    $GameEvent["COUNT_DOWN_CLOSE"] = "countDownClose";
    //场景开始变化
    $GameEvent["SCENE_BACK"] = "sceneBack";
    /**
     * 奖励特效结束
     */
    $GameEvent["REWARD_OVER"] = "rewardOver";
    /**
     * 引导结束
     */
    $GameEvent["GUIDE_OVER"] = "guideOver";
    /**
     * 引导奖励结束后
     */
    $GameEvent["GUIDE_REWAD_OVER"] = "guideRewadOver";
    //场景变化结束
    $GameEvent["SCENE_CHANGE_COMPLETE"] = "sceneChangeComplete";
    /**
     * 一秒触发一次
     */
    $GameEvent["TIME_CHANGE"] = "timeChange";
    /**
     * 60s触发一次
     */
    $GameEvent["TIME_CHECK"] = "timeCheck";
    $GameEvent["CAMRRA_RESIZE"] = "camerasize";
    /**
     * 垃圾桶被触动
     */
    $GameEvent["BUCKET_HIT"] = "bucketHit";
    $GameEvent["RUBBISH_UI_CHANGE"] = "rubbishUIChange";
    /**
     * 学伴房间相关状态变化
     */
    $GameEvent["FRUIT_CHANGE"] = "fruitChange";
    $GameEvent["SLEEP_CHANGE"] = "sleepChange";
    $GameEvent["WASH_CHANGE"] = "washChange";
    $GameEvent["ENERGY_CHANGE"] = "energyChange";
    $GameEvent["CLEAN_CHANGE"] = "cleanChange";
    //服装发生了变化
    $GameEvent["CLOTH_CHANGE"] = "clothChange";
    $GameEvent["GL_COMPLETE"] = "glComplete";
    $GameEvent["GL_CANCEL"] = "glCancel";
    $GameEvent["HOME_ROLE_COMPLETE"] = "homeRoleComplete";
    $GameEvent["PET_COMPLETE"] = "petComplete";
    //role事件
    $GameEvent["START_WALK"] = "startWalk";
    //poster海报悬挂刷新
    $GameEvent["POSTER_CHANGE"] = "posterChange";
})($GameEvent || ($GameEvent = {}));

var _CaisControl = /** @class */ (function () {
    function _CaisControl() {
        this._isRest = false;
    }
    _CaisControl.getInstance = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (_CaisControl._instance == null) {
            _CaisControl._instance = new _CaisControl();
        }
        return _CaisControl._instance;
    };
    Object.defineProperty(_CaisControl.prototype, "isRest", {
        set: function (b) {
            this._isRest = b;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(_CaisControl.prototype, "caisVo", {
        get: function () {
            return _CaisVo.getInstance();
        },
        enumerable: false,
        configurable: true
    });
    _CaisControl.prototype.start = function () {
        var _this = this;
        //检查防沉迷
        zmg_webserver_mgr.ServerMgr.sendGet($Commands.getPlayAndRestTimeConfig, { configId: 0 }, function (res) {
            //通知，服务器准备完毕
            _this.init(res);
            if (_this.check()) {
                //进入防沉迷
                //back的时候能正确返回
                zmg_module_mgr.ModuleMgr.record.setNow(zmg_env_mgr.EnvMgr.getDefaultModuleAsset());
            }
            else {
                //未进入防沉迷
                zmg_module_mgr.ModuleMgr.openDefault();
            }
        });
        zmg_event_mgr.EventMgr.on(zmg_event_mgr.EventName.CONTROLLER_CHANGE_END, function () {
            var m = zmg_module_mgr.ModuleMgr.record.getNowConfig();
            if (m && m.closeCountDown) {
                _this.pause();
            }
            else {
                _this.reset();
            }
        }, this);
    };
    _CaisControl.prototype.init = function (res) {
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
        this.caisVo.restTime = res.restTime * 60; //换算为秒
        this.caisVo.playTime = res.playTime * 60; //换算为秒
        this.startEnd();
        /**
         * 进入超能学院等webview的时候，cocos系统会暂停
         * 所以不能使用TimerMgr
         */
        // TimeMgr.doTimer(1000, this.onTimer, this);
        window.setInterval(this.onTimer.bind(this), 1000);
    };
    _CaisControl.prototype.onTimer = function () {
        if (_CaisVo.getInstance().active) {
            this.onTimeChange();
        }
        zmg_event_mgr.EventMgr.emit($GameEvent.TIME_CHANGE);
    };
    _CaisControl.prototype.setCaisStatu = function (module) {
        if (module.closeCountDown) {
            this.caisVo.active = false;
            this.caisVo.restTime = 0;
            this.caisVo.playTime = Number.MAX_SAFE_INTEGER;
        }
    };
    _CaisControl.prototype.pause = function () {
        this.caisVo.active = false;
        var now = zmg_util.DateUtil.getNowDate();
        zmg_gamedata_mgr.DataMgr.server.setItem($CaisServerVoType.LOGIN, now.valueOf());
        // EventMgr.off(GameEvent.TIME_CHANGE, this.onTimeChange, this)
    };
    _CaisControl.prototype.reset = function () {
        this.startEnd();
    };
    _CaisControl.prototype.startEnd = function () {
        if (this.caisVo.active) {
            return;
        }
        this.caisVo.active = true;
        //当前时间
        var now = zmg_util.DateUtil.getNowDate();
        //上一次最后心跳时间
        var lastHeart = zmg_gamedata_mgr.DataMgr.local.getItem($CaisLocalVoType.HEART);
        lastHeart = lastHeart ? lastHeart : { heart: 0, record: 0 };
        //离开时间
        var level = this.distance(lastHeart.heart, now.valueOf());
        zmg_util.gLog("离开时间====", level);
        //设置登陆时间
        zmg_gamedata_mgr.DataMgr.server.setItem($CaisServerVoType.LOGIN, now.valueOf());
        /**
         * 离开时间超过休息时间
         */
        if (level > this.caisVo.restTime) {
            this.resetTimer(now);
        }
        else {
            /**累计游戏时间 */
            var playing;
            //最后一次开始玩的时间
            var time = zmg_gamedata_mgr.DataMgr.server.getItem($CaisServerVoType.LAST_PLAY_TIME);
            var lastPlay = (!time) ? now.valueOf() : time;
            playing = this.distance(lastPlay, lastHeart.heart);
            this.caisVo.levelTime = level;
            if (playing >= this.caisVo.playTime) { //是否处于休息状态
                this.caisVo.playRecord = lastHeart.record + level;
            }
            else {
                this.caisVo.playRecord = lastHeart.record;
            }
            zmg_util.gLog("剩余游戏时间:" + (this.caisVo.playRecord - this.caisVo.playTime));
        }
        // EventMgr.on(GameEvent.TIME_CHANGE, this.onTimeChange, this);
    };
    _CaisControl.prototype.resetTimer = function (now, restTime, playTime) {
        this.caisVo.levelTime = 0;
        this.caisVo.countTime = 0;
        this.caisVo.playRecord = 0;
        now = now ? now : new Date();
        this.caisVo.restTime = restTime ? restTime * 60 : this.caisVo.restTime;
        this.caisVo.playTime = playTime ? playTime * 60 : this.caisVo.playTime;
        zmg_gamedata_mgr.DataMgr.local.setItem($CaisLocalVoType.HEART, { heart: now.valueOf(), recored: 0 });
        zmg_gamedata_mgr.DataMgr.server.setItem($CaisServerVoType.LAST_PLAY_TIME, now.valueOf());
        this.closeCountDown();
    };
    _CaisControl.prototype.check = function () {
        if (!_UserMgr.getInstance().isAdoption) {
            return false;
        }
        var now = zmg_util.DateUtil.getNowDate();
        zmg_gamedata_mgr.DataMgr.local.setItem($CaisLocalVoType.HEART, { heart: now.valueOf(), record: this.caisVo.playRecord });
        //超出游戏时间
        var time = this.caisVo.playRecord - this.caisVo.playTime;
        if (time >= 0) {
            //进入防沉迷
            if (time >= this.caisVo.restTime) {
                this.resetTimer();
            }
            else {
                this.caisVo.countTime = this.caisVo.restTime - time;
                if (!this._isRest) {
                    //打开模块
                    var time_1 = zmg_gamedata_mgr.DataMgr.server.getItem($CaisServerVoType.LAST_PLAY_TIME);
                    var timeDate = new Date(time_1);
                    zmg_util.gLog("最后一次开始玩的时间====", zmg_util.DateUtil.format(timeDate, zmg_util.DateUtilType.yyyy_MM_dd_HH_mm_ss));
                    this._isRest = true;
                    this.caisVo.isTalkPlay = true;
                    zmg_module_mgr.ModuleMgr.openByCode(_AppBundleName.CAIS);
                    //通知所有节点开始休息
                    zmg_event_mgr.EventMgr.emit($GameEvent.COUNT_DOWN_OPEN);
                    return true;
                }
            }
        }
        else {
            this.caisVo.countTime = 0;
        }
        return false;
    };
    _CaisControl.prototype.closeCountDown = function () {
        if (this._isRest) {
            this._isRest = false;
            zmg_res_mgr.ResMgr.load(_AppBundleName.CAIS, "audio/gotoPlay", new zmg_res_mgr.ResListener(this, function (clip, lis) {
                zmg_audio_mgr.AudioMgr.playEffect(clip);
                zmg_module_mgr.ModuleMgr.refurbish();
            }, function (path, lis) {
                zmg_util.gLog("下载失败:" + path);
            }));
        }
    };
    _CaisControl.prototype.getDefaultPlayTime = function () {
        var config = this.caisVo.CaisServerData;
        var mid = Math.floor(config["playTimeList"].length / 2);
        var res = config["playTimeList"][mid];
        return res ? res : 10;
    };
    _CaisControl.prototype.getDefaultRestTime = function () {
        var config = this.caisVo.CaisServerData;
        var mid = Math.floor(config["restTimeList"].length / 2);
        var res = config["restTimeList"][mid];
        return res ? res : 10;
    };
    _CaisControl.prototype.onTimeChange = function () {
        this.caisVo.playRecord++;
        this.check();
    };
    _CaisControl.prototype.distance = function (a, b) {
        return Math.max(Math.floor((b - a) / 1000), 0);
    };
    return _CaisControl;
}());

var _Router = /** @class */ (function () {
    function _Router() {
    }
    _Router.getInstance = function () {
        if (this._inst == null) {
            this._inst = new _Router();
        }
        return this._inst;
    };
    _Router.prototype.jumpTo = function (data) {
        if (zmg_env_mgr.EnvMgr.getDevice() == zmg_env_mgr.EDevice.PC) {
            _MsgBridge.getInstance().sendMsgToClient('gotoPage', data);
        }
        else {
            _MsgBridge.getInstance().sendMsgToClient(data, null, 'pageIn');
        }
    };
    //jsb跳转《练习页面》
    _Router.prototype.jsbJumpToPractise = function (reqInfo) {
        // for testing
        // let reqInfo = {
        //         homeworkSource写死1，
        // homeworkType 1 是随堂  2是拓展
        // };
        // let req = "ZMKidsPad://homeworkZmg?homeworkSource=" + reqInfo['homeworkSource']
        //     + "&homeworkId=" + reqInfo['homeworkId']
        //     + "&homeworkType=" + reqInfo['homeworkType'];
        // MsgBridge.sendMsgToClient('pageIn', req);
        var req = "ZMKidsPad://homework?url=" + reqInfo['url'];
        this.jumpTo(req);
    };
    //jsb跳转《AI 录播课页面》
    _Router.prototype.jsbJumpToAIRecord = function (reqInfo) {
        // for testing
        // ZMKidsPad://learningParkRecordRoom?type=2&lessonUid=RECORD-a68cf13aaa4335f4ac9ce8fb3987bf06&recordId=E13A117066024A24A8BDC4A46D0CB74A&planId=191&productId=10&contentId=84719
        // type （连接socket用）
        // lessonUid （连接socket用）
        // teacherName
        // recordId （获取课件用）
        // productId （透传，用户保存记录接口入参）
        // planId（透传，用户保存记录接口入参）
        // contentId（透传，用户保存记录接口入参）
        var req = "ZMKidsPad://learningParkRecordRoom?type=" + reqInfo['type']
            + "&lessonUid=" + reqInfo['lessonUid']
            + "&teacherName=" + reqInfo['teacherName']
            + "&recordId=" + reqInfo['recordId']
            + "&productId=" + reqInfo['productId']
            + "&planId=" + reqInfo['planId']
            + "&contentId=" + reqInfo['contentId'];
        this.jumpTo(req);
    };
    //jsb跳转《AI 直播课页面》
    _Router.prototype.jsbJumpToAIBroadcast = function (reqInfo) {
        // for testing
        // ZMKidsPad://aiClass?type=1&lessonId=1&subjectName=课程名称
        var req = "ZMKidsPad://aiClass?type=" + reqInfo['type']
            + "&lessonId=" + reqInfo['lessonId']
            + "&subjectName=" + reqInfo['subjectName'];
        this.jumpTo(req);
    };
    //jsb跳转《预习页面》
    _Router.prototype.jsbJumpToPreview = function (reqInfo) {
        // for testing
        // ZMKidsPad://previewCoursewareInAIClass?lessonId = XX&contentId=xx&lessonType=xx&planId=xx&productId=xx
        var req = "ZMKidsPad://previewCoursewareInAIClass?lessonId=" + reqInfo['lessonId']
            + "&contentId=" + reqInfo['contentId']
            + "&lessonType=" + reqInfo['lessonType']
            + "&planId=" + reqInfo['planId']
            + "&productId=" + reqInfo['productId'];
        this.jumpTo(req);
    };
    //pc跳转《练习页面》
    _Router.prototype.pcJumpToPractise = function (reqInfo) {
        _MsgBridge.getInstance().sendMsgToClient('homework', reqInfo);
    };
    //pc跳转《AI 录播课页面》
    _Router.prototype.pcJumpToAIRecord = function (reqInfo) {
        _MsgBridge.getInstance().sendMsgToClient('superTopicList', reqInfo);
    };
    //pc跳转《AI 直播课页面》
    _Router.prototype.pcJumpToAIBroadcast = function (reqInfo) {
        _MsgBridge.getInstance().sendMsgToClient('superCollegeAiClass', reqInfo);
    };
    //pc跳转《预习页面》
    _Router.prototype.pcJumpToPreview = function (reqInfo) {
        // 暂时不传
        // MsgBridge.sendMsgToClient('---', reqInfo);
        // this.jumpTo(reqInfo);
    };
    _Router._inst = null;
    return _Router;
}());

var $ELocalAppKey;
(function ($ELocalAppKey) {
    /**
     * 是否引导过视频
     */
    $ELocalAppKey["IS_GUILD_VIDEO"] = "isGuildVideo";
})($ELocalAppKey || ($ELocalAppKey = {}));
/**
 * bu平台类型
 */
var $BU_TYPE;
(function ($BU_TYPE) {
    $BU_TYPE["ZM"] = "2";
    $BU_TYPE["ALI"] = "4";
    $BU_TYPE["Z1V1"] = "1";
})($BU_TYPE || ($BU_TYPE = {}));
/**
 * bu平台名称
 */
var $BU_NAME;
(function ($BU_NAME) {
    $BU_NAME["ZM"] = "zm";
    $BU_NAME["ALI"] = "ali";
    $BU_NAME["Z1V1"] = "1v1";
})($BU_NAME || ($BU_NAME = {}));

//屏幕方向，小游戏中只有两种。竖屏和左横屏
var OrientationType;
(function (OrientationType) {
    OrientationType[OrientationType["Portrait"] = 0] = "Portrait";
    OrientationType[OrientationType["Landscape"] = 1] = "Landscape";
    OrientationType[OrientationType["RightLandscape"] = 2] = "RightLandscape";
})(OrientationType || (OrientationType = {}));
var $Orientation = /** @class */ (function () {
    function $Orientation() {
    }
    $Orientation._isOrientationH = function (val) {
        var frameSize = cc.view.getFrameSize();
        if (val) {
            return frameSize.height < frameSize.width;
        }
        else {
            return frameSize.height > frameSize.width;
        }
    };
    // true 是切换到横屏false 是切换到竖屏
    $Orientation.changeOrientation = function (val, cb) {
        if (this._isOrientationH(val)) {
            console.log(" 已经是竖屏游戏");
            return;
        }
        if (val == OrientationType.Landscape) {
            $Resolution.orientation = OrientationType.Landscape;
            cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
        }
        else {
            $Resolution.orientation = OrientationType.Portrait;
            cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
        }
        if (cb) {
            cb();
        }
    };
    return $Orientation;
}());

var $Resolution = /** @class */ (function () {
    function $Resolution() {
    }
    $Resolution.init = function () {
        this.frameSize = cc.view.getFrameSize();
        console.log("屏幕宽高 : ", this.frameSize.width, this.frameSize.height);
        this.designSize = cc.Canvas.instance.designResolution;
        console.log("canvas宽高 : ", this.designSize.width, this.designSize.height);
        this.frameAspectRatio = this.frameSize.width / this.frameSize.height;
        console.log("屏幕宽高比: ", this.frameAspectRatio);
        this.designAspectRatio = this.designSize.width / this.designSize.height;
        console.log("canvas宽高比: ", this.designAspectRatio);
        this.orientation = this.designSize.height > this.designSize.width ? OrientationType.Portrait : OrientationType.Landscape;
        console.log("屏幕横竖屏: ", this.orientation);
        console.log('可视宽高 ', cc.view.getVisibleSize().width, cc.view.getVisibleSize().height);
        var R1 = this.frameSize.width / this.frameSize.height;
        var R2 = 1136 / 640;
        this.isFullScreen = R1 > R2;
        if (Math.abs(R1 - R2) < 0.2) {
            this.isFullScreen = false;
        }
        this.setOffset();
    };
    /**
     * 优先根据设配名称做适配，如果不知道的根据分辨率适配。
     */
    $Resolution.setOffset = function () {
        var deltaAspectRatio = 1 / $Resolution.designAspectRatio - 1 / $Resolution.frameAspectRatio;
        cc.log("deltaAspectRatio  ", deltaAspectRatio);
        if (cc.sys.platform == cc.sys.WECHAT_GAME) ;
        var topOffset = 0;
        if (topOffset === 0 && deltaAspectRatio > 0) {
            topOffset = deltaAspectRatio * 150;
        }
        $Resolution.offset[0] = topOffset;
        var bottomOffset = 0;
        if (bottomOffset === 0 && deltaAspectRatio > 0) {
            bottomOffset = deltaAspectRatio * 10;
        }
        $Resolution.offset[1] = bottomOffset;
    };
    $Resolution.getOffset = function () {
        return $Resolution.offset;
    };
    $Resolution.setRoot = function (root) {
        var offset = this.getOffset();
        if (this.orientation == OrientationType.Portrait) {
            root.height -= offset[0];
            root.height -= offset[1];
        }
        else {
            root.width -= offset[0];
            root.width -= offset[1];
        }
    };
    $Resolution.offset = [];
    return $Resolution;
}());

// Learn TypeScript:
var _a$2 = cc._decorator, ccclass$2 = _a$2.ccclass, property$2 = _a$2.property;
var $BtnAdapt = /** @class */ (function (_super) {
    __extends($BtnAdapt, _super);
    function $BtnAdapt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isAddWidth = true;
        _this.isOrginSize = false;
        return _this;
    }
    $BtnAdapt.prototype.adapt = function () {
        var widght = this.node.getComponent(cc.Widget);
        var top = widght.top;
        var left = widght.left;
        var right = widght.right;
        var bottom = widght.bottom;
        if ($Resolution.isFullScreen && !widght['isAdapt']) {
            if (this.isAddWidth) {
                if (widght.left != 0)
                    widght.left = left + 30;
                if (widght.right != 0)
                    widght.right = right + 30;
            }
            else {
                if (widght.top != 0)
                    widght.top = top + 15;
                if (widght.bottom != 0)
                    widght.bottom = bottom + 15;
            }
            widght['isAdapt'] = true;
        }
        if (this.isOrginSize) {
            //换算比例
            var ratio = $Resolution.frameAspectRatio / $Resolution.designAspectRatio;
            var scaleTempX = this.node.scaleX * ratio;
            var scaleTempY = this.node.scaleY * ratio;
            if (this.node['oldScaleX'] != undefined && this.node['oldScaleY'] != undefined) {
                scaleTempX = this.node['oldScaleX'] * ratio;
                scaleTempY = this.node['oldScaleY'] * ratio;
            }
            else {
                this.node['oldScaleX'] = this.node.scaleX;
                this.node['oldScaleY'] = this.node.scaleY;
            }
            this.node.setScale(Math.max(scaleTempX, 0.9), Math.max(scaleTempY, 0.9));
        }
        widght.updateAlignment();
    };
    __decorate([
        property$2({ tooltip: "全面屏下是否是加长宽适配" }),
        __metadata("design:type", Boolean)
    ], $BtnAdapt.prototype, "isAddWidth", void 0);
    __decorate([
        property$2({ tooltip: "全面屏下是否是保持按钮视图大小" }),
        __metadata("design:type", Boolean)
    ], $BtnAdapt.prototype, "isOrginSize", void 0);
    $BtnAdapt = __decorate([
        ccclass$2
    ], $BtnAdapt);
    return $BtnAdapt;
}($BaseAdapt));

var AdaptTarget = cc.Enum({
    None: 0,
    AdaptPosForTopBang: 1,
    AdaptPosForBottomBar: 2,
    AdaptSizeForTopBang: 3,
    AdaptSizeForBottomBar: 4,
});
var _a$3 = cc._decorator, ccclass$3 = _a$3.ccclass, property$3 = _a$3.property;
var $BaseUI = /** @class */ (function (_super) {
    __extends($BaseUI, _super);
    function $BaseUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.target = AdaptTarget.AdaptPosForTopBang;
        _this.adaptScale = false;
        _this.dynamicDisX = 0;
        _this.coefficient = 0.5;
        return _this;
    }
    $BaseUI.prototype.onLoad = function () {
        this._widget = this.node.getComponent(cc.Widget);
        if (!this._widget) {
            this._widget = this.node.addComponent(cc.Widget);
        }
        var offset = $Resolution.getOffset();
        this.adapt(offset);
    };
    $BaseUI.prototype.adapt = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._widget.enabled = true;
        this.adaptNodeWidget(args);
        _super.prototype.adapt.call(this, args);
        var x = this.node.x;
        var y = this.node.y;
        // 实际屏幕比例
        var frameRatio = $Resolution.frameAspectRatio;
        // 设计比例
        var designRatio = $Resolution.designAspectRatio;
        //换算比例
        var ratio = frameRatio / designRatio;
        if (this.dynamicDisX != 0) {
            this._widget.enabled = false;
            x += (this.dynamicDisX * (ratio - 1) / this.coefficient);
            this.resetPos(cc.v2(x, y));
        }
        this.resetScale(ratio);
    };
    $BaseUI.prototype.resetScale = function (scale) {
        if (this.adaptScale) {
            this.node.setScale(scale);
        }
    };
    $BaseUI.prototype.resetPos = function (pos) {
        this.node.setPosition(pos);
    };
    $BaseUI.prototype.adaptNodeWidget = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var topOffset, bottomOffset = null;
        if (args.length > 0 && args[0][0]) {
            var parameter = args[0][0];
            topOffset = parameter[0];
            bottomOffset = parameter[1];
        }
        else {
            return;
        }
        switch (this.target) {
            case AdaptTarget.AdaptPosForTopBang:
                if (topOffset == 0) {
                    return;
                }
                switch ($Resolution.orientation) {
                    case OrientationType.Portrait:
                        this._widget.top += topOffset;
                        break;
                    case OrientationType.Landscape:
                        this._widget.left += topOffset;
                        break;
                    case OrientationType.RightLandscape:
                        this._widget.right += topOffset;
                        break;
                }
                break;
            case AdaptTarget.AdaptPosForBottomBar:
                if (bottomOffset == 0) {
                    return;
                }
                switch ($Resolution.orientation) {
                    case OrientationType.Portrait:
                        this._widget.bottom += bottomOffset;
                        break;
                    case OrientationType.Landscape:
                        this._widget.right += bottomOffset;
                        break;
                    case OrientationType.RightLandscape:
                        this._widget.left += bottomOffset;
                        break;
                }
                break;
            case AdaptTarget.AdaptSizeForTopBang:
                if (topOffset == 0) {
                    return;
                }
                switch ($Resolution.orientation) {
                    case OrientationType.Portrait:
                        this.node.anchorY = 1;
                        this.node.height += topOffset;
                        break;
                    case OrientationType.Landscape:
                        this.node.anchorX = 0;
                        this.node.width += topOffset;
                        break;
                    case OrientationType.RightLandscape:
                        this.node.anchorX = 1;
                        this.node.width += topOffset;
                        break;
                }
                break;
            case AdaptTarget.AdaptSizeForBottomBar:
                if (bottomOffset == 0) {
                    return;
                }
                switch ($Resolution.orientation) {
                    case OrientationType.Portrait:
                        this.node.anchorY = 0;
                        this.node.height += bottomOffset;
                        break;
                    case OrientationType.Landscape:
                        this.node.anchorX = 1;
                        this.node.width += bottomOffset;
                        break;
                    case OrientationType.RightLandscape:
                        this.node.anchorX = 0;
                        this.node.width += bottomOffset;
                        break;
                }
                break;
        }
    };
    __decorate([
        property$3({
            type: AdaptTarget
        }),
        __metadata("design:type", Object)
    ], $BaseUI.prototype, "target", void 0);
    __decorate([
        property$3({
            tooltip: "是否要适配控件大小"
        }),
        __metadata("design:type", Boolean)
    ], $BaseUI.prototype, "adaptScale", void 0);
    __decorate([
        property$3({
            tooltip: "是否要动态调整位置距离"
        }),
        __metadata("design:type", Number)
    ], $BaseUI.prototype, "dynamicDisX", void 0);
    __decorate([
        property$3({
            tooltip: "是否要动态调系数"
        }),
        __metadata("design:type", Number)
    ], $BaseUI.prototype, "coefficient", void 0);
    $BaseUI = __decorate([
        ccclass$3
    ], $BaseUI);
    return $BaseUI;
}($BaseAdapt));

var UserMgr = _UserMgr.getInstance();
var MsgBridge = _MsgBridge.getInstance();
var CaisControl = _CaisControl.getInstance();
var CaisVo = _CaisVo.getInstance();
var ServerModuleMgr = _ServerModuleMgr.getInstance();
var ModuleConditionInit = _ModuleConditionInit.getInstance();
var GameEvent = $GameEvent;
var Router = _Router.getInstance();
var BaseUI = /** @class */ (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseUI;
}($BaseUI));
var BaseAdapt = /** @class */ (function (_super) {
    __extends(BaseAdapt, _super);
    function BaseAdapt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseAdapt;
}($BaseAdapt));
var BtnAdapt = /** @class */ (function (_super) {
    __extends(BtnAdapt, _super);
    function BtnAdapt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BtnAdapt;
}($BtnAdapt));
var Resolution = /** @class */ (function (_super) {
    __extends(Resolution, _super);
    function Resolution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Resolution;
}($Resolution));
var Orientation = /** @class */ (function (_super) {
    __extends(Orientation, _super);
    function Orientation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Orientation;
}($Orientation));
var BaseCommand = /** @class */ (function (_super) {
    __extends(BaseCommand, _super);
    function BaseCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseCommand;
}($BaseCommand));
var zmBaseScene = /** @class */ (function (_super) {
    __extends(zmBaseScene, _super);
    function zmBaseScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmBaseScene;
}($zmBaseScene));

var ccclass$4 = cc._decorator.ccclass;
var $BaseAdapt = /** @class */ (function (_super) {
    __extends($BaseAdapt, _super);
    function $BaseAdapt() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.wids = [];
        return _this;
    }
    $BaseAdapt.prototype.onLoad = function () {
        var _this = this;
        // 设置游戏窗口变化的回调
        cc.view.setResizeCallback(function () { return _this.onResize(); });
    };
    $BaseAdapt.prototype.adapt = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.wids = this.node.getComponentsInChildren(cc.Widget);
        var i;
        var len = this.wids.length;
        for (i = 0; i < len; i++) {
            this.wids[i].updateAlignment();
        }
    };
    $BaseAdapt.prototype.onResize = function () {
        var offset = $Resolution.getOffset();
        zmg_event_mgr.EventMgr.emit(GameEvent.VIEW_RESIZE, offset);
    };
    $BaseAdapt.prototype.onEnable = function () {
        this.adapt();
        zmg_event_mgr.EventMgr.on(GameEvent.VIEW_RESIZE, this.adapt, this);
    };
    $BaseAdapt.prototype.onDisable = function () {
        zmg_event_mgr.EventMgr.off(GameEvent.VIEW_RESIZE, this.adapt, this);
    };
    $BaseAdapt.prototype.onDestroy = function () { };
    $BaseAdapt = __decorate([
        ccclass$4
    ], $BaseAdapt);
    return $BaseAdapt;
}(cc.Component));

var UserMgr$1 = _UserMgr.getInstance();
var MsgBridge$1 = _MsgBridge.getInstance();
var CaisControl$1 = _CaisControl.getInstance();
var CaisVo$1 = _CaisVo.getInstance();
var ServerModuleMgr$1 = _ServerModuleMgr.getInstance();
var ModuleConditionInit$1 = _ModuleConditionInit.getInstance();
var AppBundleName = _AppBundleName;
var UserEventName = _UserEventName;
var Commands = $Commands;
var BU_TYPE = $BU_TYPE;
var ELocalAppKey = $ELocalAppKey;
var BU_NAME = $BU_NAME;
var GameEvent$1 = $GameEvent;
var CaisServerVoType = $CaisServerVoType;
var CaisLocalVoType = $CaisLocalVoType;
var Router$1 = _Router.getInstance();
var BaseUI$1 = /** @class */ (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseUI;
}($BaseUI));
var BaseAdapt$1 = /** @class */ (function (_super) {
    __extends(BaseAdapt, _super);
    function BaseAdapt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseAdapt;
}($BaseAdapt));
var BtnAdapt$1 = /** @class */ (function (_super) {
    __extends(BtnAdapt, _super);
    function BtnAdapt() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BtnAdapt;
}($BtnAdapt));
var Resolution$1 = /** @class */ (function (_super) {
    __extends(Resolution, _super);
    function Resolution() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Resolution;
}($Resolution));
var Orientation$1 = /** @class */ (function (_super) {
    __extends(Orientation, _super);
    function Orientation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Orientation;
}($Orientation));
var BaseCommand$1 = /** @class */ (function (_super) {
    __extends(BaseCommand, _super);
    function BaseCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseCommand;
}($BaseCommand));
var zmBaseScene$1 = /** @class */ (function (_super) {
    __extends(zmBaseScene, _super);
    function zmBaseScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return zmBaseScene;
}($zmBaseScene));

exports.AppBundleName = AppBundleName;
exports.BU_NAME = BU_NAME;
exports.BU_TYPE = BU_TYPE;
exports.BaseAdapt = BaseAdapt$1;
exports.BaseCommand = BaseCommand$1;
exports.BaseUI = BaseUI$1;
exports.BtnAdapt = BtnAdapt$1;
exports.CaisControl = CaisControl$1;
exports.CaisLocalVoType = CaisLocalVoType;
exports.CaisServerVoType = CaisServerVoType;
exports.CaisVo = CaisVo$1;
exports.Commands = Commands;
exports.ELocalAppKey = ELocalAppKey;
exports.GameEvent = GameEvent$1;
exports.ModuleConditionInit = ModuleConditionInit$1;
exports.MsgBridge = MsgBridge$1;
exports.Orientation = Orientation$1;
exports.Resolution = Resolution$1;
exports.Router = Router$1;
exports.ServerModuleMgr = ServerModuleMgr$1;
exports.UserEventName = UserEventName;
exports.UserMgr = UserMgr$1;
exports.zmBaseScene = zmBaseScene$1;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91c2VyZGF0YXMvVXNlckV2ZW50TmFtZS50cyIsIi4uLy4uLy4uL3NyYy91c2VyZGF0YXMvVXNlckNhcmRWby50cyIsIi4uLy4uLy4uL3NyYy9zZXJ2ZXJzL2NvbW1hbmRzL0NvbW1hbmRzLnRzIiwiLi4vLi4vLi4vc3JjL3VzZXJkYXRhcy9Vc2VyQ2xlYW5Wby50cyIsIi4uLy4uLy4uL3NyYy91c2VyZGF0YXMvVXNlck1nci50cyIsIi4uLy4uLy4uL3NyYy9BcHBCdW5kbGVOYW1lLnRzIiwiLi4vLi4vLi4vc3JjL2NvbmRpdGlvbnMvSGFzUGFydG5lcnNDRE4udHMiLCIuLi8uLi8uLi9zcmMvY29uZGl0aW9ucy9GcnVpdFZhbHVlQ0ROLnRzIiwiLi4vLi4vLi4vc3JjL2NvbmRpdGlvbnMvTW9kdWxlR3JheUNETi50cyIsIi4uLy4uLy4uL3NyYy9jb25kaXRpb25zL01vZHVsZUNvbmRpdGlvbkluaXQudHMiLCIuLi8uLi8uLi9zcmMvY2Fpcy9DYWlzVm8udHMiLCIuLi8uLi8uLi9zcmMvU2VydmVyTW9kdWxlTWdyLnRzIiwiLi4vLi4vLi4vc3JjL2NvcmUvYnJpZGdlL2NtZHMvQmFzZUNvbW1hbmQudHMiLCIuLi8uLi8uLi9zcmMvY29yZS9icmlkZ2UvY21kcy9CYWNrVG9IYWxsQ21kLnRzIiwiLi4vLi4vLi4vc3JjL2NvcmUvYnJpZGdlL2NtZHMvR2V0VXNlckRlZmF1bHRzQ21kLnRzIiwiLi4vLi4vLi4vc3JjL2NvcmUvYnJpZGdlL2NtZHMvU2V0VXNlckRlZmF1bHRzQ21kLnRzIiwiLi4vLi4vLi4vc3JjL2NvcmUvYnJpZGdlL2NtZHMvTG9nb3V0R2FtZUNtZC50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2JyaWRnZS9jbWRzL1Nob3dTdWJNb2R1bGVDbWQudHMiLCIuLi8uLi8uLi9zcmMvY29yZS9icmlkZ2UvY21kcy9FbnRlck1vZHVsZUNtZC50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2JyaWRnZS9jbWRzL0dhbWVQYXVzZUNtZC50cyIsIi4uLy4uLy4uL3NyYy9jb3JlL2JyaWRnZS9jbWRzL0dhbWVSZXN1bWVDbWQudHMiLCIuLi8uLi8uLi9zcmMvY29yZS9icmlkZ2UvTXNnQnJpZGdlLnRzIiwiLi4vLi4vLi4vc3JjL2NvbXAvUm9sZVRpcHMudHMiLCIuLi8uLi8uLi9zcmMvc2NlbmUvem1CYXNlU2NlbmUudHMiLCIuLi8uLi8uLi9zcmMvY29uc3RzL0dhbWVFdmVudC50cyIsIi4uLy4uLy4uL3NyYy9jYWlzL0NhaXNDb250cm9sLnRzIiwiLi4vLi4vLi4vc3JjL2NvcmUvUm91dGVyLnRzIiwiLi4vLi4vLi4vc3JjL2NvbnN0cy9FTG9jYWxBcHBLZXkudHMiLCIuLi8uLi8uLi9zcmMvYWRhcHQvT3JpZW50YXRpb24udHMiLCIuLi8uLi8uLi9zcmMvYWRhcHQvUmVzb2x1dGlvbi50cyIsIi4uLy4uLy4uL3NyYy9hZGFwdC9CdG5BZGFwdC50cyIsIi4uLy4uLy4uL3NyYy9hZGFwdC9CYXNlVUkudHMiLCIuLi8uLi8uLi9zcmMvaW5kZXgudHMiLCIuLi8uLi8uLi9zcmMvYWRhcHQvQmFzZUFkYXB0LnRzIiwiLi4vLi4vLi4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBfVXNlckV2ZW50TmFtZSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIEZSVUlUX0NIQU5HRTogc3RyaW5nID0gJ2ZydWl0Q2hhbmdlJztcclxuICAgIHB1YmxpYyBzdGF0aWMgU0xFRVBfQ0hBTkdFOiBzdHJpbmcgPSAnc2xlZXBDaGFuZ2UnO1xyXG4gICAgcHVibGljIHN0YXRpYyBXQVNIX0NIQU5HRTogc3RyaW5nID0gJ3dhc2hDaGFuZ2UnO1xyXG4gICAgcHVibGljIHN0YXRpYyBFTkVSR1lfQ0hBTkdFOiBzdHJpbmcgPSAnZW5lcmd5Q2hhbmdlJztcclxuICAgIHB1YmxpYyBzdGF0aWMgQ0xFQU5fQ0hBTkdFOiBzdHJpbmcgPSAnY2xlYW5DaGFuZ2UnO1xyXG4gICAgcHVibGljIHN0YXRpYyBHUkVFVF9DQVJEOiBzdHJpbmcgPSAnZ3JlZXRDYXJkJztcclxufSIsImltcG9ydCB7IENvbmZpZ01nciB9IGZyb20gXCJ6bWdfY29uZmlnX21nclwiO1xyXG5pbXBvcnQgeyBfVXNlckV2ZW50TmFtZSB9IGZyb20gXCIuL1VzZXJFdmVudE5hbWVcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBVc2VyQ2FyZFZvIGV4dGVuZHMgY2MuRXZlbnRUYXJnZXQge1xyXG5cclxuICAgIHByaXZhdGUgX2hhc0dyZWV0Q2FyZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgX2hhc05ld0dyZWV0Q2FyZDogYm9vbGVhblxyXG4gICAgcHJpdmF0ZSBfaGFzUmVjaXZlR3JlZXRDYXJkOiBib29sZWFuO1xyXG5cclxuICAgIHByaXZhdGUgX2luZm86IFdlYlNlcnZlclZvLklHZXRQYXJ0bmVySW5mbztcclxuICAgIHByaXZhdGUgX2dyZWV0Q2FyZFRpcDogV2ViU2VydmVyVm8uSUdyZWV0Q2FyZFRpcDtcclxuXHJcbiAgICBwdWJsaWMgc2V0RGF0YShyZXM6IFdlYlNlcnZlclZvLklHZXRQYXJ0bmVySW5mbyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2luZm8gPSByZXM7XHJcbiAgICAgICAgdGhpcy5ncmVldENhcmRUaXAgPSByZXMuZ3JlZXRDYXJkVGlwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgaXNHcmVldENhcmQoczogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICghcykge1xyXG4gICAgICAgICAgICB0aGlzLmdyZWV0Q2FyZFRpcC5zdGF0dXMgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXNHcmVldENhcmQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIG1vZHVsZTogem1nLklNb2R1bGVDb25maWcgPSBDb25maWdNZ3IuZ2V0TW9kdWxlQ29uZmlnQnlDb2RlKFwiR3JlZXRDYXJkXCIpO1xyXG4gICAgICAgIGlmIChtb2R1bGUgJiYgbW9kdWxlLmlzQ2xvc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ncmVldENhcmRUaXAuc3RhdHVzID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBoYXNHcmVldENhcmQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5faGFzR3JlZXRDYXJkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5faGFzR3JlZXRDYXJkID0gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9oYXNHcmVldENhcmQgPSB2YWx1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGhhc0dyZWV0Q2FyZCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5faGFzR3JlZXRDYXJkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5faGFzR3JlZXRDYXJkID0gZmFsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhc0dyZWV0Q2FyZFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNHcmVldENhcmRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBoYXNSZWNpdmVHcmVldENhcmQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5faGFzUmVjaXZlR3JlZXRDYXJkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5faGFzUmVjaXZlR3JlZXRDYXJkID0gZmFsc2VcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9oYXNSZWNpdmVHcmVldENhcmQgPSB2YWx1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGhhc1JlY2l2ZUdyZWV0Q2FyZCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5faGFzUmVjaXZlR3JlZXRDYXJkID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5faGFzUmVjaXZlR3JlZXRDYXJkID0gZmFsc2VcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhc1JlY2l2ZUdyZWV0Q2FyZFxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNSZWNpdmVHcmVldENhcmRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVzY3JpcHRpb246IOaYr+WQpuacieaWsOi0uuWNoeafpeaUtuaPkOmGklxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0IGhhc05ld0dyZWV0Q2FyZCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh0aGlzLl9oYXNOZXdHcmVldENhcmQgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9oYXNOZXdHcmVldENhcmQgPSBmYWxzZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2hhc05ld0dyZWV0Q2FyZCA9IHZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgZ3JlZXRDYXJkVGlwKCk6IFdlYlNlcnZlclZvLklHcmVldENhcmRUaXAge1xyXG4gICAgICAgIGlmICh0aGlzLl9ncmVldENhcmRUaXAgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLl9ncmVldENhcmRUaXAgPSB7IGNhcmROdW06IDAsIHN0YXR1czogMCB9XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ncmVldENhcmRUaXBcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ3JlZXRDYXJkVGlwXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgZ3JlZXRDYXJkVGlwKHZhbHVlOiBXZWJTZXJ2ZXJWby5JR3JlZXRDYXJkVGlwKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2dyZWV0Q2FyZFRpcCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2dyZWV0Q2FyZFRpcCA9IHZhbHVlXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fZ3JlZXRDYXJkVGlwID0gdmFsdWVcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5faW5mby5ncmVldENhcmRUaXAgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmhhc0dyZWV0Q2FyZCA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5oYXNSZWNpdmVHcmVldENhcmQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuaGFzTmV3R3JlZXRDYXJkID0gZmFsc2VcclxuICAgICAgICBpZiAodGhpcy5fZ3JlZXRDYXJkVGlwKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fZ3JlZXRDYXJkVGlwLnN0YXR1cykge1xyXG4gICAgICAgICAgICAgICAgLy8wIOaXoOaPkOmGkiAxIOaUtuWIsOi0uuWNoSAyIOaUtuWIsOWbnuWkjSAzIOi0uuWNoeS4iuaWsFxyXG4gICAgICAgICAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzR3JlZXRDYXJkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzUmVjaXZlR3JlZXRDYXJkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGFzTmV3R3JlZXRDYXJkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBsZXQgdXNlciA9IF9Vc2VyTWdyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgLy8gdXNlci5lbWl0KF9Vc2VyRXZlbnROYW1lLkdSRUVUX0NBUkQsIHRoaXMuX2dyZWV0Q2FyZFRpcClcclxuICAgICAgICB0aGlzLmVtaXQoX1VzZXJFdmVudE5hbWUuR1JFRVRfQ0FSRCwgdGhpcy5fZ3JlZXRDYXJkVGlwKTtcclxuICAgIH1cclxufSIsIi8qKlxyXG4gKiBzd2FnZ2VyOlxyXG4gKiBodHRwOi8va2lkcy1zdHVkeS1wYXJrLWMtZmF0LWFsaHouaW56bS5jb20vc3dhZ2dlci11aS5odG1sIy9cclxuICovXHJcbmV4cG9ydCBlbnVtICRDb21tYW5kcyB7XHJcbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0t5aSn5Y6FLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIC8qKiBcclxuICAgICAqIOiOt+WPluWkp+WOheWfuuacrOS/oeaBr1xyXG4gICAgICovXHJcbiAgICBnZXRIYWxsQmFzZUluZm8gPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvaGFsbC9nZXRIYWxsQmFzZUluZm9cIixcclxuICAgIGdldFN0dWRlbnRCYXNlSW5mbyA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9jb25maWcvZ2V0U3R1ZGVudEJhc2VJbmZvXCIsXHJcblxyXG4gICAgLyoqXHJcbiAgICAqIOiOt+WPluW9qeibi+S/oeaBr1xyXG4gICAgKi9cclxuICAgIGVnZ1Jld2FyZCA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9oYWxsL2NoZWNrcG9pbnRSZXdhcmRcIixcclxuICAgIGVnZ0luZm8gPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvaGFsbC9nZXRIYWxsQ2hlY2twb2ludEluZm9cIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWtpuS8tOS/oeaBr1xyXG4gICAgICovXHJcbiAgICBnZXRQYXJ0bmVySW5mbyA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS92Mi9wYXJ0bmVyL29wdGltaXplL2dldFBhcnRuZXJJbmZvXCIsXHJcblxyXG4gICAgLy/mtbfmiqVcclxuICAgIGdldExhbmRJbmZvID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3BhcnRuZXIvcG9zdGVyL3dhbGwvcG9zdGVyRnJhbWVTaG93XCIsXHJcbiAgICBoYW5naW5nUG9zdGVyID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3BhcnRuZXIvcG9zdGVyL3dhbGwvaGFuZ2luZ1Bvc3RlclwiLFxyXG4gICAgcG9zdGVyUGFnZSA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9wYXJ0bmVyL3Bvc3Rlci93YWxsL3Bvc3RlclBhZ2VcIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluijheaJrlxyXG4gICAgICovXHJcbiAgICBnZXRSb2xlRHJlc3NVcHMgPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvcGFydG5lci9kcmVzc1VwL3F1ZXJ5L3VzZXJEcmVzc1Vwc1wiLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5pu05paw6IO96YeP5p6cXHJcbiAgICAgKi9cclxuICAgIGdldEZydWl0VG90YWxOdW0gPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvdjIvcGFydG5lci9lbmVyZ3lGcnVpdC9hbW91bnRcIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmihuWPluWtpuS8tFxyXG4gICAgICovXHJcbiAgICBnYWluQ29tcGFuaW9uID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3YyL3BhcnRuZXIvYWRkUGFydG5lclwiLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog54Gw5bqm5p+l6K+iXHJcbiAgICAgKi9cclxuICAgIGdyYXlTdXJ2ZXkgPSBcIi9raWRzL2FwaS9ncmF5QXBpL3RvYy9ncmF5L2ZpbmRHcmF5RWZmZWN0QnlDb2RlQW5kUGFyYW1cIixcclxuICAgIGdyYXlMaXN0U3VydmV5ID0gXCIva2lkcy9hcGkvZ3JheUFwaS90b2MvZ3JheS9maW5kTWFueVwiLFxyXG4gICAgLyoqXHJcbiAgICAgKiDljp/nlJ/mqKHlnZfkv6Hmga/liJfooahcclxuICAgICAqL1xyXG4gICAgbW9kdWxlTGlzdCA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9uYXRpdmUvbW9kdWxlL3F1ZXJ5L2xpc3RcIixcclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5a2Y5YKo5pyN5Yqh5Zmo5pWw5o2uXHJcbiAgICAgKi9cclxuICAgIGdldFN0b3JhZ2UgPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvZGljdC9zdG9yYWdlL2JhdGNoXCIsXHJcbiAgICBzZXRTdG9yYWdlID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL2RpY3Qvc3RvcmFnZS9wdXRcIixcclxuICAgIC8qKlxyXG4gICAgICog5aWW5Yqx5Lit5b+DXHJcbiAgICAgKi9cclxuICAgIHJld2FyZENlbnRlckluaXQgPSAnL2tpZHNTdHVBcGkvYXdhcmQvY2VudHJlL3Rhc2svaW5pdCcsXHJcbiAgICBnZXRSZXdhcmRDZW50ZXJMaXN0ID0gJy9raWRzU3R1QXBpL2F3YXJkL2NlbnRyZS90YXNrL2xpc3QnLFxyXG4gICAgZ2V0UmV3YXJkQ2VudGVyQXdhcmQgPSAnL2tpZHNTdHVBcGkvYXdhcmQvY2VudHJlL3Rha2UvYXdhcmQnLFxyXG4gICAgZ2V0UmV3YXJkQ2VudGVyUmVtaW5kID0gJy9raWRzU3R1QXBpL2F3YXJkL2NlbnRyZS90YXNrL3JlbWluZCcsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnrb7liLBcclxuICAgICAqL1xyXG4gICAgc2lnbkxpc3QgPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvc2lnbkluL2N1cnJlbnQvc2lnbkluL2xpc3RcIixcclxuICAgIGlzU2lnbkluID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3NpZ25Jbi9pc1NpZ25JblwiLFxyXG4gICAgc2lnbkluID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3NpZ25Jbi9zaWduSW5cIixcclxuXHJcbiAgICAvKipcclxuICAgICAqIOW5v+WRiuW8ueeql1xyXG4gICAgICovXHJcbiAgICBhZGRPcGVyYXRpb25JbmZvID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3BvcHVwL3dpbmRvdy9hZGRPcGVyYXRpb25JbmZvXCIsXHJcbiAgICB3aW5kb3dfYXdhcmQgPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvcG9wdXAvd2luZG93L2dldC9hd2FyZFwiLFxyXG4gICAgd2luZG93X2dldCA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9wb3B1cC93aW5kb3cvZ2V0XCIsXHJcbiAgICBnZXRRdWVzdGlvbm5haXJlQ29uZmlnID0gXCIva2lkc1N0dUFwaS9hcGkvZmVlZGJhY2svbGlzdFwiLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogbnBj6aKG5aWWXHJcbiAgICAgKi9cclxuICAgIG5wY1Jld2FyZCA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9oYWxsL25wY1Jld2FyZFwiLFxyXG4gICAgLyoqXHJcbiAgICAgKiDlpKfljoVOUENcclxuICAgICAqL1xyXG4gICAgbnBjSW5mbyA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9oYWxsL2dldEhhbGxOcGNJbmZvXCIsXHJcblxyXG4gICAgLy/op5LmoIfngrnlh7vpgJrnn6VcclxuICAgIGdldEhhbGxNb2R1bGVJY29uSW5mbyA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9oYWxsL2dldEhhbGxNb2R1bGVJY29uSW5mb1wiLFxyXG5cclxuXHJcblxyXG4gICAgLyoq5YuL56ugICovXHJcbiAgICBjYXJyeU1lZGFsID0gXCIva2lkcy9tZWRhbC13YWxsL2FwaS9tZWRhbC9jYXJyeVwiLC8v6I635Y+W5b2T5YmN5a2m5Ly05bey5pC65bim55qE57K+54G15L+h5oGvKOWMheaLrOW9k+WJjeiDveWKm+WFieeOrylcclxuICAgIG93bk1lZGFsID0gXCIva2lkcy9tZWRhbC13YWxsL2FwaS91c2VyLW1lZGFsL293blwiLC8v6I635Y+W5b2T5YmN57K+54G16LC35YWl5Y+j5aSW5pi+55qE57K+54G15L+h5oGv77yI6ZqP5py65Y+W5oul5pyJ5L2G6Z2e5pC65bim55qE5pyA6auY562J57qn55qE5Lu75LiA57K+54G177yJXHJcblxyXG4gICAgLy/or5XooaPpl7RcclxuICAgIGdldERyZXNzRGV0YWlsID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3BhcnRuZXIvZHJlc3NVcC9wcm9kdWN0L2RldGFpbFwiLFxyXG4gICAgZ2V0V2FyZHJvYmVMaXN0ID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3BhcnRuZXIvZHJlc3NVcC9xdWVyeS9kcmVzc1Vwc1wiLFxyXG4gICAgc2F2ZVJvbGVEcmVzc1VwcyA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9wYXJ0bmVyL2RyZXNzVXAvc2F2ZS91c2VyRHJlc3NVcHNcIixcclxuICAgIGdldFdhcmRyb2JlQmFyID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3BhcnRuZXIvZHJlc3NVcC93YXJkcm9iZS9iYXJcIixcclxuICAgIGdldE5ld0Nsb3RoUHJvZHVjdCA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9wYXJ0bmVyL2RyZXNzVXAvcmVtaW5kL25ld0ZyZWVQcm9kdWN0XCIsXHJcbiAgICB1cGxvYWRUcnlPblJlY29yZCA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9wYXJ0bmVyL2RyZXNzVXAvc2F2ZS91c2VyRHJlc3NSZWNvcmRcIixcclxuICAgIGdldFdhcmRyb2JlQ2F0ZWdJbmZvID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3BhcnRuZXIvZHJlc3NVcC9wcm9kdWN0L2RpcmVjdG9yeVwiLFxyXG5cclxuICAgIC8v5LiK5Lyg5Zu+54mHXHJcbiAgICB1cGxvYWRJbWcgPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvZmlsZS9kYXRhL2ltYWdlL3VwbG9hZFwiLFxyXG5cclxuICAgIC8qKkhvdXNlKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgc3VidHJhY3RGcnVpdCA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9wYXJ0bmVyL3N1YnRyYWN0RnJ1aXRcIixcclxuICAgIHNsZWVwID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3YyL3BhcnRuZXIvc2xlZXBcIixcclxuICAgIHdhc2ggPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvdjIvcGFydG5lci93YXNoXCIsXHJcbiAgICByZWNvcmRDbGVhbiA9ICcva2lkcy9zdHVkeS9wYXJrL3N0YXQvYXBpL3BhcmsvcGFydG5lci9yZWNvcmQvY2xlYW4nLFxyXG4gICAgcmVjb3JkQ2xlYW5Sc3VsdCA9ICcva2lkcy9zdHVkeS9wYXJrL3N0YXQvYXBpL3BhcmsvcGFydG5lci9yZWNvcmQvY2xlYW5Sc3VsdCcsXHJcbiAgICByZWNvcmRFYXQgPSAnL2tpZHMvc3R1ZHkvcGFyay9zdGF0L2FwaS9wYXJrL3BhcnRuZXIvcmVjb3JkL2VhdCcsXHJcbiAgICByZWNvcmRTbGVlcCA9ICcva2lkcy9zdHVkeS9wYXJrL3N0YXQvYXBpL3BhcmsvcGFydG5lci9yZWNvcmQvc2xlZXAnLFxyXG4gICAgcmVjb3JkV2FzaCA9ICcva2lkcy9zdHVkeS9wYXJrL3N0YXQvYXBpL3BhcmsvcGFydG5lci9yZWNvcmQvd2FzaCcsXHJcbiAgICBhY3Rpb25Db25maWcgPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvcGFydG5lci9hY3Rpb25Db25maWdcIixcclxuICAgIGNsZWFuUm9vbSA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9wYXJ0bmVyL2NsZWFuXCIsXHJcblxyXG5cclxuICAgIC8v5oi/6Ze06YGT5YW35o2i6IKkXHJcbiAgICBkcmVzc0xpc3QgPSAnL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9mdXJuaXR1cmUvZHJlc3NMaXN0JywvL+WutuWFt+ijheaJruWIl+ihqFxyXG4gICAgcHVyY2hhc2UgPSAnL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9mdXJuaXR1cmUvcHVyY2hhc2UnLC8v5LiL5Y2VXHJcbiAgICBzYXZlVXNlckZ1cm5pdHVyZSA9ICcva2lkcy9zdHVkeS9wYXJrL2MvYXBpL2Z1cm5pdHVyZS9zYXZlVXNlckZ1cm5pdHVyZScsLy/kv53lrZjnlKjmiLfoo4Xmia5cclxuICAgIHR5cGVzID0gJy9raWRzL3N0dWR5L3BhcmsvYy9hcGkvZnVybml0dXJlL3R5cGVzJywvL+iOt+WPluWutuWFt+WIhuexu1xyXG4gICAgdXNlckZ1cm5pdHVyRHJlc3NMaXN0ID0gJy9raWRzL3N0dWR5L3BhcmsvYy9hcGkvZnVybml0dXJlL3VzZXJGdXJuaXR1ckRyZXNzTGlzdCcsLy/nlKjmiLflt7Loo4Xmia7lrrblhbfliJfooahcclxuXHJcblxyXG4gICAgLyoqQ2FpcyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIHNldFBsYXlBbmRSZXN0VGltZUNvbmZpZyA9IFwiL2tpZHMvYXBpL3N0dWR5L3BhcmsvYXBpL2NvbmZpZy9zZXRQbGF5QW5kUmVzdFRpbWVDb25maWdcIixcclxuICAgIGdldFBsYXlBbmRSZXN0VGltZUNvbmZpZyA9IFwiL2tpZHMvYXBpL3N0dWR5L3BhcmsvYXBpL2NvbmZpZy9nZXRQbGF5QW5kUmVzdFRpbWVDb25maWdcIixcclxuICAgIC8qKlxyXG4gICAgICog5byV5a+85aWW5YqxXHJcbiAgICAgKi9cclxuICAgIGdldEVuZXJneUZydWl0ID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL2hhbGwvZ2V0RW5lcmd5RnJ1aXRcIixcclxuICAgIC8v5YuL56ug5aKZXHJcbiAgICByZWNvcmRHdWlkZU1lZGFsID0gXCIva2lkcy9tZWRhbC13YWxsL2FwaS9ndWlkZS9yZWNvcmQtZ3VpZGVcIiwvL+iusOW9leW8leWvvFxyXG4gICAgYWxsTWVkYWwgPSBcIi9raWRzL21lZGFsLXdhbGwvYXBpL3VzZXItbWVkYWwtd2FsbC9hbGxcIiwvL+iOt+WPlueUqOaIt+WLi+eroOWimVxyXG5cclxuICAgIG5vdmlld01lZGFsID0gXCIva2lkcy9tZWRhbC13YWxsL2FwaS91c2VyLW1lZGFsL25vLXZpZXdcIiwvL+afpeivoueUqOaIt+acqua1j+iniOeahOaWsOeyvueBtVxyXG4gICAgdmlld01lZGFsID0gXCIva2lkcy9tZWRhbC13YWxsL2FwaS91c2VyLW1lZGFsL3NhdmUvdmlldy1tZWRhbFwiLC8v5L+d5a2Y5p+l55yL5paw57K+54G16K6w5b2VXHJcbiAgICByZW1vdmVNZWRhbCA9IFwiL2tpZHMvbWVkYWwtd2FsbC9hcGkvbWVkYWwvcmVtb3ZlXCIsLy/ljbjkuIvmiJDlsLHli4vnq6BcclxuICAgIGFjY2VwdE1lZGFsID0gXCIva2lkcy9tZWRhbC13YWxsL2FwaS9tZWRhbC9hY2NlcHRcIiwvL+aUtuS4i+aIkOWwseWLi+eroFxyXG4gICAgY291bnRNZWRhbCA9IFwiL2tpZHMvbWVkYWwtd2FsbC9hcGkvbWVkYWwvbm90LWFjY2VwdGVkL2NvdW50XCIsLy/ojrflj5bnlKjmiLfmnKrmlLbkuIvnmoTmiJDlsLHli4vnq6DmlbDph49cclxuICAgIGxpc3RNZWRhbCA9IFwiL2tpZHMvbWVkYWwtd2FsbC9hcGkvbWVkYWwvbm90LWFjY2VwdGVkL2xpc3RcIiwvL+iOt+WPlueUqOaIt+acquaUtuS4i+eahOaIkOWwseWLi+eroOaVsOmHj1xyXG4gICAgYWNoaWV2ZW1lbnRNZWRhbCA9IFwiL2tpZHMvbWVkYWwtd2FsbC9hcGkvdXNlci1tZWRhbC13YWxsL2FjaGlldmVtZW50L3BhZ2VcIiwvL+iOt+WPlueUqOaIt+aIkOWwseWLi+eroC3liIbpobVcclxuICAgIGluZm9NZWRhbCA9IFwiL2tpZHMvbWVkYWwtd2FsbC9hcGkvdXNlci1tZWRhbC9pbmZvXCIsLy/ojrflj5bnlKjmiLfli4vnq6Dkv6Hmga9cclxuICAgIGlzR3VpZGVkTWVkYWwgPSBcIi9raWRzL21lZGFsLXdhbGwvYXBpL2d1aWRlL2lzLWd1aWRlZFwiLC8vdHJ1ZeS4uuW8leWvvOi/h+WImeS4jeWGjeWBmuW8leWvvFxyXG4gICAgY2FycnlVc2VyTWVkYWwgPSBcIi9raWRzL21lZGFsLXdhbGwvYXBpL3VzZXItbWVkYWwvY2FycnlcIiwvL+iOt+WPluW9k+WJjeWtpuS8tOW3suaQuuW4pueahOeyvueBteS/oeaBryjljIXmi6zlvZPliY3og73lipvlhYnnjq8pXHJcbiAgICBjYXRhbG9ndWVNZWRhbCA9IFwiL2tpZHMvbWVkYWwtd2FsbC9hcGkvcmFuay9tZWRhbC9jYXRhbG9ndWVcIiwvL+iOt+WPlueUqOaIt+iOt+WPlueyvueBteaDheWGtSDlt7Lojrflvpcv5pyq6I635b6XXHJcbiAgICBnZXRSYW5rTWVkYWwgPSBcIi9raWRzL21lZGFsLXdhbGwvYXBpL3JhbmsvbWVkYWwvZ2V0UmFua1wiLC8v5qC55o2u5p2h5Lu255So5oi36I635Y+W5o6S6KGM5qac5L+h5oGvXHJcbiAgICBnZXRCYXRjaE1lZGFsID0gJy9raWRzL3N0dWR5L3BhcmsvYy9hcGkvcGFydG5lci9kcmVzc1VwL3F1ZXJ5L3VzZXJEcmVzc1Vwcy9iYXRjaCcsIC8v5om56YeP6I635Y+W55So5oi36KOF5omu5YiX6KGoIFxyXG5cclxuICAgIC8qKk1hbGzlpYflppnllYbln47nm7jlhbPmjqXlj6MqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBnZXRNYWxsRGVzYyA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9mYW50YXN0aWMvbWFsbC9kZXNjXCIsLy/llYbln47mj4/ov7Dlm77niYflnLDlnYBcclxuICAgIGdldEdvb2xkc1R5cGVMaXN0ID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3YzL2ZhbnRhc3RpYy9tYWxsL3Byb2R1Y3QvdHlwZS9saXN0XCIsLy/llYblk4HliIbnsbvliJfooahcclxuICAgIGdldFJlY29tbWVuZExpc3QgPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvdjMvZmFudGFzdGljL21hbGwvcHJvZHVjdC9yZWNvbW1lbmRMaXN0XCIsLy/mjqjojZDllYblk4HliJfooahcclxuICAgIGdldEFjdGl2aXR5TGlzdCA9ICcva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3YzL2ZhbnRhc3RpYy9tYWxsL2FjdGl2aXR5L3Byb2R1Y3QvbGlzdCcsLy/mtLvliqjllYblk4HliJfooahcclxuICAgIGdldEdvb2RzRGV0YWlsSW5mID0gJy9raWRzL3N0dWR5L3BhcmsvYy9hcGkvdjMvZmFudGFzdGljL21hbGwvcHJvZHVjdC9kZXRhaWwnLC8v5ZWG5ZOB6K+m5oOFXHJcbiAgICBnZXRPcmRlckxpc3QgPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvZmFudGFzdGljL21hbGwvb3JkZXIvbGlzdFwiLC8v6K6i5Y2V5YiX6KGoXHJcbiAgICBwdXJjaGFzZUdvb2RzID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3YzL2ZhbnRhc3RpYy9tYWxsL3B1cmNoYXNlXCIsIC8v6LSt5Lmw5Lqn5ZOBIHtcImNvbW1vZGl0eUlkXCI6IDAsXCJwbGF0Zm9ybVwiOiBcInN0cmluZ1wiLFwidmFsdWVEZWR1Y3Rpb25cIjogMH1cclxuICAgIGdldEdvb2RzTGlzdCA9ICcva2lkcy9zdHVkeS9wYXJrL2MvYXBpL3YzL2ZhbnRhc3RpYy9tYWxsL3Byb2R1Y3QvbGlzdCcsLy/llYblk4HliJfooahcclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7u+WKoeS4reW/gyBcclxuICAgICovXHJcbiAgICB0YXNrQXdhcmQgPSBcIi9raWRzU3R1QXBpL3Rhc2svY2VudHJlL3Rha2UvYXdhcmRcIixcclxuICAgIHRhc2tJbml0ID0gJy9raWRzU3R1QXBpL3Rhc2svY2VudHJlL3Rha2UvaW5pdCcsXHJcbiAgICB0b2RvVGFza0xpc3QgPSAnL2tpZHNTdHVBcGkvdGFzay9jZW50cmUvdG9kby9saXN0JyxcclxuICAgIGdldFRhc2tVcmwgPSAnL2tpZHNTdHVBcGkvdGFzay9jZW50cmUvdGFzay9nZXRVcmwnLFxyXG4gICAgdW5DbGFpbWVkID0gJy9raWRzU3R1QXBpL3Rhc2svY2VudHJlL3VuY2xhaW1lZCcsXHJcbiAgICBib3hBd2FyZCA9ICcva2lkc1N0dUFwaS90YXNrL2NlbnRyZS9ib3gvYXdhcmQnLFxyXG4gICAgYm94Tm9kZSA9ICcva2lkc1N0dUFwaS90YXNrL2NlbnRyZS9ib3gvbm9kZScsXHJcbiAgICBib3hMaXN0ID0gJy9raWRzU3R1QXBpL3Rhc2svY2VudHJlL2JveC9saXN0JyxcclxuICAgIC8qKlxyXG4gICAgICog6LS65Y2h55u45YWz5o6l5Y+jXHJcbiAgICAgKi9cclxuICAgIGZlc3RpdmFsUmVhZCA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9ncmVldC9jYXJkL2Zlc3RpdmFsL3RpcC9yZWFkXCIsICAgIC8vIOiKguaXpeaPkOmGkuagh+iusOW3suivu1xyXG4gICAgZ3JlZXRDYXJkSW5ib3ggPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvZ3JlZXQvY2FyZC9yZWNlaXZlL2dyZWV0Q2FyZEluYm94XCIsICAgIC8vIOWtpueUn+aUtuS7tueusVxyXG4gICAgcmVhZEdyZWV0TWVzc2FnZSA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9ncmVldC9jYXJkL3JlY2VpdmUvcmVhZE1lc3NhZ2VcIiwgIC8vIOagh+iusOi0uuWNoS/lm57lpI3kuLrlt7Lor7tcclxuICAgIHVuR3JlZXRSZWFkTWVzc2FnZSA9IFwiL2tpZHMvc3R1ZHkvcGFyay9jL2FwaS9ncmVldC9jYXJkL3JlY2VpdmUvdW5SZWFkTWVzc2FnZVwiLCAgICAvLyDmnKror7vmtojmga/liJfooahcclxuICAgIGdyZWV0Q2FyZFNlbmQgPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvZ3JlZXQvY2FyZC9zZW5kL3NlbmRDYXJkXCIsICAvLyDlj5HpgIHotLrljaFcclxuICAgIHNlbmRDYXJkRGVjb3JhdGVJbmZvID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL2dyZWV0L2NhcmQvc2VuZC9zZW5kQ2FyZERlY29yYXRlSW5mb1wiLCAvLyDotLrljaFkaXnnlYzpnaLkv6Hmga9cclxuICAgIHNlbmRHcmVldENhcmRJbmZvID0gXCIva2lkcy9zdHVkeS9wYXJrL2MvYXBpL2dyZWV0L2NhcmQvc2VuZC9zZW5kQ2FyZEluZm9cIiwgICAgLy8g5Y+R6YCB6LS65Y2h55WM6Z2i5Z+65pys5L+h5oGvXHJcbiAgICB1blJlYWRNZXNzYWdlQ291bnQgPSBcIi9raWRzL3N0dWR5L3BhcmsvYy9hcGkvZ3JlZXQvY2FyZC9yZWNlaXZlL3VuUmVhZE1lc3NhZ2VDb3VudFwiLCAvLyDmnKror7vmtojmga/nu5/orqFcclxuXHJcbn1cclxuIiwiaW1wb3J0IHsgZ0xvZyB9IGZyb20gXCJ6bWdfdXRpbFwiXHJcbmltcG9ydCB7IF9Vc2VyRXZlbnROYW1lIH0gZnJvbSBcIi4vVXNlckV2ZW50TmFtZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFVzZXJDbGVhclZvIGV4dGVuZHMgY2MuRXZlbnRUYXJnZXQge1xyXG4gICAgcHVibGljIENMRUFOX0NIQU5HRTogc3RyaW5nID0gJ2NsZWFuQ2hhbmdlJztcclxuICAgIHByaXZhdGUgX2NsZWFuUm9vbUluZm86IFdlYlNlcnZlclZvLklDbGVhblJvb21JbmZvW107XHJcbiAgICBwdWJsaWMgc2V0RGF0YShyZXM6IFdlYlNlcnZlclZvLklHZXRQYXJ0bmVySW5mbyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX2NsZWFuUm9vbUluZm8gPSBbXTtcclxuICAgICAgICBpZiAocmVzLmNsZWFuUm9vbUluZm8pIHtcclxuICAgICAgICAgICAgcmVzLmNsZWFuUm9vbUluZm8uZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRSb29tQ2xlYW5MaW5lc3NCeUZsb29ySWQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICAgICog5qC55o2u5oi/6Ze05qW85bGC5Y+36K6+572u5qW85bGC5Z6D5Zy+5L+h5oGvXHJcbiAgICAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRSb29tQ2xlYW5MaW5lc3NCeUZsb29ySWQoXHJcbiAgICAgICAgaW5mbzogV2ViU2VydmVyVm8uSUNsZWFuUm9vbUluZm9cclxuICAgICk6IFdlYlNlcnZlclZvLklDbGVhblJvb21JbmZvIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NsZWFuUm9vbUluZm8pIHtcclxuICAgICAgICAgICAgdGhpcy5fY2xlYW5Sb29tSW5mbyA9IHRoaXMuX2NsZWFuUm9vbUluZm8gfHwgW11cclxuICAgICAgICAgICAgdGhpcy5fY2xlYW5Sb29tSW5mby5wdXNoKGluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiBpbmZvXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jbGVhblJvb21JbmZvLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2xlYW5Sb29tSW5mb1tpXS5pbmRleCA9PSBpbmZvLmluZGV4KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2xlYW5Sb29tSW5mb1tpXS5jbGVhblZhbHVlID0gaW5mby5jbGVhblZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2xlYW5Sb29tSW5mb1tpXS5pc1RvQ2xlYW4gPSBpbmZvLmlzVG9DbGVhblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmZvXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fY2xlYW5Sb29tSW5mbyA9IHRoaXMuX2NsZWFuUm9vbUluZm8gfHwgW11cclxuICAgICAgICAgICAgdGhpcy5fY2xlYW5Sb29tSW5mby5wdXNoKGluZm8pXHJcbiAgICAgICAgICAgIHJldHVybiBpbmZvXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5oi/6Ze05qW85bGC5Y+36I635Y+W5qW85bGC5Z6D5Zy+5L+h5oGvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSb29tQ2xlYW5MaW5lc3NCeUZsb29ySWQoaWQ6IG51bWJlcik6IFdlYlNlcnZlclZvLklDbGVhblJvb21JbmZvIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NsZWFuUm9vbUluZm8pIHtcclxuICAgICAgICAgICAgaWYgKGlkIDwgMCkgZ0xvZygn5qOA57Si5qW85bGCaWTmnInor68nKVxyXG4gICAgICAgICAgICBsZXQgbSA9IHtcclxuICAgICAgICAgICAgICAgIGNsZWFuVmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICBpbmRleDogaWQsXHJcbiAgICAgICAgICAgICAgICBpc1RvQ2xlYW46IHRydWUsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fY2xlYW5Sb29tSW5mbyA9IHRoaXMuX2NsZWFuUm9vbUluZm8gfHwgW11cclxuICAgICAgICAgICAgdGhpcy5fY2xlYW5Sb29tSW5mby5wdXNoKG0pXHJcbiAgICAgICAgICAgIHJldHVybiBtXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jbGVhblJvb21JbmZvLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2xlYW5Sb29tSW5mb1tpXS5pbmRleCA9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jbGVhblJvb21JbmZvW2ldXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkIDwgMCkgZ0xvZygn5qOA57Si5qW85bGCaWTmnInor68nKVxyXG4gICAgICAgICAgICBsZXQgbSA9IHtcclxuICAgICAgICAgICAgICAgIGNsZWFuVmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICBpbmRleDogaWQsXHJcbiAgICAgICAgICAgICAgICBpc1RvQ2xlYW46IHRydWUsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fY2xlYW5Sb29tSW5mbyA9IHRoaXMuX2NsZWFuUm9vbUluZm8gfHwgW11cclxuICAgICAgICAgICAgdGhpcy5fY2xlYW5Sb29tSW5mby5wdXNoKG0pXHJcbiAgICAgICAgICAgIHJldHVybiBtXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIOagueaNruaIv+mXtOalvOWxguWPt+iuvue9rualvOWxgua4hea0geWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Um9vbUNsZWFuVmFsdWVCeUZsb29ySWQoXHJcbiAgICAgICAgaWQ6IG51bWJlcixcclxuICAgICAgICBWYWx1ZTogbnVtYmVyXHJcbiAgICApOiBXZWJTZXJ2ZXJWby5JQ2xlYW5Sb29tSW5mbyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jbGVhblJvb21JbmZvKSB7XHJcbiAgICAgICAgICAgIGlmIChpZCA8IDApIGdMb2coJ+ajgOe0oualvOWxgmlk5pyJ6K+vJylcclxuICAgICAgICAgICAgbGV0IG0gPSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhblZhbHVlOiBWYWx1ZSxcclxuICAgICAgICAgICAgICAgIGluZGV4OiBpZCxcclxuICAgICAgICAgICAgICAgIGlzVG9DbGVhbjogVmFsdWUgPiAzMCA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9jbGVhblJvb21JbmZvID0gdGhpcy5fY2xlYW5Sb29tSW5mbyB8fCBbXVxyXG4gICAgICAgICAgICB0aGlzLl9jbGVhblJvb21JbmZvLnB1c2gobSlcclxuICAgICAgICAgICAgdGhpcy5lbWl0KF9Vc2VyRXZlbnROYW1lLkNMRUFOX0NIQU5HRSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jbGVhblJvb21JbmZvLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fY2xlYW5Sb29tSW5mb1tpXS5pbmRleCA9PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFuUm9vbUluZm9baV0uY2xlYW5WYWx1ZSA9IFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRSb29tSXNUb0NsZWFuQnlGbG9vcklkKGlkLCBWYWx1ZSA+IDMwID8gZmFsc2UgOiB0cnVlKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChfVXNlckV2ZW50TmFtZS5DTEVBTl9DSEFOR0UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jbGVhblJvb21JbmZvW2ldXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChpZCA8IDApIGdMb2coJ+ajgOe0oualvOWxgmlk5pyJ6K+vJylcclxuICAgICAgICAgICAgbGV0IG0gPSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhblZhbHVlOiBWYWx1ZSxcclxuICAgICAgICAgICAgICAgIGluZGV4OiBpZCxcclxuICAgICAgICAgICAgICAgIGlzVG9DbGVhbjogVmFsdWUgPiAzMCA/IGZhbHNlIDogdHJ1ZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9jbGVhblJvb21JbmZvID0gdGhpcy5fY2xlYW5Sb29tSW5mbyB8fCBbXVxyXG4gICAgICAgICAgICB0aGlzLl9jbGVhblJvb21JbmZvLnB1c2gobSlcclxuICAgICAgICAgICAgdGhpcy5lbWl0KF9Vc2VyRXZlbnROYW1lLkNMRUFOX0NIQU5HRSk7XHJcbiAgICAgICAgICAgIHJldHVybiBtXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIOagueaNruaIv+mXtOalvOWxguWPt+iuvue9rualvOWxgua4hea0geWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Um9vbUlzVG9DbGVhbkJ5Rmxvb3JJZChcclxuICAgICAgICBpZDogbnVtYmVyLFxyXG4gICAgICAgIFZhbHVlOiBib29sZWFuXHJcbiAgICApOiBXZWJTZXJ2ZXJWby5JQ2xlYW5Sb29tSW5mbyB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jbGVhblJvb21JbmZvKSB7XHJcbiAgICAgICAgICAgIGlmIChpZCA8IDApIGdMb2coJ+ajgOe0oualvOWxgmlk5pyJ6K+vJylcclxuICAgICAgICAgICAgbGV0IG0gPSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhblZhbHVlOiBWYWx1ZSA/IDAgOiAxMDAsXHJcbiAgICAgICAgICAgICAgICBpbmRleDogaWQsXHJcbiAgICAgICAgICAgICAgICBpc1RvQ2xlYW46IFZhbHVlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFuUm9vbUluZm8gPSB0aGlzLl9jbGVhblJvb21JbmZvIHx8IFtdXHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFuUm9vbUluZm8ucHVzaChtKVxyXG4gICAgICAgICAgICByZXR1cm4gbVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fY2xlYW5Sb29tSW5mby5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2NsZWFuUm9vbUluZm9baV0uaW5kZXggPT0gaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbGVhblJvb21JbmZvW2ldLmlzVG9DbGVhbiA9IFZhbHVlXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NsZWFuUm9vbUluZm9baV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoaWQgPCAwKSBnTG9nKCfmo4DntKLmpbzlsYJpZOacieivrycpXHJcbiAgICAgICAgICAgIGxldCBtID0ge1xyXG4gICAgICAgICAgICAgICAgY2xlYW5WYWx1ZTogVmFsdWUgPyAwIDogMTAwLFxyXG4gICAgICAgICAgICAgICAgaW5kZXg6IGlkLFxyXG4gICAgICAgICAgICAgICAgaXNUb0NsZWFuOiBWYWx1ZSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLl9jbGVhblJvb21JbmZvID0gdGhpcy5fY2xlYW5Sb29tSW5mbyB8fCBbXVxyXG4gICAgICAgICAgICB0aGlzLl9jbGVhblJvb21JbmZvLnB1c2gobSlcclxuICAgICAgICAgICAgcmV0dXJuIG1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiAg5qC55o2u5oi/6Ze05qW85bGC5Y+36I635Y+W5qW85bGC5riF5rSB5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSb29tQ2xlYW5WYWx1ZUJ5Rmxvb3JJZChpZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NsZWFuUm9vbUluZm8pIHtcclxuICAgICAgICAgICAgaWYgKGlkIDwgMCkgZ0xvZygn5qOA57Si5qW85bGCaWTmnInor68nKVxyXG4gICAgICAgICAgICBsZXQgbSA9IHtcclxuICAgICAgICAgICAgICAgIGNsZWFuVmFsdWU6IDAsXHJcbiAgICAgICAgICAgICAgICBpbmRleDogaWQsXHJcbiAgICAgICAgICAgICAgICBpc1RvQ2xlYW46IHRydWUsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5fY2xlYW5Sb29tSW5mbyA9IHRoaXMuX2NsZWFuUm9vbUluZm8gfHwgW11cclxuICAgICAgICAgICAgdGhpcy5fY2xlYW5Sb29tSW5mby5wdXNoKG0pXHJcbiAgICAgICAgICAgIHJldHVybiBtLmNsZWFuVmFsdWVcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NsZWFuUm9vbUluZm8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jbGVhblJvb21JbmZvW2ldLmluZGV4ID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NsZWFuUm9vbUluZm9baV0uY2xlYW5WYWx1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZCA8IDApIGdMb2coJ+ajgOe0oualvOWxgmlk5pyJ6K+vJylcclxuICAgICAgICAgICAgbGV0IG0gPSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhblZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgaW5kZXg6IGlkLFxyXG4gICAgICAgICAgICAgICAgaXNUb0NsZWFuOiB0cnVlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFuUm9vbUluZm8gPSB0aGlzLl9jbGVhblJvb21JbmZvIHx8IFtdXHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFuUm9vbUluZm8ucHVzaChtKVxyXG4gICAgICAgICAgICByZXR1cm4gbS5jbGVhblZhbHVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIOagueaNruaIv+mXtOalvOWxguWPt+iOt+WPlualvOWxguaYr+WQpumcgOimgea4hea0gVxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Um9vbUlzVG9DbGVhbkJ5Rmxvb3JJZChpZDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9jbGVhblJvb21JbmZvKSB7XHJcbiAgICAgICAgICAgIGlmIChpZCA8IDApIGdMb2coJ+ajgOe0oualvOWxgmlk5pyJ6K+vJylcclxuICAgICAgICAgICAgbGV0IG0gPSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhblZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgaW5kZXg6IGlkLFxyXG4gICAgICAgICAgICAgICAgaXNUb0NsZWFuOiB0cnVlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFuUm9vbUluZm8gPSB0aGlzLl9jbGVhblJvb21JbmZvIHx8IFtdXHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFuUm9vbUluZm8ucHVzaChtKVxyXG4gICAgICAgICAgICByZXR1cm4gbS5pc1RvQ2xlYW5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2NsZWFuUm9vbUluZm8ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9jbGVhblJvb21JbmZvW2ldLmluZGV4ID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NsZWFuUm9vbUluZm9baV0uY2xlYW5WYWx1ZSA8IDEwMCA/IHRydWUgOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpZCA8IDApIGdMb2coJ+ajgOe0oualvOWxgmlk5pyJ6K+vJylcclxuICAgICAgICAgICAgbGV0IG0gPSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhblZhbHVlOiAwLFxyXG4gICAgICAgICAgICAgICAgaW5kZXg6IGlkLFxyXG4gICAgICAgICAgICAgICAgaXNUb0NsZWFuOiB0cnVlLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFuUm9vbUluZm8gPSB0aGlzLl9jbGVhblJvb21JbmZvIHx8IFtdXHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFuUm9vbUluZm8ucHVzaChtKVxyXG4gICAgICAgICAgICByZXR1cm4gbS5pc1RvQ2xlYW5cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc29ydEZ1bihhYTogV2ViU2VydmVyVm8uSUNsZWFuUm9vbUluZm8sIGJiOiBXZWJTZXJ2ZXJWby5JQ2xlYW5Sb29tSW5mbykge1xyXG4gICAgICAgIHJldHVybiBhYS5pbmRleCAtIGJiLmluZGV4XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqICDmoLnmja7miL/pl7TmpbzlsYLlj7fojrflj5bmpbzlsYLmmK/lkKbpnIDopoHmuIXmtIFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJvb21Jc1RvQ2xlYW4oKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2NsZWFuUm9vbUluZm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIDFcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fY2xlYW5Sb29tSW5mby5zb3J0KHRoaXMuc29ydEZ1bilcclxuICAgICAgICBsZXQgaSA9IDBcclxuICAgICAgICBmb3IgKGxldCBqID0gMCwgbGVuID0gdGhpcy5fY2xlYW5Sb29tSW5mby5sZW5ndGg7IGogPCBsZW47IGorKykge1xyXG4gICAgICAgICAgICBpKys7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9jbGVhblJvb21JbmZvW2pdLmluZGV4ICE9IGkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuX2NsZWFuUm9vbUluZm9bal0uY2xlYW5WYWx1ZSA8IDEwMCA/IHRydWUgOiBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA9PSA0KSB7Ly/mmoLml7blrprkuLo05bGCXHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgICAgICByZXR1cm4gaTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDBcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPluWeg+WcvuaVsOebrlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0UnViYmlzaHNCeUZsb29ySWQoaWQ6IG51bWJlciwgcnViYmlzaFRvdGFsOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIGxldCByb29tQ2xlYW4gPSB0aGlzLmdldFJvb21DbGVhbkxpbmVzc0J5Rmxvb3JJZChpZCk7XHJcbiAgICAgICAgaWYgKHJvb21DbGVhbi5jbGVhblZhbHVlIDwgMTAwID8gdHJ1ZSA6IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIGxldCBudW0gPSBNYXRoLmNlaWwoKDEgLSByb29tQ2xlYW4uY2xlYW5WYWx1ZSAvIDEwMCkgKiBydWJiaXNoVG90YWwpO1xyXG4gICAgICAgICAgICByZXR1cm4gbnVtO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsImltcG9ydCB7IENvbmZpZ01nciB9IGZyb20gXCJ6bWdfY29uZmlnX21nclwiO1xyXG5pbXBvcnQgeyBFbnZNZ3IgfSBmcm9tIFwiem1nX2Vudl9tZ3JcIjtcclxuaW1wb3J0IHsgRXZlbnRNZ3IsIEV2ZW50TmFtZSB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XHJcbmltcG9ydCB7IEJhc2VNZ3IgfSBmcm9tIFwiem1nX21nclwiO1xyXG5pbXBvcnQgeyBVSU1nciwgQWxlcnQsIEFjdG9yLCBFUm9sZUFjdGlvbiB9IGZyb20gXCJ6bWdfdWlfbWdyXCI7XHJcbmltcG9ydCB7IERyYWdvbkFzc2V0VXJsLCBnV2FybiB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5pbXBvcnQgeyBTZXJ2ZXJMaXN0ZW5lciwgU2VydmVyTWdyIH0gZnJvbSBcInptZ193ZWJzZXJ2ZXJfbWdyXCI7XHJcbmltcG9ydCB7IFJlc0Fzc2V0LCBTeXN0ZW1CdW5kbGVOYW1lIH0gZnJvbSBcInptZ19yZXNfbWdyXCJcclxuaW1wb3J0IHsgVXNlckNhcmRWbyB9IGZyb20gXCIuL1VzZXJDYXJkVm9cIjtcclxuaW1wb3J0IHsgJENvbW1hbmRzIH0gZnJvbSBcIi4uL3NlcnZlcnMvY29tbWFuZHMvQ29tbWFuZHNcIjtcclxuaW1wb3J0IHsgVXNlckNsZWFyVm8gfSBmcm9tIFwiLi9Vc2VyQ2xlYW5Wb1wiO1xyXG5pbXBvcnQgeyBfVXNlckV2ZW50TmFtZSB9IGZyb20gXCIuL1VzZXJFdmVudE5hbWVcIjtcclxuXHJcbi8qKlxyXG4gKiDnlKjmiLfmlbDmja7kv53lrZhcclxuICovXHJcbmV4cG9ydCBjbGFzcyBfVXNlck1nciBleHRlbmRzIEJhc2VNZ3IgaW1wbGVtZW50cyB6bWcuSU1nciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBfVXNlck1ncjtcclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBfVXNlck1nciB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfVXNlck1ncigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9hY3RvcjogYW55O1xyXG4gICAgLyoqXHJcbiAgICAgKiDlrabkvLTkv6Hmga9cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfdXNlclZvOiBXZWJTZXJ2ZXJWby5JR2V0UGFydG5lckluZm87XHJcbiAgICBwcml2YXRlIF9zdHVkZW50Vm86IFdlYlNlcnZlclZvLklHZXRTdHVkZW50QmFzZUluZm87XHJcbiAgICBwdWJsaWMgZ2V0IHVzZXJWbygpOiBXZWJTZXJ2ZXJWby5JR2V0UGFydG5lckluZm8ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl91c2VyVm87XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHVzZXJWbyhkYXRhOiBXZWJTZXJ2ZXJWby5JR2V0UGFydG5lckluZm8pIHtcclxuICAgICAgICB0aGlzLl91c2VyVm8gPSBkYXRhO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBfY2xlYW5WbzogVXNlckNsZWFyVm87XHJcblxyXG4gICAgcHJpdmF0ZSBfY2FyZFZvOiBVc2VyQ2FyZFZvO1xyXG4gICAgLy8genhtID0gMSxcclxuICAgIC8vIG1tdCA9IDIsXHJcbiAgICAvLyBkZHggPSAzXHJcbiAgICBwdWJsaWMgcm9sZVR5cGVMaXN0ID0gW1wiXCIsIFwienhtXCIsIFwibW10XCIsIFwiZGR4XCJdO1xyXG5cclxuICAgIHB1YmxpYyBnZXQgY2xlYW5WbygpOiBVc2VyQ2xlYXJWbyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsZWFuVm87XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBjYXJkVm8oKTogVXNlckNhcmRWbyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NhcmRWbztcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Lq654mp5b2i6LGhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXQgYWN0b3IoKTogem1nLklSb2xlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWN0b3I7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJ0bmVySWQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5fdXNlclZvLnBhcnRuZXJJZCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXJ0KCk6IGFueSB7XHJcbiAgICAgICAgaWYgKFNlcnZlck1nci5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVXNlckRhdGEoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBFdmVudE1nci5vbmNlKEV2ZW50TmFtZS5TRVJWRVJfUkVBRFksIHRoaXMudXBkYXRlVXNlckRhdGEsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZEV2ZW50cygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFN0dWRlbnRJbmZvKGNhbGxiYWNrOiAoZGF0YTogV2ViU2VydmVyVm8uSUdldFN0dWRlbnRCYXNlSW5mbykgPT4gdm9pZCwgdGFyZ2V0OiBhbnkpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc3R1ZGVudFZvKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0LCB0aGlzLl9zdHVkZW50Vm8pXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKFNlcnZlck1nci5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBTZXJ2ZXJNZ3Iuc2VuZEdldCgkQ29tbWFuZHMuZ2V0U3R1ZGVudEJhc2VJbmZvLCBudWxsLCAoZGF0YTogV2ViU2VydmVyVm8uSUdldFN0dWRlbnRCYXNlSW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3N0dWRlbnRWbyA9IGRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0U3R1ZGVudEluZm8oY2FsbGJhY2ssIHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ1dhcm4oXCLlrabnlJ/kv6Hmga/ojrflj5blpLHotKUhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIHRhcmdldCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBFdmVudE1nci5vbmNlKEV2ZW50TmFtZS5TRVJWRVJfUkVBRFksICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFN0dWRlbnRJbmZvKGNhbGxiYWNrLCB0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdXBkYXRlVXNlckRhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHBhcmFtID0ge1xyXG4gICAgICAgICAgICBidTogQ29uZmlnTWdyLmdldEJ1KCksXHJcbiAgICAgICAgICAgIG5lZWRDYXJkVGlwOiB0cnVlLFxyXG4gICAgICAgICAgICBuZWVkUGFydG5lclN0YXR1czogdHJ1ZSxcclxuICAgICAgICAgICAgdXNlcklkOiBFbnZNZ3IuZ2V0VXNlcklkKCksXHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v6I635Y+W5a2m5Ly05L+h5oGvXHJcbiAgICAgICAgU2VydmVyTWdyLnNlbmRHZXQoJENvbW1hbmRzLmdldFBhcnRuZXJJbmZvLCBwYXJhbSwgbmV3IFNlcnZlckxpc3RlbmVyKHRoaXMsIHRoaXMub25TZXJ2ZXIpLCB0aGlzLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdXBkYXRlQ2xvdGgoKTogdm9pZCB7XHJcbiAgICAgICAgU2VydmVyTWdyLnNlbmRQb3N0KCRDb21tYW5kcy5nZXRSb2xlRHJlc3NVcHMsIG51bGwsIG5ldyBTZXJ2ZXJMaXN0ZW5lcih0aGlzLCB0aGlzLm9uU2VydmVyQ2xvdGgpLCB0aGlzLCBmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0QWN0aW9uQ29uZmlnKCk6IHZvaWQge1xyXG4gICAgICAgIFNlcnZlck1nci5zZW5kR2V0KCRDb21tYW5kcy5hY3Rpb25Db25maWcsIG51bGwsIG5ldyBTZXJ2ZXJMaXN0ZW5lcih0aGlzLCB0aGlzLm9uQWN0aW9uQ29uZmlnKSwgZmFsc2UpXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgb25BY3Rpb25Db25maWcocmVzOiBhbnkpIHtcclxuICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2xlZXBGdWxsU2Vjb25kcyA9IHJlcy5zbGVlcEZ1bGxTZWNvbmRzO1xyXG4gICAgICAgICAgICB0aGlzLndhc2hGdWxsU2Vjb25kcyA9IHJlcy53YXNoRnVsbFNlY29uZHM7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHVwZGF0ZUZydWl0VmFsdWUoKSB7XHJcbiAgICAgICAgU2VydmVyTWdyLnNlbmRHZXQoJENvbW1hbmRzLmdldEZydWl0VG90YWxOdW0sIHsgdXNlcklkOiBFbnZNZ3IuZ2V0VXNlcklkKCkgfSwgKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBmcnVpdFZhbHVlID0gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgIHRoaXMuZnJ1aXRWYWx1ZSA9IHJlc3BvbnNlO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDojrflj5blrabkvLTkv6Hmga9cclxuICAgICAqIEBwYXJhbSByZXMgXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblNlcnZlcihyZXM6IFdlYlNlcnZlclZvLklHZXRQYXJ0bmVySW5mbyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3VzZXJWbyA9IHJlcztcclxuICAgICAgICB0aGlzLl9jYXJkVm8gPSBuZXcgVXNlckNhcmRWbygpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFuVm8gPSBuZXcgVXNlckNsZWFyVm8oKTtcclxuICAgICAgICB0aGlzLl9jYXJkVm8uc2V0RGF0YSh0aGlzLl91c2VyVm8pO1xyXG4gICAgICAgIHRoaXMuX2NsZWFuVm8uc2V0RGF0YSh0aGlzLl91c2VyVm8pO1xyXG4gICAgICAgIHRoaXMuX2NhcmRWby5vbihfVXNlckV2ZW50TmFtZS5HUkVFVF9DQVJELCB0aGlzLm9uQ2FyZENoYW5nZSwgdGhpcywgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMuX2NsZWFuVm8ub24oX1VzZXJFdmVudE5hbWUuQ0xFQU5fQ0hBTkdFLCB0aGlzLm9uQ2xlYW5DaGFuZ2UsIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICBpZiAodGhpcy5pc0Fkb3B0aW9uICYmICghdGhpcy5fYWN0b3IgfHwgdGhpcy5fYWN0b3IuY29uZmlnLnJOYW1lICE9IHRoaXMucm9sZU5hbWUpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9hY3Rvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fYWN0b3IuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2FjdG9yID0gQWN0b3IoKTtcclxuICAgICAgICAgICAgdGhpcy5fYWN0b3IuaW5pdENvbmZpZyhDb25maWdNZ3IudWljb25maWcucm9sZVt0aGlzLnJvbGVOYW1lXSk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2xvdGgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5lbWl0KEV2ZW50TmFtZS5SRUFEWSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uQ2xlYW5DaGFuZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5lbWl0KF9Vc2VyRXZlbnROYW1lLkNMRUFOX0NIQU5HRSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uQ2FyZENoYW5nZShncmVldENhcmRUaXA6IFdlYlNlcnZlclZvLklHcmVldENhcmRUaXApOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmVtaXQoX1VzZXJFdmVudE5hbWUuR1JFRVRfQ0FSRCwgZ3JlZXRDYXJkVGlwKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5a2m5Ly06KOF5omu5L+h5oGvXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBvblNlcnZlckNsb3RoKHJlczogV2ViU2VydmVyVm8uSURyZXNzKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FjdG9yKSB7XHJcbiAgICAgICAgICAgIGxldCBkZXRhaWxzID0gcmVzID8gcmVzLmRldGFpbHMgOiBudWxsO1xyXG4gICAgICAgICAgICBpZiAoZGV0YWlscykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGNMZW46IG51bWJlcjtcclxuICAgICAgICAgICAgICAgIGxldCBhY3Rpb246IHN0cmluZztcclxuICAgICAgICAgICAgICAgIGxldCBpOiBudW1iZXIsIGo6IG51bWJlcjtcclxuICAgICAgICAgICAgICAgIGxldCBpbmZzOiBXZWJTZXJ2ZXJWby5JRHJhZ29uSW5mW107XHJcbiAgICAgICAgICAgICAgICBsZXQgYXNzZXRzOiBEcmFnb25Bc3NldFVybFtdO1xyXG4gICAgICAgICAgICAgICAgbGV0IHVybDogRHJhZ29uQXNzZXRVcmw7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbTogV2ViU2VydmVyVm8uSURyZXNzSXRlbTtcclxuICAgICAgICAgICAgICAgIGxldCBjbG90aDogem1nLklSb2xlRHJlc3NJdGVtO1xyXG4gICAgICAgICAgICAgICAgbGV0IGxlbjogbnVtYmVyID0gZGV0YWlscy5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2xvdGhzOiB6bWcuSVJvbGVEcmVzc0l0ZW1bXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gYXNzZXRzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGRldGFpbHNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5mcyA9IGl0ZW0ucmVzb3VyY2VMaXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNMZW4gPSBpbmZzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBmb3IgKGogPSAwOyBqIDwgY0xlbjsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGFjdGlvbiA9IHRoaXMuZ2V0QWN0aW9uQnlUeXBlKGluZnNbal0udHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGFjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHVybCA9IG5ldyBEcmFnb25Bc3NldFVybChpbmZzW2pdLmF0bGFzSW1nLCBpbmZzW2pdLmF0bGFzSnNvbiwgaW5mc1tqXS5kcmFnSnNvbiwgYWN0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhc3NldHMucHVzaCh1cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyB9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvdGggPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzTmV3UHJvZHVjdDogaXRlbS5pc05ld1Byb2R1Y3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdG9yeUlkOiBpdGVtLmRpcmVjdG9yeUlkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBiZW5lZml0RGF5czogaXRlbS5iZW5lZml0RGF5cyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIOmihOiniOWbvlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgICAgICAgICAgICAgY292ZXI6IGl0ZW0uY292ZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRpbWU6IGl0ZW0uY3JlYXRlVGltZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGljdHVyZUxpc3Q6IGl0ZW0ucGljdHVyZUxpc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RJZDogaXRlbS5wcm9kdWN0SWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3ROYW1lOiBpdGVtLnByb2R1Y3ROYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1hcms6IGl0ZW0ucmVtYXJrLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0TG9jYUNvZGU6IGl0ZW0ucHJvZHVjdExvY2FDb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvdXJjZUxpc3Q6IGl0ZW0ucmVzb3VyY2VMaXN0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IGl0ZW0udG9wXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3Rocy5wdXNoKGNsb3RoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2FjdG9yLmRyZXNzKGNsb3Rocyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVzdG9yeSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl91c2VyVm8gPSBudWxsO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAqIEBkZXNjcmlwdGlvbjog552h6KeJ5oC75pe26Ze0XHJcbiAgICAqL1xyXG4gICAgcHJpdmF0ZSBfc2xlZXBGdWxsU2Vjb25kczogbnVtYmVyO1xyXG4gICAgcHVibGljIGdldCBzbGVlcEZ1bGxTZWNvbmRzKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NsZWVwRnVsbFNlY29uZHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NsZWVwRnVsbFNlY29uZHM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9zbGVlcEZ1bGxTZWNvbmRzID0gMTA7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zbGVlcEZ1bGxTZWNvbmRzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgc2xlZXBGdWxsU2Vjb25kcyh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3NsZWVwRnVsbFNlY29uZHMgIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fc2xlZXBGdWxsU2Vjb25kcyA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlrabkvLTppaXppb/lgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldCB0b3RhbEVuZXJneSgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZXJWby50b3RhbEVuZXJneSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyVm8udG90YWxFbmVyZ3lcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVzZXJWby50b3RhbEVuZXJneSA9IDEwMFxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy51c2VyVm8udG90YWxFbmVyZ3lcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHRvdGFsRW5lcmd5KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy51c2VyVm8udG90YWxFbmVyZ3kgIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy51c2VyVm8udG90YWxFbmVyZ3kgPSB2YWx1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogQGRlc2NyaXB0aW9uOiDmtJfmvqHmgLvml7bpl7RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfd2FzaEZ1bGxTZWNvbmRzOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZ2V0IHdhc2hGdWxsU2Vjb25kcygpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl93YXNoRnVsbFNlY29uZHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dhc2hGdWxsU2Vjb25kcztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dhc2hGdWxsU2Vjb25kcyA9IDEwO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2FzaEZ1bGxTZWNvbmRzO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgd2FzaEZ1bGxTZWNvbmRzKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fd2FzaEZ1bGxTZWNvbmRzICE9IHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dhc2hGdWxsU2Vjb25kcyA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJWbyA/IHRydWUgOiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHJ1YmJpc2hUb3RhbCgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl91c2VyVm8ucnViYmlzaFRvdGFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VyVm8ucnViYmlzaFRvdGFsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZXJWby5ydWJiaXNoVG90YWwgPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlclZvLnJ1YmJpc2hUb3RhbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHJ1YmJpc2hUb3RhbCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJWby5ydWJiaXNoVG90YWwgIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclZvLnJ1YmJpc2hUb3RhbCA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0IGlzVG9XYXNoKGJvb2w6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5fdXNlclZvLmlzVG9XYXNoICE9IGJvb2wpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclZvLmlzVG9XYXNoID0gYm9vbDtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KF9Vc2VyRXZlbnROYW1lLldBU0hfQ0hBTkdFLCB0aGlzLndhc2hWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc1RvV2FzaCgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5fdXNlclZvLmlzVG9XYXNoID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclZvLmlzVG9XYXNoID0gdHJ1ZVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlclZvLmlzVG9XYXNoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VyVm8uaXNUb1dhc2g7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgd2FzaFZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJWby53YXNoVmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlclZvLndhc2hWYWx1ZVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZXJWby53YXNoVmFsdWUgPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlclZvLndhc2hWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHdhc2hWYWx1ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJWby53YXNoVmFsdWUgIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclZvLndhc2hWYWx1ZSA9IHZhbHVlID8gdmFsdWUgOiAwO1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoX1VzZXJFdmVudE5hbWUuV0FTSF9DSEFOR0UsIHRoaXMuZ2V0V2FzaFByb2dyZXNzKCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgaXNBZG9wdGlvbigpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5fdXNlclZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VyVm8uaXNBZG9wdGlvbjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBmcnVpdFZhbHVlKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJWbykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlclZvLmZydWl0VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBmcnVpdFZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fdXNlclZvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZXJWby5mcnVpdFZhbHVlID0gdmFsdWUgPyB2YWx1ZSA6IDA7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChfVXNlckV2ZW50TmFtZS5GUlVJVF9DSEFOR0UsIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpc0h1bmdlcihib29sOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3VzZXJWby5pc0h1bmdlciAhPSBib29sKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3VzZXJWby5pc0h1bmdlciA9IGJvb2xcclxuICAgICAgICAgICAgdGhpcy5lbWl0KF9Vc2VyRXZlbnROYW1lLkVORVJHWV9DSEFOR0UsIHRoaXMuZ2V0RWF0UHJvZ2Vyc3MoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc0h1bmdlcigpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5fdXNlclZvLmlzSHVuZ2VyID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclZvLmlzSHVuZ2VyID0gdHJ1ZTtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJWby5pc0h1bmdlcjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlclZvLmlzSHVuZ2VyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgaGFzTmV3R3JlZXRDYXJkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5jYXJkVm8uaGFzTmV3R3JlZXRDYXJkID0gdmFsdWVcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IGhhc05ld0dyZWV0Q2FyZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYXJkVm8uaGFzTmV3R3JlZXRDYXJkXHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGlzR3JlZXRDYXJkKHM6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmNhcmRWby5pc0dyZWV0Q2FyZCA9IHNcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXNHcmVldENhcmQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FyZFZvLmlzR3JlZXRDYXJkXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwYXJ0bmVyQ3VycmVudEVuZXJneSgpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl91c2VyVm8ucGFydG5lckN1cnJlbnRFbmVyZ3kpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJWby5wYXJ0bmVyQ3VycmVudEVuZXJneTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl91c2VyVm8ucGFydG5lckN1cnJlbnRFbmVyZ3kgPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlclZvLnBhcnRuZXJDdXJyZW50RW5lcmd5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgcGFydG5lckN1cnJlbnRFbmVyZ3kodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLl91c2VyVm8ucGFydG5lckN1cnJlbnRFbmVyZ3kgIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclZvLnBhcnRuZXJDdXJyZW50RW5lcmd5ID0gdmFsdWVcclxuICAgICAgICAgICAgdGhpcy5lbWl0KF9Vc2VyRXZlbnROYW1lLkVORVJHWV9DSEFOR0UsIHRoaXMuZ2V0RWF0UHJvZ2Vyc3MoKSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCBpc1RvU2xlZXAoYm9vbDogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh0aGlzLl91c2VyVm8uaXNUb1NsZWVwICE9IGJvb2wpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclZvLmlzVG9TbGVlcCA9IGJvb2w7XHJcbiAgICAgICAgICAgIHRoaXMuZW1pdChfVXNlckV2ZW50TmFtZS5TTEVFUF9DSEFOR0UsIHRoaXMuX3VzZXJWby5pc1RvU2xlZXApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXNUb1NsZWVwKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLl91c2VyVm8uaXNUb1NsZWVwID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclZvLmlzVG9TbGVlcCA9IHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VyVm8uaXNUb1NsZWVwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl91c2VyVm8uaXNUb1NsZWVwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0IHNsZWVwVmFsdWUoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5fdXNlclZvLnNsZWVwVmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlclZvLnNsZWVwVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclZvLnNsZWVwVmFsdWUgPSAwO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdXNlclZvLnNsZWVwVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBzbGVlcFZhbHVlKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5fdXNlclZvLnNsZWVwVmFsdWUgIT0gdmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdXNlclZvLnNsZWVwVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICAgICAgdGhpcy5lbWl0KF9Vc2VyRXZlbnROYW1lLlNMRUVQX0NIQU5HRSwgdGhpcy5nZXRTbGVlcFByb2dyZXNzKCkpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja7miL/pl7TmpbzlsYLlj7fojrflj5bmpbzlsYLlnoPlnL7kv6Hmga9cclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJvb21DbGVhbkxpbmVzc0J5Rmxvb3JJZChpZDogbnVtYmVyKTogV2ViU2VydmVyVm8uSUNsZWFuUm9vbUluZm8ge1xyXG4gICAgICAgIGlmICh0aGlzLmNsZWFuVm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xlYW5Wby5nZXRSb29tQ2xlYW5MaW5lc3NCeUZsb29ySWQoaWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiAg5qC55o2u5oi/6Ze05qW85bGC5Y+36K6+572u5qW85bGC5riF5rSB5YC8XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzZXRSb29tQ2xlYW5WYWx1ZUJ5Rmxvb3JJZChpZDogbnVtYmVyLCBWYWx1ZTogbnVtYmVyKTogV2ViU2VydmVyVm8uSUNsZWFuUm9vbUluZm8ge1xyXG4gICAgICAgIGlmICh0aGlzLmNsZWFuVm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xlYW5Wby5zZXRSb29tQ2xlYW5WYWx1ZUJ5Rmxvb3JJZChpZCwgVmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIOagueaNruaIv+mXtOalvOWxguWPt+iuvue9rualvOWxgua4hea0geWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc2V0Um9vbUlzVG9DbGVhbkJ5Rmxvb3JJZChpZDogbnVtYmVyLCBWYWx1ZTogYm9vbGVhbik6IFdlYlNlcnZlclZvLklDbGVhblJvb21JbmZvIHtcclxuICAgICAgICBpZiAodGhpcy5jbGVhblZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsZWFuVm8uc2V0Um9vbUlzVG9DbGVhbkJ5Rmxvb3JJZChpZCwgVmFsdWUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogIOagueaNruaIv+mXtOalvOWxguWPt+iOt+WPlualvOWxgua4hea0geWAvFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0Um9vbUNsZWFuVmFsdWVCeUZsb29ySWQoaWQ6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2xlYW5Wbykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jbGVhblZvLmdldFJvb21DbGVhblZhbHVlQnlGbG9vcklkKGlkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICDmoLnmja7miL/pl7TmpbzlsYLlj7fojrflj5bmpbzlsYLmmK/lkKbpnIDopoHmuIXmtIFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJvb21Jc1RvQ2xlYW5CeUZsb29ySWQoaWQ6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNsZWFuVm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xlYW5Wby5nZXRSb29tSXNUb0NsZWFuQnlGbG9vcklkKGlkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqICDmoLnmja7miL/pl7TmpbzlsYLlj7fojrflj5bmpbzlsYLmmK/lkKbpnIDopoHmuIXmtIFcclxuICAgICAqL1xyXG4gICAgcHVibGljIGdldFJvb21Jc1RvQ2xlYW4oKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5jbGVhblZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsZWFuVm8uZ2V0Um9vbUlzVG9DbGVhbigpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5Z6D5Zy+5pWw55uuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBnZXRSdWJiaXNoc0J5Rmxvb3JJZChpZDogbnVtYmVyKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5jbGVhblZvKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNsZWFuVm8uZ2V0UnViYmlzaHNCeUZsb29ySWQoaWQsIHRoaXMucnViYmlzaFRvdGFsKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldEVhdFByb2dlcnNzKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KFxyXG4gICAgICAgICAgICAwLFxyXG4gICAgICAgICAgICBNYXRoLm1pbih0aGlzLl91c2VyVm8ucGFydG5lckN1cnJlbnRFbmVyZ3kgLyB0aGlzLl91c2VyVm8udG90YWxFbmVyZ3ksIDEpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0U2xlZXBQcm9ncmVzcygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbih0aGlzLl91c2VyVm8uc2xlZXBWYWx1ZSAvIDEwMCwgMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRXYXNoUHJvZ3Jlc3MoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5fdXNlclZvLndhc2hWYWx1ZSAvIDEwMCwgMSkpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgcm9sZU5hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgck5hbWU6IHN0cmluZyA9IHRoaXMucm9sZVR5cGVMaXN0W3RoaXMuX3VzZXJWby5wYXJ0bmVySWRdO1xyXG4gICAgICAgIHJldHVybiByTmFtZSA/IHJOYW1lIDogdGhpcy5yb2xlVHlwZUxpc3RbMF07XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFkZEV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICBFdmVudE1nci5vbmNlKEV2ZW50TmFtZS5DT1JFX1JFQURZLCB0aGlzLm9uQ29yZVJlYWR5LCB0aGlzKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcmVtb3ZlRXZlbnRzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9jYXJkVm8pIHtcclxuICAgICAgICAgICAgdGhpcy5fY2FyZFZvLm9mZihfVXNlckV2ZW50TmFtZS5HUkVFVF9DQVJELCB0aGlzLm9uQ2FyZENoYW5nZSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9jbGVhblZvKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2NsZWFuVm8ub2ZmKF9Vc2VyRXZlbnROYW1lLkNMRUFOX0NIQU5HRSwgdGhpcy5vbkNsZWFuQ2hhbmdlLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgRXZlbnRNZ3Iub2ZmKEV2ZW50TmFtZS5DT1JFX1JFQURZLCB0aGlzLm9uQ29yZVJlYWR5LCB0aGlzKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Db3JlUmVhZHkoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGFsZXJ0OiBBbGVydCA9IFVJTWdyLmFsZXJ0LmRlZmF1bHRBbGVydDtcclxuICAgICAgICBhbGVydC5zZXRUaXRsZShuZXcgUmVzQXNzZXQoU3lzdGVtQnVuZGxlTmFtZS5VSSwgXCJ0ZXh0dXJlcy9jcnlcIiArIHRoaXMucm9sZU5hbWUpKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogIC8vMSzotbDot68sMzror7Tor53vvIznq5nnq4tcclxuICAgICAqIEBwYXJhbSB0eXBlIFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEFjdGlvbkJ5VHlwZSh0eXBlOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRVJvbGVBY3Rpb24uV0FMS19MRUZUO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gRVJvbGVBY3Rpb24uU1RBTkQ7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJleHBvcnQgY2xhc3MgX0FwcEJ1bmRsZU5hbWUge1xyXG4gICAgLy8gcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBfQXBwQnVuZGxlTmFtZTtcclxuICAgIC8vIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBfQXBwQnVuZGxlTmFtZSB7XHJcbiAgICAvLyAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgLy8gICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfQXBwQnVuZGxlTmFtZSgpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcblxyXG4gICAgLy8gfVxyXG4gICAgLyoqXHJcbiAgICAgKiDmnYLnialcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBTdGFjazogc3RyaW5nID0gXCJTdGFja1wiO1xyXG4gICAgLyoqXHJcbiAgICAgKiDpooblj5blrabkvLRcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBSRUNFSVZFX1JPTEU6IHN0cmluZyA9IFwiUmVjZWl2ZVJvbGVcIjtcclxuICAgIC8qKlxyXG4gICAgICog5aSn5Y6FXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgSEFMTDogc3RyaW5nID0gXCJIYWxsXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlpZblirHkuK3lv4NcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBSRVdBUkRfQ0VOVEVSOiBzdHJpbmcgPSBcIlJld2FyZENlbnRlclwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog5by556qX6LWE5rqQ55uu5b2VXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgUE9QX0xBWUVSOiBzdHJpbmcgPSBcIlBvcExheWVyXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDpmLLmsonov7dcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBDQUlTOiBzdHJpbmcgPSBcIkNhaXNcIlxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5a2m5Ly05oi/6Ze0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgSE9VU0U6IHN0cmluZyA9IFwiSG91c2VcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOS7u+WKoeS4reW/g1xyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFRBU0tDRU5URVI6IHN0cmluZyA9IFwiVGFza0NlbnRlclwiXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDnsr7ngbXloplcclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBNRURBTFdBTEw6IHN0cmluZyA9IFwiTWVkYWx3YWxsXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDllYbln45cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBNQUdJQ19NQUxMOiBzdHJpbmcgPSBcIk1hZ2ljTWFsbFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICog6LS65Y2hXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgR1JFRVRDQVJEOiBzdHJpbmcgPSBcIkdyZWV0Q2FyZFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQUnlvJXmtYHor75cclxuICAgICAqL1xyXG4gICAgcHVibGljIHN0YXRpYyBBSUNMQVNTOiBzdHJpbmcgPSBcIkFJQ2xhc3NcIjtcclxuICAgIC8qKlxyXG4gICAgICog6K+V6KGj6Ze0XHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBzdGF0aWMgV0FSRFJPQkU6IHN0cmluZyA9IFwiV2FyZHJvYmVcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIOmYtuauteWkjeS5oOivvlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgc3RhdGljIFpNUkVWSUVXOiBzdHJpbmcgPSBcInptcmV2aWV3XCI7XHJcbn0iLCJpbXBvcnQgeyBCYXNlTW9kdWxlQ0ROLCBNb2R1bGVNZ3IgfSBmcm9tIFwiem1nX21vZHVsZV9tZ3JcIjtcclxuaW1wb3J0IHsgX0FwcEJ1bmRsZU5hbWUgfSBmcm9tIFwiLi4vQXBwQnVuZGxlTmFtZVwiO1xyXG5pbXBvcnQgeyBfVXNlck1nciB9IGZyb20gXCIuLi91c2VyZGF0YXMvVXNlck1nclwiO1xyXG4vKipcclxuICog5qOA5p+l5a2m5Ly05L+h5oGv57qm5p2f5p2h5Lu2XHJcbiAqL1xyXG5leHBvcnQgY2xhc3MgSGFzUGFydG5lcnNDRE4gZXh0ZW5kcyBCYXNlTW9kdWxlQ0ROIGltcGxlbWVudHMgem1nLklNb2R1bGVDb25kaXRpb24ge1xyXG4gICAgLyoqXHJcbiAgICAqIOaYr+WQpuajgOa1i+mAmui/h1xyXG4gICAgKi9cclxuICAgIGFzeW5jIGNoZWNrKHBhcmFtPzogYW55KTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICBsZXQgdXNlciA9IF9Vc2VyTWdyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgcGFyYW0gPSBwYXJhbSAhPT0gdW5kZWZpbmVkID8gcGFyYW0gOiB0aGlzLl9jZmcucGFyYW07XHJcbiAgICAgICAgaWYgKHVzZXIuaXNBZG9wdGlvbiA9PSAocGFyYW0gPyB0cnVlIDogZmFsc2UpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOajgOafpeWZqOaYr+WQpuWHhuWkh+WujOavle+8jOWPr+S7pei/m+ihjOW3peS9nFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIF9Vc2VyTWdyLmdldEluc3RhbmNlKCkuaXNWYWxpZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjYXRjaEhhbmRsZXIocGFyYW0/OiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICAvL+i3s+i9rOaooeWdl1xyXG4gICAgICAgIGlmIChwYXJhbSkge1xyXG4gICAgICAgICAgICAvL+mcgOimgeWtpuS8tCzlvZPliY3kuI3mu6HotrPopoHmsYJcclxuICAgICAgICAgICAgTW9kdWxlTWdyLm9wZW5CeUNvZGUoX0FwcEJ1bmRsZU5hbWUuUkVDRUlWRV9ST0xFKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgYXNzZXQ6IHptZy5JTW9kdWxlQXNzZXQgPSBNb2R1bGVNZ3IucmVjb3JkLmdldE1haW4oKTtcclxuICAgICAgICAgICAgLy/kuI3pnIDopoHlrabkvLTmlrnlj6/ov5vlhaXvvIzlvZPliY3mnInlrabkvLRcclxuICAgICAgICAgICAgTW9kdWxlTWdyLm9wZW5CeUNvZGUoYXNzZXQuY29kZSwgYXNzZXQucGFyYW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gc3VwZXIuY2F0Y2hIYW5kbGVyKHBhcmFtKTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IEJhc2VNb2R1bGVDRE4gfSBmcm9tIFwiem1nX21vZHVsZV9tZ3JcIjtcclxuaW1wb3J0IHsgZ0xvZyB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5pbXBvcnQgeyBfVXNlck1nciB9IGZyb20gXCIuLi91c2VyZGF0YXMvVXNlck1nclwiO1xyXG5leHBvcnQgY2xhc3MgRnJ1aXRWYWx1ZUNETiBleHRlbmRzIEJhc2VNb2R1bGVDRE4gaW1wbGVtZW50cyB6bWcuSU1vZHVsZUNvbmRpdGlvbiB7XHJcbiAgICBhc3luYyBjaGVjayhwYXJhbT86IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcGFyYW0gPSBwYXJhbSAhPT0gdW5kZWZpbmVkID8gcGFyYW0gOiB0aGlzLl9jZmcucGFyYW07XHJcbiAgICAgICAgaWYgKF9Vc2VyTWdyLmdldEluc3RhbmNlKCkuZnJ1aXRWYWx1ZSA+IHBhcmFtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBpc1ZhbGlkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBfVXNlck1nci5nZXRJbnN0YW5jZSgpLmlzVmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNhdGNoSGFuZGxlcihwYXJhbT86IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGdMb2coXCLlvILluLjlpITnkIbog73ph4/kuI3otrPmtojmga8uLi5cIik7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmNhdGNoSGFuZGxlcihwYXJhbSk7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBFbnZNZ3IgfSBmcm9tIFwiem1nX2Vudl9tZ3JcIjtcclxuaW1wb3J0IHsgQmFzZU1vZHVsZUNETiB9IGZyb20gXCJ6bWdfbW9kdWxlX21nclwiO1xyXG5pbXBvcnQgeyBnV2FybiB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5pbXBvcnQgeyBTZXJ2ZXJMaXN0ZW5lciwgU2VydmVyTWdyIH0gZnJvbSBcInptZ193ZWJzZXJ2ZXJfbWdyXCI7XHJcbmltcG9ydCB7ICRDb21tYW5kcyB9IGZyb20gXCIuLi9zZXJ2ZXJzL2NvbW1hbmRzL0NvbW1hbmRzXCI7XHJcbmVudW0gRUdyYXlTdGF0ZSB7XHJcbiAgICB1bmtub3cgPSAwLFxyXG4gICAgY2xvc2UgPSAxLFxyXG4gICAgb3BlbiA9IDJcclxufVxyXG5leHBvcnQgY2xhc3MgTW9kdWxlR3JheUNETiBleHRlbmRzIEJhc2VNb2R1bGVDRE4gaW1wbGVtZW50cyB6bWcuSU1vZHVsZUNvbmRpdGlvbiB7XHJcbiAgICBncmF5TGlzdDogUmVjb3JkPHN0cmluZywgRUdyYXlTdGF0ZT4gPSB7fTtcclxuICAgIC8qKlxyXG4gICAgKiDmmK/lkKbmo4DmtYvpgJrov4dcclxuICAgICovXHJcbiAgICBhc3luYyBjaGVjayhwYXJhbT86IGFueSk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgaWYgKCFwYXJhbSkge1xyXG4gICAgICAgICAgICBnV2FybihcIuaXoOazleafpeivouepuuWPgueahOeBsOW6puW8gOWFsy4uLlwiKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5ncmF5TGlzdFtwYXJhbV0gPT0gRUdyYXlTdGF0ZS5vcGVuKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JheUxpc3RbcGFyYW1dID09IEVHcmF5U3RhdGUuY2xvc2UpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pyN5Yqh5Zmo5p+l6K+iXHJcbiAgICAgICAgdGhpcy5ncmF5TGlzdFtwYXJhbV0gPSBFR3JheVN0YXRlLnVua25vdztcclxuICAgICAgICBsZXQgc2VuZFBhcmFtID0ge1xyXG4gICAgICAgICAgICBtYXA6IHsgdXNlcklkOiBFbnZNZ3IuZ2V0VXNlcklkKCkgfSwgZ3JheUNvZGU6IHBhcmFtXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIFNlcnZlck1nci5zZW5kUG9zdCgkQ29tbWFuZHMuZ3JheVN1cnZleSwgc2VuZFBhcmFtLCBuZXcgU2VydmVyTGlzdGVuZXIodGhpcywgKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgKGNvZGU6IHptZy5JU2VydmVyQ2FzdERhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xyXG4gICAgICAgICAgICB9KSwgdHJ1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIOajgOafpeWZqOaYr+WQpuWHhuWkh+WujOavle+8jOWPr+S7pei/m+ihjOW3peS9nFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBIYXNQYXJ0bmVyc0NETiB9IGZyb20gXCIuL0hhc1BhcnRuZXJzQ0ROXCI7XHJcbmltcG9ydCB7IEZydWl0VmFsdWVDRE4gfSBmcm9tIFwiLi9GcnVpdFZhbHVlQ0ROXCI7XHJcbmltcG9ydCB7IE1vZHVsZUdyYXlDRE4gfSBmcm9tIFwiLi9Nb2R1bGVHcmF5Q0ROXCI7XHJcbmltcG9ydCB7IEJhc2VNZ3IgfSBmcm9tIFwiem1nX21nclwiO1xyXG5cclxuLyoqXHJcbiAqIOWinuWKoOaJgOacieaooeWdl+e6puadn+adoeS7tlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIF9Nb2R1bGVDb25kaXRpb25Jbml0IGV4dGVuZHMgQmFzZU1nciBpbXBsZW1lbnRzIHptZy5JTWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogX01vZHVsZUNvbmRpdGlvbkluaXQ7XHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogX01vZHVsZUNvbmRpdGlvbkluaXQge1xyXG4gICAgICAgIGlmICghdGhpcy5faW5zdGFuY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdGFuY2UgPSBuZXcgX01vZHVsZUNvbmRpdGlvbkluaXQoXCJNb2R1bGVDb25kaXRpb25Jbml0XCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5faW5zdGFuY2U7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgc3RhcnQoKSB7XHJcbiAgICAgICAgbmV3IEhhc1BhcnRuZXJzQ0ROKFwiSGFzUGFydG5lcnNDRE5cIik7XHJcbiAgICAgICAgbmV3IEZydWl0VmFsdWVDRE4oXCJGcnVpdFZhbHVlQ0ROXCIpO1xyXG4gICAgICAgIG5ldyBNb2R1bGVHcmF5Q0ROKFwiTW9kdWxlR3JheUNETlwiKTtcclxuICAgIH1cclxuICAgIGdldCBpc1ZhbGlkKCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59IiwiXHJcbi8qKlxyXG4gKiDlgJLorqHml7bnm5HmjqdcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIF9DYWlzVm8ge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgX2luc3RhbmNlOiBfQ2Fpc1ZvO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSguLi5hcmdzOiBhbnlbXSk6IF9DYWlzVm8ge1xyXG4gICAgICAgIGlmIChfQ2Fpc1ZvLl9pbnN0YW5jZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIF9DYWlzVm8uX2luc3RhbmNlID0gbmV3IF9DYWlzVm8oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIF9DYWlzVm8uX2luc3RhbmNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8v5pyN5Yqh5Zmo5bey6K6w5b2V5pWw5o2uXHJcbiAgICBwdWJsaWMgQ2Fpc1NlcnZlckRhdGEgPSB7XHJcbiAgICAgICAgY29uZmlnSWQ6IDAsXHJcbiAgICAgICAgcGxheVRpbWVMaXN0OiBbMTAsIDIwLCAzMF0sXHJcbiAgICAgICAgcmVzdFRpbWVMaXN0OiBbMywgNSwgMTBdXHJcbiAgICB9O1xyXG4gICAgLyoqXHJcbiAgICAgKiDopoHmsYLkvJHmga/ml7bpl7RcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBfcmVzdFRpbWU6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOWPr+S7pea4uOaIj+aXtumXtFxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9wbGF5VGltZTogbnVtYmVyID0gMDtcclxuICAgIC8qKlxyXG4gICAgICog6K6w5b2V5bey57uP5ri45oiP5pe26Ze0XHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgX3BsYXlSZWNvcmQ6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOemu+W8gOS6huWkmuS5hVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9sZXZlbFRpbWU6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuaJk+W8gOmYsuayiei/t+eVjOmdolxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9jb3VudFRpbWU6IG51bWJlciA9IDA7XHJcbiAgICAvKipcclxuICAgICAqIOW9k+WJjeeKtuaAgVxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIF9hY3RpdmU6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9pc1RhbGtQbGF5OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIGdldCBpc1RhbGtQbGF5KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pc1RhbGtQbGF5O1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBpc1RhbGtQbGF5KHM6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLl9pc1RhbGtQbGF5ID0gcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY291bnRUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvdW50VGltZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgY291bnRUaW1lKHM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX2NvdW50VGltZSA9IHMgPyBzIDogMDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcGxheVRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGxheVRpbWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHBsYXlUaW1lKHM6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuX3BsYXlUaW1lID0gcyA/IHMgOiAwO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCByZXN0VGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9yZXN0VGltZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgcmVzdFRpbWUoczogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5fcmVzdFRpbWUgPSBzID8gcyA6IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGFjdGl2ZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBhY3RpdmUoczogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IHM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGxldmVsVGltZSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9sZXZlbFRpbWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGxldmVsVGltZShzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9sZXZlbFRpbWUgPSBzID8gcyA6IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHBsYXlSZWNvcmQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fcGxheVJlY29yZDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgcGxheVJlY29yZChzOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLl9wbGF5UmVjb3JkID0gcyA/IHMgOiAwO1xyXG4gICAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGVudW0gJENhaXNTZXJ2ZXJWb1R5cGUge1xyXG4gICAgLy/nmbvpmYbml7bpl7Qo5pe26Ze05oizKVxyXG4gICAgTE9HSU4gPSBcIkNvdW50ZG93bl9sb2dpblwiLFxyXG4gICAgLy/lvIDlp4vmuLjmiI/ml7bpl7Qo5pyA5ZCO5LiA5qyh6Ziy5rKJ6L+35ZCO6L+b5YWl5ri45oiP5pe26Ze0KVxyXG4gICAgU1RBUlRfUExBWSA9IFwiQ291bnRkb3duX3N0YXJ0VGltZVwiLFxyXG4gICAgLy/mjIHnu63lnKjnur/ml7bpl7RcclxuICAgIFBMQVlfVElNRSA9IFwiQ291bnRkb3duX2NvdW50VGltZVwiLFxyXG4gICAgLy/mnIDlkI7kuIDmrKHlvIDlp4vnjqnnmoTml7bpl7RcclxuICAgIExBU1RfUExBWV9USU1FID0gXCJDb3VudGRvd25fbGFzdFBsYXlUaW1lXCIsXHJcbiAgICAvL+mmluasoei/m+WFpeWkp+WOhe+8jE5QQ+W8leWvvFxyXG4gICAgR1VJREVfTlBDID0gXCJIYWxsX2d1aWRlTnBjXCIsXHJcbiAgICAvL+acgOWQjuS4gOasoeetvuWIsOaXtumXtFxyXG4gICAgU0lHTl9USU1FID0gXCJTaWduVGltZVwiLFxyXG4gICAgLy/ov5vlhaXllYbln47ml7bpl7RcclxuICAgIEZJUlNUX0VOVEVSX01BTEwgPSBcIk1hZ2ljTWFsbF9maXJzdEVudGVyTWFsbFwiLFxyXG4gICAgLyrmtbfmiqUgKi9cclxuICAgIFBvc3RlckNsaXBUaW1lcyA9IFwiUG9zdGVyQ2xpcFRpbWVzXCJcclxufVxyXG5cclxuZXhwb3J0IGVudW0gJENhaXNMb2NhbFZvVHlwZSB7XHJcbiAgICAvL+aooeWdl+iusOW9lVxyXG4gICAgSEFMTF9MT0NBTF8gPSBcImhhbGxMb2NhbF9cIixcclxuICAgIC8v5b+D6Lez6K6w5b2VKOacrOWcsOWtmOWCqClcclxuICAgIEhFQVJUID0gXCJ6bV9oZWFydFwiLFxyXG4gICAgLy/orrDlvZXnjqnogI3ml7bpl7RcclxuICAgIC8vIFBMQVlSRUNPUkVEID0gXCJwbGF5UmVjb3JkXCJcclxufVxyXG4iLCJpbXBvcnQgeyBDb25maWdNZ3IsICRFTW9kdWxlVHlwZSB9IGZyb20gXCJ6bWdfY29uZmlnX21nclwiO1xyXG5pbXBvcnQgeyBFbnZNZ3IgfSBmcm9tIFwiem1nX2Vudl9tZ3JcIjtcclxuaW1wb3J0IHsgRXZlbnRNZ3IsIEV2ZW50TmFtZSB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XHJcbmltcG9ydCB7IEJhc2VNZ3IgfSBmcm9tIFwiem1nX21nclwiO1xyXG5pbXBvcnQgeyBTdHJpbmdVdGlsIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7IGdXYXJuIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7IFNlcnZlckxpc3RlbmVyLCBTZXJ2ZXJNZ3IgfSBmcm9tIFwiem1nX3dlYnNlcnZlcl9tZ3JcIjtcclxuaW1wb3J0IF9DYWlzVm8gZnJvbSBcIi4vY2Fpcy9DYWlzVm9cIjtcclxuaW1wb3J0IHsgJENvbW1hbmRzIH0gZnJvbSBcIi4vc2VydmVycy9jb21tYW5kcy9Db21tYW5kc1wiO1xyXG5cclxuLyoqXHJcbiAqIOaooeWdl+mFjee9ruS/oeaBr+acjeWKoeWZqOiOt+WPlueuoeeQhlxyXG4gKi9cclxuZXhwb3J0IGNsYXNzIF9TZXJ2ZXJNb2R1bGVNZ3IgZXh0ZW5kcyBCYXNlTWdyIHtcclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogX1NlcnZlck1vZHVsZU1ncjtcclxuICAgIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBfU2VydmVyTW9kdWxlTWdyIHtcclxuICAgICAgICBpZiAoIXRoaXMuX2luc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2luc3RhbmNlID0gbmV3IF9TZXJ2ZXJNb2R1bGVNZ3IoXCJTZXJ2ZXJNb2R1bGVNZ3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pc1ZhbGlkOiBib29sZWFuO1xyXG5cclxuICAgIGFzeW5jIHN0YXJ0KCkge1xyXG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XHJcbiAgICAgICAgaWYgKFNlcnZlck1nci5pc1ZhbGlkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kdWxlRGF0YSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIEV2ZW50TWdyLm9uY2UoRXZlbnROYW1lLlNFUlZFUl9SRUFEWSwgdGhpcy51cGRhdGVNb2R1bGVEYXRhLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwZGF0ZU1vZHVsZURhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHNlbmRQYXJhbSA9IHtcclxuICAgICAgICAgICAgdXNlcklkOiBFbnZNZ3IuZ2V0VXNlcklkKCksIHR5cGU6IDFcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRIYWxsQmFzZUluZm8oKTtcclxuICAgICAgICBTZXJ2ZXJNZ3Iuc2VuZEdldCgkQ29tbWFuZHMubW9kdWxlTGlzdCwgc2VuZFBhcmFtLCBuZXcgU2VydmVyTGlzdGVuZXIodGhpcywgKGRhdGE6IFdlYlNlcnZlclZvLklNb2R1bGVMaXN0W10pID0+IHtcclxuICAgICAgICAgICAgbGV0IG1vZHVsZXMgPSBDb25maWdNZ3IubW9kdWxlcztcclxuICAgICAgICAgICAgbGV0IGk6IG51bWJlciwgajogbnVtYmVyO1xyXG4gICAgICAgICAgICBsZXQgY0xlbjogbnVtYmVyID0gZGF0YS5sZW5ndGg7XHJcbiAgICAgICAgICAgIGxldCBsZW46IG51bWJlciA9IG1vZHVsZXMubGVuZ3RoO1xyXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChtb2R1bGVzW2ldLm1haW4udHlwZSA9PSAkRU1vZHVsZVR5cGUuSUZSQU1FKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFTdHJpbmdVdGlsLmlzSHR0cHMobW9kdWxlc1tpXS5tYWluLnBhdGgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBjTGVuOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2pdLm1vZHVsZUNvZGUgPT0gXCJaTV9cIiArIG1vZHVsZXNbaV0uY29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXNbaV0ubWFpbi5wYXRoID0gZGF0YVtqXS5vbmxpbmVVcmw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlc1tpXS5pc0Nsb3NlID0gbW9kdWxlc1tpXS5pc0Nsb3NlICYmIGRhdGFbal0ubW9kdWxlU3dpdGNoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuX2lzVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoRXZlbnROYW1lLlJFQURZKTtcclxuICAgICAgICB9LCAoY29kZTogem1nLklTZXJ2ZXJDYXN0RGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBnV2FybihcIuiOt+WPluaooeWdl+mFjee9ruS/oeaBr+aKpemUme+8gVwiKTtcclxuICAgICAgICB9KSwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldEhhbGxCYXNlSW5mbygpIHtcclxuICAgICAgICBsZXQgcGFyYW1zID0ge1xyXG4gICAgICAgICAgICBwbGF0Zm9ybTogRW52TWdyLmdldFBsYXRmb3JtKClcclxuICAgICAgICB9XHJcbiAgICAgICAgU2VydmVyTWdyLnNlbmRHZXQoJENvbW1hbmRzLmdldEhhbGxCYXNlSW5mbywgcGFyYW1zLCBuZXcgU2VydmVyTGlzdGVuZXIodGhpcywgKGRhdGE6IFdlYlNlcnZlclZvLklIYWxsQmFzZUluZm8pID0+IHtcclxuICAgICAgICAgICAgLy8gYmdNdXNpY1VybCA9IGRhdGEuYmdNdXNpY1VybDtcclxuICAgICAgICAgICAgLy8gY2FuT3BlbiA9IGRhdGEuY2FuT3BlbjtcclxuICAgICAgICAgICAgX0NhaXNWby5nZXRJbnN0YW5jZSgpLkNhaXNTZXJ2ZXJEYXRhLmNvbmZpZ0lkID0gZGF0YS5jb25maWdJZFxyXG4gICAgICAgICAgICBfQ2Fpc1ZvLmdldEluc3RhbmNlKCkuQ2Fpc1NlcnZlckRhdGEucGxheVRpbWVMaXN0ID0gZGF0YS5wbGF5VGltZUxpc3RcclxuICAgICAgICAgICAgX0NhaXNWby5nZXRJbnN0YW5jZSgpLkNhaXNTZXJ2ZXJEYXRhLnJlc3RUaW1lTGlzdCA9IGRhdGEucmVzdFRpbWVMaXN0XHJcbiAgICAgICAgfSwgKGNvZGU6IHptZy5JU2VydmVyQ2FzdERhdGEpID0+IHtcclxuICAgICAgICAgICAgZ1dhcm4oXCLojrflj5blrabkuaDkuZDlm63lhaXlj6PphY3nva7miqXplJnvvIFcIik7XHJcbiAgICAgICAgfSksIHRydWUpO1xyXG4gICAgfVxyXG4gICAgZGVzdG9yeSgpIHtcclxuICAgICAgICBzdXBlci5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBnZXQgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faXNWYWxpZDtcclxuICAgIH1cclxufSIsIlxyXG5cclxuZXhwb3J0IGNsYXNzICRCYXNlQ29tbWFuZCB7XHJcbiAgICBwcm90ZWN0ZWQgX3BhY2tldDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgcGFja2V0KHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9wYWNrZXQgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcnVuKGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZXhjdXRlKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBleGN1dGUoZGF0YTogYW55KTogYW55IHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCLomZrmi5/lh73mlbDvvIzpnIDopoHlrp7njrDmlrnms5XjgIJcIilcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyAkQmFzZUNvbW1hbmQgfSBmcm9tIFwiLi9CYXNlQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBNb2R1bGVNZ3IgfSBmcm9tIFwiem1nX21vZHVsZV9tZ3JcIlxyXG5cclxuZXhwb3J0IGNsYXNzIEJhY2tUb0hhbGxDbWQgZXh0ZW5kcyAkQmFzZUNvbW1hbmQge1xyXG4gICAgZXhjdXRlKGRhdGEpIHtcclxuICAgICAgICBNb2R1bGVNZ3IuYmFjaygpO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7ICRCYXNlQ29tbWFuZCB9IGZyb20gXCIuL0Jhc2VDb21tYW5kXCI7XHJcbmltcG9ydCB7IERhdGFNZ3IgfSBmcm9tIFwiem1nX2dhbWVkYXRhX21nclwiO1xyXG5pbXBvcnQgeyBFbnZNZ3IgfSBmcm9tIFwiem1nX2Vudl9tZ3JcIjtcclxuaW1wb3J0IHsgX01zZ0JyaWRnZSB9IGZyb20gXCIuLi9Nc2dCcmlkZ2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBHZXRVc2VyRGVmYXVsdHNDbWQgZXh0ZW5kcyAkQmFzZUNvbW1hbmQge1xyXG4gICAgZXhjdXRlKGRhdGEpIHtcclxuICAgICAgICBsZXQga2V5ID0gZGF0YS5kYXRhLmtleTtcclxuICAgICAgICBsZXQgZGQgPSBEYXRhTWdyLnNlcnZlci5nZXRJdGVtKGtleSlcclxuICAgICAgICBkZCA9IGRkID8gZGQgOiBcIlwiO1xyXG4gICAgICAgIC8vIF9Nc2dCcmlkZ2UuZ2V0SW5zdGFuY2UoKS5zZW5kTXNnVG9TdWJNdWR1bGUoeyBhY3Rpb246IFwidXNlckRlZmF1bHRzXCIsIGRhdGE6IHsga2V5OiBrZXksIHZhbHVlOiBkYXRhIH0gfSk7XHJcbiAgICAgICAgLy8gcmV0dXJuIHsgYWN0aW9uOiBcInVzZXJEZWZhdWx0c1wiLCBkYXRhOiB7IGtleToga2V5LCB2YWx1ZTogZGQgfSB9O1xyXG4gICAgICAgIF9Nc2dCcmlkZ2UuZ2V0SW5zdGFuY2UoKS5zZW5kTXNnVG9TdWJNdWR1bGUoeyBhY3Rpb246IFwidXNlckRlZmF1bHRzXCIsIGRhdGE6IHsga2V5OiBrZXksIHZhbHVlOiBkZCB9IH0pO1xyXG4gICAgfVxyXG5cclxufSIsImltcG9ydCB7ICRCYXNlQ29tbWFuZCB9IGZyb20gXCIuL0Jhc2VDb21tYW5kXCI7XHJcbmltcG9ydCB7IERhdGFNZ3IgfSBmcm9tIFwiem1nX2dhbWVkYXRhX21nclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNldFVzZXJEZWZhdWx0c0NtZCBleHRlbmRzICRCYXNlQ29tbWFuZCB7XHJcbiAgICBleGN1dGUoZGF0YSkge1xyXG4gICAgICAgIGxldCBrZXkgPSBkYXRhLmRhdGFbJ2tleSddO1xyXG4gICAgICAgIGxldCB2YWx1ZTogc3RyaW5nID0gZGF0YS5kYXRhWyd2YWx1ZSddO1xyXG4gICAgICAgIERhdGFNZ3Iuc2VydmVyLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgJEJhc2VDb21tYW5kIH0gZnJvbSBcIi4vQmFzZUNvbW1hbmRcIjtcclxuaW1wb3J0IHsgTW9kdWxlTWdyIH0gZnJvbSBcInptZ19tb2R1bGVfbWdyXCJcclxuXHJcbmV4cG9ydCBjbGFzcyBMb2dvdXRHYW1lQ21kIGV4dGVuZHMgJEJhc2VDb21tYW5kIHtcclxuICAgIGV4Y3V0ZShkYXRhKSB7XHJcbiAgICAgICAgLy8gTW9kdWxlTWdyLmV4aXQoKTtcclxuICAgICAgICAvLyBNb2R1bGVNZ3IuYmFjaygpO1xyXG4gICAgICAgIGNjLmdhbWUuZW5kKCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgRW52TWdyIH0gZnJvbSBcInptZ19lbnZfbWdyXCI7XHJcbmltcG9ydCB7IFVJTWdyIH0gZnJvbSBcInptZ191aV9tZ3JcIjtcclxuaW1wb3J0IHsgZ0xvZyB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5pbXBvcnQgeyAkQmFzZUNvbW1hbmQgfSBmcm9tIFwiLi9CYXNlQ29tbWFuZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNob3dTdWJNb2R1bGVDbWQgZXh0ZW5kcyAkQmFzZUNvbW1hbmQge1xyXG4gICAgZXhjdXRlKGRhdGEpIHtcclxuICAgICAgICBsZXQgd2VidmlldzogY2MuV2ViVmlldyA9IGNjLkNhbnZhcy5pbnN0YW5jZS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLldlYlZpZXcpO1xyXG4gICAgICAgIGlmIChFbnZNZ3IuaXNOYXRpdmUoKSkge1xyXG4gICAgICAgICAgICB3ZWJ2aWV3Lm5vZGUud2lkdGggPSBjYy5DYW52YXMuaW5zdGFuY2Uubm9kZS53aWR0aDtcclxuICAgICAgICAgICAgd2Vidmlldy5ub2RlLmhlaWdodCA9IGNjLkNhbnZhcy5pbnN0YW5jZS5ub2RlLmhlaWdodDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAod2VidmlldyAmJiB3ZWJ2aWV3LmdldElmcmFtZUVsZW1lbnQoKSAmJiB3ZWJ2aWV3LmdldElmcmFtZUVsZW1lbnQoKS5zdHlsZSkge1xyXG4gICAgICAgICAgICAgICAgd2Vidmlldy5nZXRJZnJhbWVFbGVtZW50KCkuc3R5bGUuekluZGV4ID0gXCIwXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZ0xvZyhcIndlYnZpZXfmqKHlnZflh4blpIflrozmr5XjgIJcIik7XHJcbiAgICAgICAgVUlNZ3IuaGlkZUxvYWRpbmcoKTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBNb2R1bGVNZ3IgfSBmcm9tIFwiem1nX21vZHVsZV9tZ3JcIjtcclxuaW1wb3J0IHsgJEJhc2VDb21tYW5kIH0gZnJvbSBcIi4vQmFzZUNvbW1hbmRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBFbnRlck1vZHVsZUNtZCBleHRlbmRzICRCYXNlQ29tbWFuZCB7XHJcbiAgICBleGN1dGUoZGF0YSkge1xyXG4gICAgICAgIGxldCBrZXk6IHN0cmluZyA9IGRhdGEuZGF0YVsna2V5J107XHJcbiAgICAgICAga2V5ID0ga2V5LnJlcGxhY2UoXCJaTV9cIiwgXCJcIik7XHJcbiAgICAgICAgTW9kdWxlTWdyLm9wZW5CeUNvZGUoa2V5KTtcclxuICAgIH1cclxuXHJcbn0iLCJpbXBvcnQgeyBBdWRpb01nciB9IGZyb20gXCJ6bWdfYXVkaW9fbWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWdyLCBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgeyBnTG9nIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7IF9Nc2dCcmlkZ2UgfSBmcm9tIFwiLi4vTXNnQnJpZGdlXCI7XHJcbmltcG9ydCB7ICRCYXNlQ29tbWFuZCB9IGZyb20gXCIuL0Jhc2VDb21tYW5kXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgR2FtZVBhdXNlQ21kIGV4dGVuZHMgJEJhc2VDb21tYW5kIHtcclxuICAgIGV4Y3V0ZShkYXRhKSB7XHJcbiAgICAgICAgY2MuZ2FtZS5wYXVzZSgpO1xyXG4gICAgICAgIEF1ZGlvTWdyLnN0b3BBbGwoKTtcclxuICAgICAgICBnTG9nKFwib25QYWdlUGF1c2UgZGF0YTpcIiwgZGF0YSk7XHJcbiAgICAgICAgRXZlbnRNZ3IuZW1pdChFdmVudE5hbWUuT05fUEFHRV9QQVVTRSk7XHJcbiAgICAgICAgLy8gX01zZ0JyaWRnZS5nZXRJbnN0YW5jZSgpLnNlbmRNc2dUb1N1Yk11ZHVsZShcIm9uUGFnZVBhdXNlXCIpO1xyXG4gICAgICAgIHJldHVybiB7IGFjdGlvbjogXCJvblBhZ2VQYXVzZVwiIH07XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgQXVkaW9NZ3IgfSBmcm9tIFwiem1nX2F1ZGlvX21nclwiO1xyXG5pbXBvcnQgeyBFdmVudE1nciwgRXZlbnROYW1lIH0gZnJvbSBcInptZ19ldmVudF9tZ3JcIjtcclxuaW1wb3J0IHsgZ0xvZyB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5pbXBvcnQgeyAkQmFzZUNvbW1hbmQgfSBmcm9tIFwiLi9CYXNlQ29tbWFuZFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEdhbWVSZXN1bWVDbWQgZXh0ZW5kcyAkQmFzZUNvbW1hbmQge1xyXG4gICAgZXhjdXRlKGRhdGEpIHtcclxuICAgICAgICBjYy5nYW1lLnJlc3VtZSgpO1xyXG4gICAgICAgIEF1ZGlvTWdyLnJlc3VtZUFsbE11c2ljKCk7XHJcbiAgICAgICAgZ0xvZyhcIm9uUGFnZVJlc3VtZSBkYXRhOlwiLCBkYXRhKTtcclxuICAgICAgICBFdmVudE1nci5lbWl0KEV2ZW50TmFtZS5PTl9QQUdFX1JFU1VNRSk7XHJcbiAgICAgICAgLy8gX01zZ0JyaWRnZS5nZXRJbnN0YW5jZSgpLnNlbmRNc2dUb1N1Yk11ZHVsZShcIm9uUGFnZVJlc3VtZVwiKTtcclxuICAgICAgICByZXR1cm4geyBhY3Rpb246IFwib25QYWdlUmVzdW1lXCIgfTtcclxuICAgIH1cclxuXHJcbn0iLCIvKipcclxuICog5LiO5a2Q5qih5Z2X5Lqk5rWB6YCa6YGTXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgRW52TWdyIH0gZnJvbSBcInptZ19lbnZfbWdyXCI7XHJcbmltcG9ydCB7IEJhc2VNZ3IgfSBmcm9tIFwiem1nX21nclwiO1xyXG5pbXBvcnQgeyBnTG9nIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7IEJhY2tUb0hhbGxDbWQgfSBmcm9tIFwiLi9jbWRzL0JhY2tUb0hhbGxDbWRcIjtcclxuaW1wb3J0IHsgJEJhc2VDb21tYW5kIH0gZnJvbSBcIi4vY21kcy9CYXNlQ29tbWFuZFwiO1xyXG5pbXBvcnQgeyBHZXRVc2VyRGVmYXVsdHNDbWQgfSBmcm9tIFwiLi9jbWRzL0dldFVzZXJEZWZhdWx0c0NtZFwiO1xyXG5pbXBvcnQgeyBTZXRVc2VyRGVmYXVsdHNDbWQgfSBmcm9tIFwiLi9jbWRzL1NldFVzZXJEZWZhdWx0c0NtZFwiO1xyXG5pbXBvcnQgeyBMb2dvdXRHYW1lQ21kIH0gZnJvbSBcIi4vY21kcy9Mb2dvdXRHYW1lQ21kXCI7XHJcbmltcG9ydCB7IFNob3dTdWJNb2R1bGVDbWQgfSBmcm9tIFwiLi9jbWRzL1Nob3dTdWJNb2R1bGVDbWRcIjtcclxuaW1wb3J0IHsgRW50ZXJNb2R1bGVDbWQgfSBmcm9tIFwiLi9jbWRzL0VudGVyTW9kdWxlQ21kXCI7XHJcbmltcG9ydCB7IEV2ZW50TWdyLCBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgeyBFRGV2aWNlIH0gZnJvbSBcInptZ19lbnZfbWdyXCI7XHJcbmltcG9ydCB7IEdhbWVQYXVzZUNtZCB9IGZyb20gXCIuL2NtZHMvR2FtZVBhdXNlQ21kXCI7XHJcbmltcG9ydCB7IEdhbWVSZXN1bWVDbWQgfSBmcm9tIFwiLi9jbWRzL0dhbWVSZXN1bWVDbWRcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBfTXNnQnJpZGdlIGV4dGVuZHMgQmFzZU1nciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IF9Nc2dCcmlkZ2UgPSBudWxsXHJcbiAgICBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogX01zZ0JyaWRnZSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9pbnN0YW5jZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9pbnN0YW5jZSA9IG5ldyBfTXNnQnJpZGdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0YW5jZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9qc2JNc2dQb29sID0gW107XHJcbiAgICBwcml2YXRlIF9tZXNzYWdlSGFuZGxlcnMgPSB7fTtcclxuICAgIHByaXZhdGUgX2lzSW5pdGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgZ2V0IGlzVmFsaWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzSW5pdGVkO1xyXG4gICAgfVxyXG4gICAgYXN5bmMgc3RhcnQoKSB7XHJcbiAgICAgICAgZ0xvZyhcIk1zZ0JyaWRnZeW8gOWni+WIneWni+WMli4uLlwiKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdE1zZygpO1xyXG4gICAgICAgIHRoaXMuX2luaXRCcmlkZ2UoKTtcclxuICAgICAgICB0aGlzLl9pbml0SGFuZGxlcigpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9uKEV2ZW50TmFtZS5VSV9MT0FEX0hJREUsIHRoaXMub25Mb2FkSGlkZSwgdGhpcywgZmFsc2UpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9uKEV2ZW50TmFtZS5VSV9MT0FEX1NIT1csIHRoaXMub25Mb2FkU2hvdywgdGhpcywgZmFsc2UpO1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Mb2FkSGlkZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbmRNc2dUb0NsaWVudChcImhpZGVGdWxsU2NyZWVuTG9hZGluZ1wiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Mb2FkU2hvdygpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbmRNc2dUb0NsaWVudChcInNob3dGdWxsU2NyZWVuTG9hZGluZ1wiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX2luaXRCcmlkZ2UoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLl9pc0luaXRlZCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuX2lzSW5pdGVkID0gdHJ1ZTtcclxuICAgICAgICBpZiAoRW52TWdyLmlzSnNiKCkpIHtcclxuICAgICAgICAgICAgaWYgKEVudk1nci5pc0lPUygpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zZXR1cFdlYlZpZXdKYXZhc2NyaXB0QnJpZGdlKGJyaWRnZSA9PiB0aGlzLnJlZ2lzdGVySGFuZGxlcnMoYnJpZGdlKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0V2ViVmlld0phdmFzY3JpcHRCcmlkZ2UoYnJpZGdlID0+IHRoaXMucmVnaXN0ZXJIYW5kbGVycyhicmlkZ2UpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIF9pbml0SGFuZGxlcigpIHtcclxuICAgICAgICBnTG9nKFwi5rOo5YaMd2luZG9355uR5ZCsXCIsIHdpbmRvdyk7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCB0aGlzLl9yZWNlaXZlUG9zdE1zZy5iaW5kKHRoaXMpLCBmYWxzZSk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub24oRXZlbnROYW1lLkdBTUVfT1ZFUiwgdGhpcy5vbkdhbWVPdmVyLCB0aGlzKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25HYW1lT3ZlcigpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnNlbmRNc2dUb0NsaWVudChcImxvZ291dEdhbWVcIik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIF9yZWNlaXZlUG9zdE1zZyhldmVudDogTWVzc2FnZUV2ZW50KSB7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBldmVudC5kYXRhO1xyXG4gICAgICAgIGdMb2coXCI8PDzpgJrov4dwb3N05o6l5Y+X5raI5oGvXCIsIGRhdGEpO1xyXG4gICAgICAgIHRoaXMuX3JlY2VpdmVNc2coZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfcmVjZWl2ZU1zZyhkYXRhKSB7XHJcbiAgICAgICAgbGV0IGFjdGlvbiA9IGRhdGFbJ2FjdGlvbiddO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBkID0gRW52TWdyLmlzTmF0aXZlKCkgPyBKU09OLnBhcnNlKGRhdGEuZGF0YSkgOiBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgIGRhdGEuZGF0YSA9IGQ7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICBnTG9nKFwi5raI5oGv5L2T5peg5rOV6KKrSnNvbixpc05hdGl2ZTpcIiArIEVudk1nci5pc05hdGl2ZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGNvbW1hbmQ6ICRCYXNlQ29tbWFuZCA9IHRoaXMuX21lc3NhZ2VIYW5kbGVyc1thY3Rpb25dO1xyXG4gICAgICAgIGlmIChjb21tYW5kKSB7XHJcbiAgICAgICAgICAgIGxldCByZXQgPSBjb21tYW5kLmV4Y3V0ZShkYXRhKTtcclxuICAgICAgICAgICAgaWYgKHJldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kTXNnVG9TdWJNdWR1bGUocmV0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMganNiUmVjZWl2ZU1zZyhkYXRhKSB7XHJcbiAgICAgICAgZ0xvZyhcIumAmui/h2pzYuaOpeaUtuWuouaIt+err+a2iOaBrzFcIiwgZGF0YSk7XHJcbiAgICAgICAgdGhpcy5fcmVjZWl2ZU1zZyhkYXRhKTtcclxuXHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJlZ2lzdGVySGFuZGxlcnMoYnJpZGdlKSB7XHJcbiAgICAgICAgZ0xvZyhcIuaJi+acuuerr+azqOWGjGpzYuaIkOWKn1wiKTtcclxuICAgICAgICBicmlkZ2UucmVnaXN0ZXJIYW5kbGVyKCdqc2JSZWNlaXZlTXNnJywgZnVuY3Rpb24gKGRhdGEsIHJlc3BvbnNlQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuanNiUmVjZWl2ZU1zZyhkYXRhKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICBicmlkZ2UucmVnaXN0ZXJIYW5kbGVyKCdvblBhZ2VSZXN1bWUnLCBmdW5jdGlvbiAoZGF0YSwgcmVzcG9uc2VDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvL+mhtemdouS7juaBr+Wxj+eKtuaAgei/lOWbnlxyXG4gICAgICAgICAgICAvL+mcgOimgemHjeaWsOWQr+WKqOa4uOaIj++8jFxyXG4gICAgICAgICAgICAvL+aBouWkjeWjsOmfs+aSreaUviBcclxuICAgICAgICAgICAgbmV3IEdhbWVSZXN1bWVDbWQoKS5leGN1dGUoZGF0YSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgYnJpZGdlLnJlZ2lzdGVySGFuZGxlcignb25QYWdlUGF1c2UnLCBmdW5jdGlvbiAoZGF0YSwgcmVzcG9uc2VDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAvL+mhtemdouS7juaBr+Wxj+eKtuaAgei/lOWbnlxyXG4gICAgICAgICAgICAvL+mcgOimgemHjeaWsOWQr+WKqOa4uOaIj++8jFxyXG4gICAgICAgICAgICAvL+aBouWkjeWjsOmfs+aSreaUviBcclxuICAgICAgICAgICAgbmV3IEdhbWVQYXVzZUNtZCgpLmV4Y3V0ZShkYXRhKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICBpZiAoKDxhbnk+d2luZG93KS5XZWJWaWV3SmF2YXNjcmlwdEJyaWRnZSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyUG9vbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHJlZ2lzdE1zZygpIHtcclxuICAgICAgICBnTG9nKFwi5byA5aeL5rOo5YaM5LiO5a2Q5qih5Z2X5rKf6YCa5L+h5Luk44CCXCIpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJIYW5kbGVyKFwiYmFja1wiLCBCYWNrVG9IYWxsQ21kKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVySGFuZGxlcignbG9nb3V0R2FtZScsIExvZ291dEdhbWVDbWQpO1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJIYW5kbGVyKFwiem1oYWxsX2JhY2tUb0hhbGxcIiwgQmFja1RvSGFsbENtZCk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckhhbmRsZXIoJ2VudGVyTW9kdWxlJywgRW50ZXJNb2R1bGVDbWQpO1xyXG4gICAgICAgIC8v5a2Y5YKo5pWw5o2uXHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckhhbmRsZXIoJ2dldFVzZXJEZWZhdWx0cycsIEdldFVzZXJEZWZhdWx0c0NtZCk7XHJcbiAgICAgICAgdGhpcy5yZWdpc3RlckhhbmRsZXIoJ3NldFVzZXJEZWZhdWx0cycsIFNldFVzZXJEZWZhdWx0c0NtZCk7XHJcbiAgICAgICAgLy/lrZDmqKHlnZflh4blpIflrozmr5VcclxuICAgICAgICB0aGlzLnJlZ2lzdGVySGFuZGxlcignc2hvd1dlYlZpZXcnLCBTaG93U3ViTW9kdWxlQ21kKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVySGFuZGxlcignWk1IYWxsX3Nob3dfc3ViTW9kdWxlJywgU2hvd1N1Yk1vZHVsZUNtZCk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog56uvIOmhtemdouaaguWBnOWSjOaBouWkjVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMucmVnaXN0ZXJIYW5kbGVyKFwib25QYWdlUGF1c2VcIiwgR2FtZVBhdXNlQ21kKTtcclxuICAgICAgICB0aGlzLnJlZ2lzdGVySGFuZGxlcihcIm9uUGFnZVJlc3VtZVwiLCBHYW1lUmVzdW1lQ21kKTtcclxuICAgICAgICBnTG9nKFwi5a2Q5qih5Z2X5rKf6YCa5L+h5Luk55uR5ZCs5Yid5aeL5YyW5a6M5q+V44CCXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjbGVhclBvb2woKSB7XHJcbiAgICAgICAgZ0xvZyhcIj4+PuazqOWGjOaIkOWKn+WQju+8jOWwhuW7tui/n+eahOa2iOaBr+WPkemAgeWHuuWOuy4uLlwiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX2pzYk1zZ1Bvb2wubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCg8YW55PndpbmRvdykuV2ViVmlld0phdmFzY3JpcHRCcmlkZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1zZ1RvQ2xpZW50KHRoaXMuX2pzYk1zZ1Bvb2xbaV0uYWN0aW9uLCB0aGlzLl9qc2JNc2dQb29sW2ldLmRhdGEsIHRoaXMuX2pzYk1zZ1Bvb2xbaV0uaGFuZGxlck5hbWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fanNiTXNnUG9vbCA9IFtdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNlbmdQYWdlSW5Nc2dUb0NsaWVudChtc2c6IHN0cmluZywgc2NoZW1lOiBzdHJpbmcsIGNhbGxiYWNrOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmIChFbnZNZ3IuaXNKc2IoKSkge1xyXG4gICAgICAgICAgICBnTG9nKFwiMjLpgJrov4dqc2LlkJHlrqLmiLfnq6/lj5HpgIHmtojmga9cIiwgc2NoZW1lKTtcclxuICAgICAgICAgICAgLy8gKDxhbnk+d2luZG93KS5XZWJWaWV3SmF2YXNjcmlwdEJyaWRnZS5jYWxsSGFuZGxlcihtc2csIHNjaGVtZSk7XHJcbiAgICAgICAgICAgIGxldCBicmlkZ2UgPSAoPGFueT53aW5kb3cpLldlYlZpZXdKYXZhc2NyaXB0QnJpZGdlO1xyXG4gICAgICAgICAgICBpZiAoYnJpZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBicmlkZ2UuY2FsbEhhbmRsZXIobXNnLCBzY2hlbWUsIGZ1bmN0aW9uIHJlc3BvbnNlQ2FsbGJhY2socmVzcG9uc2VEYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2socmVzcG9uc2VEYXRhKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZ0xvZyhcIjMz6YCa6L+HcG9zdOWQkeWuouaIt+err+WPkemAgea2iOaBr1wiLCB7IGFjdGlvbjogbXNnLCBkYXRhOiBzY2hlbWUgfSk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSB3aW5kb3cucGFyZW50ICYmIHdpbmRvdy5wYXJlbnQud2luZG93O1xyXG4gICAgICAgICAgICB0YXJnZXQucG9zdE1lc3NhZ2UoeyBhY3Rpb246IG1zZywgZGF0YTogc2NoZW1lIH0sIFwiKlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2VuZE1zZ1RvQ2xpZW50KG1zZzogc3RyaW5nLCBkYXRhID0gbnVsbCwgaGFuZGxlck5hbWU6IHN0cmluZyA9ICdqc2JNZXNzYWdlJykge1xyXG4gICAgICAgIC8vZ0xvZyhcIuWHhuWkh+WQkeWuouaIt+err+WPkemAgea2iOaBr+WVplwiLCB7IGFjdGlvbjogbXNnLCBkYXRhOiBkYXRhIH0sIFVybFBhcnNlLmlzSnNiKCkpXHJcbiAgICAgICAgaWYgKEVudk1nci5pc0pzYigpKSB7XHJcbiAgICAgICAgICAgIGlmICgoPGFueT53aW5kb3cpLldlYlZpZXdKYXZhc2NyaXB0QnJpZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBnTG9nKFwiPj4+6YCa6L+HanNi5ZCR5a6i5oi356uv5Y+R6YCB5raI5oGvXCIsIHsgYWN0aW9uOiBtc2csIGRhdGE6IGRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaGFuZGxlck5hbWUgPT09ICdqc2JNZXNzYWdlJykge1xyXG4gICAgICAgICAgICAgICAgICAgICg8YW55PndpbmRvdykuV2ViVmlld0phdmFzY3JpcHRCcmlkZ2UuY2FsbEhhbmRsZXIoaGFuZGxlck5hbWUsIHsgYWN0aW9uOiBtc2csIGRhdGE6IGRhdGEgfSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICg8YW55PndpbmRvdykuV2ViVmlld0phdmFzY3JpcHRCcmlkZ2UuY2FsbEhhbmRsZXIoaGFuZGxlck5hbWUsIG1zZywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gZ0xvZyhcIuWuieWNkzZcIik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9qc2JNc2dQb29sLnB1c2goeyBhY3Rpb246IG1zZywgZGF0YTogZGF0YSwgaGFuZGxlck5hbWU6IGhhbmRsZXJOYW1lIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBnTG9nKFwiPj4+6YCa6L+HcG9zdOWQkeWuouaIt+err+WPkemAgea2iOaBr1wiICsgbXNnLCB7IGFjdGlvbjogbXNnLCBkYXRhOiBkYXRhIH0pO1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gd2luZG93LnBhcmVudCAmJiB3aW5kb3cucGFyZW50LndpbmRvdztcclxuICAgICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQucG9zdE1lc3NhZ2UpIHRhcmdldC5wb3N0TWVzc2FnZSh7IGFjdGlvbjogbXNnLCBkYXRhOiBkYXRhIH0sIFwiKlwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNlbmRNc2dUb1N1Yk11ZHVsZShkYXRhOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgd2VidmlldyA9IGNjLkNhbnZhcy5pbnN0YW5jZS5nZXRDb21wb25lbnRJbkNoaWxkcmVuKGNjLldlYlZpZXcpO1xyXG4gICAgICAgIGlmIChFbnZNZ3IuaXNKc2IoKSAmJiB3ZWJ2aWV3KSB7XHJcbiAgICAgICAgICAgIGxldCB0ZW1wRGF0YSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIj4+PuWPkemAgea2iOaBr+S4ujpcIiwgdGVtcERhdGEsIG5ldyBEYXRlKCkuZ2V0VGltZSgpKTtcclxuICAgICAgICAgICAgd2Vidmlldy5ldmFsdWF0ZUpTKGByZWNlaXZlTXNnKCR7dGVtcERhdGF9KWApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB3ZWJDb20gPSBjYy5DYW52YXMuaW5zdGFuY2UuZ2V0Q29tcG9uZW50SW5DaGlsZHJlbihjYy5XZWJWaWV3KTtcclxuICAgICAgICAgICAgaWYgKHdlYkNvbSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlmcmFtZSA9IHdlYkNvbVsnZ2V0SWZyYW1lRWxlbWVudCddKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWZyYW1lKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZ0xvZyhcIj4+PuWQkeWtkOaooeWdl+WPkemAgea2iOaBr+WVpiDmtojmga/kuLpcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHdpbiA9IGlmcmFtZS5jb250ZW50V2luZG93O1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbiAmJiB3aW4ucG9zdE1lc3NhZ2UoZGF0YSwgXCIqXCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyByZWdpc3RlckhhbmRsZXIobmFtZTogc3RyaW5nLCBjb21tYW5kKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9tZXNzYWdlSGFuZGxlcnNbbmFtZV0pIHtcclxuICAgICAgICAgICAgdGhpcy5fbWVzc2FnZUhhbmRsZXJzW25hbWVdID0gbmV3IGNvbW1hbmQoKSBhcyAkQmFzZUNvbW1hbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHVuUmVnaXN0ZXJIYW5kbGVyKG5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9tZXNzYWdlSGFuZGxlcnNbbmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyTmF0aXZlSGFuZGxlcihuYW1lOiBzdHJpbmcsIGNvbW1hbmQpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX21lc3NhZ2VIYW5kbGVyc1tuYW1lXSkge1xyXG4gICAgICAgICAgICB0aGlzLl9tZXNzYWdlSGFuZGxlcnNbbmFtZV0gPSBuZXcgY29tbWFuZCgpIGFzICRCYXNlQ29tbWFuZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVuUmVnaXN0ZXJOYXRpdmVIYW5kbGVyKG5hbWU6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLl9tZXNzYWdlSGFuZGxlcnNbbmFtZV07XHJcbiAgICB9XHJcblxyXG4gICAgLy9pb3Mg5YmN572u5rOo5YWlXHJcbiAgICBwcml2YXRlIF9zZXR1cFdlYlZpZXdKYXZhc2NyaXB0QnJpZGdlKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgZ0xvZyhcImlvc+W8gOWni+WJjee9ruazqOWFpVwiKTtcclxuICAgICAgICBpZiAoKDxhbnk+d2luZG93KS5XZWJWaWV3SmF2YXNjcmlwdEJyaWRnZSkgeyByZXR1cm4gY2FsbGJhY2soKDxhbnk+d2luZG93KS5XZWJWaWV3SmF2YXNjcmlwdEJyaWRnZSk7IH1cclxuICAgICAgICBpZiAoKDxhbnk+d2luZG93KS5XVkpCQ2FsbGJhY2tzKSB7IHJldHVybiAoPGFueT53aW5kb3cpLldWSkJDYWxsYmFja3MucHVzaChjYWxsYmFjayk7IH1cclxuICAgICAgICAoPGFueT53aW5kb3cpLldWSkJDYWxsYmFja3MgPSBbY2FsbGJhY2tdO1xyXG4gICAgICAgIGxldCBXVkpCSWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XHJcbiAgICAgICAgV1ZKQklmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIFdWSkJJZnJhbWUuc3JjID0gJ3d2amJzY2hlbWU6Ly9fX0JSSURHRV9MT0FERURfXyc7XHJcbiAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmFwcGVuZENoaWxkKFdWSkJJZnJhbWUpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoV1ZKQklmcmFtZSkgfSwgMCk7XHJcbiAgICAgICAgZ0xvZyhcImlvc+azqOWFpeWujOaIkFwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2FuZHJvaWQg5ZCO572u5rOo5YWlXHJcbiAgICBwcml2YXRlIF9jb25uZWN0V2ViVmlld0phdmFzY3JpcHRCcmlkZ2UoY2FsbGJhY2spIHtcclxuICAgICAgICBnTG9nKFwi5a6J5Y2T5byA5aeL5ZCO572u5rOo5YWlXCIpO1xyXG4gICAgICAgIGlmICgoPGFueT53aW5kb3cpLldlYlZpZXdKYXZhc2NyaXB0QnJpZGdlKSB7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCg8YW55PndpbmRvdykuV2ViVmlld0phdmFzY3JpcHRCcmlkZ2UpO1xyXG4gICAgICAgICAgICBnTG9nKFwi5a6J5Y2T5Y6f55Sf5rOo5YWl5a6M5oiQXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGdMb2coXCLlronljZNkb2N1bWVudOazqOWFpeW8gOWni1wiKTtcclxuICAgICAgICAgICAgLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgLy8gICAgICdXZWJWaWV3SmF2YXNjcmlwdEJyaWRnZVJlYWR5J1xyXG4gICAgICAgICAgICAvLyAgICAgLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgY2FsbGJhY2soKDxhbnk+d2luZG93KS5XZWJWaWV3SmF2YXNjcmlwdEJyaWRnZSk7XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgZ0xvZyhcIuWuieWNk+azqOWFpeWujOaIkFwiKTtcclxuICAgICAgICAgICAgLy8gICAgIH0sXHJcbiAgICAgICAgICAgIC8vICAgICBmYWxzZVxyXG4gICAgICAgICAgICAvLyApO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdXZWJWaWV3SmF2YXNjcmlwdEJyaWRnZVJlYWR5JywgZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93W1wib25XZWJWaWV3SmF2YXNjcmlwdEJyaWRnZVJlYWR5XCJdKSB3aW5kb3dbXCJvbldlYlZpZXdKYXZhc2NyaXB0QnJpZGdlUmVhZHlcIl0od2luZG93W1wiX19icmlkZ2VcIl0gPSAoPGFueT53aW5kb3cpLldlYlZpZXdKYXZhc2NyaXB0QnJpZGdlKTtcclxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCg8YW55PndpbmRvdykuV2ViVmlld0phdmFzY3JpcHRCcmlkZ2UpO1xyXG4gICAgICAgICAgICAgICAgZ0xvZyhcIuWuieWNk+azqOWFpeWujOaIkFwiKTtcclxuICAgICAgICAgICAgfSwgZmFsc2UpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgRGlyZWN0b3JFdmVudCwgRGlyZWN0b3JNZ3IgfSBmcm9tIFwiem1nX2NvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgRXZlbnRNZ3IsIEV2ZW50TmFtZSB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XHJcbmltcG9ydCB7IE1vZHVsZU1nciB9IGZyb20gXCJ6bWdfbW9kdWxlX21nclwiO1xyXG5pbXBvcnQgeyBSZXNBc3NldCwgUmVzTWdyIH0gZnJvbSBcInptZ19yZXNfbWdyXCI7XHJcbmltcG9ydCB7IEFjdG9yIH0gZnJvbSBcInptZ191aV9tZ3JcIjtcclxuaW1wb3J0IHsgRHJhZ29uQXNzZXQsIERyYWdvblV0aWwgfSBmcm9tIFwiem1nX3V0aWxcIjtcclxuaW1wb3J0IHsgZ0xvZyB9IGZyb20gXCJ6bWdfdXRpbFwiO1xyXG5pbXBvcnQgeyBfQXBwQnVuZGxlTmFtZSB9IGZyb20gXCIuLi9BcHBCdW5kbGVOYW1lXCI7XHJcbmltcG9ydCB7IF9Vc2VyRXZlbnROYW1lIH0gZnJvbSBcIi4uL3VzZXJkYXRhcy9Vc2VyRXZlbnROYW1lXCI7XHJcbmltcG9ydCB7IF9Vc2VyTWdyIH0gZnJvbSBcIi4uL3VzZXJkYXRhcy9Vc2VyTWdyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5IH0gPSBjYy5fZGVjb3JhdG9yXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb2xlVGlwcyBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBwcml2YXRlIF9kaXNwbGF5OiBkcmFnb25Cb25lcy5Bcm1hdHVyZURpc3BsYXk7XHJcbiAgICBwcml2YXRlIF90aXBzTm9kZTogY2MuTm9kZTtcclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICB0aGlzLl90aXBzTm9kZSA9IG5ldyBjYy5Ob2RlKCk7XHJcbiAgICAgICAgdGhpcy5fdGlwc05vZGUuc2V0UGFyZW50KHRoaXMubm9kZSk7XHJcbiAgICAgICAgUmVzTWdyLmxvYWREcmFnb24oXHJcbiAgICAgICAgICAgIF9BcHBCdW5kbGVOYW1lLlN0YWNrLFxyXG4gICAgICAgICAgICAncm9sZS90aXBzJyxcclxuICAgICAgICAgICAgKGRyYWdvbjogRHJhZ29uQXNzZXQpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RpcHNOb2RlLnNldFBvc2l0aW9uKDE4OCwgMTc4KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RpcHNOb2RlLnpJbmRleCA9IDEwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGlwc05vZGUuc2NhbGUgPSAwLjg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXNwbGF5ID0gRHJhZ29uVXRpbC5jcmVhdGVEcmFnb24oXHJcbiAgICAgICAgICAgICAgICAgICAgZHJhZ29uLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RpcHNOb2RlLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicm9sZVRpcHNcIlxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlzcGxheS5hZGRFdmVudExpc3RlbmVyKFxyXG4gICAgICAgICAgICAgICAgICAgIGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkNPTVBMRVRFLFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25EcmFnb25EaXNwbGF5LFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2soKVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgKTtcclxuICAgICAgICB0aGlzLmFkZEV2ZW50cygpO1xyXG4gICAgfVxyXG4gICAgb25EaXNhYmxlKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl9kaXNwbGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BsYXkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcclxuICAgICAgICAgICAgICAgIGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkNPTVBMRVRFLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5vbkRyYWdvbkRpc3BsYXksXHJcbiAgICAgICAgICAgICAgICB0aGlzXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2hvd1JvbGVUaXAoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3RpcHNOb2RlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RpcHNOb2RlLmFjdGl2ZSA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5fdGlwc05vZGUuc2V0UG9zaXRpb24oQWN0b3IoKS5ub2RlLndpZHRoLCBBY3RvcigpLmRpc3BsYXkubm9kZS5oZWlnaHQpXHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2soKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaGlkZVRpcCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fdGlwc05vZGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGlwc05vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFkZEV2ZW50cygpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdXNlciA9IF9Vc2VyTWdyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub24oRXZlbnROYW1lLkNPTlRST0xMRVJfQ0hBTkdFX0RFU1RPUlksIHRoaXMub25TY2VuZURlc3RvcnksIHRoaXMsIGZhbHNlKTtcclxuICAgICAgICB1c2VyLm9uKF9Vc2VyRXZlbnROYW1lLkVORVJHWV9DSEFOR0UsIHRoaXMuY2hlY2ssIHRoaXMpO1xyXG4gICAgICAgIEFjdG9yKCkub24oRXZlbnROYW1lLkNMSUNLLCB0aGlzLm9uQWN0b3JDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdXNlci5vbihfVXNlckV2ZW50TmFtZS5TTEVFUF9DSEFOR0UsIHRoaXMuY2hlY2ssIHRoaXMpO1xyXG4gICAgICAgIHVzZXIub24oX1VzZXJFdmVudE5hbWUuQ0xFQU5fQ0hBTkdFLCB0aGlzLmNoZWNrLCB0aGlzKTtcclxuICAgICAgICB1c2VyLm9uKF9Vc2VyRXZlbnROYW1lLldBU0hfQ0hBTkdFLCB0aGlzLmNoZWNrLCB0aGlzKTtcclxuICAgICAgICB1c2VyLm9uKF9Vc2VyRXZlbnROYW1lLkdSRUVUX0NBUkQsIHRoaXMuY2hlY2ssIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZW1vdmVFdmVudHMoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHVzZXIgPSBfVXNlck1nci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfREVTVE9SWSwgdGhpcy5vblNjZW5lRGVzdG9yeSwgdGhpcyk7XHJcbiAgICAgICAgdXNlci5vZmYoX1VzZXJFdmVudE5hbWUuRU5FUkdZX0NIQU5HRSwgdGhpcy5jaGVjaywgdGhpcyk7XHJcbiAgICAgICAgQWN0b3IoKS5vZmYoRXZlbnROYW1lLkNMSUNLLCB0aGlzLm9uQWN0b3JDbGljaywgdGhpcyk7XHJcbiAgICAgICAgdXNlci5vZmYoX1VzZXJFdmVudE5hbWUuQ0xFQU5fQ0hBTkdFLCB0aGlzLmNoZWNrLCB0aGlzKTtcclxuICAgICAgICB1c2VyLm9mZihfVXNlckV2ZW50TmFtZS5TTEVFUF9DSEFOR0UsIHRoaXMuY2hlY2ssIHRoaXMpO1xyXG4gICAgICAgIHVzZXIub2ZmKF9Vc2VyRXZlbnROYW1lLldBU0hfQ0hBTkdFLCB0aGlzLmNoZWNrLCB0aGlzKTtcclxuICAgICAgICB1c2VyLm9mZihfVXNlckV2ZW50TmFtZS5HUkVFVF9DQVJELCB0aGlzLmNoZWNrLCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdGFsa0h1bmdlcigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdXNlciA9IF9Vc2VyTWdyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQWN0b3IoKS50YWxrQnlSZXMobmV3IFJlc0Fzc2V0KF9BcHBCdW5kbGVOYW1lLlN0YWNrLCBcImF1ZGlvL1wiICsgdXNlci5yb2xlTmFtZSArIFwiL1wiICsgXCLmiJHppb/kuoZcIikpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRhbGtTbGVlcCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdXNlciA9IF9Vc2VyTWdyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQWN0b3IoKS50YWxrQnlSZXMobmV3IFJlc0Fzc2V0KF9BcHBCdW5kbGVOYW1lLlN0YWNrLCBcImF1ZGlvL1wiICsgdXNlci5yb2xlTmFtZSArIFwiL1wiICsgXCLmiJHlm7DkuoZcIikpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRhbGtXYXNoKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB1c2VyID0gX1VzZXJNZ3IuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBBY3RvcigpLnRhbGtCeVJlcyhuZXcgUmVzQXNzZXQoX0FwcEJ1bmRsZU5hbWUuU3RhY2ssIFwiYXVkaW8vXCIgKyB1c2VyLnJvbGVOYW1lICsgXCIvXCIgKyBcIuWwj+S4u+S6uu+8jOaIkei6q+S4iuiEj+WFruWFru+8jOW/q+mAgeaIkeWOu+a0l+S4qua+oeWQp35cIikpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRhbGtDbGVhbigpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdXNlciA9IF9Vc2VyTWdyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQWN0b3IoKS50YWxrQnlSZXMobmV3IFJlc0Fzc2V0KF9BcHBCdW5kbGVOYW1lLlN0YWNrLCBcImF1ZGlvL1wiICsgdXNlci5yb2xlTmFtZSArIFwiL1wiICsgXCLlsI/kuLvkurrvvIzmiL/pl7TmnInlnoPlnL7kuobvvIzlv6vluK7miJHmiZPmiavkuIvlkKd+XCIpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB0YWxrTmV3Q2FyZCgpOiB2b2lkIHtcclxuICAgICAgICBsZXQgdXNlciA9IF9Vc2VyTWdyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgQWN0b3IoKS50YWxrQnlSZXMobmV3IFJlc0Fzc2V0KF9BcHBCdW5kbGVOYW1lLlN0YWNrLCBcImF1ZGlvL1wiICsgdXNlci5yb2xlTmFtZSArIFwiL1wiICsgXCLotLrljaHkuIrmlrDkuoZcIikpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRhbGtSZWNpdmVDYXJkKCk6IHZvaWQge1xyXG4gICAgICAgIGxldCB1c2VyID0gX1VzZXJNZ3IuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBBY3RvcigpLnRhbGtCeVJlcyhuZXcgUmVzQXNzZXQoX0FwcEJ1bmRsZU5hbWUuU3RhY2ssIFwiYXVkaW8vXCIgKyB1c2VyLnJvbGVOYW1lICsgXCIvXCIgKyBcIui0uuWNoeWbnuWkjeS6hlwiKSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmFuZG9tVGFsaygpOiB2b2lkIHtcclxuICAgICAgICBBY3RvcigpLnRhbGtSYW5kb20oKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIG9wZW4oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IHVzZXIgPSBfVXNlck1nci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBidWRsZU5hbWUgPSBEaXJlY3Rvck1nci5ub3dCdW5OYW1lXHJcbiAgICAgICAgaWYgKGJ1ZGxlTmFtZSA9PSBfQXBwQnVuZGxlTmFtZS5IT1VTRSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgZmxvb3JOdW0gPSAyXHJcbiAgICAgICAgICAgIGlmICh1c2VyLmlzR3JlZXRDYXJkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBNb2R1bGVNZ3Iub3BlbkJ5Q29kZShcIkdyZWV0Q2FyZFwiKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh1c2VyLmlzSHVuZ2VyKSB7XHJcbiAgICAgICAgICAgICAgICBmbG9vck51bSA9IDJcclxuICAgICAgICAgICAgICAgIE1vZHVsZU1nci5vcGVuQnlDb2RlKF9BcHBCdW5kbGVOYW1lLkhPVVNFLCB7IGZsb29yOiBmbG9vck51bSB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh1c2VyLmlzVG9TbGVlcCkge1xyXG4gICAgICAgICAgICAgICAgZmxvb3JOdW0gPSAzXHJcbiAgICAgICAgICAgICAgICBNb2R1bGVNZ3Iub3BlbkJ5Q29kZShfQXBwQnVuZGxlTmFtZS5IT1VTRSwgeyBmbG9vcjogZmxvb3JOdW0gfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXNlci5pc1RvV2FzaCkge1xyXG4gICAgICAgICAgICAgICAgZmxvb3JOdW0gPSA0XHJcbiAgICAgICAgICAgICAgICBNb2R1bGVNZ3Iub3BlbkJ5Q29kZShfQXBwQnVuZGxlTmFtZS5IT1VTRSwgeyBmbG9vcjogZmxvb3JOdW0gfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAodXNlci5nZXRSb29tSXNUb0NsZWFuKCkpIHtcclxuICAgICAgICAgICAgICAgIGZsb29yTnVtID0gdXNlci5nZXRSb29tSXNUb0NsZWFuKCk7XHJcbiAgICAgICAgICAgICAgICBNb2R1bGVNZ3Iub3BlbkJ5Q29kZShfQXBwQnVuZGxlTmFtZS5IT1VTRSwgeyBmbG9vcjogZmxvb3JOdW0gfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRhbGsoKSB7XHJcbiAgICAgICAgbGV0IHVzZXIgPSBfVXNlck1nci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGlmICh1c2VyLmNhcmRWby5oYXNOZXdHcmVldENhcmQpIHtcclxuICAgICAgICAgICAgdGhpcy50YWxrTmV3Q2FyZCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodXNlci5jYXJkVm8uaGFzUmVjaXZlR3JlZXRDYXJkIHx8IHVzZXIuY2FyZFZvLmhhc0dyZWV0Q2FyZCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhbGtSZWNpdmVDYXJkKCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh1c2VyLmlzSHVuZ2VyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFsa0h1bmdlcigpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodXNlci5pc1RvU2xlZXApIHtcclxuICAgICAgICAgICAgdGhpcy50YWxrU2xlZXAoKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHVzZXIuaXNUb1dhc2gpIHtcclxuICAgICAgICAgICAgdGhpcy50YWxrV2FzaCgpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodXNlci5jbGVhblZvLmdldFJvb21Jc1RvQ2xlYW4oKSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhbGtDbGVhbigpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmFuZG9tVGFsaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uQWN0b3JDbGljaygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5vcGVuKCkpIHJldHVyblxyXG4gICAgICAgIHRoaXMudGFsaygpXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvblNjZW5lRGVzdG9yeSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl90aXBzTm9kZS5kZXN0cm95KCk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudHMoKTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0TmV4dFN0YXR1KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fZGlzcGxheSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVzZXIgPSBfVXNlck1nci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCBsYXN0QW5pbmFtZTogc3RyaW5nXHJcbiAgICAgICAgdmFyIGFuaTogc3RyaW5nID0gdGhpcy5fZGlzcGxheS5hbmltYXRpb25OYW1lLnNsaWNlKDAsIDMpIC8v5oiq5Y+WM+S4quWtl+esplxyXG4gICAgICAgIHN3aXRjaCAoYW5pKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlayc6XHJcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIuY2FyZFZvLmhhc0dyZWV0Q2FyZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RBbmluYW1lID0gJ2hla2F4aWFvc2hpJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAncmVjJzpcclxuICAgICAgICAgICAgICAgIGlmICghdXNlci5jYXJkVm8uaGFzUmVjaXZlR3JlZXRDYXJkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGFzdEFuaW5hbWUgPSAncmVjaXZlaGVrYXhpYW9zaGknXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBjYXNlICduZXcnOlxyXG4gICAgICAgICAgICAgICAgaWYgKCF1c2VyLmNhcmRWby5oYXNOZXdHcmVldENhcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0QW5pbmFtZSA9ICduZXdoZWtheGlhb3NoaSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ2VsZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIuaXNIdW5nZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0QW5pbmFtZSA9ICdlbGV4aWFvc2hpJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAna3VuJzpcclxuICAgICAgICAgICAgICAgIGlmICghdXNlci5pc1RvU2xlZXApIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0QW5pbmFtZSA9ICdrdW54aWFvc2hpJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgY2FzZSAneGl6JzpcclxuICAgICAgICAgICAgICAgIGlmICghdXNlci5pc1RvV2FzaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxhc3RBbmluYW1lID0gJ3hpemFveGlhb3NoaSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrXHJcbiAgICAgICAgICAgIGNhc2UgJ3Nhbyc6XHJcbiAgICAgICAgICAgICAgICBpZiAoIXVzZXIuY2xlYW5Wby5nZXRSb29tSXNUb0NsZWFuKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0QW5pbmFtZSA9ICdzYW9kaXhpYW9zaGknXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVha1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxhc3RBbmluYW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2hlY2soKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl9kaXNwbGF5KSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbm93YW5pOiBzdHJpbmc7XHJcbiAgICAgICAgbGV0IHVzZXIgPSBfVXNlck1nci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIHZhciBhbmk6IHN0cmluZyA9IHRoaXMuX2Rpc3BsYXkuYW5pbWF0aW9uTmFtZVxyXG4gICAgICAgIGlmIChhbmkgJiYgYW5pLmluZGV4T2YoJ3h1bmh1YW4nKSAhPSAtMSkge1xyXG4gICAgICAgICAgICAvL+aUueWPmOS6hueKtuaAgVxyXG4gICAgICAgICAgICBub3dhbmkgPSB0aGlzLmdldE5leHRTdGF0dSgpXHJcbiAgICAgICAgfSBlbHNlIGlmICh1c2VyLmNhcmRWby5pc0dyZWV0Q2FyZCkge1xyXG4gICAgICAgICAgICBpZiAodXNlci5jYXJkVm8uaGFzR3JlZXRDYXJkKSB7XHJcbiAgICAgICAgICAgICAgICBub3dhbmkgPSAnaGVrYWNodXhpYW4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXNlci5jYXJkVm8uaGFzUmVjaXZlR3JlZXRDYXJkKSB7XHJcbiAgICAgICAgICAgICAgICBub3dhbmkgPSAncmVjaXZlaGVrYWNodXhpYW4nXHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXNlci5jYXJkVm8uaGFzTmV3R3JlZXRDYXJkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYWN0aXZlID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZVRpcCgpXHJcbiAgICAgICAgICAgICAgICAvLyBub3dhbmkgPSAnbmV3aGVrYWNodXhpYW4nXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKHVzZXIuaXNIdW5nZXIpIHtcclxuICAgICAgICAgICAgbm93YW5pID0gJ2VsZWNodXhpYW4nXHJcbiAgICAgICAgfSBlbHNlIGlmICh1c2VyLmlzVG9TbGVlcCkge1xyXG4gICAgICAgICAgICBub3dhbmkgPSAna3VuY2h1eGlhbidcclxuICAgICAgICB9IGVsc2UgaWYgKHVzZXIuaXNUb1dhc2gpIHtcclxuICAgICAgICAgICAgbm93YW5pID0gJ3hpemFvY2h1eGlhbidcclxuICAgICAgICB9IGVsc2UgaWYgKHVzZXIuY2xlYW5Wby5nZXRSb29tSXNUb0NsZWFuKCkpIHtcclxuICAgICAgICAgICAgLy/mlrDliqBcclxuICAgICAgICAgICAgbm93YW5pID0gJ3Nhb2RpY2h1eGlhbidcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGVUaXAoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm93YW5pKSB7XHJcbiAgICAgICAgICAgIERyYWdvblV0aWwucGxheSh0aGlzLl9kaXNwbGF5LCBub3dhbmksIDEpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25EcmFnb25EaXNwbGF5KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy5fZGlzcGxheSkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGFuaTogc3RyaW5nID0gdGhpcy5fZGlzcGxheS5hbmltYXRpb25OYW1lXHJcbiAgICAgICAgaWYgKGFuaSA9PSAnaGVrYWNodXhpYW4nKSB7XHJcbiAgICAgICAgICAgIERyYWdvblV0aWwucGxheSh0aGlzLl9kaXNwbGF5LCAnaGVrYXh1bmh1YW4nLCAwKVxyXG4gICAgICAgIH0gZWxzZSBpZiAoYW5pID09ICdyZWNpdmVoZWthY2h1eGlhbicpIHtcclxuICAgICAgICAgICAgRHJhZ29uVXRpbC5wbGF5KHRoaXMuX2Rpc3BsYXksICdyZWNpdmVoZWtheHVuaHVhbicsIDApXHJcbiAgICAgICAgfSBlbHNlIGlmIChhbmkgPT0gJ25ld2hla2FjaHV4aWFuJykge1xyXG4gICAgICAgICAgICBEcmFnb25VdGlsLnBsYXkodGhpcy5fZGlzcGxheSwgJ25ld2hla2F4dW5odWFuJywgMClcclxuICAgICAgICB9IGVsc2UgaWYgKGFuaSA9PSAnZWxlY2h1eGlhbicpIHtcclxuICAgICAgICAgICAgRHJhZ29uVXRpbC5wbGF5KHRoaXMuX2Rpc3BsYXksICdlbGV4dW5odWFuJywgMClcclxuICAgICAgICB9IGVsc2UgaWYgKGFuaSA9PSAna3VuY2h1eGlhbicpIHtcclxuICAgICAgICAgICAgRHJhZ29uVXRpbC5wbGF5KHRoaXMuX2Rpc3BsYXksICdrdW54dW5odWFuJywgMClcclxuICAgICAgICB9IGVsc2UgaWYgKGFuaSA9PSAneGl6YW9jaHV4aWFuJykge1xyXG4gICAgICAgICAgICBEcmFnb25VdGlsLnBsYXkodGhpcy5fZGlzcGxheSwgJ3hpemFveHVuaHVhbicsIDApXHJcbiAgICAgICAgfSBlbHNlIGlmIChhbmkgPT0gJ3Nhb2RpY2h1eGlhbicpIHtcclxuICAgICAgICAgICAgLy/mlrDliqBcclxuICAgICAgICAgICAgRHJhZ29uVXRpbC5wbGF5KHRoaXMuX2Rpc3BsYXksICdzYW9kaXh1bmh1YW4nLCAwKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChhbmkuaW5kZXhPZigneGlhb3NoaScpICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvL+a2iOWksemHjeaWsOajgOa1i1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVjaygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IEF1ZGlvTWdyIH0gZnJvbSBcInptZ19hdWRpb19tZ3JcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3JNZ3IgfSBmcm9tIFwiem1nX2NvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3JFdmVudCB9IGZyb20gXCJ6bWdfY29udHJvbGxlclwiO1xyXG5pbXBvcnQgeyBFdmVudE1nciB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50TmFtZSB9IGZyb20gXCJ6bWdfZXZlbnRfbWdyXCI7XHJcbmltcG9ydCB7IFJlc0xpc3RlbmVyLCBSZXNNZ3IgfSBmcm9tIFwiem1nX3Jlc19tZ3JcIjtcclxuaW1wb3J0IHsgQWN0b3IgfSBmcm9tIFwiem1nX3VpX21nclwiO1xyXG5pbXBvcnQgeyBnTG9nLCBTdHJpbmdVdGlsIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCBSb2xlVGlwcyBmcm9tIFwiLi4vY29tcC9Sb2xlVGlwc1wiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzICR6bUJhc2VTY2VuZSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XHJcbiAgICBwcml2YXRlIF9zY2VuZU5hbWU6IHN0cmluZztcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBcIuiDjOaZr+mfs+S5kFwiIH0pXHJcbiAgICBhdWRpb1BhdGg6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuX3NjZW5lTmFtZSA9IGNjLmRpcmVjdG9yLmdldFNjZW5lKCkubmFtZTtcclxuICAgICAgICB0aGlzLnBsYXlCZ2NsaXAoKTtcclxuICAgICAgICBnTG9nKFwiU2NlbmVOYW1lOiBcIiArIHRoaXMuX3NjZW5lTmFtZSArIFwiIG9uTG9hZGVkXCIpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9uKEV2ZW50TmFtZS5DT05UUk9MTEVSX0NIQU5HRV9FTkQsIHRoaXMub25TY2VuZUVuZCwgdGhpcywgZmFsc2UpO1xyXG5cclxuICAgIH1cclxuICAgIG9uRGVzdHJveSgpIHtcclxuICAgICAgICBnTG9nKFwiU2NlbmVOYW1lOiBcIiArIHRoaXMuX3NjZW5lTmFtZSArIFwiIG9uRGVzdHJveVwiKTtcclxuICAgICAgICBsZXQgZmFjdG9yeSA9IGRyYWdvbkJvbmVzLkNDRmFjdG9yeS5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIEV2ZW50TWdyLm9mZihFdmVudE5hbWUuQ09OVFJPTExFUl9DSEFOR0VfRU5ELCB0aGlzLm9uU2NlbmVFbmQsIHRoaXMpO1xyXG4gICAgICAgIGlmIChBY3RvcigpLm5vZGUpIHtcclxuICAgICAgICAgICAgQWN0b3IoKS5ub2RlLnJlbW92ZUNvbXBvbmVudChSb2xlVGlwcylcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uU2NlbmVFbmQoZXZ0OiBEaXJlY3RvckV2ZW50KTogdm9pZCB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBwbGF5QmdjbGlwKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChTdHJpbmdVdGlsLmlzVmFsaWQodGhpcy5hdWRpb1BhdGgpKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1ZGlvUGF0aCAhPSBEaXJlY3Rvck1nci5iZ2NsaXApIHtcclxuICAgICAgICAgICAgICAgIERpcmVjdG9yTWdyLmJnY2xpcCA9IHRoaXMuYXVkaW9QYXRoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiZXhwb3J0IGVudW0gJEdhbWVFdmVudCB7XHJcbiAgICAvKipcclxuICAgICAqIOWxj+W5leiwg+aVtOS6i+S7tlxyXG4gICAgICovXHJcbiAgICBWSUVXX1JFU0laRSA9ICd2aWV3cmVzaXplJyxcclxuICAgIE1BSU5fUkVBRFkgPSAnbWFpblJlYWR5JyxcclxuICAgIC8v5Zy65pmv5byA5aeL5Y+Y5YyWXHJcbiAgICBTQ0VORV9DSEFOR0UgPSAnc2NlbmVDaGFuZ2UnLFxyXG4gICAgLyoqXHJcbiAgICAgKiDmqKHlnZflj5HnlJ/lj5jljJZcclxuICAgICAqL1xyXG4gICAgTU9EVUxFX0NIQU5HRSA9IFwibW9kdWxlQ2hhbmdlXCIsXHJcbiAgICBDT1VOVF9ET1dOX09QRU4gPSAnY291bnREb3duT3BlbicsXHJcbiAgICBDT1VOVF9ET1dOX0NMT1NFID0gJ2NvdW50RG93bkNsb3NlJyxcclxuXHJcbiAgICAvL+WcuuaZr+W8gOWni+WPmOWMllxyXG4gICAgU0NFTkVfQkFDSyA9ICdzY2VuZUJhY2snLFxyXG4gICAgLyoqXHJcbiAgICAgKiDlpZblirHnibnmlYjnu5PmnZ9cclxuICAgICAqL1xyXG4gICAgUkVXQVJEX09WRVIgPSAncmV3YXJkT3ZlcicsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlvJXlr7znu5PmnZ9cclxuICAgICAqL1xyXG4gICAgR1VJREVfT1ZFUiA9ICdndWlkZU92ZXInLFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5byV5a+85aWW5Yqx57uT5p2f5ZCOXHJcbiAgICAgKi9cclxuICAgIEdVSURFX1JFV0FEX09WRVIgPSAnZ3VpZGVSZXdhZE92ZXInLFxyXG4gICAgLy/lnLrmma/lj5jljJbnu5PmnZ9cclxuICAgIFNDRU5FX0NIQU5HRV9DT01QTEVURSA9ICdzY2VuZUNoYW5nZUNvbXBsZXRlJyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOS4gOenkuinpuWPkeS4gOasoVxyXG4gICAgICovXHJcbiAgICBUSU1FX0NIQU5HRSA9ICd0aW1lQ2hhbmdlJyxcclxuICAgIC8qKlxyXG4gICAgICogNjBz6Kem5Y+R5LiA5qyhXHJcbiAgICAgKi9cclxuICAgIFRJTUVfQ0hFQ0sgPSAndGltZUNoZWNrJyxcclxuICAgIENBTVJSQV9SRVNJWkUgPSAnY2FtZXJhc2l6ZScsXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDlnoPlnL7mobbooqvop6bliqhcclxuICAgICAqL1xyXG4gICAgQlVDS0VUX0hJVCA9ICdidWNrZXRIaXQnLFxyXG4gICAgUlVCQklTSF9VSV9DSEFOR0UgPSAncnViYmlzaFVJQ2hhbmdlJyxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOWtpuS8tOaIv+mXtOebuOWFs+eKtuaAgeWPmOWMllxyXG4gICAgICovXHJcbiAgICBGUlVJVF9DSEFOR0UgPSAnZnJ1aXRDaGFuZ2UnLFxyXG4gICAgU0xFRVBfQ0hBTkdFID0gJ3NsZWVwQ2hhbmdlJyxcclxuICAgIFdBU0hfQ0hBTkdFID0gJ3dhc2hDaGFuZ2UnLFxyXG4gICAgRU5FUkdZX0NIQU5HRSA9ICdlbmVyZ3lDaGFuZ2UnLFxyXG4gICAgQ0xFQU5fQ0hBTkdFID0gJ2NsZWFuQ2hhbmdlJyxcclxuXHJcbiAgICAvL+acjeijheWPkeeUn+S6huWPmOWMllxyXG4gICAgQ0xPVEhfQ0hBTkdFID0gJ2Nsb3RoQ2hhbmdlJyxcclxuICAgIEdMX0NPTVBMRVRFID0gJ2dsQ29tcGxldGUnLFxyXG4gICAgR0xfQ0FOQ0VMID0gJ2dsQ2FuY2VsJyxcclxuXHJcbiAgICBIT01FX1JPTEVfQ09NUExFVEUgPSAnaG9tZVJvbGVDb21wbGV0ZScsXHJcbiAgICBQRVRfQ09NUExFVEUgPSAncGV0Q29tcGxldGUnLFxyXG5cclxuICAgIC8vcm9sZeS6i+S7tlxyXG4gICAgU1RBUlRfV0FMSyA9ICdzdGFydFdhbGsnLFxyXG5cclxuICAgIC8vcG9zdGVy5rW35oql5oKs5oyC5Yi35pawXHJcbiAgICBQT1NURVJfQ0hBTkdFID0gJ3Bvc3RlckNoYW5nZScsXHJcblxyXG59IiwiaW1wb3J0IHsgQXVkaW9NZ3IgfSBmcm9tIFwiem1nX2F1ZGlvX21nclwiO1xyXG5pbXBvcnQgeyBDb25maWdNZ3IgfSBmcm9tIFwiem1nX2NvbmZpZ19tZ3JcIjtcclxuaW1wb3J0IHsgRGlyZWN0b3JNZ3IgfSBmcm9tIFwiem1nX2NvbnRyb2xsZXJcIjtcclxuaW1wb3J0IHsgRW52TWdyIH0gZnJvbSBcInptZ19lbnZfbWdyXCI7XHJcbmltcG9ydCB7IEV2ZW50TWdyLCBFdmVudE5hbWUgfSBmcm9tIFwiem1nX2V2ZW50X21nclwiO1xyXG5pbXBvcnQgeyBEYXRhTWdyIH0gZnJvbSBcInptZ19nYW1lZGF0YV9tZ3JcIjtcclxuaW1wb3J0IHsgTW9kdWxlTWdyIH0gZnJvbSBcInptZ19tb2R1bGVfbWdyXCI7XHJcbmltcG9ydCB7IFJlc0xpc3RlbmVyLCBSZXNNZ3IgfSBmcm9tIFwiem1nX3Jlc19tZ3JcIjtcclxuaW1wb3J0IHsgVGltZU1nciB9IGZyb20gXCJ6bWdfdGltZV9tZ3JcIjtcclxuaW1wb3J0IHsgVUlNZ3IgfSBmcm9tIFwiem1nX3VpX21nclwiO1xyXG5pbXBvcnQgeyBEYXRlVXRpbCwgRGF0ZVV0aWxUeXBlLCBnTG9nIH0gZnJvbSBcInptZ191dGlsXCI7XHJcbmltcG9ydCB7IFNlcnZlck1nciB9IGZyb20gXCJ6bWdfd2Vic2VydmVyX21nclwiO1xyXG5pbXBvcnQgeyBfQXBwQnVuZGxlTmFtZSB9IGZyb20gXCIuLi9BcHBCdW5kbGVOYW1lXCI7XHJcbmltcG9ydCB7ICRHYW1lRXZlbnQgfSBmcm9tIFwiLi4vY29uc3RzL0dhbWVFdmVudFwiO1xyXG5pbXBvcnQgeyAkQ29tbWFuZHMgfSBmcm9tIFwiLi4vc2VydmVycy9jb21tYW5kcy9Db21tYW5kc1wiO1xyXG5pbXBvcnQgeyBfVXNlck1nciB9IGZyb20gXCIuLi91c2VyZGF0YXMvVXNlck1nclwiO1xyXG5cclxuaW1wb3J0IF9DYWlzVm8sIHsgJENhaXNMb2NhbFZvVHlwZSwgJENhaXNTZXJ2ZXJWb1R5cGUgfSBmcm9tIFwiLi9DYWlzVm9cIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBfQ2Fpc0NvbnRyb2wge1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIF9pbnN0YW5jZTogX0NhaXNDb250cm9sO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSguLi5hcmdzOiBhbnlbXSk6IF9DYWlzQ29udHJvbCB7XHJcbiAgICAgICAgaWYgKF9DYWlzQ29udHJvbC5faW5zdGFuY2UgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBfQ2Fpc0NvbnRyb2wuX2luc3RhbmNlID0gbmV3IF9DYWlzQ29udHJvbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gX0NhaXNDb250cm9sLl9pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgX2lzUmVzdCA9IGZhbHNlO1xyXG4gICAgc2V0IGlzUmVzdChiOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5faXNSZXN0ID0gYlxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBjYWlzVm8oKTogX0NhaXNWbyB7XHJcbiAgICAgICAgcmV0dXJuIF9DYWlzVm8uZ2V0SW5zdGFuY2UoKVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXJ0KCkge1xyXG4gICAgICAgIC8v5qOA5p+l6Ziy5rKJ6L+3XHJcbiAgICAgICAgU2VydmVyTWdyLnNlbmRHZXQoJENvbW1hbmRzLmdldFBsYXlBbmRSZXN0VGltZUNvbmZpZywgeyBjb25maWdJZDogMCB9LCAocmVzOiBXZWJTZXJ2ZXJWby5JUGxheUFuZFJlc3RUaW1lQ29uZmlnKSA9PiB7XHJcbiAgICAgICAgICAgIC8v6YCa55+l77yM5pyN5Yqh5Zmo5YeG5aSH5a6M5q+VXHJcbiAgICAgICAgICAgIHRoaXMuaW5pdChyZXMpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGVjaygpKSB7XHJcbiAgICAgICAgICAgICAgICAvL+i/m+WFpemYsuayiei/t1xyXG4gICAgICAgICAgICAgICAgLy9iYWNr55qE5pe25YCZ6IO95q2j56Gu6L+U5ZueXHJcbiAgICAgICAgICAgICAgICBNb2R1bGVNZ3IucmVjb3JkLnNldE5vdyhFbnZNZ3IuZ2V0RGVmYXVsdE1vZHVsZUFzc2V0KCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy/mnKrov5vlhaXpmLLmsonov7dcclxuICAgICAgICAgICAgICAgIE1vZHVsZU1nci5vcGVuRGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgRXZlbnRNZ3Iub24oRXZlbnROYW1lLkNPTlRST0xMRVJfQ0hBTkdFX0VORCwgKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgbSA9IE1vZHVsZU1nci5yZWNvcmQuZ2V0Tm93Q29uZmlnKCk7XHJcbiAgICAgICAgICAgIGlmIChtICYmIG0uY2xvc2VDb3VudERvd24pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpbml0KHJlczogV2ViU2VydmVyVm8uSVBsYXlBbmRSZXN0VGltZUNvbmZpZyk6IHZvaWQge1xyXG4gICAgICAgIGlmICghcmVzLnBsYXlUaW1lKSB7XHJcbiAgICAgICAgICAgIHJlcy5wbGF5VGltZSA9IHRoaXMuZ2V0RGVmYXVsdFBsYXlUaW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcmVzLnJlc3RUaW1lKSB7XHJcbiAgICAgICAgICAgIHJlcy5yZXN0VGltZSA9IHRoaXMuZ2V0RGVmYXVsdFJlc3RUaW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOa1i+ivlVxyXG4gICAgICAgIC8vIHRoaXMuY2Fpc1ZvLnJlc3RUaW1lID0gMTA7ICAgLy/kvJHmga/kuIDliIbpkp9cclxuICAgICAgICAvLyB0aGlzLmNhaXNWby5wbGF5VGltZSA9IDIwOyAvL+eOqTE456eSXHJcbiAgICAgICAgLy/mraPlvI9cclxuICAgICAgICB0aGlzLmNhaXNWby5yZXN0VGltZSA9IHJlcy5yZXN0VGltZSAqIDYwOy8v5o2i566X5Li656eSXHJcbiAgICAgICAgdGhpcy5jYWlzVm8ucGxheVRpbWUgPSByZXMucGxheVRpbWUgKiA2MDsvL+aNoueul+S4uuenklxyXG5cclxuICAgICAgICB0aGlzLnN0YXJ0RW5kKCk7XHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog6L+b5YWl6LaF6IO95a2m6Zmi562Jd2Vidmlld+eahOaXtuWAme+8jGNvY29z57O757uf5Lya5pqC5YGcXHJcbiAgICAgICAgICog5omA5Lul5LiN6IO95L2/55SoVGltZXJNZ3JcclxuICAgICAgICAgKi9cclxuICAgICAgICAvLyBUaW1lTWdyLmRvVGltZXIoMTAwMCwgdGhpcy5vblRpbWVyLCB0aGlzKTtcclxuICAgICAgICB3aW5kb3cuc2V0SW50ZXJ2YWwodGhpcy5vblRpbWVyLmJpbmQodGhpcyksIDEwMDApO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblRpbWVyKCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChfQ2Fpc1ZvLmdldEluc3RhbmNlKCkuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25UaW1lQ2hhbmdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIEV2ZW50TWdyLmVtaXQoJEdhbWVFdmVudC5USU1FX0NIQU5HRSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2Fpc1N0YXR1KG1vZHVsZTogem1nLklNb2R1bGVDb25maWcpIHtcclxuICAgICAgICBpZiAobW9kdWxlLmNsb3NlQ291bnREb3duKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2Fpc1ZvLmFjdGl2ZSA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuY2Fpc1ZvLnJlc3RUaW1lID0gMDtcclxuICAgICAgICAgICAgdGhpcy5jYWlzVm8ucGxheVRpbWUgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHBhdXNlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuY2Fpc1ZvLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBub3c6IERhdGUgPSBEYXRlVXRpbC5nZXROb3dEYXRlKCk7XHJcbiAgICAgICAgRGF0YU1nci5zZXJ2ZXIuc2V0SXRlbSgkQ2Fpc1NlcnZlclZvVHlwZS5MT0dJTiwgbm93LnZhbHVlT2YoKSk7XHJcbiAgICAgICAgLy8gRXZlbnRNZ3Iub2ZmKEdhbWVFdmVudC5USU1FX0NIQU5HRSwgdGhpcy5vblRpbWVDaGFuZ2UsIHRoaXMpXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnN0YXJ0RW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBzdGFydEVuZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jYWlzVm8uYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jYWlzVm8uYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICAvL+W9k+WJjeaXtumXtFxyXG4gICAgICAgIHZhciBub3c6IERhdGUgPSBEYXRlVXRpbC5nZXROb3dEYXRlKCk7XHJcblxyXG4gICAgICAgIC8v5LiK5LiA5qyh5pyA5ZCO5b+D6Lez5pe26Ze0XHJcbiAgICAgICAgdmFyIGxhc3RIZWFydDogeyBoZWFydDogbnVtYmVyLCByZWNvcmQ6IG51bWJlciB9ID0gRGF0YU1nci5sb2NhbC5nZXRJdGVtKCRDYWlzTG9jYWxWb1R5cGUuSEVBUlQpO1xyXG4gICAgICAgIGxhc3RIZWFydCA9IGxhc3RIZWFydCA/IGxhc3RIZWFydCA6IHsgaGVhcnQ6IDAsIHJlY29yZDogMCB9XHJcbiAgICAgICAgLy/nprvlvIDml7bpl7RcclxuICAgICAgICB2YXIgbGV2ZWwgPSB0aGlzLmRpc3RhbmNlKGxhc3RIZWFydC5oZWFydCwgbm93LnZhbHVlT2YoKSk7XHJcbiAgICAgICAgZ0xvZyhcIuemu+W8gOaXtumXtD09PT1cIiwgbGV2ZWwpXHJcbiAgICAgICAgLy/orr7nva7nmbvpmYbml7bpl7RcclxuICAgICAgICBEYXRhTWdyLnNlcnZlci5zZXRJdGVtKCRDYWlzU2VydmVyVm9UeXBlLkxPR0lOLCBub3cudmFsdWVPZigpKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICog56a75byA5pe26Ze06LaF6L+H5LyR5oGv5pe26Ze0XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgaWYgKGxldmVsID4gdGhpcy5jYWlzVm8ucmVzdFRpbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5yZXNldFRpbWVyKG5vdyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLyoq57Sv6K6h5ri45oiP5pe26Ze0ICovXHJcbiAgICAgICAgICAgIHZhciBwbGF5aW5nOiBudW1iZXJcclxuICAgICAgICAgICAgLy/mnIDlkI7kuIDmrKHlvIDlp4vnjqnnmoTml7bpl7RcclxuICAgICAgICAgICAgbGV0IHRpbWUgPSBEYXRhTWdyLnNlcnZlci5nZXRJdGVtKCRDYWlzU2VydmVyVm9UeXBlLkxBU1RfUExBWV9USU1FKVxyXG4gICAgICAgICAgICB2YXIgbGFzdFBsYXkgPSAoIXRpbWUpID8gbm93LnZhbHVlT2YoKSA6IHRpbWU7XHJcbiAgICAgICAgICAgIHBsYXlpbmcgPSB0aGlzLmRpc3RhbmNlKGxhc3RQbGF5LCBsYXN0SGVhcnQuaGVhcnQpO1xyXG4gICAgICAgICAgICB0aGlzLmNhaXNWby5sZXZlbFRpbWUgPSBsZXZlbDtcclxuICAgICAgICAgICAgaWYgKHBsYXlpbmcgPj0gdGhpcy5jYWlzVm8ucGxheVRpbWUpIHsvL+aYr+WQpuWkhOS6juS8keaBr+eKtuaAgVxyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWlzVm8ucGxheVJlY29yZCA9IGxhc3RIZWFydC5yZWNvcmQgKyBsZXZlbFxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWlzVm8ucGxheVJlY29yZCA9IGxhc3RIZWFydC5yZWNvcmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ0xvZyhcIuWJqeS9mea4uOaIj+aXtumXtDpcIiArICh0aGlzLmNhaXNWby5wbGF5UmVjb3JkIC0gdGhpcy5jYWlzVm8ucGxheVRpbWUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRXZlbnRNZ3Iub24oR2FtZUV2ZW50LlRJTUVfQ0hBTkdFLCB0aGlzLm9uVGltZUNoYW5nZSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlc2V0VGltZXIobm93PzogRGF0ZSwgcmVzdFRpbWU/OiBudW1iZXIsIHBsYXlUaW1lPzogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jYWlzVm8ubGV2ZWxUaW1lID0gMDtcclxuICAgICAgICB0aGlzLmNhaXNWby5jb3VudFRpbWUgPSAwO1xyXG4gICAgICAgIHRoaXMuY2Fpc1ZvLnBsYXlSZWNvcmQgPSAwO1xyXG4gICAgICAgIG5vdyA9IG5vdyA/IG5vdyA6IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdGhpcy5jYWlzVm8ucmVzdFRpbWUgPSByZXN0VGltZSA/IHJlc3RUaW1lICogNjAgOiB0aGlzLmNhaXNWby5yZXN0VGltZTtcclxuICAgICAgICB0aGlzLmNhaXNWby5wbGF5VGltZSA9IHBsYXlUaW1lID8gcGxheVRpbWUgKiA2MCA6IHRoaXMuY2Fpc1ZvLnBsYXlUaW1lO1xyXG4gICAgICAgIERhdGFNZ3IubG9jYWwuc2V0SXRlbSgkQ2Fpc0xvY2FsVm9UeXBlLkhFQVJULCB7IGhlYXJ0OiBub3cudmFsdWVPZigpLCByZWNvcmVkOiAwIH0pO1xyXG4gICAgICAgIERhdGFNZ3Iuc2VydmVyLnNldEl0ZW0oJENhaXNTZXJ2ZXJWb1R5cGUuTEFTVF9QTEFZX1RJTUUsIG5vdy52YWx1ZU9mKCkpO1xyXG4gICAgICAgIHRoaXMuY2xvc2VDb3VudERvd24oKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2hlY2soKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCFfVXNlck1nci5nZXRJbnN0YW5jZSgpLmlzQWRvcHRpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbm93OiBEYXRlID0gRGF0ZVV0aWwuZ2V0Tm93RGF0ZSgpO1xyXG4gICAgICAgIERhdGFNZ3IubG9jYWwuc2V0SXRlbSgkQ2Fpc0xvY2FsVm9UeXBlLkhFQVJULCB7IGhlYXJ0OiBub3cudmFsdWVPZigpLCByZWNvcmQ6IHRoaXMuY2Fpc1ZvLnBsYXlSZWNvcmQgfSk7XHJcbiAgICAgICAgLy/otoXlh7rmuLjmiI/ml7bpl7RcclxuICAgICAgICB2YXIgdGltZTogbnVtYmVyID0gdGhpcy5jYWlzVm8ucGxheVJlY29yZCAtIHRoaXMuY2Fpc1ZvLnBsYXlUaW1lO1xyXG4gICAgICAgIGlmICh0aW1lID49IDApIHtcclxuICAgICAgICAgICAgLy/ov5vlhaXpmLLmsonov7dcclxuICAgICAgICAgICAgaWYgKHRpbWUgPj0gdGhpcy5jYWlzVm8ucmVzdFRpbWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRUaW1lcigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWlzVm8uY291bnRUaW1lID0gdGhpcy5jYWlzVm8ucmVzdFRpbWUgLSB0aW1lO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1Jlc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICAvL+aJk+W8gOaooeWdl1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB0aW1lID0gRGF0YU1nci5zZXJ2ZXIuZ2V0SXRlbSgkQ2Fpc1NlcnZlclZvVHlwZS5MQVNUX1BMQVlfVElNRSlcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGltZURhdGUgPSBuZXcgRGF0ZSh0aW1lKVxyXG4gICAgICAgICAgICAgICAgICAgIGdMb2coXCLmnIDlkI7kuIDmrKHlvIDlp4vnjqnnmoTml7bpl7Q9PT09XCIsIERhdGVVdGlsLmZvcm1hdCh0aW1lRGF0ZSwgRGF0ZVV0aWxUeXBlLnl5eXlfTU1fZGRfSEhfbW1fc3MpKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzUmVzdCA9IHRydWVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhaXNWby5pc1RhbGtQbGF5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICBNb2R1bGVNZ3Iub3BlbkJ5Q29kZShfQXBwQnVuZGxlTmFtZS5DQUlTKTtcclxuICAgICAgICAgICAgICAgICAgICAvL+mAmuefpeaJgOacieiKgueCueW8gOWni+S8keaBr1xyXG4gICAgICAgICAgICAgICAgICAgIEV2ZW50TWdyLmVtaXQoJEdhbWVFdmVudC5DT1VOVF9ET1dOX09QRU4pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5jYWlzVm8uY291bnRUaW1lID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY2xvc2VDb3VudERvd24oKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX2lzUmVzdCkge1xyXG4gICAgICAgICAgICB0aGlzLl9pc1Jlc3QgPSBmYWxzZTtcclxuICAgICAgICAgICAgUmVzTWdyLmxvYWQoX0FwcEJ1bmRsZU5hbWUuQ0FJUywgXCJhdWRpby9nb3RvUGxheVwiLCBuZXcgUmVzTGlzdGVuZXIodGhpcywgKGNsaXA6IGNjLkF1ZGlvQ2xpcCwgbGlzOiB6bWcuSVJlc0xpc3RlbmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBBdWRpb01nci5wbGF5RWZmZWN0KGNsaXApO1xyXG4gICAgICAgICAgICAgICAgTW9kdWxlTWdyLnJlZnVyYmlzaCgpO1xyXG4gICAgICAgICAgICB9LCAocGF0aCwgbGlzOiB6bWcuSVJlc0xpc3RlbmVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBnTG9nKFwi5LiL6L295aSx6LSlOlwiICsgcGF0aCk7XHJcbiAgICAgICAgICAgIH0pKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0RGVmYXVsdFBsYXlUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgdmFyIGNvbmZpZyA9IHRoaXMuY2Fpc1ZvLkNhaXNTZXJ2ZXJEYXRhO1xyXG4gICAgICAgIHZhciBtaWQgPSBNYXRoLmZsb29yKGNvbmZpZ1tcInBsYXlUaW1lTGlzdFwiXS5sZW5ndGggLyAyKTtcclxuICAgICAgICB2YXIgcmVzOiBudW1iZXIgPSBjb25maWdbXCJwbGF5VGltZUxpc3RcIl1bbWlkXTtcclxuICAgICAgICByZXR1cm4gcmVzID8gcmVzIDogMTA7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXREZWZhdWx0UmVzdFRpbWUoKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgY29uZmlnID0gdGhpcy5jYWlzVm8uQ2Fpc1NlcnZlckRhdGE7XHJcbiAgICAgICAgdmFyIG1pZCA9IE1hdGguZmxvb3IoY29uZmlnW1wicmVzdFRpbWVMaXN0XCJdLmxlbmd0aCAvIDIpO1xyXG4gICAgICAgIHZhciByZXM6IG51bWJlciA9IGNvbmZpZ1tcInJlc3RUaW1lTGlzdFwiXVttaWRdO1xyXG4gICAgICAgIHJldHVybiByZXMgPyByZXMgOiAxMDtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIG9uVGltZUNoYW5nZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNhaXNWby5wbGF5UmVjb3JkKys7XHJcbiAgICAgICAgdGhpcy5jaGVjaygpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZGlzdGFuY2UoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLm1heChNYXRoLmZsb29yKChiIC0gYSkgLyAxMDAwKSwgMCk7XHJcbiAgICB9XHJcblxyXG59IiwiaW1wb3J0IHsgRURldmljZSwgRW52TWdyIH0gZnJvbSBcInptZ19lbnZfbWdyXCI7XHJcbmltcG9ydCB7IF9Nc2dCcmlkZ2UgfSBmcm9tIFwiLi9icmlkZ2UvTXNnQnJpZGdlXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBfUm91dGVyIHtcclxuXHJcbiAgICBwcml2YXRlIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdDogX1JvdXRlciA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IF9Sb3V0ZXIge1xyXG4gICAgICAgIGlmICh0aGlzLl9pbnN0ID09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5faW5zdCA9IG5ldyBfUm91dGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnN0O1xyXG4gICAgfVxyXG5cclxuICAgIGp1bXBUbyhkYXRhOiBhbnkpIHtcclxuICAgICAgICBpZiAoRW52TWdyLmdldERldmljZSgpID09IEVEZXZpY2UuUEMpIHtcclxuICAgICAgICAgICAgX01zZ0JyaWRnZS5nZXRJbnN0YW5jZSgpLnNlbmRNc2dUb0NsaWVudCgnZ290b1BhZ2UnLCBkYXRhKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBfTXNnQnJpZGdlLmdldEluc3RhbmNlKCkuc2VuZE1zZ1RvQ2xpZW50KGRhdGEsIG51bGwsICdwYWdlSW4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8vanNi6Lez6L2s44CK57uD5Lmg6aG16Z2i44CLXHJcbiAgICBqc2JKdW1wVG9QcmFjdGlzZShyZXFJbmZvOiBhbnkpIHtcclxuICAgICAgICAvLyBmb3IgdGVzdGluZ1xyXG4gICAgICAgIC8vIGxldCByZXFJbmZvID0ge1xyXG4gICAgICAgIC8vICAgICAgICAgaG9tZXdvcmtTb3VyY2Xlhpnmrbsx77yMXHJcbiAgICAgICAgLy8gaG9tZXdvcmtUeXBlIDEg5piv6ZqP5aCCICAy5piv5ouT5bGVXHJcbiAgICAgICAgLy8gfTtcclxuICAgICAgICAvLyBsZXQgcmVxID0gXCJaTUtpZHNQYWQ6Ly9ob21ld29ya1ptZz9ob21ld29ya1NvdXJjZT1cIiArIHJlcUluZm9bJ2hvbWV3b3JrU291cmNlJ11cclxuICAgICAgICAvLyAgICAgKyBcIiZob21ld29ya0lkPVwiICsgcmVxSW5mb1snaG9tZXdvcmtJZCddXHJcbiAgICAgICAgLy8gICAgICsgXCImaG9tZXdvcmtUeXBlPVwiICsgcmVxSW5mb1snaG9tZXdvcmtUeXBlJ107XHJcbiAgICAgICAgLy8gTXNnQnJpZGdlLnNlbmRNc2dUb0NsaWVudCgncGFnZUluJywgcmVxKTtcclxuXHJcbiAgICAgICAgbGV0IHJlcSA9IFwiWk1LaWRzUGFkOi8vaG9tZXdvcms/dXJsPVwiICsgcmVxSW5mb1sndXJsJ107XHJcblxyXG4gICAgICAgIHRoaXMuanVtcFRvKHJlcSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9qc2Lot7PovazjgIpBSSDlvZXmkq3or77pobXpnaLjgItcclxuICAgIGpzYkp1bXBUb0FJUmVjb3JkKHJlcUluZm86IGFueSkge1xyXG4gICAgICAgIC8vIGZvciB0ZXN0aW5nXHJcbiAgICAgICAgLy8gWk1LaWRzUGFkOi8vbGVhcm5pbmdQYXJrUmVjb3JkUm9vbT90eXBlPTImbGVzc29uVWlkPVJFQ09SRC1hNjhjZjEzYWFhNDMzNWY0YWM5Y2U4ZmIzOTg3YmYwNiZyZWNvcmRJZD1FMTNBMTE3MDY2MDI0QTI0QThCREM0QTQ2RDBDQjc0QSZwbGFuSWQ9MTkxJnByb2R1Y3RJZD0xMCZjb250ZW50SWQ9ODQ3MTlcclxuICAgICAgICAvLyB0eXBlIO+8iOi/nuaOpXNvY2tldOeUqO+8iVxyXG4gICAgICAgIC8vIGxlc3NvblVpZCDvvIjov57mjqVzb2NrZXTnlKjvvIlcclxuICAgICAgICAvLyB0ZWFjaGVyTmFtZVxyXG4gICAgICAgIC8vIHJlY29yZElkIO+8iOiOt+WPluivvuS7tueUqO+8iVxyXG4gICAgICAgIC8vIHByb2R1Y3RJZCDvvIjpgI/kvKDvvIznlKjmiLfkv53lrZjorrDlvZXmjqXlj6PlhaXlj4LvvIlcclxuICAgICAgICAvLyBwbGFuSWTvvIjpgI/kvKDvvIznlKjmiLfkv53lrZjorrDlvZXmjqXlj6PlhaXlj4LvvIlcclxuICAgICAgICAvLyBjb250ZW50SWTvvIjpgI/kvKDvvIznlKjmiLfkv53lrZjorrDlvZXmjqXlj6PlhaXlj4LvvIlcclxuICAgICAgICBsZXQgcmVxID0gXCJaTUtpZHNQYWQ6Ly9sZWFybmluZ1BhcmtSZWNvcmRSb29tP3R5cGU9XCIgKyByZXFJbmZvWyd0eXBlJ11cclxuICAgICAgICAgICAgKyBcIiZsZXNzb25VaWQ9XCIgKyByZXFJbmZvWydsZXNzb25VaWQnXVxyXG4gICAgICAgICAgICArIFwiJnRlYWNoZXJOYW1lPVwiICsgcmVxSW5mb1sndGVhY2hlck5hbWUnXVxyXG4gICAgICAgICAgICArIFwiJnJlY29yZElkPVwiICsgcmVxSW5mb1sncmVjb3JkSWQnXVxyXG4gICAgICAgICAgICArIFwiJnByb2R1Y3RJZD1cIiArIHJlcUluZm9bJ3Byb2R1Y3RJZCddXHJcbiAgICAgICAgICAgICsgXCImcGxhbklkPVwiICsgcmVxSW5mb1sncGxhbklkJ11cclxuICAgICAgICAgICAgKyBcIiZjb250ZW50SWQ9XCIgKyByZXFJbmZvWydjb250ZW50SWQnXTtcclxuICAgICAgICB0aGlzLmp1bXBUbyhyZXEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vanNi6Lez6L2s44CKQUkg55u05pKt6K++6aG16Z2i44CLXHJcbiAgICBqc2JKdW1wVG9BSUJyb2FkY2FzdChyZXFJbmZvOiBhbnkpIHtcclxuICAgICAgICAvLyBmb3IgdGVzdGluZ1xyXG4gICAgICAgIC8vIFpNS2lkc1BhZDovL2FpQ2xhc3M/dHlwZT0xJmxlc3NvbklkPTEmc3ViamVjdE5hbWU96K++56iL5ZCN56ewXHJcbiAgICAgICAgbGV0IHJlcSA9IFwiWk1LaWRzUGFkOi8vYWlDbGFzcz90eXBlPVwiICsgcmVxSW5mb1sndHlwZSddXHJcbiAgICAgICAgICAgICsgXCImbGVzc29uSWQ9XCIgKyByZXFJbmZvWydsZXNzb25JZCddXHJcbiAgICAgICAgICAgICsgXCImc3ViamVjdE5hbWU9XCIgKyByZXFJbmZvWydzdWJqZWN0TmFtZSddO1xyXG4gICAgICAgIHRoaXMuanVtcFRvKHJlcSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9qc2Lot7PovazjgIrpooTkuaDpobXpnaLjgItcclxuICAgIGpzYkp1bXBUb1ByZXZpZXcocmVxSW5mbzogYW55KSB7XHJcbiAgICAgICAgLy8gZm9yIHRlc3RpbmdcclxuICAgICAgICAvLyBaTUtpZHNQYWQ6Ly9wcmV2aWV3Q291cnNld2FyZUluQUlDbGFzcz9sZXNzb25JZCA9IFhYJmNvbnRlbnRJZD14eCZsZXNzb25UeXBlPXh4JnBsYW5JZD14eCZwcm9kdWN0SWQ9eHhcclxuICAgICAgICBsZXQgcmVxID0gXCJaTUtpZHNQYWQ6Ly9wcmV2aWV3Q291cnNld2FyZUluQUlDbGFzcz9sZXNzb25JZD1cIiArIHJlcUluZm9bJ2xlc3NvbklkJ11cclxuICAgICAgICAgICAgKyBcIiZjb250ZW50SWQ9XCIgKyByZXFJbmZvWydjb250ZW50SWQnXVxyXG4gICAgICAgICAgICArIFwiJmxlc3NvblR5cGU9XCIgKyByZXFJbmZvWydsZXNzb25UeXBlJ11cclxuICAgICAgICAgICAgKyBcIiZwbGFuSWQ9XCIgKyByZXFJbmZvWydwbGFuSWQnXVxyXG4gICAgICAgICAgICArIFwiJnByb2R1Y3RJZD1cIiArIHJlcUluZm9bJ3Byb2R1Y3RJZCddO1xyXG4gICAgICAgIHRoaXMuanVtcFRvKHJlcSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy9wY+i3s+i9rOOAiue7g+S5oOmhtemdouOAi1xyXG4gICAgcGNKdW1wVG9QcmFjdGlzZShyZXFJbmZvOiBhbnkpIHtcclxuICAgICAgICBfTXNnQnJpZGdlLmdldEluc3RhbmNlKCkuc2VuZE1zZ1RvQ2xpZW50KCdob21ld29yaycsIHJlcUluZm8pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vcGPot7PovazjgIpBSSDlvZXmkq3or77pobXpnaLjgItcclxuICAgIHBjSnVtcFRvQUlSZWNvcmQocmVxSW5mbzogYW55KSB7XHJcbiAgICAgICAgX01zZ0JyaWRnZS5nZXRJbnN0YW5jZSgpLnNlbmRNc2dUb0NsaWVudCgnc3VwZXJUb3BpY0xpc3QnLCByZXFJbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3Bj6Lez6L2s44CKQUkg55u05pKt6K++6aG16Z2i44CLXHJcbiAgICBwY0p1bXBUb0FJQnJvYWRjYXN0KHJlcUluZm86IGFueSkge1xyXG4gICAgICAgIF9Nc2dCcmlkZ2UuZ2V0SW5zdGFuY2UoKS5zZW5kTXNnVG9DbGllbnQoJ3N1cGVyQ29sbGVnZUFpQ2xhc3MnLCByZXFJbmZvKTtcclxuICAgIH1cclxuXHJcbiAgICAvL3Bj6Lez6L2s44CK6aKE5Lmg6aG16Z2i44CLXHJcbiAgICBwY0p1bXBUb1ByZXZpZXcocmVxSW5mbzogYW55KSB7XHJcbiAgICAgICAgLy8g5pqC5pe25LiN5LygXHJcbiAgICAgICAgLy8gTXNnQnJpZGdlLnNlbmRNc2dUb0NsaWVudCgnLS0tJywgcmVxSW5mbyk7XHJcbiAgICAgICAgLy8gdGhpcy5qdW1wVG8ocmVxSW5mbyk7XHJcbiAgICB9XHJcbn1cclxuIiwiZXhwb3J0IGVudW0gJEVMb2NhbEFwcEtleSB7XHJcbiAgICAvKipcclxuICAgICAqIOaYr+WQpuW8leWvvOi/h+inhumikVxyXG4gICAgICovXHJcbiAgICBJU19HVUlMRF9WSURFTyA9IFwiaXNHdWlsZFZpZGVvXCIsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBideW5s+WPsOexu+Wei1xyXG4gKi9cclxuZXhwb3J0IGVudW0gJEJVX1RZUEUge1xyXG4gICAgWk0gPSBcIjJcIixcclxuICAgIEFMSSA9IFwiNFwiLFxyXG4gICAgWjFWMSA9IFwiMVwiLFxyXG59XHJcblxyXG4vKipcclxuICogYnXlubPlj7DlkI3np7BcclxuICovXHJcbmV4cG9ydCBlbnVtICRCVV9OQU1FIHtcclxuICAgIFpNID0gXCJ6bVwiLFxyXG4gICAgQUxJID0gXCJhbGlcIixcclxuICAgIFoxVjEgPSBcIjF2MVwiLFxyXG59IiwiXHJcbmltcG9ydCBSZXNvbHV0aW9uIGZyb20gXCIuL1Jlc29sdXRpb25cIjtcclxuXHJcbi8v5bGP5bmV5pa55ZCR77yM5bCP5ri45oiP5Lit5Y+q5pyJ5Lik56eN44CC56uW5bGP5ZKM5bem5qiq5bGPXHJcbmV4cG9ydCBlbnVtIE9yaWVudGF0aW9uVHlwZSB7XHJcbiAgICBQb3J0cmFpdCxcclxuICAgIExhbmRzY2FwZSxcclxuICAgIFJpZ2h0TGFuZHNjYXBlLCAvLyDmmoLml7bov5jkuI3mlK/mjIHjgIJcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzICRPcmllbnRhdGlvbiB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBfaXNPcmllbnRhdGlvbkgodmFsOiBPcmllbnRhdGlvblR5cGUpIHtcclxuICAgICAgICB2YXIgZnJhbWVTaXplID0gY2Mudmlldy5nZXRGcmFtZVNpemUoKTtcclxuICAgICAgICBpZiAodmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmcmFtZVNpemUuaGVpZ2h0IDwgZnJhbWVTaXplLndpZHRoO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmcmFtZVNpemUuaGVpZ2h0ID4gZnJhbWVTaXplLndpZHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgLy8gdHJ1ZSDmmK/liIfmjaLliLDmqKrlsY9mYWxzZSDmmK/liIfmjaLliLDnq5blsY9cclxuICAgIHN0YXRpYyBjaGFuZ2VPcmllbnRhdGlvbih2YWw6IE9yaWVudGF0aW9uVHlwZSwgY2IpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuX2lzT3JpZW50YXRpb25IKHZhbCkpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIg5bey57uP5piv56uW5bGP5ri45oiPXCIpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWwgPT0gT3JpZW50YXRpb25UeXBlLkxhbmRzY2FwZSkge1xyXG4gICAgICAgICAgICBSZXNvbHV0aW9uLm9yaWVudGF0aW9uID0gT3JpZW50YXRpb25UeXBlLkxhbmRzY2FwZVxyXG4gICAgICAgICAgICBjYy52aWV3LnNldE9yaWVudGF0aW9uKGNjLm1hY3JvLk9SSUVOVEFUSU9OX0xBTkRTQ0FQRSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgUmVzb2x1dGlvbi5vcmllbnRhdGlvbiA9IE9yaWVudGF0aW9uVHlwZS5Qb3J0cmFpdFxyXG4gICAgICAgICAgICBjYy52aWV3LnNldE9yaWVudGF0aW9uKGNjLm1hY3JvLk9SSUVOVEFUSU9OX1BPUlRSQUlUKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICBjYigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IHsgT3JpZW50YXRpb25UeXBlIH0gZnJvbSBcIi4vT3JpZW50YXRpb25cIjtcclxuXHJcblxyXG4vL+i/memHjOa3u+WKoOW3suefpeWImOa1t+acuuWei1xyXG5sZXQgdG9wQmFuZ01hY2hpbmVzID0gW1xyXG4gICAgeyBtYXRjaE5hbWU6IFwiaVBob25lIFhcIiwgdG9wT2Zmc2V0OiA1MCB9LFxyXG4gICAgeyBtYXRjaE5hbWU6IFwidml2byBYMjFBXCIsIHRvcE9mZnNldDogNTAgfSxcclxuXTtcclxuLy/ov5nph4zmt7vliqDlt7Lnn6XlupXpg6jmqKrmnaHmnLrlnotcclxubGV0IGJvdHRvbUJhck1hY2hpbmVzID0gW1xyXG4gICAgeyBtYXRjaE5hbWU6IFwiaVBob25lIFhcIiwgYm90dG9tT2Zmc2V0OiAzMCB9LFxyXG4gICAgeyBtYXRjaE5hbWU6IFwidml2byBYMjFBXCIsIGJvdHRvbU9mZnNldDogMzAgfSxcclxuICAgIHsgbWF0Y2hOYW1lOiBcIk00IFByb1wiLCBib3R0b21PZmZzZXQ6IDMwIH0sXHJcbiAgICB7IG1hdGNoTmFtZTogXCJNNDYzQ1wiLCBib3R0b21PZmZzZXQ6IDMwIH0sXHJcbiAgICB7IG1hdGNoTmFtZTogXCJNMzUxXCIsIGJvdHRvbU9mZnNldDogMzAgfSxcclxuXTtcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgJFJlc29sdXRpb24ge1xyXG5cclxuICAgIHN0YXRpYyBmcmFtZVNpemU7ICAvLyDlsY/luZXpgJDluKflpKflsI9cclxuICAgIHN0YXRpYyBkZXNpZ25TaXplOyAvLyDorr7orqHlpKflsI9cclxuXHJcbiAgICBzdGF0aWMgZnJhbWVBc3BlY3RSYXRpbztcclxuICAgIHN0YXRpYyBzY3JlZW5TaXplO1xyXG5cclxuICAgIHN0YXRpYyBkZXNpZ25Bc3BlY3RSYXRpbztcclxuICAgIHN0YXRpYyBvcmllbnRhdGlvbjtcclxuICAgIHN0YXRpYyBpc0Z1bGxTY3JlZW47XHJcblxyXG4gICAgc3RhdGljIG9mZnNldCA9IFtdO1xyXG4gICAgc3RhdGljIGluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5mcmFtZVNpemUgPSBjYy52aWV3LmdldEZyYW1lU2l6ZSgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5bGP5bmV5a696auYIDogXCIsIHRoaXMuZnJhbWVTaXplLndpZHRoLCB0aGlzLmZyYW1lU2l6ZS5oZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuZGVzaWduU2l6ZSA9IGNjLkNhbnZhcy5pbnN0YW5jZS5kZXNpZ25SZXNvbHV0aW9uO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2FudmFz5a696auYIDogXCIsIHRoaXMuZGVzaWduU2l6ZS53aWR0aCwgdGhpcy5kZXNpZ25TaXplLmhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5mcmFtZUFzcGVjdFJhdGlvID0gdGhpcy5mcmFtZVNpemUud2lkdGggLyB0aGlzLmZyYW1lU2l6ZS5oZWlnaHQ7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCLlsY/luZXlrr3pq5jmr5Q6IFwiLCB0aGlzLmZyYW1lQXNwZWN0UmF0aW8pO1xyXG4gICAgICAgIHRoaXMuZGVzaWduQXNwZWN0UmF0aW8gPSB0aGlzLmRlc2lnblNpemUud2lkdGggLyB0aGlzLmRlc2lnblNpemUuaGVpZ2h0O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2FudmFz5a696auY5q+UOiBcIiwgdGhpcy5kZXNpZ25Bc3BlY3RSYXRpbyk7XHJcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9IHRoaXMuZGVzaWduU2l6ZS5oZWlnaHQgPiB0aGlzLmRlc2lnblNpemUud2lkdGggPyBPcmllbnRhdGlvblR5cGUuUG9ydHJhaXQgOiBPcmllbnRhdGlvblR5cGUuTGFuZHNjYXBlO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5bGP5bmV5qiq56uW5bGPOiBcIiwgdGhpcy5vcmllbnRhdGlvbik7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+WPr+inhuWuvemrmCAnLCBjYy52aWV3LmdldFZpc2libGVTaXplKCkud2lkdGgsIGNjLnZpZXcuZ2V0VmlzaWJsZVNpemUoKS5oZWlnaHQpO1xyXG5cclxuICAgICAgICBsZXQgUjEgPSB0aGlzLmZyYW1lU2l6ZS53aWR0aCAvIHRoaXMuZnJhbWVTaXplLmhlaWdodFxyXG4gICAgICAgIGxldCBSMiA9IDExMzYgLyA2NDBcclxuICAgICAgICB0aGlzLmlzRnVsbFNjcmVlbiA9IFIxID4gUjI7XHJcbiAgICAgICAgaWYgKE1hdGguYWJzKFIxIC0gUjIpIDwgMC4yKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNGdWxsU2NyZWVuID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRPZmZzZXQoKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICog5LyY5YWI5qC55o2u6K6+6YWN5ZCN56ew5YGa6YCC6YWN77yM5aaC5p6c5LiN55+l6YGT55qE5qC55o2u5YiG6L6o546H6YCC6YWN44CCXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBzZXRPZmZzZXQoKSB7XHJcbiAgICAgICAgbGV0IGRlbHRhQXNwZWN0UmF0aW8gPSAxIC8gJFJlc29sdXRpb24uZGVzaWduQXNwZWN0UmF0aW8gLSAxIC8gJFJlc29sdXRpb24uZnJhbWVBc3BlY3RSYXRpbztcclxuICAgICAgICBjYy5sb2coXCJkZWx0YUFzcGVjdFJhdGlvICBcIiwgZGVsdGFBc3BlY3RSYXRpbyk7XHJcbiAgICAgICAgbGV0IG1hY2hpbmUgPSBudWxsO1xyXG4gICAgICAgIGlmIChjYy5zeXMucGxhdGZvcm0gPT0gY2Muc3lzLldFQ0hBVF9HQU1FKSB7XHJcbiAgICAgICAgICAgIC8vIG1hY2hpbmUgPSB3eC5nZXRTeXN0ZW1JbmZvU3luYygpLm1vZGVsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8v5YW25LuW5bmz5Y+wLCDpnIDopoHmg7Plip7ms5Xmi7/liLDmnLrlnovkv6Hmga9cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHRvcE9mZnNldCA9IDA7XHJcbiAgICAgICAgaWYgKG1hY2hpbmUpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b3BCYW5nTWFjaGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChtYWNoaW5lLnNlYXJjaCh0b3BCYW5nTWFjaGluZXNbaV0ubWF0Y2hOYW1lKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wT2Zmc2V0ID0gdG9wQmFuZ01hY2hpbmVzW2ldLnRvcE9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRvcE9mZnNldCA9PT0gMCAmJiBkZWx0YUFzcGVjdFJhdGlvID4gMCkge1xyXG4gICAgICAgICAgICB0b3BPZmZzZXQgPSBkZWx0YUFzcGVjdFJhdGlvICogMTUwO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkUmVzb2x1dGlvbi5vZmZzZXRbMF0gPSB0b3BPZmZzZXQ7XHJcblxyXG4gICAgICAgIGxldCBib3R0b21PZmZzZXQgPSAwO1xyXG4gICAgICAgIGlmIChtYWNoaW5lKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm90dG9tQmFyTWFjaGluZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChtYWNoaW5lLnNlYXJjaChib3R0b21CYXJNYWNoaW5lc1tpXS5tYXRjaE5hbWUpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICBib3R0b21PZmZzZXQgPSBib3R0b21CYXJNYWNoaW5lc1tpXS5ib3R0b21PZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGJvdHRvbU9mZnNldCA9PT0gMCAmJiBkZWx0YUFzcGVjdFJhdGlvID4gMCkge1xyXG4gICAgICAgICAgICBib3R0b21PZmZzZXQgPSBkZWx0YUFzcGVjdFJhdGlvICogMTA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRSZXNvbHV0aW9uLm9mZnNldFsxXSA9IGJvdHRvbU9mZnNldDtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXRPZmZzZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuICRSZXNvbHV0aW9uLm9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgc2V0Um9vdChyb290OiBjYy5Ob2RlKSB7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMuZ2V0T2Zmc2V0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT0gT3JpZW50YXRpb25UeXBlLlBvcnRyYWl0KSB7XHJcbiAgICAgICAgICAgIHJvb3QuaGVpZ2h0IC09IG9mZnNldFswXTtcclxuICAgICAgICAgICAgcm9vdC5oZWlnaHQgLT0gb2Zmc2V0WzFdO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByb290LndpZHRoIC09IG9mZnNldFswXTtcclxuICAgICAgICAgICAgcm9vdC53aWR0aCAtPSBvZmZzZXRbMV07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi8vIExlYXJuIFR5cGVTY3JpcHQ6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3R5cGVzY3JpcHQuaHRtbFxyXG4vLyBMZWFybiBBdHRyaWJ1dGU6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcclxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XHJcbi8vICAtIGh0dHBzOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvZW4vc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcclxuXHJcbmltcG9ydCBCYXNlQWRhcHQgZnJvbSBcIi4vQmFzZUFkYXB0XCI7XHJcbmltcG9ydCBSZXNvbHV0aW9uIGZyb20gXCIuL1Jlc29sdXRpb25cIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyAkQnRuQWRhcHQgZXh0ZW5kcyBCYXNlQWRhcHQge1xyXG4gICAgQHByb3BlcnR5KHsgdG9vbHRpcDogXCLlhajpnaLlsY/kuIvmmK/lkKbmmK/liqDplb/lrr3pgILphY1cIiB9KVxyXG4gICAgaXNBZGRXaWR0aDogYm9vbGVhbiA9IHRydWVcclxuXHJcbiAgICBAcHJvcGVydHkoeyB0b29sdGlwOiBcIuWFqOmdouWxj+S4i+aYr+WQpuaYr+S/neaMgeaMiemSruinhuWbvuWkp+Wwj1wiIH0pXHJcbiAgICBpc09yZ2luU2l6ZTogYm9vbGVhbiA9IGZhbHNlXHJcblxyXG4gICAgYWRhcHQoKSB7XHJcbiAgICAgICAgbGV0IHdpZGdodCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KVxyXG4gICAgICAgIGxldCB0b3AgPSB3aWRnaHQudG9wXHJcbiAgICAgICAgbGV0IGxlZnQgPSB3aWRnaHQubGVmdFxyXG4gICAgICAgIGxldCByaWdodCA9IHdpZGdodC5yaWdodFxyXG4gICAgICAgIGxldCBib3R0b20gPSB3aWRnaHQuYm90dG9tXHJcbiAgICAgICAgaWYgKFJlc29sdXRpb24uaXNGdWxsU2NyZWVuICYmICF3aWRnaHRbJ2lzQWRhcHQnXSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc0FkZFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAod2lkZ2h0LmxlZnQgIT0gMClcclxuICAgICAgICAgICAgICAgICAgICB3aWRnaHQubGVmdCA9IGxlZnQgKyAzMFxyXG4gICAgICAgICAgICAgICAgaWYgKHdpZGdodC5yaWdodCAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdodC5yaWdodCA9IHJpZ2h0ICsgMzBcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICh3aWRnaHQudG9wICE9IDApXHJcbiAgICAgICAgICAgICAgICAgICAgd2lkZ2h0LnRvcCA9IHRvcCArIDE1XHJcbiAgICAgICAgICAgICAgICBpZiAod2lkZ2h0LmJvdHRvbSAhPSAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHdpZGdodC5ib3R0b20gPSBib3R0b20gKyAxNVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHdpZGdodFsnaXNBZGFwdCddID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5pc09yZ2luU2l6ZSkge1xyXG4gICAgICAgICAgICAvL+aNoueul+avlOS+i1xyXG4gICAgICAgICAgICBsZXQgcmF0aW8gPSBSZXNvbHV0aW9uLmZyYW1lQXNwZWN0UmF0aW8gLyBSZXNvbHV0aW9uLmRlc2lnbkFzcGVjdFJhdGlvXHJcbiAgICAgICAgICAgIGxldCBzY2FsZVRlbXBYID0gdGhpcy5ub2RlLnNjYWxlWCAqIHJhdGlvXHJcbiAgICAgICAgICAgIGxldCBzY2FsZVRlbXBZID0gdGhpcy5ub2RlLnNjYWxlWSAqIHJhdGlvXHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGVbJ29sZFNjYWxlWCddICE9IHVuZGVmaW5lZCAmJiB0aGlzLm5vZGVbJ29sZFNjYWxlWSddICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc2NhbGVUZW1wWCA9IHRoaXMubm9kZVsnb2xkU2NhbGVYJ10gKiByYXRpb1xyXG4gICAgICAgICAgICAgICAgc2NhbGVUZW1wWSA9IHRoaXMubm9kZVsnb2xkU2NhbGVZJ10gKiByYXRpb1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlWydvbGRTY2FsZVgnXSA9IHRoaXMubm9kZS5zY2FsZVhcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZVsnb2xkU2NhbGVZJ10gPSB0aGlzLm5vZGUuc2NhbGVZXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5ub2RlLnNldFNjYWxlKE1hdGgubWF4KHNjYWxlVGVtcFgsIDAuOSksIE1hdGgubWF4KHNjYWxlVGVtcFksIDAuOSkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpZGdodC51cGRhdGVBbGlnbm1lbnQoKTtcclxuXHJcbiAgICB9XHJcblxyXG59XHJcbiIsImltcG9ydCBSZXNvbHV0aW9uIGZyb20gXCIuL1Jlc29sdXRpb25cIjtcclxuaW1wb3J0IHsgT3JpZW50YXRpb25UeXBlIH0gZnJvbSBcIi4vT3JpZW50YXRpb25cIjtcclxuaW1wb3J0IEJhc2VBZGFwdCBmcm9tIFwiLi9CYXNlQWRhcHRcIjtcclxuXHJcblxyXG5jb25zdCBBZGFwdFRhcmdldCA9IGNjLkVudW0oe1xyXG4gICAgTm9uZTogMCxcclxuICAgIEFkYXB0UG9zRm9yVG9wQmFuZzogMSwgICAgICAgICAgLy/pkojlr7npobbpg6jliJjmtbfvvIzpgILphY3lhYPntKDkvY3nva7vvIzpgJrov4fosIPmlbRXaWRnZXTlsZ7mgKco56uW5bGP5b6A5LiL56e777yM5bem5qiq5bGP5b6A5Y+z56e7KVxyXG4gICAgQWRhcHRQb3NGb3JCb3R0b21CYXI6IDIsICAgICAgICAvL+mSiOWvueW6lemDqOaoquadoe+8jOmAgumFjeWFg+e0oOS9jee9ru+8jOmAmui/h+iwg+aVtFdpZGdldOWxnuaApyjnq5blsY/lvoDkuIrnp7vvvIzlt6bmqKrlsY/lvoDlt6bnp7spXHJcbiAgICBBZGFwdFNpemVGb3JUb3BCYW5nOiAzLCAgICAgICAgIC8v6ZKI5a+56aG26YOo5YiY5rW377yM6YCC6YWN5YWD57Sg5aSn5bCP77yMKOerluWxj+W+gOS4i+aLiemrmO+8jOW3puaoquWxj+W+gOWPs+aLieWuvSlcclxuICAgIEFkYXB0U2l6ZUZvckJvdHRvbUJhcjogNCwgICAgICAgLy/pkojlr7nlupXpg6jmqKrmnaHvvIzpgILphY3lhYPntKDlpKflsI/vvIwo56uW5bGP5b6A5LiK5ouJ6auY77yM5bem5qiq5bGP5b6A5bem5ouJ5a69KVxyXG59KTtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XHJcblxyXG5AY2NjbGFzc1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyAkQmFzZVVJIGV4dGVuZHMgQmFzZUFkYXB0IHtcclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdHlwZTogQWRhcHRUYXJnZXRcclxuICAgIH0pXHJcbiAgICB0YXJnZXQgPSBBZGFwdFRhcmdldC5BZGFwdFBvc0ZvclRvcEJhbmc7XHJcblxyXG4gICAgQHByb3BlcnR5KHtcclxuICAgICAgICB0b29sdGlwOiBcIuaYr+WQpuimgemAgumFjeaOp+S7tuWkp+Wwj1wiXHJcbiAgICB9KVxyXG4gICAgYWRhcHRTY2FsZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdG9vbHRpcDogXCLmmK/lkKbopoHliqjmgIHosIPmlbTkvY3nva7ot53nprtcIlxyXG4gICAgfSlcclxuICAgIGR5bmFtaWNEaXNYOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIEBwcm9wZXJ0eSh7XHJcbiAgICAgICAgdG9vbHRpcDogXCLmmK/lkKbopoHliqjmgIHosIPns7vmlbBcIlxyXG4gICAgfSlcclxuICAgIGNvZWZmaWNpZW50OiBudW1iZXIgPSAwLjU7XHJcblxyXG4gICAgcHJpdmF0ZSBfd2lkZ2V0OiBjYy5XaWRnZXQ7XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICAgIHRoaXMuX3dpZGdldCA9IHRoaXMubm9kZS5nZXRDb21wb25lbnQoY2MuV2lkZ2V0KTtcclxuICAgICAgICBpZiAoIXRoaXMuX3dpZGdldCkge1xyXG4gICAgICAgICAgICB0aGlzLl93aWRnZXQgPSB0aGlzLm5vZGUuYWRkQ29tcG9uZW50KGNjLldpZGdldCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBvZmZzZXQgPSBSZXNvbHV0aW9uLmdldE9mZnNldCgpO1xyXG4gICAgICAgIHRoaXMuYWRhcHQob2Zmc2V0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRhcHQoLi4uYXJnczogYW55W10pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl93aWRnZXQuZW5hYmxlZCA9IHRydWVcclxuICAgICAgICB0aGlzLmFkYXB0Tm9kZVdpZGdldChhcmdzKVxyXG4gICAgICAgIHN1cGVyLmFkYXB0KGFyZ3MpXHJcbiAgICAgICAgdmFyIHggPSB0aGlzLm5vZGUueDtcclxuICAgICAgICB2YXIgeSA9IHRoaXMubm9kZS55O1xyXG5cclxuICAgICAgICAvLyDlrp7pmYXlsY/luZXmr5TkvotcclxuICAgICAgICBsZXQgZnJhbWVSYXRpbyA9IFJlc29sdXRpb24uZnJhbWVBc3BlY3RSYXRpbztcclxuICAgICAgICAvLyDorr7orqHmr5TkvotcclxuICAgICAgICBsZXQgZGVzaWduUmF0aW8gPSBSZXNvbHV0aW9uLmRlc2lnbkFzcGVjdFJhdGlvO1xyXG5cclxuICAgICAgICAvL+aNoueul+avlOS+i1xyXG4gICAgICAgIGxldCByYXRpbyA9IGZyYW1lUmF0aW8gLyBkZXNpZ25SYXRpb1xyXG5cclxuICAgICAgICBpZiAodGhpcy5keW5hbWljRGlzWCAhPSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3dpZGdldC5lbmFibGVkID0gZmFsc2VcclxuICAgICAgICAgICAgeCArPSAodGhpcy5keW5hbWljRGlzWCAqIChyYXRpbyAtIDEpIC8gdGhpcy5jb2VmZmljaWVudClcclxuICAgICAgICAgICAgdGhpcy5yZXNldFBvcyhjYy52Mih4LCB5KSlcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXNldFNjYWxlKHJhdGlvKVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBwdWJsaWMgcmVzZXRTY2FsZShzY2FsZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRhcHRTY2FsZSkge1xyXG4gICAgICAgICAgICB0aGlzLm5vZGUuc2V0U2NhbGUoc2NhbGUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldFBvcyhwb3M6IGNjLlZlYzIpIHtcclxuICAgICAgICB0aGlzLm5vZGUuc2V0UG9zaXRpb24ocG9zKTtcclxuICAgIH1cclxuXHJcbiAgICBhZGFwdE5vZGVXaWRnZXQoLi4uYXJnczogYW55W10pIHtcclxuICAgICAgICBsZXQgdG9wT2Zmc2V0LCBib3R0b21PZmZzZXQgPSBudWxsXHJcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMCAmJiBhcmdzWzBdWzBdKSB7XHJcbiAgICAgICAgICAgIGxldCBwYXJhbWV0ZXIgPSBhcmdzWzBdWzBdXHJcbiAgICAgICAgICAgIHRvcE9mZnNldCA9IHBhcmFtZXRlclswXVxyXG4gICAgICAgICAgICBib3R0b21PZmZzZXQgPSBwYXJhbWV0ZXJbMV1cclxuICAgICAgICB9IGVsc2UgeyByZXR1cm4gfVxyXG4gICAgICAgIHN3aXRjaCAodGhpcy50YXJnZXQpIHtcclxuICAgICAgICAgICAgY2FzZSBBZGFwdFRhcmdldC5BZGFwdFBvc0ZvclRvcEJhbmc6XHJcbiAgICAgICAgICAgICAgICBpZiAodG9wT2Zmc2V0ID09IDApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKFJlc29sdXRpb24ub3JpZW50YXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIE9yaWVudGF0aW9uVHlwZS5Qb3J0cmFpdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2lkZ2V0LnRvcCArPSB0b3BPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgT3JpZW50YXRpb25UeXBlLkxhbmRzY2FwZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2lkZ2V0LmxlZnQgKz0gdG9wT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIE9yaWVudGF0aW9uVHlwZS5SaWdodExhbmRzY2FwZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2lkZ2V0LnJpZ2h0ICs9IHRvcE9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBBZGFwdFRhcmdldC5BZGFwdFBvc0ZvckJvdHRvbUJhcjpcclxuICAgICAgICAgICAgICAgIGlmIChib3R0b21PZmZzZXQgPT0gMCkgeyByZXR1cm47IH1cclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoUmVzb2x1dGlvbi5vcmllbnRhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgT3JpZW50YXRpb25UeXBlLlBvcnRyYWl0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93aWRnZXQuYm90dG9tICs9IGJvdHRvbU9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBPcmllbnRhdGlvblR5cGUuTGFuZHNjYXBlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl93aWRnZXQucmlnaHQgKz0gYm90dG9tT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIE9yaWVudGF0aW9uVHlwZS5SaWdodExhbmRzY2FwZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2lkZ2V0LmxlZnQgKz0gYm90dG9tT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIEFkYXB0VGFyZ2V0LkFkYXB0U2l6ZUZvclRvcEJhbmc6XHJcbiAgICAgICAgICAgICAgICBpZiAodG9wT2Zmc2V0ID09IDApIHsgcmV0dXJuOyB9XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKFJlc29sdXRpb24ub3JpZW50YXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIE9yaWVudGF0aW9uVHlwZS5Qb3J0cmFpdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFuY2hvclkgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuaGVpZ2h0ICs9IHRvcE9mZnNldDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBPcmllbnRhdGlvblR5cGUuTGFuZHNjYXBlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYW5jaG9yWCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS53aWR0aCArPSB0b3BPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgT3JpZW50YXRpb25UeXBlLlJpZ2h0TGFuZHNjYXBlOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUuYW5jaG9yWCA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS53aWR0aCArPSB0b3BPZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgQWRhcHRUYXJnZXQuQWRhcHRTaXplRm9yQm90dG9tQmFyOlxyXG4gICAgICAgICAgICAgICAgaWYgKGJvdHRvbU9mZnNldCA9PSAwKSB7IHJldHVybjsgfVxyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChSZXNvbHV0aW9uLm9yaWVudGF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBPcmllbnRhdGlvblR5cGUuUG9ydHJhaXQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubm9kZS5hbmNob3JZID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmhlaWdodCArPSBib3R0b21PZmZzZXQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgT3JpZW50YXRpb25UeXBlLkxhbmRzY2FwZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFuY2hvclggPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggKz0gYm90dG9tT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIE9yaWVudGF0aW9uVHlwZS5SaWdodExhbmRzY2FwZTpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub2RlLmFuY2hvclggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vZGUud2lkdGggKz0gYm90dG9tT2Zmc2V0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBfVXNlck1nciB9IGZyb20gXCIuL3VzZXJkYXRhcy9Vc2VyTWdyXCI7XHJcbmltcG9ydCB7IF9Nb2R1bGVDb25kaXRpb25Jbml0IH0gZnJvbSBcIi4vY29uZGl0aW9ucy9Nb2R1bGVDb25kaXRpb25Jbml0XCI7XHJcbmltcG9ydCB7IF9TZXJ2ZXJNb2R1bGVNZ3IgfSBmcm9tIFwiLi9TZXJ2ZXJNb2R1bGVNZ3JcIjtcclxuaW1wb3J0IHsgX01zZ0JyaWRnZSB9IGZyb20gXCIuL2NvcmUvYnJpZGdlL01zZ0JyaWRnZVwiO1xyXG5pbXBvcnQgeyAkQmFzZUNvbW1hbmQgfSBmcm9tIFwiLi9jb3JlL2JyaWRnZS9jbWRzL0Jhc2VDb21tYW5kXCI7XHJcbmltcG9ydCB7IF9Vc2VyRXZlbnROYW1lIH0gZnJvbSBcIi4vdXNlcmRhdGFzL1VzZXJFdmVudE5hbWVcIjtcclxuaW1wb3J0IHsgX0FwcEJ1bmRsZU5hbWUgfSBmcm9tIFwiLi9BcHBCdW5kbGVOYW1lXCI7XHJcbmltcG9ydCAkem1CYXNlU2NlbmUgZnJvbSBcIi4vc2NlbmUvem1CYXNlU2NlbmVcIjtcclxuaW1wb3J0IF9DYWlzQ29udHJvbCBmcm9tIFwiLi9jYWlzL0NhaXNDb250cm9sXCI7XHJcbmltcG9ydCBfQ2Fpc1ZvLCB7ICRDYWlzTG9jYWxWb1R5cGUsICRDYWlzU2VydmVyVm9UeXBlIH0gZnJvbSBcIi4vY2Fpcy9DYWlzVm9cIjtcclxuaW1wb3J0IHsgJENvbW1hbmRzIH0gZnJvbSBcIi4vc2VydmVycy9jb21tYW5kcy9Db21tYW5kc1wiO1xyXG5pbXBvcnQgX1JvdXRlciBmcm9tIFwiLi9jb3JlL1JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgJEVMb2NhbEFwcEtleSwgJEJVX1RZUEUsICRCVV9OQU1FIH0gZnJvbSBcIi4vY29uc3RzL0VMb2NhbEFwcEtleVwiO1xyXG5pbXBvcnQgeyAkR2FtZUV2ZW50IH0gZnJvbSBcIi4vY29uc3RzL0dhbWVFdmVudFwiO1xyXG5pbXBvcnQgJEJhc2VBZGFwdCBmcm9tIFwiLi9hZGFwdC9CYXNlQWRhcHRcIjtcclxuaW1wb3J0ICRCdG5BZGFwdCBmcm9tIFwiLi9hZGFwdC9CdG5BZGFwdFwiO1xyXG5pbXBvcnQgJFJlc29sdXRpb24gZnJvbSBcIi4vYWRhcHQvUmVzb2x1dGlvblwiO1xyXG5pbXBvcnQgJE9yaWVudGF0aW9uIGZyb20gXCIuL2FkYXB0L09yaWVudGF0aW9uXCI7XHJcbmltcG9ydCAkQmFzZVVJIGZyb20gXCIuL2FkYXB0L0Jhc2VVSVwiO1xyXG5cclxuZXhwb3J0IGxldCBVc2VyTWdyID0gX1VzZXJNZ3IuZ2V0SW5zdGFuY2UoKTtcclxuZXhwb3J0IGxldCBNc2dCcmlkZ2UgPSBfTXNnQnJpZGdlLmdldEluc3RhbmNlKCk7XHJcbmV4cG9ydCBsZXQgQ2Fpc0NvbnRyb2wgPSBfQ2Fpc0NvbnRyb2wuZ2V0SW5zdGFuY2UoKTtcclxuZXhwb3J0IGxldCBDYWlzVm8gPSBfQ2Fpc1ZvLmdldEluc3RhbmNlKCk7XHJcblxyXG5leHBvcnQgbGV0IFNlcnZlck1vZHVsZU1nciA9IF9TZXJ2ZXJNb2R1bGVNZ3IuZ2V0SW5zdGFuY2UoKTtcclxuZXhwb3J0IGxldCBNb2R1bGVDb25kaXRpb25Jbml0ID0gX01vZHVsZUNvbmRpdGlvbkluaXQuZ2V0SW5zdGFuY2UoKTtcclxuZXhwb3J0IGxldCBBcHBCdW5kbGVOYW1lID0gX0FwcEJ1bmRsZU5hbWU7XHJcbmV4cG9ydCBsZXQgVXNlckV2ZW50TmFtZSA9IF9Vc2VyRXZlbnROYW1lO1xyXG5leHBvcnQgbGV0IENvbW1hbmRzID0gJENvbW1hbmRzO1xyXG5leHBvcnQgbGV0IEJVX1RZUEUgPSAkQlVfVFlQRTtcclxuZXhwb3J0IGxldCBFTG9jYWxBcHBLZXkgPSAkRUxvY2FsQXBwS2V5O1xyXG5leHBvcnQgbGV0IEJVX05BTUUgPSAkQlVfTkFNRTtcclxuZXhwb3J0IGxldCBHYW1lRXZlbnQgPSAkR2FtZUV2ZW50O1xyXG5leHBvcnQgbGV0IENhaXNTZXJ2ZXJWb1R5cGUgPSAkQ2Fpc1NlcnZlclZvVHlwZTtcclxuZXhwb3J0IGxldCBDYWlzTG9jYWxWb1R5cGUgPSAkQ2Fpc0xvY2FsVm9UeXBlO1xyXG5cclxuZXhwb3J0IGxldCBSb3V0ZXIgPSBfUm91dGVyLmdldEluc3RhbmNlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVVJIGV4dGVuZHMgJEJhc2VVSSB7IH07XHJcbmV4cG9ydCBjbGFzcyBCYXNlQWRhcHQgZXh0ZW5kcyAkQmFzZUFkYXB0IHsgfTtcclxuZXhwb3J0IGNsYXNzIEJ0bkFkYXB0IGV4dGVuZHMgJEJ0bkFkYXB0IHsgfTtcclxuZXhwb3J0IGNsYXNzIFJlc29sdXRpb24gZXh0ZW5kcyAkUmVzb2x1dGlvbiB7IH07XHJcbmV4cG9ydCBjbGFzcyBPcmllbnRhdGlvbiBleHRlbmRzICRPcmllbnRhdGlvbiB7IH07XHJcbmV4cG9ydCBjbGFzcyBCYXNlQ29tbWFuZCBleHRlbmRzICRCYXNlQ29tbWFuZCB7IH07XHJcbmV4cG9ydCBjbGFzcyB6bUJhc2VTY2VuZSBleHRlbmRzICR6bUJhc2VTY2VuZSB7IH07IiwiXHJcbmltcG9ydCB7IEV2ZW50TWdyIH0gZnJvbSBcInptZ19ldmVudF9tZ3JcIjtcclxuaW1wb3J0IFJlc29sdXRpb24gZnJvbSBcIi4vUmVzb2x1dGlvblwiO1xyXG5pbXBvcnQgeyBHYW1lRXZlbnQgfSBmcm9tIFwiLi5cIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcyB9ID0gY2MuX2RlY29yYXRvcjtcclxuXHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzICRCYXNlQWRhcHQgZXh0ZW5kcyBjYy5Db21wb25lbnQge1xyXG4gICAgcHJvdGVjdGVkIHdpZHM6IGNjLldpZGdldFtdID0gW11cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgICAvLyDorr7nva7muLjmiI/nqpflj6Plj5jljJbnmoTlm57osINcclxuICAgICAgICBjYy52aWV3LnNldFJlc2l6ZUNhbGxiYWNrKCgpID0+IHRoaXMub25SZXNpemUoKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkYXB0KC4uLmFyZ3M6IGFueVtdKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy53aWRzID0gdGhpcy5ub2RlLmdldENvbXBvbmVudHNJbkNoaWxkcmVuKGNjLldpZGdldCk7XHJcbiAgICAgICAgdmFyIGk6IG51bWJlcjtcclxuICAgICAgICB2YXIgbGVuOiBudW1iZXIgPSB0aGlzLndpZHMubGVuZ3RoO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLndpZHNbaV0udXBkYXRlQWxpZ25tZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgb25SZXNpemUoKSB7XHJcbiAgICAgICAgbGV0IG9mZnNldCA9IFJlc29sdXRpb24uZ2V0T2Zmc2V0KCk7XHJcbiAgICAgICAgRXZlbnRNZ3IuZW1pdChHYW1lRXZlbnQuVklFV19SRVNJWkUsIG9mZnNldCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIG9uRW5hYmxlKCkge1xyXG4gICAgICAgIHRoaXMuYWRhcHQoKVxyXG4gICAgICAgIEV2ZW50TWdyLm9uKEdhbWVFdmVudC5WSUVXX1JFU0laRSwgdGhpcy5hZGFwdCwgdGhpcyk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25EaXNhYmxlKCkge1xyXG4gICAgICAgIEV2ZW50TWdyLm9mZihHYW1lRXZlbnQuVklFV19SRVNJWkUsIHRoaXMuYWRhcHQsIHRoaXMpO1xyXG4gICAgfVxyXG4gICAgb25EZXN0cm95KCkgeyB9XHJcbn0iLCJpbXBvcnQgeyBfVXNlck1nciB9IGZyb20gXCIuL3VzZXJkYXRhcy9Vc2VyTWdyXCI7XHJcbmltcG9ydCB7IF9Nb2R1bGVDb25kaXRpb25Jbml0IH0gZnJvbSBcIi4vY29uZGl0aW9ucy9Nb2R1bGVDb25kaXRpb25Jbml0XCI7XHJcbmltcG9ydCB7IF9TZXJ2ZXJNb2R1bGVNZ3IgfSBmcm9tIFwiLi9TZXJ2ZXJNb2R1bGVNZ3JcIjtcclxuaW1wb3J0IHsgX01zZ0JyaWRnZSB9IGZyb20gXCIuL2NvcmUvYnJpZGdlL01zZ0JyaWRnZVwiO1xyXG5pbXBvcnQgeyAkQmFzZUNvbW1hbmQgfSBmcm9tIFwiLi9jb3JlL2JyaWRnZS9jbWRzL0Jhc2VDb21tYW5kXCI7XHJcbmltcG9ydCB7IF9Vc2VyRXZlbnROYW1lIH0gZnJvbSBcIi4vdXNlcmRhdGFzL1VzZXJFdmVudE5hbWVcIjtcclxuaW1wb3J0IHsgX0FwcEJ1bmRsZU5hbWUgfSBmcm9tIFwiLi9BcHBCdW5kbGVOYW1lXCI7XHJcbmltcG9ydCAkem1CYXNlU2NlbmUgZnJvbSBcIi4vc2NlbmUvem1CYXNlU2NlbmVcIjtcclxuaW1wb3J0IF9DYWlzQ29udHJvbCBmcm9tIFwiLi9jYWlzL0NhaXNDb250cm9sXCI7XHJcbmltcG9ydCBfQ2Fpc1ZvLCB7ICRDYWlzTG9jYWxWb1R5cGUsICRDYWlzU2VydmVyVm9UeXBlIH0gZnJvbSBcIi4vY2Fpcy9DYWlzVm9cIjtcclxuaW1wb3J0IHsgJENvbW1hbmRzIH0gZnJvbSBcIi4vc2VydmVycy9jb21tYW5kcy9Db21tYW5kc1wiO1xyXG5pbXBvcnQgX1JvdXRlciBmcm9tIFwiLi9jb3JlL1JvdXRlclwiO1xyXG5cclxuaW1wb3J0IHsgJEVMb2NhbEFwcEtleSwgJEJVX1RZUEUsICRCVV9OQU1FIH0gZnJvbSBcIi4vY29uc3RzL0VMb2NhbEFwcEtleVwiO1xyXG5pbXBvcnQgeyAkR2FtZUV2ZW50IH0gZnJvbSBcIi4vY29uc3RzL0dhbWVFdmVudFwiO1xyXG5pbXBvcnQgJEJhc2VBZGFwdCBmcm9tIFwiLi9hZGFwdC9CYXNlQWRhcHRcIjtcclxuaW1wb3J0ICRCdG5BZGFwdCBmcm9tIFwiLi9hZGFwdC9CdG5BZGFwdFwiO1xyXG5pbXBvcnQgJFJlc29sdXRpb24gZnJvbSBcIi4vYWRhcHQvUmVzb2x1dGlvblwiO1xyXG5pbXBvcnQgJE9yaWVudGF0aW9uIGZyb20gXCIuL2FkYXB0L09yaWVudGF0aW9uXCI7XHJcbmltcG9ydCAkQmFzZVVJIGZyb20gXCIuL2FkYXB0L0Jhc2VVSVwiO1xyXG5cclxuZXhwb3J0IGxldCBVc2VyTWdyID0gX1VzZXJNZ3IuZ2V0SW5zdGFuY2UoKTtcclxuZXhwb3J0IGxldCBNc2dCcmlkZ2UgPSBfTXNnQnJpZGdlLmdldEluc3RhbmNlKCk7XHJcbmV4cG9ydCBsZXQgQ2Fpc0NvbnRyb2wgPSBfQ2Fpc0NvbnRyb2wuZ2V0SW5zdGFuY2UoKTtcclxuZXhwb3J0IGxldCBDYWlzVm8gPSBfQ2Fpc1ZvLmdldEluc3RhbmNlKCk7XHJcblxyXG5leHBvcnQgbGV0IFNlcnZlck1vZHVsZU1nciA9IF9TZXJ2ZXJNb2R1bGVNZ3IuZ2V0SW5zdGFuY2UoKTtcclxuZXhwb3J0IGxldCBNb2R1bGVDb25kaXRpb25Jbml0ID0gX01vZHVsZUNvbmRpdGlvbkluaXQuZ2V0SW5zdGFuY2UoKTtcclxuZXhwb3J0IGxldCBBcHBCdW5kbGVOYW1lID0gX0FwcEJ1bmRsZU5hbWU7XHJcbmV4cG9ydCBsZXQgVXNlckV2ZW50TmFtZSA9IF9Vc2VyRXZlbnROYW1lO1xyXG5leHBvcnQgbGV0IENvbW1hbmRzID0gJENvbW1hbmRzO1xyXG5leHBvcnQgbGV0IEJVX1RZUEUgPSAkQlVfVFlQRTtcclxuZXhwb3J0IGxldCBFTG9jYWxBcHBLZXkgPSAkRUxvY2FsQXBwS2V5O1xyXG5leHBvcnQgbGV0IEJVX05BTUUgPSAkQlVfTkFNRTtcclxuZXhwb3J0IGxldCBHYW1lRXZlbnQgPSAkR2FtZUV2ZW50O1xyXG5leHBvcnQgbGV0IENhaXNTZXJ2ZXJWb1R5cGUgPSAkQ2Fpc1NlcnZlclZvVHlwZTtcclxuZXhwb3J0IGxldCBDYWlzTG9jYWxWb1R5cGUgPSAkQ2Fpc0xvY2FsVm9UeXBlO1xyXG5cclxuZXhwb3J0IGxldCBSb3V0ZXIgPSBfUm91dGVyLmdldEluc3RhbmNlKCk7XHJcblxyXG5leHBvcnQgY2xhc3MgQmFzZVVJIGV4dGVuZHMgJEJhc2VVSSB7IH07XHJcbmV4cG9ydCBjbGFzcyBCYXNlQWRhcHQgZXh0ZW5kcyAkQmFzZUFkYXB0IHsgfTtcclxuZXhwb3J0IGNsYXNzIEJ0bkFkYXB0IGV4dGVuZHMgJEJ0bkFkYXB0IHsgfTtcclxuZXhwb3J0IGNsYXNzIFJlc29sdXRpb24gZXh0ZW5kcyAkUmVzb2x1dGlvbiB7IH07XHJcbmV4cG9ydCBjbGFzcyBPcmllbnRhdGlvbiBleHRlbmRzICRPcmllbnRhdGlvbiB7IH07XHJcbmV4cG9ydCBjbGFzcyBCYXNlQ29tbWFuZCBleHRlbmRzICRCYXNlQ29tbWFuZCB7IH07XHJcbmV4cG9ydCBjbGFzcyB6bUJhc2VTY2VuZSBleHRlbmRzICR6bUJhc2VTY2VuZSB7IH07Il0sIm5hbWVzIjpbIkNvbmZpZ01nciIsImdMb2ciLCJTZXJ2ZXJNZ3IiLCJFdmVudE1nciIsIkV2ZW50TmFtZSIsImdXYXJuIiwiRW52TWdyIiwiU2VydmVyTGlzdGVuZXIiLCJBY3RvciIsIlVJTWdyIiwiUmVzQXNzZXQiLCJTeXN0ZW1CdW5kbGVOYW1lIiwiRVJvbGVBY3Rpb24iLCJCYXNlTWdyIiwiTW9kdWxlTWdyIiwiQmFzZU1vZHVsZUNETiIsIiRFTW9kdWxlVHlwZSIsIlN0cmluZ1V0aWwiLCJEYXRhTWdyIiwiQXVkaW9NZ3IiLCJSZXNNZ3IiLCJEcmFnb25VdGlsIiwiRGlyZWN0b3JNZ3IiLCJfYSIsImNjY2xhc3MiLCJwcm9wZXJ0eSIsIkRhdGVVdGlsIiwiRGF0ZVV0aWxUeXBlIiwiUmVzTGlzdGVuZXIiLCJFRGV2aWNlIiwiUmVzb2x1dGlvbiIsIkJhc2VBZGFwdCIsIlVzZXJNZ3IiLCJNc2dCcmlkZ2UiLCJDYWlzQ29udHJvbCIsIkNhaXNWbyIsIlNlcnZlck1vZHVsZU1nciIsIk1vZHVsZUNvbmRpdGlvbkluaXQiLCJHYW1lRXZlbnQiLCJSb3V0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
