/*
    Stacks the pixel data of a frame on top of the previous frame's pixel data, replacing any transparent pixels with the corresponding pixels from the previous frame.
*/
function stackPixels(ext, setStacked){
    let stackedFrames = [];
    stackedFrames.push(ext.data[0]);
    for (let frame = 1; frame < ext.data.length; frame++) {
      let current = ext.data[frame].slice()
      for (let i = 0; i < current.length; i += 4) {
        const r = i;
        const g = i + 1;
        const b = i + 2;
        const a = i + 3;
        if (current[a] === 0) {          
          current[i] = stackedFrames[frame-1][r];
          current[i + 1] = stackedFrames[frame-1][g];
          current[i + 2] = stackedFrames[frame-1][b];
          current[i + 3] = stackedFrames[frame-1][a];
        }
      }
      stackedFrames.push(current)
    }
    const pxl = {
      data:stackedFrames,
      width: ext.width,
      height: ext.height,
      frames: ext.frames
    }
    setStacked(pxl)
}

export default stackPixels;