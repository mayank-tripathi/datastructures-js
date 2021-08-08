export class ArrayQueueUtil {
  constructor() {
    this.queue = [];
    this.front = null;
  }
  
  push(data) {
    this.queue.push(data);
    this.front = this.queue.length - 1;
  }

  pop() {
    if (this.queue.length === 0) {
      console.error('No elements in the queue to delete!');
      return null;
    } else {
      const toReturn = this.queue.splice(0, 1);

      this.front = this.queue.length - 1;

      return toReturn;
    }
  }

  peek() {
    return this.queue[this.front];
  }

  size() {
    return this.queue.length;
  }

  getJson() {
    return JSON.stringify(this.queue, null, '   ');
  }
}