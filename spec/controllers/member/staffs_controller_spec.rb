require 'rails_helper'

describe Member::StaffsController do
  let(:user) { FactoryGirl.create :program }
  let!(:staff) { FactoryGirl.create :staff, :staffable_type => user.class.to_s, :staffable_id => user.id}
  let(:attributes) { FactoryGirl.attributes_for :staff, :staffable_type => user.class.to_s, :staffable_id => user.id }
  let(:serialized_staff) { StaffSerializer.new(staff).as_json }

  before(:each) do
    stub_current_member_user user
  end

  describe "GET #index" do
    it 'returns all staff for user' do
      get :index, :staff => {:staffable_type => user.class.to_s, :staffable_id => user.id}
      expect(response.body).to eq({"staffs" => ActiveModel::ArraySerializer.new(user.staffs)}.to_json)
    end
  end

  describe "POST #create" do
    it 'should increase the staff count by 1 for current user' do
      expect {
        post :create, staff: attributes
      }.to change{ user.reload.staffs.count }.by(1)
    end

    it 'should not create a staff member if invalid attributes' do
      required_attr = [:title, :name].sample
      attributes.delete required_attr
      post :create, staff: attributes
      expect(response).to have_http_status(422)
    end
  end

  describe "PUT #update" do
    let(:title) { 'shadi' }
    it 'should update a staff title for user' do
      put :update, :id => staff.id, staff: { title: title }
      expect(staff.reload.title).to eq(title)
    end

    it 'should return a http status 422 if the kind field is blank' do
      attributes[:title] = ''
      put :update, staff: attributes, id: staff.id, user_id: user.id
      expect(response).to have_http_status(422)
      expect(JSON.parse(response.body)).to eq("errors" => ["Title can't be blank"])
    end
  end

  describe "DELETE #destroy" do
    it 'should delete an staff' do
      expect {
        delete :destroy, id: staff.id
      }.to change { Staff.count }.by(-1)
    end

    it "responds with the deleted staff" do
      delete :destroy, id: staff.id
      expect(JSON.parse(response.body).to_json).to eq(serialized_staff.to_json)
    end
  end
end
