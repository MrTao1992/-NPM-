import { LocalDataBase } from "./LocalDataBase";

// import {} from "zmg_ser"
declare global {
    namespace zmg {
        interface IDataBase {
            readonly isValid;
            getItem(key: string): Promise<any>;
            setItem(key: string, value: any): void;
            removeItem(key: string): void;
            clear(): void;
        }
        interface IDataMgr {
            readonly living: zmg.IDataBase;
            readonly local: zmg.IDataBase;
            readonly server: zmg.IDataBase;
        }
    }
}
export { }