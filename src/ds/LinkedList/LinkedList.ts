/**
 * A single list node. Contains a list element (value) and a pointer to the
 * next node in the list. If the `next` pointer is undefined, this is the
 * last element in the list.
 */
class Node<T> {
  element: T;
  next: void | Node<T>;

  constructor(element: T, next?: void | Node<T>) {
    this.element = element;
    this.next = next;
  }
}

// TODO: Move this to a utils file.
// TODO: Test me.
const numberToIndex = (num: void | number, size: number): number => {
  if (typeof num === 'undefined') {
    return size - 1;
  } else if (num < 0) {
    return size + num;
  } else if (num < size) {
    return num;
  } else {
    return size - 1;
  }
};

export type EqualityFn<T> = (a: T, b: T) => boolean;
export type ElementMapperFn<T, K> = (element: T) => K;

/**
 * Note: The following methods are not implemented because DoublyLinkedList supports
 * these operations with significantly improved time complexity at the cost of a few
 * operations each time the structure is modified:
 *   - popBack
 *
 * TODO: Add a constructor that accepts an optional array of initial elements.
 * TODO: Should I rename pushFront/pushBack to addFront/addBack, and popFront to removeFront?
 */
export default class LinkedList<T> {
  /**
   * The number of elements in the list.
   */
  length: number = 0;

  /**
   * The first element in the list.
   */
  private head: void | Node<T> = undefined;

  /**
   * The last element in the list. Keeping track of this is O(1).
   */
  private tail: void | Node<T> = undefined;

  /**
   * The default equality function.
   */
  private defaultEqualityFn: EqualityFn<T> = (a, b) => a === b;

  /**
   * A function used for checking the equality of two elements.
   */
  private equalityFn: EqualityFn<T> = this.defaultEqualityFn;

  /**
   * Sets the function used for checking the equality of two elements.
   */
  setEqualityFn(equalityFn?: void | EqualityFn<T>) {
    this.equalityFn = equalityFn || this.defaultEqualityFn;
  }

  /**
   * Time complexity: O(1)
   *
   * @return `true` if there are no elements in the list, `false` otherwise.
   */
  get isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Time complexity: O(n)
   *
   * @return an array of all elements in the list, in sequence.
   */
  toArray(): Array<T> {
    const array: Array<T> = [];

    for (let node = this.head; node; node = node.next) {
      array.push(node.element);
    }

    return array;
  }

  /**
   * Adds `element` to the front of the list.
   *
   * Time complexity: O(1)
   *
   * @return the given `element`.
   */
  pushFront(element: T): T {
    const node = new Node(element);

    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.length += 1;
    return element;
  }

  /**
   * Adds `element` to the back of the list.
   *
   * Time complexity: O(1)
   *
   * @return the given `element`.
   */
  pushBack(element: T): T {
    const node = new Node(element);

    // Normally I would check `this.head` here for consistency, but checking `this.tail`
    // here tells TypeScript that in the else branch, `this.tail` is defined.
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.length += 1;
    return element;
  }

  /**
   * Removes the first element from the list.
   *
   * Time complexity: O(1)
   *
   * Note: I chose to name this `popFront` rather than `remove` for a few reasons:
   *    1. It is more explicit. There is no confusion as to which end the element will be removed from.
   *    2. It is consistent with the naming of DoublyLinkedList's `popFront` and `popBack` methods.
   *
   * @return the element that was removed.
   */
  popFront(): T {
    if (!this.head) {
      throw new Error('popFront() called on an empty LinkedList');
    }

    const node = this.head;
    this.head = this.head.next;

    if (node === this.tail) {
      this.tail = undefined;
    }

    this.length -= 1;
    return node.element;
  }

  /**
   * Time complexity: O(1)
   *
   * @return the first element in the list.
   */
  first(): T {
    if (!this.head) {
      throw new Error('first() called on an empty LinkedList');
    }

    return this.head.element;
  }

