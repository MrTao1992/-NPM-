import { $TrackEventType } from "./TrackEventType";
import { TrackModule } from "./TrackModule";

export class NativeTrack {

    public initTrack(S: zmg.INativeTrackSDK) {
        if (S) {
            S.setLogConfig(S.appId(), S.appVersion())
        }
    }

    public send(S: zmg.INativeTrackSDK) {
        if (S) {
            let type = TrackModule.eventType
            let eventType = 0
            switch (type) {
                case $TrackEventType.Load:
                    eventType = 1
                    break;
                case $TrackEventType.Custom:
                    eventType = 2
                    break;
                default:
                    break;
            }
            S.sendEvent(TrackModule.key, TrackModule.param, eventType)
        }
    }
}
