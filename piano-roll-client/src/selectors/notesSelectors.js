import { createSelector } from 'reselect'

export const getNote = (state, props) => state.music.notesById[props.noteId]
const getTime = state => state.time.currentTime

const makeGetShouldNotePlay = () => {
  return createSelector(
    [getNote, getTime],
    (note, time) => ((note.start_time - time) < 0.05 && (note.start_time - time) >= 0)
  )
}

export default makeGetShouldNotePlay
