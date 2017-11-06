// @flow
import React from 'react'
import { connect } from 'react-redux'

import Track from './Track'

import getTracksForPlayer from '../selectors/tracksSelectors'

function TracksHeader(
  props: {
    tracks: {
      name: string,
      id: number,
      instrument: number
    },
    instrumentsById: {
      name: string
    }
  }
) {
  let tracks
  if(props.tracks) {
    tracks = []
    for(let trackId in props.tracks) {
      const track = props.tracks[trackId]
      tracks[tracks.length] = (
        <Track
          key={`${track.name}-${track.id}-${track.instrument}`}
          track={track}
          instrument={props.instrumentsById[track.instrument]}
        />
      )
    }
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
    tracks: getTracksForPlayer(state),
    instrumentsById: state.music.instrumentsById
  }
}

export default connect(mapStateToProps)(TracksHeader)
