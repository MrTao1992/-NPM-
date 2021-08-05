import { _gLog } from "../log/gLog";
import { $DragonUtil } from "../utils/DragonUtil";

export class $DragonAsset extends cc.Asset {
    public asset: dragonBones.DragonBonesAsset;
    public atlas: dragonBones.DragonBonesAtlasAsset;

    public destroy(): boolean {
        this.asset.destroy();
        this.atlas.destroy();
        this.asset = null;
        this.atlas = null;
        return super.destroy();
    }

    // public addRef(): cc.Asset {
    //     this.asset.addRef();
    //     this.atlas.addRef();
    //     return this;
    // }
    // public decRef(): cc.Asset {
    //     this.asset.decRef();
    //     this.atlas.decRef();
    //     return this;
    // }

    init(asset: dragonBones.DragonBonesAsset, atlas: dragonBones.DragonBonesAtlasAsset): boolean {
        if (!$DragonUtil.isValidAsset(asset, atlas)) {
            _gLog("资源不存在或已被销毁，无法使用!");
            return false;
        }
        this.asset = asset;
        this.atlas = atlas;
        this.loaded = true;
        return true;
    }
    initRemoteAsset(assetAsset: cc.TextAsset | cc.JsonAsset, atlasAsset: cc.TextAsset | cc.JsonAsset, tex: cc.Texture2D): boolean {
        if (!cc.isValid(tex)) {
            return false;
        }
        var asset = new dragonBones.DragonBonesAsset();
        asset["_uuid"] = assetAsset["_uuid"];
        if (assetAsset instanceof cc.TextAsset) {
            asset.dragonBonesJson = assetAsset.text;
        } else {
            asset.dragonBonesJson = JSON.stringify(assetAsset.json);
        }
        var atlas = new dragonBones.DragonBonesAtlasAsset();
        tex && tex.width && tex.height && tex.setPremultiplyAlpha(true);
        atlas["_uuid"] = atlasAsset["_uuid"];
        if (atlasAsset instanceof cc.TextAsset) {
            atlas.atlasJson = atlasAsset.text;
        } else {
            atlas.atlasJson = JSON.stringify(atlasAsset.json);
        }

        atlas.texture = tex;
        this.loaded = true;
        return this.init(asset, atlas);
    }
    initByAsset(assets: cc.Asset[]): boolean {
        var i: number;
        var ast: cc.Asset;
        var tex: cc.Texture2D;
        var asset: dragonBones.DragonBonesAsset;
        var atlas: dragonBones.DragonBonesAtlasAsset;
        var len: number = assets.length;
        for (i = 0; i < len; i++) {
            ast = assets[i];
            if (ast instanceof dragonBones.DragonBonesAsset) {
                asset = ast;
            } else if (ast instanceof dragonBones.DragonBonesAtlasAsset) {
                atlas = ast;
            } else if (ast instanceof cc.Texture2D) {
                ast && ast.width && ast.height && ast.setPremultiplyAlpha(true);
                tex = ast;
            } else if (ast instanceof cc.JsonAsset) {
                if (ast.nativeUrl.indexOf("ske") != -1) {
                    asset = new dragonBones.DragonBonesAsset();
                    asset.dragonBonesJson = ast.json;
                } else if (ast.nativeUrl.indexOf("tex") != -1) {
                    atlas = new dragonBones.DragonBonesAtlasAsset();
                    atlas.atlasJson = ast.json;
                }
            }
        }
        if (!cc.isValid(tex)) {
            return false;
        }
        if (atlas) {
            if (atlas.texture == null || !atlas.texture.isValid) {
                atlas.texture = tex;
            } else {
                if (!atlas.texture.isValid) {
                    atlas.isValid = true;
                    atlas.texture = tex;
                }
            }
        }
        return this.init(asset, atlas);
    }
}