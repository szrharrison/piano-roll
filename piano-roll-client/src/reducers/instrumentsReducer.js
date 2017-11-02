import { createReducer } from './reducerUtilities'

const receiveFetchSong = (state, action) => {
  let { instruments } = action.song
  return instruments
}

const handlers = new Map()
handlers.set('song.RECEIVE_FETCH_SONG', receiveFetchSong)

export default createReducer({}, handlers)
