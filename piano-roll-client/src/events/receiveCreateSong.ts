import Song from "../models/song";

export type ReceiveCreateSongEvent = {
  type: typeof RECEIVE_CREATE_SONG,
  status: "success",
  receivedAt: number,
  song: Song
}

export const receiveCreateSong = (song: Song): ReceiveCreateSongEvent => ({
  type: RECEIVE_CREATE_SONG,
  status: "success",
  receivedAt: Date.now(),
  song
});

export const RECEIVE_CREATE_SONG = "song.RECEIVE_CREATE_SONG";

export default receiveCreateSong;
