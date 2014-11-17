require 'rails_helper'
describe "Main pages links", :js => true do

  context "Menu: Treatment" do
    let!(:a_page) { FactoryGirl.create :page, :url => "outpatient-providers"}
      context "when click on a link and the drop down tab" do
        it "should take you to the correct page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "Find Treatment"
          end
          within(".sub-menu") do
            click_on "Outpatient Providers"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
    end


  context "Menu: Treatment" do
    let!(:a_page) { FactoryGirl.create :page, :url => "tx-programs"}
      context "when click on a link and the drop down tab" do
        it "should take you to the correct page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "Find Treatment"
          end
          within(".sub-menu") do
            click_on "Tx Programs"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
    end


    context "Menu: Treatment" do
    let!(:a_page) { FactoryGirl.create :page, :url => "groups"}
      context "when click on a link and the drop down tab" do
        it "should take you to the correct page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "Find Treatment"
          end
          within(".sub-menu") do
            click_on "Groups"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
    end
  end
