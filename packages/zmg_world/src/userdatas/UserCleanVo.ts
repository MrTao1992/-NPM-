import { gLog } from "zmg_util"
import { _UserEventName } from "./UserEventName";

export class UserClearVo extends cc.EventTarget {
    public CLEAN_CHANGE: string = 'cleanChange';
    private _cleanRoomInfo: WebServerVo.ICleanRoomInfo[];
    public setData(res: WebServerVo.IGetPartnerInfo): void {
        this._cleanRoomInfo = [];
        if (res.cleanRoomInfo) {
            res.cleanRoomInfo.forEach((element) => {
                this.setRoomCleanLinessByFloorId(element);
            });
        }
    }
    /**
        * 根据房间楼层号设置楼层垃圾信息
        */
    public setRoomCleanLinessByFloorId(
        info: WebServerVo.ICleanRoomInfo
    ): WebServerVo.ICleanRoomInfo {
        if (!this._cleanRoomInfo) {
            this._cleanRoomInfo = this._cleanRoomInfo || []
            this._cleanRoomInfo.push(info)
            return info
        } else {
            for (let i = 0; i < this._cleanRoomInfo.length; i++) {
                if (this._cleanRoomInfo[i].index == info.index) {
                    this._cleanRoomInfo[i].cleanValue = info.cleanValue
                    this._cleanRoomInfo[i].isToClean = info.isToClean
                    return info
                }
            }
            this._cleanRoomInfo = this._cleanRoomInfo || []
            this._cleanRoomInfo.push(info)
            return info
        }
    }

    /**
     * 根据房间楼层号获取楼层垃圾信息
     */
    public getRoomCleanLinessByFloorId(id: number): WebServerVo.ICleanRoomInfo {
        if (!this._cleanRoomInfo) {
            if (id < 0) gLog('检索楼层id有误')
            let m = {
                cleanValue: 0,
                index: id,
                isToClean: true,
            }
            this._cleanRoomInfo = this._cleanRoomInfo || []
            this._cleanRoomInfo.push(m)
            return m
        } else {
            for (let i = 0; i < this._cleanRoomInfo.length; i++) {
                if (this._cleanRoomInfo[i].index == id) {
                    return this._cleanRoomInfo[i]
                }
            }
            if (id < 0) gLog('检索楼层id有误')
            let m = {
                cleanValue: 0,
                index: id,
                isToClean: true,
            }
            this._cleanRoomInfo = this._cleanRoomInfo || []
            this._cleanRoomInfo.push(m)
            return m
        }
    }

    /**
     *  根据房间楼层号设置楼层清洁值
     */
    public setRoomCleanValueByFloorId(
        id: number,
        Value: number
    ): WebServerVo.ICleanRoomInfo {
        if (!this._cleanRoomInfo) {
            if (id < 0) gLog('检索楼层id有误')
            let m = {
                cleanValue: Value,
                index: id,
                isToClean: Value > 30 ? false : true,
            }
            this._cleanRoomInfo = this._cleanRoomInfo || []
            this._cleanRoomInfo.push(m)
            this.emit(_UserEventName.CLEAN_CHANGE);
            return m
        } else {
            for (let i = 0; i < this._cleanRoomInfo.length; i++) {
                if (this._cleanRoomInfo[i].index == id) {
                    this._cleanRoomInfo[i].cleanValue = Value
                    this.setRoomIsToCleanByFloorId(id, Value > 30 ? false : true)
                    this.emit(_UserEventName.CLEAN_CHANGE);
                    return this._cleanRoomInfo[i]
                }
            }

            if (id < 0) gLog('检索楼层id有误')
            let m = {
                cleanValue: Value,
                index: id,
                isToClean: Value > 30 ? false : true,
            }
            this._cleanRoomInfo = this._cleanRoomInfo || []
            this._cleanRoomInfo.push(m)
            this.emit(_UserEventName.CLEAN_CHANGE);
            return m
        }
    }

