require 'rails_helper'
describe "Admin Page CRUD", :js => true do
  let(:user) { FactoryGirl.create :admin }
  let!(:about) { FactoryGirl.create :page, :url => 'about-us' }
  let!(:section) { FactoryGirl.create :section, :page => about }
  let(:section_attributes) { FactoryGirl.attributes_for :section }

  context "as an admin" do
    before(:each) do
      stub_current_admin_user user
    end
    context "update page info" do
      it "updates if valid" do
        new_title = "Sweet Title"
        visit root_path(:anchor => 'about-us')
        click_on "Edit"
        fill_in "Title", :with => new_title
        click_on "Update"
        expect(page).to have_content new_title
        expect { fill_in "Title", :with => new_title }.to raise_error(Capybara::ElementNotFound)
      end
      it "renders errors" do
        visit root_path(:anchor => 'about-us')
        click_on "Edit"
        fill_in "Title", :with => ""
        click_on "Update"
        expect(page).to have_content "Title can't be blank"
      end
    end
    context "create Section" do
      it "creates if valid" do
        visit root_path(:anchor => 'about-us')
        click_on "Create Section"
        fill_in "Title", :with => section_attributes[:title]
        fill_in "Body", :with => section_attributes[:body]
        click_on "Create"
        expect(page).to have_content section_attributes[:title]
        expect { fill_in "Title", :with => section_attributes[:title] }.to raise_error(Capybara::ElementNotFound)
      end
      it "renders errors" do
        visit root_path(:anchor => 'about-us')
        click_on "Create Section"
        click_on "Create"
        expect(page).to have_content "Body can't be blank"
      end
    end
    context "update Section" do
      it "updates if valid" do
        new_title = "Sweet title"
        visit root_path(:anchor => 'about-us')
        click_on "Edit Section"
        fill_in "Title", :with => new_title
        click_on "Update"
        expect(page).to have_content new_title
        expect { fill_in "Title", :with => section_attributes[:title] }.to raise_error(Capybara::ElementNotFound)
      end
      it "renders errors" do
        visit root_path(:anchor => 'about-us')
        click_on "Edit Section"
        fill_in "Body", :with => ""
        click_on "Update"
        expect(page).to have_content "Body can't be blank"
      end
    end
    context "destory Section" do
      it "deletes the section" do
        visit root_path(:anchor => 'about-us')
        click_on "Delete Section"
        expect(page).to_not have_content section.title
      end
    end
  end
  context "as a member" do
    let(:user) { FactoryGirl.create :user }
    before(:each) do
      stub_current_admin_user user
    end
    it "shouldn't have any edit links" do
      visit root_path(:anchor => 'about-us')
      expect(page).to_not have_content("Edit")
      expect(page).to_not have_content("Edit Section")
      expect(page).to_not have_content("Create Section")
      expect(page).to_not have_content("Delete Section")
    end
  end
  context "as guest" do
    it "shouldn't have any edit links" do
      visit root_path(:anchor => 'about-us')
      expect(page).to_not have_content("Edit")
      expect(page).to_not have_content("Edit Section")
      expect(page).to_not have_content("Create Section")
      expect(page).to_not have_content("Delete Section")
    end
  end
end
