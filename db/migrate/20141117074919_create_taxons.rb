class CreateTaxons < ActiveRecord::Migration
  def change
    create_table :taxons do |t|
      t.string :name
      t.string :other_kind_of_name
      t.integer :supertaxon_id
    end
  end
end
