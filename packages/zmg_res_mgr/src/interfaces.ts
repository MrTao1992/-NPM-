
import { } from 'zmg_mgr';
import { DragonAsset } from 'zmg_util';
import { } from './common/EResError';
import { $ResEvent } from './ResEvent';
import { } from './SystemBundleName';

declare global {
    namespace zmg {
        interface IResCacheLib {
            init(): Promise<void>;
            clear(): void;
            isRemote(): boolean;
            getBundle(): cc.AssetManager.Bundle;
            loadAsset(path: string, isDir: boolean, type: typeof cc.Asset): void;
            getAsset(path: string, isDir: boolean): cc.Asset | cc.Asset[];
        }
        interface IResAsset {
            bunName: string,
            path: string

        }
        interface IDragonResAsset {
            /**
             * 目录
             */
            dir: string;
            /**
             * 图片地址
             */
            tex: string;
            /**
             * asset地址
             */
            asset: string;
            /**
             * atlas地址
             */
            atlas: string;
            /**
             * 资源是否是目录结构
             */
            isDir(): boolean;
        }
        interface IResListener {
            libs: zmg.IResCacheLib;
            /**
             * 要求监听对象
             */
            target: any;
            /**
             * 模块名
             */
            bunName: string;
            /**
             * 路径
             */
            path: string | string[];
            isDir: boolean;
            /**
             * 下载完成回调函数
             */
            launchFun: (assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void;
            /**
             * 下载错误回调
             */
            errorFun: (path: string, listener?: zmg.IResListener) => void;
            /**
             * 下载进度
             */
            progressFun: (path: string, pro: number, total: number, listener?: zmg.IResListener) => void;
            /**
             * 完成后函数调用
             */
            onLaunch(asset?: cc.Asset | cc.Asset[]): $ResEvent;
            /**
             * 是否加载完毕
             */
            isLoaded(): boolean;
            /**
             * 获取加载资源
             */
            getAsset(): cc.Asset | cc.Asset[]
            /**
            * 报错后函数调用
            */
            onError(errorPath: string | string[]): void
            /**
             * 进度中函数调用
             */
            onProgress(path: string, pro: number, total: number): boolean;
            /**
             * 资源是否合法
             */
            isValid(): boolean;

            /**
             * copy一份自身副本
             */
            clone(): zmg.IResListener;
        }
        interface IDragonResListener extends IResListener {
            source: zmg.IDragonResAsset;
            // getDragons(): DragonAsset;
        }
        interface IResMgr extends zmg.IMgr {
            /**
             * 增加监听者
             * @param listener 
             */
            addListener(listener: zmg.IResListener, libs: zmg.IResCacheLib, bunName?: string, path?: string | string[], isDir?: boolean): void;
            /**
             * 移除监听者
             * @param target 
             */
            removeLister(target: any | IResListener): void;
            /**
             * 下载资源
             * @param bundle 
             * @param path 
             * @param listener 
             */
            load(bundle: string, path: string | string[], listener: IResListener, type?: typeof cc.Asset): void;
            load(bundle: string, path: string | string[], handler: ((assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void), target?: any, type?: typeof cc.Asset): void;
            // loadAny(param: zmg.IResAsset | string, listener?: zmg.IResListener, path?: string, type?: typeof cc.Asset): void
            loadRes(res: zmg.IResAsset, listener: zmg.IResListener, type?: typeof cc.Asset): void;
            loadRes(res: zmg.IResAsset, handler: ((assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void), target?: any, type?: typeof cc.Asset): void;
            /**
             * 加载场景
             * @param bundle 
             * @param path 
             * @param listener 
             */
            loadScene(bundle: string, path: string | string[], listener: IResListener): void;
            loadScene(bundle: string, path: string | string[], handler: ((assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void), target?: any): void;
            /**
             * 下载目录内资源
             * @param resName 
             * @param path 
             * @param listener 
             */
            loadDir(resName: string, path: string | string[], listener: IResListener, type?: typeof cc.Asset): void;
            loadDir(resName: string, path: string | string[], handler: ((assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void), target?: any, type?: typeof cc.Asset): void;
            /**
             * 下载bundle龙骨资源
             * @param resName 
             * @param path 
             * @param listener 
             */
            loadDragon(resName: string, path: IDragonResAsset | string, listener: IDragonResListener): void;
            loadDragon(resName: string, path: IDragonResAsset | string, handler: (assets: DragonAsset, listener?: zmg.IResListener) => void, target: any): void;
            /**
             * 下载远程资源
             * @param path 
             * @param listener 
             */
            loadRemote(path: string | string[], listener: IResListener, type?: typeof cc.Asset): void;
            loadRemote(path: string | string[], handler: ((assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void), target?: any, type?: typeof cc.Asset): void;
            /**
             * 下载远程龙骨资源
             * @param path 
             * @param listener 
             */
            loadDragonRemote(path: IDragonResAsset, listener: IResListener): void;
            loadDragonRemote(path: IDragonResAsset, handler: ((assets: cc.Asset | cc.Asset[], listener?: zmg.IResListener) => void), target?: any): void;
            /**
             * 清理所有缓存
             */
            clearCache(): void;
            /**
             * 按照bundle清理缓存
             * @param resName 
             */
            clearBundleCache(resName: string): void;
            /**
             * 是否存在资源
             */
            isVaildAsset(bunName: string, path: string): Promise<any>;

        }
    }
}
export { }