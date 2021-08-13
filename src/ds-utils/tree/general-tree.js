import { v5 as uuidv5 } from 'uuid';

class Node {
  constructor(d) {
    this.id = uuidv5();
    this.data = d;
    this.children = [];
  }
}

export class GeneralTreeUtil {
  constructor() {
    this.map = {};
    this.head = null;
  }

  insertNode(data, parent) {
    const node = new Node(data);
    const isTreeEmpty = Object.keys(this.map).length === 0

    if (this.map[parent]) {
      this.map[node.id] = node;
      this.map[parent].children.push(node);
      return true;
    } else {
      if (isTreeEmpty) {
        this.map[node.id] = node;
        this.head = node;
        
        return true;
      } else {
        console.error(`Unable to insert node. Node with id: "${parent}" does not exist in the tree.`);
        return false;
      }
    }
  }
}