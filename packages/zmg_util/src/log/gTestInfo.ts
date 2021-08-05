import { _gError } from "./gLog";

/**
* 测试模块，用来测试调优
*/
export let GTestInfo = new class {
    /**调试信息总节点 */
    public _debugInfo: cc.Node = null;

    cacheInfo() {
        let rawCacheData = cc.assetManager.assets["_map"];
        //统计各类型资源极其数量
        let typeAndNum: Record<string, number> = {};
        let allPngSize = 0;
        let pngCount = 0;
        for (let key of Object.keys(rawCacheData)) {
            let value = rawCacheData[key];
            let __classname__ = value.__classname__;
            if (typeAndNum[__classname__]) {
                typeAndNum[__classname__]++;
            } else {
                typeAndNum[__classname__] = 1;
            }
            //如果是 cc.Texture2D 图片资源，就计算其大小
            if (__classname__ == "cc.Texture2D") {
                let textureSize = value.width * value.height * ((value._native == ".jpg" ? 3 : 4) / 1024 / 1024);
                allPngSize += textureSize;
            }
        }
        for (let key of Object.keys(typeAndNum)) {
            let value = typeAndNum[key];
            // gError(`${key}数量：${value}`);
            if (key == "cc.Texture2D") {
                pngCount = value;
            }
        }
        // gError(`所有资源信息: `, typeAndNum);
        // gError("资源总数", Object.keys(rawCacheData).length);
        // gError(`图片数量: ${pngCount}`);
        // gError(`图片总大小: ${allPngSize.toFixed(2)}M`);
        let assetsNum = Object.keys(rawCacheData).length;
        let pngNum = pngCount;
        let pngSize = `${allPngSize.toFixed(2)}M`;
        return { assetsNum, pngNum, pngSize };
    }

    /**计算某个节点的子节点个数，默认为计算当前场景节点个数，
     * 如果子节点数一直增加，说明可能有未销毁的节点，有内存泄露的风险 */
    countChildNodeNum(parent: cc.Node = cc.director.getScene()) {
        let num = 0;
        for (let i = 0; i < parent.childrenCount; i++) {
            let node = parent.children[i];
            num++;
            if (node.childrenCount > 0) {
                num += this.countChildNodeNum(node);
            }
        }
        let typeName = "节点";
        if (parent instanceof cc.Scene) {
            typeName = "场景"
        }
        // _gError(`${typeName}${parent.name}的子节点个数:`, num);
        return num;
    }

    /**显示调试信息，调试信息节点为常驻节点 */
    showDebugInfo() {
        if (!this._debugInfo) {
            //生成调试信息节点, 显示各种调试信息
            this._debugInfo = new cc.Node();
            this._debugInfo.parent = cc.director.getScene();
            this._debugInfo.zIndex = 9999;
            cc.game.addPersistRootNode(this._debugInfo);
            //显示在右上角
            this._debugInfo.position = cc.v3(cc.winSize.width - 200, 100);
            //内存和节点数信息节点
            let cacheAndNodeNumInfo = new cc.Node();
            cacheAndNodeNumInfo.color = cc.Color.BLUE;
            cacheAndNodeNumInfo.parent = this._debugInfo;
            cacheAndNodeNumInfo.width = 200;
            cacheAndNodeNumInfo.height = 200;
            let cacheAndNodeNumLabel = cacheAndNodeNumInfo.addComponent(cc.Label);
            cacheAndNodeNumLabel.fontSize = 20
            //1秒刷新一次信息
            setInterval(() => {
                let info = this.cacheInfo();
                let nodeNum = this.countChildNodeNum();
                cacheAndNodeNumLabel.string =
                    `资源总数：${info.assetsNum}\n图片数量：${info.pngNum}\n图片大小：${info.pngSize}\n节点总数：${nodeNum}`;
            }, 1000);
        }
        this._debugInfo.active = true;
    }

    /**隐藏调试信息 */
    hideDebugInfo() {
        if (this._debugInfo && cc.isValid(this._debugInfo)) {
            this._debugInfo.active = false;
        }
    }


}();
window["GTestInfo"] = GTestInfo;

