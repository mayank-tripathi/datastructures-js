import { v4 as uuidv4 } from 'uuid';

class Node {
  constructor(d, p) {
    this.id = uuidv4();
    this.data = d;
    this.parent = null;
    this.leftChild = null;
    this.rightChild = null;
  }
}

export class BinaryTreeUtil {
  constructor() {
    this.head = null;
  }
}