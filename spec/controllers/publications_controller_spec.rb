require 'rails_helper'

describe PublicationsController do

  before(:all) do
    Publication.delete_all
    @pubs = []
    25.times do
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

        get :index, {query: 'recent'}
        expect(response).to have_http_status(200)

        pubbers = JSON.parse(response.body)['publications']

        expect(pubbers.length).to be 20

      end
    end
    context 'with a query string' do
    end


  end

  describe "POST#add_author" do
    it "adds an author" do

      @bob = Researcher.create({first_name: 'bob', last_name: 'bobson'})
      @book = Publication.create({title: 'my shitty book'})
      @book.reload
      @bob.reload
      puts "********"
      p (@book)
      p @bob


      post :add_author, {publication: {
          id: @book.id,
          title: @book.title
        },
        author_id: @bob.id
      }

      expect(@bob.publications.first.title).to eq @book.title
      expect(@book.authors.first.last_name).to eq @bob.last_name

    end
  end
end