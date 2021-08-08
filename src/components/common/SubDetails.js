import Highlight from "react-highlight";
export const SubDetails = ({json, title}) => {
  return (
    <div className="col-12 mt-3">
      <strong>{ title }</strong>
      <Highlight className="language-javascript mt-3">
        { JSON.stringify(json, null, '   ') }
      </Highlight>
    </div>
  );
}