class Node {
  constructor(element, next) {
    this.element = element;
    this.next = next;
  }
}

/**
 * Notes:
 *   - popBack is not implemented because it would be an O(n) operation. Use DoublyLinkedList instead.
 *   - butLast is not implemented because it would be an O(n) operation. Use DoublyLinkedList instead.
 *
 * TODO: Should I rename pushFront/pushBack to addFront/addBack, and popFront to removeFront?
 */
export default class LinkedList {
  /**
   * The number of elements in the list.
   */
  length = 0;

  /**
   * The first element in the list.
   *
   * @private
   */
  _head = undefined;

  /**
   * The last element in the list. Keeping track of this is O(1).
   *
   * @private
   */
  _tail = undefined;

  /**
   * Time complexity: O(1)
   *
   * @return `true` if there are no elements in the list, `false` otherwise.
   */
  get isEmpty() {
    return this.length === 0;
  }

  /**
   * Time complexity: O(n)
   *
   * @return an array of all elements in the list, in sequence.
   */
  toArray() {
    const array = [];

    for (let node = this._head; node; node = node.next) {
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
  pushFront(element) {
    const node = new Node(element);

    if (!this._head) {
      this._head = this._tail = node;
    } else {
      node.next = this._head;
      this._head = node;
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
  pushBack(element) {
    const node = new Node(element);

    if (!this._head) {
      this._head = this._tail = node;
    } else {
      this._tail.next = node;
      this._tail = node;
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
  popFront() {
    if (!this._head) {
      throw new Error('popFront() called on an empty LinkedList');
    }

    const node = this._head;
    this._head = this._head.next;

    if (node === this._tail) {
      this._tail = undefined;
    }

    this.length -= 1;
    return node.element;
  }

  /**
   * Time complexity: O(1)
   *
   * @return the first element in the list.
   */
  first() {
    if (!this._head) {
      throw new Error('first() called on an empty LinkedList');
    }

    return this._head.element;
  }

  /**
   * Time complexity: O(1)
   *
   * @return the last element in the list.
   */
  last() {
    if (!this._tail) {
      throw new Error('last() called on an empty LinkedList');
    }

    return this._tail.element;
  }

  /**
   * Time complexity: O(n)
   *
   * @return a copy of the list with everything but the first element.
   */
  rest() {
    return this.slice(1);
  }

  /**
   * Time complexity: O(n)
   *
   * @return `true` of the given element is in the list, `false` otherwise.
   */
  contains(element) {
    for (let node = this._head; node; node = node.next) {
      if (node.element === element) {
        return true;
      }
    }

    return false;
  }

  // none(fn) {}
  // some(fn) {}
  // every(fn) {}
  // notEvery(fn) {}

  // remove(element) - Removes the first (newest) occurrence of element.
  // removeLast(element) - Removes the last (oldest) occurrence of element.
  // removeAll(element) - Removes all occurrences of element.
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
