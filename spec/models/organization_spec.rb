require 'rails_helper'

describe Organization do
  let!(:organization){FactoryGirl.create :organization}
  context "validations" do
    it { should validate_presence_of :name }
    end
  context "associations" do
    it  { should have_many :phones }
    it { should have_many :links }
    it { should have_many :addresses}
  end
  end
