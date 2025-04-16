export interface HeapOptions<T> {
  type?: "min" | "max",
  compare?: (a: T, b: T) => number,
}
/**
 * Heap implementation in TypeScript
 * A heap is a complete binary tree where the value of each node is less than or equal to the values of its children.
 */
export class Heap<T> {
  private type: "min" | "max";
  private heap: T[];
  private compare: (a: T, b: T) => number;

  /**
   * Constructor for Heap
   * @param compare Optional comparison function. If not provided, defaults to standard comparison.
   */
  constructor(options: HeapOptions<T> = {}) {
    const {
      type = "min",
      compare = (a: T, b: T) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
      },
    } = options;
    this.heap = [];
    this.type = type;
    this.compare = compare;
  }

  /**
   * Get the size of the heap
   * @returns The number of elements in the heap
   */
  size(): number {
    return this.heap.length;
  }

  /**
   * Check if the heap is empty
   * @returns True if the heap is empty, false otherwise
   */
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  /**
   * Get the minimum value in the heap without removing it
   * @returns The minimum value in the heap or undefined if the heap is empty
   */
  peek(): T | undefined {
    return this.heap[0];
  }

  /**
   * Insert a value into the heap
   * @param value The value to insert
   */
  insert(value: T): void {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  /**
   * Extract the root value from the heap
   * @returns The root value in the heap or undefined if the heap is empty
   */
  extract(): T | undefined {
    return this.heap.shift();
  }

  private shouldSwap(i: number, j: number): boolean {
    const a = this.heap[i];
    const b = this.heap[j];
    if (this.type === "min") {
      return this.compare(a, b) < 0;
    } else {
      return this.compare(a, b) > 0;
    }
  }

  /**
   * Get the parent index of a node
   * @param index The index of the node
   * @returns The index of the parent node
   */
  private getParentIndex(index: number): number {
    return Math.floor(index - 1 / 2);
  }

  /**
   * Swap two elements in the heap
   * @param i The index of the first element
   * @param j The index of the second element
   */
  private swap(i: number, j: number): void {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
  
  private hasParent(index: number): boolean {
    return this.getParentIndex(index) > -1;
  }

  /**
   * Bubble up a node to maintain the heap property
   * @param index The index of the node to bubble up
   */
  private bubbleUp(index: number): void {
    if (!this.hasParent(index)) {
      return;
    }
    const parentIdx = this.getParentIndex(index);
    if (this.shouldSwap(index, parentIdx)) {
      this.swap(index, parentIdx);
      this.bubbleUp(parentIdx);
    }
  }

}
