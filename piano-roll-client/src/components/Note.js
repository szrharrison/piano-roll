import React from 'react'

function Note(props) {

  const noteStyle = {
    left: `${Math.round(props.start_time * 200) + 4}px`,
    width: `${Math.round(props.duration * 200)}px`
  }

  if( (props.start_time - props.currentTime) < 0.05 && (props.start_time - props.currentTime) > 0 )
  props.ac.then(function(instrument) {
    instrument.play(props.pitch, props.ac.currentTime, { duration: props.duration})
  })

  return (
    <div className="note" style={noteStyle}>
      <span>
        {props.name}
      </span>
    </div>
  )
}

export default Note
