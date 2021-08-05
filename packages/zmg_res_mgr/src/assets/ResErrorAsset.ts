class _ResErrorAsset extends cc.Asset {
    private static _instance: _ResErrorAsset;
    static create(): _ResErrorAsset {
        return new _ResErrorAsset()
    }
    constructor() {
        super();
        this.loaded = false;
        this.destroy();
    }
}

export let ResErrorAsset = _ResErrorAsset.create();