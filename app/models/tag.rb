class Tag < ActiveRecord::Base

  belongs_to :topic
  belongs_to :publications

end