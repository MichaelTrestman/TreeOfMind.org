require 'rails_helper'

describe Admin::OrganizationsController do
  let(:user) { FactoryGirl.create :admin }
  let!(:organizations) { FactoryGirl.create :organization }
  let(:attributes) { FactoryGirl.attributes_for :organization }


  before(:each) do
    stub_current_admin_user user
  end

  describe 'GET #index' do
    it 'returns all organizations.' do
      get :index
      expect(response.body).to eq({"organizations" => ActiveModel::ArraySerializer.new(Organization.all)}.to_json)
    end
  end

  describe 'PUT #update' do
    let(:name) { 'Wayne Enterprises' }
    it 'should update a field' do
      put :update, :id => organizations.id, organization: { name: name  }
      expect(organizations.reload.name).to eq(name)
    end
  end

  describe 'POST #create' do
    it 'should increase training opportunities by 1' do
      expect {
        post :create, organization: attributes
      }.to change{ Organization.count }.by(1)
    end
  end

  describe 'DELETE #destroy' do
    it 'should decrease the number of training opportunities by one' do
      expect{
        delete :destroy, id: organizations.id
      }.to change { Organization.count }.by(-1)
    end
    it "responds with the deleted training opportunity" do
      delete :destroy, id: organizations.id
      serialized_opp = OrganizationSerializer.new(organizations)
      expect(JSON.parse(response.body).to_json).to eq(serialized_opp.to_json)
    end
  end


end
