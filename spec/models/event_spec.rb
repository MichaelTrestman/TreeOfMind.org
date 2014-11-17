require 'rails_helper'

describe Event do
  context "validations" do
    [:name, :starts, :ends, :description, :cost, :continuing_education, :website_link].each do |attr|
        it { should validate_presence_of attr }
    end
  end
end
