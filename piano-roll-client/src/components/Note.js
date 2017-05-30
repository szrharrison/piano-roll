import React from 'react'

function Note(props) {

    const noteStyle = {
      left: `${Math.round(props.start_time * 500) + 4}px`,
      width: `${Math.round(props.duration * 400)}px`
    }

    return (
      <div className="note" style={noteStyle}>
        <span>
          {props.name}
        </span>
      </div>
    )
}

export default Note
