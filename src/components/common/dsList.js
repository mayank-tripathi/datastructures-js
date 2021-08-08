import { ArrayQueueUtil } from "../../ds-utils/queue/array-queue";
import { LinkedListQueueUtil } from "../../ds-utils/queue/linkedlist-queue";
import { ArrayStackUtil } from "../../ds-utils/stack/array-stack";
import { LinkedListStackUtil } from "../../ds-utils/stack/linkedList-stack";
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
  'LQUEUE': {
    display: 'Linked List Queue',
    Component: GenericDS,
    DSInstance: new LinkedListQueueUtil(),
    title: 'Queue Implemented using LinkedList'
  },
}