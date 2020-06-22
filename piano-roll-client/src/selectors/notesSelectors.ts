import { createSelector } from "reselect";
import Player from "../api/ToneKeyboardHandler";
import { getInstrumentName } from "./";
import { ReduxStore } from "../reducers";
import Note from "../models/note";

const getToneLoaded = (state: ReduxStore) => state.music.tone.loaded;

export const getNote = (state: ReduxStore, props: { name: string, noteId: number }) => {
  const note: Note = state.music.notesById[props.noteId];
  note.name = props.name;
  return note;
};

const makeGetNoteForPlayer = () => createSelector(
  [getNote, getInstrumentName, getToneLoaded],
  (note, instrumentName, loaded) => {
    Player.addNote(note, instrumentName, loaded.includes(`${instrumentName}-${note.name}`));
    return note;
  }
);

export default makeGetNoteForPlayer;
