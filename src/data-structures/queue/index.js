import { Queue } from './queue';

const queue = new Queue();

queue.enqueue('keven');
queue.enqueue('bob');
queue.enqueue('lucy');
queue.enqueue('evan');

console.log(queue.items);

console.log(queue.peek());

queue.dequeue();
console.log(queue.items);

console.log(queue.peek());

console.log(queue.toString());