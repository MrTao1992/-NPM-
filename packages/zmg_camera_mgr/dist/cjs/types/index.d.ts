declare module 'zmg_camera_mgr/src/CamearMgr' {
	import { BaseMgr } from 'zmg_mgr';
	export class _CamearMgr extends BaseMgr implements zmg.ICamearMgr {
	    private static _instance;
	    private isFocusing;
	    static getInstance(): _CamearMgr;
	    constructor();
	    private _camearRect;
	    start(): Promise<void>;
	    destroy(): void;
	    get isValid(): boolean;
	    getMain(): cc.Camera;
	    getTop(): cc.Camera;
	    setCameraRect(rect: cc.Rect): void;
	    move(pos: cc.Vec2, radio?: number, camera?: cc.Camera): void;
	    getScreenToWorldPoint(pos: cc.Vec2): cc.Vec2;
	    focus(camera: cc.Camera, radio: number, point?: cc.Vec2, onLaunched?: Function, target?: any): void;
	    private addEvents;
	    private removeEvents;
	    private onSceneStart;
	    private onSceneEnd;
	    /**
	    * 渲染UI的镜头隐藏
	    */
	    hideCamera(containsNode: cc.Node): void;
	    /**
	    * 渲染UI的镜头显示
	    */
	    showCamera(containsNode: cc.Node): void;
	}

}
declare module 'zmg_camera_mgr/src/interfaces' {
	 global {
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
	export {};

}
declare module 'zmg_camera_mgr' {
	import { _CamearMgr } from 'zmg_camera_mgr/src/CamearMgr';
	export * from 'zmg_camera_mgr/src/interfaces';
	export let CamearMgr: _CamearMgr;

}
