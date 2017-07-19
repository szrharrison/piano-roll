import { createReducer } from './reducerUtilities'
import * as actionTypes from '../constants'

const { songTypes } = actionTypes

const receiveFetchSong = (state, action) => action.song.notes

const notesById = createReducer({}, {
  [songTypes.RECEIVE_FETCH_SONG]: receiveFetchSong
})

export default notesById