    /**
     *  根据房间楼层号设置楼层清洁值
     */
    public setRoomIsToCleanByFloorId(
        id: number,
        Value: boolean
    ): WebServerVo.ICleanRoomInfo {
        if (!this._cleanRoomInfo) {
            if (id < 0) gLog('检索楼层id有误')
            let m = {
                cleanValue: Value ? 0 : 100,
                index: id,
                isToClean: Value,
            }
            this._cleanRoomInfo = this._cleanRoomInfo || []
            this._cleanRoomInfo.push(m)
            return m
        } else {
            for (let i = 0; i < this._cleanRoomInfo.length; i++) {
                if (this._cleanRoomInfo[i].index == id) {
                    this._cleanRoomInfo[i].isToClean = Value
                    return this._cleanRoomInfo[i]
                }
            }
            if (id < 0) gLog('检索楼层id有误')
            let m = {
                cleanValue: Value ? 0 : 100,
                index: id,
                isToClean: Value,
            }
            this._cleanRoomInfo = this._cleanRoomInfo || []
            this._cleanRoomInfo.push(m)
            return m
        }
    }

    /**
     *  根据房间楼层号获取楼层清洁值
     */
    public getRoomCleanValueByFloorId(id: number): number {
        if (!this._cleanRoomInfo) {
            if (id < 0) gLog('检索楼层id有误')
            let m = {
                cleanValue: 0,
                index: id,
                isToClean: true,
            }
            this._cleanRoomInfo = this._cleanRoomInfo || []
            this._cleanRoomInfo.push(m)
            return m.cleanValue
        } else {
            for (let i = 0; i < this._cleanRoomInfo.length; i++) {
                if (this._cleanRoomInfo[i].index == id) {
                    return this._cleanRoomInfo[i].cleanValue
                }
            }
            if (id < 0) gLog('检索楼层id有误')
            let m = {
                cleanValue: 0,
                index: id,
                isToClean: true,
            }
            this._cleanRoomInfo = this._cleanRoomInfo || []
            this._cleanRoomInfo.push(m)
            return m.cleanValue
        }
    }

    /**
     *  根据房间楼层号获取楼层是否需要清洁
     */
    public getRoomIsToCleanByFloorId(id: number): boolean {
        if (!this._cleanRoomInfo) {
            if (id < 0) gLog('检索楼层id有误')
            let m = {
                cleanValue: 0,
                index: id,
                isToClean: true,
            }
            this._cleanRoomInfo = this._cleanRoomInfo || []
            this._cleanRoomInfo.push(m)
            return m.isToClean
        } else {
            for (let i = 0; i < this._cleanRoomInfo.length; i++) {
                if (this._cleanRoomInfo[i].index == id) {
                    return this._cleanRoomInfo[i].cleanValue < 100 ? true : false
                }
            }
            if (id < 0) gLog('检索楼层id有误')
            let m = {
                cleanValue: 0,
                index: id,
                isToClean: true,
            }
            this._cleanRoomInfo = this._cleanRoomInfo || []
            this._cleanRoomInfo.push(m)
            return m.isToClean
        }
    }
    public sortFun(aa: WebServerVo.ICleanRoomInfo, bb: WebServerVo.ICleanRoomInfo) {
        return aa.index - bb.index
    }
    /**
     *  根据房间楼层号获取楼层是否需要清洁
     */
    public getRoomIsToClean(): number {
        if (!this._cleanRoomInfo) {
            return 1
        }
        this._cleanRoomInfo.sort(this.sortFun)
        let i = 0
        for (let j = 0, len = this._cleanRoomInfo.length; j < len; j++) {
            i++;
            if (this._cleanRoomInfo[j].index != i) {
                return i
            }
            if (this._cleanRoomInfo[j].cleanValue < 100 ? true : false) {
                return i
            }
        }
        if (i == 4) {//暂时定为4层
            return 0;
        }
        else {
            i++;
            return i;
        }
        return 0
    }

    /**
     * 获取垃圾数目
     */
    public getRubbishsByFloorId(id: number, rubbishTotal: number): number {
        let roomClean = this.getRoomCleanLinessByFloorId(id);
        if (roomClean.cleanValue < 100 ? true : false) {
            let num = Math.ceil((1 - roomClean.cleanValue / 100) * rubbishTotal);
            return num;
        } else {
            return 0;
        }
    }
}