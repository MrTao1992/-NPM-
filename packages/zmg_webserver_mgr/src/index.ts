import { _ServerMgr } from "./ServerMgr";
import { $ServerEvent } from "./ServerEvent";
import { $ServerListener } from "./ServerListener";
import { $zmgCommands } from "./zmgCommands";
import { $EServerMethod, $ServerItem } from "./ServerItem";

export * from "./interfaces";

export let ServerMgr = _ServerMgr.getInstance();
export class ServerEvent extends $ServerEvent { };
export class ServerListener extends $ServerListener { };
export class ServerItem extends $ServerItem { };
export let zmgCommands = $zmgCommands;
export let EServerMethod = $EServerMethod;