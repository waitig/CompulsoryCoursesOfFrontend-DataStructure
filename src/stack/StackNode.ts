'use strict'
/*
定义栈中的结点
 */
export default class StackNode<T> {
    public value: T;
    public next: StackNode<T>;
    constructor(value: T,next: StackNode<T> = null) {
        this.value = value;
        this.next = next;
    }

    public toString(callback: Function): string {
        return callback ? callback(this.value) : `${this.value}`
    }
}

