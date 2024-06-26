// Shout outs:
// https://github.com/wholepixel/solving-sol/tree/master/797/y-a-v-a
// http://cs.nyu.edu/~perlin/noise/
// http://jsfiddle.net/aVSX7/light/
import { useEffect, useRef } from "react";
import ShapeButton from "./ShapeButton";

const PerlinNoise = new (function () {
  this.noise = function (x, y, z) {
    var p = new Array(512);
    var permutation = [
      151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225,
      140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247,
      120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177,
      33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165,
      71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211,
      133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25,
      63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196,
      135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217,
      226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206,
      59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248,
      152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22,
      39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218,
      246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241,
      81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157,
      184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93,
      222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180,
    ];

    for (var i = 0; i < 256; i++) {
      p[256 + i] = p[i] = permutation[i];
    }

    var X = Math.floor(x) & 255, // FIND UNIT CUBE THAT
      Y = Math.floor(y) & 255, // CONTAINS POINT.
      Z = Math.floor(z) & 255;

    x -= Math.floor(x); // FIND RELATIVE X,Y,Z
    y -= Math.floor(y); // OF POINT IN CUBE.
    z -= Math.floor(z);
    var u = fade(x), // COMPUTE FADE CURVES
      v = fade(y), // FOR EACH OF X,Y,Z.
      w = fade(z);
    var A = p[X] + Y,
      AA = p[A] + Z,
      AB = p[A + 1] + Z, // HASH COORDINATES OF
      B = p[X + 1] + Y,
      BA = p[B] + Z,
      BB = p[B + 1] + Z; // THE 8 CUBE CORNERS,

    return scale(
      lerp(
        w,
        lerp(
          v,
          lerp(
            u,
            grad(p[AA], x, y, z), // AND ADD
            grad(p[BA], x - 1, y, z)
          ), // BLENDED
          lerp(
            u,
            grad(p[AB], x, y - 1, z), // RESULTS
            grad(p[BB], x - 1, y - 1, z)
          )
        ), // FROM  8
        lerp(
          v,
          lerp(
            u,
            grad(p[AA + 1], x, y, z - 1), // CORNERS
            grad(p[BA + 1], x - 1, y, z - 1)
          ), // OF CUBE
          lerp(
            u,
            grad(p[AB + 1], x, y - 1, z - 1),
            grad(p[BB + 1], x - 1, y - 1, z - 1)
          )
        )
      )
    );
  };

  function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function lerp(t, a, b) {
    return a + t * (b - a);
  }

  function grad(hash, x, y, z) {
    var h = hash & 15; // CONVERT LO 4 BITS OF HASH CODE
    var u = h < 8 ? x : y, // INTO 12 GRADIENT DIRECTIONS.
      v = h < 4 ? y : h == 12 || h == 14 ? x : z;
    return ((h & 1) == 0 ? u : -u) + ((h & 2) == 0 ? v : -v);
  }

  function scale(n) {
    return (1 + n) / 2;
  }
})();

function Waves() {
  const canvasRef = useRef(null);

  const waveChange = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = 400;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.lineWidth = 4;
    var marginX = 0;
    var marginY = 40;
    var stepX = 4;
    var stepY = 8;
    var maxX = (canvas.width - 2 * marginX) / stepX;
    var maxY = (canvas.height - 2 * marginY) / stepY;
    var colors = ["#1A6DED", "#2C7CE6", "#145CBF"];

    var noise;
    var pointCacheX = [];
    var pointCacheY = [];

    var x = marginX;
    var y = marginY;

    var sequence = 0;
    for (var indexY = 0; indexY < maxY; indexY++) {
      context.strokeStyle = sequence === 0 ? "#2C7CE6" : colors[sequence % 3];

      context.moveTo(0, y);
      context.beginPath();

      for (var index = 0; index < maxX; index++) {
        noise = PerlinNoise.noise(Math.random(), Math.random(), Math.random());
        noise = noise * 2 - 1;

        if (sequence === 0) {
          x = x + stepX;
          y =
            y +
            Math.sin(x * Math.PI * 0.01 * noise) +
            Math.sin(x * Math.PI * (0.016 / noise)) +
            Math.sin(x * Math.PI * 0.0469 * noise);
        } else {
          x = pointCacheX[index];
          y = pointCacheY[index];
        }
        pointCacheX[index] = x + noise;
        pointCacheY[index] = y + stepY + noise;

        context.lineTo(pointCacheX[index], pointCacheY[index]);
      }

      context.stroke();

      sequence++;
    }
  };

  useEffect(() => {
    waveChange();
  }, []);

  return (
    <>
      <div className="text-center">
        <ShapeButton shapeName={"waves"} handleClick={waveChange} />
      </div>
      <div className="my-6 flex justify-center items-center flex-wrap">
        <canvas ref={canvasRef} />
      </div>
    </>
  );
}

export default Waves;
