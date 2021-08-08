class Node {
  constructor(d, n) {
    this.data = d;
    this.next = n;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  insertAtTail(data) {
    const nodeToInsert = new Node(data, null);

    if (null !== this.tail) {
      this.tail.next = nodeToInsert;
    }

    this.tail = nodeToInsert;

    if (null === this.head) {
      this.head = nodeToInsert;
    }
  }

  insertAtHead(data) {
    const nodeToInsert = new Node(data, null);

    if (null === this.head && null === this.tail) {
      this.head = this.tail = nodeToInsert;
    } else {
      nodeToInsert.next = this.head;
      this.head = nodeToInsert;
    }
  }

  deleteAtHead() {
    if (null !== this.head) {
      const toReturn = JSON.parse(JSON.stringify(this.head.data));
      
      this.head = this.head.next;
      
      return toReturn;
    } else {
      console.error('No data available to delete!');
    }
  }

  deleteAtTail() {
    let last = this.head;
    let next = this.head.next;
    let toReturn = null;
    if (last === null && next === null) {
      console.error('No data available to delete!');
    } else if (next) { // More than one node
      while (null !== next.next) {
        last = next;
        next = next.next;
      }
      toReturn = JSON.parse(JSON.stringify(next.data));
    
      last.next = null;
      this.tail = last;
    } else { // Just one node
      toReturn = JSON.parse(JSON.stringify(last.data))
      this.head = null;
    }

    return toReturn;
  }

  size() {
    if (null !== this.head) {
      let count = 0;
      let start = this.head;
      
      while (start !== null) {
        count += 1;
        start = start.next;
      }

      return count;
    } else {
      return 0;
    }
  }
}