import { fetchSongRequest } from "../api";
import requestFetchSong from "../events/requestFetchSong";
import receiveFetchSongError from "../events/receiveFetchSongError";
import receiveFetchSong from "../events/receiveFetchSong";

export function fetchSingleSong(songId) {
  return function(dispatch) {
    dispatch(requestFetchSong());

    fetchSongRequest(songId)
      .then(data => {
        if (data.error) {
          dispatch(receiveFetchSongError(data.error));
        } else {
          dispatch(receiveFetchSong(data));
        }
      });
  };
}

