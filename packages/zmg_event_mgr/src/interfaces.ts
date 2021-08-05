import { } from "zmg_mgr"
declare global {
    namespace zmg {

        interface IEventMgr extends zmg.IMgr {
            getEventTarget(key: string): cc.EventTarget;
            removeEventTarget(key: string): void;
        }
    }
}
export { }