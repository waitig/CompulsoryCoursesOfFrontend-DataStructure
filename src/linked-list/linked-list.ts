'use strict';
// 用javascript实现链表，并实现一些常用的操作
// 在计算机科学中, 一个 链表 是数据元素的线性集合, 元素的线性顺序不是由它们在内存中的物理位置给出的。
// 相反, 每个元素指向下一个元素。它是由一组节点组成的数据结构,这些节点一起,表示序列。
//
// 在最简单的形式下，每个节点由数据和到序列中下一个节点的引用(换句话说，链接)组成。
// 这种结构允许在迭代期间有效地从序列中的任何位置插入或删除元素。
//
// 更复杂的变体添加额外的链接，允许有效地插入或删除任意元素引用。
// 链表的一个缺点是访问时间是线性的(而且难以管道化)。
//
// 更快的访问，如随机访问，是不可行的。与链表相比，数组具有更好的缓存位置.

import Comparator from "../utils/Comparator";
import LinkedListNode from "./linked-list-node";
/**
 * 单向链表
 */
export default class LinkedList<T> {
    public head: LinkedListNode<T>;
    public tail: LinkedListNode<T>;
    private readonly compare: Comparator;

    constructor(compareFunction?: Function) {
        this.head = null;
        this.tail = null;
        this.compare = new Comparator(compareFunction);
    }

    /**
     * 将数据添加到链表的头部
     * @param value
     */
    public prepend(value: T): LinkedList<T> {
        const newNode: LinkedListNode<T> = new LinkedListNode(value, this.head);
        // 原链表的头结节指向新结节
        this.head = newNode;
        // 如果原链表的尾结节为空，则将其指向新结节
        if (!this.tail) {
            this.tail = newNode
        }
        return this;
    }

    /**
     * 将数据添加到链表的尾部
     * @param value
     */
    public append(value: T): LinkedList<T> {
        const newNode: LinkedListNode<T> = new LinkedListNode(value, this.head);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode;
            this.tail = newNode;
        }
        return this
    }

    /**
     * 删除指定value的元素
     * @param value
     */
    public delete(value: T): Array<LinkedListNode<T>> {
        // 头结点为空，则直接返回null
        if (!this.head) {
            return null;
        }
        // 已删除的结点列表
        const deleteNodeList: Array<LinkedListNode<T>> = new Array<LinkedListNode<T>>();
        // 从头开始处理
        let currentNode: LinkedListNode<T> = this.head
        // 如果头结点等于需删除的结点
        // 判断头部
        if (this.compare.equal(currentNode.value, value)) {
            if (this.head === this.tail) {
                this.head = null;
                this.tail = null;
            } else {
                deleteNodeList.push(this.head)
                this.head = this.head.next;
            }
        }

        // 按照顺序向后寻找
        // 判断中部
        while (currentNode.next) {
            // 如果找到待删除的元素，则令其next指向next的next
            if (this.compare.equal(currentNode.next.value, value)) {
                deleteNodeList.push(currentNode.next)
                currentNode.next = currentNode.next.next
            } else {
                // 继续向下找
                currentNode = currentNode.next
            }
        }
        // 如果尾巴是待删除元素，则将尾部指向currentNode，因为此时currentNode为尾结点的上一个结点
        // 判断尾
        if(this.compare.equal(this.tail.value,value)) {
            deleteNodeList.push(this.tail)
            this.tail = currentNode
        }
        return deleteNodeList
    }

    /**
     * 从链表中查找某元素，并将其返回
     * @param value
     * @param callback
     */
    public find(value: T,callback?: Function): LinkedListNode<T> {
        if(value === null || value === undefined) {
            return null
        }
        let currentNode: LinkedListNode<T> = this.head
        while(currentNode) {
            if(callback !== undefined) {
                if(callback(currentNode.value,value)) {
                    return currentNode
                }
            } else {
                if(this.compare.equal(currentNode.value,value)) {
                    return currentNode
                }
            }
            currentNode = currentNode.next
        }
        return null
    }

    /**
     * 删除尾结点
     */
    deleteTail(): LinkedListNode<T> {
        const deletedNode: LinkedListNode<T> = this.tail;
        if(this.head === null || this.tail === null) {
            return null
        }
        if(this.head === this.tail) {
            return deletedNode
        }
        // 将尾结点的上一个结点做为尾结点
        let currentNode: LinkedListNode<T> = this.head
        while(currentNode.next) {
            if(currentNode.next === this.tail || currentNode.next.next === null) {
                currentNode.next = null
                this.tail = currentNode
            } else {
                currentNode = currentNode.next
            }
        }
        return deletedNode;
    }

    /**
     * 删除链表的头结点
     */
    deleteHead(): LinkedListNode<T> {
        if(this.head === null) {
            return null
        }
        const deleteNode: LinkedListNode<T> = this.head
        if(this.head === this.tail) {
            return deleteNode
        }
        if(this.head.next){
            this.head = this.head.next
        }
        return deleteNode
    }

    /**
     * 将数组中的值加入链表
     * @param valueArray
     */
    fromArray(valueArray: Array<T>): LinkedList<T> {
        if(valueArray) {
            valueArray.forEach(item => this.append(item))
        }
        return this
    }

    /**
     * 将链表转化为数组
     */
    toArray(): Array<LinkedListNode<T>> {
        const nodeArray: Array<LinkedListNode<T>> = new Array<LinkedListNode<T>>();
        let currentNode: LinkedListNode<T> = this.head
        while(currentNode) {
            nodeArray.push(currentNode)
            currentNode = currentNode.next
        }
        return nodeArray
    }

    /**
     * 将链表转化为字符串
     * @param callback
     */
    toString(callback: Function): string {
        return this.toArray().map(item => item.toString(callback)).toString()
    }

    /**
     * 将链表转置
     * 主要思路：
     * 1、用currentNode记录当前正在处理的结点，prevNode记录上一个结点，nextNode记录下一个结点
     * 2、nextNode应该等于currentNode的next，用来供currentNode进入下次循环时使用
     * 3、currentNode的next指向 prevNode 【重要】
     * 4、prevNode指向currentNode,供下次循环使用，做为下次循环中的上个结点【重要】
     * 5、currentNode指向nextNode，进入下次循环
     */
    reverse(): LinkedList<T> {
        if(this.head === null){
            return null
        }
        let currentNode: LinkedListNode<T> = this.head;
        let prevNode: LinkedListNode<T> = null;
        let nextNode: LinkedListNode<T> = null;
        while(currentNode) {
            nextNode = currentNode.next;

            currentNode.next = prevNode;  // 当前结点的next 指向上个结点
            prevNode = currentNode;    // prevNode更新为当前结点，供下次循环使用

            currentNode = nextNode
        }
        this.tail = this.head;
        this.head = prevNode;
        return this
    }
}
