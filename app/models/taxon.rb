class Taxon < ActiveRecord::Base
  has_many :subtaxons, class_name: 'Taxon'
  belongs_to :supertaxon, class_name: 'Taxon', foreign_key: 'supertaxon_id'
  validates :name, :presence => true

  def add_subtaxon(subTaxonAttributes)
    # puts "$$$$$$$$$$$"
    # p self.id
    subTaxonAttributes[:supertaxon_id] = self.id
    subTaxon = Taxon.create(subTaxonAttributes)
    # self.subtaxons << subTaxon
    # subTaxon.supertaxon = self
  end

end