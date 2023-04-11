import React, {useState, useEffect } from 'react';
import PixelCanvas from './PixelCanvas';

function SliderCanvas({ pixels }) {
  const [frame, setFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  const handleSlider = (event) => {
    setIsPlaying(false);
    setFrame(event.target.value);
  };
  
  const playFrames = async (frame, isPlaying) => {
    let current = frame;
    if (isPlaying === true) {
      return;
    }else{
      setIsPlaying(true);
    }

    for (let f = current; f < pixels.frames; f++) {
      await delay(60);
      setFrame(f);  
    }

  };

  const loopFrames = async (frame) => {
    let current = frame;
    for (let f = current; f <= pixels.frames; f++) {
      if(f === pixels.frames){
        f = 0;
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
      <button onClick={() => playFrames(frame,isPlaying)}>PLAY</button>
      <button onClick={() => loopFrames(frame)}>LOOP</button>
      <input type="range" min="0" max={pixels.frames - 1} value={frame} onChange={handleSlider}></input>
    </div>
    </>
  )
}

export default SliderCanvas;