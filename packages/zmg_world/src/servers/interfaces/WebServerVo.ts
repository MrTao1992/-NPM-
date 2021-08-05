/**
 * 后台返回消息格式定义
 */
declare namespace WebServerVo {
    /**
     * 获取大厅基本信息
     */
    interface IHallBaseInfo {
        bgMusicUrl: string,
        canOpen: boolean,
        configId: number;
        playTimeList: number[];
        restTimeList: number[];
    }
    /**
     * 用户基本数据
     */
    interface IGetStudentBaseInfo {
        /**
         * 头像
         */
        avatar: string;
        /**
         * 生日
         */
        birthday: string;
        /**
         * 创建时间
         */
        createdAt: string;
        id: number;
        name: string;
        /**
         * 性别 0女;1男
         */
        sex: number;
        /**
         * 所在区域
         */
        stuArea: string;
        /**
         * 所在城市
         */
        stuCity: string;
        /**
         * 学生创建时间
         */
        stuCreatedAt: string;
        /**
         * 年级
         */
        stuGrade: string;
        /**
         * 年级Code
         */
        stuGradeCode: string;
        /**
         * 所在省份
         */
        stuProv: string;
        /**
         * 就读学校
         */
        stuSchool: string;
        userId: number;
    }
    /**
     * 获取到后台学伴公园配置信息
     */
    interface IStudyParkConfigInf {
        configId: number;
        playTimeList: number[];
        restTimeList: number[];
        studyParkModuleConfigs: {
            hash: string, manifest: string, moduleId: string, moduleName: string,
            moduleSwitch: boolean, onlineUrl: string, version: string
        }[];
    }

    interface IModuleList {
        createTime: string;
        hash: string;
        hotUpdateUrl: string;
        id: number;
        moduleCode: string;
        moduleName: string;
        moduleSwitch: boolean;
        moduleSwitchMsg: string;
        onlineUrl: string;
        type: number;
        updateTime: string;
        version: string;
    }

    /**
     * 防沉迷返回
     * 返回的是分钟数
     */
    interface IPlayAndRestTimeConfig {
        playTime: number;
        restTime: number;
    }

    /**
     * 学伴的基础类型
     */
    interface IPartner {
        partnerId: string;
        partnerName: string
    }

    /**
     * 学伴基础属性类型
     */

    interface IPartnerAttri {
        fruitValue: number;
        partnerCurrentEnergy: number;
        totalEnergy: number;
        isHunger: boolean,
    }


    /**
     * 学伴动作类型
     */
    interface IPartnerAction {
        key: string;
    }
    interface IDragonInf {
        //1,走路,3:说话，站立
        type: number,
        atlasImg: string,
        atlasJson: string,
        dragJson: string
    }

    interface IDressItem {
        isNewProduct: number;
        directoryId: number;
        benefitDays: number;
        /**
         * 预览图
         */
        cover: string;
        createTime: number;
        pictureList: string[];
        productId: number;
        productName: string;
        remark: number;
        productLocaCode: string;
        resourceList: IDragonInf[];
        top: string;
    }

    interface IDress {
        details: IDressItem[];
    }



    /**
     * 获取学伴信息的返回类型
     */
    interface IGetPartnerInfo {
        cleanRoomInfo: ICleanRoomInfo[];
        fruitValue: number;
        greetCardTip: IGreetCardTip;
        hasFeed: boolean;
        isAdoption: boolean;
        isHunger: boolean;
        isToSleep: boolean;
        isToWash: boolean;
        partnerCurrentEnergy: number;
        partnerId: string;
        partnerName: string;
        rubbishTotal: number;
        sleepValue: number;
        totalEnergy: number;
        voicePlayIntervalSeconds: number;
        washValue: number;
        isSign: boolean;
        hungerValue: number;
    }
    /**
     * 打扫房间dto返回类型
     */
    interface ICleanRoomInfo {
        cleanValue: number;
        index: number;
        isToClean: boolean;
    }

    /**
     * 获取学伴列表的返回类型
     */
    interface IGetPartnerList {
        list: IPartner[];
    }

    interface IGreetCardTip {
        //数量 收到新贺卡数量/收到回复数量
        cardNum: number,
        //贺卡提醒状态 0 无提醒 1 收到新贺卡 2 收到回复 3 贺卡上新
        status: number,
    }

