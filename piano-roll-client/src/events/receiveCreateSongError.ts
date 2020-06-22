export type ReceiveCreateSongErrorEvent = {
  type: typeof RECEIVE_CREATE_SONG_ERROR,
  status: "error",
  receivedAt: number,
  error: any
}

const receiveCreateSongError = (error): ReceiveCreateSongErrorEvent => ({
  type: RECEIVE_CREATE_SONG_ERROR,
  status: "error",
  receivedAt: Date.now(),
  error
});

export const RECEIVE_CREATE_SONG_ERROR = "fetchSongs.RECEIVE_CREATE_SONG_ERROR";

export default receiveCreateSongError;
