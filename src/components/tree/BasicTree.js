import { useContext, useEffect, useState } from "react";
import { SubDetails } from "../common/SubDetails";
import { SampleData } from '../../ds-utils/common/sampleData';
import { GlobalContext } from "../../store/global-store";

export const BasicTree = ({ modifyJson, DSInstance, title }) => {
  const [nodeId, setNodeId] = useState('');
  const [deletedNode, setDeletedNode] = useState(null);
  const { error, showError, hideError } = useContext(GlobalContext);

  useEffect(() => {
    modifyJson(DSInstance.getJson());
    setDeletedNode(null);
    hideError();
    setNodeId('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DSInstance])

  const resetError = () => {
    if (null !== error) {
      hideError();
    }
  };

  const pushData = () => {
    const successful = DSInstance.insertNode(SampleData.getRandomData(), nodeId);

    if (!successful) {
      showError('Unable to insert node. Probably invalid parent id provided.');
    } else {
      resetError();
    }

    modifyJson(DSInstance.getJson());
    setDeletedNode(null);
  };

  const setParentNode = (e) => {
    setNodeId(e.currentTarget.value);
  }

  // const popData = () => {
  //   const toReturn = DSInstance.pop();
  //   modifyJson(DSInstance.getJson());

  //   if (!toReturn) {
  //     showError('No elements available to delete!');
  //   } else {
  //     resetError();
  //   }
    
  //   setDeletedNode(toReturn || {});
  // };

  return (
    <div className="row">
      <div className="col">
        <h2 className="mb-4">{title}</h2>
        <div className="input-group mb-3">
          <span className="input-group-text">Parent Node ID</span>
          <input type="text" className="form-control" aria-label="Parent Node ID" aria-describedby="push-node-button" onChange={setParentNode} />
          <button className="btn btn-outline-secondary" type="button" id="push-node-button" onClick={pushData}>Push</button>
        </div>
        <div className="clearfix"></div>
        { deletedNode && <SubDetails title="Deleted Element:" json={deletedNode} /> }
      </div>
    </div>
  );
}