// @flow
function replicateOctaveKeyPattern(keyPatternArray, numTimes) {
  const resp = new Array(keyPatternArray.length * numTimes)
  for(let i = numTimes; i > 0; i--) {
    for(let n = 0, l = keyPatternArray.length; n < l; n++) {
        resp[(numTimes - i) * l + n] = keyPatternArray[n] + i
    }
  }
  return resp
}

const oneOctaveKeyPattern = ['B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C' ]
const sevenOctavePiano = replicateOctaveKeyPattern(oneOctaveKeyPattern, 7)

const wideKeys = ['D[1-9]', 'A[1-9]', 'G[1-9]']

export { sevenOctavePiano, wideKeys }
