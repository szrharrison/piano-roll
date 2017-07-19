import { createReducer } from './reducerUtilities'
import * as actionTypes from '../constants'

const { fetchSongs, songTypes } = actionTypes

const initialState = {
  allSongs: [],
  areFetching: false
}

const requestFetchSongs = state => ({
  ...state,
  areFetching: true
})

const receiveFetchSongsError = (state, action) => {
  const { type: errorType, ...allErrorProps } = action
  return {
    ...state,
    areFetching: false,
    ...allErrorProps
  }
}

const receiveFetchSongs = (state, action) => {
  const { type: successType, songs, ...allSuccessProps } = action
  return {
    ...state,
    areFetching: false,
    ...allSuccessProps
  }
}

const fetchSongsReducer = createReducer(initialState, {
  [fetchSongs.REQUEST_FETCH_SONGS]: requestFetchSongs,
  [fetchSongs.RECEIVE_FETCH_SONGS_ERROR]: receiveFetchSongsError,
  [songTypes.RECEIVE_FETCH_SONGS]: receiveFetchSongs
})

export default fetchSongsReducer
