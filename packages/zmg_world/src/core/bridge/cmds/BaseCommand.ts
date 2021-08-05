

export class $BaseCommand {
    protected _packet: any;

    constructor() {
    }

    public set packet(value: any) {
        this._packet = value;
    }

    public run(data: any): void {
        this.excute(data);
    }

    public excute(data: any): any {
        throw new Error("虚拟函数，需要实现方法。")
    }

}