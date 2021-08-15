import { v4 as uuidv4 } from 'uuid';

class Node {

  constructor(d, p) {
    this.data = d;
    this.parent = p;
    this.children = [];
    this.id = uuidv4();
  }
}

export class GeneralTreeUtil {
  constructor() {
    this.head = null;
  }

  insertNode(data, parent) {
    const node = new Node(data, parent);

    if (null === this.head) { // Empty tree
      this.head = node;
      return true;
    } else {
      const parentNode = this.searchNodeById(parent);

      if (parentNode instanceof Node) {
        parentNode.children.push(node);
        return true;
      } else {
        console.error(`Unable to insert Node. Parent ${parent} not found.`);
        return false;
      }
    }
  }

  searchNodeById(id, start = this.head) {   
    if (start.id === id) {
      return start;
    }

    let resultArray = [];

    for (let child of start.children) {
      resultArray.push(this.searchNodeById(id, child));
    }

    for (let result of resultArray) {
      if (result && result instanceof Node) {
        return result;
      }
    }
  }

  searchParentByChildId(id, start = this.head) {
    if (id === this.head.id) {
      return null;
    }

    const childNode = this.searchNodeById(id);
    return childNode ? this.searchNodeById(childNode.parent) : null;
  }

  getNestedDataFromNode(start = this.head, toReturn = []) {
    if (null !== start) {
      toReturn.push({ id: start.id, ...start.data});
      
      for (let child of start.children) {
        this.getNestedDataFromNode(child, toReturn);
      }

      return toReturn;
    } else {
      return {};
    }
  }

  deleteNodeWithChildren(id) {
    let targetNode = this.searchNodeById(id);
    const dataToReturn = this.getNestedDataFromNode(targetNode);

    if (null !== targetNode) {
      if (Object.is(targetNode, this.head)) {
        this.head = null;
        return dataToReturn;
      } else {
        let parentNode = this.searchParentByChildId(id);
        
        if (parentNode) {
          parentNode.children.splice(parentNode.children.indexOf(targetNode), 1);
          return dataToReturn;
        } else {
          console.error(`Unable to delete node with id: ${id}. Parent not found.`);
          return false;
        }
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