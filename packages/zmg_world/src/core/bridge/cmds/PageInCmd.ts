import { $BaseCommand } from "./BaseCommand";

/** 从子模块接受的消息 */
export class PageInCmd extends $BaseCommand {

    excute(data) {
        /**
         * 返回到大厅
         */
        // ClientMsgMgr.getInstance().sengPageInMsgToClient('pageIn', data.data, () => { });
    }

}