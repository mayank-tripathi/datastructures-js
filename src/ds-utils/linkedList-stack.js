import { LinkedList } from "./LinkedList";

export class LinkedListStackUtil {
  constructor() {
    this.stack = new LinkedList();
    this.head = null;
  }

  push(data) {
    this.stack.insertAtTail(data);
    this.head = this.stack.tail;
  }

  pop() {
    if (this.head !== null) {
      const deletedNode = this.stack.deleteAtTail();
      this.head = this.stack.tail;
      return deletedNode;
    }

    console.error(new Error('No elements available in the stack to delete!'));
  }

  peek() {
    if (this.head !== null) {
      return this.head.data;
    }

    console.error(new Error('No elements in the stack!'));    
  }

  getStack() {
    return JSON.stringify(this.stack.head, null, '  ');
  }
}