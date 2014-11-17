require 'rails_helper'

describe "Member Dashboard", :js => true do

  describe "any type of member user" do
    let(:user) { FactoryGirl.create :user }
    before :each do
      stub_current_member_user user
    end
    describe "logged-in member can see their member dashboard" do
      it "which shows the dashboard title" do
        visit member_dashboard_index_path
        expect(page).to have_content "Member Dashboard"
      end
    end
    describe "and can click on addresses" do
      it "which will display the address form" do
        visit member_dashboard_index_path
        find('a[href="#addresses"]').click()
        expect(page).to have_css('#member-address')
      end
    end
    describe "and can click on licenses" do
      it "which will display the license form" do
        visit member_dashboard_index_path
        find('a[href="#licenses"]').click()
        expect(page).to have_css('.licenses')
      end
    end
    describe "and can click on links" do
      it "which will display the link form" do
        visit member_dashboard_index_path
        find('a[href="#links"]').click()
        expect(page).to have_css('.links')
      end
    end
    describe "and can click on levels of care" do
      it "which will display the levels of care section" do
        visit member_dashboard_index_path
        find('a[href="#levels-of-care"]').click()
        expect(page).to have_content "Levels of Care"
      end
    end
    describe "and can click on populations" do
      it "which will display the populations served section" do
        visit member_dashboard_index_path
        find('a[href="#populations"]').click()
        expect(page).to have_content "Eating Disorder Populations Treated"
      end
    end
    describe "and can click on insurances" do
      it "which will display the insurance plans accepted section" do
        visit member_dashboard_index_path
        find('a[href="#insurances"]').click()
        expect(page).to have_content "Insurance Plans Accepted"
      end
    end
    describe "can click on the phones" do
      it "which will display the phones section" do
        visit member_dashboard_index_path
        find('a[href="#phones"]').click()
        expect(page).to have_css("input[Placeholder='Phone_number']")
        expect(page).to have_css("input[Placeholder='Kind']")
      end
    end
  end

  describe "a treatment program" do
    let(:user) { FactoryGirl.create :program }
    before :each do
      stub_current_member_user user
    end
    it "will not have the options specific to an individual provider" do
      expect(page).to_not have_content "professional background"
      expect(page).to_not have_content "professional category"
      expect(page).to_not have_content "other credentials"
      expect(page).to_not have_content "modalities used"
      expect(page).to_not have_content "co-occurring and other clinical specialties"
      expect(page).to_not have_content "languages"
      expect(page).to_not have_content "treatment approaches"
      expect(page).to_not have_content "additional information"
    end
    describe "and can click on contacts" do
      it "which will display the contact form" do
        visit member_dashboard_index_path
        find('a[href="#contacts"]').click()
        expect(page).to have_css("input[Placeholder='Name']")
        expect(page).to have_css("input[Placeholder='Email']")
        expect(page).to have_css("input[Placeholder='Website']")
      end
    end
    describe "can click on directors" do
      it "which will display the program directors section if member is a program" do
        visit member_dashboard_index_path
        find('a[href="#directors"]').click()
        expect(page).to have_css("input[Placeholder='Name']")
        expect(page).to have_css("input[Placeholder='Title']")
        expect(page).to have_css("input[Placeholder='Phone']")
        expect(page).to have_css("input[Placeholder='Email']")
      end
    end
    describe "can click on program descriptions" do
      it "which will display the program description section" do
        visit member_dashboard_index_path
        find('a[href="#descriptions"]').click()
        expect(page).to have_content "Program Description"
      end
    end
    describe "can click on the program staff" do
      it "which will display the program staff section" do
        visit member_dashboard_index_path
        find('a[href="#staffs"]').click()
        expect(page).to have_css('.staffs')
      end
    end
  end

  describe "an individual provider" do
    let(:user) { FactoryGirl.create :individual_provider }
    before :each do
      stub_current_member_user user
    end
    it "will not have the options specific to a treatment program" do
      expect(page).to_not have_content "program director info"
      expect(page).to_not have_content "program description"
      expect(page).to_not have_content "program staff"
      expect(page).to_not have_content "phones"
    end
    describe "can click on credentials" do
      it "which will display the credentials section" do
        visit member_dashboard_index_path
        find('a[href="#background-general-credentials"]').click()
        expect(page).to have_content "General Credentials"
      end
    end
    describe "can click on modalities" do
      it "which will display the modalities section" do
        visit member_dashboard_index_path
        find('a[href="#modalities"]').click()
        expect(page).to have_content "Modalities Utilized"
      end
    end
    describe "can click on specialties" do
      it "which will display the specialties section" do
        visit member_dashboard_index_path
        find('a[href="#co-occuring-specialties"]').click()
        expect(page).to have_content "Co-Occurring and Other Clinical Specialties"
      end
    end
    describe "can click on languages" do
      it "which will display the languages section" do
        visit member_dashboard_index_path
        find('a[href="#languages"]').click()
        expect(page).to have_content "Languages"
      end
    end
    describe "can click on approaches" do
      it "which will display the approaches section" do
        visit member_dashboard_index_path
        find('a[href="#treatment-approaches"]').click()
        expect(page).to have_content "Treatment Approaches"
      end
    end
  end
end
