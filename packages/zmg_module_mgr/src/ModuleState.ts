export class ModuleState {
    private _isVaild: boolean;
    public message: string;
    public condition: { condion: zmg.IModuleCondition, param: any };
    public succeed(message: string): void {
        this._isVaild = true;
        this.message = message;
    }
    public failed(condition: { condion: zmg.IModuleCondition, param: any }, message: string): void {
        this.condition = condition;
        this.message = message;
        this._isVaild = false;
    }
    public get isVaild(): boolean {
        return this._isVaild;
    }

}