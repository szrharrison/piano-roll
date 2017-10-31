import React from 'react'
import { connect } from 'react-redux'

import Track from './Track'

function TracksHeader(props) {
  let tracks
  if(props.tracks.allIds) {
    tracks = props.tracks.allIds.map( trackId => {
      const track = props.tracks.byId[trackId]
      return (
        <Track
          key={`${track.name}-${track.id}-${track.instrument}`}
          track={track}
          instrument={props.instrumentsById[track.instrument]}
        />
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
    instrumentsById: state.music.instrumentsById
  }
}

export default connect(mapStateToProps)(TracksHeader)
