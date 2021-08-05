import { _gLog } from "../log/gLog";

export class $Utils {
    static start(fun: Function, target?: any, params?: any): void {
        if (fun) {
            if (target) {
                if (target instanceof cc.Component || target instanceof cc.Node) {
                    if (target.isValid) {
                        // params = (params instanceof Array) ? params : [params];
                        // fun.apply(target, params);
                        fun.call(target, params);
                    } else {
                        //节点已被销毁，无需回调
                    }
                } else {
                    // params = (params instanceof Array) ? params : [params];
                    // fun.apply(target, params);
                    fun.call(target, params);
                }
            } else {
                fun.call(target, params);
            }
        }
    }
    static throwError(): void {
        throw _gLog("FunUtil Error!");
    }

    static JsonDeepCopy(param: any): any {
        if (param == null || param == undefined) param = {};
        if (typeof (param) == "string") {
            return param;
        }
        return JSON.parse(JSON.stringify(param));
    }
}