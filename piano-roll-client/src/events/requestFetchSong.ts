export type RequestFetchSongEvent = {
  type: typeof REQUEST_FETCH_SONG
}
const requestFetchSong = (): RequestFetchSongEvent => ({
  type: REQUEST_FETCH_SONG
});

export const REQUEST_FETCH_SONG = "fetchSong.REQUEST_FETCH_SONG"

export default requestFetchSong;
