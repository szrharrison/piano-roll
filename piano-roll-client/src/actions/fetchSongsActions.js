import { fetchSongsRequest } from '../api'
import * as actionTypes from '../constants'

const { fetchSongs, songTypes } = actionTypes

export function fetchAllSongs() {
  return function(dispatch) {
    dispatch(requestFetchSongs())

    fetchSongsRequest()
      .then( data => {
        if(data.error) {
          dispatch(receiveFetchSongsError(data.error))
        } else {
          dispatch(receiveFetchSongs(data))
        }
      })
  }
}

function requestFetchSongs() {
  return {
    type: fetchSongs.REQUEST_FETCH_SONGS
  }
}

function receiveFetchSongsError( error ) {
  return {
    type: fetchSongs.RECEIVE_FETCH_SONGS_ERROR,
    status: 'error',
    receivedAt: Date.now(),
    error
  }
}

function receiveFetchSongs( songs ) {
  return {
    type: songTypes.RECEIVE_FETCH_SONGS,
    status: 'success',
    receivedAt: Date.now(),
    songs
  }
}
