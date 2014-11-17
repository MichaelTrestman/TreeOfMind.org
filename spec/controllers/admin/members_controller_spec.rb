require 'rails_helper'

describe Admin::MembersController, :type => :controller do
  let!(:admin) { FactoryGirl.create :admin }
  before(:each) do
    stub_current_admin_user admin
  end
  context "#index" do
    let!(:ip) { FactoryGirl.create :individual_provider }
    let!(:program) { FactoryGirl.create :program }
    it "returns the all indiviudal provders" do
      serialized_member = ActiveModel::ArraySerializer.new(IndividualProvider.all)
      get :index, :type => ip.class.to_s
      expect(response.body).to eq({"members" => serialized_member}.to_json)
    end
    it "returns the all programs" do
      serialized_member = ActiveModel::ArraySerializer.new(Program.all)
      get :index, :type => program.class.to_s
      expect(response.body).to eq({"members" => serialized_member}.to_json)
    end
  end
end
