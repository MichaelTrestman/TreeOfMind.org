class CreateCitations < ActiveRecord::Migration

  def change
    create_table :citations do |t|
      t.belongs_to :citer
      t.belongs_to :reference
    end
  end
end
