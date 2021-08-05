import { DirectorEvent, DirectorMgr } from "zmg_controller";
import { EventMgr, EventName } from "zmg_event_mgr";
import { ModuleMgr } from "zmg_module_mgr";
import { ResAsset, ResMgr } from "zmg_res_mgr";
import { Actor } from "zmg_ui_mgr";
import { DragonAsset, DragonUtil } from "zmg_util";
import { gLog } from "zmg_util";
import { _AppBundleName } from "../AppBundleName";
import { _UserEventName } from "../userdatas/UserEventName";
import { _UserMgr } from "../userdatas/UserMgr";

const { ccclass, property } = cc._decorator

export default class RoleTips extends cc.Component {
    private _display: dragonBones.ArmatureDisplay;
    private _tipsNode: cc.Node;
    onLoad() {
        this._tipsNode = new cc.Node();
        this._tipsNode.setParent(this.node);
        ResMgr.loadDragon(
            _AppBundleName.Stack,
            'role/tips',
            (dragon: DragonAsset) => {
                this._tipsNode.setPosition(188, 178);
                this._tipsNode.zIndex = 10;
                this._tipsNode.scale = 0.8;
                this._display = DragonUtil.createDragon(
                    dragon,
                    this._tipsNode,
                    "roleTips"
                )
                this._display.addEventListener(
                    dragonBones.EventObject.COMPLETE,
                    this.onDragonDisplay,
                    this
                )
                this.check()
            },
            this
        );
        this.addEvents();
    }
    onDisable(): void {
        if (this._display) {
            this._display.removeEventListener(
                dragonBones.EventObject.COMPLETE,
                this.onDragonDisplay,
                this
            )
        }
    }
    public showRoleTip(): void {
        if (this._tipsNode) {
            this._tipsNode.active = true
            this._tipsNode.setPosition(Actor().node.width, Actor().display.node.height)
            this.check()
        }
    }

    public hideTip(): void {
        if (this._tipsNode) {
            this._tipsNode.active = false
        }
    }
    private addEvents(): void {
        let user = _UserMgr.getInstance();
        EventMgr.on(EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this, false);
        user.on(_UserEventName.ENERGY_CHANGE, this.check, this);
        Actor().on(EventName.CLICK, this.onActorClick, this);
        user.on(_UserEventName.SLEEP_CHANGE, this.check, this);
        user.on(_UserEventName.CLEAN_CHANGE, this.check, this);
        user.on(_UserEventName.WASH_CHANGE, this.check, this);
        user.on(_UserEventName.GREET_CARD, this.check, this);
    }
    private removeEvents(): void {
        let user = _UserMgr.getInstance();
        EventMgr.off(EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this);
        user.off(_UserEventName.ENERGY_CHANGE, this.check, this);
        Actor().off(EventName.CLICK, this.onActorClick, this);
        user.off(_UserEventName.CLEAN_CHANGE, this.check, this);
        user.off(_UserEventName.SLEEP_CHANGE, this.check, this);
        user.off(_UserEventName.WASH_CHANGE, this.check, this);
        user.off(_UserEventName.GREET_CARD, this.check, this);
    }

    public talkHunger(): void {
        let user = _UserMgr.getInstance();
        Actor().talkByRes(new ResAsset(_AppBundleName.Stack, "audio/" + user.roleName + "/" + "我饿了"));
    }
    public talkSleep(): void {
        let user = _UserMgr.getInstance();
        Actor().talkByRes(new ResAsset(_AppBundleName.Stack, "audio/" + user.roleName + "/" + "我困了"));
    }
    public talkWash(): void {
        let user = _UserMgr.getInstance();
        Actor().talkByRes(new ResAsset(_AppBundleName.Stack, "audio/" + user.roleName + "/" + "小主人，我身上脏兮兮，快送我去洗个澡吧~"));
    }
    public talkClean(): void {
        let user = _UserMgr.getInstance();
        Actor().talkByRes(new ResAsset(_AppBundleName.Stack, "audio/" + user.roleName + "/" + "小主人，房间有垃圾了，快帮我打扫下吧~"));
    }
    public talkNewCard(): void {
        let user = _UserMgr.getInstance();
        Actor().talkByRes(new ResAsset(_AppBundleName.Stack, "audio/" + user.roleName + "/" + "贺卡上新了"));
    }
    public talkReciveCard(): void {
        let user = _UserMgr.getInstance();
        Actor().talkByRes(new ResAsset(_AppBundleName.Stack, "audio/" + user.roleName + "/" + "贺卡回复了"));
    }
    public randomTalk(): void {
        Actor().talkRandom();
    }


