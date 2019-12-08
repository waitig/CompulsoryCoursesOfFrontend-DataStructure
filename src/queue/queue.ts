'use strict'
/**
 在计算机科学中, 一个 队列(queue) 是一种特殊类型的抽象数据类型或集合。集合中的实体按顺序保存。

 队列基本操作有两种: 向队列的后端位置添加实体，称为入队，并从队列的前端位置移除实体，称为出队。

 队列中元素遵循先进先出 FIFO (first in, first out)原则

 本实例利用链表来实现队列
 **/
import LinkedList from "../linked-list/linked-list";
import LinkedListNode from "../linked-list/linked-list-node"
export default class Queue<T> {
    private linkedList: LinkedList<T> = null;
    constructor() {
        this.linkedList = new LinkedList<T>();
    }

    /**
     * 判断队列是否为空
     */
    isEmpty(): boolean {
        return !this.linkedList.head;
    }

    /**
     * 获取队列中的第一个元素
     */
    peek(): T{
        if(!this.linkedList.head) {
            return null
        }
        return this.linkedList.head.value
    }

    /**
     * 入队列
     * @param value
     */
    enqueue(value: T): void {
        this.linkedList.append(value)
    }

    /**
     * 出队列，先进先出
     */
    dequeue(): T {
        const removedNode: LinkedListNode<T> = this.linkedList.deleteHead();
        return removedNode ? removedNode.value : null;
    }

    /**
     * toString 方法
     * @param callback
     */
    toString(callback: Function): string {
        return this.linkedList.toString(callback);
    }
}


