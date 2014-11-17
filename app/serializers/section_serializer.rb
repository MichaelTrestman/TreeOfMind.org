class SectionSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :position
end
