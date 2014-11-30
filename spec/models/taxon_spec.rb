require 'rails_helper'
describe Taxon do
  before :each do
    Taxon.delete_all
    @animals = Taxon.create({
        name: 'animals'
      })

    @animals.add_subtaxon({name: 'monkeys'})
    @monkeys = Taxon.where({name: 'monkeys'})

  end
  it "has subtaxa" do
    puts "**********"
    p Taxon.where({name: "monkeys"}).first

    p @animals.subtaxons

    expect(@animals.subtaxons.length > 0).to eq true

    expect(@animals.subtaxons).to include @monkeys
  end
  it "has a supertaxon" do
    # p @monkeys
    # p @animals.name
    # p @animals.supertaxon_id

  end

  # it "is nestable" do
  #   expect(@animals.name).to eq "animals"
  #   expect(@animals.subtaxons.first.name).to eq 'monkeys'
  #   expect(@monkeys.supertaxon).to be @animals

  # end


end