require 'rails_helper'
describe "Main pages links", :js => true do

  context "Menu: Resources" do
      let!(:a_page) { FactoryGirl.create :page, :url => "referrals"}
      context "when click on a link and the drop down tab" do
        it "should take you to an about the correct page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "Resources"
          end
          within(".sub-menu") do
            click_on "Referrals"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
  end

  context "Menu: Resources" do
    let!(:a_page) { FactoryGirl.create :page, :url => "telephone"}
      context "when click on a link and the drop down tab" do
        it "should take you to the correct page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "Resources"
          end
          within(".sub-menu") do
            click_on "Telephone"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
  end

  context "Menu: Resources" do
    let!(:a_page) { FactoryGirl.create :page, :url => "media"}
      context "when click on a link and the drop down tab" do
        it "should take you to the correct page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "Resources"
          end
          within(".sub-menu") do
            click_on "Media"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
  end
end
