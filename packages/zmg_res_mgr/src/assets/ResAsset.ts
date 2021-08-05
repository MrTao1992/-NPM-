export class $ResAsset implements zmg.IResAsset {
    public bunName: string;
    public path: string;
    constructor(bunName: string, path: string) {
        this.bunName = bunName;
        this.path = path;
    }
}