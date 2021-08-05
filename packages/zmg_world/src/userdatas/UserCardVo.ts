import { ConfigMgr } from "zmg_config_mgr";
import { _UserEventName } from "./UserEventName";

export class UserCardVo extends cc.EventTarget {

    private _hasGreetCard: boolean;
    private _hasNewGreetCard: boolean
    private _hasReciveGreetCard: boolean;

    private _info: WebServerVo.IGetPartnerInfo;
    private _greetCardTip: WebServerVo.IGreetCardTip;

    public setData(res: WebServerVo.IGetPartnerInfo): void {
        this._info = res;
        this.greetCardTip = res.greetCardTip;
    }

    public set isGreetCard(s: boolean) {
        if (!s) {
            this.greetCardTip.status = 0;
        }
    }
    public get isGreetCard(): boolean {
        var module: zmg.IModuleConfig = ConfigMgr.getModuleConfigByCode("GreetCard");
        if (module && module.isClose) {
            return false;
        }
        if (this.greetCardTip.status > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    public set hasGreetCard(value: boolean) {
        if (this._hasGreetCard === undefined) {
            this._hasGreetCard = false
        } else {
            this._hasGreetCard = value
        }
    }

    public get hasGreetCard(): boolean {
        if (this._hasGreetCard === undefined) {
            this._hasGreetCard = false
            return this._hasGreetCard
        } else {
            return this._hasGreetCard
        }
    }

    public set hasReciveGreetCard(value: boolean) {
        if (this._hasReciveGreetCard === undefined) {
            this._hasReciveGreetCard = false
        } else {
            this._hasReciveGreetCard = value
        }
    }

    public get hasReciveGreetCard(): boolean {
        if (this._hasReciveGreetCard === undefined) {
            this._hasReciveGreetCard = false
            return this._hasReciveGreetCard
        } else {
            return this._hasReciveGreetCard
        }
    }

    /**
     * @description: 是否有新贺卡查收提醒
     */
    public set hasNewGreetCard(value: boolean) {
        if (this._hasNewGreetCard === undefined) {
            this._hasNewGreetCard = false
        } else {
            this._hasNewGreetCard = value
        }
    }

    public get greetCardTip(): WebServerVo.IGreetCardTip {
        if (this._greetCardTip === undefined) {
            this._greetCardTip = { cardNum: 0, status: 0 }
            return this._greetCardTip
        } else {
            return this._greetCardTip
        }
    }

    public set greetCardTip(value: WebServerVo.IGreetCardTip) {
        if (this._greetCardTip === undefined) {
            this._greetCardTip = value
        } else {
            this._greetCardTip = value
        }
        this._info.greetCardTip = value;
        this.hasGreetCard = false
        this.hasReciveGreetCard = false
        this.hasNewGreetCard = false
        if (this._greetCardTip) {
            switch (this._greetCardTip.status) {
                //0 无提醒 1 收到贺卡 2 收到回复 3 贺卡上新
                case 0:
                    break;
                case 1:
                    this.hasGreetCard = true
                    break;
                case 2:
                    this.hasReciveGreetCard = true
                    break;
                case 3:
                    this.hasNewGreetCard = true
                    break;
                default:
                    break;
            }
        }
        // let user = _UserMgr.getInstance();
        // user.emit(_UserEventName.GREET_CARD, this._greetCardTip)
        this.emit(_UserEventName.GREET_CARD, this._greetCardTip);
    }
}