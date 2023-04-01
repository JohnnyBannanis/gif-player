import React, { useEffect, useRef } from 'react';

function PixelCanvas({ pixels, width, height }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set the canvas width and height
    canvas.width = width;
    canvas.height = height;

    // Create an image data array from the pixel data
    const imageData = ctx.createImageData(width, height);
    for (let i = 0; i < pixels.length; i += 4) {
      //RGBA pixels
      imageData.data[i] = pixels[i];
      imageData.data[i + 1] = pixels[i + 1];
      imageData.data[i + 2] = pixels[i + 2];
      imageData.data[i + 3] = pixels[i + 3];
    }

    // Draw the image data onto the canvas
    ctx.putImageData(imageData, 0, 0);
  }, [pixels, width, height]);

  return <canvas ref={canvasRef} />;
}

export default PixelCanvas;