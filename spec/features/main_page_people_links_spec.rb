require 'rails_helper'
describe "Main pages links", :js => true do

  context "Menu: People in Recovery and Loved Ones" do
      let!(:a_page) { FactoryGirl.create :page, :url => "support-resources"}
      context "when click on a link and the drop down tab" do
        it "should take you to an about the correct page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "People in Recovery and Loved Ones"
          end
          within(".sub-menu") do
            click_on "Support Resources"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
  end


  context "Menu: People in Recovery and Loved Ones" do
    let!(:a_page) { FactoryGirl.create :page, :url => "volunteer-mentor"}
      context "when click on a link and the drop down tab" do
        it "should take you to the correct page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "People in Recovery and Loved Ones"
          end
          within(".sub-menu") do
            click_on "Volunteer & Mentor Programs"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
  end
end

