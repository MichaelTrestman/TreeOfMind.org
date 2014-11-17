require 'rails_helper'

describe Ad do
	context "validations" do
		[:organization, :url, :starts, :ends].each do |attr|
			it {should validate_presence_of attr}
		end
	end
end