

declare global {
    namespace zmg {

        interface INativeBrigeSdk {
            /**
             * 调用原生接口
             * @param name 消息名称
             * @param data 消息数据
             */
            sendMsg(name: string, data?: any): any;
            /**
             * 注册消息处理对象
             * @param name 消息名称
             * @param value 消息处理对象。。。CommandBase的子对象
             */
            registerHandler(name: string, value: any): void;
        }

        /**
         * 管理平台交互
         */
        interface IPlatfromMgr {

            bridge: any;
            /**
             * 初始化Bridge桥接
             * @param mainHandlers 主Handler
             * @example 
             * #zh初始化原生壳消息通信,参数1:默认注册消息体,参数2:原生壳开发sdk
             * PlatfromMgr.initBridge([],NATIVEJSB)
             * #zh初始化web,原生通信
             * PlatfromMgr.initBridge([消息体1,消息体2,...])
             */
            initBridge(mainHandlers?: zmg.IHandler[], brigeSdk?: INativeBrigeSdk)

            /**
             * 发送消息
             * @param args 
             * @example 
             * #zh H5发送消息
             * PlatfromMgr.sendMsg(参数)
             * #zh 原生壳发送消息,name:消息名称,data:消息数据
             * PlatfromMgr.sendMsg(name,data)
             * #zh 原生Android发送消息,className:类名称,methodName:方法名称,parameters:参数组
             * PlatfromMgr.sendMsg(className: string, methodName: string, parameters: any)
             * #zh 原生Android发送消息,className:类名称,methodName:方法名称,parameters:参数组,methodSignature:参数引导
             * PlatfromMgr.sendMsg(className: string, methodName: string, parameters: any ,methodSignature: string)
             */
            sendMsg(...args): any;
            /**
             * 注册消息
             * @param name 消息名称
             * @example 
             * #zh 注册消息,name:消息名称,callback:回调方法
             * PlatfromMgr.registerMsg(name,callback)
             */
            registerMsg(name: string, callback: any): void;

            /**
             * 重新设定发送函数（仅web交互可用）
             * @param fun 发送函数
             */
            setSendMessageFun(fun: (param: zmg.IWebMessage) => {})
        }
        /**
         * 原生交互桥接（暂时交予原生壳）
         */
        interface INativeBridge {
            /**
             * 注册消息
             * @param name 消息名称
             */
            registMsg(name: string, callback: any);

            /**
             * 发送消息给原生
             * @param className 类
             * @param methodName 方法名
             * @param methodSignature 方法参数
             * @param parameters  0个或任意多个参数
             */
            sendMsgToClient(className: string, methodName: string, parameters: any, methodSignature: string): any;

        }

        /**
         * handler结构
         */
        interface IHandler {
            name: string;
            fun: Function;
        }

        /**
         * web消息体结构
         */
        interface IWebMessage {
            cmd: {
                //主信令
                main?: string,
                //区域信令（暂无）
                // area?: string,
                //功能信令
                action?: string
            };
            //消息数据
            data: any;
        }

        /**
         * webview交互桥接
         */
        interface IWebViewBridge {
            /**
             * 初始化iframe交互桥接
             */
            initBridge(mainHandlers?: zmg.IHandler[]): void;

            /**
             * 注册主信令
             * @param bridge 桥接对象
             */
            registerMainHandler(bridge: any, mainHandlers: zmg.IHandler[]): void;

            /**
             * 消息接收
             * @param data 消息数据
             */
            receiveMsg(data: any): void;

            /**
             * 发送消息到
             * @param msg 消息名称"默认为"jsbMessage"
             * @param scheme 参数
             * @param callback 回调
             */
            sendMsgToClient(param: zmg.IWebMessage): any;
        }
    }
}
export { }