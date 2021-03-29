export class Stack {
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

// 十进制转二进制
export function decToBin(num) {
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

// 任意进制转换
export function baseConverter(num, base) {
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