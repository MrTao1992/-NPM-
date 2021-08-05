/**
 * 工具开关
 * 根据Tool.json
 * 显示隐藏模块
 */

import { ConfigMgr } from "zmg_config_mgr";
import { StringUtil } from "zmg_util";


const { ccclass, property } = cc._decorator;

export default class ToolSwitch extends cc.Component {

    @property({ tooltip: "工具模块名/Tool.json" })
    toolName: string = "";

    public isClose(): boolean {
        if (StringUtil.isValid(this.toolName)) {
            return ConfigMgr.tool.isClose(this.toolName);
        }
        return false;
    }
    // onEnable () {}

    // onDisable () {}

    // start () {},

    // update (dt) {}

}
