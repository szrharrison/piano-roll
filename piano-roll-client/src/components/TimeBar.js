import React from 'react'

function TimeBar(props) {
  let style, dividers
  if(props.duration) {
    style = {
      width: props.duration * 500
    }
    dividers = Array.apply(null, new Array(Math.floor(props.duration))).map( (e,i) => <div className="second" key={i}></div> )
  }
  const playheadStyle = {width: props.currentTime * 500}
  return (
    <div id="time-bar" style={style} onClick={props.onClick}>
      <div className="play-head" style={playheadStyle}></div>
      {dividers}
    </div>
  )
}

export default TimeBar
