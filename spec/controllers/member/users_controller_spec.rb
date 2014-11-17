require 'rails_helper'

describe Member::UsersController do
  let!(:user) { FactoryGirl.create :user }

  before(:each) do
    stub_current_member_user user
  end

  describe "PUT #update" do
    let(:first_name) {'lawrence'}
    let(:last_name) {'ma'}
    let(:about) {'me'}

    it 'should update first name for a member' do
      put :update, :id => user.id, user: { first_name: first_name }
      expect(user.reload.first_name).to eq(first_name)
    end
    it 'should update last name for a member' do
      put :update, :id => user.id, user: { last_name: last_name }
      expect(user.reload.last_name).to eq(last_name)
    end
    it 'should update about for a member' do
      put :update, :id => user.id, user: { about: about }
      expect(user.reload.about).to eq(about)
    end

  end
end