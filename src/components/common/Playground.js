import { useEffect, useState } from 'react';
import { DS_MAP } from './dsList';

import 'highlight.js/styles/stackoverflow-light.css'
import '../styles.css';
import { CodeVisualizer } from './CodeVisualizer';

const getDSList = (data) => Object.keys(data).map(key => <option key={key} value={key}>{data[key].display}</option>);

const getDSComponent = (d, setJson) => {
  const { Component, DSInstance, title } = DS_MAP[d];

  return <Component modifyJson={setJson} DSInstance={ DSInstance} title={ title } />;
}

export const Playground = () => {
  const [json, setJson] = useState(JSON.stringify({}, null, '\t'));
  const [ds, setDs] = useState('0');
  const [dsComponent, setDSComponent] = useState(getDSComponent(ds, setJson));
  const [visualizer, setVisualizer] = useState('');

  useEffect(() => {
    setDSComponent(getDSComponent(ds, setJson));
    setVisualizer(DS_MAP[ds].visualizer);
  }, [ds])

  const changeDs = (e) => {
    setDs(e.target.value);
  };

  return (
    <div className="row">
      <div className="col-7 p-0 codeContainer">
        <CodeVisualizer visualizer={visualizer} data={json} />
      </div>
      <div className="col-5 mt-3">
        <h1>Data Structures Playground</h1>
        <p>Please start by selecting a Data Structure below:</p>
        <div className="col-12 my-4">
          <select className="form-select" aria-label="Select DS" defaultValue={ds} onClick={changeDs}>
            { getDSList(DS_MAP) }
          </select>
        </div>
        <div className="col-12">
          { dsComponent }
        </div>
      </div>
    </div>
  );
}