require 'rails_helper'
describe "Authentication", :js => true do
  context "signup" do
    let(:user_attributes) { FactoryGirl.attributes_for :user }
    it "redirects to root_path on success and replaces join with logout" do
      visit root_path
      click_on "Join APTED"
      click_on "Signup"
      fill_in "Email", :with => user_attributes[:email]
      fill_in "Password", :with => user_attributes[:password]
      click_on "Signup"
      wait_for_ajax_to_finish
      expect(page).to have_content("Account")
      expect { click_on("Join APTED") }.to raise_error(Capybara::ElementNotFound)
    end
    it "shows errors on failure" do
      visit root_path
      click_on "Join APTED"
      click_on "Signup"
      fill_in "Password", :with => user_attributes[:password]
      click_on "Signup"
      wait_for_ajax_to_finish
      expect(page).to have_content("Email can't be blank")
      expect { click_on("Account") }.to raise_error(Capybara::ElementNotFound)
    end
  end
  context "login" do
    let!(:user) { FactoryGirl.create :user }
    it "redirects to member_path on success and replaces join with logout" do
      visit root_path
      click_on "Join APTED"
      fill_in "Email", :with => user.email
      fill_in "Password", :with => user.password
      click_on "Login"
      wait_for_ajax_to_finish
      expect(page).to have_content "Account"
    end
    it "shows errors on failure" do
      visit root_path
      click_on "Join APTED"
      fill_in "Email", :with => "bad@email.com"
      fill_in "Password", :with => user.password
      click_on "Login"
      wait_for_ajax_to_finish
      expect(page).to have_content("Invalid email and password combination")
      expect { click_on("Account") }.to raise_error(Capybara::ElementNotFound)
    end
  end
end
