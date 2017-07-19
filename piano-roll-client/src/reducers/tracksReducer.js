import { createReducer } from './reducerUtilities'
import * as actionTypes from '../constants'

const { songTypes, tracks } = actionTypes

const initialState = {
  byId: {},
  allIds: []
}

const receiveFetchSong = (state, action) => {
  let { tracks, song } = action.song
  const allIds = song.tracks
  const id = allIds[0]
  return {
    byId: tracks,
    allIds,
    id
  }
}
const setTrack = (state, action) => ({
  ...state,
  id: action.trackId
})

const tracksReducer = createReducer(initialState, {
    [songTypes.RECEIVE_FETCH_SONG]: receiveFetchSong,
    [tracks.SET_TRACK]: setTrack
})

export default tracksReducer
