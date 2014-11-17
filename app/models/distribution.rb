class Distribution < ActiveRecord::Base
  has_many :publications
  has_many :researchers, through: :publications
  has_many :taxons
end