require 'rails_helper'

describe IndividualProvider do
  context "inheritence" do
    it "can create as a IndividualProvider type" do
    expect {User.create(email: "bob@smith.com", password: "123", password_confirmation: "123", type: "IndividualProvider")}.to change{IndividualProvider.count}.by(1)
    end
  end
end
