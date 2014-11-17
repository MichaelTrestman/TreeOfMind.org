require 'rails_helper'

describe Member::LicensesController do
  let(:user) { FactoryGirl.create :user }
  let!(:license) { FactoryGirl.create :license, :licenseable_type => user.class.to_s, :licenseable_id => user.id }
  let(:attributes) { FactoryGirl.attributes_for :license }
  let(:serialized_license) { LicenseSerializer.new(license).as_json }

  before(:each) do
    stub_current_member_user user
  end

  describe "GET #index" do
    it 'returns all licenses' do
      get :index
      expect(response.body).to eq({"licenses" => ActiveModel::ArraySerializer.new(user.reload.licenses)}.to_json)
    end
  end

  describe "POST #create" do
    it 'should increase the license count by 1 for current user' do
      expect {
        post :create, license: attributes
      }.to change{ user.reload.licenses.count }.by(1)
    end

    it 'should not create the license if invalid attributes' do
      required_attr = [:license_number, :kind].sample
      attributes.delete required_attr
      post :create, license: attributes
      expect(response).to have_http_status(422)
    end
  end

  describe "PUT #update" do
    let(:kind) { 'shadi' }
    it 'should update a license kind for user' do
      put :update, :id => license.id, license: { kind: kind }
      expect(license.reload.kind).to eq(kind)
    end

    it 'should return a http status 422 if the kind field is blank' do
      attributes[:kind] = ''
      put :update, license: attributes, id: license.id, user_id: user.id
      expect(response).to have_http_status(422)
      expect(JSON.parse(response.body)).to eq("errors" => ["Kind can't be blank"])
    end
  end

  describe "DELETE #destroy" do
    it 'should delete an license' do
      expect {
        delete :destroy, id: license.id
      }.to change { user.reload.licenses.count }.by(-1)
    end

    it "responds with the deleted license" do
      delete :destroy, id: license.id
      expect(JSON.parse(response.body).to_json).to eq(serialized_license.to_json)
    end
  end
end
