import React from 'react'
import { connect } from 'react-redux'
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

function mapStateToProps(state, ownProps) {
  return {
    instrument: state.music.instruments.name,
    note: state.music.notesById[ownProps.noteId]
  }
}

export default connect(mapStateToProps)(Note)
