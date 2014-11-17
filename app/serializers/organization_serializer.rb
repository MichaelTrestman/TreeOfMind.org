class OrganizationSerializer < ActiveModel::Serializer
  attributes :name, :id
  has_many :phones
  has_many :links
  has_many :addresses
  has_many :tags
end
