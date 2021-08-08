import { useEffect, useState } from "react";
import { SubDetails } from "./SubDetails";
import { SampleData } from '../../ds-utils/common/sampleData';

export const GenericDS = ({ modifyJson, DSInstance, title }) => {
  const [topStack, setTopStack] = useState(null);
  const [deletedNode, setDeletedNode] = useState(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    setSize(DSInstance.size());
    modifyJson(DSInstance.getJson());
    setTopStack(null);
    setDeletedNode(null);
  }, [DSInstance, modifyJson])

  const pushData = () => {
    DSInstance.push(SampleData.getRandomData());
    modifyJson(DSInstance.getJson());
    setTopStack(null);
    setDeletedNode(null);
    setSize(DSInstance.size());
  };

  const popData = () => {
    const toReturn = DSInstance.pop();
    modifyJson(DSInstance.getJson());
    
    setTopStack(null);
    setDeletedNode(toReturn);
    setSize(DSInstance.size());
  };

  const peekStack = () => {
    setTopStack(DSInstance.peek());
    setDeletedNode(null);
  };

  return (
    <div className="row">
      <div className="col">
        <h2 className="mb-4">{title}</h2>
        <div className="input-group mb-3">
          <button className="btn btn-outline-secondary" onClick={pushData} type="button" >Push</button>
          <button className="btn btn-outline-secondary" onClick={popData} type="button" >Pop</button>
          <button className="btn btn-outline-secondary" onClick={peekStack} type="button" >Peek</button>
        </div>
        <div className="clearfix"></div>
        <div className="col my-3">
          <strong>Size: </strong> {size}
        </div>
        { topStack && <SubDetails title="Top of the stack:" json={topStack} /> }
        { deletedNode && <SubDetails title="Deleted Element:" json={deletedNode} /> }
      </div>
    </div>
  );
}