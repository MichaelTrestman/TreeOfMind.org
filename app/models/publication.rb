class Publication < ActiveRecord::Base
  has_many :references
  has_many :researchers, through: :references
  has_many :authorships
  has_many :researchers, through: :authorships
  has_many :distributions
  has_many :taxons, through: :distributions
  has_many :tags
  has_many :topics, through: :tags

end