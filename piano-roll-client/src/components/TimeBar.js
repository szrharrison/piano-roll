import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { passTime, togglePause, startTime, stopTime } from '../actions/timeActions'
import Timer from '../api/Timer'

import PlayOutlineCircle from '../icons/play-outline-circle.svg.js'
import PauseOutlineCircle from '../icons/pause-outline-circle.svg.js'
import StopOutlineCircle from '../icons/stop-outline-circle.svg.js'

class TimeBar extends Component {

  handlePressPlay = () => {
    if(this.props.stopped) {
      this.props.startTime()
      this.timer = new Timer({duration: this.props.duration, callback: this.props.passTime})
      this.timer.start()
    } else {
      if(this.props.paused) {
        this.props.togglePause()
        this.timer.pauseResume()
      } else {
        this.props.togglePause()
        this.timer.pauseResume()
      }
    }
  }

  handlePressStop = () => {
    if(!this.props.paused) {
      this.timer.pauseResume()
    }
    this.props.stopTime()
  }

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
        <button
          onClick={this.handlePressPlay}
        >
          { this.props.paused ?
            <PlayOutlineCircle/>
          : <PauseOutlineCircle/>
          }
        </button>
        <button
          onClick={this.handlePressStop}
        >
          <StopOutlineCircle/>
        </button>
        {dividers}
      </div>
    )
  }
}

TimeBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number,
  paused: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  stopped: PropTypes.bool.isRequired,
}


function mapStateToProps(state) {
  return {
    duration: state.music.song.duration,
    currentTime: state.time.currentTime,
    paused: state.time.paused,
    playing: state.time.playing,
    stopped: !state.time.playing
  }
}

function mapDispatchToProps(dispatch) {
  return {
    passTime: currentTime => dispatch(passTime(currentTime)),
    togglePause: () => dispatch(togglePause()),
    startTime: () => dispatch(startTime()),
    stopTime: () => dispatch(stopTime()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeBar)
