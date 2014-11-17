class PageSerializer < ActiveModel::Serializer
  attributes :id, :title, :abstract, :header, :url
  has_many :sections
end
