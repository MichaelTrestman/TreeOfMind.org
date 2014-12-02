class Authorship < ActiveRecord::Base

  belongs_to :researcher
  belongs_to :publication

end