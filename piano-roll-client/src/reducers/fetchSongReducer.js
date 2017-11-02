import { createReducer } from './reducerUtilities'

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

const handlers = new Map()
handlers.set('fetchSong.REQUEST_FETCH_SONG', requestFetchSong)
        .set('fetchSong.RECEIVE_FETCH_SONG_ERROR', receiveFetchSongError)
        .set('song.RECEIVE_FETCH_SONG', receiveFetchSong)

export default createReducer(initialState, handlers)
