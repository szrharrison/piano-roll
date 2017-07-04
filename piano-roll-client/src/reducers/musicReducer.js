import { combineReducers } from 'redux'
import { createReducer } from './reducerUtilities'
import fetchSongs from './fetchSongsReducer'
import fetchSong from './fetchSongReducer'
import tracks from './tracksReducer'
import notesById from './notesReducer'
import instruments from './instrumentsReducer'

const receiveFetchSongs = (state, action) => action.songs
const receiveFetchSong = (state, action) => ({...action.song.song})

const song = createReducer( {}, {
    'song.RECEIVE_FETCH_SONG': receiveFetchSong
})

const allSongIds = createReducer( [], {
  'song.RECEIVE_FETCH_SONGS': receiveFetchSongs
})

export default combineReducers({ song, allIds: allSongIds, tracks, notesById, instruments, fetchSongs, fetchSong })
