export const getNote = (state, props) => {
  const note = state.music.notesById[props.noteId]
  note.name = props.name
  return note
}
