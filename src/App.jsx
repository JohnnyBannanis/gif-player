import { useState, useEffect } from 'react';
import PixelCanvas from './PixelCanvas';
import SliderCanvas from './SliderCanvas';
import getPixels from 'get-pixels';

function App() { 
  const [uploadedGif, setUploadedGif] = useState(null)
  const [gifUrl, setGifUrl] = useState(null)
  const [pixels, setPixels] = useState(null)
  const [overlaped, setOverlaped] = useState(null)

  const [checked, setChecked] = useState(false);

  function handleCheckboxChange(event){
    setChecked(event.target.checked);
  };


  function handleFileUpload(event) { 
    const file = event.target.files[0];
    setUploadedGif(file);
    const reader = new FileReader();
    reader.onload = () => {
      setGifUrl(reader.result);
    }
    reader.readAsDataURL(file);
  }

  function overlapPixels(ext){
    let overlapedFrames = [];
    overlapedFrames.push(ext.data[0]);
    for (let frame = 1; frame < ext.data.length; frame++) {
      let current = ext.data[frame].slice()
      for (let i = 0; i < current.length; i += 4) {
        const r = i;
        const g = i + 1;
        const b = i + 2;
        const a = i + 3;
        if (current[a] === 0) {          
          current[i] = overlapedFrames[frame-1][r];
          current[i + 1] = overlapedFrames[frame-1][g];
          current[i + 2] = overlapedFrames[frame-1][b];
          current[i + 3] = overlapedFrames[frame-1][a];
        }
      }
      overlapedFrames.push(current)
    }
    const pxl = {
      data:overlapedFrames,
      width: ext.width,
      height: ext.height,
      frames: ext.frames
    }
    setOverlaped(pxl)
  }

  function extractPixels(){
    getPixels(gifUrl, (err, pixels) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(pixels)
      //values per frame
      const vpf = pixels.shape[1] * pixels.shape[2] * pixels.shape[3];
      const array = Array.from(pixels.data);

      let framesPixels = [];
      for(let i = 0; i < array.length; i += vpf) {
        const chunk = array.slice(i, i + vpf);
        framesPixels.push(chunk)
      }
      const ext = {
        data: framesPixels,
        width: pixels.shape[1],
        height: pixels.shape[2],
        frames: pixels.shape[0]
      }
      setPixels(ext);
      overlapPixels(ext);
    });
  }

  function showStates(){
    console.log(uploadedGif);
    console.log(gifUrl);
    console.log(pixels);
    console.log(overlaped);
  }

  return (
    <center>
      <h1>
        GIF Player
      </h1>
      <div>
        <div>
          {!uploadedGif && <input type="file" onChange={handleFileUpload} accept=".gif" />}
        </div>
      </div>
        {uploadedGif && <>
          <div>
            <img id="gifDOM" src={gifUrl} />
          </div>
          <div>
            {!pixels && <button onClick={extractPixels}>PROCESS</button>}
            <input id='stack' type="checkbox" checked={checked} onChange={handleCheckboxChange } />
            <label htmlFor="stack" accessKey='s'>Stack Frames</label>
          </div>
          <div>
            <button onClick={showStates}>SHOW STATES</button>
          </div>
          <div>
            <div>
              <h1>SLIDER</h1>
            </div>
            <div>
              {checked ? overlaped && <SliderCanvas pixels={overlaped}/> 
                : pixels && <SliderCanvas pixels={pixels}/>}
            </div>
            <h1>FRAMES</h1>
              {checked ? overlaped && overlaped.data.map((frame,index) => 
                <PixelCanvas key={index} pixels={frame} height={overlaped.height} width={overlaped.width} />)
              :pixels && pixels.data.map((frame,index) => 
                <PixelCanvas key={index} pixels={frame} height={pixels.height} width={pixels.width} />)
              }
          </div>
        </>
        }
    </center>
  )
}

export default App
