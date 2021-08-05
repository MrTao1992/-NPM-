import { _TsLog } from "./TsLog";

let TsLog = _TsLog.getInstance();
/**
 * 日志部分
 */
/**
 * 普通日志输出
 * @param args 参数
 */
export function _gLog(...args): void {
    TsLog.log(args);
}
/**
 * 警告日志输出
 * @param args 参数
 */
export function _gWarn(...args): void {
    TsLog.warn(args);
}
/**
 * 错误日志输出
 * @param args 参数
 */
export function _gError(...args): void {
    TsLog.error(args);
}

/**
 * 下载log
 */
export function _gDownLoadLog(): void {
    TsLog.downloadLog()
}

/**
 * 清理log缓存
 */
export function _gClearLog(): void {
    TsLog.clear()
}
/**
 * 将{}内容替换成参数内容
 */
export function _$(msg: string, ...args) {
    let reg = /\{(.*?)\}/;
    let i;
    let len = args.length;
    for (i = 0; i < len; i++) {
        msg = msg.replace(reg, args[i]);
    }
    return msg;
}

/**
 * 日志部分结束
 */