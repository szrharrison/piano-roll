// @flow
import React from 'react'
import { connect } from 'react-redux'

import { getCurrentTime } from '../selectors'

function TimerClock(props: {currentTime: number}) {
  return (
    <div className="time">
      {props.currentTime}
    </div>
  )
}

const mapStateToProps = state => ({currentTime: getCurrentTime(state)})

export default connect(mapStateToProps)(TimerClock)
