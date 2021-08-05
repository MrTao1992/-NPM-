import { $BaseCommand } from "./BaseCommand";
import { ModuleMgr } from "zmg_module_mgr"

export class LogoutGameCmd extends $BaseCommand {
    excute(data) {
        // ModuleMgr.exit();
        // ModuleMgr.back();
        cc.game.end();
    }

}