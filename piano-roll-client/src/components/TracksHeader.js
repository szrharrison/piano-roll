import React from 'react'
import classSet from 'react-classset'
import { connect } from 'react-redux'
import _ from 'lodash'

import { setTrack } from '../actions/songActions'
import { playersLoading, playersLoaded } from '../actions/songActions'
import { getInstrumentName } from '../selectors'
import Player, { notePaths } from '../api/ToneKeyboardHandler'

function TracksHeader(props) {
  const { instrumentName: instrument, playersLoading, playersLoaded } = props
  let tracks
  const setLoadingNotes = (instrument, playersLoading, playersLoaded) => {
    const notes = _.keys(notePaths(instrument))
    notes.forEach(note => playersLoading(note))
    Player.setInstrument(instrument, playersLoaded)
  }
  if(props.tracks.allIds) {
    tracks = props.tracks.allIds.map( (trackId,i) => {
      const classes = classSet({
        'active': props.tracks.id === trackId
      })
      const track = props.tracks.byId[trackId]
      const instrument = props.instrumentsById[track.instrument]
      const instrumentNumber = ('000' + track.instrument).substr(-3)
      return (
        <li
          key={`${track.name}-${i}-${track.instrument}`}
          onClick={ e => {
            setLoadingNotes(instrument, playersLoading, playersLoaded)
            props.setTrack(track.id)
          }}
        >
          <span className={classes}>
            <img
              src={`https://raw.githubusercontent.com/andruo11/midi-pictures/master/${instrumentNumber}.jpg`}
              alt={instrument.name}
            />
            {track.name}
          </span>
        </li>
      )
    })
  } else {
    tracks = null
  }
  return (
    <div className="tracks-header clearfix">
      <ul>
        {tracks}
      </ul>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    tracks: state.music.tracks,
    instrumentsById: state.music.instrumentsById,
    instrumentName: getInstrumentName(state)
  }
}

export default connect(
  mapStateToProps,
  {
    setTrack,
    playersLoading,
    playersLoaded
  }
)(TracksHeader)
