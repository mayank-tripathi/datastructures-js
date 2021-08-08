export class ArrayStackUtil {
  constructor(s) {
    this.stack = new Array(s);
    this.capacity = s;
    this.head = -1;
  }

  push(data) {
    if (this.head === this.capacity - 1) {
      console.error('Stack is full. Please delete an element first to insert a new one.');
    } else {
      this.head += 1;
      this.stack[this.head] = data;
    }
  }

  pop() {
    if (this.head !== -1) {
      const toReturn = JSON.parse(JSON.stringify(this.stack[this.head]));
      
      this.stack[this.head] = null;
      this.head -= 1;
      
      return toReturn;
    }

    console.error(new Error('No elements available in the stack to delete!'));
    return null;
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
    let s = 0;

    for (let i = 0; i < this.capacity; i += 1) {
      if (this.stack[i]) {
        s += 1;
      }
    }

    return s;
  }
}