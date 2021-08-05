/**
 * swagger:
 * http://kids-study-park-c-fat-alhz.inzm.com/swagger-ui.html#/
 */
export enum $Commands {
    //-----------------------------------------大厅-----------------------------------------
    /** 
     * 获取大厅基本信息
     */
    getHallBaseInfo = "/kids/study/park/c/api/hall/getHallBaseInfo",
    getStudentBaseInfo = "/kids/study/park/c/api/config/getStudentBaseInfo",

    /**
    * 获取彩蛋信息
    */
    eggReward = "/kids/study/park/c/api/hall/checkpointReward",
    eggInfo = "/kids/study/park/c/api/hall/getHallCheckpointInfo",

    /**
     * 获取学伴信息
     */
    getPartnerInfo = "/kids/study/park/c/api/v2/partner/optimize/getPartnerInfo",

    //海报
    getLandInfo = "/kids/study/park/c/api/partner/poster/wall/posterFrameShow",
    hangingPoster = "/kids/study/park/c/api/partner/poster/wall/hangingPoster",
    posterPage = "/kids/study/park/c/api/partner/poster/wall/posterPage",

    /**
     * 获取装扮
     */
    getRoleDressUps = "/kids/study/park/c/api/partner/dressUp/query/userDressUps",

    /**
     * 更新能量果
     */
    getFruitTotalNum = "/kids/study/park/c/api/v2/partner/energyFruit/amount",

    /**
     * 领取学伴
     */
    gainCompanion = "/kids/study/park/c/api/v2/partner/addPartner",

    /**
     * 灰度查询
     */
    graySurvey = "/kids/api/grayApi/toc/gray/findGrayEffectByCodeAndParam",
    grayListSurvey = "/kids/api/grayApi/toc/gray/findMany",
    /**
     * 原生模块信息列表
     */
    moduleList = "/kids/study/park/c/api/native/module/query/list",
    /**
     * 获取存储服务器数据
     */
    getStorage = "/kids/study/park/c/api/dict/storage/batch",
    setStorage = "/kids/study/park/c/api/dict/storage/put",
    /**
     * 奖励中心
     */
    rewardCenterInit = '/kidsStuApi/award/centre/task/init',
    getRewardCenterList = '/kidsStuApi/award/centre/task/list',
    getRewardCenterAward = '/kidsStuApi/award/centre/take/award',
    getRewardCenterRemind = '/kidsStuApi/award/centre/task/remind',

    /**
     * 签到
     */
    signList = "/kids/study/park/c/api/signIn/current/signIn/list",
    isSignIn = "/kids/study/park/c/api/signIn/isSignIn",
    signIn = "/kids/study/park/c/api/signIn/signIn",

    /**
     * 广告弹窗
     */
    addOperationInfo = "/kids/study/park/c/api/popup/window/addOperationInfo",
    window_award = "/kids/study/park/c/api/popup/window/get/award",
    window_get = "/kids/study/park/c/api/popup/window/get",
    getQuestionnaireConfig = "/kidsStuApi/api/feedback/list",

    /**
     * npc领奖
     */
    npcReward = "/kids/study/park/c/api/hall/npcReward",
    /**
     * 大厅NPC
     */
    npcInfo = "/kids/study/park/c/api/hall/getHallNpcInfo",

    //角标点击通知
    getHallModuleIconInfo = "/kids/study/park/c/api/hall/getHallModuleIconInfo",



    /**勋章 */
    carryMedal = "/kids/medal-wall/api/medal/carry",//获取当前学伴已携带的精灵信息(包括当前能力光环)
    ownMedal = "/kids/medal-wall/api/user-medal/own",//获取当前精灵谷入口外显的精灵信息（随机取拥有但非携带的最高等级的任一精灵）

    //试衣间
    getDressDetail = "/kids/study/park/c/api/partner/dressUp/product/detail",
    getWardrobeList = "/kids/study/park/c/api/partner/dressUp/query/dressUps",
    saveRoleDressUps = "/kids/study/park/c/api/partner/dressUp/save/userDressUps",
    getWardrobeBar = "/kids/study/park/c/api/partner/dressUp/wardrobe/bar",
    getNewClothProduct = "/kids/study/park/c/api/partner/dressUp/remind/newFreeProduct",
    uploadTryOnRecord = "/kids/study/park/c/api/partner/dressUp/save/userDressRecord",
    getWardrobeCategInfo = "/kids/study/park/c/api/partner/dressUp/product/directory",

    //上传图片
    uploadImg = "/kids/study/park/c/api/file/data/image/upload",

    /**House************************************************************************************************************/
    subtractFruit = "/kids/study/park/c/api/partner/subtractFruit",
    sleep = "/kids/study/park/c/api/v2/partner/sleep",
    wash = "/kids/study/park/c/api/v2/partner/wash",
    recordClean = '/kids/study/park/stat/api/park/partner/record/clean',
    recordCleanRsult = '/kids/study/park/stat/api/park/partner/record/cleanRsult',
    recordEat = '/kids/study/park/stat/api/park/partner/record/eat',
    recordSleep = '/kids/study/park/stat/api/park/partner/record/sleep',
    recordWash = '/kids/study/park/stat/api/park/partner/record/wash',
    actionConfig = "/kids/study/park/c/api/partner/actionConfig",
    cleanRoom = "/kids/study/park/c/api/partner/clean",


