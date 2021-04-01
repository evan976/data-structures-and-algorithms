import { DoublyLinkedList } from './doubly-linked-list';

const list = new DoublyLinkedList();

list.push('keven');
list.push('evan');
list.push('martin');
list.push('lucy');
console.log(list);

list.insert('bob', 0);
list.insert('lilei', 2);
list.insert('mark', 4);
console.log(list);
// ['bob', 'keven', 'evan', 'martin', 'lucy']
// ['bob', 'keven', 'lilei', 'evan', 'martin', 'lucy']
// ['bob', 'keven', 'lilei', 'evan', 'mark', 'martin', 'lucy']

console.log(list.getElementAt(0));  // bob
console.log(list.getElementAt(3));  // evan
console.log(list.getElementAt(5));  // martin

list.removeAt(0); // ['keven', 'lilei', 'evan', 'mark', 'martin', 'lucy']
list.removeAt(2); // ['keven', 'lilei', 'mark', 'martin', 'lucy']
list.removeAt(4); // ['keven', 'lilei', 'mark', 'martin']
console.log(list);