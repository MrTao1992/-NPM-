import { $NodeUtil } from "./NodeUtil";

export class $SpriteUtil {

    public static isValid(tex: cc.Sprite | cc.Sprite[]): boolean {
        if (tex instanceof Array) {
            let i: number;
            let len: number = tex.length;
            for (i = 0; i < len; i++) {
                if (!cc.isValid(tex[i])) {
                    return false;
                }
            }
            return true;
        }
        return cc.isValid(tex);
    }

    public static createNodeFrame(
        tex: cc.SpriteFrame | cc.Texture2D,
        node?: cc.Node
    ): cc.Node {
        node = node ? node : new cc.Node();
        var frame: cc.SpriteFrame =
            tex instanceof cc.SpriteFrame ? tex : new cc.SpriteFrame(tex);
        var sprite: cc.Sprite = node.getComponent(cc.Sprite);
        if (sprite == null) {
            sprite = node.addComponent(cc.Sprite);
        }
        sprite.srcBlendFactor = cc.macro.BlendFactor.ONE;
        sprite.spriteFrame = frame;
        return node;
    }

    public static createSprite(
        name: string,
        parent: cc.Node,
        tex: cc.SpriteFrame | cc.Texture2D,
        x: number = 0,
        y: number = 0
    ): cc.Sprite {
        var node: cc.Node = $NodeUtil.getChildByName(name, parent);
        if (node == null) {
            node = new cc.Node();
            node.name = name;
            parent && node.setParent(parent);
        }
        var sprite: cc.Sprite = node.getComponent(cc.Sprite);
        if (sprite == null) {
            sprite = node.addComponent(cc.Sprite);
            sprite.srcBlendFactor = cc.macro.BlendFactor.ONE;
        }
        var frame: cc.SpriteFrame =
            tex instanceof cc.SpriteFrame ? tex : new cc.SpriteFrame(tex);
        sprite.spriteFrame = frame;
        node.setPosition(x, y);
        return sprite;
    }

    public static createOneNode(
        name: string,
        parent: cc.Node,
        tex: cc.SpriteFrame | cc.Texture2D,
        index: number = -1,
        x: number = 0,
        y: number = 0
    ): cc.Sprite {
        var node: cc.Node = new cc.Node();
        parent.addChild(node);
        var sprite: cc.Sprite = node.getComponent(cc.Sprite);
        if (sprite == null) {
            sprite = node.addComponent(cc.Sprite);
            sprite.srcBlendFactor = cc.macro.BlendFactor.ONE;
        }
        var frame: cc.SpriteFrame =
            tex instanceof cc.SpriteFrame ? tex : new cc.SpriteFrame(tex);
        sprite.spriteFrame = frame;
        node.setPosition(x, y);
        node.zIndex = index;
        return sprite;
    }
}
