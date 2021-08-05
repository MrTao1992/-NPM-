import { } from "zmg_mgr"
declare global {
    namespace zmg {
        interface IServerListener {
            /**
            * 要求监听对象
            */
            target: any;
            /**
             * 路径
             */
            url: string;
            /**
             * 消息返回回调
             */
            launchFun: (data: any) => void;
            /**
             * 消息返回错误
             */
            errorFun: (castData: IServerCastData) => void;
            /**
             * 调用消息返回回调
             */
            onLaunch(data: any): void;
            /**
             * 消息出现错误
             */
            onError(castData: IServerCastData): void;
            /**
             * 资源是否合法
             */
            isValid(): boolean;
        }
        interface IWebServerMgr extends zmg.IMgr {
            sendGet(command: string, params?: any, listener?: zmg.IServerListener, cache?: boolean): XMLHttpRequest;
            sendPost(command: string, params?: any, listener?: zmg.IServerListener, cache?: boolean): XMLHttpRequest;
            /**
             * @param cmd 获取vo外部修改
             */
            changeVo(cmd: string, key: string, value: any): any;
            /**
             * 清理缓存数据
             * @param cmd 
             */
            clearVo(cmd: string): void;
        }
        interface IServerCastData {
            /**
             * xhr.status
             * 200=OK
             */
            status: number,
            /**
             * 后台返回错误码
             */
            code: string,
            /**
             * 后台返回错误信息
             */
            message: string,
            toString(): string;
        }
    }
}

export { }