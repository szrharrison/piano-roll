// @flow
import React from 'react'
import { connect } from 'react-redux'

import { getNote } from '../selectors/notesSelectors'

function Note(props: {note: {time: number, duration: number}, name: string}) {
  const noteStyle = {
    left: `${Math.round(props.note.time * 200) + 4}px`,
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


const mapStateToProps = (state, ownProps) => ({note: getNote(state, ownProps)})

export default connect(mapStateToProps)(Note)
