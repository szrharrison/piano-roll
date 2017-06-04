function replicateOctaveKeyPattern(keyPatternArray, numTimes) {
  let arrays = Array.apply(null, new Array(numTimes))
  arrays = flatten( arrays, keyPatternArray).slice(-128)
  return arrays
}

function flatten( arr, keyPattern ) {
  let n = 0
  return arr.reduce(function(acc, val) {
    const addArr = keyPattern.map( key => `${key}${n}` )
    n += 1
    return addArr.concat( acc )
  }, [])
}

const oneOctaveKeyPattern = ['B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C' ]
export const sevenOctavePiano = replicateOctaveKeyPattern(oneOctaveKeyPattern, 11)

export const wideKeys = ['D[0-9]', 'A[0-9]', 'G[0-9]']
