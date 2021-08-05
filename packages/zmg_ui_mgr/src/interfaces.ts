
import { DragonResAsset, ResAsset } from "zmg_res_mgr"
import { $EPetAction, $ERoleAction } from "./zmgui/role/ERoleAction"

declare global {
    namespace zmg {
        export interface IDragonInf {
            //1,走路,3:说话，站立 //其他可能是点赞之类的无需加载
            type: number,
            atlasImg: string,
            atlasJson: string,
            dragJson: string
        }
        export interface IRoleDressItem {
            isNewProduct: number;
            directoryId: number;
            benefitDays: number;
            /**
             * 预览图
             */
            cover: string;
            createTime: number;
            pictureList: string[];
            productId: number;
            productName: string;
            remark: number;
            productLocaCode: string;
            resourceList: IDragonInf[];
            top: string;
        }
        interface IPet {
            readonly isValid: boolean;
            readonly node: cc.Node;
            readonly display: dragonBones.ArmatureDisplay;
            setScale(value: number): void;
            setParent(parent: cc.Node): void;
            setPostion(newPosOrX: number | cc.Vec2 | cc.Vec3, y?: number): void;
            load(path: DragonResAsset, shadowBunName: string, shadowPath: string): void;
            /**
             * 销毁
             */
            destroy(): void;
            /**
            * 执行动作
            * @param action 
            */
            doAction(action: $EPetAction): void;
            /**
            * 站立
            */
            stand(): void;
            /**
             * 向右行走
             */
            walkRight(): void;
            /**
             * 向左行走
             */
            walkLeft(): void;
        }

        interface IRole {
            readonly pet: IPet;
            readonly isValid: boolean;
            readonly node: cc.Node;
            readonly roleName: string;
            readonly config: zmg.IRoleConfig;
            readonly dressList: zmg.IRoleDressItem[];
            readonly display: dragonBones.ArmatureDisplay;
            getAction(): $ERoleAction;
            hitTest(pos: cc.Vec2): boolean;
            setParent(parent: cc.Node): void;
            setPostion(newPosOrX: number | cc.Vec2 | cc.Vec3, y?: number): void;
            /**
             * 传入人物模型基本数据
             */
            initConfig(config: zmg.IRoleConfig): void;
            /**
             * 销毁
             */
            destroy(): void;
            /**
             * 穿上衣服
             * @param cloths 
             */
            dress(cloths: zmg.IRoleDressItem[]): void;
            takeOff(cloth: zmg.IRoleDressItem): void;
            takeOn(cloth: zmg.IRoleDressItem): void;
            /**
             * 执行动作
             * @param action 
             */
            doAction(action: $ERoleAction): void;
            /**
             * 说话
             */
            talk(clip: cc.AudioClip): void;
            /**
             * 停止说话
             */
            stopTalk(): void;
            /**
             * 站立
             */
            stand(): void;
            /**
             * 向右行走
             */
            walkRight(): void;
            /**
             * 向左行走
             */
            walkLeft(): void;
        }
        interface IActor extends IRole, cc.EventTarget {
            talkRandom(): void;
            talkByRes(res: ResAsset): void
        }
        interface IMouse {
            readonly mouseV2: cc.Vec2;
            /**
             * 初始化
             */
            start(): void;
            setNormal(): void;
            setLink(): void;
            setUnavailable(): void;
            setParent(parent: cc.Node): void;
            /**
             * 
             * @param link 点击状态
             * @param normal 常规移动状态
             * @param unavailable 点击摁下状态
             */
            setStyle(link: string, normal: string, unavailable: string): void;
            /**
             * 设置默认style
             * @param link 
             * @param normal 
             * @param unavailable 
             */
            setDefaultStyle(link: string, normal: string, unavailable: string): void
            /**
             * 还原默认样式
             */
            resetStyle(): void;
            /**
            * 销毁
            */
            destroy(): void;

            /**
             * 转换相机坐标到屏幕
             * @param screenPosition 
             */
            getScreenToWorldPoint(screenPosition: cc.Vec2 | cc.Vec3): cc.Vec2;

            /**
             * 是否初始化完毕
             */
            readonly isValid: boolean;
        }
        interface IBaseUI {
            readonly node: cc.Node;
            init(url: string): void;
            /**
             * 显示
             */
            show(): void;
            /**
             * 隐藏
             */
            hide(): void;
            /**
             * 
             * @param style 符合要求样式的node,Prefab
             */
            setStyle(res: string | zmg.IResAsset, resUrl: string): void;
            /**
             * 还原默认样式
             */
            resetStyle(): void;
            /**
             * 销毁
             */
            destroy(): void;
            /**
             * 是否初始化完毕
             */
            readonly isValid: boolean;
        }
        interface ITransitions {
            runScene(bunName: string, sceneUrl: string, onSceneLoaded: Function, onTransitionFinished: Function, color: cc.Color, movieClip: cc.Node): void;
        }
        interface IAlertAsset {
            /**
             * 显示文本
             */
            text: string;
            /**
             * 调用对象
             */
            target: any;
            /**
             * 确定回调
             */
            sureFun: Function;
            /**
             * 取消回调
             */
            canelFun: Function;
            /**
             * 确定按钮文本
             */
            sureText: string;
            /**
             * 取消按钮文本
             */
            canelText: string;
            /**
             * 修改样式
             */
            style: zmg.IResAsset;
            /**
             * 标题图片
             */
            title: zmg.IResAsset;

            readonly isValid: boolean;


            /**
             * 清理资源
             */
            clear(): void;
            canel(): void;
            sure(): void;
        }
        interface INode extends cc.Component {

        }
        interface IFontMgr extends zmg.IMgr, cc.EventTarget {
            updateFont(node: cc.Node): void;
        }
        interface IAlertMgr extends cc.EventTarget {
            readonly defaultAlert;
            res: zmg.IResAsset;
            node: cc.Node;
            init(url: string): void;
            /**
             * 销毁
             */
            destroy(): void;
            /**
             * 是否初始化完毕
             */
            readonly isValid: boolean;
            /**
             * 
             * @param asset 弹框显示
             */
            open(asset: string | IAlertAsset): void;
            /**
             * 关闭
             */
            close(now?: boolean): void;
        }
        interface IMask extends IBaseUI {
            show(key?: string, opacity?: number): void
            /**
             * 透明度
             */
            setOpacity(value: number);
        }
        interface IToastMgr extends IBaseUI, cc.EventTarget {
            node: cc.Node;
            res: zmg.IResAsset;
            /**
             * 
             * @param msg toast文本
             * @param time 显示时间
             */
            open(msg: string, time: number): void;
            /**
            * 关闭
            */
            close(now?: boolean): void;
        }
        interface IBg extends IBaseUI {

        }
        interface ILoading extends IBaseUI, cc.EventTarget {
            readonly res: zmg.IResAsset;
            setProgress(value: number): void;
            hideProgress(): void;
        }
        interface IBackBtn extends IBaseUI {

        }
        interface ISettingBtn extends IBaseUI {

        }
        interface IUIMgr extends zmg.IMgr {
            /**
             * 背景图
             */
            bg: IBg;
            /**
             * 操作遮罩层
             */
            mask: IMask;
            /**
             * 返回按钮
             */
            backBtn: IBackBtn;
            /**
             * loading界面
             */
            loading: zmg.ILoading;
            /**
             * toast管理器
             */
            toast: IToastMgr;
            /**
             * 弹窗管理器
             */
            alert: IAlertMgr;
            /**
             * 切场景特效组件
             */
            transitions: ITransitions;
            /**
             * 
             * @param isProgress 是否显示进度条
             * @param pro 进度
             */
            showLoading(isProgress: boolean, pro?: number);
            /**
             * 隐藏进度条
             */
            hideLoading();
            /**
             * 
             */
            closeAll();
            /**
             * 刷新排版
             */
            updateAlignment(node: cc.Node): void;
        }
    }

}
export { }