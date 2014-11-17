class CreateResearchers < ActiveRecord::Migration
  def change
    create_table :researchers do |t|
      t.string :first_name
      t.string :last_name
      t.string :attributes_firebase_url
    end
  end
end
