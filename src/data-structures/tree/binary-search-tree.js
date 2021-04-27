import { Compare, defaultCompare } from '../../utils';
import { Node } from '../../models/node';

export class BinarySearchaTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;  // 比较节点值
    this.root = null;  // Node类型的根节点
  }

  // insert(key) 向树中插入一个新的键
  insert(key) {
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  };

  insertNode(node, key) {
    // 新节点的键小于当前节点的键 => 检查当前节点的左侧子节点
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      // 没有左侧子节点
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);  // 有左侧节点，继续递归调用
      }
    } else {
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  };

  // 中序遍历
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }

  inOrderTraverseNode(node, callback) {
    if (node != null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  // 先序遍历
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }

  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }

  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  // 搜索最小值
  min() {
    return this.minNode(this.root);
  }
  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {
      current = current.left;
    }
    return current;
  }
  
  // 搜索最大值
  max() {
    return this.maxNode(this.root);
  }
  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  // 搜索特定的值
  serch(key) {
    return this.serchNode(this.root, key);
  }
  serchNode(node, key) {
    if (node == null) {   // 判断合法性
      return false;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {  // 要找的键比当前节点小 => 从左侧子节点开始继续搜索
      return this.serchNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {  // 要找的键比当前节点大 => 从右侧子节点开始继续搜索
      return this.serchNode(node.right, key);
    } else {  // 要找的键和当前节点相等 => true
      return true;
    }
  }
}