export default class HotUpdateConfig {
    public static testUpdate: boolean = false;
    // 无视版本号测试
    public static debugVersion: boolean = false;
    // 无视资源版本对比测试
    public static debugRes: boolean = false;
    // 打印进度日志
    public static debugProgress: boolean = false;
    // 测试服务器地址
    public static testIp: string = "127.0.0.1";
    // 测试 CDN 服务器地址
    public static testCdn: string = "https://" + HotUpdateConfig.testIp + "/update/";
    // 最大并发更新文件数量（有网络IO和文件IO并载数量在边玩游戏边下载时建议不超过2）
    public static concurrent: number = 1;
    // 版本线路文件夹，用于更新时优先更新没有用的线路，测试成功后切换热更
    public static line: string = "online-1";

    public static gateSocketIp: string;
}
