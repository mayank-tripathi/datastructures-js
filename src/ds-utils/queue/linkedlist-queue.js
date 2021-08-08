import { LinkedList } from "../common/LinkedList";

export class LinkedListQueueUtil {
  constructor() {
    this.queue = new LinkedList();
    this.front = null;
    this.rear = null;
  }
  
  push(data) {
    this.queue.insertAtTail(data);

    this.front = this.queue.head;
    this.rear = this.queue.tail;
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

    console.error('No elements in the queue!');
  }

  size() {
    return this.queue.size();
  }

  getJson() {
    return JSON.stringify(this.front || {}, null, '   ');
  }
}