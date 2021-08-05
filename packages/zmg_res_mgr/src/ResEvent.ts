import { $EResEventName } from "./EResEventName";
import { DragonAsset } from "zmg_util";

export class $ResEvent extends cc.Event {
    /**
     * 路径
     */
    public errorPath: string | string[];
    public path: string | string[];
    public bunName: string;
    public finish: number;
    public total: number;
    public assets: cc.Asset | cc.Asset[] | DragonAsset;
    constructor(type: $EResEventName, bunName: string, path: string | string[], assets?: cc.Asset | cc.Asset[] | DragonAsset) {
        super(type, false);
        this.bunName = bunName;
        this.errorPath = path;
        this.path = path;
        this.assets = assets;
    }
}