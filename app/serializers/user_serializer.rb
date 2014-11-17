class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :about, :type
  has_one :image
end
