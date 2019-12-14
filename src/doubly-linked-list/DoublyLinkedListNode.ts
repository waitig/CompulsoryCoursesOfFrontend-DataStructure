'use strict'
/**
 * 双向链表的结点定义
 */
export default class DoublyLinkedListNode<T> {
    public value: T;
    public next: DoublyLinkedListNode<T>;
    public previous: DoublyLinkedListNode<T>;
    constructor(value: T, next: DoublyLinkedListNode<T> = null, previous: DoublyLinkedListNode<T> = null) {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }

    toString(callback: Function): string {
        return callback ? callback(this.value) : `${this.value}`;
    }
}
