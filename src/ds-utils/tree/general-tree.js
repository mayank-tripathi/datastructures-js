import { v4 as uuidv4 } from 'uuid';

class Node {

  constructor(d) {
    this.data = d;
    this.children = [];
    this.id = uuidv4();
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

  getJson(head = this.head, json = {}) {
    if (null !== head) {
      json.name = head.data.name;
      json.value = { id: head.id, ...head.data };
      json.children = [];

      if (Array.isArray(head.children) && head.children.length) {
        head.children.forEach(child => {
          let newChild = {};
          json.children.push(newChild);
          this.getJson(child, newChild);
        });
      }
      
      return json;
    }
    
    return false;
  }
}