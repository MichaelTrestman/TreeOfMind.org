require 'rails_helper'

describe License do
  let!(:license){FactoryGirl.create :license}
  context "validations" do
    it { should validate_presence_of :license_number }
    it { should validate_presence_of :kind }
  end
  context "relationships" do
    it { should belong_to(:licenseable)}
  end
end
