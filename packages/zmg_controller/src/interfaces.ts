
declare global {
    namespace zmg {
        /**
         * 打开列表子类
         */
        interface IOpenItem {
            cfg: zmg.IModuleConfig;
            param?: object
        }
        interface IControllerMgr {
            /**
             * 背景音乐地址
             */
            bgclip: string;
            /**
             * 
             * @param cfg 
             * @param param 
             */
            openConfig(cfg: zmg.IModuleConfig, param?: object): void;
            /**
             * 打开场景
             * @param bunName 
             * @param path 
             */
            openScene(bunName: string, sceneName: string): void;
            /**
             * 过度效果切换场景
             * @param bunName 
             * @param path 
             */
            tranToScene(bunName: string, sceneName: string): void;

            /**
             * 打开webview
             * @param url 
             */
            openWebview(url: string): void;

            // /**
            //  * 视频播放
            //  * @param url 
            //  */
            // openVideo(url: string): void;
            /**
             * 打开节点跳转对象
             * @param pre 
             * @param zindex 
             * @param parent 
             */
            openPrefab(bunName: string, path: string, param?: any): void;
        }
    }
}
export { }