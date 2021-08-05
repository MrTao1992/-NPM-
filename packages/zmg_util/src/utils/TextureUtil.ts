export class $TextureUtil {
    public static isValid(tex: cc.Texture2D | cc.Texture2D[]): boolean {
        if (tex instanceof Array) {
            let i: number;
            let len: number = tex.length;
            for (i = 0; i < len; i++) {
                if (!cc.isValid(tex[i])) {
                    return false;
                }
            }
            return true;
        }
        return cc.isValid(tex);
    }
    static format(tex: any): void {
        if (tex) {
            if (tex instanceof cc.Texture2D) {
                tex.setPremultiplyAlpha(true);
            } else if (tex instanceof dragonBones.ArmatureDisplay) {
                tex.premultipliedAlpha = true;
            } else if (tex instanceof cc.Sprite) {
                tex.srcBlendFactor = cc.macro.ONE;
            } else if (tex instanceof cc.Node) {
                this.format(tex.getComponent(cc.Sprite));
                this.format(tex.getComponent(dragonBones.ArmatureDisplay));
            } else if (tex instanceof Array) {
                tex.forEach((value: any, index: number, array: any[]) => {
                    $TextureUtil.format(value);
                });
            }
        }
    }
}