declare global {
    namespace zmg {
        /**
         * 日志配置
         */
        interface ILogService {
            usetsLog?: boolean;
            doConsole?: boolean;
            itemName?: string;
            maxLen?: number;
            logName?: string;
            [name: string]: any;
        }
    }
}
export { }