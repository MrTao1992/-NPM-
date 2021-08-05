import { EDevice, EnvMgr } from "zmg_env_mgr";
import { _MsgBridge } from "./bridge/MsgBridge";

export default class _Router {

    private constructor() { }
    private static _inst: _Router = null;
    public static getInstance(): _Router {
        if (this._inst == null) {
            this._inst = new _Router();
        }
        return this._inst;
    }

    jumpTo(data: any) {
        if (EnvMgr.getDevice() == EDevice.PC) {
            _MsgBridge.getInstance().sendMsgToClient('gotoPage', data);
        } else {
            _MsgBridge.getInstance().sendMsgToClient(data, null, 'pageIn');
        }

    }

    //jsb跳转《练习页面》
    jsbJumpToPractise(reqInfo: any) {
        // for testing
        // let reqInfo = {
        //         homeworkSource写死1，
        // homeworkType 1 是随堂  2是拓展
        // };
        // let req = "ZMKidsPad://homeworkZmg?homeworkSource=" + reqInfo['homeworkSource']
        //     + "&homeworkId=" + reqInfo['homeworkId']
        //     + "&homeworkType=" + reqInfo['homeworkType'];
        // MsgBridge.sendMsgToClient('pageIn', req);

        let req = "ZMKidsPad://homework?url=" + reqInfo['url'];

        this.jumpTo(req);
    }

    //jsb跳转《AI 录播课页面》
    jsbJumpToAIRecord(reqInfo: any) {
        // for testing
        // ZMKidsPad://learningParkRecordRoom?type=2&lessonUid=RECORD-a68cf13aaa4335f4ac9ce8fb3987bf06&recordId=E13A117066024A24A8BDC4A46D0CB74A&planId=191&productId=10&contentId=84719
        // type （连接socket用）
        // lessonUid （连接socket用）
        // teacherName
        // recordId （获取课件用）
        // productId （透传，用户保存记录接口入参）
        // planId（透传，用户保存记录接口入参）
        // contentId（透传，用户保存记录接口入参）
        let req = "ZMKidsPad://learningParkRecordRoom?type=" + reqInfo['type']
            + "&lessonUid=" + reqInfo['lessonUid']
            + "&teacherName=" + reqInfo['teacherName']
            + "&recordId=" + reqInfo['recordId']
            + "&productId=" + reqInfo['productId']
            + "&planId=" + reqInfo['planId']
            + "&contentId=" + reqInfo['contentId'];
        this.jumpTo(req);
    }

    //jsb跳转《AI 直播课页面》
    jsbJumpToAIBroadcast(reqInfo: any) {
        // for testing
        // ZMKidsPad://aiClass?type=1&lessonId=1&subjectName=课程名称
        let req = "ZMKidsPad://aiClass?type=" + reqInfo['type']
            + "&lessonId=" + reqInfo['lessonId']
            + "&subjectName=" + reqInfo['subjectName'];
        this.jumpTo(req);
    }

    //jsb跳转《预习页面》
    jsbJumpToPreview(reqInfo: any) {
        // for testing
        // ZMKidsPad://previewCoursewareInAIClass?lessonId = XX&contentId=xx&lessonType=xx&planId=xx&productId=xx
        let req = "ZMKidsPad://previewCoursewareInAIClass?lessonId=" + reqInfo['lessonId']
            + "&contentId=" + reqInfo['contentId']
            + "&lessonType=" + reqInfo['lessonType']
            + "&planId=" + reqInfo['planId']
            + "&productId=" + reqInfo['productId'];
        this.jumpTo(req);
    }

    //pc跳转《练习页面》
    pcJumpToPractise(reqInfo: any) {
        _MsgBridge.getInstance().sendMsgToClient('homework', reqInfo);
    }

    //pc跳转《AI 录播课页面》
    pcJumpToAIRecord(reqInfo: any) {
        _MsgBridge.getInstance().sendMsgToClient('superTopicList', reqInfo);
    }

    //pc跳转《AI 直播课页面》
    pcJumpToAIBroadcast(reqInfo: any) {
        _MsgBridge.getInstance().sendMsgToClient('superCollegeAiClass', reqInfo);
    }

    //pc跳转《预习页面》
    pcJumpToPreview(reqInfo: any) {
        // 暂时不传
        // MsgBridge.sendMsgToClient('---', reqInfo);
        // this.jumpTo(reqInfo);
    }
}
