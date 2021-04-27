import { BinarySearchaTree } from './binary-search-tree';

const tree = new BinarySearchaTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);
// console.log(tree);

// const printNode = (value) => console.log(value);
// tree.inOrderTraverse(printNode);
// tree.preOrderTraverse(printNode);
// tree.postOrderTraverse(printNode);

// console.log(tree.min());
// console.log(tree.max());

console.log(tree.serch(1) ? 'Key 1 found' : 'Key 1 not found');
console.log(tree.serch(8) ? 'Key 8 found' : 'Key 8 not found');