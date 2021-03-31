import { defaultEquals } from '../../utils';
import { Node } from '../../models/linked-list-models';

export class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = undefined;
    this.equalsFn = equalsFn;
  }

  // add elements to the end of the linked list
  push(element) {
    const node = new Node(element);
    let current;
    // the linked list is empty
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  // insert elements at any position
  insert(element, index) {
    // boundary problem
    if (index < 0 || index > this.count) return false;
    const node = new Node(element);
    // insert element at the beginning
    if (index === 0) {
      const current = this.head;
      node.next = current;
      this.head = node;
    } else {
      const previous = this.getElementAt(index - 1);
      const current = previous.next;
      previous.next = node;
      node.next = current;
    }
    this.count++;
    return true;
  }

  // get an element at a specific location
  getElementAt(index) {
    if (index < 0 || index > this.count) return undefined;
    let current = this.head;
    for (let i = 0; i < index && current != null; i++) {
      current = current.next;
    }
    return current;
  }

  // return the position of an element
  indexOf(element) {
    let current = this.head;
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalsFn(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  // remove an element at a specific location
  removeAt(index) {
    if (index < 0 || index > this.count) return undefined;
    let current = this.head;
    if (index === 0) {
      this.head = current.next;
    } else {
      let previous;
      for (let i = 0; i < index; i++) {
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.count--;
    return current.element;
  }

  // change the position of an element
  update(element, index) {
    const result = this.removeAt(index);
    this.insert(element, index);
    return result;
  }

  // remove an element of the linked list
  remove(element) {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  isEmpty() {
    return this.size() === 0;
  }

  size() {
    return this.count;
  }

  toString() {
    if (this.head == null) return '';
    let objStr = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objStr = `${objStr}, ${current.element}`;
      current = current.next;
    }
    return objStr;
  }
}