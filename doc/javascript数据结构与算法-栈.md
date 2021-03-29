# JavaScript数据结构与算法-栈数据结构
## 栈数据结构
栈是一种遵从**后进先出**（LIFO）原则的有序集合。新添加或待删除的元素都保存在栈的同一端，称作**栈顶**，另一端就是**栈底**。

> 在栈里，新元素都靠近栈顶，旧元素都接近栈底。

栈也被用在编程语言的编译器和内存中保存变量、方法调用等，也被用于浏览器历史记录（浏览器的返回按钮）。

## 创建一个栈
创建一个 Stack 类最简单的方式就是使用一个数组来存储其元素。在处理大量数据的时候，同时也需要评估如何操作数据是最高效的。在使用数组时，大部分方法的时间复杂度是 O(n)，需要迭代整个数组直到找到要找的元素，在最坏的情况下需要迭代数组的所有位置。如果数组有更多元素的话，所需时间会更长。另外，数组是元素的一个有序集合，为了保证元素排列有序，它会占用更多的内存空间。

对于使用 JavaScript 语言实现栈数据结构的场景，也可以使用一个 JS 对象来存储栈所有的元素，保证它们的顺序并且遵循 LIFO 原则。同时我们也能直接获取元素，占用较少的内存空间。

栈常用的一些方法：

- push(element(s)): 添加一个或几个元素到栈顶
- pop(): 移除栈顶元素，同时返回被移除的元素
- peek(): 返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶元素，仅仅是返回它）
- isEmpty(): 如果栈里没有任何元素返回true，否则返回false
- size(): 返回栈里的元素个数（类似数组的length属性）

代码实现（JavaScript）
```js
class Stack {
  constructor() {
    this.count = 0;
    this.items = {};
  }

  // push(element(s)) 添加一个或几个新元素到栈顶
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  // pop() 移除栈顶元素，同时返回被移除的元素
  pop() {
    if (this.isEmpty()) return undefined;
    this.count--;
    
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  // 返回栈顶元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）
  peek() {
    if (this.isEmpty()) return undefined;
    return this.items[this.count - 1];
  }

  // 如果栈里没有任何元素就返回true，否则返回false
  isEmpty() {
    return this.count === 0;
  }

  // 返回栈里的元素个数，类似数组的length属性
  size() {
    return this.count;
  }

  // 转字符串
  toString() {
    if (this.isEmpty()) return '';

    let objStr = `${this.items[0]}`;
    for(let i = 1; i < this.count; i++) {
      objStr = `${objStr}, ${this.count[i]}`;
    }
    return objStr;
  }
}
```
## 案例（进制转换）
```js
// 十进制转二进制
function decToBin(num) {
  const stack = new Stack();
  let binStr = '';

  while (num > 0) {
    stack.push(num % 2);
    num = Math.floor(num / 2);
  }

  while (!stack.isEmpty()) {
    binStr += stack.pop().toString();
  }
  return binStr;
}
```

```js
function baseConverter(num, base) {
  const stack = new Stack();
  let dig = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let baseStr = '';

  if (base < 2 || base > 36) return '';

  while (num > 0) {
    stack.push(num % base);
    num = Math.floor(num / base);
  }

  while (!stack.isEmpty()) {
    baseStr += dig[stack.pop()];
  }
  return baseStr;
}
```

测试
```js
console.log(decToBin(100)); // 1100100

console.log(baseConverter(100, 8)); // 144
console.log(baseConverter(100, 16));  // 64
console.log(baseConverter(100, 35));  // 2U 
```