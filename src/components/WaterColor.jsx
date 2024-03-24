import { useState, useEffect } from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import { useMediaQuery } from "@uidotdev/usehooks";
import ShapeButton from "./ShapeButton";
import * as brush from "p5.brush";

const WaterColor = () => {
  const [sketchCount, setSketchCount] = useState(0); // Used to refresh the sketch
  const isSmallDevice = useMediaQuery("(max-width: 768px)");
  const isMediumDevice = useMediaQuery(
    "(min-width: 769px) and (max-width: 992px)"
  );

  // Calculate width and height based on device size
  const width = isSmallDevice ? 300 : isMediumDevice ? 400 : 800;
  const height = isSmallDevice ? 300 : isMediumDevice ? 400 : 400;

  const sketch = (p5) => {
    let palette = ["#002185", "#fcd300", "#ff2702", "#6b9404", "#000000"];

    let x_values = [];
    let y_values = [];
    let active_states = [];

    brush.instance(p5);

    p5.setup = () => {
      p5.createCanvas(width, height, p5.WEBGL);

      for (let j = 0; j < 4; j++) {
        x_values[j] = [];
        y_values[j] = [];
        active_states[j] = [];
        for (let i = 0; i < 10; i++) {
          x_values[j][i] = p5.random(width);
          y_values[j][i] = p5.random(height);
          active_states[j][i] = false;
        }
      }
      brush.load();
    };

    p5.draw = () => {
      p5.background("#fff");
      p5.translate(-width / 2, -height / 2);

      for (let j = 0; j < x_values.length; j++) {
        brush.fill(palette[j], 70);
        brush.bleed(0.2);
        brush.beginShape(0.9);
        brush.noStroke();
        for (let i = 0; i < x_values[j].length; i++) {
          brush.vertex(x_values[j][i], y_values[j][i]);
        }
        brush.endShape();
      }

      p5.noLoop();
    };
  };

  // Refresh the sketch on device size change
  useEffect(() => {
    setSketchCount((prevCount) => prevCount + 1);
  }, [isSmallDevice, isMediumDevice]);

  return (
    <>
      <div className="text-center">
        <ShapeButton
          shapeName={"watercolor"}
          handleClick={() => setSketchCount(sketchCount + 1)}
        />
      </div>
      <div className="my-6 flex justify-center items-center flex-wrap">
        <ReactP5Wrapper sketch={sketch} />
      </div>
    </>
  );
};

export default WaterColor;
