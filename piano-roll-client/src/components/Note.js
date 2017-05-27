import React from 'react'

function Note(props) {

    const noteStyle = {
      // top: `${Math.round(props.pitch * 30)-700}px`,
      // left: `${Math.round(props.start_time * 500)}px`,
      width: `${/* Math.round(props.duration * 400) */120}px`
    }

    return (
      <div className="note" style={noteStyle}>
        {props.name}
      </div>
    )
}

export default Note
