import { LinkedList } from "../common/LinkedList";

export class LinkedListStackUtil {
  constructor(s) {
    this.stack = new LinkedList();
    this.capacity = s;
    this.head = null;
  }

  push(data) {
    if (this.size() === this.capacity) {
      console.error('Stack is full. Please delete an element first to insert a new one.');
    } else {
      this.stack.insertAtTail(data);
      this.head = this.stack.tail;
    }
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

    return null; 
  }

  getJson() {
    return JSON.stringify(this.stack.head || {}, null, '  ');
  }

  size() {
    return this.stack.size();
  }
}