20.times do

  title = Faker::Lorem.sentence(rand(6)+1)
  abstract = Faker::Lorem.paragraph(rand(6)+1)
  Publication.create({title: title, abstract: abstract})

end