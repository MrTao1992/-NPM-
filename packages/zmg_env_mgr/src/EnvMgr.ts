import { WebEnv } from "./WebEnv";

export class _EnvMgr {
    private static _env: zmg.IEnvMgr;
    private static createInstance(): zmg.IEnvMgr {
        let env: zmg.IEnvMgr;
        // if (CC_JSB) {
        //     env = new NativeEnv();
        // } else {
        env = new WebEnv();
        // }
        return env;
    }
    public static getInstance(): zmg.IEnvMgr {
        if (!this._env) {
            this._env = this.createInstance();
        }
        return this._env;
    }
}

