require 'rails_helper'

describe ContactsController do
  let(:user) { FactoryGirl.create :user }
  let!(:contact) { FactoryGirl.create :contact, :contactable_type => user.class.to_s, :contactable_id => user.id }
  let(:attributes) { FactoryGirl.attributes_for :contact, :contactable_type => user.class.to_s, :contactable_id => user.id }
  let(:serialized_contacts) { ActiveModel::ArraySerializer.new(user.contacts) }
  before(:each) do
    FactoryGirl.create :contact
    stub_current_member_user user
  end

  describe "GET #index" do
    it 'returns all contacts' do
      get :index, :contact => {:contactable_type => user.class.to_s, :contactable_id => user.id}
      expect(response.body).to eq({"contacts" => serialized_contacts}.to_json)
    end
  end

  describe "POST #create" do
    it 'should increase the contact count by 1 for current user' do
      post :create, contact: attributes
      expect(user.reload.contacts).to include(contact)
    end
    it 'should not create the contact if invalid attributes' do
      required_attr = [:name, :email].sample
      attributes.delete required_attr
      post :create, contact: attributes
      expect(response).to have_http_status(422)
      expect(JSON.parse(response.body)).to eq("errors" => ["#{required_attr.to_s.camelize} can't be blank"])
    end
  end

  describe "PUT #update" do
    let(:name) { 'alex' }
    it 'should update a field for current user' do
      put :update, :id => contact.id, contact: { name: name }
      expect(contact.reload.name).to eq(name)
      expect(JSON.parse(response.body).to_json).to eq(ContactSerializer.new(contact).to_json)
    end
    it 'should return a http status 422 if the city field is blank' do
      attributes[:name] = ''
      put :update, contact: attributes, id: contact.id, user_id: user.id
      expect(response).to have_http_status(422)
      expect(JSON.parse(response.body)).to eq("errors" => ["Name can't be blank"])
    end
  end

  describe "DELETE #destroy" do
    it 'should delete a contact' do
      expect {
        delete :destroy, id: contact.id
      }.to change { Contact.count }.by(-1)
    end
    it "responds with the deleted contact" do
      delete :destroy, id: contact.id
      expect(JSON.parse(response.body).to_json).to eq(ContactSerializer.new(contact).to_json)
    end
  end
end
