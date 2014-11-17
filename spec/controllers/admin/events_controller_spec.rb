require 'rails_helper'

describe Admin::EventsController do
  let(:user) { FactoryGirl.create :admin }
  let!(:event) { FactoryGirl.create :event }
  let(:attributes) {FactoryGirl.attributes_for :event}

  before(:each) do
    stub_current_admin_user user
  end
  describe "events#create" do
    context 'with valid name, date, time, repeat, description, cost, link' do
      it "creates a new event" do
        expect{
          post :create, event: attributes
        }.to change{ Event.count }.by(1)
      end
    end
  end

  describe 'POST #create' do
    it 'should increase the event count' do
      expect {
        post :create, event: attributes
      }.to change{ Event.count}.by(1)
    end
    it 'should not create event with invalid attributes' do
      attributes[:name] = nil
      post :create, event: attributes
      expect(response).to have_http_status(422)
    end
  end

  describe 'GET #show' do
    it 'should return a 200 response status if event exists' do
      get :show, id: event.id
      expect(response.status).to eq(200)
    end
    it 'renders an event json object' do
      get :show, id: event.id
      expect(response.body).to eq(EventSerializer.new(event).to_json)
    end
  end

  describe "PUT #update" do
    it "should update an event" do
      put :update, id: event.id, event: {name: 'alex'}
      expect(event.reload.name).to eq('alex')
    end
  end

  describe "DELETE #destroy" do
    it 'should delete an event' do
      expect {
        delete :destroy, id: event.id
      }.to change { Event.count }.by(-1)
    end
    it 'responds with the deleted event' do
      delete :destroy, id: event.id
      expect(response.body).to eq(EventSerializer.new(event).to_json)
    end
  end
end
