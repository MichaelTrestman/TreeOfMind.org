require 'rails_helper'

describe SessionsController  do
  let!(:user) { FactoryGirl.create :program }
  let(:serialized_user) { ProgramSerializer.new(user).to_json }
  describe "sessions#create" do
    context 'with valid email and password' do
      it "creates a new user-session" do
        post :create, {:email => user.email, :password => user.password}
        expect(JSON.parse(response.body)).to eq({"redirect"=> member_dashboard_index_path})
      end
    end
  end

  describe 'sessions#destroy' do
    let!(:user) { FactoryGirl.create :user }
    context 'deletes session on sign out' do
      it 'clears session ' do
        delete :destroy
        expect(response).to redirect_to root_path
      end
      it ' redirects to root' do
        delete :destroy
        expect(session[:user_id]).to be(nil)
      end
    end
  end

end
