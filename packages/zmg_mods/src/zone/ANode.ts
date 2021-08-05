/**
 * Node 节点
 * @author chenkai
 * @since 2017/11/3
 */
// namespace astar{
export class $ANode {
	public a: number;    //列
	public b: number;    //行
	public f: number;    //代价 f = g+h
	public g: number;    //起点到当前点代价
	public h: number;    //当前点到终点估计代价
	public walkable: boolean = true;
	public parent: $ANode;
	public costMultiplier: number = 1.0;

	public x: number;
	public y: number;

	public constructor(a: number, b: number, dis: number) {
		this.a = a;
		this.b = b;
		this.x = a * dis;
		this.y = b * dis;
	}

	public get postion(): cc.Vec2 {
		return new cc.Vec2(this.x, this.y);
	}
}
// }
