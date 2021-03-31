# JavaScript数据结构与算法-链表和双向链表
## 链表数据结构
链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。每个元素由**一个存储元素本身的节点**和**一个指向下一个元素的引用**（也称指针或链接）组成。下图展示了一个链表的结构。

![image-linked-list](https://i.loli.net/2021/03/31/AO9hxMHolUyWJaV.png)

相对于传统的数组，链表的一个好处就在于，添加或移除元素的时候不需要移动其它元素。然而，链表需要**指针**，因此实现链表时需要额外注意。在数组中，我们可以直接访问任何位置的任何元素，而要想访问链表中间的一个元素，则需要从起点（**表头**）开始迭代链表直到找到所要的元素。

现实生活中也有一些链表的例子，比如火车。一列火车由一系列车厢组成的。每节车厢都相互连接。很容易的分离一节车厢，改变它的位置、添加或移除它。每节车厢都是链表的元素，车厢间的连接就是指针。

![image-train](https://img2.baidu.com/it/u=1722031839,4238707047&fm=26&fmt=auto&gp=0.jpg)

## 创建链表
```js
import { defaultEquals } from '../../utils';
import { Node } from '../../models/linked-list-models';

class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0;
    this.head = undefined;
    this.equalsFn = equalsFn;
  }
}
```

要表示链表中第一个以及其它元素，我们需要一个助手类，叫做 Node。Node 类表示我们添加到链表中的项。它包含一个 element 属性，该属性表示要加入链表元素的值；以及一个 next 属性，该属性是指向链表下一个元素的指针。Node 类的声明位于 `src/models` 文件夹

```js
export class Node {
  constructor(element) {
    this.element = element;
    this.next = undefined;
  }
}
```

我们要实现一个 `indexOf` 的方法。它使我们能够在链表中找到一个特定的元素。要比较链表中的元素是否相等，我们需要一个内部调用的函数，名为 `equalsFn`。使用 LinkedList 类的开发者可以自行传入用于比较两个 JavaScript 对象或值是否相等的自定义函数。如果没有传入这个自定义函数，该数据结构将使用定义在 `src/models` 文件夹中的 `defaultEquals` 函数（为了便于复用）作为默认的相等性比较函数。

```js
export function defaultEquals(a, b) {
  return a === b;
}
```

## LinkedList 类的方法：
- push(element): 向链表尾部添加一个新元素
- insert(element, position): 向链表的特定位置插入一个新元素
- getElementAt(index): 返回链表中特定位置的元素
- remove(element): 从链表中移除一个元素
- indexOf(element): 返回元素在链表中的索引，如果链表中没有该元素则返回 -1
- removeAt(position): 从链表的特定位置移除一个元素
- isEmpty(): 如果链表中不包含任何元素返回 true，如果链表长度大于 0 则返回 false
- size(): 返回链表包含的元素个数，与数组的 length 属性类似
- toString(): 返回表示整个链表的字符串

## 代码实现（`src/data-structures/linked-list`）