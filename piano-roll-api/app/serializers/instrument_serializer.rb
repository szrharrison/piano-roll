class InstrumentSerializer < ActiveModel::Serializer
  attributes :id, :name, :family, :is_percussion
  has_many :tracks
end
