class Taxon < ActiveRecord::Base
  has_many :subtaxons, class_name: 'Taxon', foreign_key: 'supertaxon_id'
  belongs_to :supertaxon, class_name: 'Taxon'
  validates :name, :supertaxon_id, :presence => true
end