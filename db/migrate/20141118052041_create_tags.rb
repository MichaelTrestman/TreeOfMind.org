class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|

      t.belongs_to :topic
      t.belongs_to :publication

    end
  end
end
