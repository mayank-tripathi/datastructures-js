import { ArrayStackUtil } from "../ds-utils/array-stack";
import { SampleData } from '../ds-utils/sampleData'; 

let stack = new ArrayStackUtil();

export const ArrayStack = ({ modifyJson }) => {
  const pushData = () => {
    stack.push(SampleData.getRandomData());
    modifyJson(stack.getStack());
  };

  const popData = () => {
    const toReturn = stack.pop();
    modifyJson(stack.getStack());

    return toReturn;
  }

  return (
    <div className="row">
      <div className="col">
        <div className="input-group mb-3">
          <button className="btn btn-outline-secondary" onClick={pushData} type="button" >Push</button>
          <button className="btn btn-outline-secondary" onClick={popData} type="button" >Pop</button>
        </div>
      </div>
    </div>
  );
}