/**
 * 服务器拉取过的数据存储的内容
 */
export class ServerVo {
    private _vo: Record<string, any> = {};
    public getData(cmd: string): any {
        return this._vo[cmd];
    }
    public saveData(cmd: string, data: any): void {
        this._vo[cmd] = data;
    }
    public clearData(cmd: string): void {
        delete this._vo[cmd];
    }
    public clear(): void {
        this._vo = {};
    }
}