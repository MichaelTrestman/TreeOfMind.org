require 'rails_helper'

describe Section do
  let!(:section) { FactoryGirl.create :section }
  context "validations" do
    context "associations" do
      it { should belong_to :page }
    end
    context "fields" do
      it { should validate_presence_of :body }
    end
  end
end
