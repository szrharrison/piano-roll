// @flow
import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import Key from './Key'
import { sevenOctavePiano } from '../concerns/keyboard'

function PianoKeysSidebar() {
  const l = sevenOctavePiano.length,
        pianoOctaves = new Array(l)

  for(let i = 0; i < l; i++) {
    pianoOctaves[i] = (
      <Key
        key={_.uniqueId('key_')}
        name={sevenOctavePiano[i]}
        white={sevenOctavePiano[i][1] !== '#'}
      />
    )
  }
  return (
    <div id="nav-piano">
      <ul>
        {pianoOctaves}
      </ul>
    </div>
  )
}

export default connect()(PianoKeysSidebar)
