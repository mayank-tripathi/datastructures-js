import { LoremIpsum } from "lorem-ipsum";

const lorem = new LoremIpsum();

export class SampleData {
  constructor(n, p) {
    this.name = n;
    this.phone = p;
  }

  static getRandomData() {
    return new SampleData(lorem.generateWords(2), Math.round(Math.random() * Math.pow(10, 10)))
  }
}