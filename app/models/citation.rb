class Citation < ActiveRecord::Base

  belongs_to :citer, class_name: 'Publication'
  belongs_to :reference, class_name: 'Publication'

end