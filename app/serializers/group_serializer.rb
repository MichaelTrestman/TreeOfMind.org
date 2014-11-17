class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :kind, :description, :cost, :join_details
  has_many :addresses, as: :addressable
  has_many :contacts, as: :contactable
end
