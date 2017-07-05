import React from 'react'
import { connect } from 'react-redux'

import makeGetShouldNotePlay, { getNote } from '../selectors/notesSelectors'
import { getInstrumentName } from '../selectors'
import { triggerNote } from '../api/ToneKeyboardHandler'

const Note = props => {
  if (props.shouldPlay) {
    triggerNote(props.name, props.instrument, props.note.duration)
  }
  const noteStyle = {
    left: `${Math.round(props.note.start_time * 200) + 4}px`,
    width: `${Math.round(props.note.duration * 200)}px`
  }
  return (
    <div className="note" style={noteStyle}>
      <span>
        {props.name}
      </span>
    </div>
  )
}

function makeMapStateToProps() {
  const getShouldNotePlay = makeGetShouldNotePlay()
  const mapStateToProps = (state, ownProps) => ({
    instrument: getInstrumentName(state),
    note: getNote(state, ownProps),
    shouldPlay: getShouldNotePlay(state, ownProps)
  })
  return mapStateToProps
}

export default connect(makeMapStateToProps)(Note)
