import { useState, useEffect } from 'react';
import PixelCanvas from './components/PixelCanvas';
import SliderCanvas from './components/SliderCanvas';
import extractPixels from './utilities/extractPixels';

function App() { 
  const [uploadedGif, setUploadedGif] = useState(null)
  const [gifUrl, setGifUrl] = useState(null)
  const [pixels, setPixels] = useState(null)
  const [stacked, setStacked] = useState(null)
  const [isStacked, setIsStacked] = useState(false);

  function handleCheckboxChange(event){
    setIsStacked(event.target.checked);
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
            {!pixels && <button onClick={() => extractPixels(gifUrl, setPixels, setStacked, setIsStacked)}>PROCESS</button>}
            <input id='stack' type="checkbox" checked={isStacked} onChange={handleCheckboxChange} />
            <label htmlFor="stack" accessKey='s'>Stack Frames</label>
          </div>
          <div>
            <div>
              <h1>SLIDER</h1>
            </div>
            <div>
              {isStacked ? stacked && <SliderCanvas pixels={stacked}/> 
                : pixels && <SliderCanvas pixels={pixels}/>}
            </div>
            <h1>FRAMES</h1>
              {isStacked ? stacked && stacked.data.map((frame,index) => 
                <PixelCanvas key={index} pixels={frame} height={stacked.height} width={stacked.width} />)
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
