
declare global {
    namespace zmg {
        interface IHotUpdateMgr {
            /**
             * 获取模块版本信息
             * @param remoteVersionLoadComplete(function)   远程版本信息加载完成
             */
            getModules(remoteVersionLoadComplete): void;
            /**
             * 载入未更新完的热更项
             * */
            load(): void;
            /**
             * 获取进度
             * @param name 模块名称
             */
            getProgress(name: string): number;
            /**
             * 初始化更新模块名
             * @param name(string)                 模块名
             * @param onCheckComplete(function)    检查版本完成回调
             * @param onComplete(function)         更新完成回调
             * @param onProgress(function)         更新进度回调
             * @param onNewVersion(function)       已是最新版本回调
             */
            init(name, onCheckComplete, onComplete, onProgress, onNewVersion): void;
            /**
            * 是否没完成
            **/
            isNoComplete(name): void;
            /**
             * 检查版本是否需要更新
             */
            check(name): void;
            /**
            * 断网后恢复状态
            **/
            recovery(name): void;
        }
    }
}
export { }