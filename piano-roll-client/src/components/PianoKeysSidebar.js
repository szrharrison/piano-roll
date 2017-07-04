import React from 'react'

import Key from './Key'
import { sevenOctavePiano } from '../concerns/keyboard'

function PianoKeysSidebar(props) {
  const pianoOctave = sevenOctavePiano.map((pianoKey, i) => <Key name={pianoKey} key={pianoKey} white={pianoKey.search('#') === -1} />)
  return (
    <nav id="nav-piano">
      <ul>
        {pianoOctave}
      </ul>
    </nav>
  )
}

export default PianoKeysSidebar
