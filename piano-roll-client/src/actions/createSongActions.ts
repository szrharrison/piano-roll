import { createSong } from "../api";
import requestCreateSong from "../events/requestCreateSong";
import receiveCreateSongError from "../events/receiveCreateSongError";
import receiveCreateSong from "../events/receiveCreateSong";
import Song from "../models/song";

export const fetchCreateSong = (song: Song) => {
  return (dispatch) => {
    dispatch(requestCreateSong());

    createSong(song)
      .then(data => {
        if (data.error) {
          dispatch(receiveCreateSongError(data.error));
        } else {
          dispatch(receiveCreateSong(data));
        }
      });
  };
};
