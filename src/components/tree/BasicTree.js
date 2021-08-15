import { useContext, useEffect, useState } from "react";
import { SubDetails } from "../common/SubDetails";
import { SampleData } from "../../ds-utils/common/sampleData";
import { GlobalContext } from "../../store/global-store";

export const BasicTree = ({ modifyJson, DSInstance, title }) => {
  const [parentNodeId, setParentNodeId] = useState("");
  const [subTreeHeadId, setSubTreeHeadId] = useState("");
  const [nodeToDeleteId, setNodeToDeleteId] = useState("");
  const [nodeToMoveId, setNodeToMoveId] = useState("");
  const [newParentNodeId, setNewParentNodeId] = useState("");
  const [deletedNode, setDeletedNode] = useState(null);
  const [depth, setDepth] = useState(0);
  const { error, showError, hideError } = useContext(GlobalContext);

  useEffect(() => {
    modifyJson(DSInstance.getJson());
    setDepth(DSInstance.getTreeDepth());
    setDeletedNode(null);
    hideError();
    setParentNodeId("");
    setSubTreeHeadId("");
    setNodeToDeleteId("");
    setNodeToMoveId("");
    setNewParentNodeId("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DSInstance]);

  const resetError = () => {
    if (null !== error) {
      hideError();
    }
  };

  const selectText = (e) => {
    const value = e.currentTarget.value;

    if (value !== '') {
      e.currentTarget.select();
    }
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

  const setTargetNodeToMoveId = (e) => {
    setNodeToMoveId(e.currentTarget.value);
  };

  const setTargetParentId = (e) => {
    setNewParentNodeId(e.currentTarget.value);
  };

  const pushData = () => {
    const successful = DSInstance.insertNode(
      SampleData.getRandomData(),
      parentNodeId
    );

    if (!successful) {
      showError("Unable to insert node. Probably invalid parent id provided.");
    } else {
      resetError();
    }

    modifyJson(DSInstance.getJson());
    setDepth(DSInstance.getTreeDepth());
    setDeletedNode(null);
  };

  const popSubTree = () => {
    const toReturn = DSInstance.deleteSubTree(subTreeHeadId);

    if (!toReturn) {
      showError("No elements available to delete!");
    } else {
      resetError();
    }

    modifyJson(DSInstance.getJson());
    setDepth(DSInstance.getTreeDepth());
    setDeletedNode(toReturn || {});
  };

  const popNode = () => {
    const toReturn = DSInstance.deleteNode(nodeToDeleteId);

    if (!toReturn) {
      showError("No elements available to delete!");
    } else {
      resetError();
    }

    modifyJson(DSInstance.getJson());
    setDepth(DSInstance.getTreeDepth());
    setDeletedNode(toReturn || {});
  };

  const moveNode = () => {
    const wasSuccessful = DSInstance.moveNode(nodeToMoveId, newParentNodeId);

    if (!wasSuccessful) {
      showError("Unable to move the node!");
    } else {
      resetError();
    }

    modifyJson(DSInstance.getJson());
    setDepth(DSInstance.getTreeDepth());
    setDeletedNode(null);
  };

  return (
    <div className="row">
      <div className="col">
        <h2 className="mb-3">{title}</h2>
        <aside>Click on the node to copy its ID.</aside>
        <div className="input-group my-3">
          <span className="input-group-text">Parent Node ID</span>
          <input
            type="text"
            className="form-control"
            aria-label="Parent Node ID"
            aria-describedby="push-node-button"
            value={parentNodeId}
            onChange={setTargetNodeId}
            onClick={selectText}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="push-node-button"
            onClick={pushData}
          >
            Push
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Node ID</span>
          <input
            type="text"
            className="form-control"
            aria-label="Node ID"
            aria-describedby="pop-subTree-button"
            value={subTreeHeadId}
            onChange={setTargetSubTreeId}
            onClick={selectText}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="pop-subTree-button"
            onClick={popSubTree}
          >
            Pop Sub-Tree
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Node ID</span>
          <input
            type="text"
            className="form-control"
            aria-label="Node ID"
            aria-describedby="pop-node-button"
            value={nodeToDeleteId}
            onChange={setTargetNodeToDeleteId}
            onClick={selectText}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="pop-node-button"
            onClick={popNode}
          >
            Pop Node
          </button>
        </div>
        <div className="input-group mb-3">
          <span className="input-group-text">Node ID</span>
          <input
            type="text"
            className="form-control"
            aria-label="Node ID"
            aria-describedby="move-node-button"
            value={nodeToMoveId}
            onChange={setTargetNodeToMoveId}
            onClick={selectText}
          />
          <span className="input-group-text">New Parent Node ID</span>
          <input
            type="text"
            className="form-control"
            aria-label="Node ID"
            aria-describedby="move-node-button"
            value={newParentNodeId}
            onChange={setTargetParentId}
            onClick={selectText}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="move-node-button"
            onClick={moveNode}
          >
            Move Node
          </button>
        </div>
        <div className="clearfix"></div>
        <p>
          <strong>Depth of the tree: </strong>
          { depth }
        </p>
        {deletedNode && (
          <SubDetails title="Deleted Element:" json={deletedNode} />
        )}
      </div>
    </div>
  );
};
