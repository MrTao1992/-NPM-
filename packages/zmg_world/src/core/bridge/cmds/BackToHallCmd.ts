import { $BaseCommand } from "./BaseCommand";
import { ModuleMgr } from "zmg_module_mgr"

export class BackToHallCmd extends $BaseCommand {
    excute(data) {
        ModuleMgr.back();
    }

}