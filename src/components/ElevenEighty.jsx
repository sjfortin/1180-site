import { useEffect, useState } from "react";
import { create } from "d3";
import useWindowSize from "../hooks/useWindowSize";

const ElevenEighty = () => {
  const [svgString, setSvgString] = useState("");
  const [imageNumber, setImageNumber] = useState(1);
  const windowSize = useWindowSize();

  useEffect(() => {
    const svg = create("svg");

    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.8;

    svg.attr("width", width);
    svg.attr("height", height);

    const center = {
      x: width / 2,
      y: height / 2,
    };

    // circle
    const radius = Math.min(width, height) / 2;

    svg
      .selectAll("circle")
      .data([
        {
          cx: center.x,
          cy: center.y,
          r: radius,
        },
      ])
      .enter()
      .append("circle")
      .attr("cx", (c) => c.cx)
      .attr("cy", (c) => c.cy)
      .attr("r", (c) => c.r)
      .attr("fill", "white");

    // straight lines
    const slines = [];
    for (var i = 0; i < 1000; ++i) {
      const dir = Math.random() * (2 * Math.PI);

      let x = 1,
        y = 1;
      while (x * x + y * y > 1) {
        x = 2 * Math.random() - 1;
        y = 2 * Math.random() - 1;
      }

      x *= radius;
      y *= radius;

      slines.push({
        x: x,
        y: y,
        dir: dir,
      });
    }

    svg
      .selectAll("line")
      .data(slines)
      .enter()
      .append("line")
      .attr("x1", (line) => center.x + line.x)
      .attr("y1", (line) => center.y + line.y)
      .attr("x2", (line) => center.x + line.x + 3 * Math.cos(line.dir))
      .attr("y2", (line) => center.y + line.y + 3 * Math.sin(line.dir))
      .attr("stroke", "#282828");

    // non straight lines
    const nslines = [];
    for (var i = 0; i < 10000; ++i) {
      const dir = Math.random() * (2 * Math.PI);

      let x = 1,
        y = 1;
      while (x * x + y * y > 1) {
        x = 2 * Math.random() - 1;
        y = 2 * Math.random() - 1;
      }

      x *= radius;
      y *= radius;

      nslines.push({
        x: x,
        y: y,
        dir: dir,
      });
    }

    svg
      .selectAll("path")
      .data(nslines)
      .enter()
      .append("path")
      .attr("d", (line) => {
        let commands = [
          "M " + (center.x + line.x) + "," + (center.y + line.y),
          Math.random() > 0.5 ? "l 0,3" : "l 3,0",
          Math.random() > 0.5 ? "l 0,3" : "l 3,0",
        ];

        return commands.join("\n");
      })
      .attr("fill", "none")
      .attr("stroke", "#282828");

    setSvgString(svg.node().outerHTML);
  }, [windowSize, imageNumber]);

  return (
    <div
      onClick={() => setImageNumber(imageNumber + 1)}
      className="flex justify-center"
      dangerouslySetInnerHTML={{ __html: svgString }}
    />
  );
};

export default ElevenEighty;
