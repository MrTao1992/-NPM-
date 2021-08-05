import { $DragonResAsset } from "./assets/DragonResAsset";
import { $DragonResListener } from "./assets/DragonResListener";
import { $ResAsset } from "./assets/ResAsset";
import { $BundleCacheLib } from "./BundleCacheLib";
import { $EResEventName } from "./EResEventName";
import { $ResCacheLib } from "./ResCacheLib";
import { $ResEvent } from "./ResEvent";
import { $ResListener } from "./ResListener";
import { _ResMgr } from "./ResMgr";
import { $ResUtil } from "./ResUtils";
import { _SystemBundleName } from "./SystemBundleName";

export * from "./interfaces";
export let EResEventName = $EResEventName;
export class ResAsset extends $ResAsset { };
export class ResEvent extends $ResEvent { };
export class ResListener extends $ResListener { };
export class DragonResAsset extends $DragonResAsset { };
export class ResCacheLib extends $ResCacheLib { };
export class BundleCacheLib extends $BundleCacheLib { };
export class DragonResListener extends $DragonResListener { };
export class ResUtil extends $ResUtil { };


export let SystemBundleName = _SystemBundleName;

export let ResMgr = _ResMgr.getInstance();