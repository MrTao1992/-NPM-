import { $RoleEvent } from "./zmgui/role/RoleEvent";
import { $UIEvent } from "./events/UIEvent";
import { $UIBackEvent } from "./events/UIBackEvent";
import { $UIMouseEvent } from "./events/UIMouseEvent";
import { $RewardLayer } from "./sysui/UILayer/RewardLayer";
import { $ERoleAction, $EPetAction } from "./zmgui/role/ERoleAction";
import { _Actor } from "./zmgui/role/Actor";
import { $Role } from "./zmgui/role/Role";
import { _FontMgr } from "./sysui/FontMgr";
import { _UIMgr } from "./UIMgr";
import $BaseUI from "./sysui/BaseUI";
import { $UITransitions } from "./sysui/UITransitions";
import { $UIMouse } from "./sysui/UIMouse";
import { $UIMask } from "./sysui/UIMask";
import { $UILoading } from "./sysui/UILoading";
import { $UIBackBtn } from "./sysui/UIBackBtn";
import { $UILayer } from "./sysui/UILayer";
import { $Alert } from "./sysui/alert/Alert";
import { _ToastMgr } from "./sysui/ToastMgr";
import { _AlertMgr } from "./sysui/alert/AlertMgr";
import { $AlertAsset } from "./sysui/alert/AlertAsset";
import $SimpleBtn from "zmg_ui_mgr/src/zmgui/btn/SimpleBtn";
import { _AudioRes } from "./zmgui/cache/AudioRes";
import $LoadingSprite from "./zmgui/sprite/LoadingSprite";
import $ShowHideSprite from "./zmgui/sprite/ShowHideSprite";
import $StateSprite from "./zmgui/sprite/StateSprite";
import { _zmTween } from "./frameRatio/zmTween";

export * from "./interfaces";

export class AlertAsset extends $AlertAsset { };
export let AlertMgr = _AlertMgr.getInstance();
export let ToastMgr = _ToastMgr.getInstance();

export class Alert extends $Alert { };
export class UILayer extends $UILayer { };
export class UIBackBtn extends $UIBackBtn { }
export class UILoading extends $UILoading { };
export class UIMask extends $UIMask { };

export class UIMouse extends $UIMouse { };

export class UITransitions extends $UITransitions { };

export class BaseUI extends $BaseUI { }
// export * from "./UIMgr";
export let UIMgr = _UIMgr.getInstance();

// export * from "./components/FontMgr";
export let FontMgr = _FontMgr.getInstance();

export class Role extends $Role { };
// export * from "./components/role/Actor";

// export * from "./components/role/ERoleAction";
// export * from "./components/UILayer/RewardLayer";
export class RewardLayer extends $RewardLayer { };
// export * from "./events/UIBackEvent";
export class UIBackEvent extends $UIBackEvent { }
// export * from "./events/UIEvent";
export class UIEvent extends $UIEvent { }
// export * from "./events/UIMouseEvent";
export class UIMouseEvent extends $UIMouseEvent { }

// export * from "./components/role/RoleEvent";
export class RoleEvent extends $RoleEvent { };

export let ERoleAction = $ERoleAction;
export let EPetAction = $EPetAction;

export let Actor = _Actor.getInstance;
export let AudioRes = _AudioRes.getInstance();

export class zmgui_btn_SimpleBtn extends $SimpleBtn { };
export class zmgui_sprite_LoadingSprite extends $LoadingSprite { };
export class zmgui_sprite_ShowHideSprite extends $ShowHideSprite { };
export class zmgui_sprite_StateSprite extends $StateSprite { };
export let zmTween = function (target) {
    return new _zmTween(target);
};

// let zone = {
//     AZone: $AZone,
//     ATarget: $ATarget,
//     ASwap: $ASwap,
//     AStar: $AStar,
//     ANode: $ANode,
//     AMoveButton: $AMoveButton,
//     AMap: $AMap,
//     AGrid: $AGrid,
//     AEvent: $AEvent,
//     AEditMap: $AEditMap
// }

// export let zmuis = {
//     zone: zone
// };

// export let AZone = $AZone;
// export declare namespace zmuis {
//     export class AZone extends $AZone {

//     }
// }
// window["zmuis"] = zmuis;
