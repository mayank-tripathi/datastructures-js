import { useEffect, useState } from "react";
import { SubDetails } from "../common/SubDetails";
import { SampleData } from '../../ds-utils/common/sampleData';

export const DoubleEndedQueue = ({ modifyJson, DSInstance, title }) => {
  const [topStack, setTopStack] = useState(null);
  const [deletedNode, setDeletedNode] = useState(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    setSize(DSInstance.size());
    modifyJson(DSInstance.getJson());
    setTopStack(null);
    setDeletedNode(null);
    setSize(0);
  }, [DSInstance, modifyJson])

  const pushDataAtTail = () => {
    DSInstance.pushAtRear(SampleData.getRandomData());
    modifyJson(DSInstance.getJson());
    setTopStack(null);
    setDeletedNode(null);
    setSize(DSInstance.size());
  };

  const pushDataAtFront = () => {
    DSInstance.pushAtFront(SampleData.getRandomData());
    modifyJson(DSInstance.getJson());
    setTopStack(null);
    setDeletedNode(null);
    setSize(DSInstance.size());
  };

  const popDataAtTail = () => {
    const toReturn = DSInstance.popAtRear();
    modifyJson(DSInstance.getJson());
    
    setTopStack(null);
    setDeletedNode(toReturn);
    setSize(DSInstance.size());
  };

  const popDataAtFront = () => {
    const toReturn = DSInstance.popAtFront();
    modifyJson(DSInstance.getJson());
    
    setTopStack(null);
    setDeletedNode(toReturn);
    setSize(DSInstance.size());
  };

  const peekFront = () => {
    setTopStack(DSInstance.peekFront());
    setDeletedNode(null);
  };

  const peekTail = () => {
    setTopStack(DSInstance.peekRear());
    setDeletedNode(null);
  };

  return (
    <div className="row">
      <div className="col">
        <h2 className="mb-4">{title}</h2>
        <div className="input-group mb-3">
          <button className="btn btn-outline-secondary" onClick={pushDataAtTail} type="button" >Push on Tail</button>
          <button className="btn btn-outline-secondary" onClick={pushDataAtFront} type="button" >Push on Front</button>
        </div>
        <div className="input-group mb-3">
          <button className="btn btn-outline-secondary" onClick={popDataAtTail} type="button" >Pop on Tail</button>
          <button className="btn btn-outline-secondary" onClick={popDataAtFront} type="button" >Pop on Front</button>
        </div>
        <div className="input-group mb-3">
          <button className="btn btn-outline-secondary" onClick={peekFront} type="button" >Peek Front</button>
          <button className="btn btn-outline-secondary" onClick={peekTail} type="button" >Peek Tail</button>
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