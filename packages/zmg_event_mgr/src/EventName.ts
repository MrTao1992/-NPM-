export enum $EventName {
    //base
    SURE = "sure",
    READY = "ready",
    CANCEL = "cancel",
    CHANGE = "change",
    COMPLETE = "complete",
    CLOSE = "close",
    CLICK = "click",

    IN = "in",
    OUT = "out",
    DESTROY_NODE = "destroyNode",
    //游戏暂停
    ON_PAGE_PAUSE = "onPagePause",
    ON_PAGE_RESUME = "onPageResume",
    //游戏恢复

    //zmg_ui_mgr
    UI_BACK_BTN = "uiBackBtn",
    UI_MOUSE_DOWN = "uiMouseDown",
    UI_MOUSE_MOVE = "uiMouseMove",
    UI_TOUCH_MOVE = "uiTouchMove",
    UI_MOUSE_UP = "uiMouseUp",

    UI_MASK_UP = "uiMaskUp",
    UI_MASK_DOWN = "uiMaskDown",
    UI_MASK_MOVE = "uiMaskMove",
    UI_MASK_TOUCH_MOVE = "uiMaskTouchMove",

    UI_ZONE_MOVE = "uiZoneMove",
    UI_FONT_READY = "uiFontReady",

    UI_VIDEO_SHOW = "uiVideoShow",
    UI_VIDEO_HIDE = "uiVideoHide",
    UI_LOAD_HIDE = 'uiLoadHide',
    UI_LOAD_SHOW = 'uiLoadShow',
    //zmg_core_mgr
    CORE_READY = "coreReady",
    CORE_ERROR = "coreError",
    //zmg_env_mgr
    ENV_READY = "envReady",
    //zmg_config_mgr
    CONFIG_READY = "configReady",
    CONFIG_ERROR = "configError",
    CONFIG_LOADED = 'configLoaded',
    //zmg_server_mgr
    SERVER_READY = "serverReady",
    SERVER_ERROR = "serverError",
    SERVER_COMPLETE = "serverComplete",
    //zmg_ui_mgr
    UI_READY = "uiReady",
    //--role
    UI_ROLE_ACTION_CHANGE = "uiRoleActionChange",

    //zmg_controller
    CONTROLLER_CHANGE_DESTORY = "controllerChangeDestory",
    CONTROLLER_CHANGE_START = "controllerChangeStart",
    CONTROLLER_CHANGE_END = "controllerChangeEnd",
    CONTROLLER_CHANGE_PROGRESS = "controllerChangeProgress",
    CONTROLLER_CHANGE_FAIL = "controllerChangeFail",
    CONTROLLER_VIDEO_CLOSE = "controllerVideoClose",
    CONTROLLER_VIDEO_COMPLETE = "controllerVideoComplete",
    CONTROLLER_SOUND_CLOSE = "controllerSoundClose",
    CONTROLLER_SOUND_OPEN = "controllerSoundOpen",

    //zmg_module_mgr
    MODULE_CHANGE = "moduleChange",
    /**
     * 退出游戏
     */
    GAME_OVER = "gameOver",
}
