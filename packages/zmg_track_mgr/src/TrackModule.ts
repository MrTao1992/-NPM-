import { $TrackEventType } from "./TrackEventType";

export var TrackModule = {
    //埋点key
    key: "",
    //发起模块名称
    moduleName: "",
    //埋点描述
    description: "",
    //当前埋点时间
    curTime: -1,
    //埋点数据
    param: null,
    //扩展参数
    extParam: {},
    //埋点类型
    eventType: $TrackEventType.Touch,
}