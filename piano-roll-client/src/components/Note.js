import React from 'react'
import PlayNote2 from './PlayNote2'

function Note(props) {

    const noteStyle = {
      top: `${Math.round(props.pitch * 30)-700}px`,
      left: `${Math.round(props.start_time * 500)}px`,
      width: `${Math.round(props.duration * 400)}px`
    }

    const handleClick = () => {
      console.log('got here')
      return <PlayNote2 />
    }

    return (
      <div onClick={handleClick.bind(this)} className="note" style={noteStyle}>
        {props.name}
      </div>
    )
}

export default Note