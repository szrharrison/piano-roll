import { createReducer } from './reducerUtilities'

const initialState = {
  currentTime: 0,
  playing: false,
  paused: true,
  stopped: true
}

const passTime = (state, action) => ({...state, currentTime: action.time})
const pausePlay = (state, action) => ({...state, [action.field]: !state[action.field]})
const startTime = state => ({...state, playing: true, paused: false, stopped: false})
const stopTime = state => ({...state, playing: false, paused: true, stopped: true, currentTime: 0})

const handlers = new Map()
handlers.set('time.PASS_TIME', passTime)
        .set('time.PAUSE_PLAY', pausePlay)
        .set('time.START_TIME', startTime)
        .set('time.STOP_TIME', stopTime)

export default createReducer(initialState, handlers)