  /**
   * Time complexity: O(1)
   *
   * @return the last element in the list.
   */
  last(): T {
    if (!this.tail) {
      throw new Error('last() called on an empty LinkedList');
    }

    return this.tail.element;
  }

  /**
   * This must return a copy of the list and its nodes so that modifications
   * to one list to not affect the other.
   *
   * Time complexity: O(n)
   *
   * @return a copy of the list with everything but the first element.
   */
  rest(): LinkedList<T> {
    if (!this.head) {
      throw new Error('rest() called on an empty LinkedList');
    }

    return this.slice(1);
  }

  /**
   * This must return a copy of the list and its nodes so that modifications
   * to one list to not affect the other.
   *
   * Time complexity: O(n)
   *
   * @return a copy of the list with everything but the last element.
   */
  butLast(): LinkedList<T> {
    if (!this.head) {
      throw new Error('butLast() called on an empty LinkedList');
    }

    return this.slice(0, -2);
  }

  /**
   * Time complexity: O(n)
   *
   * @return `true` of the given element is in the list, `false` otherwise.
   */
  contains(element: T, equalityFn: EqualityFn<T> = this.equalityFn): boolean {
    for (let node = this.head; node; node = node.next) {
      if (equalityFn(node.element, element)) {
        return true;
      }
    }

    return false;
  }

  /**
   * This must return a copy of the list and its nodes so that modifications
   * to one list to not affect the other.
   *
   * Time complexity: O(n)
   *
   * @return a copy of the part of this list between `start` and `end`.
   */
  slice(start: number = 0, end?: number): LinkedList<T> {
    const newList = new LinkedList<T>();
    const lastIndex = numberToIndex(end, this.length);
    let i = 0;

    for (let node = this.head; node && i <= lastIndex; node = node.next, i += 1) {
      if (i >= start) {
        newList.pushBack(node.element);
      }
    }

    return newList;
  }

  /**
   * The returned list contains the same elements as this list.
   *
   * Time complexity: O(n)
   *
   * @return a complete copy of the list.
   */
  clone() {
    // This could just be an alias for `this.slice()`, but I decided to "duplicate"
    // this logic because it contains fewer operations/checks than `slice` does.
    // It's so simple that it's not worth it to incur the extra cost when a full
    // clone is what you need.
    const newList = new LinkedList<T>();

    for (let node = this.head; node; node = node.next) {
      newList.pushBack(node.element);
    }

    return newList;
  }

  /**
   * Time complexity: O(n)
   *
   * @return a list containing the results of calling `fn` on each element in this list.
   */
  map<K>(fn: ElementMapperFn<T, K>): LinkedList<K> {
    const newList = new LinkedList<K>();

    for (let node = this.head; node; node = node.next) {
      newList.pushBack(fn(node.element));
    }

    return newList;
  }

  // remove(element) - Removes the first (newest) occurrence of element.
  // removeLast(element) - Removes the last (oldest) occurrence of element.
  // removeAll(element) - Removes all occurrences of element.
  // none(fn) - Returns true if `fn(element)` returns false for every element.
  // some(fn) - Returns true if `fn(element)` returns true for any element.
  // every(fn) - Returns true if `fn(element)` returns true for every element.
  // notEvery(fn) - Returns true if `fn(element)` returns false for eny element.
  // reverse() - Returns a copy of the list in reverse.
  // filter(fn) -> Returns a new LinkedList containing only the elements where fn(element) is truthy.
  // clear() - Removes all elements from the list.
  // forEach(fn) - Iterates over all elements in the list.
  // get(n) - Returns the nth element in the list.
  // contains(element) - Returns true if the given element is in the list.
  // indexOf(element) - Returns the first index of the given element.
  // lastIndexOf(element) - Returns the last index of the given element.
  // count(element) - Occurrences of the given element in the list
  // zip(list) - Returns a new list whose elements are pairs of the corresponding elements of this list and the given list.
  // zipWithIndex() - Returns a new list whose elements are pairs of this list's elements and their indices.
  // extendBack(list) - Adds the elements of the given list to the end of this list.
}
