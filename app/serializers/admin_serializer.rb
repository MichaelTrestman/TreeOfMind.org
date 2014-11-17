class AdminSerializer < ActiveModel::Serializer
  attributes :id, :email, :first_name, :last_name, :about, :type
end
