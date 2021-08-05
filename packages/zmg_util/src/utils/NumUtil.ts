export class $NumUtil {
    static getValid(num: number): number {
        if (isNaN(num)) {
            return 0;
        }
        return num;
    }
}