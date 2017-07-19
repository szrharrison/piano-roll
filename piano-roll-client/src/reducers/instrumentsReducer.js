import { createReducer } from './reducerUtilities'
import * as actionTypes from '../constants'

const { songTypes } = actionTypes

const receiveFetchSong = (state, action) => {
  let { instruments } = action.song
  return instruments
}

const instruments = createReducer({}, {[songTypes.RECEIVE_FETCH_SONG]: receiveFetchSong})

export default instruments
