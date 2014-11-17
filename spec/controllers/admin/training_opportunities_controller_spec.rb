require 'rails_helper'

describe Admin::TrainingOpportunitiesController do
  let!(:trainingOpportunities) { FactoryGirl.create :training_opportunity }
  let(:attributes) { FactoryGirl.attributes_for :training_opportunity }

  describe 'GET #index' do
    it 'returns all training opportunities.' do
      get :index
      expect(response.body).to eq({"training_opportunities" => ActiveModel::ArraySerializer.new(TrainingOpportunity.all)}.to_json)
    end
  end

  describe 'PUT #update' do
    let(:employer_name) { 'Wayne Enterprises' }
    it 'should update a field' do

      put :update, :id => trainingOpportunities.id, trainingOpportunities: { employer_name: employer_name  }
      expect(trainingOpportunities.reload.employer_name).to eq(employer_name)
    end
  end

  describe 'POST #create' do
    it 'should increase training opportunities by 1' do
      expect {
        post :create, trainingOpportunities: attributes
      }.to change{ TrainingOpportunity.count }.by(1)
    end
  end

  describe 'DELETE #destroy' do
    it 'should decrease the number of training opportunities by one' do
      expect{
        delete :destroy, id: trainingOpportunities.id
      }.to change { TrainingOpportunity.count }.by(-1)
    end
    it "responds with the deleted training opportunity" do
      delete :destroy, id: trainingOpportunities.id
      serialized_opp = TrainingOpportunitySerializer.new(trainingOpportunities)
      expect(JSON.parse(response.body).to_json).to eq(serialized_opp.to_json)
    end
  end
end
