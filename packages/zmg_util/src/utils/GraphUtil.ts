export class $GraphUtil {

    //矩形四角
    //当前移动的目标点
    public static angleLib: number[][] = [
        [Math.sin(0 * Math.PI / 180), Math.cos(0 * Math.PI / 180)], //0
        [Math.sin(45 * Math.PI / 180), Math.cos(45 * Math.PI / 180)], //1
        [Math.sin(90 * Math.PI / 180), Math.cos(90 * Math.PI / 180)],  //2
        [Math.sin(135 * Math.PI / 180), Math.cos(135 * Math.PI / 180)],//3
        [Math.sin(180 * Math.PI / 180), Math.cos(180 * Math.PI / 180)],//4
        [Math.sin(225 * Math.PI / 180), Math.cos(225 * Math.PI / 180)],//5
        [Math.sin(270 * Math.PI / 180), Math.cos(270 * Math.PI / 180)],//6
        [Math.sin(315 * Math.PI / 180), Math.cos(315 * Math.PI / 180)],//7
    ];
    /**
     * 创建空节点
     */
    public static createEmpty(): cc.Vec2 {
        return new cc.Vec2(0, 0);
    }

    public static colliderNoOffect(polygon: cc.PolygonCollider): void {
        polygon.world.points.forEach((value: cc.Vec2, index: number, array: cc.Vec2[]) => {
            value.add(polygon.offset);
        });
        polygon.offset = new cc.Vec2(0, 0);
    }
    //碰撞
    public static hitTest(pos: cc.Vec2, col: cc.Collider): boolean {
        if (col == null || pos == null) {
            return false;
        }
        let cameraOff: cc.Vec2 = cc.Camera.main.node.getPosition();
        pos = pos.add(cameraOff);
        pos = col.node.convertToNodeSpaceAR(pos);
        if (col instanceof cc.PolygonCollider) {
            pos = pos.sub(col.offset);
            return cc.Intersection.pointInPolygon(pos, col.points);
        } else if (col instanceof cc.CircleCollider) {
            pos = pos.sub(col.offset);
            if (pos.x * pos.x + pos.y * pos.y < col.radius * col.radius) {
                return true;
            } else {
                return false;
            }
        } else if (col instanceof cc.BoxCollider) {
            pos = pos.sub(col.offset);
            // convertWorldSpaceAR
            // return cc.Intersection.pointInPolygon(pos, col.points);
            pos.x += col.size.width / 2;
            pos.y += col.size.height / 2;
            if (pos.x > 0 && pos.x < col.size.width && pos.y > 0 && pos.y < col.size.height) {
                return true;
            }
            return false;
        }
    }

    public static squareDis(x1: number, y1: number, x2: number, y2: number): number {
        var tx: number = x1 - x2;
        var ty: number = y1 - y2;
        return tx * tx + ty * ty;
    }

    public static getAngle(x1: number, y1: number, x2: number, y2: number): number {
        var begin = cc.v2(x1, y1);
        var end = cc.v2(x2, y2);
        var dir = end.sub(begin);
        if (dir.x == 0 && dir.y == 0) {
            return 360;
        }
        var angle = dir.signAngle(cc.v2(0, 1));
        var degree = angle / Math.PI * 180;
        return degree;
    }

    //点击坐标转换成为居中坐标
    static convertTouchCenter(evt: cc.Event.EventTouch): cc.Vec2 {
        var node: cc.Node = evt.target;
        var pos: cc.Vec2 = node.convertToWorldSpaceAR(evt.getLocation());
        pos.sub(new cc.Vec2(cc.view.getVisibleSize().width, cc.view.getVisibleSize().height), pos);
        return pos;
    }
}