// Implementation of an LRU Cache in TypeScript
// This cache evicts the least recently used item when it exceeds its capacity.

type NodeType<K, V> = {
  key: K;
  value: V;
  prev?: NodeType<K, V>;
  next?: NodeType<K, V>;
};

export class LRUCache<K, V> {
  private capacity: number;
  private cache = new Map<K, NodeType<K, V>>();
  private head: NodeType<K, V>;
  private tail: NodeType<K, V>;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.head = { key: null as any, value: null as any };
    this.tail = { key: null as any, value: null as any };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  private remove(node: NodeType<K, V>) {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  private insert(node: NodeType<K, V>) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!;
      this.remove(node);
      this.insert(node);
      return node.value;
    }
    return undefined;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.remove(this.cache.get(key)!);
    }
    const newNode: NodeType<K, V> = { key, value };
    this.insert(newNode);
    this.cache.set(key, newNode);

    if (this.cache.size > this.capacity) {
      const lru = this.tail.prev!;
      this.remove(lru);
      this.cache.delete(lru.key);
    }
  }
}

// Create an instance of LRUCache with a capacity of 5

export const lruCacheInstance = new LRUCache<string, any>(5);