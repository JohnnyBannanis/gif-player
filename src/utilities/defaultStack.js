/*
  Determines if the animation frames will be stacked or not based on the alpha values of its first frame pixels.
*/

function defaultStack(ext, setIsStacked){
  const firsFrame = ext.data[0]
  for (let i = 0; i < firsFrame.length; i += 4) {
    const r = i;
    const g = i + 1;
    const b = i + 2;
    const a = i + 3;
    if (firsFrame[a] === 0) {     
      setIsStacked(false);
      return;
    }
  }
  setIsStacked(true);
}

export default defaultStack;