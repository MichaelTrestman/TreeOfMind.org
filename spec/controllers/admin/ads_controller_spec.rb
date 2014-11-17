require 'rails_helper'

describe Admin::AdsController do
	let!(:ad) { FactoryGirl.create :ad }
	let(:attributes) { FactoryGirl.attributes_for :ad }
	let(:serialized_ad) { AdSerializer.new(ad).as_json }
	let(:user) { FactoryGirl.create :admin }

  before(:each) do
    stub_current_admin_user user
  end

	describe "POST #create" do
		it 'should increase the ad count by 1 for current user' do
			expect {
				post :create, ad: attributes
			}.to change{ Ad.count }.by(1)
		end
		it 'should not create the ad if invalid attributes' do
			required_attr = [:organization, :url].sample
			attributes.delete required_attr
			post :create, ad: attributes
			expect(response).to have_http_status(422)
			expect(JSON.parse(response.body)).to eq("errors" => "#{required_attr.to_s.camelize} can't be blank")
		end
	end

	describe "PUT #update" do
		let!(:ad) { FactoryGirl.create :ad }
		it 'should change the organization' do
			new_org = "new org"
			expect {
				put :update, ad: {:organization => new_org}, :id => ad.id
			}.to change{ ad.reload.organization }.to(new_org)
		end
		it 'should not update the ad if invalid attributes' do
			required_attr = [:organization, :url].sample
			attributes[required_attr] = ""
			put :update, ad: attributes, :id => ad.id
			expect(response).to have_http_status(422)
			expect(JSON.parse(response.body)).to eq("errors" => "#{required_attr.to_s.camelize} can't be blank")
		end
	end

	describe "DELETE #destroy" do
	  it 'should delete an ad' do
	    expect {
	      delete :destroy, id: ad.id
	    }.to change { Ad.count }.by(-1)
	  end
	  it "responds with the deleted ad" do
	    delete :destroy, id: ad.id
	    expect(JSON.parse(response.body).to_json).to eq(serialized_ad.to_json)
	  end
	end
end
