require 'rails_helper'
describe "Member Address", :js => true do
  let!(:user) { FactoryGirl.create :individual_provider }
  before(:each) do
    stub_current_member_user user
  end
  context "show" do
    let!(:address) { FactoryGirl.create :address }
    before(:each) do
      user.addresses << address
    end
    it "shows the member's address" do
      visit member_dashboard_index_path(:anchor => "addresses")
      expect(page).to have_content(address.street_1)
    end
  end
  context "create" do
    let(:attributes) { FactoryGirl.attributes_for :address }
    it "creates the address" do
      visit member_dashboard_index_path(:anchor => "addresses")
      fill_in "Street_1", :with => attributes[:street_1]
      fill_in "City", :with => attributes[:city]
      fill_in "State", :with => attributes[:state]
      fill_in "Zip", :with => attributes[:zip]
      click_on "Create"
      wait_for_ajax_to_finish
      within(".address") do
        expect(page).to have_content attributes[:street_1]
        expect(page).to have_content "Edit"
        expect(page).to have_content "Delete"
      end
    end
    it "shows errors" do
      visit member_dashboard_index_path(:anchor => "addresses")
      click_on "Create"
      wait_for_ajax_to_finish
      expect(page).to have_content "Zip can't be blank"
      expect(page).to_not have_content "Edit"
      expect(page).to_not have_content "Delete"
    end
  end
  context "update" do
    let!(:address) { FactoryGirl.create :address }
    before(:each) do
      user.addresses << address
    end
    it "creates the address" do
      visit member_dashboard_index_path(:anchor => "addresses")
      new_zip = '12345'
      click_on "Edit"
      fill_in "Zip", :with => new_zip
      click_on "Update"
      wait_for_ajax_to_finish
      expect(page).to have_content new_zip
      expect(page).to have_content "Edit"
      expect(page).to have_content "Delete"
    end
    it "shows errors" do
      visit member_dashboard_index_path(:anchor => "addresses")
      click_on "Edit"
      fill_in "Zip", :with => ""
      click_on "Update"
      wait_for_ajax_to_finish
      expect(page).to have_content "Zip can't be blank"
      expect(page).to_not have_content "Edit"
      expect(page).to_not have_content "Delete"
    end
  end
  context "destroy" do
    let!(:address) { FactoryGirl.create :address }
    before(:each) do
      user.addresses << address
    end
    it "deletes the address and shows the form" do
      visit member_dashboard_index_path(:anchor => "addresses")
      click_on "Delete"
      wait_for_ajax_to_finish
      expect(page).to_not have_content address.zip
      expect(page).to_not have_content "Edit"
      expect(page).to_not have_content "Delete"
      expect { fill_in "Zip", :with => "12345" }.to_not raise_error
    end
  end
end
