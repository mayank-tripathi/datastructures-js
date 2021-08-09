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
      return false;
    } else {
      this.front = this.front === -1 ? 0 : this.front;
      this.rear += 1;
      this.queue[this.rear] = data;
      return true;
    }
  }

  pushAtFront(data) {
    if (this.front === 0) {
      console.error('No place at the Front End. Please try Rear.');
      return false;
    } else {
      if (this.front === -1) {
        this.front = 0;
      } else {
        this.front -= 1;
      }
      
      this.queue[this.front] = data;
      return true;
    }
  }

  popAtRear() {
    if (this.rear === -1) {
      console.error('No elements in the queue to delete!');
      return false;
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
      return false;
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
    if (this.front !== -1) {
      return this.queue[this.front];
    }

    return false;
  }

  peekRear() {
    if (this.rear !== -1) {
      return this.queue[this.rear];
    }
    
    return false;
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