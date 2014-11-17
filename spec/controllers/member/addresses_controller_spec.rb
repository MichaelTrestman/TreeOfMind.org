require 'rails_helper'

describe Member::AddressesController do
  let(:user) { FactoryGirl.create :user }
  let!(:address) { FactoryGirl.create :address, :addressable_type => user.class.to_s, :addressable_id => user.id }
  let(:attributes) { FactoryGirl.attributes_for :address, :addressable_type => user.class.to_s, :addressable_id => user.id }
  let(:serialized_addresses) { ActiveModel::ArraySerializer.new(user.addresses) }
  before(:each) do
    FactoryGirl.create :address #no addressable, shouldn't show in our api calls
    stub_current_member_user user
  end

  describe "GET #index" do
    it 'returns all addresses' do
      get :index, :address => {:addressable_type => user.class.to_s, :addressable_id => user.id}
      expect(response.body).to eq({"addresses" => serialized_addresses}.to_json)
    end
  end

  describe "POST #create" do
    it 'should increase the address count by 1 for current user' do
      post :create, address: attributes
      expect(user.reload.addresses).to include(address)
    end
    it 'should not create the address if invalid attributes' do
      required_attr = [:city, :state, :zip].sample
      attributes.delete required_attr
      post :create, address: attributes
      expect(response).to have_http_status(422)
      expect(JSON.parse(response.body)).to eq("errors" => ["#{required_attr.to_s.camelize} can't be blank"])
    end
  end

  describe "POST #search" do
    let(:individual_provider) { FactoryGirl.create :individual_provider }
    let(:serialized_provider) { ActiveModel::ArraySerializer.new([individual_provider]) }
    it "should return the right addresses" do
      allow(Address).to receive(:get_addressable_within_radius) { [individual_provider] }
      post :search, {zip: address.zip, radius: 10, type: "individual provider"}
      expect(response.body).to eq({"addresses" => serialized_provider}.to_json)
    end
  end

  describe "PUT #update" do
    let(:city) { 'oakland' }
    it 'should update a field for current user' do
      put :update, :id => address.id, address: { city: city }
      expect(address.reload.city).to eq(city)
      expect(JSON.parse(response.body).to_json).to eq(AddressSerializer.new(address).to_json)
    end
    it 'should return a http status 422 if the city field is blank' do
      attributes[:city] = ''
      put :update, address: attributes, id: address.id, user_id: user.id
      expect(response).to have_http_status(422)
      expect(JSON.parse(response.body)).to eq("errors" => ["City can't be blank"])
    end
  end

  describe "DELETE #destroy" do
    it 'should delete an address' do
      expect {
        delete :destroy, id: address.id
      }.to change { Address.count }.by(-1)
    end
    it "responds with the deleted address" do
      delete :destroy, id: address.id
      expect(JSON.parse(response.body).to_json).to eq(AddressSerializer.new(address).to_json)
    end
  end
end
