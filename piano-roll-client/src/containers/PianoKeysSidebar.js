import React from 'react'
import WhiteKey from '../components/WhiteKey'
import BlackKey from '../components/BlackKey'

function PianoKeysSidebar() {
    const octave_white_black_key_combo = ['white', 'black', 'white', 'black', 'white', 'white', 'black', 'white', 'black', 'white', 'black', 'white' ]
    const sevenOctavesFullPiano = replicateArray(octave_white_black_key_combo, 7)
    function replicateArray(array, n) {
        // Create an array of size "n" with undefined values
        var arrays = Array.apply(null, new Array(n)); 

        // Replace each "undefined" with our array, resulting in an array of n copies of our array
        arrays = arrays.map(function() { return array });

        // Flatten our array of arrays
        return [].concat.apply([], arrays);
    }

    console.log(replicateArray(octave_white_black_key_combo, 7))

    const pianoOctave = sevenOctavesFullPiano.map((pianoKey => (pianoKey === 'white') ? <WhiteKey /> : <BlackKey/> ))
    return (
        <nav id="nav-piano">
            <ul>
                {pianoOctave}
            </ul>
        </nav>
    )
} 

export default PianoKeysSidebar