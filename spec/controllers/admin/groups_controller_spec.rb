require 'rails_helper'

describe Admin::GroupsController do
  let(:user) { FactoryGirl.create :admin }
  let!(:group) { FactoryGirl.create :group }
  let(:attributes) { FactoryGirl.attributes_for :group }
  before(:each) do
     stub_current_admin_user user
  end

  describe "GET #index" do
    it 'returns all groups' do
      serialized_group = ActiveModel::ArraySerializer.new(Group.all)
      get :index
      expect(response.body).to eq({"groups" => serialized_group}.to_json)
    end
  end

  describe "POST #create" do
    it 'should increase the group count by 1 for current user' do
      expect {
        post :create, group: attributes
      }.to change{ Group.count }.by(1)
    end
    it 'should not create the group with invalid attributes' do
      required_attr = [:name, :kind, :description, :cost].sample
      attributes.delete required_attr
      post :create, group: attributes
      expect(response).to have_http_status(422)
      expect(JSON.parse(response.body)).to eq("errors" => ["#{required_attr.to_s.camelize} can't be blank"])
    end
  end

  describe "PUT #update" do
    let(:name) { 'Shadi Support Group' }
    it 'should update a field for current user' do
      put :update, :id => group.id, group: { name: name }
      expect(group.reload.name).to eq(name)
      expect(JSON.parse(response.body).to_json).to eq(GroupSerializer.new(group).to_json)
    end
    it 'should return a http status 422 if the name field is blank' do
      attributes[:name] = ''
      put :update, group: attributes, id: group.id
      expect(response).to have_http_status(422)
      expect(JSON.parse(response.body)).to eq("errors" => ["Name can't be blank"])
    end
  end

  describe "DELETE #destroy" do
    it 'should delete an group' do
      expect {
        delete :destroy, id: group.id
      }.to change { Group.count }.by(-1)
    end
    it "responds with the deleted group" do
      delete :destroy, id: group.id
      expect(JSON.parse(response.body).to_json).to eq(GroupSerializer.new(group).to_json)
    end
  end
end
