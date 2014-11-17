require 'rails_helper'

describe Group do
  let!(:group){FactoryGirl.create :group}
  context "validations" do
    [:name, :kind, :description, :cost, :join_details].each do |attr|
      it { should validate_presence_of attr }
    end
  end
  context "relationships" do
    it { should have_many(:contacts) }
    it { should have_many(:addresses) }
  end
end
