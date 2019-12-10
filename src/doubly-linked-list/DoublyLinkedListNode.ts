'use strict'
/**
 * 双向链表的结点定义
 */
export default class DoublyLinkedListNode<T> {
    public value: T;
    public next: T;
    public previous: T;
    constructor(value, next = null, previous = null) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }

    toString(callback: Function) {
        return callback ? callback(this.value) : `${this.value}`;
    }
}