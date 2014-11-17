require 'rails_helper'
describe "Admin CRUD for organizations", :js => true do
  let(:user) { FactoryGirl.create :admin }
  let!(:organization) { FactoryGirl.create :organization }
  let(:attributes) { FactoryGirl.attributes_for :organization }


  context "as an admin" do
    before(:each) do
      stub_current_admin_user user
    end

    context "create organization" do
      it "creates organization if valid" do
        visit admin_dashboard_index_path(:anchor => 'organizations')
        within (".organizations") do
          fill_in "Name", :with => attributes[:name]
          click_on "Create"
        end
        expect(page).to have_content attributes[:name]
      end

    end
    context "update organizations" do
      it "updates if valid" do
        visit admin_dashboard_index_path(:anchor => 'organizations')
        within (".organizations") do
          click_link(organization.name)
        end
        new_name = "Center for Amazing Test Titles"
        click_on "Edit"
        within (".organization") do
          fill_in "Name", :with => new_name
          click_on "Update"
        end
        expect(page).to have_content new_name
      end
    end

    context "destory organizations" do
      it "deletes the organization" do
        visit admin_dashboard_index_path(:anchor => 'organizations')
        click_on "| delete"
        expect(page).to_not have_content organization.name
      end
    end
  end
end
