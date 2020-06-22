export type RequestCreateSongEvent = {
  type: typeof REQUEST_CREATE_SONG
}

const requestCreateSong = (): RequestCreateSongEvent => ({
  type: REQUEST_CREATE_SONG
});

export const REQUEST_CREATE_SONG = "fetchSongs.REQUEST_CREATE_SONG";

export default requestCreateSong;
