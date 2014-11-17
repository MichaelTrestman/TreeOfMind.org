require 'rails_helper'
describe AdsController do
  let!(:ad) { FactoryGirl.create :ad, :active}
  let(:serialized_ads) { ActiveModel::ArraySerializer.new(Ad.active) }
  context "#index" do
    it "renders all active ads" do
      get :index
      expect(response.body).to eq({"ads" => serialized_ads}.to_json)
    end
  end
end
