import { useContext, useEffect, useState } from "react";
import { SubDetails } from "./SubDetails";
import { SampleData } from '../../ds-utils/common/sampleData';
import { GlobalContext } from "../../store/global-store";

export const GenericDS = ({ modifyJson, DSInstance, title }) => {
  const [topElement, setTopElement] = useState(null);
  const [deletedNode, setDeletedNode] = useState(null);
  const [size, setSize] = useState(0);
  const { error, showError, hideError } = useContext(GlobalContext);

  useEffect(() => {
    setSize(DSInstance.size());
    modifyJson(DSInstance.getJson());
    setTopElement(null);
    setDeletedNode(null);
    setSize(0);
    hideError();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DSInstance])

  const resetError = () => {
    if (null !== error) {
      hideError();
    }
  };

  const pushData = () => {
    const successful = DSInstance.push(SampleData.getRandomData());

    if (!successful) {
      showError('Unable to push. Probably no space.');
    } else {
      resetError();
    }

    modifyJson(DSInstance.getJson());
    setTopElement(null);
    setDeletedNode(null);
    setSize(DSInstance.size());
  };

  const popData = () => {
    const toReturn = DSInstance.pop();
    modifyJson(DSInstance.getJson());

    if (!toReturn) {
      showError('No elements available to delete!');
    } else {
      resetError();
    }
    
    setTopElement(null);
    setDeletedNode(toReturn || {});
    setSize(DSInstance.size());
  };

  const peekStack = () => {
    const elementToShow = DSInstance.peek()

    if (!elementToShow) {
      showError('No elements available to show!');
    } else {
      resetError();
    }

    setTopElement(elementToShow || {});
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
        { topElement && <SubDetails title="Top of the stack:" json={topElement} /> }
        { deletedNode && <SubDetails title="Deleted Element:" json={deletedNode} /> }
      </div>
    </div>
  );
}