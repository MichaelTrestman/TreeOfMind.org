require 'rails_helper'
describe "Links", :js => true do
	let(:user) { FactoryGirl.create :user }
	let!(:link) { FactoryGirl.create :link, :linkable_type => user.class.to_s, :linkable_id => user.id }
	before(:each) do
	  stub_current_member_user user
	end

	describe "user can see their member dashboard" do
		it "which shows the dashboard title" do
			visit member_dashboard_index_path(:anchor => "links")
			expect(page).to have_content "Member Dashboard"
		end

		it "which shows a list of all links" do
			visit member_dashboard_index_path(:anchor => "links")
			expect(page).to have_content link.url
		end

		describe "and can create a link" do
			context "with valid parameters" do
				it "that will be appended to the page" do
					visit member_dashboard_index_path(:anchor => "links")
					within(".links") do
						fill_in "Url", :with => link.url
						fill_in "Kind", :with => link.kind
						click_on "Create"
					end
					wait_for_ajax_to_finish
					expect(page).to have_content link.kind
				end
			end
			context "with invalid parameters" do
				context "where the parameters are blank" do
					it "which will render error messages on the page" do
						visit member_dashboard_index_path(:anchor => "links")
						within(".links") do
							fill_in "Url", :with => ""
							fill_in "Kind", :with => ""
							click_on "Create"
						end
						wait_for_ajax_to_finish
						expect(page).to have_content "Kind can't be blank"
						expect(page).to have_content "Url can't be blank"
					end
				end
				context "where the url is not formatted properly" do
					it "which will render an error message on the page" do
						visit member_dashboard_index_path(:anchor => "links")
						within(".links") do
							fill_in "Url", :with => "foo"
							fill_in "Kind", :with => link.kind
							click_on "Create"
						end
						wait_for_ajax_to_finish
						expect(page).to have_content "Url is invalid"
					end
					it "clears the errors after success" do
		        visit member_dashboard_index_path(:anchor => "links")
		        within(".links") do
		        	fill_in "Url", :with => "foo"
		        	fill_in "Kind", :with => link.kind
		        	click_on "Create"
		        end
		        wait_for_ajax_to_finish
		        expect(page).to have_content "Url is invalid"
		        within(".links") do
		        	fill_in "Url", :with => link.url
		        	fill_in "Kind", :with => link.kind
		        	click_on "Create"
		        end
		        wait_for_ajax_to_finish
		        expect(page).to_not have_content "Url is invalid"
		      end
				end
			end
		end

		describe "and can edit a link" do
			context "with valid parameters" do
				it "which updates the link kind" do
					visit member_dashboard_index_path(:anchor => "links")
					within(".links") do
						fill_in "Url", :with => "www.google.com"
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
						visit member_dashboard_index_path(:anchor => "links")
						within(".links .link") do
							first(:link, "Edit").click
							fill_in "Url", :with => ""
							fill_in "Kind", :with => ""
							click_on "Update"
						end
						wait_for_ajax_to_finish
						expect(page).to have_content "Kind can't be blank"
						expect(page).to have_content "Url can't be blank"
					end
				end
			end
		end

		describe "and can delete a link" do
			it "which the link from the page" do
				visit member_dashboard_index_path(:anchor => "links")
				within(".links") do
					first(:link, 'Delete').click
				end
				wait_for_ajax_to_finish
				expect(page).to_not have_content link.kind
			end
		end
	end
end
