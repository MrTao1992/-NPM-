import { AudioMgr } from "zmg_audio_mgr";
import { DirectorMgr } from "zmg_controller";
import { DirectorEvent } from "zmg_controller";
import { EventMgr } from "zmg_event_mgr";
import { EventName } from "zmg_event_mgr";
import { Actor } from "zmg_ui_mgr";
import { gLog, StringUtil } from "zmg_util";
import RoleTips from "../comp/RoleTips";

const { ccclass, property } = cc._decorator;

export default class $zmBaseScene extends cc.Component {
    private _sceneName: string;

    @property({ tooltip: "背景音乐" })
    audioPath: string = "";

    onLoad() {
        this._sceneName = cc.director.getScene().name;
        this.playBgclip();
        gLog("SceneName: " + this._sceneName + " onLoaded");
        EventMgr.on(EventName.CONTROLLER_CHANGE_END, this.onSceneEnd, this, false);

    }
    onDestroy() {
        gLog("SceneName: " + this._sceneName + " onDestroy");
        let factory = dragonBones.CCFactory.getInstance();
        EventMgr.off(EventName.CONTROLLER_CHANGE_END, this.onSceneEnd, this);
        if (Actor().node) {
            Actor().node.removeComponent(RoleTips)
        }
    }

    protected onSceneEnd(evt: DirectorEvent): void {

    }

    protected playBgclip(): void {
        if (StringUtil.isValid(this.audioPath)) {
            if (this.audioPath != DirectorMgr.bgclip) {
                DirectorMgr.bgclip = this.audioPath;
            }
        }
    }
}