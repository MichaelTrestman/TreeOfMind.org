require 'rails_helper'

describe Phone do
  let!(:phone){FactoryGirl.create :phone}
  context "validations" do
    it { should validate_presence_of :phone_number}
    it { should validate_presence_of :kind}
  end
  context "relationships" do
    it { should belong_to(:phoneable)}
  end
end
