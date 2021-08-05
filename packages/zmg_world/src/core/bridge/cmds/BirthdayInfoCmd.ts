import { EventMgr } from "zmg_event_mgr";
import { $BaseCommand } from "./BaseCommand";

/** 从子模块接受的消息 */
export class BirthdayInfoCmd extends $BaseCommand {

    excute(data) {
        /**
         * 生日信息返回
         */
        EventMgr.emit("birthdayInfo", data);
    }

}