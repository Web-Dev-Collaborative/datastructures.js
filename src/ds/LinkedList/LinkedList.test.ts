import LinkedList from './LinkedList';

describe('LinkedList', () => {
  let list: LinkedList<string>;

  const testListIsACopy = (listFactory, getFirstCorrespondingNode) => {
    it('returns a copy of the list', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      const newList = listFactory(list);
      expect(newList).not.toBe(list);
    });

    it(`copies each of the list's internal nodes`, () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      const newList = listFactory(list);

      // I prefer to use public APIs in tests, but it's necessary to access
      // the nodes directly here to make sure they are not reused.
      // Note: This is probably a type error because `head` is private, but
      // intellisense for imported modules is apparently broken in CodeSandbox
      // right now. A "fix" for this is probably casting `list` and `newList`
      // to `any` before accessing `head`.
      for (
        let listNode = getFirstCorrespondingNode(list), newListNode = newList.head;
        listNode && newListNode;
        listNode = listNode.next, newListNode = newListNode.next
      ) {
        expect(listNode).not.toBe(newListNode);
      }
    });
  };

  beforeEach(() => {
    list = new LinkedList();
  });

  describe('length', () => {
    it('has a length of 0 when created', () => {
      expect(list.length).toBe(0);
    });

    it('reports the correct number of elements as new elements are added', () => {
      list.pushBack('one');
      expect(list.length).toBe(1);
      list.pushFront('two');
      expect(list.length).toBe(2);
      list.pushBack('three');
      expect(list.length).toBe(3);
    });
  });

  describe('isEmpty', () => {
    it('is empty when first created', () => {
      expect(list.isEmpty).toBe(true);
    });

    it('is not empty when elements are added', () => {
      list.pushBack('one');
      expect(list.isEmpty).toBe(false);
    });

    it('is empty when all items are removed', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.popFront();
      expect(list.isEmpty).toBe(false);
      list.popFront();
      expect(list.isEmpty).toBe(true);
    });
  });

  describe('toArray', () => {
    it('returns an empty array when called on an empty list', () => {
      expect(list.toArray()).toEqual([]);
    });

    it('returns an array of all emements in the list, in sequence', () => {
      list.pushBack('one');
      expect(list.toArray()).toEqual(['one']);
      list.pushBack('two');
      expect(list.toArray()).toEqual(['one', 'two']);
      list.pushBack('three');
      expect(list.toArray()).toEqual(['one', 'two', 'three']);
    });
  });

  describe('pushFront', () => {
    it('increases the length of the list by 1', () => {
      expect(list.length).toBe(0);
      list.pushFront('one');
      expect(list.length).toBe(1);
    });

    it('adds the element to the list', () => {
      expect(list.contains('one')).toBe(false);
      list.pushFront('one');
      expect(list.contains('one')).toBe(true);
    });

    it('adds the element to the front of the list', () => {
      list.pushFront('one');
      expect(list.first()).toBe('one');
      list.pushFront('two');
      expect(list.first()).toBe('two');
    });

    it('returns the given element', () => {
      const element = list.pushFront('one');
      expect(element).toBe('one');
    });

    it('allows the same element to be added multiple times', () => {
      list.pushFront('one');
      list.pushFront('one');
      expect(list.toArray()).toEqual(['one', 'one']);
    });
  });

  describe('pushBack', () => {
    it('increases the length of the list by 1', () => {
      expect(list.length).toBe(0);
      list.pushBack('one');
      expect(list.length).toBe(1);
    });

    it('adds the element to the list', () => {
      expect(list.contains('one')).toBe(false);
      list.pushBack('one');
      expect(list.contains('one')).toBe(true);
    });

    it('adds the element to the front of the list', () => {
      list.pushBack('one');
      expect(list.last()).toBe('one');
      list.pushBack('two');
      expect(list.last()).toBe('two');
    });

    it('returns the given element', () => {
      const element = list.pushBack('one');
      expect(element).toBe('one');
    });

    it('allows the same element to be added multiple times', () => {
      list.pushBack('one');
      list.pushBack('one');
      expect(list.toArray()).toEqual(['one', 'one']);
    });
  });

  describe('popFront', () => {
    it('removes one element from the list', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      expect(list.length).toBe(3);
      list.popFront();
      expect(list.length).toBe(2);
    });

    it('removes the first element from the list', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      list.popFront();
      expect(list.first()).toBe('two');
    });

    it('returns the removed element', () => {
      list.pushBack('one');
      const value = list.popFront();
      expect(value).toBe('one');
    });

    it('throws when remove is called on an empty list', () => {
      expect(() => list.popFront()).toThrow();
    });
  });

  describe('first', () => {
    it('returns the first element in the list', () => {
      list.pushBack('one');
      expect(list.first()).toBe('one');
      list.pushBack('two');
      expect(list.first()).toBe('one');
      list.popFront();
      expect(list.first()).toBe('two');
    });

    it('throws when first is called on an empty list', () => {
      expect(() => list.first()).toThrow();
    });
  });

  describe('last', () => {
    it('returns the last element in the list', () => {
      list.pushBack('one');
      expect(list.last()).toBe('one');
      list.pushBack('two');
      expect(list.last()).toBe('two');
      list.popFront();
      expect(list.last()).toBe('two');
    });

    it('throws when last is called on an empty list', () => {
      expect(() => list.last()).toThrow();
    });
  });

  describe('rest', () => {
    testListIsACopy(l => l.rest(), l => l.head.next);

    it('returns a list that does not share new elements with the old list', () => {
      list.pushBack('one');
      list.pushBack('two');
      const newList = list.rest();
      list.pushBack('three');
      newList.pushBack('four');
      expect(list.toArray()).toEqual(['one', 'two', 'three']);
      expect(newList.toArray()).toEqual(['two', 'four']);
    });

    it('returns a list with one fewer elements', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      const newList = list.rest();
      expect(newList.length).toBe(list.length - 1);
    });

    it('throws when called on an empty list', () => {
      expect(() => list.rest()).toThrow();
    });

    it('returns a list without the first element', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      const newList = list.rest();
      expect(newList.toArray()).toEqual(['two', 'three']);
    });
  });

  describe('butLast', () => {
    testListIsACopy(l => l.butLast(), l => l.head);

    it('returns a list that does not share new elements with the old list', () => {
      list.pushBack('one');
      list.pushBack('two');
      const newList = list.butLast();
      list.pushBack('three');
      newList.pushBack('four');
      expect(list.toArray()).toEqual(['one', 'two', 'three']);
      expect(newList.toArray()).toEqual(['one', 'four']);
    });

    it('returns a list with one fewer elements', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      const newList = list.butLast();
      expect(newList.length).toBe(list.length - 1);
    });

    it('throws when called on an empty list', () => {
      expect(() => list.butLast()).toThrow();
    });

    it('returns a list without the last element', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      const newList = list.butLast();
      expect(newList.toArray()).toEqual(['one', 'two']);
    });
  });

  describe('contains', () => {
    it('returns false when called on an empty list', () => {
      expect(list.length).toBe(0);
      expect(list.contains('one')).toBe(false);
    });

    it('returns false when given an element not in the list', () => {
      list.pushBack('one');
      list.pushBack('two');
      expect(list.contains('three')).toBe(false);
    });

    it('returns true when given an element in the list', () => {
      list.pushBack('one');
      list.pushBack('two');
      expect(list.contains('one')).toBe(true);
    });

    it('accepts a function to be used for equality checking', () => {
      type Person = { name: string };
      const l = new LinkedList<Person>();
      l.pushBack({ name: 'Bob' });
      expect(l.contains({ name: 'Bob' })).toBe(false);
      expect(l.contains({ name: 'Bob' }, (a, b) => a.name === b.name)).toBe(true);
    });

    it(`uses the list's equality function if no equality function is given`, () => {
      type Person = { name: string };
      const l = new LinkedList<Person>();
      l.pushBack({ name: 'Bob' });
      expect(l.contains({ name: 'Bob' })).toBe(false);
      l.setEqualityFn((a, b) => a.name === b.name);
      expect(l.contains({ name: 'Bob' })).toBe(true);
      expect(l.contains({ name: 'Bob' }, (a, b) => a === b)).toBe(false);
    });
  });

  describe('slice', () => {
    testListIsACopy(l => l.slice(), l => l.head);

    it('returns a list of the same length when given no arguments', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      const newList = list.slice();
      expect(newList.length).toBe(list.length);
    });

    it('returns a full copy of the list when given no arguments', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      const newList = list.slice();
      expect(newList.toArray()).toEqual(list.toArray());
    });

    it('returns a list that does not share new elements with the old list', () => {
      list.pushBack('one');
      list.pushBack('two');
      const newList = list.slice();
      list.pushBack('three');
      newList.pushBack('four');
      expect(list.toArray()).toEqual(['one', 'two', 'three']);
      expect(newList.toArray()).toEqual(['one', 'two', 'four']);
    });

    it('returns a list that starts at the given start index', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      expect(list.slice(0).toArray()).toEqual(['one', 'two', 'three']);
      expect(list.slice(1).toArray()).toEqual(['two', 'three']);
      expect(list.slice(2).toArray()).toEqual(['three']);
      expect(list.slice(3).toArray()).toEqual([]);
    });

    it('returns a list that ends at the given end index', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      expect(list.slice(0, 2).toArray()).toEqual(['one', 'two', 'three']);
      expect(list.slice(0, 1).toArray()).toEqual(['one', 'two']);
      expect(list.slice(0, 0).toArray()).toEqual(['one']);
    });

    it('returns a list that ends at the last index, given no end index', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      expect(list.slice(0).toArray()).toEqual(['one', 'two', 'three']);
    });

    it('subtracts negative end indices from the length of the list', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      expect(list.slice(0, -1).toArray()).toEqual(['one', 'two', 'three']);
      expect(list.slice(0, -2).toArray()).toEqual(['one', 'two']);
      expect(list.slice(0, -3).toArray()).toEqual(['one']);
      expect(list.slice(0, -4).toArray()).toEqual([]);
    });

    it('returns a part of the list given both a start and end index', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      list.pushBack('four');
      list.pushBack('five');
      expect(list.slice(0, 2).toArray()).toEqual(['one', 'two', 'three']);
      expect(list.slice(1, 3).toArray()).toEqual(['two', 'three', 'four']);
      expect(list.slice(1, 4).toArray()).toEqual(['two', 'three', 'four', 'five']);
      expect(list.slice(2, 4).toArray()).toEqual(['three', 'four', 'five']);
      expect(list.slice(3, 4).toArray()).toEqual(['four', 'five']);
    });

    it('fails gracefully if given a start index greater than the last index in the list', () => {
      list.pushBack('one');
      expect(() => list.slice(2)).not.toThrow();
    });
  });

  describe('clone', () => {
    testListIsACopy(l => l.clone(), l => l.head);

    it('creates a full copy of the list', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      const newList = list.clone();
      expect(newList.toArray()).toEqual(list.toArray());
    });

    it('returns a list with the same elements from the original list', () => {
      type Person = { name: string };
      const l = new LinkedList<Person>();
      const bob = { name: 'Bob' };
      l.pushBack(bob);
      const newList = l.clone();
      expect(newList.first()).toBe(bob);
    });
  });

  describe('map', () => {
    testListIsACopy(l => l.map(a => a), l => l.head);

    it('returns a new list of the same size', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      const newList = list.map(a => a);
      expect(newList.length).toBe(list.length);
    });

    it('returns a list containing the results of calling the element mapper function on each element in the original list', () => {
      const l = new LinkedList<number>();
      l.pushBack(1);
      l.pushBack(2);
      l.pushBack(3);
      const newList = l.map(a => a * a);
      expect(newList.toArray()).toEqual([1, 4, 9]);
    });

    it('can return a new list containing a different type of element', () => {
      type Person = { name: string };
      list.pushBack('Bob');
      list.pushBack('Jane');
      const newList: LinkedList<Person> = list.map(name => ({ name }));
      expect(newList.toArray()).toEqual([{ name: 'Bob' }, { name: 'Jane' }]);
    });
  });
});
