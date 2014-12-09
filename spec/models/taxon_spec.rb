require 'rails_helper'
describe Taxon do
  before :each do
    Taxon.delete_all
    @animals = Taxon.create({
        name: 'animals'
      })

    @animals.add_subtaxon({name: 'monkeys'})
    @monkeys = Taxon.where({name: 'monkeys'})[0]

  end
  it "has subtaxa" do
    expect(@animals.subtaxons.length > 0).to eq true

    expect(@animals.subtaxons.any? { |sub| sub.name == 'monkeys' }).to be true
  end
  it "has a supertaxon" do
    expect(@monkeys.supertaxon.name).to eq "animals"
  end

  it "is nestable" do
      expect(@animals.subtaxons[0].supertaxon.name).to eq @animals.name

  end


end