import { ArrayQueueUtil } from "../../ds-utils/array-queue";
import { ArrayStackUtil } from "../../ds-utils/array-stack";
import { LinkedListStackUtil } from "../../ds-utils/linkedList-stack";
import { GenericDS } from "./GenericDS";

export const DS_MAP = {
  '0': {
    display: 'Select a Datastructure',
    Component: () => <></>
  },
  'ASTACK': {
    display: 'Array Stack',
    Component: GenericDS,
    DSInstance: new ArrayStackUtil(),
    title: 'Stack Implemented using Array'
  },
  'LSTACK': {
    display: 'Linked List Stack',
    Component: GenericDS,
    DSInstance: new LinkedListStackUtil(),
    title: 'Stack Implemented using Linked List'
  },
  'AQUEUE': {
    display: 'Array Queue',
    Component: GenericDS,
    DSInstance: new ArrayQueueUtil(),
    title: 'Queue Implemented using Array'
  },
}