import { combineReducers } from 'redux'
import { createReducer } from './reducerUtilities'
import fetchSongs from './fetchSongsReducer'
import fetchSong from './fetchSongReducer'
import tracks from './tracksReducer'
import notesById from './notesReducer'
import instrumentsById from './instrumentsReducer'
import tone from './toneReducer'

const receiveFetchSongs = (state, action) => action.songs
const receiveFetchSong = (state, action) => ({...action.song.song})

const song = createReducer( {}, {
    'song.RECEIVE_FETCH_SONG': receiveFetchSong
})

const allSongs = createReducer( [], {
  'song.RECEIVE_FETCH_SONGS': receiveFetchSongs
})

export default combineReducers({ song, allSongs, tracks, notesById, instrumentsById, fetchSongs, fetchSong, tone })
