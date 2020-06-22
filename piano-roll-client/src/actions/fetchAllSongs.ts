import { fetchSongsRequest } from "../api";
import requestFetchSongs from "../events/requestFetchSongs";
import receiveFetchSongsError from "../events/receiveFetchSongsError";
import receiveFetchSongs from "../events/receiveFetchSongs";

const fetchAllSongs = () => {
  return dispatch => {
    dispatch(requestFetchSongs());

    fetchSongsRequest()
      .then(data => {
        if (data.error) {
          dispatch(receiveFetchSongsError(data.error));
        } else {
          dispatch(receiveFetchSongs(data));
        }
      });
  };
};

export default fetchAllSongs;
