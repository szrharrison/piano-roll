import { createReducer } from './reducerUtilities'
import _ from 'lodash'

const receiveFetchSong = (state, action) => action.song.notes
const passTime = (state, action) => {
  const playingNotes = _.pickBy(state, note => {
    return (note.start_time - action.currentTime) < 0.05 && (note.start_time - action.currentTime) > 0
  })
  _.merge(playingNotes, {shouldPlay: true})
  return {
    ...state,
    ...playingNotes
  }
}

const notesById = createReducer({}, {
  'song.RECEIVE_FETCH_SONG': receiveFetchSong,
  'time.PASS_TIME': passTime
})


export default notesById
