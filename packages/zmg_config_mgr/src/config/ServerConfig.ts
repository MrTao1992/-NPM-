export class ServerConfig implements zmg.IServerConfig {
    serverPath: string;
    /**
    * 环境变量
    */
    env: string;
    /**
     * 子目录路径
     */
    path: string;
    /**
     * 网关地址
     */
    gate: string;
    /**
     * 服务器地址
     */
    server: string;
}