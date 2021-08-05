export class $ResUtil {
    public static isValidAsset(asset: cc.Asset | cc.Asset[]): boolean {
        if (asset instanceof Array) {
            let i: number;
            let len: number = asset.length;
            for (i = 0; i < len; i++) {
                if (!asset[i] || !asset[i].isValid || !asset[i].loaded) {
                    return false;
                }
            }
        } else {
            if (!asset || !asset.isValid || !asset.loaded) {
                return false;
            }
        }
        return true;
    }

    public static setPremultiplyAlpha(asset: cc.Asset | cc.Asset[]): void {
        if (asset instanceof Array) {
            let i: number;
            let len: number = asset.length;
            for (i = 0; i < len; i++) {
                if (asset[i] instanceof cc.SceneAsset) {
                    return;
                }
                if (asset[i] instanceof cc.Texture2D) {
                    let t = (asset[i] as cc.Texture2D);
                    t.width && t.height && t.setPremultiplyAlpha(true);
                }
            }
        } else if (asset instanceof cc.Texture2D) {
            asset.width && asset.height && asset.setPremultiplyAlpha(true);
        }
    }
}