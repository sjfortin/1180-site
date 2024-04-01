import { useEffect, useRef } from "react";
import { getRandomPalette } from "../lib/colorPalletes";
import ShapeButton from "./ShapeButton";

function rand(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

const Rectangles = () => {
  const canvasRef = useRef(null);

  const draw = () => {

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let pallette = getRandomPalette();

    context.lineWidth = 4;
    context.fillStyle = "#fff";

    for (var i = 0; i < 1000; i++) {
      const startx = rand(-100, canvas.width + 100);
      const starty = rand(-100, canvas.height + 100);
      const rec_width = rand(canvas.width * 0.1, canvas.width * 0.025);
      const rec_height = rand(canvas.height * 0.1, canvas.height * 0.025);

      context.strokeStyle =
        pallette[Math.floor(Math.random() * pallette.length)];
      context.beginPath();
      context.fillRect(startx, starty, rec_width, rec_height);

      context.moveTo(startx, starty);
      context.lineTo(startx + rec_width, starty);
      context.lineTo(startx + rec_width, starty + rec_height);
      context.lineTo(startx, starty + rec_height);
      context.lineTo(startx, starty);
      context.stroke();
    }
  };

  useEffect(() => {
    draw(); // Draw when the component mounts

    const handleResize = () => draw();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="text-center">
        <ShapeButton shapeName={"rectangles"} handleClick={draw} />
      </div>
      <div className="-z-50 flex justify-center items-center flex-wrap absolute top-0 left-0 w-full">
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
};

export default Rectangles;
