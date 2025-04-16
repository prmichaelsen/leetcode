import { MinHeap } from './MinHeap';

describe('MinHeap', () => {
  describe('Basic functionality', () => {
    test('should create an empty heap', () => {
      const heap = new MinHeap<number>();
      expect(heap.size()).toBe(0);
      expect(heap.isEmpty()).toBe(true);
    });

    test('should report correct size after insertions', () => {
      const heap = new MinHeap<number>();
      heap.insert(5);
      expect(heap.size()).toBe(1);
      heap.insert(3);
      expect(heap.size()).toBe(2);
      heap.insert(7);
      expect(heap.size()).toBe(3);
    });

    test('should report correct isEmpty status', () => {
      const heap = new MinHeap<number>();
      expect(heap.isEmpty()).toBe(true);
      heap.insert(5);
      expect(heap.isEmpty()).toBe(false);
    });
  });

  describe('Insertion and peek operations', () => {
    test('should maintain min-heap property after insertions', () => {
      const heap = new MinHeap<number>();
      heap.insert(5);
      expect(heap.peek()).toBe(5);
      
      heap.insert(3);
      expect(heap.peek()).toBe(3);
      
      heap.insert(7);
      expect(heap.peek()).toBe(3);
      
      heap.insert(1);
      expect(heap.peek()).toBe(1);
    });

    test('should handle duplicate values', () => {
      const heap = new MinHeap<number>();
      heap.insert(5);
      heap.insert(5);
      heap.insert(5);
      
      expect(heap.size()).toBe(3);
      expect(heap.peek()).toBe(5);
    });
  });

  describe('Extract min operation', () => {
    test('should extract elements in ascending order', () => {
      const heap = new MinHeap<number>();
      const values = [5, 3, 8, 1, 2, 7, 6, 4];
      
      // Insert all values
      values.forEach(value => heap.insert(value));
      
      // Extract and verify they come out in ascending order
      const sortedValues = [...values].sort((a, b) => a - b);
      sortedValues.forEach(expected => {
        expect(heap.extractMin()).toBe(expected);
      });
      
      // Heap should be empty after extracting all elements
      expect(heap.isEmpty()).toBe(true);
    });

    test('should return undefined when extracting from empty heap', () => {
      const heap = new MinHeap<number>();
      expect(heap.extractMin()).toBeUndefined();
    });

    test('should handle extract after insert and extract operations', () => {
      const heap = new MinHeap<number>();
      
      heap.insert(5);
      heap.insert(3);
      expect(heap.extractMin()).toBe(3);
      
      heap.insert(1);
      expect(heap.extractMin()).toBe(1);
      expect(heap.extractMin()).toBe(5);
      expect(heap.extractMin()).toBeUndefined();
    });
  });

  describe('Custom comparison function', () => {
    test('should use custom comparison function for numbers', () => {
      // Max heap using custom comparison
      const maxHeap = new MinHeap<number>((a, b) => b - a);
      
      maxHeap.insert(5);
      maxHeap.insert(3);
      maxHeap.insert(8);
      maxHeap.insert(1);
      
      expect(maxHeap.peek()).toBe(8);
      expect(maxHeap.extractMin()).toBe(8);
      expect(maxHeap.extractMin()).toBe(5);
      expect(maxHeap.extractMin()).toBe(3);
      expect(maxHeap.extractMin()).toBe(1);
    });

    test('should work with objects using custom comparison', () => {
      interface Person {
        name: string;
        age: number;
      }
      
      // Min heap by age
      const heap = new MinHeap<Person>((a, b) => a.age - b.age);
      
      heap.insert({ name: 'Alice', age: 30 });
      heap.insert({ name: 'Bob', age: 25 });
      heap.insert({ name: 'Charlie', age: 35 });
      heap.insert({ name: 'David', age: 20 });
      
      const youngest = heap.extractMin();
      expect(youngest?.name).toBe('David');
      expect(youngest?.age).toBe(20);
      
      const secondYoungest = heap.extractMin();
      expect(secondYoungest?.name).toBe('Bob');
      expect(secondYoungest?.age).toBe(25);
    });
  });

  describe('Different data types', () => {
    test('should work with strings', () => {
      const heap = new MinHeap<string>();
      
      heap.insert('banana');
      heap.insert('apple');
      heap.insert('cherry');
      heap.insert('date');
      
      expect(heap.extractMin()).toBe('apple');
      expect(heap.extractMin()).toBe('banana');
      expect(heap.extractMin()).toBe('cherry');
      expect(heap.extractMin()).toBe('date');
    });

    test('should work with mixed numeric types', () => {
      const heap = new MinHeap<number>();
      
      heap.insert(5.5);
      heap.insert(3);
      heap.insert(-1);
      heap.insert(0);
      
      expect(heap.extractMin()).toBe(-1);
      expect(heap.extractMin()).toBe(0);
      expect(heap.extractMin()).toBe(3);
      expect(heap.extractMin()).toBe(5.5);
    });
  });

  describe('Edge cases', () => {
    test('should handle a large number of elements', () => {
      const heap = new MinHeap<number>();
      const count = 1000;
      
      // Insert elements in reverse order
      for (let i = count; i > 0; i--) {
        heap.insert(i);
      }
      
      expect(heap.size()).toBe(count);
      
      // Extract and verify they come out in ascending order
      for (let i = 1; i <= count; i++) {
        expect(heap.extractMin()).toBe(i);
      }
      
      expect(heap.isEmpty()).toBe(true);
    });

    test('should handle peek on empty heap', () => {
      const heap = new MinHeap<number>();
      expect(heap.peek()).toBeUndefined();
    });

    test('should handle insert after extract operations', () => {
      const heap = new MinHeap<number>();
      
      heap.insert(5);
      heap.insert(3);
      expect(heap.extractMin()).toBe(3);
      
      heap.insert(1);
      heap.insert(4);
      expect(heap.extractMin()).toBe(1);
      expect(heap.extractMin()).toBe(4);
      expect(heap.extractMin()).toBe(5);
    });
  });
});
