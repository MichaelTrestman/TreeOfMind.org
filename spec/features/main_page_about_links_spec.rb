require 'rails_helper'
describe "Main pages links", :js => true do

  context "Menu: About" do
      let!(:a_page) { FactoryGirl.create :page, :url => "about-us"}
      context "when click on a link and the drop down tab" do
        it "should take you to an about us page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "About"
          end
          within(".sub-menu") do
            click_on "About Us"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
  end

  context "Menu: About" do
      let!(:a_page) { FactoryGirl.create :page, :url => "contact-us"}
      context "when click on a link and the drop down tab" do
        it "should take you to an about us page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "About"
          end
          within(".sub-menu") do
            click_on "Contact Us"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
  end

    context "Menu: About" do
      let!(:a_page) { FactoryGirl.create :page, :url => "advertising"}
      context "when click on a link and the drop down tab" do
        it "should take you to an about us page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "About"
          end
          within(".sub-menu") do
            click_on "Advertising"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
  end

    context "Menu: About" do
      let!(:a_page) { FactoryGirl.create :page, :url => "get-involved"}
      context "when click on a link and the drop down tab" do
        it "should take you to an about us page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "About"
          end
          within(".sub-menu") do
            click_on "Get Involved"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
  end

      context "Menu: About" do
      let!(:a_page) { FactoryGirl.create :page, :url => "recruit-speakers"}
      context "when click on a link and the drop down tab" do
        it "should take you to an about us page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "About"
          end
          within(".sub-menu") do
            click_on "Recruit Speakers"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
  end

      context "Menu: About" do
      let!(:a_page) { FactoryGirl.create :page, :url => "about-ed"}
      context "when click on a link and the drop down tab" do
        it "should take you to an about us page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "About"
          end
          within(".sub-menu") do
            click_on "About Eating Disorders"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
  end

      context "Menu: About" do
      let!(:a_page) { FactoryGirl.create :page, :url => "blogs"}
      context "when click on a link and the drop down tab" do
        it "should take you to an about us page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "About"
          end
          within(".sub-menu") do
            click_on "Blogs"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
  end


end
