'use strict'
/*
定义链表的结点
 */
export default class LinkedListNode<T> {
    public readonly value: T;
    public next: LinkedListNode<T>;

    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }

    /**
     * 转化为String方法，支持传入自定义方法
     * @param callback
     */
    toString(callback: Function): string {
        return callback ? callback(this.value) : `${this.value}`
    }
}
