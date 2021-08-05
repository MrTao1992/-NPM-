import { AudioMgr } from "zmg_audio_mgr";
import { EventMgr, EventName } from "zmg_event_mgr";
import { gLog } from "zmg_util";
import { $BaseCommand } from "./BaseCommand";

export class GameResumeCmd extends $BaseCommand {
    excute(data) {
        cc.game.resume();
        AudioMgr.resumeAllMusic();
        gLog("onPageResume data:", data);
        EventMgr.emit(EventName.ON_PAGE_RESUME);
        // _MsgBridge.getInstance().sendMsgToSubMudule("onPageResume");
        return { action: "onPageResume" };
    }

}