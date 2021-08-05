export class ServerCastData {
    /**
     * xhr.status
     * 200=OK
     */
    status: number;
    /**
     * 后台返回错误码
     */
    code: string;
    /**
     * 后台返回错误信息
     */
    message: string;
    constructor(status: number, code: string, message: string) {
        this.status = status;
        this.code = code;
        this.message = message;
    }
    toString(): string {
        return "status: " + this.status + " code:" + this.code + " message:" + this.message;
    }
}