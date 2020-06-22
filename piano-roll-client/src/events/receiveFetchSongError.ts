export type ReceiveFetchSongErrorEvent = {
  type: typeof RECEIVE_FETCH_SONG_ERROR,
  status: "error",
  receivedAt: number,
  error: any
}

const receiveFetchSongError = (error): ReceiveFetchSongErrorEvent => ({
  type: RECEIVE_FETCH_SONG_ERROR,
  status: "error",
  receivedAt: Date.now(),
  error
});

export const RECEIVE_FETCH_SONG_ERROR = "fetchSong.RECEIVE_FETCH_SONG_ERROR";
export default receiveFetchSongError;
