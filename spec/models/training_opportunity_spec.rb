require 'rails_helper'

describe TrainingOpportunity do
    let!(:training_opportunity) { FactoryGirl.create :training_opportunity }
  context "Validations" do
    it { should validate_presence_of :poster_initials }
    it { should validate_presence_of :employer_name }
    it { should validate_presence_of :position_name }
    it { should validate_presence_of :job_description }
    it { should validate_presence_of :contact_email }
    context "format" do
      it { should allow_value("user@email.com").for(:contact_email) }
      it { should_not allow_value("useremail").for(:contact_email) }
    end
  end
end
