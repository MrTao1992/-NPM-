class _ResLoadingAsset extends cc.Asset {
    private static _instance: _ResLoadingAsset;
    static create(): _ResLoadingAsset {
        if (!this._instance) {
            this._instance = new _ResLoadingAsset();
        }
        return this._instance;
    }
    constructor() {
        super();
        this.loaded = false;
        this.destroy();
    }
}

export let ResLoadingAsset = _ResLoadingAsset.create();