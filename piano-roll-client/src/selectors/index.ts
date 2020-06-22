import { createSelector } from "reselect";
import _ from "lodash";
import { ReduxStore } from "../reducers";
import Track from "../models/track";
import Instrument from "../models/instrument";
import Note from "../models/note";

const getNotes = (state: ReduxStore) => state.music.notesById;
const getInstruments = (state: ReduxStore) => state.music.instrumentsById;
const getTracks = (state: ReduxStore) => state.music.tracks.byId;
const getTrackId = (state: ReduxStore) => state.music.tracks.id;
const getToneBuffers = (state: ReduxStore) => state.music.tone.buffers;
const getToneLoaded = (state: ReduxStore) => state.music.tone.loaded;

const getTrack = createSelector(
  [getTracks, getTrackId],
  (tracks, trackId) => tracks[trackId] as Track || null
);

const getInstrument = createSelector(
  [getInstruments, getTrack],
  (instruments, track) => {
    if (track) {
      return instruments[track.instrument] as Instrument | null;
    } else {
      return null;
    }
  }
);

const empty: Note[] = [];
export const getTrackNotes = createSelector(
  [getNotes, getTrack],
  (notes, track) => {
    if (track) {
      return track.notes.map(noteId => notes[noteId]) as Note[];
    } else {
      return empty;
    }
  }
);

export const getInstrumentName = createSelector(
  [getInstrument],
  (instrument) => {
    if (instrument) {
      return instrument.name.replace(/ /g, "_").replace(/[()]/g, "");
    } else {
      return "clarinet";
    }
  }
);

export const getStillLoading = createSelector(
  [getToneBuffers, getToneLoaded],
  (buffers, loaded) => _.difference(buffers, loaded)
);
