export class ArrayQueueUtil {
  constructor(s) {
    this.queue = new Array(s);
    this.capacity = s;
    this.front = -1;
    this.rear = -1;
  }
  
  push(data) {
    if (this.rear === this.capacity - 1) {
      console.error('Queue is full. Please delete an element to insert.');
    } else {
      this.front = this.front === -1 ? 0 : this.front;
      this.rear += 1;
      this.queue[this.rear] = data;
    }
  }

  pop() {
    if (this.front === -1) {
      console.error('No elements in the queue to delete!');
      return null;
    } else {
      const toReturn = JSON.parse(JSON.stringify(this.queue[this.front]));

      this.queue[this.front] = null;
      
      if (this.front === this.rear) {
        this.front = -1;
        this.rear = -1;
      } else {
        this.front += 1; 
      }

      return toReturn;
    }
  }

  peek() {
    if (this.front !== -1) {
      return this.queue[this.front];
    }

    return null;
  }

  size() {
    let s = 0;

    for (let i = 0; i < this.capacity; i += 1) {
      if (this.queue[i]) {
        s += 1;
      }
    }

    return s;
  }

  getJson() {
    return JSON.stringify(this.queue, null, '   ');
  }
}