    //房间道具换肤
    dressList = '/kids/study/park/c/api/furniture/dressList',//家具装扮列表
    purchase = '/kids/study/park/c/api/furniture/purchase',//下单
    saveUserFurniture = '/kids/study/park/c/api/furniture/saveUserFurniture',//保存用户装扮
    types = '/kids/study/park/c/api/furniture/types',//获取家具分类
    userFurniturDressList = '/kids/study/park/c/api/furniture/userFurniturDressList',//用户已装扮家具列表


    /**Cais************************************************************************************************************/
    setPlayAndRestTimeConfig = "/kids/api/study/park/api/config/setPlayAndRestTimeConfig",
    getPlayAndRestTimeConfig = "/kids/api/study/park/api/config/getPlayAndRestTimeConfig",
    /**
     * 引导奖励
     */
    getEnergyFruit = "/kids/study/park/c/api/hall/getEnergyFruit",
    //勋章墙
    recordGuideMedal = "/kids/medal-wall/api/guide/record-guide",//记录引导
    allMedal = "/kids/medal-wall/api/user-medal-wall/all",//获取用户勋章墙

    noviewMedal = "/kids/medal-wall/api/user-medal/no-view",//查询用户未浏览的新精灵
    viewMedal = "/kids/medal-wall/api/user-medal/save/view-medal",//保存查看新精灵记录
    removeMedal = "/kids/medal-wall/api/medal/remove",//卸下成就勋章
    acceptMedal = "/kids/medal-wall/api/medal/accept",//收下成就勋章
    countMedal = "/kids/medal-wall/api/medal/not-accepted/count",//获取用户未收下的成就勋章数量
    listMedal = "/kids/medal-wall/api/medal/not-accepted/list",//获取用户未收下的成就勋章数量
    achievementMedal = "/kids/medal-wall/api/user-medal-wall/achievement/page",//获取用户成就勋章-分页
    infoMedal = "/kids/medal-wall/api/user-medal/info",//获取用户勋章信息
    isGuidedMedal = "/kids/medal-wall/api/guide/is-guided",//true为引导过则不再做引导
    carryUserMedal = "/kids/medal-wall/api/user-medal/carry",//获取当前学伴已携带的精灵信息(包括当前能力光环)
    catalogueMedal = "/kids/medal-wall/api/rank/medal/catalogue",//获取用户获取精灵情况 已获得/未获得
    getRankMedal = "/kids/medal-wall/api/rank/medal/getRank",//根据条件用户获取排行榜信息
    getBatchMedal = '/kids/study/park/c/api/partner/dressUp/query/userDressUps/batch', //批量获取用户装扮列表 

    /**Mall奇妙商城相关接口************************************************************************************************************/
    getMallDesc = "/kids/study/park/c/api/fantastic/mall/desc",//商城描述图片地址
    getGooldsTypeList = "/kids/study/park/c/api/v3/fantastic/mall/product/type/list",//商品分类列表
    getRecommendList = "/kids/study/park/c/api/v3/fantastic/mall/product/recommendList",//推荐商品列表
    getActivityList = '/kids/study/park/c/api/v3/fantastic/mall/activity/product/list',//活动商品列表
    getGoodsDetailInf = '/kids/study/park/c/api/v3/fantastic/mall/product/detail',//商品详情
    getOrderList = "/kids/study/park/c/api/fantastic/mall/order/list",//订单列表
    purchaseGoods = "/kids/study/park/c/api/v3/fantastic/mall/purchase", //购买产品 {"commodityId": 0,"platform": "string","valueDeduction": 0}
    getGoodsList = '/kids/study/park/c/api/v3/fantastic/mall/product/list',//商品列表

    /**
     * 任务中心 
    */
    taskAward = "/kidsStuApi/task/centre/take/award",
    taskInit = '/kidsStuApi/task/centre/take/init',
    todoTaskList = '/kidsStuApi/task/centre/todo/list',
    getTaskUrl = '/kidsStuApi/task/centre/task/getUrl',
    unClaimed = '/kidsStuApi/task/centre/unclaimed',
    boxAward = '/kidsStuApi/task/centre/box/award',
    boxNode = '/kidsStuApi/task/centre/box/node',
    boxList = '/kidsStuApi/task/centre/box/list',
    /**
     * 贺卡相关接口
     */
    festivalRead = "/kids/study/park/c/api/greet/card/festival/tip/read",    // 节日提醒标记已读
    greetCardInbox = "/kids/study/park/c/api/greet/card/receive/greetCardInbox",    // 学生收件箱
    readGreetMessage = "/kids/study/park/c/api/greet/card/receive/readMessage",  // 标记贺卡/回复为已读
    unGreetReadMessage = "/kids/study/park/c/api/greet/card/receive/unReadMessage",    // 未读消息列表
    greetCardSend = "/kids/study/park/c/api/greet/card/send/sendCard",  // 发送贺卡
    sendCardDecorateInfo = "/kids/study/park/c/api/greet/card/send/sendCardDecorateInfo", // 贺卡diy界面信息
    sendGreetCardInfo = "/kids/study/park/c/api/greet/card/send/sendCardInfo",    // 发送贺卡界面基本信息
    unReadMessageCount = "/kids/study/park/c/api/greet/card/receive/unReadMessageCount", // 未读消息统计

}
