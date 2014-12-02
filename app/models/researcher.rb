class Researcher < ActiveRecord::Base
  has_many :authorships
  has_many :publications, through: :authorships
  has_many :distributions, through: :publications
end