class AddPublicationDateToPublications < ActiveRecord::Migration
  def change
    add_column :publications, :publication_date, :string
  end
end
