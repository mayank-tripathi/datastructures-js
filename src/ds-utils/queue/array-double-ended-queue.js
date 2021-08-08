export class ArrayDoubleEndedQueueUtil {
  constructor(s) {
    this.queue = new Array(s);
    this.capacity = s;
    this.front = -1;
    this.rear = -1;
  }
  
  pushAtRear(data) {
    if (this.rear === this.capacity - 1) {
      console.error('No place at the Rear End. Please try Front.');
    } else {
      this.front = this.front === -1 ? 0 : this.front;
      this.rear += 1;
      this.queue[this.rear] = data;
    }
  }

  pushAtFront(data) {
    if (this.front === 0) {
      console.error('No place at the Front End. Please try Rear.');
    } else {
      if (this.front === -1) {
        this.front = 0;
      } else {
        this.front -= 1;
      }
      
      this.queue[this.front] = data;
    }
  }

  popAtRear() {
    if (this.rear === -1) {
      console.error('No elements in the queue to delete!');
      return null;
    } else {
      const toReturn = JSON.parse(JSON.stringify(this.queue[this.rear]));

      this.queue[this.rear] = null;
      
      if (this.front === this.rear) {
        this.front = -1;
        this.rear = -1;
      } else {
        this.rear -= 1; 
      }

      return toReturn;
    }
  }

  popAtFront() {
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

  peekFront() {
    return this.queue[this.front];
  }

  peekRear() {
    return this.queue[this.rear];
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