export class $RecordUtil {
    static isValid(record: Record<string, any> | Record<string, any>[]): boolean {
        if (record instanceof Array) {
            let i: number;
            let len: number = record.length;
            for (i = 0; i < len; i++) {
                if (this.getLength(record[i]) == 0) {
                    return false;
                }
            }
            return true;
        } else {
            return this.getLength(record) != 0;
        }
    }
    static getLength(record: Record<string, any>): number {
        if (record) {
            let count: number = 0;
            for (const key in record) {
                if (Object.prototype.hasOwnProperty.call(record, key)) {
                    count++;
                }
            }
            return count;
        }
        return 0;
    }
}