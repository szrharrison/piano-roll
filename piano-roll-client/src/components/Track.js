import React from 'react'
import classSet from 'react-classset'
import { connect } from 'react-redux'

import { setTrack } from '../actions/trackActions'

function Track(props) {
  const {track, instrument} = props,
        classes = classSet({
          'active': track.id === props.selectedId
        })
  return (
    <li
      onClick={ e => props.setTrack(track.id) }
    >
      <span
        className={classes}
      >
        <img
          src={`https://raw.githubusercontent.com/andruo11/midi-pictures/master/${('000' + track.instrument).substr(-3)}.jpg`}
          alt={instrument.name}
        />
        {track.name}
      </span>
    </li>
  )
}

function mapStateToProps(state) {
  return {
    selectedId: state.music.tracks.id
  }
}

export default connect(mapStateToProps, {setTrack})(Track)
