'use strict'
/**
 控制比较的类
 **/
export default class Comparator {
    private readonly compare: Function = null;
    constructor(compareFunction: Function) {
        this.compare = compareFunction || Comparator.defaultCompareFunction;
    }

    /**
     * 默认的比较方法
     * @param a
     * @param b
     */
    static defaultCompareFunction(a: object,b: object): number {
        if(a===b) {
            return 0;
        }
        return a < b ? -1 : 1;
    }

    /**
     * 判断相等的函数
     * @param a
     * @param b
     */
    public equal(a, b): boolean {
        return this.compare(a,b) === 0;
    }
}
