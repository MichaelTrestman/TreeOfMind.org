require 'rails_helper'

describe Program do
  context "inheritence" do
    it "can create as a Program type" do
    expect {User.create(email: "bob@smith.com", password: "123", password_confirmation: "123", type: "Program")}.to change{Program.count}.by(1)
    end
  end
end


