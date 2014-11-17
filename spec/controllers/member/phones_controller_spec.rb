require 'rails_helper'

describe Member::PhonesController do
  let(:user) { FactoryGirl.create :user }
  let!(:phone) { FactoryGirl.create :phone, :phoneable_type => 'User', :phoneable_id => user.id}
  let(:attributes) { FactoryGirl.attributes_for :phone, :phoneable_type => 'User', :phoneable_id => user.id }
  let(:serialized_phone) { PhoneSerializer.new(phone).as_json }

  before(:each) do
    stub_current_member_user user
  end

  describe "GET #index" do
    it 'returns all phone for user' do
      get :index, :phone => {:phoneable_type => 'User', :phoneable_id => user.id}
      expect(response.body).to eq({"phones" => ActiveModel::ArraySerializer.new(user.phones)}.to_json)
    end
  end

  describe "POST #create" do
    it 'should increase the phone count by 1 for current user' do
      expect {
        post :create, phone: attributes
      }.to change{ user.reload.phones.count }.by(1)
    end

    it 'should not create a phone member if invalid attributes' do
      required_attr = [:phone_number, :kind].sample
      attributes.delete required_attr
      post :create, phone: attributes
      expect(response).to have_http_status(422)
    end
  end

  describe "PUT #update" do
    let(:phone_number) { 'shadi' }
    it 'should update a phone phone_number for user' do
      put :update, :id => phone.id, phone: { phone_number: phone_number }
      expect(phone.reload.phone_number).to eq(phone_number)
    end

    it 'should return a http status 422 if the kind field is blank' do
      attributes[:phone_number] = ''
      put :update, phone: attributes, id: phone.id, user_id: user.id
      expect(response).to have_http_status(422)
      expect(JSON.parse(response.body)).to eq("errors" => ["Phone number can't be blank"])
    end
  end

  describe "DELETE #destroy" do
    it 'should delete an phone' do
      expect {
        delete :destroy, id: phone.id
      }.to change { Phone.count }.by(-1)
    end

    it "responds with the deleted phone" do
      delete :destroy, id: phone.id
      expect(JSON.parse(response.body).to_json).to eq(serialized_phone.to_json)
    end
  end
end
