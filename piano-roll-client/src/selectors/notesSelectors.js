import { createSelector } from 'reselect'
import Player from '../api/ToneKeyboardHandler'
import { getInstrumentName } from './'

const getToneLoaded = state => state.music.tone.loaded

export const getNote = (state, props) => {
  const note = state.music.notesById[props.noteId]
  note.name = props.name
  return note
}

const makeGetNoteForPlayer = () => createSelector(
  [getNote, getInstrumentName, getToneLoaded],
  (note, instrumentName, loaded) => {
    Player.addNote(note, instrumentName, loaded.includes(`${instrumentName}-${note.name}`))
    return note
  }
)

export default makeGetNoteForPlayer
