import { EventName } from "zmg_event_mgr";
import { StringUtil } from "zmg_util";

export class $ServerEvent extends cc.Event {
    static READY: string = EventName.SERVER_READY;
    static ERROR: string = EventName.SERVER_ERROR;
    static COMPLETE: string = EventName.SERVER_COMPLETE;
    private _status: number;
    private _code: string;
    private _message: string;
    private _response: any;
    /**
     * 错误消息 
     */
    public init(xhr: XMLHttpRequest): void {
        if (xhr && StringUtil.isValid(xhr.response)) {
            this._response = JSON.parse(xhr.response);
        }
    }

    public get status(): number {
        return this._status
    }

    public set status(v: number) {
        this._status = v;
    }

    public set code(v: string) {
        this._code = v;
    }

    public get code(): string {
        return this._code ? this._code : "";
    }

    public get message(): string {
        return this._message
    }

    public set message(v: string) {
        this._message = v;
    }

    public get response(): any {
        return this._response;
    }
    public set response(value: any) {
        this._response = value;
    }

    public get data(): any {
        let obj: any
        let res: any = this.response;
        if (res) {
            if (StringUtil.isValid(res.code)) {
                obj = res.data;
            } else {
                obj = this.response;
            }
        }
        return obj;
    }
    constructor(type: string) {
        super(type, false);
    }
}