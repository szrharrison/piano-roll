class Track < ApplicationRecord
  belongs_to :song
  belongs_to :instrument
  has_many :notes
end
