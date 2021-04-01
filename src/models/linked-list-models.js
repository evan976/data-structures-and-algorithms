export class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}

export class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev;
  }
}