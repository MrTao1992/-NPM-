import { _DirectorMgr } from "./DirectorMgr";
import { $DirectorEvent } from "./DirectorEvent";

export * from "./interfaces";

export class DirectorEvent extends $DirectorEvent { }

export let DirectorMgr = _DirectorMgr.getInstance()