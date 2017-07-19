import { createReducer } from './reducerUtilities'
import * as actionTypes from '../constants'

const { time } = actionTypes

const initialState = {
  currentTime: 0,
  playing: false,
  paused: true,
  stopped: true
}

const passTime = (state, action) => ({...state, currentTime: action.time})
const toggleBoolean = (state, action) => ({...state, [action.field]: !state[action.field]})
const startTime = state => ({...state, playing: true, paused: false, stopped: false})
const stopTime = state => ({...state, playing: false, paused: true, stopped: true, currentTime: 0})

const timeReducer = createReducer(initialState, {
  [time.PASS_TIME]: passTime,
  [time.TOGGLE_BOOLEAN]: toggleBoolean,
  [time.START_TIME]: startTime,
  [time.STOP_TIME]: stopTime
})

export default timeReducer
