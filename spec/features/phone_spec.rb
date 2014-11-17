require 'rails_helper'
describe "Phones", :js => true do
  let(:user) { FactoryGirl.create :user }
  let!(:phone) { FactoryGirl.create :phone, :phoneable_type => user.class.to_s, :phoneable_id => user.id }
  before(:each) do
    stub_current_member_user user
  end

  describe "user can see their member dashboard" do
    it "which shows the dashboard title" do
      visit member_dashboard_index_path(:anchor => "phones")
      expect(page).to have_content "Member Dashboard"
    end

    it "which shows a list of all phones" do
      visit member_dashboard_index_path(:anchor => "phones")
      expect(page).to have_content phone.kind
    end

    describe "and can create a phone" do
      context "with valid parameters" do
        it "that will be appended to the page" do
          visit member_dashboard_index_path(:anchor => "phones")
          within(".phones") do
            fill_in "Kind", :with => phone.kind
            fill_in "Phone_number", :with => phone.phone_number
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content phone.phone_number
        end
      end
      context "with invalid parameters" do
        context "where the parameters are blank" do
          it "which will render error messages on the page" do
            visit member_dashboard_index_path(:anchor => "phones")
            within(".phones") do
              fill_in "Kind", :with => ""
              fill_in "Phone_number", :with => ""
              click_on "Create"
            end
            wait_for_ajax_to_finish
            expect(page).to have_content "Phone number can't be blank"
            expect(page).to have_content "Kind can't be blank"
          end
        end
      end
    end

    describe "and can edit a phone" do
      context "with valid parameters" do
        it "which updates the phone kind" do
          visit member_dashboard_index_path(:anchor => "phones")
          within(".phones") do
            fill_in "Kind", :with => "www.google.com"
            fill_in "Phone_number", :with => "Google"
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content "Google"
        end
      end
      context "with invalid parameters" do
        context "where the parameters are blank" do
          it "which will render error message on the page when kind is blank" do
            visit member_dashboard_index_path(:anchor => "phones")
            within(".phones .phone") do
              first(:link, "Edit").click
              fill_in "Kind", :with => ""
              fill_in "Phone_number", :with => ""
              click_on "Update"
            end
            wait_for_ajax_to_finish
            expect(page).to have_content "Phone number can't be blank"
            expect(page).to have_content "Kind can't be blank"
          end
        end
      end
    end

    describe "and can delete a phone" do
      it "which the phone from the page" do
        visit member_dashboard_index_path(:anchor => "phones")
        within(".phones") do
          first(:link, 'Delete').click
        end
        wait_for_ajax_to_finish
        expect(page).to_not have_content phone.phone_number
      end
    end
  end
end
