import { _TrackMgr } from "./TrackMgr";
import { $TrackEventType } from "./TrackEventType";
export let TrackMgr: zmg.ITrackMgr = _TrackMgr.getInstance();
export let TrackEventType = $TrackEventType;
export * from "./TrackModule";