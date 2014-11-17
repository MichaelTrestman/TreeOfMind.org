class AdSerializer < ActiveModel::Serializer
	attributes :id, :organization, :url, :active, :starts, :ends
  has_one :image
end
