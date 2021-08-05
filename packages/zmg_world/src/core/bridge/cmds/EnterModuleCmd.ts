import { ModuleMgr } from "zmg_module_mgr";
import { $BaseCommand } from "./BaseCommand";

export class EnterModuleCmd extends $BaseCommand {
    excute(data) {
        let key: string = data.data['key'];
        key = key.replace("ZM_", "");
        ModuleMgr.openByCode(key);
    }

}