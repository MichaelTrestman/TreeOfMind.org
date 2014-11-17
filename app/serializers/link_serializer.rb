class LinkSerializer < ActiveModel::Serializer
  attributes :id, :url, :kind
end