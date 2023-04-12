import React, {useState, useEffect } from 'react';
import PixelCanvas from './PixelCanvas';

function SliderCanvas({ pixels }) {
  const [frame, setFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  useEffect(() => {
    if (isPlaying) {
      playFrames(frame)
    }
  }, [isPlaying])
  

  const handleSlider = (event) => {
    setFrame(parseInt(event.target.value));
    setIsPlaying(false);
  };

  const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const playFrames = async (frame) => {
    let current = frame;
    for (let f = current; f < pixels.frames; f++) {
      if (!isPlaying) {
        break;
      }
      await delay(60);
      setFrame(f);  
    }
  };

  return (
    <>
    <div>
      <PixelCanvas height={pixels.height} width={pixels.width} pixels={pixels.data[frame]} />
    </div>
    <div>
      <button onClick={() => setIsPlaying(!isPlaying)}>PLAY</button>
      <input type="range" min="0" max={pixels.frames - 1} value={frame} onChange={handleSlider}></input>
    </div>
    </>
  )
}

export default SliderCanvas;