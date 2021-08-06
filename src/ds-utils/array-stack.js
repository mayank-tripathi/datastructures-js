export class ArrayStackUtil {
  constructor() {
    this.stack = [];
    this.head = -1;
  }

  push(data) {
    this.stack.push(data);
    this.head = this.stack.length - 1;
  }

  pop() {
    if (this.head !== -1) {
      this.head = this.stack.length - 2;
      return this.stack.splice(this.stack.length - 1, 1);
    }

    console.error(new Error('No elements available in the stack to delete!'));
  }

  peek() {
    if (this.head !== -1) {
      return this.stack[this.head];
    }

    console.error(new Error('No elements in the stack!'));    
  }

  getStack() {
    return JSON.stringify(this.stack, null, '  ');
  }
}