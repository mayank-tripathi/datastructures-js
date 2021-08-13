import * as d3 from "d3";
import { createRef, useEffect, useLayoutEffect, useState } from "react";

const tree = (data, width) => {
  const root = d3.hierarchy(data);
  root.dx = 30;
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
    .attr("font-family", "sans-serif")
    .attr("font-size", 14)
    .attr("transform", `translate(${root.dy / 3},${root.dx - x0})`);

  g.append("g")
    .attr("fill", "none")
    .attr("stroke", "#555")
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", 1.5)
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
      const context = {
        name: d.data.name,
        value: d.data.value
      };
      this.dataset.context = JSON.stringify(context);
      return "";
    });

  node
    .append("text")
    .attr("dy", "0.31em")
    .attr("x", (d) => (d.children ? -15 : 15))
    .attr("text-anchor", (d) => (d.children ? "end" : "start"))
    .text((d) => d.data.name)
    .clone(true)
    .lower()
    .attr("stroke", "white");

  return svg.node();
};

export const TreeGraph = ({ treeData }) => {
  const [data] = useState(treeData);
  const [treeDiagram, setTreeDiagram] = useState({ __html: "" });
  const [width, setWidth] = useState(window.innerWidth);
  const tooltipRef = createRef();

  const hideTooltip = () => {
    tooltipRef.current.style = "opacity: 0";
  };

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
    const diagram = createTree(data, width);

    setTreeDiagram({
      __html: diagram.outerHTML
    });
  }, [data, width]);

  useLayoutEffect(() => {
    d3.selectAll("circle").on("click", function (d) {
      d.stopPropagation();

      d3.select("#tooltip")
        .style("left", d.pageX + 15 + "px")
        .style("top", d.pageY + "px")
        .style("opacity", 1)
        .html(
          `<pre>${JSON.stringify(
            JSON.parse(this.dataset.context) || {},
            null,
            "   "
          )}</pre>`
        );
    });
  }, [treeDiagram]);

  return (
    <>
      <div
        id="graphContainer"
        onClick={hideTooltip}
        dangerouslySetInnerHTML={treeDiagram}
      />
      <div id="tooltip" ref={tooltipRef} className="tooltip"></div>
    </>
  );
};
