import { createReducer } from "./reducerUtilities";
import { REQUEST_FETCH_SONG, RequestFetchSongEvent } from "../events/requestFetchSong";
import { RECEIVE_FETCH_SONG_ERROR, ReceiveFetchSongErrorEvent } from "../events/receiveFetchSongError";
import { RECEIVE_FETCH_SONG, ReceiveFetchSongEvent } from "../events/receiveFetchSong";

const initialState = {
  isFetching: false
};
export type FetchSongStore = {
  isFetching: boolean
  error?: any
  status?: "success" | "error"
  receivedAt?: number
}

const requestFetchSong = (state: FetchSongStore): FetchSongStore => ({
  ...state,
  isFetching: true
});

const receiveFetchSongError = (state: FetchSongStore, action: ReceiveFetchSongErrorEvent): FetchSongStore => {
  const { type: errorType, ...errorProps } = action;
  return {
    ...state,
    isFetching: false,
    ...errorProps
  };
};

const receiveFetchSong = (state: FetchSongStore, action: ReceiveFetchSongEvent): FetchSongStore => {
  const { type: successType, song, ...successProps } = action;
  return {
    ...state,
    isFetching: false,
    ...successProps
  };
};

type Events =
  | RequestFetchSongEvent
  | ReceiveFetchSongEvent
  | ReceiveFetchSongErrorEvent;

const fetchSongReducer = createReducer<FetchSongStore, Events>(initialState, {
  [REQUEST_FETCH_SONG]: requestFetchSong,
  [RECEIVE_FETCH_SONG_ERROR]: receiveFetchSongError,
  [RECEIVE_FETCH_SONG]: receiveFetchSong
});

export default fetchSongReducer;
