
import $BaseUI from "./BaseUI";

export class $UITransitions extends $BaseUI implements zmg.ITransitions {
    private _transitons: zmg.ITransitions;
    constructor(url: string, parent: cc.Node) {
        super(url);
        this._parent = parent;
    }
    public show(): void {
        if (!this.node.parent) {
            this.node.setParent(this._parent);
        }
    }
    public hide(): void {
        if (this.node.parent) {
            this.node.setParent(null);
        }
    }
    runScene(bunName: string, sceneUrl: string, onSceneLoaded: Function, onTransitionFinished: Function, color: cc.Color, movieClip: cc.Node): void {
        if (this._transitons) {
            this.show();
            this._transitons.runScene(bunName, sceneUrl, onSceneLoaded, onTransitionFinished, color, movieClip);
        }
    }
    protected onLoad() {
        let comps: cc.Component[] = this.node.getComponents(cc.Component);
        let i: number;
        let len: number = comps.length;
        for (i = 0; i < len; i++) {
            if (comps[i]["runScene"]) {
                this._transitons = (comps[i] as any) as zmg.ITransitions;
                break;
            }
        }
        this.onComplete();
    }
}