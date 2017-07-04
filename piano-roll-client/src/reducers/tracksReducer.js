import { createReducer } from './reducerUtilities'

const initialState = {
  byId: {},
  allIds: [],
  track: {}
}

const receiveFetchSong = (state, action) => {
  let { tracks, song } = action.song
  const allIds = song.tracks
  const id = allIds[0]
  const track = tracks[id]
  return {
    byId: tracks,
    allIds,
    id,
    track
  }
}
const setTrack = (state, action) => ({
  ...state,
  id: action.trackId,
  track: action.track
})

const tracks = createReducer(initialState, {
    'song.RECEIVE_FETCH_SONG': receiveFetchSong,
    'tracks.SET_TRACK': setTrack
})

export default tracks
