require 'rails_helper'

describe Member::TagsController do
  let(:user) { FactoryGirl.create :user }
  let(:organization) { FactoryGirl.create :organization }
  let!(:tag) { FactoryGirl.create :tag, :taggable_type => 'Organization', :taggable_id => organization.id}
  let(:attributes) { FactoryGirl.attributes_for :tag, :taggable_type => 'Organization', :taggable_id => organization.id }
  let(:serialized_tag) { TagSerializer.new(tag).as_json }

  before(:each) do
    stub_current_member_user user
  end

  describe "GET #index" do
    it 'returns all tag for org' do
      get :index, :tag => {:taggable_type => 'Organization', :taggable_id => organization.id}
      expect(response.body).to eq({"tags" => ActiveModel::ArraySerializer.new(organization.tags)}.to_json)
    end
  end

  describe "POST #create" do
    it 'should increase the tag count by 1 for organization' do
      expect {
        post :create, tag: attributes
      }.to change{ organization.reload.tags.count }.by(1)
    end
  end

  describe "DELETE #destroy" do
    it 'should delete an tag' do
      expect {
        delete :destroy, id: tag.id
      }.to change { Tag.count }.by(-1)
    end

    it "responds with the deleted tag" do
      delete :destroy, id: tag.id
      expect(JSON.parse(response.body).to_json).to eq(serialized_tag.to_json)
    end
  end
end
