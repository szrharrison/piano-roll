import { createSelector } from 'reselect'
import Player from '../api/ToneKeyboardHandler'

export const getSong = (state, props) => {
  const song = state.music.song
  console.log(song)
  return song
}
