import Song from "../models/song";

export type ReceiveFetchSongsEvent = {
  type: typeof RECEIVE_FETCH_SONGS,
  status: "success",
  receivedAt: number,
  songs: Song[]
}

const receiveFetchSongs = (songs: Song[]): ReceiveFetchSongsEvent => ({
  type: RECEIVE_FETCH_SONGS,
  status: "success",
  receivedAt: Date.now(),
  songs
});

export const RECEIVE_FETCH_SONGS = "song.RECEIVE_FETCH_SONGS";

export default receiveFetchSongs;
