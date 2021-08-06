import { useState } from "react";
import Highlight from "react-highlight";
import { ArrayStackUtil } from "../ds-utils/array-stack";
import { SampleData } from '../ds-utils/sampleData'; 

let stack = new ArrayStackUtil();

export const ArrayStack = ({ modifyJson }) => {
  const [topStack, setTopStack] = useState(null);

  const pushData = () => {
    stack.push(SampleData.getRandomData());
    modifyJson(stack.getStack());
    setTopStack(null);
  };

  const popData = () => {
    const toReturn = stack.pop();
    modifyJson(stack.getStack());
    setTopStack(null);

    return toReturn;
  };

  const peekStack = () => {
    setTopStack(stack.peek());
  };

  return (
    <div className="row">
      <div className="col">
        <div className="input-group mb-3">
          <button className="btn btn-outline-secondary" onClick={pushData} type="button" >Push</button>
          <button className="btn btn-outline-secondary" onClick={popData} type="button" >Pop</button>
          <button className="btn btn-outline-secondary" onClick={peekStack} type="button" >Peek</button>
        </div>
        <div className="clearfix"></div>
        {
          topStack && 
          <div className="col-12 mt-3">
            <strong>Top of the stack: </strong>
            <Highlight className="language-javascript mt-3">
              { JSON.stringify(topStack, null, '   ') }
            </Highlight>
          </div>
        }
      </div>
    </div>
  );
}