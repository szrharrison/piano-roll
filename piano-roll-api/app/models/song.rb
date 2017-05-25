class Song < ApplicationRecord
  has_many :tracks
  has_many :notes, through: :tracks
  has_many :instruments, through: :tracks
end
