import { createSelector } from 'reselect'
import Player from '../api/ToneKeyboardHandler'

import { getTracks, getNotes } from './'

const getTracksForPlayer = createSelector(
  [getTracks, getNotes],
  (tracks, allNotes) => {
    for(let n in tracks) {
      const l = tracks[n].notes.length,
            notes = new Array(l)
      for(let i = 0; i < l; i++) {
        notes[i] = allNotes[tracks[n].notes[i]]
      }
      Player.addTrack(tracks[n], notes)
    }
    return tracks
  }
)

export default getTracksForPlayer
