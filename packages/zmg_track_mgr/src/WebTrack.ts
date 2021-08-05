import { EEnv, EnvMgr } from "zmg_env_mgr"
import { TrackModule } from "./TrackModule"
import { $ConfigEvent } from "zmg_config_mgr";
import { ConfigMgr } from "zmg_config_mgr";

export class WebTrack {
    public initTrack(S: any) {
        if (ConfigMgr.isValid) {
            this.init(S)
        } else {
            ConfigMgr.once($ConfigEvent.LOADED, this.init.bind(this, S), this);
        }
    }

    init(S: zmg.IWebTrackSDK) {
        let appVersion = '1.0.2.2'
        let userId = EnvMgr.getUserId()
        let appId = parseInt(ConfigMgr.getAppId())
        let curEnv = EnvMgr.getEnv()
        if (S) {
            S.setConfig({
                environment: curEnv,
                logLevel: curEnv == EEnv.PROD ? 'error' : 'debug',
            })
            S.setDefaults({
                appId: appId,
                appVersion: appVersion,
                userId: userId
            });
        }
    }

    public send(S: zmg.IWebTrackSDK) {
        let eventData = {
            eventId: TrackModule.key,
            eventType: TrackModule.eventType,
            eventParam: TrackModule.param,
        }
        if (TrackModule.extParam) {
            for (var p in TrackModule.extParam) {
                eventData[p] = TrackModule.extParam[p]
            }
        }
        S.sendEvent(eventData);
    }
}