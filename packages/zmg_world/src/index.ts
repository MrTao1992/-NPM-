import { _UserMgr } from "./userdatas/UserMgr";
import { _ModuleConditionInit } from "./conditions/ModuleConditionInit";
import { _ServerModuleMgr } from "./ServerModuleMgr";
import { _MsgBridge } from "./core/bridge/MsgBridge";
import { $BaseCommand } from "./core/bridge/cmds/BaseCommand";
import { _UserEventName } from "./userdatas/UserEventName";
import { _AppBundleName } from "./AppBundleName";
import $zmBaseScene from "./scene/zmBaseScene";
import _CaisControl from "./cais/CaisControl";
import _CaisVo, { $CaisLocalVoType, $CaisServerVoType } from "./cais/CaisVo";
import { $Commands } from "./servers/commands/Commands";
import _Router from "./core/Router";
import { $ELocalAppKey, $BU_TYPE, $BU_NAME } from "./consts/ELocalAppKey";
import { $GameEvent } from "./consts/GameEvent";
import $BaseAdapt from "./adapt/BaseAdapt";
import $BtnAdapt from "./adapt/BtnAdapt";
import $Resolution from "./adapt/Resolution";
import $Orientation from "./adapt/Orientation";
import $BaseUI from "./adapt/BaseUI";

export let UserMgr = _UserMgr.getInstance();
export let MsgBridge = _MsgBridge.getInstance();
export let CaisControl = _CaisControl.getInstance();
export let CaisVo = _CaisVo.getInstance();

export let ServerModuleMgr = _ServerModuleMgr.getInstance();
export let ModuleConditionInit = _ModuleConditionInit.getInstance();
export let AppBundleName = _AppBundleName;
export let UserEventName = _UserEventName;
export let Commands = $Commands;
export let BU_TYPE = $BU_TYPE;
export let ELocalAppKey = $ELocalAppKey;
export let BU_NAME = $BU_NAME;
export let GameEvent = $GameEvent;
export let CaisServerVoType = $CaisServerVoType;
export let CaisLocalVoType = $CaisLocalVoType;

export let Router = _Router.getInstance();

export class BaseUI extends $BaseUI { };
export class BaseAdapt extends $BaseAdapt { };
export class BtnAdapt extends $BtnAdapt { };
export class Resolution extends $Resolution { };
export class Orientation extends $Orientation { };
export class BaseCommand extends $BaseCommand { };
export class zmBaseScene extends $zmBaseScene { };