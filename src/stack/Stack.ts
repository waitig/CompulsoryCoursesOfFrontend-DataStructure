'use strict'
/*
在计算机科学中, 一个 栈(stack) 是一种抽象数据类型,用作表示元素的集合.
具有两种主要操作:
push, 添加元素到栈的顶端(末尾);
pop, 移除栈最顶端(末尾)的元素.
以上两种操作可以简单概括为“后进先出(LIFO = last in, first out)”。
此外,应有一个 peek 操作用于访问栈当前顶端(末尾)的元素。
"栈"这个名称,可类比于一组物体的堆叠(一摞书,一摞盘子之类的)。
 */
import StackNode from "./StackNode";

export default class Stack<T> {
    public head: StackNode<T>;
    public length: number;
    constructor() {
        this.head = null;
        this.length = 0;
    }

    /**
     * 入栈
     * @param value
     */
    public push(value: T): Stack<T> {
        this.head = new StackNode(value, this.head);
        this.length += 1;
        return this;
    }

    /**
     * 出栈
     */
    public pop(): T {
        if(!this.head) {
            return null;
        }
        const headNode = this.head;
        this.head = this.head.next;
        this.length -= 1;
        return headNode.value;
    }

    /**
     * 获取栈顶元素
     */
    public peek(): T {
        if(!this.head) {
            return null;
        }
        return this.head.value;
    }

    /**
     * 是否为空
     */
    public isEmpty(): boolean {
        return !this.head || this.length === 0;
    }

    /**
     * 转化为Array
     */
    public toArray(): Array<StackNode<T>> {
        const valueArray: Array<StackNode<T>> = [];
        let currentNode = this.head;
        while(currentNode) {
            valueArray.push(currentNode);
            currentNode = currentNode.next;
        }
        return valueArray;
    }

    /**
     * toString 方法
     * @param callback
     */
    public toString(callback: Function): string {
        return this.toArray().map(item => item.toString(callback)).toString();
    }

}
