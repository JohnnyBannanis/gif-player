import React, {useState, useEffect } from 'react';
import PixelCanvas from './PixelCanvas';

function SliderCanvas({ pixels }) {
  const [frame, setFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loop, setLoop] = useState(false);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        console.log(frame)
        if (frame < pixels.frames - 1) {
          setFrame(frame => frame + 1);
        }else if (loop){
          setFrame(0);
        }else{
          handlePlayPause()
        }
      }, 40);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying, frame])

  const handlePlayPause = () => {
    if(!isPlaying && frame === pixels.frames - 1){
      setFrame(0)
    }
    setIsPlaying(isPlaying => !isPlaying );
  };

  const handleLoop = (event) => {
    setLoop(event.target.checked);
  };
  
  const handleSlider = (event) => {
    setFrame(parseInt(event.target.value));
  };

  return (
    <>
    <div>
      <PixelCanvas height={pixels.height} width={pixels.width} pixels={pixels.data[frame]} />
    </div>
    <div>
      <button onClick={handlePlayPause}>{isPlaying ? 'Pause' : 'Start'}</button>
      <label htmlFor="loop" accessKey='s'>LOOP</label>
      <input id='loop' type="checkbox" checked={loop} onChange={handleLoop} />
      <input type="range" min="0" max={pixels.frames - 1} value={frame} onChange={handleSlider} style={ {width:"25%"} }></input>
    </div>
    </>
  )
}

export default SliderCanvas;