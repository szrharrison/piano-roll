// @flow
export function setTrack(trackId: number) {
  return {
    type: 'tracks.SET_TRACK',
    trackId
  }
}
