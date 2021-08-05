export class $DragonAssetUrl {
    //1,走路,3:说话，站立
    action: string;
    atlasImg: string;
    atlasJson: string;
    assetJson: string;

    constructor(atlasImg: string, assetJson: string, atlasJson: string, action: string) {
        this.atlasImg = atlasImg;
        this.assetJson = assetJson;
        this.atlasJson = atlasJson;
        this.action = action;
    }
}