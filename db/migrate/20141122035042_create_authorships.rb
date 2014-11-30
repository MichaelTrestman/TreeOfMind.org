class CreateAuthorships < ActiveRecord::Migration
  def change
    create_table :authorships do |t|

      t.belongs_to :researcher
      t.belongs_to :publication

    end
  end
end
