require 'rails_helper'

describe Member::LinksController do
  let(:user) { FactoryGirl.create :user }
  let!(:link) { FactoryGirl.create :link, :linkable_type => user.class.to_s, :linkable_id => user.id }
  let(:attributes) { FactoryGirl.attributes_for :link, :linkable_type => user.class.to_s, :linkable_id => user.id }
  let(:serialized_link) { LinkSerializer.new(link).as_json }

  before(:each) do
    stub_current_member_user user
  end

  describe "GET #index" do
    it 'returns all links' do
      get :index, :link => {:linkable_type => user.class.to_s, :linkable_id => user.id}
      expect(response.body).to eq({"links" => ActiveModel::ArraySerializer.new(user.links)}.to_json)
    end
  end

  describe "POST #create" do
    it 'should increase the link count by 1 for current user' do
      expect {
        post :create, link: attributes
      }.to change{ user.reload.links.count }.by(1)
    end

    it 'should not create the link if invalid attributes' do
      attributes.delete :kind
      post :create, link: attributes
      expect(response).to have_http_status(422)
      expect(JSON.parse(response.body)).to eq("errors" => ["Kind can't be blank"])
    end
  end

  describe "PUT #update" do
    let(:kind) { 'Twitter' }
    it 'should update a link kind for current user' do
      put :update, :id => link.id, link: { kind: kind }
      expect(link.reload.kind).to eq(kind)
    end

    it 'should return a http status 422 if the kind field is blank' do
      attributes[:kind] = ''
      put :update, link: attributes, id: link.id, user_id: user.id
      expect(response).to have_http_status(422)
      expect(JSON.parse(response.body)).to eq("errors" => ["Kind can't be blank"])
    end
  end

  describe "DELETE #destroy" do
    it 'should delete an link' do
      expect {
        delete :destroy, id: link.id
      }.to change { user.reload.links.count }.by(-1)
    end

    it "responds with the deleted link" do
      delete :destroy, id: link.id
      expect(JSON.parse(response.body).to_json).to eq(serialized_link.to_json)
    end
  end
end
