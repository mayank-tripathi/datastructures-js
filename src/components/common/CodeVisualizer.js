import Highlight from "react-highlight";
import { TreeGraph } from "./TreeGraph";

export const CodeVisualizer = ({ visualizer, data }) => {
  return (
    <>
    { (visualizer === 'CODE' || visualizer === '') &&
      <Highlight className="language-javascript">
        { data }
      </Highlight>
    }

    { visualizer === 'GRAPH' &&
      <TreeGraph treeData={ data } />
    }

    { !visualizer && '' }
  </>
  )
};