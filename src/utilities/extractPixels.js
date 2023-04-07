import getPixels from 'get-pixels';

import defaultStack from './defaultStack.js'
import stackPixels from './stackPixels';

function extractPixels(gifUrl, setPixels, setStacked, setIsStacked){
    getPixels(gifUrl, (err, pixels) => {
      if (err) {
        console.error(err);
        return;
      }
      //console.log(pixels)
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
      stackPixels(ext, setStacked);
      defaultStack(ext, setIsStacked)
    });
}
export default extractPixels;