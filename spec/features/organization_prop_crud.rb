require 'rails_helper'
describe "Organization crud", :js => true do
  let(:user) { FactoryGirl.create :admin }
  let!(:organization) { FactoryGirl.create :organization }
  let!(:phone) { FactoryGirl.create :phone, :phoneable_id => organization.id, :phoneable_type => "Organization"}
  let!(:address) {FactoryGirl.create :address, :addressable_id => 1, :addressable_type => "Organization"}
  let!(:link) { FactoryGirl.create :link, :linkable_id => 1, :linkable_type => "Organization"}
  let!(:tag){FactoryGirl.create :tag, :taggable_id => 1, :taggable_type => "Organization"}
  context "as an admin" do
    before(:each) do
      stub_current_admin_user user
    end

    it "deletes a phone associated with an organization" do
      visit root_path(:anchor => "organizations/1")
      within (".phones") do
        click_on "Delete"
      end
      expect(".outer-container clearfix").to_not have_content organization.name
    end

    it "creates a phone associated with an organization" do
      visit root_path(:anchor => "organizations/1")
      within (".phones") do
        fill_in "Phone_number", :with => "661-246-9482"
        fill_in "Kind", :with => "cell"
        click_on "Create"
      end
      expect(page).to have_content "661-246-9482"
    end

    it "updates a phone associated with an organization" do
      visit root_path(:anchor => "organizations/1")
      within (".phone") do
        click_on "Edit"
        fill_in "Phone_number", :with => "333-333-4444"
        fill_in "Kind", :with => "office"
        click_on "Update"
      end
      expect(page).to have_content "333-333-4444"
    end
    ####
    it "deletes a address associated with an organization" do
      visit root_path(:anchor => "organizations/1")
      within ("#member-address") do
        click_on "Delete"
      end
      expect(".outer-container clearfix").to_not have_content address.city
    end

    it "creates a address associated with an organization" do
      visit root_path(:anchor => "organizations/1")
      within ("#member-address") do
        fill_in "Street_1", :with => "7005 Hooper"
        fill_in "Street_2", :with => "Ave"
        fill_in "City", :with => "Bakersfield"
        fill_in "State", :with => "CA"
        fill_in "Zip", :with => "93308"
        click_on "Create"
      end
      expect(page).to have_content "Bakersfield"
    end

    it "updates a address associated with an organization" do
      visit root_path(:anchor => "organizations/1")
      within (".address") do
        click_on "Edit"
        fill_in "Street_1", :with => "123 something"
        fill_in "Street_2", :with => "streeet"
        fill_in "City", :with => "SF"
        fill_in "State", :with => "CA"
        fill_in "Zip", :with => "94121"
        click_on "Update"
      end
      expect(page).to have_content "123 something"
    end
    ###
    ####
    it "deletes a tag associated with an organization" do
      visit root_path(:anchor => "organizations/1")
      within ("#member-tags") do
        click_on "Delete"
      end
      expect(".outer-container clearfix").to_not have_content tag.name
    end

    it "creates a tag associated with an organization" do
      visit root_path(:anchor => "organizations/1")
      within ("#member-tags") do
        fill_in "Name", :with => "Avengers"
        click_on "Create"
      end
      expect(page).to have_content "Avengers"
    end
    ###

    it "deletes a link associated with an organization" do
      visit root_path(:anchor => "organizations/1")
      within (".links") do
        click_on "Delete"
      end
      expect(".outer-container clearfix").to_not have_content link.url
    end

    it "creates a link associated with an organization" do
      visit root_path(:anchor => "organizations/1")
      within (".links") do
        fill_in "Url", :with => "www.google.com"
        fill_in "Kind", :with => "search"
        click_on "Create"
      end
      expect(page).to have_content "www.google.com"
    end

    it "updates a link associated with an organization" do
      visit root_path(:anchor => "organizations/1")
      within (".link") do
        click_on "Edit"
        fill_in "Url", :with => "www.yahoo.com"
        fill_in "Kind", :with => "search"
        click_on "Update"
      end
      expect(page).to have_content "www.yahoo.com"
    end
  end
end
