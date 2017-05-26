class TrackSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :duration, :name, :channel_number, :instrument_id
  belongs_to :song
  belongs_to :instrument
  has_many :notes
end
