import { schema } from "normalizr";
import Note from "./note";
import Instrument from "./instrument";
import Track from "./track";
import Song from "./song";

const noteEntity = new schema.Entity<Note>("notes", {}, {
  processStrategy: ({ start_time, ...note }) => ({
    ...note,
    startTime: start_time
  })
});

const instrumentEntity = new schema.Entity<Instrument>("instruments", {}, {
  idAttribute: "midi_instrument_number",
  processStrategy: ({ is_percussion, ...instrument }) => ({
    ...instrument,
    isPercussion: is_percussion
  })
});

const trackEntity = new schema.Entity<Track>("tracks", {
  instrument: instrumentEntity,
  notes: [noteEntity]
}, {
  processStrategy: ({ start_time, channel_number, ...track }) => ({
    ...track,
    startTime: start_time,
    channelNumber: channel_number
  })
});

noteEntity.define({
  track: trackEntity
});

const songEntity = new schema.Entity<Song>("songs", {
  tracks: [trackEntity]
});

trackEntity.define({
  song: songEntity
});

export type SchemaEntitiesShape = {
  notes: {
    [key: number]: Note
  },
  songs: {
    [key: number]: Song
  },
  tracks: {
    [key: number]: Track
  },
  instruments: {
    [key: number]: Instrument
  }
}

export {
  noteEntity,
  trackEntity,
  songEntity,
  instrumentEntity
};
