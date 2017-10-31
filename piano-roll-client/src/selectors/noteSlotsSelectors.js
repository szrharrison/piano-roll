import { createSelector } from 'reselect'

import { getTrackNotes } from './'

export const getPitch = (state, props) => props.pitch

const makeGetNotesByPitch = () => {
  return createSelector(
    [getTrackNotes, getPitch],
    (trackNotes, pitch) => {
      if(trackNotes) {
        const l = trackNotes.length,
              notes = []
        for(let i = 0; i < l; i++) {
          if(trackNotes[i].pitch === pitch) {
            notes[notes.length] = trackNotes[i]
          }
        }
        return notes
      }
    }
  )
}

export default makeGetNotesByPitch
