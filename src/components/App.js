import { useEffect, useState } from 'react';
import Highlight from 'react-highlight'
import { DS_MAP } from './common/dsList';

import 'highlight.js/styles/stackoverflow-light.css'
import './styles.css';

const getDSList = (data) => Object.keys(data).map(key => <option key={key} value={key}>{data[key].display}</option>);

const getDSComponent = (d, setJson) => {
  const { Component, DSInstance, title } = DS_MAP[d];

  return <Component modifyJson={setJson} DSInstance={ DSInstance} title={ title } />;
}

const App = () => {
  const [json, setJson] = useState(JSON.stringify({}, null, '\t'));
  const [ds, setDs] = useState('0');
  const [dsComponent, setDSComponent] = useState(getDSComponent(ds, setJson));

  useEffect(() => {
    setDSComponent(getDSComponent(ds, setJson));
  }, [ds])

  const changeDs = (e) => {
    setDs(e.target.value);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-7 p-0 codeContainer">
          <Highlight className="language-javascript">
            { json }
          </Highlight>
        </div>
        <div className="col-5">
          <div className="col-12 my-3">
            <select className="form-select" aria-label="Select DS" defaultValue={ds} onClick={changeDs}>
              { getDSList(DS_MAP) }
            </select>
          </div>
          <div className="col-12">
            { dsComponent }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;