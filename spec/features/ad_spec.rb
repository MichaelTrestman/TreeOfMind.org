require 'rails_helper'
describe "Ads", :js => true do
  let(:user) { FactoryGirl.create :admin }
  let!(:ad) { FactoryGirl.create :ad }
  before(:each) do
    stub_current_admin_user user
  end

  describe "user can see their member dashboard" do
    it "which shows the dashboard title" do
      visit admin_dashboard_index_path(:anchor => "ads")
      expect(page).to have_content "Admin Dashboard"
      expect(page).to have_content "Create Ad"
    end

    it "which shows a list of all the ads" do
      visit admin_dashboard_index_path(:anchor => "ads")
      expect(page).to have_content ad.organization
    end

    describe "and can create a new ad" do
      context "with valid parameters" do
        xit "that will be appended to the page" do
          visit admin_dashboard_index_path(:anchor => "ads")
          within("#admin-ad") do
            fill_in "Organization", :with => ad.organization
            fill_in "Url", :with => ad.url
            find("input[type=datetime-local]:nth(0)").value("jddj")
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content ad.organization
          expect(page).to have_content 'upload/change banner'
        end
      end
      context "with invalid parameters" do
        context "where all parameters are blank" do
          it "which will render error messages on the page" do
            visit admin_dashboard_index_path(:anchor => "ads")
            within("#admin-ad") do
              click_on "Create"
            end
            wait_for_ajax_to_finish
            expect(page).to have_content "Organization can't be blank"
            expect(page).to have_content "Url can't be blank"
            expect(page).to have_content "Starts can't be blank"
            expect(page).to have_content "Ends can't be blank"
          end
        end
        xit "clears the errors after success" do
          visit admin_dashboard_index_path(:anchor => "ads")
          within("#admin-ad") do
            fill_in "Organization", :with => ""
            fill_in "Url", :with => ad.url
            fill_in "Starts", :with => ad.starts
            fill_in "Ends", :with => ad.ends
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content "Organization can't be blank"
          within("#admin-ad") do
            fill_in "Organization", :with => ad.organization
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to_not have_content "Organization can't be blank"
        end
      end
    end
  end
end
