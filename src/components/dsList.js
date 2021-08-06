import { ArrayStack } from "./ArrayStack";

export const DS_MAP = {
  '0': {
    display: 'Select a Datastructure',
    Component: () => <></>
  },
  'ASTACK': {
    display: 'Array Stack',
    Component: ArrayStack
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