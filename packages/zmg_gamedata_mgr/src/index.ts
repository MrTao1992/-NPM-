import { _DataMgr } from "./DataMgr";
import { $ELocalSystemKey } from "./ELocalSystemKey";

export * from "./interfaces";

export let ELocalSystemKey = $ELocalSystemKey;

export let DataMgr = _DataMgr.getInstance();