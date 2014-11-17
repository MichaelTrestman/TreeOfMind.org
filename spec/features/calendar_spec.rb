require 'rails_helper'
feature "Events Calendar", :js => true do
  let!(:event) { FactoryGirl.create :event }

  scenario "it displays calendar " do
    visit root_path(:anchor => "events")
    expect(page).to have_content event.name
  end

  scenario "it visits event detail page on click " do
    visit root_path(:anchor => "events")
    first('.fc-content', :text => event.name).click
    wait_for_ajax_to_finish
    expect(page).to have_content event.name
  end
end
