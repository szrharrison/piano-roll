import { createReducer } from './reducerUtilities'

const initialState = {
  name: 'clarinet',
  byId: {}
}

const receiveFetchSong = (state, action) => {
  let { instruments, song, tracks } = action.song
  const id = tracks[song.tracks[0]].instrument
  const name = instruments[id].name.replace(/ /g,"_").replace(/[()]/g,"")
  return {
    byId: instruments,
    id,
    name
  }
}
const setTrack = (state, action) => ({
  ...state,
  id: action.track.instrument,
  name: state.byId[action.track.instrument].name.replace(/ /g,"_").replace(/[()]/g,"")
})

const instruments = createReducer(initialState, {
  'song.RECEIVE_FETCH_SONG': receiveFetchSong,
  'tracks.SET_TRACK': setTrack
})

export default instruments
