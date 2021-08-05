
export abstract class BaseCommand {
    protected _packet: any;

    constructor() {
    }

    public set packet(value: any) {
        this._packet = value;
    }

    public run(data: any): void {
        this.excute(data);
    }

    public abstract excute(data: any);

}