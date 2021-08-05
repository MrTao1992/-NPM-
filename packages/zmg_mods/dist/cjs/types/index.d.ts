declare module 'zmg_mods/src/zone/ANode' {
	/**
	 * Node 节点
	 * @author chenkai
	 * @since 2017/11/3
	 */
	export class $ANode {
	    a: number;
	    b: number;
	    f: number;
	    g: number;
	    h: number;
	    walkable: boolean;
	    parent: $ANode;
	    costMultiplier: number;
	    x: number;
	    y: number;
	    constructor(a: number, b: number, dis: number);
	    get postion(): cc.Vec2;
	}

}
declare module 'zmg_mods/src/zone/AStar' {
	import { $AGrid } from 'zmg_mods/src/AGrid';
	import { $ANode } from 'zmg_mods/src/ANode';
	/**
	 * A星寻路
	 * @author chenkai
	 * @since 2017/11/3
	 */
	export class $AStar {
	    private _open;
	    private _closed;
	    private _grid;
	    private _endNode;
	    private _startNode;
	    private _path;
	    private _heuristic;
	    private _straightCost;
	    private _diagCost;
	    constructor();
	    findPath(grid: $AGrid): boolean;
	    search(): boolean;
	    private buildPath;
	    get path(): any[];
	    private isOpen;
	    private isClosed;
	    private manhattan;
	    private euclidian;
	    private diagonal;
	    get visited(): $ANode[];
	}

}
declare module 'zmg_mods/src/zone/AGrid' {
	import { $ANode } from 'zmg_mods/src/ANode';
	import { $AStar } from 'zmg_mods/src/AStar';
	/**
	 * 网格类
	 * @author chenkai
	 * @since 2017/11/3
	 */
	export class $AGrid {
	    private _startNode;
	    private _endNode;
	    private _nodes;
	    private _numCols;
	    private _numRows;
	    private _endX;
	    private _endY;
	    dis: number;
	    astar: $AStar;
	    get endX(): number;
	    get endY(): number;
	    constructor(numCols: number, numRows: number, dis: number);
	    getNodeByAB(x: number, y: number): $ANode;
	    getWalkAble(x: number, y: number): boolean;
	    getRandomWalkPixel(time?: number): cc.Vec2;
	    getWalkAbleByPixel(tx: number, ty: number): boolean;
	    getWalkByPixel(pos: cc.Vec2 | cc.Vec3 | number, ty?: number): $ANode;
	    getNode(pos: cc.Vec2 | cc.Vec3 | number, ty?: number): $ANode;
	    getNearWalkNode(a: number, b: number): $ANode;
	    findPathPixis(startX: number, startY: number, endX: number, endY: number): $ANode[];
	    setEndNode(x: number, y: number): boolean;
	    setStartNode(x: number, y: number): boolean;
	    setWalkable(x: number, y: number, value: boolean): void;
	    get endNode(): $ANode;
	    get numCols(): number;
	    get numRows(): number;
	    get startNode(): $ANode;
	    destory(): void;
	}

}
declare module 'zmg_mods/src/zone/AEvent' {
	export class $AEvent extends cc.Event {
	    /**
	     * 人物移动过程
	     */
	    static ROLE_MOVE: string;
	    /**
	     * 人物开始移动
	     */
	    static ROLE_WALK: string;
	    /**
	     * 人物站立(结束移动)
	     */
	    static ROLE_STAND: string;
	    /**
	     * 请求人物移动到当前位置的事件
	     */
	    static ZONE_MOVE: string;
	    protected _worldPos: cc.Vec2;
	    get worldPos(): cc.Vec2;
	    set worldPos(pos: cc.Vec2);
	    constructor(type: string, bubbles?: boolean);
	}

}
declare module 'zmg_mods/src/zone/ATarget' {
	import { $ANode } from 'zmg_mods/src/ANode';
	/**
	 * 会移动的对象
	 */
	export default class $ATarget extends cc.Component {
	    protected _easingY: string;
	    angleLib: number[][];
	    protected _targetANode: $ANode;
	    protected _square: number;
	    protected _degree: number;
	    protected _speed: number;
	    protected _direction: number;
	    protected _paths: $ANode[];
	    protected _isMoving: boolean;
	    protected _target: cc.Node;
	    private _oriScaleX;
	    private _oriScaleY;
	    set oriScaleX(value: number);
	    set oriScaleY(value: number);
	    setTarget(node: cc.Node): void;
	    onLoad(): void;
	    onEnable(): void;
	    onDisable(): void;
	    setPosition(pos: cc.Vec2 | number, y?: number): void;
	    getPosition(): cc.Vec2;
	    setEasingY(easingY: string): void;
	    updateEasing(): void;
	    get speed(): number;
	    set speed(value: number);
	    get isMoving(): boolean;
	    walk(): void;
	    stopWalk(): void;
	    stopTalk(): void;
	    isHit(pos: cc.Vec2): boolean;
	    toRoom(x: number, y: number, swapNode: cc.Node): void;
	    update(dt: number): void;
	    protected updateTarget(pos: cc.Vec2): void;
	    private mathScaleY;
	    setPaths(paths: $ANode[], pos: cc.Vec2): void;
	    /**
	     * 设置移动角度
	     */
	    set degree(value: number);
	    protected mathSpeed(dt: number): cc.Vec2;
	}

}
declare module 'zmg_mods/src/zone/AMap' {
	import { $AGrid } from 'zmg_mods/src/AGrid';
	import { $ANode } from 'zmg_mods/src/ANode';
	export default class $AMap extends cc.Component {
	    isDebug: boolean;
	    debugNode: cc.Node;
	    distance: number;
	    moveArea: cc.PolygonCollider;
	    collides: cc.Collider[];
	    protected _grid: $AGrid;
	    private _delayFuns;
	    hitTest(x1: number, y1: number, x2: number, y2: number): boolean;
	    onLoad(): void;
	    colliderNoOffect(polygon: cc.Collider): void;
	    onReady(readyFun: Function, target: any): void;
	    protected setGrid(data: $AGrid): void;
	    get offV2(): cc.Vec2;
	    private parseMapByCollider;
	    private parseMap;
	    drawMap(target?: $ANode[]): void;
	    onDestroy(): void;
	    /**
	     * onLoad不存在
	     * cc.PolygonCollider.world
	     */
	    start(): void;
	    getHitPoint(pos: cc.Vec2, points: cc.Vec2[]): cc.Vec2;
	    getNode(pos: cc.Vec2 | cc.Vec3): $ANode;
	    getWalkNode(pos: cc.Vec2 | cc.Vec3): $ANode;
	    findPathPixis(startX: number, startY: number, endX: number, endY: number): $ANode[];
	}

}
declare module 'zmg_mods/src/zone/ASwap' {
	import $ATarget from 'zmg_mods/src/ATarget';
	export default class $ASwap extends cc.Component {
	    private _isUpdate;
	    onLoad(): void;
	    private onTimer;
	    updateAlignment(): void;
	    private sortNode;
	    addMove(move: $ATarget): void;
	    onEnable(): void;
	    onDisable(): void;
	}

}
declare module 'zmg_mods/src/zone/AZone' {
	import $AMap from 'zmg_mods/src/AMap';
	import $ATarget from 'zmg_mods/src/ATarget';
	import $ASwap from 'zmg_mods/src/ASwap';
	import { DirectorEvent } from 'zmg_controller';
	import { $AGrid } from 'zmg_mods/src/AGrid';
	export default class $AZone extends $AMap {
	    isFocus: boolean;
	    roleCamera: cc.Camera;
	    background: cc.Node;
	    foreground: cc.Node;
	    swap: $ASwap;
	    roleScale: number;
	    roleSpeed: number;
	    petSpeed: number;
	    startNode: cc.Vec2;
	    easingY: string;
	    private _roleMove;
	    private _petMove;
	    private _minCameraX;
	    private _maxCamearX;
	    private _minCameraY;
	    private _maxCamearY;
	    private _isLocking;
	    private _moves;
	    private _isInit;
	    lock(): void;
	    unLock(): void;
	    addMove(move: $ATarget): void;
	    onLoad(): void;
	    init(): void;
	    onEnable(): void;
	    onDisable(): void;
	    private onActorTalk;
	    onSceneEnd(evt?: DirectorEvent): void;
	    start(): void;
	    setPostion(pos: cc.Vec2): void;
	    protected setGrid(data: $AGrid): void;
	    private onZoneMove;
	    private onRoleMove;
	    private onMouseDown;
	    moveTo(pos: cc.Vec2): void;
	    private onRoleTouchDown;
	    private onMouseUp;
	    private updateCamera;
	    private onRoleWalk;
	    private onRoleStand;
	    private onPetWalk;
	    private onPetStand;
	    private onMoveRole;
	    convertToNodeSpace(pos: cc.Vec2): cc.Vec2;
	    convertToNodeSpaceAR(pos: cc.Vec2): cc.Vec2;
	}

}
declare module 'zmg_mods/src/zone/AMoveButton' {
	import { zmgui_btn_SimpleBtn } from 'zmg_ui_mgr';
	export default class $AMoveButton extends zmgui_btn_SimpleBtn {
	    worldPos: cc.Vec2;
	    isMove: boolean;
	    onLoad(): void;
	    /**
	     * 检查移动位置是否可以行走
	     */
	    protected checkPoint(): void;
	    protected onHandler(evt?: cc.Event.EventTouch): void;
	    onEnable(): void;
	    onDisable(): void;
	    private onRoleWalk;
	    private onRoleStand;
	}

}
declare module 'zmg_mods/src/zone/AEditMap' {
	import { $ANode } from 'zmg_mods/src/ANode';
	export default class $AEditMap extends cc.Component {
	    isDebug: boolean;
	    data: cc.JsonAsset;
	    covers: cc.Collider[];
	    collider: cc.Collider;
	    zoneName: string;
	    distance: number;
	    private _grid;
	    /**
	     * 打印输出数据
	     */
	    private createMap;
	    private printMap;
	    private parseMap;
	    drawMap(target?: $ANode[]): void;
	    onLoad(): void;
	    getHitPoint(pos: cc.Vec2, points: cc.Vec2[]): cc.Vec2;
	    getHitNode(pos: cc.Vec2 | cc.Vec3): $ANode;
	    findPathPixis(startX: number, startY: number, endX: number, endY: number): $ANode[];
	}

}
declare module 'zmg_mods' {
	import $AZone from 'zmg_mods/src/zone/AZone';
	import $ATarget from 'zmg_mods/src/zone/ATarget';
	import { $AStar } from 'zmg_mods/src/zone/AStar';
	import { $ANode } from 'zmg_mods/src/zone/ANode';
	import $AMoveButton from 'zmg_mods/src/zone/AMoveButton';
	import $AMap from 'zmg_mods/src/zone/AMap';
	import { $AGrid } from 'zmg_mods/src/zone/AGrid';
	import { $AEvent } from 'zmg_mods/src/zone/AEvent';
	import $AEditMap from 'zmg_mods/src/zone/AEditMap';
	export class zmmods_zone_AZone extends $AZone {
	}
	export class zmmods_zone_ATarget extends $ATarget {
	}
	export class zmmods_zone_ASwap extends $ATarget {
	}
	export class zmmods_zone_AStar extends $AStar {
	}
	export class zmmods_zone_ANode extends $ANode {
	}
	export class zmmods_zone_AMoveButton extends $AMoveButton {
	}
	export class zmmods_zone_AMap extends $AMap {
	}
	export class zmmods_zone_AGrid extends $AGrid {
	}
	export class zmmods_zone_AEvent extends $AEvent {
	}
	export class zmmods_zone_AEditMap extends $AEditMap {
	}

}
declare module 'zmg_mods/src/interfaces' {
	 global {
	    namespace zmg {
	        interface IComponent {
	            node: cc.Node;
	        }
	    }
	}
	export {};

}
