import { Queue } from '../queue/queue';

export class Deque extends Queue {

  // add elements to the forefront 
  addFront(element) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.lowestCount = 0;
      this.items[0] = element;
    }
  }

  // add elements to the backend
  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }

  // remove the first element from the front end
  removeFront() {
    if (this.isEmpty()) return undefined;

    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  // remove the first element from the backend
  removeBack() {
    if (this.isEmpty()) return undefined;
    this.count--;
    
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  // return the first element of the front end
  peekFront() {
    if (this.isEmpty()) return undefined;
    return this.items[this.lowestCount];
  }

  // return the first element of the backend
  peekBack() {
    if (this.isEmpty()) return undefined;
    return this.items[this.count - 1];
  }
}

export function hotPotato(elesList, num) {
  const queue = new Queue();
  const eliminatedList = [];

  for (let i = 0; i < elesList.length; i++) {
    queue.enqueue(elesList[i]);
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    eliminatedList.push(queue.dequeue());
  }

  return {
    eliminated: eliminatedList,
    winner: queue.dequeue()
  }
}

export function palindromeChecker(str) {
  if (str == null || str.length == 0) return false;

  const deque = new Deque();
  const lowerStr = str.toLocaleLowerCase().split(' ').join('');
  let isEqual = true;
  let firstChar, lastChar;

  for (let i = 0; i < lowerStr.length; i++) {
    deque.addBack(lowerStr.charAt(i));
  }

  while (deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    if (firstChar !== lastChar) {
      isEqual = false;
    }
  }
  return isEqual;
}