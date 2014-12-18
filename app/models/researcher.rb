class Researcher < ActiveRecord::Base
  has_many :authorships
  has_many :publications, through: :authorships
  has_many :distributions, through: :publications
  def coauthors
    _coauthors = []
    self.publications.each do |pub|
      pub.authors.each do |author|
        _coauthors << author
      end
    end
    _coauthors = _coauthors.uniq
    _coauthors.delete(self)
    _coauthors
  end
end