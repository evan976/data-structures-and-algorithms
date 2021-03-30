# JavaScript数据结构与算法-队列和双端队列
## 队列数据结构
队列是遵循**先进先出**（FIFO，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除新元素。最新添加的元素必须排在队列的末尾。

在现实中，最常见的队列的例子就是排队。

在电影院、自助餐厅、杂货店收银台，都会排队。排在第一位的人会先接受服务。

在计算机科学中，一个常见的例子就是打印队列。比如需要打印五份文档，我们会打开每个文档，然后点击打印按钮。每个文档都会被发送至打印队列，第一个发送到打印队列的文档会首先被打印。以此类推，直到打印完所有文档。

## 创建队列
首先需要一个用于存储队列中元素的数据结构。可以使用数组，但是，为了写出一个在获取元素时更高效的数据结构，将使用一个对象来存储元素。

也可以声明一个 count 属性来控制队列的大小，此外，由于我们将要从队列前端移除元素，同样需要一个变量来追踪第一个元素。因此，声明一个 lowestCount 变量。

```js
class Queue {
  constructor() {
    this.count = 0; // 控制队列大小
    this.lowestCount = 0; // 追踪第一个元素
    this.items = {};
  }
}
```

队列常用的一些方法：

- enqueue(element(s)): 向队列尾部添加一个或多个新的项
- dequeue(): 移除队列的第一项（即排在队列最前面的项）并返回被移除的元素
- peek(): 返回队列的第一个元素--最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息）。该方法在其它语言中也可以叫做 front 方法
- isEmpty(): 如果队列中不包含任何元素，返回true，否则返回false
- size(): 返回队列包含的元素个数（类似数组的length属性）

代码实现（JavaScript）
```js
class Queue {
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
```

## 双端队列数据结构
双端队列（ deque，或称 double-ended queue ）是一种允许我们同时从前端和后端添加或移除元素的特殊队列。

双端队列在现实生活中的例子有电影院、餐厅中排队的队伍等。例如：一个刚买了票的人如果只是还需要再问一些简单的信息，就可以直接回到队伍的头部，另外，在队伍末尾的人如果赶时间，他可以直接离开队伍。

在计算机科学中，双端队列的一种常见的应用是存储一系列的撤销操作。每当用户在软件中进行了一个操作，该操作会被存在一个双端队列中，每当用户点击撤销按钮时，该操作会被从双端队列队列中弹出，表示它被从后面移除了。在进行了预先定义的一定数量的操作后，最先进行的操作会被从双端队列队列的前端移除。

> 由于双端队列同时遵守了先进先出和后进先出的原则，可以说它是把队列和栈相结合的一种数据结构。

## 创建 Deque 类
既然双端队列是一种特殊的队列，我们可以看到其构造函数中的部分代码和队列相同，包括相同的内部属性和以下方法：`isEmpty`、`size`、`toString`

由于双端队列允许在两端添加和移除元素，还有以下几种方法：

- addFront(element(s)): 在双端队列的前端添加新元素
- addBack(): 在双端队列的后端添加新元素
- removeFront(): 从双端队列的前端移除第一个元素
- removeBack(): 从双端队列的后端移除第一个元素
- peekFront(): 返回双端队列前端的第一个元素
- peekBack(): 返回双端队列前端的第一个元素

### 代码实现

```js
class Deque extends Queue {

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
```

## 案例
### 击鼓传花
在游戏中，所有人围成一圈，把花尽快的传递给旁边的人。某一时刻传花停止，这时候花在谁手里，谁就退出圆圈，结束游戏。重复这个过程，直到只剩下一个人（胜者）。

```js
function hotPotato(elesList, num) {
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
```

测试
```js
const names = ['keven', 'bob', 'martin', 'lucy', 'john'];
const result = hotPotato(names, 3);

result.eliminated.forEach(name => {
  console.log(`${name} is eliminated..`);
});
console.log(`winner：${result.winner}`);

/*
lucy is eliminated..
martin is eliminated..
john is eliminated..
bob is eliminated..
winner：keven
*/
```

### 回文检查

> 正反都能读通的单词、词组、数或一系列字符的序列，例如 madam、racecar

```js
function palindromeChecker(str) {
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
```

测试
```js
console.log(palindromeChecker('madam'));  // true
console.log(palindromeChecker('level'));  // true
console.log(palindromeChecker('12321'));  // true
```