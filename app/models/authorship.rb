class Authorship < ActiveRecord::Base

  belongs_to :author, class_name: 'Researcher', foreign_key: 'researcher_id'
  belongs_to :publication, foreign_key: 'publication_id'

end