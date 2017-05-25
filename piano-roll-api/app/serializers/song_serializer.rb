class SongSerializer < ActiveModel::Serializer
  attributes :id, :title, :bpm, :duration
  has_many :tracks
  has_many :notes, through: :tracks
end
