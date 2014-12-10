class Publication < ActiveRecord::Base

  has_many :citations
  has_many :references, through: :citations




  has_many :citations
  has_many :references, through: :citations
  has_many :authorships
  has_many :authors, through: :authorships
  has_many :distributions
  has_many :taxons, through: :distributions
  has_many :tags
  has_many :topics, through: :tags

end