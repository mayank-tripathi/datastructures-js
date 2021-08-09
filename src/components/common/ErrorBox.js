import { useContext } from "react";
import { GlobalContext } from "../../store/global-store";

export const ErrorBox = () => {
  const { error, hideError } = useContext(GlobalContext);

  const closeError = () => {
    hideError();
  }

  return (
    <>
      {
        error && 
        <div className="row">
          <div className="p-3 d-flex justify-content-between align-items-center bg-danger text-white">
            <span> { error } </span>
            <button type="button" onClick={closeError} className="btn btn-light">Close</button>
          </div>
        </div>
      }
    </>
  );
};