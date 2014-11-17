class PhoneSerializer < ActiveModel::Serializer
  attributes :id, :phone_number, :kind
end
