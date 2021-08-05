import { $BaseCommand } from "./BaseCommand";
import { DataMgr } from "zmg_gamedata_mgr";
import { EnvMgr } from "zmg_env_mgr";
import { _MsgBridge } from "../MsgBridge";

export class GetUserDefaultsCmd extends $BaseCommand {
    excute(data) {
        let key = data.data.key;
        let dd = DataMgr.server.getItem(key)
        dd = dd ? dd : "";
        // _MsgBridge.getInstance().sendMsgToSubMudule({ action: "userDefaults", data: { key: key, value: data } });
        // return { action: "userDefaults", data: { key: key, value: dd } };
        _MsgBridge.getInstance().sendMsgToSubMudule({ action: "userDefaults", data: { key: key, value: dd } });
    }

}