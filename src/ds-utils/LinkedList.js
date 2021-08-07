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
    const toReturn = JSON.parse(JSON.stringify(this.head.data));

    this.head = this.head.next;

    return toReturn;
  }

  deleteAtTail() {
    let last = this.head;
    let next = this.head.next;
    while (null !== next.next) {
      last = next;
      next = next.next;
    }
    const toReturn = JSON.parse(JSON.stringify(next.data));
    last.next = null;
    this.tail = last;

    return toReturn;
  }
}