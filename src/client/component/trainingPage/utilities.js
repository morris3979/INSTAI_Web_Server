export const drawRect = (detections, ctx) =>{
    // Loop through each prediction
    detections.forEach(prediction => {

      // Extract boxes and classes
      const [x, y, width, height] = prediction['bbox'];
      const detectObj = prediction['class'];
      const score = Math.round(prediction['score'] * 100) / 100;
      const text = ' '+detectObj+'  '+score;

      // Set styling
      ctx.strokeStyle = '#00FF00';
      const font = '18px sans-serif';
      ctx.font = font;
      ctx.lineWidth = 4;
      ctx.textBaseline = "top";
      ctx.fillStyle = '#00FF00';
      const textWidth = ctx.measureText(text).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x, y, textWidth + 6, textHeight + 6);

      // Draw rectangles and text
      ctx.beginPath();
      ctx.fillStyle = '#000000'
      ctx.fillText(text, x, y);
      ctx.rect(x, y, width, height);
      ctx.stroke();
    });
  }
