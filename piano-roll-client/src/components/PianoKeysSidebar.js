import React from 'react'
import Key from './Key'

function PianoKeysSidebar(props) {
    const pianoOctave = props.sevenOctavePiano.map((pianoKey, i) => <Key name={pianoKey} key={i} white={pianoKey.search('#') === -1} ac={props.ac} />)

    return (
        <nav id="nav-piano">
            <ul>
                {pianoOctave}
            </ul>
        </nav>
    )
}

export default PianoKeysSidebar
