import { EventMgr, EventName } from "zmg_event_mgr";
import { DragonResAsset, ResMgr } from "zmg_res_mgr";
import { DragonAsset, DragonUtil, SpriteUtil } from "zmg_util";
import { $EPetAction } from "./ERoleAction";


export class Pet extends cc.Component implements zmg.IPet {
    protected _action: $EPetAction;
    private _shadow: cc.Node;
    private _display: dragonBones.ArmatureDisplay;
    public get display(): dragonBones.ArmatureDisplay {
        return this._display;
    }
    public getAction(): $EPetAction {
        return this._action;
    }
    public setScale(value: number): void {
        this.node.setScale(value);
    }
    public setParent(parent: cc.Node): void {
        this.node.setParent(parent);
    }
    public setPostion(newPosOrX: number | cc.Vec2 | cc.Vec3, y?: number): void {
        this.node.setPosition(newPosOrX, y);
    }
    onLoad() {
        EventMgr.on(EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this, false);
    }
    private onSceneDestory(): void {
        this.setParent(null);
    }
    public load(path: DragonResAsset, shadowBunName: string, shadowPath: string): void {
        //存在层级问题
        this._action = $EPetAction.UNKNOW
        ResMgr.load(shadowBunName, shadowPath, (tex: cc.Texture2D) => {
            this._shadow = SpriteUtil.createNodeFrame(tex);
            this._shadow.name = "shadow";
            this._shadow.zIndex = 0;
            this._shadow.scale = 0.3;
            this._shadow.setParent(this.node);
        }, this);
        ResMgr.loadDragonRemote(path, (asset: DragonAsset) => {
            this._display = DragonUtil.createDragon(asset, null, "petDisplay");
            this._display.node.setParent(this.node);
            this._display.node.zIndex = 1;
            this.stand();
        }, this);
    }
    /**
     * 销毁
     */
    public onDestroy(): void {
        EventMgr.off(EventName.CONTROLLER_CHANGE_DESTORY, this.onSceneDestory, this);
    }
    /**
    * 执行动作
    * @param action 
    */
    public doAction(action: $EPetAction): void {
        if (this._action == action) {
            return;
        }
        this._action = action;
        if (this._display) {
            this._display.playAnimation(action, 0);
        }
    }
    /**
    * 站立
    */
    public stand(): void {
        this.doAction($EPetAction.STAND);
    }
    /**
     * 向右行走
     */
    public walkRight(): void {
        if (cc.isValid(this.display)) {
            this.display.node.scaleX = Math.abs(this.display.node.scaleX);
            this.doAction($EPetAction.WALK);
        }

    }
    /**
     * 向左行走
     */
    public walkLeft(): void {
        if (cc.isValid(this.display)) {
            this.display.node.scaleX = -Math.abs(this.display.node.scaleX);
            this.doAction($EPetAction.WALK);
        }
    }
}