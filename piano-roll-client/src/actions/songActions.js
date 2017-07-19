import * as actionTypes from '../constants'

const { tone, tracks } = actionTypes

export function setTrack( trackId ) {
  return function(dispatch, getState) {
    const state = getState()
    const track = state.music.tracks.byId[trackId]
    dispatch({
      type: tracks.SET_TRACK,
      trackId,
      track
    })
  }
}

export function playersLoading(loadingBuffer) {
  return {
    type: tone.LOADING,
    loadingBuffer
  }
}

export function playersLoaded(loadedBuffer) {
  return {
    type: tone.FINISHED_LOADING,
    loadedBuffer
  }
}
