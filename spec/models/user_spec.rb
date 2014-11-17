require 'rails_helper'

describe User do
  subject { FactoryGirl.create :user }
  context "validations" do
    it { should allow_value("user@email.com").for(:email) }
    it { should_not allow_value("user@email").for(:email) }
    it { should_not allow_value("email.com").for(:email) }
    it { should validate_presence_of :email }
    it { should validate_uniqueness_of :email }
  end
  context "relationships" do
    it { should have_many(:addresses)}
    it { should have_many(:links)}
    it { should have_many(:phones)}
    it { should have_many(:licenses)}
  end
end
