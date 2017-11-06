// @flow
import { fetchSong } from '../api'
import { normalize, schema } from 'normalizr';

const instrumentEntity = new schema.Entity('instruments', {}, {
  idAttribute: 'midi_instrument_number'
})

const noteEntity = new schema.Entity('notes')

const trackEntity = new schema.Entity('tracks', {
  instrument: instrumentEntity,
  notes: [ noteEntity ]
})

const songEntity = new schema.Entity('songs', {
  tracks: [ trackEntity ]
})

export function fetchSingleSong(songId: number) {
  return function(dispatch: Function) {
    dispatch(requestFetchSong())

    fetchSong(songId)
      .then( data => {
        if(data.error) {
          dispatch(receiveFetchSongError(data.error))
        } else {
          dispatch(receiveFetchSong(data))
        }
      })
  }
}

function requestFetchSong() {
  return {
    type: 'fetchSong.REQUEST_FETCH_SONG'
  }
}

function receiveFetchSongError(error) {
  console.error('Error fetching song at:' + Date.now())
  console.error(error)
  return {
    type: 'fetchSong.RECEIVE_FETCH_SONG_ERROR',
    status: 'error',
    receivedAt: Date.now(),
    error
  }
}

function receiveFetchSong( originalSong ) {
  const normalized = normalize(originalSong, songEntity)
  let song = normalized.entities
  song.song = normalized.entities.songs[normalized.result]
  delete song.songs

  for(let track in song.tracks) {
    const inst = song.instruments[song.tracks[track].instrument].name.replace(/ /g,'_').replace(/[()]/g,''),
          l = song.tracks[track].notes.length
    for(let i = 0; i < l; i++) {
      song.notes[song.tracks[track].notes[i]].time = song.notes[song.tracks[track].notes[i]].start_time
      song.notes[song.tracks[track].notes[i]].instrument = inst
      delete song.notes[song.tracks[track].notes[i]].start_time
    }
  }
  return {
    type: 'song.RECEIVE_FETCH_SONG',
    status: 'success',
    receivedAt: Date.now(),
    song
  }
}
