require 'rails_helper'
describe "Staffs", :js => true do
  let(:user) { FactoryGirl.create :program }
  let!(:staff) { FactoryGirl.create :staff, :staffable_type => 'User', :staffable_id => user.id }
  before(:each) do
    stub_current_member_user user
  end

  describe "user can see their member dashboard" do
    it "which shows the dashboard title" do
      visit member_dashboard_index_path(:anchor => "staffs")
      expect(page).to have_content "Member Dashboard"
    end

    it "which shows a list of all staffs" do
      visit member_dashboard_index_path(:anchor => "staffs")
      expect(page).to have_content staff.name
    end

    describe "and can create a staff" do
      context "with valid parameters" do
        it "that will be appended to the page" do
          visit member_dashboard_index_path(:anchor => "staffs")
          within(".staffs") do
            fill_in "Name", :with => staff.name
            fill_in "Title", :with => staff.title
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content staff.title
        end
      end
      context "with invalid parameters" do
        context "where the parameters are blank" do
          it "which will render error messages on the page" do
            visit member_dashboard_index_path(:anchor => "staffs")
            within(".staffs") do
              fill_in "Name", :with => ""
              fill_in "Title", :with => ""
              click_on "Create"
            end
            wait_for_ajax_to_finish
            expect(page).to have_content "Title can't be blank"
            expect(page).to have_content "Name can't be blank"
          end
        end
      end
    end

    describe "and can edit a staff" do
      context "with valid parameters" do
        it "which updates the staff kind" do
          visit member_dashboard_index_path(:anchor => "staffs")
          within(".staffs") do
            fill_in "Name", :with => "www.google.com"
            fill_in "Title", :with => "Google"
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content "Google"
        end
      end
      context "with invalid parameters" do
        context "where the parameters are blank" do
          it "which will render error message on the page when kind is blank" do
            visit member_dashboard_index_path(:anchor => "staffs")
            within(".staffs .staff") do
              first(:link, "Edit").click
              fill_in "Name", :with => ""
              fill_in "Title", :with => ""
              click_on "Update"
            end
            wait_for_ajax_to_finish
            expect(page).to have_content "Title can't be blank"
            expect(page).to have_content "Name can't be blank"
          end
        end
      end
    end

    describe "and can delete a staff" do
      it "which the staff from the page" do
        visit member_dashboard_index_path(:anchor => "staffs")
        within(".staffs") do
          first(:link, 'Delete').click
        end
        wait_for_ajax_to_finish
        expect(page).to_not have_content staff.title
      end
    end
  end
end
