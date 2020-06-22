import { normalize } from "normalizr";
import _ from "lodash";

import Instrument from "../models/instrument";
import Note from "../models/note";
import Song from "../models/song";
import Track from "../models/track";
import { SchemaEntitiesShape, songEntity } from "../models/schema";

export type ReceiveFetchSongEvent = {
  type: typeof RECEIVE_FETCH_SONG,
  status: "success",
  receivedAt: number,
  song: Omit<SchemaEntitiesShape, "songs"> & { song: Song }
}

const receiveFetchSong = (originalSong): ReceiveFetchSongEvent => {
  const normalized = normalize<Song | Track | Note | Instrument, SchemaEntitiesShape, number>(originalSong, songEntity);
  const song = normalized.entities;

  return {
    type: RECEIVE_FETCH_SONG,
    status: "success",
    receivedAt: Date.now(),
    song: {
      ..._.omit<SchemaEntitiesShape, "songs">(song, "songs"),
      song: song.songs[normalized.result]
    }
  };
};

export const RECEIVE_FETCH_SONG = "song.RECEIVE_FETCH_SONG";
export default receiveFetchSong;
