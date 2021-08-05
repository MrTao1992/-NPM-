import { StringUtil } from "zmg_util";

export class $DragonResAsset implements zmg.IDragonResAsset {
    /**
    * 目录
    */
    dir: string;
    /**
     * 图片地址
     */
    tex: string;
    /**
     * asset地址
     */
    asset: string;
    /**
     * atlas地址
     */
    atlas: string;
    constructor(dir: string, asset?: string, tex?: string) {
        if (asset && tex) {
            this.atlas = dir;
            this.asset = asset;
            this.tex = tex;
        } else {
            this.dir = dir;
        }
    }

    public isDir(): boolean {
        return StringUtil.isValid(this.dir);
    }
}