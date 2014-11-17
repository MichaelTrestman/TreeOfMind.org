require 'rails_helper'

describe Link do
	let!(:link){FactoryGirl.create :link}
	context "validations" do
		it { should validate_presence_of :url }
		it { should validate_presence_of :kind }
		it { should allow_value('https://www.google.com/?gws_rd=ssl').for(:url) }
		it { should_not allow_value('foo').for(:url) }
	end
  context "relationships" do
    it { should belong_to(:linkable)}
  end
end
