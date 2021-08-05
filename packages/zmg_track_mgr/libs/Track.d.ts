/**
 * 公司内部埋点工具，暴露给TrackDataManager调用的，请勿直接调用
 */
declare class ZM_JSSDK {
  static setConfig(params: any): void
  static setDefaults(params: any): void
  /**
   * 请勿直接调用，暴露给特定的类使用的
   * @param params
   */
  static sendEvent(params: any): void
}

/**
 * 第三方埋点工具TalkingData,暴露给TrackDataManager调用的，请勿直接调用
 */
declare module TDGA {
  var Account: {
    (accountId: Object): any
    setAccountName(p_value: string): void
    setAccountType(p_value: number): void
    setLevel(p_value: number): void
    setGender(p_value: number): void
    setAge(p_value: number): void
    setGameServer(p_value: string): void
  }

  function onEvent(eventId: string, eventData: any): void
}
