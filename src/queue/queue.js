export class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }

  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.lowestCount];
  }

  size() {
    return this.count - this.lowestCount;
  }

  isEmpty() {
    return this.count === 0;
  }

  toString() {
    if (this.isEmpty()) return '';

    let objStr = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objStr = `${objStr}, ${this.items[i]}`;
    }
    return objStr;
  }
}