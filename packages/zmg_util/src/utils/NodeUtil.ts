import { $DragonAsset } from "../assets/DragonAsset";
import { _gLog } from "../log/gLog";
import { $DragonUtil } from "./DragonUtil";
import { $GraphUtil } from "./GraphUtil";
import { $StringUtil } from "./StringUtil";

export class $NodeUtil {
    public static isValid(node: cc.Node | cc.Node[]): boolean {
        if (node instanceof Array) {
            let i: number;
            let len: number = node.length;
            for (i = 0; i < len; i++) {
                if (!cc.isValid(node[i])) {
                    return false;
                }
            }
            return true;
        }
        return cc.isValid(node);
    }
    // if (!node) {
    //     return false;
    // }
    // if (!node.isValid) {
    //     return false;
    // }
    // return true;
    public static isValidComponent(com: cc.Component): boolean {
        return cc.isValid(com);
    }
    public static createNode(name: string, parent: cc.Node): cc.Node {
        var node: cc.Node = new cc.Node();
        node.name = name;
        if (this.isValid(parent)) {
            node.setParent(parent);
        }
        return node;
    }
    public static createNodeByPre(pre: cc.Prefab, parent?: cc.Node, name?: string): cc.Node {
        if (name && this.isValid(parent)) {
            if (parent.getChildByName(name)) {
                _gLog("当前节点:" + parent.name, "已有对象:" + pre.name);
            }
        }
        var node: cc.Node = cc.instantiate(pre);
        if (this.isValid(parent)) {
            node.setParent(parent);
        }
        if ($StringUtil.isValid(name)) {
            node.name = name;
        }
        return node;
    }
    public static createComponent(className: any, node?: cc.Node, name?: string): any {
        var node: cc.Node = this.isValid(node) ? node : new cc.Node();
        if ($StringUtil.isValid(name)) {
            node.name = name;
        }
        var c = node.getComponent(className);
        if (!c) {
            c = node.addComponent(className);
        }
        return c;
    }
    public static createSprite(tex: cc.Texture2D, node?: cc.Node, name?: string): cc.Sprite {
        var node: cc.Node = this.isValid(node) ? node : new cc.Node();
        name && (node.name = name);
        var s: cc.Sprite;
        s = node.getComponent(cc.Sprite);
        if (!s) {
            s = node.addComponent(cc.Sprite);
        }
        s.spriteFrame = new cc.SpriteFrame(tex);
        return s;
    }

    public static createDragon(dragon: $DragonAsset, node?: cc.Node, name?: string): dragonBones.ArmatureDisplay {
        return $DragonUtil.createDragon(dragon, node, name);
    }

    /**
    * 获取节点在目标节点（容器）下的相对位置
    * @param node 节点
    * @param target 目标节点（容器）
    */
    public static getRelativePosition(node: cc.Node, target: cc.Node): cc.Vec2 {
        if (!this.isValid(node)) {
            return new cc.Vec2();
        }
        let worldPos = node.getParent().convertToWorldSpaceAR(node.getPosition());
        let targetPos = target.convertToNodeSpaceAR(worldPos);
        return targetPos;
    }

    /**
     * @description: 通过name获取节点
     * @param {string} name
     * @param {cc} node
     */
    public static getChildByName(name: string, node: cc.Node): cc.Node {
        if (!this.isValid(node)) {
            return null;
        }
        var child: cc.Node = node.getChildByName(name);
        if (child == null) {
            child = new cc.Node(name);
            node.addChild(child);
        }
        return child;
    }
    public static hasChildByName(name: string, node: cc.Node): cc.Node {
        if (!this.isValid(node)) {
            return null;
        }
        var child: cc.Node = node.getChildByName(name);
        if (child == null || !child.isValid) {
            return null;
        }
        return child;
    }

    /**
     * @description: 限制节点大小
     */
    public static restrictRect(
        node: cc.Node,
        maxWidth: number,
        maxHeight: number
    ): void {
        let screenRatio = node.height / node.width;
        let designRatio = maxHeight / maxWidth;

        if (screenRatio >= designRatio) {
            let scale = maxHeight / node.height;
            node.scale = scale;
        } else {
            let scale = maxWidth / node.width;
            node.scale = scale;
        }
    }

    /**
     * @description: 设置节点颜色值
     * @param {cc} node
     * @param {cc} color
     */
    public static setNodeColor(node: cc.Node, color: cc.Color): void {
        if (!this.isValid(node)) {
            return;
        }
        if (!node.color.equals(color)) {
            node.color = color;
        }
    }

    public static setParent(node: cc.Node, parent: cc.Node): void {
        if ($NodeUtil.isValid(node) && $NodeUtil.isValid(parent)) {
            node.setParent(parent);
        }
    }

    public static getStagePoint(node: cc.Node, pos: cc.Vec2): cc.Vec2 {
        return node.convertToWorldSpaceAR(pos);
    }

    /**
     * 
     * @param pos 必须是世界坐标体系下的坐标
     * @param node 
     */
    public static hitTest(pos: cc.Vec2, node: cc.Node): boolean {
        let colliders: cc.Collider[] = node.getComponents(cc.Collider);
        for (let index = 0; index < colliders.length; index++) {
            const col = colliders[index];
            if (col) {
                return $GraphUtil.hitTest(pos, col);
            }
        }
        return node["_hitTest"](pos);
    }

}