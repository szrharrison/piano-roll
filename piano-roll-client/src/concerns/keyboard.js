function replicateOctaveKeyPattern(keyPatternArray, numTimes) {
  const resp = []
  for(let i = numTimes; i > 0; i--) {
    for(let n = 0, l = keyPatternArray.length; n < l; n++) {
      const key = keyPatternArray[n]
        resp[resp.length] = key + i
    }
  }
  // let arrays = _.reverse(_.times(numTimes, i => keyPatternArray.map( key => key+i)))
  // arrays = _.flatten(arrays).slice(11, -9)
  return resp
}

const oneOctaveKeyPattern = ['B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C' ]
const sevenOctavePiano = replicateOctaveKeyPattern(oneOctaveKeyPattern, 7)

const wideKeys = ['D[1-9]', 'A[1-9]', 'G[1-9]']

export { sevenOctavePiano, wideKeys }
