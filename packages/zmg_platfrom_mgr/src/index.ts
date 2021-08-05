import { _PlatfromMgr } from "./PlatfromMgr";

export * from "./interfaces";
export * from "./BaseCommand";
export * from "./WebIos";
export * from "./WebPost";
export * from "./WebAndroid";
export let PlatfromMgr = _PlatfromMgr.getInstance();