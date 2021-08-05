import { $EEnv } from "./EEnv";
import { _EnvMgr } from "./EnvMgr";
import { $EDevice } from "./EDevice";
import { $ESource } from "./ESource";

export * from "./interfaces";

export let EEnv = $EEnv;
export let ESource = $ESource;
export let EDevice = $EDevice;
export let EnvMgr: zmg.IEnvMgr = _EnvMgr.getInstance();