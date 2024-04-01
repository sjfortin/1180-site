import { useEffect, useRef, useState } from "react";
import { colorPalletes } from "../lib/colorPalletes";
import ShapeButton from "./ShapeButton";

function Lines() {
  const canvasRef = useRef(null);
  const [colorPallete, setColorPallete] = useState(
    colorPalletes[Math.floor(Math.random() * colorPalletes.length)].colors
  );

  const drawLines = () => {
    setColorPallete(
      colorPalletes[Math.floor(Math.random() * colorPalletes.length)].colors
    );

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);

    let x = 0;
    while (x < canvas.width) {
      context.beginPath();
      context.lineWidth = Math.floor(Math.random() * 3) + 1; // random width from 1 to 15
      context.strokeStyle =
        colorPallete[Math.floor(Math.random() * colorPallete.length)];
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      context.stroke();
      x += context.lineWidth; // increment x by line width to start a new line
    }
  };

  useEffect(() => {
    drawLines();

    const handleResize = () => {
      drawLines();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="text-center">
        <ShapeButton shapeName={"lines"} handleClick={drawLines} />
      </div>
      <div className="-z-50 flex justify-center items-center flex-wrap absolute top-0 left-0 w-full">
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}

export default Lines;
