import { useContext, useEffect, useState } from "react";
import { SubDetails } from "../common/SubDetails";
import { SampleData } from '../../ds-utils/common/sampleData';
import { GlobalContext } from "../../store/global-store";

export const BasicTree = ({ modifyJson, DSInstance, title }) => {
  const [parentNodeId, setParentNodeId] = useState('');
  const [subTreeHeadId, setSubTreeHeadId] = useState('');
  const [nodeToDeleteId, setNodeToDeleteId] = useState('');
  const [deletedNode, setDeletedNode] = useState(null);
  const { error, showError, hideError } = useContext(GlobalContext);

  useEffect(() => {
    modifyJson(DSInstance.getJson());
    setDeletedNode(null);
    hideError();
    setParentNodeId('');
    setSubTreeHeadId('');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DSInstance])

  const resetError = () => {
    if (null !== error) {
      hideError();
    }
  };

  const pushData = () => {
    const successful = DSInstance.insertNode(SampleData.getRandomData(), parentNodeId);

    if (!successful) {
      showError('Unable to insert node. Probably invalid parent id provided.');
    } else {
      resetError();
    }

    modifyJson(DSInstance.getJson());
    setDeletedNode(null);
  };

  const setTargetNodeId = (e) => {
    setParentNodeId(e.currentTarget.value);
  };

  const setTargetSubTreeId = (e) => {
    setSubTreeHeadId(e.currentTarget.value);
  };

  const setTargetNodeToDeleteId = (e) => {
    setNodeToDeleteId(e.currentTarget.value);
  };

  const popSubTree = () => {
    const toReturn = DSInstance.deleteSubTree(subTreeHeadId);
    modifyJson(DSInstance.getJson());

    if (!toReturn) {
      showError('No elements available to delete!');
    } else {
      resetError();
    }
    
    setDeletedNode(toReturn || {});
  };

  const popNode = () => {
    const toReturn = DSInstance.deleteNode(nodeToDeleteId);
    modifyJson(DSInstance.getJson());

    if (!toReturn) {
      showError('No elements available to delete!');
    } else {
      resetError();
    }
    
    setDeletedNode(toReturn || {});
  };

  return (
    <div className="row">
      <div className="col">
        <h2 className="mb-4">{title}</h2>
        <div className="input-group mb-3">
          <span className="input-group-text">Parent Node ID</span>
          <input type="text" className="form-control" aria-label="Parent Node ID" aria-describedby="push-node-button" value={parentNodeId} onChange={setTargetNodeId} />
          <button className="btn btn-outline-secondary" type="button" id="push-node-button" onClick={pushData}>Push</button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Node ID</span>
          <input type="text" className="form-control" aria-label="Node ID" aria-describedby="pop-subTree-button" value={subTreeHeadId} onChange={setTargetSubTreeId} />
          <button className="btn btn-outline-secondary" type="button" id="pop-subTree-button" onClick={popSubTree}>Pop Sub-Tree</button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Node ID</span>
          <input type="text" className="form-control" aria-label="Node ID" aria-describedby="pop-node-button" value={nodeToDeleteId} onChange={setTargetNodeToDeleteId} />
          <button className="btn btn-outline-secondary" type="button" id="pop-node-button" onClick={popNode}>Pop Node</button>
        </div>
        <div className="clearfix"></div>
        { deletedNode && <SubDetails title="Deleted Element:" json={deletedNode} /> }
      </div>
    </div>
  );
}