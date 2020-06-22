export type ReceiveFetchSongsErrorEvent = {
  type: typeof RECEIVE_FETCH_SONGS_ERROR,
  status: "error",
  receivedAt: number,
  error: any
}

const receiveFetchSongsError = (error): ReceiveFetchSongsErrorEvent => ({
  type: RECEIVE_FETCH_SONGS_ERROR,
  status: "error",
  receivedAt: Date.now(),
  error
});

export const RECEIVE_FETCH_SONGS_ERROR = "fetchSongs.RECEIVE_FETCH_SONGS_ERROR";

export default receiveFetchSongsError;
