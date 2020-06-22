import { combineReducers, Reducer } from "redux";

import fetchSong, { FetchSongStore } from "./fetchSongReducer";
import fetchSongs, { FetchSongsStore } from "./fetchSongsReducer";
import instrumentsById, { InstrumentsByIdStore } from "./instrumentsReducer";
import notesById, { NotesByIdStore } from "./notesReducer";
import Song from "../models/song";
import tone, { ToneStore } from "./toneReducer";
import tracks, { TracksStore } from "./tracksReducer";
import { createReducer } from "./reducerUtilities";
import { RECEIVE_FETCH_SONG, ReceiveFetchSongEvent } from "../events/receiveFetchSong";
import { RECEIVE_FETCH_SONGS, ReceiveFetchSongsEvent } from "../events/receiveFetchSongs";


const receiveFetchSongs = (state: AllSongsStore, action: ReceiveFetchSongsEvent) => action.songs;
const receiveFetchSong = (state: Song, action: ReceiveFetchSongEvent): Song => ({ ...action.song.song });

export type MusicStore = {
  song: SongStore,
  allSongs: AllSongsStore,
  tracks: TracksStore,
  notesById: NotesByIdStore,
  instrumentsById: InstrumentsByIdStore,
  fetchSongs: FetchSongsStore,
  fetchSong: FetchSongStore,
  tone: ToneStore
}

type SongStore = Song
const song: Reducer<SongStore> = createReducer<SongStore, ReceiveFetchSongEvent>({}, {
  [RECEIVE_FETCH_SONG]: receiveFetchSong
});

type AllSongsStore = Song[]
const allSongs = createReducer<AllSongsStore, ReceiveFetchSongsEvent>([], {
  [RECEIVE_FETCH_SONGS]: receiveFetchSongs
});

const musicReducer: Reducer<MusicStore> = combineReducers({
  song,
  allSongs,
  tracks,
  notesById,
  instrumentsById,
  fetchSongs,
  fetchSong,
  tone
});
export default musicReducer;
