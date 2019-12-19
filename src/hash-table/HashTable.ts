'use strict'
/*
在计算中, 一个 哈希表(hash table 或hash map) 是一种实现 关联数组(associative array) 的抽象数据类型,
该结构可以将 键映射到值。
哈希表使用 哈希函数/散列函数 来计算一个值在数组或桶(buckets)中或槽(slots)中对应的索引,可使用该索引找到所需的值。
理想情况下,散列函数将为每个键分配给一个唯一的桶(bucket),但是大多数哈希表设计采用不完美的散列函数,这可能会导致"哈希冲突(hash collisions)",
也就是散列函数为多个键(key)生成了相同的索引,这种碰撞必须 以某种方式进行处理。
 */
import LinkedList from "../linked-list/LinkedList";

export default class HashTable<T> {
    private buckets: Array<T> = null;
    private keys = {}
    constructor(hashTableSize = 32) {
        // Create hash table of certain size and fill each bucket with empty linked list.
        this.buckets = new Array<T>(hashTableSize).fill(null).map(() => new LinkedList());
        // Just to keep track of all actual keys in a fast way.
        this.keys = {};
    }
}
