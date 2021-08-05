import { $EEventIndex } from "./EEventIndex";
import { _EventMgr } from "./EventMgr";
import { $EventName } from "./EventName";

export * from "./interfaces";

export let EventName = $EventName;

export let EEventIndex = $EEventIndex;

export let EventMgr = _EventMgr.getInstance();