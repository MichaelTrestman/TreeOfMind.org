require 'rails_helper'
describe "Links", :js => true do
  let(:user) { FactoryGirl.create :user }
  let!(:license) { FactoryGirl.create :license, :licenseable_type => user.class.to_s, :licenseable_id => user.id }
  before(:each) do
    stub_current_member_user user
  end

  describe "user can see their member dashboard" do
    it "which shows a list of all licenses" do
      visit member_dashboard_index_path(:anchor => "licenses")
      expect(page).to have_content license.license_number
    end

    describe "and can create a license" do
      context "with valid parameters" do
        it "that will be appended to the page" do
          visit member_dashboard_index_path(:anchor => "licenses")
          within(".licenses") do
            fill_in "License_number", :with => license.license_number
            fill_in "Kind", :with => license.kind
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content license.kind
        end
      end
      context "with invalid parameters" do
        context "where the parameters are blank" do
          it "which will render error messages on the page" do
            visit member_dashboard_index_path(:anchor => "licenses")
            within(".licenses") do
              fill_in "License_number", :with => ""
              fill_in "Kind", :with => ""
              click_on "Create"
            end
            wait_for_ajax_to_finish
            debugger
            expect(page).to have_content "Kind can't be blank"
            expect(page).to have_content "License number can't be blank"
          end
        end
      end
    end

    describe "and can edit a license" do
      context "with valid parameters" do
        it "which updates the license kind" do
          visit member_dashboard_index_path(:anchor => "licenses")
          within(".licenses") do
            fill_in "License_number", :with => "www.google.com"
            fill_in "Kind", :with => "Google"
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content "Google"
        end
      end
      context "with invalid parameters" do
        context "where the parameters are blank" do
          it "which will render error message on the page when kind is blank" do
            visit member_dashboard_index_path(:anchor => "licenses")
            within(".licenses .license") do
              first(:link, "Edit").click
              fill_in "License_number", :with => ""
              fill_in "Kind", :with => ""
              click_on "Update"
            end
            wait_for_ajax_to_finish
            expect(page).to have_content "Kind can't be blank"
            expect(page).to have_content "License number can't be blank"
          end
        end
      end
    end

    describe "and can delete a license" do
      it "which the license from the page" do
        visit member_dashboard_index_path(:anchor => "licenses")
        within(".licenses") do
          first(:link, 'Delete').click
        end
        wait_for_ajax_to_finish
        expect(page).to_not have_content license.kind
      end
    end
  end
end
