class Track < ApplicationRecord
  belongs_to :song
  belongs_to :instrument, primary_key: 'midi_instrument_number'
  has_many :notes
end
