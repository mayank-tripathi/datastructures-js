export class ArrayStackUtil {
  constructor() {
    this.stack = [];
    this.head = null;
  }

  push(data) {
    this.stack.push(data);
    this.head = this.stack.length - 1;
  }

  pop() {
    if (null !== this.head) {
      this.head = this.stack.length - 2;
      return this.stack.splice(this.stack.length - 1, 1);
    }

    console.error(new Error('No elements available in the stack to delete!'));
  }

  peek() {
    if (null !== this.head) {
      return this.stack[this.head];
    }

    console.error(new Error('No elements in the stack!'));    
  }

  getJson() {
    return JSON.stringify(this.stack, null, '  ');
  }

  size() {
    return this.stack.length;
  }
}