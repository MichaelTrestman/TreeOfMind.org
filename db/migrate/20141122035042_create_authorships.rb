class CreateAuthorships < ActiveRecord::Migration
  def change
    create_table :authorships do |t|

      # t.belongs_to :author, class_name: 'Researcher'
      # t.belongs_to :publication
      t.integer :researcher_id
      t.integer :publication_id

    end
  end
end
