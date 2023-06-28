import { useEffect, useState, createRef } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { colors } from "../lib/colors";
import { createLines, drawLines, drawNonStraightLines } from "../lib/lines";

const Circle = () => {
  const [canvasRefs, setCanvasRefs] = useState([createRef()]);
  const windowSize = useWindowSize();

  useEffect(() => {
    canvasRefs.forEach((canvasRef) => {
      // Extract the canvas reference and its context.
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      let min = 400;
      let max = 400;
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
      const straightLines = createLines(10000, radius);
      drawLines(
        straightLines,
        center,
        ctx,
        colors[Math.floor(Math.random() * colors.length)].colors
      );

      // Draw the non-straight lines.
      const nonStraightLines = createLines(10000, radius);

      drawNonStraightLines(
        nonStraightLines,
        center,
        ctx,
        colors[Math.floor(Math.random() * colors.length)].colors
      );
    });
  }, [windowSize, canvasRefs]);

  const addCanvas = () => {
    setCanvasRefs((refs) => [...refs, createRef()]);
  };

  return (
    <>
      <div className="text-center">
        <button
          className="justify-center tracking-widest text-2xl text-gray-400 hover:text-gray-900"
          onClick={addCanvas}
        >
          circle
        </button>
      </div>
      <div className="my-6 flex justify-center items-center flex-wrap">
        {canvasRefs.map((ref, index) => {
          return (
            <div key={index} className="m-3">
              <canvas ref={ref} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Circle;
