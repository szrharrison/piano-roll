class NoteSerializer < ActiveModel::Serializer
  attributes :id, :velocity, :pitch, :start_time, :duration
end
