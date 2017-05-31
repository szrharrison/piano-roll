# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'json'

zelda_overworld = JSON.parse(File.read('./db/seed.json'))

song = zelda_overworld["header"]

this_song = Song.create_with(title:song["name"], bpm: song["bpm"].to_i, duration: zelda_overworld["duration"].to_f).find_or_create_by(title: song["name"])
zelda_overworld["tracks"].each do |track|
  track_info = {
    start_time: track["startTime"].to_f,
    duration: track["duration"].to_f,
    name: track["name"],
    instrument_id: track["instrumentNumber"].to_i,
    channel_number: track["channelNumber"].to_i
  }
  instrument_info = {
    name: track["instrument"],
    family: track["instrumentFamily"],
    midi_instrument_number: track["instrumentNumber"].to_i,
    is_percussion: track["isPercussion"]
  }

  if !!track["instrumentNumber"]
    inst = Instrument.create_with(instrument_info).find_or_create_by(midi_instrument_number: track["instrumentNumber"].to_i)
    track_create = {}.merge({instrument_id: inst[:midi_instrument_number], song: this_song}).merge(track_info)
    this_track = Track.create_with(track_create).find_or_create_by(name: track["name"])
    track["notes"].each do |note|
      note_info = {
        name: note["name"],
        pitch: note["midi"].to_i,
        start_time: note["time"].to_f,
        velocity: note["velocity"].to_f,
        duration: note["duration"].to_f
      }
      note_create = {}.merge({track: this_track}).merge(note_info)
      Note.create( note_create )
    end
  end


end
