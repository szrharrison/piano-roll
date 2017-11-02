import { combineReducers } from 'redux'
import { createReducer } from './reducerUtilities'
import fetchSongs from './fetchSongsReducer'
import fetchSong from './fetchSongReducer'
import tracks from './tracksReducer'
import notesById from './notesReducer'
import instrumentsById from './instrumentsReducer'

const receiveFetchSongs = (state, action) => action.songs
const receiveFetchSong = (state, action) => ({...action.song.song})

const songHandlers = new Map(),
      allSongsHandlers = new Map()
songHandlers.set('song.RECEIVE_FETCH_SONG', receiveFetchSong)

allSongsHandlers.set('song.RECEIVE_FETCH_SONGS', receiveFetchSongs)

const song = createReducer({}, songHandlers)

const allSongs = createReducer([], allSongsHandlers)

export default combineReducers({ song, allSongs, tracks, notesById, instrumentsById, fetchSongs, fetchSong })