    /**
     * 领取学伴的返回类型
     */
    interface IAddPartner {
        isSuccess: boolean;
        partnerId: string;
        fruitValue: number;
        partnerCurrentEnergy: number;
        totalEnergy: number,
        hungerValue: number;
        isHunger: boolean;
        isToWash: boolean;
    }

    /**
     * 是否签到的返回类型
     */
    interface IGetSign {
        sign: boolean;
    }


    /**
     * 增加魔力果的返回类型
     */
    interface IAddFruit {
        total: number;
        detail: {
            sign: number;
            homework: number;
            liked: number;
            attendance: number;
        }
    }

    /**
     * 喂食的返回类型
     */
    interface ISubtractFruit {
        haveBeenFed: boolean;
        isSuccess: boolean;
        partnerCurrentEnergy: number;
        totalEnergy: number;
        fruitValue: number;
        isHunger: boolean;
    }


    /**
     * 魔力果获取、消费记录的单元类型
     */
    interface IFuitRecordItem {

        desc: string;
        fruitNum: number;
        createTime: string;
    }

    /**
     * 魔力果消耗，奖励记录返回类型
     */
    interface IFruitRecordList {
        surplus: number
        totalRecord: number
        list: IFuitRecordItem[];
    }

    /**
     * 获取饥饿值接口的返回
     */
    interface IGetHunger {
        isHunger: boolean;
        partnerCurrentEnergy: number;
        totalEnergy: number;
    }


    /**
     * 魔力果获取攻略的单个条目
     */
    interface IGetFruitWayItem {
        title: string;
        text: string;
    }

    /**
     * 魔力果获取攻略列表的返回类型
     */
    interface IGetFruitWays {

    }

    interface IGetMusicSwitch {
        switchs: boolean;
    }


    /**
     * 喂食返回
     */
    interface ISubtractFruit {
        fruitValue: number;
        haveBeenFed: boolean;
        hungerValue: number;
        isHunger: boolean;
        isSuccess: boolean;
        partnerCurrentEnergy: number;
        totalEnergy: number;
        isToSleep: boolean;
        feedResultCode: string;
    }

    interface ISleep {
        data: number;
    }

    interface IBath {
        data: number;
    }
    // interface AnimationInfoOutVo {
    //     atlasImg: string;
    //     atlasJson: string;
    //     dragJson: string;
    // }
    interface UserAbilityMedalOutVo {
        animation1Url: string;
        animation2Url: string;
        animation3Url: string;
    }

    interface UserAchievementUpgradeOutVo {
        animation1Url: string;
        animation2Url: string;
        animation3Url: string;
    }

    interface ICarryMedal {
        //用户当前携带能力光环信息 ,
        userAbilityMedalInfo: UserAbilityMedalOutVo;
        //用户当前携带的精灵信息
        userCarryMedalInfo: UserAchievementUpgradeOutVo;
    }

    //弹窗
    interface IWindowGet {
        bu: string;
        id: number;
        buttonImg: string;
        backgroundImg: string;
        buttonAnimation: IDragItem;
        /**
         * 失效时机 101 触发N次后消失 102/202 关闭N次后消失 103 点击N次后消失 201 领奖后消
         */
        invalidType: number;
        //跳转模块code
        targetModuleCode: string;
        titleAnimation: IDragItem;
        titleImg: string;
        //触发时机（1：进入页面，2：退出页面）
        triggerType: number;
        //1 引导弹窗 2 奖励弹窗
        type: number;
        //弹窗语音
        voiceUrl: string;
        //自定义数据
        //该窗口是否打开过
        isOpened: boolean;
        //-1未查询 0 是false 1 是true
        grayState: number;
    }

    interface IWindowReward {
        awardImg: string,
        awardNum: number,
        awardType: number,
    }

    interface IDragItem {
        dragJson: string;
        atlasImg: string;
        atlasJson: string;
    }

    /**
     * 签到
     */
    interface ISignListItem {
        /**奖励类型 1 普通 2 中等 3 高级*/
        awardLevel: number;
        /**奖励数量 已签到的天数该字段为空*/
        awardNum: number;
        /**奖励类型 1 能量果 2 装扮 3 皮肤 已签到的天数该字段为空*/
        awardType: number;
        day: number;
        signIn: boolean;
        today: boolean;
    }


    /**
     * 签到
     */
    interface ISignIn {
        //奖励数量
        awardNum: number;
        //奖励类型 1 能量果 2 装扮 3 皮肤
        awardType: number;
    }
}