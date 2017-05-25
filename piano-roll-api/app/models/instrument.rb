class Instrument < ApplicationRecord
  has_many :tracks
  has_many :songs, through: :tracks
  has_many :notes, through: :tracks
end
