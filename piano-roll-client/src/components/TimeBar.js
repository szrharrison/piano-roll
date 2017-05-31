import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TimeBar extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    let style, dividers
    if(this.props.duration) {
      style = {
        width: this.props.duration * 500
      }
      dividers = Array.apply(null, new Array(Math.floor(this.props.duration))).map( (e,i) => <div className="second" key={i}></div> )
    }
    const playheadStyle = {width: this.props.currentTime * 500}
    return (
      <div id="time-bar" style={style}>
        <button onClick={this.props.onPlay}>Play</button>
        <button onClick={this.props.onPause}>Pause/Resume</button>
        <div className="play-head" style={playheadStyle}>{this.props.currentTime}</div>
        {dividers}
      </div>
    )
  }
}

TimeBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number
}

export default TimeBar
