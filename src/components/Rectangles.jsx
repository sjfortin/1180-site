import { useEffect, useRef } from "react";
import { colorPalletes } from "../lib/colorPalletes";

function rand(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

const Rectangles = () => {
  const canvasRef = useRef(null);

  const draw = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.canvas.width = width;
    ctx.canvas.height = height;

    // ctx.strokeStyle = "#000";
    let pallette =
      colorPalletes[Math.floor(Math.random() * colorPalletes.length)].colors;
    console.log(pallette);
    ctx.strokeStyle = pallette[Math.floor(Math.random() * pallette.length)];

    ctx.lineWidth = 2;
    ctx.fillStyle = "#fff";

    for (var i = 0; i < 1000; i++) {
      const startx = rand(-100, width + 100);
      const starty = rand(-100, height + 100);
      const rec_width = rand(width * 0.1, width * 0.2);
      const rec_height = rand(height * 0.1, width * 0.2);

      ctx.beginPath();
      ctx.fillRect(startx, starty, rec_width, rec_height);

      ctx.moveTo(startx, starty);
      ctx.lineTo(startx + rec_width, starty);
      ctx.lineTo(startx + rec_width, starty + rec_height);
      ctx.lineTo(startx, starty + rec_height);
      ctx.lineTo(startx, starty);
      ctx.stroke();
    }
  };

  useEffect(() => {
    window.addEventListener("resize", draw);
    draw();

    // Cleanup function
    return () => {
      window.removeEventListener("resize", draw);
    };
  }, []);

  return (
    <>
      <div className="text-center">
        <button
          className="justify-center tracking-widest text-xl text-gray-400 hover:text-gray-900 px-4 py-1 border-dotted border-2 border-gray-400 hover:border-gray-900 text"
          onClick={draw}
        >
          rectangles
        </button>
      </div>
      <div className="my-6 flex justify-center items-center flex-wrap">
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
    
  );
};

export default Rectangles;
