export * from "./interfaces";
import { _ConfigMgr } from "./ConfigMgr";
export * from "./events/ConfigEvent";
export * from "./config/EModuleType";

export let ConfigMgr = _ConfigMgr.getInstance();