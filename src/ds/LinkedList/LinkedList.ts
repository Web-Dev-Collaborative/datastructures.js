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

/**
 * Notes:
 *   - popBack is not implemented because it would be an O(n) operation. Use DoublyLinkedList instead.
 *   - butLast is not implemented because it would be an O(n) operation. Use DoublyLinkedList instead.
 *
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
   *
   * @private
   */
  private tail: void | Node<T> = undefined;

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
   * Time complexity: O(n)
   *
   * @return a copy of the list with everything but the first element.
   */
  rest(): LinkedList<T> {
    return this.slice(1);
  }

  /**
   * Time complexity: O(n)
   *
   * @return `true` of the given element is in the list, `false` otherwise.
   */
  contains(element: T): boolean {
    for (let node = this.head; node; node = node.next) {
      if (node.element === element) {
        return true;
      }
    }

    return false;
  }

  /**
   * Time complexity: O(n)
   *
   * @return a copy of the part of this list between `start` and `end`.
   */
  slice(start: number, end?: number): LinkedList<T> {
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

  // remove(element) - Removes the first (newest) occurrence of element.
  // removeLast(element) - Removes the last (oldest) occurrence of element.
  // removeAll(element) - Removes all occurrences of element.
  // none(fn) - Returns true if `fn(element)` returns false for every element.
  // some(fn) - Returns true if `fn(element)` returns true for any element.
  // every(fn) - Returns true if `fn(element)` returns true for every element.
  // notEvery(fn) - Returns true if `fn(element)` returns false for eny element.
  // reverse() - Returns a copy of the list in reverse.
  // filter(fn) -> Returns a new LinkedList containing only the elements where fn(element) is truthy.
  // clone() - Returns a shallow copy of the list (elements are not cloned).
  // clear() - Removes all elements from the list.
  // forEach(fn) - Iterates over all elements in the list.
  // get(n) - Returns the nth element in the list.
  // slice(first, last = -1) - Returns a part of the list starting at first and ending at last, or the end of the list.
  // contains(element) - Returns true if the given element is in the list.
  // indexOf(element) - Returns the first index of the given element.
  // lastIndexOf(element) - Returns the last index of the given element.
  // count(element) - Occurrences of the given element in the list
}
