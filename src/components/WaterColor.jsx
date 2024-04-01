import { useState, useEffect } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import ShapeButton from "./ShapeButton";
import { getRandomPalette } from "../lib/colorPalletes";
import * as brush from "p5.brush";

const WaterColor = () => {
  const [sketchCount, setSketchCount] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 900, height: 400 });

  const updateCanvasSize = () => {
    setCanvasSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, []);

  const sketch = (p5) => {
    // let palette = ["#002185", "#fcd300", "#ff2702", "#6b9404", "#000000"];
    let palette = getRandomPalette();

    let x_values = [];
    let y_values = [];
    let active_states = [];

    brush.instance(p5);

    p5.setup = () => {
      p5.createCanvas(canvasSize.width, canvasSize.height, p5.WEBGL);
      brush.load();

      for (let j = 0; j < 4; j++) {
        x_values[j] = [];
        y_values[j] = [];
        active_states[j] = [];
        for (let i = 0; i < 5; i++) {
          x_values[j][i] = p5.random(canvasSize.width);
          y_values[j][i] = p5.random(canvasSize.height);
          active_states[j][i] = false;
        }
      }
    };

    p5.draw = () => {
      p5.background("#fff");
      p5.translate(-canvasSize.width / 2, -canvasSize.height / 2);

      for (let j = 0; j < x_values.length; j++) {
        brush.fill(palette[j], 30);
        brush.bleed(0.2);
        brush.beginShape(0);
        brush.noStroke();
        for (let i = 0; i < x_values[j].length; i++) {
          brush.vertex(x_values[j][i], y_values[j][i]);
        }
        p5.randomSeed(12133);
        brush.endShape();
      }

      p5.noLoop();
    };
  };

  return (
    <>
      <div className="text-center">
        <ShapeButton
          shapeName={"watercolor"}
          handleClick={() => setSketchCount(sketchCount + 1)}
        />
      </div>
      <div className="-z-50 flex justify-center items-center flex-wrap absolute top-0 left-0 w-full">
        <ReactP5Wrapper sketch={sketch} />
      </div>
    </>
  );
};

export default WaterColor;
