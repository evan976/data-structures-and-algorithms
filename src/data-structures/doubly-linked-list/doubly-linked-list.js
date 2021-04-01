import { LinkedList } from '../linked-list/linked-list';
import { DoublyNode } from '../../models/linked-list-models';
import { defaultEquals } from '../../utils';

export class DoublyLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
    this.tail = undefined;
  }

  // add an element to the end of the doubly linked list
  push(element) {
    const node = new DoublyNode(element);
    // the doubly linked list is empty
    // both the head and tail point to the new node
    if (this.head == null) {
      this.head = node;
      this.tail = node;
    } else {
      // query the original last node
      // the next node of the original last node points to the new node
      // the previous node of the new node points to the original last node
      // make the new node the last node
      let current = this.tail;
      current.next = node;
      node.prev = current;
      this.tail = node;
    }
    this.count++;
  }

  // insert an element at any position
  insert(element, index) {
    // boundary problem
    if (index < 0 || index > this.count) return false;
    const node = new DoublyNode(element);
    let current = this.head;
    // insert at the beginning(index === 0)
    if (index === 0) {
      // if the doubly linked list is empty(this.head == null)
      // both the head and tail point to the new node
      if (this.head == null) {
        this.head = node;
        this.tail = node;
      } else {  // not empty(this.head != null)
        // the next node of the new node points to the original head(the original first node)
        // the previous node of the original head(the original first node) points to the new node
        // make the new node the head
        node.next = current;
        current.prev = node;
        this.head = node;
      }
    } else if (index === this.count) {  // insert to the end(index === this.count)
      // query the original last node
      // the next node of the original last node points to the new node
      // the previous of the new node points to the original last node
      // make the new node the last node
      current = this.tail;
      current.next = node;
      node.prev = current;
      this.tail = node;
    } else {  // insert in the middle
      // find the previous item where you want to insert
      // find the next item where you want to insert
      // the next item of the new node points to the next node at the current position
      // the next item of the previous node at the current position points to the new node
      // the previous item of the next node at the current position points to the new node
      // the previous item of the new node points to the previous node at the current position
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      node.next = current;
      previous.next = node;
      current.prev = node;
      node.prev = previous;
    }
    this.count++;
    return true;
  }

  // remove an element from any position
  removeAt(index) {
    if (index < 0 || index > this.count) return undefined;
    let current = this.head;
    // remove the element in the first position
    if (index === 0) {
      // the head points to the next node of the head
      this.head = current.next;
      // if there is only one element in the doubly linked list
      if (this.count === 1) {
        // both head and tail point to undefined
        this.tail = undefined;
      } else {
        // the previous node of the head points to undefined
        this.head.prev = undefined;
      }
    } else if (index === this.count - 1) {  // remove the element in the last position
      // query the last node
      // the last node points to the previous of the last node
      // the next node of the last node points to undefined
      current = this.tail;
      this.tail = current.prev;
      this.tail.next = undefined;
    } else {  // remove the middle element
      // find the item you want to remove and the previous item
      // the next node of the previous item points to the next item to be removed
      // the previous node of the next item to be removed points to the previous item
      current = this.getElementAt(index);
      const previous = current.prev;
      previous.next = current.next;
      current.next.prev = previous; 

    }
    this.count--;
    return current.element;
  }
}