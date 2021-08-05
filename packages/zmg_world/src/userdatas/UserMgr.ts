import { ConfigMgr } from "zmg_config_mgr";
import { EnvMgr } from "zmg_env_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import { BaseMgr } from "zmg_mgr";
import { UIMgr, Alert, Actor, ERoleAction } from "zmg_ui_mgr";
import { DragonAssetUrl, gWarn } from "zmg_util";
import { ServerListener, ServerMgr } from "zmg_webserver_mgr";
import { ResAsset, SystemBundleName } from "zmg_res_mgr"
import { UserCardVo } from "./UserCardVo";
import { $Commands } from "../servers/commands/Commands";
import { UserClearVo } from "./UserCleanVo";
import { _UserEventName } from "./UserEventName";

/**
 * 用户数据保存
 */
export class _UserMgr extends BaseMgr implements zmg.IMgr {

    private static _instance: _UserMgr;
    static getInstance(): _UserMgr {
        if (!this._instance) {
            this._instance = new _UserMgr();
        }
        return this._instance;
    }
    private _actor: any;
    /**
     * 学伴信息
     */
    private _userVo: WebServerVo.IGetPartnerInfo;
    private _studentVo: WebServerVo.IGetStudentBaseInfo;
    public get userVo(): WebServerVo.IGetPartnerInfo {
        return this._userVo;
    }
    public set userVo(data: WebServerVo.IGetPartnerInfo) {
        this._userVo = data;
    }
    private _cleanVo: UserClearVo;

    private _cardVo: UserCardVo;
    // zxm = 1,
    // mmt = 2,
    // ddx = 3
    public roleTypeList = ["", "zxm", "mmt", "ddx"];

    public get cleanVo(): UserClearVo {
        return this._cleanVo;
    }

    public get cardVo(): UserCardVo {
        return this._cardVo;
    }
    /**
     * 获取人物形象
     */
    public get actor(): zmg.IRole {
        return this._actor;
    }

    public get partnerId(): number {
        return parseInt(this._userVo.partnerId);
    }

