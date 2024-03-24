import { useEffect, useRef } from "react";
import { getRandomPalette } from "../lib/colorPalletes";
import { useMediaQuery } from "@uidotdev/usehooks";
import ShapeButton from "./ShapeButton";

function rand(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

const Rectangles = () => {
  const canvasRef = useRef(null);
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)"
  );

  const draw = () => {
    const width = isSmallDevice ? 350 : isMediumDevice ? 600 : 900;
    const height = isSmallDevice ? 500 : isMediumDevice ? 300 : 400;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.canvas.width = width;
    ctx.canvas.height = height;

    let pallette = getRandomPalette();

    ctx.lineWidth = 2;
    ctx.fillStyle = "#fff";

    for (var i = 0; i < 1000; i++) {
      const startx = rand(-100, width + 100);
      const starty = rand(-100, height + 100);
      const rec_width = rand(width * 0.1, width * 0.025);
      const rec_height = rand(height * 0.1, width * 0.025);

      ctx.strokeStyle = pallette[Math.floor(Math.random() * pallette.length)];
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
        <ShapeButton
          shapeName={"rectangles"}
          handleClick={() => draw()}
        />
      </div>
      <div className="my-6 flex justify-center items-center flex-wrap">
        <canvas ref={canvasRef}></canvas>
      </div>
    </>
  );
};

export default Rectangles;
