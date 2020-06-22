import { createReducer } from "./reducerUtilities";
import { RECEIVE_FETCH_SONG, ReceiveFetchSongEvent } from "../events/receiveFetchSong";
import { SET_TRACK, SetTrackEvent } from "../events/trackSet";
import Track from "../models/track";

export type TracksStore = {
  byId: {
    [key: number]: Track
  },
  allIds: number[],
  id?: number
}

const initialState: TracksStore = {
  byId: {},
  allIds: []
};

const receiveFetchSong = (state: TracksStore, action: ReceiveFetchSongEvent): TracksStore => {
  let { tracks, song } = action.song;
  const allIds = song.tracks;
  const id = allIds[0];
  return {
    byId: tracks,
    allIds,
    id
  };
};

const setTrack = (state: TracksStore, action: SetTrackEvent): TracksStore => ({
  ...state,
  id: action.trackId
});

type Events =
  | ReceiveFetchSongEvent
  | SetTrackEvent

const tracksReducer = createReducer<TracksStore, Events>(initialState, {
  [RECEIVE_FETCH_SONG]: receiveFetchSong,
  [SET_TRACK]: setTrack
});

export default tracksReducer;
