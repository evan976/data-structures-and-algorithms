import { LinkedList } from './linked-list';

const list = new LinkedList();

list.push('keven');
list.push('evan');
list.push('lucy');
list.push('martin');
console.log(list);

list.insert('bob', 1);
list.insert('john', 3);
console.log(list);

console.log(list.getElementAt(1));
console.log(list.getElementAt(3));

console.log(list.indexOf('bob')); // 1
console.log(list.indexOf('john'));  // 3
console.log(list.indexOf('lilei')); // -1

console.log(list.removeAt(3));  // john
console.log(list.removeAt(1));  // bob
console.log(list);

list.update('bob', 0);
console.log(list);

list.remove('bob');
console.log(list);