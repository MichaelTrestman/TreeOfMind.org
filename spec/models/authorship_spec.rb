require 'rails_helper'
describe Authorship, "connection between publications and the researchers that wrote them" do

  before :each do
    @moses = Researcher.create({
      first_name: 'moses',
      last_name: 'Hebestein'
    })
    @jesus = Researcher.create({
      first_name: 'jesus',
      last_name: 'christ'
      })
    @bible = Publication.create({
      title: 'the bible'
      })
    @journey = Publication.create({
      title: 'my sensual journey'
      })
    @guide = Publication.create({
      title: 'noobs guide to Goblin Sword'
      })
    @moses.publications << @bible
    @jesus.publications << @bible
    @moses.publications << @journey
    @jesus.publications << @guide
  end
  it "connects authors and their publications" do

    expect(@guide.authors.first.first_name).to eq 'jesus'
    expect(@journey.authors.first.first_name).to eq 'moses'

    mo_pubs = []
    @moses.publications.each { |pub|
      mo_pubs << pub.title
    }
    expect(mo_pubs).to include 'the bible'
    expect(mo_pubs).to include 'my sensual journey'

    bib_auths = []
    @bible.authors.each { |auth|
      bib_auths << auth.first_name
    }
    expect(bib_auths).to include 'jesus'
    expect(bib_auths).to include 'moses'
  end
end