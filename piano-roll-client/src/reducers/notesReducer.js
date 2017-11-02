import { createReducer } from './reducerUtilities'

const receiveFetchSong = (state, action) => action.song.notes

const handlers = new Map()
handlers.set('song.RECEIVE_FETCH_SONG', receiveFetchSong)

export default createReducer({}, handlers)
