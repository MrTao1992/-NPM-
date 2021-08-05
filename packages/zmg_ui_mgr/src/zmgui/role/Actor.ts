import { EEventIndex, EventMgr, EventName } from "zmg_event_mgr";
import { $ERoleAction } from "./ERoleAction";
import { $Role } from "./Role";
import { ServerMgr, zmgCommands } from "zmg_webserver_mgr";
import { DragonResAsset, ResAsset, ResMgr } from "zmg_res_mgr";
import { gWarn } from "zmg_util";
interface UserAbilityMedalOutVo {
    animation1Url: string;
    animation2Url: string;
    animation3Url: string;
}
interface UserAchievementUpgradeOutVo {
    animation1Url: string;
    animation2Url: string;
    animation3Url: string;
}

interface ICarryMedal {
    //用户当前携带能力光环信息 ,
    userAbilityMedalInfo: UserAbilityMedalOutVo;
    //用户当前携带的精灵信息
    userCarryMedalInfo: UserAchievementUpgradeOutVo;
}

export class _Actor extends $Role implements zmg.IActor {
    private static _instance: zmg.IActor;
    private _talkAudioClips: cc.AudioClip[] = [];
    static getInstance(): zmg.IActor {
        if (!_Actor._instance) {
            if (window["Actor"]) {
                _Actor._instance = window["Actor"];
            } else {
                let node: cc.Node = new cc.Node;
                _Actor._instance = node.addComponent(_Actor);
                window["Actor"] = _Actor._instance;
            }
        }
        return _Actor._instance;
    }
    static setInstance(ins: zmg.IActor): void {
        window["Actor"] = ins;
        _Actor._instance = ins;
    }
    public get pet(): zmg.IPet {
        return this._pet;
    }
    public get config(): zmg.IRoleConfig {
        return this._config;
    }
    public get roleName(): string {
        return this._config ? this._config.rName : "";
    }
    public get display(): dragonBones.ArmatureDisplay {
        return this._display;
    }
    public get shadow(): cc.Sprite {
        return this._shadow;
    }
    public get halo(): dragonBones.ArmatureDisplay {
        return this._halo;
    }
    public hitTest(pos: cc.Vec2): boolean {
        return super.hitTest(pos);
    }
    public getAction(): $ERoleAction {
        return this._action;
    }
    public get dressList(): zmg.IRoleDressItem[] {
        return this._dressList;
    }
    public setPostion(newPosOrX: number | cc.Vec2 | cc.Vec3, y?: number): void {
        super.setPostion(newPosOrX, y);
    }
    public setParent(parent: cc.Node): void {
        super.setParent(parent);
    }

    public takeOff(cloth: zmg.IRoleDressItem): void {
        super.takeOff(cloth);
    }

    public takeOn(cloth: zmg.IRoleDressItem): void {
        super.takeOn(cloth);
    }

    constructor() {
        super();
    }

    public async initConfig(config: zmg.IRoleConfig) {
        super.initConfig(config);
        let i: number;
        let len: number = config.talks.length;
        for (i = 0; i < len; i++) {
            ResMgr.load(config.bunName, config.talks[i], this.onTalkClipComplete, this);
        }
    }
    public dress(cloths: zmg.IRoleDressItem[]): void {
        super.dress(cloths);
    }
    public doAction(action: $ERoleAction): void {
        super.doAction(action);
    }
    protected updateAction(action: $ERoleAction): void {
        super.updateAction(action);
    }
    public talk(clip: cc.AudioClip): void {
        super.talk(clip);
    }
    public talkByRes(res: ResAsset): void {
        ResMgr.load(res.bunName, res.path, (clip: cc.AudioClip) => {
            this.talk(clip);
        }, this);
    }
    public stand(): void {
        this.doAction($ERoleAction.STAND);
    }
    public walkRight(): void {
        this.doAction($ERoleAction.WALK_RIGHT);
    }
    public walkLeft(): void {
        this.doAction($ERoleAction.WALK_LEFT);
    }
    public talkRandom(): void {
        let clip: cc.AudioClip = this._talkAudioClips[Math.floor(this._talkAudioClips.length * Math.random())];
        if (clip) {
            this.talk(clip);
        }
    }

    /**
     * 场景切换的时候进行销毁
     */
    public onDestroy(): void {
        gWarn("人物不进行销毁");
        let c = this.config;
        let node: cc.Node = new cc.Node;
        let a = node.addComponent(_Actor);
        a.initConfig(c);
        a.dress(this._dressList);
        _Actor.setInstance(a);
        super.onDestroy();
    }
    protected onTalkClipComplete(clip: cc.AudioClip): void {
        this._talkAudioClips.push(clip);
    }
    protected addEvents(): void {
        super.addEvents();
        EventMgr.on(EventName.CORE_READY, this.onSceneReady, this, false);
    }
    protected removeEvents(): void {
        super.removeEvents();
        EventMgr.off(EventName.CORE_READY, this.onSceneReady, this);
    }

    protected onSceneDestory(): void {
        this.stand();
        this.node.active = true;
        this.pet && (this.pet.node.active = true);
        this.setParent(null);
    }
    protected onSceneReady(): void {
        /**
         * 第一帧衣服未传
         */
        this.initMedal();
    }

    public initMedal(): void {
        //替换光圈
        ServerMgr.sendPost(zmgCommands.carryMedal, null, this.onMedalHandler.bind(this), this);
    }
    private onMedalHandler(res: ICarryMedal) {
        if (res.userCarryMedalInfo) {
            if (res.userCarryMedalInfo.animation1Url) {
                var ske: string = res.userCarryMedalInfo.animation1Url;
                var tex: string = res.userCarryMedalInfo.animation2Url;
                var png: string = res.userCarryMedalInfo.animation3Url;
                this._pet.load(new DragonResAsset(ske, tex, png), this._config.bunName, this._config.shadow);
            }
        }
        if (res.userAbilityMedalInfo) {
            if (res.userAbilityMedalInfo.animation1Url) {
                if (this.isValid) {
                    var ske: string = res.userAbilityMedalInfo.animation1Url;
                    var tex: string = res.userAbilityMedalInfo.animation2Url;
                    var png: string = res.userAbilityMedalInfo.animation3Url;
                    this.setHalo(new DragonResAsset(ske, tex, png));
                }
            }
        }
    }

    public hasEventListener(type: string): boolean {
        return super.hasEventListener(type);
    }
    public on<T extends Function>(type: string, callback: T, target: any, useCapture?: boolean, priority?: number): T {
        return super.on(type, callback, target, useCapture);
    }

    public off(type: string, callback: Function, target: any): void {
        super.off(type, callback, target);
    }
    public targetOff(target: any): void {
        super.targetOff(target);
    }
    public once(type: string, callback: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void, target: any): void {
        super.once(type, callback, target);
    }
    public dispatchEvent(event: cc.Event): void {
        super.dispatchEvent(event);
    }
    public emit(key: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): void {
        super.emit(key, arg1, arg2, arg3, arg4, arg5);
    }
}