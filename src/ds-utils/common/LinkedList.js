class Node {
  constructor(d) {
    this.data = d;
    this.next = null;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  nodeAtIndex(index) {
    if (index === 0) {
      return this.head;
    } else if (index === this.length - 1) {
      return this.tail;
    } else if (index > 0 && index < this.length -1) {
      let counter = 1;
      let currentNode = this.head.next;

      while(counter <= index) {
        currentNode = currentNode.next;
        counter += 1;
      }

      return currentNode;
    } else {
      return null;
    }
  }

  insertAtTail(data) {
    const nodeToInsert = new Node(data);

    if (null !== this.tail) {
      this.tail.next = nodeToInsert;
    }

    this.tail = nodeToInsert;

    if (null === this.head) {
      this.head = nodeToInsert;
    }

    this.length += 1;
  }

  insertAtHead(data) {
    const nodeToInsert = new Node(data);

    if (null === this.head && null === this.tail) {
      this.head = this.tail = nodeToInsert;
    } else {
      nodeToInsert.next = this.head;
      this.head = nodeToInsert;
    }

    this.length += 1;
  }

  insertAtIndex(index, data) {
    if (index > 0 && index < this.length) {
      let currentNode = this.nodeAtIndex(index);
      const nodeToInsert = new Node(data);

      nodeToInsert.next = currentNode.next;
      currentNode.next = nodeToInsert;

      this.length += 1;
    } else if (index === 0) {
      this.insertAtHead(data);
    } else if (index === this.length) {
      this.insertAtTail(data);
    } else {
      console.error("Invalid index provided!!", index);
      return false;
    }
  }

  deleteAtHead() {
    if (null !== this.head) {
      const toReturn = JSON.parse(JSON.stringify(this.head.data));
      
      this.head = this.head.next;

      if (null === this.head) { // Was last node
        this.tail = null;
      }

      this.length -= 1;
      
      return toReturn;
    } else {
      console.error('No data available to delete!');
    }
  }

  deleteAtTail() {
    let last = this.head;
    let next = last && this.head.next;
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

      this.length -= 1;
    } else { // Just one node
      toReturn = JSON.parse(JSON.stringify(last.data))
      this.head = null;
      this.tail = null;

      this.length -= 1;
    }

    return toReturn;
  }

  deleteAtIndex(index) {}

  indexOf(value) {}

  size() {
    return this.length;
  }
}