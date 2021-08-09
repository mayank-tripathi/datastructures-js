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
      return false;
    } else {
      this.stack.insertAtTail(data);
      this.head = this.stack.tail;
      return true;
    }
  }

  pop() {
    if (this.head !== null) {
      const deletedNode = this.stack.deleteAtTail();
      this.head = this.stack.tail;
      return deletedNode;
    }

    console.error('No elements available in the stack to delete!');
    return false;
  }

  peek() {
    if (this.head !== null) {
      return this.head.data;
    }

    return false; 
  }

  getJson() {
    return JSON.stringify(this.stack.head || {}, null, '  ');
  }

  size() {
    return this.stack.size();
  }
}