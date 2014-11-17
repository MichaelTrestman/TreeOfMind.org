require 'rails_helper'

describe Admin::PackagesController do

  let!(:mempack1) {FactoryGirl.create :package, {type: 'MembershipPackage', name: 'mempack1'}  }
  let!(:mempack2) {FactoryGirl.create :package, {type: 'MembershipPackage', name: 'mempack2'}  }
  let!(:adpack1) {FactoryGirl.create :package, {type: 'AdvertisingPackage', name: 'adpack1'}  }
  let!(:adpack2) {FactoryGirl.create :package, {type: 'AdvertisingPackage', name: 'adpack2'}  }
  let(:adpack_attributes) {FactoryGirl.attributes_for :package, {type: 'AdvertisingPackage'}}
  let(:mempack_attributes) {FactoryGirl.attributes_for :package, {type: 'MembershipPackage'}}


  describe "GET #index" do
    context 'without a type param' do
      it "gets all the packages" do

        get :index
        data = JSON.parse response.body
          expect(data["packages"].length).to eq 4
          expect(
            data["packages"].any?{|p| p["name"] == 'adpack1'}
            ).to be true
          expect(
            data["packages"].any?{|p| p["name"] == 'mempack1'}
            ).to be true
      end
    end
    context 'with a type param' do
      it "gets the packages of specified type" do
        get :index, type: 'AdvertisingPackage'
        data = JSON.parse response.body
          expect(data["packages"].length).to be 2
          expect(
            data["packages"].any?{|p| p["name"] == 'adpack1'}
            ).to be true
          expect(
            data["packages"].any?{|p| p["name"] == 'mempack1'}
            ).to be false
      end
    end
  end

  describe "POST #create {type: 'Advertising'}" do
    it "creates a new advertising package" do
      expect {
        post :create, package: adpack_attributes
      }.to change{ AdvertisingPackage.count }.by(1)
      expect {
        post :create, package: adpack_attributes
      }.to change{ Package.count }.by(1)
    end
    it "doesn't create a new membership package" do
      expect {
        post :create, package: adpack_attributes
      }.to change{ MembershipPackage.count }.by(0)
    end
  end
  describe " POST #create {type: 'Membership'}" do
    it "creates a new membership package" do
      expect {
        post :create, package: mempack_attributes
      }.to change{ MembershipPackage.count }.by(1)
      expect {
        post :create, package: mempack_attributes
      }.to change{ Package.count }.by(1)
    end
    it "doesn't create a new advertising package" do
      expect {
        post :create, package: mempack_attributes
      }.to change{ AdvertisingPackage.count }.by(0)
    end
  end

  describe "PUT #update" do
    let(:name) { "fuggin sweet-ass package" }
    it "should update a field" do
      mempack1_name = mempack1.name
      expect(mempack1.name).to eq mempack1_name
      put :update, id: mempack1.id, package: {name: name }
      mempack1.reload
      expect(mempack1.name).to eq name

    end

    it "should update a field" do
      adpack1_name = adpack1.name
      expect(adpack1.name).to eq adpack1_name
      put :update, id: adpack1.id, package: {name: name }
      adpack1.reload
      expect(adpack1.name).to eq name
    end
  end
  describe "DELETE #destroy" do
    it "should delete a package" do
      mempack_id = mempack1.id
      expect( Package.find(mempack1.id)).not_to be nil
      expect{ Package.find(mempack_id)}.not_to raise_error
      expect {
        delete :destroy, id: mempack1.id
      }.to change { Package.count }.by(-1)
      expect{ Package.find(mempack_id)}.to raise_error

    end
    it "shouldn't delete the wrong package" do
      expect {
        delete :destroy, id: mempack1.id
      }.to change { AdvertisingPackage.count }.by(0)
    end
  end
end
