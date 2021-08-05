import { EventName } from "zmg_event_mgr";
import { DragonResAsset, DragonResListener, ResMgr } from "zmg_res_mgr";
import { DragonAsset, DragonUtil, gLog, gWarn } from "zmg_util";
import { $ERoleAction } from "./ERoleAction";
import { RoleDressLevel, ERoleLevel } from "./ERoleLevel";
import { RoleClothType } from "./RoleClothType";

export class RoleCloth extends cc.EventTarget {
    public type: RoleClothType;
    protected _displays: Record<string, dragonBones.ArmatureDisplay> = {};
    protected _target: dragonBones.ArmatureDisplay;
    protected _originals: string[];
    protected _config: zmg.IRoleDressItem;
    protected loadcount: number = 0;
    public set target(display: dragonBones.ArmatureDisplay) {
        this._target = display;
    }
    public set config(item: zmg.IRoleDressItem) {
        if (this._config == item) {
            return;
        }
        this._config = item;
        if (this._config) {
            this.load();
        } else {
            this.unLoad();
        }
    }
    public get isLoaded(): boolean {
        if (this.loadcount <= 0) {
            return true;
        }
        return cc.isValid(this._displays[$ERoleAction.STAND]) && cc.isValid(this._displays[$ERoleAction.WALK_LEFT]);
    }
    /**
     * 销毁旧的显示对象
     * 如果有配置则等待加载
     * 如果没有则还原原来的装扮
     */
    public load(): void {
        this.destorySkin();
        if (this._config) {
            let i: number;
            let inf: zmg.IDragonInf;
            let walk: zmg.IDragonInf;
            let stand: zmg.IDragonInf;
            let len = this._config.resourceList.length;
            for (i = 0; i < len; i++) {
                inf = this._config.resourceList[i];
                if (inf.type == 1) {
                    this.loadcount++;
                    walk = inf;
                } else if (inf.type == 3) {
                    this.loadcount++;
                    stand = inf;
                }
            }
            if (walk) {
                ResMgr.loadDragonRemote(new DragonResAsset(walk.dragJson, walk.atlasJson, walk.atlasImg), this.onDragonWalkComplete, this);
            }
            if (stand) {
                ResMgr.loadDragonRemote(new DragonResAsset(stand.dragJson, stand.atlasJson, stand.atlasImg), this.onDragonStandComplete, this);
            }
            return;
        }
    }
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
    private destorySkin(): void {
        if (cc.isValid(this._displays[$ERoleAction.STAND])) {
            this._displays[$ERoleAction.STAND].destroy();
        }
        if (cc.isValid(this._displays[$ERoleAction.WALK_LEFT])) {
            this._displays[$ERoleAction.WALK_LEFT].destroy();
        }
        this._displays = {};
    }
    private unLoad(): void {
        // this._displays.forEach((value: dragonBones.ArmatureDisplay, index: number, array: dragonBones.ArmatureDisplay[]) => {
        //     value.destroy();
        // });
        this.destorySkin();
        this.resetSlotDisplay();
    }
    private onDragonStandComplete(asset: DragonAsset): void {
        let skin: dragonBones.ArmatureDisplay = DragonUtil.createDragon(asset);
        this._displays[$ERoleAction.STAND] = skin;
        this.loadcount--;
        if (this.loadcount <= 0) {
            this.emit(EventName.COMPLETE);
        }
    }
    private onDragonWalkComplete(asset: DragonAsset): void {
        let skin: dragonBones.ArmatureDisplay = DragonUtil.createDragon(asset);
        this._displays[$ERoleAction.WALK_LEFT] = skin;
        this.loadcount--;
        if (this.loadcount <= 0) {
            this.emit(EventName.COMPLETE);
        }
    }
    // private onDisplayComplete(asset: DragonAsset): void {
    //     if (true || asset.asset.nativeUrl == this._config.resourceList[0].atlasImg) {
    //         this._display = DragonUtil.createDragon(asset);
    //         this.replaceSlotDisplay();
    //     }
    // }
    constructor(type: string,) {
        super();
        this.type = type as RoleClothType;
    }
    public get isValid(): boolean {
        return this._target ? true : false;
    }
    public destroy(): void {
        this.destorySkin();
        this._target = null;
    }
    public resetSlotDisplay(): void {
        if (!cc.isValid(this._target)) {
            gLog("对象已被销毁，无法进行换装。");
            return;
        }
        let factory = dragonBones.CCFactory.getInstance();
        let i: number;
        let slot: dragonBones.Slot;
        let key: string;
        let levels: ERoleLevel[] = RoleDressLevel.getLevels(this.type);
        let len = levels.length;
        let armature: dragonBones.Armature = this._target.armature();
        let animaion: string = this._target.animationName;
        for (i = 0; i < len; i++) {
            slot = armature.getSlot(levels[i]);
            let atlasUUID = this._target.dragonAtlasAsset["_uuid"];
            key = this._target.dragonAsset["init"](factory, atlasUUID);
            factory.replaceSlotDisplay(key, animaion, levels[i], levels[i], slot);
        }
    }
    public replaceSlotDisplay(skin?: dragonBones.ArmatureDisplay): void {
        if (!cc.isValid(this._target)) {
            gLog("对象已被销毁，无法进行换装。");
            return;
        }
        let armature: dragonBones.Armature = this._target.armature();
        if (!cc.isValid(armature)) {
            gLog("armature为空，无法进行换装。");
            return;
        }
        let action = armature.name;
        if (skin === undefined) {
            // this._displays.forEach((value: dragonBones.ArmatureDisplay, index: number, array: dragonBones.ArmatureDisplay[]) => {
            //     this.replaceSlotDisplay(value);
            // });
            let d = this._displays[action == $ERoleAction.WALK_LEFT ? $ERoleAction.WALK_LEFT : $ERoleAction.STAND];
            if (d) {
                this.replaceSlotDisplay(d);
            }
            return;
        }
        if (!cc.isValid(skin)) {
            gLog("skin对象已被销毁，无法进行换装。");
            return;
        }
        // cc.Canvas.instance.scheduleOnce(() => {
        let i: number, j: number, cLen: number;
        let slot: dragonBones.Slot;
        let key: string;

        if (!armature) {
            gLog("armature对象已被销毁，无法进行换装。");
            return;
        }
        // skin.armatureName = action;(
        if (skin.getAnimationNames(skin.armatureName).indexOf(action) == -1) {
            gLog("action不存在，无法进行换装。");
            return;
        }
        let factory = dragonBones.CCFactory.getInstance();
        skin.playAnimation(action, 0);
        let clothArmature = skin.armature();
        let slots = cc.sys.isNative ? clothArmature.slots : clothArmature["_slots"];
        if (!slots) {
            gWarn("slots资源为空！！！");
            return;
        }
        cLen = slots.length;
        gLog("进行换装,armature:" + action + " ===================");
        for (j = 0; j < cLen; j++) {
            slot = armature.getSlot(slots[j].name);
            if (slot == null) {
                gWarn("slotName为空:" + slots[j].name);
                continue;
            }
            gLog("替换皮肤,slotName:" + slots[j].name + " ");
            // let atlasUUID = skin.dragonAtlasAsset["_uuid"];
            // key = skin.dragonAsset["init"](factory, atlasUUID);
            let c = cc.sys.isNative ? slots[j].slotData.name : slots[j].displayData.name;
            factory.replaceSlotDisplay(skin.getArmatureKey(), skin.armatureName, slots[j].name, c, slot);
        }
        // gLog("==============================");
        // }, 1);
    }

}