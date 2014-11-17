require 'rails_helper'
describe "Training Opportunities", :js => true do
  let!(:training_opportunity) { FactoryGirl.create :training_opportunity }
  let(:user) { FactoryGirl.create :admin }

  before(:each) do
    stub_current_admin_user user
  end

  context "Opportunity list" do
    it "shows a list of available training opportunities" do
    visit admin_dashboard_index_path(:anchor => "trainingOpportunities")
      expect(page).to have_content(training_opportunity.employer_name)
    end
  end

  context "delete button" do
    it "removes a training opportunity from the screen" do
      visit admin_dashboard_index_path(:anchor => "trainingOpportunities")
      click_on "Delete"
      wait_for_ajax_to_finish
      expect(page).to_not have_content(training_opportunity.employer_name)
    end
  end

  context "edit button" do
    it "renders a form to edit an existing training opportunity" do
    visit admin_dashboard_index_path(:anchor => "trainingOpportunities")
    click_on "Edit"
    expect(page).to have_selector("div.trainOpp form")
    end
  end
end