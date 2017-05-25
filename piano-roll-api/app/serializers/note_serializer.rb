class NoteSerializer < ActiveModel::Serializer
  attributes :id, :velocity, :pitch, :start_time
  belongs_to :track
end
