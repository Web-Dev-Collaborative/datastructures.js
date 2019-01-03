import LinkedList from './LinkedList';

describe('LinkedList', () => {
  let list: LinkedList<string>;

  beforeEach(() => {
    list = new LinkedList();
  });

  describe('length', () => {
    it('has a length of 0 when created', () => {
      expect(list).toHaveProperty('length', 0);
    });

    it('reports the correct number of elements as new elements are added', () => {
      list.pushBack('one');
      expect(list).toHaveProperty('length', 1);
      list.pushFront('two');
      expect(list).toHaveProperty('length', 2);
      list.pushBack('three');
      expect(list.length).toHaveProperty('length', 3);
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
      expect(list).toHaveProperty('length', 0);
      list.pushFront('one');
      expect(list).toHaveProperty('length', 1);
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
      expect(list).toHaveProperty('length', 0);
      list.pushBack('one');
      expect(list).toHaveProperty('length', 1);
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
      expect(list).toHaveProperty('length', 3);
      list.popFront();
      expect(list).toHaveProperty('length', 2);
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
    // TEST: Returns a copy of the list.
    // TEST: Returns a list with one fewer elements.
    // TEST: Returns a list without the first element.
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
