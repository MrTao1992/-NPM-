import { RoleClothType } from "./RoleClothType";

export enum ERoleLevel {
    HEAD = 'head',//头部
    BODY = 'body', //身体
    LEG_L = 'leg_l',
    LEG_R = 'leg_r',
    TUI_L = 'tui_l',
    TUI_R = 'tui_r',
    HAT = 'hat',
    HAT_1 = 'hat_1',
    EYE = 'eye',
    CROTCH = 'crotch',
    NECK = 'neck',
    EAR = 'ear',
    EAR_R = 'ear_r',
    EAR_L = 'ear_l',
    HAND_R = 'hand_r',
    BEARD = 'beard',
    HAND_L = 'hand_l',
    FOOT_L = 'foot_l',
    FOOT_R = 'foot_r',
    HOLD_R = 'hold_r',
    HOLD_L = 'hold_l',
    WING = 'wing',
    WING_1 = 'wing_1',
    WING_2 = 'wing_2',
    MOUTH = 'mouth',
    EYEBROW = 'eyebrow',
    HAIR = 'hair',
    JACKET = 'jacket',
    TAIL = 'tail',
}

export class RoleDressLevel {
    static ALL: ERoleLevel[] = [
        ERoleLevel.HEAD,//头部
        ERoleLevel.BODY, //身体
        ERoleLevel.LEG_L,
        ERoleLevel.LEG_R,
        ERoleLevel.TUI_L,
        ERoleLevel.TUI_R,
        ERoleLevel.HAT,
        ERoleLevel.HAT_1,
        ERoleLevel.EYE,
        ERoleLevel.CROTCH,
        ERoleLevel.NECK,
        ERoleLevel.EAR,
        ERoleLevel.EAR_R,
        ERoleLevel.EAR_L,
        ERoleLevel.HAND_R,
        ERoleLevel.BEARD,
        ERoleLevel.HAND_L,
        ERoleLevel.FOOT_L,
        ERoleLevel.FOOT_R,
        ERoleLevel.HOLD_R,
        ERoleLevel.HOLD_L,
        ERoleLevel.WING,
        ERoleLevel.WING_1,
        ERoleLevel.WING_2,
        ERoleLevel.MOUTH,
        ERoleLevel.EYEBROW,
        ERoleLevel.HAIR,
        ERoleLevel.JACKET,
        ERoleLevel.TAIL
    ];
    /**
     * 头饰
     */
    static HAT: ERoleLevel[] = [ERoleLevel.HAT];
    /**
     * 衣服
     */
    static CLOTH: ERoleLevel[] = [
        ERoleLevel.JACKET,
        ERoleLevel.CROTCH,
        ERoleLevel.HAND_L,
        ERoleLevel.HAND_R,
        ERoleLevel.LEG_L,
        ERoleLevel.LEG_R,
        ERoleLevel.WING_2,
    ];
    /**
     * 鞋子
     */
    static SHOT: ERoleLevel[] = [
        ERoleLevel.FOOT_L,
        ERoleLevel.FOOT_R
    ];
    /**
     * 手持
     */
    static HOLD: ERoleLevel[] = [
        ERoleLevel.HOLD_L,
        ERoleLevel.HOLD_R
    ];
    /**
     * 背饰
     */
    static WING: ERoleLevel[] = [
        ERoleLevel.WING,
        ERoleLevel.WING_1,
        ERoleLevel.WING_2
    ];

    static getLevels(type: RoleClothType): ERoleLevel[] {
        switch (type) {
            case RoleClothType.BACKWEAR:
                return this.WING.concat();
            case RoleClothType.HANDHELD:
                return this.HOLD.concat();
            case RoleClothType.HEADWEAR:
                return this.HAT.concat();
            case RoleClothType.SET:
                return this.CLOTH.concat();
            case RoleClothType.SHOES:
                return this.SHOT.concat();
            case RoleClothType.ALL:
                return this.ALL.concat();

        }
    }
}