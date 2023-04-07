import React, {useState, useEffect } from 'react';
import PixelCanvas from './PixelCanvas';

function SliderCanvas({ pixels }) {
  const [frame, serFrame] = useState(0);

  const handleSlider = (event) => {
    serFrame(event.target.value);
  };
  return (
    <>
    <div>
      <PixelCanvas height={pixels.height} width={pixels.width} pixels={pixels.data[frame]} />
    </div>
    <div>
      <input type="range" min="0" max={pixels.frames - 1} value={frame} onChange={handleSlider}></input>
    </div>
    </>
  )
}

export default SliderCanvas;