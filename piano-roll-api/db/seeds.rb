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

this_song = Song.create_with(title:song["name"], bpm: song["bpm"], duration: zelda_overworld["duration"]).find_or_create_by(title: song["name"])
zelda_overworld["tracks"].each do |track|
  track_info = {
    start_time: track["startTime"],
    duration: track["duration"],
    name: track["name"],
    instrument_id: track["instrumentNumber"],
    channel_number: track["channelNumber"]
  }
  instrument_info = {
    name: track["instrument"],
    family: track["instrumentFamily"],
    midi_instrument_number: track["instrumentNumber"],
    is_percussion: track["isPercussion"]
  }

  if !!track["instrumentNumber"]
    inst = Instrument.create_with(instrument_info).find_or_create_by(midi_instrument_number: track["instrumentNumber"])
    track_create = {}.merge({instrument_id: inst[:midi_instrument_number], song: this_song}).merge(track_info)
    this_track = Track.create_with(track_create).find_or_create_by(name: track["name"])
    track["notes"].each do |note|
      note_info = {
        name: note["name"],
        pitch: note["midi"],
        start_time: note["time"],
        velocity: note["velocity"]
      }
      note_create = {}.merge({track: this_track}).merge(note_info)
      Note.create( note_create )
    end
  end


end
