require 'rails_helper'

describe Address do
  let(:individual_provider) { FactoryGirl.create :individual_provider }
  let!(:address) { FactoryGirl.create :address, :zip => '98225', :addressable_type => individual_provider.class.to_s, :addressable_id => individual_provider.id }
  context "relationships" do
    it { should belong_to(:addressable)}
  end
  context "validations" do
    [:street_1, :city, :state, :zip].each do |attr|
      it { should validate_presence_of attr }
    end
  end
  context "after validation" do
    it "should have lat/long coordinates" do
      expect(address.latitude).to be_kind_of(Float)
      expect(address.longitude).to be_kind_of(Float)
    end
  end

  describe "#get_addressable_within_radius" do
    before(:each) do
      program = FactoryGirl.create :program
      FactoryGirl.create :address, :zip => '98225', :addressable_type => program.class.to_s, :addressable_id => program.id
    end
    it "returns the addressable within the given radius" do
      allow(Address).to receive(:near) { [address] }
      expect(Address.get_addressable_within_radius('98225', 20, individual_provider.class.to_s)).to eq([individual_provider])
    end
  end



end
