import { AudioMgr } from "zmg_audio_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import { gLog } from "zmg_util";
import { _MsgBridge } from "../MsgBridge";
import { $BaseCommand } from "./BaseCommand";

export class GamePauseCmd extends $BaseCommand {
    excute(data) {
        cc.game.pause();
        AudioMgr.stopAll();
        gLog("onPagePause data:", data);
        EventMgr.emit(EventName.ON_PAGE_PAUSE);
        // _MsgBridge.getInstance().sendMsgToSubMudule("onPagePause");
        return { action: "onPagePause" };
    }

}