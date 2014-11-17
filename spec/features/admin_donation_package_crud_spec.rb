require 'rails_helper'
describe "Admin Donation Package CRUD", :js => true do
  let(:user) { FactoryGirl.create :admin}
  let!(:don_pack1) {FactoryGirl.create :package, :name=> 'money for lawrence',:type => 'DonationPackage'}
  let!(:don_pack2) {FactoryGirl.create :package, :type => 'DonationPackage'}

  context 'as an admin' do
    before(:each) do
      stub_current_admin_user user
    end

    it "should show the list of existing donation packages when you click on donation packages" do
      visit admin_dashboard_index_path
      click_on 'donation packages'
      expect(page).to have_content 'money for lawrence'
    end
    it "should let you create a new donation package" do
      visit admin_dashboard_index_path(:anchor => 'donPacks')
      click_on 'Create New Donation Package'
      fill_in 'Name', :with => 'cash for lawrence'
      fill_in 'Price', :with => '1'
      fill_in 'Description', :with => 'not a good charity...'
      click_on 'Create'
      wait_for_ajax_to_finish
      expect(page).to have_content 'cash for lawrence'
    end
    it "should let you edit a donation package" do
      visit admin_dashboard_index_path(:anchor => 'donPacks')
      first(:link, "Edit").click
      fill_in 'Name', :with => 'some stupid thing'
      fill_in 'Price', :with => '666'
      fill_in 'Description', :with => 'not a good charity...'
      click_on 'Update'
    end
    it "should let you delete a donation package" do
      visit admin_dashboard_index_path(:anchor => 'donPacks')
      expect(page).to have_content("money for lawrence")
      first(:link, "Delete").click
      expect(page).not_to have_content("money for lawrence")

    end

  end


end
