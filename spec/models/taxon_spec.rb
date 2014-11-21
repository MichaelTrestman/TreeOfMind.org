# require 'rails_helper'
# describe Taxon do
#   before :each do
#     @animals = Taxon.create({
#         name: 'animals'
#       })
#     # @monkeys = Taxon.create({
#     #     name: 'monkeys'
#     #   })
#     @animals.subtaxons << Taxon.create({name: 'monkeys'})
#     @monkeys = Taxon.find_by({name: 'monkeys'})
#   end
#   it "does something" do
#     expect(@animals.name).to eq "animals"
#   end
#   it "should nest" do
#     expect(@animals.subtaxons.first).to be @monkeys
#   end
#   it "does something" do
#     expect(@monkeys.supertaxon).to be @animals
#   end
# end