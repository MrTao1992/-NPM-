import { $BaseCommand } from "./BaseCommand";
import { DataMgr } from "zmg_gamedata_mgr";

export class SetUserDefaultsCmd extends $BaseCommand {
    excute(data) {
        let key = data.data['key'];
        let value: string = data.data['value'];
        DataMgr.server.setItem(key, value);
    }

}