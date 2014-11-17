class ContactSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :website, :contact_hours
end