    public start(): any {
        if (ServerMgr.isValid) {
            this.updateUserData();
        } else {
            EventMgr.once(EventName.SERVER_READY, this.updateUserData, this);
        }
        this.addEvents();
    }
    public getStudentInfo(callback: (data: WebServerVo.IGetStudentBaseInfo) => void, target: any): void {
        if (this._studentVo) {
            callback.call(target, this._studentVo)
        } else {
            if (ServerMgr.isValid) {
                ServerMgr.sendGet($Commands.getStudentBaseInfo, null, (data: WebServerVo.IGetStudentBaseInfo) => {
                    if (data) {
                        this._studentVo = data;
                        this.getStudentInfo(callback, target);
                    } else {
                        gWarn("学生信息获取失败!");
                    }
                }, target);
            } else {
                EventMgr.once(EventName.SERVER_READY, () => {
                    this.getStudentInfo(callback, target);
                }, this);
            }
        }
    }
    public updateUserData(): void {
        let param = {
            bu: ConfigMgr.getBu(),
            needCardTip: true,
            needPartnerStatus: true,
            userId: EnvMgr.getUserId(),
        }
        //获取学伴信息
        ServerMgr.sendGet($Commands.getPartnerInfo, param, new ServerListener(this, this.onServer), this, false);
    }
    public updateCloth(): void {
        ServerMgr.sendPost($Commands.getRoleDressUps, null, new ServerListener(this, this.onServerCloth), this, false);
    }
    public getActionConfig(): void {
        ServerMgr.sendGet($Commands.actionConfig, null, new ServerListener(this, this.onActionConfig), false)
    }
    public onActionConfig(res: any) {
        if (res) {
            this.sleepFullSeconds = res.sleepFullSeconds;
            this.washFullSeconds = res.washFullSeconds;
        }
    }
    public updateFruitValue() {
        ServerMgr.sendGet($Commands.getFruitTotalNum, { userId: EnvMgr.getUserId() }, (response) => {
            let fruitValue = response;
            this.fruitValue = response;
        }, this);
    }
    /**
     * 获取学伴信息
     * @param res 
     */
    public onServer(res: WebServerVo.IGetPartnerInfo): void {
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
            this._actor = Actor();
            this._actor.initConfig(ConfigMgr.uiconfig.role[this.roleName]);
            this.updateCloth();
        }
        this.emit(EventName.READY);
    }
    private onCleanChange(): void {
        this.emit(_UserEventName.CLEAN_CHANGE);
    }
    private onCardChange(greetCardTip: WebServerVo.IGreetCardTip): void {
        this.emit(_UserEventName.GREET_CARD, greetCardTip);
    }
    /**
     * 获取学伴装扮信息
     */
    public onServerCloth(res: WebServerVo.IDress): void {
        if (this._actor) {
            let details = res ? res.details : null;
            if (details) {
                let cLen: number;
                let action: string;
                let i: number, j: number;
                let infs: WebServerVo.IDragonInf[];
                let assets: DragonAssetUrl[];
                let url: DragonAssetUrl;
                let item: WebServerVo.IDressItem;
                let cloth: zmg.IRoleDressItem;
                let len: number = details.length;
                let cloths: zmg.IRoleDressItem[] = [];
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
                    }
                    cloths.push(cloth);
                }
                this._actor.dress(cloths);
            }
        }
    }
    public destory(): void {
        this._userVo = null;
        this.removeEvents();
    }

    /**
    * @description: 睡觉总时间
    */
    private _sleepFullSeconds: number;
    public get sleepFullSeconds(): number {
        if (this._sleepFullSeconds) {
            return this._sleepFullSeconds;
        }
        else {
            this._sleepFullSeconds = 10;
            return this._sleepFullSeconds;
        }
    }
    public set sleepFullSeconds(value: number) {
        if (this._sleepFullSeconds != value) {
            this._sleepFullSeconds = value;
        }
    }


    /**
     * 学伴饥饿值
     */
    public get totalEnergy(): number {
        if (this.userVo.totalEnergy) {
            return this.userVo.totalEnergy
        } else {
            this.userVo.totalEnergy = 100
            return this.userVo.totalEnergy
        }
    }
    public set totalEnergy(value: number) {
        if (this.userVo.totalEnergy != value) {
            this.userVo.totalEnergy = value
        }
    }
    /**
     * @description: 洗澡总时间
     */
    private _washFullSeconds: number;
    public get washFullSeconds(): number {
        if (this._washFullSeconds) {
            return this._washFullSeconds;
        }
        else {
            this._washFullSeconds = 10;
            return this._washFullSeconds;
        }
    }
    public set washFullSeconds(value: number) {
        if (this._washFullSeconds != value) {
            this._washFullSeconds = value;
        }
    }

    public get isValid(): boolean {
        return this._userVo ? true : false;
    }

    public get rubbishTotal(): number {
        if (this._userVo.rubbishTotal) {
            return this._userVo.rubbishTotal;
        } else {
            this._userVo.rubbishTotal = 0;
            return this._userVo.rubbishTotal;
        }
    }
    public set rubbishTotal(value: number) {
        if (this._userVo.rubbishTotal != value) {
            this._userVo.rubbishTotal = value;
        }
    }

    public set isToWash(bool: boolean) {
        if (this._userVo.isToWash != bool) {
            this._userVo.isToWash = bool;
            this.emit(_UserEventName.WASH_CHANGE, this.washValue);
        }
    }
    public get isToWash(): boolean {
        if (this._userVo.isToWash === undefined) {
            this._userVo.isToWash = true
            return this._userVo.isToWash;
        } else {
            return this._userVo.isToWash;
        }
    }

    public get washValue(): number {
        if (this._userVo.washValue !== undefined) {
            return this._userVo.washValue
        } else {
            this._userVo.washValue = 0;
            return this._userVo.washValue;
        }
    }
    public set washValue(value: number) {
        if (this._userVo.washValue != value) {
            this._userVo.washValue = value ? value : 0;
            this.emit(_UserEventName.WASH_CHANGE, this.getWashProgress())
        }
    }

    public get isAdoption(): boolean {
        if (this._userVo) {
            return this._userVo.isAdoption;
        }
    }

    public get fruitValue(): number {
        if (this._userVo) {
            return this._userVo.fruitValue;
        }
        return 0;
    }
    public set fruitValue(value: number) {
        if (this._userVo) {
            this._userVo.fruitValue = value ? value : 0;
            this.emit(_UserEventName.FRUIT_CHANGE, value);
        }
    }

    public set isHunger(bool: boolean) {
        if (this._userVo.isHunger != bool) {
            this._userVo.isHunger = bool
            this.emit(_UserEventName.ENERGY_CHANGE, this.getEatProgerss());
        }
    }
    public get isHunger(): boolean {
        if (this._userVo.isHunger === undefined) {
            this._userVo.isHunger = true;
            return this._userVo.isHunger;
        } else {
            return this._userVo.isHunger;
        }
    }
    public set hasNewGreetCard(value: boolean) {
        this.cardVo.hasNewGreetCard = value
    }

    public get hasNewGreetCard(): boolean {
        return this.cardVo.hasNewGreetCard
    }
    public set isGreetCard(s: boolean) {
        this.cardVo.isGreetCard = s
    }
    public get isGreetCard(): boolean {
        return this.cardVo.isGreetCard
    }

    public get partnerCurrentEnergy(): number {
        if (this._userVo.partnerCurrentEnergy) {
            return this._userVo.partnerCurrentEnergy;
        } else {
            this._userVo.partnerCurrentEnergy = 0;
            return this._userVo.partnerCurrentEnergy;
        }
    }
    public set partnerCurrentEnergy(value: number) {
        if (this._userVo.partnerCurrentEnergy != value) {
            this._userVo.partnerCurrentEnergy = value
            this.emit(_UserEventName.ENERGY_CHANGE, this.getEatProgerss())
        }
    }

    public set isToSleep(bool: boolean) {
        if (this._userVo.isToSleep != bool) {
            this._userVo.isToSleep = bool;
            this.emit(_UserEventName.SLEEP_CHANGE, this._userVo.isToSleep);
        }
    }
    public get isToSleep(): boolean {
        if (this._userVo.isToSleep === undefined) {
            this._userVo.isToSleep = true;
            return this._userVo.isToSleep;
        } else {
            return this._userVo.isToSleep;
        }
    }

    public get sleepValue(): number {
        if (this._userVo.sleepValue !== undefined) {
            return this._userVo.sleepValue;
        } else {
            this._userVo.sleepValue = 0;
            return this._userVo.sleepValue;
        }
    }
    public set sleepValue(value: number) {
        if (this._userVo.sleepValue != value) {
            this._userVo.sleepValue = value;
            this.emit(_UserEventName.SLEEP_CHANGE, this.getSleepProgress())
        }
    }
    /**
     * 根据房间楼层号获取楼层垃圾信息
     */
    public getRoomCleanLinessByFloorId(id: number): WebServerVo.ICleanRoomInfo {
        if (this.cleanVo) {
            return this.cleanVo.getRoomCleanLinessByFloorId(id)
        }
    }
    /**
     *  根据房间楼层号设置楼层清洁值
     */
    public setRoomCleanValueByFloorId(id: number, Value: number): WebServerVo.ICleanRoomInfo {
        if (this.cleanVo) {
            return this.cleanVo.setRoomCleanValueByFloorId(id, Value)
        }
    }

    /**
     *  根据房间楼层号设置楼层清洁值
     */
    public setRoomIsToCleanByFloorId(id: number, Value: boolean): WebServerVo.ICleanRoomInfo {
        if (this.cleanVo) {
            return this.cleanVo.setRoomIsToCleanByFloorId(id, Value)
        }
    }

    /**
     *  根据房间楼层号获取楼层清洁值
     */
    public getRoomCleanValueByFloorId(id: number): number {
        if (this.cleanVo) {
            return this.cleanVo.getRoomCleanValueByFloorId(id)
        }
    }

    /**
     *  根据房间楼层号获取楼层是否需要清洁
     */
    public getRoomIsToCleanByFloorId(id: number): boolean {
        if (this.cleanVo) {
            return this.cleanVo.getRoomIsToCleanByFloorId(id)
        }
    }

    /**
     *  根据房间楼层号获取楼层是否需要清洁
     */
    public getRoomIsToClean(): number {
        if (this.cleanVo) {
            return this.cleanVo.getRoomIsToClean()
        }
    }

    /**
     * 获取垃圾数目
     */
    public getRubbishsByFloorId(id: number): number {
        if (this.cleanVo) {
            return this.cleanVo.getRubbishsByFloorId(id, this.rubbishTotal);
        }
    }

    public getEatProgerss(): number {
        return Math.max(
            0,
            Math.min(this._userVo.partnerCurrentEnergy / this._userVo.totalEnergy, 1)
        );
    }

    public getSleepProgress(): number {
        return Math.max(0, Math.min(this._userVo.sleepValue / 100, 1));
    }

    public getWashProgress(): number {
        return Math.max(0, Math.min(this._userVo.washValue / 100, 1));
    }

    public get roleName(): string {
        let rName: string = this.roleTypeList[this._userVo.partnerId];
        return rName ? rName : this.roleTypeList[0];
    }
    private addEvents(): void {
        EventMgr.once(EventName.CORE_READY, this.onCoreReady, this);
    }
    private removeEvents(): void {
        if (this._cardVo) {
            this._cardVo.off(_UserEventName.GREET_CARD, this.onCardChange, this);
        }
        if (this._cleanVo) {
            this._cleanVo.off(_UserEventName.CLEAN_CHANGE, this.onCleanChange, this);
        }
        EventMgr.off(EventName.CORE_READY, this.onCoreReady, this);
    }
    private onCoreReady(): void {
        let alert: Alert = UIMgr.alert.defaultAlert;
        alert.setTitle(new ResAsset(SystemBundleName.UI, "textures/cry" + this.roleName));
    }
    /**
     *  //1,走路,3:说话，站立
     * @param type 
     */
    private getActionByType(type: number): string {
        switch (type) {
            case 1:
                return ERoleAction.WALK_LEFT;
            case 3:
                return ERoleAction.STAND;
            default:
                return null;
        }
    }
}