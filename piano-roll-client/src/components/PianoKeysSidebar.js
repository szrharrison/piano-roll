import React from 'react'
import WhiteKey from '../components/keys/WhiteKey'
import BlackKey from '../components/keys/BlackKey'

function PianoKeysSidebar() {
    const oneOctaveKeyPattern = ['white', 'black', 'white', 'black', 'white', 'white', 'black', 'white', 'black', 'white', 'black', 'white' ]
    const sevenOctavePiano = replicateOctaveKeyPattern(oneOctaveKeyPattern, 13)
    const pianoOctave = sevenOctavePiano.map((pianoKey, i) => (pianoKey === 'white') ? <WhiteKey keyNumber={i} /> : <BlackKey keyNumber={i}/> )
    
    return (
        <nav id="nav-piano">
            <ul>
                {pianoOctave}
            </ul>
        </nav>
    )
} 

function replicateOctaveKeyPattern(keyPatternArray, numTimes) {
    let arrays = Array.apply(null, new Array(numTimes))
    arrays = arrays.map(() => keyPatternArray )
    return [].concat.apply([], arrays)
}

export default PianoKeysSidebar