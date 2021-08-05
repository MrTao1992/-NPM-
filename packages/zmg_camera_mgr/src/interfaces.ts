declare global {
    namespace zmg {
        interface ICamearMgr {
            /**
             * 获取主要镜头
             */
            getMain(): cc.Camera;
            /**
             * 获取最顶层镜头
             */
            getTop(): cc.Camera;
            /**
             * 设置镜头显示范围
             */
            setCameraRect(rect: cc.Rect): void;
            /**
             * 移动镜头
             * @param pos 
             * @param radio 
             * @param camera 
             */
            move(pos: cc.Vec2, radio?: number, camera?: cc.Camera): void;
            /**
             * 获取镜头坐标
             * @param pos 
             */
            getScreenToWorldPoint(pos: cc.Vec2): cc.Vec2;
            /**
             * 聚焦
             * @param camera 
             * @param radio 
             * @param point 
             * @param onLaunched 
             * @param target 
             */
            focus(camera: cc.Camera, radio: number, point?: cc.Vec2, onLaunched?: Function, target?: any): void;

            /**
             * 渲染UI的镜头隐藏
             */
            hideCamera(containsNode: cc.Node): void;
            /**
            * 渲染UI的镜头显示
            */
            hideCamera(containsNode: cc.Node): void;
        }
    }
}
export { }