import React from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import { ItemTypes } from '../constants'

const noteSource = {
  beginDrag(props) {
    return {
      noteId: props.id,
      startTime: props.startTime
    }
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function Note(props) {

  const { connectDragSource, isDragging } = props

  const noteStyle = {
    // top: `${Math.round(props.pitch * 30)-700}px`,
    left: `${Math.round(props.startTime)}px`,
    width: `${/* Math.round(props.duration * 400) */120}px`,
    opacity: isDragging ? 0.5 : 1
  }

  return connectDragSource(
    <div className="note" style={noteStyle}>
      {props.name}
    </div>
  )
}

Note.propTypes = {
  name: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired
}

export default DragSource(ItemTypes.NOTE, noteSource, collect)(Note)
