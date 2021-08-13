import { ArrayCircularQueueUtil } from "../../ds-utils/queue/array-circular-queue.js";
import { ArrayDoubleEndedQueueUtil } from "../../ds-utils/queue/array-double-ended-queue.js";
import { ArrayQueueUtil } from "../../ds-utils/queue/array-queue";
import { LinkedListDoubleEndedQueueUtil } from "../../ds-utils/queue/linkedlist-double-ended-queue.js";
import { LinkedListQueueUtil } from "../../ds-utils/queue/linkedlist-queue";
import { ArrayStackUtil } from "../../ds-utils/stack/array-stack";
import { LinkedListStackUtil } from "../../ds-utils/stack/linkedList-stack";
import { DoubleEndedQueue } from "../queue/DoubleEndedQueue.js";
import { GenericDS } from "./GenericDS";

export const DS_MAP = {
  '0': {
    display: 'Select a Datastructure',
    Component: () => <></>,
    DSInstance: null,
    title: '',
    visualizer: ''
  },
  'ASTACK': {
    display: 'Stack - Array',
    Component: GenericDS,
    DSInstance: new ArrayStackUtil(5),
    title: 'Stack using Array',
    visualizer: 'CODE'
  },
  'LSTACK': {
    display: 'Stack - Linked List',
    Component: GenericDS,
    DSInstance: new LinkedListStackUtil(5),
    title: 'Stack using Linked List',
    visualizer: 'CODE'
  },
  'AQUEUE': {
    display: 'Simple Queue - Array',
    Component: GenericDS,
    DSInstance: new ArrayQueueUtil(5),
    title: 'Simple Queue using Array',
    visualizer: 'CODE'
  },
  'LQUEUE': {
    display: 'Simple Queue - Linked List',
    Component: GenericDS,
    DSInstance: new LinkedListQueueUtil(5),
    title: 'Simple Queue using LinkedList',
    visualizer: 'CODE'
  },
  'ACQUEUE': {
    display: 'Circular Queue - Array',
    Component: GenericDS,
    DSInstance: new ArrayCircularQueueUtil(5),
    title: 'Circular Queue using Array',
    visualizer: 'CODE'
  },
  'ADQUEUE': {
    display: 'Double Ended Queue - Array',
    Component: DoubleEndedQueue,
    DSInstance: new ArrayDoubleEndedQueueUtil(5),
    title: 'Double Ended Queue using Array',
    visualizer: 'CODE'
  },
  'LDQUEUE': {
    display: 'Double Ended Queue - LinkedList',
    Component: DoubleEndedQueue,
    DSInstance: new LinkedListDoubleEndedQueueUtil(5),
    title: 'Double Ended Queue using LinkedList',
    visualizer: 'CODE'
  },
}