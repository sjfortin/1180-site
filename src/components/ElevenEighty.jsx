import { useEffect, useRef, useState } from "react";
import useWindowSize from "../hooks/useWindowSize";
import { colors } from "../lib/colors";

const ElevenEighty = () => {
  const canvasRef = useRef(null);
  const [imageNumber, setImageNumber] = useState(1);
  const [colorPalette, setColorPalette] = useState(
    colors[Math.floor(Math.random() * colors.length)].colors
  );
  const windowSize = useWindowSize();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const width = window.innerWidth * 0.8;
    const height = window.innerHeight * 0.8;

    canvas.width = width;
    canvas.height = height;

    const center = {
      x: width / 2,
      y: height / 2,
    };

    // circle
    const radius = Math.min(width, height) / 2;

    ctx.beginPath();
    ctx.arc(center.x, center.y, radius, 0, Math.PI * 2, true);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();

    // straight lines
    const slines = [];
    for (var i = 0; i < 10000; ++i) {
      const dir = Math.random() * (2 * Math.PI);

      let x = 1,
        y = 1;
      while (x * x + y * y > 1) {
        x = 2 * Math.random() - 1;
        y = 2 * Math.random() - 1;
      }

      x *= radius;
      y *= radius;

      slines.push({
        x: x,
        y: y,
        dir: dir,
      });
    }

    slines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(center.x + line.x, center.y + line.y);
      ctx.lineTo(
        center.x + line.x + 3 * Math.cos(line.dir),
        center.y + line.y + 3 * Math.sin(line.dir)
      );
      ctx.strokeStyle =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];
      ctx.stroke();
      ctx.closePath();
    });

    // non straight lines
    const nslines = [];
    for (var i = 0; i < 10000; ++i) {
      const dir = Math.random() * (2 * Math.PI);

      let x = 1,
        y = 1;
      while (x * x + y * y > 1) {
        x = 2 * Math.random() - 1;
        y = 2 * Math.random() - 1;
      }

      x *= radius;
      y *= radius;

      nslines.push({
        x: x,
        y: y,
        dir: dir,
      });
    }

    nslines.forEach((line) => {
      ctx.beginPath();
      ctx.moveTo(center.x + line.x, center.y + line.y);

      if (Math.random() > 0.5) {
        ctx.lineTo(center.x + line.x, center.y + line.y + 8);
      } else {
        ctx.lineTo(center.x + line.x + 8, center.y + line.y);
      }

      if (Math.random() > 0.5) {
        ctx.lineTo(center.x + line.x, center.y + line.y + 8);
      } else {
        ctx.lineTo(center.x + line.x + 8, center.y + line.y);
      }

      ctx.strokeStyle =
        colorPalette[Math.floor(Math.random() * colorPalette.length)];
      ctx.stroke();
      ctx.closePath();
    });
  }, [windowSize, imageNumber, colorPalette]);

  useEffect(() => {
    setColorPalette(colors[Math.floor(Math.random() * colors.length)].colors);
  }, [windowSize, imageNumber]);

  return (
    <div
      onClick={() => setImageNumber(imageNumber + 1)}
      className="flex justify-center"
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ElevenEighty;
