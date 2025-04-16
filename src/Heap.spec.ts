import { Heap } from './Heap';

describe('Heap', () => {
  describe('Basic functionality', () => {
    test('should create an empty heap', () => {
      const heap = new Heap<number>();
      expect(heap.size()).toBe(0);
      expect(heap.isEmpty()).toBe(true);
    });

    test('should report correct size after insertions', () => {
      const heap = new Heap<number>();
      heap.insert(5);
      expect(heap.size()).toBe(1);
      heap.insert(3);
      expect(heap.size()).toBe(2);
      heap.insert(7);
      expect(heap.size()).toBe(3);
    });

    test('should report correct isEmpty status', () => {
      const heap = new Heap<number>();
      expect(heap.isEmpty()).toBe(true);
      heap.insert(5);
      expect(heap.isEmpty()).toBe(false);
    });
  });

  describe('Insertion and peek operations', () => {
    test('should maintain min-heap property after insertions', () => {
      const heap = new Heap<number>();
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
      const heap = new Heap<number>();
      heap.insert(5);
      heap.insert(5);
      heap.insert(5);
      
      expect(heap.size()).toBe(3);
      expect(heap.peek()).toBe(5);
    });
  });

  describe('Extract min operation', () => {
    test('should extract elements in ascending order', () => {
      const heap = new Heap<number>();
      const values = [5, 3, 8, 1, 2, 7, 6, 4];
      
      // Insert all values
      values.forEach(value => heap.insert(value));
      
      // Extract and verify they come out in ascending order
      const sortedValues = [...values].sort((a, b) => a - b);
      sortedValues.forEach(expected => {
        expect(heap.extract()).toBe(expected);
      });
      
      // Heap should be empty after extracting all elements
      expect(heap.isEmpty()).toBe(true);
    });

    test('should return undefined when extracting from empty heap', () => {
      const heap = new Heap<number>();
      expect(heap.extract()).toBeUndefined();
    });

    test('should handle extract after insert and extract operations', () => {
      const heap = new Heap<number>();
      
      heap.insert(5);
      heap.insert(3);
      expect(heap.extract()).toBe(3);
      
      heap.insert(1);
      expect(heap.extract()).toBe(1);
      expect(heap.extract()).toBe(5);
      expect(heap.extract()).toBeUndefined();
    });
  });

  describe('Custom comparison function', () => {
    test('should use custom comparison function for numbers', () => {
      // Max heap using custom comparison
      const maxHeap = new Heap<number>({ type: "max" });
      
      maxHeap.insert(5);
      maxHeap.insert(3);
      maxHeap.insert(8);
      maxHeap.insert(1);
      
      expect(maxHeap.peek()).toBe(8);
      expect(maxHeap.extract()).toBe(8);
      expect(maxHeap.extract()).toBe(5);
      expect(maxHeap.extract()).toBe(3);
      expect(maxHeap.extract()).toBe(1);
    });

    test('should work with objects using custom comparison', () => {
      interface Person {
        name: string;
        age: number;
      }
      
      // Heap by age
      const heap = new Heap<Person>({
        type: "min",
        compare: (a, b) => a.age - b.age,
      });
      
      heap.insert({ name: 'Alice', age: 30 });
      heap.insert({ name: 'Bob', age: 25 });
      heap.insert({ name: 'Charlie', age: 35 });
      heap.insert({ name: 'David', age: 20 });
      
      const youngest = heap.extract();
      expect(youngest?.name).toBe('David');
      expect(youngest?.age).toBe(20);
      
      const secondYoungest = heap.extract();
      expect(secondYoungest?.name).toBe('Bob');
      expect(secondYoungest?.age).toBe(25);
    });
  });

  describe('Different data types', () => {
    test('should work with strings', () => {
      const heap = new Heap<string>();
      
      heap.insert('banana');
      heap.insert('apple');
      heap.insert('cherry');
      heap.insert('date');
      
      expect(heap.extract()).toBe('apple');
      expect(heap.extract()).toBe('banana');
      expect(heap.extract()).toBe('cherry');
      expect(heap.extract()).toBe('date');
    });

    test('should work with mixed numeric types', () => {
      const heap = new Heap<number>();
      
      heap.insert(5.5);
      heap.insert(3);
      heap.insert(-1);
      heap.insert(0);
      
      expect(heap.extract()).toBe(-1);
      expect(heap.extract()).toBe(0);
      expect(heap.extract()).toBe(3);
      expect(heap.extract()).toBe(5.5);
    });
  });

  describe('Edge cases', () => {
    test('should handle a large number of elements', () => {
      const heap = new Heap<number>();
      const count = 1000;
      
      // Insert elements in reverse order
      for (let i = count; i > 0; i--) {
        heap.insert(i);
      }
      
      expect(heap.size()).toBe(count);
      
      // Extract and verify they come out in ascending order
      for (let i = 1; i <= count; i++) {
        expect(heap.extract()).toBe(i);
      }
      
      expect(heap.isEmpty()).toBe(true);
    });

    test('should handle peek on empty heap', () => {
      const heap = new Heap<number>();
      expect(heap.peek()).toBeUndefined();
    });

    test('should handle insert after extract operations', () => {
      const heap = new Heap<number>();
      
      heap.insert(5);
      heap.insert(3);
      expect(heap.extract()).toBe(3);
      
      heap.insert(1);
      heap.insert(4);
      expect(heap.extract()).toBe(1);
      expect(heap.extract()).toBe(4);
      expect(heap.extract()).toBe(5);
    });
  });
});
