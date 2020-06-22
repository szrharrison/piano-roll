import { FINISHED_LOADING } from "./events/playersLoaded";
import { LOADING } from "./events/playersLoading";
import { PASS_TIME } from "./events/passTime";
import { RECEIVE_CREATE_SONG } from "./events/receiveCreateSong";
import { RECEIVE_CREATE_SONG_ERROR } from "./events/receiveCreateSongError";
import { RECEIVE_FETCH_SONG } from "./events/receiveFetchSong";
import { RECEIVE_FETCH_SONG_ERROR } from "./events/receiveFetchSongError";
import { RECEIVE_FETCH_SONGS } from "./events/receiveFetchSongs";
import { RECEIVE_FETCH_SONGS_ERROR } from "./events/receiveFetchSongsError";
import { REQUEST_CREATE_SONG } from "./events/requestCreateSong";
import { REQUEST_FETCH_SONG } from "./events/requestFetchSong";
import { REQUEST_FETCH_SONGS } from "./events/requestFetchSongs";
import { SET_TRACK } from "./events/trackSet";
import { START_TIME } from "./events/startTime";
import { STOP_TIME } from "./events/stopTime";
import { TOGGLE_BOOLEAN } from "./events/toggleBoolean";

export const fetchSongs = {
  REQUEST_CREATE_SONG,
  RECEIVE_CREATE_SONG_ERROR,
  REQUEST_FETCH_SONGS,
  RECEIVE_FETCH_SONGS_ERROR
}

export const fetchSong = {
  REQUEST_FETCH_SONG,
  RECEIVE_FETCH_SONG_ERROR
}

export const songTypes = {
  RECEIVE_CREATE_SONG,
  RECEIVE_FETCH_SONG,
  RECEIVE_FETCH_SONGS
}

export const tracks = {
  SET_TRACK
}

export const tone = {
  LOADING,
  FINISHED_LOADING
}

export const time = {
  PASS_TIME,
  TOGGLE_BOOLEAN,
  START_TIME,
  STOP_TIME
}
