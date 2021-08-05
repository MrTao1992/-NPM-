import { BaseMgr } from "zmg_mgr";
import { ResListener, ResMgr, SystemBundleName } from "zmg_res_mgr";

/**
 * 声音资源存储获取
 */
export class _AudioRes extends BaseMgr {

    private static _instance: _AudioRes;
    static getInstance(): _AudioRes {
        if (!this._instance) {
            this._instance = new _AudioRes("AudioRes");
        }
        return this._instance;
    }

    private _clickClip: cc.AudioClip;

    async start() {
        super.start();
        ResMgr.load(SystemBundleName.STACK, "audio/effect/tap", new ResListener(this, (click: cc.AudioClip) => {
            click.addRef();
            this._clickClip = click;
        }), this, cc.AudioClip);
    }
    destroy() {
        if (this._clickClip) {
            this._clickClip.decRef();
            this._clickClip = null;
        }
        super.destroy();
    }
    get isValid(): boolean {
        return true;
    }

    public get click(): cc.AudioClip {
        return this._clickClip;
    }
}