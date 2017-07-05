import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { passTime, togglePause, startTime, stopTime } from '../actions/timeActions'
import Timer from '../api/Timer'

import PlayOutlineCircle from '../icons/play-outline-circle.svg.js'
import PauseOutlineCircle from '../icons/pause-outline-circle.svg.js'
import StopOutlineCircle from '../icons/stop-outline-circle.svg.js'
import TimerClock from './TimerClock'

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
      dividers = _.times(Math.floor(this.props.duration), () => (
        <div
          key={_.uniqueId('divider_')}
          className="second"
        >
        </div>
      ))
    }
    return (
      <div id="time-bar" style={style}>
        <TimerClock />
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

function mapStateToProps(state) {
  return {
    duration: state.music.song.duration,
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
