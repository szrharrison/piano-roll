import React from 'react'
import { connect } from 'react-redux'

import { getCurrentTime } from '../selectors'

const TimerClock = props => (
  <div className="time">
    {props.currentTime}
  </div>
)

function mapStateToProps(state) {
  return {
    currentTime: getCurrentTime(state)
  }
}

export default connect(mapStateToProps)(TimerClock)
