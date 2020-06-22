import { createReducer } from "./reducerUtilities";
import Note from "../models/note";
import { RECEIVE_FETCH_SONG, ReceiveFetchSongEvent } from "../events/receiveFetchSong";

export type NotesByIdStore = { [id: number]: Note }

const receiveFetchSong = (state: NotesByIdStore, action: ReceiveFetchSongEvent): NotesByIdStore => action.song.notes;

const notesById = createReducer<NotesByIdStore, ReceiveFetchSongEvent>({}, {
  [RECEIVE_FETCH_SONG]: receiveFetchSong
});

export default notesById;
