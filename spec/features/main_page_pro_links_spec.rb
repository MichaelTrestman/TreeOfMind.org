require 'rails_helper'
describe "Main pages links", :js => true do

  context "Menu: Professional" do
    let!(:a_page) { FactoryGirl.create :page, :url => "professional-development-opportunities"}
      context "when click on a link and the drop down tab" do
        it "should take you to the correct page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "For Professionals"
          end
          within(".sub-menu") do
            click_on "Professional Development Opportunities"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
    end

    context "Menu: Professional" do
    let!(:a_page) { FactoryGirl.create :page, :url => "peer-support"}
      context "when click on a link and the drop down tab" do
        it "should take you to the correct page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "For Professionals"
          end
          within(".sub-menu") do
            click_on "Peer Support & Consultation Groups"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
    end

    context "Menu: Professional" do
    let!(:a_page) { FactoryGirl.create :page, :url => "employment-opportunities"}
      context "when click on a link and the drop down tab" do
        it "should take you to the correct page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "For Professionals"
          end
          within(".sub-menu") do
            click_on "Employment Opportunities"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
    end

  context "Menu: Professional" do
    let!(:a_page) { FactoryGirl.create :page, :url => "training-opportunities"}
      context "when click on a link and the drop down tab" do
        it "should take you to the correct page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "For Professionals"
          end
          within(".sub-menu") do
            click_on "Training Opportunities"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
    end

  context "Menu: Professional" do
    let!(:a_page) { FactoryGirl.create :page, :url => "prof-get-involved"}
      context "when click on a link and the drop down tab" do
        it "should take you to the correct page" do
          visit root_path
          within(".main_menu_horizontal_functionality") do
            click_on "For Professionals"
          end
          within(".sub-menu") do
            click_on "Get Involved"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content a_page.title
        end
      end
    end


  end
