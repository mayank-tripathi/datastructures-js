import { useState } from "react";
import { SubDetails } from "./SubDetails";
import { SampleData } from '../ds-utils/sampleData'; 
import { LinkedListStackUtil } from "../ds-utils/linkedList-stack";

let stack = new LinkedListStackUtil();

export const LinkedListStack = ({ modifyJson }) => {
  const [topStack, setTopStack] = useState(null);
  const [deletedNode, setDeletedNode] = useState(null);

  const pushData = () => {
    stack.push(SampleData.getRandomData());
    modifyJson(stack.getStack());
    setTopStack(null);
    setDeletedNode(null);
  };

  const popData = () => {
    const toReturn = stack.pop();
    modifyJson(stack.getStack());
    
    setTopStack(null);
    setDeletedNode(toReturn);
  };

  const peekStack = () => {
    setTopStack(stack.peek());
    setDeletedNode(null);
  };

  return (
    <div className="row">
      <div className="col">
        <h2 className="mb-4">Stack - Implemented Using Array</h2>
        <div className="input-group mb-3">
          <button className="btn btn-outline-secondary" onClick={pushData} type="button" >Push</button>
          <button className="btn btn-outline-secondary" onClick={popData} type="button" >Pop</button>
          <button className="btn btn-outline-secondary" onClick={peekStack} type="button" >Peek</button>
        </div>
        <div className="clearfix"></div>
        { topStack && <SubDetails title="Top of the stack:" json={topStack} /> }
        { deletedNode && <SubDetails title="Deleted Element:" json={deletedNode} /> }
      </div>
    </div>
  );
}