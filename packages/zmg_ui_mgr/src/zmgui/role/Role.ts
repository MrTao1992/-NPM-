import { AudioMgr } from "zmg_audio_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import { DragonResListener, ResMgr } from "zmg_res_mgr";
import { DragonAsset, DragonAssetUrl, DragonUtil, gLog, gWarn, SpriteUtil } from "zmg_util";
import { RoleCloth } from "./RoleCloth";
import { $ERoleAction } from "./ERoleAction";
import { RoleClothType } from "./RoleClothType";
import { Pet } from "./Pet";
import { $RoleEvent } from "./RoleEvent";
import { DragonResAsset } from "zmg_res_mgr";
import { $UIMouseEvent } from "../../events/UIMouseEvent";

/**
 * 
 */

export class $Role extends cc.Component implements zmg.IRole, cc.EventTarget {
    protected _config: zmg.IRoleConfig;
    protected _action: $ERoleAction;
    protected _pet: Pet;
    /**
     * 当前语音
     */
    protected _currentAudioClip: cc.AudioClip;
    /**
     * 龙骨动画
     */
    protected _display: dragonBones.ArmatureDisplay;
    /**
     * 身上的服装配置
     */
    protected _cloths: RoleCloth[] = [];
    private _isMouseDown: boolean;
    protected _shadow: cc.Sprite;
    protected _halo: dragonBones.ArmatureDisplay;
    protected _dressList: zmg.IRoleDressItem[] = [];
    /**
     * 阴影
     */
    public get pet(): zmg.IPet {
        return this._pet;
    }
    public get shadow(): cc.Sprite {
        return this._shadow;
    }
    public get halo(): dragonBones.ArmatureDisplay {
        return this._halo;
    }
    public getAction(): $ERoleAction {
        return this._action;
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
    public get dressList(): zmg.IRoleDressItem[] {
        return this._dressList;
    }
    public setPostion(newPosOrX: number | cc.Vec2 | cc.Vec3, y?: number): void {
        this.node.setPosition(newPosOrX, y);
    }
    public setParent(parent: cc.Node): void {
        if (!this.isValid) {
            return;
        }
        this.node.setParent(parent);
        if (parent) {
            this.reset();
        }
    }
    private async loadDragon(): Promise<void> {
        if (this._config) {
            return new Promise((resolve, reject) => {
                ResMgr.loadDragon(this._config.bunName, this._config.path, new DragonResListener(this, (dragonAsset: DragonAsset) => {
                    let dNode: cc.Node = this.node.getChildByName("roleNode");
                    this._display = DragonUtil.createDragon(dragonAsset, dNode, "roleNode");
                    dNode = this._display.node;
                    dNode.anchorY = 0.1;
                    dNode.zIndex = 1;
                    if (dNode.parent == null) dNode.setParent(this.node);
                    this.initDisplay();
                    resolve && resolve();
                }), this);
            });
        } else {
            return;
        }
    }
    public async reset() {
        if (!this.isValid) {
            return;
        }
        if (!cc.isValid(this.node)) {
            return;
        }
        if (!cc.isValid(this._display)) {
            await this.loadDragon();
        }
        this.updateAction(this._action);
        let i: number;
        let len: number = this._cloths.length;
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
            } else {
                this._shadow.node.active = true;
                this._halo.node.active = false;
            }
        }
    }
    constructor() {
        super();
        this._cloths = [
            new RoleCloth(RoleClothType.BACKWEAR),
            new RoleCloth(RoleClothType.HANDHELD),
            new RoleCloth(RoleClothType.HEADWEAR),
            new RoleCloth(RoleClothType.SET),
            new RoleCloth(RoleClothType.SHOES),
        ];
        let i: number;
        let len: number = this._cloths.length;
        for (i = 0; i < len; i++) {
            this._cloths[i].on(EventName.COMPLETE, this.onClothComplete, this, false);
        }
        let pNode = new cc.Node();
        pNode.name = "petNode";
        this._pet = pNode.addComponent(Pet);
        this.addEvents();

        let dNode = new cc.Node();
        dNode.name = "roleNode";
        this._display = DragonUtil.createDragon(null, dNode);
    }
    onLoad() {
        let sn: cc.Node;
        if (!this._halo) {
            sn = this.node.getChildByName("halo");
            this._halo = DragonUtil.createDragon(null, sn);
            sn = this._halo.node;
            sn.name = "halo";
            sn.active = false;
            sn.scale = 0.7;
            if (sn.parent == null) sn.setParent(this.node);
        }
        if (!this._shadow) {
            sn = this.node.getChildByName("shadow");
            sn = SpriteUtil.createNodeFrame(null, sn);
            this._shadow = sn.getComponent(cc.Sprite);
            sn.name = "shadow";
            sn.active = false;
            if (sn.parent == null) sn.setParent(this.node);
        }
        this._display.node.setParent(this.node);
        EventMgr.on(EventName.UI_MOUSE_UP, this.onMouseUp, this, false, 1);
        EventMgr.on(EventName.UI_MOUSE_DOWN, this.onMouseDown, this, false, 1);
    }
    public async initConfig(config: zmg.IRoleConfig) {
        console.log("创建角色");
        this.node.name = config.rName;
        if (this.node.parent) {
            this._pet.node.setParent(this.node.parent);
        }
        this._pet.setPostion(this.node.x + 150, this.node.y);
        this._action = $ERoleAction.STAND;
        this._config = config;
        ResMgr.load(config.bunName, config.shadow, (res: cc.Texture2D) => {
            let sn: cc.Node = this.node.getChildByName("shadow");
            sn = SpriteUtil.createNodeFrame(res, sn);
            this._shadow = sn.getComponent(cc.Sprite);
            sn.name = "shadow";
            sn.zIndex = -1;
            sn.setParent(this.node);
            if (this._halo && this._halo.node.active) {
                sn.active = false;
            } else {
                sn.active = true;
            }
        }, this);
        this.loadDragon().then(() => {
            this.updateAction(this._action);
            this.dress(this._dressList);
        });
        // ResMgr.loadDragon(config.bunName, config.path, new DragonResListener(this, (dragonAsset: DragonAsset) => {
        //     this._display = DragonUtil.createDragon(dragonAsset, null, this._config.rName + "Node");
        //     this._display.node.anchorY = 0.1;
        //     this._display.node.zIndex = 1;
        //     this._display.node.setParent(this.node);
        //     this.updateAction(this._action);
        //     this.initDisplay();
        // }));
    }
    public setHalo(path: DragonResAsset): void {
        if (path) {
            ResMgr.loadDragonRemote(path, (dragon: DragonAsset) => {
                this._shadow && (this._shadow.node.active = false);
                let sNode = this.node.getChildByName("halo");
                this._halo = DragonUtil.createDragon(dragon, sNode);
                sNode = this._halo.node;
                DragonUtil.play(this._halo);
                sNode.active = true;
                sNode.name = "halo";
                sNode.scale = 0.7;
                if (!sNode.parent) {
                    sNode.setParent(this.node);
                }
            }, this);
        } else {
            this._shadow.node.active = true;
            this._halo.node.active = false;
        }
    }
    public hitTest(pos: cc.Vec2): boolean {
        if (this._display) {
            return this._display.node["_hitTest"](pos);
        }
        return false;
    }

    public takeOff(cloth: zmg.IRoleDressItem): void {
        let i: number;
        let len: number = this._dressList.length;
        for (i = 0; i < len; i++) {
            if (this._dressList[i].productLocaCode == cloth.productLocaCode) {
                this._dressList.splice(i, 1);
                break;
            }
        }
        this.dress(this._dressList);
    }
    public takeOn(cloth: zmg.IRoleDressItem): void {
        let i: number;
        let isCloth: boolean;
        let len: number = this._dressList.length;
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
    }
    public dress(cloths: zmg.IRoleDressItem[]): void {
        this._dressList = cloths;
        let i: number, j: number;
        let isFinded: boolean;
        let isChange: boolean;
        let c: RoleCloth;
        let len: number = 0;
        let cLen: number = 0;
        if (this._cloths) len = this._cloths.length;
        if (cloths) cLen = cloths.length;
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
    }
    public doAction(action: $ERoleAction): void {
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
    }
    public stopTalk(): void {
        if (this._currentAudioClip) {
            AudioMgr.stopEffect(this._currentAudioClip, true);
            this._currentAudioClip = null;
        }
    }
    public talk(clip: cc.AudioClip): void {
        if (AudioMgr.hasEffect(clip)) {
            return;
        }
        if (this._currentAudioClip) {
            AudioMgr.stopEffect(this._currentAudioClip);
            this._currentAudioClip = null;
        }
        this._currentAudioClip = clip;
        AudioMgr.playEffect(clip, () => {
            if (this._currentAudioClip == clip) {
                this._currentAudioClip = null;
                if (this._action == $ERoleAction.TALK) {
                    this.doAction($ERoleAction.STAND);
                }
            }
        }, this, 1);
        this.doAction($ERoleAction.TALK);
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
    /**
     * 场景切换的时候进行销毁
     */
    public onDestroy(): void {
        this._halo = null;
        this._shadow = null;
        this._cloths.length = 0;
        this._cloths = null;
        this._currentAudioClip = null;
        this.setParent(null);
        this._config = null;
        this.removeEvents();
    }
    protected initDisplay(): void {
        if (cc.isValid(this._display)) {
            let i: number;
            let len: number = this._cloths.length;
            for (i = 0; i < len; i++) {
                this._cloths[i].target = this._display;
            }
        }
    }
    protected naked(): void {
    }
    protected onClothComplete(cloth?: RoleCloth): void {
        // let i: number;
        // let len: number = this._cloths.length;
        // for (i = 0; i < len; i++) {
        //     if (!this._cloths[i].isLoaded) {
        //         return;
        //     }
        // }
        this.updateDress(cloth);
    }
    protected updateAction(action: string): void {
        if (DragonUtil.isValid(this._display)) {
            this._display.armatureName = action;
            this._display.playAnimation(action, 0);
        }
    }
    protected updateDress(cloth?: RoleCloth): void {
        let bool = this.node.active;
        this.node.active = true;
        if (!this.node.activeInHierarchy) {
            this.node.active = bool;
            gLog("人物对象显示状态才可以进行服装替换。");
            return;
        }
        if (!DragonUtil.isValid(this.display)) {
            this.node.active = bool;
            gLog("人物对象已初始化才可进行服装替换。");
            return;
        }
        if (cloth) {
            cloth.replaceSlotDisplay();
        } else {
            let i: number;
            let len: number = this._cloths.length;
            for (i = 0; i < len; i++) {
                this._cloths[i].replaceSlotDisplay();
            }
        }
        this.node.active = bool;
    }

    protected addEvents(): void {
        EventMgr.on(EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this, false);
    }
    protected removeEvents(): void {
        EventMgr.off(EventName.UI_MOUSE_UP, this.onMouseUp, this);
        EventMgr.off(EventName.UI_MOUSE_DOWN, this.onMouseDown, this);
        EventMgr.off(EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this);
    }
    private onMouseUp(evt: $UIMouseEvent): void {
        if (!this.node.active) {
            return;
        }
        if (this._isMouseDown) {
            this._isMouseDown = false;
            if (this.hitTest(evt.worldPos)) {
                evt["stopped"]();
                this.emit(EventName.CLICK, this);
            }
        }
    }

    private onMouseDown(evt: $UIMouseEvent): void {
        if (!this.node.active) {
            return;
        }
        if (this.hitTest(evt.worldPos)) {
            this._isMouseDown = true;
            evt["stopped"]();
        }
    }
    protected onSceneDestory(): void {
        this.onDestroy();
    }
    protected getClothByType(type: string): RoleCloth {
        let i: number;
        let len: number = this._cloths.length;
        for (i = 0; i < len; i++) {
            if (this._cloths[i].type == type) {
                return this._cloths[i];
            }
        }
        let cloth: RoleCloth = new RoleCloth(type);
        cloth.target = this._display;
        this._cloths.push(cloth);
        return cloth;
    }

    public hasEventListener(type: string): boolean {
        if (this.isValid) {
            return this.node.hasEventListener(type);
        }
    }
    public on<T extends Function>(type: string, callback: T, target?: any, useCapture?: boolean, priority?: number): T {
        if (this.isValid) {
            return this.node.on(type, callback, target, useCapture, priority);
        }
    }

    public off(type: string, callback?: Function, target?: any): void {
        if (this.isValid) {
            this.node.off(type, callback, target);
        }
    }
    public targetOff(target: any): void {
        if (this.isValid) {
            this.node.targetOff(target);
        }
    }
    public once(type: string, callback: (arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any) => void, target?: any): void {
        if (this.isValid) {
            this.node.once(type, callback, target);
        }
    }
    public dispatchEvent(event: cc.Event): void {
        if (this.isValid) {
            this.node.dispatchEvent(event);
        }
    }
    public emit(key: string, arg1?: any, arg2?: any, arg3?: any, arg4?: any, arg5?: any): void {
        if (this.isValid) {
            this.node.emit(key, arg1, arg2, arg3, arg4, arg5);
        }
    }
    public removeAll(): void {
    }
}