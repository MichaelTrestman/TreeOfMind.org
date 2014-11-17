class CreatePublications < ActiveRecord::Migration
  def change
    create_table :publications do |t|
      t.string :title
      t.string :author_first_name
      t.string :author_last_name
      t.text :abstract
      t.timestamps
    end
  end
end
