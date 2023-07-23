import { useEffect, useState, createRef } from "react";
import { colorPalletes } from "../lib/colorPalletes";
import { createLines, drawLines, drawNonStraightLines } from "../lib/lines";
import ShapeButton from "./ShapeButton";
import { useMediaQuery } from "@uidotdev/usehooks";

const Circle = () => {
  const [canvasRef, setCanvasRef] = useState(createRef());
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let min = isSmallDevice ? 350 : 500;
    let max = isSmallDevice ? 350 : 500;
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    const width = randomNum;
    const height = randomNum;

    canvas.width = width;
    canvas.height = height;

    // Define the center of the canvas.
    const center = {
      x: width / 2,
      y: height / 2,
    };

    // Define the circle radius as half the minimum between width and height.
    const radius = Math.min(width, height) / 2;

    // Draw the circle.
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    // Draw the straight lines.
    const straightLines = createLines(3333, radius);
    drawLines(
      straightLines,
      center,
      ctx,
      colorPalletes[Math.floor(Math.random() * colorPalletes.length)].colors
    );

    // Draw the non-straight lines.
    const nonStraightLines = createLines(3333, radius);

    drawNonStraightLines(
      nonStraightLines,
      center,
      ctx,
      colorPalletes[Math.floor(Math.random() * colorPalletes.length)].colors
    );
  }, [canvasRef]);

  const addCanvas = () => {
    setCanvasRef(createRef());
  };

  return (
    <>
      <div className="text-center">
        <ShapeButton shapeName={"circle"} handleClick={addCanvas} />
      </div>
      <div className="my-6 flex justify-center items-center flex-wrap">
        <canvas ref={canvasRef} />
      </div>
    </>
  );
};

export default Circle;
