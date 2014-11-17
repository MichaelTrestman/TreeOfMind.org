require 'rails_helper'

describe "Admin page CRUD", :js => true do
  let(:user) { FactoryGirl.create :admin }
  let!(:group) { FactoryGirl.create :group }
  let!(:address) { FactoryGirl.create :address }
  let!(:contact) { FactoryGirl.create :contact }
    before(:each) do
      stub_current_admin_user user
    end

  describe "user can see their member dashboard" do
    it "which shows the dashboard title" do
      visit admin_dashboard_index_path(:anchor => "groups")
      expect(page).to have_content "Admin Dashboard"
      expect(page).to have_content "Groups"
    end

    it "which shows a list of all the groups" do
      visit admin_dashboard_index_path(:anchor => "groups")
      expect(page).to have_content group.name
    end

    describe "and can create a new group" do
      context "with valid parameters" do
        it "that will be appended to the page" do
          visit admin_dashboard_index_path(:anchor => "groups")
          within("#admin-group") do
            fill_in "Name", :with => group.name
            fill_in "Description", :with => group.description
            fill_in "Cost", :with => group.cost
            fill_in "Join_details", :with => group.join_details
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content group.name
        end
      end
      context "with invalid parameters" do
        context "where all parameters are blank" do
          it "which will render error messages on the page" do
            visit admin_dashboard_index_path(:anchor => "groups")
            within("#admin-group") do
              click_on "Create"
            end
            wait_for_ajax_to_finish
            expect(page).to have_content "Name can't be blank"
            expect(page).to have_content "Description can't be blank"
            expect(page).to have_content "Join details can't be blank"
          end
        end
        it "clears the errors after success" do
          visit admin_dashboard_index_path(:anchor => "groups")
          within("#admin-group") do
            fill_in "Name", :with => group.name
            fill_in "Description", :with => group.description
            fill_in "Cost", :with => group.cost
            fill_in "Join_details", :with => ""
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content "Join details can't be blank"
          within("#admin-group") do
            fill_in "Join_details", :with => group.join_details
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to_not have_content "Join details can't be blank"
        end
      end
    end

    describe "and can edit a group" do
      context "with valid parameters" do
        it "which updates the group" do
          visit admin_dashboard_index_path(:anchor => "groups")
          within('#admin-group ul li') do
            first('a').click()
          end
          within("#group-form") do
            click_on "Edit"
            fill_in "Name", :with => "Lawrence"
            click_on "Update"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content "Lawrence"
        end
      end
      context "with invalid parameters" do
        context "where the parameters are blank" do
          it "which will render error message on the page when name is blank" do
            visit admin_dashboard_index_path(:anchor => "groups")
            within("#admin-group ul li") do
              first('a').click()
            end
            within("#group-form") do
              first(:link, "Edit").click
              fill_in "Name", :with => ""
              click_on "Update"
            end
            wait_for_ajax_to_finish
            expect(page).to have_content "Name can't be blank"
          end

          it "clears the errors after success" do
            visit admin_dashboard_index_path(:anchor => "groups")
            within("#admin-group ul li") do
              first('a').click()
            end
            within("#group-form") do
              first(:link, "Edit").click
              fill_in "Name", :with => ""
              click_on "Update"
            end
            wait_for_ajax_to_finish
            expect(page).to have_content "Name can't be blank"
            within("#group-form") do
              fill_in "Name", :with => group.name
            end
            click_on "Update"
            wait_for_ajax_to_finish
            expect(page).to_not have_content "Name can't be blank"
          end
        end
      end
    end

    describe "and can delete a group" do
      it "which will remove the group from the page" do
        visit admin_dashboard_index_path(:anchor => "groups")
        within("#admin-group ul li") do
          click_on "Delete"
        end
        wait_for_ajax_to_finish
        expect(page).to_not have_content group.name
      end
    end

    describe "and can add an address" do
      context "with valid parameters" do
        it "and can see the Addresses div on the group show page" do
          visit admin_dashboard_index_path(:anchor => "groups")
          within("#admin-group ul li") do
            first('a').click()
          end
          expect(page).to have_content "Addresses"
        end
        it "and can see the address form after clicking on 'Add Address'" do
          visit admin_dashboard_index_path(:anchor => "groups")
          within("#admin-group ul li") do
            first('a').click()
          end
          wait_for_ajax_to_finish
          expect(page).to have_css("input[Placeholder='Street_1']")
          expect(page).to have_css("input[Placeholder='Street_2']")
          expect(page).to have_css("input[Placeholder='City']")
          expect(page).to have_css("input[Placeholder='State']")
          expect(page).to have_css("input[Placeholder='Zip']")
        end
        it "by submitting the address form" do
          visit admin_dashboard_index_path(:anchor => "groups")
          within("#admin-group ul li") do
            first('a').click()
          end
          fill_in "Street_1", :with => address.street_1
          fill_in "City", :with => address.city
          fill_in "State", :with => address.state
          fill_in "Zip", :with => address.zip
          within("#group-address") do
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content address.city
        end
      end
      context "with invalid parameters" do
        context "where all parameters are blank" do
          it "which will render error messages on the page" do
            visit admin_dashboard_index_path(:anchor => "groups")
            within("#admin-group ul li") do
              first('a').click()
            end
            fill_in "Street_1", :with => ""
            fill_in "City", :with => ""
            fill_in "State", :with => ""
            fill_in "Zip", :with => ""
            within("#group-address") do
              click_on "Create"
            end
            wait_for_ajax_to_finish
            expect(page).to have_content "Street 1 can't be blank"
            expect(page).to have_content "City can't be blank"
            expect(page).to have_content "State can't be blank"
            expect(page).to have_content "Zip can't be blank"
          end
        end
        it "clears the errors after success" do
          visit admin_dashboard_index_path(:anchor => "groups")
          within("#admin-group ul li") do
            first('a').click()
          end
          fill_in "Street_1", :with => address.street_1
          fill_in "City", :with => ""
          fill_in "State", :with => address.state
          fill_in "Zip", :with => address.zip
          within("#group-address") do
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content "City can't be blank"
          fill_in "City", :with => address.city
          within("#group-address") do
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to_not have_content "City can't be blank"
        end
      end
    end

    describe "and can edit an address" do
      context "with valid parameters" do
        xit "which updates the address" do
          visit admin_dashboard_index_path(:anchor => "groups")
          within('#admin-group ul li') do
            first('a').click()
          end
          within("#member-address address .address .list-group-item") do
            first(:link, "Edit").click
            fill_in "Street_1", :with => address.street_1
            fill_in "City", :with => address.city
            fill_in "State", :with => address.state
            fill_in "Zip", :with => address.zip
            click_on "Update"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content address.city
        end
      end
      context "with invalid parameters" do
        context "where the parameters are blank" do
          xit "which will render error message on the page when name is blank" do
            visit admin_dashboard_index_path(:anchor => "groups")
            within("#admin-group ul li") do
              first('a').click()
            end
            within(".group") do
              first(:link, "Edit").click
              fill_in "Name", :with => ""
              click_on "Update"
            end
            wait_for_ajax_to_finish
            expect(page).to have_content "Name can't be blank"
          end

          xit "clears the errors after success" do
            visit admin_dashboard_index_path(:anchor => "groups")
            within("#admin-group ul li") do
              first('a').click()
            end
            within(".group") do
              first(:link, "Edit").click
              fill_in "Name", :with => ""
              click_on "Update"
            end
            wait_for_ajax_to_finish
            expect(page).to have_content "Name can't be blank"
            fill_in "Name", :with => group.name
            click_on "Update"
            wait_for_ajax_to_finish
            expect(page).to_not have_content "Name can't be blank"
          end
        end
      end
    end

    describe "and can add an contact" do
      context "with valid parameters" do
        it "and can see the Contacts div on the group show page" do
          visit admin_dashboard_index_path(:anchor => "groups")
          within("#admin-group ul li") do
            first('a').click()
          end
          expect(page).to have_content "Contacts"
        end
        it "and can see the contact form" do
          visit admin_dashboard_index_path(:anchor => "groups")
          within("#admin-group ul li") do
            first('a').click()
          end
          wait_for_ajax_to_finish
          expect(page).to have_css("input[Placeholder='Name']")
          expect(page).to have_css("input[Placeholder='Email']")
          expect(page).to have_css("input[Placeholder='Website']")
          expect(page).to have_css("input[Placeholder='Contact_hours']")
        end
        it "and can create a new contact by submitting the contact form" do
          visit admin_dashboard_index_path(:anchor => "groups")
          within("#admin-group ul li") do
            first('a').click()
          end
          within("#contacts") do
            fill_in "Name", :with => contact.name
            fill_in "Email", :with => contact.email
            fill_in "Website", :with => contact.website
            fill_in "Contact_hours", :with => contact.contact_hours
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content contact.name
        end
      end
      context "with invalid parameters" do
        context "where all parameters are blank" do
          it "which will render error messages on the page" do
            visit admin_dashboard_index_path(:anchor => "groups")
            within("#admin-group ul li") do
              first('a').click()
            end
            within("#group-contact") do
              fill_in "Name", :with => ""
              fill_in "Email", :with => ""
              fill_in "Website", :with => ""
              fill_in "Contact_hours", :with => ""
              click_on "Create"
            end
            wait_for_ajax_to_finish
            expect(page).to have_content "Name can't be blank"
            expect(page).to have_content "Email can't be blank"
          end
        end
        it "clears the errors after success" do
          visit admin_dashboard_index_path(:anchor => "groups")
          within("#admin-group ul li") do
            first('a').click()
          end
          within("#contacts") do
            fill_in "Name", :with => contact.name
            fill_in "Email", :with => ""
            fill_in "Website", :with => contact.website
            fill_in "Contact_hours", :with => contact.contact_hours
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to have_content "Email can't be blank"
          fill_in "Email", :with => contact.email
          within("#contacts") do
            click_on "Create"
          end
          wait_for_ajax_to_finish
          expect(page).to_not have_content "Email can't be blank"
        end
      end
    end

    describe "and can delete a contact" do
      xit "which will remove the contact from the page" do
        visit admin_dashboard_index_path(:anchor => "groups")
        within("#admin-group ul li") do
          first('a').click()
        end
        within("#contacts") do
          click_on "Delete"
        end
        wait_for_ajax_to_finish
        expect(page).to_not have_content contact.name
      end
    end
  end
end

