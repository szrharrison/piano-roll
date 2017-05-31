import React, { Component } from 'react'
import PropTypes from 'prop-types'

class TimeBar extends Component {

  render() {
    let style, dividers
    if(this.props.duration) {
      style = {
        width: this.props.duration * 200
      }
      dividers = Array.apply(null, new Array(Math.floor(this.props.duration))).map( (e,i) => <div className="second" key={i}></div> )
    }
    return (
      <div id="time-bar" style={style}>
        <div className="time">{this.props.currentTime}</div>
        <button onClick={this.props.onClick}>{this.props.paused? '▶️' : '⏸'}</button>
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
