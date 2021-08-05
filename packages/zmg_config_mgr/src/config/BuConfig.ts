class BuConfig implements zmg.IAppConfig {
    useShell: boolean;
    frameWidth: number;
    frameHeight: number;


    bu: string;
    /**
     * 埋点发送
     */
    appId: string;
    /**
    * 名称(掌门1对1,掌门少儿)
    */
    appName: string;
    /**
     * 
     */
    appCode: string;
    /**
     * 服务器列表
     */
    servers: Record<string, zmg.IServerConfig>;
}