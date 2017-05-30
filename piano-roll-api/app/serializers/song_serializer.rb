class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :bpm, :duration
  has_many :tracks, include_nested_associations: true

  def tracks
    customized_tracks = []

    object.tracks.each do |track|
      # Assign object attributes (returns a hash)
      # ===========================================================
      custom_track = track.attributes

      # Custom nested and side-loaded attributes
      # ===========================================================
      # belongs_to
      custom_track[:instrument] = track.instrument.slice(:id, :name, :family, :is_percussion, :midi_instrument_number)

      # has_many w/only specified attributes
      custom_track[:notes] = track.notes.collect{|proposal| proposal.slice(:id, :name, :start_time, :velocity, :pitch, :duration)}
      # ===========================================================
      customized_tracks.push(custom_track)
    end

    return customized_tracks
  end
end
