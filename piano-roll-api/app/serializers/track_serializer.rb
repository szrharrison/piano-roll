class TrackSerializer < ActiveModel::Serializer
  attributes :id, :start_time, :duration, :name, :channel_number
  belongs_to :song
  belongs_to :instrument
  has_many :notes
end
