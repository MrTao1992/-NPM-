export class ConditionConfig implements zmg.IConditionConfig {
    disName: string;
    /**
    * 约束ID
    */
    id: string;
    /**
     * 约束名称
     */
    name: string;
    /**
     * 约束使用cls
     */
    clsName: string;
    /**
     * 约束参数
     */
    param: object;
}