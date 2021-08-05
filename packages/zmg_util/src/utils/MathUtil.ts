/**
 * 数学计算工具类
 */
export class $MathUtils {

    /**
     * 弧度制转换为角度值
     * @param radian 弧度制
     * @returns {number}
     */
    public static getAngle(radian: number): number {
        return 180 * radian / Math.PI;
    }

    /**
     * 角度值转换为弧度制
     * @param angle
     */
    public static getRadian(angle: number): number {
        return angle / 180 * Math.PI;
    }

    /**
     * 获取两点间弧度
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    public static getRadian2(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
        var xdis: number = p2X - p1X;
        var ydis: number = p2Y - p1Y;
        return Math.atan2(ydis, xdis);
    }

    /**
     * 获取两点间距离
     * @param p1X
     * @param p1Y
     * @param p2X
     * @param p2Y
     * @returns {number}
     */
    public static getDistance(p1X: number, p1Y: number, p2X: number, p2Y: number): number {
        var disX: number = p2X - p1X;
        var disY: number = p2Y - p1Y;
        var disQ: number = disX * disX + disY * disY;
        return Math.sqrt(disQ);
    }

    /**
     * 获取区间随机数
     * @param min 最小值
     * @param max 最大值
     * @returns {number} 随机数
     */
    public static get_random_interval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public static getRatioScale(fromWidth: number, fromHeight: number,
        toWidth: number, toHeight: number): number {
        let s1 = fromWidth / fromHeight;
        let s2 = toWidth / toHeight;
        if (s1 > s2) {
            //按照宽算
            return toWidth / fromWidth;
        } else {
            return toHeight / fromHeight;
        }
        return 1;
    }
}