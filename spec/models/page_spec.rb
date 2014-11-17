require 'rails_helper'

describe Page do
  let!(:page) { FactoryGirl.create :page }
  context "validations" do
    context "fields" do
      it { should validate_presence_of(:title) }
    end
    context "associations" do
      it { should have_many :sections }
    end
  end
end
