import { useEffect, useRef, useState } from "react";
import { colorPalletes } from "../lib/colorPalletes";

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
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;

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

    // Cleanup function to remove event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty array makes this effect run only on mount and unmount

  return (
    <>
      <div className="text-center">
        <button
          className="justify-center tracking-widest text-xl text-gray-400 hover:text-gray-900 px-4 py-1 border-dotted border-2 border-gray-400 hover:border-gray-900 text"
          onClick={drawLines}
        >
          lines
        </button>
      </div>
      <div className="my-6 flex justify-center items-center flex-wrap">
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}

export default Lines;
