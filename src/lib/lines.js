// Utility function to create lines
export function createLines(numLines, radius) {
  let lines = [];

  for (let i = 0; i < numLines; ++i) {
    const dir = Math.random() * (2 * Math.PI);
    let x = 1,
      y = 1;

    while (x * x + y * y > 1) {
      x = 2 * Math.random() - 1;
      y = 2 * Math.random() - 1;
    }

    x *= radius;
    y *= radius;

    lines.push({
      x: x,
      y: y,
      dir: dir,
    });
  }

  return lines;
}

// Utility function to draw straight lines
export function drawLines(lines, center, ctx, colorPalette) {
  lines.forEach((line) => {
    ctx.beginPath();
    ctx.moveTo(center.x + line.x, center.y + line.y);
    ctx.lineTo(
      center.x + line.x + 3 * Math.cos(line.dir),
      center.y + line.y + 3 * Math.sin(line.dir)
    );
    ctx.strokeStyle = colorPalette;
    ctx.stroke();
    ctx.closePath();
  });
}

// Utility function to draw non-straight lines
export function drawNonStraightLines(lines, center, ctx, colorPalette) {
  lines.forEach((line) => {
    ctx.beginPath();
    ctx.moveTo(center.x + line.x, center.y + line.y);

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
}
