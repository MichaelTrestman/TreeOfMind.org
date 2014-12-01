require 'rails_helper'

describe PublicationsController do
  before(:all) do
    Publication.delete_all
    @pubs = []
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

    end

  end

  describe "GET#index" do
    context 'with no query' do
      it "returns the 20 most recently added publications" do

        get :index
        expect(response).to have_http_status(200)

        pubbers = JSON.parse(response.body)['publications']

        expect(pubbers.length).to be 5

      end
    end
    context 'with a query string' do

    end

  end

end