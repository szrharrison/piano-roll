import React from 'react'
import classSet from 'react-classset'

function TracksHeader(props) {
  let tracks
  if(props.tracks) {
    tracks = props.tracks.map( (track,i) => {
      const classes = classSet({
        'active': props.track === track.id
      })
      return (
        <li key={i} onClick={ event => props.onClick(track.id) }>
          <span className={classes}><img src={`https://raw.githubusercontent.com/andruo11/midi-pictures/master/${('000' + track.instrument.midi_instrument_number).substr(-3)}.jpg`} alt={track.instrument.name} />{track.name}</span>
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

export default TracksHeader
