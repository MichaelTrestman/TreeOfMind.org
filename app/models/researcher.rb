class Researcher < ActiveRecord::Base
  has_many :publications
  has_many :distributions, through: :publications
end