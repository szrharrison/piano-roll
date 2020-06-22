export type RequestFetchSongsEvent = { type: typeof REQUEST_FETCH_SONGS };

const requestFetchSongs = (): RequestFetchSongsEvent => ({
  type: REQUEST_FETCH_SONGS
});

export const REQUEST_FETCH_SONGS = "fetchSongs.REQUEST_FETCH_SONGS";

export default requestFetchSongs;
