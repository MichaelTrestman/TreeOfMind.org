require 'rails_helper'

describe UsersController  do
  describe "#create" do
    let(:user_params) { FactoryGirl.attributes_for :user }

    context 'with valid email and password' do
      it "creates a new user-session" do
        post :create, { user: user_params }
        expect(JSON.parse(response.body)).to eq({"redirect"=> member_dashboard_index_path})
      end
    end
    context 'with crappy email' do
      it "fails and returns a status of unprocessable_entity" do
        user_params[:email] = "bad_email"
        post :create, { user: user_params }
        expect(response.status).to eq(422)
      end
    end
  end
end
