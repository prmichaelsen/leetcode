/**
 * MinHeap implementation in TypeScript
 * A min heap is a complete binary tree where the value of each node is less than or equal to the values of its children.
 */
export class MinHeap<T> {
  private heap: T[];
  private compare: (a: T, b: T) => number;

  /**
   * Constructor for MinHeap
   * @param compare Optional comparison function. If not provided, defaults to standard comparison.
   */
  constructor(compare?: (a: T, b: T) => number) {
    this.heap = [];
    this.compare = compare || ((a: T, b: T) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
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
    return this.heap.length > 0 ? this.heap[0] : undefined;
  }

  /**
   * Insert a value into the heap
   * @param value The value to insert
   */
  insert(value: T): void {
    // TODO: Implement insertion logic
  }

  /**
   * Extract the minimum value from the heap
   * @returns The minimum value in the heap or undefined if the heap is empty
   */
  extractMin(): T | undefined {
    // TODO: Implement extraction logic
    return undefined;
  }

  /**
   * Get the parent index of a node
   * @param index The index of the node
   * @returns The index of the parent node
   */
  private getParentIndex(index: number): number {
  }

  /**
   * Get the left child index of a node
   * @param index The index of the node
   * @returns The index of the left child node
   */
  private getLeftChildIndex(index: number): number {
  }

  /**
   * Get the right child index of a node
   * @param index The index of the node
   * @returns The index of the right child node
   */
  private getRightChildIndex(index: number): number {
  }

  /**
   * Swap two elements in the heap
   * @param i The index of the first element
   * @param j The index of the second element
   */
  private swap(i: number, j: number): void {
    // TODO: Implement swap logic
  }

  /**
   * Bubble up a node to maintain the heap property
   * @param index The index of the node to bubble up
   */
  private bubbleUp(index: number): void {
    // TODO: Implement bubble up logic
  }

  /**
   * Bubble down a node to maintain the heap property
   * @param index The index of the node to bubble down
   */
  private bubbleDown(index: number): void {
    // TODO: Implement bubble down logic
  }
}
