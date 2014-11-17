require 'rails_helper'

describe Contact do
  let!(:contact){FactoryGirl.create :contact}
  context "validations" do
    [:name, :email].each do |attr|
      it { should validate_presence_of attr }
    end
  end
  context "relationships" do
    it { should have_many(:phones) }
  end
end
