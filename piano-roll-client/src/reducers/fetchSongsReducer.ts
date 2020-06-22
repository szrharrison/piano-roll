import { createReducer } from "./reducerUtilities";
import { REQUEST_FETCH_SONGS, RequestFetchSongsEvent } from "../events/requestFetchSongs";
import { RECEIVE_FETCH_SONGS_ERROR, ReceiveFetchSongsErrorEvent } from "../events/receiveFetchSongsError";
import { RECEIVE_FETCH_SONGS, ReceiveFetchSongsEvent } from "../events/receiveFetchSongs";

export type FetchSongsStore = {
  areFetching: boolean,
  status?: "success" | "error",
  receivedAt?: number
  error?: any
}

const initialState = {
  areFetching: false
};

const requestFetchSongs = (state: FetchSongsStore, action: RequestFetchSongsEvent): FetchSongsStore => ({
  ...state,
  areFetching: true
});

const receiveFetchSongsError = (state: FetchSongsStore, action: ReceiveFetchSongsErrorEvent): FetchSongsStore => {
  const { type: errorType, ...allErrorProps } = action;
  return {
    ...state,
    areFetching: false,
    ...allErrorProps
  };
};

const receiveFetchSongs = (state: FetchSongsStore, action: ReceiveFetchSongsEvent): FetchSongsStore => {
  const { type: successType, songs, ...allSuccessProps } = action;
  return {
    ...state,
    areFetching: false,
    ...allSuccessProps
  };
};

type Events =
  | RequestFetchSongsEvent
  | ReceiveFetchSongsErrorEvent
  | ReceiveFetchSongsEvent;

const fetchSongsReducer = createReducer<FetchSongsStore, Events>(initialState, {
  [REQUEST_FETCH_SONGS]: requestFetchSongs,
  [RECEIVE_FETCH_SONGS_ERROR]: receiveFetchSongsError,
  [RECEIVE_FETCH_SONGS]: receiveFetchSongs
});

export default fetchSongsReducer;
