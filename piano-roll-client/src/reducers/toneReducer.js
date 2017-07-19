import { createReducer } from './reducerUtilities'
import * as actionTypes from '../constants'

const { tone } = actionTypes

const initialState = {
  buffers: [],
  loaded: []
}

const loading = (state, action) => ({
  ...state,
  buffers: [
    ...state.buffers,
    action.loadingBuffer
  ]
})
const finishedLoading = (state, action) => ({
  ...state,
  loaded: [
    ...state.loaded,
    action.loadedBuffer
  ]
})

const toneReducer = createReducer( initialState, {
  [tone.LOADING]: loading,
  [tone.FINISHED_LOADING]: finishedLoading
})

export default toneReducer
