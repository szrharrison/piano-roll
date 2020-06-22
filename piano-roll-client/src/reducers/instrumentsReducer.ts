import { createReducer } from "./reducerUtilities";
import Instrument from "../models/instrument";
import { RECEIVE_FETCH_SONG, ReceiveFetchSongEvent } from "../events/receiveFetchSong";

export type InstrumentsByIdStore = {
  [id: number]: Instrument
}

const receiveFetchSong = (state: InstrumentsByIdStore, action: ReceiveFetchSongEvent): InstrumentsByIdStore => {
  let { instruments } = action.song;
  return instruments;
};

const instruments = createReducer<InstrumentsByIdStore, ReceiveFetchSongEvent>({}, {
  [RECEIVE_FETCH_SONG]: receiveFetchSong
});

export default instruments;
