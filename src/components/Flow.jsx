import { useState } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { colorPalletes } from "../lib/colorPalletes";

const Flow = () => {
  const [sketchCount, setSketchCount] = useState(0);

  const sketch = (p5) => {
    let inc = p5.random(0.01, 0.09);
    let scl = p5.random(5, 15);
    let cols, rows;
    let zoff = p5.random(1, 5);
    let fr;
    let flowfield;

    let pallette =
      colorPalletes[Math.floor(Math.random() * colorPalletes.length)].colors;

    p5.setup = () => {
      p5.createCanvas(900, 400);
      cols = p5.floor(p5.width / scl);
      rows = p5.floor(p5.height / scl);
      fr = p5.createP("");
      flowfield = new Array(cols * rows);
    };

    p5.draw = () => {
      let yoff = 0;

      for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
          const index = x + y * cols;
          const angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI * 4;
          const v = p5.createVector(p5.cos(angle), p5.sin(angle));
          v.setMag(1);
          flowfield[index] = v;
          xoff += inc;
          p5.stroke(pallette[Math.floor(Math.random() * pallette.length)]);
          p5.strokeWeight(p5.random(1,2));
          p5.push();
          p5.translate(x * scl, y * scl);
          p5.rotate(v.heading());
          p5.line(0, 0, scl, 0);
          p5.pop();
        }
        yoff += inc;
        zoff += 0.0002;
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
          flow
        </button>
      </div>
      <div className="my-6 flex justify-center items-center flex-wrap">
        <ReactP5Wrapper sketch={sketch} />
      </div>
    </>
  );
};

export default Flow;
