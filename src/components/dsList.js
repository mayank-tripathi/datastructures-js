import { ArrayStack } from "./ArrayStack";
import { LinkedListStack } from "./LinkedListStack";

export const DS_MAP = {
  '0': {
    display: 'Select a Datastructure',
    Component: () => <></>
  },
  'ASTACK': {
    display: 'Array Stack',
    Component: ArrayStack
  },
  'LSTACK': {
    display: 'Linked List Stack',
    Component: LinkedListStack
  },
  'QUEUE': {
    display: 'Queue',
    Component: ArrayStack
  },
  'DQUEUE': {
    display: 'Double Ended Queue',
    Component: ArrayStack
  },
}