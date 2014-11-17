require 'rails_helper'


describe "Individual Provider Personal Information", :js => true do
  let(:user) {FactoryGirl.create :individual_provider}

  before(:each) do
    stub_current_member_user user
  end

  it "will update user information" do
    visit member_dashboard_index_path
    click_on "personal information"
    new_info = {
      :first_name => "new first",
      :last_name => "new last",
      :email => "new@email.com",
      :about => "New about"
    }
    within(".personal-info") do
      find('.edit-info').click
      fill_in "First_name", :with => new_info[:first_name]
      fill_in "Last_name", :with => new_info[:last_name]
      fill_in "About", :with => new_info[:about]
      click_on "Update"
    end
    wait_for_ajax_to_finish
    expect(page).to have_content new_info[:first_name]
    expect(page).to have_content new_info[:last_name]
    expect(page).to have_content new_info[:about]
  end

end
