export enum $GameEvent {
    /**
     * 屏幕调整事件
     */
    VIEW_RESIZE = 'viewresize',
    MAIN_READY = 'mainReady',
    //场景开始变化
    SCENE_CHANGE = 'sceneChange',
    /**
     * 模块发生变化
     */
    MODULE_CHANGE = "moduleChange",
    COUNT_DOWN_OPEN = 'countDownOpen',
    COUNT_DOWN_CLOSE = 'countDownClose',

    //场景开始变化
    SCENE_BACK = 'sceneBack',
    /**
     * 奖励特效结束
     */
    REWARD_OVER = 'rewardOver',

    /**
     * 引导结束
     */
    GUIDE_OVER = 'guideOver',

    /**
     * 引导奖励结束后
     */
    GUIDE_REWAD_OVER = 'guideRewadOver',
    //场景变化结束
    SCENE_CHANGE_COMPLETE = 'sceneChangeComplete',

    /**
     * 一秒触发一次
     */
    TIME_CHANGE = 'timeChange',
    /**
     * 60s触发一次
     */
    TIME_CHECK = 'timeCheck',
    CAMRRA_RESIZE = 'camerasize',

    /**
     * 垃圾桶被触动
     */
    BUCKET_HIT = 'bucketHit',
    RUBBISH_UI_CHANGE = 'rubbishUIChange',

    /**
     * 学伴房间相关状态变化
     */
    FRUIT_CHANGE = 'fruitChange',
    SLEEP_CHANGE = 'sleepChange',
    WASH_CHANGE = 'washChange',
    ENERGY_CHANGE = 'energyChange',
    CLEAN_CHANGE = 'cleanChange',

    //服装发生了变化
    CLOTH_CHANGE = 'clothChange',
    GL_COMPLETE = 'glComplete',
    GL_CANCEL = 'glCancel',

    HOME_ROLE_COMPLETE = 'homeRoleComplete',
    PET_COMPLETE = 'petComplete',

    //role事件
    START_WALK = 'startWalk',

    //poster海报悬挂刷新
    POSTER_CHANGE = 'posterChange',

}