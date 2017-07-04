export function setTrack( trackId ) {
  return function(dispatch, getState) {
    const state = getState()
    const track = state.music.tracks.byId[trackId]
    dispatch({
      type: 'tracks.SET_TRACK',
      trackId,
      track
    })
  }
}
