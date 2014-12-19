require_relative "publication_seeds"

def log_pubs pubs
  pubs.each do |pub|
    if Publication.where({title: pub[:title]}).count > 0
      db_pub = Publication.where({title: pub[:title]})[0]
    else
      db_pub = Publication.create({
        title: pub[:title],
        publication_date: pub[:publication_date]
      })
    end

    pub[:authors].each do |auth|
      this_author = {}
      this_author[:name] = auth.split(',')
      this_author[:last_name] = this_author[:name][0]
      this_author[:first_name] = this_author[:name][1]

      if db_pub.authors.any?{ |db_auth|
        this_author[:first_name] + this_author[:last_name] == db_auth.first_name + db_auth.last_name
      }
        {message: 'author previously in list'}
      elsif Researcher.any?{ |db_auth|
        this_author[:first_name] + this_author[:last_name]  == db_auth.first_name + db_auth.last_name
      }
        new_author = Researcher.where({
          first_name: this_author[:first_name],
          last_name: this_author[:last_name]
        })[0]
        db_pub.authors << new_author
        new_author.publications << db_pub
      else
        new_author = Researcher.create({
          first_name: this_author[:first_name],
          last_name: this_author[:last_name]
        })
        db_pub.authors << new_author
        new_author.publications << db_pub
      end
    end
  end
end
log_pubs $trestman_to_z_pubs


# animal_names = ['bears', 'elephants', 'unicrons', 'dinosaurs', 'velociraptors', 't-rexes', 'whales', 'dolphins', 'platypus', 'octopus', 'squids', 'shrimps', 'wormy things', 'clams' ]
# animal_names.each { |a| Taxon.create({name: a}) }

# firstnames = ['dingus', 'joe', 'mary', 'dorkerella']
# lastnames = ['smith', 'jackson', 'dorkenstein', 'blobface']
# firstnames.each do |fn|
#   Researcher.create({first_name: fn, last_name: lastnames.sample})
# end
# 5.times do
#   Topic.create({
#     title: Faker::Lorem.sentence(rand(3)+1)
#   })
# end

# 10.times do

#   title = Faker::Lorem.sentence(rand(6)+1)
#   abstract = Faker::Lorem.paragraph(rand(6)+1)
#   x = Publication.create({title: title, abstract: abstract})

#   (rand(3)+1).times {
#     auth = Researcher.all.sample

#     x.authors << auth
#     auth.publications << x

#   }
#   (rand(3)+1).times {
#     x.topics << Topic.all.sample
#   }
# end












