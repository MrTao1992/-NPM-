import { BaseMgr } from "zmg_mgr"
import { EnvMgr } from "zmg_env_mgr"
import { ConfigMgr } from "zmg_config_mgr"
import { TrackModule } from "./TrackModule";
import { NativeTrack } from "./NativeTrack";
import { WebTrack } from "./WebTrack";
import { $TrackEventType } from "./TrackEventType";

export class _TrackMgr extends BaseMgr implements zmg.ITrackMgr {
    private static _instance: _TrackMgr;
    private trackSdk: zmg.IWebTrackSDK | zmg.INativeTrackSDK = null
    private delegate: any = null
    public static getInstance() {
        if (!this._instance) {
            this._instance = new _TrackMgr();
        }
        return this._instance;
    }

    constructor() {
        super();
    }

    public async start() {
        super.start();
    }

    public initTrack(S?: zmg.IWebTrackSDK | zmg.INativeTrackSDK) {
        this.trackSdk = S
        if (cc.sys.isNative) {
            this.delegate = new NativeTrack()
        } else {
            this.delegate = new WebTrack()
        }
        this.delegate.initTrack(this.trackSdk)
    }
    send(key: string, data?: any, eventType: $TrackEventType = $TrackEventType.Touch, moduleName?: string, extParam?: any) {
        if (CC_DEBUG) return
        let trackConfig = ConfigMgr.getTrackConfigByKey(key)
        let time = new Date();
        TrackModule.key = key;
        TrackModule.description = trackConfig.des
        TrackModule.eventType = eventType ? eventType : TrackModule.eventType
        TrackModule.moduleName = moduleName != "" ? moduleName : trackConfig.moduleName
        TrackModule.curTime = time.getTime()
        TrackModule.extParam = extParam ? extParam : TrackModule.extParam
        TrackModule.param = data ? data : {}
        TrackModule.param.bu = ConfigMgr.getBu();
        TrackModule.param.runtime = cc.sys.isNative ? "native" : "web";
        TrackModule.param.device = EnvMgr.getDevice()
        // TrackModule.param.timeStamp = time.getTime();
        // TrackModule.param.localTime = time.toLocaleString() + '.' + TrackModule.param.timeStamp % 1000;
        if (this.delegate && this.trackSdk) {
            this.delegate.send(this.trackSdk)
        }
    }
}

