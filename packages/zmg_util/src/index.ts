// export * from "./ArrayUtil";

import { _$, _gClearLog, _gDownLoadLog, _gError, _gLog, _gWarn } from './log/gLog';
import { _ArrayUtil } from './utils/ArrayUtil';
import { $DateUtil, $DateUtilType } from './utils/DateUtil';
import { $DragonUtil } from './utils/DragonUtil';

import { $Utils } from './utils/Utils';

import { $GraphUtil } from './utils/GraphUtil';

import { $NodeUtil } from './utils/NodeUtil';


import { $NumUtil } from './utils/NumUtil';


import { $SpriteUtil } from './utils/SpriteUtil';

import { $StringUtil } from './utils/StringUtil';

import { $TextureUtil } from './utils/TextureUtil';

import { $DragonAsset } from './assets/DragonAsset';

import { $DragonAssetUrl } from './assets/DragonAssetUrl';

import { $RecordUtil } from './utils/RecordUtil';

import { $MathUtils } from './utils/MathUtil';

import { $DictRecord } from './utils/DictRecord';
import { _TsLog } from './log/TsLog';

export * from './interfaces';
// export default 
export * from './log/gTestInfo';

// export * from './utils/ArrayUtil';
export let TSlog = _TsLog.getInstance();
export class ArrayUtil extends _ArrayUtil { };

export class DateUtil extends $DateUtil { };

export let DateUtilType = $DateUtilType;

export class DragonUtil extends $DragonUtil { };

export class Utils extends $Utils { };

export class GraphUtil extends $GraphUtil { };

export class NodeUtil extends $NodeUtil { };

export class NumUtil extends $NumUtil { };

export class SpriteUtil extends $SpriteUtil { };

export class StringUtil extends $StringUtil { };

export class TextureUtil extends $TextureUtil { };

export class DragonAsset extends $DragonAsset { };

export class DragonAssetUrl extends $DragonAssetUrl { };

export class RecordUtil extends $RecordUtil { };

export class MathUtils extends $MathUtils { };

export class DictRecord extends $DictRecord { };

/**
 * 日志部分
 */
/**
 * 普通日志输出
 * @param args 参数
 */
export let gLog = _gLog;
export let gWarn = _gWarn;
export let gError = _gError;
export let gDownLoadLog = _gDownLoadLog;
export let gClearLog = _gClearLog;
export let $ = _$;