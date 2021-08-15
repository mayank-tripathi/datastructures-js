import * as d3 from "d3";
import { createRef, useCallback, useEffect, useLayoutEffect, useState } from "react";

const tree = (data, width) => {
  const root = d3.hierarchy(data);
  root.dx = 80;
  root.dy = width / (root.height + 1);
  return d3.tree().nodeSize([root.dx, root.dy])(root);
};

const createTree = (data, width) => {
  const root = tree(data, width);

  let x0 = Infinity;
  let x1 = -x0;
  root.each((d) => {
    if (d.x > x1) x1 = d.x;
    if (d.x < x0) x0 = d.x;
  });

  const svg = d3
    .create("svg")
    .attr("viewBox", [0, 0, width, x1 - x0 + root.dx * 2]);

  const g = svg
    .append("g")
    .attr("font-size", '1.5em')
    .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

  g.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.5)
    .attr("stroke-width", 2)
    .selectAll("path")
    .data(root.links())
    .join("path")
    .attr(
      "d",
      d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x)
    );

  const node = g
    .append("g")
    .attr("stroke-linejoin", "round")
    .attr("stroke-width", 2)
    .selectAll("g")
    .data(root.descendants())
    .join("g")
    .attr("transform", (d) => `translate(${d.y},${d.x})`);

  node
    .append("circle")
    .attr("fill", (d) => (d.children ? "#555" : "#999"))
    .attr("r", 10)
    .text(function (d) {
      const context = d.data.value;
      this.dataset.context = JSON.stringify(context);
      return "";
    });

  node
    .append("text")
    .attr("class", "node-name")
    .attr("dy", "0.31em")
    .attr("x", (d) => (d.children ? -18 : 18))
    .attr("text-anchor", (d) => (d.children ? "end" : "start"))
    .text(function (d) {
      const context = d.data.value;
      this.dataset.context = JSON.stringify(context);
      return d.data.name;
    })
    .clone(true)
    .lower()
    .attr("stroke", "white")
    .attr("stroke-width", 3);

  return svg.node();
};

const copyToClipboard = async (text) => {
  const clipboardPermission = await navigator.permissions.query({ name: 'clipboard-write' });

  if (clipboardPermission.state === 'granted' || clipboardPermission.state === 'prompt') {
    return navigator.clipboard.writeText(text);
  }

  return Promise.reject('Clipboard permissions not granted.');
};

const showTooltip = function (d) {
  d.stopPropagation();

  const nodeData = JSON.parse(this.dataset.context);

  d3.select("#tooltip")
    .style("left", d.pageX + 15 + "px")
    .style("right", "auto")
    .style("top", d.pageY + 15 + "px")
    .style("opacity", 1)
    .html(
      `<pre>${JSON.stringify( nodeData || {}, null,"   ")}</pre>`
    );

  copyToClipboard(nodeData.id)
    .then(value => {
      console.log(value);
    })
    .catch(err => {
      console.error(err);
    });
};

export const TreeGraph = ({ treeData }) => {
  const [treeDiagram, setTreeDiagram] = useState({ __html: "" });
  const [width, setWidth] = useState(window.innerWidth);
  const tooltipRef = createRef();

  const hideTooltip = useCallback(() => {
    tooltipRef.current.style = "opacity: 0";
  }, [tooltipRef]);

  const functionHandler = function () {
    const w = this.innerWidth;
    setWidth(w);
  };

  useEffect(() => {
    window.addEventListener("resize", functionHandler);
    return () => {
      window.removeEventListener("resize", functionHandler);
    };
  }, []);

  useLayoutEffect(() => {
    const diagram = createTree(treeData, width);

    setTreeDiagram({
      __html: diagram.outerHTML
    });
  }, [width, treeData]);

  useLayoutEffect(() => {
    d3.selectAll("circle").on("click", showTooltip);
    d3.selectAll(".node-name").on("click", showTooltip);

    hideTooltip();
  }, [treeDiagram, hideTooltip]);

  return (
    <>
      <div
        id="graphContainer"
        className="graphContainer"
        onClick={hideTooltip}
        dangerouslySetInnerHTML={treeDiagram}
      />
      <div id="tooltip" ref={tooltipRef} className="tooltip"></div>
    </>
  );
};
