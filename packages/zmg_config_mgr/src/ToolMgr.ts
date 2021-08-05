import { BaseMgr } from "zmg_mgr";
import { ResMgr } from "zmg_res_mgr";

export class ToolMgr {
    private _data: zmg.IConfigTool[];
    public get isValid(): boolean {
        return this._data ? true : false;
    }
    parse(data: zmg.IConfigTool[]): void {
        this._data = data ? data : [];
    }

    public isClose(name: string): boolean {
        let i: number;
        let len: number = this._data.length;
        for (i = 0; i < len; i++) {
            if (this._data[i].name == name) {
                return this._data[i].close;
            }
        }
        let item: zmg.IConfigTool = {
            id: 0,
            name: name,
            displayName: "动态创建",
            close: false
        };
        this._data.push(item);
        return false;
    }
}