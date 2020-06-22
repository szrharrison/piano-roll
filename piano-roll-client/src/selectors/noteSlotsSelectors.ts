import { createSelector } from 'reselect'

import { getTrackNotes } from './'
import { ReduxStore } from "../reducers";

export const getPitch = (state: ReduxStore, props: any): number => props.pitch

const makeGetNotesByPitch = () => {
  return createSelector(
    [getTrackNotes, getPitch],
    (notes, pitch) => {
      if(notes) {
        return notes.filter( note => note.pitch === pitch )
      }
    }
  )
}

export default makeGetNotesByPitch
