import { ConfigMgr } from "zmg_config_mgr"
export class NativeBridge implements zmg.INativeBridge {

    private brigeSdk: zmg.INativeBrigeSdk = null

    initBridge(mainHandlers: zmg.IHandler[], brigeSdk: zmg.INativeBrigeSdk) {
        if (ConfigMgr.getUseShell()) {
            this.brigeSdk = brigeSdk
        }
        if (mainHandlers && mainHandlers.length > 0) {
            for (let index = 0; index < mainHandlers.length; index++) {
                const element = mainHandlers[index];
                this.registMsg(element.name, element.fun)
            }
        }
    }

    sendMsgToClient(...args): any {
        let lens = arguments.length
        if (lens == 2) {
            if (ConfigMgr.getUseShell()) {
                return this.brigeSdk.sendMsg(args[0], args[1])
            }
        } else if (lens == 3) {
            return this.sendMsgNative(args[0], args[1], args[2])
        } else if (lens == 4) {
            return this.sendMsgNative(args[0], args[1], args[2], args[3])
        }
    }


    sendMsgNative(className: string, methodName: string, parameters: any, methodSignature?: string) {
        if (cc.sys.os == cc.sys.OS_IOS) {
            let result = jsb.reflection.callStaticMethod(className, methodName, parameters);
            return result
        } else {
            let result = jsb.reflection.callStaticMethod(className, methodName, methodSignature, parameters)
            return result
        }
    }

    registMsg(name: string, callback: any) {
        if (ConfigMgr.getUseShell()) {
            if (this.brigeSdk) {
                this.brigeSdk.registerHandler(name, callback)
            }
        } else {
            window[name] = callback
        }
    }
}