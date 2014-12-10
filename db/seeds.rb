animal_names = ['bears', 'elephants', 'unicrons', 'dinosaurs', 'velociraptors', 't-rexes', 'whales', 'dolphins', 'platypus', 'octopus', 'squids', 'shrimps', 'wormy things', 'clams' ]
animal_names.each { |a| Taxon.create({name: a}) }

firstnames = ['dingus', 'joe', 'mary', 'dorkerella']
lastnames = ['smith', 'jackson', 'dorkenstein', 'blobface']
firstnames.each do |fn|
  Researcher.create({first_name: fn, last_name: lastnames.sample})
end
5.times do
  Topic.create({
    title: Faker::Lorem.sentence(rand(3)+1)
  })
end

10.times do

  title = Faker::Lorem.sentence(rand(6)+1)
  abstract = Faker::Lorem.paragraph(rand(6)+1)
  x = Publication.create({title: title, abstract: abstract})

  (rand(3)+1).times {
    auth = Researcher.all.sample

    x.authors << auth
    auth.publications << x

  }
  (rand(3)+1).times {
    x.topics << Topic.all.sample
  }
end


