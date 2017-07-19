import { createReducer } from './reducerUtilities'
import * as actionTypes from '../constants'

const { fetchSong, songTypes } = actionTypes

const initialState = {
  isFetching: false
}

const requestFetchSong = state => ({...state, isFetching: true})

const receiveFetchSongError = (state, action) => {
  const { type: errorType, ...errorProps } = action
  return {
    ...state,
    isFetching: false,
    ...errorProps
  }
}

const receiveFetchSong = (state, action) => {
  const { type: successType, song, ...successProps } = action
  return {
    ...state,
    isFetching: false,
    ...successProps
  }
}

const fetchSongReducer = createReducer(initialState, {
  [fetchSong.REQUEST_FETCH_SONG]: requestFetchSong,
  [fetchSong.RECEIVE_FETCH_SONG_ERROR]: receiveFetchSongError,
  [songTypes.RECEIVE_FETCH_SONG]: receiveFetchSong
})

export default fetchSongReducer
