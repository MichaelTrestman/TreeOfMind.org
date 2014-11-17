class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :starts, :ends, :repeat, :description, :cost, :continuing_education, :website_link
end
