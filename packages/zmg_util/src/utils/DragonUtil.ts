import { $DragonAsset } from "../assets/DragonAsset";
import { _gLog, _gWarn } from "../log/gLog";
import { $StringUtil } from "./StringUtil";

export class $DragonUtil {
    public static isValid(display: dragonBones.ArmatureDisplay | dragonBones.ArmatureDisplay[]): boolean {
        if (display instanceof Array) {
            let i: number;
            let d: dragonBones.ArmatureDisplay;
            let len: number = display.length;
            for (i = 0; i < len; i++) {
                d = display[i];
                if (!cc.isValid(d) || !this.isValidAsset(d.dragonAsset, d.dragonAtlasAsset)) {
                    return false;
                }
            }
            return true;
        } else {
            if (!cc.isValid(display)) {
                return false;
            }
        }
        return this.isValidAsset(display.dragonAsset, display.dragonAtlasAsset);
    }
    // public static isValid(display: dragonBones.ArmatureDisplay): boolean {
    //     if (!display) {
    //         return false;
    //     }
    //     if (!display.isValid) {
    //         return false;
    //     }
    //     return this.isValidAsset(display.dragonAsset, display.dragonAtlasAsset);
    // }
    public static isValidAsset(asset: dragonBones.DragonBonesAsset, atlas: dragonBones.DragonBonesAtlasAsset): boolean {
        if (!asset) {
            return false;
        }
        if (!atlas) {
            return false;
        }
        if (!asset.isValid) {
            return false;
        }
        if (!atlas.isValid) {
            return false;
        }
        var tex = atlas.texture;
        if (!tex) {
            return false;
        }
        if (!tex.isValid) {
            return false;
        }
        return true;
    }
    public static createDragon(dragon: $DragonAsset, node?: cc.Node, name?: string): dragonBones.ArmatureDisplay {
        var node: cc.Node = cc.isValid(node) ? node : new cc.Node();
        name && (node.name = name);
        var d: dragonBones.ArmatureDisplay;
        d = node.getComponent(dragonBones.ArmatureDisplay);
        if (d) {
            $DragonUtil.destroyDragon(d);
        } else {
            d = node.addComponent(dragonBones.ArmatureDisplay);
        }
        $DragonUtil.install(d, dragon);
        return d;
    }
    public static destroyDragon(display: dragonBones.ArmatureDisplay): void {
        if (display) {
            display.dragonAsset = null;
            display.armatureName = null;
            display.animationName = null;
            display.dragonAtlasAsset = null;
        }
    }
    public static install(display: dragonBones.ArmatureDisplay, dragon: $DragonAsset): void {
        if (display && display.isValid) {
            this.destroyDragon(display);
            if (dragon && dragon.isValid) {
                var dNode: cc.Node = display.node;
                display.dragonAsset = dragon.asset;
                display.dragonAtlasAsset = dragon.atlas;
                display.premultipliedAlpha = true;
                if (cc.sys.isNative && dragon.asset.dragonBonesJson) {
                    var armature = JSON.parse(dragon.asset.dragonBonesJson).armature[0];
                    if (armature) {
                        var aabb: any = armature.aabb;
                        dNode && aabb && dNode.setContentSize(aabb.width, aabb.height);
                    }
                }
                var animation: any = JSON.parse(dragon.asset.dragonBonesJson);
                if (animation && animation.armature && animation.armature.length) {
                    display.armatureName = animation.armature[0].name;
                }
            }
        }
    }
    public static play(display: dragonBones.ArmatureDisplay, animationName?: string, playTime?: number): dragonBones.AnimationState {

        if (display == null || !display.isValid) {
            _gWarn("播放对象非法!");
            return null;
        }
        if (display["_cacheMode"] != dragonBones.ArmatureDisplay.AnimationCacheMode.REALTIME) {
            _gWarn("当前非法display：" + display.node.name);
        }
        if (display.dragonAsset == null || !display.dragonAsset.isValid) {
            _gWarn("当前非法dragonAsset：" + display.node.name);
            return;
        }
        if (display.dragonAtlasAsset == null || !display.dragonAtlasAsset.isValid) {
            _gWarn("当前非法dragonAtlasAsset：" + display.node.name);
            return;
        }
        var asset: dragonBones.DragonBonesAsset = display.dragonAsset;
        var animation: any = JSON.parse(asset.dragonBonesJson);
        playTime = playTime ? playTime : 0;
        if (animation && animation.armature && animation.armature.length) {
            if (!$StringUtil.isValid(display.armatureName)) {
                display.armatureName = animation.armature[0].name;
            }
            if (animationName == null || animationName == "") {
                var anis: any = animation.armature[0].animation;
                animationName = anis[0];
                if (!$StringUtil.isValid(animationName)) {
                    animationName = animationName["name"];
                }
            }
            if ($StringUtil.isValid(animationName)) {
                return display.playAnimation(animationName, playTime);
            } else {
                _gLog("动画播放名非法:", animationName);
            }
        }
        return null;
    }
}