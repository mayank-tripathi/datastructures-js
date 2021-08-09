import { LinkedList } from "../common/LinkedList";

export class LinkedListQueueUtil {
  constructor(s) {
    this.queue = new LinkedList();
    this.capacity = s;
    this.front = null;
    this.rear = null;
  }
  
  push(data) {
    if (this.size() === this.capacity) {
      console.error('Queue is full. Please delete an element to insert.');
    } else {
      this.queue.insertAtTail(data);

      this.front = this.queue.head;
      this.rear = this.queue.tail;
    }
  }

  pop() {
    if (this.size() === 0) {
      console.error('No elements in the queue to delete!');
      return null;
    } else {
      const wasLastElement = this.size() === 1;
      const toReturn = this.queue.deleteAtHead();

      if (wasLastElement) {
        this.rear = null;
        this.front = null;
      } else {
        this.front = this.queue.head;
      }

      return toReturn;
    }
  }

  peek() {
    if (this.rear !== null) {
      return this.rear.data;
    }

    return null;
  }

  size() {
    return this.queue.size();
  }

  getJson() {
    return JSON.stringify(this.front || {}, null, '   ');
  }
}