    public open(): boolean {
        let user = _UserMgr.getInstance();
        let budleName = DirectorMgr.nowBunName
        if (budleName == _AppBundleName.HOUSE) {
            return true;
        } else {
            let floorNum = 2
            if (user.isGreetCard) {
                // ModuleMgr.openByCode("GreetCard");
            } else if (user.isHunger) {
                floorNum = 2
                ModuleMgr.openByCode(_AppBundleName.HOUSE, { floor: floorNum });
            } else if (user.isToSleep) {
                floorNum = 3
                ModuleMgr.openByCode(_AppBundleName.HOUSE, { floor: floorNum });
            } else if (user.isToWash) {
                floorNum = 4
                ModuleMgr.openByCode(_AppBundleName.HOUSE, { floor: floorNum });
            }
            else if (user.getRoomIsToClean()) {
                floorNum = user.getRoomIsToClean();
                ModuleMgr.openByCode(_AppBundleName.HOUSE, { floor: floorNum });
            }
            else {
                return true;
            }
        }
        return false;
    }

    public talk() {
        let user = _UserMgr.getInstance();
        if (user.cardVo.hasNewGreetCard) {
            this.talkNewCard();
        } else if (user.cardVo.hasReciveGreetCard || user.cardVo.hasGreetCard) {
            this.talkReciveCard();
        } else if (user.isHunger) {
            this.talkHunger();
        } else if (user.isToSleep) {
            this.talkSleep();
        } else if (user.isToWash) {
            this.talkWash();
        } else if (user.cleanVo.getRoomIsToClean()) {
            this.talkClean();
        } else {
            this.randomTalk();
        }
    }

    private onActorClick(): void {
        if (this.open()) return
        this.talk()
    }

    private onSceneDestory(): void {
        this._tipsNode.destroy();
        this.removeEvents();
        this.destroy();
    }
    private getNextStatu() {
        if (!this._display) {
            return
        }
        let user = _UserMgr.getInstance();
        let lastAniname: string
        var ani: string = this._display.animationName.slice(0, 3) //截取3个字符
        switch (ani) {
            case 'hek':
                if (!user.cardVo.hasGreetCard) {
                    lastAniname = 'hekaxiaoshi'
                }
                break
            case 'rec':
                if (!user.cardVo.hasReciveGreetCard) {
                    lastAniname = 'recivehekaxiaoshi'
                }
                break
            case 'new':
                if (!user.cardVo.hasNewGreetCard) {
                    lastAniname = 'newhekaxiaoshi'
                }
                break
            case 'ele':
                if (!user.isHunger) {
                    lastAniname = 'elexiaoshi'
                }
                break
            case 'kun':
                if (!user.isToSleep) {
                    lastAniname = 'kunxiaoshi'
                }
                break
            case 'xiz':
                if (!user.isToWash) {
                    lastAniname = 'xizaoxiaoshi'
                }
                break
            case 'sao':
                if (!user.cleanVo.getRoomIsToClean()) {
                    lastAniname = 'saodixiaoshi'
                }
                break
            default:
                break
        }
        return lastAniname;
    }

    private check(): void {
        if (!this._display) {
            return
        }
        var nowani: string;
        let user = _UserMgr.getInstance();
        var ani: string = this._display.animationName
        if (ani && ani.indexOf('xunhuan') != -1) {
            //改变了状态
            nowani = this.getNextStatu()
        } else if (user.cardVo.isGreetCard) {
            if (user.cardVo.hasGreetCard) {
                nowani = 'hekachuxian'
            } else if (user.cardVo.hasReciveGreetCard) {
                nowani = 'recivehekachuxian'
            } else if (user.cardVo.hasNewGreetCard) {
                this.node.active = false
                this.hideTip()
                // nowani = 'newhekachuxian'
            }
        } else if (user.isHunger) {
            nowani = 'elechuxian'
        } else if (user.isToSleep) {
            nowani = 'kunchuxian'
        } else if (user.isToWash) {
            nowani = 'xizaochuxian'
        } else if (user.cleanVo.getRoomIsToClean()) {
            //新加
            nowani = 'saodichuxian'
        } else {
            this.hideTip()
        }
        if (nowani) {
            DragonUtil.play(this._display, nowani, 1)
        }
    }

    private onDragonDisplay(): void {
        if (!this._display) {
            return
        }
        var ani: string = this._display.animationName
        if (ani == 'hekachuxian') {
            DragonUtil.play(this._display, 'hekaxunhuan', 0)
        } else if (ani == 'recivehekachuxian') {
            DragonUtil.play(this._display, 'recivehekaxunhuan', 0)
        } else if (ani == 'newhekachuxian') {
            DragonUtil.play(this._display, 'newhekaxunhuan', 0)
        } else if (ani == 'elechuxian') {
            DragonUtil.play(this._display, 'elexunhuan', 0)
        } else if (ani == 'kunchuxian') {
            DragonUtil.play(this._display, 'kunxunhuan', 0)
        } else if (ani == 'xizaochuxian') {
            DragonUtil.play(this._display, 'xizaoxunhuan', 0)
        } else if (ani == 'saodichuxian') {
            //新加
            DragonUtil.play(this._display, 'saodixunhuan', 0)
        } else {
            if (ani.indexOf('xiaoshi') != -1) {
                //消失重新检测
                this.check();
            }
        }
    }
}
