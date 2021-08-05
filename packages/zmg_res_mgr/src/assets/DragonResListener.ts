import { $ResListener } from "../ResListener";
import { DragonAsset } from "zmg_util";
import { $ResEvent } from "../ResEvent";
import { $EResEventName } from "../EResEventName";
import { $DragonResAsset } from "./DragonResAsset";

export class $DragonResListener extends $ResListener implements zmg.IDragonResListener {

    source: zmg.IDragonResAsset;

    public set path(value: string | string[]) {
        if (!this.source) {
            this.source = new $DragonResAsset("");
        }
        if (value instanceof Array) {
            this.source.asset = value[0];
            this.source.atlas = value[1];
            this.source.tex = value[2];
        } else {
            this.source.dir = value;
        }
        this._path = value;
    }

    public get path(): string | string[] {
        return this._path;
    }

    constructor(target: any,
        onLaunch: (assets: DragonAsset, listener?: zmg.IResListener) => void,
        errorBack?: (path: string, listener?: zmg.IResListener) => void,
        progressFun?: (path: string, pro: number, total: number, listener?: zmg.IResListener) => void
    ) {
        super(target, onLaunch, errorBack, progressFun);
    }

    public onLaunch(assets: cc.Asset[]): $ResEvent {
        if (!cc.isValid(this.target)) {
            //节点已被销毁
            return null;
        }
        assets = assets ? assets : this.getAsset() as cc.Asset[];
        let bool: boolean;
        let evt: $ResEvent;
        let dragAsset: DragonAsset = new DragonAsset();
        if (assets) {
            if (this.source.isDir()) {
                bool = dragAsset.initByAsset(assets);
            } else {
                bool = dragAsset.initRemoteAsset((assets[0] as cc.TextAsset), (assets[1] as cc.TextAsset), assets[2] as cc.Texture2D);
            }
        }
        if (bool) {
            evt = new $ResEvent($EResEventName.DRAGON_COMPLETE, this.bunName, this.path, dragAsset);
            if (this.launchFun) {
                this.launchFun.call(this.target, dragAsset, this);
            }
        } else {
            evt = new $ResEvent($EResEventName.DRAGON_ERROR, this.bunName, this.path);
            this.onError(this.path);
        }
        return evt;
    }

}