import { $EModuleType } from "./EModuleType";

export class ModuleMainConfig implements zmg.IModuleMainConfig {
    /**
    * 启动方式
    * //scene,prefab,url
    */
    type: $EModuleType;
    /**
     * 地址
     */
    path: string;
    /**
     * 启动参数
     */
    param: string;
}