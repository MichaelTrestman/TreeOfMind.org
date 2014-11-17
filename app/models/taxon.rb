class Taxon < ActiveRecord::Base
  has_many :subtaxa, class_name: 'Taxon'
  belongs_to :supertaxon, class_name: 'Taxon'
  validates :name, :supertaxon
end