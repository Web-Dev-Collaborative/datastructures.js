import LinkedList from './LinkedList';

describe('LinkedList', () => {
  let list: LinkedList<string>;

  beforeEach(() => {
    list = new LinkedList();
  });

  describe('length', () => {
    it('has a length of 0 when created', () => {
      expect(list.length).toEqual(0);
    });

    it('reports the correct number of elements as new elements are added', () => {
      list.pushBack('one');
      expect(list.length).toEqual(1);
      list.pushFront('two');
      expect(list.length).toEqual(2);
      list.pushBack('three');
      expect(list.length).toEqual(3);
    });
  });

  describe('isEmpty', () => {
    it('is empty when first created', () => {
      expect(list.isEmpty).toEqual(true);
    });

    it('is not empty when elements are added', () => {
      list.pushBack('one');
      expect(list.isEmpty).toEqual(false);
    });

    it('is empty when all items are removed', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.popFront();
      expect(list.isEmpty).toEqual(false);
      list.popFront();
      expect(list.isEmpty).toEqual(true);
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
      expect(list.length).toEqual(0);
      list.pushFront('one');
      expect(list.length).toEqual(1);
    });

    it('adds the element to the list', () => {
      expect(list.contains('one')).toEqual(false);
      list.pushFront('one');
      expect(list.contains('one')).toEqual(true);
    });

    it('adds the element to the front of the list', () => {
      list.pushFront('one');
      expect(list.first()).toEqual('one');
      list.pushFront('two');
      expect(list.first()).toEqual('two');
    });

    it('returns the given element', () => {
      const element = list.pushFront('one');
      expect(element).toEqual('one');
    });

    it('allows the same element to be added multiple times', () => {
      list.pushFront('one');
      list.pushFront('one');
      expect(list.toArray()).toEqual(['one', 'one']);
    });
  });

  describe('pushBack', () => {
    it('increases the length of the list by 1', () => {
      expect(list.length).toEqual(0);
      list.pushBack('one');
      expect(list.length).toEqual(1);
    });

    it('adds the element to the list', () => {
      expect(list.contains('one')).toEqual(false);
      list.pushBack('one');
      expect(list.contains('one')).toEqual(true);
    });

    it('adds the element to the front of the list', () => {
      list.pushBack('one');
      expect(list.last()).toEqual('one');
      list.pushBack('two');
      expect(list.last()).toEqual('two');
    });

    it('returns the given element', () => {
      const element = list.pushBack('one');
      expect(element).toEqual('one');
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
      expect(list.length).toEqual(3);
      list.popFront();
      expect(list.length).toEqual(2);
    });

    it('removes the first element from the list', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      list.popFront();
      expect(list.first()).toEqual('two');
    });

    it('returns the removed element', () => {
      list.pushBack('one');
      const value = list.popFront();
      expect(value).toEqual('one');
    });

    it('throws when remove is called on an empty list', () => {
      expect(() => list.popFront()).toThrow();
    });
  });

  describe('first', () => {
    it('returns the first element in the list', () => {
      list.pushBack('one');
      expect(list.first()).toEqual('one');
      list.pushBack('two');
      expect(list.first()).toEqual('one');
      list.popFront();
      expect(list.first()).toEqual('two');
    });

    it('throws when first is called on an empty list', () => {
      expect(() => list.first()).toThrow();
    });
  });

  describe('last', () => {
    it('returns the last element in the list', () => {
      list.pushBack('one');
      expect(list.last()).toEqual('one');
      list.pushBack('two');
      expect(list.last()).toEqual('two');
      list.popFront();
      expect(list.last()).toEqual('two');
    });

    it('throws when last is called on an empty list', () => {
      expect(() => list.last()).toThrow();
    });
  });

  describe('rest', () => {
    it('returns a copy of the list', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      const newList = list.rest();
      expect(newList).not.toBe(list);
    });

    it(`copies each of the list's internal nodes`, () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      const newList = list.rest();

      // I prefer to use public APIs in tests, but it's necessary to access
      // the nodes directly here to make sure they are not reused.
      for (
        let listNode = list.head, newListNode = newList.head;
        listNode && newListNode;
        listNode = listNode.next, newListNode = newListNode.next
      ) {
        expect(listNode).not.toBe(newListNode);
      }
    });

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
      expect(newList.length).toEqual(list.length - 1);
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
    it('returns a copy of the list', () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      const newList = list.butLast();
      expect(newList).not.toBe(list);
    });

    it(`copies each of the list's internal nodes`, () => {
      list.pushBack('one');
      list.pushBack('two');
      list.pushBack('three');
      const newList = list.butLast();

      // I prefer to use public APIs in tests, but it's necessary to access
      // the nodes directly here to make sure they are not reused.
      for (
        let listNode = list.head, newListNode = newList.head;
        listNode && newListNode;
        listNode = listNode.next, newListNode = newListNode.next
      ) {
        expect(listNode).not.toBe(newListNode);
      }
    });

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
      expect(newList.length).toEqual(list.length - 1);
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
    // Returns false when called on an empty list.
    // Returns false when given an element not in the list.
    // Returns true when given an element in the list.
  });

  describe('slice', () => {
    //
  });
});
