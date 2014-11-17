require 'rails_helper'

describe Tag do
  let!(:tag){FactoryGirl.create :tag}
  context "associations" do
    it {should belong_to(:taggable)}
  end
  context "validations" do
      it {should validate_presence_of(:name)}
  end

end
