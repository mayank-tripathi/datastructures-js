import { useContext, useEffect, useState } from "react";
import { SubDetails } from "../common/SubDetails";
import { SampleData } from '../../ds-utils/common/sampleData';
import { GlobalContext } from "../../store/global-store";

export const DoubleEndedQueue = ({ modifyJson, DSInstance, title }) => {
  const [topElement, setTopElement] = useState(null);
  const [deletedNode, setDeletedNode] = useState(null);
  const [size, setSize] = useState(0);
  const { showError, hideError, error } = useContext(GlobalContext)

  useEffect(() => {
    setSize(DSInstance.size());
    modifyJson(DSInstance.getJson());
    setTopElement(null);
    setDeletedNode(null);
    setSize(0);
    hideError();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [DSInstance]);

  const resetError = () => {
    if (null !== error) {
      hideError();
    }
  };

  const pushDataAtTail = () => {
    const successful = DSInstance.pushAtRear(SampleData.getRandomData());

    if (!successful) {
      showError('Unable to push. No space at Tail end.');
    } else {
      resetError();
    }

    modifyJson(DSInstance.getJson());
    setTopElement(null);
    setDeletedNode(null);
    setSize(DSInstance.size());
  };

  const pushDataAtFront = () => {
    const successful = DSInstance.pushAtFront(SampleData.getRandomData());

    if (!successful) {
      showError('Unable to push. No space at Front end.');
    } else {
      resetError();
    }

    modifyJson(DSInstance.getJson());
    setTopElement(null);
    setDeletedNode(null);
    setSize(DSInstance.size());
  };

  const popDataAtTail = () => {
    const toReturn = DSInstance.popAtRear();

    if (!toReturn) {
      showError('Empty queue. Unable to delete.');
    } else {
      resetError();
    }

    modifyJson(DSInstance.getJson());
    setTopElement(null);
    setDeletedNode(toReturn);
    setSize(DSInstance.size());
  };

  const popDataAtFront = () => {
    const toReturn = DSInstance.popAtFront();

    if (!toReturn) {
      showError('Empty queue. Unable to delete.');
    } else {
      resetError();
    }

    modifyJson(DSInstance.getJson());
    setTopElement(null);
    setDeletedNode(toReturn);
    setSize(DSInstance.size());
  };

  const peekFront = () => {
    const elementToShow = DSInstance.peekFront()

    if (!elementToShow) {
      showError('Empty queue. Unable to peek at Front.');
    } else {
      resetError();
    }

    setTopElement(elementToShow || {});
    setDeletedNode(null);
  };

  const peekTail = () => {
    const elementToShow = DSInstance.peekRear();

    if (!elementToShow) {
      showError('Empty queue. Unable to peek at Tail.');
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
        { topElement && <SubDetails title="Top of the stack:" json={topElement} /> }
        { deletedNode && <SubDetails title="Deleted Element:" json={deletedNode} /> }
      </div>
    </div>
  );
}