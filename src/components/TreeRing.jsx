// https://www.gorillasun.de/blog/radial-perlin-noise-and-generative-tree-rings/
import { useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

const TreeRing = () => {
  const [sketchCount, setSketchCount] = useState(0);

  const sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(500, 500);
      p5.background(255);
      p5.stroke(20);
      p5.strokeWeight(1);
      p5.noFill();
    };

    let scale = p5.random(10, 90);
    let resolution = 0.002;
    let numPoints = 500;

    let radius = 200;
    let numRings = p5.random(5, 40);

    p5.draw = () => {
      for (var r = 0; r < radius; r += radius / numRings) {
        p5.beginShape();

        for (
          var a = -p5.TAU / numPoints;
          a < p5.TAU + p5.TAU / numPoints;
          a += p5.TAU / numPoints
        ) {
          var x = p5.width / 2 + r * p5.cos(a);
          var y = p5.height / 2 + r * p5.sin(a);

          var n = p5.map(
            p5.noise(x * resolution, y * resolution),
            0,
            1,
            -scale,
            scale
          );

          p5.curveVertex(x + n, y + n);

          if (p5.random() > 0.75 - 0.25 * p5.sin(r)) {
            p5.endShape();
            p5.beginShape();
          }
        }
        p5.endShape();
      }
      p5.noLoop();
    };
  };

  return (
    <>
      <div className="text-center">
        <button
          className="justify-center tracking-widest text-xl text-gray-400 hover:text-gray-900 px-4 py-1 border-dotted border-2 border-gray-400 hover:border-gray-900 text"
          onClick={() => setSketchCount(sketchCount + 1)}
        >
          tree ring
        </button>
      </div>
      <div className="my-6 flex justify-center items-center flex-wrap">
        <ReactP5Wrapper sketch={sketch} />
      </div>
    </>
  );
};

export default TreeRing;