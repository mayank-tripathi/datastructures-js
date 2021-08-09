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
      return false;
    } else {
      this.queue.insertAtTail(data);

      this.front = this.queue.head;
      this.rear = this.queue.tail;

      return true;
    }
  }

  pop() {
    if (this.size() === 0) {
      console.error('No elements in the queue to delete!');
      return false;
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
    if (this.front !== null) {
      return this.front.data;
    }

    return false;
  }

  size() {
    return this.queue.size();
  }

  getJson() {
    return JSON.stringify(this.front || {}, null, '   ');
  }
}