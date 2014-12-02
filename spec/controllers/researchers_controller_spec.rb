require 'rails_helper'

describe ResearchersController do

  before(:each) do

    Researcher.delete_all
    Publication.delete_all
    25.times do

      first_name = Faker::Lorem.word
      last_name = Faker::Lorem.word
      chump = Researcher.create({
        first_name: first_name,
        last_name: last_name
      })


      5.times do
        title = Faker::Lorem.sentence(rand(6 + 4 ))
        abstract = Faker::Lorem.paragraph(rand(6+4))

        topics = []

        pub = Publication.create({
          title: title,
          abstract: abstract,
        })

        3.times do
          topic_title = Faker::Lorem.sentence(rand(3+1))
          topic_description = Faker::Lorem.paragraph(rand(4+2))

          pub.topics << Topic.create({
            title: topic_title,
            description: topic_description
            })
          end
          chump.publications << pub
        end

    end
  end

  describe "GET#index" do
    it "should refer to real shit" do
      expect(Researcher.count).to be 25
      bob = Researcher.limit(20).sample
      expect(bob.publications.count).to be 5
      expect(bob.publications.sample.topics.count).to be 3
      expect(bob.publications.sample.topics.sample.class).to be Topic
    end

    context 'with no query' do
      it "returns the 20 most recently added researchers" do

        get :index
        expect(response).to have_http_status 200

        bod = JSON.parse(response.body)
        researchers = bod['researchers']
        expect(researchers.length).to be 20
        rando = researchers.sample
        expect(rando['first_name']).not_to be nil
      end
    end

  end
  describe "GET#show" do
    it "returns a researcher with all publications and topics" do
      rando = Researcher.all.sample
      id = rando.id
      get :show, id: id
      bod = JSON.parse(response.body)
      expect(bod['researcher']['first_name']).to eq rando.first_name
      expect(bod['publications'].count).to eq rando.publications.count
      titles = []
      rando.publications.each { |pub| titles << pub.title }

      shtopics = []
      rando.publications.each { |pub|

        pub.topics.each { |topic|
          shtopics << topic.title
        }
      }
      expect(titles).to include bod['publications'].sample['title']
      expect(shtopics).to include bod['topics'].sample['title']

    end
  end

end
