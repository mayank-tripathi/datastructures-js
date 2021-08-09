import { LinkedList } from "../common/LinkedList";

export class LinkedListDoubleEndedQueueUtil {
  constructor(s) {
    this.queue = new LinkedList();
    this.capacity = s;
    this.front = null;
    this.rear = null;
  }
  
  pushAtRear(data) {
    if (this.size() === this.capacity) {
      console.error('Queue is full.');
      return false;
    } else {
      const wasFirst = this.size() === 0;
      
      this.queue.insertAtTail(data);
      this.rear = this.queue.tail;

      if (wasFirst) {
        this.front = this.queue.head;
      }

      return true;
    }
  }

  pushAtFront(data) {
    if (this.size() === this.capacity) {
      console.error('Queue is full.');
      return false;
    } else {
      const wasFirst = this.size() === 0;

      this.queue.insertAtHead(data);
      this.front = this.queue.head;

      if (wasFirst) {
        this.rear = this.queue.tail;
      }

      return false;
    }
  }

  popAtRear() {
    if (this.size() === 0) {
      console.error('No elements in the queue to delete!');
      return false;
    } else {
      const wasLast = this.size() === 1;
      const toReturn = this.queue.deleteAtTail();
      this.rear = this.queue.tail;

      if (wasLast) {
        this.front = null;
      }

      return toReturn;
    }
  }

  popAtFront() {
    if (this.size() === 0) {
      console.error('No elements in the queue to delete!');
      return false;
    } else {
      const wasLast = this.size() === 1;
      const toReturn = this.queue.deleteAtHead();
      this.front = this.queue.head;

      if (wasLast) {
        this.rear = null;
      }

      return toReturn;
    }
  }

  peekFront() {
    if (null !== this.front) {
      return this.front.data;
    }

    return false;
  }

  peekRear() {
    if (null !== this.rear) {
      return this.rear.data;
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